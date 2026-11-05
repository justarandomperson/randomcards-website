import { ArtifactData } from '../Artifact/shared/types'
import Styles from './ArtifactList.module.css'


type Props = {
    artifacts: ArtifactData[]
}


const ArtifactList: React.FC<Props> = ({ artifacts }) => {
    return (
        <div className={Styles.artifact_list_container}>
            {
                artifacts.map((artifact, i) => (
                    <div className={Styles.artifact} key={i}>{`${artifact.name}: ${artifact.effectDesc}`}</div>
                ))
            }
        </div>
    )
}


export default ArtifactList