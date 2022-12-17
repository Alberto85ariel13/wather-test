import moment from 'moment';

const TEMP_BACKGROUND_COLOR = 30;
const days = [
    'TODAY',
    moment().add(1, 'days').format('ddd').toUpperCase(),
    moment().add(2, 'days').format('ddd').toUpperCase(),
    moment().add(3, 'days').format('ddd').toUpperCase(),
    moment().add(4, 'days').format('ddd').toUpperCase(),
];

// 0	Clear sky
// 1, 2, 3	Mainly clear, partly cloudy, and overcast
// 45, 48	Fog and depositing rime fog
// 51, 53, 55	Drizzle: Light, moderate, and dense intensity
// 56, 57	Freezing Drizzle: Light and dense intensity
// 61, 63, 65	Rain: Slight, moderate and heavy intensity
// 66, 67	Freezing Rain: Light and heavy intensity
// 71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
// 77	Snow grains
// 80, 81, 82	Rain showers: Slight, moderate, and violent
// 85, 86	Snow showers slight and heavy
// 95 *	Thunderstorm: Slight or moderate
// 96, 99 *	Thunderstorm with slight and heavy hail
const weatherCode = [
    {
        className: "wi-day-sunny",
        code: [0] 
    },
    {
        className: "wi-day-cloudy",
        code: [1, 2, 3] 
    },
    {
        className: "wi-day-fog",
        code: [45, 46] 
    },
    {
        className: "wi-day-hail",
        code: [51, 53, 55] 
    },
    {
        className: "wi-day-rain",
        code: [56, 57] 
    },
    {
        className: "wi-day-rain",
        code: [61, 63, 65] 
    },
    {
        className: "wi-day-snow",
        code: [71, 73, 75, 77] 
    },
    {
        className: "wi-day-rain-wind",
        code: [80, 81, 82] 
    },
    {
        className: "wi-day-snow-wind",
        code: [85, 86] 
    },
];

export {TEMP_BACKGROUND_COLOR, days, weatherCode};