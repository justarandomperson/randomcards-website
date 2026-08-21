import { useState } from 'react'
import { DndContext, DragEndEvent, DragStartEvent, DragOverEvent, DragOverlay, rectIntersection } from '@dnd-kit/core';
import { CardLocation, DraggedCard } from '../../types/dnd/Card'
import { useGameContext } from '../../contexts/GameContext/GameContext'
import { BenchActionType } from '../../contexts/GameContext/Bench'
import { HandActionType } from '../../contexts/GameContext/Hand'
import { BoardActionType } from '../../contexts/GameContext/Board'
import Bench from '../Bench/Bench'
import Board from '../Board/Board'
import PlayerBar from '../PlayerBar/PlayerBar'
import Shop from '../Shop/Shop'
import Hand from '../Hand/Hand'
import DrawPile from '../DrawPile/DrawPile'
import Card from '../Card/Card'
import Styles from './GameLayout.module.css'


const GameLayout: React.FC = ({ }) => {
    const { board, dispatch: boardDispatch } = useGameContext().boardContext
    const handDispatch = useGameContext().handContext.dispatch
    const benchDispatch = useGameContext().benchContext.dispatch

    const [activeCardDrag, setActiveCardDrag] = useState<DraggedCard | null>(null);
    const [cardOverLocation, setCardOverLocation] = useState<CardLocation | null>(null);

    const handleDragCardStart = (event: DragStartEvent) => {
        setActiveCardDrag(event.active.data.current as DraggedCard);
    }

    const handleDragCardOver = (event: DragOverEvent) => {
        const { over } = event;
        setCardOverLocation(over ? (over.data.current as CardLocation) : null);
   }

    const handleCardDragEnd = (event: DragEndEvent) => {
        setActiveCardDrag(null);
        setCardOverLocation(null);

        const { active, over } = event;
        if (!over) { // not inside a droppable 
            return;
        }

        const from = active.data.current as DraggedCard;
        const to = over.data.current as CardLocation;

        // do the thing
        if (from.cardData.type === 'spell') {
            handDispatch({ 
                type: HandActionType.REMOVE_CARD,
                index: from.location.index
            });
        }

        else if (from.cardData.type === 'unit') {
            if (board.playerCards[to.index] !== null) { // board slot is taken
                return;
            }
            
            benchDispatch({ 
                type: BenchActionType.REMOVE_CARD,
                index: from.location.index
            });

            boardDispatch({
                type: BoardActionType.PLACE_CARD,
                card: from.cardData,
                index: to.index
            });
        }
    }

    return (
        <DndContext collisionDetection={rectIntersection} onDragStart={handleDragCardStart} onDragOver={handleDragCardOver}
        onDragEnd={handleCardDragEnd}>
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
                    <Card cardData={activeCardDrag.cardData} location={activeCardDrag.location}/>
                )}
            </DragOverlay>
                
        </DndContext>
    );
}


export default GameLayout