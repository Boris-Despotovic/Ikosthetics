const STORAGE_KEY = 'planovitreninga';

function dohvatiSveIzStorage() {
    const podaci = localStorage.getItem(STORAGE_KEY);
    return podaci ? JSON.parse(podaci) : [];
}

function spremiUStorage(podaci) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(podaci));
}

async function get() {
    const planovitreninga = dohvatiSveIzStorage();
    return {success: true,  data: [...planovitreninga] };
}

async function getBySifra(sifra) {
    const planovitreninga = dohvatiSveIzStorage();
    const plantreninga = planovitreninga.find(g => g.sifra === parseInt(sifra));
    return {success: true,  data: plantreninga };
}

async function dodaj(plantreninga) {
    const planovitreninga = dohvatiSveIzStorage();
    
    if (planovitreninga.length === 0) {
        plantreninga.sifra = 1;
    } else {
        const maxSifra = Math.max(...planovitreninga.map(g => g.sifra));
        plantreninga.sifra = maxSifra + 1;
    }
    
    planovitreninga.push(plantreninga);
    spremiUStorage(planovitreninga);
    return { data: plantreninga };
}

async function promjeni(sifra, plantreninga) {
    const planovitreninga = dohvatiSveIzStorage();
    const index = planovitreninga.findIndex(g => g.sifra === parseInt(sifra));
    
    if (index !== -1) {
        planovitreninga[index] = { ...planovitreninga[index], ...plantreninga, sifra: parseInt(sifra) };
        spremiUStorage(planovitreninga);
    }
    return { data: planovitreninga[index] };
}

async function obrisi(sifra) {
    let planovitreninga = dohvatiSveIzStorage();
    planovitreninga = planovitreninga.filter(g => g.sifra !== parseInt(sifra));
    spremiUStorage(planovitreninga);
    return { message: 'Obrisano' };
}

export default {
    get,
    dodaj,
    getBySifra,
    promjeni,
    obrisi
};