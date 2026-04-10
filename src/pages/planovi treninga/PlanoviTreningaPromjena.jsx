import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import PlanoviTreningaService from "../../services/planovi treninga/PlanoviTreningaService"
import KorisnikService from "../../services/korisnici/KorisnikService"
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { RouteNames } from "../../constants"

export default function PlanoviTreningaPromjena(){

    const navigate = useNavigate()
    const params = useParams()
    const [plantreninga, setPlantreninga] = useState({})
    const [korisnici, setKorisnici] = useState([])

    useEffect(()=>{
        ucitajPlanoveTreninga()
        ucitajKorisnike()
    },[])

    async function ucitajPlanovetreninga() {
        await PlanoviTreningaService.getBySifra(params.sifra).then((odgovor)=>{
            if(!odgovor.success){
                alert('Nije implementiran servis')
                return
            }
            setPlanTreninga(odgovor.data)
        })
    }

    async function ucitajKorisnike() {
        await KorisnikService.get().then((odgovor) => {
            if (!odgovor.success) {
                alert('Nije implementiran servis za korisnike')
                return
            }
            setKorisnici(odgovor.data)
        })
    }

    async function promjeni(plantreninga) {
        await PlanoviTreningaService.promjeni(params.sifra,plantreninga).then(()=>{
            navigate(RouteNames.PLANOVETRENINGA)
        })
    }

    function odradiSubmit(e){
        e.preventDefault()
        const podaci = new FormData(e.target)

        if (!podaci.get('naziv') || podaci.get('naziv').trim().length === 0) {
            alert("Naziv je obavezan i ne smije sadržavati samo razmake!");
            return;
        }

        if (podaci.get('naziv').trim().length < 3) {
            alert("Naziv plana treninga mora imati najmanje 3 znaka!");
            return;
        }

        if (!podaci.get('korisnik') || podaci.get('korisnik') === "") {
            alert("Morate odabrati korisnika!");
            return;
        }

        const odabraniKorisnika = parseInt(podaci.get('korisnik'));
        if (isNaN(odabraniKorisnik) || odabraniKorisnik <= 0) {
            alert("Odabrani korisnik nije valjan!");
            return;
        }

        promjeni({
            naziv: podaci.get('naziv'),
            korisnik: odabraniKorisnik
        })
    }

    return(
         <>
            <h3>Promjena plana treninga</h3>
            <Form onSubmit={odradiSubmit}>
                <Container className="mt-4">
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title className="mb-4">Podaci o planu treninga</Card.Title>

                            {/* Naziv - Pun širina na svim ekranima */}
                            <Row>
                                <Col xs={12}>
                                    <Form.Group controlId="naziv" className="mb-3">
                                        <Form.Label className="fw-bold">Naziv plana treninga</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="naziv"
                                            placeholder="Unesite naziv plana treninga"
                                            required
                                            defaultValue={plantreninga.naziv}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            {/* Smjer - Select dropdown */}
                            <Row>
                                <Col xs={12}>
                                    <Form.Group controlId="korisnik" className="mb-3">
                                        <Form.Label className="fw-bold">Korisnik</Form.Label>
                                        <Form.Select name="smjer" required value={plantreninga.korisnik || ''} onChange={(e) => setPlantreninga({...plantreninga, korisnik: parseInt(e.target.value)})}>
                                            <option value="">Odaberite korisnika</option>
                                            {korisnici && korisnici.map((korisnik) => (
                                                <option key={korisnik.sifra} value={korisnik.sifra}>
                                                    {korisnik.naziv}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <hr />

                            {/* Gumbi za akciju */}
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                                <Link to={RouteNames.PLANOVITRENINGA} className="btn btn-danger px-4">
                                    Odustani
                                </Link>
                                <Button type="submit" variant="success">
                                    Promjeni plan treninga
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Container>
            </Form>
        </>
    )
}
