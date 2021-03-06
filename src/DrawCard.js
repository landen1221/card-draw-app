import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";

const DrawCard = () => {
  const apiLink = "https://deckofcardsapi.com/api/deck";

  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [auto, setAuto] = useState(false);
  const [rotate, setRotate] = useState(0)

  useEffect(() => {
    async function shuffle() {
      const res = await axios.get(apiLink + "/new/shuffle/?deck_count=1");
      setDeck(res.data);
    }
    shuffle();
  }, []);

  useEffect(() => {
    if (auto === true) {
      const myInterval = setInterval(() => {
        drawCard(deck);
      }, 1000);
      return () => clearInterval(myInterval);
    } else {
      drawCard(deck);
    }
  }, [auto, deck]);

  async function drawCard(deck) {
    if (!deck) {
      return;
    }

    let deck_id;

    deck_id = deck.deck_id;
    let drawRes = await axios.get(`${apiLink}/${deck_id}/draw/?count=1`);

    if (drawRes.data.remaining === 0) {
      alert("Congratulations. You've picked up 52 cards! Let's play again");
      window.location.reload();
    }
    const tempArray = [...drawRes.data.cards ]
    tempArray[0]['rotated'] = rotate

    setCards([...cards, ...tempArray]);
    console.log(cards)
    setRotate(rotate+15)
  }

  return (
    <div>
      <button onClick={() => drawCard(deck)}>Give me a card</button>
      <button onClick={() => (auto ? setAuto(false) : setAuto(true))}>
        Draw for me
      </button>
      {cards.map(({ code, image, rotated }) => (
        <Card suit={code} key={code} image={image} rotate={rotated}/>
      ))}
    </div>
  );
};

export default DrawCard;
