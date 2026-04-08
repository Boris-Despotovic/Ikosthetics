import { Button, Col, Form, Row } from "react-bootstrap"
import { RouteNames } from "../../constants"
import { useNavigate } from "react-router-dom"
import VjezbeService from "../../services/Vjezbe/VjezbeService"


export default function VjezbeNovi(){

    const navigate = useNavigate()

    async function dodaj(Vjezba){
        await VjezbeService.dodaj(Vjezba).then(()=>{
            navigate(RouteNames.VJEZBE)
        })
    }

    function odradiSubmit(e){ // e je event
        e.preventDefault() // nemoj odraditi submit
        const podaci = new FormData(e.target)

        // --- KONTROLA 1: Ime (Postojanje) ---
        if (!podaci.get('ime') || podaci.get('ime').trim().length === 0) {
            alert("Ime je obavezno i ne smije sadržavati samo razmake!");
            return;
        }

        // --- KONTROLA 2: Ime (Minimalna duljina) ---
        if (podaci.get('ime').trim().length < 2) {
            alert("Ime mora imati najmanje 2 znaka!");
            return;
        }

        dodaj({
            ime: podaci.get('ime'),
            opis: podaci.get('opis')  
        })
    }

    return (
        <>
            <h3>Unos nove vježbe</h3>
            <Form onSubmit={odradiSubmit}>
                <Form.Group controlId="ime">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control type="text" name="ime" required />
                </Form.Group>

                <Form.Group controlId="opis">
                    <Form.Label>Opis vježbe</Form.Label>
                    <Form.Control type="text" name="opis" required />
                </Form.Group>

                <Row className="mt-4">
                    <Col>
                        <Link to={RouteNames.VJEZBE} className="btn btn-danger">
                            Odustani
                        </Link>
                    </Col>
                    <Col>
                        <Button type="submit" variant="success">
                            Dodaj novu vježbu
                        </Button>
                    </Col>
                </Row>

            </Form>
        </>
    )
}
