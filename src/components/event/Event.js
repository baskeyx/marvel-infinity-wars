import styles from './Event.module.scss';

const Event = () => (
  <div className={styles.Event}>
    <img className={styles.EventImage} src='https://teamsupreme.s3.eu-west-2.amazonaws.com/public/6527.webp' alt='' />
    <div className={styles.EventInfo}>
      <h2 className={styles.EventName}>The Amazing Spider-Man (1963) #14</h2>
      <div className={styles.EventDesc}>The first major battle between Spidey and his archnemesis, the Green Goblin!</div>
    </div>
  </div>
);

export default Event;
