import Gun from './Gun'

export default class MG extends Gun {
  constructor(scene, owner) {
    super(scene, owner)

    this.name = 'MG'
    this.fireRate = 130
    this.magSize = 30
    this.reloadTime = 800
    this.velocity = 2500
    this.cameraShakeIntensity = .002
    this.reloadSound = 'pistolReload'
    this.fireSound = 'pistolFire'
  }

  onReload() {
    this.audio.playReload(this.reloadSound, 0.5)
  }

}
