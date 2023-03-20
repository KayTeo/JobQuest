export async function GET(request) {
  console.log(request);
  return new Response(JSON.stringify({ test: "Hello World", hi: "test" }));
}

export async function POST(request) {
  const api_url = "https://chatgpt-api.shn.hk/v1/";
  var resumeBoostData = {
    "resumeData":
    {
      "projectData": "",
      "workData": "",
      "ccaData": "",
      "achievementsData": "",
      "skillsData": ""
    }
    ,
    "coverLetter": ""
  }
  // console.log(resumeBoostData);

  var promiseVal;
  await request.body.getReader().read().then(function (result) {
    promiseVal = result['value']
  });
  var output = new TextDecoder('ascii').decode(promiseVal.buffer);
  var resumeBoost = JSON.parse(output);

  var con = "I have five sections in my resume: \n" + JSON.stringify(resumeBoost.resumeData)
    + "\n\nThis is the job I want to apply to: \n" + JSON.stringify(resumeBoost.jobData)
    + "\n\nCan you write better examples for these five sections (can copy paste into resume) so that it better matches the job without changing the names of each headings, and also give me a cover letter."
  // console.log(con);
  const contents = JSON.stringify({ "model": "gpt-3.5-turbo-0301", "messages": [{ "role": "user", "content": con }] });



  var reply = "Resume:\n\n"

    + "Project Data:\n\n"

    + "Developed and launched a scalable web-based application for movie ticket booking using object-oriented programming principles and JavaScript frameworks.\n"
    + "Implemented CI/CD pipeline and automated test suites to ensure fault tolerance and a seamless user experience.\n"
    + "Collaborated with cross-functional teams to define and prioritize product roadmaps.\n"
    + "Work Data:\n\n"

    + "Volunteered as a mentor for junior developers, providing guidance on best practices in software development and quality assurance.\n"
    + "Worked closely with business stakeholders to understand their requirements and design solutions that improve user experience and drive monetization.\n"
    + "Maintained detailed documentation for projects to ensure smooth handover and easy knowledge transfer.\n"
    + "CCA Data:\n\n"

    + "Served as the President of Hall3, organizing and leading various events and initiatives for the student body.\n"
    + "Developed strong communication and leadership skills by managing a team of volunteers and coordinating with external vendors.\n"
    + "Achievements Data:\n\n"

    + "Won 1st place in a coding competition, demonstrating expertise in Java, C++, and Python.\n"
    + "Consistently recognized for delivering high-quality work and taking ownership of end-to-end product development.\n"
    + "Skills:\n\n"

    + "Proficient in Java and Ruby, with experience using React and other front-end frameworks.\n"
    + "Experienced in application architecture and deployment on AWS and Kubernetes.\n"
    + "Strong understanding of OOP principles and software design patterns.\n"
    + "Familiar with SQL databases and API development.\n"
    + "Skilled in agile development methodologies and collaboration tools such as JIRA.\n"
    + "Cover Letter:\n"

    + "Dear Hiring Manager,\n"

    + "I am excited to apply for the Tech Lead position at CAG Regional Singapore Pte. Ltd. With my strong background in software development and leadership experience, I am confident in my ability to lead a cross-functional team to deliver high-quality products and services.\n"

    + "As a developer, I have experience working on complex projects using a range of programming languages and frameworks. I am well-versed in application architecture, and have deployed applications on AWS and Kubernetes. I have also worked extensively with CI/CD pipelines and automated test suites to ensure quality and reliability.\n"

    + "In addition to my technical skills, I am a natural problem solver with a strong focus on user experience. I have experience working closely with business stakeholders to understand their needs and build solutions that meet their requirements while also driving monetization.\n"

    + "As a leader, I have volunteered as a mentor for junior developers, providing guidance on best practices in software development and quality assurance. I have also served as the President of Hall3, developing strong communication and leadership skills while organizing and leading various events and initiatives for the student body.\n"

    + "I am excited about the opportunity to lead a team of engineers and collaborate with business stakeholders to define and prioritize product roadmaps. Thank you for considering my application. I look forward to discussing my qualifications further.\n"

    + "Sincerely,\n"
    + "[Your Name]";


  console.log(reply);

  var returnResume, returnJob, returnCoverLetter;

  // console.log("index of Project Data "+ reply.indexOf("Project Data:") +" and Work Data " + reply.indexOf("Work Data:"));

  var a = reply.slice(reply.indexOf("Project Data:"), reply.indexOf("Work Data:")); //get rid of all other data except the ones between project data and work data
  var aArr = a.split("\n");
  for (var i = 2; i < aArr.length - 1; i++)
    resumeBoostData.resumeData.projectData = resumeBoostData.resumeData.projectData + aArr[i] + "\n";

  var b = reply.slice(reply.indexOf("Work Data:"), reply.indexOf("CCA Data:")); //get rid of all other data except the ones between project data and work data
  var bArr = b.split("\n");
  for (var i = 2; i < bArr.length - 1; i++)
    resumeBoostData.resumeData.workData = resumeBoostData.resumeData.workData + bArr[i] + "\n";

  var c = reply.slice(reply.indexOf("CCA Data:"), reply.indexOf("Achievements Data:")); //get rid of all other data except the ones between project data and work data
  var cArr = c.split("\n");
  for (var i = 2; i < cArr.length - 1; i++)
    resumeBoostData.resumeData.ccaData = resumeBoostData.resumeData.ccaData + cArr[i] + "\n";

  var d = reply.slice(reply.indexOf("Achievements Data:"), reply.indexOf("Skills:")); //get rid of all other data except the ones between project data and work data
  var dArr = d.split("\n");
  for (var i = 2; i < dArr.length - 1; i++)
    resumeBoostData.resumeData.achievementsData = resumeBoostData.resumeData.achievementsData + dArr[i] + "\n";

  var e = reply.slice(reply.indexOf("Skills:"), reply.indexOf("Cover Letter:")); //get rid of all other data except the ones between project data and work data
  var eArr = e.split("\n");
  for (var i = 2; i < eArr.length - 1; i++)
    resumeBoostData.resumeData.skillsData = resumeBoostData.resumeData.skillsData + eArr[i] + "\n";

  var f = reply.slice(reply.indexOf("Cover Letter:"));
  var fArr = f.split("\n");
  for (var i = 1; i < fArr.length; i++)
    resumeBoostData.coverLetter = resumeBoostData.coverLetter + fArr[i] + "\n";

  console.log(resumeBoostData);


  // console.log(aArray[1]);
  // console.log(resume);
  // const res = await fetch(api_url, {
  //         cache: "no-store",
  //         method: "post",
  //         headers: {"Content-Type": "application/json",},
  //     body: contents,
  //     });

  // const data = res.json().then(e => {
  //   console.log(e.choices[0].message.content); 
  // });
  return new Response(JSON.stringify(resumeBoostData));

}

//Function template, not runnable
export async function getDataFromPythonFunction() {
  const response = await fetch('/api/get_data_from_python');
  const data = await response.json();
  return data;
}