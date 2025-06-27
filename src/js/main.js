const title = document.querySelector('.title');
const menuBtn = document.querySelector('.menu-button');
const menuPanel = document.querySelector('.menu');

// Start with menu open or closed as desired
menuPanel.classList.add('menu-hidden');

menuBtn.addEventListener('click', () => {
  menuPanel.classList.toggle('menu-hidden');
  menuBtn.setAttribute('data-tooltip', menuPanel.classList.contains('menu-hidden')
    ? 'Menu'
    : 'Close Menu');
  
  menuBtn.querySelector('img').src = menuPanel.classList.contains('menu-hidden')
    ? './res/images/icons/menu-icon.png'
    : './res/images/icons/close-icon.png';
});

title.addEventListener('click', () => {
  document.location.href = 'index.html';
});



// Optional: close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!menuPanel.contains(e.target) && !menuBtn.contains(e.target)) {
    menuPanel.classList.add('menu-hidden');
    menuBtn.querySelector('img').src = './res/images/icons/menu-icon.png';
  }
});