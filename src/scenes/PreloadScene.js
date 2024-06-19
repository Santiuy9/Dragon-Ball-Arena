class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }

    preload() {
        // Cargar todos los recursos del juego (imágenes, sonidos, etc.)
        this.load.image('logo', 'assets/vanilla/dragon-ball-logo.png');
        this.load.image('background', 'assets/vanilla/background.png');
        this.load.image('torre', 'assets/vanilla/torre_karin.png');
        this.load.spritesheet('Characters', 'assets/Characters_tileset_prueba.png', { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet('Skills', 'assets/Skills_tileset.png', { frameWidth: 100, frameHeight: 100 });

    }

    create() {
        this.scene.start('GameScene');
    }
}

export default PreloadScene;