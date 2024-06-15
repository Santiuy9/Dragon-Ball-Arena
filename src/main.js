import PreloadScene from "./scenes/PreloadScene.js";
import BootScene from "./scenes/BootScene.js";
import GameScene from "./scenes/GameScene.js";
import MenuScene from "./scenes/MenuScene.js";

const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 600,
    parent: 'game-container', // Asegúrate de que el juego se renderice en el contenedor correcto
    scene: [PreloadScene, BootScene, GameScene, MenuScene]
};

const game = new Phaser.Game(config);
