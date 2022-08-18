import { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../Context/User';
import Fetch from '../../components/Fetch';
import Loading from '../../components/Loading';
import Type from '../../components/Type';
import Section from '../../components/Section';
import Anchor from '../../components/Anchor';

const Event = () => {
  const [user, setUser] = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [dialog, setDialog] = useState([]);
  const [dialogCompleted, setDialogCompleted] = useState(false);
  const [game, setGame] = useState({});
  const { eventId } = useParams();

  const getEvent = async () => {
    const eventResponse = await Fetch(`/api/events/${eventId}`, {
      method: 'GET',
      credentials: 'include',
    })
    if (eventResponse.status) {
      setDialog(eventResponse.payload.dialog);
      const gameResponse = await Fetch('/api/games', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          eventId,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setGame(gameResponse.payload);
    }
    
    setLoading(false);
  }
  useEffect(() => {
    getEvent();
  }, [])
  return (
    <Loading loading={loading}>
      <Section>
        <Type phrases={dialog} cb={() => setDialogCompleted(true)} />
        {dialogCompleted ? <Anchor to={`/game/${game.id}`}>Start</Anchor>: null } 
      </Section>
    </Loading>
  )
}

export default Event;
