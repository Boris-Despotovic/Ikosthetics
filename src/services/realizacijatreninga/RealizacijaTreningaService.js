import PlanoviTreningaServiceLocalStorage from "./PlanoviTreningaLocalStorage"
import PlanoviTreningaServiceMemorija from "./PlanoviTreningaMemorija";
import { DATA_SOURCE } from "../../constants";

let Servis = null;

switch (DATA_SOURCE) {
    case 'memorija':
        Servis = PlanoviTreningaServiceMemorija;
        break;
    case 'localStorage':
        Servis = PlanoviTreningaServiceLocalStorage;
        break;
    default:
        Servis = null;
}

const PrazanServis = {
    get: async () => ({ success: false, data: []}),
    getBySifra: async (sifra) => ({ success: false, data: {} }),
    dodaj: async (plantreninga) => { console.error("Servis nije učitan"); },
    promjeni: async (sifra, plantreninga) => { console.error("Servis nije učitan"); },
    obrisi: async (sifra) => { console.error("Servis nije učitan"); }
};

const AktivniServis = Servis || PrazanServis;

export default {
    get: () => AktivniServis.get(),
    getBySifra: (sifra) => AktivniServis.getBySifra(sifra),
    dodaj: (plantreninga) => AktivniServis.dodaj(plantreninga),
    promjeni: (sifra, plantreninga) => AktivniServis.promjeni(sifra, plantreninga),
    obrisi: (sifra) => AktivniServis.obrisi(sifra)
};
