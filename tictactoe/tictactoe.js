
var gameBoard = [["", "", ""], ["", "", ""], ["", "", ""]];

function initGame(){
    var canvas = document.getElementById("gameBoard");
    canvas.width = 400;
    canvas.height = 400;
    var ctx = canvas.getContext("2d");
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    drawLines();
    currentPlayer = "X";
    gameWon = false;
    gameTied = false;
}
function drawLines() {
    var canvas = document.getElementById("gameBoard");
    var ctx = canvas.getContext("2d");
    ctx.moveTo(canvas.width/3, 0);
    ctx.lineTo(canvas.width/3, canvas.height);
    ctx.moveTo(canvas.width*2/3, 0);
    ctx.lineTo(canvas.width*2/3, canvas.height);
    ctx.moveTo(0, canvas.height/3);
    ctx.lineTo(canvas.width, canvas.height/3);
    ctx.moveTo(0, canvas.height*2/3);
    ctx.lineTo(canvas.width, canvas.height*2/3);
    ctx.stroke();
}

function handleClick(){
    if(!checkDoubleClick()) return;
    var canvas = document.getElementById("gameBoard");
    var rect = canvas.getBoundingClientRect();
    var x = event.pageX - rect.left;
    var y = event.pageY - rect.top;

    var row = Math.floor(y / (canvas.height / 3));
    var col = Math.floor(x / (canvas.width / 3));

    if (gameBoard[row][col] === "") {
        gameBoard[row][col] = currentPlayer;
        if (currentPlayer === "X") {
            drawX(row, col);
        } else {
            drawO(row, col);
        }
        if(checkWin()){
            alert('Player ' + currentPlayer + ' win!');
            gameWon = true;
        }
        else if(checkTie()){
            alert('Tie!');
        }
        else{
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }
}

function checkWin() {
    // check rows
    for (var i = 0; i < 3; i++) {
        if (gameBoard[i][0] === gameBoard[i][1] && gameBoard[i][1] === gameBoard[i][2] && gameBoard[i][0] !== "") {
            return true;
        }
    }
    // check columns
    for (var i = 0; i < 3; i++) {
        if (gameBoard[0][i] === gameBoard[1][i] && gameBoard[1][i] === gameBoard[2][i] && gameBoard[0][i] !== "") {
           return true;
        }
    }
    // check diagonals
    if (gameBoard[0][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][2] && gameBoard[0][0] !== "") {
       return true;
    }
    if (gameBoard[0][2] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][0] && gameBoard[0][2] !== "") {
        return true;
    }
    return false;
}

function checkTie(){
    for(var i = 0; i<3; i++){
        for(var j = 0; j<3; j++){
            if(gameBoard[i][j] === ""){
                return false;
            }
        }
    }
    return true;
}

function drawX(row, col) {
    var canvas = document.getElementById("gameBoard");
    var ctx = canvas.getContext("2d");
    var cellWidth = canvas.width / 3;
    var cellHeight = canvas.height / 3;

    ctx.beginPath();
    ctx.moveTo(col * cellWidth + 10, row * cellHeight + 10);
    ctx.lineTo(col * cellWidth + cellWidth - 10, row * cellHeight + cellHeight - 10);
    ctx.moveTo(col * cellWidth + cellWidth - 10, row * cellHeight + 10);
    ctx.lineTo(col * cellWidth + 10, row * cellHeight + cellHeight - 10);
    ctx.stroke();
}

function drawO(row, col) {
    var canvas = document.getElementById("gameBoard");
    var ctx = canvas.getContext("2d");
    var cellWidth = canvas.width / 3;
    var cellHeight = canvas.height / 3;

    ctx.beginPath();
    ctx.arc(col * cellWidth + cellWidth / 2, row * cellHeight + cellHeight / 2, cellWidth / 2 - 10, 0, 2 * Math.PI);
    ctx.stroke();
}
function resetGame(){
    var canvas = document.getElementById("gameBoard");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gameBoard = [["", "", ""], ["", "", ""], ["", "", ""]];
    currentPlayer = "X";
    gameWon = false;
    gameTied = false;
    initGame();
}

let disableDoubleClick = true;

function checkDoubleClick() {
    if(disableDoubleClick) {
        disableDoubleClick = false;
        setTimeout(() => {
        disableDoubleClick = true;
        console.log("Too fast clicks, please wait.");
        }, 1000);
        return true;
    }
    return false;
}

window.onload = function(){
    initGame();
    var canvas = document.getElementById("gameBoard");
    canvas.addEventListener("click", handleClick);
    resetButton.addEventListener("click",resetGame);
}