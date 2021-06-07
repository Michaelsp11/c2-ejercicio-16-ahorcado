/*
1. Asignar campos del formulario :)
2. Llamar a la API :)
3. Capturar todo el array de palabras de la API :)
4. Escoger una aleatoria y capturarla :)
5. Hacer funcion para pintar cada letra en cada li
6. Hacer el evento para escuchar el boton del formulario
7. Recoger el value del input
8. Llamar a una función en la que enviamos nuestra letra y llamaremos a la palabra escogida
9. Meter la palabra escogida en un split
10. Recorrer la palabra,
*/
// Constantes API
const jsonServer = "http://localhost:3001/";
const apartado = "palabras";
// Elementos DOM
const letrasElemento = document.querySelector(".letras");
const letraDummy = letrasElemento.querySelector(".letra-dummy");
const elementoFormularioLetras = document.querySelector(".formulario-letras");
const inputLetra = elementoFormularioLetras.querySelector(".letra-escrita");
const btnEnviarLetra = elementoFormularioLetras.querySelector(".btn-enviar");
const llamarAPI = () => {
    fetch(`${jsonServer}${apartado}`)
        .then((response) => response.json())
        .then((objetoLista) => generarPalabraAleatoria(objetoLista))
        .catch((error) => error.message);
};
const generarPalabraAleatoria = (objetoLista) => {
    const { lista } = objetoLista;
    const palabraAleatoria = lista[Math.floor(Math.random() * lista.length)];
    pintarPalabraInvisible(palabraAleatoria);
};
const pintarPalabraInvisible = (palabraAleatoria) => {
    const letrasPalabra = palabraAleatoria.split("");
    for (const letra of letrasPalabra) {
        const letraNueva = letraDummy.cloneNode(true);
        letraNueva.classList.remove("letra-dummy");
        const textoLetraNueva = letraNueva.querySelector(".texto");
        textoLetraNueva.textContent = letra;
        letrasElemento.append(letraNueva);
    }
};
llamarAPI();
