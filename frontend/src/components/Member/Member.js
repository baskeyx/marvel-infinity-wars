import Server from '../../Server';
import styles from './Member.module.scss';

const Member = ({ member }) => (
  <div key={member.id} className={`${styles.GamePanel} ${member.colour}`}>
    <img className={styles.GameImage} src={`${Server}${member.charId}.webp`} alt={member.name} id={member.id} />
    <div className={styles.GameInfo}>
      <div className={styles.GameName}>{member.name}</div>
      <div className={styles.GameStats}>
        { Object.keys(member.stats).map((item) => 
          <div key={item} id={item} className={styles.GameStat}>
            <span className={styles.GameStatRating}>{member.stats[item]}</span><span>{item}</span>
          </div>
        )}
      </div>
    </div>
  </div>
)

export default Member;
