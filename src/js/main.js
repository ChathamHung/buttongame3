const title = document.querySelector(".title");
const levelLabel = document.querySelector(".level-label");
const menuBtn = document.querySelector(".menu-button");
const menuPanel = document.querySelector(".menu");
const iframe = document.querySelector(".iframe");
const skipButton = document.querySelector(".skip-button");
const refreshButton = document.querySelector(".refresh-button");
const tipButton = document.querySelector(".tip-button");
const menuOptions = document.querySelectorAll(".menu-option");
const menuPages = document.querySelectorAll(".menu-pages > div");
const levelPage = document.querySelector(".level-page");
const dialog = document.querySelector(".dialog");

let currentPageIndex = 0;
let currentTip = ``;
let debugEnabled = false;
let levelsData = {};

let backUpLevelData = {
  "0": {
    "name": "Welcome",
    "file": "0.html"
  },
  "1": {
    "name": "Basic",
    "file": "1.html"
  }
}

function level() {
  this.currentLevel = 0;
  this.tipEnable = true;
  this.refreshEnable = true;
  this.skipEnable = false;
  this.skipTime = 0;
}

level.prototype.levelInit = function (level) {
  this.currentLevel = level;
  this.currentCompleteMessage = "";
  levelManager.setTipEnable(true);
  levelManager.setRefreshEnable(true);
  levelManager.setLevelLabelEnable(true);
  levelManager.setSkipEnable(false);
  levelLabel.textContent = "Level " + level;
  updateLevelButtons(level);
}

level.prototype.setRefreshEnable = function (enable) {
  this.refreshEnable = enable;
  refreshButton.classList.toggle("hide", !enable);
}

level.prototype.setTipEnable = function (enable) {
  this.tipEnable = enable;
  tipButton.classList.toggle("hide", !enable);
}

level.prototype.setSkipEnable = function (enable) {
  this.skipEnable = enable;
  skipButton.classList.toggle("hide", !enable);
}

level.prototype.setSkipTime = function (time) {
  this.skipTime = time;
  if (!time) return;

  timeout = setTimeout(function () {
    if (this.skipTime === 0) {
      clearTimeout(timeout);
    }
    levelManager.setSkipTime(0)
    levelManager.setSkipEnable(true);
    clearTimeout(timeout);
  }, time * 1000);
}

level.prototype.setLevelLabelEnable = function (enable) {
  levelLabel.classList.toggle("hide", !enable);
}

const levelManager = new level();

function dlog(text) {
  if (debugEnabled) {
    console.log(text);
  }
}

// Save system
const SAVE_KEY = "buttonGame3Save";
let saveData = {
  unlockedLevels: [0, 1],
  skippedLevels: []
};

function loadSave() {
  const data = localStorage.getItem(SAVE_KEY);
  if (data) {
    try {
      saveData = JSON.parse(data);
    } catch (e) {
      saveData = { unlockedLevels: [0, 1], skippedLevels: [] };
    }
  }
}

function saveProgress() {
  localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
}

function unlockLevel(level) {
  if (!saveData.unlockedLevels.includes(level)) {
    saveData.unlockedLevels.push(level);
    saveProgress();
  }
}

function markSkipped(level) {
  if (!saveData.skippedLevels.includes(level)) {
    saveData.skippedLevels.push(level);
    unlockLevel(level + 1);
    saveProgress();
  }
}

function unmarkSkipped(level) {
  const index = saveData.skippedLevels.indexOf(level);
  if (index !== -1) {
    saveData.skippedLevels.splice(index, 1);
    saveProgress();
  }
}

// Function to load levels from JSON
async function loadLevels() {
  try {
    const response = await fetch('./src/data/levels.json');
    levelsData = await response.json();
    generateLevelButtons();
  } catch (error) {
    console.error('Error loading levels:', error);
    // Fallback to default levels if JSON loading fails
    levelsData = backUpLevelData;
    generateLevelButtons();
  }
}

