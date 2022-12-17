import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import cities from './cities.json'

type IItem = {
    id: string;
    name?: string;
}    
const AutoComplete = ({changeCity}: {changeCity: Function}) => {
        const items: IItem[] = cities;

      const handleOnSelect = (item: IItem) => {
        changeCity(item.name)
      }
    
  
      const formatResult = (item: IItem) => {
        return (
            <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
        )
      }
    return (
        <div style ={{width: '507px'}}>
            <ReactSearchAutocomplete
            items={items}
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