import styles from './Card.module.scss';

const Card = ({ img }) => (
  <div className={styles.Card}>
    <div>
      <img className={styles.CardImage} src={img} alt='Silver Surfer' />
      <div className={styles.CardStats}>
        <div className={styles.CardStat}><span className={styles.CardStatRating}>97</span><span>Durability</span></div>
        <div className={styles.CardStat}><span className={styles.CardStatRating}>97</span><span>Energy</span></div>
        <div className={styles.CardStat}><span className={styles.CardStatRating}>75</span><span>Fighting</span></div>
        <div className={styles.CardStat}><span className={styles.CardStatRating}>64</span><span>Intelligence</span></div>
        <div className={styles.CardStat}><span className={styles.CardStatRating}>97</span><span>Speed</span></div>
        <div className={styles.CardStat}><span className={styles.CardStatRating}>86</span><span>Strength</span></div>
      </div>
    </div>
    <div className={styles.CardNameWrapper}>
      <div className={styles.CardName}>Silver Surfer</div>
    </div>
  </div>
);

export default Card;