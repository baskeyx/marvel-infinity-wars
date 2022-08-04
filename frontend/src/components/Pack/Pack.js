import styles from './Pack.module.scss';

const Pack = ({ id, name, description, cost, onClick }) => (
  <article className={styles.Pack} onClick={onClick} id={id}>
    <img className={styles.PackImage} src={`https://teamsupreme.s3.eu-west-2.amazonaws.com/public/${id}.webp`} alt={name} />    
    <div className={styles.PackInfo}>
      <h2 className={styles.PackName}>{name}</h2>
      <div className={styles.PackDesc}>{description}</div>
      <div className={styles.PackCost}>{cost}C</div>
    </div>
  </article>
);

export default Pack;
