function processData(input) {
    
    var temp = input.split('\n');
    
    var n = parseInt(temp[0]);
    var str = temp[1];
    
    var expectedDistribution =  str.length/4;
    
    var nA = expectedDistribution - ( str.match(new RegExp("A","g")) || []).length;
    var nC = expectedDistribution - ( str.match(new RegExp("C","g")) || []).length;
    var nT = expectedDistribution - ( str.match(new RegExp("T","g")) || []).length;
    var nG = expectedDistribution - ( str.match(new RegExp("G","g")) || []).length;
    
    //trivail cases
    
    if(nA==0 && nC==0 && nG==0 && nT ==0){
        console.log(0);return;
    }
    
    
    //console.log('problem',nA,nC,nT,nG);
    
    var best =str.length;
    var bestI = 0;
    var bestJ =str.length-1;
    
    var bestPossibleAnswer = 0;
    
    bestPossibleAnswer += nA<0?nA : 0;
    bestPossibleAnswer += nC<0?nC : 0;
    bestPossibleAnswer += nT<0?nT : 0;
    bestPossibleAnswer += nG<0?nG : 0;
    
    
    for(var i=0;i<str.length;i++){
        
        var tempNA = nA;
        var tempNC = nC;
        var tempNT = nT;
        var tempNG = nG;
        
        for(var j=i; j<str.length ;j++ ){
            
            if(str[j]=='A' && tempNA<0){
                tempNA++;
            }

            if(str[j]=='C' && tempNC<0){
                tempNC++;
            }

            
            if(str[j]=='T' && tempNT<0){
                tempNT++;
            }

            
            if(str[j]=='G' && tempNG<0){
                tempNG++;
            }
            
            if(tempNA >=0 && tempNC>=0 && tempNT>=0 && tempNG>=0)break;
            
            if( (i-j+1)>best)break;
            
        }
        
        //console.log(i,j)
        
        var resLength = j-i +1;
        
        
        if(resLength<best && (tempNA >=0 && tempNC >=0 && tempNT >=0 && tempNG >= 0 )){
            best = resLength;bestI=i;bestJ=j;
        }
        
        if(best == bestPossibleAnswer){
            break;
        }
        
    }
    
    //console.log(best,bestI,bestJ);
    console.log(best);
    
    
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
