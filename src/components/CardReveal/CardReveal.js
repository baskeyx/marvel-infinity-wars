import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../Context/User';
import Fetch from '../Fetch';
import Card from '../card';
import styles from './CardReveal.module.scss';

const CardReveal = () => {
  const [user, setUser] = useContext(UserContext);
  const [open, setOpen] = useState('');
  const [character, setCharacter] = useState('');

  const getCharacter = async () => {
    const characterResponse = await Fetch(`https://vsec9h4b21.execute-api.eu-west-2.amazonaws.com/api/characters/${user.intro ? 1011010 : ''}`);
    console.log(characterResponse);
    const userTemp = user;
    user.characters = [characterResponse.payload]
    setUser(userTemp);
    setCharacter(characterResponse.payload);
    setTimeout(() => setOpen('open'), 1000);
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
