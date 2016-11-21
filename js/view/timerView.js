/*
TIMER VIEW
It shows the remining time of current pomodoro. In case 
there is no current task it shows a timer with a default 
value.
So far:
	- Shows Timer with default value.
	- Play/stop button's listener
	- Animation
Missing:
	- Check currrent task
	- To show the pomodori
	- When time runs out: Short pause/long pause. 
	- Go to next task.

*/

var TimerView = function (model,container) {
	
	model.addObserver(this);

	
	this.starTimeButton = container.find("#playstopbutton");
	this.countDownClock = container.find("#countDownClock");
	this.currentTask = container.find("#current_task");
	this.nextTask = container.find("#next_task");
	
	this.currentTask.hide();
	this.nextTask.hide();

	var bellSound = new Audio("./sounds/bell.mp3"); // buffers automatically when created
	var isNextWorkTime = false;
	var numberOfPomodori = -1;
	currentIdTask = -1;
	timerColor = "#800C00";
	
	var $navbarTimer = $("#navbarTimer");

	//Create the timer: TimeCircles plugin
	var doCircle = function(time){
		showPomodori();
		$('#countDownClock').data('timer',time);
		$('#countDownClock').TimeCircles({

					start : false,
					total_duration: time,
				    animation: "smooth",
				    bg_width:  1.2,
				    fg_width: 0.02,
				    circle_bg_color:"#b3b3b3" ,
				    direction: "Counter-clockwise",
				    count_past_zero: false,
				    time: {
				    	Days: { show:false },
				        Hours: { show:false },
				        Minutes: {color: timerColor ,
				        		show: true},
				        Seconds: {
				            text: "Seconds",
				            color: timerColor,
				            show: false
				        }
				    }
		});
	}

	/*Show minutes and seconds inside circle*/
	var showInnerTimer = function(){
		var $container2 = $('#countDownClock .textDiv_Minutes');
		$container2.find('h4').text('Time left');

		var $original = $container2.find('span');
		var $clone = $original.clone().appendTo($container2);
		$original.hide();
		$clone.text(model.getWorkTime() + ':00');
		$navbarTimer.text(model.getWorkTime() + ':00');
		$('#countDownClock').TimeCircles().addListener(function(unit, value, total) {
			    total = Math.abs(total);
			    var minutes = Math.floor(total / 60) % 60;
			    var seconds = total % 60;
			    if(seconds < 10) seconds = "0" + seconds;
			    		
			    $clone.text(minutes + ':' + seconds);
			    $navbarTimer.text(minutes + ':' + seconds);
			    if (total== 0){
			    	reestartTimer();	

				}
			    	
		}, "all");

			
	}
	//Display Pomodori
	var showPomodori = function(){
		if( numberOfPomodori < 0){
			//DO NOT SHOW ANYTHIGN
			console.log("no task");
		}else{
			console.log(" Show Task pomodori with: "+ numberOfPomodori);
		}
		
	}
	
	//When timer get to 0. POW!
	var	reestartTimer = function(){
		bellSound.play();
		$('#countDownClock').TimeCircles().destroy(); 
		//If next timer is a pomodoro time
		if(isNextWorkTime){
			console.log("pomodor time!");
			doCircle(model.getWorkTime()*60);
			isNextWorkTime = false;			
		//If next time is not pomodoro time
		}else{
			/*If tehere are pomodori associated to this task:
			update the amount of pomodoro to display*/
			console.log("pause time!");
			timerColor = "#026902"; //Change to green !
			numberOfPomodori = numberOfPomodori - 1;
			if (numberOfPomodori == 0){
				console.log("end task!");
				endCurrentTask();				
			}
			doCircle(model.getShortPause()*60);
			isNextWorkTime =true;
			timerColor = "#f00023";
		}
		//console.log("pomodori amount: " + numberOfPomodori);
		showInnerTimer();
		$('#countDownClock').TimeCircles().start();    	
	}

	var endCurrentTask =function(){
		model.setTasktoFinished();
		if (model.getCurrentTask() != null){
			if (model.getRequestedTasks("unfinished").length <= 1 ) {
				this.nextTask = container.find("#next_task");
				this.nextTask.hide();
			}else{
				//if no next task!
				this.currentTask.find("#current_task_text").text(" "+ model.getCurrentTask().name);
				numberOfPomodori =  model.getCurrentTask().numberofPomodoros;
				
			}
			
		}else{
			console.log("No pause");
			numberOfPomodori  = -1;
			this.currentTask = container.find("#current_task");
			this.currentTask.hide();
			//this.nextTask.hide();
			//HIDE POMODORI
		}
	}

	doCircle(model.getWorkTime()*60);
	showInnerTimer();

	this.update = function(message){

		if (message == "workTimeChanged"){
			$('#countDownClock').TimeCircles().destroy(); 
			doCircle(model.getWorkTime()*60);
			showInnerTimer();
		}else if(message == "createTask" || message == "deleteTask"){
			/*If the created task if the new "Current Task" or
			if the deleted task is the "Current task"
			Reestart the timer and show new "current task"*/
			if (model.getCurrentTask() != null ){
				if (currentIdTask != model.getCurrentTask().id){
					currentIdTask= model.getCurrentTask().id;
					console.log("current task: "+model.getCurrentTask());
					this.currentTask.find("#current_task_text").text(" "+ model.getCurrentTask().name);
					this.currentTask.show();
					console.log("Unfinished Tasks"+ model.getRequestedTasks("unfinished").length);
					$('#countDownClock').TimeCircles().restart(); 
					numberOfPomodori =  model.getCurrentTask().numberofPomodoros;
					showPomodori();
					isNextWorkTime = false;

			
						
			
						$('#countDownClock').TimeCircles().stop();
		
				}else{
					if (model.getRequestedTasks("unfinished").length > 1 ){
						this.nextTask.show();
						this.nextTask.find("#next_task_text").text(" Next");
					}
				}
			}else{
				/*Is there is no task: Hide tas button*/
				this.currentTask.hide();
				this.nextTask.hide();
			}	
		}else if (message == "nextTask"){
			console.log("update Next")
			var newTask = model.getCurrentTask();
			this.currentTask.find("#current_task_text").text(" "+ model.getCurrentTask().name);

		}
}
} 	

 
