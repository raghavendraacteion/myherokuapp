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
	        .when('/slotbookingpage/:conid', {
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
	var stts = 'Confirmed';
	var connid = $routeParams.conid;
	var hmstrLink = "#home/" + $routeParams.conid;
        var sltstrLink = "#slotbookingpage/" + $routeParams.conid;
	document.getElementById("lgid").setAttribute("href",hmstrLink);
	document.getElementById("hmid").setAttribute("href",hmstrLink);
        document.getElementById("stid").setAttribute("href",sltstrLink);
	//alert('nailed it');
	$.ajax({
		url: "/fetchslots",
		method: "post",
		data: JSON.stringify({
			conid: connid,
			sts: stts,
		}),
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function(data) {
			//alert(JSON.stringify(data.rows));
			var rowss = data.rows;
		        //alert(rowss[0].slot_start_time__c);
			//alert(rowss);
			$scope.slotss = rowss;
			$scope.testd = rowss[0].slot_start_time__c;
			var listItemsHtml = '';
			for(var i=0; i < rowss.length; i++)
			{
			      alert('1');
				var schstarttime = new Date(rowss[i].slot_start_time__c);
			      schstarttime.setHours( schstarttime.getHours() -7 );
				alert(schstarttime);
			      var schendtime = new Date(rowss[i].slot_end_time__c);
			      schendtime.setHours( schendtime.getHours() -7 );
			      var sttm;
			      var endtm;
			      var atslst = schstarttime.split("T");
			      if(schstarttime.getHours() == 0)
			      {
				   sttm = '12 AM';  
			      }
			      else if(schstarttime.getHours() < 12)
			      {
				   sttm = schstarttime.getHours()+' AM';
			      }
			      else if(schstarttime.getHours() == 12)
			      {
				    sttm = '12 PM';
			      }
			      else
			      {
				  var temp = schstarttime.getHours()-12;
				  sttm = temp+' PM'
			      }
				alert(sttm);
			      if(schendtime.getHours() == 0)
			      {
				   endtm = '12 AM';  
			      }
			      else if(schendtime.getHours() < 12)
			      {
				   endtm = schendtime.getHours()+' AM';
			      }
			      else if(schendtime.getHours() == 12)
			      {
				    endtm = '12 PM';
			      }
			      else
			      {
				  var temp = schendtime.getHours()-12;
				  endtm = temp+' PM'
			      }
			      var tttme = atslst[0]+' '+sttm+' -- '+endtm;
				
			      listItemsHtml += ('<tr><td style="width:20%" ><div title="">'+rowss[i].name+'</div></td><td style="width:20%" ><div>&nbsp;'+tttme+'</div></td><td style="width:24%" ><div title="">'+rowss[i].slot_start_time__c+'</div></td><td style="width:24%" ><div title="">'+rowss[i].slot_start_time__c+'</div></td><td style="width:12%" scope="col"><div title="">'+rowss[i].status__c+'</div></td></tr>');
			}
			document.querySelector('#sltsdivv').innerHTML = listItemsHtml;
			//alert($scope.slotss);
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
