import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Fetch from '../../components/Fetch';
import Loading from '../../components/Loading';
import Type from '../../components/Type';

const GameSummary = () => {
  const { gameId } = useParams();
  const [dialog, setDialog] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const gameResponse = await Fetch(`/api/games/${gameId}/summary`, {
        method: 'GET',
        credentials: 'include'
      });
      if (gameResponse.status) {
        setDialog(gameResponse.payload.dialog);
        setLoading(false);
      }
    })();
  }, [gameId]);
  return (
    <Loading loading={loading}>
      <Type phrases={dialog} />
    </Loading>
  )
}

export default GameSummary;
