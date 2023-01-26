"use strict"; 

//Clears all active segments
function clearActive() {
    for (var a in elements){
        for (var b in elements[a].classList){
            //If the segment is active (added to the classList), clear it(remove from classList)
            "active" === elements[a].classList[b] && elements[a].classList.remove("active");
        }
    }  
}

//Adds "active" to the element's classList (the 7 segments)
function addActive(a) {
    elements[a].classList.add("active");
}

//Makes the segment active on index.html depending on the current sequence
    //Parameter a = counter of current sequence
    //b = current sequence (ex, "000001")
function printSequence(a) {
    for (var b = sequence[a], c = 0; c < b.length; c++){
        //Start - Checking
        console.log("sequence[" + a + "] = " + sequence[a]);
        console.log(b + "[" + c + "] = " + b[c]);
        if("1" === b[c]){
            console.log("Equal to 1. Make segment number " + c + " active");
        }
        //End - Checking

        "1" === b[c] && addActive(c);
    }
        
}

//Called on load
function stepSequence() {
    //Clear all active segments
    clearActive(),        
    
    //Reset the sequence counter to 0 when it goes over
    //If the counter is >= sequence length, set counter = 0
    counter >= sequence.length && (counter = 0), 

    //Make the segments active based on current sequence
    printSequence(counter), 

    //Displaying sequence
    document.getElementById("display").innerHTML = sequence[counter];
    document.getElementById("integerDisplay").innerHTML = parseInt(sequence[counter], 2);

    //Increments counter to next sequence
    counter++, 
    
    //Calls this function again recursively
    setTimeout(stepSequence, frequency);
}

var frequency = 1e3;


var sequence = [
   /* "1110111", //0
    "0010010", //1
    "1011101", //2
    "1011011", //3
    "0111010", //4
    "1101011", //5
    "1101111", //6
    "1010010", //7
    "1111111", //8
    "1111010"  //9*/
]; 

//"*" - Used to select any and all types of elements in an HTML page; In this case it's getting all SVG elements
//".getElementsByTagName" - returns an array-like object called HTMLCollection
//elements = 
var elements = document.getElementById("shape").getElementsByTagName("*"); 

var counter = 0;

//On load, call stepSequence()
window.onload = function() {
    
    //Putting binary sequences from 0-127 in sequence array
    for(var num = 0; num <= 127; num++){
        let binaryStr = num.toString(2); //the number in base 2 binary

        //Add 0s to beginning if less than 7 places
        while(binaryStr.length < 7){
            binaryStr = "0" + binaryStr;
        }

        console.log(num + " = " + binaryStr);
        sequence.push(binaryStr);
    }

    //Debugging
    for(var a in elements){
        console.log("elements[" + a + "]");
        for (var b in elements[a].classList){
            console.log("elements[" + a + "].classList[" + b + "]");
        }
    }

    //Begin stepSequence
    stepSequence();
};