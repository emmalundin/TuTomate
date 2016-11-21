$(function() {
	//We instantiate our model
	var model = new Model();
	
	//And create the needed controllers and views
	var settingsView = new SettingsView(model,$("#settingsView"));
	var settingsViewController = new SettingsViewController(settingsView,model);

	var plannerView = new PlannerView(model,$("#plannerView"));
	var plannerViewController = new PlannerViewController(plannerView,model);
	
	var statsView = new StatsView(model,$("#statsView"));
	var statsViewController = new StatsViewController(statsView,model);

	var statsDetailsView = new StatsDetailsView(model,$("#statsDetailsView"));
	var statsDetailsViewController = new StatsDetailsViewController(statsDetailsView,model);

	var timerView = new TimerView(model,$("#timerView"));
	var timerViewController = new TimerViewController(timerView,model);

});