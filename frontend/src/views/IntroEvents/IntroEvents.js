import Type from '../../components/Type';
import Event from '../../components/event';
import Section from '../../components/Section';

const Events = () => (
  <Section>
    <Event />
    <Type phrases={[
      {
        character: '1011010',
        copy: 'Ah, I remember this one like it was yesterday!',
      },
      {
        character: '1011010',
        copy: 'What are you waiting for?!',
      },
      {
        character: '1011010',
        copy:  'Click the event to start it!',
      },
    ]} />
  </Section>
)

export default Events;
