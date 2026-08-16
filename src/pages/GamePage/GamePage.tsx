import { GameProvider } from '../../contexts/GameContext/GameContext'
import Bench from '../../components/Bench/Bench.js'
import Board from '../../components/Board/Board.js'
import PlayerBar from '../../components/PlayerBar/PlayerBar.js'
import Shop from '../../components/Shop/Shop.js'
import Hand from '../../components/Hand/Hand.js'
import DrawPile from '../../components/DrawPile/DrawPile.js'
import Styles from './GamePage.module.css'


const GamePage: React.FC = ({ }) => {

    return (
        <div className={Styles.game_page}>
            <div className={Styles.play_area}>

                <GameProvider>            

                    <div className={Styles.main_components_container}>
                        <div className={Styles.bench_container}>
                            <Bench/>
                        </div>

                        <div>
                            <PlayerBar isOpponent={true}/>
                            <Board/>
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

                </GameProvider>

            </div>
        </div>
    );
}


export default GamePage