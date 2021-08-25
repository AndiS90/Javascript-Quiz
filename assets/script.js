var timeElmnt = document.querySelector(".timer");
var answerAElmnt = document.querySelector("#submitA");
var answerBElmnt = document.querySelector("#submitB");
var answerCElmnt = document.querySelector("#submitC");
var answerDElmnt = document.querySelector("#submitD");
var questionElmnt = document.querySelector("#qContent");
var ansBoxElmnt = document.querySelector(".answerbox");
var answerboxArray = [answerAElmnt, answerBElmnt, answerCElmnt, answerDElmnt];
var hs1Elmnt = document.querySelector("#hs1");
var hs2Elmnt = document.querySelector("#hs2");
var hs3Elmnt = document.querySelector("#hs3");
var hs4Elmnt = document.querySelector("#hs4");
var hs5Elmnt = document.querySelector("#hs5");
var startButton = document.querySelector("#startbutton");
var secondsLeft;
var isCorrect = false;
// var i=0;


var question1 = {
    problem: "Inside which HTML element do we put the JavaScript?",
    solution: "<script>",
    wrong1: "<javascript>",
    wrong2: "<scripting>",
    wrong3: "<js>"
};

var question2 = {
    problem: "How do you write \"Hello World\" in an alert box?",
    solution: "alert(\"Hello World\"); ",
    wrong1: "msg(\"Hello World\");",
    wrong2: "msgBox(\"Hello World\");",
    wrong3: "alertBox(\"Hello World\");",

};

var question3 = {
    problem: "How to write an IF statement for executing some code if \"i\" is NOT equal to 5?",
    solution: "if (i != 5)",
    wrong1: "if (i <> 5)",
    wrong2: "if i =! 5 then",
    wrong3: "if i <> 5",
};

var question4 = {
    problem: "How does a FOR loop start?",
    solution: "for (i = 0; i <= 5; i++) ",
    wrong1: "for (i = 0; i <= 5)",
    wrong2: "for i = 1 to 5",
    wrong3: "for (i <= 5; i++)",
};


var question5 = {
    problem: "Which operator is used to assign a value to a variable?",
    solution: "= ",
    wrong1: "*",
    wrong2: "-",
    wrong3: "+",
    
};

var questionArray = [question1, question2, question3, question4, question5];

function setTime() {
    // Sets interval in variable
    var timerInterval = setInterval(function() {
      secondsLeft--;
      var pluralChar = secondsLeft > 1 ? "s" : "";  
      timeElmnt.textContent = secondsLeft + " second" +pluralChar+ " left";
        if (secondsLeft >= 0) {
        // Tests if win condition is met
        if (youWin && secondsLeft > 0) {
          // Clears interval and stops timer
          clearInterval(timerInterval);
          winGame();
          }
      }
      if(secondsLeft === 0) {
        // Stops execution of action at set interval
        clearInterval(timerInterval);
        // Calls function to create and append image
        sendMessage();
         }
  
    }, 1000);
  }

  function sendMessage() {
    timeElmnt.textContent = "You have run out of time ";
         }
         

// The init function is called when the page loads 
function init() {
  getHighScores()
}



// The startGame function is called when the start button is clicked
function startGame() {
  youWin = false;
  secondsLeft = 15; 
  setTime()
  // Prevents start button from being clicked when round is in progress
  startButton.disabled = true;
   renderQuestions();

}


// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startGame);

function renderQuestions(){
   var i=0;
  while ( i < questionArray.length){
    var chosenQ = questionArray[i];
  questionElmnt.textContent= chosenQ.problem;
  
  answerArray= [chosenQ.solution, chosenQ.wrong1, chosenQ.wrong2, chosenQ.wrong3];
   shuffle(answerArray);

    for (j=0; j< answerArray.length; j++){
  answerboxArray[j].textContent = answerArray[j];
    }  

 
 
  }


}  

ansBoxElmnt.addEventListener("click", renderQuestions(i++));


function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}