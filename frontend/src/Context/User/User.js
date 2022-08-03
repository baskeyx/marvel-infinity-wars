import { useState, useEffect, createContext } from 'react';
import Fetch from '../../components/Fetch';
import Loading from '../../components/Loading';

export const UserContext = createContext();

const User = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const returnUser = async () => {
    const userResponse = await Fetch('/api/users', {
      method: 'GET',
      credentials: 'include',
    });
    setUser(userResponse.payload);
    setLoading(false);
  };
  useEffect(() => {
    returnUser();
  }, []);
  return (
    <UserContext.Provider value={[user, setUser]}>
      <Loading loading={loading}>
        {children}
      </Loading>
    </UserContext.Provider>
  )
}

export default User;
