//@ts-check
/** @type {HTMLCanvasElement} */

//@ts-ignore
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1696;
canvas.height = 848;

export { canvas, ctx };
