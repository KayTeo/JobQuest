#Run in the command line first time you use code/do not have selenium installed
#pip install selenium requests webdriver 
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
import os
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import sys
from time import sleep

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
    new_data['jobLink'] = json_obj['jobLink']

    #Adds uuid in field "uuid"
    new_data['uuid'] = str(uuid.uuid4())
    
    data = json.dumps(new_data, indent = 4, ensure_ascii = False)
    #data = json.dumps(json.loads(data), indent=4, sort_keys=True)
    return data

#Retrieves the links to job cards given a search URL
#Takes a valid url of list of searched jobs and driver, a selenium webdriver object
def getCardLinks(url, driver):
    driver.get(url)
    sleep(2)

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
            str = e.get_attribute('innerHTML')
            str = str[:len(str) - 1]
            str = str + ", \"jobLink\" : \"" + cardURL + "\"}"
            return str
    return "Not found"

#Overall function to return results of a single search
#filename parameter is the file the data will be appended to in JSON format. If file does not exist, it will be created.
#keywords is the search terms
#salary indicates salary range of job contains salary value
#employmen must be one of following values: Permanent, Full Time, Part Time, Contract, Flexi-Work, Temporary, Freelance, Internship/Attachment
#page returns the nth page of the search results
def getJobData(filename, keywords = "", employmentType = "", salary = "", startPage = 0, pages = 5):
    pages = int(pages)
    employmentType = employmentType.lower()
    #Driver initialises the browser
    #Browser required as target site dynamically loads search and job data
    #driver = webdriver.Chrome(service = ChromeService(ChromeDriverManager().install()))
    options = webdriver.ChromeOptions();
    options.add_experimental_option('excludeSwitches', ['enable-logging'])

    options.add_argument("--headless")
    driver = webdriver.Chrome(options = options)
    
    if employmentType != "Full Time" and employmentType != "Part Time" and employmentType != "Contract" and employmentType != "Flexi-work" and employmentType != "Temporary" and employmentType != "Freelance" and  employmentType != "Internship/Attachment" and employmentType != "":
        employmentType = ""
        print("Error, please choose valid employment type")

    if(int(salary) < 0):
        print("Error, please enter non-negative minimum salary")
    #Generate URL
    links = []
    filename = os.path.dirname(os.path.realpath(__file__)) + filename
    #Erase previous file
    f = open(filename, "w+", encoding='utf8')

    for i in range(startPage, startPage + pages):
        targetURL = "https://www.mycareersfuture.gov.sg/search?search=" + keywords + "&salary=" + str(salary) + "&employmentType=" + employmentType + "&sortBy=relevancy&page=" + str(i)
        links += getCardLinks(targetURL, driver)
    print("Test")
    print(links)
    f = open(filename, "a", encoding='utf8')
    #Note: Each search page contains 20 entries
    f.write("{\"jobs\" : [\n     ")
    for link in links:
        data = getCardJSON(link, driver)
        if(data == "Not found"):
            pass
        else:
            data = formatData(data)
            #Set to w mode to delete file before writing
            f.write("\t" + data + ",")

            #Delimiter for next record for reading purposes
            f.write('\n\r')
    f = open(filename, "rb+")
    f.seek(-4, os.SEEK_END)
    f.truncate()
    f = open(filename, "a", encoding='utf8')
    f.write("\n\t]\n}")
    f = open(filename, 'r', encoding= 'utf8')
    formatted = json.dumps(json.loads(f.read()), indent = 4, ensure_ascii = False)
    f = open(filename, 'w', encoding= 'utf8')
    f.write(formatted)
    f.close()
    driver.close()

#NOTE: Python script spawned here has JobQuest/jobquest as root dir. Python script ran in itself has jobquest as root dir. This script CANNOT run here as path is for running from API
#keywordsInput = input()
input = sys.argv
# input = [1, "cook", 500, "", 1]
getJobData(filename = "\\jobsData.json", keywords = str(input[1]), salary = int(input[2]), employmentType = str(input[3]), pages = int(input[4]))
print("Job script ran")
