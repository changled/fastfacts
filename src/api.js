require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

// Initialize the server
const server = express();

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

const connection = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME
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

server.get('/facts', getFacts);
server.post('/addFact', addFact);

// Start the server
server.listen(3000);
