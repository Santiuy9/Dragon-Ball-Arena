export default class Character {
    constructor(name, frame, skills, description) {
        this.name = name;
        this.frame = frame;
        this.skills = skills;
        this.description = description;
        this.battleSprite = null; // Propiedad para el sprite de batalla
        this.hp = 100; // Propiedad de ejemplo para la salud
        this.maxHp = 100; // Propiedad de ejemplo para la salud máxima
    }

    getFrame() {
        return this.frame;
    }

    setBattleSprite(sprite) {
        this.battleSprite = sprite;
    }

    getBattleSprite() {
        return this.battleSprite;
    }

    setBattleSpriteVisible(visible) {
        if (this.battleSprite) {
            this.battleSprite.setVisible(visible);
        }
    }
}