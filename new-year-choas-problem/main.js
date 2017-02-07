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
    var T = parseInt(readLine());
    
    for(var a0 = 0; a0 < T; a0++){
        
        
        var n = parseInt(readLine());
        q = readLine().split(' ');
        q = q.map(Number);
        
        
        q = [0].concat(q);
        
        var  working =[0];
        
        var pending =[];
        
        for(var i =1;i<=n;i++){
            working.push(i);
        }
        
        var solution =0;
        
        //console.log('\n',q,'\n');
        
        for(var i=1;i<=n;i++){
            
            //console.log('ITERATION::',i)
            
            //console.log(working);

            
            //console.log('Q: ',q[i],' WORKING: ',working[i]);
            
            if(q[i]!= working[i] ){
                
                var index = working.indexOf(q[i]);
                
                var target =i;
                
                //console.log('TARGET: ',target,'INDEX: ',index);
                
                if( (index - target) > 2 || (target>index) ){
                    pending.push({index:index,target:target,element:q[i]})
                }
                else{
                    
                    var element = working.splice(index,1);
                    
                    var rest = working.splice(target);
                    
                    var working = working.concat(element,rest);
                    
                    solution += index-target;
                }
                
                //console.log('SOLUTION: ',solution);
                
            }
            
            //console.log(working);

            
            var stopCondition =true;
            
            for(var j=1;j<n;j++){
                if(q[j]!== working[j]){
                    stopCondition =false;
                    break;
                }
            }
            
            if(stopCondition){
                console.log(solution);
                break;
            }
            
        }
        
        
        if(pending.length>0){
            console.log('Too chaotic')
        }
        
        
        
        
    }

}
