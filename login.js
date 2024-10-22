document.getElementById("loginForm").addEventListener("submit", function(event){
    event.preventDefault();
    
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // Validasi sederhana
    if (username === "admin" && password === "admin123") {
        alert("Login successful");
        window.location.href = "level1.html"; // Redirect ke halaman level 1
    } else {
        alert("Invalid username or password");
    }
});