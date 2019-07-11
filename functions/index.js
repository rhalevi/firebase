//const functions = require('firebase-functions');
'use strict';

// [START all]
// [START import]
// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
	var srate='' ;
	srate = findStockRate();
	response.set('Content-Type', 'application/json');
response.send('{'
    +'"response_type": "in_channel",'
    +'"text": "'+srate+'",'
+'"attachments": [{"title":"https://finance.yahoo.com/quote/EBAY/"},{"text":"https://finance.yahoo.com/quote/EBAY/"},{"image_url":"https://images.jpost.com/image/upload/f_auto,fl_lossy/t_Article2016_ControlFaceDetect/416954"},{"title_link":"https://finance.yahoo.com/quote/EBAY/"}]}'
    );

});

// Take the userid parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /<userid>/
exports.writeToDB = functions.https.onRequest((request, response) => {
var userid = request.query.userid
console.log('userid',userid);
var snapshot = writeUserData(userid,'halevi@ss.com','http://somelink');
var d = new Date();
var resstr= 'saved, ' + d.toLocaleString()
response.send(resstr);


});


function writeUserData(name, email, imageUrl) {
  var snapshot = admin.database().ref('/'+name+'/').set({
    username: name,
    email: email,
    profile_picture : imageUrl
  });
  
  return snapshot;
}
// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  const snapshot = await admin.database().ref('/messages').push({original: original});
  // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
  res.redirect(303, snapshot.ref.toString());
});

function findStockRate(){
	var srate = '';
	var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
 
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=EBAY&apikey=demo1",false);

	xhr.responseType = "document"; 
	xhr.send();
	if (xhr.status === 200) {
	  console.log(xhr.responseText);
	  var stocks = JSON.parse(xhr.responseText);
	  srate= String(stocks['Global Quote']['05. price']);
	  return srate
	}

}