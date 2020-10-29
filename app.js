const express = require('express');
const app = express();
const port = 3000;

var path = require('path');
var bodyParser = require('body-parser');
var db = require('./db.js');

const { sequenceChecker } = require("./sequenceChecker");
const { SUCCESS, NOT_MATCHING_PAIR, INVALID_CHAR, NO_INPUT } = require("./constants");

// function getPayload(statusCode) {
//     return {
//         'status': statusCode
//     }
// }

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/api/sequence', (req, res) => {

	var result = sequenceChecker(req.body.userinput);

	if (result.status_code == 0) {
		db.store(req.body.userinput, () => res.send( result ));
	}
	else {
		res.send( result );
	}

})

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/src/index.html'));
});
app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
})

