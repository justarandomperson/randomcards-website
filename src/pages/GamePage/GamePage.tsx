import GameLayout from '../../components/game/GameLayout/GameLayout'
import Styles from './GamePage.module.css'


const GamePage: React.FC = ({ }) => {
    return (
        <div className={Styles.game_page}>
            <div className={Styles.play_area}>
                <GameLayout/>
            </div>
        </div>
    );
}


export default GamePage