// Function to generate level buttons dynamically
function generateLevelButtons() {
  // Clear existing buttons
  levelPage.innerHTML = '';
  
  // Create buttons for each level
  Object.keys(levelsData).forEach(levelKey => {
    const levelNum = parseInt(levelKey);
    const levelInfo = levelsData[levelKey];

    const locked = !saveData.unlockedLevels.includes(levelNum);
    const skiped = saveData.skippedLevels.includes(levelNum);
    
    const button = document.createElement('button');
    button.textContent = "Level " + levelKey + ": " + levelInfo.name;
    button.setAttribute('data-level', levelNum);
    
    // Add current class if it's the current level
    if (levelNum === levelManager.currentLevel) {
      button.classList.add('current');
    }
    
    if (locked) {
      button.classList.add('locked');
      // button.classList.add('hide');
      // button.textContent = "Level " + levelKey + ": ???";
    } // else {
      // button.textContent = "Level " + levelKey + ": " + levelInfo.name;
    // }
    
    if (skiped) {
      button.classList.add('skiped');
    }
    
    // Add click event listener
    button.addEventListener('click', () => {
      if (locked) return;
      goTo(levelNum);
      updateLevelButtons(levelNum);
      closeMenu();
    });
    
    levelPage.appendChild(button);
  });
}

// Function to update level buttons current state
function updateLevelButtons(currentLevel) {
  const levelButtons = levelPage.querySelectorAll('button');
  levelButtons.forEach(button => {
    button.classList.remove('current');
    if (parseInt(button.getAttribute('data-level')) === currentLevel) {
      button.classList.add('current');
    }

    if (button.classList.contains('locked')) {
      // button.textContent = "Level " + levelKey + ": ???";
      button.disabled = true; // Disable locked buttons
    } else {
      // button.textContent = "Level " + levelKey + ": " + levelInfo.name;
      button.disabled = false; // Enable unlocked buttons
    }
    // Update skiped class
    const levelNum = parseInt(button.getAttribute('data-level'));
    if (saveData.skippedLevels.includes(levelNum)) {
      button.classList.add('skiped');
    } else {
      button.classList.remove('skiped');
    }
  });
}

function init() {
  loadSave();
  let urlParams = new URLSearchParams(window.location.search);
  let level = parseInt(urlParams.get('level'));
  // let unlock = parseInt(urlParams.get('unlock'));

  if (urlParams.get('debug') === "true") {
    debugEnabled = true;
  }

  // if (level) {
  //   goTo(level);
  // } else {
  //   goTo(0);
  // }

  if (debugEnabled) {
    document.querySelector(".debug-option").classList.remove("hide");
  }

  if (level) {
    goTo(level);
  }

  switchMenuPage(0, true);
  loadLevels(); // Load levels from JSON
}

window.addEventListener("message", (e) => {
  if (!e.data) return;

  switch (e.data.command) {
    case "init":
      levelManager.levelInit(e.data.level);
      updateLevelButtons(e.data.level);
      break;
    case "nextLevel":
      completeLevel();
      break;
    case "showTip":
      showTip();
      break;
    case "updateTip":
      currentTip = e.data.data;
      if (e.data.data === "") {
        levelManager.setTipEnable(false);
      } else {
        levelManager.setTipEnable(true);
      }
      break;
    case "updateCompleteMessage":
      levelManager.currentCompleteMessage = e.data.data;
      break;
    case "closeMenu":
      closeMenu();
      break;
    case "setRefreshEnable":
      levelManager.setRefreshEnable(e.data.data);
      break;
    case "setLevelLabelEnable":
      levelManager.setLevelLabelEnable(e.data.data);
      break;
    case "setSkipEnable":
      levelManager.setSkipEnable(e.data.data);
      break;
    case "setSkipTime":
      levelManager.setSkipTime(e.data.data);
      break;
    case "showMessage":
      showDialog(e.data.data.title, e.data.data.text, "OK")
      break;
  }
});

function levelChanged() {
  // showDialog("Level", "Level changed", "OK");
}

