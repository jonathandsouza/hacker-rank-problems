/////////////////CORE LOGIC//////////////////////////////////////////////////////////


function mutate(array, pivot) {

    console.log('---->', pivot, array);

    var index = array.indexOf(pivot);

    if (index == 0) {
        return;
    }

    var low, high;

    if (index <= 2) {

        low = 0;
        high = 2;

    } else {

        high = index;
        low = index - 2;
    }


    rotate(array, low, high, pivot);


    mutate(array, pivot);

}

function rotate(array, low, high, pivot) {

    while (true) {

        var k = array[low];
        array[low] = array[low + 1];
        array[low + 1] = array[high];
        array[high] = k;

        if (array[low] == pivot) {
            return;
        }

    }
}

function algorithm(array, pivot, n) {

    console.log('ALGO::::', pivot, array);

    if (array.length == 1) {

        if (array[0] == n) {
            console.log('YES');
        }
        else {
            console.log('NO')
        }
        return;
    }

    if (array.length == 2) {

        if (array[0] == n - 1 && array[1] == n) {
            console.log('YES');
        } else {
            console.log('NO');
        }

        return;
    }


    if (array[0] == pivot) {

        algorithm(array.slice(1), ++pivot, n);

    }
    else {

        mutate(array, pivot);
        algorithm(array.slice(1), ++pivot, n);

    }


}


/////////////////////EXECUTION/////////////////////////////////////////


// algorithm([1, 4, 3, 2, 7, 6, 9, 5, 8], 1, 9);
// algorithm([1, 3, 2, 5, 7, 9, 6, 4, 8], 1, 9);
// algorithm([1, 2, 3, 5, 4], 1, 5);
// algorithm([1, 3, 4, 2], 1, 4);
algorithm([1, 8, 6, 4, 3, 2, 5, 7],1, 8);
