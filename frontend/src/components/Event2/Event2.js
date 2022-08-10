import { Link } from 'react-router-dom';
import Server from '../../Server';
import styles from './Event.module.scss';

const Event = ({ id, name, description }) => (
  <Link to={`/event/${id}`}>
    <div className={styles.Event}>
      <img className={styles.EventImage} src={`${Server}${id}.webp`} alt={name} />
      <div className={styles.EventInfo}>
        <h2 className={styles.EventName}>{name}</h2>
        <div className={styles.EventDesc}>{description}</div>
      </div>
    </div>
  </Link>
);

export default Event;
