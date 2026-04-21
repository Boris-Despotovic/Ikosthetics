import { useEffect, useState } from "react"
import { Button, Table } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"
import RealizacijaTreningaService from "../../services/realizacijatreninga/RealizacijaTreningaService"
import KorisnikService from "../../services/korisnici/KorisnikService"

export default function RealizacijaTreningaPregled(){

    const navigate = useNavigate()

    const [realizacijetreninga, setRealizacijetreninga] = useState([])
    const [korisnici, setKorisnici] = useState([])

    useEffect(()=>{
        ucitajRealizacijeTreninga()
        ucitajKorisnike()
    },[])


    async function ucitajKorisnike() {
            await KorisnikService.get().then((odgovor) => {
                if(!odgovor.success){
                    alert('Nije implementiran servis')
                    return
                }
                setKorisnici(odgovor.data)
            })
        }

    async function ucitajRealizacijeTreninga() {
        await RealizacijaTreningaService.get().then((odgovor)=>{
            if(!odgovor.success){
                alert('Nije implementiran servis')
                return
            }
            setRealizacijetreninga(odgovor.data)
        })
    }

    async function ucitajKorisnike() {
        await KorisnikService.get().then((odgovor)=>{
            if(!odgovor.success){
                alert('Nije implementiran servis za korisnike')
                return
            }
            setKorisnici(odgovor.data)
        })
    }

    async function brisanje(sifra) {
        if (!confirm('Sigurno obrisati?')) return;
        await RealizacijaTreningaService.obrisi(sifra);
        ucitajRealizacijeTreninga()
    }

    function dohvatiNazivKorisnika(sifraKorisnika) {
        const korisnik = korisnici.find(s => s.sifra === sifraKorisnika)
        return korisnik ? korisnik.ime + ' ' + korisnik.prezime : 'Nepoznat korisnik'
    }

    return(
        <>
        <Link to={RouteNames.REALIZACIJA_TRENINGA_NOVI}
        className="btn btn-success w-100 my-3">
            Dodavanje nove realizacije treninga
        </Link>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Realizacijatreninga</th>
                    <th>Korisnik</th>
                    <th>Akcija</th>
                </tr>
            </thead>
            <tbody>
                {realizacijetreninga && realizacijetreninga.map((realizacijatreninga)=>(
                    <tr key={realizacijatreninga.sifra}>
                        <td className="lead">{realizacijatreninga.naziv}</td>
                        <td>{dohvatiNazivKorisnika(realizacijatreninga.korisnik)}</td>
                        <td>
                            <Button onClick={()=>{navigate(`/realizacije-treninga/${realizacijatreninga.sifra}`)}}>
                                Promjeni
                            </Button>
                            &nbsp;&nbsp;
                            <Button variant="danger" onClick={() => brisanje(realizacijatreninga.sifra)}>
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
