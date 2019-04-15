// ! Initialize Firebase
var config = {
  apiKey: "AIzaSyBwaQYqB5lHdxUwTgF2GsbRxWNECuQ4i2U",
  authDomain: "train-scheduler-a03c9.firebaseapp.com",
  databaseURL: "https://train-scheduler-a03c9.firebaseio.com",
  projectId: "train-scheduler-a03c9",
  storageBucket: "train-scheduler-a03c9.appspot.com",
  messagingSenderId: "716373405714"
};

firebase.initializeApp(config);

$("document").ready(function(event) {
  var trainName = "";
  var destination = "";
  var firstTrain = "";
  var frequency = "";
  var today = moment().format("dddd, MMMM Do, YYYY");
  var currentTime = moment();

  $(".date").html(today);

  // * collect user input *

  $("#submit-train").on("click", function(event) {
    event.preventDefault();

    trainName = $("#train-name-input")
      .val()
      .trim();
    destination = $("#destination-input")
      .val()
      .trim();
    firstTrain = $("#first-train-input")
      .val()
      .trim();
    frequency = $("#frequency-input")
      .val()
      .trim();

    $("#train-name").html(trainName);
    $("#destination").html(destination);
    $("#frequency").html(frequency);
    $("#next-arrival").html(currentTime);

    updatetime();

    clearInput();
  });

  function clearInput() {
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
    console.log(18 % 5);
  }

  function updatetime() {
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    console.log("------------------------------------");

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;

    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var nextTrainTime = moment(nextTrain).format("hh:mm");
    console.log("Next Train Comes at " + nextTrainTime);

    $("#next-arrival").html(nextTrainTime);
    $("#minutes-away").html(tMinutesTillTrain);

    setTimeout(updatetime, 10000);
  }

  function clock() {
    var date = new Date();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    var session = "AM";

    if (h == 0) {
      h = 12;
    }

    if (h > 12) {
      h = h - 12;
      session = "PM";
    }

    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    var time = h + ":" + m + ":" + s + " " + session;

    $("#displayClock").html(time);

    setTimeout(clock, 1000);
  }

  clock();
});
