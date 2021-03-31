var timerEl = document.querySelector("#timer-count");
var startButton = document.querySelector("#start-button");
var introSection = document.querySelector(".intro-container");
var questionSection = document.querySelector(".question-container");
var endSection = document.querySelector(".end-container");
var scoresSection = document.querySelector(".scores-container");
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

function switchSection(hideSection, showSection) {
    hideSection.setAttribute("style", "display: none");
    showSection.setAttribute("style", "display:block");
}  

startButton.addEventListener("click", function () {
    setTime();
    switchSection(introSection, questionSection);
})