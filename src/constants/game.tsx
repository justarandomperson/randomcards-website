import { ArtifactData } from '../types/artifact'


const STARTING_HEALTH = 20;
const STARTING_MONEY = 0;
const STARTING_TURN = 0;

export { STARTING_HEALTH, STARTING_MONEY, STARTING_TURN}


const UNITS_IN_DECK = 8;
const SPELLS_IN_DECK = 12; // also max drawpile size

export { UNITS_IN_DECK, SPELLS_IN_DECK }


const MAX_CARDS_PER_BOARD_ROW = 4;

export { MAX_CARDS_PER_BOARD_ROW }


const MAX_HAND_SIZE = 6;

export { MAX_HAND_SIZE }


const NULL_ARTIFACT: ArtifactData = {id: 0, name: "", effect: "", cost: 0}; // empty shop slot

export { NULL_ARTIFACT }


const TURN_NUMBER_MONEY_MULT = 2;

export { TURN_NUMBER_MONEY_MULT }