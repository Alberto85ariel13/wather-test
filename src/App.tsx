import './App.css';
import { useState } from 'react';
import axios from 'axios';
import SwitchGrade from './components/switch/switch';
import AutoComplete from './components/autoComplete/autoComplete';
import Card from './components/card/card';
import ICard from './components/card/ICard';

const API_SEARCH_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const API_FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';

function App() {
  const [celsius, setCelsius] = useState(true);
  const [cards, setCards] = useState<ICard[]>([]);
  const [valueSearch, setValueSearch] = useState('');

  const getSearchCard = () => {
    if(valueSearch?.length) {
      const searchParams = new URLSearchParams({name: valueSearch});

      axios.get(`${API_SEARCH_URL}?${searchParams.toString()}`).then(resSearch => {
        const city = resSearch?.data?.results;
        if(city?.length) {
          const {latitude,longitude} = city[0];
          const tempParams = new URLSearchParams({latitude,longitude, hourly: 'temperature_2m'});

          axios.get(`${API_FORECAST_URL}?${tempParams.toString()}`).then(resTemp => {
            const tempArray = resTemp?.data?.hourly?.temperature_2m;
            const temps = [tempArray[0],tempArray[24], tempArray[48], tempArray[72], tempArray[96]]
            const weatherParams = new URLSearchParams({latitude,longitude, hourly: 'weathercode'});
            
            axios.get(`${API_FORECAST_URL}?${weatherParams.toString()}`).then(resWeather => {
              const weatherArray = resWeather?.data?.hourly?.weathercode;
              const weather = weatherArray[0];
              const card:ICard = {latitude, longitude, temps, weather, celsius, name: valueSearch};
              setCards([...cards, card]);
            })
          })
        }
      })
    }
  }
  return (
    <div className="App">
      <header className="App-header">
          <SwitchGrade defaultCelsius={true} changeCelsius ={setCelsius} ></SwitchGrade>
      </header>
      <div className="ContainerSearch">
          <AutoComplete changeCity={setValueSearch}/>
          <div className="button" onClick={getSearchCard}>submit</div>
      </div>
      <div className="ContainerCard">
        {!cards.length ?
         <div className="containerNoCard">
            <div className="iconNoCard wi wi-day-cloudy"></div> 
            <div className="textNoCard">Submit a city to fill up this space</div>
          </div> :
          <>
            {cards.map(({latitude, longitude, weather, celsius, name, temps}, index) => (
              <Card key={index} latitude={latitude} longitude={longitude} weather={weather} celsius={celsius} name={name} temps={temps}/>
            ))}
          </>
        }
      </div>
    </div>
  );
}

export default App;
