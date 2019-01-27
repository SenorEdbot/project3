import Phaser from 'phaser';

export default class Hud {
  constructor(scene) {
    this.scene = scene;
    this.canvas = this.scene.sys.game.canvas;
    this.hudComponent = null;

    // Default x and y to center screen
    this.x = this.canvas.width / 2;
    this.y = this.canvas.height / 2;

    this.style = {
      fill: '#777',
      fontFamily: 'monospace',
      lineSpacing: 4,
      textAlign: 'right'
    };
  }

  render(format, values) {
    this.hudComponent = this.scene.add
      .text(this.x, this.y, '', this.style)
      .setScrollFactor(0, 0)  // fixed position
      .setDepth(999)          // always on top
      .setOrigin(1, 0.5)      // Align bottom right
      .setText(Phaser.Utils.String.Format(format, values))
  }

  update(format, values) {
    this.hudComponent.setText(Phaser.Utils.String.Format(format, values));
  }
}
