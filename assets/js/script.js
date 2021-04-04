var timerEl = document.querySelector("#timer-count");
var startButton = document.querySelector("#start-button");
var introSection = document.querySelector(".intro-container");
var questionSection = document.querySelector(".question-container");
var endSection = document.querySelector(".end-container");
var scoresSection = document.querySelector(".scores-container");

var questionTextEl = document.querySelector("#question-text");
var answerText1El = document.querySelector("#answer1");
var answerText2El = document.querySelector("#answer2");
var answerText3El = document.querySelector("#answer3");
var answerText4El = document.querySelector("#answer4");
var resultRightEl = document.querySelector("#result-right");
var resultWrongEl = document.querySelector("#result-wrong");
var finalScoreEl = document.querySelector("#final-score");

var scoreFormEL = document.querySelector("#score-form");
var initialsInput = document.querySelector("#initials-input");
var scoreListEl = document.querySelector("#score-list");
var clearButtonEl = document.querySelector("#clear-btn");
var backButtonEl = document.querySelector("#back-btn");
var viewScoresEl = document.querySelector("#see-scores");

var questionOne = {
    questionText: "Commonly used data types DO NOT include:",
    answer1: "strings",
    answer2: "booleans",
    answer3: "alerts",
    answer4: "numbers",
    correct: "alerts",
}
var questionTwo = {
    questionText: "The condition in an if / else statement is enclosed within ____.",
    answer1: "quotes",
    answer2: "curly brackets",
    answer3: "parentheses",
    answer4: "square brackets",
    correct: "parentheses", 
}
var questionThree = {
    questionText: "Arrays in JavaScript can be used to store ____.",
    answer1: "numbers and strings",
    answer2: "other arrays",
    answer3: "booleans",
    answer4: "all of the above",
    correct: "all of the above", 
}
var questionFour = {
    questionText: "String values must be enclosed within ____ when being assigned to variables.",
    answer1: "commas",
    answer2: "curly brackets",
    answer3: "quotes",
    answer4: "parentheses",
    correct: "quotes", 
}
var questionFive = {
    questionText: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answer1: "JavaScript",
    answer2: "terminal / bash",
    answer3: "for loops",
    answer4: "console.log",
    correct: "console.log", 
}
var questionsArray = [questionOne, questionTwo, questionThree, questionFour, questionFive];
var i = 0; // index of the questions array, starts at question 1st element and increments
var count = 120; // start with 2 minutes
var timerInterval
var score // score is 5 points per correct question, then add remaining time in seconds
var newGame = true; // variable that starts the score over when the user tries quiz again

// This function controls the timer for the quiz. Starts when the start button is clicked
function setTime() {
    // Sets interval running
    timerInterval = setInterval(function() {
        count--;
        timerEl.textContent = count;
    
        if(count === 0) {
          // Stops execution of action at set interval
          clearInterval(timerInterval);
          endQuiz(score);
  
        }
    
      }, 1000);
    }

// Switches the section of the UI that is visible
function switchSection(hideSection, showSection) {
    hideSection.setAttribute("style", "display: none");
    showSection.setAttribute("style", "display:block");
}

// Updates the question text and set of responses from an array of question objects
function switchQuestion(i) {
  questionTextEl.textContent = questionsArray[i].questionText;
  answerText1El.textContent = questionsArray[i].answer1;
  answerText2El.textContent = questionsArray[i].answer2;
  answerText3El.textContent = questionsArray[i].answer3;
  answerText4El.textContent = questionsArray[i].answer4;
}

function checkIfCorrect(element) {
/// Moves to next question afther the user's answer and displays with either right or wrong answer text
 
  resultWrongEl.setAttribute("style", "display:none");
  resultRightEl.setAttribute("style", "display:none");
  // reset the score if the user starts again
  if (newGame) {
      score = 0;
      newGame = false;
  }
    
    if (element.target.textContent === questionsArray[i].correct) {
        score += 5;
        resultWrongEl.setAttribute("style", "display:none");
        resultRightEl.setAttribute("style", "display:block");
        answeredCorrectly = true;
    } else {
        resultRightEl.setAttribute("style", "display:none");
        resultWrongEl.setAttribute("style", "display:block");
        count -= 10;
        timerEl.textContent = count;
    }
    i ++;
    if (i > questionsArray.length-1){
        finalScoreEl.textContent = score;
        endQuiz(score);
        
    } else {
        switchQuestion(i);
    }
    return score;
}
function endQuiz(score) {
    finalScoreEl.textContent = score;
    clearInterval(timerInterval);
    switchSection(questionSection, endSection);

}

function handleFormSubmit(event) {
    event.preventDefault();
 
    // Submit initials and current score, and save them in local storage
    score = finalScoreEl.textContent
    initials = initialsInput.value;
    // Ensure that user submits something
    if (!initials) {
        alert('No initials filled out in form!');
        return;
      }
    //localStorage.getItem("score", score);
    //localStorage.getItem("initials", initials);
    localStorage.setItem("score", score);
    localStorage.setItem("initials", initials);
    initialsInput.value = '';
    switchSection(endSection, scoresSection);

    // Add it to a list and display on page
    var item = document.createElement("li");
    item.textContent = initials.toUpperCase() + " - " + score;
    scoreListEl.appendChild(item);
}
function clearHighScores() {
    localStorage.clear();
    var oldScores = scoreListEl.querySelectorAll('li');

    for (var j=0; j<oldScores.length; j++) {
        scoreListEl.removeChild(oldScores[j]);
    }
}
function handleBack() {
    switchSection(scoresSection, introSection);
    // Re-set questions and set up variable to to start quiz again
    i = 0;
    switchQuestion(i);
    newGame = true;
    return newGame;
}

function handleViewScores() {
    switchSection(introSection, scoresSection);
}

// Actions that happen when start button is clicked
startButton.addEventListener("click", function () {
    setTime();
    switchSection(introSection, questionSection);
    switchQuestion(i);
    resultWrongEl.setAttribute("style", "display:none");
    resultRightEl.setAttribute("style", "display:none");
    count = 120; //starting time again
});

// Event listeners for answer buttons on questions
answerText1El.addEventListener("click", checkIfCorrect);
answerText2El.addEventListener("click", checkIfCorrect);
answerText3El.addEventListener("click", checkIfCorrect);
answerText4El.addEventListener("click", checkIfCorrect);

// Event listener for submitting initials with score
scoreFormEL.addEventListener("submit", handleFormSubmit);

// Event listener to clear high scores
clearButtonEl.addEventListener("click", clearHighScores);
// Event listener to go back to the game 
backButtonEl.addEventListener("click", handleBack);
// Event listener for "View High Scores" in header
viewScoresEl.addEventListener("click", handleViewScores);

// TODO: if you refresh, you lose the high score history
// TODO: remove console.logs 
