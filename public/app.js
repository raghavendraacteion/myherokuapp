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
	        .when('/selectdeptpage/:conid', {
			templateUrl: 'pages/sel_dept_page.html',
			controller: 'selectdeptpagecontroller'
		})
	        .when('/calendarpage/:reqids', {
			templateUrl: 'pages/calendar_page.html',
			controller: 'calendarpagecontroller'
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


sampleApp.controller('selectdeptpagecontroller', function($scope, $routeParams) {

	var hmstrLink = "#home/" + $routeParams.conid;
        var sltstrLink = "#slotbookingpage/" + $routeParams.conid;
	document.getElementById("lgid").setAttribute("href",hmstrLink);
	document.getElementById("hmid").setAttribute("href",hmstrLink);
        document.getElementById("stid").setAttribute("href",sltstrLink);
	
	$.ajax({
		url: "/fetchdepartmentss",
		method: "get",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function(data) {
			//alert(JSON.stringify(data));
	         	var rowss = data.rows;
			var listItemsHtml = '';
			listItemsHtml += ('<span class="labelclass">Department</span><br/><select id="depcomp" class="selcttagstyl" onchange="report(this.value)" name="department"><option value="None">--None--</option>');
			for(var i=0; i < rowss.length; i++)
			{
			      listItemsHtml += ('<option value="'+rowss[i].sfid+'">'+rowss[i].name+'</option>');
			}
			listItemsHtml += ('</select><br/>');
			document.querySelector('#deptdivv').innerHTML = listItemsHtml;  
		},
		error: function(err) {
			errorMessage.text(err.responseJSON.error);
			error.show();
		}
	});
});

sampleApp.controller('showslobookpageecontroller', function($scope, $routeParams) {
	var hghttt = window.screen.height;
	var temphtt = parseInt(hghttt)-415;
	document.querySelector('#slotsstablediv').style.height = temphtt+"px";
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
			//alert(JSON.stringify(data));
	         	var rowss = data;
			var listItemsHtml = '';
			for(var i=0; i < rowss.length; i++)
			{
			      listItemsHtml += ('<tr><td style="width:20%" ><div title="">'+rowss[i].sltname+'</div></td><td style="width:20%" ><div>&nbsp;'+rowss[i].slttme+'</div></td><td style="width:24%" ><div title="">'+rowss[i].deptname+'</div></td><td style="width:24%" ><div title="">'+rowss[i].subdeptname+'</div></td><td style="width:12%" scope="col"><div title="">'+rowss[i].statuss+'</div></td></tr>');
			}
			document.querySelector('#sltsdivv').innerHTML = listItemsHtml;  
		},
		error: function(err) {
			errorMessage.text(err.responseJSON.error);
			error.show();
		}
	});
	
});

sampleApp.controller('calendarpagecontroller', function($scope, $routeParams) {
	var allids = $routeParams.reqids;
	var idslst = allids.split("_");
	var hmstrLink = "#home/" + idslst[0];
        var sltstrLink = "#slotbookingpage/" + idslst[0];
	document.getElementById("lgid").setAttribute("href",hmstrLink);
	document.getElementById("hmid").setAttribute("href",hmstrLink);
        document.getElementById("stid").setAttribute("href",sltstrLink);
	
	$.ajax({
		url: "/fetchdeptname",
		method: "post",
		data: JSON.stringify({
		    seldept: idslst[1],
		}),
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function(data) {
			//alert(JSON.stringify(data));
			var rowss = data.rows;
			var listItemsHtml = '';
			listItemsHtml += ('<span style="font-size:13px;font-weight:bold;">'+rowss[0].name+'</span>&nbsp;&nbsp;&nbsp;&nbsp;');
			listItemsHtml += ('<span class="glyphicon glyphicon-pencil"></span><div style="width:100%;height:1px;border-bottom: 1px #dddbda solid;"></div>');
			document.querySelector('#deptmntdivv').innerHTML = listItemsHtml; 
		},
		error: function(err) {
			alert(err.responseJSON.error);
		}
	});
	
	if(idslst.length > 2)
	{
		$.ajax({
			url: "/fetchsubdeptname",
			method: "post",
			data: JSON.stringify({
			    selsubdept: idslst[2],
			}),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(data) {
				//alert(JSON.stringify(data));
				var rowss = data.rows;
				var listItemsHtml = '';
				listItemsHtml += ('<span style="font-size:13px;font-weight:bold;">'+rowss[0].name+'</span>&nbsp;&nbsp;&nbsp;&nbsp;');
				listItemsHtml += ('<span class="glyphicon glyphicon-pencil"></span><div style="width:100%;height:1px;border-bottom: 1px #dddbda solid;"></div>');
				document.querySelector('#subbdeptmntdivv').innerHTML = listItemsHtml;
			},
			error: function(err) {
				alert(err.responseJSON.error);
			}
		});   
	}
});


sampleApp.controller('showforgotpagecontroller', function($scope, $routeParams) {

	
});


sampleApp.controller('showsignuppagecontroller', function($scope, $routeParams) {

	
});
