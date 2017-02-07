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
                console.log('INPUT:::');
                /*RemoveLogging:skip*/
                console.log(TEST_CASES[key]);
                /*RemoveLogging:skip*/
                console.log('\n\n');
                processData(TEST_CASES[key]);
                console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>EOC::::::TEST CASE ' + key + ' :::::::::>>>>>>>>>>>>>>>>>>>>>>>>>>> ');
            }

        }
    })

}


/////////////////CORE LOGIC//////////////////////////////////////////////////////////
function processData(input) {

    var temp = input.split('\n');

    var parameters = temp[0].split(' ').map(Number);

    var n = parameters[0];
    var m = parameters[1];

    var problem = [];
    var blankCells = [];

    for (var i = 1; i <= n; i++) {

        var col = 0;

        problem[i - 1] = temp[i].split('').map(function (state) {

            var result = state == 'G';

            if (result && (i - 1) > 0 && (i - 1) < n - 1 && col > 0 && col < m - 1) {
                blankCells.push({row: i - 1, col: col});
            }

            col++;

            return result;

        });
    }


    console.log(bestToWorst(n, m, problem, blankCells));

}

//4/21 11:time-out
function bestFitAlgorithm(n, m, problem, blankCells) {

    // console.log(problem);
    // console.log(blankCells);

    var solution = 1;

    blankCells.forEach(function (cell) {

        if (problem[cell.row][cell.col] && problem[cell.row + 1][cell.col]
            && problem[cell.row - 1][cell.col] && problem[cell.row][cell.col + 1] && problem[cell.row][cell.col - 1]) {

            var maxSize = getMaxPlusSize(problem, cell);

            solution *= (maxSize * 4) + 1;

            fill(cell, maxSize, problem);

        }
    });


    return solution;

    // return new Promise(function (resolve) { });
}

// 4/21 0:time out errors
function worstFit(n, m, problem, blankCells) {

    // console.log(problem);
    // console.log(blankCells);

    var solution = 1;

    blankCells.forEach(function (cell) {

        if (problem[cell.row][cell.col] && problem[cell.row + 1][cell.col]
            && problem[cell.row - 1][cell.col] && problem[cell.row][cell.col + 1] && problem[cell.row][cell.col - 1]) {

            // var maxSize = getMaxPlusSize(problem, cell);

            solution *= 5;
            fill(cell, 1, problem);

        }
    });


    return solution;

    // return new Promise(function (resolve) { });
}

// 4/21 11:time-out
function mediumFitAlgorithm(n, m, problem, blankCells) {

    // console.log(problem);
    // console.log(blankCells);

    var solution = 1;

    blankCells.forEach(function (cell) {

        if (problem[cell.row][cell.col] && problem[cell.row + 1][cell.col]
            && problem[cell.row - 1][cell.col] && problem[cell.row][cell.col + 1] && problem[cell.row][cell.col - 1]) {

            var maxSize = getMaxPlusSize(problem, cell);

            var mid = Math.floor((maxSize + 1) / 2);

            solution *= (mid * 4) + 1;

            fill(cell, maxSize, problem);

        }
    });


    return solution;

    // return new Promise(function (resolve) { });
}

// 3/21  13:time-out
function bestToWorst(n, m, problem, blankCells) {

    // console.log(problem);
    // console.log(blankCells);

    var solution = 1;

    for (var i = (n > m ? n : m); i > 0; i--) {


        blankCells.forEach(function (cell) {

            if (problem[cell.row][cell.col] && problem[cell.row + 1][cell.col]
                && problem[cell.row - 1][cell.col] && problem[cell.row][cell.col + 1] && problem[cell.row][cell.col - 1]) {

                var maxSize = getMaxPlusSize(problem, cell);

                if(maxSize>=i) {
                    solution *= (i * 4) + 1;
                    fill(cell, maxSize, problem);
                }

            }
        });
    }


    return solution;

    // return new Promise(function (resolve) { });
}


function bestToWorst(n, m, problem, blankCells) {

    // console.log(problem);
    // console.log(blankCells);

    var solution = 1;

    for (var i = 1; i > (m>n?m:n); i--) {

        var failCondition = true;

        blankCells.forEach(function (cell) {

            if (problem[cell.row][cell.col] && problem[cell.row + 1][cell.col]
                && problem[cell.row - 1][cell.col] && problem[cell.row][cell.col + 1] && problem[cell.row][cell.col - 1]) {

                var maxSize = getMaxPlusSize(problem, cell);

                if(maxSize >= i) {

                    solution *= (i * 4) + 1;
                    fill(cell, maxSize, problem);
                }

            }
        });
    }


    return solution;

    // return new Promise(function (resolve) { });
}


//Utilities
function getMaxPlusSize(problem, cell) {

    var maxSize = 1;

    for (var i = 1; (problem[cell.row - i]) && problem[cell.row - i][cell.col]; i++);

    maxSize = i > maxSize ? i : maxSize;

    for (var i = 1; i < maxSize && problem[cell.row + i] && problem[cell.row + i][cell.col]; i++);

    maxSize = i;


    for (var i = 1; i < maxSize && problem[cell.row][cell.col - i]; i++);

    maxSize = i;


    for (var i = 1; i < maxSize && problem[cell.row - i][cell.col + i]; i++);

    maxSize = i;

    return maxSize;

}


function fill(cell, length, problem) {

    problem[cell.row][cell.col] = false;

    for (var i = 1; i <= length; i++) {
        problem[cell.row + i][cell.col] = false;
        problem[cell.row - i][cell.col] = false;
        problem[cell.row][cell.col + i] = false;
        problem[cell.row][cell.col - i] = false;

    }

}


/////////////////////EXECUTION/////////////////////////////////////////
// auto();


processData("5 6\nGGGGGG\nGBBBGB\nGGGGGG\nGGBBGB\nGGGGGG");
processData("6 6\nBGBBGB\nGGGGGG\nBGBBGB\nGGGGGG\nBGBBGB\nBGBBGB");

