import { Link } from 'react-router-dom';
import styles from './Anchor.module.scss';

const Anchor = ({ children, ...props }) => (
  <Link className={styles.Anchor} {...props}>{children}</Link>
)

export default Anchor;