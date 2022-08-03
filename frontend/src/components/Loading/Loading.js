import styles from './Loading.module.scss';

const Loading = ({ children, loading }) => (
  <>
    {(loading
      ? <div className={styles.Loading}><img className={styles.Spinner} src='https://teamsupreme.s3.eu-west-2.amazonaws.com/public/spinner.svg' alt='Loading' /></div>
      : children)}
  </>
);

export default Loading;
