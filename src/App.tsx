import './App.css';
import { useState, useEffect } from 'react';
import SwitchGrade from './components/switch/switch';
import AutoComplete from './components/autoComplete/autoComplete';
import Card from './components/card/card';
import ICard from './components/card/ICard';
import { getDataCard } from './services/weatherService';

const splitByChunk = (list: ICard[], chunk: number): ICard[][] => {
  return [...Array(Math.ceil(list.length / chunk))].map(_ => list.splice(0,chunk))
}


function App() {
  const [celsius, setCelsius] = useState(true);
  const [cards, setCards] = useState<ICard[]>([]);
  const [valueSearch, setValueSearch] = useState('');
  const [chunkCard, setChunkCard] = useState(2);
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const changeCelsius = (pCelsius: boolean) => {
    setCelsius(pCelsius);
    setCards([...(cards.map(card => ({...card, celsius: pCelsius})))])
  }
  useEffect(() => {
    if(windowSize.innerWidth<1100) {
      setChunkCard(1);
    } else {
      if(windowSize.innerWidth<1600) {
        setChunkCard(2);
      } else { 
        if(windowSize.innerWidth<1900) {
          setChunkCard(3);
        } else { 
          setChunkCard(4);
      }
    }
  }
    console.log(windowSize)
  },[windowSize])
  
  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const getSearchCard = () => {
    if(valueSearch?.length) {
      getDataCard(valueSearch).then(card => card && setCards([...cards, {...card, celsius}]))
    }
  }
  const removeCard = (id: string) => {
    const [int, rest] = id.split('-');
    const index = Number(int)*chunkCard+Number(rest);
    const tempCards = [...cards];
    tempCards.splice(index,1);
    setCards(tempCards)
  }
  const listCard = splitByChunk([...cards],chunkCard);
  return (
    <div className="App">
      <header className="App-header">
          <SwitchGrade defaultCelsius={true} changeCelsius ={changeCelsius} ></SwitchGrade>
      </header>
      <div className="ContainerSearch">
          <AutoComplete changeCity={setValueSearch}/>
          <div className="button" onClick={getSearchCard}>submit</div>
      </div>
      {!cards.length ?
        <div className="ContainerCard">
         <div className="containerNoCard">
            <div className="iconNoCard wi wi-day-cloudy"></div> 
            <div className="textNoCard">Submit a city to fill up this space</div>
          </div>
        </div> :
        listCard.map((list: ICard[], indexList: number) => (
          <div key={indexList} className="ContainerCard">
            <>
              {list.map(({latitude, longitude, weather, celsius, name, temps}, indexCard) => (
                <Card key={indexCard} id={`${indexList}-${indexCard}`} card = {{name, weather, latitude, longitude, temps, celsius}} remove={removeCard}/>
              ))}
            </>
          </div>
          )
        )
       }
    </div>
  );
}

function getWindowSize() {
  const {innerWidth, innerHeight} = window;
  return {innerWidth, innerHeight};
}

export default App;
