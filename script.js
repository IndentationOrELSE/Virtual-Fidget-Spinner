var friction = 0.001;
let spinning = false; // State to check if the spinner is spinning
let lastAngle = 0; // Store the last angle of the spinner
let velocity = 0; // Store the velocity of the spinner
const spinner = document.getElementById("spinner"); // Get the spinner element
const frictionSlider = document.getElementById("friction"); // Get the friction slider element
const velocitySlider = document.getElementById("velocity");
const frictionNum = document.getElementById("frictionNum");
const velocityNum = document.getElementById("velocityNum");
// Function to calculate the angle of the mouse relative to the spinner's center
function calculateAngle(event) {
    const rect = spinner.getBoundingClientRect(); // Get the spinner's bounding rectangle
    const centerX = rect.left + rect.width / 2; // Calculate the center X
    const centerY = rect.top + rect.height / 2; // Calculate the center Y
    return Math.atan2(event.clientY - centerY, event.clientX - centerX) * (180 / Math.PI); // Calculate angle
}

spinner.addEventListener("mousedown", (event) => {
    spinning = true; // Set spinning state to true
    lastAngle = calculateAngle(event); // Calculate initial angle
    velocity = 0; // Reset velocity
});

spinner.addEventListener("mousemove", (event) => {
    if (spinning) {
        const currentAngle = calculateAngle(event); // Calculate current angle
        const deltaAngle = currentAngle - lastAngle; // Calculate the change in angle
        lastAngle = currentAngle; // Update last angle
        
        // Update velocity based on the change in angle
        velocity = deltaAngle; 
        
        const currentRotation = parseFloat(spinner.style.transform.replace('rotate(', '').replace('deg)', '')) || 0; // Get current rotation
        spinner.style.transform = `rotate(${currentRotation + deltaAngle}deg)`; // Apply the new rotation
    }
});

window.addEventListener("mouseup", () => {
    spinning = false; // Reset spinning state
    continueSpinning(); // Start the spinning effect based on velocity
});

// Function to continue spinning after mouse up
function continueSpinning() {
    if (Math.abs(velocity) > 0) { // Check if velocity is significant
        const currentRotation = parseFloat(spinner.style.transform.replace('rotate(', '').replace('deg)', '')) || 0; // Get current rotation
        spinner.style.transform = `rotate(${currentRotation + velocity}deg)`; // Apply the new rotation
		userVelocity = Math.round(velocity * 1000);
		velocitySlider.value = userVelocity;
		velocityNum.value = userVelocity;
        velocity *= (1-friction); // Gradually decrease the velocity
        requestAnimationFrame(continueSpinning); // Continue spinning
    }
}

frictionSlider.oninput = function() {
	friction = this.value / 1000;
	frictionNum.value = frictionSlider.value;
}

frictionNum.oninput = function() {
	friction = this.value / 1000;
	frictionSlider.innerHTML = frictionNum.value;
}


velocitySlider.oninput = function() {
	velocity = this.value / 1000;
	velocityNum.value = velocitySlider.value;
}

velocityNum.oninput = function() {
	velocity = this.value / 1000;
	velocitySlider.innerHTML = velocityNum.value;
}
