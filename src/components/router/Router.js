import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../header';
import Intro from '../../views/intro';
import Navigation from '../navigation';
import Game from '../game';
import OpenPack from '../OpenPack/OpenPack';
import Events from '../../views/Events';
import Event from '../../views/Event';

const Router = () => (
  <BrowserRouter>
    <Header />
    <main>
      <Routes>
        <Route index element={<Intro />} />
        <Route path='/team' element={<Game />} />
        <Route path='/recruit' element={<OpenPack />} />
        <Route path='/events' element={<Events />} />
        <Route path='/event/:id' element={<Event />} /> 
      </Routes>
      <Navigation />
    </main>
  </BrowserRouter>
);

export default Router;