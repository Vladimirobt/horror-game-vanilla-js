//@ts-check
import { Barrier } from "./Barrier.js";
import { Monster } from "./Monster.js";
import { Player } from "./Player.js";
import { key } from "./Key.js";
import { Door } from "./door.js";
import { Exit } from "./exit.js";
import { level1, level2 } from "../levels.js";

export class Game {
	constructor() {
		this.player = undefined;
		this.barriers = [];
		this.monsters = [];
		this.keys = [];
		this.exit = [];

		this.isPlayerDead = false;
		this.playerWin = false;

		this.levels = [level1, level2];
		this.currentLevel = 0;
	}

	start() {
		this.loadLevel(this.levels[this.currentLevel]);
	}

	/**
	 * @param {string[]} level
	 */
	loadLevel(level) {
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
		return {
			player: this.player,
			monster: this.monsters,
			barriers: this.barriers,
			keys: this.keys,
		};
	}
}
