function main(n) {


    var result = [1];

    for (var i = 2; i <= n; i++) {

        var carry = 0;

        for (var j = 0; j < result.length; j++) {

            var prod = (i * result[j]) + carry;

            result[j] = prod.toString()[prod.length-1];

            carry = Math.floor(prod / 10);
        }

        if (carry)
            result.push(carry);


        console.log(result);
    }


    return result.reverse().join('');
}


function auto() {

    var tests = [5, 20, 18, 26, 27, 30, 37, 52, 53, 82];

    var results = ['120', '2432902008176640000', '6402373705728000', '403291461126605635584000000', '10888869450418352160768000000', '265252859812191058636308480000000', '13763753091226345046315979581580902400000000', '80658175170943878571660636856403766975289505440883277824000000000000',
        '4274883284060025564298013753389399649690343788366813724672000000000000',
        '475364333701284174842138206989404946643813294067993328617160934076743994734899148613007131808479167119360000000000000000000'];

    for (var i = 0; i < tests.length; i++) {

        var r = main(tests[i]);

        console.log('TEST:', tests[i]);
        console.log(r);
        console.log(results[i]);
        console.log('RESULT::', r == results[i])
    }
}

// auto();


console.log( main(52) );
console.log('80658175170943878571660636856403766975289505440883277824000000000000')

