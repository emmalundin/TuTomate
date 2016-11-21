var PlannerViewController = function(view, model ) {

	var activeID = null;
	var count = 0;
	//var activeElement = null;
	
	view.createTaskButton.unbind().click(function(){
		console.log("createTaskButton");
		if(count == 0) {
			view.update("noPomodorosSelected");
			console.log("No pomodoros selected, choose at least one!");
		}
		else {
			view.update("deleteAccordion");
			model.createTask(createtaskname.value,createtaskdesc.value, count,true);	  
		   	count = 0;
		   	view.update("removeTaskWindows");	   
		}

	});

	view.updateTaskButton.unbind().click(function(){
		console.log("updateTaskButton");
		view.update("deleteAccordion");
		model.editTask(activeID,edittaskname.value,edittaskdesc.value,count,true);
		count = 0;
		view.update("updateTask");

		model.unsetEditingTask(activeID);
	
	});



	view.cancelTaskButton.click(function(){
		console.log("cancelTaskButton");
		count = 0;
		view.update("cancelCreateTask");
		
	});

	view.cancelUpdateButton.click(function(){
		console.log("cancelUpdateButton");
		count = 0;
		view.update("cancelUpdateTask");
		
	});


	

	view.editTaskButton.unbind().click(function(x){
			console.log("editTaskButton");
			activeID = x.target.parentElement.parentElement.getAttribute("taskID");
			count =  model.getTask(activeID).numberofPomodoros;
			model.setEditingTask(activeID);
			view.update("EditingTask");	
	});

	view.deleteTaskButton.unbind().click(function(x){
		console.log("deleteTaskButton");
		model.deleteTask(x.target.parentElement.parentElement.getAttribute("taskID"));
		view.update("deleteTask");
	});


	swapOnCreate = function(id){
		if (document.getElementById(id).src.endsWith("tomato-grey.png") && id == ("Pomodoro"+(count))) 
	   { 		
	   		++count;
	   		view.update("swapOnCreateAdd"); 					
				
	   } 
	   else if (document.getElementById(id).src.endsWith("tomato.png")&& id == ("Pomodoro"+(count-1)))
	   {  
	   		--count;
	   		view.update("swapOnCreateDelete");   
	   }

	}

	swapOnUpdate = function(id){
		

		
		if (document.getElementById(id).src.endsWith("tomato-grey.png") && id == ("editTomatoe"+(count))) 
	   { 
			++count;
			view.update("swapOnUpdateAdd"); 			
				
	   } 
	   else if (document.getElementById(id).src.endsWith("tomato.png")&& id == ("editTomatoe"+(count-1)))
	   {  
	   	    --count;
	   	    view.update("swapOnUpdateDelete");
	   	    
	   }


	}

	view.accordion.ready(function(){
		$("#accordion").sortable({
	   		start: function(event, ui) {
		        ui.item.startPos = ui.item.index();
		    },
	    	stop: function(event, ui) {
	    		var list = model.getRequestedTasks("all");
	    	    model.editTaskPriority(ui.item.index(),ui.item.startPos,list[ui.item.startPos].id);
	    	    list = model.getRequestedTasks("all");
	    	    for(var i = 0; i < list.length; i++){
	 				console.log(list[i].name+ " ");
		 		}

		    }
		});
		$('.collapse').on('shown.bs.collapse', function(){
			$(this).parent().find(".glyphicon-plus").removeClass("glyphicon-plus").addClass("glyphicon-minus");
			}).on('hidden.bs.collapse', function(){
				$(this).parent().find(".glyphicon-minus").removeClass("glyphicon-minus").addClass("glyphicon-plus");
			});
	});


	}