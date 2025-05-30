document.addEventListener("DOMContentLoaded", function () {
    // Espera a que el contenido de la página se haya cargado completamente
    
    // Crea la escena, la cámara y el renderizador
    const scene = new THREE.Scene(); // Escena donde se agregarán los objetos 3D
    
    // Cámara en perspectiva
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // Campo de visión: 75 grados
    // Relación de aspecto: según el tamaño de la ventana
    // Distancia visible: de 0.1 a 1000 unidades

    const renderer = new THREE.WebGLRenderer({ alpha: true }); // Renderizador WebGL con fondo transparente
    renderer.setSize(window.innerWidth, window.innerHeight); // Ajusta el tamaño del renderizado al tamaño de la ventana
    renderer.setClearColor(0x000000, 0); // Establece un fondo transparente

    // Obtiene el contenedor HTML donde se mostrará la animación
    const container = document.getElementById("threeCanvas");
    if (container) {
        container.appendChild(renderer.domElement); // Agrega el lienzo de renderizado al contenedor
    } else {
        console.error("No se encontró el contenedor de la animación.");
    }

    // Creación de una geometría Torus Knot (Nudo de Toro)
    const geometry = new THREE.TorusKnotGeometry(40, 10, 300, 64); 
    // Radio mayor: 40
    // Radio del tubo: 10
    // Segmentos radiales: 300 (detalle del tubo)
    // Segmentos en el círculo: 64 (detalle del anillo)
    // Material de la figura en modo alambre (wireframe)
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
    // Color rojo (0xff0000) y sin textura sólida, solo el esqueleto de la figura

    const torusKnot = new THREE.Mesh(geometry, material); // Crea el objeto 3D combinando geometría y material
    scene.add(torusKnot); // Agrega la figura a la escena

    // Posición inicial de la cámara
    camera.position.z = 100; // Aleja la cámara para que la figura sea visible

    // Función para animar la escena
    function animate() {
        requestAnimationFrame(animate); // Llama a la función en un bucle sin bloquear la ejecución
        torusKnot.rotation.x += 0.005; // Rota la figura en el eje X
        torusKnot.rotation.y += 0.005; // Rota la figura en el eje Y
        
        renderer.render(scene, camera); // Renderiza la escena en cada fotograma
    }
    animate(); // Inicia la animación

    // Ajusta el renderizado cuando se cambia el tamaño de la ventana
    window.addEventListener("resize", function () {
        renderer.setSize(window.innerWidth, window.innerHeight); // Ajusta el tamaño del renderizador
        camera.aspect = window.innerWidth / window.innerHeight; // Ajusta la relación de aspecto de la cámara
        camera.updateProjectionMatrix(); // Actualiza la matriz de proyección de la cámara
    });
});
