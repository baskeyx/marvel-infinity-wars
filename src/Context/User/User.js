import { useState, useEffect, createContext } from 'react';
import Server from '../../Server';
import Fetch from '../../components/Fetch';

export const UserContext = createContext();

const User = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const returnUser = async () => {
    //const iwId = localStorage.getItem('iwId');
    //const id = iwId ? `/${iwId}` : '';
    const userResponse = await Fetch(`${Server}/users`, {
      method: 'GET',
      credentials: 'include',
    });
    setUser(userResponse.payload);
    //if (userResponse.payload.id) localStorage.setItem('iwId', userResponse.payload.id);
    setLoading(false);
  };
  useEffect(() => {
    returnUser();
  }, []);
  return (
    <UserContext.Provider value={[user, setUser]}>
      <div>
        {loading ? '' : children}
      </div>
    </UserContext.Provider>
  )
}

export default User;
