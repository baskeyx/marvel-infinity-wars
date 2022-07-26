import styles from './Pack.module.scss'
import Card from '../card';

const Pack = ({ open }) => (
  <div className={`${styles.FlipCard} ${styles[open]}`}>
    <div className={styles.FlipCardInner}>
      <div className={styles.FlipCardFront}>
        <img src='http://i.annihil.us/u/prod/marvel/i/mg/6/20/51097abb8e306.jpg' alt='Basic Pack' />
      </div>
      <div className={styles.FlipCardBack}>
        <Card revealCard='reveal' />
      </div>
    </div>
  </div>
)

export default Pack;
