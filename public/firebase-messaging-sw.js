importScripts('https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.2/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyBdDqLlXGn2RXOgnfPJ8ZMjkQ1DWUD7SMM",
    projectId: "egrocer-457a9",
    messagingSenderId: "755773183987",
    appId: "1:755773183987:web:b21f893398fac9c493e486",
});

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
    const notification = JSON.parse(payload.data.data);
    const title = notification.title;
    const options = {
        body: notification.body,
        icon: notification.icon,
    };
    return self.registration.showNotification(title, options);
    //return self.registration.showNotification(title,{body,icon});
});
