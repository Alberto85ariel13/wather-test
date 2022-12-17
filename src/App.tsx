import './App.css';
import { useState, useEffect } from 'react';
import SwitchGrade from './components/switch/switch';
import AutoComplete from './components/autoComplete/autoComplete';
import Card from './components/card/card';
import ICard from './components/card/ICard';
import { getDataCard } from './services/weatherService';


function App() {
  const [celsius, setCelsius] = useState(true);
  const [cards, setCards] = useState<ICard[]>([]);
  const [valueSearch, setValueSearch] = useState('');
  // const [inputSearch, setInputSearch] = useState('');
  const changeCelsius = (pCelsius: boolean) => {
    setCelsius(pCelsius);
    setCards([...(cards.map(card => ({...card, celsius: pCelsius})))])
  }
  // useEffect(() => {
  //   setCards([...(cards.map(card => ({...card, celsius})))])
  // }, [celsius]);

  const getSearchCard = () => {
    if(valueSearch?.length) {
      // setInputSearch('');
      getDataCard(valueSearch).then(card => card && setCards([...cards, {...card, celsius}]))
    }
  }
  return (
    <div className="App">
      <header className="App-header">
          <SwitchGrade defaultCelsius={true} changeCelsius ={changeCelsius} ></SwitchGrade>
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
