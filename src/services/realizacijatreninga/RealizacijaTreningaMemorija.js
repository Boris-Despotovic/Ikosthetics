import { realizacijatreninga } from "./RealizacijaTreningaPodaci"

async function get(){
    return {success: true, data: [...realizacijatreninga]} 
}

async function getBySifra(sifra) {
    return {success: true, data: realizacijatreninga.find(g => g.sifra === parseInt(sifra))}
}

async function dodaj(realizacijatreninga){
    if(realizacijetreninga.length===0){
        realizacijatreninga.sifra=1
    }else{
        realizacijatreninga.sifra = realizacijetreninga[realizacijetreninga.length - 1].sifra + 1
    }
    
    realizacijetreninga.push(realizacijatreninga)
}

async function promjeni(sifra,realizacijatreninga) {
    const index = nadiIndex(sifra)
    realizacijetreninga[index] = {...realizacijetreninga[index], ...realizacijatreninga}
}

function nadiIndex(sifra){
    return realizacijetreninga.findIndex(g=>g.sifra === parseInt(sifra))
}

async function obrisi(sifra) {
    const index = nadiIndex(sifra);
    if (index > -1) {
        realizacijetreninga.splice(index, 1);
    }
    return;
}


export default{
    get,
    dodaj,
    getBySifra,
    promjeni,
    obrisi
}