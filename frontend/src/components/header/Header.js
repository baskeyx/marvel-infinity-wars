import styles from './Header.module.scss';

const Header = () => (
  <header className={styles.Header}>
    <img className={styles.HeaderLogo} src='https://teamsupreme.s3.eu-west-2.amazonaws.com/public/marvel.svg' alt='Marvel Infinity Wars' />
    <h1 className={styles.HeaderTitle}>Infinity Wars</h1>
  </header>
)

export default Header;
