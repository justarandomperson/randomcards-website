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
import { useGameContext } from '../../../contexts/GameContext/GameContext';


const GameLayout: React.FC = ({ }) => {
    const [activeCardDrag, setActiveCardDrag] = useState<DraggedCard | null>(null);
    const { playUnit, playSpell } = useGameContext();

    const handleDragCardStart = (event: DragStartEvent) => {
        setActiveCardDrag(event.active.data.current as DraggedCard);
    }

    // TODO: refactor this so that logic stays outside of the component (created dndHandlers.ts file for that)
    const handleCardDragEnd = (event: DragEndEvent) => {
        setActiveCardDrag(null);

        const { active, over } = event;
        if (!over) { // not inside a droppable 
            return;
        }

        const card = active.data.current as DraggedCard;
        const to = over.data.current as CardLocation;

        if (card.cardData.type === CardType.UNIT) {
            playUnit({instanceId: card.cardData.instanceId, boardIndex: to.index});
        }

        else if (card.cardData.type === CardType.SPELL) {
            playSpell({instanceId: card.cardData.instanceId});
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