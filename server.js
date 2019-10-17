var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');

var app = express();

app.set('port', process.env.PORT || 5000);

app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/update', function(req, res) {
    pg.connect(process.env.DATABASE_URL, function (err, conn, done) {
        // watch for any connect issues
        if (err) console.log(err);
        conn.query(
            'UPDATE salesforce.Contact SET Phone = $1, HomePhone = $1, MobilePhone = $1, Title = $5 WHERE LOWER(FirstName) = LOWER($2) AND LOWER(LastName) = LOWER($3) AND LOWER(Email) = LOWER($4)',
            [req.body.phone.trim(), req.body.firstName.trim(), req.body.lastName.trim(), req.body.email.trim(), req.body.title.trim()],
            function(err, result) {
                if (err != null || result.rowCount == 0) {
                  conn.query('INSERT INTO salesforce.Contact (Phone, MobilePhone, FirstName, LastName, Email, Title) VALUES ($1, $2, $3, $4, $5, $6)',
                  [req.body.phone.trim(), req.body.phone.trim(), req.body.firstName.trim(), req.body.lastName.trim(), req.body.email.trim(), req.body.title.trim()],
                  function(err, result) {
                    done();
                    if (err) {
                        res.status(400).json({error: err.message});
                    }
                    else {
                        // this will still cause jquery to display 'Record updated!'
                        // eventhough it was inserted
                        res.json(result);
                    }
                  });
                }
                else {
                    done();
                    res.json(result);
                }
            }
        );
    });
});

app.get('/fetch', function(req, res) {
    pg.connect(process.env.DATABASE_URL, function (err, conn, done) {
        // watch for any connect issues
        if (err) console.log(err);
		conn.query(
			'SELECT Email, LastName FROM salesforce.Contact',
			function(err, result) {
				if (err) {
					res.status(400).json({error: err.message});
				}
				else {
					res.json(result);
				}
			}
		);
    });
});

app.post('/fetchslots', function(req, res) {
    pg.connect(process.env.DATABASE_URL, function (err, conn, done) {
        // watch for any connect issues
        if (err) console.log(err);
		conn.query(
			'SELECT Name, Id,sfid, Slot_End_Time__c, Slot_Start_Time__c, Appointment_Booking__c, Status__c, Student__c FROM salesforce.Slot__c WHERE LOWER(Student__c) = LOWER($1) AND LOWER(Status__c) = LOWER($2) ORDER BY Slot_Start_Time__c DESC',
			[req.body.conid.trim(), req.body.sts.trim()],
			function(err, result) {
				if (err) {
					res.status(400).json({error: err.message});
				}
				else {
					var sltrowss = result.rows;
					conn.query(
						'SELECT Name, Id,sfid, Department__c, Sub_Department__c, Scheduled_Start_Time__c, Status__c, Student__c FROM salesforce.Appointment_Booking__c WHERE LOWER(Student__c) = LOWER($1) ORDER BY Scheduled_Start_Time__c DESC',
						[req.body.conid.trim()],
						function(err1, result1) {
							if (err1) {
								res.status(400).json({error: err1.message});
							}
							else {
								var aptrowss = result1.rows;
								var depids = [];
								var subdepids = [];
								var aptmapp = {};
								for(var i=0; i < aptrowss.length; i++)
								{
									depids.push(aptrowss[i].department__c);
									subdepids.push(aptrowss[i].sub_department__c);
									aptmapp[aptrowss[i].sfid] = aptrowss[i];
								}
								//res.json(aptmapp);
							 	conn.query(
									'SELECT Name, Id,sfid FROM salesforce.Department__c WHERE sfid IN $1',
									[depids],
									function(err2, result2) {
										if (err2) {
											res.status(400).json({error: err2.message});
										}
										else {
											res.json(result2);
										}
									}
								); 
							}
						}
					);
				}
			}
		);
    });
});

app.post('/performlogin', function(req, res) {
    pg.connect(process.env.DATABASE_URL, function (err, conn, done) {
        // watch for any connect issues
        if (err) console.log(err);
		conn.query(
			'SELECT Email, Id,sfid, Password__c, Password_Dup__c FROM salesforce.Contact WHERE LOWER(Email) = LOWER($1)',
			[req.body.email.trim()],
			function(err, result) {
				if (err) {
					res.status(400).json({error: err.message});
				}
				else {
					if(result.rowCount != 0)
					{
					     res.json(result);
					}
					else
					{
					     res.json('notfound');
					}
				}
			}
		);
    });
});


app.post('/chngpassword', function(req, res) {
    pg.connect(process.env.DATABASE_URL, function (err, conn, done) {
        // watch for any connect issues
        if (err) console.log(err);
		conn.query(
			'SELECT Email, Password__c, Password_Dup__c FROM salesforce.Contact WHERE LOWER(Email) = LOWER($1)',
			[req.body.email.trim()],
			function(err, result) {
				if (err) {
					res.status(400).json({error: err.message});
				}
				else {
					if(result.rowCount != 0)
					{
					     conn.query(
						'UPDATE salesforce.Contact SET Password__c = $2, Password_Dup__c = $2 WHERE LOWER(Email) = LOWER($1)',
						[req.body.email.trim(), req.body.password.trim()],
						function(err, result) {
							done();
							if (err) {
								res.status(400).json({error: err.message});
							}
							else {
								res.json('updated');
							}
					     });
					}
					else
					{
					     res.json('notfound');
					}
				}
			}
		);
    });
});


app.post('/signup', function(req, res) {
	pg.connect(process.env.DATABASE_URL, function (err, conn, done) {
	// watch for any connect issues
	if (err) console.log(err);
		conn.query(
			'SELECT Email, LastName FROM salesforce.Contact WHERE LOWER(Email) = LOWER($1)',
			[req.body.email.trim()],
			function(err, result) {
				if (err) {
					res.status(400).json({error: err.message});
				}
				else {
					if(result.rowCount != 0)
					{
					     res.json('found');
					}
					else
					{
						conn.query('INSERT INTO salesforce.Contact (Phone, MobilePhone, FirstName, LastName, Email, Password__c, Password_Dup__c) VALUES ($1, $2, $3, $4, $5, $6, $7)',
						[req.body.phone.trim(), req.body.phone.trim(), req.body.firstName.trim(), req.body.lastName.trim(), req.body.email.trim(), req.body.password.trim(), req.body.password.trim()],
						function(err, result) {
							done();
							if (err) {
								res.status(400).json({error: err.message});
							}
							else {
								res.json('registered');
							}
						});
					}
				}
			}
		);
    	});
});

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
