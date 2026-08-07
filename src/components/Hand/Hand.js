import { useState } from 'react'
import Card from '../Card/Card.js'
import './Hand.css' 


const MAX_HAND_SIZE = 7;


function getCardList(cardsList) {
    return cardsList.map((card) => (
        <Card
            key={card.name}
            name={card.name}
            hp={card.hp}
            atk={card.atk}
            cost={card.cost}
            effect={card.effect}
        />
    ));
}

function addCardToList(cardsList) {
    return [...cardsList, {
        name: `dog ${cardsList.length}`,
        hp: "1",
        atk: "2",
        cost: "3",
        effect: "im dog"
    }]
}


function Hand () {
    const [cardsList, setCardsList] = useState([]);
    const [isHandFull, setIsHandFull] = useState(false);

    const handleClick = () => {
        setCardsList(addCardToList(cardsList));
        if (cardsList.length === MAX_HAND_SIZE) {
            setIsHandFull(true);
        }
    };

    return (
        <>
            <div className="hand">
                {getCardList(cardsList)}
            </div>

            {/* this buttion is used just to generate more cards */}
            {!isHandFull && <button onClick={handleClick}>More</button>}
        </>
    );
}


export default Hand