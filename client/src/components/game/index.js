import React, { Component } from 'react';
import Phaser from 'phaser';
import userServices from '../../services/userServices'
import Player from './player';
import Purge from './modes/purge';
import obstacles from './obstacles/obstacles.json';

export default class Game extends Component {
  state = {
    username: '',
    timeSurvived: 0,
    difficulty: 0,
    enemiesKilled: 0,
    health: 0,
    shotsFired: 0,
    accuracy: 0,
    previousStats: {}
  }

  getUser = (user) => {
    // TODO: refactor
    this.props.getUser(user);
  }

  componentWillMount() {
    // Get user nickname from Auth0
    const { userProfile, getProfile } = this.props.auth;

    this.setState({ profile: {} });

    if (!userProfile) {
      getProfile((err, profile) => this.setState({ profile, username: profile.nickname }));
    } else {
      this.setState({ profile: userProfile });

      // FIXME: issue here when mounting again, player cannot move.
      console.log('/game/index.js/componentWillMount()');
    }
  }

  componentWillUnmount() {
    /*
      Note: there's still a delay when a new Phaser Game
      is created but this temporarily fixes issues with
      players being unable to move when this remounts.
    */

    // Destroy the existing Phaser Game.
    if (this.game) this.game.destroy(true, false);
  }

  componentDidMount() {
    // Initialize the game
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
        component: this
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
    // React component (parent)
    this.component = this.game.config.sceneConfig.component;

    // Map
    this.map = this.add
      .image(1336, 1210, 'map')
      .setDepth(-2)
      .setScale(2, 2)
      .setPipeline('Light2D');


    // Game variables
    this.obstacles = this.physics.add.staticGroup();
    this.zombies = this.physics.add.group();
    this.player = new Player(this, this.component.state.username);
    this.gameMode = new Purge(this);
    this.userLoaded = false;


    // Obstacles
    const obs = this.obstacles;
    obstacles.forEach(ob => {
      let obstacle = obs.create(ob.x, ob.y).setVisible(false);
      obstacle.body.setSize(ob.w, ob.h);
    });


    // Phsyics
    this.physics.world.setBounds(0, 0, 1336 * 2, 1210 * 2);
    this.physics.add.collider(this.obstacles, this.player.sprite);
    this.physics.add.collider(this.zombies, this.player.sprite, () => this.player.damage());
    this.physics.add.collider(this.zombies);


    // Camera
    this.cameras.main
      .startFollow(this.player.sprite)
      .setLerp(0.08, 0.08)
      .setBounds(0, 0, 1336 * 2, 1210 * 2);


    // Lighting
    this.lights.addLight(1638, 1582, 200, 0xFFA233);
    this.lights
      .enable()
      .setAmbientColor(0x010808);


    // In-game text style
    let captionStyle = {
      fill: '#777',
      fontFamily: 'monospace',
      lineSpacing: 4,
      alignText: 'center'
    };

    // In-game text format
    this.captionFormat = (
      'Health:      %1\n' +
      'Kills:       %2\n' +
      'Shots:       %3\n' +
      'Difficulty:  %4\n'
    );

    this.usernameTextFormat = (
      '%1'
    );

    // In-game text: Stats
    this.statsText = this.add
      .text(16, 16, '', captionStyle)
      .setScrollFactor(0, 0)
      .setDepth(999);

    // In-game text: Username
    this.usernameText = this.add
      .text(this.cameras.main.centerX + 50, this.cameras.main.centerY - 50, '', captionStyle)
      .setScrollFactor(0, 0)
      .setDepth(999)
      .setText(Phaser.Utils.String.Format(this.usernameTextFormat, [
        this.component.state.username
      ]));
  }

  update() {
    this.gameMode.update();

    this.player.update();

    // Update the stats text.
    this.statsText.setText(Phaser.Utils.String.Format(this.captionFormat, [
      Math.floor(this.player.health / 10),
      this.player.kills,
      this.player.shotsFired,
      this.gameMode.difficulty
    ]));

    // Update username if not set on create.
    if (!this.usernameText.text) {
      this.usernameText.setText(Phaser.Utils.String.Format(this.usernameTextFormat, [
        this.component.state.username
      ]));
    }

    if (this.component.state.username && !this.userLoaded) {
      this.userLoaded = true;

      userServices.getUserByUsername(this.component.state.username)
      .then(res => {
        console.log(res.data)
        this.component.setState({ playerData: res.data });
        this.component.getUser(res.data); // TODO: refactor
      })
      .catch(err => console.log(err));
    }
  }

  save() {
    const { username, timeSurvived, difficulty, enemiesKilled, shotsFired, accuracy } = this.state;
    const statsObject = {
      name: username,
      maxTimeSurvived: timeSurvived,
      maxDifficulty: difficulty,
      maxEnemiesKilled: enemiesKilled,
      maxShotsFired: shotsFired,
      maxAccuracy: accuracy
    }

    userServices.saveUserStats(username, statsObject)
    .then(res => console.log(res))
    .catch(err => console.log(err));
  }
}
