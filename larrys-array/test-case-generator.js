//////////////////DEFAULTS///////////////////////////////////

var INPUT_FILE = 'TEST-CASES.json';

var DEFAULTS = {

	COUNT: 1,

	PURCHASED: {
		ROWS: 500,
		COLS: 500
	},

	PERFECT: {
		ROWS: 5,
		COLS: 5
	},

	RANDOM_LIMIT: {

		UPPER: 100,
		LOWER: -100
	}
};


//////////////////DEPENDENCIES///////////////////////////


var jsonfile = require('jsonfile');


////////////////////CORE LOGIC/////////////////////////////

function generator() {

	var perfectLand = '';

	var purchasedLand = '';

	perfectLand = createGrid(DEFAULTS.PERFECT.ROWS, DEFAULTS.PERFECT.COLS);
	purchasedLand = createGrid(DEFAULTS.PURCHASED.ROWS, DEFAULTS.PURCHASED.COLS);


	var results = '';


	results += DEFAULTS.PURCHASED.ROWS + ' ' + DEFAULTS.PURCHASED.COLS + '\n';
	results += purchasedLand;

	results += DEFAULTS.PERFECT.ROWS + ' ' + DEFAULTS.PERFECT.COLS + '\n';
	results += perfectLand;

	console.log(purchasedLand);
	console.log('\n\n\n');
	console.log(perfectLand);

	console.log('\n\n\n');


	return results;
}


function createGrid(rows, cols) {

	var result = '';

	for (var i = 0; i < rows; i++) {
		for (var j = 0; j < cols; j++) {
			result += getRandomInt(DEFAULTS.RANDOM_LIMIT.LOWER, DEFAULTS.RANDOM_LIMIT.UPPER).toString() + " ";
		}

		result += "\n";
	}


	return result;
}


/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}


///////////////////////////////////////////////////// AUTOMATION /////////////////////////////////

function auto() {


	jsonfile.readFile(INPUT_FILE, function (err, TEST_CASES) {


		for (var i = 0; i < DEFAULTS.COUNT; i++) {
			TEST_CASES.push(generator());
		}

		jsonfile.writeFile(INPUT_FILE, TEST_CASES, function (err) {
			console.error(err)
		})

	});


}


///////////////////////////EXECUTION/////////////////////////////
auto();