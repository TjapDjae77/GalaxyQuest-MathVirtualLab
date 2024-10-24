let draggedElement;
let attempts = 3;

// Drag and Drop Functionality
function drag(event) {
    draggedElement = event.target;
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const inputArea = document.getElementById('input-area');
    const newElement = document.createElement('span');
    newElement.textContent = draggedElement.textContent + " ";
    inputArea.appendChild(newElement);
}

document.getElementById('input-area').addEventListener('dragover', allowDrop);
document.getElementById('input-area').addEventListener('drop', drop);

// Processing the Function
function processFunction() {
    const inputAreaText = document.getElementById('input-area').textContent;
    const outputValue = document.getElementById('output-value');
    const attemptsLeft = document.getElementById('attempts-left');

    // Replace material text with actual values (Iron = x, Glass = y, Carbon = z)
    let f_x = inputAreaText.replace(/Iron/g, "x").replace(/Glass/g, "y").replace(/Carbon/g, "z");

    // For this example, assume g(f(x)) = 2f(x) - 3, target is 4x - 3
    if (f_x.trim() === "2x ") {
        outputValue.textContent = "4x - 3";
        alert("Level Completed Successfully!");
    } else {
        attempts -= 1;
        attemptsLeft.textContent = `Attempts Left: ${attempts}`;
        if (attempts === 0) {
            alert("You have failed the level. Try Again.");
        }
    }
}
