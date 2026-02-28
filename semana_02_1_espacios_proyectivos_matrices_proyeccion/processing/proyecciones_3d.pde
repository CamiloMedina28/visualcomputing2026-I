// Variable booleana para alternar entre proyección perspectiva (true) y ortográfica (false)
boolean usePerspective = true;

void setup() {
  // Ventana de 800x600 píxeles con renderizador 3D (P3D)
  size(800, 600, P3D);
  // Activa antialiasing de 8x para bordes más suaves
  smooth(8);
}

void draw() {
  background(10);

  // --- CONFIGURACIÓN DE LA PROYECCIÓN ---
  if (usePerspective) {
    // Parámetros para proyección perspectiva (efecto de profundidad realista)
    float fov = PI / 3.0;           // Campo de visión vertical: 60 grados
    float aspect = (float) width / (float) height; // Relación de ancho/alto
    float zNear = 1;                 // Plano de recorte cercano (no se dibuja nada más cerca)
    float zFar = 5000;               // Plano de recorte lejano (no se dibuja nada más allá)
    perspective(fov, aspect, zNear, zFar);
  } else {
    // Parámetros para proyección ortográfica (sin deformación por distancia)
    float halfW = width / 2.0;       // Mitad del ancho de la ventana
    float halfH = height / 2.0;       // Mitad del alto de la ventana
    float zNear = -5000;              // Plano cercano (puede ser negativo para ver detrás)
    float zFar = 5000;                // Plano lejano
    ortho(-halfW, halfW, -halfH, halfH, zNear, zFar);
  }

  // --- TRANSFORMACIONES GLOBALES DE LA ESCENA ---
  // Traslada el origen de coordenadas al centro de la ventana
  // (por defecto el origen está en la esquina superior izquierda)
  translate(width / 2.0, height / 2.0, 0);

  // Rota lentamente alrededor del eje Y para apreciar la profundidad
  rotateY(frameCount * 0.01);
  // Inclinación fija hacia abajo (para ver mejor los cubos)
  rotateX(-0.3);

  // Activa iluminación básica para que los cubos tengan volumen
  lights();

  // --- DIBUJO DE LOS TRES CUBOS ---
  // Cada cubo se dibuja con una transformación local aislada (push/popMatrix)

  // Cubo cercano (rojo) en posición (-120, 0, -300)
  pushMatrix();
  translate(-120, 0, -300);
  fill(255, 80, 80);   // Color rojo
  box(80);              // Cubo de lado 80
  popMatrix();

  // Cubo intermedio (verde) en posición (0, 0, -800)
  pushMatrix();
  translate(0, 0, -800);
  fill(80, 255, 80);   // Color verde
  box(80);
  popMatrix();

  // Cubo lejano (azul) en posición (120, 0, -1400)
  pushMatrix();
  translate(120, 0, -1400);
  fill(80, 80, 255);   // Color azul
  box(80);
  popMatrix();

  camera();               // Restablece la cámara a la vista 2D por defecto
  hint(DISABLE_DEPTH_TEST);

  fill(255);
  textAlign(LEFT, TOP);
  textSize(16);
  // Muestra el modo actual (Perspectiva u Ortográfica)
  String mode = usePerspective ? "Perspectiva" : "Ortográfica";
  text("Modo de proyección: " + mode + " (pulsa 'c' para cambiar)", 12, 12);

  hint(ENABLE_DEPTH_TEST); // Reactiva la prueba de profundidad para los siguientes dibujos 3D
}

void keyPressed() {
  // Cambio modo de proyección
  if (key == 'c' || key == 'C') {
    usePerspective = !usePerspective;
  }
}
