//pull alls the needed elements, and sorts some into arrays
var timeElmnt = document.querySelector(".timer");
var answerAElmnt = document.querySelector("#submitA");
var answerBElmnt = document.querySelector("#submitB");
var answerCElmnt = document.querySelector("#submitC");
var answerDElmnt = document.querySelector("#submitD");
var questionElmnt = document.querySelector("#qContent");
var ansBoxElmnt = document.querySelector(".answerbox");
var answerboxArray = [answerAElmnt, answerBElmnt, answerCElmnt, answerDElmnt];
var verifyElmnt = document.querySelector(".verification");
var hs1Elmnt = document.querySelector("#hs1");
var hs2Elmnt = document.querySelector("#hs2");
var hs3Elmnt = document.querySelector("#hs3");
var hs4Elmnt = document.querySelector("#hs4");
var hs5Elmnt = document.querySelector("#hs5");
var hsElmntArray = [hs1Elmnt, hs2Elmnt, hs3Elmnt, hs4Elmnt, hs5Elmnt];
var startButton = document.querySelector("#startbutton");
var secondsLeft;
var score = 0;
var chosenQ = [];
var clickCount = 0;

//put questions into objects, and then an array to be called later
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

//add event listeners for the buttons on the page

answerboxArray.forEach(item => item.addEventListener("click", checkCorrect));

answerboxArray.forEach(item => item.addEventListener("click", renderQuestions));

startButton.addEventListener("click", startGame);

//calling basic init function that essentially just loads the high scores
init();

function init() {
  getHighScores();
}

//set time interval and a basic win and lose condition
function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function () {
    secondsLeft--;
    var pluralChar = secondsLeft > 1 ? "s" : "";
    timeElmnt.textContent = secondsLeft + " second" + pluralChar + " left";
    if (secondsLeft >= 0 && clickCount >= 5) {

      hasWon();
      clearInterval(timerInterval);


    }
    if (secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // Calls function to create and append image
      sendMessage();


      for (i = 0; i < answerboxArray.length; i++) {
        answerboxArray[i].disabled = true;

      }
    }
  }, 1000);
}

function sendMessage() {
  timeElmnt.textContent = "⏱ Sorry, 'bout that: you have run out of time. ";
}







// The startGame function is called when the start button is clicked
function startGame() {

  secondsLeft = 20;
  setTime()
  // Prevents start button from being clicked when round is in progress
  startButton.disabled = true;
  renderQuestions();
}


//retrieves high scores at beginning of game, if empty, sets a default list
function getHighScores() {
  var hsGotten = JSON.parse(localStorage.getItem("highScores"));
  if (hsGotten !== null) {
    for (j = 0; j < hsElmntArray.length; j++) {
      hsElmntArray[j].textContent = (hsGotten[j].highScore + ":" + hsGotten[j].initials);
    }
  } else {
    var hsArray = [{
      highScore: 01,
      initials: "AAA",
    }, {
      highScore: 00,
      initials: "AAA",
    }, {
      highScore: 00,
      initials: "AAA",
    }, {
      highScore: 00,
      initials: "AAA",
    }, {
      highScore: 00,
      initials: "AAA",
    }];

    localStorage.setItem("highScores", JSON.stringify(hsArray));

    getHighScores();

  }
}

//renders the questions to the page by shifting the first element of the question array
// and randomizing where the answer will show up
function renderQuestions() {

  chosenQ = questionArray.shift();
  questionElmnt.textContent = chosenQ.problem;

  answerArray = [chosenQ.solution, chosenQ.wrong1, chosenQ.wrong2, chosenQ.wrong3];
  shuffle(answerArray);

  for (j = 0; j < answerArray.length; j++) {
    answerboxArray[j].textContent = answerArray[j];
  }
}

// Fisher-Yates Shuffle
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

//checks if the button pressed is the correct answer and either increases and decreases
//score or time accordingly
function checkCorrect(event) {
  event.stopPropagation();
  var buttonpush = event.currentTarget;
  console.log(buttonpush.textContent);

  if (buttonpush.textContent === chosenQ.solution) {
    clickCount += 1;
    score += 10;
    verifyElmnt.textContent = "Correct! Now score = " + score;
  } else {
    clickCount += 1;
    score -= 5;
    secondsLeft -= 3;
    verifyElmnt.textContent = "Nope. Now score = " + score;
  }
}

//alerts when user has won, and asks for initials submission if score makes top scores.
function hasWon() {
  alert("You've won! With a score of " + score);

  var hsGotten = JSON.parse(localStorage.getItem("highScores"));

  if (score > hsGotten[hsGotten.length - 1].highScore) {

    submiths = confirm("Would you like to submit your high score?");
  }
  if (submiths) {
    var fml = prompt("What are your initials?")
    var submission = {
      highScore: score,
      initials: fml,
    };

    hsGotten.push(submission);
    hsGotten.sort((a, b) => a.highScore - b.highScore);
    hsGotten.reverse();
    hsGotten.pop();

    localStorage.setItem("highScores", JSON.stringify(hsGotten));
    getHighScores();
  }
}