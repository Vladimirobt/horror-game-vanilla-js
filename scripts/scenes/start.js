//@ts-check

import { canvas } from "../canvas.js";
import { Game } from "../game-objects/game.js";
import { GameObject } from "../game-objects/game-object.js";
import { ctx } from "../canvas.js";

export class StartScene extends GameObject {
	/**
	 * @param {Game} game
	 */
	constructor(game) {
		super(canvas.width, canvas.height, 0, 0);
		this.fillStyle = "black";

		this.game = game;
	}

	render() {
		super.render();

		ctx.save();
		ctx.fillStyle = "red";
		ctx.font = "100px zombiecontrol";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText("Click to Start", canvas.width / 2, canvas.height / 2);
		ctx.restore();
	}
}
