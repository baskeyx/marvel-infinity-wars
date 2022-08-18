import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../Context/User';
import Fetch from '../../components/Fetch';
import Section from '../../components/Section';
import Type from '../../components/Type';
import Loading from '../../components/Loading';

const Home = () => {
  const [user, setUser] = useContext(UserContext);
  const [dialog, setDialog] = useState([]);
  const [loading, setLoading] = useState(user.intro ? true : false);

  const loadRequests = async () => {
    if (user.intro) {
      const dialogResponse = await Fetch('/api/dialogs/cceda0fb-f2af-4b8c-81a9-e5eae041d2b3', {
        method: 'GET',
        credentials: 'include',
      });
      setDialog(dialogResponse.payload);
      setLoading(false);
    }
  }

  useEffect(()=> {
    loadRequests();
  }, []);

  return (
    <Section>
      <Loading loading={loading}>
        {dialog.id ? <Type phrases={dialog.dialog} /> : null }
      </Loading>
    </Section>
  )
}

export default Home;