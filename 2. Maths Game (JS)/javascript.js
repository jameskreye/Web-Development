
var playing = false;
var action;
var timeremaining;
var score;
var correctAnswer;

//game lan komanse a zero , epi varyab playing komanse ak valeur faux. kote kem rele function an, kom kondisyon if lan pa executer , li ynyorel li ale nan else la, epi else la chanje valeur palying li bal true. sa vle di map jwe, konnya lem klike sou bouton , kondisyon an ale nan true a. li reload page lan epi , li reset page lan.


//if we click on the start button 
document.getElementById("startreset").onclick = function(){
    //if we are playing
    if(playing == true){
        location.reload(); //reload the page 
    }else{
        //if we are not playing
        playing = true;
        //set score to 0
        score = 0        
        document.getElementById("scorevalue").innerHTML = score;
        
        //show countdown box
        timeremaining = 60;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        
        //hide game over box
        hide("gameOver");
       
        //i show time remaining box that was hidden. the display was none in the css file
       show("timeremaining"); 
        
        //change button to reset 
        document.getElementById("startreset").innerHTML = "Reset Game";
        
        startCountdown();
        
        //generate a new Q&A
        generateQA();
        
    }
}

//seccion donde se hace click sobre el numero , correcto o incorrecto
for(i = 1; i < 5 ; i++ ){
       document.getElementById("box"+i).onclick = function(){
        //check if we are playing
        if(playing == true){
            //check now if answer is correct
            //i use this here , because i am referring to that same box that is being clicked.
            if(this.innerHTML == correctAnswer){
                //correct answer
                score++;
                //actualizamos el nuevo valor de score
                document.getElementById("scorevalue").innerHTML = score;
                
                //hide wrong box and show correct box
                hide("wrong");
                show("correct");
                setTimeout(function(){
                    hide("correct");
                }, 1000);
                
                generateQA();
                showPrize(score,"medal");
            }else{
                hide("correct");
                show("wrong");
                setTimeout(function(){
                    hide("wrong");
                }, 1000);
            }
            
        }
    }
}



//function sections



//countdown function 
function startCountdown(){
    action = setInterval(function(){
        timeremaining -= 1;
document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        if(timeremaining == 0){ //game over
            stopCountdown();
           show("gameOver");
            document.getElementById("gameOver").innerHTML =
                "<p>Game over!</p><p>Your score is " + score + ".</p>";
            
            //making the time remaining box desapear
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            
            playing = false;
            document.getElementById("startreset").innerHTML = "Start Game";
            
        }
    }, 1000);
}


function showPrize(score,id){
    if(score == 10){
        show(id);
    }
}

//function to stop the counter so it dont go below zero
function stopCountdown(){
    clearInterval(action);
}


//function to hide 
function hide(id){
    document.getElementById(id).style.display = "none";
}

//function to show 
function show(id){
    document.getElementById(id).style.display = "block";
}

//generate question and answer
function generateQA(){
    var x = 1 + Math.round(9*Math.random());
    var y = 1 + Math.round(9*Math.random());
    correctAnswer = x * y;
    
    document.getElementById("question").innerHTML = x + "x" + y;
    
    //generate a random number from 1 to 4 , so the correct answer can fall randomly on a any box
    var correctPosition = 1 + Math.round(3*Math.random());
    
    document.getElementById("box"+correctPosition).innerHTML = correctAnswer;
    
    
    //fill other boxes with wrong answers
    //this array start with one value, and later more values
    //are added with the method push
    var answers = [correctAnswer]
    
    for(i=1; i < 5; i++){
        if(i !== correctPosition){
            var wrongAnswer;
            do {
                wrongAnswer = (1 + Math.round(9*Math.random()))
                * 
                (1 + Math.round(9*Math.random()));

            }while(answers.indexOf(wrongAnswer) > -1)
                
             document.getElementById("box"+i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
    
    //click on answer box 
    document.getElementById("box1").onclick = function(){
        //check if we are playing
        if(playing == true){
            //check now if answer is correct
            //i use this here , because i am referring to that same box that is being clicked.
            if(this.innerHTML == correctAnswer){
                //correct answer
                score++;
                //actualizamos el nuevo valor de score
                document.getElementById("scorevalue").innerHTML = score;
                
                //hide wrong box and show correct box
                hide("wrong");
                show("correct");
                setTimeout(function(){
                    hide("correct");
                }, 1000);
                
                generateQA();
                
            }else{
                hide("correct");
                show("wrong");
                setTimeout(function(){
                    hide("wrong");
                }, 1000);
            }
            
        }
    }
}