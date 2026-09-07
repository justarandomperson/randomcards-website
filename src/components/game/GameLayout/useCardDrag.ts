import { useState } from 'react'
import { DragStartEvent, DragEndEvent } from '@dnd-kit/core'
import { CardLocation, CardType, DraggedCard } from '../../../shared/types/card'
import { useGameContext } from '../../../contexts/GameContext/GameContext'


//? i hate this type of code but this is the only way to actually typecheck these
const isDraggedCard = (data: unknown): data is DraggedCard => {
    return !!data && typeof data === 'object' && 'cardData' in data;
}

const isCardLocation = (data: unknown): data is CardLocation => {
    return !!data && typeof data === 'object' && 'index' in data;
}


export function useCardDrag() {
    const [activeCardDrag, setActiveCardDrag] = useState<DraggedCard | null>(null);
    const { playUnit, playSpell } = useGameContext();

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
        if (!isDraggedCard(card) || !isCardLocation(to)) return;

        switch (card.cardData.type) {
            case CardType.UNIT:
                playUnit({ instanceId: card.cardData.instanceId, boardIndex: to.index });
                break;
            case CardType.SPELL:
                playSpell({ instanceId: card.cardData.instanceId });
                break;
        }
    }

    return { activeCardDrag, handleCardDragStart, handleCardDragEnd };
}