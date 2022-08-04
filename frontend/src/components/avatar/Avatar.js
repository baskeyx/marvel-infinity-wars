import styles from './Avatar.module.scss';

const Avatar = ({ imgPath, name, props }) => (
  <img className={styles.Avatar} width={120} height={120} src={`https://teamsupreme.s3.eu-west-2.amazonaws.com/public/${imgPath}.webp`} alt={name} {...props} />
);

export default Avatar;
