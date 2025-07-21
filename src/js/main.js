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
const notifications = document.querySelector(".notifications");

const version = 0.11;
const versionType = "Alpha";
const updateName = "update 11";

let currentPageIndex = 0;
let currentTip = ``;
let debugEnabled = false;
let levelsData = {};

let allLevelsData = { // Backup of all levels data
  "0": {
    "name": "Welcome",
    "file": "0.html"
  },
  "1": {
    "name": "Basic",
    "file": "1.html"
  },
  "2": {
    "name": "More Buttons",
    "file": "2.html"
  },
  "3": {
    "name": "Hiding Button",
    "file": "3.html"
  },
  "4": {
    "name": "Emojis",
    "file": "4.html"
  },
  "5": {
    "name": "No button",
    "file": "5.html"
  },
  "6": {
    "name": "Some questions",
    "file": "6.html"
  },
  "7": {
    "name": "Captcha",
    "file": "7.html"
  },
  "8": {
    "name": "Catch Button",
    "file": "8.html"
  },
  "9": {
    "name": "More questions",
    "file": "9.html"
  },
  "10": {
    "name": "Chatting",
    "file": "10.html"
  },
  "11": {
    "name": "More hiding buttons",
    "file": "11.html"
  }
};

let allAchievementsData = { // Backup of all achievements data
  "1": {
    "name": "Welcome!",
    "tip": "Play Button Game 3!",
    "icon": "Welcome.png",
    "hide": false
  },
  "2": {
    "name": "Very Basic, right?",
    "tip": "Complete Level 1",
    "icon": "Basic.png",
    "hide": false
  },
  "3": {
    "name": "I'm really not a robot!",
    "tip": "Complete Level 7",
    "icon": "Robot.png",
    "hide": false
  },
  "4": {
    "name": "I can't do it!",
    "tip": "Skipped a level",
    "icon": "Skip.png",
    "hide": false
  },
  "5": {
    "name": "I did it!.. again...",
    "tip": "Complete a skipped level",
    "icon": "NoSkip.png",
    "hide": false
  },
  "6": {
    "name": "A little help",
    "tip": "First time using tip button",
    "icon": "Tip.png",
    "hide": false
  },
  "7": {
    "name": "Refreshing",
    "tip": "Refresh a level",
    "icon": "Refresh.png",
    "hide": false
  },
  "8": {
    "name": "Top 10 easily levels",
    "tip": "Complete Levels 1-10",
    "icon": "Easily.png",
    "hide": false
  },
  "9": {
    "name": "I got a new job!",
    "tip": "Complete Level 10",
    "icon": "Job.png",
    "hide": false
  }
};

// Achievements save system
const ACHIEVEMENTS_SAVE_KEY = "buttonGame3Achievements";
let achievementsSaveData = {
  unlocked: []
};

function loadAchievementsSave() {
  const data = localStorage.getItem(ACHIEVEMENTS_SAVE_KEY);
  if (data) {
    try {
      achievementsSaveData = JSON.parse(data);
    } catch (e) {
      achievementsSaveData = { unlocked: [] };
    }
  }
}

function saveAchievementsProgress() {
  localStorage.setItem(ACHIEVEMENTS_SAVE_KEY, JSON.stringify(achievementsSaveData));
}

function showNotification(title, message, icon, type, callback = (closeType) => {}, timeout = 5000) {
  let info = "";
  switch (type) {
    case "unlockAchievement":
      info = "Achievement Unlocked!";
      break;
    case "error":
      info = "Error";
      break;
    case "info":
      info = "Info";
      break;
    case "debug":
      info = "Debug";
      break;
    default:
      info = "Notification";
      break;
  }

  if (!icon || icon === "") {
    icon = "";
  }

  const notification = `
  <div class="notification">
    <img src="${icon}" class="notification-image" draggable="false">
    <div class="notification-content">
      <span class="notification-info">${info}</span>
      <h1 class="notification-title">${title}</h1>
      <span class="notification-text">${message}</span>
    </div>
    <button class="notification-close-button" title="Close notification">
      <img src="./res/images/icons/close-icon.png" draggable="false">
    </button>
  </div>
  `;
  notifications.insertAdjacentHTML("beforeend", notification);
  const newNotification = notifications.lastElementChild;
  const notificationImage = newNotification.querySelector(".notification-image");
  const closeButton = newNotification.querySelector(".notification-close-button");

  if (icon === "") {
    notificationImage.remove();
  }

  let timeoutId = null;
  let closed = false;

  // Helper to hide notification with animation
  function hideNotification(closeType) {
    if (closed) return;
    closed = true;
    newNotification.classList.add("hide-anim");
    if (timeoutId) clearTimeout(timeoutId);
    newNotification.addEventListener("animationend", () => {
      newNotification.remove();
      callback(closeType);
    }, { once: true });
  }

  // Automatically remove notification after timeout
  if (timeout && timeout > 0) {
    timeoutId = setTimeout(() => {
      hideNotification("timeout");
    }, timeout);
  }

  newNotification.addEventListener("click", () => {
    hideNotification("click");
  });

  closeButton.addEventListener("click", (e) => {
    e.stopPropagation();
    hideNotification("close");
  });
}

