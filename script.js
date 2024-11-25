// script.js
// á → \u00e1
// é → \u00e9
// í → \u00ed
// ó → \u00f3
// ú → \u00fa
// ñ → \u00f1

// Quita la "prueba de colores" al inicio de la página, dejando solo al crear paletas
document.addEventListener("DOMContentLoaded", () => {
    // Seleccionamos las secciones y botones
    const roomSection = document.getElementById("room");
    const testColorsSection = document.getElementById("test-colors-section");
    const controlsSection = document.getElementById("controls");
    const generatePalettesButton = document.getElementById("generate-btn");
    const applyColorButton = document.getElementById("apply-color");

    // Inicialmente ocultamos las secciones
    roomSection.style.display = "none";
    testColorsSection.style.display = "none";
    controlsSection.style.display = "none";

    // Mostrar las secciones cuando se haga clic en el botón "Generar Paletas"
    generatePalettesButton.addEventListener("click", () => {
        roomSection.style.display = "block"; // Mostrar sección "room"
        testColorsSection.style.display = "block"; // Mostrar sección "test-colors-section"
        controlsSection.style.display = "block"; // Mostrar sección "controls"
    });

    // Aplicar color al objeto seleccionado
    applyColorButton.addEventListener("click", () => {
        const selectedObjectId = document.getElementById("object-select").value;
        const selectedObject = document.getElementById(selectedObjectId);
        const colorValue = document.getElementById("color-input").value;
    });
});


document.getElementById("generate-btn").addEventListener("click", generatePalettes);
document.getElementById("back-btn").addEventListener("click", function () {
    // Oculta las secciones innecesarias
    document.getElementById("room").style.display = "none";
    document.getElementById("test-colors-section").style.display = "none";
    document.getElementById("controls").style.display = "none";

    // Asegúrate de que la sección de ideas permanezca visible
    document.getElementById("ideas-section").style.display = "block";
    document.getElementById("intro-gif").style.display = "block";

    document.querySelector("main").classList.add("visible");

});

//Oculta el gif en la generación de paletas
document.getElementById("generate-btn").addEventListener("click", function () {
    const introGif = document.getElementById("intro-gif");
    introGif.style.display = "none"; // Oculta el GIF

});


// Desplazamiento suave a la sección de FAQ
document.getElementById("faq-btn").addEventListener("click", openFAQ);

// Función para abrir el modal FAQ
function openFAQ() {
    document.getElementById("faq-modal").style.display = "block";
}

// Función para cerrar el modal FAQ
document.getElementById("close-faq").addEventListener("click", () => {
    document.getElementById("faq-modal").style.display = "none";
});

// Cerrar el modal cuando el usuario haga clic fuera del modal
window.addEventListener("click", (event) => {
    if (event.target == document.getElementById("faq-modal")) {
        document.getElementById("faq-modal").style.display = "none";
    }
});




const generateBtn = document.getElementById('generate-btn');
const backBtn = document.getElementById('back-btn');
const palettes = document.getElementById('palettes');

// Mostrar la sección para probar colores cuando se genere una paleta
generateBtn.addEventListener('click', () => {
    // Lógica para generar las paletas (si tienes una función específica, la llamas aquí)
    generatePalettes();

    // Mostrar la sección para probar colores y el botón de regreso al inicio
    backBtn.style.display = 'block';
});

// Ocultar la sección para probar colores al regresar al inicio
backBtn.addEventListener('click', () => {

    // Oculta el botón de regresar
    backBtn.style.display = 'none';

    // Limpia las paletas generadas si es necesario
    palettes.innerHTML = '';
});


