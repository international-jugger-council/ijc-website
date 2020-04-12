const LANGS_SUPPORTED = [
  'en',
  'es',
  'de',
];

function getLang() {
  const lang = window.localStorage.getItem('lang');
  if (LANGS_SUPPORTED.includes(lang)) {
    return lang;
  }
  return 'en';
}

function setLang(lang) {
  window.localStorage.setItem('lang', lang);
}

function homeRedirectLang() {
  const lang = getLang();
  window.location.pathname = `${window.location.pathname}/${lang}`;
}

document.addEventListener('DOMContentLoaded', () => {
  const $navbarBurgers = Array.from(document.querySelectorAll('.navbar-burger'));
  $navbarBurgers.forEach(($navbarBurger) => {
    $navbarBurger.addEventListener('click', () => {
      const $target = document.getElementById($navbarBurger.dataset.target);
      $navbarBurger.classList.toggle('is-active');
      $target.classList.toggle('is-active');
    });
  });
});
