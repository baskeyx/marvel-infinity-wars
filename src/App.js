import img from './527bb6490a176.jpg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className='Card'>
        <div className='Card-Section'>
          <img className='Card-Image' src={img} alt='Silver Surfer' />
          <div className='Card-Stats'>
            <div className='Card-Stat'><span className='Card-Stat-Rating'>97</span><span>Durability</span></div>
            <div className='Card-Stat'><span className='Card-Stat-Rating'>97</span><span>Energy</span></div>
            <div className='Card-Stat'><span className='Card-Stat-Rating'>75</span><span>Fighting</span></div>
            <div className='Card-Stat'><span className='Card-Stat-Rating'>64</span><span>Intelligence</span></div>
            <div className='Card-Stat'><span className='Card-Stat-Rating'>97</span><span>Speed</span></div>
            <div className='Card-Stat'><span className='Card-Stat-Rating'>86</span><span>Strength</span></div>
          </div>
        </div>
        <div className='Card-Name-Wrapper'>
          <div className='Card-Name'>Silver Surfer</div>
        </div>
      </div>
    </div>
  );
}

export default App;
