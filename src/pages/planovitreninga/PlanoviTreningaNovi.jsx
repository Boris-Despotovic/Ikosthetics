import { useEffect, useState } from "react"
import { Button, Card, Col, Container, Form, Row, Table } from "react-bootstrap"
import { RouteNames } from "../../constants"
import { Link, useNavigate } from "react-router-dom"
import KorisnikService from "../../services/korisnici/KorisnikService"
import PlanoviTreningaService from "../../services/planovitreninga/PlanoviTreningaService"
import VjezbeService from "../../services/Vjezbe/VjezbeService"

export default function PlanoviTreningaNovi() {

    const navigate = useNavigate()
    const [korisnici, setKorisnici] = useState([])
    const [vjezbe, setVjezbe] = useState([])
    const [odabraneVjezbe, setOdabraneVjezbe] = useState([])
    const [pretragaVjezbe, setPretragaVjezbe] = useState('')
    const [prikaziAutocomplete, setPrikaziAutocomplete] = useState(false)
    const [odabraniIndex, setOdabraniIndex] = useState(-1)

    useEffect(() => {
        ucitajKorisnike()
        ucitajVjezbe()
    }, [])

    async function ucitajKorisnike() {
        await KorisnikService.get().then((odgovor) => {
            if (!odgovor.success) {
                alert('Nije implementiran servis za korisnike')
                return
            }
            setKorisnici(odgovor.data)
        })
    }

    async function ucitajVjezbe() {
        await VjezbeService.get().then((odgovor) => {
            if (!odgovor.success) {
                alert('Nije implementiran servis za vjezbe')
                return
            }
            setVjezbe(odgovor.data)
        })
    }

    function dodajVjezbu(vjezba) {
        if (!odabraneVjezbe.find(p => p.sifra === vjezba.sifra)) {
            setOdabraneVjezbe([...odabraneVjezbe, vjezba])
        }
        setPretragaVjezbe('')
        setPrikaziAutocomplete(false)
        setOdabraniIndex(-1)
    }

    function ukloniVjezbu(sifra) {
        setOdabraneVjezbe(odabraneVjezbe.filter(p => p.sifra !== sifra))
    }

    function filtrirajVjezbe() {
        if (!pretragaVjezbe) return []
        return vjezbe.filter(p =>
            !odabraneVjezbe.find(op => op.sifra === p.sifra) &&
            (p.ime.toLowerCase().includes(pretragaVjezbe.toLowerCase()) ||
                p.opis.toLowerCase().includes(pretragaVjezbe.toLowerCase()))
        )
    }

    function handleKeyDown(e) {
        const filtriraneVjezbe = filtrirajVjezbe()

        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setOdabraniIndex(prev => {
                if (prev + 1 === filtriraneVjezbe.length) {
                    return 0
                }
                return prev < filtriraneVjezbe.length - 1 ? prev + 1 : prev
            }

            )
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setOdabraniIndex(prev => {
                if(prev===0){
                    return filtriraneVjezbe.length-1
                }
                return prev > 0 ? prev - 1 : 0
            })
        } else if (e.key === 'Enter' && odabraniIndex >= 0 && filtriraneVjezbe.length > 0) {
            e.preventDefault()
            dodajVjezbu(filtriraneVjezbe[odabraniIndex])
        } else if (e.key === 'Escape') {
            setPrikaziAutocomplete(false)
            setOdabraniIndex(-1)
        }
    }


    async function dodaj(plantreninga) {
        await PlanoviTreningaService.dodaj(plantreninga).then(() => {
            navigate(RouteNames.PLANOVI_TRENINGA)
        })
    }

    function odradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)

        if (!podaci.get('naziv plana treninga') || podaci.get('naziv plana treninga').trim().length === 0) {
            alert("Naziv je obavezan i ne smije sadržavati samo razmake!");
            return;
        }

        if (podaci.get('naziv plana treninga').trim().length < 3) {
            alert("Naziv plana treninga mora imati najmanje 3 znaka!");
            return;
        }

        if (!podaci.get('korisnik') || podaci.get('korisnik') === "") {
            alert("Morate odabrati korisnika!");
            return;
        }

        const odabraniKorisnik = parseInt(podaci.get('korisnik'));
        if (isNaN(odabraniKorisnik) || odabraniKorisnik <= 0) {
            alert("Odabrani korisnik nije valjan!");
            return;
        }

        dodaj({
            naziv: podaci.get('naziv plana treninga'),
            korisnik: odabraniKorisnik
        })
    }

    return (
        <>
            <h3>Unos novog plana treninga</h3>
            <Form onSubmit={odradiSubmit}>
                <Container onSubmit={odradiSubmit}>
                    <Row>
                        {/* Lijeva strana - Podaci o grupi */}
                        <Col md={6}>
                            <Card className="shadow-sm">
                                <Card.Body>
                                    <Card.Title className="mb-4">Podaci o planu treninga</Card.Title>

                                    {/* Naziv */}
                                    <Form.Group controlId="naziv" className="mb-3">
                                        <Form.Label className="fw-bold">Naziv plana treninga</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="naziv plana treninga"
                                            placeholder="Unesite naziv plana treninga"
                                            required
                                        />
                                    </Form.Group>

                                    {/* Korisnik */}
                                    <Form.Group controlId="korisnik" className="mb-3">
                                        <Form.Label className="fw-bold">Korisnik</Form.Label>
                                        <Form.Select name="korisnik" required>
                                            <option value="">Odaberite korisnika</option>
                                            {korisnici && korisnici.map((korisnik) => (
                                                <option key={korisnik.sifra} value={korisnik.sifra}>
                                                    {korisnik.ime + ' ' + korisnik.prezime}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Desna strana - Vjezbe */}
                        <Col md={6}>
                            <Card className="shadow-sm">
                                <Card.Body>
                                    <Card.Title className="mb-4">Vježbe</Card.Title>

                                    {/* Autocomplete pretraga */}
                                    <Form.Group className="mb-3 position-relative">
                                        <Form.Label className="fw-bold">Dodaj vježbu</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Pretraži vježbu..."
                                            value={pretragaVjezbe}
                                            onChange={(e) => {
                                                setPretragaVjezbe(e.target.value)
                                                setPrikaziAutocomplete(e.target.value.length > 0)
                                                setOdabraniIndex(-1)
                                            }}
                                            onFocus={() => setPrikaziAutocomplete(pretragaVjezbe.length > 0)}
                                            onKeyDown={handleKeyDown}
                                        />
                                        {prikaziAutocomplete && filtrirajVjezbe().length > 0 && (
                                            <div className="position-absolute w-100 bg-white border rounded shadow-sm" style={{ zIndex: 1000, maxHeight: '200px', overflowY: 'auto' }}>
                                                {filtrirajVjezbe().map((vjezba, index) => (
                                                    <div
                                                        key={vjezba.sifra}
                                                        className="p-2 cursor-pointer"
                                                        style={{
                                                            cursor: 'pointer',
                                                            backgroundColor: index === odabraniIndex ? '#007bff' : 'white',
                                                            color: index === odabraniIndex ? 'white' : 'black'
                                                        }}
                                                        onClick={() => dodajVjezbu(vjezba)}
                                                        onMouseEnter={(e) => {
                                                            setOdabraniIndex(index)
                                                        }}
                                                    >
                                                        {vjezba.ime} 
                                                        {vjezba.opis}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </Form.Group>

                                    {/* Tablica odabranih vježbi */}
                                    {odabraneVjezbe.length > 0 && (
                                        <div style={{ overflow: 'auto', maxHeight: '300px' }}>
                                            <Table striped bordered hover size="sm">
                                                <thead>
                                                    <tr>
                                                        <th>Ime vježbe</th>
                                                        <th style={{ width: '80px' }}>Akcija</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {odabraneVjezbe.map(vjezba => (
                                                        <tr key={vjezba.sifra}>
                                                            <td>{vjezba.ime} {vjezba.opis}</td>
                                                            <td>
                                                                <Button
                                                                    variant="danger"
                                                                    size="sm"
                                                                    onClick={() => ukloniVjezbu(vjezba.sifra)}
                                                                >
                                                                    Obriši
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </div>

                                    )}
                                    {odabraneVjezbe.length === 0 && (
                                        <p className="text-muted">Nema odabranih vježbi</p>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <hr className="my-4" />

                            {/* Gumbi za akciju */}
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                                <Link to={RouteNames.PLANOVITRENINGA} className="btn btn-danger px-4">
                                    Odustani
                                </Link>
                                <Button type="submit" variant="success">
                                    Dodaj novi plan treninga
                                </Button>
                            </div>
                        </Container>
                    </Form>
                </>
    )
}
