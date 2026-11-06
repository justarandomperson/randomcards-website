import { useImagesContext } from '../../../contexts/ImagesContext/ImagesContext';
import styles from './Status.module.css'

type Props = {
    status: string,
    amount?: number
}

const Status: React.FC<Props> = ({status, amount}) => {
    const { state: imagesState } = useImagesContext();

    return (
       <div className={styles.status_container}>
        {amount && <span className={styles.status_amount}>{amount}</span>}
        <img src={`data:image/png;base64,${imagesState.get(status)}`}/>
       </div>
    );
}


export default Status