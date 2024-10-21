function setLanguage(lang) {
    const elements = document.querySelectorAll('[data-lang]');
    elements.forEach(element => {
        if (element.getAttribute('data-lang') === lang) {
            element.style.display = '';
        } else {
            element.style.display = 'none';
        }
    });

    // Ganti gambar bendera berdasarkan bahasa
    const languageBtn = document.getElementById('language-btn');
    if (lang === 'en') {
        languageBtn.innerHTML = '<img src="Media/Images/us_flag.png" alt="US Flag" class="flag">';
    } else {
        languageBtn.innerHTML = '<img src="Media/Images/id_flag.png" alt="ID Flag" class="flag">';
    }
}