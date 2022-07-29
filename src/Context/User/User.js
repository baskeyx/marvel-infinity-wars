import { useState, createContext } from 'react';

export const UserContext = createContext();

const User = ({ children }) => {
  const [user, setUser] = useState({ 
    intro: true,
    characters: [],
  });
  // fetch request to get user details
  // setUser(response)
  return (
    <UserContext.Provider value={[user, setUser]}>
      <div>
        {children}
      </div>
    </UserContext.Provider>
  )
}

export default User;
