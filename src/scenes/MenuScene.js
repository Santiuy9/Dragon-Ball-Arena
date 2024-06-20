import Character from "../data/characters.js";

class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');

        // Define los personajes como objetos de la clase Character
        this.characters = [
            new Character('Goku Inicio', 0, [0, 1, 2, 3, 4, 5, 6], 'Goku'),
            new Character('Gohan SSJ', 1, [7, 8, 9, 10], 'Gohan'),
            new Character('Piccolo', 2, [11, 12, 13, 14, 15], 'Piccolo'),
            new Character('Krilin', 3, [16, 17, 18, 19], 'Krilin'),
            new Character('Yamcha', 4, [20, 21, 22, 23], 'Yamcha'),
            new Character('Ten-Shin Han', 5, [24, 25, 26, 27], 'Ten-Shin Han'),
            new Character('Trunks SSJ', 6, [28, 29, 30, 31, 32, 33], 'Trunks from Alternative Future'),
            new Character('Mr Roshi', 7, [], ''),
            new Character('Saibaiman', 8, [], ''),
            new Character('Raditz', 9, [], ''),
            new Character('Nappa', 10, [], ''),
            new Character('Vegeta', 11, [], 'Vegeta'),
            new Character('', 12, [], ''),
            new Character('Kewi', 13, [], ''),
            new Character('Dodoria', 14, [], ''),
            new Character('Zarbon', 15, [], ''),
            new Character('Guldo', 16, [], ''),
            new Character('Recoome', 17, [], ''),
            new Character('Jeice', 18, [], ''),
            new Character('Butta', 19, [], ''),
            new Character('Ginyu', 20, [], ''),
            new Character('Goku SSJ', 21, [], 'Goku SSJ'),
            new Character('Freezer Forma Final', 22, [], ''),
            new Character('Freezer 100%', 23, [], ''),
            new Character('Androide 16', 24, [], ''),
            new Character('Androide 17', 25, [], ''),
            new Character('Androide 18', 26, [], ''),
            new Character('Androide 19', 27, [], ''),
            new Character('Androide 20', 28, [], ''),
            new Character('Cell 1° Forma', 29, [], ''),
            new Character('Cell 2° Forma', 30, [], ''),
            new Character('Cell 3° Forma', 31, [], ''),
            

            // Agrega más personajes según sea necesario
        ];

        this.charactersPerPage = [24, 8];
        this.currentPage = 0;
        this.selectedCharacters = [];
    }

    create() {
        this.add.image(600, 300, 'torre');

        // Cargar detalles de habilidades desde JSON
        this.skillDetails = this.cache.json.get('skills');

        const backButton = this.add.text(100, 500, 'Atrás', { fontFamily: 'Arial', fontSize: '25px', fill: '#fff' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('GameScene'));
        backButton.setOrigin(0.5);

        const tabButtons = [
            { label: 'News', key: 'newsTab' },
            { label: 'Characters', key: 'charactersTab' },
            { label: 'Battle', key: 'battleTab' },
            { label: 'Missions', key: 'missionsTab' },
            { label: 'Social', key: 'socialTab' }
        ];

        let yPosition = 200;

        tabButtons.forEach(tab => {
            const button = this.add.text(100, yPosition, tab.label, { fontFamily: 'Arial', fontSize: '24px', fill: '#fff' })
                .setInteractive({ useHandCursor: true })
                .on('pointerdown', () => this.showTab(tab.key));
            button.setOrigin(0.5);
            yPosition += 40;
        });

        this.tabs = {
            newsTab: this.add.container(400, 300).setVisible(false),
            charactersTab: this.add.container(400, 300).setVisible(false),
            battleTab: this.add.container(400, 300).setVisible(false),
            missionsTab: this.add.container(400, 300).setVisible(false),
            socialTab: this.add.container(400, 300).setVisible(false)
        };

        this.tabs.newsTab.add(this.add.text(0, 0, 'Noticias del juego', { fontFamily: 'Arial', fontSize: '32px', fill: '#fff' }).setOrigin(0.5));
        this.tabs.battleTab.add(this.add.text(0, 0, 'Batallas', { fontFamily: 'Arial', fontSize: '32px', fill: '#fff' }).setOrigin(0.5));
        this.tabs.missionsTab.add(this.add.text(0, 0, 'Misiones', { fontFamily: 'Arial', fontSize: '32px', fill: '#fff' }).setOrigin(0.5));
        this.tabs.socialTab.add(this.add.text(0, 0, 'Social', { fontFamily: 'Arial', fontSize: '32px', fill: '#fff' }).setOrigin(0.5));

        const charactersRect = this.add.rectangle(200, 150, 800, 300, 0xffffff, 0.8).setOrigin(0.5);
        this.tabs.charactersTab.add(charactersRect);
        const charactersRectDetail = this.add.rectangle(200, -150, 800, 275, 0xffffff, 0.8).setOrigin(0.5);
        this.tabs.charactersTab.add(charactersRectDetail);

        const leftArrow = this.add.text(-225, 150, '<', { fontFamily: 'Arial', fontSize: '32px', fill: '#fff' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.changePage(-1));
        leftArrow.setOrigin(0.5);
        this.tabs.charactersTab.add(leftArrow);

        const rightArrow = this.add.text(625, 150, '>', { fontFamily: 'Arial', fontSize: '32px', fill: '#fff' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.changePage(1));
        rightArrow.setOrigin(0.5);
        this.tabs.charactersTab.add(rightArrow);

        this.characterDetails = this.add.container(0, 200).setVisible(false);
        this.tabs.charactersTab.add(this.characterDetails);

        this.selectedCharactersContainer = this.add.container(400, 550);
        this.tabs.charactersTab.add(this.selectedCharactersContainer);

        this.showTab('newsTab');
    }

    showTab(key) {
        Object.keys(this.tabs).forEach(tabKey => {
            this.tabs[tabKey].setVisible(false);
        });
        this.tabs[key].setVisible(true);
        if (key === 'charactersTab') {
            this.showCharactersPage(0);
        }
    }

    showCharactersPage(page) {
        this.currentPage = page;

        // Limpiar personajes anteriores
        this.tabs.charactersTab.each(child => {
            if (child.texture && child.texture.key === 'Characters') {
                child.destroy();
            }
        });

        const start = page === 0 ? 0 : 24;
        const end = page === 0 ? 24 : 32;

        for (let i = start; i < end; i++) {
            const character = this.characters[i];
            if (!character) continue;

            const xPos = (i % 8) * 100 - 150;
            const yPos = Math.floor((i - start) / 8) * 100 + 50;

            const image = this.add.sprite(xPos, yPos, 'Characters', character.getFrame())
                .setInteractive({ useHandCursor: true })
                .setScale(0.8);

            image.on('pointerdown', () => this.showCharacterDetails(character));
            image.on('pointerup', (pointer) => {
                if (pointer.getDuration() < 300) {
                    this.toggleCharacterSelection(character);
                }
            });

            this.tabs.charactersTab.add(image);
        }
    }

    changePage(direction) {
        const newPage = this.currentPage + direction;
        const totalPages = this.charactersPerPage.length;

        if (newPage >= 0 && newPage < totalPages) {
            this.showCharactersPage(newPage);
        }
    }

    showCharacterDetails(character) {
        this.characterDetails.removeAll(true);

        const detailsText = this.add.text(200, -475, `${character.name}`, { fontFamily: 'Arial', fontSize: '24px', fill: '#000' }).setOrigin(0.5);
        this.characterDetails.add(detailsText);

        character.skills.forEach((skillFrame, index) => {
            const skillImage = this.add.sprite((index % 8) * 80, -275 + Math.floor(index / 8) * 50, 'Skills', skillFrame).setScale(0.75)
                .setInteractive({ useHandCursor: true })
                .on('pointerdown', () => this.showSkillDescription(skillFrame));
            this.characterDetails.add(skillImage);
        });

        this.characterDetails.setVisible(true);
    }

    showSkillDescription(skillFrame) {
        const skillDetail = this.skillDetails[skillFrame];

        if (this.skillDescriptionText) {
            this.skillDescriptionText.destroy();
        }
        this.skillDescriptionText = this.add.text(200, -400, `Nombre: ${skillDetail.name}\nDescripción: ${skillDetail.description}\nTipo: ${skillDetail.type}\nCosto: ${skillDetail.cost}\nCooldown: ${skillDetail.cooldown}`, { fontFamily: 'Arial', fontSize: '18px', fill: '#000', wordWrap: { width: 700 } }).setOrigin(0.5);
        this.characterDetails.add(this.skillDescriptionText);
    }

    toggleCharacterSelection(character) {
        const index = this.selectedCharacters.indexOf(character);
        if (index === -1) {
            this.selectCharacter(character);
        } else {
            this.deselectCharacter(character);
        }
    }

    selectCharacter(character) {
        if (this.selectedCharacters.length >= 3) {
            console.log('No puedes seleccionar más de 3 personajes.');
            return;
        }

        this.selectedCharacters.push(character);
        this.updateSelectedCharactersDisplay();
        console.log(`Personaje seleccionado: ${character.name}`);
    }

    deselectCharacter(character) {
        const index = this.selectedCharacters.indexOf(character);
        if (index !== -1) {
            this.selectedCharacters.splice(index, 1);
            this.updateSelectedCharactersDisplay();
            console.log(`Personaje deseleccionado: ${character.name}`);
        }
    }

    updateSelectedCharactersDisplay() {
        this.selectedCharactersContainer.removeAll(true);

        this.selectedCharacters.forEach((character, index) => {
            const xPos = 250;
            const yPos = index * 100 - 800;

            const image = this.add.sprite(xPos, yPos, 'Characters', character.getFrame()).setScale(0.8).setInteractive({ useHandCursor: true });
            image.on('pointerdown', () => this.deselectCharacter(character));
            this.selectedCharactersContainer.add(image);
        });
    }

    update() {
        // Lógica de actualización si es necesaria
    }
}

export default MenuScene;