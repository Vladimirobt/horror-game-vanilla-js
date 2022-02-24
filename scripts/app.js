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
game.start();

game.loadLevel(level1);

let currentTime = 0;

function gameLoop(timestamp) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	let gameObjects = [
		game.player,
		...game.monsters,
		...game.barriers,
		...game.keys,
		game.exit,
	];

	let elapsedTime = Math.floor(timestamp - currentTime);
	currentTime = timestamp;

	gameObjects.forEach((o) => {
		o.update(elapsedTime);
		o.render();
	});

	if (!game.isPlayerDead && !game.playerWin) {
		requestAnimationFrame(gameLoop);
	}

	if (game.playerWin) {
		alert("Nice you won. :)");
	}
	if (game.isPlayerDead) {
		if (confirm("you lost. Try again?")) {
			return;
		} else {
			return;
		}
	}
}

requestAnimationFrame(gameLoop);
