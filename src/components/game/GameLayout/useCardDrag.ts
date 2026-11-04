import { useState } from 'react'
import { DragStartEvent, DragEndEvent } from '@dnd-kit/core'
import { CardLocation, CardType, CardZone, DraggedCard } from '../../../shared/types/card'
import { useGameContext } from '../../../contexts/GameContext/GameContext'


//? i hate this type of code but this is the only way to actually typecheck these??
const isDraggedCard = (data: unknown): data is DraggedCard => {
    return !!data && typeof data === 'object' && 'cardData' in data;
}

const isCardLocation = (data: unknown): data is CardLocation => {
    return !!data && typeof data === 'object' && 'index' in data;
}


export function useCardDrag() {
    const [activeCardDrag, setActiveCardDrag] = useState<DraggedCard | null>(null)
    const { emitters } = useGameContext()
    const { playUnit, playSpell } = emitters

    const handleCardDragStart = (event: DragStartEvent) => {
        const data = event.active.data.current;
        if (isDraggedCard(data)) {
            setActiveCardDrag(data);
        }
    }

    const handleCardDragEnd = (event: DragEndEvent) => {
        setActiveCardDrag(null);

        const { active, over } = event;
        if (!over) return;

        const card = active.data.current;
        const to = over.data.current;
        if (!isDraggedCard(card) || !isCardLocation(to)) { 
            return;
        }

        if (!card.cardData.instanceId) {
            throw new Error (`card ${card.cardData.name} has to have an instanceId`);
        }

        if (card.location.insideOf == CardZone.NONE)
        {
            throw new Error(`Card ${card.cardData.name} has no location`)
        }

         if (to.insideOf == CardZone.NONE)
        {
            throw new Error(`card drag to has no location`)
        }

        switch (card.cardData.type) {
            case CardType.UNIT: {
                const payload = { instanceId: card.cardData.instanceId, boardIndex: to.index };
                playUnit(payload, card.cardData, card.location.index);
                break;
            }

            case CardType.SPELL: {
                const payload = { instanceId: card.cardData.instanceId };
                playSpell(payload, card.cardData, card.location.index);
                break;
            }
        }
    }

    return { activeCardDrag, handleCardDragStart, handleCardDragEnd };
}