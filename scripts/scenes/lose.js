//@ts-check

import { canvas } from "../canvas.js";
import { Game } from "../game-objects/game.js";
import { GameObject } from "../game-objects/game-object.js";
import { ctx } from "../canvas.js";

export class LoseScene extends GameObject {
	/**
	 * @param {Game} game
	 */
	constructor(game) {
		super(canvas.width, canvas.height, 0, 0);
		game.audioPlayer.deathScream();
		this.fillStyle = ctx.createLinearGradient(0, 0, 0, canvas.height);
		this.fillStyle.addColorStop(0.5, "black");
		this.fillStyle.addColorStop(1, "orange");

		this.textGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
		this.textGradient.addColorStop(0, "green");
		this.textGradient.addColorStop(0.5, "red");
		this.textGradient.addColorStop(1, "purple");

		this.game = game;

		canvas.addEventListener(
			"click",
			() => {
				this.game.restart();
			},
			{ once: true }
		);
	}

	render() {
		super.render();

		ctx.save();
		ctx.fillStyle = this.textGradient;
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";

		ctx.font = "150px zombiecontrol";
		ctx.fillText("You died!", canvas.width / 2, 100);

		ctx.font = "80px zombiecontrol";
		ctx.fillText(
			`You completed ${this.game.currentLevel} levels`,
			canvas.width / 2,
			canvas.height / 2
		);

		ctx.font = "80px zombiecontrol";
		ctx.fillText(
			"Click to try again",
			canvas.width / 2,
			canvas.height - 60
		);

		ctx.restore();
	}
}
