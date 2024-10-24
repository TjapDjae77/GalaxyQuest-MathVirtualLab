// Get elements
const inputBox = document.getElementById('input-box');
const gxInput = document.getElementById('gx-input');
const processBtn = document.getElementById('process-btn');
const outputBox = document.getElementById('output-box');
const placeholderText = document.getElementById('placeholder-text');
const progressBar = document.getElementById('progress');
const lives = document.getElementById('lives');
const fFunction = document.getElementById('f-function');
const gFunctionText = document.getElementById('g-function');
const outputPic = document.getElementById('output-pic');
let selectedMaterial = null;

// Array to store dropped materials
let droppedMaterials = [];
let currentQuestion = 1;
let remainingLives = 3;

// Enable dragging materials
document.querySelectorAll('.material').forEach(material => {
    material.addEventListener('dragstart', function (e) {
        selectedMaterial = this.querySelector('img').src.split('/').pop();  // Ambil nama file saja
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
        newImage.src = 'Media/Images/' + selectedMaterial;  // Set src dengan nama file relatif
        newItem.appendChild(newImage);

        // Prevent the dropped material from being draggable
        newImage.draggable = false;

        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'x';

        // Delete functionality
        deleteBtn.addEventListener('click', function () {
            inputBox.removeChild(newItem);
            droppedMaterials = droppedMaterials.filter(material => material !== selectedMaterial);

            // Check if array is empty
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

        // Store the dropped material (hanya nama file)
        droppedMaterials.push(selectedMaterial);

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

// Process button functionality (Main logic)
processBtn.addEventListener('click', function () {
    const gFunction = gxInput.value.trim(); // Ambil input fungsi g(x)
    console.log(gFunction);
    console.log(droppedMaterials[0]);
    if (currentQuestion === 1) {
        // Soal pertama: f(x) = 3x - 2, g(f(x)) = 6x - 7
        if (droppedMaterials.length === 1 && droppedMaterials[0] === "fiberglass.png" && 
            (gFunction === "2x-3" || gFunction === "2x - 3")) {
            // Jawaban benar
            updateProgress(33);
            goToNextQuestion();
        } else {
            handleWrongAnswer();
        }
    } else if (currentQuestion === 2) {
        // Soal kedua: f(x) = -x + 6, g(f(x)) = 3x + 7
        if (droppedMaterials.length === 1 && droppedMaterials[0] === "glass.png" && 
            (gFunction === "-3x+25" || gFunction === "-3x + 25")) {
            // Jawaban benar
            updateProgress(67);
            goToNextQuestion();
        } else {
            handleWrongAnswer();
        }
    } else if (currentQuestion === 3) {
        // Soal ketiga: f(x) = -x² - 2, g(f(x)) = -2x²
        if (droppedMaterials.length === 1 && droppedMaterials[0] === "aluminium.png" && 
            (gFunction === "2x+4" || gFunction === "2x + 4")) {
            // Jawaban benar
            updateProgress(100);
            alert("Selamat! Anda telah menyelesaikan semua soal.");
            window.location.href = "index.html"; // Redirect ke halaman utama
        } else {
            handleWrongAnswer();
        }
    }
});

// Handle wrong answer
function handleWrongAnswer() {
    remainingLives--;
    updateLives();
    if (remainingLives === 0) {
        alert("Anda kalah! Kesempatan habis.");
        window.location.href = "index.html"; // Redirect ke halaman utama
    }
}

// Update progress bar
function updateProgress(value) {
    progressBar.style.width = value + "%";
}

// Update lives display
function updateLives() {
    lives.innerHTML = 'Nyawa: ' + '❤️'.repeat(remainingLives);
}

// Lanjut ke soal berikutnya
function goToNextQuestion() {
    currentQuestion++;
    droppedMaterials = []; // Kosongkan materials
    inputBox.innerHTML = ''; // Kosongkan drop zone
    placeholderText.style.display = 'block'; // Munculkan placeholder
    gxInput.value = '';
    gxInput.placeholder = '???';
    placeholderText.style.display = 'block';
    placeholderText.innerHTML = "Masukkan bahan baku di sini"

    if (currentQuestion === 2) {
        fFunction.textContent = "f(x) = -x + 6";
        gFunctionText.textContent = "g(f(x)) = 3x + 7";
        outputPic.src = "Media/Images/Window.png";
    } else if (currentQuestion === 3) {
        fFunction.textContent = "f(x) = -x² - 2";
        gFunctionText.textContent = "g(f(x)) = -2x²";
        outputPic.src = "Media/Images/Fins.png";
    }
}

// Function to update layout based on screen width
function updateLayout() {
    const header = document.querySelector('header');
    const lives = document.getElementById('lives');
    const progressBar = document.getElementById('progress-bar');
    const headerTitle = document.querySelector('header h1');
    const progressContainer = document.getElementById('progress-container');
    const backButton = document.getElementById('back-btn');
    
    // Check if screen width is less than 768px (mobile view)
    if (window.innerWidth < 768) {
        // Remove "Nyawa: " text, show only hearts
        lives.innerHTML = '❤️'.repeat(remainingLives);
        
        // Move progress bar to the left of lives
        progressContainer.style.width = '100%';
        progressContainer.style.display = 'flex';
        progressContainer.style.flexDirection = 'row-reverse';
        progressContainer.style.alignItems = 'center';
        progressContainer.style.padding = '5px 20px';

        lives.style.width = '45%';
        
        // Change header title to "Level 1"
        headerTitle.textContent = 'Level 1';

        // Reduce header height to 10% of viewport height
        header.style.height = '14vh';

        backButton.innerHTML = "←";

    } else {
        // Restore "Nyawa: ❤️❤️❤️" and other desktop settings
        lives.innerHTML = 'Nyawa: ' + '❤️'.repeat(remainingLives);

        // Restore header title
        headerTitle.textContent = 'Calculab - Level 1';

        // Restore header height for desktop
        header.style.height = 'auto';

        // Progress bar to be below lives in desktop mode
        lives.insertAdjacentElement('afterend', progressBar);
        lives.style.display = 'block';
        lives.style.textAlign = 'center';
        lives.style.width = '';

        progressContainer.style.width = '';
        progressContainer.style.display = '';
        progressContainer.style.flexDirection = '';
        progressContainer.style.alignItems = '';
        progressContainer.style.padding = '';

        backButton.innerHTML = "Back";
    }
}

// Apply layout changes on page load and when window is resized
window.addEventListener('DOMContentLoaded', updateLayout);
window.addEventListener('resize', updateLayout);
