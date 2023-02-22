var questionsEl = document.querySelector("#questions"); //takes the questions element id from html and puts it into the questionsEL VARIABLE
var answerEl = document.querySelectorAll(".answer"); //Takes the answers class and assigns it to the variable
var startButton = document.querySelector(".start-button"); //puts the start button class into the variable
var header2 = document.querySelector("h2"); // trying to erase the header 2
var currentQuestionIndex = 0; //important variable to keep track of the question being displayed, starting at 0 will make sure the first question is shown, and the value will go up as the questions are answered
var score = 0; //set the score initially to 0 so that it can build the score based on the answers
var timerEl = document.querySelector("#timer"); //creates a variable for the timer and holds the timer element id from html
var timerInterval; //creating a variable for the time interval
var timeRemaining = 80; //setting the time remaining to 80 in the variable.
var highScore = []; // empty array for the highscore variable for the scores to go into
var highScore = JSON.parse(localStorage.getItem("highScore")) || []; //takes the value of the array from the local storage and puts it into the variable and assigns an empty array if nothings in the local storage

var questionArray = [ //question array variable holding the questions and answer choices along with the correct choices
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

function startQuiz() { //function to start quiz and start time and display question
    startTimer();
    displayQuestion();
}

var startButton = document.querySelector(".start-button");
startButton.addEventListener("click", startQuiz);

function startTimer() { //timer function 
    timerInterval = setInterval(function() { //timer interval method to bring down the time by 1 and then display the time remaining
        timeRemaining--; 
        timerEl.textContent = "Time Remaining: " + timeRemaining;
        if (timeRemaining <= 0) { //if the time gets to 0 then the quiz will end
            endQuiz();
        }
    }, 1000); //nummber of seconds for the interval to call 
}

function displayQuestion() { //function to display the questions and answers
    var question = questionArray[currentQuestionIndex]; //stores the array of questions into the variable
    questionsEl.textContent = question.question;
    for (var i =0; i <answerEl.length; i++) { //for loop to go through the answers elements
        answerEl[i].textContent = question.choices[i]; //set the txt content to a choice from currect choice
        answerEl[i].addEventListener("click", selectAnswer) //add event listener to select answer when it is clicked
      //  answerEl[i].sty;endQuiz.display = "block"; //testing
    }
}

function selectAnswer() { //function to check if the users choice is the same as the correct choice
    if (this.textContent === questionArray[currentQuestionIndex].correctChoice) {
        score++; //add 1 to score if the answers match
    } else { //if not then it subtracts 10 from the time
        timeRemaining -= 10;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questionArray.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() { //function to end the quiz and clear the time interval 
    clearInterval(timerInterval); 
    var finalScore = score * timeRemaining; //variable for the finalscore multiplies by time remaining
    alert("Your final score is " + finalScore); //displays final score
    document.getElementById("initials-form").style.display = "block"; //form for the initials
}

var submitButton = document.getElementById("submit-score"); //saves the score and initials to be saved in the local storage
submitButton.addEventListener("click", function () {
    var initials = document.getElementById("initials").value;
    var scoreData = { initials: initials, score: score * timeRemaining };
    highScore.push(scoreData);
    localStorage.setItem("highScore", JSON.stringify(highScore));
    window.location.href = "./scores.html";
});

startButton.addEventListener("click", function() {
    header2.style.display = "none"; //making the header2 disappear once the start button is clicked
    startButton.style.display = "none"; 
    answerEl.forEach(function(button) {
        button.style.display = "block";
    });
});

//citations : 
// Classmates : I got some help with some of the basic outlines / functions from these classmates listed during a study group : Gabby Pinto, Matthew Baty, Cole Goddard.
// I used chat gbt to become familiar with some of the functions and the buttons
// ChatGBT.OpenAI.2023-02-20.

