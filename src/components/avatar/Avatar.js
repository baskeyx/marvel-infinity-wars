import styles from './Avatar.module.scss';

const Avatar = ({ imgPath, name, props }) => (
  <img className={styles.Avatar} src={imgPath} alt={name} {...props} />
);

export default Avatar;
