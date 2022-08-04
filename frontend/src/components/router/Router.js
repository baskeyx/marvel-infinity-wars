import { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../header';
import Intro from '../../views/intro';
import Navigation from '../navigation';
import Game from '../game';
import Events from '../../views/Events';
import IntroEvents from '../../views/IntroEvents';
import Event from '../../views/Event';
import { UserContext } from '../../Context/User';
import Packs from '../../views/Packs';

const Router = () => {
  const user = useContext(UserContext)[0];
  console.log(user);
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route index element={<Intro />} />
          <Route path='/team' element={<Game />} />
          <Route path='/recruit' element={<Packs />} />
          <Route path='/events' element={user.intro ? <IntroEvents />: <Events />} />
          <Route path='/event/:id' element={<Event />} /> 
        </Routes>
        <Navigation />
      </main>
    </BrowserRouter>
  );
}

export default Router;