function closeAllNotifications() {
  const allNotifications = notifications.querySelectorAll(".notification");
  allNotifications.forEach(notification => {
    notification.classList.add("hide-anim");
    notification.addEventListener("animationend", () => {
      notification.remove();
    }, { once: true });
  });
}

// function hideAllNotifications() {
//   const allNotifications = notifications.querySelectorAll(".notification");
//   allNotifications.forEach(notification => {
//     notification.classList.add("hide-anim");
//     notification.addEventListener("animationend", () => {
//       notification.classList.add("hidden");
//     }, { once: true });
//   });
// }

// function showAllNotifications() {
//   const allNotifications = notifications.querySelectorAll(".notification");
//   allNotifications.forEach(notification => {
//     notification.classList.remove("hide-anim");
//     notification.classList.remove("hidden");
//     // notification.addEventListener("animationend", () => {
      
//     // }, { once: true });
//   });
// }

function showAchievementNotification(achievementId) {
  const achievement = achievementsData[achievementId];
  if (!achievement) return;

  const icon = achievement.icon ? `./res/images/achievements/${achievement.icon}` : "./res/images/achievement-icon.png";
  showNotification(achievement.name, achievement.tip, icon, "unlockAchievement", (closeType) => {
    if (closeType === "click") {
      openMenu();
      switchMenuPage(1); // Switch to achievements page
    }
  }, 10000);
}

function unlockAchievementNotification(id) {
  if (isAchievementUnlocked(id)) return;
  showAchievementNotification(id);
}

function unlockAchievement(id) {
  id = Number(id);
  if (!achievementsSaveData.unlocked.includes(id)) {
    achievementsSaveData.unlocked.push(id);
    saveAchievementsProgress();
    generateAchievementButtons();
  }
}

function lockAchievement(id) {
  id = Number(id);
  const idx = achievementsSaveData.unlocked.indexOf(id);
  if (idx !== -1) {
    achievementsSaveData.unlocked.splice(idx, 1);
    saveAchievementsProgress();
    generateAchievementButtons();
  }
}

function unlockAllAchievements() {
  achievementsSaveData.unlocked = Object.keys(achievementsData).map(Number);
  saveAchievementsProgress();
  generateAchievementButtons();
}

function lockAllAchievements() {
  achievementsSaveData.unlocked = [];
  saveAchievementsProgress();
  generateAchievementButtons();
}

function isAchievementUnlocked(id) {
  if (!id) return;
  return achievementsSaveData.unlocked.includes(Number(id));
}

function completeAchievement(id) {
  unlockAchievementNotification(id);
  unlockAchievement(id);
}

// Load achievements data from JSON
let achievementsData = {};

async function loadAchievements() {
  try {
    const response = await fetch('./src/data/achievements.json');
    achievementsData = await response.json();
    generateAchievementButtons();
  } catch (error) {
    achievementsData = allAchievementsData;
    generateAchievementButtons();
  }
}

// Generate achievement buttons
const achievementPage = document.querySelector(".achievement-page");
function generateAchievementButtons() {
  achievementPage.innerHTML = '';
  Object.keys(achievementsData).forEach(key => {
    const ach = achievementsData[key];
    const icon = ach.icon ? `./res/images/achievements/${ach.icon}` : "./res/images/achievement-icon.png";
    const unlocked = isAchievementUnlocked(key);
    
    const button = document.createElement('button');
    button.className = 'achievement-button';
    button.setAttribute('data-achievement', key);
    if (unlocked) {
      button.classList.add('unlocked');
    }
    
    const img = document.createElement('img');
    if (!ach.icon || ach.icon === "") {
      img.src = icon;
    } else {
      img.src = icon;
    }
    img.classList.add('achievement-image');
    img.draggable = false;
    
    const nameSpan = document.createElement('span');
    nameSpan.className = 'achievement-name';
    nameSpan.textContent = ach.name;

    if (ach.hide) {
      button.classList.add("hide");
    };

    button.appendChild(img);
    button.appendChild(nameSpan);

    // Show tip on click
    button.addEventListener('click', () => {
      closeMenu();
      if (unlocked) {
        showDialog(ach.name, ach.tip, "Achievement", () => {}, { icon: icon, achievementID: key });
      } else {
        showDialog(ach.name + " (Locked)", ach.tip, "Achievement", () => {}, { icon: icon, achievementID: key });
      }
    });

    achievementPage.appendChild(button);
  });
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
    levelsData = allLevelsData;
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
      if (levelNum === levelManager.currentLevel) {
        closeMenu();
        return;
      }
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
  loadAchievementsSave();
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
  loadAchievements(); // Load achievements from JSON
}

