import React, { Component } from 'react';
import Phaser from 'phaser';
import Player from './player';

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
        update: this.update
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
  }

  create() {
    this.map = this.add
      .image(1336, 1210, 'map')
      .setDepth(-2)
      .setScale(2, 2)
      .setPipeline('Light2D');
    this.physics.world.setBounds(0, 0, 1336 * 2, 1210 * 2);
    this.lights.enable();
    this.obstacles = this.physics.add.staticGroup();
    this.player = new Player(this);

    //------------------------------------
    const obs = this.obstacles;
    obs.create(600, 650, 'test').refreshBody();
    //------------------------------------

    const camera = this.cameras.main;
    const player = this.player.sprite;

    camera
      .startFollow(player)
      .setLerp(0.08, 0.08)
      .setBounds(0, 0, 1336 * 2, 1210 * 2);

    // Debug text (dev)
    let captionStyle = {
      fill: '#fff',
      fontFamily: 'monospace',
      lineSpacing: 4
    };

    this.captionFormat = (
      'Mouse: { x: %1, y: %2 }'
    );
    this.caption = this.add.text(16, 16, '', captionStyle);
    this.caption.setScrollFactor(0, 0);
    this.caption.setDepth(4);
  }

  update() {
    this.player.update();

    // Update debug text (dev)
    this.caption.setText(Phaser.Utils.String.Format(this.captionFormat, [
      this.input.activePointer.x,
      this.input.activePointer.y
    ]));
  }
}
