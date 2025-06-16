const menuBtn = document.querySelector('.menu-button');
const menuPanel = document.querySelector('.menu');

// Start with menu open or closed as desired
menuPanel.classList.add('menu-hidden');

menuBtn.addEventListener('click', () => {
  menuPanel.classList.toggle('menu-hidden');
});

// Optional: close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!menuPanel.contains(e.target) && !menuBtn.contains(e.target)) {
    menuPanel.classList.add('menu-hidden');
  }
});