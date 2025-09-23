/*
El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

Tareas específicas:
1. Capturar el valor del campo de entrada: Utilizar document.getElementById o document.querySelector para obtener el texto ingresado por el usuario. OK
2. Validar la entrada: Implementar una validación para asegurarse de que el campo no esté vacío. Si está vacío, mostrar un alert con un mensaje de error: "Por favor, inserte un nombre." OK
3. Actualizar el array de amigos: Si el valor es válido, añadirlo al arreglo que almacena los nombre de amigos usando el método.push(). OK
5. Limpiar el campo de entrada: Después de añadir el nombre, restablecer el campo de texto a una cadena vacía. OK
*/

let listaAmigos = [];
const listaHTML = document.getElementById('listaAmigos');
let resultado = '';

// Agrega amigos al arreglo.
function agregarAmigo() {
    // Consigue el valor del ID HTML "amigo" y quita los espacios que hubiera adelante, atrás y cualquier espacio extra entre medio de dos nombres o más.
    let nuevoNombre = document.getElementById("amigo").value.trim();
    // se asegura de que el nombre no está repetido en el array "listaAmigos" (no diferencia minúsculas de mayúsculas).
    let nombreRepetido = listaAmigos.some(amigo => amigo.toLowerCase() === nuevoNombre.toLowerCase());

    // Si el campo contiene un nombre válido y no se repite en la lista, 1) agregar nombre a la lista de amigos, 2) limpiar campo y 3) agregar nombre amigo a la lista HTML. En caso contrario, tirar alerta.
    if (validarNombre(nuevoNombre) === true && nombreRepetido === false) {
        listaAmigos.push(nuevoNombre);
        limpiarCampo('#amigo');
        console.log(listaAmigos);
        agregarAmigoAListaHTML();
    } else if (nuevoNombre === '') {
        alert('Por favor, ingrese un nombre.');
    } else {
        /* 
        Tira diferentes alertas si 1) el nombre es válido y está repetido y 2) si no está repetido pero tiene carácteres inválidos.
        El mensaje contiene "otro" o "un" dependiendo de si el nombre ingresado está repetido o no se ingresó ninguno, respectivamente.
        */
        alert(`${validarNombre(nuevoNombre) === true && nombreRepetido === true ? 'Nombre repetido.' : 'Carácteres no válidos.'} Por favor, ingrese ${nombreRepetido === true ? 'otro' : 'un'} nombre.`);
        limpiarCampo('#amigo');
    }
}

// Permite agregar nombres con la tecla enter.
document.getElementById('amigo').addEventListener('keydown', function(event) {
    if (event.key == 'Enter') {
        agregarAmigo();
    }
});

// Limpia el valor de un elemento HTML.
function limpiarCampo(id) {
    document.querySelector(id).value = '';
}

// Se asegura de que el nombre solo contenga letras (de cualquier idioma) o números, y espacios si hay más de un nombre.
function validarNombre(nombre) {
    const regex = /^[\p{L}0-9\s]+$/u;
    return regex.test(nombre);
}

/*
Crea una función que recorra el array amigos y agregue cada nombre como un elemento <li> dentro de una lista HTML. Usa innerHTML para limpiar la lista antes de agregar nuevos elementos.

Tareas específicas:
1. Obtener el elemento de la lista: Utilizar document.getElementById() o document.querySelector() para seleccionar la lista donde se mostrarán los amigos. OK = listaHTML
2. Limpiar la lista existente: Establecer lista.innerHTML = "" para asegurarse de que no haya duplicados al actualizar.
3. Iterar sobre el arreglo: Usa un bucle for para recorrer el arreglo amigos y crear elementos de lista (<li>) para cada título.
4. Agregar elementos a la lista: Para cada amigo, crear un nuevo elemento de lista.
*/

// Agrega amigo a la lista HTML.
function agregarAmigoAListaHTML() {
    let ultimoNombre = listaAmigos[listaAmigos.length - 1];
    console.log(ultimoNombre);
    for (let i = 0; i < listaAmigos.length; i++) {
        crearElementoHTML(listaHTML, 'li', ultimoNombre);
        break;
    }
}

// Crea elemento HTML teniendo en cuenta ubicación en relación a otro elemento y agrega un valor.
function crearElementoHTML(ubicacion, elemento, texto) {
        ubicacion.insertAdjacentElement('beforeend', document.createElement(elemento));
        ubicacion.insertAdjacentText('beforeend', texto);
}

// Asigna texto a un elemento HTML.
function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

/* 
Escribe una función que seleccione de manera aleatoria uno de los nombres almacenados en el array amigos. Usa Math.random() y Math.floor() para obtener un índice aleatorio.

Tareas específicas:
1. Validar que haya amigos disponibles: Antes de sortear, comprobar si el array amigos no está vacío. OK
2. Generar un índice aleatorio: Usar Math.random() y Math.floor() para seleccionar un índice aleatorio del arreglo. OK
3. Obtener el nombre sorteado: Utilizar el índice aleatorio para acceder al nombre correspondiente en el arreglo. OK
4. Mostrar el resultado: Actualizar el contenido del elemento de resultado utilizando document.getElementById() e innerHTML para mostrar el amigo sorteado. OK
*/

// Elige un nombre al azar de la lista de amigos.
function sortearAmigo() {
    // Selecciona un número aleatorio del índice de la lista de amigos.
    let indiceAleatorio = Math.floor(Math.random()*listaAmigos.length);
    console.log(indiceAleatorio);
    // Selecciona el nombre que está en esa posición en la lista de amigos y lo guarda como el resultado.
    resultado = listaAmigos[indiceAleatorio];

    // Agrega un elemento HTML con el resultado pero tira alerta si en la lista de amigos hay menos de 2 nombres.
    if (listaAmigos.length > 1) {
        asignarTextoElemento('#mensajeResultado', 'Tu amigo secreto es:');
        asignarTextoElemento('#nombreResultado', resultado);
        console.log(resultado);
    } else {
        alert('Por favor, agregue más nombres.');
    }

}

// Estado inicial del juego.
function condicionesIniciales() {
    // Limpia el input.
    limpiarCampo('#amigo');
    // Lista de amigos vuelve al estado original.
    listaAmigos = [];
    // Se eliminan los elementos dentro de la lista HTML.
    listaHTML.replaceChildren();
    // Resultado vuelve a quedar vacío.
    resultado = '';
    // Se limpian los valores de los elementos HTML encargados del mensaje del resultado.
    asignarTextoElemento('#mensajeResultado', '');
    asignarTextoElemento('#nombreResultado', resultado);
    
}

// Empieza un nuevo juego.
function nuevoSorteo() {
    condicionesIniciales();
}

condicionesIniciales();