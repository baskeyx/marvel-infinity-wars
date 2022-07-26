import { useState, useEffect } from 'react';
import Router from './components/router';
import User from './Context/User';
import './App.css';
import { Amplify, API } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

function App() {
  const [myMessage, setMyMessage] = useState('');
  const apiCall = async () => {
    API.get('AMPAPI', '/test', {})
    .then(response => {
      console.log(response)
      setMyMessage(response.success)
    })
  }
  useEffect(() => {
    apiCall();
  }, []);
  return (
    <div className="App">
      <User>
        <Router />
      </User>
    </div>
  );
}

export default App;
