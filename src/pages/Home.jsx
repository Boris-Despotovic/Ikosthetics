import { useEffect, useState } from "react";
import { IME_APLIKACIJE } from "../constants";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import KorisnikService from "../services/korisnici/KorisnikService";
import VjezbeService from "../services/Vjezbe/VjezbeService";
import PlanoviTreningaService from "../services/planovitreninga/PlanoviTreningaService";

export default function Home(){
    const [brojKorisnika, setBrojKorisnika] = useState(0);
    const [brojVjezba, setBrojVjezba] = useState(0);
    const [brojPlanovatreninga, setBrojPlanovatreninga] = useState(0);
    const [animatedKorisnici, setAnimatedKorisnici] = useState(0);
    const [animatedVjezbe, setAnimatedVjezbe] = useState(0);
    const [animatedPlanovitreninga, setAnimatedPlanovitreninga] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const korisniciRezultat = await KorisnikService.get();
                const Vjezbe = await VjezbeService.get();
                const planovitreninga = await PlanoviTreningaService.get();
                
                setBrojKorisnika(korisniciRezultat.data.length);
                setBrojVjezba(Vjezbe.data.length);
                setBrojPlanovatreninga(planovitreninga.data.length);
            } catch (error) {
                console.error('Greška pri dohvaćanju podataka:', error);
            }
        };
       
        fetchData();
    }, []);

    useEffect(() => {
        if (animatedKorisnici < brojKorisnika) {
            const timer = setTimeout(() => {
                setAnimatedKorisnici(prev => Math.min(prev + 1, brojKorisnika));
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [animatedKorisnici, brojKorisnika]);

    useEffect(() => {
        if (animatedVjezbe < brojVjezba) {
            const timer = setTimeout(() => {
                setAnimatedVjezbe(prev => Math.min(prev + 1, brojVjezba));
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [animatedVjezbe, brojVjezba]);

    useEffect(() => {
        if (animatedPlanovitreninga < brojPlanovatreninga) {
            const timer = setTimeout(() => {
                setAnimatedPlanovitreninga(prev => Math.min(prev + 1, brojPlanovatreninga));
            }, 200);
            return () => clearTimeout(timer);
        }
    }, [animatedPlanovitreninga, brojPlanovatreninga]);


    return(
        <>
        <h1>Welcome to {IME_APLIKACIJE}</h1>
        <div>
            Join fitness programs by Boris Despotović, Ikosthetics.
        </div>
        <div>
            Your body, your temple.
        </div>
        <div>
            “No man has the right to be an amateur in the matter of physical training. It is a shame for a man to grow old without seeing the beauty and strength of which his body is capable.”
― Socrates
    
    <DotLottieReact
      src="/Weightliftingcompetition.lottie"
      loop
      autoplay
    />
        </div>
        </>
    );
}
