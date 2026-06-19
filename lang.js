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

function initPageTransitions() {
    window.requestAnimationFrame(() => {
        document.body.classList.add('page-ready');
    });

    document.querySelectorAll('a[href]').forEach((link) => {
        const href = link.getAttribute('href') || '';
        const isLocalPage = href.endsWith('.html') && !href.startsWith('#');

        if (!isLocalPage) {
            return;
        }

        link.addEventListener('click', (event) => {
            if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
                return;
            }

            event.preventDefault();
            document.body.classList.add('page-exit');
            window.setTimeout(() => {
                window.location.href = href;
            }, 160);
        });
    });
}
