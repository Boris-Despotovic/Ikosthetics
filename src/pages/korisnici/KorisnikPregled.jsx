import { useEffect } from "react"
import { useState } from "react"
import KorisnikService from "../../services/korisnici/KorisnikService"
import { Table } from "react-bootstrap"

export default function KorisniciPregled() {

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
            <Table>
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
                        <tr>
                            <td>{korisnik.ime}</td>
                            <td className='text-end'>{korisnik.prezime} </td>
                            <td className='text-end'>{korisnik.nazivPlanaTreninga} </td>
                            <td className='text-end'>{korisnik.trajanje} </td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}