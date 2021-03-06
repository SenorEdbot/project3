import GameMode from './GameMode';

export default class Purge extends GameMode {
  constructor(scene) {
    super(scene);

    // Override defaults
    this.name = 'Purge';
    this.trigger = { x: 1443, y: 496 };
    this.triggerRange = 150;
    this.startDelay = 7000;
    this.difficulty = this.randomIntInRange(1, 5);
    this.captionFormat = (
      'Mode:    %1\n' +
      'Kills:   %2/%3\n'
    );
    this.captionStyle = {
      fill: 'orangered',
      fontFamily: 'monospace',
      lineSpacing: 4
    }

    // Custom props
    this.lightsOn = false;
    this.enemiesLeft = this.difficulty * 100;
    super.customStart = this.customStart;
  }

  customStart() {
    this.triggerCaption.setText(`Kill ${this.difficulty * 100} zombies.`);
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

  update() {
    if (this.started && this.canUpdate) {
      this.enemies.forEach(enemy => enemy.update());

      this.enemiesLeft = this.scene.zombies.getChildren().length;

      if(this.player.isAlive && this.scene.time.now > this.nextUpdate) {
        this.nextUpdate = this.scene.time.now + 1000; // 1 second
        this.timeSurvived++;

        // Update the game component state
        this.scene.component.setState({ timeSurvived: this.timeSurvived });
      }

      // Check if the player is still alive
      if (!this.player.isAlive) {

        this.setGameOver();

      }

    } else if (!this.started) {
      // Check if player is in range of trigger
      let distX = Math.abs(this.player.sprite.x - this.trigger.x);
      let distY = Math.abs(this.player.sprite.y - this.trigger.y);
      let range = this.triggerRange;
      this.canTrigger = (distX < range && distY < range) ? true : false;

      // Trigger text (show or hide based on player distance)
      let text;
      if (this.canTrigger && !this.started && this.tutorial.hasBeenCompleted) {
        text = this.triggerText;
      } else if (!this.canTrigger && !this.started && this.tutorial.hasBeenCompleted) {
        text = 'Find the blue van'
      }
      this.triggerCaption.setText(text);
    }

    // Update the in-game text
    const stats = [
      this.name,
      this.player.kills,
      this.difficulty * 100
    ];

    this.setInGameText(stats);

    // Save game on all enemies killed
    if (this.enemiesLeft === 0) {

      this.setGameOver()

    }
  }

  stopFlashing() {

    clearInterval(this.flashCarLights);

  }

}
