// FUNCIONES DEL JUEGO
function esValido(x) {
    return !isNaN(x) && x > 1;
}

function showResult(prediccion) {
    const resultado = document.getElementById('resultado');
    if (resultado) {
        resultado.innerText = 'He ganado! Tu número es ' + prediccion + '!';
        document.getElementById('juego').style.display = 'none'; // Ocultar el div de juego
    }
}

function numeroAleatorioEntre(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function adivinaElNumero(x) {
    let limiteInferior = 1;
    let limiteSuperior = x;
    let prediccion = 0;

    function hacerPrediccion() {
        prediccion = numeroAleatorioEntre(limiteInferior, limiteSuperior);
        document.getElementById('prediccion').innerText = `Mi predicción es ${prediccion}.`;
    }

    document.getElementById('alto').onclick = function() {
        limiteSuperior = prediccion - 1;
        hacerPrediccion();
    };

    document.getElementById('bajo').onclick = function() {
        limiteInferior = prediccion + 1;
        hacerPrediccion();
    };

    document.getElementById('correcto').onclick = function() {
        showResult(prediccion);
    };

    hacerPrediccion();
    document.getElementById('juego').style.display = 'block';
}

// FUNCIONES DEL DOM
const createTitulo = (texto) => {
    const tituloH1 = document.createElement("h1");
    tituloH1.id = "titulo";
    tituloH1.textContent = texto;
    document.body.appendChild(tituloH1);
};

const createParrafo = (texto) => {
    const parrafo = document.createElement("p");
    parrafo.textContent = texto;
    return parrafo; // Cambiar para retornar el párrafo
};

const createEtiqueta = (forAttribute, texto) => {
    const label = document.createElement("label");
    label.setAttribute("for", forAttribute);
    label.textContent = texto;
    document.body.appendChild(label);
};

const createEntrada = (id, min) => {
    const input = document.createElement("input");
    input.setAttribute("type", "number");
    input.setAttribute("id", id);
    input.setAttribute("min", min);
    document.body.appendChild(input);
};

const createBtn = (texto, id) => {
    const btn = document.createElement("button");
    btn.textContent = texto;
    if (id) btn.setAttribute("id", id);
    return btn; // Cambiar para retornar el botón
};

const createDivJuego = () => {
    // Crear el div
    const div = document.createElement("div");
    div.id = "juego";
    div.style.display = "none";

    // Crear y agregar el párrafo usando createParrafo
    const parrafo = createParrafo("");
    parrafo.id = "prediccion";
    div.appendChild(parrafo);

    // Crear y agregar los botones usando createBtn
    const botones = [
        { texto: "Muy alto", id: "alto" },
        { texto: "Muy bajo", id: "bajo" },
        { texto: "Correcto", id: "correcto" }
    ];

    botones.forEach(btnInfo => {
        const btn = createBtn(btnInfo.texto, btnInfo.id);
        div.appendChild(btn);
    });

    // Crear y agregar el resultado
    const resultado = createParrafo("");
    resultado.id = "resultado";
    div.appendChild(resultado);

    // Agregar el div al body
    document.body.appendChild(div);
};

// Inicializar la interfaz
createTitulo('Juego de Adivinanzas'); // Crear h1
createParrafo('Piensa en un número entre 1 y el número que elijas, y yo trataré de adivinarlo.'); // Crear párrafo
createEtiqueta("limite", "Ingresa el límite superior"); // Crear etiqueta
createEntrada("limite", "2"); // Crear input
const comenzarBtn = createBtn('COMENZAR', 'comenzar'); // Crear botón
document.body.appendChild(comenzarBtn); // Agregar botón al body

// Crear DivJuego
createDivJuego();

// Añadir evento al botón "COMENZAR"
document.getElementById('comenzar').onclick = function() {
    const limite = parseInt(document.getElementById('limite').value, 10);
    if (esValido(limite)) {
        adivinaElNumero(limite);
    } else {
        alert('Por favor, ingresa un número mayor a 1.');
    }
};


