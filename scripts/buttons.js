// Create 3D buttons using PlaneGeometry (use MeshStandardMaterial for better visibility)
const buttonGeometry = new THREE.PlaneGeometry(1, 0.5);
const buttonMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x00ff00, 
    side: THREE.DoubleSide  // Ensure both sides of the button are visible
});

const button1 = new THREE.Mesh(buttonGeometry, buttonMaterial);
button1.position.set(2, 2, 0); // Position button 1
scene.add(button1);

// Create a second button to zoom into the model
const button2 = new THREE.Mesh(buttonGeometry, buttonMaterial);
button2.position.set(2, 1, 0); // Position button 2 slightly below button 1
scene.add(button2);

// Create a third button to zoom into the model
const button3 = new THREE.Mesh(buttonGeometry, buttonMaterial);
button3.position.set(-2, 2, 0); // Position button 3 in left of button 1
scene.add(button3);


// Button click detection
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Target position for camera animation
let targetPosition_forbtn1 = new THREE.Vector3(0, 5, 3); // Initial target position (for button 1)
let zoomTargetPosition_forbtn2 = new THREE.Vector3(2, 0.5, 2); // Target for zooming in (closer to the model)
let zoomTargetPosition_forbtn3 = new THREE.Vector3(-1, 1, -4); // Target for zooming in (closer to the model)
let isMoving = false; // Flag to check if the camera is moving
const moveSpeed = 0.05; // Speed of camera movement

// Event listener for mouse click
window.addEventListener('click', onMouseClick, false);

// Function to handle mouse click
function onMouseClick(event) {
    // Update mouse coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    // Update the raycaster with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);
    
    // Check for intersections with button1
    const intersectsButton1 = raycaster.intersectObject(button1);
    const intersectsButton2 = raycaster.intersectObject(button2);
    const intersectsButton3 = raycaster.intersectObject(button3);

    if (intersectsButton1.length > 0) {
        console.log('Button 1 clicked');
        // Set the target position for the camera (for button 1)
        targetPosition = new THREE.Vector3(0, 5, 3);  // Change to desired position
        isMoving = true; // Start the camera movement
    } else if (intersectsButton2.length > 0) {
        console.log('Button 2 clicked');
        // Set the target position for zooming in (closer to the model)
        targetPosition = zoomTargetPosition_forbtn2;
        isMoving = true; // Start the camera movement
    }
    else if (intersectsButton3.length > 0) {
        console.log('Button 3 clicked');
        // Set the target position for zooming in (closer to the model)
        targetPosition = zoomTargetPosition_forbtn3;
        isMoving = true; // Start the camera movement
    }
}

// Animation loop to render the scene and update camera position
function animate_buttons() {
    requestAnimationFrame(animate_buttons);

    if (isMoving) {
        // Smoothly move the camera towards the target position
        camera.position.lerp(targetPosition, moveSpeed);

        // If the camera is close enough to the target position, stop moving
        if (camera.position.distanceTo(targetPosition) < 0.1) {
            isMoving = false;
        }
    }

    controls.update(); // Update controls for smooth camera movement
    raycaster.updateMatrixWorld();  // Update the matrix world of the raycaster
    renderer.render(scene, camera);
}

animate_buttons();

// Handle window resizing
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
