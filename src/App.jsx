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
