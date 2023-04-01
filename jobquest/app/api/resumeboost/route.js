const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: "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",
});

export async function POST(request) {
    var resumeBoostData = {
        resumeData: {
            projectData: "",
            workData: "",
            ccaData: "",
            achievementsData: "",
            skillsData: "",
        },
        coverLetter: "",
    };

    var promiseVal;
    await request.body
        .getReader()
        .read()
        .then(function (result) {
            promiseVal = result["value"];
        });
    var output = new TextDecoder("ascii").decode(promiseVal.buffer);
    var resumeBoost = JSON.parse(output);

    var con =
        "I have five sections in my resume: \n" +
        JSON.stringify(resumeBoost.resumeData) +
        "\n\nThis is the job I want to apply to: \n" +
        JSON.stringify(resumeBoost.jobData) +
        "\n\nCan you write better examples for these five sections: Project Data, Work Data, CCA Data, Achievements Data, Skills (can copy paste into resume) so that it better matches the job without changing the names of each headings, and also give me a cover letter.";

    const openai = new OpenAIApi(configuration);
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: con }],
        temperature: 0.3,
    });
    console.log(completion.data.choices[0].message);
    var reply = completion.data.choices[0].message.content;

    var a = reply.slice(
        reply.indexOf("Project Data"),
        reply.indexOf("Work Data")
    );
    var aArr = a.split("\n");
    for (var i = 1; i < aArr.length - 1; i++)
        if (aArr[i] != "")
            resumeBoostData.resumeData.projectData =
                resumeBoostData.resumeData.projectData + aArr[i] + "\n";

    var b = reply.slice(reply.indexOf("Work Data"), reply.indexOf("CCA Data"));
    var bArr = b.split("\n");
    for (var i = 1; i < bArr.length - 1; i++)
        if (bArr[i] != "")
            resumeBoostData.resumeData.workData =
                resumeBoostData.resumeData.workData + bArr[i] + "\n";

    var c = reply.slice(
        reply.indexOf("CCA Data"),
        reply.indexOf("Achievements Data")
    );
    var cArr = c.split("\n");
    for (var i = 1; i < cArr.length - 1; i++)
        if (cArr[i] != "")
            resumeBoostData.resumeData.ccaData =
                resumeBoostData.resumeData.ccaData + cArr[i] + "\n";

    var d = reply.slice(
        reply.indexOf("Achievements Data"),
        reply.indexOf("Skills")
    );
    var dArr = d.split("\n");
    for (var i = 1; i < dArr.length - 1; i++)
        if (dArr[i] != "")
            resumeBoostData.resumeData.achievementsData =
                resumeBoostData.resumeData.achievementsData + dArr[i] + "\n";

    var e = reply.slice(
        reply.indexOf("Skills:"),
        reply.indexOf("Cover Letter:")
    );
    var eArr = e.split("\n");
    for (var i = 1; i < eArr.length - 1; i++)
        if (eArr[i] != "")
            resumeBoostData.resumeData.skillsData =
                resumeBoostData.resumeData.skillsData + eArr[i] + "\n";

    var f = reply.slice(reply.indexOf("Cover Letter:"));
    var fArr = f.split("\n");
    for (var i = 1; i < fArr.length; i++)
        if (fArr[i] != "")
            resumeBoostData.coverLetter =
                resumeBoostData.coverLetter + fArr[i] + "\n";

    // console.log(resumeBoostData);

    return new Response(JSON.stringify(resumeBoostData));
}

//Function template, not runnable
export async function getDataFromPythonFunction() {
    const response = await fetch("/api/get_data_from_python");
    const data = await response.json();
    return data;
}
