
## 🛠️ Tecnologías Utilizadas

| Tecnología | Uso |
|------------|-----|
| HTML5 | Estructura de las páginas |
| CSS3 | Estilos y diseño responsive |
| JavaScript | Lógica de cálculos e interactividad |
| JSON | Base de datos de precios |
| GitHub Pages | Hosting gratuito |

## 📊 Cómo Actualizar Precios

Los precios se almacenan en `assets/datos/precios.json`. Para actualizar:

1. Ve al archivo:  
   `https://github.com/panaderia-web/panaderia-web.github.io/blob/main/assets/datos/precios.json`

2. Haz clic en el lápiz de edición

3. Modifica los valores de `precioKg`

4. Guarda los cambios (Commit changes)

### Formato del JSON:

```json
[
    { "nombre": "Harina", "precioKg": 1.26 },
    { "nombre": "Agua", "precioKg": 0.10 },
    { "nombre": "Huevos", "precioKg": 3.20 }
]
