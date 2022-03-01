//@ts-check
import { Barrier } from "./Barrier.js";
import { Monster } from "./Monster.js";
import { Player } from "./Player.js";
import { key } from "./Key.js";
import { Door } from "./door.js";
import { Exit } from "./exit.js";
import { level1, level2, Level3 } from "../levels.js";
import { canvas, ctx } from "../canvas.js";
import { StartScene } from "../scenes/start.js";
import { LoseScene } from "../scenes/lose.js";

export class Game {
	constructor() {
		this.player = undefined;
		this.barriers = [];
		this.monsters = [];
		this.keys = [];
		this.exit = [];
		this.gameObjects = [];

		this.isPlayerDead = false;
		this.playerWin = false;

		this.levels = [level1, level2, Level3];
		this.currentLevel = 0;
		this.currentTime = 0;
	}

	init() {
		let start = new StartScene(this);
		this.gameObjects.push(start);
		requestAnimationFrame(gameLoop);
	}

	start() {
		this.loadLevel();
	}

	lose() {
		let lose = new LoseScene(this);
		this.gameObjects = [lose];
	}

	nextLevel() {
		this.currentLevel++;
		this.player = undefined;
		this.barriers = [];
		this.monsters = [];
		this.keys = [];
		this.exit = [];
		this.gameObjects = [];

		this.playerWin = false;
		this.loadLevel();
	}

	resetLevel() {
		this.player = undefined;
		this.barriers = [];
		this.monsters = [];
		this.keys = [];
		this.exit = [];
		this.gameObjects = [];

		this.playerWin = false;
		this.isPlayerDead = false;
		this.loadLevel();
	}

	loadLevel() {
		let level = this.levels[this.currentLevel];
		let monsterCoords = [];
		let playerCoords = { x: 0, y: 0 };

		level.forEach((row, Idx) => {
			for (let col = 0; col < row.length; col++) {
				let x = col * 16;
				let y = Idx * 16;
				switch (row[col]) {
					case "w":
						this.barriers.push(new Barrier(x, y, 16, 16));
						break;
					case "m":
						monsterCoords.push({ x: x, y: y });
						break;
					case "p":
						playerCoords = { x: x, y: y };
						break;
					case "k":
						this.keys.push(new key(x, y));
						break;
					case "d":
						this.barriers.push(new Door(x, y, true));
						break;
					case "D":
						this.barriers.push(new Door(x, y, false));
						break;
					case "x":
						this.exit.push(new Exit(x, y));
						break;
				}
			}
		});

		monsterCoords.forEach((c) => {
			this.monsters.push(new Monster(this, c.x, c.y));
		});

		this.player = new Player(this, playerCoords.x, playerCoords.y);
		this.gameObjects = [
			game.player,
			...game.monsters,
			...game.barriers,
			...game.keys,
			...game.exit,
		];
	}
}

export let game = new Game();

function gameLoop(timestamp) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	if (game.playerWin) {
		alert("You beat this level.");
		game.nextLevel();
	}
	if (game.isPlayerDead) {
		game.lose();
	}
	let elapsedTime = Math.floor(timestamp - game.currentTime);
	game.currentTime = timestamp;

	game.gameObjects.forEach((o) => {
		o.update(elapsedTime);
		o.render();
	});
	requestAnimationFrame(gameLoop);
}
