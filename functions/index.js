// functions/index.js
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.sendBirthdayNotification = functions.pubsub
    .schedule("every 24 hours")
    .onRun(async (context) => {
      const today = new Date().toISOString().slice(0, 10);
      const birthdaysRef = admin.firestore().collection("birthdays");
      const snapshot = await birthdaysRef.where("date", "==", today).get();

      snapshot.forEach((doc) => {
        const birthdayData = doc.data();
        const userId = birthdayData.userId;

        admin
            .firestore()
            .collection("users")
            .doc(userId)
            .get()
            .then((userDoc) => {
              const userData = userDoc.data();
              const payload = {
                notification: {
                  title: `Happy Birthday, ${userData.name}!`,
                  body: `It's ${userData.name}'s birthday today!`,
                  click_action: "FLUTTER_NOTIFICATION_CLICK",
                },
              };

              admin.messaging().sendToTopic(userId, payload);
            });

        doc.ref.update({notificationSent: true});
      });
    });
