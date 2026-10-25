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

    let totalMasa = 0;
    let totalRelleno = 0;
    let costoTotal = 0;

    // 1. Calcular el peso base de la masa (solo ingredientes que NO son relleno)
    let pesoMasaPorUnidad = 0;
    window.datosProducto.items.forEach(ing => {
        if (!ing.esRelleno) {
            pesoMasaPorUnidad += (window.datosProducto.harinaPorUnidad * (ing.pct / 100));
        }
    });

    // 2. Generar la lista
    let grupoActual = "";

    window.datosProducto.items.forEach(ing => {
        // Encabezados de grupo
        if (ing.grupo && ing.grupo !== grupoActual) {
            grupoActual = ing.grupo;
            let claseGrupo = grupoActual.toLowerCase() === 'relleno' ? 'grupo-relleno' : 'grupo-masa';
            contenedor.innerHTML += `<div class="grupo-header ${claseGrupo}">${grupoActual}</div>`;
        }

        // Lógica de cálculo: Si es relleno, la base es el peso de la masa.
        let baseCalculo = (window.datosProducto.harinaPorUnidad * panes);
        if (ing.esRelleno) {
            baseCalculo = pesoMasaPorUnidad * panes;
        }

        const gramos = baseCalculo * (ing.pct / 100);
        const divisor = (ing.nombre === "Huevos" || ing.nombre === "Huevo") ? 1500 : 1000;
        const costo = (gramos / divisor) * ing.precioKg;

        // Acumular pesos
        if (ing.esRelleno) {
            totalRelleno += gramos;
        } else {
            totalMasa += gramos;
        }
        costoTotal += costo;

        let claseItem = ing.esRelleno ? 'item-relleno' : 'item-masa';

        contenedor.innerHTML += `
            <div class="ingredient-item ${claseItem}">
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

    const granTotal = totalMasa + totalRelleno;

    // 3. Actualizar la interfaz (Soporta tanto 1 como 3 tarjetas)
    const elMasa = document.getElementById('resMasa');
    const elRelleno = document.getElementById('resRelleno');
    const elTotal = document.getElementById('resTotal');

    if (elTotal) {
        // Es la calculadora de Pan de Jamón (tiene 3 tarjetas)
        if (elMasa) elMasa.innerText = `${totalMasa.toFixed(1)} g`;
        if (elRelleno) elRelleno.innerText = `${totalRelleno.toFixed(1)} g`;
        elTotal.innerText = `${granTotal.toFixed(1)} g`;
    } else if (elMasa) {
        // Son las calculadoras normales (solo 1 tarjeta)
        elMasa.innerText = `${granTotal.toFixed(1)} g`;
    }

    document.getElementById('resCosto').innerText = `$ ${costoTotal.toFixed(2)}`;
}

function copiarAlPortapapeles() {
    const panes = document.getElementById('inputPanes').value;
    const costoTotalStr = document.getElementById('resCosto').innerText;
    
    // Obtener el peso total dependiendo del tipo de calculadora
    let pesoTotalStr = "0 g";
    if (document.getElementById('resTotal')) {
        pesoTotalStr = document.getElementById('resTotal').innerText;
    } else if (document.getElementById('resMasa')) {
        pesoTotalStr = document.getElementById('resMasa').innerText;
    }

    let textoCopiar = `${window.datosProducto.nombre.toUpperCase()}\n`;
    textoCopiar += `━━━━━━━━━━━━━━━━\n`;
    textoCopiar += `Cantidad: ${panes} unidad(es)\n`;
    textoCopiar += `Costo insumos: ${costoTotalStr}\n`;
    textoCopiar += `Peso total: ${pesoTotalStr}\n`;
    textoCopiar += `━━━━━━━━━━━━━━━━\n`;
    textoCopiar += `LISTA DE INSUMOS:\n\n`;

    let grupoActual = "";
    let pesoMasaPorUnidad = 0;
    window.datosProducto.items.forEach(ing => {
        if (!ing.esRelleno) pesoMasaPorUnidad += (window.datosProducto.harinaPorUnidad * (ing.pct / 100));
    });

    window.datosProducto.items.forEach(ing => {
        if (ing.grupo && ing.grupo !== grupoActual) {
            grupoActual = ing.grupo;
            textoCopiar += `*${grupoActual.toUpperCase()}*\n`;
        }
        
        let baseCalculo = (window.datosProducto.harinaPorUnidad * panes);
        if (ing.esRelleno) baseCalculo = pesoMasaPorUnidad * panes;
        
        const gramos = baseCalculo * (ing.pct / 100);
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
