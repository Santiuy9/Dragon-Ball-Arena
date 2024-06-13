import Phaser from 'phaser';

class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        // Cargar cualquier recurso necesario para la pantalla de carga
    }

    create() {
        this.scene.start('PreloadScene');
    }
}

export default BootScene;