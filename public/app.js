var sampleApp = angular.module('sampleApp', []);


sampleApp.config(['$routeProvider',
  function($routeProvider) {
	  
	$routeProvider
		.when('/', {
			templateUrl: 'pages/phonechanger.html',
			controller: 'mainController'
		})
		.when('/home', {
			templateUrl: 'pages/home.html',
			controller: 'showhomepagecontroller'
		});
}]);


sampleApp.controller('showhomepagecontroller', function($scope, $routeParams) {
	
	alert('nailed it');
	$.ajax({
		url: "/fetch",
		method: "get",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function(data) {
			alert(JSON.stringify(data.rows));
		},
		error: function(err) {
			errorMessage.text(err.responseJSON.error);
			error.show();
		}
	});
});

sampleApp.controller('mainController', function($scope, $routeParams) {

	
});
