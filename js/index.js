// Obtener elementos del DOM
let agregarInput = document.getElementById("agregarinput");
let agregarButton = document.getElementById("agregarButton");
let lista = document.getElementById("Tu_lista");
let eliminarInput = document.getElementById("eliminarinput");
let eliminarButton = document.getElementById("eliminarButton");
let guardarButton = document.getElementById("guardarButton");
let eliminarListaButton = document.getElementById("eliminarListaButton");

// Cargar las tareas que están en el localStorage
let arraytarea = JSON.parse(localStorage.getItem("arraytarea")) || [];

// Funciones
function mostrar() {
    lista.innerHTML = "";
    arraytarea.forEach(elemento => {
        let nuevoli = document.createElement("li");
        nuevoli.textContent = elemento;
        lista.append(nuevoli);
    });
}

function guardarlocal() {
    localStorage.setItem("arraytarea", JSON.stringify(arraytarea));

    //para cambiar el texto a "guardado" por unos segundos
        guardarButton.textContent = "Guardado";

     // después de 2 segundos, cambia el texto de vuelta a "Guardar lista"
        setTimeout(function () {
            guardarButton.textContent = "Guardar lista";
        }, 2000);
}

// Eventos
agregarButton.addEventListener('click', function () {
    if (agregarInput.value !== "") {
        arraytarea.push(agregarInput.value);
        agregarInput.value = "";
        mostrar();
    }
});

eliminarButton.addEventListener('click', function () {
    let verificar = eliminarInput.value;
    let index = arraytarea.indexOf(verificar);
    if (index !== -1) {
        arraytarea.splice(index, 1);
        eliminarInput.value = "";
        mostrar();
    } else {
        alert("Ingresa un elemento válido");
        eliminarInput.value = "";
    }
});

eliminarListaButton.addEventListener('click', function () {
    localStorage.removeItem("arraytarea"); // Remueve el array del localStorage
    arraytarea = []; // Vacía el array en la sesión actual
    mostrar();

    eliminarListaButton.textContent = "Eliminado";

    setTimeout(function () {
    eliminarListaButton.textContent = "Eliminar Lista";
    }, 2000);
});

// al presionar el guardar se guardara en el localStorage
guardarButton.addEventListener("click", guardarlocal);

// Mostrar tareas al cargar la página
window.addEventListener('load', mostrar);
