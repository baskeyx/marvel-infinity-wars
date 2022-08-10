import { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../Context/User';
import Fetch from '../../components/Fetch';
import Loading from '../../components/Loading';
import Type from '../../components/Type';
import Section from '../../components/Section';

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
    console.log(eventResponse);
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
  

  // const gameProgress = async (id) => {
  //   const gameResponse = await Fetch(`/api/games/${id ? id : game.id}/progress`, {
  //     method: 'PUT',
  //     credentials: 'include',
  //   });
    
  // }

  // const gameStart = async (id) => {
  //   const gameResponse = await Fetch(`/api/games/${id ? id : game.id}/start`, {
  //     method: 'PUT',
  //     credentials: 'include',
  //   });
  //   setGame(gameResponse.payload);
  //   setDialog(gameResponse.payload.output);
  // }

  // const selectAttribute = async (e) => {
  //   if (game.turn) return;
  //   const gameResponse = await Fetch(`/api/games/${game.id}`, {
  //     method: 'PUT',
  //     credentials: 'include',
  //     body: JSON.stringify({
  //       attribute: e.target.id
  //     }),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  //   console.log(gameResponse.payload);
  // }
  
  useEffect(() => {
    getEvent();
  }, [])
  return (
    <Loading loading={loading}>
      <Section>
        <Type phrases={dialog} cb={() => setDialogCompleted(true)} />
        {dialogCompleted ? <Link to={`/game/${game.id}`}>Start</Link>: null }
      </Section>
    </Loading>
  )
}

export default Event;
