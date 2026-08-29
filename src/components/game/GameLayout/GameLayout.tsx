import { useState } from 'react'
import { DndContext, DragEndEvent, DragStartEvent, DragOverlay, rectIntersection } from '@dnd-kit/core';
import { CardLocation, CardType, DraggedCard } from '../../../shared/types/card'
import Bench from '../Bench/Bench'
import Board from '../Board/Board'
import PlayerBar from '../PlayerBar/PlayerBar'
import Shop from '../Shop/Shop'
import Hand from '../Hand/Hand'
import DrawPile from '../DrawPile/DrawPile'
import GameCard from '../GameCard/GameCard'
import Styles from './GameLayout.module.css'
import { useGameActions } from '../../../contexts/GameContext/GameContext';


const GameLayout: React.FC = ({ }) => {
    const [activeCardDrag, setActiveCardDrag] = useState<DraggedCard | null>(null);
    const { placeUnit, playSpell } = useGameActions();

    const handleDragCardStart = (event: DragStartEvent) => {
        setActiveCardDrag(event.active.data.current as DraggedCard);
    }

    const handleCardDragEnd = (event: DragEndEvent) => {
        setActiveCardDrag(null);

        const { active, over } = event;
        if (!over) { // not inside a droppable 
            return;
        }

        const card = active.data.current as DraggedCard;
        const to = over.data.current as CardLocation;

        if (card.cardData.type === CardType.UNIT) {
            placeUnit(card.cardData.instanceId, to.index);
        }

        else if (card.cardData.type === CardType.SPELL) {
            playSpell(card.cardData.instanceId);
        }
    }

    return (
        <DndContext collisionDetection={rectIntersection} onDragStart={handleDragCardStart} onDragEnd={handleCardDragEnd}>
            <div className={Styles.main_components_container}>
                <div className={Styles.bench_container}>
                    <Bench/>
                </div>

                <div>
                    <PlayerBar isOpponent={true}/>
                    <Board activeCardDrag={activeCardDrag}/>
                    <PlayerBar isOpponent={false}/>
                </div>

                <div className={Styles.shop_container}>
                    <Shop/>
                </div>
            </div>

            <div className={Styles.hand_container}>
                <Hand/>
                <DrawPile/>
            </div>

            <DragOverlay>
                {activeCardDrag && (
                    <GameCard cardData={activeCardDrag.cardData} location={activeCardDrag.location}/>
                )}
            </DragOverlay>
                
        </DndContext>
    );
}


export default GameLayout