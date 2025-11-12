// ==========================================
//  MENU BURGER - Gestion ouverture/fermeture
// ==========================================

// Sélectionner les éléments
const menuBtn = document.getElementById('menuBtn');
const closeBtn = document.getElementById('closeMenu');
const mobileMenu = document.getElementById('mobileMenu');

// Fonction pour OUVRIR le menu
function openMenu() {
  mobileMenu.classList.add('is-open');
  overlay.classList.add('is-visible');
  document.body.style.overflow = 'hidden';
  menuBtn.setAttribute('aria-expanded', 'true');
}

// Fonction pour FERMER le menu
function closeMenu() {
  mobileMenu.classList.remove('is-open');
  overlay.classList.remove('is-visible');
  document.body.style.overflow = '';
  menuBtn.setAttribute('aria-expanded', 'false');
}

// Écouter les clics
menuBtn.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

// Fermer avec Échap
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
    closeMenu();
  }
});

// Fermer quand on clique sur un lien
const menuLinks = document.querySelectorAll('.mobile-menu__link');
menuLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});
