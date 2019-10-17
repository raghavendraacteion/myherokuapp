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
			alert(JSON.stringify(data.rows));
		/*	var rowss = data.rows;
			$scope.slotss = rowss;
			$scope.testd = rowss[0].slot_start_time__c;
			var listItemsHtml = '';
			for(var i=0; i < rowss.length; i++)
			{
			      var schstarttime = new Date(rowss[i].slot_start_time__c);
			      schstarttime.setHours( schstarttime.getHours() -7 );
			      var scstrstrng = schstarttime.toUTCString();
			      var scstrlstt = scstrstrng.split(" ");
			      var scstrlstrttmelst = scstrlstt[4].split(":");
			      var schendtime = new Date(rowss[i].slot_end_time__c);
			      schendtime.setHours( schendtime.getHours() -7 );
			      var schendstrng = schendtime.toUTCString();
			      var schendstrnglst = schendstrng.split(" ");
			      var schdendtmlstt = schendstrnglst[4].split(":");
			      var sttm;
			      var endtm;
			     
			      if(parseInt(scstrlstrttmelst[0]) == 0)
			      {
				   sttm = '12 AM';  
			      }
			      else if(parseInt(scstrlstrttmelst[0]) < 12)
			      {
				   sttm = scstrlstrttmelst[0]+' AM';
			      }
			      else if(parseInt(scstrlstrttmelst[0]) == 12)
			      {
				    sttm = '12 PM';
			      }
			      else
			      {
				  var temp = parseInt(scstrlstrttmelst[0])-12;
				  sttm = temp+' PM'
			      }
				alert(sttm);
			      if(parseInt(schdendtmlstt[0]) == 0)
			      {
				   endtm = '12 AM';  
			      }
			      else if(parseInt(schdendtmlstt[0]) < 12)
			      {
				   endtm = schdendtmlstt[0]+' AM';
			      }
			      else if(parseInt(schdendtmlstt[0]) == 12)
			      {
				    endtm = '12 PM';
			      }
			      else
			      {
				  var temp = parseInt(schdendtmlstt[0])-12;
				  endtm = temp+' PM'
			      }
			      var tttme = scstrlstt[1]+' '+scstrlstt[2]+', '+scstrlstt[3]+' '+sttm+' -- '+endtm;
				
			      listItemsHtml += ('<tr><td style="width:20%" ><div title="">'+rowss[i].name+'</div></td><td style="width:20%" ><div>&nbsp;'+tttme+'</div></td><td style="width:24%" ><div title="">'+rowss[i].slot_start_time__c+'</div></td><td style="width:24%" ><div title="">'+rowss[i].slot_start_time__c+'</div></td><td style="width:12%" scope="col"><div title="">'+rowss[i].status__c+'</div></td></tr>');
			}
			document.querySelector('#sltsdivv').innerHTML = listItemsHtml;  */
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
