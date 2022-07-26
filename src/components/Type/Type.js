import { useState, useEffect } from 'react';
import Typist from 'react-typist';
import Avatar from '../avatar';
import Button from '../Button';
import styles from './Type.module.scss';

const Type = ({ phrases }) => {
  const [copy, setCopy] = useState('');
  const [counter, setCounter] = useState(0);
  const [button, setButton] = useState('');
  const [character, setCharacter] = useState('');

  const displayButton = () => {
    if (counter < phrases.length) {
      setButton('Next');
    };
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
  }, [])

  return (
    <div className={styles.TypeWrapper}>
      <div className={styles.Type}>
        <Avatar imgPath={character} name='Spider-Man' />
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
