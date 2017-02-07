function processData(input) {

    var temp = input.split('\n');
    
    var testCases =  parseInt(temp[0])
    
    var nArray=[];
    var kArray=[];
    var bArray=[];
    
    var maxN=0 , maxK=0;
    
    for(var i=1 ; i <= testCases ; i++){
        
        var parameters =  temp[i].split(' ').map(Number);
        
        nArray.push(parameters[0]);
        kArray.push(parameters[1]);
        bArray.push(parameters[2]);
        
        maxN =  maxN > parameters[0]?maxN : parameters[0];
        maxK =  maxK > parameters[1]?maxK : parameters[1];
         
        
    }
    
    map = [];
    
    for(var j=1;j<=maxK;j++){
        map[j]=[];
        map[j][0]=0;
    }
    
    map[0]=[];
    map[0][0]=0;
    
    for(var j=1;j<=maxN;j++){
        map[1][j]=1;
        map[0][j]=0;
    }
    
 

   for(var i=2;i<=maxK;i++){
    for(var j=1;j<=maxN;j++){
        if(j<i){
                map[i][j] = map[i-1][j]; 
             }
             else{
                    map[i][j] = Math.max(map[i-1][j],i+map[i-1][j-i]);
            }
        }
       
   }
    
    
    /*for(var i=0;i<=maxK;i++){
        console.log(i,map[i])
    }*/
   
   
   for(var t=0;t<testCases;t++){
       
       var solutions =[];
       
       var n = nArray[t];
       var k = kArray[t];
       var b = bArray[t];
       
       var noSolutionCondition =true;
        
       //console.log(n,k,b);
       for(var i = (k>n?n:k); i >= 1 && map[i][n] == n ;i--){
            
            var tempSol =[];
            
            tempSol.push(i);
            
            var recusiveSolutionFinder = function(row,col,w,tmap,sol){
                
                //console.log('recursive::::',row,col,w,sol)
                
                if(tmap[row-1][col-w]==0){
                    return;
                    
                }else{
                    
                    for(var i=(row-2>=0?row-2:-1); i>0 && tmap[i][col-w]==tmap[row-1][col-w] ;i--);
                    
                    //console.log('i::::::',i);
                    
                    if(++i>0){ 
                        sol.push(i);
                        recusiveSolutionFinder(i,col-w,i,tmap,sol);
                    }
                    
                }
            }

            //console.log('START>>>>',i,n,i);
            recusiveSolutionFinder(i,n,i,map,tempSol);
            //console.log('END>>>>>',tempSol)
            
            
            if(tempSol.length == b){
               // console.log('FINAL SOLUTION::::>>>>>',tempSol);
                console.log(tempSol.join(' '));
                noSolutionCondition =false;
                break;
            }
        
        }
        
       if(noSolutionCondition)
        console.log(-1)
       
       
                                   
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
