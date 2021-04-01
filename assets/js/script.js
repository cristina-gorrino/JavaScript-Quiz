var timerEl = document.querySelector("#timer-count");
var startButton = document.querySelector("#start-button");
var introSection = document.querySelector(".intro-container");
var questionSection = document.querySelector(".question-container");
var endSection = document.querySelector(".end-container");
var scoresSection = document.querySelector(".scores-container");

var questionTextEl = document.querySelector("#question-text");
var answerText1El = document.querySelector("#answer1-text");
var answerText2El = document.querySelector("#answer2-text");
var answerText3El = document.querySelector("#answer3-text");
var answerText4El = document.querySelector("#answer4-text");

var questionOne = {
    questionText: "asdf",
    answer1: "a",
    answer2: "b",
    answer3: "c",
    answer4: "d",
    correct: "a",
}
var questionTwo = {
    questionText: "qwerty",
    answer1: "e",
    answer2: "f",
    answer3: "g",
    answer4: "h",
    correct: "e", 
}
var count = 300; // start with 5 minutes

// This function controls the timer for the quiz. Starts when the start button is clicked
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

// Switches the section of the UI that is visible
function switchSection(hideSection, showSection) {
    hideSection.setAttribute("style", "display: none");
    showSection.setAttribute("style", "display:block");
}

// WIP- Updates the question text and set of responses from a set of objects
function switchQuestion(i) {
    var i = 0; // starts quiz at question 1

    // collect question objects in an array, then display them
    var questionsArray = [questionOne, questionTwo];
    function display(i) {
        questionTextEl.textContent = questionsArray[i].questionText;
        answerText1El.textContent = questionsArray[i].answer1;
        answerText2El.textContent = questionsArray[i].answer2;
        answerText3El.textContent = questionsArray[i].answer3;
        answerText4El.textContent = questionsArray[i].answer4;
    }
    display(i);


}
switchQuestion(1);

// Actions that happen when start button is clicked
startButton.addEventListener("click", function () {
    setTime();
    switchSection(introSection, questionSection);
})