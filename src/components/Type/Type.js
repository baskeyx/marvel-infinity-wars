import { useState, useEffect } from 'react';
import Typist from 'react-typist';
import Avatar from '../avatar';
import styles from './Type.module.scss';

const Type = ({ phrases }) => {
  const [copy, setCopy] = useState('');
  const [counter, setCounter] = useState(0);
  const [button, setButton] = useState('');

  const displayButton = () => {
    setButton('Next');
  }

  const changeCopy = () => {
    setButton('');
    setCopy(phrases[counter]);
    let count = counter + 1;
    setCounter(count);
  }

  useEffect(()=> {
    changeCopy();
  }, [])

  return (
    <div className={styles.TypeWrapper}>
      <div className={styles.Type}>
        <Avatar imgPath='https://teamsupreme.s3.eu-west-2.amazonaws.com/public/531771b4e8c60.webp' name='Spider-Man' />
        <div className={styles.TypeCopy}>
          <Typist onTypingDone={displayButton} key={copy} cursor={{ show: false }}>
            {copy}
          </Typist>
        </div>
      </div>
      { button ? <button onClick={changeCopy}>{button}</button> : null }
    </div>
  )
}

export default Type;
