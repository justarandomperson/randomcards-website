import { UnitData } from './card'


type Board = {
    player: (UnitData | null)[],
    opponent: (UnitData | null)[]
}

export type Shop = {
    artifacts: ArtifactData[]
}

export enum GamePhase {
    PLAY = 'play',
    SHOP = 'shop'    
}

export type ArtifactData = {
    instanceId: string
    name: string
    effect: string
    cost: number
};

export enum ArtifactZone {
    SHOP = 'shop',
    PLAYER = 'player'
}

export type ArtifactLocation = {
    insideOf: ArtifactZone
    index: number
};