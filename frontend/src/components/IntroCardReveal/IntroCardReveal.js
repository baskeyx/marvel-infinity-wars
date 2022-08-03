import { useState, useEffect } from 'react';
import Section from '../Section';
import Type from '../Type';
import Button from '../Button';
import CardReveal from '../CardReveal';

const IntroCardReveal = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [displayButton, setDisplayButton] = useState(false);
  useEffect(() => {
    setTimeout(() => setDisplayButton(true), 5000);
  })
  return (
    <Section>
      { showDialog ? null : <CardReveal /> }
      { displayButton && !showDialog ? <Button onClick={()=> setShowDialog(true)}>Next</Button> : null }
      { showDialog ? <Type phrases={[
        {
          copy: 'Would you look at that!',
          character: '1011010',
        },
        {
          copy: 'Looks like we’re in this together!',
          character: '1011010',
        },
        {
          copy: 'Now let’s take on an event!',
          character: '1011010',
        },
        {
          copy: 'Click on the ’events’ tab and let’s see what’s available.',
          character: '1011010',
        },
      ]} /> : null }
    </Section>
  )
}

export default IntroCardReveal;