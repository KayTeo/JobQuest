import { NextResponse } from "next/server";

export async function GET(request) {
  return new Response(JSON.stringify({ test: "Hello World", hi: "test" }));
}

export async function POST(request) {
  const api_url = "https://chatgpt-api.shn.hk/v1/";

  //took reference from my poly resume which i edited a few things
  const resume = "Low Yong Keng \n"
  +"123 Potato street, SINGAPORE 543213 Phone: 91772033 \n"
  + "E-Mail: yongkeng31@gmail.com/1234567e@student.tp.edu.sg \n"
  + "PROFILE \n"
  +"• Initiative, Meticulous and Hands-on Person\n"
  +"• Possess positive and right attitude \n"
  +"OBJECTIVE \n"
  +"• Apply for internship in the company to further improve my skills and gain experience of working in a company.\n"
  +"EDUCATION\n"
  +"Temasek Polytechnic \n"
  +"Diploma in Computer Engineering \n"
  +"• Current GPA is 4.1 \n"
  +"Jul 2016 – Now \n"
  +"Bendemeer Secondary School Jan 2012 – Dec 2015 \n"
  +"GCE “O” Level Certificate \n"
  +"• L1R4 is 999 \n"
   
   
  +"WORK EXPERIENCE \n"
  +"NTUC (Part-Time) as Retail Assistant Dec 2015 – Mar 2016 \n"
  +"• Worked under non-food department \n"
  +"• Replenishment of stocks onto shelves \n"
  +"• Responsible for re-ordering of goods and placement of price tags \n"
   
   
  +"VOLUNTEERY WORK \n"
  +"• Yearly participation in school activities such as newspaper collection for recycling in 2015, \n"
  +"orphanage visitation and donation drive in 2013 and helped in school carnival fund raising in 2012. \n"
  
  +"AWARDS AND ACHIEVEMENTS \n"
  +"Tchoukball \n"
  +"• Participated in all 4 years of interschool competition \n"
  +"• Obtained no medal in all 4 years \n"
  +"• Took part in other competitions outside school for experience \n"
   
  +"Good List Award \n"
  +"• Top 100% of the cohort \n"
   
  +"Good Award \n"
  +"• Maintaining the GPA at top 95% of the cohort \n"
  +"COMPUTER, LANGUAGE, TECHNICAL SKILLS AND OTHER COMPETENCIES \n"
  +"• Proficient in spoken English, Mandarin \n"
  +"• Joined Higher Engineering Skills under the Industrial Electronics Circuit Design Workshop for \n"
  +"World Skills Singapore and Mobile Robotics for ASEAN World Skills \n"
  +"• Excel in C language, Microcontroller programming and Electronic prototyping \n"
  +"• Experienced in Java (Object Oriented Programming), HTML, SQL, C programming, Web \n"
  +"programming, Computer interfacing, Network Fundamentals and Robotino. \n"
  +"• Currently learning Raspberry PI. \n\n"
  +"can you help me update this resume to suit for software engineering job?";
  

  const contents = JSON.stringify({"model": "gpt-3.5-turbo-0301","messages": [{"role": "user", "content": resume}]});
  console.log(resume);
  const res = await fetch(api_url, {
          cache: "no-store",
          method: "post",
          headers: {"Content-Type": "application/json",},
      body: contents,
      });
      
  const data = res.json().then(e => {
    console.log(e.choices[0].message.content); 
  });


}

//Function template, not runnable
export async function getDataFromPythonFunction() {
  const response = await fetch('/api/get_data_from_python');
  const data = await response.json();
  return data;
}