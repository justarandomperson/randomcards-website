export enum GamePhase {
    PLAY = 'play',
    SHOP = 'shop'    
}

export type ArtifactData = {
    instanceId: string
    id: string
    name: string
    effectDesc: string
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