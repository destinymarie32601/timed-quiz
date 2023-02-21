var highScore = JSON.parse(localStorage.getItem("highScore")) || [];

var clearButton = document.getElementById("clear-score");

clearButton.addEventListener("click", function() {
    highScore = [];
    localStorage.removeItem("highScore");
    updateHighScoreList();
});

updateHighScoreList();

var storedHighScore = JSON.parse(localStorage.getItem("highScore"));
if (storedHighScore !== null) {
    highScore = storedHighScore;
}

function saveHighScore() {
    localStorage.setItem("highScore", JSON.stringify(highScore));
}

function addHighScore(initials, score) {
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

function updateHighScoreList() {
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