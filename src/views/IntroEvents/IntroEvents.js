import Type from '../../components/Type';
import Event from '../../components/event';
import Section from '../../components/Section';

const Events = () => (
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

export default Events;
