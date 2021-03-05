import React, {useState, useEffect} from 'react'
import axios from "axios";

const DrawCard = () => {
    const apiLink = 'https://deckofcardsapi.com/api/deck'
    
    const [deck, setDeck] = useState(null)
    const [card, setCard ] = useState([])
    
    useEffect(() => {
        axios.get(apiLink + '/new/shuffle/?deck_count=1').then(res => {
            setDeck(res.data)
        })
    }, [])

    console.log(deck)

    useEffect(() => {
        async function getCard() {
            let {deck_id} = deck
            let drawRes = await axios.get(`${apiLink}/${deck_id}/draw/`);
            console.log(drawRes)
        }  
        getCard()

    }, [card])
    
    return (
        <div>
            <button >Give me a card</button>
        </div>
    )
}

export default DrawCard;