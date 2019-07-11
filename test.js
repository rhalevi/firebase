
  console.log("started")
  var bigTextEvaluationStudents = document.getElementById("table1");
 
  var table = document.querySelector('#table1 tbody');
  var dbEvaluationStudentsRef = firebase.app().database().ref('/');
  console.log("connected to DB");
/*
  dbEvaluationStudentsRef.once('value').then(function(snap) {
	 console.log("got event",snap.val()) ;
	 var row = table.insertRow(0);
	 cell = row.insertCell(0);
	 cell.innerHTML = snap.val().username
	 cell = row.insertCell(1);
	 cell.innerHTML = snap.val().email
	 cell = row.insertCell(2);
	 cell.innerHTML = snap.val().profile_picture;
	  
  }
  
  
  );
  */
  dbEvaluationStudentsRef.on('value', snap => {
    console.log("got change event",snap.val());

	while(table.hasChildNodes()) {
	  table.removeChild(table.firstChild);
    }

	snap.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
	      console.log(childData);
		 var row = table.insertRow(-1);
		 cell = row.insertCell(0);
		 cell.innerHTML = childData.username
		 cell = row.insertCell(1);
		 cell.innerHTML = childData.email
		 cell = row.insertCell(2);
		 cell.innerHTML = childData.profile_picture;

    });
	


  });
