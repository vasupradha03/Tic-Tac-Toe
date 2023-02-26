const selectBox = document.querySelector(".select-box"),
    selectXBtn = selectBox.querySelector(".options .playerX"),
    selectOBtn = selectBox.querySelector(".options .playerO"),
    playBoard = document.querySelector(".play-board"),
    allBox = document.querySelectorAll("section span"),
    players = document.querySelector(".players"),
    resultBox = document.querySelector(".result-box"),
    wonText = resultBox.querySelector(".won-text"),
    replayBtn = resultBox.querySelector("button");

window.onclick = () => {
    for (let i = 0; i < allBox.length; i++) {
        allBox[i].setAttribute("onclick", "clickedBox(this)");
    }
}
selectXBtn.onclick = () => {
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
}
selectOBtn.onclick = () => {
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
    players.setAttribute("class", "players active player");
}
let playerXIcon = "fas fa-times",
    playerOIcon = "far fa-circle",
    playerSign = "X",
    runBot = true;

function clickedBox(element) {
    if (players.classList.contains("player")) {
        element.innerHTML = `<i class="${playerOIcon}"></i>`;
        playerSign = "O";
        element.setAttribute("id", playerSign);
        players.classList.add("active");
    }
    else {
        element.innerHTML = `<i class="${playerXIcon}"></i>`;
        element.setAttribute("id", playerSign);
        players.classList.add("active");
    }
    selectWinner();
    element.style.pointerEvents = "none";
    playBoard.style.pointerEvents = "none";
    let randomDelayTime = (Math.floor(Math.random() * 1000) + 300);
    setTimeout(() => {
        bot(runBot);
    }, randomDelayTime);
}

function bot(runBot) {
    if (runBot) {
        playerSign = "O";
        let arr = [];
        for (let i = 0; i < allBox.length; i++) {
            if (allBox[i].childElementCount == 0) {
                arr.push(i);
            }
        }
        let randomBox = arr[Math.floor(Math.random() * arr.length)];
        if (arr.length > 0) {
            if (players.classList.contains("player")) {
                allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;
                playerSign = "X";
                allBox[randomBox].setAttribute("id", playerSign);
                players.classList.remove("active");
            }
            else {
                allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
                allBox[randomBox].setAttribute("id", playerSign);
                players.classList.remove("active");
            }
            selectWinner();
        }
        playBoard.style.pointerEvents = "auto";
        allBox[randomBox].style.pointerEvents = "none";
        playerSign = "X";
    }
}
function getId(id_name) {
    return document.querySelector(".box" + id_name).id;
}
function threeBoxes(val_1, val_2, val_3, sign) {
    if (getId(val_1) == sign && getId(val_2) == sign && getId(val_3) == sign) {
        return true;
    }
}
function selectWinner() {
    if (threeBoxes(1, 2, 3, playerSign) || threeBoxes(4, 5, 6, playerSign) || threeBoxes(7, 8, 9, playerSign) || threeBoxes(1, 5, 9, playerSign) || threeBoxes(3, 5, 7, playerSign) || threeBoxes(1, 4, 7, playerSign) || threeBoxes(2, 5, 8, playerSign) || threeBoxes(3, 6, 9, playerSign)) {
        console.log(playerSign + "" + "is the WINNER !");
        runBot = false;
        bot(runBot);
        setTimeout(() => {
            resultBox.classList.add("show");
            playBoard.classList.remove("show");
            startConfetti();
        }, 300);
        wonText.innerHTML = `Player <p>${playerSign} </p>is the Winner !!`;
    }
    else {
        if (getId(1) != "" && getId(2) != "" && getId(3) != "" && getId(4) != "" && getId(5) != "" && getId(6) != "" && getId(7) != "" && getId(8) != "" && getId(9) != "") {
            runBot = false;
            bot(runBot);
            console.log("Draw");
            setTimeout(() => {
                playBoard.classList.remove("show");
                resultBox.classList.add("show");
            }, 300);
            wonText.innerHTML = "Match has been drawn!";
        }
    }
}
replayBtn.onclick = () => {
    setTimeout(() => { location.reload(); }, 100);

}
