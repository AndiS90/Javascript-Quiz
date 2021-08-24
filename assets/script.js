var timeElmnt = document.querySelector(".timer");

var secondsLeft = 10;

function setTime() {
    // Sets interval in variable
    var timerInterval = setInterval(function() {
      secondsLeft--;
      var pluralChar = secondsLeft > 1 ? "s" : "";  
      timeElmnt.textContent = secondsLeft + " second" +pluralChar+ " left";
  
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
    setTime();