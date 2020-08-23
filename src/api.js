const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');

// Initialize the server
const server = express();
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'ejs');

// Darn CORS issues
server.use(cors());
server.options('*', cors());
server.use(function(request, response, next) {
	response.header('Access-Control-Allow-Origin', '*');
	response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	response.header('Access-Control-Allow-Methods', 'POST, PUT, GET, OPTIONS');
	next();
});

// Parses the text as URL encoded data and exposes the resulting object on req.body
server.use(
  	bodyParser.urlencoded({
    	extended: true
  	})
);

// Parses the text as JSON and exposes the resulting object on req.body
server.use(bodyParser.json());

const config = require('./config.js');
const connection = mysql.createConnection({
	host: config.database.host,
	user: config.database.user,
	password: config.database.password,
	database: config.database.db
});

// Get all facts from the database
function getFacts(request, response) {
	const query = 'SELECT * FROM facts;';
	connection.query(query, function (error, results, fields) {
   	if (error) {
   		console.log(error);
   	}

   	if (!results) {
   		console.log('No results found');
   	} else {
   		// Convert validity to a boolean value (we get 0 and 1 from the db)
			for (let i = 0; i < results.length; i++) {
				results[i].validity = results[i].validity === 1 ? true : false;
			}
   	}

	   response.send(results);
	});
}

// Insert a new fact with its validity into the db
function addFact(request, response) {
	if (!request.body || !request.body.fact || !request.body.validity) {
		return;
	}

	const query = `INSERT INTO facts (fact, validity) VALUES ("${request.body.fact}", ${request.body.validity});`;
	connection.query(query, function (error, results, fields) {
   	if (error) {
   		console.log(error);
   	}
	});
}

server.get('/', function (request, response) {
  	response.render('index', {});
});

server.get('/facts', getFacts);
server.post('/addFact', addFact);

// Start the server
server.listen(process.env.PORT || config.server.port);