// Example: unlock "Welcome" achievement when game starts
// You can call unlockAchievement("1") wherever you want to unlock an achievement
init();
unlockAchievement(1);

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
    case "showNotification":
      showNotification(e.data.data.title, e.data.data.text)
      break;
  }
});

function levelChanged() {
  // showDialog("Level", "Level changed", "OK");
}

function completeLevel() {
  const isSkipped = saveData.skippedLevels.includes(levelManager.currentLevel);

  if (isSkipped) {
    completeAchievement(5);
  }

  unlockLevel(levelManager.currentLevel + 1);
  unmarkSkipped(levelManager.currentLevel);
  generateLevelButtons();
  updateLevelButtons(levelManager.currentLevel);

  switch (levelManager.currentLevel) {
    case 1:
      completeAchievement(2);
      break;
    case 7:
      completeAchievement(3);
      break;
    case 10:
      completeAchievement(9);
      break;
  
    default:
      break;
  }

  let hasAllLevels = true;
  for (let i = 1; i <= 11; i++) {
    if (!saveData.unlockedLevels.includes(i)) {
      hasAllLevels = false;
      break;
    }
  }
  if (hasAllLevels) {
    completeAchievement(8);
  }


  if (levelManager.currentLevel !== 0) {
    let completeMessage = "Level " + levelManager.currentLevel + " complete"
    if (levelManager.currentCompleteMessage !== "") {
      completeMessage = levelManager.currentCompleteMessage;
    }
    showDialog("Level Complete", completeMessage, "CompleteLevel", (button) => {
      if (button === "ok") {
        goTo(levelManager.currentLevel + 1);
      }
        // switch (levelManager.currentLevel) {
        //   case 1:
        //     unlockAchievementNotification(2);
        //     break;

        // default:
        //   break;
        // }
    });
  } else {
    goTo(levelManager.currentLevel + 1);
  }
}

function goTo(level) {
  iframe.src = `./src/levels/${level}.html`;
  let log = `Current level: ${levelManager.currentLevel}
Current page: ${iframe.src}`;
  dlog(log);
  updateLevelButtons(level);
}

function showState() {
  let log = `Current level: ${levelManager.currentLevel}<br>
Current page: ${iframe.src}`;

  // showDialog("Debug", log, "OK")
  showNotification("Debug", log, "", "debug", null, 10000);
}

function clickElement(e) {
  if (!menuPanel.contains(e.target) && !menuBtn.contains(e.target)) {
    closeMenu();
  }
}

