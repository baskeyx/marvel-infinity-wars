import Router from './components/router';
import User from './Context/User';
import './App.css';

const App = () => (
  <div className="App">
    <User>
      <Router />
    </User>
  </div>
);

export default App;
