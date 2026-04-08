import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import VjezbeService from "../../services/Vjezbe/VjezbeService"
import { Button, Col, Form, Row } from "react-bootstrap"
import { RouteNames } from "../../constants"

export default function VjezbePromjena(){

    const navigate = useNavigate()
    const params = useParams()
    const [vjezba, setVjezba] = useState({})

    useEffect(()=>{
        ucitajVjezbu()
    },[])

    async function ucitajVjezbu() {
        await VjezbeService.getBySifra(params.sifra).then((odgovor)=>{
            if(!odgovor.success){
                alert('Nije implementiran servis')
                return
            }
            setVjezba(odgovor.data)
        })
    }

    async function promjeni(Vjezba) {
        await VjezbeService.promjeni(params.sifra,Vjezba).then(()=>{
            navigate(RouteNames.VJEZBE)
        })
    }

    function odradiSubmit(e){
        e.preventDefault()
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

        // --- KONTROLA 3: Opis (Postojanje) ---
        if (!podaci.get('opis') || podaci.get('opis').trim().length === 0) {
            alert("Opis je obavezno i ne smije sadržavati samo razmake!");
            return;
        }

        // --- KONTROLA 4: Opis (Minimalna duljina) ---
        if (podaci.get('opis').trim().length < 2) {
            alert("opis mora imati najmanje 2 znaka!");
            return;
        }

        promjeni({
            ime: podaci.get('ime'),
            opis: podaci.get('opis')          
    })
}

    return(
         <>
            <h3>Promjena Vjezbe</h3>
            <Form onSubmit={odradiSubmit}>
                <Form.Group controlId="ime">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control type="text" name="ime" required 
                    defaultValue={vjezba.ime}/>
                </Form.Group>

                <Form.Group controlId="opis">
                    <Form.Label>Opis vježbe</Form.Label>
                    <Form.Control type="text" name="opis" required 
                    defaultValue={vjezba.opis}/>
                </Form.Group>

                <Row className="mt-4">
                    <Col>
                        <Link to={RouteNames.VJEZBE} className="btn btn-danger">
                            Odustani
                        </Link>
                    </Col>
                    <Col>
                        <Button type="submit" variant="success">
                            Promjeni vježbe
                        </Button>
                    </Col>
                </Row>

            </Form>
        </>
    )
}