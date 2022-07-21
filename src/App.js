import Card from './components/card';
import { useState, useEffect } from 'react';
import Game from './components/game';
import './App.css';
import { API } from 'aws-amplify'
// import awsconfig from './aws-exports';
// Auth.configure(awsconfig);

function App() {
  const [myMessage, setMyMessage] = useState('');
  const apiCall = async () => {
    API.get('AMPAPI', '/test', {})
    .then(response => {
      setMyMessage(response.success)
    })
  }
  useEffect(() => {
    apiCall();
  }, []);
  return (
    <div className="App">
      {myMessage}
      {/* <Card img={img} /> */}
      <Game />
    </div>
  );
}

export default App;
