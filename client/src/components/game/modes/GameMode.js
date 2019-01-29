import Phaser from 'phaser'
import Zombie from '../enemies/zombie'
import Tutorial from '../tutorial'

export default class GameMode {
  constructor(scene) {

    // Game
    this.scene = scene
    this.canvas = this.scene.sys.game.canvas

    // Player
    this.player = this.scene.player

    // GameMode
    this.name = 'Default'
    this.started = false
    this.canUpdate = false
    this.nextUpdate = 0
    this.timeSurvived = 0

    // Difficulty
    this.difficulty = this.randomIntInRange(2, 5)

    // Enemies
    this.enemies = []

    // Game start trigger
    this.trigger = { x: 0, y: 0 }
    this.triggerKey = 'KeyE'
    this.triggerColor = '#00b220'
    this.triggerRange = 150
    this.triggerText = 'Press E to start'
    this.startDelay = 7000
    this.canTrigger = false

    // Graphics
    this.graphics = this.scene.add.graphics()

    // Tutorial
    this.tutorial = new Tutorial(this.scene)

    // Keyboard events
    this.scene.input.keyboard.on('keydown', e => {

      // Trigger game start
      if (e.code === this.triggerKey && !this.started && this.canTrigger && this.tutorial.hasBeenCompleted) {
        this.start()
      }

      // Tutorial steps
      if (e.code === 'KeyW' && this.tutorial.activeTutorial === 'move') this.tutorial.goToNext()
      if (e.code === 'ShiftLeft' && this.tutorial.activeTutorial === 'sprint') setTimeout(() => this.tutorial.goToNext(), 1000)
      if (e.code === 'KeyR' && this.tutorial.activeTutorial === 'reload') {
        this.tutorial.goToNext()
        this.createGraphics()
      }
      if (e.code === 'KeyE' && this.tutorial.activeTutorial === 'hud') {
        this.tutorial.goToNext()
        this.player.toggleFlashlight(true)
      }
      if (e.code === 'KeyE' && this.tutorial.activeTutorial === 'interact') {
        this.tutorial.goToNext()
        this.setTutorialComplete()
      }

    })

    // Tutorial: shoot
    this.scene.input.on('pointerdown', e => {
      if (this.tutorial.activeTutorial === 'shoot') this.tutorial.goToNext()
    })

    // Update game component state
    this.scene.component.setState({ difficulty: this.difficulty })

    // In-game text style
    this.captionStyle = {
      fill: '#777',
      fontFamily: 'monospace',
      lineSpacing: 4,
    }

    // In-game text format
    this.captionFormat = (
      'Mode:        %1\n' +
      'Time:        %2s\n' +
      'Kills:       %4\n' +
      'Difficulty:  %3\n'
    )

    // In-game text: Stats
    this.statsText = this.scene.add
    .text(16, 16, '', this.captionStyle)
    .setScrollFactor(0, 0)
    .setDepth(999)

    // On-screen trigger text
    const triggerCaptionStyle = {
      fill: this.triggerColor,
      fontFamily: 'monospace'
    }

    this.triggerCaption = this.scene.add
      .text(this.scene.cameras.main.centerX, 16, '', triggerCaptionStyle)
      .setScrollFactor(0, 0)      // Fix the text to the screen
      .setDepth(999)              // Keep text on top-most layer
      .setOrigin(0.5)

  }

  createGraphics() {
    this.graphics
      .lineStyle(4, 0x00b220, 1)  // thickness, color, alpha
      .beginPath()
      .arc(this.trigger.x, this.trigger.y, this.triggerRange, Phaser.Math.DegToRad(0), Phaser.Math.DegToRad(360), true)
      .closePath()
      .strokePath()
      .setDepth(-1)
  }

  start() {

    this.started = true
    this.graphics.clear()

    setTimeout(() => {

      // Create n zombies based on difficulty
      for (let i = 0; i < this.difficulty * 100; i++) {

        let enemy = new Zombie(this.scene)

        // Allow gameMode customizable enemies
        if (this.customEnemyStart) enemy = this.customEnemyStart(enemy)

        this.enemies.push(enemy)
        this.scene.zombies.add(enemy.sprite)

      }

      // Collision: Zombies & Obstacles
      this.scene.physics.add.collider(this.scene.zombies, this.scene.obstacles)

      // Let the gamemode start updating
      this.canUpdate = true

    }, this.startDelay)

    // Custom gameMode start functions
    if (this.customStart) this.customStart()

  }

  update() {

    if (this.started && this.canUpdate) {

      this.enemies.forEach(enemy => enemy.update())

      // If total enemies alive is less than {condition} spawn another enemy.
      if (this.scene.zombies.getChildren().length < this.difficulty * 100) this.addEnemy()

      // If the game should update (timed)
      if(this.player.isAlive && this.scene.time.now > this.nextUpdate) {

        this.nextUpdate = this.scene.time.now + 1000 // 1 second
        this.timeSurvived++

        // Update the game component's state
        this.scene.component.setState({ timeSurvived: this.timeSurvived })

      }

    } else if (!this.started) {

      // Check if player is in range of trigger
      let distX = Math.abs(this.player.sprite.x - this.trigger.x)
      let distY = Math.abs(this.player.sprite.y - this.trigger.y)
      let range = this.triggerRange
      this.canTrigger = (distX < range && distY < range) ? true : false

      // Trigger text (show or hide based on player distance)
      let text
      if (this.canTrigger && !this.started && this.tutorial.hasBeenCompleted) {
        text = this.triggerText
      } else if (!this.canTrigger && !this.started && this.tutorial.hasBeenCompleted) {
        text = 'Find the blue van'
      }

      this.triggerCaption.setText(text)

    }

    // Stats to be updated
    const stats = [
      this.name,
      this.timeSurvived,
      this.difficulty,
      this.player.kills
    ]

    this.setInGameText(stats)

  }

  setInGameText(statsArray) {

    this.statsText.setText(Phaser.Utils.String.Format(this.captionFormat, statsArray))

  }

  setCaptionPosition(x, y) {

    this.triggerCaption.setPosition(x, y)

  }

  randomIntInRange(min, max) {

    return Math.floor(Math.random() * (max - min) + min)

  }

  addEnemy() {

    let enemy = new Zombie(this.scene)

    this.enemies.push(enemy)
    this.scene.zombies.add(enemy.sprite)

  }

  setTutorialComplete() {

      this.tutorial.setComplete()
      this.player.toggleFlashlight(true)
      this.graphics.clear()

      this.createGraphics()

  }

}
