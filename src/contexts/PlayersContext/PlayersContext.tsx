import { useState, createContext, type PropsWithChildren  } from 'react'


type Player = {
    name: string;
    health: number;
    money: number;
};

type Players = {
    player: Player;
    opponent: Player;
};

type PlayersContextType = {
    players: Players;
    setPlayers: React.Dispatch<React.SetStateAction<Players>>;
};


const PlayersContext = createContext<PlayersContextType | null>(null);


const PlayersProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [players, setPlayers] = useState<Players>({
        player: {
            name: "TinG",
            health: 20,
            money: 0
        },
        opponent: {
            name: "TinG hater",
            health: 20,
            money: 0
        }
    });

    const value = {
        players, 
        setPlayers
    }

    return <PlayersContext.Provider value={value}> {children} </PlayersContext.Provider>
}


export { PlayersContext, PlayersProvider }