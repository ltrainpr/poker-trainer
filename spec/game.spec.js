var Game = require("../src/client/game/game");

describe("Game", () => {
  it("Creates Players", () => {
    expect(Game().players.length).toBe(10);
  });

  it("#button.moveButton", () => {
    var game = Game();
    var buttonIndex = game.button.generateButtonIndex();
    var nextButton = buttonIndex === 9 ? 0 : buttonIndex + 1;
    expect(game.button.moveButton(buttonIndex)).toBe(nextButton);
  });

  it("#button.underTheGun", () => {
    var game = Game();
    var buttonIndex = game.button.generateButtonIndex();
    var underTheGun = game.button.underTheGunIndex(buttonIndex);

    expect(underTheGun).toEqual(underTheGunPlayerIndex(buttonIndex));
  });

});

function underTheGunPlayerIndex(buttonIndex) {
  var idx = buttonIndex + 3;
  return idx > 9 ? idx.toString(10).split("")[1] : idx;
}