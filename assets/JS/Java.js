var config = {
    apiKey: "AIzaSyBFiUamRT_A4H2pJnTelAgCEbIjXrgdoTg",
    authDomain: "train-a46b3.firebaseapp.com",
    databaseURL: "https://train-a46b3.firebaseio.com",
    projectId: "train-a46b3",
    storageBucket: "train-a46b3.appspot.com",
    messagingSenderId: "329141125625"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

$("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#role-input").val().trim();
    var frequency = moment($("#start-input").val().trim(), "").format("X");
    var nextArrival = $("#rate-input").val().trim();
    var minutesAway = $("#rate-input").val().trim();
  

    var newTrain = {
      name: trainName,
      destination: destination,
      frequency: frequency,
      next: nextArrival,
      minaway: minutesAway
    };
  
    database.ref().push(newTrain);
  
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.frequency);
    console.log(newTrain.next);
    console.log(newTrain.minaway);
  
    alert("New Train added");
  
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#frequency-input").val("");
    $("#next-input").val("");
    $("#minaway-input").val("");

  });
  
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var frequency = childSnapshot.val().frequency;
    var nextArrival = childSnapshot.val().next;
    var minutesAway = childSnapshot.val().minaway;

    console.log(trainName);
    console.log(destination);
    console.log(frequency);
    console.log(nextArrival);
    console.log(minutesAway);

    var empStartPretty = moment.unix(nextArrival).format("MM/DD/YYYY");
  
    var trainTime = moment().diff(moment(frequency, "X"), "train arrival");
    console.log(trainTime);
  
    var incomingTrain = trainTime * frequency;
    console.log(incomingTrain);
  
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(empStartPretty),
      $("<td>").text(frequency),
      $("<td>").text(nextArrival),
      $("<td>").text(minutesAway)
    );
  
    $("#train-table > tbody").append(newRow);
  }); 