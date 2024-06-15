class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        // Cargar cualquier recurso necesario para la pantalla de arranque aquí
        this.load.image('logo', 'assets/vanilla/dragon-ball-logo.png');
    }

    create() {
        // Mostrar el logotipo centrado en la pantalla
        this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'logo').setScale(0.5);

        // Agregar un texto de inicio
        this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 + 100, 'Press Enter to Start', { font: '16px Arial', fill: '#fff' }).setOrigin(0.5);

        // Esperar a que el usuario presione la tecla Enter
        this.input.keyboard.on('keydown-ENTER', () => {
            this.scene.start('PreloadScene');
        });
    }
}

export default BootScene;