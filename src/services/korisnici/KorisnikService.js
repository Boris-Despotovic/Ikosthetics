import { korisnici } from "./KorisnikPodaci";

async function get(){
    return {data: [...korisnici]} // [...] stvara novi niz s istim podacima
}

async function getBySifra(sifra) {
    return {data: smjerovi.find(s => s.sifra === parseInt(sifra))}
}

async function dodaj(korisnik) {
    if(korisnici.length===0){
        korsinik.sifra=1
    }else{
        korisnik.sifra = korisnici[korisnici.length - 1].sifra + 1
    }

    korisnici.push(korisnik)
}

async function promjeni(sifra,korisnik) {
    const index = nadiIndex(sifra)
    korisnici[index] = {...korisnici[index], ...korisnik}
}

function nadiIndex(sifra){
    return korisnici.findIndex(s=>s.sifra === parseInt(sifra))
}

export default{
    get,
    dodaj,
    getBySifra,
    promjeni
}