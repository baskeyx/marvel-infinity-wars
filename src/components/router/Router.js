import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../header';
import Intro from '../../views/intro';
import Navigation from '../navigation';
import Event from '../event';
import Game from '../game';
import OpenPack from '../OpenPack/OpenPack';

const Router = () => (
  <BrowserRouter>
    <Header />
    <main>
      <Routes>
        <Route index element={<Intro />} />
        <Route path='/team' element={<Game />} />
        <Route path='/recruit' element={<OpenPack />} />
        <Route path='/events' element={<Event />} />
      </Routes>
      <Navigation />
    </main>
  </BrowserRouter>
);

export default Router;