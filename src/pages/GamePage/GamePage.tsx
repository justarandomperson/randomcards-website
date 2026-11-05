import classNames from 'classnames';
import GameLayout from '../../components/game/GameLayout/GameLayout'
import { useGameContext } from '../../contexts/GameContext/GameContext';
import styles from './GamePage.module.css'


const GamePage: React.FC = () => {
    const { state } = useGameContext();


    const playAreaClass = classNames({
        [styles.play_area]: true,
        [styles.game_over]: state.isGameOver
    });


    return (
        <div className={styles.game_page}>
            <div className={playAreaClass}>
                <GameLayout/>
            </div>
        </div>
    );
}


export default GamePage