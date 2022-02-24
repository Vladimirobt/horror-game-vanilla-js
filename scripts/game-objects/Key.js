//@ts-check

import { GameObject } from "./game-object.js";

export class key extends GameObject {
	constructor(x, y) {
		super(16, 16, x, y);
		this.fillStyle = "gold";
		this.isPickedUp = false;
	}

	render() {
		if (this.isPickedUp) return;
		super.render();
	}
}
