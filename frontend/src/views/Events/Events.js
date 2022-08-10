import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../Context/User';
import Fetch from '../../components/Fetch';
// import Event from '../../components/Event';
import Section from '../../components/Section';
import Type from '../../components/Type';

const Events = () => {
  const [user, setUser] = useContext(UserContext);
  const [events, setEvents] = useState([]);
  const [dialog, setDialog] = useState([]);
  
  const loadRequests = async () => {
    const eventsResponse = await Fetch('/api/events', {
      method: 'GET',
      credentials: 'include',
    });
    setEvents(eventsResponse.payload);
    console.log(eventsResponse.payload);
    if (user.intro) {
      const dialogResponse = await Fetch('/api/dialogs/5e237a5c-e74c-4972-9bbc-02fd2a422ae5', {
        method: 'GET',
        credentials: 'include',
      });
      setDialog(dialogResponse.payload);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);
  return (
    <Section>
      {/* {events.map((e) => <Event key={e.id} id={e.id} name={e.name} description={e.description} characters={e.characters} /> )} */}
      {dialog.id ? <Type phrases={dialog.dialog} /> : null }
    </Section>  
  );
}

export default Events;
