var SettingsViewController = function(view, model ) {
	var slider1 = model.getWorkTime();
	var slider2 = model.getShortPause();
	var slider3 = model.getLongPause();
	var numberofPomodoriLongPause = model.getNumberofPomodoriLongPause();

	view.range1.change(function(newValue){
		slider1 = newValue.target.value;
		view.update("slider1Changed");

	});

	view.range2.change(function(newValue){
		slider2 = newValue.target.value;
		view.update("slider2Changed");

	});

	view.range3.change(function(newValue){
		slider3 = newValue.target.value;
		view.update("slider3Changed");

	});

	view.plusButton.click(function(){
 		numberofPomodoriLongPause = numberofPomodoriLongPause + 1;
 		view.update("numberofPomodoriLongPauseChanged+");

	});
 
 	view.minusButton.click(function(){
 		numberofPomodoriLongPause = numberofPomodoriLongPause - 1;
 		view.update("numberofPomodoriLongPauseChanged-");

 	});


	view.saveButton.click(function(){
		model.setWorkTime(slider1);
		model.setShortPause(slider2);
		model.setLongPause(slider3);
		model.setNumberOfPomodoriLongPause(numberofPomodoriLongPause);
		//console.log('Saved!' + slider1 + slider2 + slider3);

	});

 	
}