import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navigation.module.scss';

const navigationLinks = [
  {
    name: 'Home',
    image: 'home.svg',
  },
  {
    name: 'Team',
    image: 'users.svg',
  },
  {
    name: 'Recruit',
    image: 'user-plus.svg',
  },
  {
    name: 'Events',
    image: 'trophy.svg',
  }
]

const Navigation = () => {
  const [selected, setSelected] = useState('Home');
  return (
    <nav className={styles.Navigation}>
      {navigationLinks.map((link) => (
        <Link to={`/${link.name === 'Home' ? '' : link.name.toLowerCase()}`} className={selected === link.name ? styles.Selected : ''} onClick={() => setSelected(link.name)} key={link.name}>
          <img src={`https://teamsupreme.s3.eu-west-2.amazonaws.com/public/${link.image}`} alt={link.name} />
          <span>{link.name}</span>
        </Link>
      ))}
    </nav>
  )
}

export default Navigation;
