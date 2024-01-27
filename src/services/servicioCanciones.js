export async function obtenerCancionesTop(token) {

    try {
        const URL_TOPTRACKS_SERVICES = "https://api.spotify.com/v1/artists/6XyY86QOPPrYVGvF9ch6wz/top-tracks?market=us"
        const PETICION_CANCIONES = {
            method: "GET",
            headers: { "Authorization": token },
        };
        let respuestaServicio = await fetch(URL_TOPTRACKS_SERVICES, PETICION_CANCIONES)
        if (!respuestaServicio.ok) {
            throw new Error(`Error al obtener las canciones ${respuestaServicio.statusText}`)
        }
        let canciones = await respuestaServicio.json();
        return canciones;
    } catch (error) {
        console.error("Error al obtener las canciones:", error);
        throw error;
    }





}