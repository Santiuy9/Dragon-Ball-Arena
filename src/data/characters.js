export default class Character {
    constructor(name, frame, skills, description) {
        this.name = name;
        this.frame = frame;
        this.skills = skills;
        this.description = description;
        this.selected = false;
    }

    //
    getName() {
        return this.name;
    }

    getFrame() {
        return this.frame;
    }

    getSkills() {
        return this.skills;
    }

    getDescription() {
        return this.description
    }

    setSelected() {
        this.selected = this.selected;
    }

    isSelected() {
        return this.selected;
    }

}