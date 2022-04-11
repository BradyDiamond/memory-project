import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import { CardDeck } from "./memory.js";

$("#play").click(function () {
  let cardDeck = new CardDeck();
  cardDeck.generateCard();
  buildCards(cardDeck);
  let count = 0;
  let firstcard;
  let secondcard;
  $(".card").click(function () {
    const id = $(this).attr("id");
    const card = cardDeck.findCard(id);
    $(this).prop("disabled", true);
    count++;
    $(this).removeClass("hidden");
    if (count === 2) {
      secondcard = card;
      $(".card").prop("disabled", true);
      const isAMatch = compareCards(firstcard, secondcard);
      if (isAMatch) {
        disableButtons(cardDeck);
      } else {
        setTimeout(() => {
          resetCards(secondcard, firstcard, cardDeck);
        }, 1000);
      }
      count = 0;
    } else if (count < 2) {
      firstcard = card;
    }
  });
});
function buildCards(cardDeck) {
  cardDeck.cards.forEach((card) => {
    $("#" + card.id).text(card.value);
  });
}
function compareCards(firstcard, secondcard) {
  if (firstcard.value === secondcard.value) {
    firstcard.isPaired = true;
    secondcard.isPaired = true;
    return true;
  }
  return false;
}
function resetCards(firstcard, secondcard, cardDeck) {
  const id1 = firstcard.id;
  const id2 = secondcard.id;
  $("#" + id1).addClass("hidden");
  $("#" + id2).addClass("hidden");
  disableButtons(cardDeck);
}

function disableButtons(cardDeck) {
  cardDeck.cards.forEach((card) => {
    if (!card.isPaired) {
      $("#" + card.id).prop("disabled", false);
    }
  });
}
