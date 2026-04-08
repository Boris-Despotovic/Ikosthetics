import { useEffect, useState } from "react"
import VjezbeService from "../../services/Vjezbe/VjezbeService"
import { Button, Table } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"

export default function VjezbePregled(){

    const navigate = useNavigate()

    const [vjezbe, setVjezbe] = useState([])

    useEffect(()=>{
        ucitajVjezbe()
    },[])

    async function ucitajVjezbe() {
        await VjezbeService.get().then((odgovor)=>{
            if(!odgovor.success){
                alert('Nije implementiran servis')
                return
            }
            setVjezbe(odgovor.data)
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
                    <th>Akcija</th>
                </tr>
            </thead>
            <tbody>
                {vjezbe && vjezbe.map((vjezba)=>(
                    <tr key={vjezba.sifra}>
                        <td className="lead">{vjezba.ime}</td>
                        <td className="lead">{vjezba.opis}</td>
                        <td>
                            <Button onClick={()=>{navigate(`/Vjezbe/${vjezba.sifra}`)}}>
                                Promjeni
                            </Button>
                            &nbsp;&nbsp;
                            <Button variant="danger" onClick={() => brisanje(vjezba.sifra)}>
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
