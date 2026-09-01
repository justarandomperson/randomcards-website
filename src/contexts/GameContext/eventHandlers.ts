import { Socket } from 'socket.io-client';
import { SOCKET_EVENT_NAMES, BuyArtifactPayload, PlaySpellPayload, PlayUnitPayload } from './types';


// senders (from client to server)
export const sendPlayUnit = (socket: Socket, payload: PlayUnitPayload) => {
    socket.emit(SOCKET_EVENT_NAMES.PLAY_UNIT, payload);
}

export const sendPlaySpell = (socket: Socket, payload: PlaySpellPayload) => {
    socket.emit(SOCKET_EVENT_NAMES.PLAY_SPELL, payload);
}

export const sendBuyArtifact = (socket: Socket, payload: BuyArtifactPayload) => {
    socket.emit(SOCKET_EVENT_NAMES.BUY_ARTIFACT, payload);
}

export const sendEndTurn = (socket: Socket) => {
    socket.emit(SOCKET_EVENT_NAMES.END_TURN);
}


// receivers (from server to client)
export const onPlayUnit = () => {

}

export const onPlaySpell = () => {

}

export const onBuyArtifact = () => {

}

export const onEndTurn = () => {

}

export const onStartTurn = () => {

}

export const onRefillShop = () => {

}

export const onUpdateGamePhase = () => {

}

export const onUpdateHand = () => {

}

export const onUpdateBoard = () => {

}

export const onUpdatePlayerMoney = () => {
    
}