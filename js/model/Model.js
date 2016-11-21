//DinnerModel Object constructor
var Model = function() {

	this.longPause = 15;
	this.shortPause = 5;
	this.workTime = 25;
	this.taskList = [];
	this.numberofPomodoriLongPause = 4;

	var idcount = 0;

	var observers = [];

	this.addObserver = function(observer) {
		
		observers.push(observer);

	} 

	var notifyObservers = function(message) {

			for(var i=0;i<observers.length;i++){
			 observers[i].update(message);
			 
		}

	}


	//create new task object and add to the this.taskList
	this.createTask = function(name, desc, numberofPomodoros,showTask){

		    var task = {
				id: idcount,
				desc: desc,
				name: name,
				startTime: null,
				endTime: null,
				showTask: showTask,
				numberofPomodoros: numberofPomodoros,
				startEditing: false,
				//pomodoroList: [],
				finished: false
			};
		
		idcount++;
				
		this.taskList.push(task);
		notifyObservers("createTask");
	}


	//get Task
 	this.getTask =function(id){

 		for(var i = 0; i < this.taskList.length; i++){
 			if (this.taskList[i].id == id){
 				return this.taskList[i];
 			}

 		}
 		console.log("the task does not exist");
 		return null;
 	}
 	
 	//delete task in this.taskList
 	this.deleteTask = function(id){ 		
 		for(var i = 0; i < this.taskList.length; i++){
 			if (this.taskList[i].id == id){
 				this.taskList.splice(i, 1);
 				notifyObservers("TaskDeleted");
 				return null;
 			}

 		}
 		console.log("the task does not exist");
 		return null;
 	}
 	this.setEditingTask = function(id){
 		this.getTask(id).startEditing = true;
 	}
 	this.unsetEditingTask = function(id){
 		this.getTask(id).startEditing = false;
 	}
 	this.getEditingTask = function(){
 		for(var i = 0; i < this.taskList.length; i++){
 			if (this.taskList[i].startEditing == true){
 				return this.taskList[i];
 			}

 		}
 		return null;
 	}

 	//update task in this.taskList
 	this.editTask = function(id, name, desc, numberofPomodoros){
 		for(var i = 0; i < this.taskList.length; i++){
 			if (this.taskList[i].id == id){
 				this.taskList[i].name = name;
 				this.taskList[i].desc = desc;
 				this.taskList[i].numberofPomodoros = numberofPomodoros;
				notifyObservers("updateTask")

 				return this.taskList[i];
 			}

 		}
 		console.log("the task does not exist");
 		return null;
 	}
 	//after setNumberOfPomodoriLongPause 
 	this.setNumberOfPomodoriLongPause=function(newnum){
 		this.numberofPomodoriLongPause = newnum;
 		notifyObservers("numberofPomodoriLongPauseChanged");

 	}
 	this.getNumberofPomodoriLongPause=function(){
 		return this.numberofPomodoriLongPause;
 	}

 	this.setLongPause=function(time){
 		this.longPause = time;
 		notifyObservers("longPauseChanged");
 	}

 	this.getLongPause = function(){
 		return this.longPause;
 	}

 	this.setShortPause= function(time){
 		this.shortPause = time;
 		notifyObservers("shortPauseChanged");

 	}

 	this.getShortPause = function(){
 		return this.shortPause;
 	}


 	this.setWorkTime=function(time){
 		this.workTime = time;
 		notifyObservers("workTimeChanged");
 	}

 	this.getWorkTime = function(){
 		return this.workTime;
 	}


 	this.getRequestedTasks = function(message){	
		
 		var requestedtaskList = [];

 		if(message == "finished"){
 			
 	 		for(var i = 0; i < this.taskList.length; i++){
	 			if (this.taskList[i].finished == true){
	 				requestedtaskList.push(this.taskList[i]);
	 				
	 			}
		 	}			
 		} else if (message == "unfinished"){

	 		for(var i = 0; i < this.taskList.length; i++){
	 			if (this.taskList[i].finished == false){
	 				requestedtaskList.push(this.taskList[i]);
	 				
	 			}
		 	}
 		} else if (message == "all"){
 			for(var i = 0; i < this.taskList.length; i++){
	 			if (this.taskList[i].showTask == true){
	 				requestedtaskList.push(this.taskList[i]);
	 				
	 			}
		 	}
 		}else if (message == "undefined"){
 			for(var i = 0; i < this.taskList.length; i++){
	 			if (this.taskList[i].showTask == false){
	 				requestedtaskList.push(this.taskList[i]);
	 				
	 			}
		 	}
 		}
 		return requestedtaskList;
 	}



 	this.editTaskPriority=function(newPrio, oldPrio, id){
 		if(oldPrio > newPrio){
 			this.taskList.splice(newPrio,0,this.taskList[oldPrio]);
 			this.taskList.splice(oldPrio+1,1);
 		} 
 		else{
 			this.taskList.splice(newPrio+1,0,this.taskList[oldPrio]);
 			this.taskList.splice(oldPrio,1);
 		} 
 	}
 	this.getCurrentTask=function(){

 		for(var i = 0; i < this.taskList.length; i++){
 			if (this.taskList[i].finished == false){
 				return this.taskList[i];
 			}
 		}
 		console.log("there is no unfinished tasks");
 		return null;
	}

	this.addPomodoro=function(id){
		for(var i = 0; i < this.taskList.length; i++){
 			if (this.taskList[i].id == id){
 				this.taskList[i].numberofPomodoros++;
 				break;
 			}
 		}
	}

	this.setTasktoFinished = function(){
 		this.getCurrentTask().finished = true;
 		notifyObservers("taskFinished");
 	}




 	/*this.taskList = [{


		id: 100,
		desc: "Description task 1",
		name: "Task 1",
		startTime: null,
		endTime: null,
		showTask: true,
		numberofPomodoros: 4,
				//pomodoroList: [],
		finished: false
		}
		,{
		id: 200,
		desc: "Description task 2",
		name: "Task 2",
		startTime: null,
		endTime: null,
		showTask: true,
		numberofPomodoros: 2,
				//pomodoroList: [],
		finished: true
		}
		];*/

	

}
