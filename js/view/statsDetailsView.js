var StatsDetailsView = function (model,container) {
	


	model.addObserver(this);


	this.finishedTable = container.find("#finishedTable");
	this.backToStatsButton = container.find("#backToStatsButton");

	this.update = function(message){
			console.log("updateStats");

			//get all finished tasks from model
			var finishedTasks = model.getRequestedTasks("finished");

			if(finishedTasks.length<1){
				console.log("there are no finished tasks");
			}
			else{ 
				//the outer statical part of the table
				var outerHTML =     
			    "<table class='table table-hover'>"+
			      "<caption>Finished Tasks</caption>"+
			      "<thead>"+
			        "<tr>" + 
			          "<th>#</th>" + 
			          "<th>Task</th>" +
			          "<th>Pomodoros</th>" +
			          "<th>Time</th>" +
			        "</tr>" +
			      "</thead>" +
			      "<tbody id='detailsTable'>" +
			      "</tbody>" +
			    "</table>";

			    //insert it to the view
			    this.finishedTable.html(outerHTML);

			    //fill the table dynamically from the list of finished tasks
				for(var i=0;i<finishedTasks.length;i++){

					var tr = document.createElement("tr");
					var th = document.createElement("th");
					th.scope = "row";
					var thtext = document.createTextNode(i+1);

					th.appendChild(thtext);
					tr.appendChild(th);

					var td = document.createElement("td");
					var tdtext = document.createTextNode(finishedTasks[i].name);
					td.appendChild(tdtext);
					tr.appendChild(td);

					console.log(finishedTasks[i].numberofPomodoros);
					var td = document.createElement("td");

					for (e=0 ; e<finishedTasks[i].numberofPomodoros ; e++) {
						var tomato = document.createElement("img");
						tomato.setAttribute("src", "tomato.png");
						tomato.setAttribute("width", "30");
						td.appendChild(tomato);
					}


	

					tr.appendChild(td);

					var td = document.createElement("td");
					var tdtext = document.createTextNode(finishedTasks[i].endtime - finishedTasks[i].startime);
					td.appendChild(tdtext);
					tr.appendChild(td);




					document.getElementById("detailsTable").appendChild(tr);
			


				}

		
			}
	}
}