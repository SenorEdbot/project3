import GameMode from './GameMode';

export default class Survival extends GameMode {
  constructor(scene) {
    super(scene);

    // Override defaults
    this.name = 'Survival';
    this.trigger = { x: 1443, y: 496 };
    this.triggerRange = 150;
    this.startDelay = 7000;
    this.captionStyle = {
      fill: 'orangered',
      fontFamily: 'monospace',
      lineSpacing: 4,
    }

    // Custom props
    this.lightsOn = false;
  }

  customStart() {
    this.triggerCaption.setText(`Survive as long as possible.`);
    this.triggerCaption.setStyle(this.captionStyle);

    // Car lights
    this.rightTail = this.scene.lights.addLight(1392, 352, 150, 0xff0000, 1);
    this.leftTail = this.scene.lights.addLight(1482, 352, 150, 0xff0000, 1);
    this.leftHead = this.scene.lights.addLight(1362, 762, 220, 0xfcffd1, 2);
    this.rightHead = this.scene.lights.addLight(1512, 762, 220, 0xfcffd1, 2);

    this.flashCarLights = setInterval(() => {
      if (this.lightsOn) {
        this.rightTail.setIntensity(0);
        this.leftTail.setIntensity(0);
        this.leftHead.setIntensity(0);
        this.rightHead.setIntensity(0)
        this.lightsOn = false;
      } else {
        this.rightTail.setIntensity(1);
        this.leftTail.setIntensity(1);
        this.leftHead.setIntensity(2);
        this.rightHead.setIntensity(2)
        this.lightsOn = true;
      }
    }, 600);

  }

  stopFlashing() {
    clearInterval(this.flashCarLights);
  }
}
