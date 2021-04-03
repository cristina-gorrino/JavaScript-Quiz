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
var questionsArray = [questionOne, questionTwo];
var i = 0; // index of the questions array, starts at question 1 and increments
var count = 300; // start with 5 minutes
var stopTime // variable to stop the timer if the player reaches the end before time is up
var score = 0; // score is 5 points per correct question, then add remaining time in seconds

// This function controls the timer for the quiz. Starts when the start button is clicked
function setTime(stopTime) {
    if (stopTime) {
        clearInterval(timerInterval); // TODO: fix stopping time when finished with questions
    } else{
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
/// Moves to next question afther the user's answer and displays with either right or wrong answer
 
resultWrongEl.setAttribute("style", "display:none");
resultRightEl.setAttribute("style", "display:none");

    var answeredCorrectly = false; // Tracks whether the current question is answered correctly, triggering the switch to the next question.
    if (element.target.textContent === questionsArray[i].correct) {
        console.log("the right answer!");
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
        console.log('end of the quiz');
        setTime(stopTime = true);
        score += count; //set final score
        switchSection(questionSection, endSection);
        finalScoreEl.textContent = score;
        //submitScore(score);
    } else {
        switchQuestion(i);
    }
    
    console.log(element.target.textContent);
    console.log(score);
}

function handleFormSubmit(event) {
    event.preventDefault();
    //localStorage.clear();
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
    switchSection(endSection, scoresSection);

    // Add it to an ordered list and display on page
    var item = document.createElement("li");
    item.textContent = initials.toUpperCase() + " - " + score;
    scoreListEl.appendChild(item);
    // Ability to clear
    // Ability to go back to start
}

// Actions that happen when start button is clicked
startButton.addEventListener("click", function () {
    setTime();
    switchSection(introSection, questionSection);
    switchQuestion(i);
});


// Event listeners for answer buttons on questions
answerText1El.addEventListener("click", checkIfCorrect);
answerText2El.addEventListener("click", checkIfCorrect);
answerText3El.addEventListener("click", checkIfCorrect);
answerText4El.addEventListener("click", checkIfCorrect);

// Event listener for submitting initials with score

scoreFormEL.addEventListener("submit", handleFormSubmit);