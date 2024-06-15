class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    create() {
        this.add.image(600, 300, 'torre');

        const backButton = this.add.text(100, 500, 'Atrás', { fontFamily: 'Arial', fontSize: '25px', fill: '#fff' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('GameScene'));
        backButton.setOrigin(0.5);

        // Crear botones de pestañas
        const tabButtons = [
            { label: 'News', key: 'newsTab' },
            { label: 'Characters', key: 'charactersTab' },
            { label: 'Battle', key: 'battleTab' },
            { label: 'Missions', key: 'missionsTab' },
            { label: 'Social', key: 'socialTab' }
        ];

        let yPosition = 200;

        tabButtons.forEach((tab, index) => {
            const button = this.add.text(100, yPosition, tab.label, { fontFamily: 'Arial', fontSize: '24px', fill: '#fff' })
                .setInteractive({ useHandCursor: true })
                .on('pointerdown', () => this.showTab(tab.key));

            button.setOrigin(0.5);
            yPosition += 40;
        });

        // Crear contenedores para cada pestaña
        this.tabs = {
            newsTab: this.add.container(400, 300).setVisible(false),
            charactersTab: this.add.container(400, 300).setVisible(false),
            battleTab: this.add.container(400, 300).setVisible(false),
            missionsTab: this.add.container(400, 300).setVisible(false),
            socialTab: this.add.container(400, 300).setVisible(false)
        };

        // Añadir contenido a cada pestaña
        this.tabs.newsTab.add(this.add.text(0, 0, 'Noticias del juego', { fontFamily: 'Arial', fontSize: '32px', fill: '#fff' }).setOrigin(0.5));
        this.tabs.charactersTab.add(this.add.text(0, 0, 'Personajes', { fontFamily: 'Arial', fontSize: '32px', fill: '#fff' }).setOrigin(0.5));
        this.tabs.battleTab.add(this.add.text(0, 0, 'Batallas', { fontFamily: 'Arial', fontSize: '32px', fill: '#fff' }).setOrigin(0.5));
        this.tabs.missionsTab.add(this.add.text(0, 0, 'Misiones', { fontFamily: 'Arial', fontSize: '32px', fill: '#fff' }).setOrigin(0.5));
        this.tabs.socialTab.add(this.add.text(0, 0, 'Social', { fontFamily: 'Arial', fontSize: '32px', fill: '#fff' }).setOrigin(0.5));

        // Añadir recuadro y texto en la pestaña "Characters"
        const charactersRect = this.add.rectangle(200, 100, 800, 400, 0xffffff, 0.8).setOrigin(0.5);
        this.tabs.charactersTab.add(charactersRect);

        // Añadir imágenes de personajes desde el tileset
        const characterFrames = Array.from({ length: 32 }, (_, i) => i); // Frames del 0 al 31

        characterFrames.forEach((frame, index) => {
            const xPos = (index % 8) * 100 - 150; // Ajustar para que los personajes se alineen en filas
            const yPos = Math.floor(index / 8) * 100 - 50; // Ajustar para que los personajes se alineen en columnas

            const image = this.add.sprite(xPos, yPos, 'Characters', frame)
                .setInteractive({ useHandCursor: true })
                .setScale(0.8);

            image.on('pointerdown', () => this.showCharacterDetails(frame));
            image.on('pointerup', (pointer) => {
                if (pointer.getDuration() < 300) {
                    this.selectCharacter(frame);
                }
            });

            this.tabs.charactersTab.add(image);
        });

        // Añadir recuadro de detalles del personaje
        this.characterDetails = this.add.container(0, 150).setVisible(false);
        this.tabs.charactersTab.add(this.characterDetails);

        // Mostrar la primera pestaña por defecto
        this.showTab('newsTab');
    }

    showTab(key) {
        // Ocultar todas las pestañas
        Object.keys(this.tabs).forEach(tabKey => {
            this.tabs[tabKey].setVisible(false);
        });

        // Mostrar la pestaña seleccionada
        this.tabs[key].setVisible(true);
    }

    showCharacterDetails(characterFrame) {
        // Mostrar los detalles del personaje
        this.characterDetails.removeAll(true);
        const detailsText = this.add.text(200, -400, `Detalles del personaje ${characterFrame}`, { fontFamily: 'Arial', fontSize: '24px', fill: '#000' }).setOrigin(0.5);
        this.characterDetails.add(detailsText);
        this.characterDetails.setVisible(true);
    }

    selectCharacter(characterFrame) {
        // Seleccionar el personaje
        this.selectedCharacter = characterFrame;
        console.log(`Personaje seleccionado: ${characterFrame}`);
        // Puedes añadir más lógica aquí para lo que suceda al seleccionar un personaje
    }

    update() {
        // Lógica de actualización si es necesaria
    }
}

export default MenuScene;