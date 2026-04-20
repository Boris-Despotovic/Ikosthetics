const STORAGE_KEY = 'realizacijetreninga';

function dohvatiSveIzStorage() {
    const podaci = localStorage.getItem(STORAGE_KEY);
    return podaci ? JSON.parse(podaci) : [];
}

function spremiUStorage(podaci) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(podaci));
}

async function get() {
    const realizacijetreninga = dohvatiSveIzStorage();
    return {success: true,  data: [...realizacijetreninga] };
}

async function getBySifra(sifra) {
    const realizacijetreninga = dohvatiSveIzStorage();
    const realizacijatreninga = realizacijetreninga.find(g => g.sifra === parseInt(sifra));
    return {success: true,  data: realizacijatreninga };
}

async function dodaj(realizacijatreninga) {
    const realizacijetreninga = dohvatiSveIzStorage();
    
    if (realizacijetreninga.length === 0) {
        realizacijatreninga.sifra = 1;
    } else {
        const maxSifra = Math.max(...realizacijetreninga.map(g => g.sifra));
        realizacijatreninga.sifra = maxSifra + 1;
    }
    
    realizacijetreninga.push(realizacijatreninga);
    spremiUStorage(realizacijetreninga);
    return { data: realizacijatreninga };
}

async function promjeni(sifra, realizacijatreninga) {
    const realizacijetreninga = dohvatiSveIzStorage();
    const index = realizacijetreninga.findIndex(g => g.sifra === parseInt(sifra));
    
    if (index !== -1) {
        realizacijetreninga[index] = { ...realizacijetreninga[index], ...realizacijatreninga, sifra: parseInt(sifra) };
        spremiUStorage(realizacijetreninga);
    }
    return { data: realizacijetreninga[index] };
}

async function obrisi(sifra) {
    let realizacijetreninga = dohvatiSveIzStorage();
    realizacijetreninga = realizacijetreninga.filter(g => g.sifra !== parseInt(sifra));
    spremiUStorage(realizacijetreninga);
    return { message: 'Obrisano' };
}

export default {
    get,
    dodaj,
    getBySifra,
    promjeni,
    obrisi
};