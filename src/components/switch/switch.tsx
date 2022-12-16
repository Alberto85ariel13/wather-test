import { useState } from 'react';
import styles from './Switch.module.css';
const SwitchGrade = ({defaultCelsius, changeCelsius}: {defaultCelsius: boolean, changeCelsius: Function}) => {
    const [celsius, setCelsius] = useState<boolean>(defaultCelsius);

    const putCelsius = () => {
        changeCelsius(!celsius);
        setCelsius(!celsius);
    }
    return (
        <div className={styles.containerSwitch} onClick={putCelsius}>
            <p>F</p>
            <p>C</p>
            <div className={styles.switch} style={{marginLeft: [-1,1][+celsius]*50}}/>
        </div>
    )

};

export default SwitchGrade;