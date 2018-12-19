export default class InputBindings {
  constructor(game) {

    // MOUSE
    this.pointer = game.input.activePointer;

    // KEYBOARD
    this.W = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.A = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.S = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.D = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.SHIFT = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

  }
}
