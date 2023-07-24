let background;
let mika;
let left;
let right;
let up;
let down;
let platform;

export default class MainScene extends Phaser.Scene {
    constructor(){
        super("MainScene");
    }

    preload() {
        //console.log("preload");
        this.load.image('testBg','src/assets/storyScene.png')
        this.load.spritesheet({
            key: 'mika',
            url: 'src/assets/mika/mika.png',
            frameConfig: { 
                frameWidth: 48, 
                frameHeight: 48,
                startFrame: 0,
                endFrame: 8 
            }
        });
        this.load.image('floor', 'src/assets/floor.png')
    }

    create() {
        //console.log("create");
        background = this.add.image(960,540,'testBg')

        left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        mika = this.physics.add.sprite(350,900,'mika').setScale(5);
        this.physics.add.collider(mika);
        this.anims.create({
            key: 'mikaLeft',
            frames: this.anims.generateFrameNumbers('mika', {
                start: 0,
                end: 2
            }),
            duration: 350,
            repeat: -1
        })
        this.anims.create({
            key: 'mikaRight',
            frames: this.anims.generateFrameNumbers('mika', {
                start: 4,
                end: 9
            }),
            duration: 350,
            repeat: -1
        })
        this.anims.create({
            key: 'mikaFront',
            frames: this.anims.generateFrameNumbers('mika', {
                start: 3,
                end: 3
            }),
            duration: 350,
            repeat: -1
        })

        platform = this.physics.add.staticGroup();
        platform.enableBody = true;
        platform.create(1020, 1062, 'floor').setScale(1.1).refreshBody();
        mika.setCollideWorldBounds(true);
        mika.setBounce(0.2);
        mika.body.setGravityY(1500)
        this.physics.add.collider(mika, platform);
        
    }

    update(delta,time) {
        //console.log("update");
        if (left.isDown) {
            mika.setVelocityX(-250)
            mika.anims.play('mikaLeft', true); // waiting for spritesheet
        } else if (right.isDown) {
            mika.setVelocityX(250)
            mika.anims.play('mikaRight', true); // waiting for spritesheet
        } else {
            mika.setVelocityX(0)
            // mika.anims.play('mikaAni', false);
            mika.anims.play('mikaFront', true);
           // mika.anims.play('mika', false); // waiting for spritesheet
        }
        if (up.isDown && mika.body.touching.down) {
            mika.setVelocityY(-450);
            mika.anims.play('mikaFront', true);
        }
    }
}