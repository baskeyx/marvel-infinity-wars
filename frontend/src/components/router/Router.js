import { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../header';
import Home from '../../views/Home';
import Navigation from '../navigation';
import Game from '../../views/Game';
import Events from '../../views/Events';
import Event from '../../views/Event';
import { UserContext } from '../../Context/User';
import Packs from '../../views/Packs';
import Team from '../../views/Team';
import GameSummary from '../../views/GameSummary';

const Router = () => {
  const user = useContext(UserContext)[0];
  console.log(user);
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/team' element={<Team />} />
          <Route path='/recruit' element={<Packs />} />
          <Route path='/events' element={<Events />} />
          <Route path='/event/:eventId' element={<Event />} /> 
          <Route path='/game/:gameId' element={<Game />} />
          <Route path='/game/:gameId/summary' element={<GameSummary />} />
        </Routes>
        <Navigation />
      </main>
    </BrowserRouter>
  );
}

export default Router;