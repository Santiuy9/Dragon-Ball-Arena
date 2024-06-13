import Phaser from 'phaser';

class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    create() {
        // Crear el contenido del juego
        this.add.image(400, 300, 'logo');
    }
}

export default GameScene;