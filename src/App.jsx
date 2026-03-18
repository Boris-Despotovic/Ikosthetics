import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import Izbornik from './components/Izbornik'
import { Route, Routes } from 'react-router-dom'
import { IME_APLIKACIJE, RouteNames } from './constants'
import Home from './pages/Home'
import KorisnikPregled from './pages/korisnici/KorisnikPregled'

function App() {
  return (
    <>
    <Container>
      <Izbornik />
      <Routes>
        <Route path={RouteNames.HOME} element={<Home />} />
        <Route path={RouteNames.KORISNICI} element={<KorisnikPregled />} />
      </Routes>

      <hr />
      &copy; {IME_APLIKACIJE}
    </Container>
    </>
  )
}

export default App
