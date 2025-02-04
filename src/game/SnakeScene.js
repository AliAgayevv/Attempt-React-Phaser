import Phaser from "phaser";
export default class SnakeScene extends Phaser.Scene {
    constructor() {
        super("SnakeScene");
        this.elapsedTime = 0;
        this.isGoldenApple = true;
        this.isGamePaused = false;
    }
    create() {
        this.cellSize = Math.round(Math.min(window.innerWidth, window.innerHeight) / 30);
        this.gridWidth = Math.floor(window.innerWidth / this.cellSize);
        this.gridHeight = Math.floor(window.innerHeight / this.cellSize);
        this.snakeStartX = Math.floor(this.gridWidth / 2) * this.cellSize;
        this.snakeStartY = Math.floor(this.gridHeight / 2) * this.cellSize;
        this.resetButtonText = this.add
            .text(16, 80, "Pause", {
            fontSize: "32px",
            color: "#f0f0f0",
        })
            .setInteractive();
        this.timerText = this.add.text(16, 48, "Time: 00:00", {
            fontSize: "32px",
            color: "#fff",
        });
        this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true,
        });
        this.snake = [];
        this.direction = { x: 0, y: -1 };
        this.moveInterval = 0;
        this.score = 0;
        this.gameOver = false;
        for (let i = 0; i < 3; i++) {
            const segment = this.add.rectangle(this.snakeStartX, this.snakeStartY + i * this.cellSize, this.cellSize, this.cellSize, 0x00ff00);
            this.snake.push(segment);
        }
        this.apple = this.add.circle(0, 0 + this.cellSize, this.cellSize / 2, 0xff0000);
        this.placeApple(this.apple);
        this.goldenApple = this.add.circle(0, 0, this.cellSize / 2, 0xffd700);
        this.goldenApple.setScale(1.8);
        this.placeApple(this.goldenApple);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.scoreText = this.add.text(16, 16, "Score: 0", {
            fontSize: "32px",
            color: "#fff",
        });
        this.time.addEvent({
            delay: 100,
            callback: this.moveSnake,
            callbackScope: this,
            loop: true,
        });
        this.resetButtonText.on("pointerdown", () => {
            this.togglePauseResume();
        });
        this.setupInput();
        this.cursors.space.on("down", () => {
            this.togglePauseResume();
        });
    }
    setupInput() {
        this.input.keyboard.on("keydown", (event) => {
            if (event.key === "ArrowDown") {
                if (this.direction.y !== -1) {
                    this.direction = { x: 0, y: 1 };
                }
            }
            else if (event.key === "ArrowUp") {
                if (this.direction.y !== 1) {
                    this.direction = { x: 0, y: -1 };
                }
            }
            else if (event.key === "ArrowLeft") {
                if (this.direction.x !== 1) {
                    this.direction = { x: -1, y: 0 };
                }
            }
            else if (event.key === "ArrowRight") {
                if (this.direction.x !== -1) {
                    this.direction = { x: 1, y: 0 };
                }
            }
        });
    }
    togglePauseResume() {
        this.isGamePaused = !this.isGamePaused;
        this.resetButtonText.setText(this.isGamePaused ? "Resume" : "Pause");
        this.isGamePaused ? (this.time.paused = true) : (this.time.paused = false);
    }
    moveSnake() {
        if (this.gameOver || this.isGamePaused)
            return;
        const head = this.snake[0];
        const newHead = this.add.rectangle((head.x + this.direction.x * this.cellSize + window.innerWidth) %
            window.innerWidth, (head.y + this.direction.y * this.cellSize + window.innerHeight) %
            window.innerHeight, this.cellSize, this.cellSize, 0x00ff00);
        this.snake.unshift(newHead);
        if (this.checkCollision(newHead, this.apple)) {
            this.placeApple(this.apple);
            this.score += 1;
        }
        else if (this.isGoldenApple &&
            this.checkCollision(newHead, this.goldenApple)) {
            this.isGoldenApple = false;
            this.goldenApple.setPosition(-this.cellSize, -this.cellSize);
            this.score += 5;
        }
        else {
            this.snake.pop().destroy();
        }
        this.scoreText.setText("Score: " + this.score);
        for (let i = 1; i < this.snake.length; i++) {
            if (this.checkCollision(newHead, this.snake[i])) {
                this.gameOver = true;
                this.sys.game.events.emit("gameOver", this.score);
            }
        }
    }
    checkCollision(obj1, obj2) {
        const obj1Transform = obj1;
        const obj2Transform = obj2;
        return (obj1Transform.x === obj2Transform.x && obj1Transform.y === obj2Transform.y);
    }
    updateTimer() {
        if (this.isGamePaused)
            return;
        this.elapsedTime++;
        const minutes = Math.floor(this.elapsedTime / 60)
            .toString()
            .padStart(2, "0");
        const seconds = (this.elapsedTime % 60).toString().padStart(2, "0");
        this.timerText.setText(`Time: ${minutes}:${seconds}`);
        if (!this.isGoldenApple && this.elapsedTime % 10 === 0) {
            this.placeApple(this.goldenApple);
            this.isGoldenApple = true;
        }
    }
    placeApple(apple) {
        const maxX = (this.gridWidth - 1) * this.cellSize;
        const maxY = (this.gridHeight - 1) * this.cellSize;
        let x = Math.floor(Math.random() * this.gridWidth) * this.cellSize;
        let y = Math.floor(Math.random() * this.gridHeight) * this.cellSize;
        // Ensure coordinates stay within grid boundaries
        x = Math.min(x, maxX);
        y = Math.min(y, maxY);
        apple.setPosition(x, y);
    }
}
