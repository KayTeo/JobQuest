import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';
const {spawnSync} = require( 'child_process' );

//Note: API is called through .../api/getJobs/[keywords]/[minmum salary]/[employment type]
//The three parameters can be blank/unspecified, but they are always read in order, e.g. the first parameter given is taken as keywords, the second minimum salary etc
//If you want to give a value to the 2nd or 3rd parameter whie leaving parameters before it blank, pass in a space
//E.g. .../api/getJobs/ /100 will return jobs with minimum salary of 100 while leaving other two parameters blank
//E.g. .../api/getJobs/ / /Full Time will return only full time jobs and leave first two parameters blank
export async function GET(req, { params }) {
  var keywords = "";
  var minSal = "";
  var employType = "";

  if(params.parameters != undefined){
    if(params.parameters[0] != undefined && params.parameters[0] != " "){
      var keywords =  params.parameters[0];
    }
    if(params.parameters[1] != undefined && params.parameters[1] != " "){
      var minSal = params.parameters[1];
    }
    if(params.parameters[2] != undefined && params.parameters[2] != " "){
      employType = params.parameters[2];
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
    //var jsonObj = JSON.parse(fileContents);
    return new NextResponse(fileContents);
}