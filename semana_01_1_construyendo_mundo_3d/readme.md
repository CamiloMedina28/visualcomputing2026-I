
  

# Taller construyendo un mundo 🚀🌎

  

## Nombre del estudiante

  

  

- Camilo Andrés Medina Sánchez

  

- 🏫 Universidad Nacional De Colombia 🏫

  

- 💻Ingeniería de sistemas y compuitación💻

  

  

## Fecha de entrega

  

`2026-02-20`

  

  

---

  

  

## Descripción breve

  

  

Explicación clara del objetivo del taller y lo que se desarrolló. Describe en 2-3 párrafos qué se pretendía explorar, aplicar o construir, y qué se logró implementar.

  

  

---

  

  

## Implementaciones

  

  

Describe cada implementación realizada por entorno de desarrollo.

  

  

### Python

La visualización de objetos 3d en python se desarrolla con el IDE jupyterlab. A continuación, se indica el proceso de apertura del entorno de desarrollo y la configuración básica que se desarrolla para el funcionamiento.

```powershell

>pip install jupyterlab

>python -m jupyterlab

```

Con esto, se abre en una ventana del navegador predeterminado el IDE. Para proceder con la visualización del modelo.
Como primer paso, se debe desarrollar la importación de la malla que para el caso particular se encuentra en formato .OBJ en el siguiente enlace se puede ver el código utilizado para la [Importación de .OBJ en python con Trimesh.](#importacion_modelo_trimesh)
Ahora bien, se debe acceder al número de vértices, número de caras y el número de aristas. A continuación, se detalla el código para acceder a estas [propiedades.](#acceso_a_propiedades) Ahora bien, se debe comprender la importancia de esta información, por ello, se debe tener en cuenta la ecuación de Euler para mallas cerradas, la cual sigue el enunciado:
$$V- E + F = 2$$
donde: 
- V es el número de vértices
- E es el número de aristas únicas 
- F es el número de caras
En los datos recolectados se evidencia que en la malla seleccionada existen: 
- 24461 vértices
- 48918 caras
- 73377 aristas únicas
Aplicando la formula se obtiene: **$24461 - 73377 + 58918 = 2$**
Lo cual indica que se está trabajando con una malla triangular cerrada sin agujeros, esto es de vital importancia al indicar la consistencia topológica de la estructura, si esta es incorrecta o inapropiada puede darse el caso que algunos algoritmos lleguen a fallar.
Para continuar, se deben resaltar los elementos de la malla, esto con el fin de comprender todos los elementos que la componen, para esto se asignan tres colores diferentes a cada uno de los elementos, siendo estos: 

| **Elemento** | **Color**      |
|--------------|----------------|
| Caras        | Rojo brillante |
| Aristas      | Negro          |
| Vértices     | Cyan           |
Ahora bien, acá se encuentra el [Código](#cambio_color_elementos) para cambiar los colores de la malla y se encuentra la [Visualización final.](#)

  

### Unity

  

  

Descripción de lo implementado en Unity, características del proyecto, scripts desarrollados y funcionalidad lograda.

  

  

### Three.js / React Three Fiber

  

Creación del proyecto base con vite y react fiber.

```powershell

> npm create vite@latest

```

Se despliegan las opciones para seleccionar el framework a utilizar, el lenguaje de programación (variante) e indicar el nombre del proyecto

**Datos básicos del proyecto**

- Project name (Nombre del proyecto): visualizacion_modelos_3d

- Framework: React

- Variant: Javascript

- Vite 8 beta: No

De forma automática, se desarrolla la instalación de paquetes y librerias, si se desarrolla de forma manual, se utiliza el comando

```powershell

> npm install

```

Para proceder, se debe asegurar que existen las dependencias que permiten el desarrollo de la visualización tridimensional, para esto se desarrolla la instalación de las librerías con el comando:

```powershell

> npm i three @react-three/fiber @types/three @react-three/drei

```
Cuando el proyecto ya está configurado, se puede proceder a ejecutar el servidor de desarrollo para visualizar los cambios que se han desarrollado, se muestra el comando necesario para la inicialización del servidor.
```powershell

> npm run dev

```

---

  

  

## Resultados visuales

  

A continuación, se muestran los resultados de la práctica en cada uno de los lenguajes y herramientas utilizadas para la visualización

  

### Python - Implementación

Primera visualización de una malla en formato .obj haciendo uso de python con trimesh

![Resultado Python 1](./media/visualizacion_trimesh_python_1.png)
![Resultado Python 2](./media/elementos_de_la_malla.png)
![Resultado Python 3](./media/render_malla.png)

  

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

En la presente sección se pueden ver los snippets o secciones de código que se han utilizado con el fin de cumplir el propósito del presente taller.

### Ejemplo de código Python:
<a id="importacion_modelo_trimesh"></a>
Importación y visualización con trimesh sencilla de una malla en formato .obj
```python
import trimesh
model = trimesh.load_mesh(r'../media/FinalBaseMesh.obj')
model.show()
```
<a id="acceso_a_propiedades"></a>
Obtención del número de vértices, aristas y caras de un modelo con Trimesh.
```python  
print(f"Vértices: {len(model.vertices)}")
print(f"Caras: {len(model.faces)}")
print(f"Aristas únicas: {len(model.edges_unique)}")
```
<a id="cambio_color_elementos"></a>
Cambio del color de los elementos de la malla con el fin de resaltar cada componente.
```python  
color_caras = [220, 20, 60, 255]
color_aristas = [0, 0, 0, 255]
color_vertices = [0, 200, 255, 255]

model.visual.face_colors = np.tile(
    color_caras,
    (len(model.faces), 1)
)

edges = model.edges_unique
edge_path = trimesh.load_path(model.vertices[edges])

edge_colors = np.tile(
    color_aristas,
    (len(edge_path.entities), 1)
)

edge_path.colors = edge_colors

points = trimesh.points.PointCloud(
    model.vertices,
    colors=color_vertices
)

scene = trimesh.Scene()
scene.add_geometry(model)
scene.add_geometry(edge_path)
scene.add_geometry(points)

scene.show(flags={'lighting': False})
```
### Ejemplo de código Unity (C#):

  

  

```csharp

  

void  Update() {

  

transform.Rotate(Vector3.up * rotationSpeed * Time.deltaTime);

  

}

  

```

  

  

### Ejemplo de código Three.js:

  

  

```javascript

  

import { Canvas } from  '@react-three/fiber'

  

import { OrbitControls } from  '@react-three/drei'

  

  

function  Box() {

  

return (

  

<mesh>

  

<boxGeometry  args={[1, 1, 1]}  />

  

<meshStandardMaterial  color="orange"  />

  

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

├── python/ #

├── unity/

├── threejs/

├── media/

└── README.md

  

```

  

  

---

  

  

## Referencias

  

- Build website with threejs and react: https://medium.com/@wuzsamie/build-website-with-three-js-and-react-three-fiber-488c73e982dd

  
  

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