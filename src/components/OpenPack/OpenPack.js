import { useState, useEffect, useContext } from 'react';
import Button from '../Button';
import { UserContext } from '../../Context/User';
import Pack from '../Pack/Pack';
import Section from '../Section';
import Type from '../Type';

const OpenPack = () => {
  const [user, setUser] = useContext(UserContext);
  const [opened, setOpened] = useState(false);
  const [open, setOpen] = useState('');
  const [introDialog, setIntroDialog] = useState('');
  useEffect(() => {
    // this will be on callback of fetch request
    setTimeout(() => setOpen('open'), 1000);
    setTimeout(() => setOpened(true), 5000);
  }, []);
  return (
    <>
    <Section>
      {introDialog ? <Type phrases={[
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
      ]} /> : <Pack open={open} />}
      {opened && user.intro && !introDialog ? <Button onClick={() => setIntroDialog(true)}>Next</Button> : null}
      </Section>
    </>
  )
};

export default OpenPack;