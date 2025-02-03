import Phaser from "phaser";
import { MovementSpeed } from "../../const";

export default class GameScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private score: number = 0;
  private scoreText?: Phaser.GameObjects.Text;
  private apple!: Phaser.Physics.Arcade.Sprite;
  private isTouchDevice: boolean;
  private buttons: { [key: string]: Phaser.GameObjects.Rectangle } = {};

  constructor(isTouchDevice: boolean) {
    super("game-scene");
    this.isTouchDevice = isTouchDevice;
  }

  preload() {
    this.load.image("player", "/assets/sprites/player.png");
    this.load.image("apple", "/assets/sprites/apple.png");
  }

  create() {
    // Set camera zoom
    this.cameras.main.setZoom(1);

    // Create apple
    this.apple = this.physics.add
      .sprite(
        Phaser.Math.Between(50, 750),
        Phaser.Math.Between(50, 550),
        "apple"
      )
      .setScale(2);
    this.apple.setOrigin(0.5);
    this.apple.setImmovable(true);
    // if (this.apple.body) this.apple.body.allowGravity = false;

    // Create player
    this.player = this.physics.add.sprite(400, 300, "player").setScale(5);

    // Score display
    this.scoreText = this.add.text(16, 16, "Score: 0", {
      fontSize: "32px",
      color: "#ffffff",
    });

    // Keyboard controls
    this.cursors = this.input.keyboard?.createCursorKeys();

    // Collision detection
    this.physics.add.overlap(
      this.player,
      this.apple,
      this.eatApple,
      undefined,
      this
    );

    // Add touch controls if on mobile
    if (this.isTouchDevice) {
      this.createTouchControls();
    }
  }

  update() {
    if (!this.cursors || !this.player) return;

    this.player.setVelocity(0);
    this.apple.setVelocity(0);

    if (this.player.x < 0) this.player.x = window.innerWidth;
    if (this.player.x > window.innerWidth) this.player.x = 0;
    if (this.player.y < 0) this.player.y = window.innerHeight;
    if (this.player.y > window.innerHeight) this.player.y = 0;

    // Keyboard controls
    if (!this.isTouchDevice) {
      if (this.cursors.left.isDown) {
        this.player.setVelocityX(-MovementSpeed);
      } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(MovementSpeed);
      }
      if (this.cursors.up.isDown) {
        this.player.setVelocityY(-MovementSpeed);
      } else if (this.cursors.down.isDown) {
        this.player.setVelocityY(MovementSpeed);
      }
    }
  }

  private eatApple() {
    this.score += 1;
    this.scoreText?.setText(`Score: ${this.score}`);
    this.apple.setPosition(
      Phaser.Math.Between(50, 750),
      Phaser.Math.Between(50, 550)
    );
  }

  private createTouchControls() {
    const buttonSize = 80;
    const screenWidth = this.scale.width;
    const screenHeight = this.scale.height;

    // Create buttons for movement
    this.buttons["left"] = this.add
      .rectangle(50, screenHeight - 100, buttonSize, buttonSize, 0x6666ff)
      .setInteractive();
    this.buttons["right"] = this.add
      .rectangle(150, screenHeight - 100, buttonSize, buttonSize, 0x6666ff)
      .setInteractive();
    this.buttons["up"] = this.add
      .rectangle(
        screenWidth - 100,
        screenHeight - 200,
        buttonSize,
        buttonSize,
        0x6666ff
      )
      .setInteractive();
    this.buttons["down"] = this.add
      .rectangle(
        screenWidth - 100,
        screenHeight - 100,
        buttonSize,
        buttonSize,
        0x6666ff
      )
      .setInteractive();

    this.buttons["left"].on("pointerdown", () =>
      this.player.setVelocityX(-MovementSpeed)
    );
    this.buttons["right"].on("pointerdown", () =>
      this.player.setVelocityX(MovementSpeed)
    );
    this.buttons["up"].on("pointerdown", () =>
      this.player.setVelocityY(-MovementSpeed)
    );
    this.buttons["down"].on("pointerdown", () =>
      this.player.setVelocityY(MovementSpeed)
    );

    this.buttons["left"].on("pointerup", () => this.player.setVelocityX(0));
    this.buttons["right"].on("pointerup", () => this.player.setVelocityX(0));
    this.buttons["up"].on("pointerup", () => this.player.setVelocityY(0));
    this.buttons["down"].on("pointerup", () => this.player.setVelocityY(0));
  }
}
