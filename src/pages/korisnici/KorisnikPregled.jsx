import { useEffect } from "react"
import { useState } from "react"
import KorisnikService from "../../services/korisnici/KorisnikService"
import { Button, Table } from "react-bootstrap"
import { RouteNames } from "../../constants"
import { Link, useNavigate } from "react-router-dom"

export default function KorisniciPregled() {

    const navigate = useNavigate()

    const [korisnici, setKorisnici] = useState([])

    useEffect(() => {
        ucitajKorisnike()
    }, [])

    async function ucitajKorisnike() {
        await KorisnikService.get().then((odgovor) => {
            setKorisnici(odgovor.data)
        })
    }

    return (
        <>
        <Link to={RouteNames.KORISNICI_NOVI}
        className="btn btn-success w-100 my-3">
            Dodavanje novog korisnika
        </Link>
            <Table striped hover responsive>
                <thead>
                    <tr>
                        <th>Ime</th>
                        <th>Prezime</th>
                        <th>Naziv plana treninga</th>
                        <th>Trajanje</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {korisnici && korisnici.map((korisnik) => (
                        <tr key={korisnik.sifra}>
                            <td>{korisnik.ime}</td>
                            <td className='text-end'>{korisnik.prezime} </td>
                            <td className='text-end'>{korisnik.nazivPlanaTreninga} </td>
                            <td className='text-end'>{korisnik.trajanje} </td>
                            <td>
                                <Button onClick={()=>{navigate(`/korisnici/${korisnik.sifra}`)}}>
                                Promjeni
                            </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}
