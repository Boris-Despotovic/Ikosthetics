import { useEffect, useState } from "react";
import { IME_APLIKACIJE } from "../constants";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import KorisnikService from "../services/korisnici/KorisnikService";
import VjezbeService from "../services/Vjezbe/VjezbeService";
import PlanoviTreningaService from "../services/planovitreninga/PlanoviTreningaService";
import { Card, Col, Row } from "react-bootstrap";

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
        <Row>
            <Col md={6}>
            <div style={{ textAlign: 'center' }}></div>
            <div style={{maxWidth: '500px', margin: 'auto'}}>
                <DotLottieReact
                    src="/AISpark_InteractiveAssistant.lottie"
                    loop
                    autoplay
                />
            </div>
            </Col>
            <Col className="d-flex align-items-center justify-content-center">
                <div style={{ width: '100%', maxWidth: '400px' }}>
                    <Card className="mb-3 shadow-lg border-0 statistikaPanel">
                        <Card.Body className="text-center">
                            <p className="text-white">Korisnici</p>
                            <div className="statistikaTekst">
                                {animatedKorisnici}
                            </div>
                        </Card.Body>
                    </Card>

                    <Card className="mb-3 shadow-lg border-0 statistikaPanel">
                        <Card.Body className="text-center">
                            <p className="text-white">Vježbe</p>
                            <div className="statistikaTekst">
                                {animatedVjezbe}
                            </div>
                        </Card.Body>
                    </Card>

                    <Card className="shadow-lg border-0 statistikaPanel">
                        <Card.Body className="text-center">
                            <p className="text-white">Planovi treninga</p>
                            <div className="statistikaTekst">
                                {animatedPlanovitreninga}
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </Col>
        </Row>
    
    <DotLottieReact
      src="/Weightliftingcompetition.lottie"
      loop
      autoplay
    />
        </div>
        </>
    );
}
