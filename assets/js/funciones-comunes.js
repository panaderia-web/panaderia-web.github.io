// ============================================
// FUNCIONES COMPARTIDAS - PANADERÍA WEB
// ============================================

const WEB_APP_URL = "/assets/datos/precios.json";

async function sincronizarPrecios() {
    try {
        const response = await fetch(WEB_APP_URL);
        const data = await response.json();
        
        window.datosProducto.items.forEach(ing => {
            const nombreBuscar = ing.nombre === "Margarina" ? "margarina" : ing.nombre.toLowerCase();
            const encontrado = data.find(p => p.nombre.toLowerCase().trim() === nombreBuscar);
            if (encontrado) {
                ing.precioKg = encontrado.precioKg;
            }
        });
        calcular(); 
    } catch (error) {
        console.error("Error al cargar precios:", error);
        calcular();
    }
}

function calcular() {
    const panes = parseFloat(document.getElementById('inputPanes').value) || 0;
    const contenedor = document.getElementById('listaIngredientes');
    contenedor.innerHTML = '';

    let masaTotal = 0;
    let costoTotal = 0;

    window.datosProducto.items.forEach(ing => {
        const gramos = (window.datosProducto.harinaPorUnidad * panes) * (ing.pct / 100);
        const divisor = (ing.nombre === "Huevos") ? 1500 : 1000;
        const costo = (gramos / divisor) * ing.precioKg;

        masaTotal += gramos;
        costoTotal += costo;

        contenedor.innerHTML += `
            <div class="ingredient-item">
                <div>
                    <span class="ingredient-name">${ing.nombre}</span>
                    <span class="ingredient-percent">(${ing.pct}%)</span>
                </div>
                <div class="ingredient-details">
                    <div class="ingredient-quantity">${gramos.toFixed(1)} g</div>
                    <div class="ingredient-price">$ ${costo.toFixed(3)}</div>
                </div>
            </div>
        `;
    });

    document.getElementById('resMasa').innerText = `${masaTotal.toFixed(0)} g`;
    document.getElementById('resCosto').innerText = `$ ${costoTotal.toFixed(2)}`;
}

function copiarAlPortapapeles() {
    const panes = document.getElementById('inputPanes').value;
    const masaTotalStr = document.getElementById('resMasa').innerText;
    const costoTotalStr = document.getElementById('resCosto').innerText;

    let textoCopiar = `${window.datosProducto.nombre.toUpperCase()}\n`;
    textoCopiar += `━━━━━━━━━━━━━━━━\n`;
    textoCopiar += `Cantidad: ${panes} unidad(es)\n`;
    textoCopiar += `Costo insumos: ${costoTotalStr}\n`;
    textoCopiar += `Masa total: ${masaTotalStr}\n`;
    textoCopiar += `━━━━━━━━━━━━━━━━\n`;
    textoCopiar += `LISTA DE INSUMOS:\n\n`;

    window.datosProducto.items.forEach(ing => {
        const gramos = (window.datosProducto.harinaPorUnidad * panes) * (ing.pct / 100);
        textoCopiar += `${ing.nombre}: ${gramos.toFixed(1)} g\n`;
    });

    textoCopiar += `\n━━━━━━━━━━━━━━━━\n`;
    textoCopiar += `Fernando Araujo`;

    navigator.clipboard.writeText(textoCopiar).then(() => {
        const messageEl = document.getElementById('copyMessage');
        messageEl.style.display = 'block';
        setTimeout(() => {
            messageEl.style.display = 'none';
        }, 2000);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('inputPanes').addEventListener('input', calcular);
    sincronizarPrecios();
});
