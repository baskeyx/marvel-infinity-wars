import { useState, useEffect } from 'react';
import Fetch from '../../components/Fetch';
import Loading from '../../components/Loading';
import Member from '../../components/Member';

const Team = () => {
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

  useEffect(()=> {
    loadRequests();
  }, []);
  return (
    <Loading loading={loading}>
      {members.length ?
        members.map(member => <Member member={member} />)
        : <div>You do not currently have any team members. To recruit new team members go to the recruit section.</div>
      }
    </Loading>
  )
}

export default Team;
