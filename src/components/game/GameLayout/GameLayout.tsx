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
import { CardType } from '../Card/shared/types'


const GameLayout: React.FC = () => {
    const { activeCardDrag, handleCardDragStart, handleCardDragEnd } = useCardDrag();
    const { state } = useGameContext();
    const { spellShowing, playerWonName, targetSource } = state;


    return (
        <DndContext collisionDetection={rectIntersection} onDragStart={handleCardDragStart} onDragEnd={handleCardDragEnd}>

            <div className={styles.main_components_container}>
                <div className={styles.bench_container}>
                    <Bench/>
                </div>

                <div className={styles.game_board_container}>
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
                <div className={`${spellShowing.self ? styles.self_spell : styles.opponent_spell} ${styles.spell_showing_container}`}>
                    <Card cardData={spellShowing.spell}/>
                </div>
            )}

            { (targetSource && targetSource.type == CardType.SPELL) && (
                <div className={`${styles.cardSelectingTargetForSpell} ${styles.spell_showing_container}`}>
                    <Card cardData={targetSource}/>
                </div>
            )}


            { playerWonName && (
                <div className={styles.absolute_pos_container}>
                    <h1>{`${playerWonName} Won GG EZ!!!`}</h1>
                </div>
            )}
                
        </DndContext>
    );
}


export default GameLayout