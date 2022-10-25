let deckId;
let computerScore = 0;
let myScore = 0;

const newDeckBtn = document.getElementById('new-deck');
const drawCardsBtn = document.getElementById('draw-cards');
const cardsContainer = document.getElementById('cards');
const headerEl = document.getElementById('header');
const remainingText = document.getElementById('remaining');
const computerSoreEl = document.getElementById('computer-score');
const myScoreEl = document.getElementById('my-score');


function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            drawCardsBtn.disabled = false;
            deckId = data.deck_id;
            remainingText.textContent = `Remaining Cards: ${data.remaining}`;
        })
}

newDeckBtn.addEventListener("click", handleClick)


drawCardsBtn.addEventListener('click', function() {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            remainingText.textContent = `Remaining Cards: ${data.remaining}`;
            cardsContainer.children[0].innerHTML = ` <img src="${data.cards[0].image}" class="card"> `;
            cardsContainer.children[1].innerHTML = ` <img src="${data.cards[1].image}" class="card"> `;

            const cardOne = data.cards[0];
            const cardTwo = data.cards[1];

            const winnerText = determineCardWinner(cardOne, cardTwo);
            headerEl.textContent = winnerText;

            if(data.remaining === 0) {
                drawCardsBtn.disabled = true;
                const lastWinnerIs = computerScore > myScore ? 'The computer won the game!'
                : myScore > computerScore ? 'You won the game!'
                : "It's a tie game!"

                headerEl.textContent = lastWinnerIs;
            }
        })
});

function determineCardWinner(card1, card2) {
    const valueOptions = [
        "2", "3", "4", "5", "6", "7", "8", "9", "10", 
        "JACK", "QUEEN", "KING", "ACE"
    ];

    const card1ValueIndex = valueOptions.indexOf(card1.value);
    const card2ValueIndex = valueOptions.indexOf(card2.value);

    if(card1ValueIndex > card2ValueIndex) {
        computerScore ++;
        computerSoreEl.textContent = `Computer score: ${computerScore}`;
        return 'Computer wins!';
    } else if(card1ValueIndex < card2ValueIndex) {
        myScore ++;
        myScoreEl.textContent = `Your score: ${myScore}`;
        return 'You win!';
    } else {
        return "War!";
    }
}