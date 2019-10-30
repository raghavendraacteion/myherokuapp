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
			controller: 'selectdeptpagecontroller11'
		})
	        .when('/calendarpage/:reqids', {
			templateUrl: 'pages/calendar_page.html',
			controller: 'calendarpagecontroller11'
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
			//errorMessage.text(err.responseJSON.error);
			//error.show();
			alert(err.responseJSON.error);
		}
	});
});

sampleApp.controller('selectdeptpagecontroller11', function($scope, $routeParams) {

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
			$.ajax({
				url: "/fetchallsubdepartmentss",
				method: "get",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function(data1) {
				     var subdeptrows = data1.rows;
				     $("#subdeptdivv").data(subdeptrows);
				},
				error: function(err) {
				     alert(err.responseJSON.error);
				}
			});
		},
		error: function(err) {
			alert(err.responseJSON.error);
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
			//errorMessage.text(err.responseJSON.error);
			//error.show();
			alert(err.responseJSON.error);
		}
	});
	
});


sampleApp.controller('showslobookpageecontroller11', function($scope, $routeParams) {
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
	$.ajax({
		url: "/fetchonlyslots",
		method: "post",
		data: JSON.stringify({
			conid: connid,
			sts: stts,
		}),
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function(data) {
	         	var sltrowss = data.rows;
			$.ajax({
				url: "/fetchappointmentbookngs",
				method: "post",
				data: JSON.stringify({
					conid: connid,
				}),
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function(data1) {
					var aptrowss = data1.rows;
					var aptmapp = {};
					for(var i=0; i < aptrowss.length; i++)
					{
					    aptmapp[aptrowss[i].sfid] = aptrowss[i];
					}
					$.ajax({
						url: "/fetchdepartmentss",
						method: "get",
						contentType: "application/json; charset=utf-8",
						dataType: "json",
						success: function(data2) {
							var deptrows = data2.rows;
							var deptmapp = {};
							for(var i=0; i < deptrows.length; i++)
							{
							    deptmapp[deptrows[i].sfid] = deptrows[i];
							}
							$.ajax({
								url: "/fetchallsubdepartmentss",
								method: "get",
								contentType: "application/json; charset=utf-8",
								dataType: "json",
								success: function(data3) {
									var subdeptrows = data3.rows;
									var subdeptmapp = {};
									var subdeptmapp2 = new Map();
									for(var i=0; i < subdeptrows.length; i++)
									{
										subdeptmapp[subdeptrows[i].sfid] = subdeptrows[i];
										subdeptmapp2.set(subdeptrows[i].sfid, subdeptrows[i]);
									}
									var listItemsHtml = '';
									for(var i=0; i < sltrowss.length; i++)
									{
										var schstarttime = new Date(sltrowss[i].slot_start_time__c);
										schstarttime.setHours( schstarttime.getHours() -7 );
										var scstrstrng = schstarttime.toUTCString();
										var scstrlstt = scstrstrng.split(" ");
										var scstrlstrttmelst = scstrlstt[4].split(":");
										var schendtime = new Date(sltrowss[i].slot_end_time__c);
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
										var tttme = scstrlstt[1]+' '+scstrlstt[2]+', '+scstrlstt[3]+' '+sttm+' to '+endtm;
										var snglitem = {};
										var tempaptbk = aptmapp[sltrowss[i].appointment_booking__c];
										var tempdept = deptmapp[tempaptbk.department__c];
										var tempsltnme = sltrowss[i].name;
										var sltnmeee = tempsltnme.split("_");
										snglitem.sltname = sltnmeee[0];
										snglitem.deptname = tempdept.name;
										if(subdeptmapp2.has(tempaptbk.sub_department__c)) 
										{
											var tempsubdept = subdeptmapp[tempaptbk.sub_department__c];
											snglitem.subdeptname = tempsubdept.name;
										} 
										else
										{
											snglitem.subdeptname = '-';
										}  
										snglitem.slttme = tttme;
										snglitem.statuss = tempaptbk.status__c;
										listItemsHtml += ('<tr><td style="width:20%" ><div title="">'+sltnmeee[0]+'</div></td><td style="width:20%" ><div>&nbsp;'+tttme+'</div></td><td style="width:24%" ><div title="">'+tempdept.name+'</div></td><td style="width:24%" ><div title="">'+snglitem.subdeptname+'</div></td><td style="width:12%" scope="col"><div title="">'+tempaptbk.status__c+'</div></td></tr>');
									}
									document.querySelector('#sltsdivv').innerHTML = listItemsHtml;  
								},
								error: function(err3) {
									alert(err3.responseJSON.error);
								}
							});
						},
						error: function(err2) {
							alert(err2.responseJSON.error);
						}
					});
				},
				error: function(err1) {
					alert(err1.responseJSON.error);
				}
			});
		},
		error: function(err) {
			alert(err.responseJSON.error);
		}
	});
	
});


