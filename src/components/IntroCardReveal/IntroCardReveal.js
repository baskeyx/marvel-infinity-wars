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
          character: '531771b4e8c60.webp',
        },
        {
          copy: 'Looks like we’re in this together!',
          character: '531771b4e8c60.webp',
        },
        {
          copy: 'Now let’s take on an event!',
          character: '531771b4e8c60.webp',
        },
        {
          copy: 'Click on the ’events’ tab and let’s see what’s available.',
          character: '531771b4e8c60.webp',
        },
      ]} /> : null }
    </Section>
  )
}

export default IntroCardReveal;