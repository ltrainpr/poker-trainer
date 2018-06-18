var _ = require('underscore');

var Button = function() {
  function generateButtonIndex() { return _.random(9); }
  function moveButton(button) { return button === 9 ? 0 : button + 1; }
  function underTheGunIndex(button) { return button + 3; }

  return { generateButtonIndex, moveButton, underTheGunIndex };
};

module.exports = Button;