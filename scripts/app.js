// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add lighting to the scene
const light = new THREE.AmbientLight(0x404040); // Ambient light
scene.add(light);

// Add Ambient Light (to illuminate everything uniformly)
const ambientLight = new THREE.AmbientLight(0x404040, 1); // Color and intensity
scene.add(ambientLight);

// Add Directional Light (for sunlight-like effect)
const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Color and intensity
directionalLight.position.set(5, 5, 5); // Light's position
directionalLight.castShadow = true; // Enable shadows
scene.add(directionalLight);

// Add a Point Light (simulates a bulb-like effect)
const pointLight = new THREE.PointLight(0xff0000, 1, 100); // Color, intensity, distance
pointLight.position.set(0, 2, 0); // Position the point light
scene.add(pointLight);

// Get the loading screen element
const loadingScreen = document.getElementById('loading-screen');

// Load the 3D model using GLTFLoader
const loader = new THREE.GLTFLoader();
loader.load(
    'models/mclaren.glb',
    function (gltf) {
        // Add the model to the scene when loaded
        const model = gltf.scene;
        scene.add(model);
        
        // Hide loading screen when model is loaded
        loadingScreen.style.display = 'none';
    },
    function (xhr) {
        // Update the loading screen with progress percentage
        const progress = (xhr.loaded / xhr.total * 100).toFixed(0);
        loadingScreen.innerText = `Loading... ${progress}%`;
    },
    function (error) {
        console.error('Error loading model:', error);
        loadingScreen.innerText = 'Failed to load the model.';
    }
);

// Set up the camera position
camera.position.set(0, 1, 5); // Set an initial position for the camera (behind the model)

// Add OrbitControls to allow camera movement around the model
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smooth the movement
controls.dampingFactor = 0.25; // Damping strength
controls.screenSpacePanning = false; // Prevent camera from moving vertically when panning
controls.maxPolarAngle = Math.PI / 2; // Limit vertical rotation of the camera

// Animation loop to render the scene
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Update controls
    renderer.render(scene, camera);
}

animate();

// Handle window resizing
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
