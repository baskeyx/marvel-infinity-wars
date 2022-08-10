import Server from '../../Server';
import Button from '../Button';
import styles from './Card.module.scss';

const Card = ({ character, setOpen, hide, btnClick }) => {
  const onImageLoaded = () => {
    if (setOpen) setTimeout(() => setOpen('open') , 1000)
  }
  return (
    <div className={styles[hide]}>
      <div className={`${styles.Card} ${character.colour}`}>
        <div className={styles.CardInfo}>
          <img className={styles.CardImage} src={`${Server}${character.charId}.webp`} alt={character.name} onLoad={onImageLoaded} />
          <div className={styles.CardNameWrapper}>
            <div className={styles.CardName}>{character.name}</div>
          </div>
        </div>
        <div className={styles.CardStats}>
          <div className={styles.CardStat}><span className={styles.CardStatRating}>{character.stats.dur}</span><span>Durability</span></div>
          <div className={styles.CardStat}><span className={styles.CardStatRating}>{character.stats.ene}</span><span>Energy</span></div>
          <div className={styles.CardStat}><span className={styles.CardStatRating}>{character.stats.fig}</span><span>Fighting</span></div>
          <div className={styles.CardStat}><span className={styles.CardStatRating}>{character.stats.int}</span><span>Intelligence</span></div>
          <div className={styles.CardStat}><span className={styles.CardStatRating}>{character.stats.spe}</span><span>Speed</span></div>
          <div className={styles.CardStat}><span className={styles.CardStatRating}>{character.stats.str}</span><span>Strength</span></div>
        </div>
      </div>
      <Button theme={hide}  onClick={btnClick}>OK</Button>
    </div>
  )
}
  
export default Card;