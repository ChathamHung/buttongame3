const title = document.querySelector('.title');
const menuBtn = document.querySelector('.menu-button');
const menuPanel = document.querySelector('.menu');
const iframe = document.querySelector('.iframe');
const menuOptions = document.querySelectorAll('.menu-options img'); // Fixed: select img elements
const menuPages = document.querySelectorAll('.menu-pages > div');

let currentPageIndex = 0;

function clickAnotherSide(e) {
  if (!menuPanel.contains(e.target) && !menuBtn.contains(e.target)) {
    menuPanel.classList.add('menu-hidden');
    menuBtn.querySelector('img').src = './res/images/icons/menu-icon.png';
  }
}

// Function to switch between menu pages
function switchMenuPage(targetIndex) {
  if (targetIndex === currentPageIndex) return;

  const isGoingRight = targetIndex > currentPageIndex;

  // Remove select class from all options
  menuOptions.forEach(option => option.classList.remove('select'));

  // Add select class to clicked option
  menuOptions[targetIndex].classList.add('select');

  // Hide current page by sliding it out
  menuPages[currentPageIndex].style.transform = isGoingRight ? 'translateX(-100%)' : 'translateX(100%)';
  menuPages[currentPageIndex].style.opacity = '0';
  menuPages[currentPageIndex].style.pointerEvents = 'none';

  // Position new page off-screen on the opposite side
  menuPages[targetIndex].style.transform = isGoingRight ? 'translateX(100%)' : 'translateX(-100%)';
  menuPages[targetIndex].style.opacity = '0';
  menuPages[targetIndex].style.pointerEvents = 'none';

  // Show target page after a short delay for smooth transition
  setTimeout(() => {
    menuPages[targetIndex].style.opacity = '1';
    menuPages[targetIndex].style.transform = 'translateX(0)';
    menuPages[targetIndex].style.pointerEvents = 'auto';
  }, 150);

  currentPageIndex = targetIndex;
}

// Initialize menu pages
function initializeMenuPages() {
  menuPages.forEach((page, index) => {
    page.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    if (index === 0) {
      // Show first page by default
      page.style.opacity = '1';
      page.style.transform = 'translateX(0)';
      page.style.pointerEvents = 'auto';
      currentPageIndex = 0;
    } else {
      // Hide other pages
      page.style.opacity = '0';
      page.style.transform = 'translateX(100%)';
      page.style.pointerEvents = 'none';
    }
  });
}

// Start with menu open or closed as desired
menuPanel.classList.add('menu-hidden');

// Initialize menu pages on load
initializeMenuPages();

// Add click event listeners to menu options
menuOptions.forEach((option, index) => {
  option.addEventListener('click', () => {
    switchMenuPage(index);
  });
});

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
  clickAnotherSide(e);
});

iframe.addEventListener('click', (e) => {
  clickAnotherSide(e);
});