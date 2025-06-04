const boxes = document.querySelectorAll(".box");
const resultDisplay = document.querySelector(".display p");
let userScore = document.getElementById("user-score");
let compScore = document.getElementById("comp-score");
const resetBtn = document.querySelector(".reset button");
const modeSelect = document.getElementById("mode");
const userLabel = document.querySelector(".user p");
const compLabel = document.querySelector(".comp p");

let currentPlayer = "X";
let gameActive = true;
let board = Array(9).fill("");
let mode = "computer";

const winningCombos = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

function checkWinner() {
    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            highlightWinner(combo);
            const winner = board[a];

            resultDisplay.textContent = `${winner} Wins!`;
            resultDisplay.style.backgroundColor = winner === "X" ? "#28a745" : "#dc3545";

            if (mode === "multiplayer") {
                if (winner === "X") {
                    userScore.textContent = parseInt(userScore.textContent) + 1;
                } else {
                    compScore.textContent = parseInt(compScore.textContent) + 1;
                }
            } else {
                if (winner === "X") {
                    userScore.textContent = parseInt(userScore.textContent) + 1;
                } else {
                    compScore.textContent = parseInt(compScore.textContent) + 1;
                }
            }
            return;
        }
    }

    if (!board.includes("")) {
        resultDisplay.textContent = "It's a Tie!";
        resultDisplay.style.backgroundColor = "#ffc107";
        gameActive = false;
    }
}

function highlightWinner(combo) {
    combo.forEach(index => {
        boxes[index].style.backgroundColor = "#00ff88";
    });
}

function makeComputerMove() {
    let emptyIndexes = board.map((val, i) => val === "" ? i : null).filter(i => i !== null);
    if (emptyIndexes.length === 0) return;

    let move = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
    board[move] = "O";
    boxes[move].textContent = "O";
    boxes[move].classList.add("o");

    checkWinner();
}

function handleClick(index) {
    if (!gameActive || board[index] !== "") return;

    board[index] = currentPlayer;
    boxes[index].textContent = currentPlayer;
    boxes[index].classList.add(currentPlayer === "X" ? "x" : "o");

    checkWinner();

    if (!gameActive) return;

    if (mode === "computer" && currentPlayer === "X") {
        setTimeout(() => {
            makeComputerMove();
            checkWinner();
        }, 500);
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (mode === "computer") {
            if (currentPlayer === "X") {
                handleClick(index);
            }
        } else {
            handleClick(index);
        }
    });
});

resetBtn.addEventListener("click", () => {
    board = Array(9).fill("");
    boxes.forEach(box => {
        box.textContent = "";
        box.style.backgroundColor = "#3c1a5b";
        box.classList.remove("x", "o");
    });
    resultDisplay.textContent = "Result";
    resultDisplay.style.backgroundColor = "#c2905bb2";
    gameActive = true;
    currentPlayer = "X";
});

modeSelect.addEventListener("change", (e) => {
    mode = e.target.value;

    if (mode === "multiplayer") {
        userLabel.innerHTML = `User1:<span id="user-score"> 0</span>`;
        compLabel.innerHTML = `User2:<span id="comp-score"> 0</span>`;
    } else {
        userLabel.innerHTML = `User:<span id="user-score"> 0</span>`;
        compLabel.innerHTML = `Comp:<span id="comp-score"> 0</span>`;
    }

    userScore = document.getElementById("user-score");
    compScore = document.getElementById("comp-score");

    resetBtn.click();
});
