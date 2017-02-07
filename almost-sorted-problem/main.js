function processData(input) {
    
    var temp = input.split('\n');
    
    var  n = parseInt(temp[0]);
    
    var  a =  temp[1].split(' ').map(Number);
    
    var copy = temp[1].split(' ').map(Number);
    
        
    //swap
    
    var i,j
    
    for(i=0;i<n && a[i]<a[i+1];i++);
    
    for(j =i+1;j<n&& a[i]>a[j];j++);
    
    if(i<n&& (j-1)<n ){ 
         var k =a[i];
          a[i] = a[j-1];
          a[j-1] = k;

         if(check(a,n)){ 
             console.log('yes');
             console.log('swap',i+1,j);
             return;
             
         }
        
    }
    
    a = copy;
    
    var str = a.slice(0,i);
    var middle = a.slice(i,j-i);
    var end = a.slice(j);
    
    //console.log(i,j,str,middle,end);
    
    if( check(str.concat(middle.reverse(),end),n)){
        console.log("yes");
        console.log('reverse',i+1,j);return;
    }
    
    console.log("no");
} 


function check(a,n){
    for(var i=1;i<n;i++){
        if(a[i-1]>a[i]){return false;}
    }
    return true;
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
