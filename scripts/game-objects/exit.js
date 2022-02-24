//@ts-check

import { GameObject } from "./game-object.js";

export class Exit extends GameObject {
	/**
	 * @param {any} x
	 * @param {any} y
	 */
	constructor(x, y) {
		super(16, 16, x, y);
		this.fillStyle = "blue";
	}
}
