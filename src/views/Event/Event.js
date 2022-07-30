import { useState, useEffect, useContext } from 'react';
import Type from "../../components/Type";
import Game from '../../components/game';
import Section from '../../components/Section';
import Fetch from '../../components/Fetch';
import { UserContext } from '../../Context/User';

const Event = () => {
  const [gameStart, setGameStart] = useState(true);
  const [dialog, setDialog] = useState([]);
  const [user, setUser] = useContext(UserContext);
  const [game, setGame] = useState({});
  const introDialog = [
    // {
    //   character: '531771b4e8c60.webp',
    //   copy: 'Hold it, fella!!'
    // },
    // {
    //   character: '531771b4e8c60.webp',
    //   copy: 'How about giving a guy a lift?',
    // },
    // {
    //   character: '1011435.webp',
    //   copy: 'Spider-Man!! I’ve been waiting for you!!'
    // },
    // {
    //   character: '1011435.webp',
    //   copy: 'I knew if I flew around the city, you’d be sure to investigate sooner or later!',
    // },
    // {
    //   character: '531771b4e8c60.webp',
    //   copy: 'The Green Goblin!!'
    // },
    // {
    //   character: '1011435.webp',
    //   copy: 'Why don’t you quit now, Spider-Man, and save us both a lot of trouble?!!'
    // },
    // {
    //   character: '531771b4e8c60.webp',
    //   copy: 'I don’t think so Gobby!!',
    // },
  ]

  useEffect(() => {
    setDialog(introDialog);
    //const characterResponse = await Fetch(`https://vsec9h4b21.execute-api.eu-west-2.amazonaws.com/api/characters/${user.intro ? 1011010 : ''}`);
  }, []);

  const onIntroDialogComplete = () => {
    setTimeout(() => setGameStart(true), 2000);
    setDialog([{copy: 'Spider-Man vs Green Goblin', character: '531771b4e8c60.webp'}])
  }

  return (
    <Section>
      { dialog.length > 0 ? <Type phrases={dialog} cb={onIntroDialogComplete} /> : null }
      { gameStart ? <Game /> : null }
    </Section>
  );
};

export default Event;