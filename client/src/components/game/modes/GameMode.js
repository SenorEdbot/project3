import Phaser from 'phaser';
import Zombie from '../enemies/zombie';
import Tutorial from '../tutorial';

export default class GameMode {
  constructor(scene) {
    // Phaser scene
    this.scene = scene;

    // Player
    this.player = this.scene.player;

    // GameMode
    this.name = 'Default';
    this.started = false;
    this.canUpdate = false;
    this.nextUpdate = 0;
    this.timeSurvived = 0;

    // Difficulty
    this.difficulty = this.randomIntInRange(2, 5);

    // Enemies
    this.enemies = [];

    // Game start trigger
    this.trigger = { x: 0, y: 0 };
    this.triggerKey = 'KeyE';
    this.triggerColor = '#00b220';
    this.triggerRange = 150;
    this.triggerText = 'Press \'E\' to start';
    this.startDelay = 7000;
    this.canTrigger = false;

    // On-screen trigger text
    const triggerCaptionStyle = {
      fill: this.triggerColor,
      fontFamily: 'monospace'
    }
    this.triggerCaption = this.scene.add
      .text(this.scene.cameras.main.centerX - 50, 16, '', triggerCaptionStyle)
      .setScrollFactor(0, 0)      // Fix the text to the screen
      .setDepth(999);             // Keep text on top-most layer

    // Graphics
    this.graphics = this.scene.add.graphics();

    // Tutorial
    this.tutorial = new Tutorial(this.scene);

    // Keyboard events
    this.scene.input.keyboard.on('keydown', e => {
      // Trigger game start
      if (e.code === this.triggerKey && !this.started && this.canTrigger && this.tutorial.hasBeenCompleted) {
        this.start();
      }

      // Tutorial steps
      if (e.code === 'KeyW' && this.tutorial.activeTutorial === 'move') this.tutorial.goToNext();
      if (e.code === 'ShiftLeft' && this.tutorial.activeTutorial === 'sprint') setTimeout(() => this.tutorial.goToNext(), 2000);
      if (e.code === 'KeyR' && this.tutorial.activeTutorial === 'reload') this.tutorial.goToNext();
      if (e.code === 'KeyE' && this.tutorial.activeTutorial === 'hud') this.tutorial.goToNext();
      if (e.code === 'KeyE' && this.tutorial.activeTutorial === 'interact') {
        this.tutorial.goToNext();
        this.createGraphics();
      }
    });

    this.scene.input.on('pointerdown', e => {
      if (this.tutorial.activeTutorial === 'shoot') this.tutorial.goToNext();
    })

    // Update game component state
    this.scene.component.setState({ difficulty: this.difficulty });

    // In-game text style
    let captionStyle = {
      fill: '#777',
      fontFamily: 'monospace',
      lineSpacing: 4,
    };

    // In-game text format
    this.captionFormat = (
      'Mode:        %1\n' +
      'Time:        %2s\n' +
      'Kills:       %4\n' +
      'Difficulty:  %3\n'
    );

    // In-game text: Stats
    this.statsText = this.scene.add
    .text(16, 16, '', captionStyle)
    .setScrollFactor(0, 0)
    .setDepth(999);
  }

  createGraphics() {
    this.graphics
      .lineStyle(4, 0x00b220, 1)  // thickness, color, alpha
      .beginPath()
      .arc(this.trigger.x, this.trigger.y, this.triggerRange, Phaser.Math.DegToRad(0), Phaser.Math.DegToRad(360), true)
      .closePath()
      .strokePath()
      .setDepth(-1);
  }

  start() {
    this.started = true;

    setTimeout(() => {
      for (let i = 0; i < this.difficulty * 100; i++) {
        let enemy = new Zombie(this.scene);
        this.enemies.push(enemy)
        this.scene.zombies.add(enemy.sprite);
      }

      // Collision: Zombies & Obstacles
      this.scene.physics.add.collider(this.scene.zombies, this.scene.obstacles);

      // Let the gamemode start updating
      this.canUpdate = true;
    }, this.startDelay);
  }

  update() {
    if (this.started && this.canUpdate) {
      this.enemies.forEach(enemy => enemy.update());

      // If total enemies alive is less than { condition } spawn another enemy.
      if (this.scene.zombies.getChildren().length < this.difficulty * 100) this.addEnemy();

      if(this.player.isAlive && this.scene.time.now > this.nextUpdate) {
        this.nextUpdate = this.scene.time.now + 1000; // 1 second
        this.timeSurvived++;

        // Update the game component state
        this.scene.component.setState({ timeSurvived: this.timeSurvived });
      }
    }

    // Check if player is in range of trigger
    let distX = Math.abs(this.player.sprite.x - this.trigger.x);
    let distY = Math.abs(this.player.sprite.y - this.trigger.y);
    let range = this.triggerRange;
    this.canTrigger = (distX < range && distY < range) ? true : false;

    // Trigger text (show or hide based on player distance)
    let text = (this.canTrigger && !this.started && this.tutorial.hasBeenCompleted) ? this.triggerText : '';
    this.triggerCaption.setText(text);

    // Update the in-game text
    const stats = [
      this.name,
      this.timeSurvived,
      this.difficulty,
      this.player.kills
    ];

    this.setInGameText(stats);
  }

  setInGameText(statsArray) {
    this.statsText.setText(Phaser.Utils.String.Format(this.captionFormat, statsArray));
  }

  randomIntInRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  addEnemy() {
    let enemy = new Zombie(this.scene);
    this.enemies.push(enemy)
    this.scene.zombies.add(enemy.sprite);
  }
}
