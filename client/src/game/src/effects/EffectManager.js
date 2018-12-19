export default class EffectManager {
  constructor(game) {
    this.game = game;
    this.maxCorpses = 10;
    this.corpses = [];
  }

  addCorpse(x, y) {
    if (this.corpses.length > this.maxCorpses) {
      this.corpses[0].destroy();
      this.corpses.shift();
    }

    let corpse = this.game.add.sprite(x, y, 'corpse').setDepth(-1);
    this.corpses.push(corpse);
  }

  playGunshot() {
    this.game.sound.add('gunshot').play();
  }
}
