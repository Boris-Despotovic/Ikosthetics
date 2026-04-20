import { DATA_SOURCE } from "../../constants";
import RealizacijaTreningaMemorija from "./RealizacijaTreningaMemorija";
import RealizacijaTreningaLocalStorage from "./RealizacijaTreningaLocalStorage";

let Servis = null;

switch (DATA_SOURCE) {
    case 'memorija':
        Servis = RealizacijaTreningaMemorija;
        break;
    case 'localStorage':
        Servis = RealizacijaTreningaLocalStorage;
        break;
    default:
        Servis = null;
}

const PrazanServis = {
    get: async () => ({ success: false, data: []}),
    getBySifra: async (sifra) => ({ success: false, data: {} }),
    dodaj: async (realziacijatreninga) => { console.error("Servis nije učitan"); },
    promjeni: async (sifra, realizacijatreninga) => { console.error("Servis nije učitan"); },
    obrisi: async (sifra) => { console.error("Servis nije učitan"); }
};

const AktivniServis = Servis || PrazanServis;

export default {
    get: () => AktivniServis.get(),
    getBySifra: (sifra) => AktivniServis.getBySifra(sifra),
    dodaj: (realizacijatreninga) => AktivniServis.dodaj(realizacijatreninga),
    promjeni: (sifra, realizacijatreninga) => AktivniServis.promjeni(sifra, realizacijatreninga),
    obrisi: (sifra) => AktivniServis.obrisi(sifra)
};
