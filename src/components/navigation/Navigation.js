import { Link } from 'react-router-dom';
import styles from './Navigation.module.scss';

const Navigation = () => (
  <nav className={styles.Navigation}>
    <Link to='/'>
      <img src='https://teamsupreme.s3.eu-west-2.amazonaws.com/public/home.svg' alt='Home' />
      <span>Home</span>
    </Link>
    <Link to='/team'>
      <img src='https://teamsupreme.s3.eu-west-2.amazonaws.com/public/users.svg' alt='Team' />
      <span>Team</span>
    </Link>
    <Link to='/recruit'>
      <img src='https://teamsupreme.s3.eu-west-2.amazonaws.com/public/user-plus.svg' alt='Recruit' />
      <span>Recruit</span>
    </Link>
    <Link to='/events'>
      <img src='https://teamsupreme.s3.eu-west-2.amazonaws.com/public/trophy.svg' alt='Events' />
      <span>Events</span>
    </Link>
  </nav>
);

export default Navigation;
