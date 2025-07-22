var currentLevel = 0;

function init(level) {
  currentLevel = level;
  sendCommand("init", currentLevel);
}


function sendCommand(command, data) {
  window.parent.postMessage({ command: command, data: data, level: currentLevel }, "*");
}

function level() {
  self.tipText = "";
  self.tipEnable = true;
}

level.prototype.completeLevel = function () {
  sendCommand("nextLevel");
};

level.prototype.updateTip = function (text) {
  self.tipText = text;
  sendCommand("updateTip", self.tipText);
};

level.prototype.updateCompleteMessage = function (text) {
  sendCommand("updateCompleteMessage", text);
};

level.prototype.showTip = function () {
  sendCommand("showTip", self.tipText);
};

level.prototype.setRefreshEnable = function (enable) {
  sendCommand("setRefreshEnable", enable);
};

level.prototype.setLevelLabelEnable = function (enable) {
  sendCommand("setLevelLabelEnable", enable);
};

level.prototype.setSkipEnable = function (enable) {
  sendCommand("setSkipEnable", enable);
};

level.prototype.setSkipTime = function (time) { // Deprecation
  sendCommand("setSkipTime", time);
};

level.prototype.showDialog = function (title, text) {
  sendCommand("showMessage", { title: title, text: text });
};

level.prototype.showNotification = function (title, text) {
  sendCommand("showNotification", { title: title, text: text });
};

level.prototype.completeAchievement = function (id) {
  sendCommand("completeAchievement", { id: id });
};

document.addEventListener("click", (e) => {
  if (e.target.closest('.menu') === null && e.target.closest('.menu-button') === null) {
    sendCommand("closeMenu");
  }
});