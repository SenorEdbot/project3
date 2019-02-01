import Gun from './Gun'

export default class Shotgun extends Gun {
  constructor(scene, owner) {
    super(scene, owner)

    this.name = 'Shotgun'
    this.fireRate = 1000
    this.magSize = 8
    this.clip = 8
    this.shellReloadTime = 500
    this.reloadTime = (this.magSize - this.clip) * this.shellReloadTime
    this.velocity = 1000
    this.cameraShakeIntensity = .004
    this.reloadSound = 'shotgunReload'
    this.fireSound = 'shotgunFire2'

    this.shotCount = 10
    this.spread = 75 // 2 = tight, 5 = wide
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

      // Increase player's shotsFired by this shot count for correct accuracy
      this.owner.increaseShotsFired(this.shotCount - 1)

      this.nextFire = this.scene.time.now + this.fireRate // Limit fire-rate
      this.clip--
      this.graphics.clear()

      // Effects
      camera.shake(250, this.cameraShakeIntensity)
      this.audio.playGunshot(this.fireSound, 0.5)

      if (callback) callback()

    } else if (this.clip === 0 && !this.isReloading) {

      // Auto reload if holding fire button down.
      this.reload()

    }
  }

  onReload() {
    this.reloadTime = (this.magSize - this.clip) * this.shellReloadTime
    this.audio.playReload(this.reloadSound, 1, (this.magSize - this.clip), this.shellReloadTime)
  }
}
