import { DndContext, DragOverlay, rectIntersection } from '@dnd-kit/core'
import { useCardDrag } from './useCardDrag'
import Bench from '../Bench/Bench'
import Board from '../Board/Board'
import PlayerBar from '../PlayerBar/PlayerBar'
import Shop from '../Shop/Shop'
import Hand from '../Hand/Hand'
import DrawPile from '../DrawPile/DrawPile'
import GameCard from '../GameCard/GameCard'
import Styles from './GameLayout.module.css'


const GameLayout: React.FC = () => {
    const { activeCardDrag, handleCardDragStart, handleCardDragEnd } = useCardDrag()

    return (
        <DndContext collisionDetection={rectIntersection} onDragStart={handleCardDragStart} onDragEnd={handleCardDragEnd}>
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