$(document).ready(function () {
  // Set up firebase

  var config = {
    apiKey: "AIzaSyDUAe87TvfJ7UAUGuxSm7z_Z0Ya9arl8uY",
    authDomain: "class-activity-51b94.firebaseapp.com",
    databaseURL: "https://class-activity-51b94.firebaseio.com",
    projectId: "class-activity-51b94",
    storageBucket: "class-activity-51b94.appspot.com",
    messagingSenderId: "796243375159"
  };
  firebase.initializeApp(config);


  // Create reference to our database for convenience
  var database = firebase.database();

  // Submit a new employee
  $('#submit-form').on('click', function (event) {
    event.preventDefault();

    var trainName = $('#name-input')
      .val()
      .trim();
    var destination = $('#destination-input')
      .val()
      .trim();
    var firstTime = parseInt($('#time-input')
      .val()
      .trim()
    );
     
    var frequency = 
      $('#frequency-input')
      .val();

    var minutes = $('#minutes-away').val();

    var nextArrival =$("#next-arrival").val();

    console.log(trainName, destination, firstTime, frequency);

    // Push/create a new entry for the employee
    database.ref().push({
      trainName: trainName,
      destination: destination,
      firstTime: firstTime,
      frequency:frequency,
      minutes:minutes,
      nextArrival:nextArrival,
    });
  });

  // print out all children
  // Runs on load for all existing children and once per new child
  database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val())
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var firstTime = childSnapshot.val().firstTime;
    var frequency = childSnapshot.val().frequency;
    var minutes =childSnapshot.val().minutes;
    var nextArrival=childSnapshot.val().nextArrival;

    var tr = $("<tr>");

    var firstTimeConv = moment(firstTime, "HH:mm")

    var currentTime = moment();

    var diffTime = moment().diff(moment(firstTimeConv), "minutes")

    var tRemainder=diffTime % frequency;

    var tMinutestill = frequency - tRemainder;
    
    var nextArrival = moment().add(tMinutestill,'m');
    

    var nextArrival2= moment(nextArrival).format("H:mm");
    
    var tdName = $("<td>").text(trainName);
    var tdDestination = $("<td>").text(destination);
    var tdfrequency = $("<td>").text(frequency);
    
    var tdnextArrival=$("<td>").text(nextArrival2);
    var tdMinutes= $("<td>").text(tMinutestill);


    tr.append(tdName, tdDestination, tdfrequency,  tdnextArrival, tdMinutes);

    $("#train-data").append(tr);


  });


});