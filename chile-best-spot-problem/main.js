/////////////DEFAULTS////////////////////
var INPUT_FILE = 'TEST-CASES.json';


/////////////DEPENDENCIES//////////////////////
var jsonfile = require('jsonfile');


///////////////AUTOMATION///////////////////////

function auto() {

	jsonfile.readFile(INPUT_FILE, function (err, TEST_CASES) {

		for (var key in TEST_CASES) {
			if (TEST_CASES.hasOwnProperty(key)) {


				console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>BOC::::::TEST CASE: ' + key + ' :::::::::>>>>>>>>>>>>>>>>>>>>>>>>>>> ');
				console.log('INPUT:::');/*RemoveLogging:skip*/
				console.log(TEST_CASES[key]);/*RemoveLogging:skip*/
				console.log('\n\n');
				processData(TEST_CASES[key]);
				console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>EOC::::::TEST CASE ' + key + ' :::::::::>>>>>>>>>>>>>>>>>>>>>>>>>>> ');
			}

		}
	})

}


/////////////////CORE LOGIC//////////////////////////////////////////////////////////

function createLandObject(splitInput, index) {

	var Land = {
		rows: 0,
		cols: 0,
		data: []
	};

	var landObj = Object.create(Land);

	var purchasedLandInfo = splitInput[index++].split(' ');

	landObj.rows = parseInt(purchasedLandInfo[0]);
	landObj.cols = parseInt(purchasedLandInfo[1]);


	for (var i = 1; i <= landObj.rows; i++) {
		landObj.data.push(splitInput[index++].split(' ').map(Number));
	}

	return landObj;

}


function processAndStructureInput(input) {
	var splitInput = input.split('\n');
	var index = 0;

	var result = {purchased: null, perfect: null};

	result.purchased = createLandObject(splitInput, index);

	var index = result.purchased.rows + 1;

	result.perfect = createLandObject(splitInput, index);

	return result;

}


function processData(input) {

	var structuredInput = processAndStructureInput(input);

	var purchasedLand = structuredInput.purchased;
	var perfectLand = structuredInput.perfect;


	var solution = {
		cost: null,
		row: null,
		col: null,
		iterations: 0,
	};


	for (var i = 0; i <= (purchasedLand.rows - perfectLand.rows ); i++) {
		for (var j = 0; j <= (purchasedLand.cols - perfectLand.cols); j++) {

			var calculation = algorithm(perfectLand, purchasedLand, i, j, solution.cost);

			console.log('CALCULATION>', calculation);

			solution.iterations += 1 + calculation.iterations;

			if (solution.cost == null) {
				solution.cost = calculation.cost;
				solution.row = i;
				solution.col = j;
			}

			if (solution.cost > calculation.cost) {

				solution.cost = calculation.cost;
				solution.row = i + 1;
				solution.col = j + 1;

			}

			if (solution.cost == 0) {
				break;
			}

		}

		if (solution.cost == 0) {
			break;
		}

	}

	console.log('\nSOLUTION:::::::::::', solution);/*RemoveLogging:skip*/
}


function algorithm(perfectLand, purchasedLand, row, col, currentBestCost) {

	var result = {
		cost: 0,
		iterations: 0,
	};

	console.log('------------------------- ', row, col);
	var sumOfPurchasedLand = 0;
	var sumOfPerfectLand = 0;

	for (var i = row, p = 0; i < row + perfectLand.rows; i++, p++) {

		for (var j = col, q = 0; j < col + perfectLand.cols; j++, q++) {

			var temp = (perfectLand.data[p][q] - purchasedLand.data[i][j]);

			result.cost += temp * temp;

			//console.log(i, j, p, q);

			sumOfPurchasedLand += purchasedLand.data[i][j];
			sumOfPerfectLand += (perfectLand.data[p][q]);
			result.iterations++;

			console.log('PUR:', purchasedLand.data[i][j], 'PER:', perfectLand.data[p][q], 'DIFF', (purchasedLand.data[i][j] - (perfectLand.data[p][q])), 'SQ-DIFF:', Math.pow((purchasedLand.data[i][j] - (perfectLand.data[p][q])), 2), 'COST', result.cost);

			if (currentBestCost != null && result.cost > currentBestCost) {
				console.log('>>>>>>>>>>>>>>*TERMINATED*::::', result.cost, currentBestCost);
				break;
			}
		}

		if (currentBestCost != null && result.cost > currentBestCost) {
			break;
		}

	}

	console.log('ANALYSIS:::', 'SUM>>>', 'PUR:', sumOfPurchasedLand, 'PER:', sumOfPerfectLand);

	console.log('------------------------->>>>>>>>');

	return result;
}


/////////////////////EXECUTION/////////////////////////////////////////
auto();