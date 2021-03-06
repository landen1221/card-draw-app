import React, { useState, useEffect } from "react";
import axios from "axios";

const DrawCard = () => {
  const apiLink = "https://deckofcardsapi.com/api/deck";
  const TEST_DECK = {
    success: true,
    deck_id: "0f56ibo1gdjx",
    remaining: 52,
    shuffled: true,
  };

  const [deck, setDeck] = useState(null);
  const [card, setCard] = useState([]);
  const [tempState, setTempState ] = useState(1)

  useEffect(() => {
    axios.get(apiLink + "/new/shuffle/?deck_count=1").then((res) => {
      setDeck(res.data);
    });
  }, []);

  useEffect(() => {
    async function getCard() {
      let { deck_id } = deck;
      let drawRes = await axios.get(`${apiLink}/${deck_id}/draw/?count=1`);
      console.log(drawRes);
    }
    getCard();
  }, [tempState]);


  const buttonClicked = () => {
    setTempState(tempState + 1)
  }

  return (
    <div>
      <button onClick={buttonClicked}>Give me a card</button>
    </div>
  );
};

export default DrawCard;
