//@ts-check
import { Barrier } from "./Barrier.js";
import { Monster } from "./Monster.js";
import { Player } from "./Player.js";
import { key } from "./Key.js";

export class Game {
	constructor() {}

	/**
	 * @param {string[]} level
	 */
	loadLevel(level) {
		let barriers = [];
		let monster = [];
		let monsterCoords = [];
		let player;
		let playerCoords = { x: 0, y: 0 };
		let keys = [];

		level.forEach((row, Idx) => {
			for (let col = 0; col < row.length; col++) {
				let x = col * 16;
				let y = Idx * 16;
				switch (row[col]) {
					case "w":
						barriers.push(new Barrier(x, y, 16, 16));
						break;
					case "m":
						monsterCoords.push({ x: x, y: y });
						break;
					case "p":
						playerCoords = { x: x, y: y };
						break;
					case "k":
						keys.push(new key(x, y));
						break;
				}
			}
		});

		monsterCoords.forEach((c) => {
			monster.push(new Monster(barriers, c.x, c.y));
		});

		player = new Player(barriers, playerCoords.x, playerCoords.y);
		return {
			player: player,
			monster: monster,
			barriers: barriers,
			keys: keys,
		};
	}
}
