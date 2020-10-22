const express = require('express');
const app = express();
const port = 3000;

var path = require('path');
var bodyParser = require('body-parser');
var db = require('./db.js');

const { sequenceChecker } = require("./sequenceChecker");
const { SUCCESS, NOT_MATCHING_PAIR, INVALID_CHAR, NO_INPUT } = require("./constants");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/api/sequence', (req, res) => {
	//res.send('HellIo World!')
	//var test = req.body.toString();
	//res.send( test );
	//res.json(req.body)
	var result = sequenceChecker(req.body.userinput);
	switch (result) {//different types of errors

		case SUCCESS: {
			db.store(req.body.userinput, () => res.send('Success'));
			break;
		}
		case NOT_MATCHING_PAIR: {
			res.send('Only encapsulating pairs of PA NY OH WV are allowed');
			break; //TODO probably should send another html file to explain the input requirements
		}
		case INVALID_CHAR: {
			res.send('There was an invalid character input. Only PA NY OH and WV are allowed.');
			break;
		}
		case NO_INPUT: {
			res.send('Please enter your input in the text box.');
			break;
		}
		default: {
			res.send("DEFAULT");
		}


	}

	//res.send('Output ' + isValid)

})

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/src/index.html'));
});
app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
})

