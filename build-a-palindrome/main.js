function algorithm(strA, strB) {

    var solution = {

        result: '',
        length: 0,
        strA: {i: 0, j: 0},
        strB: {i: 0, j: 0},

    };


    var recursive = function (startIndexA, startIndexB) {

        if (startIndexA < 0 || startIndexB >= strB.length) {
            return;
        }


        //STRING A AS A PIVOT
        var pivot = strA[startIndexA];
        for (var i = startIndexB; i < strB.length; i++) {

            var nextIndex = null;

            if (strB[i] == pivot) {


                var tempSolution = {strA: [pivot], strB: [pivot]};

                var indexA = startIndexA;
                var indexB = i;

                if (indexA < strA.length - 1 || indexB > 0) {

                    if (indexA < strA.length - 1 && indexB > 0) {

                        if (strA[indexA + 1] <= strB[indexB - 1]) {

                            tempSolution.strA.push(strA[indexA + 1]);

                        } else {

                            tempSolution.strB.unshift(strB[indexB - 1]);

                        }
                    } else if (indexA < strA.length - 1) {

                        tempSolution.strA.push(strA[indexA + 1]);

                    } else if (indexB > 0) {

                        tempSolution.strB.unshift(strB[indexB - 1]);

                    }

                }

                var j = 1;

                while (strA[indexA - j] && strB[indexB + j] && strA[indexA - j] == strB[indexB + j]) {

                    if (nextIndex == null && strB[indexB + j] == pivot) {
                        nextIndex = indexB + j;
                    }

                    tempSolution.strB.push(strA[indexA - j]);
                    tempSolution.strA.unshift(strA[indexA - j]);

                    j++;
                }

                if (nextIndex) {
                    i = nextIndex;
                }

                if (solution.length < tempSolution.strA.length + tempSolution.strB.length) {
                    solution.result = tempSolution.strA.join('') + tempSolution.strB.join('');
                    solution.length = solution.result.length;
                } else if (solution.length == tempSolution.strA.length + tempSolution.strB.length) {

                    if (solution.result[0] > tempSolution.strA[0]) {

                        solution.result = tempSolution.strA.join('') + tempSolution.strB.join('');
                        solution.length = solution.result.length;

                    }

                }

            }

        }


        //STRING B AS A PIVOT
        var pivot = strB[startIndexB];
        for (var i = startIndexA; i >= 0; i--) {

            var nextIndex = null;

            if (strA[i] == pivot) {

                var tempSolution = {strA: [pivot], strB: [pivot]};

                var indexA = i;
                var indexB = startIndexB;
                var j = 1;

                if (indexA < strA.length - 1 || indexB > 0) {

                    if (indexA < strA.length - 1 && indexB > 0) {

                        if (strA[indexA + 1] <= strB[indexB - 1]) {

                            tempSolution.strA.push(strA[indexA + 1]);

                        } else {

                            tempSolution.strB.unshift(strB[indexB - 1]);

                        }
                    } else if (indexA < strA.length - 1) {

                        tempSolution.strA.push(strA[indexA + 1]);

                    } else if (indexB > 0) {

                        tempSolution.strB.unshift(strB[indexB - 1]);

                    }

                }


                while (strA[indexA - j] && strB[indexB + j] && strA[indexA - j] == strB[indexB + j]) {

                    if (nextIndex == null && strA[indexA - j] == pivot) {
                        nextIndex = indexA - j;
                    }

                    tempSolution.strB.push(strA[indexA - j]);
                    tempSolution.strA.unshift(strA[indexA - j]);

                    j++;
                }

                if (nextIndex) {
                    i = nextIndex;
                }

                if (solution.length < tempSolution.strA.length + tempSolution.strB.length) {

                    solution.result = tempSolution.strA.join('') + tempSolution.strB.join('');
                    solution.length = solution.result.length;

                } else if (solution.length == tempSolution.strA.length + tempSolution.strB.length) {

                    if (solution.result[0] > tempSolution.strA[0]) {

                        solution.result = tempSolution.strA.join('') + tempSolution.strB.join('');
                        solution.length = solution.result.length;

                    }

                }


            }

        }


        //continue with recursion
        recursive(startIndexA - 1, startIndexB + 1);

    };
    recursive(strA.length - 1, 0);

    return (solution.result);
}

