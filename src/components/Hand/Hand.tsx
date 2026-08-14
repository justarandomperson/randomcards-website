import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Card from '../Card/Card.js'
import { CardData } from '../Card/Card.js';
import Styles from './Hand.module.css' 


function getCardList(cardsList: CardData[]) {
    return cardsList.map((card) => (
        <Card cardData={card}/>
    ));
}


const Hand: React.FC = ({ }) => {
    const [cardsList] = useState<CardData[]>([
        {
            instanceId: uuidv4(),
            name: `dog`,
            type: "unit",
            hp: "1",
            atk: "2",
            cost: "3",
            effect: "im dog"
        }, {
            instanceId: uuidv4(),
            name: `cat`,
            type: "spell",
            cost: "3",
            effect: "although i may look like it, im not dog. have a wonderful rest of your day!"
        }, {
            instanceId: uuidv4(),
            name: `cat`,
            type: "spell",
            cost: "3",
            effect: "although i may look like it, im not dog. have a wonderful rest of your day!"
        }, {
            instanceId: uuidv4(),
            name: `cat`,
            type: "spell",
            cost: "3",
            effect: "although i may look like it, im not dog. have a wonderful rest of your day!"
        }, {
            instanceId: uuidv4(),
            name: `cat`,
            type: "spell",
            cost: "3",
            effect: "although i may look like it, im not dog. have a wonderful rest of your day!"
        }, {
            instanceId: uuidv4(),
            name: `cat`,
            type: "spell",
            cost: "3",
            effect: "although i may look like it, im not dog. have a wonderful rest of your day!"
        }
    ]);

    return (
        <>
            <div className={Styles.hand}>
                {getCardList(cardsList)}
            </div>
        </>
    );
}


export default Hand