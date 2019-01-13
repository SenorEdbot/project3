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
      .image(1336 / 2, 1210 / 2, 'map')
      .setPipeline('Light2D');
    this.player = new Player(this);
    this.physics.world.setBounds(0, 0, 1336, 1210);
    this.lights.enable();

    const camera = this.cameras.main;
    const player = this.player.sprite;

    camera
      .setZoom(2)
      .startFollow(player)
      .setLerp(0.08, 0.08)
      .setBounds(0, 0, 1336, 1210);
  }

  update() {
    this.player.update();
  }
}
