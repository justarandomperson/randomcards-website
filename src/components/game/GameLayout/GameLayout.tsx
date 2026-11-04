import { DndContext, DragOverlay, rectIntersection } from '@dnd-kit/core'
import { useCardDrag } from './useCardDrag'
import Bench from '../Bench/Bench'
import Board from '../Board/Board'
import PlayerBar from '../PlayerBar/PlayerBar'
import Shop from '../Shop/Shop'
import Hand from '../Hand/Hand'
import GameCard from '../GameCard/GameCard'
import styles from './GameLayout.module.css'
import { useGameContext } from '../../../contexts/GameContext/GameContext'
import Card from '../Card/Card'


const GameLayout: React.FC = () => {
    const { spellShowing, playerWonName } = useGameContext().state
    const { activeCardDrag, handleCardDragStart, handleCardDragEnd } = useCardDrag()

    return (
        <DndContext collisionDetection={rectIntersection} onDragStart={handleCardDragStart} onDragEnd={handleCardDragEnd}>

            <div className={styles.main_components_container}>
                <div className={styles.bench_container}>
                    <Bench/>
                </div>

                <div>
                    <PlayerBar isOpponent={true}/>
                    <Board activeCardDrag={activeCardDrag}/>
                    <PlayerBar isOpponent={false}/>
                </div>

                <div className={styles.shop_container}>
                    <Shop/>
                </div>
            </div>

            <div className={styles.hand_container}>
                <Hand/>
            </div>

            <DragOverlay>
                {activeCardDrag && (
                    <GameCard cardData={activeCardDrag.cardData} location={activeCardDrag.location}/>
                )}
            </DragOverlay>

            { spellShowing && (
                <div className={Styles.absolute_pos_container}>
                    <Card cardData={spellShowing}/>
                </div>
            )}

            { playerWonName && (
                <div className={Styles.absolute_pos_container}>
                    <h1>{`${playerWonName} Won GG EZ!!!`}</h1>
                </div>
            )}
                
        </DndContext>
    );
}


export default GameLayout