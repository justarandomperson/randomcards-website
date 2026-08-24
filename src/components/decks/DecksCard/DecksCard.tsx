import { UnitData, SpellData } from '../../../types/card'
import Card from '../../game/Card/Card';


type Props = {
    cardData: UnitData | SpellData
}


const DecksCard: React.FC<Props> = ({ cardData }) => {


    return (
        <Card cardData={cardData}/>
    );
}



export default DecksCard