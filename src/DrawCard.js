import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from './Card'

const DrawCard = () => {
  const apiLink = "https://deckofcardsapi.com/api/deck";

  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [tempState, setTempState ] = useState(0)
  const [ auto, setAuto ] = useState(false)
  const [initialRender, setInitialRender] = useState(true)

  useEffect(() => {
    axios.get(apiLink + "/new/shuffle/?deck_count=1").then((res) => {
      setDeck(res.data);
    });
  }, [setDeck]);

  
  useEffect (() => {
    if (initialRender) {
        setInitialRender(false)
    } else {
        if (auto === true) {
            setInterval(() => {
                drawCard()
            }, 1000)
            return clearInterval
        } else {
            drawCard()
        }
    }
  }, [auto, tempState]) 
   
  function drawCard() {
    async function getCard() {
        let deck_id;

        if (deck) {
            deck_id = deck.deck_id;
            let drawRes = await axios.get(`${apiLink}/${deck_id}/draw/?count=1`);
            console.log(drawRes.data.remaining)

            if (drawRes.data.remaining === 0) {
                alert("Congratulations. You've picked up 52 cards! Let's play again")
                window.location.reload()
            }

         setCards([...drawRes.data.cards]);
        } 
    }
    getCard();
  }

  console.log(auto)

  return (
    <div>
      <button onClick={() => setTempState(tempState +1)}>Give me a card</button>
      <button onClick={() => auto ? setAuto(false) : setAuto(true)} >Draw for me</button>
      {cards.map(({code, image}) => (
          <Card suit={code} key={code} image={image}/>
      ))}
    </div>
  );
};

export default DrawCard;
