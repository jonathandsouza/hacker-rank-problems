function processData(input) {
    var temp = input.split('\n');
    
    var testCases = parseInt(temp[0]);
    
    var rA = new RegExp('AA');
    var rB = new RegExp('BB');
     
    //console.log('TESTCASES',testCases);
    
    for(var t=1;t<=testCases;t++){
    
        var str = temp[t];
        
        
        //console.log(str);
        
        var operations =0;
        
            while(rA.test(str)){
                
                //console.log(str);
                
                var match = str.match(new RegExp('A{2,}'));
                
                //console.log('Match:::',match[0]);

                if(match[0].length>=2){
                    operations += match[0].length-1;
                }
                
                str = str.replace(new RegExp('A{2,}'),'A');
                
                //console.log(str,match,operations);
                
                //console.log(str);
            }
        
        

            while(rB.test(str)){
                
                //console.log(str);
                
                var match = str.match( new RegExp('B{2,}') );
                
                //console.log('Match:::',match[0]);

                if(match[0].length>=2){
                    operations += match[0].length-1;
                }
                
                str = str.replace( new RegExp('B{2,}') ,'B' );
                
                //console.log(str,match,operations);
                
                //console.log(str);
            }
        
        
        
        console.log(operations);
        
        
    }
    
    
    
} 

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});
