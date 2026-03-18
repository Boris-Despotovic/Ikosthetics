import { useEffect } from "react"
import { useState } from "react"
import KorisnikService from "../../services/korisnici/KorisnikService"

export default function KorisniciPregled(){

    const [korisnici, setKorisnici] = useState([])

    useEffect(()=>{
        ucitajKorisnike()
    },[])

    async function ucitajKorisnike(){
        await KorisnikService.get().then((odgovor)=>{
            setKorisnici(odgovor.data)
        })
    }

    return(
        <>
        <ol>
            {korisnici && korisnici.map((korisnik)=>(
                <li>{korisnik.ime}</li>
            ))}
        </ol>
        </>
    )

}