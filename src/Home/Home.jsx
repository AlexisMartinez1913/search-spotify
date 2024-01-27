import './Home.css';
import { useEffect, useState } from 'react';
import { obtenerTokenSpotify } from '../services/servicioSpotify';
import { obtenerCancionesTop } from '../services/servicioCanciones';


export function Home() {
    const [carga, setCarga] = useState(true);
    const [canciones, setCanciones] = useState(null);
    const [cancionesOriginales, setCancionesOriginales] = useState(null);
    const [consulta, setConsulta] = useState('');
    useEffect(() => {
        obtenerTokenSpotify().then(function (respuestaToken) {
            obtenerCancionesTop(respuestaToken).
                then(function (respuestaCanciones) {
                    console.log(respuestaCanciones);
                    setCarga(false);
                    setCanciones(respuestaCanciones.tracks)
                    setCancionesOriginales(respuestaCanciones.tracks)
                });
        });
    }, []);

    const buscarCancion = () => {
        // filtrar canciones
        const cancionesFiltradas = cancionesOriginales.filter((cancion) =>
            cancion.name.toLowerCase().includes(consulta.toLowerCase())
        );
        setCanciones(cancionesFiltradas);
    };

    const [musico, setMusico] = useState({
        name: 'Linkin Park',
        imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Linkin_Park_in_2017.jpg/220px-Linkin_Park_in_2017.jpg',
        historia: 'Linkin Park es una banda estadounidense de rock alternativo procedente de Agoura Hills, California formada en 1996. Integrada por Mike Shinoda, Dave Farrell, Joe Hahn, Brad Delson, Rob Bourdon y Chester Bennington, este último como voz principal. La banda comenzó con sus primeros trabajos musicales de manera independiente, en la que grabaron su primer material, llamado Xero; sin embargo, no tuvieron éxito en la búsqueda de un sello discográfico, ya que nadie mostraba interés por su trabajo. No fue hasta 1999, que con el apoyo de Jeff Blue, quien ejercía como vicepresidente de Warner Records, lograron firmar su primer contrato. El nombre proviene de un juego de palabras que hace referencia al Lincoln Park en Santa Mónica.',
    });


    if (carga) {
        return (
            <>
                <h1>Cargando...</h1>
            </>
        )

    } else {
        return (
            <>
                <section className='banner'>
                    <img src={musico.imagen} alt={musico.name} />

                </section>
                <section className='row justify-content-center'>
                        <h1 className='text-center my-3'>{musico.name}</h1>
                        <h3 className='text-center my-5'>Historia</h3>
                        <p className='text-center px-2 col-md-4'>{musico.historia}</p>
                </section>
                <section className='container'>
                    <div className='row justify-content-center'>

                        <input type="text" className="form-control my-3 col-md-8" placeholder='Digita Una Canción' value={consulta} onChange={(e) => setConsulta(e.target.value)} />
                        <button className='btn btn-success col-md-2' onClick={buscarCancion}>Buscar</button>
                        <h2 className='text-center my-5'>Canciones Populares</h2>
                        {

                            canciones.map(function (cancion) {
                                return (
                                    <div className="col-md-6 mb-4">
                                        <div className="card h-100 mb-2 shadow my-5 p-1">

                                            <img src={cancion.album.images[0].url} alt={cancion.name} className="card-img-top" />
                                            <h3 className='text-center my-4 mb-2 '>{cancion.name}</h3>
                                            <audio src={cancion.preview_url} controls className='w-100'></audio>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </section>
                <hr className='my-5' />

                <footer>
                    <section className='container'>
                        <section className='row'>
                            <section className='col-md-12 text-center'>
                            <p className='text-center'>Todos Los Derechos Reservados</p>
                            </section>
                        </section>
                    </section>
                </footer>


            </>
        )
    }

}