function processData(input) {
    
    var temp = input.split('\n');
    var testCases = parseInt(temp[0]);
    
    
    for(var t=1;t<=testCases;t++){
        
        var a = temp[t].split('');
        
        //Trivial Solutions
        if(check()){
            console.log(-1);continue;
        }
        
        var low =0;
        var high = a.length-1;
        
        while(low <=high){
            
            var endCondition = false;
            
            if(a[low]!=a[high]){
                endCondition =true;
                var removedIndex = (a[low] == a[high-1]) ? high : low;
            }

            if(endCondition){
                a.splice(removedIndex,1);
                console.log( check()?removedIndex:-1)
                break;                
            }
            
            low++;
            high--;
            
        }
    }
    
    function check(){
        
        var low=0;
        var high = a.length-1;
        
        
        while(low<high){
            
            if(a[low]!=a[high]){
                return false;
            }
            
            low++;
            high--;
        }
        
        return true;
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
