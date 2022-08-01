import { useState, useEffect } from 'react';
import Typist from 'react-typist';
import Avatar from '../avatar';
import Button from '../Button';
import styles from './Type.module.scss';

const Type = ({ phrases, cb }) => {
  const [copy, setCopy] = useState('');
  const [counter, setCounter] = useState(0);
  const [button, setButton] = useState('');
  const [character, setCharacter] = useState('');

  const displayButton = async () => {
    if (counter < phrases.length) {
      setButton('Next');
    } else {
      setCounter(0);
      if (cb) setTimeout(cb, 3000);
      // setCopy(phrases[0].copy)
    }
  }

  const changeCopy = () => {
    setButton('');
    setCopy(phrases[counter].copy);
    setCharacter(phrases[counter].character);
    let count = counter + 1;
    setCounter(count);
  }

  useEffect(()=> {
    changeCopy();
  }, [phrases])

  return (
    <div className={styles.TypeWrapper}>
      <div className={styles.Type}>
        {character !== '' ? <Avatar imgPath={character} name='Spider-Man' /> : null }
        <div className={styles.TypeCopy}>
          <Typist onTypingDone={displayButton} key={copy} cursor={{ show: false }}>
            {copy}
          </Typist>
        </div>
      </div>
      { button ? <Button onClick={changeCopy}>{button}</Button> : null }
    </div>
  )
}

export default Type;