function generatePalettes() {
    const baseColor = document.getElementById("color-picker").value;
    const palettesContainer = document.getElementById("palettes");

    // Ocultar la sección de ideas y mostrar el botón de regreso
    document.getElementById("ideas-section").style.display = 'none';
    document.getElementById("back-btn").style.display = 'inline-block';

    const room = document.getElementById("room");
    room.style.display = 'block';

    // Limpiar el contenedor de paletas antes de generar nuevas paletas
    palettesContainer.innerHTML = '';

    const palettes = {
        'Monocrom\u00e1tica': chroma.scale([baseColor, chroma(baseColor).darken(3)]).colors(5),
        'Complementaria': [baseColor, chroma(baseColor).set('hsl.h', '+180').hex()],
        'An\u00e1loga': chroma.scale([chroma(baseColor).set('hsl.h', '-30'), baseColor, chroma(baseColor).set('hsl.h', '+30')]).colors(3),
        'Tri\u00e1dica': [baseColor, chroma(baseColor).set('hsl.h', '+120').hex(), chroma(baseColor).set('hsl.h', '-120').hex()]
    };

    for (const [name, colors] of Object.entries(palettes)) {
        const categoryContainer = document.createElement("div");
        categoryContainer.classList.add("category-container");

        const categoryTitle = document.createElement("h2");
        categoryTitle.textContent = name;

        const colorContainer = document.createElement("div");
        colorContainer.classList.add("color-container");

        colors.forEach(color => {
            const paletteCard = document.createElement("div");
            paletteCard.classList.add("palette-card");

            const colorBlock = document.createElement("div");
            colorBlock.classList.add("color-block");
            colorBlock.style.backgroundColor = color;

            const colorInfo = document.createElement("div");
            colorInfo.classList.add("color-info");

            // Mostrar el código hexadecimal debajo del color
            const colorHex = document.createElement("span");
            colorHex.classList.add("color-hex");
            colorHex.textContent = color; // Mostrar el código hex en la tarjeta

            // Crear el botón para copiar el código hexadecimal
            const copyCode = document.createElement("span");
            copyCode.classList.add("copy-code");
            copyCode.textContent = "Copiar HEX";
            copyCode.addEventListener("click", () => copyToClipboard(color));

            // Añadir el código hexadecimal y el botón de copiar al contenedor de información
            colorInfo.appendChild(colorHex);  // Primero el código hexadecimal
            colorInfo.appendChild(copyCode); // Luego el botón de copiar

            // Añadir los elementos al card
            paletteCard.appendChild(colorBlock);
            paletteCard.appendChild(colorInfo);

            // Añadir la tarjeta al contenedor de colores
            colorContainer.appendChild(paletteCard);
        });

        // Añadir el título y los colores a la categoría
        categoryContainer.appendChild(categoryTitle);
        categoryContainer.appendChild(colorContainer);
        palettesContainer.appendChild(categoryContainer);
    }
}

// Función para copiar el código hexadecimal al portapapeles
function copyToClipboard(color) {
    navigator.clipboard.writeText(color).then(() => {
        alert("Código copiado: " + color);
    });
}

function goBackToHome() {
    // Regresar a la página inicial
    document.getElementById("ideas-section").style.display = 'block';
    document.getElementById("back-btn").style.display = 'none';
    document.getElementById("palettes").innerHTML = '';
}


// Referencias a elementos del DOM
const objectSelect = document.getElementById('object-select');
const colorInput = document.getElementById('color-input');
const applyColorButton = document.getElementById('apply-color');

// Función para validar códigos HEX
function isValidHex(color) {
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    return hexRegex.test(color);
}

// Aplica el color ingresado al objeto seleccionado
function applyColor() {
    const selectedObject = objectSelect.value; // Obtén el objeto seleccionado
    const inputColor = colorInput.value.trim(); // Obtén y limpia el color ingresado

    if (isValidHex(inputColor)) {
        const targetElement = document.getElementById(selectedObject);
        if (targetElement) {
            targetElement.style.backgroundColor = inputColor;
        }
    } else {
        alert('Por favor, ingresa un código hexadecimal válido. Ejemplo: #FF5733');
    }
}

// Evento de clic para aplicar el color
applyColorButton.addEventListener('click', applyColor);
