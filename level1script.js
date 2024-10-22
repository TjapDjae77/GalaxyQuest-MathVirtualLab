document.addEventListener("DOMContentLoaded", function () {
    const materials = document.querySelectorAll(".material");
    const outputArea = document.getElementById("outputArea");
    const processBtn = document.getElementById("processBtn");
    const functionInput = document.getElementById("functionInput");
    const canvas = document.getElementById("functionCanvas");
    const ctx = canvas.getContext("2d");

    let selectedMaterial = null;

    // Drag and drop functionality
    materials.forEach(material => {
        material.addEventListener("dragstart", (e) => {
            selectedMaterial = e.target.id;
            e.dataTransfer.setData("text/plain", selectedMaterial);
        });
    });

    outputArea.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    outputArea.addEventListener("drop", (e) => {
        e.preventDefault();
        if (selectedMaterial) {
            outputArea.textContent = `Processed ${selectedMaterial.replace('material-', '')} is ready for use!`;
        }
    });

    // Process material with the function input
    processBtn.addEventListener("click", () => {
        const userFunction = functionInput.value;
        try {
            drawFunction(userFunction);
        } catch (error) {
            alert("Invalid function. Please enter a valid mathematical function.");
        }
    });

    // Function to draw on canvas
    function drawFunction(func) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        
        const step = canvas.width / 100; // step size for drawing
        for (let x = 0; x < canvas.width; x += step) {
            const scaleX = x / canvas.width * 10; // Scaling for input domain
            const y = eval(func.replace(/x/g, scaleX));
            const scaleY = canvas.height - (y + canvas.height / 2); // Scaling for output range
            ctx.lineTo(x, scaleY);
        }

        ctx.strokeStyle = "#DC1F84";
        ctx.stroke();
    }
});