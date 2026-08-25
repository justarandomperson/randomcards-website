import { GameProvider } from '../../contexts/GameContext/GameContext'
import { DeckProvider } from '../../contexts/DeckContext/DeckContext'
import { AuthProvider } from '../../contexts/AuthContext/AuthContext'
import GameLayout from '../../components/game/GameLayout/GameLayout'
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