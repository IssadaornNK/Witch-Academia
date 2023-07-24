import MainScene from "./MainScene.js";

const config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    scene:[MainScene],
}

new Phaser.Game(config);