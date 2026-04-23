import { useEffect, useState } from "react"
import { Button, Table } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"
import RealizacijaTreningaService from "../../services/realizacijatreninga/RealizacijaTreningaService"
import KorisnikService from "../../services/korisnici/KorisnikService"
import PlanoviTreningaService from "../../services/planovitreninga/PlanoviTreningaService"

export default function RealizacijaTreningaPregled(){

    const navigate = useNavigate()

    const [realizacijetreninga, setRealizacijetreninga] = useState([])
    const [korisnici, setKorisnici] = useState([])
    const [planovitreninga, setPlanovitreninga] = useState([])

    useEffect(()=>{
        ucitajRealizacijeTreninga()
        ucitajKorisnike()
        ucitajPlanoviTreninga()
    },[])

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

    function dohvatiNazivPlanaTreninga(sifraPlanaTreninga) {

        const planTreninga = planovitreninga.find(pt=>pt.sifra===sifraPlanaTreninga)
        return planTreninga ? planTreninga.naziv : 'Nepoznato'
    }

    function dohvatiNazivKorisnika(sifraPlanaTreninga) {

        const planTreninga = planovitreninga.find(pt=>pt.sifra===sifraPlanaTreninga)
        const korisnik = korisnici.find(s => s.sifra === planTreninga.korisnik)
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
                    <th>Plan treninga</th>
                    <th>Datum</th>
                    <th>Napomena korisniku</th>
                    <th>Napomena treneru</th>
                    <th>Akcija</th>
                </tr>
            </thead>
            <tbody>
                {realizacijetreninga && realizacijetreninga.map((realizacijatreninga)=>(
                    <tr key={realizacijatreninga.sifra}>
                        <td className="lead">{dohvatiNazivPlanaTreninga(realizacijatreninga.planTreninga)}
                            <br />
                            {dohvatiNazivKorisnika(realizacijatreninga.planTreninga)}
                        </td>

                        <td>{realizacijatreninga.datum}</td>
                        <td>{realizacijatreninga.napomenaTreneru}</td>
                        <td>{realizacijatreninga.napomenaKorisniku}</td>
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
