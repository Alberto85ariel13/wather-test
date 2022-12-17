import { useState } from 'react';
import styles from './Card.module.css';
const Card = ({latitude, longitude}: {latitude: number, longitude: number}) => {
    return (
        <div className={styles.containerCard}>
        </div>
    )

};

export default Card;