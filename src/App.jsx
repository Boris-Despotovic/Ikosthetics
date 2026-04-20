import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import Izbornik from './components/Izbornik'
import { Route, Routes } from 'react-router-dom'
import { IME_APLIKACIJE, RouteNames } from './constants'

import KorisnikPregled from './pages/korisnici/KorisnikPregled'
import KorisnikNovi from './pages/korisnici/KorisnikNovi'
import KorisnikPromjena from './pages/korisnici/KorisniciPromjena'

import Home from './pages/Home'
import SocialBar from './components/Socials'

import VjezbePregled from './pages/vjezbe/VjezbePregled'
import VjezbeNovi from './pages/vjezbe/VjezbeNovi'
import VjezbePromjena from './pages/vjezbe/VjezbePromjena'

import PlanoviTreningaNovi from './pages/planovitreninga/PlanoviTreningaNovi'
import PlanoviTreningaPromjena from './pages/planovitreninga/PlanoviTreningaPromjena'
import PlanoviTreningaPregled from './pages/planovitreninga/PlanoviTreningaPregled'
import GeneriranjePodataka from './pages/GeneriranjePodatak'
import RealizacijaTreningaPregled from './pages/realizacijatreninga/RealizacijaTreningaPregled'
import RealizacijaTreningaNovi from './pages/realizacijatreninga/RealizacijaTreningaNovi'
import RealizacijaTreningaPromjena from './pages/realizacijatreninga/RealizacijaTreningaPromjena'

function App() {

  return (
    <>
    <Container style={{backgroundColor: window.location.hostname==='localhost' ? '#ffefea' : 'none'}}>
      <Izbornik />
      <Routes>
        <Route path={RouteNames.HOME} element={<Home />} />

        <Route path={RouteNames.KORISNICI} element={<KorisnikPregled />} />
        <Route path={RouteNames.KORISNICI_NOVI} element={<KorisnikNovi />} />
        <Route path={RouteNames.KORISNICI_PROMJENA} element={<KorisnikPromjena />} />

        <Route path={RouteNames.VJEZBE} element={<VjezbePregled />} />
        <Route path={RouteNames.VJEZBE_NOVI} element={<VjezbeNovi />} />
        <Route path={RouteNames.VJEZBE_PROMJENA} element={<VjezbePromjena />} />

        <Route path={RouteNames.PLANOVI_TRENINGA} element={<PlanoviTreningaPregled />} />
        <Route path={RouteNames.PLANOVI_TRENINGA_NOVI} element={<PlanoviTreningaNovi />} />
        <Route path={RouteNames.PLANOVI_TRENINGA_PROMJENA} element={<PlanoviTreningaPromjena />} />

        <Route path={RouteNames.REALIZACIJA_TRENINGA} element={<RealizacijaTreningaPregled />} />
        <Route path={RouteNames.REALIZACIJA_TRENINGA_NOVI} element={<RealizacijaTreningaNovi />} />
        <Route path={RouteNames.REALIZACIJA_TRENINGA_PROMJENA} element={<RealizacijaTreningaPromjena />} />

        <Route path={RouteNames.GENERIRANJE_PODATAKA} element={<GeneriranjePodataka />} />


      </Routes>
      <>
      <SocialBar />
    </>

      <hr />
      &copy; {IME_APLIKACIJE}
    </Container>
    </>
  )
}

export default App
