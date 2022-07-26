import { useState } from 'react';
import Type from '../../components/Type';
import Event from '../../components/event';
import Section from '../../components/Section';

const Events = () => {
  const [dialog, setDialog] = useState([]);
  const [gameState, setGameState] = useState();
  return (
    <Section>
      <Event />
      <Type phrases={[
        {
          character: '531771b4e8c60.webp',
          copy: 'Ah, I remember this one!',
        },
        {
          character: '531771b4e8c60.webp',
          copy: 'What are you waiting for?!',
        },
        {
          character: '531771b4e8c60.webp',
          copy:  'Click the event to start it!',
        },
      ]} />
    </Section>
  )
}

export default Events;
