let cards = [];
let revealed = [];
let selected = [];
let moves = 0;
let startTime;

function startGame() {
            
     moves = 0;
    document.getElementById("move-counter").textContent = moves;
    startTime = Date.now();
    document.getElementById("timer").textContent = 0;
    clearInterval(timerInterval);

    // creation des cartes random
    let values = [];
    for (let i = 0; i < 8; i++) {
        values.push(i);
        values.push(i);
            }
    shuffleArray(values);

    // creation du jeu 
    let gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = "";
    for (let i = 0; i < 16; i++) {
        let card = document.createElement("div");
        card.className = "card";
        card.dataset.index = i;
        card.dataset.value = values[i];
        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
        cards.push(card);
        revealed.push(false);
            }
        }
         

function flipCard() {
    let index = parseInt(this.dataset.index);
    if (!revealed[index] && selected.length < 2) {
        selected.push(index);
        this.textContent = this.dataset.value;
        revealed[index] = true;
        if (selected.length === 2) {
            moves++;
            document.getElementById("move-counter").textContent = moves;
            setTimeout(checkMatch, 1000);
                }
            }
        }

 function checkMatch() {
    if (cards[selected[0]].dataset.value === cards[selected[1]].dataset.value) {
        selected.forEach(index => {
        cards[index].classList.add("hidden");
                });
    } else {
        selected.forEach(index => {
        cards[index].textContent = "";
        revealed[index] = false;
                });
            }
    selected = [];
        if (document.querySelectorAll(".card:not(.hidden)").length === 0) {
                endGame();
            }
        }

 function endGame() {
            clearInterval(timerInterval);
            let endTime = Date.now();
            let elapsedTime = Math.floor((endTime - startTime) / 1000);
            document.getElementById("timer").textContent = elapsedTime;
            alert(`Congratulations! You completed the game in ${moves} moves and ${elapsedTime} seconds.`);
        }

function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

 let timerInterval;
document.addEventListener("DOMContentLoaded", function () {
    timerInterval = setInterval(function () {
    let elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById("timer").textContent = elapsedTime;
            }, 1000);
        });