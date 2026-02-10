# Taller construyendo un mundo 🚀🌎
## Nombre del estudiante

- Camilo Andrés Medina Sánchez 
- 🏫 Universidad Nacional De Colombia 🏫
- 💻Ingeniería de sistemas y compuitación💻

## Fecha de entrega
`2026-02-DD`

---

## Descripción breve

Explicación clara del objetivo del taller y lo que se desarrolló. Describe en 2-3 párrafos qué se pretendía explorar, aplicar o construir, y qué se logró implementar.

---


## Implementaciones

Describe cada implementación realizada por entorno de desarrollo.

### Python

Descripción de lo implementado en Python, herramientas utilizadas (OpenCV, PyTorch, trimesh, etc.) y funcionalidad lograda.

### Unity

Descripción de lo implementado en Unity, características del proyecto, scripts desarrollados y funcionalidad lograda.

### Three.js / React Three Fiber

Descripción de lo implementado en Three.js o React Three Fiber, componentes creados y funcionalidad lograda.

### Processing

Descripción de lo implementado en Processing (si aplica).

---

## Resultados visuales

Incluye al menos 2 capturas, GIFs o videos por cada implementación. Los archivos deben estar en la carpeta `media/` del proyecto.

### Python - Implementación

![Resultado Python 1](./media/python_resultado_1.gif)

Descripción de lo que muestra la imagen/GIF.

![Resultado Python 2](./media/python_resultado_2.png)

Descripción de lo que muestra la imagen.

### Unity - Implementación

![Resultado Unity 1](./media/unity_resultado_1.gif)

Descripción de lo que muestra el GIF.

### Three.js - Implementación

![Resultado Three.js 1](./media/threejs_resultado_1.gif)

Descripción de lo que muestra el GIF.

---

## Código relevante

Incluye snippets del código más importante o enlaces a los archivos completos.

### Ejemplo de código Python:

```python
import cv2
import numpy as np

# Cargar imagen
image = cv2.imread('input.jpg')

# Aplicar filtro
filtered = cv2.GaussianBlur(image, (5, 5), 0)
```

### Ejemplo de código Unity (C#):

```csharp
void Update() {
    transform.Rotate(Vector3.up * rotationSpeed * Time.deltaTime);
}
```

### Ejemplo de código Three.js:

```javascript
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function Box() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}
```

---

## Prompts utilizados

Lista los prompts utilizados con herramientas de IA generativa durante el desarrollo del taller (si aplica).

### Ejemplos:

```
"Crea un script en Python que detecte bordes usando el algoritmo de Canny"

"Explícame cómo implementar flujo óptico con OpenCV"

"Genera un shader básico en GLSL para efecto de ondas"
```

Si no utilizaste IA generativa, indica: "No se utilizaron prompts de IA en este taller."

---

## Aprendizajes y dificultades

Reflexión personal sobre el proceso de desarrollo del taller en 2-3 párrafos.

### Aprendizajes

¿Qué aprendiste o reforzaste con este taller? ¿Qué conceptos técnicos quedaron más claros?

### Dificultades

¿Qué parte fue más compleja o desafiante? ¿Cómo lo resolviste?

### Mejoras futuras

¿Qué mejorarías o qué aplicarías en futuros proyectos?

---

## Contribuciones grupales (si aplica)

Si el taller fue realizado en grupo, describe exactamente lo que tú hiciste:

```markdown
- Programé el detector de características SIFT en Python
- Implementé la interfaz de usuario en Three.js
- Generé los GIFs y documentación del README
- Realicé las pruebas de rendimiento y optimización
```

Si fue individual, indica: "Taller realizado de forma individual."

---

## Estructura del proyecto

```
semana_01_1_construyendo_mundo_3d/
├── python/          # Código Python (si aplica)
├── unity/           # Proyecto Unity (si aplica)
├── threejs/         # Código Three.js/React (si aplica)
├── processing/      # Código Processing (si aplica)
├── media/           # OBLIGATORIO: Imágenes, videos, GIFs
└── README.md        # Este archivo
```

---

## Referencias

Lista las fuentes, tutoriales, documentación o papers consultados durante el desarrollo:

- Documentación oficial de OpenCV: https://docs.opencv.org/
- Tutorial de React Three Fiber: https://docs.pmnd.rs/react-three-fiber/
- Paper: "SIFT: Scale-Invariant Feature Transform" - David Lowe

---

## Checklist de entrega

- [ ] Carpeta con nombre `semana_XX_Y_nombre_taller`
- [ ] Código limpio y funcional en carpetas por entorno
- [ ] GIFs/imágenes incluidos con nombres descriptivos en carpeta `media/`
- [ ] README completo con todas las secciones requeridas
- [ ] Mínimo 2 capturas/GIFs por implementación
- [ ] Commits descriptivos en inglés
- [ ] Repositorio organizado y público

---



