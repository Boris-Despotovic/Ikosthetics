import 

async function get(){
    return {success: true, data: [...planovitreninga]} 
}

async function getBySifra(sifra) {
    return {success: true, data: planovitreninga.find(g => g.sifra === parseInt(sifra))}
}

async function dodaj(plantreninga){
    if(planovitreninga.length===0){
        plantreninga.sifra=1
    }else{
        plantreninga.sifra = planovitreninga[planovitreninga.length - 1].sifra + 1
    }
    
    planovitreninga.push(plantreninga)
}

async function promjeni(sifra,plantreninga) {
    const index = nadiIndex(sifra)
    planovitreninga[index] = {...planovitreninga[index], ...plantreninga}
}

function nadiIndex(sifra){
    return planovitreninga.findIndex(g=>g.sifra === parseInt(sifra))
}

async function obrisi(sifra) {
    const index = nadiIndex(sifra);
    if (index > -1) {
        planovitreninga.splice(index, 1);
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