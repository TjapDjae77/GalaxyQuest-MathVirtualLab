document.addEventListener("DOMContentLoaded", () => {
    const languageSwitches = document.querySelectorAll("[data-lang-switch]");
    
    // Set default language to English when page loads
    setLanguage('en');
    
    languageSwitches.forEach(switchElement => {
        switchElement.addEventListener("click", () => {
            const lang = switchElement.getAttribute("data-lang-switch");
            setLanguage(lang);
        });
    });
});

function setLanguage(lang) {
    const elements = document.querySelectorAll("[data-lang]");
    
    elements.forEach(element => {
        if (element.getAttribute("data-lang") === lang) {
            element.style.display = ''; // Show elements for the selected language
        } else {
            element.style.display = 'none'; // Hide elements for other languages
        }
    });

    const languageBtn = document.getElementById("language-btn");
    
    // Update language button flag based on selected language
    if (lang === 'en') {
        languageBtn.innerHTML = '<img src="Media/Images/us_flag.png" alt="US Flag" class="flag">';
    } else {
        languageBtn.innerHTML = '<img src="Media/Images/id_flag.png" alt="ID Flag" class="flag">';
    }
}
