class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    create() {
        // Crear el contenido del juego aquí
        this.add.image(600, 365, 'background').setScale(0.7);
        this.add.image(600, 75, 'logo').setScale(0.5);

        // Crear un botón de texto
        const playButton = this.add.text(600, 500, 'Play', { fontFamily: 'Arial', fontSize: '25px', fill: '#000' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('MenuScene'));
        

        // Centrar el botón
        playButton.setOrigin(0.5);

        
    }

    update() {
        // Lógica del juego aquí
    }
}

export default GameScene;