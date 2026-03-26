import { useEffect, useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { Link, useNavigate, useParams } from "react-router-dom"
import KorisnikService from "../../services/korisnici/KorisnikService"
import { RouteNames } from "../../constants"

export default function KorisnikPromjena(){

    const navigate = useNavigate()
    const params = useParams() 
    const [korisnik, setKorisnik] = useState({})

    useEffect(()=>{
        ucitajKorisnik()
    },[])

    async function ucitajKorisnik() {
        await KorisnikService.getBySifra(params.sifra).then((odgovor)=>{
            const s = odgovor.data
            
            setKorisnik(s)
            //console.table(odgovor.data)
        })
    }

    async function promjeni(korisnik) {
        await KorisnikService.promjeni(params.sifra,korisnik).then(()=>{
            navigate(RouteNames.KORISNICI)
        })
    }
    
    function odradiSubmit(e){
        e.preventDefault()
        const podaci = new FormData(e.target)
        promjeni({
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            nazivPlanaTreninga: podaci.get('naziv plana treninga'),
            trajanje: parseInt(podaci.get('trajanje'))
        })
    }

    return(
       <>
            <h3>promjena korisnika {korisnik.naziv}</h3>
            <Form onSubmit={odradiSubmit}>
                <Form.Group controlId="ime">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control type="text" name="ime" required 
                    defaultValue={korisnik.ime}/>
                </Form.Group>

                <Form.Group controlId="prezime">
                    <Form.Label>Prezime</Form.Label>
                    <Form.Control type="text" name="prezime" required 
                    defaultValue={korisnik.prezime}/>
                </Form.Group>

                <Form.Group controlId="nazivPlanaTreninga">
                    <Form.Label>Naziv plana treninga</Form.Label>
                    <Form.Control type="text" name="nazivPlanaTreninga" required 
                    defaultValue={korisnik.nazivPlanaTreninga}/>
                </Form.Group>

                <Form.Group controlId="trajanje">
                    <Form.Label>Trajanje</Form.Label>
                    <Form.Control type="number" name="trajanje" step={1} 
                    defaultValue={korisnik.trajanje}/>
                </Form.Group>


                <Row className="mt-4">
                    <Col>
                        <Link to={RouteNames.KORISNICI} className="btn btn-danger">
                            Odustani
                        </Link>
                    </Col>
                    <Col>
                        <Button type="submit" variant="success">
                            Promjeni korisnika
                        </Button>
                    </Col>
                </Row>

            </Form>
        </>
    )
}