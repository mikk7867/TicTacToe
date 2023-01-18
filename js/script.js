// alert("Ding Dong");

//magic square
const magic = [8, 1, 6, 3, 5, 7, 4, 9, 2];

//who starts
let round = 1;
let playerTurn = true;

//win condition
let p1sum = 0;
let p2sum = 0;

//nr of placements
let p1counter = 0;
let p2counter = 0;

//scorebox
var red = document.getElementById("score1")
var blue = document.getElementById("score2")

//score
let p1score = 0;
let p2score = 0;

let clear = "";

const pause = setTimeout

let setMark = (evt) => {
    let mark = playerTurn ? "X" : "O";
    if((playerTurn ? p1sum : p2sum) !== 15 || (playerTurn ? p1counter : p2counter) < 3){
        if((playerTurn ? p1counter : p2counter) == 3){
            //remove mark
            if(evt.target.className == mark){
                evt.target.innerText = clear;
                evt.target.className = "cell";
                playerTurn ? p1counter-- : p2counter--;
                let temp = parseInt(evt.target.id[4]);
                playerTurn ? p1sum-=temp : p2sum-=temp;
            }
            else{
                return
            }
        }
        else{
            //place mark
            if(evt.target.className == "cell"){
                evt.target.innerText = mark;
                evt.target.className = mark;
                playerTurn ? p1counter++ : p2counter++;
                let temp = parseInt(evt.target.id[4]);
                playerTurn ? p1sum+=temp : p2sum+=temp;
                if((playerTurn ? p1sum : p2sum) == 15 && (playerTurn ? p1counter : p2counter) == 3){
                    //victory
                    playerTurn ? p1score++ : p2score++;
                    playerTurn ? red.innerText = p1score : blue.innerText = p2score;
                    setTimeout(function(){
                        alert("Player " + (playerTurn ? "1" : "2") + " wins!");
                    }, 5);
                    return;
                }
                playerTurn = !playerTurn
                board.id = playerTurn ? "p1turn" : "p2turn";
            }
            else{
                return
            }
        }
    }
}

var board = document.querySelector(".game-board");

for(let i = 0; i < 9; i++){
    var btn = document.createElement("button");
    btn.className = "cell";
    btn.id = "val_" + magic[i];
    btn.addEventListener("click", setMark);
    board.appendChild(btn);
}

let restart = () =>{
    for(let i = 0; i < 9; i++){
        temp = document.querySelector("#val_" + (i + 1));
        temp.className = "cell";
        temp.innerText = "";
    }
    p1sum = 0;
    p2sum = 0;

    p1counter = 0;
    p2counter = 0;

    round++;
    if(round % 2 == 1){
        playerTurn = true;
    }
    else{
        playerTurn = false;
    }

    board.id = playerTurn ? "p1turn" : "p2turn";
}

var newGame = document.querySelector(".new-game");

newGame.addEventListener("click", restart);

let reset = () =>{
    round = 0;
    
    restart();

    p1score = 0;
    p2score = 0;

    red.innerText = p1score;
    blue.innerText = p2score;
}

var newSession = document.querySelector(".reset");

newSession.addEventListener("click", reset);