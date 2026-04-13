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
const fullscreenButton = document.querySelector(".fullscreen-button");
const fullscreenToggle = document.querySelector("#fulllscreen-toggle");
const downloadGameButton = document.querySelector("#download-game");
const debugBtn = document.querySelector(".debug-button");

const version = "1.0";
const versionType = "Release";
const gameUpdates = 20;

let currentPageIndex = 0;
let currentTip = ``;
let debugEnabled = false;
let demoEnabled = false;
let allowFullscreen = true;
let levelsData = {};
let menuOpened = false;

let appMode = false;
let appVersion = "";
let appUpdates = 0;
let appType = "unknown";
let titleBarEnabled = false;

const allLevelsData = {
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
    "name": "Really no button",
    "file": "11.html"
  },
  "12": {
    "name": "Code cracking",
    "file": "12.html"
  },
  "13": {
    "name": "Checking",
    "file": "13.html"
  },
  "14": {
    "name": "Puzzle",
    "file": "14.html"
  },
  "15": {
    "name": "More and more buttons",
    "file": "15.html"
  },
  "16": {
    "name": "Clicking button",
    "file": "16.html"
  },
  "17": {
    "name": "The Password Game",
    "file": "17.html"
  },
  "18": {
    "name": "Typing",
    "file": "18.html"
  },
  "19": {
    "name": "Memory Game",
    "file": "19.html"
  },
  "20": {
    "name": "Timer",
    "file": "20.html"
  },
  "21": {
    "name": "Send to Boss",
    "file": "21.html"
  },
  "22": {
    "name": "Advertisements",
    "file": "22.html"
  },
  "23": {
    "name": "A Message",
    "file": "23.html"
  },
  "24": {
    "name": "Google",
    "file": "24.html"
  },
  "25": {
    "name": "QR code",
    "file": "25.html"
  },
  "26": {
    "name": "Update",
    "file": "26.html"
  },
  "27": {
    "name": "Color Matching",
    "file": "27.html"
  },
  "28": {
    "name": "Email Scam",
    "file": "28.html"
  },
  "29": {
    "name": "Terms of Use",
    "file": "29.html"
  },
  "30": {
    "name": "RNG Game",
    "file": "30.html"
  },
  "31": {
    "name": "Simon Says",
    "file": "31.html"
  },
  "32": {
    "name": "Morse Code",
    "file": "32.html"
  },
  "33": {
    "name": "Clicking Moveing Button",
    "file": "33.html"
  },
  "34": {
    "name": "Find Emoji",
    "file": "34.html"
  },
  "35": {
    "name": "Error 404",
    "file": "35.html"
  },
  "36": {
    "name": "Slider bar",
    "file": "36.html"
  },
  "37": {
    "name": "Math Challenge",
    "file": "37.html"
  },
  "38": {
    "name": "Drag & Drop Puzzle",
    "file": "38.html"
  },
  "39": {
    "name": "Fake Virus Warning",
    "file": "39.html"
  },
  "40": {
    "name": "Social Media Feed",
    "file": "40.html"
  },
  "41": {
    "name": "Website Navigation",
    "file": "41.html"
  },
  "42": {
    "name": "Shape Clicking",
    "file": "42.html"
  },
  "43": {
    "name": "More Ads",
    "file": "43.html"
  },
  "44": {
    "name": "Flappy Button",
    "file": "44.html"
  },
  "45": {
    "name": "Memory Maze",
    "file": "45.html"
  },
  "46": {
    "name": "Minesweeper",
    "file": "46.html"
  },
  "47": {
    "name": "Simple Sudoku",
    "file": "47.html"
  },
  "48": {
    "name": "Word Guess",
    "file": "48.html"
  },
  "49": {
    "name": "Button Cliker",
    "file": "49.html"
  },
  "50": {
    "name": "End Game",
    "file": "50.html"
  }
};

const allAchievementsData = {
  "1": {
    "name": "Welcome!",
    "tip": "Play Button Game 3!",
    "icon": "Welcome.png",
    "hide": false
  },
  "2": {
    "name": "Very Basic... right?",
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
  },
  "10": {
    "name": "Super Clicker",
    "tip": "Clicked 1,000 times in Level 16",
    "icon": "Clicker.png",
    "hide": false
  },
  "11": {
    "name": "God of Password Game",
    "tip": "Complete Level 17",
    "icon": "Password.png",
    "hide": false
  },
  "12": {
    "name": "God of Memory Match",
    "tip": "Complete Level 14 in 15 moves or less",
    "icon": "Match.png",
    "hide": false
  },
  "13": {
    "name": "20 basic levels",
    "tip": "Complete Levels 1-20",
    "icon": "20Basic.png",
    "hide": false
  },
  "14": {
    "name": "Message",
    "tip": "A chat from Level 23",
    "icon": "Message.png",
    "hide": false
  },
  "15": {
    "name": "A update",
    "tip": "Complete Level 26",
    "icon": "Update.png",
    "hide": false
  },
  "16": {
    "name": "Chooses you 🫵",
    "tip": "Click \"CHOOSES YOU 🫵\" in Level 29",
    "icon": "ChoosesYOU.png",
    "hide": false
  },
  "17": {
    "name": "No clicking arrow",
    "tip": "Complete Level 36 without clicking the arrow",
    "icon": "NoArrow.png",
    "hide": false
  },
  "18": {
    "name": "All levels!",
    "tip": "Complete all existing levels",
    "icon": "AllLevels.png",
    "hide": false
  },
  "19": {
    "name": "Skip-Free!",
    "tip": "Complete all existing levels without skipping any level",
    "icon": "NoSkipping.png",
    "hide": true
  },
  "20": {
    "name": "100% Completion!",
    "tip": "Complete all existing levels (without skipping) and unlock all achievements (including hidden ones, except this one)",
    "icon": "100Completion.png",
    "hide": true
  }
};

