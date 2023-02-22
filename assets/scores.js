var highScore = JSON.parse(localStorage.getItem("highScore")) || []; //takes the highscore key from local storage and places it into this variable

var clearButton = document.getElementById("clear-score"); //variable clear button for the clear score element

clearButton.addEventListener("click", function() {  //event listener for the click clear button function 
    highScore = []; 
    localStorage.removeItem("highScore"); //removes the highscores from the list
    updateHighScoreList();
});

updateHighScoreList();
//assigning the stored value to the variable , if its not null then it will be stored
var storedHighScore = JSON.parse(localStorage.getItem("highScore"));
if (storedHighScore !== null) {
    highScore = storedHighScore;
}

function saveHighScore() { //saving highscore to the local storage
    localStorage.setItem("highScore", JSON.stringify(highScore));
}

function addHighScore(initials, score) { //function to sort and add the highscores to the list
    highScore.push({ initials: initials, score: score });
    highScore.sort(function(a, b) {
        return b.score - a.score;

    });
    if (highScore.length >10) {
        highScore.pop();
    }
    saveHighScore();
    updateHighScoreList();
}

function updateHighScoreList() { //highscore is sorted and added to the list, and displays it on the screen
    var highScoreList = document.getElementById("high-score-list");
    highScoreList.innerHTML = "";

    highScore.sort(function (a, b) {
        return b.score - a.score;
    });

    for (var i = 0; i < highScore.length; i++) {
        var li =document.createElement("li");
        li.textContent = highScore[i].initials + " - " + highScore[i].score;
        highScoreList.appendChild(li);
    }

}