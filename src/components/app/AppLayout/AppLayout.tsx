import { Outlet, useLocation } from "react-router-dom"
import Topbar from "../Topbar/Topbar"
import styles from "./AppLayout.module.css"
import { DeckProvider } from "../../../contexts/DeckContext/DeckContext"
import { GameProvider } from "../../../contexts/GameContext/GameContext"
import { ImagesProvider } from "../../../contexts/ImagesContext/ImagesContext"
import { GAMEPAGE_PATH } from "../Topbar/shared/pagePaths"


const AppLayout: React.FC = ({ }) => {
    const currentPage = useLocation();


    return (
        <ImagesProvider>
        <DeckProvider>
        <GameProvider>

            <div className={styles.AppLayoutContainer}>
                { currentPage.pathname !== GAMEPAGE_PATH && <Topbar/> }
                <Outlet/>
            </div>

        </GameProvider>
        </DeckProvider>
        </ImagesProvider>
    )
}


export default AppLayout