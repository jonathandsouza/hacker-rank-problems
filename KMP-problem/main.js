function main(input, short) {

    var frequency = input.split(' ').map(Number);

    var array = [];

    var best = 1000000000;
    var bestKMPArray = [];
    var bestArrayConfig = [];

    for (var i = 0; i < frequency.length; i++) {

        for (var j = 0; j < frequency[i]; j++) {
            array.push(String.fromCharCode(97 + i));
        }
    }

    do {

        var kmpResult = kmpAlgo(array);
        var result = kmpResult.reduce(function (a, b) {
            return a + b;
        });

        if (result < best) {
            best = result;
            bestKMPArray = kmpResult.slice();
            bestArrayConfig = array.slice();
        }

        console.log(array, kmpResult, result);

        if (short && (result >= short.low && result <= short.high)) {
            break;
        }

    } while (nextPermutation(array));


    console.log('FINAL SOLUTION::::::::::::::::::::');
    console.log(best, bestKMPArray, bestArrayConfig);

}


function nextPermutation(array) {
    // Find non-increasing suffix
    var i = array.length - 1;
    while (i > 0 && array[i - 1].charCodeAt(0) >= array[i].charCodeAt(0))
        i--;
    if (i <= 0)
        return false;

    // Find successor to pivot
    var j = array.length - 1;
    while (array[j].charCodeAt(0) <= array[i - 1].charCodeAt(0))
        j--;
    var temp = array[i - 1];
    array[i - 1] = array[j];
    array[j] = temp;

    // Reverse suffix
    j = array.length - 1;
    while (i < j) {
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        i++;
        j--;
    }
    return true;
}

function kmpAlgo(array) {

    var S = [];

    array.forEach(function (a) {
        S.push(a);
    });

    S.unshift(0);

    var kmp = [];

    kmp[1] = 0;

    for (var i = 1; i < S.length; i = i + 1) {
        var l = kmp[i - 1];
        while (l > 0 && S[i] != S[l + 1]) {
            l = kmp[l];
        }
        if (S[i] == S[l + 1]) {
            kmp[i] = l + 1;
        }
        else {
            kmp[i] = 0;
        }
    }

    return kmp;
}

function mySolution(array) {

    var result = '';

    var bestFrequency = 1000000000;
    var bestCharacter = '';
    var bestCharacterIndex = 0;
    var isFirstCharacter = null;
    var totalValidCharacters = 0;

    for (var i = 0; i < array.length; i++) {

        if (array[i] > 0) {
            totalValidCharacters++;
        }

        if (array[i] < bestFrequency && array[i]!=0) {
            bestFrequency = array[i];
            bestCharacter = String.fromCharCode(97 + i);
            bestCharacterIndex = i;
            isFirstCharacter = isFirstCharacter == null ? true : false;
        }
    }

    console.log('INPUT:::',array);
    console.log('bestFrequency',bestFrequency,'bestCharacter',bestCharacter,'bestCharacterIndex',bestCharacterIndex,'isFirstCharacter',isFirstCharacter,'totalValidCharacters',totalValidCharacters);

    //trivial cases

    if ((bestFrequency == 1 || bestFrequency == 2) && isFirstCharacter) {

        result = '';

        for (var i = 0; i < array.length; i++) {

            for (var j = 0; j < array[i]; j++) {
                result += String.fromCharCode(i + 97);
            }

        }

        return result;
    }


    if (bestFrequency == 1 && !isFirstCharacter) {

        result = bestCharacter;
        array[bestCharacterIndex]--;

        for (var i = 0; i < array.length; i++) {

            for (var j = 0; j < array[i]; j++) {
                result += String.fromCharCode(i + 97);
            }

        }

        return result;
    }


    if (isFirstCharacter) {

        result = bestCharacter + '' + bestCharacter;

        bestFrequency -= 2;

        var i = bestCharacterIndex + 1;

        for (; i < array.length && array[i] <= 0; i++);

        var adjacentCharacter = String.fromCharCode(97 + i);
        var adjacentCharacterFrequency = array[i];

        console.log('adjacentCharacter',adjacentCharacter,'adjacentCharacterFrequency',adjacentCharacterFrequency,'index',i)

        while (bestFrequency > 0) {
            result += adjacentCharacter + '' + bestCharacter;
            adjacentCharacterFrequency--;
            bestFrequency--;
        }

        while (adjacentCharacterFrequency > 0) {
            result += adjacentCharacter;
            adjacentCharacterFrequency--;
        }

        array[i] = 0;
        array[bestCharacterIndex] = 0;

        for (var i = 0; i < array.length; i++) {

            for (var j = 0; j < array[i]; j++) {
                result += String.fromCharCode(i + 97);
            }

        }
        return result;


    } else {

        result = bestCharacter;
        array[bestCharacterIndex]--;

        for (var i = 0; i < array.length; i++) {

            for (var j = 0; j < array[i]; j++) {
                result += String.fromCharCode(i + 97);
            }

        }

        return result;
    }
}

function test(input) {
    console.log(mySolution(input.split(' ').map(Number)));
}

////////////////EXECUTION///////////

//main('5 5 4 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0', {low: 0, high: 2});
test('1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0');

//[ 'c', 'a', 'a', 'a', 'a', 'a', 'b', 'b', 'b', 'b', 'b', 'c', 'c', 'c' ]
//

/*
 1. If there exists a char with count 1 move the element to the front  solution =0;
 2. solution = len(lowest character repetition count) - 1;
 3. if the char having the lowest repetition count is the first element let this value be n
 a.  if(n==1)
 ? solution found  solution =0
 b.  if (n ==2)
 ? print the entire array as is ie aabbccddeeff if n(a) ==2;
 c.  if(n>2)
 ? the first 2 character should be the character then we need to criss cross with the next characters

 eg :
 5 5 5 : aababababbccccc
 4. if the char having the lowest repetition count is not the first element then
 a. if (n==1)
 ? solction found move the element to begining  solution=0
 b. if (n>1)
 ? move 1 of these characters to the start of the array solution found















 */