function openMenu() {
  closeAllNotifications();
  menuPanel.classList.toggle("menu-hidden");
  menuBtn.setAttribute("data-tooltip", menuPanel.classList.contains("menu-hidden")
    ? "Menu"
    : "Close Menu");

  menuBtn.querySelector("img").src = menuPanel.classList.contains("menu-hidden")
    ? "./res/images/icons/menu-icon.png"
    : "./res/images/icons/close-icon.png";
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

function showDialog(title, text, buttonType = "OK", callback = (button) => { }, options = {}) {
  const dialogTitle = dialog.querySelector(".dialog-title");
  const dialogText = dialog.querySelector(".dialog-text");
  const okButton = dialog.querySelector(".ok-button");
  const cancelButton = dialog.querySelector(".cancel-button");
  const dialogImageContainer = dialog.querySelector(".dialog-image-container");

  dialogTitle.classList.remove("hide");
  dialogText.classList.remove("hide");

  okButton.classList.remove("hide");
  okButton.classList.remove("delete");
  cancelButton.classList.remove("hide");
  
  dialogTitle.textContent = title;
  dialogText.innerHTML = text;
  
  // Remove any existing closing class
  dialog.classList.remove("closing");

  const achievementUnlocked = isAchievementUnlocked(options.achievementID);

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
  } else if (buttonType === "Achievement") {
    okButton.textContent = "OK";
    cancelButton.textContent = "Show Tip";
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
    cancelButton.focus();
  } else {
    okButton.focus();
  }

  if (buttonType === "Achievement" && !achievementUnlocked) {
    dialogText.classList.add("hide");
  } else if (buttonType === "Achievement") {
    cancelButton.classList.add("hide");
  }

  if (options.icon) {
    dialogImageContainer.style.display = "flex";
    dialogImageContainer.querySelector(".dialog-image").src = options.icon;
  } else {
    dialogImageContainer.style.display = "none";
    dialogImageContainer.querySelector(".dialog-image").src = "";
  }

  if (buttonType === "Delete") {
    okButton.classList.add("delete");
  }

  // Create new event handlers and store references
  currentOkHandler = () => {
    hideDialog(buttonType === "YesNo" ? "yes" : "ok", callback);
  };

  currentCancelHandler = () => {
    if (buttonType === "Achievement" && options.achievementID) {
      dialogText.classList.remove("hide");
      cancelButton.classList.add("hide");
      okButton.focus();
      return;
    }
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

  completeAchievement(7);
}

function skip() {
  markSkipped(levelManager.currentLevel);
  goTo(levelManager.currentLevel + 1);
  generateLevelButtons();
  updateLevelButtons(levelManager.currentLevel + 1);
  completeAchievement(4);
  // completeLevel();
}

function showTip() {
  if (!currentTip) {
    currentTip = "No tip available.";
  }
  showDialog("Tip", currentTip, "OK", (button) => {
    // console.log("Clicked " + button + " button");
  });

  completeAchievement(6);
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
  openMenu();
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

document.querySelector("#visit-github").addEventListener("click", () => {
  closeMenu();
  window.open("https://github.com/ChathamHung/buttongame3", "_blank");
});

document.querySelector("#about-the-game").addEventListener("click", () => {
  closeMenu();
  showDialog("Button Game 3", `Version: ${version} ${versionType} (${updateName})`, "OK");
});

document.querySelector("#change-log").addEventListener("click", () => {
  closeMenu();
  showDialog("What's new?", `<style>
  .whatsnew-iframe {
    width: 500px;
    height: 400px;
    border: none;
  }
</style>
<iframe src="./src/html/whatsnew.html" class="whatsnew-iframe"></iframe>`, "OK");
});

document.querySelector("#about-game-2").addEventListener("click", () => {
  closeMenu();
  window.open("https://chathamhung.github.io/TheButtonGame2", "_blank");
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
  showNotification("Debug", "All levels locked.", "", "debug");
  closeMenu();
});

// Debug: Unlock all levels
document.querySelector("#debug-unlock-all").addEventListener("click", () => {
  saveData.unlockedLevels = Object.keys(levelsData).map(Number);
  saveProgress();
  generateLevelButtons();
  updateLevelButtons(levelManager.currentLevel);
  showNotification("Debug", "All levels unlocked.", "", "debug");
  closeMenu();
});

// Debug: Unlock entered level
document.querySelector("#debug-unlock-level").addEventListener("click", () => {
  closeMenu();
  let value = prompt("Enter level number to unlock:", "0");
  if (!value) return;
  unlockLevel(Number(value));
  generateLevelButtons();
  updateLevelButtons(levelManager.currentLevel);
  showNotification("Debug", "Level " + value + " unlocked.", "", "debug");
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
  showNotification("Debug", "Level " + value + " deleted from save.", "", "debug");
  closeMenu();
});

// Debug: Unlock a achievement
document.querySelector("#debug-unlock-achievement").addEventListener("click", () => {
  closeMenu();
  let value = prompt("Enter achievement id to unlock:", "1");
  if (!value) return;
  unlockAchievement(value);
  showNotification("Debug", "Achievement " + value + " unlocked.", "", "debug");
});

document.querySelector("#debug-lock-achievement").addEventListener("click", () => {
  closeMenu();
  let value = prompt("Enter achievement id to lock:", "1");
  if (!value) return;
  lockAchievement(value);
  showNotification("Debug", "Achievement " + value + " locked.", "", "debug");
});

document.querySelector("#debug-unlock-all-achievements").addEventListener("click", () => {
  closeMenu();
  unlockAllAchievements();
  showNotification("Debug", "All achievements unlocked.", "", "debug");
});

document.querySelector("#debug-lock-all-achievements").addEventListener("click", () => {
  closeMenu();
  lockAllAchievements();
  showNotification("Debug", "All achievements locked.", "", "debug");
});

// Settings

document.querySelector("#reset-all-game").addEventListener("click", () => {
  closeMenu();
  showDialog(
    "Reset",
    "Are you sure you want to reset all game progress? <br>This will delete all save data and reload the game.",
    "Delete",
    (button) => {
      if (button === "ok") {
        showDialog(
          "Reset",
          "<strong>It's last warning! </strong><br><br>Are you very sure you want to reset all game progress? <br><strong>It's not joking!</strong>",
          "Delete",
          (button) => {
            if (button === "ok") {
              localStorage.removeItem(SAVE_KEY);
              localStorage.removeItem(ACHIEVEMENTS_SAVE_KEY);
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