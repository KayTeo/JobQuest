const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

exports.createUserDocument = functions.auth.user().onCreate((user) => {
    db.collection("users")
        .doc(user.uid)
        .set({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            searcherBoolean: false,
            resumeBoolean: false,
            searcherData: {
                school: null,
                major: null,
                location: null,
                jobType: null,
                citizenship: null,
                minSalary: null,
                skills: null,
            },
            resumeData: {
                projectData: null,
                workData: null,
                ccaData: null,
                achievementsData: null,
                skillsData: null,
            },
        });
});
