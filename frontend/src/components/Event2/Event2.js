import { Link } from 'react-router-dom';
import Server from '../../Server';
import styles from './Event.module.scss';
import SweetAlert2 from '../SweetAlert/';

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

export const EventInvalid = ({ id, name, description }) => (
  <div onClick={() => SweetAlert2('Please select a valid card for this event')}>
    <div className={styles.Event}>
      <img className={styles.EventImage} src={`${Server}${id}.webp`} alt={name} />
      <div className={styles.EventInfo}>
        <h2 className={styles.EventName}>{name}</h2>
        <div className={styles.EventDesc}>{description}</div>
      </div>
    </div>
  </div>
);

export default Event;
