import { korisnici } from "./KorisnikPodaci"

async function get(){
    return {data: korisnici}
}


export default{
    get
}