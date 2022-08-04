import { useState } from 'react';
import Card from '../card';
import styles from './CardReveal.module.scss';

const CardReveal = ({ character, btnClick }) => {
  const [open, setOpen] = useState('');
  const [reveal, setReveal] = useState('reveal');
  const revealCard = () => {
    setTimeout(() => setReveal(''), 1000)
  }
  return (
    <div className={`${styles.FlipCard} ${styles[open]}`} onTransitionEnd={revealCard}>
      <div className={styles.FlipCardInner}>
        <div className={styles.FlipCardFront}>
          <img src='http://i.annihil.us/u/prod/marvel/i/mg/6/20/51097abb8e306.jpg' alt='Basic Pack' />
        </div>
        <div className={styles.FlipCardBack}>
          {character ? <Card character={character} setOpen={() => setOpen('open')} reveal={reveal} btnClick={btnClick} /> : null }
        </div>
      </div>
    </div>
  )
};

export default CardReveal;
