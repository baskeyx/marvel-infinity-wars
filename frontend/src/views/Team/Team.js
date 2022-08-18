import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../Context/User';
import Fetch from '../../components/Fetch';
import Loading from '../../components/Loading';
import Member from '../../components/Member';
import Section from '../../components/Section';
import Type from '../../components/Type';

const Team = () => {
  const [user, setUser] = useContext(UserContext);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialog, setDialog] = useState([]);

  const loadRequests = async () => {
    const cardsResponse = await Fetch('/api/cards', {
      method: 'GET',
      credentials: 'include',
    });
    if (cardsResponse.status) {
      setMembers(cardsResponse.payload);
      setLoading(false);
    }
    if (user.intro){
      const dialogResponse = await Fetch('/api/dialogs/6031b47d-7083-455a-893d-36f161ed2ebb', {
        method: 'GET',
        credentials: 'include',
      });
      setDialog(dialogResponse.payload);
    }
  }

  const selectCard = async (id) => {
    const tempUser = user;
    const userResponse = await Fetch(`/api/users/selected/${id}`, {
      method: 'PUT',
      credentials: 'include',
    });
    tempUser.selected = userResponse.payload.id;
    setUser({...tempUser});
  }

  useEffect(()=> {
    loadRequests();
  }, []);
  return (
    <Section>
      <Loading loading={loading}>
        {members.length ?
          members.map(member => <Member member={member} selected={user.selected === member.id} onClick={() => selectCard(member.id)} key={member.id} />)
          : <div>You do not currently have any team members. To recruit new team members go to the recruit section.</div>
        }
        {dialog.id ? <Type phrases={dialog.dialog} /> : null }
      </Loading>
    </Section>
  )
}

export default Team;
