import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../Context/User';
import Fetch from '../../components/Fetch';
import Loading from '../../components/Loading';
import Section from '../../components/Section';
import Pack from '../../components/Pack';
import Type from '../../components/Type';
import SweetAlert2 from '../../components/SweetAlert';
import CardReveal from '../../components/CardReveal';

const Packs = () => {
  const [user, setUser] = useContext(UserContext);
  const [dialog, setDialog] = useState([]);
  const [packs, setPacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [card, setCard] = useState({});
  const [showPacks, setShowPacks] = useState(true);
  const [showType, setShowType] = useState(false);
  const [showCard, setShowCard] = useState(false);

  const loadRequests = async () => {
    const packsResponse = await Fetch('/api/packs', {
      method: 'GET',
      credentials: 'include',
    });
    setPacks(packsResponse.payload);
    if (user.intro) {
      const dialogResponse = await Fetch('/api/dialogs/74fa44e1-362a-4a38-988a-f0b4fb140543', {
        method: 'GET',
        credentials: 'include',
      });
      setDialog(dialogResponse.payload);
    }
    setLoading(false);
  };

  const postCard = async (id) => {
    const cardResponse = await Fetch(`/api/cards/${id}`, {
      method: 'POST',
      credentials: 'include',
    });
    if (!cardResponse.status) {
      SweetAlert2(cardResponse.payload.message);
    } else {
      setCard(cardResponse.payload);
      setShowCard(true);
      setShowPacks(false);
      setShowType(false);
    }
  }

  const afterCard = async () => {
    setShowCard(false);
    if (user.intro) {
      const dialogResponse = await Fetch('/api/dialogs/14dc3837-d975-4cd2-88f4-e246a5b27379', {
        method: 'GET',
        credentials: 'include',
      });
      setDialog(dialogResponse.payload);
      setShowType(true);
    } else {
      setShowPacks(true);
    }
  } 

  useEffect(()=> {
    loadRequests();
    if (user.intro) setShowType(true);
  }, []);
  return (
    <Section>
      <Loading loading={loading}>
        { showPacks ? packs.map((pack) => <Pack key={pack.id} id={pack.id} name={pack.name} description={pack.description} cost={pack.cost} onClick={() => postCard(pack.id)} />) : null }
        { showType ? <Type phrases={dialog.dialog} /> : null }
        { showCard ? <CardReveal character={card} btnClick={afterCard} /> : null }
      </Loading>
    </Section>
  )
}

export default Packs;