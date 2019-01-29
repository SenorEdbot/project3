import Gun from './Gun'

export default class Shotgun extends Gun {
  constructor(scene, owner) {
    super(scene, owner)

    this.name = 'Shotgun'
    this.fireRate = 500
    this.magSize = 8
    this.clip = 8
    this.reloadTime = 1250
    this.velocity = 1000
    this.cameraShakeIntensity = .004

    // This weapon's custom attributes
    this.shotCount = 5
    this.spread = 50 // 2 = tight, 5 = wide
  }

  fire(callback) {
    if (this.scene.time.now > this.nextFire && this.clip > 0 && !this.isReloading) {

      let camera = this.scene.cameras.main
      let pointer = this.scene.input.activePointer

      // Shoot (n) bullets based on shotCount.
      for (let i = 0; i < this.shotCount; i++) {

        // Positioning data to send to bullet group.
        const positioning = {
          locationX: this.owner.sprite.x,
          locationY: this.owner.sprite.y,
          rotation: this.owner.sprite.rotation,
          vectorX: pointer.x + camera.scrollX + (Math.random() * (this.spread - -this.spread) + -this.spread),
          vectorY: pointer.y + camera.scrollY + (Math.random() * (this.spread - -this.spread) + -this.spread),
          velocity: this.velocity,
          offsetX: this.bulletSpwanOffsetX,
          offsetY: this.bulletSpwanOffsetY,
          scale: this.bulletScale
        }

        this.bullets.shoot(positioning)

      }

      this.nextFire = this.scene.time.now + this.fireRate // Limit fire-rate
      this.clip--
      this.graphics.clear()

      // Effects
      camera.shake(250, this.cameraShakeIntensity)
      this.audio.playGunshot('pistolFire', 0.5)

      if (callback) callback()

    } else if (this.clip === 0 && !this.isReloading) {

      // Auto reload if holding fire button down.
      this.reload()

    }
  }

  onReload() {

    this.audio.playReload('shotgunReload', 1)

  }
}
