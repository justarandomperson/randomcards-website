import io, { Socket } from 'socket.io-client';
import { GameSocketEvents, SOCKET_EVENTS } from './shared/types';
import { RefObject, useCallback } from 'react';


export const createGameSocket = (events: GameSocketEvents, token: string): Socket => {
    const socket = io(import.meta.env.VITE_BACKEND_URL, {
        auth: {
            token: token
        }
    });

    // attach all listeners (from server to client)
    socket.on(SOCKET_EVENTS.CONNECT,               events.onConnect);
    socket.on(SOCKET_EVENTS.DISCONNECT,            (reason: any) => events.onDisconnect(reason));

    socket.on(SOCKET_EVENTS.MATCH_START,           events.onMatchStart)
    socket.on(SOCKET_EVENTS.START_TURN,            events.onStartTurn);
    socket.on(SOCKET_EVENTS.SELECT_TARGET,         events.onSelectTarget)
    socket.on(SOCKET_EVENTS.UPDATE_GAME_PHASE,     events.onUpdateGamePhase);
    socket.on(SOCKET_EVENTS.UPDATE_MONEY,          events.onUpdateMoney);
    socket.on(SOCKET_EVENTS.UPDATE_HEALTH,         events.onUpdateHealth);
    socket.on(SOCKET_EVENTS.UPDATE_DRAWPILE_COUNT, events.onUpdateDrawpileCount);
    socket.on(SOCKET_EVENTS.UPDATE_CARD,           events.onUpdateCard);
    socket.on(SOCKET_EVENTS.UPDATE_ARTIFACT,       events.onUpdateArtifact);
    socket.on(SOCKET_EVENTS.UPDATE_HAND,           events.onUpdateHand);    
    socket.on(SOCKET_EVENTS.UPDATE_BENCH,          events.onUpdateBench);
    socket.on(SOCKET_EVENTS.UPDATE_BOARD,          events.onUpdateBoard);
    socket.on(SOCKET_EVENTS.UPDATE_SHOP,           events.onUpdateShop);
    socket.on(SOCKET_EVENTS.ATTACKED,              events.onAttacked);
    socket.on(SOCKET_EVENTS.PLAYED_SPELL,          events.onPlayedSpell);
    socket.on(SOCKET_EVENTS.GAME_END,              events.onGameEnd);

    return socket;
}


export const useGameSocketEmit = (socketRef: RefObject<Socket | null>) => {
    return useCallback(<T>(event: string, payload?: T) => {
        if (!socketRef.current) {
            return;
        }

        socketRef.current.emit(event, payload);
    }, [socketRef]);
}