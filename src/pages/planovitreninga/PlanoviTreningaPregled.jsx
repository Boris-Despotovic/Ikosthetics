import { useEffect, useState } from "react"
import PlanoviTreningaService from "../../services/planovitreninga/PlanoviTreningaService"
import KorisnikService from "../../services/korisnici/KorisnikService"
import { Button, Table } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"
import { NumericFormat } from "react-number-format"

export default function PlanoviTreningaPregled(){

    const navigate = useNavigate()

    const [planovitreninga, setPlanovitreninga] = useState([])
    const [korisnici, setKorisnici] = useState([])

    useEffect(()=>{
        ucitajPlanoviTreninga()
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

    async function ucitajPlanoviTreninga() {
        await PlanoviTreningaService.get().then((odgovor)=>{
            if(!odgovor.success){
                alert('Nije implementiran servis')
                return
            }
            setPlanovitreninga(odgovor.data)
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
        await PlanoviTreningaService.obrisi(sifra);
        ucitajPlanoviTreninga()
    }

    function dohvatiNazivKorisnika(sifraKorisnika) {
        const korisnik = korisnici.find(s => s.sifra === sifraKorisnika)
        return korisnik ? korisnik.ime + ' ' + korisnik.prezime : 'Nepoznat korisnik'
    }

    return(
        <>
        <Link to={RouteNames.PLANOVI_TRENINGA_NOVI}
        className="btn btn-success w-100 my-3">
            Dodavanje novog plana treninga
        </Link>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Naziv plana treninga</th>
                    <th>Korisnik</th>
                    <th>Cijena</th>
                    <th>Akcija</th>
                </tr>
            </thead>
            <tbody>
                {planovitreninga && planovitreninga.map((plantreninga)=>(
                    <tr key={plantreninga.sifra}>
                        <td className="lead">{plantreninga.naziv}</td>
                        <td>{dohvatiNazivKorisnika(plantreninga.korisnik)}</td>
                        <td>
                            <NumericFormat
                                            value={plantreninga.cijena}
                                            displayType={'text'}
                                            thousandSeparator='.'
                                            decimalSeparator=','
                                            suffix=' €'
                                            decimalScale={2}
                                            fixedDecimalScale
                                        />
                        </td>
                        <td>
                            <Button onClick={()=>{navigate(`/planovi-treninga/${plantreninga.sifra}`)}}>
                                Promjeni
                            </Button>
                            &nbsp;&nbsp;
                            <Button variant="danger" onClick={() => brisanje(plantreninga.sifra)}>
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
