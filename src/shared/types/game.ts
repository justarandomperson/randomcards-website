import { UnitData } from './card'


export type Board = {
    player: (UnitData | null)[],
    opponent: (UnitData | null)[]
}

export type Shop = {
    artifacts: ArtifactData[]
}

export enum GamePhase {
    PLAY = 'PLAY',
    SHOP = 'SHOP'    
}

export type ArtifactData = {
    instanceId: number,
    name: string,
    effect: string,
    cost: number
};