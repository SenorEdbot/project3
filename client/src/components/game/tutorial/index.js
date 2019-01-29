import Phaser from 'phaser';

export default class Tutorial {
  constructor(scene) {
    this.scene = scene;
    this.text1 = null;
    this.text2 = null;
    this.text3 = null;
    this.activeTutorial = null;
    this.tutorialsOrder = ['move', 'sprint', 'hud', 'shoot', 'reload', 'interact'];
    this.hasBeenCompleted = false;
    this.canRun = true;

    const canvas = this.scene.sys.game.canvas;
    this.centerX = canvas.width / 2;
    this.centerY = canvas.height / 2;

    this.style = {
      fill: '#ccc',
      fontFamily: 'Consolas',
      lineSpacing: 4,
    };

    this.goToNext();
  }

  goToNext() {
    this.clearText();

    if (this.hasBeenCompleted) return;

    switch (this.tutorialsOrder[0]) {
      case 'move':
        this.move();
        break;
      case 'sprint':
        this.sprint();
        break;
      case 'shoot':
        this.shoot();
        break;
      case 'reload':
        this.reload();
        break;
      case 'hud':
        this.hud();
        break;
      case 'interact':
        this.interact();
        break;
      default:
        this.hasBeenCompleted = true;
        break;
    }

    this.tutorialsOrder.shift();
  }

  renderText1(x, y, text, format, values) {
    this.text1 = this.scene.add
      .text(x, y, text, this.style)
      .setScrollFactor(0, 0) // fixed position
      .setDepth(999) // always on top

    this.text1.setText(Phaser.Utils.String.Format(format, values));
  }

  renderText2(x, y, text, format, values) {
    this.text2 = this.scene.add
      .text(x, y, text, this.style)
      .setScrollFactor(0, 0) // fixed position
      .setDepth(999) // always on top

    this.text2.setText(Phaser.Utils.String.Format(format, values));
  }

  renderText3(x, y, text, format, values) {
    this.text3 = this.scene.add
      .text(x, y, text, this.style)
      .setScrollFactor(0, 0) // fixed position
      .setDepth(999) // always on top

    this.text3.setText(Phaser.Utils.String.Format(format, values));
  }

  clearText() {
    [this.text1, this.text2, this.text3].forEach(text => {
      if (text) text.setText(Phaser.Utils.String.Format('', []));
    });
  }

  move() {
    this.activeTutorial = 'move';

    let x = this.centerX - 55;
    let y = this.centerY + 200;
    let format = (
      '  W\n' +
      'A S D  to move'
    );

    this.renderText1(x, y, '', format, []);
  }

  sprint() {
    this.activeTutorial = 'sprint';

    let x = this.centerX - 75;
    let y = this.centerY + 200;
    let format = (
      'Hold SHIFT to sprint'
    );

    this.renderText1(x, y, '', format, []);
  }

  shoot() {
    this.activeTutorial = 'shoot';

    let x = this.centerX - 55;
    let y = this.centerY + 200;
    let format = (
      'Click to shoot'
    );

    this.renderText1(x, y, '', format, []);
  }

  reload() {
    this.activeTutorial = 'reload';

    let x = this.centerX - 55;
    let y = this.centerY + 200;
    let format = (
      'R  to reload'
    );

    this.renderText1(x, y, '', format, []);
  }

  hud() {
    this.activeTutorial = 'hud';

    let x = this.centerX - 85;
    let y = this.centerY + 200;
    let format1 = (
      'Ammo >'
    );
    let format2 = (
      '< Health'
    );
    let format3 = (
      'HUD (E to continue)'
    );

    this.renderText1(this.centerX - 130, this.centerY, '', format1, []);
    this.renderText2(this.centerX + 70, this.centerY, '', format2, []);
    this.renderText3(x, y, '', format3, []);
  }

  interact() {
    this.activeTutorial = 'interact';

    let x = this.centerX - 150;
    let y = this.centerY + 200;
    let format = (
      'E  to interact with special objects\n' +
      '         (E to continue)             '
    );

    this.renderText1(x, y, '', format, []);
  }

  setComplete() {
    this.clearText();
    this.hasBeenCompleted = true;
    this.scene.component.setState({tutorialCompleted: this.hasBeenCompleted});
  }
}