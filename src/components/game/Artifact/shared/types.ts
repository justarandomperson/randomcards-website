export type ArtifactData = {
    id: string
    instanceId: string
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