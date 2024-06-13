import Phaser from 'phaser';

class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }

    preload() {
        // Cargar todos los recursos del juego (imágenes, sonidos, etc.)
        this.load.image('logo', 'assets/images/logo.png');
    }

    create() {
        this.scene.start('GameScene');
    }
}

export default PreloadScene;