let root = document.querySelector(":root");

// let players = 3;// = prompt("Podaj liczbę graczy");

let playersLabel = document.querySelector("label[for = \"players\"]");
let players = document.querySelector("#players-input");
let playerNames = document.querySelectorAll("form .name");
let playerNamesLabel = document.querySelectorAll("form .name-label");
let startBtn = document.querySelector("#start-btn");
let form = document.querySelector("form");

let scoreGrid = document.querySelector("#scoreGrid");
let gameOver = null;
let turn = null;

updateForm();
players.addEventListener("change", updateForm);
startBtn.addEventListener("click", function(){
    initGame();
    gameOver = false;
});



function updateForm(){
    playersLabel.textContent = "Liczba graczy: " + players.value;
    for(let i = 0; i < 4; i++){
        if (i >= players.value) {
            playerNames[i].classList.add("hide");
            playerNamesLabel[i].classList.add("hide");
        }
        else if(i<players.value){
            playerNames[i].classList.remove("hide");
            playerNamesLabel[i].classList.remove("hide");
        }
    }
}

function initGame(){
    // show the score grid only
    root.style.setProperty("--plyr-number", players.value);
    scoreGrid.classList.remove("hide");
    form.classList.add("hide");

    // show players' names
    for(let i = 0; i < players.value; i++){
        scoreGrid.innerHTML += "<div id=\"plyr" + (i+1) + "\" class=\"plyr\">" + playerNames[i].value + "</div>";
    }

    // show players' scores
    for(let i = 0; i < players.value; i++){
        scoreGrid.innerHTML += "<div id=\"plyr" + (i+1) + "-sum\" class=\"score\">" + 0 + "</div>";
    }
    scoreGrid.insertAdjacentHTML("beforeend", "<input type=\"button\" id=\"next-round\" value=\"Dodaj kolejną rundę\">");
    let nextRound = document.querySelector("#next-round");
    nextRound.addEventListener("click", initTurn);
}

function initTurn(){
    turn++;
    // add input for scores in the turn
    for(let i = 0; i < players.value; i++){
        scoreGrid.insertAdjacentHTML("beforeend", "<input type=\"number\" id=\"plyr-" + (i+1) + "-turn-" + turn + "\" class=\"turn-"+ turn + "\" placeholder=\"" + 0 + "\" min=\"0\">");
    }
    // update sum score when changing score in turn
    let lastTurn = document.querySelectorAll(".turn-" + turn);
    lastTurn[0].addEventListener("input", updateScore);
    for(let i = 0; i<players.value; i++){
        lastTurn[i].addEventListener("change", updateScore);
    }
    updateNextRound();
}

function updateNextRound(){
    let nextRound = document.querySelector("#next-round");
    nextRound.parentNode.removeChild(nextRound);
    scoreGrid.insertAdjacentHTML("beforeend", "<input type=\"button\" id=\"next-round\" value=\"Dodaj kolejną rundę!\">");
    nextRound = document.querySelector("#next-round");
    nextRound.addEventListener("click", initTurn);
}
    /*
    // update sum score when changing score in turn
    let lastTurn = document.querySelectorAll(".turn-" + turn);
    lastTurn.forEach(function(turnScore){
        turnScore.addEventListener("input", function(){
            updateScore();
        })
    })*/

function updateScore(){
    // pull turn scores to arrays and to score sum
    let turnScore = [];
    let scores=[];
    let scoresDisp = document.querySelectorAll(".score");
    for (let i = 0; i<players.value;i++){
        turnScore[i]=[];
        scores[i] = 0;
        for (let j = 0; j<turn; j++){
            turnScore[i][j] = Number(document.querySelector("#plyr-" + (i+1) +"-turn-" + (j+1)).value);
            scores[i] += turnScore[i][j];
        }
    scoresDisp[i].textContent = scores[i];
    }
}

function clearGame(){
    scoreGrid.classList.add("hide");
}



/*-------------------------------------------------------

let turnScore = [[5, 7],[12, 4],[3, 9]];
let score = [];

for(let i = 0; i<players.value; i++){
    score[i] = turnScore[i].reduce((a,b) => a + b, 0)
}

let rounds = 2;

for(let i=0; i<players;i++){
    score[i]=0;
    for(let j = 0; j < rounds; j++){
        let turnScore = document.querySelector("#plyr-"+(i+1)+"-turn-"+(j+1));
        score[i] = score[i] + Number(turnScore.textContent);
    }
    let plyrSum = document.querySelector("#plyr-"+(i+1)+"-sum");
    plyrSum.textContent = score[i];
}*/