function algorithm2(strA, strB) {


    var problem = {
        mainString: strA + strB,
        lengthA: strA.length,
        lengthB: strB.length,
        mid: strA.length
    };


    var Finalsolution = {
        result: '-1',
        length: 0
    };


    if (problem.mainString.length == 2) {

        if (problem.mainString[0] == problem.mainString[1]) {
            console.log(problem.mainString);
        }
        return;
    }

    var higherLimit = problem.lengthA + Math.floor(problem.lengthB / 2);
    var lowerLimit = Math.floor(problem.lengthA / 2);

    for (var i = problem.mainString.length - 2; i >= 1; i--) {

        //case flowing palindrome
        if (i >= lowerLimit && i <= higherLimit) {

            var typeOfPalindrome = ''; //

            if (problem.mainString[i + 1] && problem.mainString[i] && problem.mainString[i] == problem.mainString[i + 1]) {

                typeOfPalindrome = "EVEN";
                findSolution(typeOfPalindrome, i, i + 1);
            }

            if (problem.mainString[i - 1] && problem.mainString[i] && problem.mainString[i - 1] == problem.mainString[i]) {

                typeOfPalindrome = "EVEN";
                findSolution(typeOfPalindrome, i - 1, i);
            }

            if (problem.mainString[i] && problem.mainString[i - 1] && problem.mainString[i + 1] && problem.mainString[i] != problem.mainString[i + 1] && problem.mainString[i] != problem.mainString[i - 1]) {

                typeOfPalindrome = "ODD";
                findSolution(typeOfPalindrome, i, null);
            }

        }


        //case: palindrome formed from sub strings;

        var typeOfPalindrome = '';

        var possibleSolution = '';
        var startIndex = 0;

        if (problem.mainString[i + 1] && problem.mainString[i] && problem.mainString[i] == problem.mainString[i + 1]) {

            typeOfPalindrome = 'EVEN';

            possibleSolution += problem.mainString[i + 1] + problem.mainString[i + 1];
            startIndex = i + 2;
        }

        if (problem.mainString[i] && problem.mainString[i - 1] && problem.mainString[i + 1] && problem.mainString[i] != problem.mainString[i + 1] && problem.mainString[i] != problem.mainString[i - 1]) {

            typeOfPalindrome = 'ODD';

            possibleSolution += problem.mainString[i];
            startIndex = i + 1;
        }


        if (startIndex < problem.mainString.length && startIndex >= problem.lengthA) {

            var pivot = problem.mainString[startIndex];
            for (var k = problem.lengthA - 1; k >= 0; k--) {

                var nextIndex = null;

                if (problem.mainString[k] == pivot) {

                    var indexA = k;
                    var indexB = startIndex;
                    var j = 0;

                    if (typeOfPalindrome == 'EVEN' && indexA < problem.lengthA - 1) {
                        possibleSolution = strA[indexA + 1] + possibleSolution;
                    }

                    while (problem.mainString[indexA - j] && problem.mainString[indexB + j] && problem.mainString[indexA - j] == problem.mainString[indexB + j]) {

                        if (nextIndex == null && problem.mainString[indexA - j] == pivot) {
                            nextIndex = indexA - j;
                        }
                        possibleSolution = problem.mainString[indexA - j] + possibleSolution + problem.mainString[indexB + j];
                        j++;
                    }

                    if (nextIndex) {
                        k = nextIndex;
                    }

                    if (possibleSolution.length > Finalsolution.length) {
                        Finalsolution.result = possibleSolution;
                        Finalsolution.length = possibleSolution.length;
                    }
                    if (possibleSolution.length == Finalsolution.length && Finalsolution.result > possibleSolution) {
                        Finalsolution.result = possibleSolution;
                    }

                }

            }


        }

    }


    function findSolution(type, mid1, mid2) {

        var solution = '';

        if (type == "EVEN") {

            solution += problem.mainString[mid1] + problem.mainString[mid2];

            var low = mid1 - 1;
            var high = mid2 + 1;


        } else {

            solution += problem.mainString[mid1];

            var low = mid1 - 1;
            var high = mid1 + 1;

        }


        while (low >= 0 && high < problem.mainString.length && problem.mainString[low] == problem.mainString[high]) {

            solution = problem.mainString[low] + solution + problem.mainString[high];

            low--;
            high++;

        }

        low++;
        high--;

        if (low < problem.lengthA && high >= problem.lengthA) {

            if (Finalsolution.length < solution.length) {
                Finalsolution.result = solution;
                Finalsolution.length = solution.length;
            } else if (Finalsolution.length == solution.length && Finalsolution.result > solution) {
                Finalsolution.result = solution;
            }

        }

    }

    return Finalsolution.result;
}


function test(algorithm) {


    var result = algorithm("abcdxyz", "dcbaxdcba");
    console.log("abcdxyz", "dcbaxdcba", result == 'abcdxaxdcba', result);


    var result = algorithm("bac", "bac");
    console.log("bac", "bac", result == 'aba', result);

    var result = algorithm("uvwxyzyaxxbcx", "cbayzyxwvu");
    console.log("uvwxyzyaxxbcx", "cbayzyxwvu", result == 'uvwxyzyabayzyxwvu', result);


    var result = algorithm("jdfh", "fds");
    console.log("jdfh", "fds", result == 'dfhfd', result);

    var result = algorithm("abccb", "adefg");
    console.log("abccb", "adefg", result == 'abccba', result)


    var result = algorithm("abcxyyxc", "ba");
    console.log("abcxyyxc", "ba", result == 'abcxyyxcba', result)

    var result = algorithm("abcxyzyxc", "ba");
    console.log("abcxyyxc", "ba", result == 'abcxyzyxcba', result)

}


// test();

// console.log(algorithm('abcx123','345cba'));
// console.log(algorithm2('abc', 'dxdcba'));

test(algorithm2);