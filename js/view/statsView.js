var StatsView = function (model,container) {
	
	

	model.addObserver(this);
	this.detailsButton = container.find("#detailsButton");

	this.update = function(message){

	if(message == "createTask"|| message == "TaskDeleted" || message =="TasksEdited" || message =="taskFinished"){
	
		var removeTomate = document.getElementById("tomate");   // Get the <ul> element with id="myList"
		while ( removeTomate.firstChild ) removeTomate.removeChild( removeTomate.firstChild );
	
		var totalTasksdone = model.getRequestedTasks("finished");
		var totalTasks = model.getRequestedTasks("all");

		var percentageDone = ((totalTasksdone.length)/(totalTasks.length))*100;

		console.log(percentageDone);

		loadLiquidFillGauge("tomate", percentageDone);
	}}	
	

	}
