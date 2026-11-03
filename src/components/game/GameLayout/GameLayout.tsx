import { DndContext, DragOverlay, rectIntersection } from '@dnd-kit/core'
import { useCardDrag } from './useCardDrag'
import Bench from '../Bench/Bench'
import Board from '../Board/Board'
import PlayerBar from '../PlayerBar/PlayerBar'
import Shop from '../Shop/Shop'
import Hand from '../Hand/Hand'
import GameCard from '../GameCard/GameCard'
import Styles from './GameLayout.module.css'
import { useGameContext } from '../../../contexts/GameContext/GameContext'
import Card from '../Card/Card'


const GameLayout: React.FC = () => {
    const { spellShowing } = useGameContext().state
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
            </div>

            <DragOverlay>
                {activeCardDrag && (
                    <GameCard cardData={activeCardDrag.cardData} location={activeCardDrag.location}/>
                )}
            </DragOverlay>

            {spellShowing && (
                <div className={Styles.spell_showing_container}>
                    <Card cardData={spellShowing}/>
                </div>
            )}
                
        </DndContext>
    );
}


export default GameLayout