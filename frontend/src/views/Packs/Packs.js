import { useState, useEffect } from 'react';
import Fetch from '../../components/Fetch';
import Loading from '../../components/Loading';
import Section from '../../components/Section';
import Pack from '../../components/Pack';

const Packs = () => {
  const [packs, setPacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const returnPacks = async () => {
    const packsResponse = await Fetch('/api/packs', {
      method: 'GET',
      credentials: 'include',
    });
    console.log(packsResponse);
    setPacks(packsResponse.payload);
    setLoading(false);
  };
  useEffect(()=> {
    returnPacks();
  }, []);
  return (
    <Section>
      <Loading loading={loading}>
        {packs.map((pack) => <Pack key={pack.id}  id={pack.id} name={pack.name} description={pack.description} cost={pack.cost} />)}
      </Loading>
    </Section>
  )
}

export default Packs;