import styles from './Game.module.scss';
import heart from '../../heart.svg';

const Game = () => {
  const randomIntFromInterval = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  const getRandomStat = (input) => {
    let output = 100 / 7 * (input-1);
    output += randomIntFromInterval(1, 14);
    return output.toFixed(0);
  }
  return (
    <div className={styles.GameWrapper}>
      <div className={styles.GamePanel}>
        <img className={styles.GameImage} src='https://teamsupreme.s3.eu-west-2.amazonaws.com/public/55b6a25e654e6.webp' alt='Iron Man' />
        <div className={styles.GameInfo}>
          <div className={styles.GameName}>Iron Man</div>
          <div className={styles.GameLives}>
            <img className={styles.GameHitPoint} src={heart} alt='Hit Point' />
            <img className={styles.GameHitPoint} src={heart} alt='Hit Point' />
            <img className={styles.GameHitPoint} src={heart} alt='Hit Point' />
          </div>
          <div className={styles.GameStats}>
            <div className={styles.GameStat}><span className={styles.GameStatRating}>{getRandomStat(7)}</span><span>Dur</span></div>
            <div className={styles.GameStat}><span className={styles.GameStatRating}>{getRandomStat(7)}</span><span>Ene</span></div>
            <div className={styles.GameStat}><span className={styles.GameStatRating}>{getRandomStat(6)}</span><span>Fig</span></div>
            <div className={styles.GameStat}><span className={styles.GameStatRating}>{getRandomStat(7)}</span><span>Int</span></div>
            <div className={styles.GameStat}><span className={styles.GameStatRating}>{getRandomStat(6)}</span><span>Spe</span></div>
            <div className={styles.GameStat}><span className={styles.GameStatRating}>{getRandomStat(7)}</span><span>Str</span></div>
          </div>
        </div>
      </div>
      <div className={styles.GamePanel}>
        <img className={styles.GameImage} src='https://teamsupreme.s3.eu-west-2.amazonaws.com/public/53176a0bb810c.webp' alt='Captain America' />
        <div className={styles.GameInfo}>
          <div className={styles.GameName}>Captain America</div>
          <div className={styles.GameLives}>
            <img className={styles.GameHitPoint} src={heart} alt='Hit Point' />
            <img className={styles.GameHitPoint} src={heart} alt='Hit Point' />
            <img className={styles.GameHitPoint} src={heart} alt='Hit Point' />
          </div>
          <div className={styles.GameStats}>
            <div className={styles.GameStat}><span className={styles.GameStatRating}>{getRandomStat(7)}</span><span>Dur</span></div>
            <div className={styles.GameStat}><span className={styles.GameStatRating}>{getRandomStat(6)}</span><span>Ene</span></div>
            <div className={styles.GameStat}><span className={styles.GameStatRating}>{getRandomStat(7)}</span><span>Fig</span></div>
            <div className={styles.GameStat}><span className={styles.GameStatRating}>{getRandomStat(6)}</span><span>Int</span></div>
            <div className={styles.GameStat}><span className={styles.GameStatRating}>{getRandomStat(7)}</span><span>Spe</span></div>
            <div className={styles.GameStat}><span className={styles.GameStatRating}>{getRandomStat(7)}</span><span>Str</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
