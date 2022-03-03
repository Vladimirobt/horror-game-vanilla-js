/** @type {HTMLAudioElement} */
let keyPickup = document.getElementById("pickup-key");
let doorOpen = document.getElementById("door-open");
let deathScream = document.getElementById("death-scream");
let winSound = document.getElementById("win-sound");
let teleport = document.getElementById("teleport");

let high1 = document.getElementById("high-music-1");
let high2 = document.getElementById("high-music-2");
let med = document.getElementById("med-music");
let low = document.getElementById("low-music");

//@ts-check

export class AudioPlayer {
	constructor() {
		this.ctx = new AudioContext();

		this.currentLoop = 0;
		this.loops = [low, med, high1, high2];
	}

	init() {
		if (this.ctx.state === "suspended") {
			this.ctx.resume();
		}
	}

	playMusic() {
		this.currentLoop = 0;
		let loopToPlay = this.loops[this.currentLoop];
		loopToPlay.play();
		this.wireUpNextMusicLoop(loopToPlay);
	}

	/**
	 *
	 * @param {HTMLAudioElement} loop
	 */
	wireUpNextMusicLoop(loop) {
		loop.addEventListener(
			"ended",
			() => {
				this.currentLoop++;
				if (this.currentLoop === this.loops.length) {
					this.currentLoop -= 2;
				}
				let loopToPlay = this.loops[this.currentLoop];
				loopToPlay.play();
				this.wireUpNextMusicLoop(loopToPlay);
			},
			{ once: true }
		);
	}

	keyPickup() {
		keyPickup.play();
	}

	doorOpen() {
		doorOpen.volume = 0.1;
		doorOpen.play();
	}

	deathScream() {
		deathScream.volume = 0.05;
		deathScream.play();
	}

	winSound() {
		winSound.play();
	}

	teleport() {
		teleport.play();
	}
}
