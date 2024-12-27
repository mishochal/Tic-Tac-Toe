const cells = document.querySelectorAll(".cell");
const winner = document.getElementById("winner");

const muteBtn = document.querySelector(".volume-btn.on");
const unmuteBtn = document.querySelector(".volume-btn.off");

const players =
    [
        {
            player: "Player 1",
            symbol: "X",
            audio: new Audio("./audios/player1_move.wav")
        },
        {
            player: "Player 2",
            symbol: "O",
            audio: new Audio("./audios/player2_move.wav")
        }
    ];

const winCons =
    [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

let player = players[0];
let winningAudo = new Audio("./audios/win.wav");


const makeMove = (index) => {
    cells[index].innerHTML = player.symbol;
    cells[index].style.pointerEvents = "none";
    player.audio.play();
    checkGame();
    // Chooses next player
    player = players[(players.indexOf(player) + 1) % players.length];
}

const checkGame = () => {
    let won = winCons.some((winCon) => {
        return winCon.every((cellIndex) => cells[cellIndex].innerHTML === player.symbol);
    })
    if (won) {
        winningAudo.play();
        cells.forEach((cell) => cell.style.pointerEvents = "none");
        winner.innerHTML = "Winner: " + player.player;
        winner.style.opacity = "1";
        return;
    }
    if (isFinished()) {
        winner.innerHTML = "Draw.";
        winner.style.opacity = "1";
    }
}

const isFinished = () => {
    let finished = true;
    cells.forEach((cell) => {
        if (cell.innerHTML === "") {
            finished = false;
        }
    });
    return finished;
}

const playAgain = () => {
    for (let cell of cells) {
        cell.innerHTML = "";
        cell.style.pointerEvents = "initial"
    }
    player = players[0];
    winner.style.opacity = "0";
}

const mute = () => {
    muteBtn.style.display = "none"
    unmuteBtn.style.display = "block";

    winningAudo.volume = 0;
    players.forEach(player => player.audio.volume = 0);
}

const unmute = () => {
    muteBtn.style.display = "block"
    unmuteBtn.style.display = "none";

    winningAudo.volume = 1;
    players.forEach(player => player.audio.volume = 1);
}