export default class EffectManager {
  constructor(scene) {
    this.scene = scene;
    this.maxCorpses = 100;
    this.corpses = [];
  }

  addCorpse(x, y) {

    // Limit number of active corpses
    if (this.corpses.length > this.maxCorpses) {
      this.corpses[0].destroy();
      this.corpses.shift();
    }

    let corpse = this.scene.add.sprite(x, y, 'corpse')
    corpse.setDepth(-1)
    corpse.setPipeline('Light2D')

    this.corpses.push(corpse);

  }

}
