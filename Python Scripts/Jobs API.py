#Run in the command line first time you use code/do not have selenium installed
#pip install selenium
#Run to import necessary libraries

#NOTE: Depending on settings, the present working directory of Python will change, affecting where files are written to.
#In VSCode, present working directory seems to be the root folder, ie one above this one. Hence all files with no file path specified will be written there.

import requests
import re
import pprint
import json
from selenium import webdriver
from selenium.webdriver.common.by import By 
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
import uuid

def formatData(data):
    regex = re.compile(r'<[^>]+>')
    data = regex.sub('', data)
    data = data.replace("\\n", " ")
    data = data.replace("\"@context\":\"http://schema.org/\",", "")
    data = data.replace("&amp", "")
    data = data.replace("", "")
    data = data.replace('\"\"', 'null')
    #data = data.encode('utf-16', errors = 'ignore').decode('utf-16')

    new_data = {}
    json_obj = json.loads(data)
    json_obj.pop("@context", None)
    
    #empty strings to null
    new_data['dueDate'] = json_obj.pop('validThrough')
    new_data['jobTitle'] = json_obj.pop('title')
    new_data['skills'] = json_obj['skills']
    new_data['location'] = {}
    new_data['location']['country'] = json_obj['jobLocation']['address']['addressCountry']
    new_data['location']['locality'] = json_obj['jobLocation']['address']['addressLocality']
    new_data['location']['address'] = json_obj['jobLocation']['address']['streetAddress']
    new_data['company'] = {}
    new_data['company']['logo'] = json_obj['hiringOrganization']['logo']
    new_data['company']['name'] = json_obj['hiringOrganization']['name']
    new_data['jobType'] = list(set(json_obj['employmentType']))
    new_data['description'] = json_obj['description']
    new_data['datePosted'] = json_obj['datePosted']
    new_data['salaryRange'] = {}
    new_data['salaryRange']['currency'] = json_obj['baseSalary']['currency']
    new_data['salaryRange']['maxValue'] = json_obj['baseSalary']['value']['maxValue']
    new_data['salaryRange']['minValue'] = json_obj['baseSalary']['value']['minValue']
    new_data['salaryRange']['payPeriod'] = json_obj['baseSalary']['value']['unitText']  

    #Adds uuid in field "uuid"
    new_data['uuid'] = str(uuid.uuid4())
    
    data = json.dumps(new_data, indent = 4, ensure_ascii = False)
    #data = json.dumps(json.loads(data), indent=4, sort_keys=True)
    return data

#Retrieves the links to job cards given a search URL
#Takes a valid url of list of searched jobs and driver, a selenium webdriver object
def getCardLinks(url, driver):
    driver.get(url)
    elements = driver.find_elements(By.XPATH, "//*[contains(@data-testid, 'job-card-link')]")
    links = []

    #Note: Each search page contains 20 entries
    for title in elements: 
        links.append(title.get_attribute('href'))
    return links

#Returns the job data in JSON format from a card URL
#Takes a valid url of a single job and driver, a selenium webdriver object
def getCardJSON(cardURL, driver):
    driver.get(cardURL)
    elements2 = driver.find_elements(By.XPATH, "//*[contains(@type, 'application/ld+json')]")
    for e in elements2:
        if("baseSalary" in e.get_attribute('innerHTML')):
            return e.get_attribute('innerHTML')
    return "Not found"

#Overall function to return results of a single search
#filename parameter is the file the data will be appended to in JSON format. If file does not exist, it will be created.
#keywords is the search terms
#salary indicates salary range of job contains salary value
#employment must be one of following values: Permanent, Full Time, Part Time, Contract, Flexi-Work, Temporary, Freelance, Internship/Attachment
#page returns the nth page of the search results
def getJobData(filename, keywords = "", employmentType = "", salary = "", startPage = 0, pages = 5):
    
    #Driver initialises the browser
    #Browser required as target site dynamically loads search and job data
    #driver = webdriver.Chrome(service = ChromeService(ChromeDriverManager().install()))
    driver = webdriver.Chrome()
    
    #Generate URL
    links = []
    
    for i in range(startPage, startPage + pages):
        targetURL = "https://www.mycareersfuture.gov.sg/search?search=" + keywords + "&salary=" + salary + "&employmentType=" + employmentType + "&sortBy=relevancy&page=" + str(i)
        links += getCardLinks(targetURL, driver)
    f = open(filename, "a")
    #Note: Each search page contains 20 entries
    for link in links:
        data = getCardJSON(link, driver)
        if(data == "Not found"):
            pass
        else:
            data = formatData(data)
            with open(filename, 'a', encoding='utf8') as f:
                f.write(data)

                #Delimiter for next record for reading purposes
                f.write('\n\r')
    f.close()
    driver.close()

#Test function
getJobData(filename = "newTest.json", keywords = "tech", pages = 1)