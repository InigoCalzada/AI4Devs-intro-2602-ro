PROMT 1:
  eres un experto en creación de promt. crea el mejor promt para la creación de esta tarea: Crea una página web con lógica en javascript que invierta el orden de una cadena de texto.
  Ejemplo: si introduzco AI4Devs devuelve sveD4IA.
  Hazlo apoyado en el seed index.html y script.js que proporcionamos dentro de la carpeta template

PROMT 2:
# Rol
Eres un desarrollador frontend experto en HTML5, CSS3 y JavaScript vanilla.

# Objetivo
Crea una página web funcional que invierta el orden de una cadena de texto 
introducida por el usuario.
Tendra dos opciones distintas para hacer este objetivo. En primer lugar el "for loop" y por otro lado el "built-in". con "for loop"" tendremos que esperar a que le demos al boton de "Reverse String". Este boton solo aparecera cuando tengamos mas de tres lestras en el texto que escribimos. Y si tenemos "built-in" seleccionado. segun escribamos ira realizando la tarea sin depender de ningun botn, funcionara a tiempo real el reverse del texto.

# Ejemplo de comportamiento esperado
- Input:  "AI4Devs"
- Output: "sveD4IA"

# Archivos seed (estructura base obligatoria)
Debes respetar y extender los archivos existentes en la carpeta /template:
- `index.html` → estructura base de la página
- `script.js`  → lógica de inversión en JavaScript

# Requisitos funcionales
1. Campo de texto (input) donde el usuario escribe la cadena
2. Botón que dispara la inversión al hacer clic
3. Área visible donde se muestra el resultado invertido
4. La función de inversión debe estar en `script.js` (NO inline en el HTML)
5. Manejar edge cases: campo vacío, espacios, caracteres especiales y emojis

# Requisitos técnicos
- JavaScript puro (sin librerías externas)
- La función de inversión debe llamarse `reverseString(str)`
- Separación clara de responsabilidades: HTML estructura, JS lógica
- El archivo `script.js` debe vincularse al final del `<body>`

# Requisitos de UX/UI
- Diseño limpio, centrado y responsive (funciona en móvil y desktop)
- Feedback visual inmediato al usuario tras invertir
- Placeholder descriptivo en el input con un ejemplo ("Ej: AI4Devs")
- Permitir ejecutar la acción también con la tecla Enter

# Entregables
1. `index.html` completo y funcional
2. `script.js` con la lógica documentada (JSDoc)
3. Breve explicación del algoritmo elegido para invertir la cadena

# Restricciones
- NO usar `.split('').reverse().join('')` como única solución; 
  implementa también una versión con bucle `for` para mostrar 
  comprensión del algoritmo
- NO usar frameworks (React, Vue, etc.)
- NO modificar la estructura de carpetas existente

# CODIGO
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reverse String</title>    
</head>
<body>
<script src="script.js"></script>
</body>
</html>