function completeLevel() {
  if (levelManager.currentLevel !== 0) {
    let completeMessage = "Level " + levelManager.currentLevel + " complete"
    if (levelManager.currentCompleteMessage !== "") {
      completeMessage = levelManager.currentCompleteMessage;
    }
    showDialog("Level Complete", completeMessage, "CompleteLevel", (button) => {
      if (button === "ok") {
        // Unlock next level only if user clicks "Next Level"
        unlockLevel(levelManager.currentLevel + 1);
        unmarkSkipped(levelManager.currentLevel);
        generateLevelButtons();
        updateLevelButtons(levelManager.currentLevel + 1);
        goTo(levelManager.currentLevel + 1);
      } else if (button === "cancel") {
        // Stay here: do not unlock next level, keep current button highlighted
        unlockLevel(levelManager.currentLevel + 1);
        unmarkSkipped(levelManager.currentLevel);
        generateLevelButtons();
        updateLevelButtons(levelManager.currentLevel);
      }
    });
  } else {
    // For level 0, always unlock next level and go to it
    unlockLevel(levelManager.currentLevel + 1);
    generateLevelButtons();
    updateLevelButtons(levelManager.currentLevel + 1);
    goTo(levelManager.currentLevel + 1);
  }
}

function goTo(level) {
  iframe.src = `./src/levels/${level}.html`;
  let log = `Go to level: ${levelManager.currentLevel}
Current page level: ${iframe.src}`;
  dlog(log);
  updateLevelButtons(level);
}

function showState() {
  let log = `Current level: ${levelManager.currentLevel}<br>
Current page level: ${iframe.src}`;

  showDialog("Debug", log, "OK")
}

function clickElement(e) {
  if (!menuPanel.contains(e.target) && !menuBtn.contains(e.target)) {
    closeMenu();
  }
}

function closeMenu() {
  menuPanel.classList.add("menu-hidden");
  menuBtn.querySelector("img").src = "./res/images/icons/menu-icon.png";
  menuBtn.setAttribute("data-tooltip", menuPanel.classList.contains("menu-hidden")
    ? "Menu"
    : "Close Menu");
}

// Function to switch between menu pages
function switchMenuPage(targetIndex, force = false) {
  if (targetIndex === currentPageIndex && !force) return;

  const isGoingRight = targetIndex > currentPageIndex;

  // Remove select class from all options
  menuOptions.forEach(option => option.classList.remove("select"));
  [...menuPages].forEach(page => {
    let buttons = page.querySelectorAll("button");
    buttons.forEach(button => {
      button.disabled = true;
    });
  });

  // Add select class to clicked option
  menuOptions[targetIndex].classList.add("select");

  // Hide current page by sliding it out
  menuPages[currentPageIndex].style.transform = isGoingRight ? "translateX(-100%)" : "translateX(100%)";
  menuPages[currentPageIndex].style.opacity = "0";
  menuPages[currentPageIndex].style.pointerEvents = "none";

  // Position new page off-screen on the opposite side
  menuPages[targetIndex].style.transform = isGoingRight ? "translateX(100%)" : "translateX(-100%)";
  menuPages[targetIndex].style.opacity = "0";
  menuPages[targetIndex].style.pointerEvents = "none";

  // Show target page after a short delay for smooth transition
  setTimeout(() => {
    menuPages[targetIndex].style.opacity = "1";
    menuPages[targetIndex].style.transform = "translateX(0)";
    menuPages[targetIndex].style.pointerEvents = "auto";
  }, 150);

  menuPages[targetIndex].querySelectorAll("button").forEach(button => {
    if (button.classList.contains("locked")) {
      button.disabled = true;
    } else {
      button.disabled = false;
    }
  });

  currentPageIndex = targetIndex;
}

// Initialize menu pages
function initializeMenuPages() {
  menuPages.forEach((page, index) => {
    page.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    if (index === 0) {
      // Show first page by default
      page.style.opacity = "1";
      page.style.transform = "translateX(0)";
      page.style.pointerEvents = "auto";
      currentPageIndex = 0;
    } else {
      // Hide other pages
      page.style.opacity = "0";
      page.style.transform = "translateX(100%)";
      page.style.pointerEvents = "none";
    }
  });
}

// Store references to the event handlers
let currentOkHandler = null;
let currentCancelHandler = null;

