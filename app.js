let deckId;
let playerScore = 0;
let computerScore = 0;
const winnerTextEl = document.getElementById("winner-text");
const drawBtn = document.getElementById("draw-card");

async function getNewDeck() {
  const res = await fetch(
    "https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/"
  );
  const data = await res.json();
  document.getElementById(
    "remaining"
  ).textContent = `Remaining cards: ${data.remaining}`;
  deckId = data.deck_id;
  console.log(data.id);
}

document.getElementById("new-deck").addEventListener("click", getNewDeck);

drawBtn.addEventListener("click", async function () {
  const res = await fetch(
    `https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`
  );
  const data = await res.json();
  document.getElementById(
    "remaining"
  ).textContent = `Remaining cards: ${data.remaining}`;
  document.getElementById("cards").innerHTML = `
       <img src=${data.cards[0].image} />
       <img src=${data.cards[1].image} />
   `;
  const winnerText = determineCardWinner(data.cards[0], data.cards[1]);
  //winnerTextEl.textContent = winnerText;

  if (data.remaining === 0) {
    drawBtn.disabled = true;
    if (playerScore > computerScore) {
      winnerTextEl.textContent = "You won!";
    } else if (computerScore > playerScore) {
      winnerTextEl.textContent = "Computer won!";
    } else {
      winnerTextEl.textContent = "War!";
    }
  }
});

function determineCardWinner(card1, card2) {
  const valueOptions = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "JACK",
    "QUEEN",
    "KING",
    "ACE",
  ];

  const card1ValueIndex = valueOptions.indexOf(card1.value);
  const card2ValueIndex = valueOptions.indexOf(card2.value);

  if (card1ValueIndex > card2ValueIndex) {
    computerScore++;
    document.getElementById(
      "computer"
    ).textContent = `Computer score: ${computerScore}`;
    return "Computer wins!";
  } else if (card1ValueIndex < card2ValueIndex) {
    playerScore++;
    document.getElementById("player").textContent = `My score: ${playerScore}`;
    return "You win!";
  } else {
    return "War!";
  }
}
