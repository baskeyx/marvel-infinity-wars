import { Link } from 'react-router-dom';
import styles from './Event.module.scss';

const Event = () => (
  // <div style={{display: 'flex', flexWrap: 'wrap' }}>
  <Link to='/event/1'>
    <div className={styles.Event}>
      <img className={styles.EventImage} src='https://teamsupreme.s3.eu-west-2.amazonaws.com/public/6527.webp' alt='' />
      <div className={styles.EventInfo}>
        <h2 className={styles.EventName}>The Amazing Spider-Man (1963) #14</h2>
        <div className={styles.EventDesc}>The first major battle between Spidey and his archnemesis, the Green Goblin!</div>
      </div>
      </div>
      {/* <div className={styles.Event}>
    <img className={styles.EventImage} src='http://i.annihil.us/u/prod/marvel/i/mg/f/00/51cdeb7048dac.jpg' alt='Secret Wars' />
    <div className={styles.EventInfo}>
      <h2 className={styles.EventName}>Secret Wars</h2>
      <div className={styles.EventDesc}>Battles against completely random opponents!</div>
    </div>
  </div>
  </div> */}
    </Link>
);

export default Event;
