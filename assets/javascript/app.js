// Initialize Firebase
var config = {
    apiKey: "AIzaSyDT79EI7-_yH_hcFmy8IRaTsUnN5WArOQY",
    authDomain: "trainscheduler-8b05c.firebaseapp.com",
    databaseURL: "https://trainscheduler-8b05c.firebaseio.com",
    projectId: "trainscheduler-8b05c",
    storageBucket: "trainscheduler-8b05c.appspot.com",
    messagingSenderId: "837996515840"
};
firebase.initializeApp(config);

var database = firebase.database().ref("trains");

var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency = "";

// Button for adding new trains
$("#submit").on("click", function(event) {
    event.preventDefault();

    // Get user input
    trainName = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    firstTrainTime = $("#firstTrainTime").val().trim();
    frequency = $("#frequency").val().trim();

    // Temporary local object to hold new train data
    var newTrain = {
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency
    };

    // Upload train data to database
    database.push(newTrain);

    // Alert
    alert("Train successfully added");

    // Clear input boxes
    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrainTime").val("");
    $("#frequency").val("");
});

// Firebase event for adding new train to database and a row to html with new train data
database.on("child-added", function(snapshot) {

    console.log(snapshot.val());

    // Store snapshot data into variables
    trainName = snapshot.val().trainName;
    destination = snapshot.val().destination;
    firstTrainTime = snapshot.val().firstTrainTime;
    frequency = snapshot.val().frequency;

    // Console log train data
    console.log("DB Train Name: " + trainName);
    console.log("DB Destination: " + destination);
    console.log("DB First Train Time: " + firstTrainTime);
    console.log("DB Frequency: " + frequency);

    // Calculate next arrival
    

    // Add train data into table
    $("#trainInfo").append("<tr><td>" + trainName +
    "</td><td>" + destination + "</td><td>" + frequency +
    "</td><td>" + nextArrival + "</td><td>" + minutesAway +
    "</td></tr>");
    
});