sampleApp.controller('calendarpagecontroller', function($scope, $routeParams) {
	document.querySelector('#subdeptlabel').style.display = "none";
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
			listItemsHtml += ('<span class="glyphicon glyphicon-pencil" style="cursor: pointer;" onclick="editdeprtmnt()" id="deptitlediv" data-id="'+allids+'"></span><div style="width:100%;height:1px;border-bottom: 1px #dddbda solid;"></div>');
			document.querySelector('#deptmntdivv').innerHTML = listItemsHtml; 
		},
		error: function(err) {
			alert(err.responseJSON.error);
		}
	});
	
	if(idslst.length > 2)
	{
		document.querySelector('#subdeptlabel').style.display = "block";
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
				listItemsHtml += ('<span class="glyphicon glyphicon-pencil" style="cursor: pointer;" onclick="editdeprtmnt()" id="subdepttitlediv" data-id="'+allids+'"></span><div style="width:100%;height:1px;border-bottom: 1px #dddbda solid;"></div>');
				document.querySelector('#subbdeptmntdivv').innerHTML = listItemsHtml;
			},
			error: function(err) {
				alert(err.responseJSON.error);
			}
		});   
	}
});


sampleApp.controller('calendarpagecontroller11', function($scope, $routeParams) {
	document.querySelector('#subdeptlabel').style.display = "none";
	var allids = $routeParams.reqids;
	var idslst = allids.split("_");
	var hmstrLink = "#home/" + idslst[0];
        var sltstrLink = "#slotbookingpage/" + idslst[0];
	document.getElementById("lgid").setAttribute("href",hmstrLink);
	document.getElementById("hmid").setAttribute("href",hmstrLink);
        document.getElementById("stid").setAttribute("href",sltstrLink);
	var d = new Date();
	var d1 = new Date(d);
	var diff = d.getDate() - d.getDay() + (d.getDay() === 0 ? -6 : 1);
	var wkstrtdt = new Date(d1.setDate(diff+7));
	var wkstrday = wkstrtdt.getDate();
	var stdtrstrng = wkstrtdt.toString();
	var strtdtlst = stdtrstrng.split(' ');
	var strtstrng = strtdtlst[1]+' '+ strtdtlst[2];
	if(strtdtlst[2].startsWith("0"))
	{
		strtstrng = strtdtlst[1]+' '+ strtdtlst[2].slice(1); 
	}
	var wkenddt = new Date(wkstrtdt.setDate(wkstrday+6));
	var enddtstrng = wkenddt.toString();
	var enddtlst = enddtstrng.split(' ');
	var endstrng = enddtlst[1]+' '+ enddtlst[2];
	var dtrangestrng = strtstrng+'  to  '+endstrng;
	var ttlstrng = dtrangestrng+', '+wkenddt.getFullYear();
	document.getElementById("clndrhedngspan").textContent= ttlstrng;
	document.getElementById("schdlrrangehdngspn").textContent= ttlstrng;
	var oprtnghours;
	var appointbookings;
	
	if(idslst.length > 2)
	{
		$.ajax({
			url: "/fetchappointmentbbokingsforclndr",
			method: "post",
			data: JSON.stringify({
			    conid: idslst[0],
			    dept: idslst[1],	
			    subdept: idslst[2],
			    dateerng: dtrangestrng,
			}),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(data) {
				appointbookings = data.rows;
				alert('dtstrng '+dtrangestrng);
				alert(appointbookings[0].appointment_week__c);
			},
			error: function(err) {
				alert(err.responseJSON.error);
			}
		});
	}
	
	if(idslst.length == 2)
	{
		$.ajax({
			url: "/fetchappointmentbbokingsforclndrwithoutsubdept",
			method: "post",
			data: JSON.stringify({
			    conid: idslst[0],
			    dept: idslst[1],	
			    dateerng: dtrangestrng,
			}),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(data) {
				appointbookings = data.rows;
				alert('dtstrng '+dtrangestrng);
				alert(appointbookings[0].appointment_week__c);
			},
			error: function(err) {
				alert(err.responseJSON.error);
			}
		});
	}
	
	$.ajax({
		url: "/fetchoperatinghours",
		method: "get",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function(data) {
			oprtnghours = data.rows;
			$("#hrdsplytr").data(oprtnghours);
		},
		error: function(err) {
			alert(err.responseJSON.error);
		}
	});
	
	$.ajax({
		url: "/fetchdepartmentss",
		method: "get",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function(data) {
			var rowss = data.rows;
			var listItemsHtml = '';
			for(var i=0; i < rowss.length; i++)
			{
			      if(rowss[i].sfid === idslst[1])
			      {
				   listItemsHtml += ('<span style="font-size:13px;font-weight:bold;">'+rowss[i].name+'</span>&nbsp;&nbsp;&nbsp;&nbsp;');
			      }
			}
			listItemsHtml += ('<span class="glyphicon glyphicon-pencil" style="cursor: pointer;" onclick="editdeprtmnt11()" id="deptitlediv" data-id="'+allids+'"></span><div style="width:100%;height:1px;border-bottom: 1px #dddbda solid;"></div>');
			document.querySelector('#deptmntdivv').innerHTML = listItemsHtml; 
			$("#deptmntdivv").data(rowss);
			$('#maindiv').data('id',allids);
		},
		error: function(err) {
			alert(err.responseJSON.error);
		}
	});
	
	$.ajax({
		url: "/fetchallsubdepartmentss",
		method: "get",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function(data) {
			var rowss = data.rows;
			if(idslst.length > 2)
			{
				var listItemsHtml = '';
				for(var i=0; i < rowss.length; i++)
				{
				      if(rowss[i].sfid === idslst[2])
				      {
					   listItemsHtml += ('<span style="font-size:13px;font-weight:bold;">'+rowss[i].name+'</span>&nbsp;&nbsp;&nbsp;&nbsp;');
				      }
				}
				listItemsHtml += ('<span class="glyphicon glyphicon-pencil" style="cursor: pointer;" onclick="editdeprtmnt11()" id="subdepttitlediv" data-id="'+allids+'"></span><div style="width:100%;height:1px;border-bottom: 1px #dddbda solid;"></div>');
				document.querySelector('#subdeptlabel').style.display = "block";
				document.querySelector('#subbdeptmntdivv').innerHTML = listItemsHtml;
			}
			$("#subbdeptmntdivv").data(rowss);
		},
		error: function(err) {
			alert(err.responseJSON.error);
		}
	});   
	
});


sampleApp.controller('showforgotpagecontroller', function($scope, $routeParams) {

	
});


sampleApp.controller('showsignuppagecontroller', function($scope, $routeParams) {

	
});
