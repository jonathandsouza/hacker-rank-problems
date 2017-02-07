/////////////////CORE LOGIC//////////////////////////////////////////////////////////

function main(n, k) {

    Promise.all([
        algo1(n, k),
        algo2(n, k),
        algo3(n, k)
    ])
        .then(function (result) {

            if (result[1] != result[2]) {

                console.log('START::::', n, k);
                console.log('ALGO(1):', result[0]);
                console.log('ALGO(2):', result[1]);
                console.log('ALGO(3):', result[2]);
                console.log('-----END-------');
            } else {
                console.log('SUCCESSFUL', n, k)
            }
        });


}


function algo1(n, k) {

    return new Promise(
        function (resolve, reject) {

            var input = [];

            for (var i = 1; i <= n; i++) {
                input.push(i);
            }

            var stopCondition = true;

            if (k == 0) {
                resolve(input.join(' '));
            }

            if (n % 2 == 1) {
                resolve(-1);
            }

            var mid = k;

            var mid = (k + 1);


            if (input.length == 2) {
                mid = 1;
            }


            var rest = input.splice(mid);


            if (rest.length == input.length) {
                resolve(rest.concat(input).join(' '));
            }
            else {
                resolve(-1);
            }
        }
    );
}


function algo2(n, k) {
    return new Promise(function (resolve, reject) {

        var input = [];

        for (var i = 1; i <= n; i++) {
            input.push(i);
        }

        var stopCondition = true;


        if (k == 0) {
            resolve(input.join(' '));
        }


        do {

            var consistency = true;

            for (var i = 0; i < n; i++) {
                if (Math.abs((i + 1) - input[i]) != k) {
                    consistency = false;
                    break;
                }
            }


            if (consistency) {
                stopCondition = false;
                break;
            }


            //algo

            var continueLoop = true;

            var i = input.length - 1;

            while (i > 0 && input[i - 1] >= input[i])
                i--;

            if (i <= 0)
                continueLoop = false;


            // Find successor to pivot
            var j = input.length - 1;


            while (input[j] <= input[i - 1])
                j--;


            var temp = input[i - 1];


            input[i - 1] = input[j];
            input[j] = temp;


            // Reverse suffix
            j = input.length - 1;
            while (i < j) {
                temp = input[i];
                input[i] = input[j];
                input[j] = temp;
                i++;
                j--;
            }

            //algo


        } while (continueLoop);


        if (stopCondition) {

            resolve(-1);

        } else {

            resolve(input.join(' '));

        }

    });

}

function algo3(n, k) {

    return new Promise(function (resolve) {

        var input = [];
        var output = [];

        for (var i = 1; i <= n; i++) {
            input.push(i);
        }

        if (k == 0) {
            resolve(input.join(' '));
        }

        for (var i = 0; i < n; i++) {


            var indexP = k + input[i] - 1;
            var indexN = Math.abs(k - input[i]) - 1;


            var failed = true;

            if (!output[indexN] && indexN >= 0 && Math.abs(1 + indexN - input[i]) == k) {
                output[indexN] = input[i];
                failed = false;
            }
            else if (!output[indexP] && indexP < n && Math.abs(1 + indexP - input[i]) == k) {
                output[indexP] = input[i];
                failed = false;
            }

            // console.log(i,input[i],indexP,indexN,output);

            if (failed) {
                resolve(-1);
            }

        }

        resolve(output.join(' '));


    });


}


/////////////////////EXECUTION/////////////////////////////////////////
function auto() {
    for (var i = 11; i <= 11; i++) {
        for (var j = 1; j < i; j++) {
            main(i, j)

        }
    }

}


auto();



