import { Vjezbe } from "./VjezbePodaci"


// 1/4 Read od CRUD
async function get(){
    return {success: true, data: [...Vjezbe]} // [...] stvara novi niz s istim podacima
}

async function getBySifra(sifra) {
    return {success: true, data: Vjezbe.find(p => p.sifra === parseInt(sifra))}
}

// 2/4 Create od CRUD
async function dodaj(Vjezba){
    if(Vjezbe.length===0){
        Vjezba.sifra=1
    }else{
        Vjezba.sifra = Vjezbe[Vjezbe.length - 1].sifra + 1
    }
    
    Vjezbe.push(Vjezba)
}

// 3/4 Update od CRUD
async function promjeni(sifra,Vjezba) {
    const index = nadiIndex(sifra)
    Vjezbe[index] = {...Vjezbe[index], ...Vjezba}
}

function nadiIndex(sifra){
    return Vjezbe.findIndex(p=>p.sifra === parseInt(sifra))
}

// 4/4 Delete od CRUD
async function obrisi(sifra) {
    const index = nadiIndex(sifra);
    if (index > -1) {
        Vjezbe.splice(index, 1);
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