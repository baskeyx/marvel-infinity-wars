import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../Context/User';
import Fetch from '../../components/Fetch';
import Loading from '../../components/Loading';
import Section from '../../components/Section';
import Pack from '../../components/Pack';
import Type from '../../components/Type';
import SweetAlert2 from '../../components/SweetAlert';

const Packs = () => {
  const [user, setUser] = useContext(UserContext);
  const [dialog, setDialog] = useState([]);
  const [packs, setPacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [card, setCard] = useState({});
  const loadRequests = async () => {
    const packsResponse = await Fetch('/api/packs', {
      method: 'GET',
      credentials: 'include',
    });
    setPacks(packsResponse.payload);
    const dialogResponse = await Fetch('/api/dialogs/74fa44e1-362a-4a38-988a-f0b4fb140543', {
      method: 'GET',
      credentials: 'include',
    });
    setDialog(dialogResponse.payload);
    setLoading(false);
  };
  const postCard = async (e) => {
    const { id } = e.target;
    const cardResponse = await Fetch(`/api/cards/${id}`, {
      method: 'POST',
      credentials: 'include',
    });
    if (!cardResponse.status) {
      SweetAlert2(cardResponse.payload.message);
    } else {
      console.log(cardResponse.payload)
      setCard(cardResponse.payload);
    }
  }
  useEffect(()=> {
    loadRequests();
  }, []);
  return (
    <Section>
      <Loading loading={loading}>
        { card.id ? null : packs.map((pack) => <Pack key={pack.id} id={pack.id} name={pack.name} description={pack.description} cost={pack.cost} onClick={postCard} />)}
        { 
          card.id ?
          card.id :
          user.intro ? <Type phrases={dialog.dialog} /> : null
        }
      </Loading>
    </Section>
  )
}

export default Packs;