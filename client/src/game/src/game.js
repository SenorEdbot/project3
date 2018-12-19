import Phaser from './phaser';
import Player from './characters/Player';
import EffectManager from './effects/EffectManager';
import TimeSurvival from './modes/TimeSurvival';

let config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: '#000',
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      setBounds: {
        x: 0,
        y: 0,
        width: 2000,
        height: 2000,
        thickness: 12
      }
    }
  },
  scene: {
    preload,
    create,
    update,
    extend: {
      caption: null,
      captionFormat: null,
      enemies: [],
      enemiesTotal: 20,
      enemiesAlive: null,
      effectManager: null,
      gameMode: null,
      land: null,
      player: null
    }
  }
}

let game = new Phaser.Game(config);

function preload() {

  // WORLD
  this.load.image('earth', 'assets/images/tanks/scorched_earth.png');

  // CHARACTERS
  this.load.image('player', 'assets/images/topdown/player machinegun.gif');
  this.load.image('zombie1', 'assets/images/topdown/zombie.gif');
  this.load.image('zombie2', 'assets/images/topdown/zombie 2.gif');

  // AUDIO
  this.load.audio('gunshot', 'assets/audio/gunshot.wav');

  // WEAPONS
  this.load.image('bullet', 'assets/images/tanks/bullet.png');

  // EFFECTS
  this.load.image('corpse', 'assets/images/blood/corpse.png');

}

function create() {

  // WORLD
  this.physics.world.setBounds(-1000, -1000, 2000, 2000);

  // LAND (background)
  this.land = this.add.tileSprite(0, 0, 2000, 2000, 'earth').setDepth(-2);
  this.land.fixedToCamera = true;

  // PLAYER
  this.player = new Player(this);

  // GAME MODE
  this.gameMode = new TimeSurvival(this, this.player);
  this.gameMode.init();

  // CAMERAS
  this.cameras.main.setBounds(-1000, -1000, 1000, 1000).setName('main');
  this.cameras.main.startFollow(this.player.sprite);

  // EFFECTS
  this.effectManager = new EffectManager(this);

  // ON-SCREEN TEXT
  let captionStyle = {
    fill: '#fff',
    fontFamily: 'monospace',
    lineSpacing: 4
  };

  this.captionFormat = (
    'Time Survived:     %1s\n' +
    'Difficulty:       x%2\n' +
    'Enemies killed:    %3\n' +
    'Health:            %4\n' +
    'Shots fired:       %5\n' +
    'Accuracy:          %6%\n'
  );
  this.caption = this.add.text(16, 16, '', captionStyle);
  this.caption.setScrollFactor(0, 0);
}

function update() {

  this.player.update();
  this.gameMode.update();

  // UPDATE CAPTION TEXT
  this.caption.setText(Phaser.Utils.String.Format(this.captionFormat, [
    this.gameMode.timeSurvived,
    parseFloat(this.gameMode.difficulty).toFixed(1),
    this.player.enemiesKilled,
    'N/A',
    this.player.shotsFired,
    Math.floor((this.player.shotsHit / this.player.shotsFired) * 100)
  ]));
}
