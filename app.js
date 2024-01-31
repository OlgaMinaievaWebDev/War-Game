let deckId;

function getNewDeck() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((data) => {
      deckId = data.deck_id;
      console.log(deckId);
    });
}

document.getElementById("new-deck").addEventListener("click", getNewDeck);


document.getElementById('draw-card').addEventListener('click', function () {
 fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
   .then((res) => res.json())
   .then((data) => console.log(data));
})