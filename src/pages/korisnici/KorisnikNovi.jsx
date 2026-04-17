import { Button, Col, Form, Row } from "react-bootstrap"
import { RouteNames } from "../../constants"
import { Link, useNavigate } from "react-router-dom"
import KorisnikService from "../../services/korisnici/KorisnikService"


export default function KorisnikNovi(){
const navigate = useNavigate()
    async function dodaj(korisnik){
       // console.table(korisnik)
       await KorisnikService.dodaj(korisnik).then(()=>{
       navigate(RouteNames.KORISNICI)
       })
    }


    function odradiSubmit(e){ // e je event
        e.preventDefault() // nemoj odraditi submit
        const podaci = new FormData(e.target)
        dodaj({
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime')
        })
    }

    return (
        <>
            <h3>Unos novog korisnika</h3>
            <Form onSubmit={odradiSubmit}>
                <Form.Group controlId="ime">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control type="text" name="ime" required />
                </Form.Group>

                <Form.Group controlId="prezime">
                    <Form.Label>Prezime</Form.Label>
                    <Form.Control type="text" name="prezime" required />
                </Form.Group>

                <Row className="mt-4">
                    <Col>
                        <Link to={RouteNames.KORISNICI} className="btn btn-danger">
                            Odustani
                        </Link>
                    </Col>
                    <Col>
                        <Button type="submit" variant="success">
                            Dodaj novi korisnik
                        </Button>
                    </Col>
                </Row>

            </Form>
        </>
    )
}