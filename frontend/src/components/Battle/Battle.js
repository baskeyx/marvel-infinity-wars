import { useState } from 'react'; 
import Server from '../../Server'
import styles from './Battle.module.scss';

const Game = ({ game, selectAttribute }) => {
  const [loaded, setLoaded] = useState([]);
  const [display, setDisplay] = useState(false);
  const checkImagesLoaded = async (e) => {
    const tempLoaded = loaded;
    tempLoaded.push(e.target.id)
    if (tempLoaded.length === 2) {
      setLoaded([...tempLoaded]);
    } else {
      setTimeout(() => setDisplay(true), 1000);
    }
    
  }
  return (
    <div className={`${styles.GameWrapper} ${display ? styles.Loaded : null}`}>
      {game.players.map((player) => (
        <div key={player.id} className={`${styles.GamePanel} ${player.colour}`}>
        <img className={styles.GameImage} src={`${Server}${player.id}.webp`} alt={player.name} id={player.id} onLoad={checkImagesLoaded} />
        <div className={styles.GameInfo}>
          <div className={styles.GameName}>{player.name}</div>
          <div className={styles.GameStats}>
            { Object.keys(player.stats).map((item) => 
              <div key={item} id={item} className={`${styles.GameStat} ${game.attributes.includes(item) ? styles.Disabled : null }`} onClick={selectAttribute}>
                <span className={styles.GameStatRating}>{player.stats[item]}</span><span>{item}</span>
              </div>
            )}
          </div>
        </div>
        <div className={styles.GameHealth}>
          <div className={styles.GameHealthBar} style={{height:`${100 - player.hp}%`}} ></div>
        </div>
      </div>
      ))}
    </div>
  )
};

export default Game;
