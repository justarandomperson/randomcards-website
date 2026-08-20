import { GameProvider } from '../../contexts/GameContext/GameContext'
import GameLayout from '../../components/GameLayout/GameLayout'
import Styles from './GamePage.module.css'


const GamePage: React.FC = ({ }) => {
    return (
        <div className={Styles.game_page}>
            <div className={Styles.play_area}>

                <GameProvider>            

                    <GameLayout/>

                </GameProvider>

            </div>
        </div>
    );
}


export default GamePage