function showDialog(title, text, buttonType = "OK", callback = (button) => {}) {
  const dialogTitle = dialog.querySelector(".dialog-title");
  const dialogText = dialog.querySelector(".dialog-text");
  const okButton = dialog.querySelector(".ok-button");
  const cancelButton = dialog.querySelector(".cancel-button");
  
  dialogTitle.textContent = title;
  dialogText.innerHTML = text;
  
  // Remove any existing closing class
  dialog.classList.remove("closing");

  // Handle button visibility and text
  if (cancelButton && buttonType === "OK") {
    cancelButton.style.display = "none";
  } else if (cancelButton) {
    cancelButton.style.display = "inline-block";
  }
  if (buttonType === "OK") {
    okButton.textContent = "OK";
  } else if (buttonType === "OKCancel") {
    okButton.textContent = "OK";
    cancelButton.textContent = "Cancel";
  } else if (buttonType === "YesNo") {
    okButton.textContent = "Yes";
    cancelButton.textContent = "No";
  } else if (buttonType === "Delete") {
    okButton.textContent = "Delete";
    cancelButton.textContent = "No";
  } else if (buttonType === "CompleteLevel") {
    okButton.textContent = "Next Level";
    cancelButton.textContent = "Stay here";
  }

  // Show the dialog
  dialog.showModal();

  // Remove any existing event listeners to avoid duplicates
  if (currentOkHandler) {
    okButton.removeEventListener("click", currentOkHandler);
  }
  if (currentCancelHandler) {
    cancelButton.removeEventListener("click", currentCancelHandler);
  }

  if (buttonType === "Delete") {
    okButton.classList.add("delete");
  } else {
    okButton.classList.remove("delete");
  }

  if (buttonType === "Delete") {
    cancelButton.focus();
  } else {
    okButton.focus();
  }


  // Create new event handlers and store references
  currentOkHandler = () => {
    hideDialog(buttonType === "YesNo" ? "yes" : "ok", callback);
  };

  currentCancelHandler = () => {
    hideDialog(buttonType === "YesNo" ? "no" : "cancel", callback);
  };

  // Add click event listeners for both buttons
  okButton.addEventListener("click", currentOkHandler);
  cancelButton.addEventListener("click", currentCancelHandler);
}

function hideDialog(button = "ok", callback = (button) => {}) {
  // Add closing animation class
  dialog.classList.add("closing");

  // Wait for animation to complete before actually closing
  setTimeout(() => {
    dialog.close();
    dialog.classList.remove("closing");
    callback(button);
  }, 150); // Match the animation duration
}

function refresh() {
  // goTo(levelManager.currentLevel)
  iframe.src = iframe.src;
}

function skip() {
  markSkipped(levelManager.currentLevel);
  goTo(levelManager.currentLevel + 1);
  generateLevelButtons();
  updateLevelButtons(levelManager.currentLevel + 1);
  // completeLevel();
}

function showTip() {
  if (!currentTip) {
    currentTip = "No tip available.";
  }
  showDialog("Tip", currentTip, "OK", (button) => {
    // console.log("Clicked " + button + " button");
  });
}

function askRefresh() {
  showDialog("Refresh", "Are you sure you want to refresh this level?", "YesNo", (button) => {
    if (button === "yes") {
      refresh();
    }
  })
}

function askSkip() {
  showDialog("Skip", "Are you sure you want to skip this level? You can come back later.", "YesNo", (button) => {
    if (button === "yes") {
      skip();
    }
  })
}

// Start with menu open or closed as desired
menuPanel.classList.add("menu-hidden");

// Initialize menu pages on load
initializeMenuPages();

// Add click event listeners to menu options
menuOptions.forEach((option, index) => {
  option.addEventListener("click", () => {
    switchMenuPage(index);
  });
});

menuBtn.addEventListener("click", () => {
  menuPanel.classList.toggle("menu-hidden");
  menuBtn.setAttribute("data-tooltip", menuPanel.classList.contains("menu-hidden")
    ? "Menu"
    : "Close Menu");

  menuBtn.querySelector("img").src = menuPanel.classList.contains("menu-hidden")
    ? "./res/images/icons/menu-icon.png"
    : "./res/images/icons/close-icon.png";
});

