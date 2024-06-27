import Character from "../data/characters.js";

class BattleScene extends Phaser.Scene {
    constructor() {
        super('BattleScene');
        
        this.selectedCharacters = [];
        this.enemyCharacters = [];
        this.healthBars = [];
        this.skillDetails = {
            0: {
                name: 'Golpe Meteoro',
                type: 'attack',
                damage: 25,
                cost: 25,
                effect: 'stun'
            },
            // Más habilidades según sea necesario
        };
        this.currentTarget = null;
        this.selectedSkill = null;
        this.ki = 0;
    }

    init(data) {
        this.selectedCharacters = data.selectedCharacters;
        this.enemyCharacters = data.enemyCharacters;
    }

    create() {
        this.add.image(600, 300, 'battleBackground').setScale(1.5);

        this.selectedCharacters.forEach((character, index) => {
            const xPos = 100;
            const yPos = 200 + (index * 150);
            const image = this.add.sprite(xPos, yPos, 'Characters', character.getFrame());
            character.setBattleSprite(image);
            this.showSkills(character, xPos + 110, yPos + 10);
        });

        this.enemyCharacters.forEach((character, index) => {
            const xPos = 1100;
            const yPos = 200 + (index * 150);
            const image = this.add.sprite(xPos, yPos, 'Characters', character.getFrame());
            character.setBattleSprite(image);
        });

        this.createHealthBars();
        this.kiText = this.add.text(50, 50, `Ki: ${this.ki}`, { fontFamily: 'Arial', fontSize: '24px', color: '#ffffff' });

        this.currentTurn = 0;
        this.generateKiAtStart();
    }

    createHealthBars() {
        this.selectedCharacters.forEach((character, index) => {
            const xPos = 100;
            const yPos = 175 + (index * 150);
            
            const healthBarContainer = this.add.container(xPos, yPos + 80);
            const healthBar = this.add.sprite(3, 3, 'healthBar').setOrigin(0);
            healthBarContainer.add(healthBar);
            
            const healthText = this.add.text(100, 10, `${character.name}: ${character.hp}/${character.maxHp}`, { fontFamily: 'Arial', fontSize: '14px', color: '#ffffff' });
            healthBarContainer.add(healthText);

            this.healthBars.push({
                character: character,
                bar: healthBar,
                text: healthText
            });
        });

        this.enemyCharacters.forEach((enemy, index) => {
            const xPos = 900;
            const yPos = 175 + (index * 150);
            
            const healthBarContainer = this.add.container(xPos, yPos + 80);
            const healthBar = this.add.sprite(3, 3, 'healthBar').setOrigin(0);
            healthBarContainer.add(healthBar);
            
            const healthText = this.add.text(100, 10, `${enemy.name}: ${enemy.hp}/${enemy.maxHp}`, { fontFamily: 'Arial', fontSize: '14px', color: '#ffffff' });
            healthBarContainer.add(healthText);

            this.healthBars.push({
                character: enemy,
                bar: healthBar,
                text: healthText
            });
        });
    }

    showSkills(character, baseX, baseY) {
        character.skills.forEach((skillFrame, index) => {
            const skillImage = this.add.sprite(baseX + (index * 80), baseY, 'Skills', skillFrame).setScale(0.65)
                .setInteractive({ useHandCursor: true })
                .on('pointerdown', () => this.selectSkill(skillFrame));
            this.add.existing(skillImage);
        });
    }

    selectSkill(skillFrame) {
        const skill = this.skillDetails[skillFrame];
    
        if (!skill) {
            console.log(`No se encontró la habilidad para el frame: ${skillFrame}`);
            return;
        }
    
        if (this.ki < skill.cost) {
            console.log(`No tienes suficiente Ki para usar ${skill.name}`);
            return;
        }
    
        this.selectedSkill = skill;
        console.log(`Has seleccionado ${skill.name}. Ahora selecciona un objetivo.`);
    
        // Aplicar tint a todos los enemigos para indicar que son seleccionables
        this.enemyCharacters.forEach(enemy => {
            enemy.getBattleSprite().setTint(0xff0000); // Color rojo para indicar seleccionable
            enemy.getBattleSprite().setInteractive({ useHandCursor: true })
                .on('pointerdown', () => this.selectTarget(enemy, enemy.getBattleSprite()));
        });
    
        // Deshabilitar interactividad de las habilidades de los personajes seleccionados
        this.selectedCharacters.forEach(character => {
            character.getBattleSprite().disableInteractive();
        });
    }

    selectTarget(character, sprite) {
        if (this.selectedSkill && !this.currentTarget) {
            this.enemyCharacters.forEach(enemy => {
                enemy.getBattleSprite().clearTint();
            });
    
            sprite.setTint(0x00ff00); // Color verde para indicar seleccionado
            this.currentTarget = character;
    
            // Deshabilitar interactividad de todos los enemigos después de seleccionar uno
            this.enemyCharacters.forEach(enemy => {
                enemy.getBattleSprite().disableInteractive();
            });
    
            // Habilitar interactividad de las habilidades de los personajes seleccionados
            this.selectedCharacters.forEach(character => {
                character.getBattleSprite().setInteractive({ useHandCursor: true })
                    .on('pointerdown', () => this.selectSkill(character.skills[0]));
            });
        }
    }

    useSkill(character, skill) {
        if (!this.currentTarget) {
            console.log(`Selecciona un objetivo antes de usar ${skill.name}`);
            return;
        }

        this.ki -= skill.cost;
        console.log(`${character.name} usa ${skill.name}`);

        this.applySkill(skill, this.currentTarget);

        this.selectedSkill = null;
        this.currentTarget = null;
        
        this.enemyCharacters.forEach(enemy => {
            enemy.getBattleSprite().clearTint();
        });

        this.nextTurn();
    }

    applySkill(skill, target) {
        switch (skill.type) {
            case 'attack':
                target.hp -= skill.damage;
                if (target.hp <= 0) {
                    target.getBattleSprite().setVisible(false);
                }
                if (skill.effect === 'stun') {
                    target.stunned = true;
                }
                break;
            case 'heal':
                target.hp += skill.heal;
                if (target.hp > target.maxHp) {
                    target.hp = target.maxHp;
                }
                break;
        }

        this.updateHealthBars();
    }

    updateHealthBars() {
        this.healthBars.forEach(healthBar => {
            const character = healthBar.character;
            if (healthBar.text) {
                healthBar.text.setText(`${character.name}: ${character.hp}/${character.maxHp}`);
            }
            const healthPercentage = character.hp / character.maxHp;
            healthBar.bar.setScale(healthPercentage, 1);
        });
    }

    nextTurn() {
        do {
            this.currentTurn = (this.currentTurn + 1) % this.selectedCharacters.length;
        } while (this.selectedCharacters[this.currentTurn].stunned);

        this.generateKiPerTurn();
        this.showSkills(this.selectedCharacters[this.currentTurn]);
    }

    generateKiAtStart() {
        this.ki += 30;
        this.updateKiText();
    }

    generateKiPerTurn() {
        this.ki += this.selectedCharacters.filter(character => character.hp > 0).length * 20;
        this.updateKiText();
    }

    updateKiText() {
        this.kiText.setText(`Ki: ${this.ki}`);
    }

    update() {
        // Lógica de actualización para la batalla
    }
}

export default BattleScene;