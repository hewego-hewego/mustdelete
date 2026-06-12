function getSavedLanguage() {
    return localStorage.getItem('siteLang') || 'ko';
}

function setLanguage(lang) {
    localStorage.setItem('siteLang', lang);
    applyLanguageToHtml(lang);
    if (typeof applyPageLanguage === 'function') {
        applyPageLanguage(lang);
    }
}

function applyLanguageToHtml(lang) {
    document.documentElement.lang = lang === 'en' ? 'en' : 'ko';
}

function initLanguagePage() {
    const lang = getSavedLanguage();
    applyLanguageToHtml(lang);
    if (typeof applyPageLanguage === 'function') {
        applyPageLanguage(lang);
    }
    return lang;
}

function applyLangButtonState(lang) {
    const koBtn = document.getElementById('koBtn');
    const enBtn = document.getElementById('enBtn');
    if (koBtn && enBtn) {
        koBtn.classList.toggle('active', lang === 'ko');
        enBtn.classList.toggle('active', lang === 'en');
    }
}

function handleLanguageButton(lang) {
    setLanguage(lang);
    applyLangButtonState(lang);
}