tipButton.addEventListener("click", () => {
  showTip();
});

refreshButton.addEventListener("click", () => {
  askRefresh();
});

skipButton.addEventListener("click", () => {
  askSkip();
});

title.addEventListener("click", () => {
  document.location.reload();
});

// Optional: close menu when clicking outside
document.addEventListener("click", (e) => {
  clickElement(e);
});

document.querySelector("#about-the-game").addEventListener("click", () => {
  closeMenu();
  showDialog("Button Game", "Button Game 3 is made by @ChathamHung on Github, it is open source web game.", "OK");
});

document.querySelector("#about-game-2").addEventListener("click", () => {
  closeMenu();
  window.open("https://chathamhung.github.io/TheButtonGame2/", "_blank");
});

document.querySelector("#about-game-1").addEventListener("click", () => {
  closeMenu();
  showDialog("The Button Game 1", "The Button Game 1 is made by @ChathamHung, <br>but it is using PowerPoint to maked.", "OK");
});

iframe.addEventListener("load", () => {
  levelChanged();
});

// Deebug

document.querySelector("#debug-print-state").addEventListener("click", () => {
  closeMenu();
  showState();
});

document.querySelector("#debug-goto-level").addEventListener("click", () => {
  closeMenu();
  let value = prompt("Enter level number: ", "0");
  if (!value) return;
  goTo(Number(value));
  closeMenu();
});

// Debug: Delete all data
document.querySelector("#debug-delete-data").addEventListener("click", () => {
  localStorage.removeItem(SAVE_KEY);
  saveData = { unlockedLevels: [0, 1], skippedLevels: [] };
  generateLevelButtons();
  updateLevelButtons(levelManager.currentLevel);
  showDialog("Debug", "All save data deleted.", "OK");
  closeMenu();
});

// Debug: Unlock all levels
document.querySelector("#debug-unlock-all").addEventListener("click", () => {
  saveData.unlockedLevels = Object.keys(levelsData).map(Number);
  saveProgress();
  generateLevelButtons();
  updateLevelButtons(levelManager.currentLevel);
  showDialog("Debug", "All levels unlocked.", "OK");
  closeMenu();
});

// Debug: Unlock entered level
document.querySelector("#debug-unlock-level").addEventListener("click", () => {
  let value = prompt("Enter level number to unlock:", "0");
  if (!value) return;
  unlockLevel(Number(value));
  generateLevelButtons();
  updateLevelButtons(levelManager.currentLevel);
  showDialog("Debug", "Level " + value + " unlocked.", "OK");
  closeMenu();
});

// Debug: Delete entered level
document.querySelector("#debug-delete-level").addEventListener("click", () => {
  let value = prompt("Enter level number to delete unlock:", "0");
  if (!value) return;
  const num = Number(value);
  // Remove from unlockedLevels
  saveData.unlockedLevels = saveData.unlockedLevels.filter(lvl => lvl !== num);
  // Remove from skippedLevels
  saveData.skippedLevels = saveData.skippedLevels.filter(lvl => lvl !== num);
  saveProgress();
  generateLevelButtons();
  updateLevelButtons(levelManager.currentLevel);
  showDialog("Debug", "Level " + value + " deleted from save.", "OK");
  closeMenu();
});

// Settings

document.querySelector("#reset-all-game").addEventListener("click", () => {
  closeMenu();
  showDialog(
    "Reset",
    "Are you sure you want to reset all game progress?<br> This will delete all save data and reload the game.",
    "Delete",
    (button) => {
      if (button === "ok") {
        showDialog(
          "Reset",
          "<strong>It's last warning!</strong><br><br> Are you very sure you want to reset all game progress?<br><strong> It's not joking!</strong>",
          "Delete",
          (button) => {
            if (button === "ok") {
              localStorage.removeItem(SAVE_KEY);
              location.reload();
            }
          }
        );
      }
    }
  );
});

document.querySelector("#fulllscreen-toggle").addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
    });
  } else {
    document.exitFullscreen();
  }
});

// Disable right click context menu
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

init();