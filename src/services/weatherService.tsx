import axios from 'axios';
import ICard from '../components/card/ICard';

const API_SEARCH_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const API_FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';


const getDataCard = async (valueSearch: string): Promise<ICard | undefined> => {
    const searchParams = new URLSearchParams({name: valueSearch});
    const resSearch = await axios.get(`${API_SEARCH_URL}?${searchParams.toString()}`);
    const city = resSearch?.data?.results;

    if(city?.length) {
      const {latitude,longitude} = city[0];
      const tempParams = new URLSearchParams({latitude,longitude, hourly: 'temperature_2m'});
      const resTemp = await axios.get(`${API_FORECAST_URL}?${tempParams.toString()}`);
      const tempArray = resTemp?.data?.hourly?.temperature_2m;
      const temps = [tempArray[0],tempArray[24], tempArray[48], tempArray[72], tempArray[96]];

      const weatherParams = new URLSearchParams({latitude,longitude, hourly: 'weathercode'});        
      const resWeather = await axios.get(`${API_FORECAST_URL}?${weatherParams.toString()}`);
      const weatherArray = resWeather?.data?.hourly?.weathercode;
      const weather = weatherArray[0];

      return {latitude, longitude, temps, weather, celsius: true, name: valueSearch};
    }
}





export {getDataCard};