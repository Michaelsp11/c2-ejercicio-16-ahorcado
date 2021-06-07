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
const elementoMensajeError = document.querySelector(".mensaje");
const btnEnviarLetra = elementoFormularioLetras.querySelector(".btn-enviar");
const hangman = document.querySelector("#hangman");
const partesMunyeco = hangman.querySelectorAll(".stage");
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
  for (const indice in letrasPalabra) {
    const letraNueva = letraDummy.cloneNode(true);
    letraNueva.classList.remove("letra-dummy");
    letraNueva.dataset.position = +indice + 1;
    const textoLetraNueva = letraNueva.querySelector(".texto");
    textoLetraNueva.textContent = letrasPalabra[indice];
    letrasElemento.append(letraNueva);
  }
  letraDummy.remove();
};
elementoFormularioLetras.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const inputLetra = elementoFormularioLetras.querySelector(".letra-escrita");
  if (!comprobarLetra(inputLetra.value)) {
    elementoMensajeError.textContent = "Solamente se puede enviar una letra!";
  } else {
    elementoMensajeError.textContent = "";
    if (!contieneLetra(inputLetra.value)) {
      if (!pintarMunyeco()) {
        elementoMensajeError.textContent = "Final de la partida, has perdido.";
        inputLetra.disabled = true;
        btnEnviarLetra.disabled = true;
      }
    } else if (noHayMasLetras()) {
      elementoMensajeError.classList.add("win");
      elementoMensajeError.textContent = "Final de la partida, has ganado.";
      inputLetra.disabled = true;
      btnEnviarLetra.disabled = true;
    }
  }
  inputLetra.value = "";
});
const comprobarLetra = (valor) => {
  valor = valor.replace(/[.,:;()_?¿!¡-\s]/g);
  if (valor.length > 0 && valor.length < 2 && isNaN(valor)) {
    return true;
  }
  return false;
};
const noHayMasLetras = () => {
  let noHayMas = true;
  let contador = 0;
  for (const elementoLetra of letrasElemento.querySelectorAll(".letra")) {
    const elementoTextoLetra = elementoLetra.querySelector(".texto");
    if (elementoTextoLetra.classList.contains("transparente")) {
      if (contador < letrasElemento.querySelectorAll(".letra").length) {
        noHayMas = false;
        break;
      }
    }
    contador++;
  }
  return noHayMas;
};
const contieneLetra = (letra) => {
  let contiene = false;
  letra = letra.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  for (const elementoLetra of letrasElemento.querySelectorAll(".letra")) {
    const elementoTextoLetra = elementoLetra.querySelector(".texto");
    elementoTextoLetra.textContent = elementoTextoLetra.textContent
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    if (elementoTextoLetra.textContent.toLowerCase() === letra.toLowerCase()) {
      elementoTextoLetra.classList.remove("transparente");
      contiene = true;
    }
  }
  return contiene;
};
const pintarMunyeco = () => {
  let munyecoVive = false;
  let contador = 0;
  for (const parteMunyeco of partesMunyeco) {
    if (parteMunyeco.classList.contains("d-none")) {
      parteMunyeco.classList.remove("d-none");
      if (contador < partesMunyeco.length - 1) {
        munyecoVive = true;
        break;
      }
    }
    contador++;
  }
  return munyecoVive;
};
llamarAPI();
