import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../Context/User';
import Battle from '../../components/Battle';
import Section from '../../components/Section';
import Loading from '../../components/Loading';
import Fetch from '../../components/Fetch';
import Type from '../../components/Type';
import Anchor from '../../components/Anchor';

const Game = () => {
  const [user, setUser] = useContext(UserContext);
  const [game, setGame] = useState([]);
  const [dialog, setDialog] = useState([]);
  const [gameTemp, setGameTemp] = useState([]);
  const [loading, setLoading] = useState(true);
  const { gameId } = useParams();

  const loadGame = async () => {
    const gameResponse = await Fetch(`/api/games/${gameId}`, {
      method: 'GET',
      credentials: 'include',
    })
    setGame(gameResponse.payload);
    setGameTemp(gameResponse.payload);
    setDialog(gameResponse.payload.output);
    setLoading(false);
  }

  const afterDialog = async () => {
    if (gameTemp.turn && !gameTemp.completed) {
      setGame(gameTemp);
      const gameResponse = await Fetch(`/api/games/${gameId}/turn`, {
        method: 'PUT',
        credentials: 'include',
      });
      setGameTemp(gameResponse.payload);
      setDialog(gameResponse.payload.output);
      setLoading(false);
    } else {
      setGame(gameTemp);
      if (gameTemp.completed) {
        const userResponse = await Fetch('/api/users', {
          method: 'GET',
          credentials: 'include',
        });
        setUser(userResponse.payload);
      } else {
        setDialog([
          { character: '', copy: 'Choose an attribute' },
        ])
      }
    }
  }

  const selectAttribute = async (e) => {
    if (game.turn) return false;
    const { id } = e.target;   
    if (game.attributes.includes(id)) return false;
    const gameResponse = await Fetch(`/api/games/${gameId}/attribute/${id}`, {
      method: 'PUT',
      credentials: 'include',
    });
    setGameTemp(gameResponse.payload);
    setDialog(gameResponse.payload.output);
  }

  useEffect(() => {
    loadGame();
  },[])
  return (
    <Loading loading={loading}>
      <Section>
        {game.players ? <Battle game={game} selectAttribute={selectAttribute} /> : 'Game could not be loaded' }
        {dialog.length ? <Type phrases={dialog} cb={afterDialog} /> : null}
        {game.completed ? <Anchor to={`/game/${gameId}/summary`}>Summary</Anchor> : null }
      </Section>
    </Loading>
  )
}

export default Game;
