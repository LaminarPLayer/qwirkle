let root = document.querySelector(":root");

// let players = 3;// = prompt("Podaj liczbę graczy");

let players = document.querySelector("#players-input");
let playerNames = document.querySelectorAll("form .name");
let playerNamesLabel = document.querySelectorAll("form .name-label");
let startBtn = document.querySelector("#start-btn");
let form = document.querySelector("form");

let scoreGrid = document.querySelector("#scoreGrid");

updateForm();
players.addEventListener("change", updateForm);
startBtn.addEventListener("click", function(){
    initGame(players);
});

function updateForm(){
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

function initGame(players){
    root.style.setProperty("--plyr-number", players.value); // DO CSS-a!!!!!
    scoreGrid.classList.remove("hide");
    form.classList.add("hide");
    for(let i = 0; i < players.value; i++){
        scoreGrid.innerHTML += "<div id=\"plyr" + (i+1) + "\" class=\"plyr\">"
        + playerNames[i].value + "</div>";
    }
    for(let i = 0; i < players.value; i++){
        scoreGrid.innerHTML += "<div id=\"plyr" + (i+1) + "-sum\" class=\"score\">"
        + 0 + "</div>";
    }
    let turn = 1;
    nextTurn(turn, players);
}
function nextTurn(turn, players){
    for(let i = 0; i < players.value; i++){
        scoreGrid.innerHTML += "<input type=\"number\" id=\"plyr" + (i+1) + "-turn-"
        + turn + "\" class=\"turn-"+ turn + "\" value=\"" + 0 + "\">";
    }
    let lastTurn = document.querySelectorAll(".turn-" + turn);
    lastTurn.forEach(function(turnScore){
        turnScore.addEventListener("input", function(){
            alert('meee');
            // updateScore();
        })
    })
    // updateGrid();
    // updateScore();
}

function clearGame(){
    scoreGrid.classList.add("hide");
}


// let playerNames = ["Grzegorz", "Marcin", "Piotr"];
let turnScore = [[5, 7],[12, 4],[3, 9]];
let score = [];

for(let i = 0; i<players.value; i++){
    score[i] = turnScore[i].reduce((a,b) => a + b, 0)
}

let rounds = 2;

console.log(score);

for(let i=0; i<players;i++){
    score[i]=0;
    for(let j = 0; j < rounds; j++){
        let turnScore = document.querySelector("#plyr-"+(i+1)+"-turn-"+(j+1));
        score[i] = score[i] + Number(turnScore.tescoretContent);
    }
    let plyrSum = document.querySelector("#plyr-"+(i+1)+"-sum");
    plyrSum.textContent = score[i];
}