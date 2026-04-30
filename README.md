# 🍞 Panadería Web - Sistema de Gestión de Producción

Sistema profesional para gestionar recetas, costos y producción de productos de panadería artesanal.

## 📋 Descripción

Este proyecto es un conjunto de calculadoras web que permiten:
- Calcular costos de producción por unidad
- Obtener listas de ingredientes según cantidad deseada
- Copiar los resultados al portapapeles
- Visualizar información en dispositivos móviles y escritorio
- Administrar precios de ingredientes desde un panel sencillo

## 🚀 Sitio Web

El sistema está disponible en:  
[https://panaderia-web.github.io/](https://panaderia-web.github.io/)

### Accesos principales

| Recurso | URL |
|---------|-----|
| Página de inicio | `https://panaderia-web.github.io/home.html` |
| Menú de calculadoras | `https://panaderia-web.github.io/` |
| Panel de administración | `https://panaderia-web.github.io/admin.html` |

## 📁 Estructura del Proyecto

## 🛠️ Tecnologías Utilizadas

| Tecnología | Uso |
|------------|-----|
| HTML5 | Estructura de las páginas |
| CSS3 | Estilos y diseño responsive |
| JavaScript | Lógica de cálculos e interactividad |
| JSON | Base de datos de precios |
| GitHub Pages | Hosting gratuito |

## 📊 Productos Disponibles (14)

| # | Producto | Calculadora |
|---|----------|-------------|
| 1 | Pan Campesino | [Ver](https://panaderia-web.github.io/calculadoras/pan-campesino/) |
| 2 | Pan Francés | [Ver](https://panaderia-web.github.io/calculadoras/pan-frances/) |
| 3 | Pan Canilla | [Ver](https://panaderia-web.github.io/calculadoras/pan-canilla/) |
| 4 | Pan Hamburguesa | [Ver](https://panaderia-web.github.io/calculadoras/pan-hamburguesa/) |
| 5 | Pan Perro Caliente | [Ver](https://panaderia-web.github.io/calculadoras/pan-perro-caliente/) |
| 6 | Pan Andino | [Ver](https://panaderia-web.github.io/calculadoras/pan-andino/) |
| 7 | Pan Piñita | [Ver](https://panaderia-web.github.io/calculadoras/pan-pinita/) |
| 8 | Paledonia | [Ver](https://panaderia-web.github.io/calculadoras/paledonia/) |
| 9 | Catalinas Negras | [Ver](https://panaderia-web.github.io/calculadoras/catalinas-negras/) |
| 10 | Catalinas Amarillas | [Ver](https://panaderia-web.github.io/calculadoras/catalinas-amarillas/) |
| 11 | Torta de Naranja | [Ver](https://panaderia-web.github.io/calculadoras/torta-naranja/) |
| 12 | Arepas de Trigo | [Ver](https://panaderia-web.github.io/calculadoras/arepas-trigo/) |
| 13 | Arepas de Maíz | [Ver](https://panaderia-web.github.io/calculadoras/arepas-maiz/) |
| 14 | Galletas de Huevo | [Ver](https://panaderia-web.github.io/calculadoras/galletas-huevo/) |

## 📝 Cómo Actualizar Precios

### Opción 1: Panel de Administración (Recomendado)

1. Ve al panel: `https://panaderia-web.github.io/admin.html`
2. Ingresa la clave: `1234` (en la página de inicio)
3. Modifica los precios directamente en la tabla
4. Haz clic en "Guardar todos los cambios"

### Opción 2: Editar JSON directamente

1. Ve al archivo: `https://github.com/panaderia-web/panaderia-web.github.io/blob/main/assets/datos/precios.json`
2. Haz clic en el lápiz de edición
3. Modifica los valores de `precioKg`
4. Guarda los cambios (Commit changes)

### Formato del JSON:

```json
[
    { "nombre": "Harina", "precioKg": 1.26 },
    { "nombre": "Azucar", "precioKg": 1.60 },
    { "nombre": "Huevos", "precioKg": 6.70 }
]

👨‍🍳 Autor
Fernando Araujo
Sistema de Gestión de Panadería Artesanal
