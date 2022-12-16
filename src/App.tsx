import './App.css';
import SwitchGrade from './components/switch/switch';
function App() {
  return (
    <div className="App">
      <header className="App-header">
          <SwitchGrade defaultCelsius={true} changeCelsius ={(celsius: boolean) =>console.log(celsius)} ></SwitchGrade>
      </header>
      <div className="Container">
        
      </div>
    </div>
  );
}

export default App;
