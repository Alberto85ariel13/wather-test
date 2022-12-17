import { useState } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

const API_SEARCH_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const fetchData = async (string: string) =>
    {
        return (await fetch(`${API_SEARCH_URL}?name=${string}`).then(res => res.json())).results;

    }
type Item = {
    id: number;
    name: string;
    admin1: string;
    country: string;
    latitude: number;
    longitude: number;
}    
const AutoComplete = ({changeCity}: {changeCity: Function}) => {
    const [items, setItems] = useState([]);
    
      const handleOnSearch = (string: string, results: Item[]) => {
        if(string.length>4) {
            fetchData(string).then(res => {
                console.log(res);
                setItems(res?.map(({id, name, admin1, country, latitude, longitude}: Item) =>({id, name, admin1, country, latitude, longitude})))
            });
        }
      }
    
    
      const handleOnSelect = (item: Item) => {
        // the item selected
        changeCity(item)
        console.log('OnSelect', item)
      }
    
  
      const formatResult = (item: Item) => {
        return (
          <div style ={{borderBottom: '0.5px solid black'}}>
            <span style={{ display: 'block', textAlign: 'left' }}>name: {item.name}</span>
            <span style={{ display: 'block', textAlign: 'left' }}>country: {item.country}</span>
            <span style={{ display: 'block', textAlign: 'left' }}>admin: {item.admin1}</span>
          </div>
        )
      }
    return (
        <div style ={{width: '507px'}}>
            <ReactSearchAutocomplete
            items={items}
            onSearch={handleOnSearch}
            onSelect={handleOnSelect}
            autoFocus
            formatResult={formatResult}
            showIcon={false}
            showClear={false}
            styling={
                  {
                    backgroundColor: "#ECECEC",
                    borderRadius: "16px",
                    height: "59px"
                  }
                }
            placeholder={'Enter a city name'}
            />
      </div>
    )

};

export default AutoComplete;