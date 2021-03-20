const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
})

function buscarClima(e) {
    e.preventDefault();

    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if (ciudad === '' || pais === '') {
        mostrarError('Ambos campos son necesarios');
        return;
    }

    consultarApi(ciudad, pais);
};

function mostrarError(mensaje) {
    const error = document.querySelector('#error');
    error.innerHTML = `ERROR !! <br> ${mensaje}`
    error.classList.add('alert-toast')
    error.classList.remove('hidden')
    setTimeout(() => {
        error.classList.add('hidden')
    }, 4500);
}

function consultarApi(ciudad, pais) {
    const appId = 'a6fcaa65cc6b57f04ab4906aeed1dda5';
    url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}, ${pais}&appid=${appId}`;
    
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {

            if (datos.cod === "404") {
                mostrarError('Ciudad no encontrada');
                return
            }
            mostrarClima(datos);
        })
};

function mostrarClima(datos) {
    spinner();
    limpiarHTML();
    const {
        name,
        main: {
            temp,
            temp_max,
            temp_min
        }
    } = datos;

    const centigrados = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);

    const nombreCiudad = document.createElement('p');
    nombreCiudad.classList.add('font-bold', 'text-2xl', 'animate__animated', 'animate__lightSpeedInRight', 'text-indigo-300');
    nombreCiudad.textContent = `Clima en ${name}`;

    const actual = document.createElement('p');
    actual.innerHTML = `Temp. Actual: ${centigrados}&#8451`;
    actual.classList.add('font-bold', 'text-6xl')


    const tempMax = document.createElement('p');
    tempMax.innerHTML = `Max: ${max}&#8451`
    tempMax.classList.add('text-xl', 'text-indigo-200')

    const tempMin = document.createElement('p');
    tempMin.innerHTML = `Min: ${min}&#8451`;
    tempMin.classList.add('text-xl', 'text-indigo-200');
    
    
    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white', 'animate__animated', 'animate__zoomIn');
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMax);
    resultadoDiv.appendChild(tempMin);

    resultado.appendChild(resultadoDiv)
}

const kelvinACentigrados = grados => parseInt(grados - 273.15);

function limpiarHTML() {
    while (resultado.lastChild) {
        resultado.removeChild(resultado.lastChild)
    }
}

function spinner() {

    limpiarHTML();

    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');

    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    `;

    resultado.appendChild(divSpinner);
}