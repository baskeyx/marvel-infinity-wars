import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../Context/User';
import Fetch from '../../components/Fetch';
import Loading from '../../components/Loading';
import Member from '../../components/Member';
import Section from '../../components/Section';

const Team = () => {
  const [user, setUser] = useContext(UserContext);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadRequests = async () => {
    const cardsResponse = await Fetch('/api/cards', {
      method: 'GET',
      credentials: 'include',
    });
    if (cardsResponse.status) {
      setMembers(cardsResponse.payload);
      setLoading(false);
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
      </Loading>
    </Section>
  )
}

export default Team;
