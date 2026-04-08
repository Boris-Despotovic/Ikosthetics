import { useEffect, useState } from "react"
import VjezbeService from "../../services/Vjezbe/VjezbeService"
import { Button, Table } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"

export default function VjezbePregled(){

    const navigate = useNavigate()

    const [Vjezbe, setVjezbe] = useState([])

    useEffect(()=>{
        ucitajVjezbe()
    },[])

    async function ucitajVjezbe() {
        await VjezbeService.get().then((odgovor)=>{
            if(!odgovor.success){
                alert('Nije implementiran servis')
                return
            }
            setVjzebe(odgovor.data)
        })
    }

    async function brisanje(sifra) {
        if (!confirm('Sigurno obrisati?')) return;
        await VjezbeService.obrisi(sifra);
        ucitajVjezbe()
    }

    return(
        <>
        <Link to={RouteNames.VJEZBE_NOVI}
        className="btn btn-success w-100 my-3">
            Dodavanje nove vježbe
        </Link>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Ime</th>
                    <th>Opis</th>
                </tr>
            </thead>
            <tbody>
                {Vjezbe && Vjezbe.map((Vjezba)=>(
                    <tr key={Vjezba.sifra}>
                        <td className="lead">{Vjezba.ime}</td>
                        <td className="lead">{Vjezba.opis}</td>
                        <td>
                            <Button onClick={()=>{navigate(`/Vjezbe/${Vjezba.sifra}`)}}>
                                Promjeni
                            </Button>
                            &nbsp;&nbsp;
                            <Button variant="danger" onClick={() => brisanje(Vjezba.sifra)}>
                                Obriši
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>
    )
}
