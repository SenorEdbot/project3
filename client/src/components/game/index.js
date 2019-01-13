import React, { Component } from 'react';
import Phaser from 'phaser';
import Player from './player';
import Purge from './modes/purge';
import obstacles from './obstacles/obstacles.json';

export default class Game extends Component {
  componentDidMount() {
    this.game = new Phaser.Game({
      type: Phaser.AUTO,
      width: 1400,
      height: 800,
      parent: 'game-container',
      physics: {
        default: 'arcade',
        arcade: {
          debug: false
        }
      },
      scene: {
        preload: this.preload,
        create: this.create,
        update: this.update,
      }
    });
  }

  render() {
    return (
      <div id="game-container"></div>
    );
  }

  preload() {
    this.load.image('map', ['/assets/backgrounds/map02.jpg', '/assets/backgrounds/map02_n.png']);
    this.load.image('player', ['/assets/sprites/playerPistol.gif', '/assets/sprites/playerPistol_n.png']);
    this.load.image('zombie', ['/assets/sprites/zombie.gif', '/assets/sprites/playerPistol_n.png']);
    this.load.image('bullet', ['/assets/sprites/bullet.png', '/assets/sprites/playerPistol_n.png']);
  }

  create() {
    this.map = this.add
      .image(1336, 1210, 'map')
      .setDepth(-2)
      .setScale(2, 2)
      .setPipeline('Light2D');

    this.physics.world.setBounds(0, 0, 1336 * 2, 1210 * 2);
    this.lights.enable().setAmbientColor(0x010808);

    this.obstacles = this.physics.add.staticGroup();
    this.zombies = this.physics.add.group();

    this.player = new Player(this);
    this.gameMode = new Purge(this);

    // Obstacles
    const obs = this.obstacles;
    obstacles.forEach(ob => {
      let obstacle = obs.create(ob.x, ob.y).setVisible(false);
      obstacle.body.setSize(ob.w, ob.h);
    });

    this.physics.add.collider(this.obstacles, this.player.sprite);
    this.physics.add.collider(this.zombies, this.player.sprite, () => {
      this.player.damage();
    });

    this.cameras.main
      .startFollow(this.player.sprite)
      .setLerp(0.08, 0.08)
      .setBounds(0, 0, 1336 * 2, 1210 * 2);

    this.lights.addLight(1638, 1582, 200, 0xFFA233);

    // ON-SCREEN TEXT
    let captionStyle = {
      fill: '#fff',
      fontFamily: 'monospace',
      lineSpacing: 4
    };

    this.captionFormat = (
      'Health:    %1\n' +
      'Kills:     %2\n' +
      'Shots:     %3\n'
    );
    this.caption = this.add.text(16, 16, '', captionStyle);
    this.caption.setScrollFactor(0, 0);
    this.caption.setDepth(999);
  }

  update() {
    this.player.update();
    if (this.gameMode.started && this.gameMode.canUpdate) this.gameMode.update();

    // UPDATE CAPTION TEXT
    this.caption.setText(Phaser.Utils.String.Format(this.captionFormat, [
      Math.floor(this.player.health / 10),
      this.player.kills,
      this.player.shots
    ]));

    // console.log(this.input.activePointer.worldX, this.input.activePointer.worldY)
  }
}
