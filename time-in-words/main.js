process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

process.stdin.on('data', function (data) {
    input_stdin += data;
});

process.stdin.on('end', function () {
    input_stdin_array = input_stdin.split("\n");
    main();    
});

function readLine() {
    return input_stdin_array[input_currentline++];
}

/////////////// ignore above this line ////////////////////

function main() {
    var h = parseInt(readLine());
    var m = parseInt(readLine());
    
    
    if(m==0){
        console.log( numberToWords(h),"o' clock");return;
    }
    
     if(m==30){
        console.log("half past",numberToWords(h));return;
    }
    
      if(m==45){
        console.log("quarter to",numberToWords(h+1));return;
    }
    
    if(m<30){
        console.log(numberToWords(m),"minutes past",numberToWords(h));return;
    }
    else{
        console.log(numberToWords(60-m),"minutes to",numberToWords(h+1));return;
    }

}


function numberToWords(num){
    
    switch(num){
        case 11: return "eleven";break;
        case 12: return "twelve";break;
        case 13: return "thirteen";break;
        case 14: return "fourteen";break;    
        case 15: return "fifteen";break;
        case 16: return "sixteen";break;
        case 17: return "seventeen";break;
        case 18: return "eighteen";break;
        case 19: return "nineteen";break;
    }
    
    
    var units = num%10;
    var unitsStr = '';
    
    switch(units){
        case 1: unitsStr = 'one';break;
        case 2: unitsStr = 'two';break;
        case 3: unitsStr = 'three';break;
        case 4: unitsStr = 'four';break;
        case 5: unitsStr = 'five';break;
        case 6: unitsStr = 'six';break;
        case 7: unitsStr = 'seven';break;
        case 8: unitsStr = 'eigth';break;
        case 9: unitsStr = 'nine';break;
    }
    
    
    var tens = Math.floor(num/10);
    var tensStr = '';  
    
    switch(tens){
        case 1: tensStr = 'ten';break;
        case 2: tensStr = 'twenty';break;
        case 3: tensStr = 'thirty';break;
        case 4: tensStr = 'fourty';break;
        case 5: tensStr = 'fifty';break;
        case 6: tensStr = 'sixty';break;
        case 7: tensStr = 'seventy';break;
        case 8: tensStr = 'eight';break;
        case 9: tensStr = 'ninety';break;
    }
    
    
    return (tensStr+ " " + unitsStr).trim();
    
}


