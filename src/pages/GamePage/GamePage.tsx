import { GameProvider } from '../../contexts/GameContext/GameContext'
import { DeckProvider } from '../../contexts/DeckContext/DeckContext'
import GameLayout from '../../components/GameLayout/GameLayout'
import Styles from './GamePage.module.css'


const GamePage: React.FC = ({ }) => {
    return (
        <div className={Styles.game_page}>
            <div className={Styles.play_area}>

                <DeckProvider>
                <GameProvider>            

                    <GameLayout/>

                </GameProvider>
                </DeckProvider>

            </div>
        </div>
    );
}


export default GamePage