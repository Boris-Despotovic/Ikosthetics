import { useState } from 'react';
import { Button, Form, Alert, Container, Row, Col } from 'react-bootstrap';
import { Faker, hr } from '@faker-js/faker';
import KorisnikService from "../services/korisnici/KorisnikService";
import PlanoviTreningaService from "../services/planovitreninga/PlanoviTreningaService";
import VjezbeService from "../services/Vjezbe/VjezbeService";

export default function GeneriranjePodataka() {
    const [brojKorisnika, setBrojKorisnika] = useState(5);
    const [brojVjezba, setBrojVjezba] = useState(20);
    const [brojPlanovaTreninga, setBrojPlanovaTreninga] = useState(10);
    const [poruka, setPoruka] = useState(null);
    const [loading, setLoading] = useState(false);

    // Postavi faker na hrvatski jezik
    const faker = new Faker({
        locale: [hr]
    });

    const generirajKorisnike = async (broj) => {


        for (let i = 0; i < broj; i++) {
            await KorisnikService.dodaj({
                ime: faker.person.firstName(),
                prezime: faker.person.lastName()
            });
        }
    };

    const generirajVjezbe = async (broj) => {
        for (let i = 0; i < broj; i++) {
            const vjezba = {
                ime: 'Vježba ' + faker.person.firstName(),
                opis: faker.person.lastName() + ' prvi izveo',                
            };
            await VjezbeService.dodaj(vjezba);
        }
    };

    const generirajPlanoveTreninga = async (broj) => {

        // Dohvati sve korisnike
        const rezultatKorisnici = await KorisnikService.get();
        const korisnici = rezultatKorisnici.data;

        
        if (korisnici.length === 0) {
            throw new Error('Nema dostupnih korisnika. Prvo generirajte korisnike.');
        }

        const rezultatVjezbe = await VjezbeService.get();
        const vjezbe = rezultatVjezbe.data;

        
        if (vjezbe.length === 0) {
            throw new Error('Nema dostupnih vježbi. Prvo generirajte vježbe.');
        }
        
        for (let i = 0; i < broj; i++) {
            // Odaberi nasumični korisnik
            const randomKorisnik = korisnici[faker.number.int({ min: 0, max: korisnici.length - 1 })];
            const randomVjezba = vjezbe[faker.number.int({ min: 0, max: vjezbe.length - 1 })];
            

            const planoviTreninga = {
                naziv: (randomKorisnik.ime + ' ' + randomKorisnik.prezime).trim().split(/\s+/).slice(0, 2).map(rijec => rijec[0]).join('').toUpperCase() + ' plan treninga',   
                korisnik: randomKorisnik.sifra,
                vjezbe: [randomVjezba.sifra]
            };
            
            await PlanoviTreningaService.dodaj(planoviTreninga);
        }
    };

    const handleGenerirajKorisnike = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPoruka(null);

        try {
            await generirajKorisnike(brojKorisnika);

            setPoruka({
                tip: 'success',
                tekst: `Uspješno generirano ${brojKorisnika} korisnika!`
            });
        } catch (error) {
            setPoruka({
                tip: 'danger',
                tekst: 'Greška pri generiranju korisnika: ' + error.message
            });
        } finally {
            setLoading(false);
        }
    };

    const handleGenerirajVjezbe = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPoruka(null);

        try {
            
            await generirajVjezbe(brojVjezba);

            setPoruka({
                tip: 'success',
                tekst: `Uspješno generirano ${brojVjezba} vježba!`
            });
        } catch (error) {
            setPoruka({
                tip: 'danger',
                tekst: 'Greška pri generiranju vježba: ' + error.message
            });
        } finally {
            setLoading(false);
        }
    };

    const handleObrisiVjezbe = async () => {
        if (!window.confirm('Jeste li sigurni da želite obrisati sve vježbe?')) {
            return;
        }

        setLoading(true);
        setPoruka(null);

        try {
            const rezultat = await VjezbeService.get();
            const vjezbe = rezultat.data;
            
            for (const vjezba of vjezbe) {
                await VjezbeService.obrisi(vjezba.sifra);
            }

            setPoruka({
                tip: 'success',
                tekst: `Uspješno obrisano ${vjezbe.length} vježba!`
            });
        } catch (error) {
            setPoruka({
                tip: 'danger',
                tekst: 'Greška pri brisanju vježba: ' + error.message
            });
        } finally {
            setLoading(false);
        }
    };

    const handleObrisiKorisnike = async () => {
        if (!window.confirm('Jeste li sigurni da želite obrisati sve korisnike?')) {
            return;
        }

        setLoading(true);
        setPoruka(null);

        try {
            const rezultat = await KorisnikService.get();
            const korisnici = rezultat.data;
            
            for (const korisnik of korisnici) {
                await KorisnikService.obrisi(korisnik.sifra);
            }

            setPoruka({
                tip: 'success',
                tekst: `Uspješno obrisano ${korisnici.length} korisnika!`
            });
        } catch (error) {
            setPoruka({
                tip: 'danger',
                tekst: 'Greška pri brisanju korisnika: ' + error.message
            });
        } finally {
            setLoading(false);
        }
    };

    const handleGenerirajPlanoveTreninga = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPoruka(null);

        try {
            await generirajPlanoveTreninga(brojPlanovaTreninga);

            setPoruka({
                tip: 'success',
                tekst: `Uspješno generirano ${brojPlanovaTreninga} planova treninga!`
            });
        } catch (error) {
            setPoruka({
                tip: 'danger',
                tekst: 'Greška pri generiranju plana treninga: ' + error.message
            });
        } finally {
            setLoading(false);
        }
    };

    const handleObrisiPlanoveTreninga = async () => {
        if (!window.confirm('Jeste li sigurni da želite obrisati sve planove treninga?')) {
            return;
        }

        setLoading(true);
        setPoruka(null);

        try {
            const rezultat = await PlanoviTreningaService.get();
            const planoveTreninga = rezultat.data;
            
            for (const planTreninga of planoveTreninga) {
                await PlanoviTreningaService.obrisi(planTreninga.sifra);
            }

            setPoruka({
                tip: 'success',
                tekst: `Uspješno obrisan ${planoveTreninga.length} plan treninga!`
            });
        } catch (error) {
            setPoruka({
                tip: 'danger',
                tekst: 'Greška pri brisanju plana treninga: ' + error.message
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="mt-4">
            <h1>Generiranje podataka</h1>
            <p className="text-muted">
                Koristite ovaj alat za generiranje testnih podataka s lažnim (fake) podacima na hrvatskom jeziku.
            </p>

            {poruka && (
                <Alert variant={poruka.tip} dismissible onClose={() => setPoruka(null)}>
                    {poruka.tekst}
                </Alert>
            )}

            <Row>
                <Col md={4}>
                    <Form onSubmit={handleGenerirajKorisnike}>
                        <Form.Group className="mb-3">
                            <Form.Label>Broj korisnika</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                max="50"
                                value={brojKorisnika}
                                onChange={(e) => setBrojKorisnika(parseInt(e.target.value))}
                                disabled={loading}
                            />
                            <Form.Text className="text-muted">
                                Unesite broj korisnika (1-50)
                            </Form.Text>
                        </Form.Group>
                        <Button 
                            variant="primary" 
                            type="submit" 
                            disabled={loading}
                            className="w-100"
                        >
                            {loading ? 'Generiranje...' : 'Generiraj korisnike'}
                        </Button>
                    </Form>
                </Col>
                <Col md={4}>
                    <Form onSubmit={handleGenerirajVjezbe}>
                        <Form.Group className="mb-3">
                            <Form.Label>Broj vježba</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                max="200"
                                value={brojVjezba}
                                onChange={(e) => setBrojVjezba(parseInt(e.target.value))}
                                disabled={loading}
                            />
                            <Form.Text className="text-muted">
                                Unesite broj vježba (1-200)
                            </Form.Text>
                        </Form.Group>
                        <Button 
                            variant="primary" 
                            type="submit" 
                            disabled={loading}
                            className="w-100"
                        >
                            {loading ? 'Generiranje...' : 'Generiraj vježbe'}
                        </Button>
                    </Form>
                </Col>
                <Col md={4}>
                    <Form onSubmit={handleGenerirajPlanoveTreninga}>
                        <Form.Group className="mb-3">
                            <Form.Label>Broj planova treninga</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                max="100"
                                value={brojPlanovaTreninga}
                                onChange={(e) => setBrojPlanovaTreninga(parseInt(e.target.value))}
                                disabled={loading}
                            />
                            <Form.Text className="text-muted">
                                Unesite broj planova treninga (1-100)
                            </Form.Text>
                        </Form.Group>
                        <Button 
                            variant="primary" 
                            type="submit" 
                            disabled={loading}
                            className="w-100"
                        >
                            {loading ? 'Generiranje...' : 'Generiraj planove treninga'}
                        </Button>
                    </Form>
                </Col>
            </Row>

            <Alert variant="warning" className="mt-3">
                <strong>Upozorenje:</strong> Ove akcije će dodati nove podatke u postojeće. 
                Ako želite početi ispočetka, prvo obrišite postojeće podatke.
            </Alert>

            <hr className="my-4" />

            <h3>Brisanje podataka</h3>
            <p className="text-muted">
                Koristite ove opcije za brisanje svih podataka iz baze.
            </p>

            <Row className="mt-3">
                <Col md={4}>
                    <Button 
                        variant="danger" 
                        onClick={handleObrisiKorisnike}
                        disabled={loading}
                        className="w-100 mb-2"
                    >
                        {loading ? 'Brisanje...' : 'Obriši sve korisnike'}
                    </Button>
                </Col>
                <Col md={4}>
                    <Button 
                        variant="danger" 
                        onClick={handleObrisiVjezbe}
                        disabled={loading}
                        className="w-100 mb-2"
                    >
                        {loading ? 'Brisanje...' : 'Obriši sve vježbe'}
                    </Button>
                </Col>
                <Col md={4}>
                    <Button 
                        variant="danger" 
                        onClick={handleObrisiPlanoveTreninga}
                        disabled={loading}
                        className="w-100 mb-2"
                    >
                        {loading ? 'Brisanje...' : 'Obriši sve planove treninga'}
                    </Button>
                </Col>
            </Row>

            <Alert variant="danger" className="mt-3">
                <strong>Oprez!</strong> Brisanje podataka je trajna akcija i ne može se poništiti.
            </Alert>
        </Container>
    );
}
