import React, { Component } from 'react'
import Phaser from 'phaser'
import GameModes from './modes'
import Obstacles from './obstacles/obstacles.json'
import Player from './player'
import userServices from '../../services/userServices'

// Store the game object globally so we have access to window.resize events.
let game

export default class Game extends Component {

  state = {
    health: 0,
    accuracy: 0,
    username: '',
    difficulty: 0,
    shotsFired: 0,
    timeSurvived: 0,
    enemiesKilled: 0,
    gameSaved: false,
    tutorialCompleted: false
  }

  // Pass data (player stats) up to parent components.
  getUser = (user) => this.props.getUser(user)

  componentWillMount() {
    // Get user nickname from Auth0

    const { userProfile, getProfile } = this.props.auth

    if (!userProfile) {

      // If a user profile does not exist, fetch it from the logged in user.
      getProfile((err, profile) => {

        this.setState({ username: profile.nickname })

      })

    } else {

      this.setState({ username: userProfile.nickname })

    }

  }

  componentWillUnmount() {

    /*
      Note: There's still a delay when a new Phaser Game
      is created but this temporarily fixes issues with
      players being unable to move when this remounts.
    */

    // Destroy the existing Phaser Game.
    if (game) game.destroy(true, false)

  }

  componentDidMount() {

    const gameConfig = {
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight - 90,
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
        resize: this.resize,
        component: this
      }
    }

    // Initialize the Phaser Game object
    game = new Phaser.Game(gameConfig)

  }

  render() {

    return (

      <div id="game-container"></div>

    )

  }

  preload() {

    // Sprites
    this.load.image('player', ['/assets/sprites/playerPistol.gif', '/assets/sprites/playerPistol_n.png'])
    this.load.image('zombie', ['/assets/sprites/zombie.gif', '/assets/sprites/playerPistol_n.png'])
    this.load.image('bullet', ['/assets/sprites/bullet.png', '/assets/sprites/playerPistol_n.png'])
    this.load.image('map', ['/assets/backgrounds/map02.jpg', '/assets/backgrounds/map02_n.png'])

    // Audio
    this.load.audio('theme', '/assets/audio/midWasteTheme.wav')
    this.load.audio('spooky', '/assets/audio/spookyStuff.wav')
    this.load.audio('alarm', '/assets/audio/carAlarm.wav')
    this.load.audio('pistolFire', '/assets/audio/pistolFire.wav')
    this.load.audio('pistolReload', '/assets/audio/pistolReload.wav')
    this.load.audio('shotgunFire', '/assets/audio/shotgunFire.wav')
    this.load.audio('shotgunFire2', '/assets/audio/shotgunFire2.wav')
    this.load.audio('shotgunReload', '/assets/audio/shotgunReload.wav')
    this.load.audio('shotgunReload2', '/assets/audio/shotgunReload2.wav')


  }

  create() {

    /**************************************************************************
      IMPORTANT:
      The order of declarations here is critical to the functionality of game.
    **************************************************************************/

    // Make this React component accessible from inside the game.
    this.component = game.config.sceneConfig.component

    this.obstacles = this.physics.add.staticGroup()
    this.zombies = this.physics.add.group()
    this.player = new Player(this, this.component.state.username)
    this.userLoaded = false

    // Map
    this.map = this.add
    .image(1336, 1210, 'map')
    .setDepth(-2)
    .setScale(2, 2)
    .setPipeline('Light2D')

    // ! DEMO: Pick a random game mode
    let pick = Math.floor(Math.random() * (2 - 0) + 0) // 2 = the number of game modes available
    switch (pick) {
      case 1:
        this.gameMode = new GameModes.Purge(this)
        break
      default:
        this.gameMode = new GameModes.Survival(this)
        break
    }

    // Obstacles
    Obstacles.forEach(ob => {
      const obstacle = this.obstacles.create(ob.x, ob.y).setVisible(false)
      obstacle.body.setSize(ob.w, ob.h)
    })

    // Phsyics
    this.physics.world.setBounds(0, 0, 1336 * 2, 1210 * 2) // x, y, width (mapW), height (mapH)
    this.physics.add.collider(this.obstacles, this.player.sprite)
    this.physics.add.collider(this.zombies, this.player.sprite, () => this.player.damage())
    this.physics.add.collider(this.zombies)

    // Camera
    this.cameras.main
      .startFollow(this.player.sprite)
      .setLerp(0.08, 0.08)
      .setBounds(0, 0, 1336 * 2, 1210 * 2)

    // Lighting
    this.lights.addLight(1638, 1582, 200, 0xFFA233)
    this.lights
      .enable()
      // .setAmbientColor(0x010909)
      .setAmbientColor(0x200000)


    // On-screen text: style
    let captionStyle = {
      fill: '#777',
      fontFamily: 'monospace',
      lineSpacing: 4
    }

    this.usernameTextFormat = (
      '%1'
    )

    this.usernameText = this.add
      .text(window.innerWidth / 2, game.config.height / 2 - 325, '', captionStyle)
      .setScrollFactor(0, 0)
      .setDepth(999)
      .setOrigin(0.5, 0)
      .setText(Phaser.Utils.String.Format(this.usernameTextFormat, [this.component.state.username]))

    this.events.on('resize', this.component.resize, this)

  }

  update() {

    // Update scene children
    this.gameMode.update()
    this.player.update()

    // Update username if not set on create
    if (!this.usernameText.text) {

      this.usernameText.setText(Phaser.Utils.String.Format(this.usernameTextFormat, [this.component.state.username]))

    }

    // Grab user stats on successfully loaded
    if (this.component.state.username && !this.userLoaded) {

      this.userLoaded = true

      userServices.getUserByUsername(this.component.state.username)
      .then(res => {
        this.component.setState({ playerData: res.data, tutorialCompleted: res.data.tutorialCompleted }) // TODO: remove playerData (not in use?)
        this.component.getUser(res.data)

        if (this.component.state.tutorialCompleted) this.gameMode.setTutorialComplete()
      })
      .catch(err => console.log(err))

    }

  }

  resize(width, height) {

    if (width === undefined) { width = this.sys.game.config.width }
    if (height === undefined) { height = this.sys.game.config.height }

    this.cameras.resize(width, height)

  }

  save() {

    if (!this.state.gameSaved) {

      this.setState({ gameSaved: true })

      const { username, timeSurvived, difficulty, enemiesKilled, shotsFired, accuracy, tutorialCompleted } = this.state

      const statsObject = {
        name: username,
        maxTimeSurvived: timeSurvived,
        maxDifficulty: difficulty,
        maxEnemiesKilled: enemiesKilled,
        maxShotsFired: shotsFired,
        maxAccuracy: accuracy,
        tutorialCompleted
      }

      // API request to save player stats
      userServices.saveUserStats(username, statsObject)
      .then(res => console.log(res))
      .catch(err => console.log(err))
    }

  }

}

// On window resize
window.addEventListener('resize', () => {

  if (!game) return;

  const scene = game.scene.scenes[0];
  const w = window.innerWidth / 2;
  const h = game.config.height / 2 - 325;

  game.resize(window.innerWidth, window.innerHeight - 90)

  // Set username text position
  scene.usernameText.setPosition(w, h)

  // Update gameMode text position
  scene.gameMode.setCaptionPosition(w, 16)
  scene.player.weaponHud.setHudPosition(w * 2 - 30, game.config.height - 30) // 30 is the offset used in hud/WeaponHud.js

}, false)
