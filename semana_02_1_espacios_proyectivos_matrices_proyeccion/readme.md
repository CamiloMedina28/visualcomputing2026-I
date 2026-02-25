# Taller Espacios Proyectivos Matrices Proyeccion ✨👩‍🎤

## Nombre del estudiante
- Camilo Andrés Medina Sánchez
- 🏫 Universidad Nacional De Colombia 🏫
- 💻Ingeniería de sistemas y compuitación💻

## Fecha de entrega
`2026-02-27`

---
## Descripción breve

El presente latter tiene como objetivo comprender las diferencias entre los espacios de proyección ortogonal y de perspectiva, a su vez se pretende comprender las incidencias en el uso de matrices de transformación sobre un objeto o modelo en tercera dimensión.

---
## Implementaciones

### Python
Para la implementación en python se hacen uso de las librerias: 
- numpy
- matplotlib

#### Idea general de las matrices de transformación

De forma original, se representan los puntos como una tupla o lista de la siguiente manera 
$$ (x,y,z) $$
Se pretende la aplicación de una matriz de tranformación para que el punto sea normalizado al dividir por un valor $w'$. De modo que pase a ser 
$$ (\frac{x}{w'},\frac{y}{w'},\frac{z}{w'}) $$

#### Transformación haciendo uso de la matriz de proyección ortográfica sobre el plano xy

Se deben multiplicar todos los puntos con esta matriz con el fin de eliminar la coordenada z, de esta forma, tendremos una proyección del modelo 3d en el plano xy.
Como no existe coordenada z, al momento de visualizarla el modelo 3d en unity, threejs o python no se debe distinguir la profundidad.

\[
\begin{bmatrix}
    1 & 0 & 0 & 0   \\
    0 & 1 & 0 & 0   \\
    0 & 0 & 0 & 0   \\
    0 & 0 & 0 & 1   \\
\end{bmatrix}\begin{bmatrix}
    x  \\
    y  \\
    z  \\
    1  \\
\end{bmatrix} = \begin{bmatrix}
    x   \\
    y  \\
    0   \\
    1   \\
\end{bmatrix}
\]

#### Transformación haciendo uso de la matriz de perspectiva

Se deben multiplicar todos los puntos con esta matriz con el fin de eliminar la coordenada z, de esta forma, tendremos una proyección del modelo 3d en el plano xy.
Como no existe coordenada z, al momento de visualizarla el modelo 3d en unity, threejs o python no se debe distinguir la profundidad.

\[
\begin{bmatrix}
    1 & 0 & 0 & 0   \\
    0 & 1 & 0 & 0   \\
    0 & 0 & 1 & 0   \\
    0 & 0 & 1/d & 0   \\
\end{bmatrix}\begin{bmatrix}
    x  \\
    y  \\
    z  \\
    1  \\
\end{bmatrix} = \begin{bmatrix}
    x   \\
    y  \\
    z   \\
    z/d   \\
\end{bmatrix}
\]
De este modo $w' = z/d$. No obstante, no es posible una proyección en un espacio de cuatro dimensiones, por lo que se debe desarrollar la normalización dividiendo por $w'$:

$$x'' = \frac{x}{z/d} = \frac{dx}{z}$$
$$y'' = \frac{dy}{z}$$
$$z'' = \frac{dz}{z} = z$$

De modo que las coordenadas del punto quedan asi:
$$(\frac{dx}{z}, \frac{dy}{z}, d)$$

Como se puede ver en la nueva expresión de las coordenadas, las proyecciones de un objeto 3d que han sido pasado por una transformación de perspectiva dependen del valor de d (distancia focal) y que esto tendra un efecto muy directo sobre la coordenada z.
Esto permite que se genere un efecto de profundidad.


### Three js

La implemenbtación en three js, que es bastante sencilla, busca la creación de tres objetos sencillos, los cuales son.
- Esfera
- Cubo
- Pirámide con base circular
Desde la interfaz hay un botón sencillo que permite alternar entre cada uno de los modos de las cámaras. 
A continuación se [referencia el código que permitió esto](implementacion-threejs).


### Unity
Desde la implementación en únity se plantea la [creación de cinco cubos](#creacion-cubos) alineados en el eje z con el fin de diferenciar las visualización con una cámara en modo perspective y una en modo orthographic.

---  

## Resultados visuales

### Python - Implementación

<a id="Visualización-general"></a>
Visualización de los vértices de la figura elegida en un espacio tridimensional
![Resultado Unity 1](./media/python/visualizacion_3d_cubo.png)

<a id="ortogonal-cubo"></a>
Proyección ortogonal de los vértices del cubo en el plano
![Resultado Unity 1](./media/python/ortogonal_cubo.png)

<a id="cubo-d1"></a>
Matriz de proyección aplicada al conjunto de puntos que representan los vétices con distancia focal de 1.
![Resultado Unity 1](./media/python/perspectiva_cubo_1.png)

<a id="cubo-d2"></a>
Matriz de proyección aplicada al conjunto de puntos que representan los vétices con distancia focal de 2.
![Resultado Unity 1](./media/python/perspectiva_cubo_2.png)

<a id="cubo-d05"></a>
Matriz de proyección aplicada al conjunto de puntos que representan los vétices con distancia focal de 0.5.
![Resultado Unity 1](./media/python/perspectiva_cubo_05.png)

### Three.js - Implementación

<a id="Visualización-perspectiva-horizonte"></a>
Visualización desde una camara en modo perspectiva
![Resultado Unity 1](./media/three/horizonte_perspectiva.png)
![Resultado Unity 1](./media/three/persp.gif)

<a id="Visualización-ortogonal-horizonte"></a>
Visualización desde una camara en modo ortográfica
![Resultado Unity 1](./media/three/horizonte_ortogonal.png)
![Resultado Unity 1](./media/three/orto.gif)

### unity - Implementación
<a id="creacion-cubos"></a>
Creación de cinco cubos alineados en z
![Resultado Unity 1](./media/unity/creacion_cubos_alineados.png)
<a id="Visualización-ortogonal-horizonte"></a>
**Cámara en modo perspective con diferentes valores de fov**
*fov30*
![Resultado Unity 1](./media/unity/fov30.png)
*fov50*
![Resultado Unity 1](./media/unity/fov50.png)
*fov60*
![Resultado Unity 1](./media/unity/fov60.png)
*fov90*
![Resultado Unity 1](./media/unity/fov90.png)
*fov120*
![Resultado Unity 1](./media/unity/fov120.png)
<a id="Visualización-camara-orto-unity"></a>
Cámara en modo ortographic
![Resultado Unity 1](./media/unity/ortho.png)

---

## Código relevante


### Ejemplo de código Python:


### Ejemplo de código three js (JavaScript):
<a id="implementacion-threejs"></a>

``` javascript
import { Canvas } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, OrthographicCamera } from "@react-three/drei"
import { useState } from "react"
import './App.css'


function Scene({ isPerspective }) {
  return (
    <>
      {/* Cámaras */}
      {isPerspective ? (
        <PerspectiveCamera
          makeDefault
          position={[5, 5, 10]}
          fov={60}
        />
      ) : (
        <OrthographicCamera
          makeDefault
          position={[5, 5, 10]}
          zoom={50}
        />
      )}

      <OrbitControls />

      {/* Luces */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      {/* Objeto cercano */}
      <mesh position={[-3, 0, 0]}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial color="red" />
      </mesh>

      {/* Objeto intermedio */}
      <mesh position={[0, 0, -5]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="blue" />
      </mesh>

      {/* Objeto lejano */}
      <mesh position={[3, 0, -10]}>
        <coneGeometry args={[1, 2, 32]} />
        <meshStandardMaterial color="green" />
      </mesh>
    </>
  )
}

export default function App() {
  const [isPerspective, setIsPerspective] = useState(true)

  return (
    <>
      <button
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          zIndex: 1,
          padding: "10px"
        }}
        onClick={() => setIsPerspective(!isPerspective)}
      >
        Cambiar a {isPerspective ? "Ortográfica" : "Perspectiva"}
      </button>
      
      <div className="canvas">
        <Canvas>
        <Scene isPerspective={isPerspective} />
      </Canvas>

      </div>
      
    </>
  )
}

```

---
## Prompts utilizados
Lista de los prompts utilizados con herramientas de IA generativa durante el desarrollo del taller.
  

```
Generame un código javascript para un proyecto con vite y three js que permita generar
una esfera, un cubo y una pirámide con base circular, esto se genera dentreo de un Canvas.
Además, debe permitir alternar con un botón entre una cámara que sea de perspectiva
y una proyección ortográfica.
Puedes usar la librería @react-three/drei para integrar fácilmente OrbitControls
import { OrbitControls, PerspectiveCamera, OrthographicCamera } from '@react-three/drei'

```  
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



---
## Estructura del proyecto

```
semana_01_1_construyendo_mundo_3d/
├── python/
├── threejs/
├── media/
├── unity/
├── processing/
├── README.md
└── .gitignore
```

---
## Referencias


---
## Checklist de entrega

- [x] Carpeta con nombre `semana_01_2_conversion_formatos_3d`
- [x] Código limpio y funcional en carpetas por entorno
- [x] GIFs/imágenes incluidos con nombres descriptivos en carpeta `media/`
- [x] README completo con todas las secciones requeridas
- [x] Mínimo 2 capturas/GIFs por implementación
- [x] Commits descriptivos en inglés
- [x] Repositorio organizado y público

---