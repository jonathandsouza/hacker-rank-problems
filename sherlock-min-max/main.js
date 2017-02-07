/* CASES :
    
    #1 [*****]  (*****)  I.E  P > MAX(A) (DONE)
    #2 (******) [*****]  I.E  Q < MIN(A) (DONE)
    
    #3 [*** (****) *****]  I.E  MIN(A) <=  P <= Q <= MAX(A)
    
        #3.1 PARTIAL OVERLAP  
        
            #3.1.1  [***** ( ****] ***) I.E P > MIN(A) & P < MAX(A) & Q > MAX(A)
             
            #3.3.2  (**** [ **** ) ***] I.E  P < MIN(A) & Q > = MIN(A) & Q <= MAX(A)
            
        #3.2 FULL OVERLAP     [*** (****) ***] I.E P >= MIN(A) & Q <= MAX(A)
*/


function processData(input) {
    
    var temp = input.split('\n');
    
    var n = parseInt(temp[0]);
    
    var  a = temp[1].split(' ').map(Number);
    
    var  para = temp[2].split(' ').map(Number);
    
    var p = para[0];
    
    var q = para[1];
    
    
    /*   SOLUTION */
    
    heapSort(a);
    
    
    /* TRIVIAL SOLUTION */
    if(p > a[a.length-1] ){
        console.log(q);return;
    }
    
    if(q < a[0]){
        console.log(p);return;
    }
    
    
    
    
    var max =null;
    
    var result = 0;
    
    var finalResult =0;
    
    var str = p;
    
    if( p < a[0] ) {
        
        result = Math.abs(a[0] - p);
        finalResult = p;
        
      str =a[0];
        
    }
    
    for( var i=str ; i<=q ; i++ ){
        
        if(i > a[a.length-1] ){
            
            if(result < Math.abs(a[a.length-1] - q )  ){
               
                result = Math.abs(a[a.length-1] - q );
                finalResult =  q;
                
            }
            break;
        }
        
        
        if(existsInAray(a,i)){
            continue;            
        }
        
        
        var min = null;
        var tempRes = null;
        
        for(var j=0;j<a.length;j++){
            
            var d = Math.abs(a[j] - i);
            
            if( !min || min > d ){
                min =d;
                tempRes = i;
            }
            
        }
        
        if( !result || result < min  ){
           result = min;
           finalResult = tempRes; 
        }
        
    }
    
    console.log(finalResult);
    
    
    function existsInAray(a,e){
       
        for(var i=0;i<a.length;i++){
            
            if(a[i]==e){
                return true;
            }
            
            if(a[i] > e ){
                return false;
            }
            
        }
        
        return false;
        
    }
    
    
}

var heapSort = (function () {
    function heapify(array, index, heapSize) {
        var left = 2 * index + 1,
            right = 2 * index + 2,
            largest = index;

        if (left < heapSize && array[left] > array[index])
            largest = left;

        if (right < heapSize && array[right] > array[largest])
            largest = right;

        if (largest !== index) {
            var temp = array[index];
            array[index] = array[largest];
            array[largest] = temp;
            heapify(array, largest, heapSize);
        }
    }

    function buildMaxHeap(array) {
        for (var i = Math.floor(array.length / 2); i >= 0; i -= 1) {
            heapify(array, i, array.length);
        }
        return array;
    }

    return function (array) {
        var size = array.length,
            temp;
        buildMaxHeap(array);
        for (var i = array.length - 1; i > 0; i -= 1) {
            temp = array[0];
            array[0] = array[i];
            array[i] = temp;
            size -= 1;
            heapify(array, 0, size);
        }
        return array;
    };
}());
