class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
        // Lista de nombres de personajes
        this.characterNames = [
            'Personaje 1', 'Personaje 2', 'Personaje 3', 'Personaje 4',
            'Personaje 5', 'Personaje 6', 'Personaje 7', 'Personaje 8',
            'Personaje 9', 'Personaje 10', 'Personaje 11', 'Personaje 12',
            'Personaje 13', 'Personaje 14', 'Personaje 15', 'Personaje 16',
            'Personaje 17', 'Personaje 18', 'Personaje 19', 'Personaje 20',
            'Personaje 21', 'Personaje 22', 'Personaje 23', 'Personaje 24',
            'Personaje 25', 'Personaje 26', 'Personaje 27', 'Personaje 28',
            'Personaje 29', 'Personaje 30', 'Personaje 31', 'Personaje 32'
            // Agrega más nombres aquí según sea necesario
        ];
        this.charactersPerPage = [24, 8]; // Número de personajes por página (primera página 24, segunda página 8)
        this.currentPage = 0; // Página inicial

        // Lista de habilidades por personaje (aquí usamos frames como ejemplo)
        this.characterSkills = {
            0: [0, 1, 2], // Habilidades para Personaje 1
            1: [3, 4, 5], // Habilidades para Personaje 2
            2: [6, 7, 8], // Habilidades para Personaje 3
            3: [9, 10, 11], // Habilidades para Personaje 4
            // Añadir más personajes y habilidades aquí
        };
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

        tabButtons.forEach((tab) => {
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
        this.tabs.charactersTab.add(this.add.text(0, -150, 'Personajes', { fontFamily: 'Arial', fontSize: '32px', fill: '#fff' }).setOrigin(0.5));
        this.tabs.battleTab.add(this.add.text(0, 0, 'Batallas', { fontFamily: 'Arial', fontSize: '32px', fill: '#fff' }).setOrigin(0.5));
        this.tabs.missionsTab.add(this.add.text(0, 0, 'Misiones', { fontFamily: 'Arial', fontSize: '32px', fill: '#fff' }).setOrigin(0.5));
        this.tabs.socialTab.add(this.add.text(0, 0, 'Social', { fontFamily: 'Arial', fontSize: '32px', fill: '#fff' }).setOrigin(0.5));

        // Añadir recuadro y texto en la pestaña "Characters"
        const charactersRect = this.add.rectangle(0, 50, 800, 400, 0xffffff, 0.8).setOrigin(0.5);
        this.tabs.charactersTab.add(charactersRect);

        // Flechas de navegación
        const leftArrow = this.add.text(-350, 200, '<', { fontFamily: 'Arial', fontSize: '32px', fill: '#fff' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.changePage(-1));
        leftArrow.setOrigin(0.5);
        this.tabs.charactersTab.add(leftArrow);

        const rightArrow = this.add.text(350, 200, '>', { fontFamily: 'Arial', fontSize: '32px', fill: '#fff' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.changePage(1));
        rightArrow.setOrigin(0.5);
        this.tabs.charactersTab.add(rightArrow);

        // Añadir recuadro de detalles del personaje
        this.characterDetails = this.add.container(0, 200).setVisible(false);
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

        // Mostrar la primera página de personajes si se selecciona la pestaña de personajes
        if (key === 'charactersTab') {
            this.showCharactersPage(0);
        }
    }

    showCharactersPage(page) {
        // Guardar la página actual
        this.currentPage = page;

        // Limpiar personajes actuales
        this.tabs.charactersTab.each(child => {
            if (child.texture && child.texture.key === 'Characters') {
                child.destroy();
            }
        });

        // Mostrar personajes de la página actual
        const start = page === 0 ? 0 : 24;
        const end = page === 0 ? 24 : 32;
        const charactersToShow = this.characterNames.slice(start, end);

        charactersToShow.forEach((name, index) => {
            const xPos = (index % 8) * 100 - 350; // Ajustar para que los personajes se alineen en filas
            const yPos = Math.floor(index / 8) * 100 - 150; // Ajustar para que los personajes se alineen en columnas

            const frame = start + index; // Calcular el frame del personaje

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
    }

    changePage(direction) {
        const newPage = this.currentPage + direction;
        const totalPages = this.charactersPerPage.length;

        // Asegurar que la nueva página esté dentro de los límites
        if (newPage >= 0 && newPage < totalPages) {
            this.showCharactersPage(newPage);
        }
    }

    showCharacterDetails(characterFrame) {
        // Obtener el nombre del personaje a partir del frame
        const characterName = this.characterNames[characterFrame];

        // Mostrar los detalles del personaje
        this.characterDetails.removeAll(true);
        const detailsText = this.add.text(0, -50, `Detalles del personaje: ${characterName}`, { fontFamily: 'Arial', fontSize: '24px', fill: '#000' }).setOrigin(0.5);
        this.characterDetails.add(detailsText);

        // Mostrar las habilidades del personaje
        const skills = this.characterSkills[characterFrame] || [];
        skills.forEach((skillFrame, index) => {
            const skillImage = this.add.sprite((index % 4) * 50 - 75, 50 + Math.floor(index / 4) * 50, 'Skills', skillFrame).setScale(0.5);
            this.characterDetails.add(skillImage);
        });

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