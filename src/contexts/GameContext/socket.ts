import io, { Socket } from 'socket.io-client';
import { GameSocketEvents, SOCKET_EVENT_NAMES } from './types';
import { RefObject, useCallback } from 'react';


export const createGameSocket = (events: GameSocketEvents, token: string): Socket => {
    const socket = io("http://localhost:3000", {
        auth: {
            token: token
        }
    });

    // attach all listeners (from server to client)
    socket.on(SOCKET_EVENT_NAMES.CONNECT,               events.onConnect);
    socket.on(SOCKET_EVENT_NAMES.DISCONNECT,            events.onDisconnect);

    socket.on(SOCKET_EVENT_NAMES.MATCH_START,           events.onMatchStart)
    socket.on(SOCKET_EVENT_NAMES.START_TURN,            events.onStartTurn);
    socket.on(SOCKET_EVENT_NAMES.UPDATE_GAME_PHASE,     events.onUpdateGamePhase);
    socket.on(SOCKET_EVENT_NAMES.UPDATE_MONEY,          events.onUpdateMoney);
    socket.on(SOCKET_EVENT_NAMES.UPDATE_HEALTH,         events.onUpdateHealth);
    socket.on(SOCKET_EVENT_NAMES.UPDATE_DRAWPILE_COUNT, events.onUpdateDrawpileCount);
    socket.on(SOCKET_EVENT_NAMES.UPDATE_CARD,           events.onUpdateCard);
    socket.on(SOCKET_EVENT_NAMES.UPDATE_ARTIFACT,       events.onUpdateArtifact);
    socket.on(SOCKET_EVENT_NAMES.UPDATE_HAND,           events.onUpdateHand);    
    socket.on(SOCKET_EVENT_NAMES.UPDATE_BENCH,          events.onUpdateBench);
    socket.on(SOCKET_EVENT_NAMES.UPDATE_BOARD,          events.onUpdateBoard);
    socket.on(SOCKET_EVENT_NAMES.UPDATE_SHOP,           events.onUpdateShop);
    socket.on(SOCKET_EVENT_NAMES.UPDATE_PLAYER_DATA,    events.onUpdatePlayerData);

    return socket;
}


export const useGameSocketEmit = (socketRef: RefObject<Socket | null>) => {
    return useCallback(<T,>(event: string, payload?: T) => {
        if (!socketRef.current) return;
        socketRef.current.emit(event, payload);
    }, [socketRef]);
}