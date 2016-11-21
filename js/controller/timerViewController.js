var TimerViewController = function(view, model) {
	var c;
	var task = true;

 	//EXAMPLe
 	

 	view.starTimeButton.click(function(){
 		 var isWorkTime = true;
 		 var a = document.getElementById("icon").getAttribute("class"); 
 		 		
 		//c = setInterval(setTheTime, 1000);
	    if (a == "glyphicon glyphicon-stop") {
	    	$('#countDownClock').TimeCircles().stop();
	    	
	    } else if (a == "glyphicon glyphicon-play") {
	    	$('#countDownClock').TimeCircles().start();
	    	
	   }
	   $("#playstopbutton i").toggleClass("glyphicon-stop glyphicon-play");
 		
 	});

 	view.currentTask.click(function(){
 		
 		 
 		});

 
 	 	view.nextTask.click(function(){
 		console.log("NEXT");
 		model.setTasktoFinished();
 	
 		view.update("nextTask");

 		 
 		});

}