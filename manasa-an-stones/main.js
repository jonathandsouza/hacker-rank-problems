function processData(input) {

	var temp = input.split('\n');

	var testCases = parseInt(temp[0]);

	for (var t = 1; t < testCases * 3; t += 3) {

		var n = parseInt(temp[t]);
		var x = parseInt(temp[t + 1]);
		var y = parseInt(temp[t + 2]);

		algorithm(n, x, y);
	}

}


function algorithm(n, x, y) {

	var a = [0];
	var solution = [];

	for (var i = 0; i <= n - 2; i++) {


		for (var j = Math.pow(2, i) - 1; j <= 2 * (Math.pow(2, i) - 1); j++) {

			var left = (2 * j) + 1;
			var right = (2 * j) + 2;
			a[left] = a[j] + x;
			a[right] = a[j] + y;

		}
	}


}


function algorithm2(n, x, y) {


	function mutate(a, i) {


		if (i >= (n - 1)) {
			return a.sort(function (a, b) {
				return a >= b;
			});

		}

		var next = [];

		a.forEach(function (element) {


			var i1 = element + x;
			var i2 = element + y;


			if (next.indexOf(i1) == -1) {
				next.push(i1);
			}


			if (next.indexOf(i2) == -1) {
				next.push(i2);
			}

		});

		a = null;
		return mutate(next, ++i);

	}

	return mutate([0], 0)

}


function algorithm3(n, x, y) {

	var diff = Math.abs(x - y);

	var low = x < y ? x * (n - 1) : y * (n - 1);

	var high = x > y ? x * (n - 1) : y * (n - 1);

	var output = '';
	var array_output = [];

	while (low < high) {

		output += ' ' + low.toString();
		array_output.push(low);
		low += diff;
	}

	output += ' ' + high.toString();
	array_output.push(high);


	// return output.trim();

	return array_output.sort(function (a, b) {
		return a >= b
	});
}


// algorithm(4,10,100);
// algorithm2(3,10,100);
// algorithm2(10, 1, 2);//2 3 4

function auto(n, x, y) {

	console.log('PROBLEM', n, x, y);

	var output1 = algorithm2(n, x, y);
	var output2 = algorithm3(n, x, y);

	var final1 = output1.join(' ');
	var final2 = output2.join(' ');

	if (final1 == final2) {
		console.log('SUCCESS');
		console.log("ALGO(1)", final1);
		console.log("ALGO(2)", final2);
	}
	else {
		console.log('FAIL');
		console.log('ALGO(1)', final1);
		console.log('ALGO(2)', final2);
	}

}


auto(561, 15, 23);

