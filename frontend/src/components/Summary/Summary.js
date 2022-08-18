import Server from '../../Server';
import styles from './Summary.module.scss';

const Summary = ({ game }) => {
  const { players, event } = game;
  const player = players[0];
  return (
    <div className={`${styles.Summary} ${player.colour}`}>
      <div className={styles.SummaryChars}>
        {game.players.map((player) => <img className={styles.SummaryChar} key={player.id} src={`${Server}${player.id}.webp`} alt={player.name} /> )}
      </div>
      <div className={styles.SummaryEvent}>
        <h2>{event.name}</h2>
        <div>Result: {game.event.result}</div>
        <h3>Rewards</h3>
        <div>Coins: +{game.event.coins}</div>
        {game.event.xp.map((x) => <div key={x.name}>{x.name}: {x.score}</div>)}
        <div>Total XP: {game.event.totalXp}</div>
      </div>
    </div>
  )
}

export default Summary;
