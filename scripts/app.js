//@ts-check
import { canvas, ctx } from "./canvas.js";
import { Game } from "./game-objects/Game.js";
import { level1 } from "./levels.js";

// /** @type {HTMLCanvasElement} */
// //@ts-ignore
// const canvas = document.getElementById("game-canvas");
// const ctx = canvas.getContext("2d");
// canvas.width = 800;
// canvas.height = 600;

let game = new Game();

let { player, monster, barriers, keys } = game.loadLevel(level1);
let gameObjects = [player, ...monster, ...barriers, ...keys];
let currentTime = 0;

function gameLoop(timestamp) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	let elapsedTime = Math.floor(timestamp - currentTime);
	currentTime = timestamp;

	gameObjects.forEach((o) => {
		o.update(elapsedTime);
		o.render();
	});

	requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
