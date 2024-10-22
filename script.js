document.addEventListener("DOMContentLoaded", () => {
    const languageSwitches = document.querySelectorAll("[data-lang-switch]");
    const languageBtn = document.getElementById("language-btn");
    const ctaBtns = document.querySelectorAll(".cta-btn");
    const fixedBtn = document.createElement("button");

    // Set default language to English when page loads
    setLanguage('en');

    languageSwitches.forEach(switchElement => {
        switchElement.addEventListener("click", () => {
            const lang = switchElement.getAttribute("data-lang-switch");
            setLanguage(lang);
        });
    });

    // Create a button for "Get Started" that will appear in the navbar
    fixedBtn.classList.add("fixed-btn");
    fixedBtn.innerHTML = "Get Started";
    fixedBtn.onclick = () => {
        window.location.href = "#login"; // Scroll to login section
    };
    document.querySelector("nav").appendChild(fixedBtn);

    // Toggle the fixed button when "Get Started" or "Mulai" goes off screen
    window.addEventListener("scroll", () => {
        let windowWidth = window.innerWidth;
        const dropdown_language = document.querySelector(".dropdown");
        if (windowWidth <= 768) {
            dropdown_language.style.display = "none";
        }
        else {
            dropdown_language.style.display = "";
        }
        const ctaBtnPositionEn = document.querySelector(".cta-btn[data-lang='en']").getBoundingClientRect().top;
        const ctaBtnPositionId = document.querySelector(".cta-btn[data-lang='id']").getBoundingClientRect().top;
        const currentLanguage = document.querySelector("[data-lang='en']").style.display === "" ? 'en' : 'id';
        // Change the text of the fixed button based on the current language
        fixedBtn.innerHTML = currentLanguage === 'en' ? "Get Started" : "Mulai";

        if (ctaBtnPositionEn < 0 || ctaBtnPositionId < 0) {
            fixedBtn.classList.add("show");
            languageBtn.style.display = "none";
        } else {
            fixedBtn.classList.remove("show");
            languageBtn.style.display = "inline-block";
        }
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
