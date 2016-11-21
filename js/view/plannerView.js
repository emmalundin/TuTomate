/*
*	TODO LIST FOR PLANNER:
*	- edit task function
*	- show pomodori in every task
*/


var PlannerView = function (model,container) {



	
	var countView = 0;

	model.addObserver(this);

	$('#allPomodoros').append($('<img>', { 
	    src : "tomato-grey.png", 
	    class : "img",
	    width : 30, 
	    id : "Pomodoro0", 
	    onclick : "swapOnCreate(id)",
		}));
	$("#success-alert").hide();


	//EXAMPLE
	this.createTaskButton = container.find("#createTaskButton");
	this.updateTaskButton = container.find("#updateTaskButton");
	this.cancelTaskButton = container.find("#cancelTaskButton");
	this.cancelUpdateButton = container.find("#cancelUpdateButton");
	this.taskname = container.find("#taskname");
	this.taskdesc = container.find("#taskdesc");
	this.editTaskButton = container.find(".editTaskButton");
	this.deleteTaskButton = container.find(".deleteTaskButton");
	this.accordion = container.find("#accordion");
	this.dragDrop = container.find("#dragDrop");
	this.allPomodoros = container.find("#allPomodoros");
	var $templateNotFinish = $(".template");
	var $templateFinish = $(".templateFinish");
	
	/*deleteElementChilds("accordion");
	deleteElementChilds("accordionFinish");*/

	var deleteItem = document.getElementById("accordion"); 
	 	 // Get the <ul> element with id="myList"
 	 if(deleteItem != null){
		while (deleteItem.firstChild){
			 deleteItem.removeChild( deleteItem.firstChild );

		}
	}

	var deleteItem = document.getElementById("accordionFinish"); 
	 	 // Get the <ul> element with id="myList"
 	 if(deleteItem != null){
		while (deleteItem.firstChild){
			 deleteItem.removeChild( deleteItem.firstChild );

		}
	}
	
	

	this.update = function(message){
		
		switch(message){
			case "deleteAccordion" :
				deleteElementChilds("accordion");
			break;
			case "createTask":
				//Create task pop-up erase previous values
				createtaskname.value = "";
			    createtaskdesc.value = "";
			    for(h = countView; h > 0; --h){
			   		var d = document.getElementById('allPomodoros');
			   		var tomatoRemove =  document.getElementById("Pomodoro"+(h));
			   		d.removeChild(tomatoRemove);	   	    
			    }
			    document.getElementById("Pomodoro0").src = "tomato-grey.png";				
				//Add task accordion
				console.log("CreatedTask called");
				updateAccordion("accordion");
				this.editTaskButton = container.find(".editTaskButton");
				this.deleteTaskButton = container.find(".deleteTaskButton");
				PlannerViewController(this,model);
				countView = 0;

			break;

			case "taskFinished":	
				deleteElementChilds("accordion");
				deleteElementChilds("accordionFinish");
				//Refresh previous task not finished
				updateAccordion("accordion");
				//Refresh previous task finished
				updateAccordion("accordionFinish");
				this.editTaskButton = container.find(".editTaskButton");
				this.deleteTaskButton = container.find(".deleteTaskButton");
				PlannerViewController(this,model);
				countView = 0;


				
				
			break;
			//Task updated
			case "updateTask":		
				deleteElementChilds("accordion");
				deleteElementChilds("editPomodoros");
				createtaskname.value = "";
			    createtaskdesc.value = "";
				countView = 0;
				updateAccordion("accordion");
				this.editTaskButton = container.find(".editTaskButton");
				this.deleteTaskButton = container.find(".deleteTaskButton");
				PlannerViewController(this,model);
			break;


			case "EditingTask":
				var task = model.getEditingTask();
				edittaskname.value = task.name;
		   		edittaskdesc.value = task.desc;
		   		var numberTomatoes = task.numberofPomodoros;
		   		countView = numberTomatoes;
		   		for(i = 0; i < numberTomatoes; ++i){
		   			
					$('#editPomodoros').append($('<img>', { 
					    src : "tomato.png", 
					    class : "img",
					    width : 30, 
					    id : "editTomatoe"+i, 
					    onclick : "swapOnUpdate(id)",
					}));
				}
				$('#editPomodoros').append($('<img>', { 
				    src : "tomato-grey.png", 
				    class : "img",
				    width : 30, 
				    id : "editTomatoe"+countView, 
				    onclick : "swapOnUpdate(id)",
				}));

			break;


			case "cancelUpdateTask":
				createtaskname.value = "";
				createtaskdesc.value = "";
				deleteElementChilds("editPomodoros");
				countView = 0;
			break;
			case "cancelCreateTask":
				createtaskname.value = "";
				createtaskdesc.value = "";
				for(h = countView; h > 0; --h){
			   		var d = document.getElementById('allPomodoros');
			   		var tomatoRemove =  document.getElementById("Pomodoro"+(h));
			   		d.removeChild(tomatoRemove);	   	    
			    }
			    document.getElementById("Pomodoro0").src = "tomato-grey.png";
			    countView = 0;
			break;

			case "swapOnCreateAdd":	
		   		document.getElementById("Pomodoro"+(countView)).src = "tomato.png";	
		   		++countView;
				$('#allPomodoros').append($('<img>', { 
				    src : "tomato-grey.png", 
				    class : "img",
				    width : 30, 
				    id : "Pomodoro"+countView, 
				    onclick : "swapOnCreate(id)",
				}));
			break;
			case "swapOnCreateDelete":
				document.getElementById("Pomodoro"+(countView-1)).src = "tomato-grey.png";
		   		var d = document.getElementById('allPomodoros');
		   		var tomatoRemove =  document.getElementById("Pomodoro"+(countView));
		   		d.removeChild(tomatoRemove);
		   	    --countView;
			break;
			case "swapOnUpdateAdd":
				document.getElementById("editTomatoe"+countView).src = "tomato.png";
				++countView;	
				$('#editPomodoros').append($('<img>', { 
				    src : "tomato-grey.png", 
				    class : "img",
				    width : 30, 
				    id : "editTomatoe"+countView, 
				    onclick : "swapOnUpdate(id)",
				}));
				
			break;
			case "swapOnUpdateDelete":
				document.getElementById("editTomatoe"+(countView-1)).src = "tomato-grey.png";
		   		var d = document.getElementById('editPomodoros');
		   		var tomatoRemove =  document.getElementById("editTomatoe"+(countView));
		   		d.removeChild(tomatoRemove);
		   	    --countView;
			break; 

			case "deleteTask":
				deleteElementChilds("accordion");
				updateAccordion("accordion");
				this.editTaskButton = container.find(".editTaskButton");
				this.deleteTaskButton = container.find(".deleteTaskButton");
				PlannerViewController(this,model);
			break;

			case "noPomodorosSelected":
	                $("#success-alert").alert();
	                $("#success-alert").fadeTo(700, 500).slideUp(300);
				
			break;
			case "removeTaskWindows":
				$('#createModal').modal('toggle');
			break;
		}
		$( "#dragDrop" ).sortable({
		    connectWith: "#accordion"
		});


		//
	}

	
	deleteElementChilds = function(id){
		var deleteItem = document.getElementById(id); 
	 	 // Get the <ul> element with id="myList"
	 	 if(deleteItem != null){
			while (deleteItem.firstChild){
				 deleteItem.removeChild( deleteItem.firstChild );

			}
		}
	}
	updateAccordion = function(idAccordion){
		
		var list;
		var $newPanel;
		if(idAccordion == "accordion"){
			list = model.getRequestedTasks("unfinished");
		}
		else if (idAccordion == "accordionFinish"){
			list = model.getRequestedTasks("finished");
		}
		for(i=0;i<list.length;i++){ 
			if(idAccordion == "accordion") $newPanel = $templateNotFinish.clone();
			else  if (idAccordion == "accordionFinish") $newPanel = $templateFinish.clone();
			//for every task we create a new entry in the accordion
			//add the task name on the view
			$newPanel.find(".accordion-toggle").attr("href",  "#" + list[i].id);
			$newPanel.find(".text").text(list[i].name);
			$newPanel.find(".glyphicon-plus").removeClass("glyphicon-minus").addClass("glyphicon-plus");
		    //$newPanel.attr("value",i) ;
		    //add the task description when click on the name to display
			$newPanel.find(".panel-collapse").attr("id", list[i].id).addClass("collapse").removeClass("in");
			$newPanel.find(".details").text("DESCRIPTION");
			$newPanel.find(".description").text(list[i].desc);
			$newPanel.find(".PomodoriLabel").text("POMODORI");
			$newPanel.find(".pomodoriImage").attr("id", list[i].id);
			for(j = 0; j < list[i].numberofPomodoros; ++j){
				$newPanel.find("#pomodoriImage").append($('<img>', { 
				    src : "tomato.png", 
				    class : "img",
				    width : 30, 
				    id : "imagePomodoro"+j, 
				}));
			}

			$newPanel.find(".panel-title").attr("taskID", list[i].id);
			//add to general view
			$("#"+idAccordion).append($newPanel.fadeIn());
		}
	}

}
	