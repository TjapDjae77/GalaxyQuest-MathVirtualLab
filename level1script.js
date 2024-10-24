// Get elements
const inputBox = document.getElementById('input-box');
const gxInput = document.getElementById('gx-input');
const processBtn = document.getElementById('process-btn');
const outputBox = document.getElementById('output-box');
const placeholderText = document.getElementById('placeholder-text');
let selectedMaterial = null;

// Array to store dropped materials
let droppedMaterials = [];

// Enable dragging materials
document.querySelectorAll('.material').forEach(material => {
    material.addEventListener('dragstart', function (e) {
        selectedMaterial = this.querySelector('img').src;
    });
});

// Allow drop in the input box
inputBox.addEventListener('dragover', function (e) {
    e.preventDefault();
});

inputBox.addEventListener('drop', function (e) {
    e.preventDefault();

    if (droppedMaterials.length < 6 && selectedMaterial) {
        // Remove placeholder text if first drop
        if (droppedMaterials.length === 0) {
            placeholderText.style.display = 'none';
        }

        // Remove "+" box before adding new material
        removePlusSign();

        // Create container for dropped material
        const newItem = document.createElement('div');
        newItem.classList.add('material-drop-item');

        // Create image
        const newImage = document.createElement('img');
        newImage.src = selectedMaterial;
        newItem.appendChild(newImage);

        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'x';

        // Delete functionality
        deleteBtn.addEventListener('click', function () {
            inputBox.removeChild(newItem);
            droppedMaterials = droppedMaterials.filter(material => material !== newImage.src);

            console.log('Material dihapus:', droppedMaterials);

            // Cek apakah array kosong
            if (droppedMaterials.length === 0) {
                placeholderText.style.display = 'block';
                removePlusSign();
            } else {
                // Add "+" box only if materials are not full
                if (droppedMaterials.length < 6) {
                    addPlusSign();
                }
            }
        });

        newItem.appendChild(deleteBtn);
        inputBox.appendChild(newItem);

        // Store the dropped material
        droppedMaterials.push(selectedMaterial);
        console.log('Material ditambahkan:', droppedMaterials);

        // Add "+" container if not full
        if (droppedMaterials.length < 6) {
            addPlusSign();
        }
    }
});

// Function to add "+" container
function addPlusSign() {
    // Pastikan hanya ada satu "+" yang ditambahkan
    removePlusSign();

    const plusContainer = document.createElement('div');
    plusContainer.classList.add('material-drop-item');
    plusContainer.innerHTML = '+';
    plusContainer.id = 'plus-sign';
    inputBox.appendChild(plusContainer);
}

// Remove "+" sign when clearing or empty
function removePlusSign() {
    const plusSign = document.getElementById('plus-sign');
    if (plusSign) {
        inputBox.removeChild(plusSign);
    }
}

// Initially no "+" sign
removePlusSign();

// Process button functionality
processBtn.addEventListener('click', function () {
    const gFunction = gxInput.value;

    if (droppedMaterials.includes("Media/Images/aluminium.png") && gFunction === "2x - 3") {
        outputBox.innerHTML = '<p>g(f(x)) = 6x - 7 (Output: Fins)</p>';
    } else {
        outputBox.innerHTML = '<p>Salah! Coba lagi.</p>';
    }
});
