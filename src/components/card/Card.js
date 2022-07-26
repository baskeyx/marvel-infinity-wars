import { useState, useEffect } from 'react';
import styles from './Card.module.scss';

const Card = ({ revealCard }) => {
  const [reveal, setReveal] = useState(revealCard);
  useEffect(() => {
    setTimeout(()=> setReveal(''), 2000);
  }, []);
  return (
    <div className={`${styles.Card} ${styles[reveal]}`}>
      <div className={styles.CardInfo}>
        <img className={styles.CardImage} src='https://teamsupreme.s3.eu-west-2.amazonaws.com/public/527bb6490a176.webp' alt='Silver Surfer' />
        <div className={styles.CardNameWrapper}>
          <div className={styles.CardName}>Silver Surfer</div>
        </div>
      </div>
      <div className={styles.CardStats}>
        <div className={styles.CardStat}><span className={styles.CardStatRating}>97</span><span>Durability</span></div>
        <div className={styles.CardStat}><span className={styles.CardStatRating}>97</span><span>Energy</span></div>
        <div className={styles.CardStat}><span className={styles.CardStatRating}>75</span><span>Fighting</span></div>
        <div className={styles.CardStat}><span className={styles.CardStatRating}>64</span><span>Intelligence</span></div>
        <div className={styles.CardStat}><span className={styles.CardStatRating}>97</span><span>Speed</span></div>
        <div className={styles.CardStat}><span className={styles.CardStatRating}>86</span><span>Strength</span></div>
      </div>
    </div>
  )
};

export default Card;