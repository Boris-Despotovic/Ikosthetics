import { korisnici } from "./KorisnikPodaci"

async function get(){
    return {data: korisnici}
}

async function dodaj(korisnik) {
    if(korisnici.length===0){
        korsinik.sifra=1
    }else{
        korisnik.sifra = korisnici[korisnici.length - 1].sifra + 1
    }

    korisnici.push(korisnik)
}


export default{
    get,
    dodaj
}