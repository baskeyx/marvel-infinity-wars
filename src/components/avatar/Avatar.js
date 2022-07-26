import styles from './Avatar.module.scss';

const Avatar = ({ imgPath, name, props }) => (
  <img className={styles.Avatar} src={`https://teamsupreme.s3.eu-west-2.amazonaws.com/public/${imgPath}`} alt={name} {...props} />
);

export default Avatar;
