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

app.get('/performlogin', function(req, res) {
	
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
					alert("hiee");
					alert(result.rows.length);
				}
			}
		);
    	});
});

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
