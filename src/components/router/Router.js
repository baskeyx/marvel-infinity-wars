import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../header';
import Intro from '../../views/intro';
import Navigation from '../navigation';
import Card from '../card';
import Event from '../event';
import Game from '../game';

const Router = () => (
  <BrowserRouter>
    <Header />
    <main>
      <Routes>
        <Route index element={<Intro />} />
        <Route path='/team' element={<Card />} />
        <Route path='/recruit' element={<Game />} />
        <Route path='/events' element={<Event />} />
      </Routes>
      <Navigation />
    </main>
  </BrowserRouter>
);

export default Router;