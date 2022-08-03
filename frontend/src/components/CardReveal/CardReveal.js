import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../Context/User';
import Server from '../../Server';
import Fetch from '../Fetch';
import Card from '../card';
import styles from './CardReveal.module.scss';

const CardReveal = () => {
  const [user, setUser] = useContext(UserContext);
  const [open, setOpen] = useState('');
  const [character, setCharacter] = useState('');

  const getCharacter = async () => {
    const characterResponse = await Fetch(`${Server}/cards/intro`, { 
      method: 'POST', 
      body: JSON.stringify({ userId: user.id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setCharacter('');
    setCharacter(characterResponse.payload);
    setTimeout(() => setOpen('open'), 1500);
  }

  useEffect(() => {
    getCharacter()
  }, []);
  return (
    <div className={`${styles.FlipCard} ${styles[open]}`}>
      <div className={styles.FlipCardInner}>
        <div className={styles.FlipCardFront}>
          <img src='http://i.annihil.us/u/prod/marvel/i/mg/6/20/51097abb8e306.jpg' alt='Basic Pack' />
        </div>
        <div className={styles.FlipCardBack}>
          {character ? <Card character={character} revealCard='reveal' /> : null }
        </div>
      </div>
    </div>
  )
};

export default CardReveal;
