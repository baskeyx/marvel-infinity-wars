import styles from './Header.module.scss';
import { Link } from 'react-router-dom';

const Header = () => (
  <Link to='/'>
    <header className={styles.Header}>
      <img width={80} height={32} className={styles.HeaderLogo} src='https://teamsupreme.s3.eu-west-2.amazonaws.com/public/marvel.svg' alt='Marvel Infinity Wars' />
      <h1 className={styles.HeaderTitle}>Infinity Wars</h1>
    </header>
  </Link>
)

export default Header;
