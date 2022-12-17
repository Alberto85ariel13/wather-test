import styles from './Card.module.css';
import ICard from './ICard';
import moment from 'moment';

const TEMP_BACKGROUND_COLOR = 5;
const days = [
    'TODAY',
    moment().add(1, 'days').format('ddd').toUpperCase(),
    moment().add(2, 'days').format('ddd').toUpperCase(),
    moment().add(3, 'days').format('ddd').toUpperCase(),
    moment().add(4, 'days').format('ddd').toUpperCase(),
];

const convertToF = (val:number):number => val*9/5+32;

const Card = ({name, weather, latitude, longitude, temps, celsius}: ICard) => {
    const iconWeather = 'wi wi-day-cloudy';
    const grade = celsius? '°': 'F';
    const dark =  temps[0]< TEMP_BACKGROUND_COLOR;
    const styleCard = {
        background: dark? "#023047": "#FFB703",     
        border: dark? "1px solid #000000": "1px solid #FFB703"
    }
    const styleIcon = {
        fontSize: "70px",
        marginTop: "36px",
        marginLeft: "36px",
        color: dark? "#8ECAE6": "#FB8500"
    }

    !celsius && (temps = temps.map(convertToF));
    temps = temps.map(Math.round);
    return (
        <div className={styles.containerCard} style ={styleCard}>
            <div className={styles.containerHeader}>
                <div className={iconWeather} style ={styleIcon}></div>
                <div className={styles.containerText}>
                    <div>{name}</div>
                    <div style={{fontSize: "24px", lineHeight: "28px", marginTop: "8px"}}>{`${latitude}° N, ${longitude}° W`}</div>
                </div>
            </div>
            <div className={styles.containerDays}>
                {days.map((day: string, index: number) => (
                    <div key={index} style={{display: "contents"}}>
                    <div>
                        <div>{day}</div>
                        <div className={styles.temp}>{`${temps[index]}${grade}`}</div>
                    </div>
                    {index<4 && <div>|</div>}
                    </div>
                ))}
            </div>
        </div>
    )

};

export default Card;