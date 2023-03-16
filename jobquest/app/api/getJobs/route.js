import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';
const {spawnSync} = require( 'child_process' );

//NOTE: To use, send POST request with body as JSON object containing searcher profile fields (school, major, location, jobType, citizenship, minSalary, skills) + search fields (keywords)

function countSkillMatch(jobSkills, searcherSkills){
  let skillsCount = 0;
  for(let i = 0; i < jobSkills.length; i++){
    for(let j = 0; j < searcherSkills.length; j++){
      if(jobSkills[i] === searcherSkills[j]){
        skillsCount++;
      }
    }
  }
  return skillsCount;
}
export async function POST(req, res) {

  //console.log(req); //body: { stream: undefined, source: null, length: null }
  //console.log(req.body); //ReadableStream { locked: false, state: 'readable', supportsBYOB: false }
  //console.log(req.body.getReader()); //ReadableStreamDefaultReader {
  //console.log(req.body.getReader().read()); //Promise

  var promiseVal;
  await req.body.getReader().read().then(function(result){
    promiseVal = result['value'] //Returns as a JSON with a ASCII array??? Even though default HTML is UTF8{ value: Uint8Array(4) [ 116, 101, 115, 116 ], done: false } 
  });
  var output = new TextDecoder('ascii').decode(promiseVal.buffer);
  var searchInput = JSON.parse(output)

  var keywords = "";
  var minSal = "";
  var employType = "";

  //Undefined check
  if(searchInput != undefined){
    if(searchInput['keywords'] != undefined && searchInput['keywords'] != " "){
      var keywords =  searchInput['keywords'];
    }
    if(searchInput['minSal'] != undefined && searchInput['minSal'] != " "){
      var minSal = searchInput['minSal'];
    }
    if(searchInput['employType'] != undefined && searchInput['employType'] != " "){
      employType = searchInput['employType']
    }
  }
  try {
      //NOTE: Python script spawned here has JobQuest/jobquest as root dir. Python script ran in itself has jobquest as root dir
      let python = await spawnSync('python', ['Python Scripts/Jobs API.py', keywords, minSal, employType]);
    } catch (e) {
      console.error(e); 
      //res.status(500).json({ stderr });
    }
    var fileContents = await fs.readFile("Python Scripts/jobsData.json", 'utf8');
    var jsonObj = JSON.parse(fileContents);
    for(let i = 0; i < jsonObj['jobs'].length; i++){
      jsonObj['jobs'][i]['skillMatches'] = countSkillMatch(jsonObj['jobs'][i]['skills'], searchInput['skills'])
    }

    jsonObj['jobs'] = jsonObj['jobs'].sort((a,b) =>{
      if( a.skillMatches > b.skillMatches){
        return -1;
      }
    });
  return new NextResponse(jsonObj);

}