import styles from './Card.module.css';
import ICard from './ICard'

const Card = ({name, weather, latitude, longitude, temps, celsius}: ICard) => {
    return (
        <div className={styles.containerCard}>
        </div>
    )

};

export default Card;