// Achievements save system
const ACHIEVEMENTS_SAVE_KEY = "buttonGame3Achievements";
let achievementsSaveData = {
  unlocked: [],
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
  if (demoEnabled) return;
  localStorage.setItem(
    ACHIEVEMENTS_SAVE_KEY,
    JSON.stringify(achievementsSaveData),
  );
}

function showNotification(
  title,
  message,
  icon,
  type,
  callback = (closeType) => { },
  timeout = 5000,
) {
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
  const notificationImage = newNotification.querySelector(
    ".notification-image",
  );
  const closeButton = newNotification.querySelector(
    ".notification-close-button",
  );

  if (icon === "") {
    notificationImage.remove();
  }

  let timeoutId = null;
  let closed = false;

  // Helper to hide notification with animation
  function hideNotification(closeType) {
    if (closed) return;
    closed = true;

    if (saveData.menuAnimationsEnabled === false) {
      // If animations disabled, remove immediately
      newNotification.remove();
      if (timeoutId) clearTimeout(timeoutId);
      callback(closeType);
    } else {
      // Use animation if enabled
      newNotification.classList.add("hide-anim");
      if (timeoutId) clearTimeout(timeoutId);
      newNotification.addEventListener(
        "animationend",
        () => {
          newNotification.remove();
          callback(closeType);
        },
        { once: true },
      );
    }
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
  allNotifications.forEach((notification) => {
    notification.classList.add("hide-anim");
    notification.addEventListener(
      "animationend",
      () => {
        notification.remove();
      },
      { once: true },
    );
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

  const icon = achievement.icon
    ? `./res/images/achievements/${achievement.icon}`
    : "./res/images/achievements/achievement-icon.png";
  showNotification(
    achievement.name,
    achievement.tip,
    icon,
    "unlockAchievement",
    (closeType) => {
      if (closeType === "click") {
        openMenu();
        switchMenuPage(1); // Switch to achievements page
      }
    },
    10000,
  );
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
  // try {
  //   const response = await fetch("./src/data/achievements.json");
  //   achievementsData = await response.json();
  //   generateAchievementButtons();
  // } catch (error) {
  //   achievementsData = allAchievementsData;
  //   generateAchievementButtons();
  // }
  achievementsData = allAchievementsData;
  generateAchievementButtons();
}

// Generate achievement buttons
const achievementPage = document.querySelector(".achievement-page");
function generateAchievementButtons() {
  achievementPage.innerHTML = "";
  Object.keys(achievementsData).forEach((key) => {
    const ach = achievementsData[key];
    const icon = ach.icon
      ? `./res/images/achievements/${ach.icon}`
      : "./res/images/achievements/achievement-icon.png";
    const unlocked = isAchievementUnlocked(key);

    const button = document.createElement("button");
    button.className = "achievement-button";
    button.setAttribute("data-achievement", key);
    if (unlocked) {
      button.classList.add("unlocked");
    }

    const img = document.createElement("img");
    if (!ach.icon || ach.icon === "") {
      img.src = icon;
    } else {
      img.src = icon;
    }
    img.classList.add("achievement-image");
    img.draggable = false;

    const nameSpan = document.createElement("span");
    nameSpan.className = "achievement-name";
    nameSpan.textContent = ach.name;

    if (ach.hide && !unlocked) {
      img.src = "./res/images/achievements/hidden-achievement-icon.png";
      nameSpan.textContent = "???";
    }

    button.appendChild(img);
    button.appendChild(nameSpan);

    // Show tip on click
    button.addEventListener("click", () => {
      closeMenu();
      if (unlocked) {
        showDialog(ach.name, ach.tip, "Achievement", () => { }, {
          icon: icon,
          achievementID: key,
          hide: ach.hide,
        });
      } else {
        showDialog(ach.name + " (Locked)", ach.tip, "Achievement", () => { }, {
          icon: icon,
          achievementID: key,
          hide: ach.hide,
        });
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
};

level.prototype.setRefreshEnable = function (enable) {
  this.refreshEnable = enable;
  refreshButton.classList.toggle("hide", !enable);
};

level.prototype.setTipEnable = function (enable) {
  this.tipEnable = enable;
  tipButton.classList.toggle("hide", !enable);
};

level.prototype.setSkipEnable = function (enable) {
  this.skipEnable = enable;
  skipButton.classList.toggle("hide", !enable);
};

level.prototype.setLevelLabelEnable = function (enable) {
  levelLabel.classList.toggle("hide", !enable);
};

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
  skippedLevels: [],
  lastPlayedLevel: 0,
  autoSaveEnabled: true,
  levelLabelEnabled: false,
  menuAnimationsEnabled: true,
  menuBlurEnabled: true,
  bottomSafeZoneEnabled: false,
  showLockedEnabled: false,
  fullscreenButtonEnabled: true,
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
  if (demoEnabled) return;
  localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
  saveAchievementsProgress();
}

function saveEverything() {
  if (demoEnabled) return;
  saveProgress();
  saveAchievementsProgress();
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
  // try {
  //   const response = await fetch("./src/data/levels.json");
  //   levelsData = await response.json();
  //   generateLevelButtons();
  // } catch (error) {
  //   console.error("Error loading levels:", error);
  //   // Fallback to default levels if JSON loading fails
  //   levelsData = allLevelsData;
  //   generateLevelButtons();
  // }
  levelsData = allLevelsData;
  generateLevelButtons();
}

// Function to generate level buttons dynamically
function generateLevelButtons() {
  // Clear existing buttons
  levelPage.innerHTML = "";

  // Create buttons for each level
  Object.keys(levelsData).forEach((levelKey) => {
    const levelNum = parseInt(levelKey);
    const levelInfo = levelsData[levelKey];

    const locked = !saveData.unlockedLevels.includes(levelNum);
    const skiped = saveData.skippedLevels.includes(levelNum);

    const button = document.createElement("button");
    button.textContent = "Level " + levelKey + ": " + levelInfo.name;
    button.setAttribute("data-level", levelNum);

    // Add current class if it's the current level
    if (levelNum === levelManager.currentLevel) {
      button.classList.add("current");
    }

    if (locked) {
      button.classList.add("locked");
      // button.classList.add('hide');
      // button.textContent = "Level " + levelKey + ": ???";
    } // else {
    // button.textContent = "Level " + levelKey + ": " + levelInfo.name;
    // }

    if (skiped) {
      button.classList.add("skiped");
    }

    // Add click event listener
    button.addEventListener("click", () => {
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
  const levelButtons = levelPage.querySelectorAll("button");
  levelButtons.forEach((button) => {
    button.classList.remove("current");
    if (parseInt(button.getAttribute("data-level")) === currentLevel) {
      button.classList.add("current");
    }

    if (button.classList.contains("locked")) {
      // button.textContent = "Level " + levelKey + ": ???";
      button.disabled = true; // Disable locked buttons
    } else {
      // button.textContent = "Level " + levelKey + ": " + levelInfo.name;
      button.disabled = false; // Enable unlocked buttons
    }
    // Update skiped class
    const levelNum = parseInt(button.getAttribute("data-level"));
    if (saveData.skippedLevels.includes(levelNum)) {
      button.classList.add("skiped");
    } else {
      button.classList.remove("skiped");
    }
  });
}

function isMobileDevice() {
  return /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
}

function init() {
  loadSave();
  loadAchievementsSave();
  let urlParams = new URLSearchParams(window.location.search);
  let level = parseInt(urlParams.get("level"));
  let unlockto = parseInt(urlParams.get("unlockto"));

  if (urlParams.get("debug") === "true") {
    debugEnabled = true;
  }

  if (urlParams.get("app") === "true") {
    appMode = true;
    appVersion = urlParams.get("appVersion") || "0.0";
    appUpdates = parseInt(urlParams.get("appUpdates")) || 0;
    appType = urlParams.get("appMode") || "unknown";
    if (appType !== "offline" && appType !== "online") {
      appType = "unknown";
    }
    document.querySelector("#about-the-desktop").classList.remove("hide");
  }

  if (urlParams.get("titleBar") === "true") {
    titleBarEnabled = true;
    document.querySelector(".title-bar").classList.remove("hide");
    fullscreenButton.classList.remove("tool-tip-max-right");

    const appWindow = window.__TAURI__.window.getCurrentWindow();
    
    // function updateMaximizeButton() {
    //   appWindow.isMaximized().then((callback) => {
    //     if (callback) {
    //       document.querySelector(".title-bar .maximize-button img").src = "./res/images/icons/title-bar/restore-icon.png";
    //       document.querySelector(".title-bar .maximize-button").setAttribute("data-tooltip", "Restore");
    //     } else {
    //       document.querySelector(".title-bar .maximize-button img").src = "./res/images/icons/title-bar/maximize-icon.png";
    //       document.querySelector(".title-bar .maximize-button").setAttribute("data-tooltip", "Maximize");
    //     }
    //   });
    // }

    document.querySelector(".title-bar .minimize-button").addEventListener("click", () => {
      appWindow.minimize();
    });
    document.querySelector(".title-bar .maximize-button").addEventListener("click", () => {
      appWindow.toggleMaximize();
      // updateMaximizeButton();
    });
    document.querySelector(".title-bar .close-button").addEventListener("click", () => {
      appWindow.close();
    });

    // updateMaximizeButton();

    // document.querySelector('.topbar')?.addEventListener('mousedown', (e) => {
    //   if (e.buttons === 1) {
    //     // Primary (left) button
    //     e.detail === 2
    //       ? appWindow.toggleMaximize() // Maximize on double click
    //       : appWindow.startDragging(); // Else start dragging
    //   }
    // });
  }

  if (urlParams.get("demo") === "true") {
    demoEnabled = true;
    document.querySelector(".demo-tag").classList.remove("hide");
    // autoSaveToggle.querySelector(".setting-label").innerHTML += "<br><br><strong>Not available in demo.</strong>"
    autoSaveToggle.querySelector(".toggle-label").innerHTML = `* ${autoSaveToggle.querySelector(".toggle-label").innerHTML}`
    document.querySelector(".note-label").classList.remove("hide");
    iframe.src = "./src/levels/0.html?demo=true";
  }

  if (urlParams.get("noFullscreen") === "true") {
    allowFullscreen = false;
    fullscreenToggle.classList.add("disabled");
    fullscreenButtonToggle.classList.add("disabled");
  }
  
  if (urlParams.get("download") === "true") {
    openDownloadDialog();
    urlParams.delete("download");
    window.history.replaceState(
      {},
      "",
      `${location.pathname}?${urlParams.toString()}`,
    );
  }

  if (debugEnabled) {
    document.querySelector(".debug-option").classList.remove("hide");
    debugBtn.classList.remove("hide");
  }

  if (appMode || demoEnabled) {
    downloadGameButton.classList.add("hide");
  }

  // Load last played level if auto-save is enabled
  if (saveData.autoSaveEnabled && saveData.lastPlayedLevel > 0 && !level) {
    level = saveData.lastPlayedLevel;
  }

  if (level) {
    goTo(level);
  }

  if (saveData.autoSaveEnabled === undefined) {
    saveData.autoSaveEnabled = true;
  }
  if (saveData.levelLabelEnabled === undefined) {
    saveData.levelLabelEnabled = false;
  }
  if (saveData.bottomSafeZoneEnabled === undefined) {
    saveData.bottomSafeZoneEnabled = isMobileDevice();
  }

  if (unlockto) {
    for (let i = 0; i <= unlockto; i++) {
      unlockLevel(i);
    }
    urlParams.delete("unlockto");
    window.history.replaceState(
      {},
      "",
      `${location.pathname}?${urlParams.toString()}`,
    );
  }

  updateSettings();
  switchMenuPage(0, true);
  loadLevels();
  loadAchievements();
  saveEverything();
}

function openUrl(url) {
  if (appMode) {
    window.__TAURI__.opener.openUrl(url);
  } else {
    window.open(url, "_blank");
  }
}

// Example: unlock "Welcome" achievement when game starts
// You can call unlockAchievement("1") wherever you want to unlock an achievement
const autoSaveToggle = document.querySelector("#auto-save-toggle");
const autoSaveCheckbox = document.querySelector("#auto-save-checkbox");
const levelLabelToggle = document.querySelector("#level-label-toggle");
const levelLabelCheckbox = document.querySelector("#level-label-checkbox");
const menuAnimationsToggle = document.querySelector("#menu-animations-toggle");
const menuAnimationsCheckbox = document.querySelector(
  "#menu-animations-checkbox",
);
const menuBlurToggle = document.querySelector("#menu-blur-toggle");
const menuBlurCheckbox = document.querySelector("#menu-blur-checkbox");
const bottomSafeZoneToggle = document.querySelector("#bottom-safezone-toggle");
const bottomSafeZoneCheckbox = document.querySelector(
  "#bottom-safezone-checkbox",
);
const showLockedToggle = document.querySelector("#show-locked-toggle");
const showLockedCheckbox = document.querySelector("#show-locked-checkbox");
const fullscreenButtonToggle = document.querySelector(
  "#fullscreen-button-toggle",
);
const fullscreenButtonCheckbox = document.querySelector(
  "#fullscreen-button-checkbox",
);

function updateSettings() {
  autoSaveCheckbox.checked = !!saveData.autoSaveEnabled;
  levelLabelCheckbox.checked = !!saveData.levelLabelEnabled;
  menuAnimationsCheckbox.checked = saveData.menuAnimationsEnabled !== false;
  menuBlurCheckbox.checked = saveData.menuBlurEnabled !== false;
  bottomSafeZoneCheckbox.checked = !!saveData.bottomSafeZoneEnabled;
  showLockedCheckbox.checked = saveData.showLockedEnabled;
  fullscreenButtonCheckbox.checked = saveData.fullscreenButtonEnabled !== false;
  // Optionally update text or style if needed

  if (!allowFullscreen) {
    fullscreenToggle.disabled = true;
    fullscreenButtonToggle.disabled = true;
    fullscreenButtonCheckbox.checked = false;
  }

  if (demoEnabled) {
    autoSaveToggle.disabled = true;
    autoSaveToggle.classList.add("disabled");
    autoSaveCheckbox.checked = false;
  }

  if (appMode) {
    bottomSafeZoneToggle.disabled = true;
    bottomSafeZoneToggle.classList.add("hide");
    bottomSafeZoneCheckbox.checked = false;
    saveData.bottomSafeZoneEnabled = false;
  }

  if (saveData.levelLabelEnabled) {
    levelLabel.classList.add("enabled");
  } else {
    levelLabel.classList.remove("enabled");
  }
  if (saveData.menuAnimationsEnabled === false) {
    document.body.classList.add("no-animations");
  } else {
    document.body.classList.remove("no-animations");
  }
  if (saveData.menuBlurEnabled === false) {
    document.body.classList.add("no-menu-blur");
  } else {
    document.body.classList.remove("no-menu-blur");
  }
  if (saveData.bottomSafeZoneEnabled) {
    document.body.classList.add("bottom-safezone");
  } else {
    document.body.classList.remove("bottom-safezone");
  }
  if (saveData.showLockedEnabled) {
    document.body.classList.add("show-locked-levels");
  } else {
    document.body.classList.remove("show-locked-levels");
  }
  if (saveData.fullscreenButtonEnabled === false || !allowFullscreen) {
    fullscreenButton.classList.add("hide");
  } else {
    fullscreenButton.classList.remove("hide");
  }
}

autoSaveToggle.addEventListener("click", (e) => {
  // Prevent double toggling if clicking the switch directly
  if (demoEnabled) return;
  if (autoSaveToggle.disabled) return;
  if (e.target.classList.contains("switch-input")) return;
  saveData.autoSaveEnabled = !saveData.autoSaveEnabled;
  updateSettings();
  saveProgress();
});
autoSaveCheckbox.addEventListener("change", () => {
  if (demoEnabled) {
    autoSaveCheckbox.checked = false;
    return;
  };
  if (autoSaveCheckbox.disabled) return;
  saveData.autoSaveEnabled = autoSaveCheckbox.checked;
  updateSettings();
  saveProgress();
});

levelLabelToggle.addEventListener("click", (e) => {
  if (levelLabelToggle.disabled) return;
  if (e.target.classList.contains("switch-input")) return;
  saveData.levelLabelEnabled = !saveData.levelLabelEnabled;
  updateSettings();
  saveProgress();
});
levelLabelCheckbox.addEventListener("change", () => {
  if (levelLabelCheckbox.disabled) return;
  saveData.levelLabelEnabled = levelLabelCheckbox.checked;
  updateSettings();
  saveProgress();
});

menuAnimationsToggle.addEventListener("click", (e) => {
  if (menuAnimationsToggle.disabled) return;
  if (e.target.classList.contains("switch-input")) return;
  saveData.menuAnimationsEnabled = !saveData.menuAnimationsEnabled;
  updateSettings();
  saveProgress();

  // showDialog(
  //   "Setting Changed",
  //   "The page needs to be refreshed for animation changes to take all effect. <br>Would you like to refresh now?",
  //   "YesNo",
  //   (button) => {
  //     if (button === "yes") {
  //       location.reload();
  //     }
  //   }
  // );
});
menuAnimationsCheckbox.addEventListener("change", () => {
  if (menuAnimationsCheckbox.disabled) return;
  saveData.menuAnimationsEnabled = menuAnimationsCheckbox.checked;
  updateSettings();
  saveProgress();

  // showDialog(
  //   "Setting Changed",
  //   "The page needs to be refreshed for animation changes to take all effect. <br>Would you like to refresh now?",
  //   "YesNo",
  //   (button) => {
  //     if (button === "yes") {
  //       location.reload();
  //     }
  //   }
  // );
});

menuBlurToggle.addEventListener("click", (e) => {
  if (menuBlurToggle.disabled) return;
  if (e.target.classList.contains("switch-input")) return;
  saveData.menuBlurEnabled = !saveData.menuBlurEnabled;
  updateSettings();
  saveProgress();
});
menuBlurCheckbox.addEventListener("change", () => {
  if (menuBlurCheckbox.disabled) return;
  saveData.menuBlurEnabled = menuBlurCheckbox.checked;
  updateSettings();
  saveProgress();
});

bottomSafeZoneToggle.addEventListener("click", (e) => {
  if (bottomSafeZoneToggle.disabled) return;
  if (e.target.classList.contains("switch-input")) return;
  saveData.bottomSafeZoneEnabled = !saveData.bottomSafeZoneEnabled;
  updateSettings();
  saveProgress();
});
bottomSafeZoneCheckbox.addEventListener("change", () => {
  if (bottomSafeZoneCheckbox.disabled) return;
  saveData.bottomSafeZoneEnabled = bottomSafeZoneCheckbox.checked;
  updateSettings();
  saveProgress();
});

showLockedToggle.addEventListener("click", (e) => {
  if (showLockedToggle.disabled) return;
  if (e.target.classList.contains("switch-input")) return;
  saveData.showLockedEnabled = !saveData.showLockedEnabled;
  updateSettings();
  saveProgress();
});
showLockedCheckbox.addEventListener("change", () => {
  if (showLockedCheckbox.disabled) return;
  saveData.showLockedEnabled = showLockedCheckbox.checked;
  updateSettings();
  saveProgress();
});

fullscreenButtonToggle.addEventListener("click", (e) => {
  if (fullscreenButtonToggle.disabled) return;
  if (e.target.classList.contains("switch-input")) return;
  if (!allowFullscreen) {
    fullscreenButtonCheckbox.checked = false;
    return;
  };
  saveData.fullscreenButtonEnabled = !saveData.fullscreenButtonEnabled;
  updateSettings();
  saveProgress();
});
fullscreenButtonCheckbox.addEventListener("change", () => {
  if (fullscreenButtonCheckbox.disabled) return;
  if (!allowFullscreen) {
    fullscreenButtonCheckbox.checked = false;
    return;
  };
  saveData.fullscreenButtonEnabled = fullscreenButtonCheckbox.checked;
  updateSettings();
  saveProgress();
});

window.addEventListener("message", (e) => {
  if (!e.data) return;
  dlog(e.data);
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
    case "showMessage":
      showDialog(e.data.data.title, e.data.data.text, "OK");
      break;
    case "showNotification":
      showNotification(e.data.data.title, e.data.data.text, e.data.data.icon);
      break;
    case "refresh":
      refresh();
      break;
    case "dlog":
      if (debugEnabled) {
        dlog(e.data.data.text);
        showNotification("Debug", e.data.data.text, "", "debug");
      }
      break;
    case "completeAchievement":
      completeAchievement(e.data.data.id);
      break;
  }
});

function levelChanged() {
  // showDialog("Level", "Level changed", "OK");
}

function goToNextLevel(currentLevel) {
  // dlog("currentLevel: " + currentLevel + " levelsData.length: " + Object.keys(levelsData).length);
  if (currentLevel + 1 >= Object.keys(levelsData).length) {
    goTo("NoMore");
  } else {
    goTo(currentLevel + 1);
  }
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
    case 17:
      completeAchievement(11);
      break;
    case 26:
      completeAchievement(15);
      break;

    default:
      break;
  }

  let hasAllLevels1to10 = true;
  let hasAllLevels1to20 = true;
  for (let i = 1; i <= 11; i++) {
    if (!saveData.unlockedLevels.includes(i)) {
      hasAllLevels1to10 = false;
      break;
    }
  }
  for (let i = 1; i <= 21; i++) {
    if (!saveData.unlockedLevels.includes(i)) {
      hasAllLevels1to20 = false;
      break;
    }
  }
  if (hasAllLevels1to10) {
    completeAchievement(8);
  }
  if (hasAllLevels1to20) {
    completeAchievement(13);
  }

  // Check if player has completed all levels
  let hasCompletedAllLevels = true;
  // let hasCompletedAllAchievements = true;
  const totalLevels = Object.keys(levelsData).length;

  // Check if all levels from 1 to the highest level are unlocked (excluding level 0 which is tutorial)
  for (let i = 1; i < totalLevels; i++) {
    if (!saveData.unlockedLevels.includes(i)) {
      hasCompletedAllLevels = false;
      break;
    }
  }

  // for (let i = 1; i <= Object.keys(achievementsData).length; i++) {
  //   console.log(i)
  //   if (!achievementsSaveData.unlocked.includes(i) && achievementsData[i] !== 20) {
  //     hasCompletedAllAchievements = false;
  //     break;
  //   }
  // }


  if (hasCompletedAllLevels && levelManager.currentLevel === totalLevels - 1) {
    completeAchievement(18);
  }
  
  if (hasCompletedAllLevels && saveData.skippedLevels.length === 0 && levelManager.currentLevel === totalLevels - 1) {
    completeAchievement(19);
  }
  
  if (hasCompletedAllLevels && saveData.skippedLevels.length === 0 && levelManager.currentLevel === totalLevels - 1 && achievementsSaveData.unlocked.length === Object.keys(achievementsData).length - 1) {
    completeAchievement(20);
  }

  if (levelManager.currentLevel !== 0) {
    let completeMessage = "Level " + levelManager.currentLevel + " complete";
    if (levelManager.currentCompleteMessage !== "") {
      completeMessage = levelManager.currentCompleteMessage;
    }
    showDialog("Level Complete", completeMessage, "CompleteLevel", (button) => {
      if (button === "ok") {
        goToNextLevel(levelManager.currentLevel);
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
    goToNextLevel(levelManager.currentLevel);
  }
}

function goTo(level) {
  iframe.src = `./src/levels/${level}.html`;
  if (saveData.autoSaveEnabled) {
    saveData.lastPlayedLevel = level;
    saveProgress();
  }
  let log = `Current level: ${levelManager.currentLevel}
Current page: ${iframe.src}`;
  dlog(log);
  updateLevelButtons(level);
}

function showState() {
  let log = `Current level: ${levelManager.currentLevel}<br>
Current page: ${iframe.src}`;

  showDialog("Debug", log, "OK");
  // showNotification("Debug", log, "", "debug", null, 10000);
}

function clickElement(e) {
  if (
    !menuPanel.contains(e.target) &&
    !menuBtn.contains(e.target) &&
    !levelLabel.contains(e.target) &&
    !debugBtn.contains(e.target)
  ) {
    closeMenu();
  }
}

function openMenu() {
  menuOpened = true;
  closeAllNotifications();
  menuPanel.classList.toggle("menu-hidden");
  menuBtn.setAttribute(
    "data-tooltip",
    menuPanel.classList.contains("menu-hidden") ? "Menu" : "Close Menu",
  );

  menuBtn.querySelector("img").src = menuPanel.classList.contains("menu-hidden")
    ? "./res/images/icons/menu-icon.png"
    : "./res/images/icons/close-icon.png";

  debugBtn.classList.add("hide");
}

function closeMenu() {
  menuOpened = false;
  menuPanel.classList.add("menu-hidden");
  menuBtn.querySelector("img").src = "./res/images/icons/menu-icon.png";
  menuBtn.setAttribute(
    "data-tooltip",
    menuPanel.classList.contains("menu-hidden") ? "Menu" : "Close Menu",
  );

  if (debugEnabled) {
    debugBtn.classList.remove("hide");
  }
}

// Function to switch between menu pages
function switchMenuPage(targetIndex, force = false) {
  if (targetIndex === currentPageIndex && !force) return;

  const isGoingRight = targetIndex > currentPageIndex;

  // Remove select class from all options
  menuOptions.forEach((option) => option.classList.remove("select"));
  [...menuPages].forEach((page) => {
    // page.tabIndex = -1;
    let buttons = page.querySelectorAll("button");
    buttons.forEach((button) => {
      button.disabled = true;
    });
  });

  // Add select class to clicked option
  menuOptions[targetIndex].classList.add("select");

  // Hide current page by sliding it out
  menuPages[currentPageIndex].style.transform = isGoingRight
    ? "translateX(-100%)"
    : "translateX(100%)";
  menuPages[currentPageIndex].style.opacity = "0";
  menuPages[currentPageIndex].style.pointerEvents = "none";

  // Position new page off-screen on the opposite side
  menuPages[targetIndex].style.transform = isGoingRight
    ? "translateX(100%)"
    : "translateX(-100%)";
  menuPages[targetIndex].style.opacity = "0";
  menuPages[targetIndex].style.pointerEvents = "none";

  // Show target page after a short delay for smooth transition
  setTimeout(() => {
    menuPages[targetIndex].style.opacity = "1";
    menuPages[targetIndex].style.transform = "translateX(0)";
    menuPages[targetIndex].style.pointerEvents = "auto";
  }, 150);

  menuPages[targetIndex].querySelectorAll("button").forEach((button) => {
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
    // if (saveData.menuAnimationsEnabled) {
    //   page.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    // } else {
    //   page.style.transition = "none";
    // }
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

function showDialog(
  title,
  text,
  buttonType = "OK",
  callback = (button) => { },
  options = {},
) {
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
  const achievementHidden = isAchievementUnlocked(options.hide);

  if (achievementHidden && achievementUnlocked) {
    dialogTitle.textContent += " (Hidden)";
  }

  // Handle button visibility and text
  if (cancelButton && buttonType === "OK") {
    cancelButton.style.display = "none";
  } else if (cancelButton) {
    cancelButton.style.display = "inline-block";
  }
  switch (buttonType) {
    case "OK":
      okButton.textContent = "OK";
      break;
    case "OKCancel":
      okButton.textContent = "OK";
      cancelButton.textContent = "Cancel";
      break;
    case "YesNo":
      okButton.textContent = "Yes";
      cancelButton.textContent = "No";
      break;
    case "Delete":
      okButton.textContent = "Delete";
      cancelButton.textContent = "No";
      break;
    case "CompleteLevel":
      okButton.textContent = "Next Level";
      cancelButton.textContent = "Stay here";
      break;
    case "Achievement":
      okButton.textContent = "OK";
      cancelButton.textContent = "Show tip";
      break;
    case "OKOpen":
      okButton.textContent = "OK";
      cancelButton.textContent = "Open in new tab";
      break;
    case "Download":
      okButton.textContent = "Close";
      cancelButton.textContent = "Download manually";
      break;
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

  if (achievementHidden && !achievementUnlocked) {
    dialogImageContainer.querySelector(".dialog-image").src = "./res/images/achievements/hidden-achievement-icon.png";
    dialogTitle.textContent = "Hidden Achievement (Locked)";
    cancelButton.textContent = "Show spoiler";
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

function hideDialog(button = "ok", callback = (button) => { }) {
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

  if (!isAchievementUnlocked(7)) {
    completeAchievement(7);
  }
}

function skip() {
  markSkipped(levelManager.currentLevel);
  goToNextLevel(levelManager.currentLevel);
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
  showDialog(
    "Refresh",
    "Are you sure you want to refresh this level?",
    "YesNo",
    (button) => {
      if (button === "yes") {
        refresh();
      }
    },
  );
}

function askSkip() {
  showDialog(
    "Skip",
    "Are you sure you want to skip this level? <br>You can come back later.",
    "YesNo",
    (button) => {
      if (button === "yes") {
        skip();
      }
    },
  );
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
  if (menuOpened) {
    closeMenu();
  } else {
    openMenu();
  }
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
  if (!demoEnabled && !appMode) {
    document.location.href = "./";
  } else {
    document.location.reload();
  }
});

// Optional: close menu when clicking outside
document.addEventListener("click", (e) => {
  clickElement(e);
});

document.querySelector("#visit-github").addEventListener("click", () => {
  closeMenu();
  if (!demoEnabled) {
    openUrl("https://github.com/ChathamHung/buttongame3");
  } else {
    showDialog("Visit on GitHub", "Please vist: https://github.com/ChathamHung/buttongame3");
  }
});

document.querySelector("#about-the-game").addEventListener("click", () => {
  closeMenu();
  showDialog(
    demoEnabled ? "Button Game 3 (Demo)" : "Button Game 3",
    `Version: ${version} ${versionType} (update ${gameUpdates})`,
    "OK",
  );
});

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

document.querySelector("#about-the-desktop").addEventListener("click", async () => {
  closeMenu();
  if (appMode) {
    await window.__TAURI__.dialog.message(`Version: v${appVersion} ${capitalizeFirstLetter(appType)} (update ${appUpdates})`, { title: 'Button Game 3 Desktop', kind: 'info' });
  } else {
    document.querySelector("#about-the-desktop").classList.add("hide");
  }
});

document.querySelector("#change-log").addEventListener("click", () => {
  closeMenu();
  showDialog(
    "Change log",
    `<style>
  .whatsnew-iframe {
    width: 500px;
    height: 400px;
    border: none;
  }
</style>
<iframe src="./src/html/whatsnew.html?inGame=true" class="whatsnew-iframe"></iframe>`,
    demoEnabled || appMode ? "OK" : "OKOpen", function (button) {
      if (button === "cancel") {
        openUrl("./src/html/whatsnew.html");
      }
    },
  );
});

document.querySelector("#about-game-2").addEventListener("click", () => {
  closeMenu();
  showDialog(
    "The Button Game 2",
    demoEnabled ? "The Button Game 2 is a older version, and it have 20 levels.<br> To play the old version, please visit: https://chathamhung.github.io/TheButtonGame2" : "The Button Game 2 is a older version, and it have 20 levels.",
    demoEnabled ? "OK" : "OKOpen", function (button) {
      if (button === "cancel") {
        openUrl("https://chathamhung.github.io/TheButtonGame2");
      }
    },
  );
});

document.querySelector("#about-game-1").addEventListener("click", () => {
  closeMenu();
  showDialog(
    "The Button Game 1",
    "The Button Game 1 is made by @ChathamHung,<br> but it is using PowerPoint to maked.<br> But it did not available to play now.",
    "OK",
  );
});

function openDownloadDialog() {
  closeMenu();
  if (!demoEnabled && !appMode) {
    closeMenu();
    showDialog(
      "Download desktop app",
      `<style>
        .download-iframe {
          height: 230px;
          width: 400px;
          border: none;
        }
      </style>
      <iframe src="https://chathamhung.github.io/buttongame3-desktop?inGame=true" class="download-iframe"></iframe>`,
      "Download",
      (button) => {
        if (button === "cancel") {
          openUrl("https://github.com/ChathamHung/buttongame3-desktop/releases");
        }
      }
    );
  } else if (appMode) {
    openUrl("https://chathamhung.github.io/buttongame3-desktop");
  }
}

downloadGameButton.addEventListener("click", openDownloadDialog);

levelLabel.addEventListener("click", () => {
  if (saveData.levelLabelEnabled) {
    if (!menuOpened) {
      openMenu();
    }
    switchMenuPage(0);
  }
});

iframe.addEventListener("load", () => {
  levelChanged();
});

// Deebug

document.querySelector("#debug-print-state").addEventListener("click", () => {
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
});

// Debug: Unlock all levels
document.querySelector("#debug-unlock-all").addEventListener("click", () => {
  saveData.unlockedLevels = Object.keys(levelsData).map(Number);
  saveProgress();
  generateLevelButtons();
  updateLevelButtons(levelManager.currentLevel);
  showNotification("Debug", "All levels unlocked.", "", "debug");
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
});

// Debug: Delete entered level
document.querySelector("#debug-delete-level").addEventListener("click", () => {
  let value = prompt("Enter level number to delete unlock:", "0");
  if (!value) return;
  const num = Number(value);
  // Remove from unlockedLevels
  saveData.unlockedLevels = saveData.unlockedLevels.filter(
    (lvl) => lvl !== num,
  );
  // Remove from skippedLevels
  saveData.skippedLevels = saveData.skippedLevels.filter((lvl) => lvl !== num);
  saveProgress();
  generateLevelButtons();
  updateLevelButtons(levelManager.currentLevel);
  showNotification(
    "Debug",
    "Level " + value + " deleted from save.",
    "",
    "debug",
  );
});

// Debug: Unlock a achievement
document
  .querySelector("#debug-unlock-achievement")
  .addEventListener("click", () => {
    let value = prompt("Enter achievement id to unlock:", "1");
    if (!value) return;
    unlockAchievement(value);
    showNotification(
      "Debug",
      "Achievement " +
      value +
      " (" +
      achievementsData[value].name +
      ") unlocked.",
      "",
      "debug",
    );
  });

document
  .querySelector("#debug-lock-achievement")
  .addEventListener("click", () => {
    let value = prompt("Enter achievement id to lock:", "1");
    if (!value) return;
    lockAchievement(value);
    showNotification(
      "Debug",
      "Achievement " +
      value +
      " (" +
      achievementsData[value].name +
      ") locked.",
      "",
      "debug",
    );
  });

document
  .querySelector("#debug-unlock-all-achievements")
  .addEventListener("click", () => {
    unlockAllAchievements();
    showNotification("Debug", "All achievements unlocked.", "", "debug");
  });

document
  .querySelector("#debug-lock-all-achievements")
  .addEventListener("click", () => {
    lockAllAchievements();
    showNotification("Debug", "All achievements locked.", "", "debug");
  });

// Settings

document.querySelector("#reset-all-game").addEventListener("click", () => {
  closeMenu();
  if (!demoEnabled) {
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
            },
          );
        }
      },
    );
  } else {
    showDialog(
      "Reset",
      "Are you sure you want to reset all game progress?",
      "Delete",
      (button) => {
        if (button === "ok") {
          localStorage.removeItem(SAVE_KEY);
          localStorage.removeItem(ACHIEVEMENTS_SAVE_KEY);
          location.reload();
        }
      },
    );
    // showDialog("Reset", "Reset are not available in demo.", "OK");
  }
});

fullscreenToggle.addEventListener("click", () => {
  toggleFullscreen();
});

fullscreenButton.addEventListener("click", () => {
  toggleFullscreen();
});

debugBtn.addEventListener("click", () => {
  if (debugEnabled) {
    if (!menuOpened) {
      openMenu();
    }
    switchMenuPage(4);
  }
});

function toggleFullscreen() {
  if (!allowFullscreen) return;
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch((err) => {
      console.error(
        `Error attempting to enable full-screen mode: ${err.message} (${err.name})`,
      );
    });
    fullscreenButton.querySelector("img").src = "./res/images/icons/unfullscreen-icon.png";
    fullscreenButton.setAttribute("data-tooltip", "Unfullscreen");
    document.querySelector(".title-bar").classList.add("hide");
  } else {
    document.exitFullscreen();
    fullscreenButton.querySelector("img").src = "./res/images/icons/fullscreen-icon.png";
    fullscreenButton.setAttribute("data-tooltip", "Fullscreen");
    if (titleBarEnabled) {
      document.querySelector(".title-bar").classList.remove("hide");
    }
  }
}

// Disable right click context menu
document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

init();

unlockAchievement(1);
