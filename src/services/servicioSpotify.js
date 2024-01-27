export async function obtenerTokenSpotify() {

    //1. PREPARO (PA ONDE VOY?, A HACER QUE?, CON QUE DATOS?)
    const URL_TOKEN_SERVICE = "https://accounts.spotify.com/api/token"
    const METODO_HTTP = "POST"
    const CLIENT_ID = "73c4936420424a7ba1d5498e63267435"
    const CLIENT_SECRET = "c9530f1cd6194e1b873c8bacee11294a"
    const GRANT_TYPE = "client_credentials"

    const PETICION_TOKEN = {
        method: METODO_HTTP,
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        },
        body: `grant_type=${GRANT_TYPE}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
    }

    try {
        //2. INCIAR LA COMUNICACIÓN E IR HASTA EL BACK CON LA PETICION
        let respuestaServidor = await fetch(URL_TOKEN_SERVICE, PETICION_TOKEN)
        if (!respuestaServidor.ok) {
            throw new Error(`Error al obtener el token: ${respuestaServidor.statusText}`);
        }
        let tokenrespuesta = await respuestaServidor.json()

        //3. ENTREGAR EL RESULTADO AL COMPONENTE PARA QUE SE LO PINTE
        //AL USUARIO
        return `${tokenrespuesta.token_type} ${tokenrespuesta.access_token}`
    } catch (error) {
        console.error("Error al obtener el token:", error);
    }


}