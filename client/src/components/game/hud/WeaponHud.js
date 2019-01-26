import Hud from './index';

export default class WeaponHud extends Hud {
  constructor(scene) {
    super(scene);

    this.x = this.canvas.width - 30;
    this.y = this.canvas.height - 30;
    this.style = {
      fill: '#777',
      fontFamily: 'monospace',
      lineSpacing: 4
    };
  }
}
