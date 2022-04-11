export function CardDeck() {
  this.cards = [];
}

export function Card(value) {
  this.value = value;
  this.isPaired = false;
}

CardDeck.prototype.generateCard = function () {
  const possibleIds = [1, 2, 3, 4, 5, 6, 7, 8];
  const randomArray = shuffle(possibleIds);
  let value = 1;
  for (let i = 0; i < randomArray.length; i += 2) {
    let card1 = new Card(value);
    let card2 = new Card(value);
    this.cards.push(card1);
    this.cards.push(card2);
    value++;
  }
  for (let i = 0; i < randomArray.length; i++) {
    this.cards[i].id = randomArray[i];
  }
};

CardDeck.prototype.findCard = function (id) {
  for (let i = 0; i < this.cards.length; i++) {
    if (parseInt(this.cards[i].id) === parseInt(id)) {
      return this.cards[i];
    }
  }
  return false;
};

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
