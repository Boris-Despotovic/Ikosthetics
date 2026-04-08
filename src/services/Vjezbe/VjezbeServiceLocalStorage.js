const STORAGE_KEY = 'polaznici';

// Pomoćna funkcija za dohvaćanje podataka iz local storage-a
function dohvatiSveIzStorage() {
    const podaci = localStorage.getItem(STORAGE_KEY);
    return podaci ? JSON.parse(podaci) : [];
}

// Pomoćna funkcija za spremanje podataka
function spremiUStorage(podaci) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(podaci));
}

// 1/4 Read - dohvati sve
async function get() {
    const Vjezbe = dohvatiSveIzStorage();
    return {success: true,  data: [...Vjezbe] };
}

// Dohvati jedan po šifri
async function getBySifra(sifra) {
    const Vjezbe = dohvatiSveIzStorage();
    const Vjezba = Vjezbe.find(p => p.sifra === parseInt(sifra));
    return {success: true,  data: Vjezba };
}

// 2/4 Create - dodaj novi
async function dodaj(Vjezba) {
    const Vjezbe = dohvatiSveIzStorage();
    
    if (Vjezbe.length === 0) {
        Vjezba.sifra = 1;
    } else {
        // Pronalaženje najveće šifre da izbjegnemo duplikate
        const maxSifra = Math.max(...Vjezbe.map(p => p.sifra));
        Vjezba.sifra = maxSifra + 1;
    }
    
    Vjezbe.push(Vjezba);
    spremiUStorage(Vjezbe);
    return { data: Vjezba };
}

// 3/4 Update - promjeni postojeći
async function promjeni(sifra, Vjezba) {
    const Vjezbe = dohvatiSveIzStorage();
    const index = Vjezbe.findIndex(p => p.sifra === parseInt(sifra));
    
    if (index !== -1) {
        Vjezbe[index] = { ...Vjezbe[index], ...Vjezba};
        spremiUStorage(Vjezbe);
    }
    return { data: Vjezbe[index] };
}

// 4/4 Delete - obriši
async function obrisi(sifra) {
    let Vjezbe = dohvatiSveIzStorage();
    Vjezbe = Vjezbe.filter(p => p.sifra !== parseInt(sifra));
    spremiUStorage(Vjezbe);
    return { message: 'Obrisano' };
}

export default {
    get,
    dodaj,
    getBySifra,
    promjeni,
    obrisi
};
