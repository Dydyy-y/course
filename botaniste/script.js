const menuBtn = document.getElementById('menuBtn');
const closeBtn = document.getElementById('closeMenu');
const mobileMenu = document.getElementById('mobileMenu');

function openMenu() {
  mobileMenu.classList.add('is-open');
  overlay.classList.add('is-visible');
  document.body.style.overflow = 'hidden';
  menuBtn.setAttribute('aria-expanded', 'true');
}

function closeMenu() {
  mobileMenu.classList.remove('is-open');
  overlay.classList.remove('is-visible');
  document.body.style.overflow = '';
  menuBtn.setAttribute('aria-expanded', 'false');
}

menuBtn.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
    closeMenu();
  }
});

const menuLinks = document.querySelectorAll('.mobile-menu__link');
menuLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});
