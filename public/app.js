var sampleApp = angular.module('sampleApp', []);


sampleApp.config(['$routeProvider',
  function($routeProvider) {
	  
	$routeProvider
		.when('/', {
			templateUrl: 'pages/login.html',
			controller: 'mainController'
		})
	  	.when('/forgotpassword', {
			templateUrl: 'pages/forgotpage.html',
			controller: 'showforgotpagecontroller'
		})
	  	.when('/signup', {
			templateUrl: 'pages/register.html',
			controller: 'showsignuppagecontroller'
		})
	        .when('/slotbookingpage', {
			templateUrl: 'pages/slot_booking_page.html',
			controller: 'showslobookpageecontroller'
		})
		.when('/home/:conid', {
			templateUrl: 'pages/home.html',
			controller: 'showhomepagecontroller'
		});
}]);


sampleApp.controller('showhomepagecontroller', function($scope, $routeParams) {
	    
	var hmstrLink = "#home/" + $routeParams.conid;
        var sltstrLink = "#slotbookingpage/" + $routeParams.conid;
	document.getElementById("lgid").setAttribute("href",hmstrLink);
	document.getElementById("hmid").setAttribute("href",hmstrLink);
        document.getElementById("stid").setAttribute("href",sltstrLink);

});

sampleApp.controller('mainController', function($scope, $routeParams) {

	
});

sampleApp.controller('showslobookpageecontroller', function($scope, $routeParams) {
	
	//alert('nailed it');
	$.ajax({
		url: "/fetch",
		method: "get",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function(data) {
			//alert(JSON.stringify(data.rows));
		},
		error: function(err) {
			errorMessage.text(err.responseJSON.error);
			error.show();
		}
	});
	
});

sampleApp.controller('showforgotpagecontroller', function($scope, $routeParams) {

	
});


sampleApp.controller('showsignuppagecontroller', function($scope, $routeParams) {

	
});
