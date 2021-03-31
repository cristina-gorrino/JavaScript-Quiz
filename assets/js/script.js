var timerEl = document.querySelector("#timer-count");
var startButton = document.querySelector("#start-button");
var count = 300; // start with 5 minutes
function setTime() {
    // Sets interval in variable
    var timerInterval = setInterval(function() {
      count--;
      timerEl.textContent = count;
  
      if(count === 0) {
        // Stops execution of action at set interval
        clearInterval(timerInterval);

      }
  
    }, 1000);
  }

startButton.addEventListener("click", function () {
    setTime();
})