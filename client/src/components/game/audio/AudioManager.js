export default class AudioManager {
  constructor(scene) {
    this.scene = scene
    this.audio = null
    this.gunshot = null
    this.reload = null
    this.scene.sound.pauseOnBlur = false
  }

  playAudio(key, loop, volume) {

    if(this.audio) this.audio.destroy()

    this.audio = this.scene.sound.add(key, { loop, volume })
    this.audio.play();

  }

  playGunshot(key, volume) {

    if(this.gunshot) this.gunshot.destroy()

    this.gunshot = this.scene.sound.add(key, { volume })
    this.gunshot.play()

  }

  playReload(key, volume) {

    if(this.reload) this.reload.destroy()

    this.reload = this.scene.sound.add(key, { volume })
    this.reload.play()

  }

}
