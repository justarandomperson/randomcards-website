import { ArtifactData } from '../types/artifact'


export const STARTING_HEALTH = 20;
export const STARTING_MONEY = 0;
export const STARTING_TURN = 0;

export const UNITS_IN_DECK = 8;
export const SPELLS_IN_DECK = 12; // also max drawpile size

export const MAX_CARDS_PER_BOARD_ROW = 4;

export const MAX_HAND_SIZE = 6;

export const NULL_ARTIFACT: ArtifactData = { id: 0, name: "", effect: "", cost: 0 }; // empty shop slot

export const TURN_NUMBER_MONEY_MULT = 2;