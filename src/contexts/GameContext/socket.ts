import io, { Socket } from 'socket.io-client';
import { GameSocketEvents, SOCKET_EVENT_NAMES } from './types';
import { useAuth } from '../AuthContext/AuthContext';


export const createGameSocket = (events: GameSocketEvents): Socket => {
    const token = useAuth().user?.token;

    const socket = io("http://localhost:3000", {
        auth: {
            token: token
        }
    });

    // attach all listeners (from server to client)
    socket.on(SOCKET_EVENT_NAMES.CONNECT,       events.onConnect);
    socket.on(SOCKET_EVENT_NAMES.DISCONNECT,    events.onDisconnect);

    socket.on(SOCKET_EVENT_NAMES.PLAY_UNIT,     events.onPlayUnit);
    socket.on(SOCKET_EVENT_NAMES.PLAY_SPELL,    events.onPlaySpell);
    socket.on(SOCKET_EVENT_NAMES.BUY_ARTIFACT,  events.onBuyArtifact);
    socket.on(SOCKET_EVENT_NAMES.END_TURN,      events.onEndTurn);

    // TODO: add listeners to all other events

    return socket;
}