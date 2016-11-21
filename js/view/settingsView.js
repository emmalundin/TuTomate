var SettingsView = function (model,container) {

	model.addObserver(this);
	this.numberofpomodoriLongPause = container.find(".nose");
	this.plusButton = container.find(".plusPomodoro");
	this.minusButton = container.find(".minusPomodoro");

	this.range1 = container.find("#myRange1");
	this.RoundTimeValue = container.find("#RoundTimeValue");	
	
	this.range2 = container.find("#myRange2");
	this.PauseTimeValue = container.find("#PauseTimeValue");

	this.range3 = container.find("#myRange3");
	this.LongpauseTimeValue = container.find("#LongpauseTimeValue");
	
	this.numberofpomodoriLongPause.html(model.getNumberofPomodoriLongPause());

	this.saveButton = container.find("#saveBtn");

	var slider1 = document.getElementById("myRange1");
	var sliderValue1 = document.getElementById("RoundTimeValue");

	var slider2 = document.getElementById("myRange2");
	var sliderValue2 = document.getElementById("PauseTimeValue");

	var slider3 = document.getElementById("myRange3");
	var sliderValue3 = document.getElementById("LongpauseTimeValue");

		
	slider1.value =  model.getWorkTime();
	slider2.value =  model.getShortPause();
	slider3.value =  model.getLongPause();


	this.RoundTimeValue.html(slider1.value + " " + "min");
	this.PauseTimeValue.html(slider2.value + " " + "min");
	this.LongpauseTimeValue.html(slider3.value + " " + "min");
	var numberofpomodoriLongPause = model.getNumberofPomodoriLongPause();


	this.update = function(message){

		

		var slider1 = document.getElementById("myRange1");
		this.sliderValue1 = document.getElementById("RoundTimeValue");
		var slider2 = document.getElementById("myRange2");
		this.sliderValue2 = document.getElementById("PauseTimeValue");
		var slider3 = document.getElementById("myRange3");
		this.sliderValue3 = document.getElementById("LongpauseTimeValue");

		switch (message) {
			case "slider1Changed" : 
				this.sliderValue1.value =  $("#RoundTimeValue").value;
			 break;	

			case "slider2Changed" : 
				this.sliderValue2.value =  $("#PauseTimeValue").value;
			break;

			case "slider3Changed" : 
				this.sliderValue3.value =  $("#LongpauseTimeValue").value;
			break;
			 case "numberofPomodoriLongPauseChanged+":
			 	//console.log("numberofpomodoriLongPause+");
			 	if (numberofpomodoriLongPause<20){
			 		numberofpomodoriLongPause ++;
					this.numberofpomodoriLongPause.html(numberofpomodoriLongPause);
			 	}
			 	
			break;

			case "numberofPomodoriLongPauseChanged-":
				//console.log("numberofpomodoriLongPause-");
				if (numberofpomodoriLongPause>1){
				numberofpomodoriLongPause--;
				this.numberofpomodoriLongPause.html(numberofpomodoriLongPause);}
			break;
		}

		/*console.log("This is slider1.value" + slider1.value);
		console.log("This is slider2.value" + slider2.value);
		console.log("This is slider3.value" + slider3.value);*/


		this.RoundTimeValue.html(slider1.value + " " + "min");
		this.PauseTimeValue.html(slider2.value + " " + "min");
		this.LongpauseTimeValue.html(slider3.value + " " + "min");

		//console.log(model.getNumberofPomodoriLongPause());

	}
	
}
 