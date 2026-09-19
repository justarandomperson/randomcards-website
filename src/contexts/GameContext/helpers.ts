import { Draft } from "immer";
import { ClientGameState, DeckIds, OpponentState, PlayerState } from "./types";
import { Deck } from "../../shared/types/decks";


export const matchPlayerIds = (
    draft: Draft<ClientGameState>, playerId: string, socketId: string | undefined
): Draft<PlayerState> | Draft<OpponentState> => {
    if (!socketId) {
        throw new Error("socketId is required");
    }

    if (playerId === socketId) {
        return draft.players.player;
    }

    return draft.players.opponent;
}


export const getDeckIds = (deck: Deck): DeckIds => {
    const unitIds = deck.units.map((unit) => unit.id);
    const spellIds = deck.spells.map((spell) => spell.id);

    return { unitIds, spellIds };
}


export const removeCardInstance = (draft: Draft<ClientGameState>, instanceId: string): boolean => {
    const bench = draft.players.player.cards.bench;
    for (let i = 0; i < bench.length; i++) {
        if (bench[i]?.instanceId === instanceId) {
            bench[i] = null;
            return true;
        }
    }

    const hand = draft.players.player.cards.hand;
    for (let i = 0; i < hand.length; i++) {
        if (hand[i].instanceId === instanceId) {
            hand.splice(i, 1);
            return true;
        }
    }

    const board = draft.board;
    for (let i = 0; i < board.length; i++) {
        if (board[i]?.instanceId === instanceId) {
            board[i] = null;
            return true;
        }
    }

    return false;
};


export const removeArtifactInstance = (draft: Draft<ClientGameState>, instanceId: string): boolean => {
    const playerArtifacts = draft.players.player.data.artifacts;
    for (let i = 0; i < playerArtifacts.length; i++) {
        if (playerArtifacts[i].instanceId === instanceId) {
            playerArtifacts.splice(i, 1);
            return true;
        }
    }

    const opponentArtifacts = draft.players.opponent.data.artifacts;
    for (let i = 0; i < opponentArtifacts.length; i++) {
        if (opponentArtifacts[i].instanceId === instanceId) {
            opponentArtifacts.splice(i, 1);
            return true;
        }
    }

    const shop = draft.shop;
    for (let i = 0; i < shop.length; i++) {
        if (shop[i]?.instanceId === instanceId) {
            shop[i] = null;
            return true;
        }
    }

    return false;
};