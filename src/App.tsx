import './App.css';
import { useState } from 'react';
import SwitchGrade from './components/switch/switch';
import AutoComplete from './components/autoComplete/autoComplete';
import Card from './components/card/card';
function App() {
  const [cards, setCards] = useState([]);
  return (
    <div className="App">
      <header className="App-header">
          <SwitchGrade defaultCelsius={true} changeCelsius ={(celsius: boolean) =>console.log(celsius)} ></SwitchGrade>
      </header>
      <div className="ContainerSearch">
          <AutoComplete changeCity={()=>{}}/>
          <div className="button">submit</div>
      </div>
      <div className="ContainerCard">
        {!cards.length ?
         <div className="containerNoCard">
            <div className="iconNoCard wi wi-day-cloudy"></div> 
            <div className="textNoCard">Submit a city to fill up this space</div>
          </div> :
          <>
          <Card latitude={0} longitude={0}/>
          <Card latitude={0} longitude={0}/>
          <Card latitude={0} longitude={0}/>
          </>
        }
      </div>
    </div>
  );
}

export default App;
