var questionsEl = document.querySelector("#questions");
var answerEl = document.querySelectorAll(".answer");
var startButton = document.querySelector(".start-button");
var header2 = document.querySelector("h2"); // trying to erase the header 2
var currentQuestionIndex = 0; //important variable to keep track of the question being displayed, starting at 0 will make sure the first question is shown, and the value will go up as the questions are answered
var score = 0; //set the score initially to 0 so that it can build the score based on the answers
var timerEl = document.querySelector("#timer");
var timerInterval; 
var timeRemaining = 80;
var highScore = [];
var highScore = JSON.parse(localStorage.getItem("highScore")) || [];

var questionArray = [
    {
        question:"Commonly used data types DO NOT include: ",
        choices: ["Booleans", "Strings", "Alerts", "Numbers"],
        correctChoice: "Alerts"
        
    },
    {
        question:"The condition in an if / else statement is enclosed with what? ",
        choices: ["Curly Brackets", "Parenthesis", "Square Brackets", "Quotations"],
        correctChoice: "Parenthesis"
    },
    {
        question:"Arrays in Javascript can be used to store what? ",
        choices: ["Other Arrays", "Numbers and Strings", "Booleans", "All the above"],
        correctChoice: "All the above"
    },
    {
        question:"String values must be enclosed within ____ when being assigned to variables. ",
        choices: ["Parenthesis", "Quotes", "Curly Brackets", "Commas"],
        correctChoice: "Quotes"
    },
    {
    question:"A very useful tool used during development and debugging for printing content to the debugger is: ",
        choices: ["Javascript", "Terminal/Bash", "Console.log", "For Loops"],
        correctChoice: "Console.log"
    },
];

function startTimer() {
    timerInterval = setInterval(function() {
        timeRemaining--;
        timerEl.textContent = "Time Remaining: " + timeRemaining;
        if (timeRemaining <= 0) {
            endQuiz();
        }
    }, 1000);
}

function displayQuestion() {
    var question = questionArray[currentQuestionIndex];
    questionsEl.textContent = question.question;
    for (var i =0; i <answerEl.length; i++) {
        answerEl[i].textContent = question.choices[i];
        answerEl[i].addEventListener("click", selectAnswer)
        answerEl[i].sty;endQuiz.display = "block"; //testing
    }
}

function selectAnswer() {
    if (this.textContent === questionArray[currentQuestionIndex].correctChoice) {
        score++;
    } else {
        timeRemaining -= 10;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questionArray.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    clearInterval(timerInterval);
    var finalScore = score * timeRemaining;
    alert("Your final score is " + finalScore);
    document.getElementById("initials-form").style.display = "block";
}

var submitButton = document.getElementById("submit-score");
submitButton.addEventListener("click", function () {
    var initials = document.getElementById("initials").value;
    var scoreData = { initials: initials, score: score * timeRemaining };
    highScore.push(scoreData);
    localStorage.setItem("highScore", JSON.stringify(highScore));
    window.location.href = "./scores.html";
});

function startQuiz() {
    startTimer();
    displayQuestion();
}

var startButton = document.querySelector(".start-button");
startButton.addEventListener("click", startQuiz);


startButton.addEventListener("click", function() {
    header2.style.display = "none"; //making the header2 disappear once the start button is clicked
    startButton.style.display = "none"; 
    answerEl.forEach(function(button) {
        button.style.display = "block";
    });
});