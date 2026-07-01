const API_URL = "https://rickandmortyapi.com/api/character";

const botonTodos = document.getElementById("btn-todos");
const formFiltros = document.getElementById("form-filtros");
const listaPersonajes = document.getElementById("lista-personajes");
const mensaje = document.getElementById("mensaje");

botonTodos.addEventListener("click", function () {
    pedirPersonajes(API_URL);
});

formFiltros.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nombre = document.getElementById("name").value.trim();
    const estado = document.getElementById("status").value.trim();
    const especie = document.getElementById("species").value.trim();
    const tipo = document.getElementById("type").value.trim();
    const genero = document.getElementById("gender").value.trim();

    const filtros = new URLSearchParams();

    if (nombre !== "") {
        filtros.append("name", nombre);
    }

    if (estado !== "") {
        filtros.append("status", estado);
    }

    if (especie !== "") {
        filtros.append("species", especie);
    }

    if (tipo !== "") {
        filtros.append("type", tipo);
    }

    if (genero !== "") {
        filtros.append("gender", genero);
    }

    let url = API_URL;

    if (filtros.toString() !== "") {
        url = API_URL + "?" + filtros.toString();
    }

    pedirPersonajes(url);
});

async function pedirPersonajes(url) {
    listaPersonajes.innerHTML = "";
    mostrarMensaje("Cargando personajes...", "");

    try {
        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            throw new Error("Error en la request");
        }

        const datos = await respuesta.json();
        mostrarPersonajes(datos.results);
        mostrarMensaje("Se encontraron " + datos.results.length + " personajes.", "exito");
    } catch (error) {
        listaPersonajes.innerHTML = "";
        mostrarMensaje("No se pudieron obtener resultados. Revisa los filtros ingresados.", "error");
    }
}

function mostrarPersonajes(personajes) {
    for (let i = 0; i < personajes.length; i++) {
        const personaje = personajes[i];
        const tipo = personaje.type !== "" ? personaje.type : "Sin tipo";

        listaPersonajes.innerHTML += `
            <article class="card-personaje">
                <img src="${personaje.image}" alt="${personaje.name}">

                <div class="card-contenido">
                    <span class="estado ${personaje.status.toLowerCase()}">${personaje.status}</span>
                    <h3>${personaje.name}</h3>

                    <div class="datos-personaje">
                        <p><span>Especie:</span> ${personaje.species}</p>
                        <p><span>Tipo:</span> ${tipo}</p>
                        <p><span>Genero:</span> ${personaje.gender}</p>
                        <p><span>Origen:</span> ${personaje.origin.name}</p>
                        <p><span>Ubicacion:</span> ${personaje.location.name}</p>
                    </div>
                </div>
            </article>
        `;
    }
}

function mostrarMensaje(texto, tipo) {
    mensaje.textContent = texto;
    mensaje.className = "mensaje";

    if (tipo !== "") {
        mensaje.classList.add(tipo);
    }
}
