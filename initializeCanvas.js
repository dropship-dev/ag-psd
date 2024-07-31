"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialize = void 0;
var canvas_1 = require("canvas");
var index_1 = require("./index");
var jpeg_1 = require("./jpeg");
function createCanvasFromData(data) {
    var canvas = (0, canvas_1.createCanvas)(100, 100);
    try {
        var context_1 = canvas.getContext('2d');
        var imageData = (0, jpeg_1.decodeJpeg)(data, function (w, h) { return context_1.createImageData(w, h); });
        canvas.width = imageData.width;
        canvas.height = imageData.height;
        context_1.putImageData(imageData, 0, 0);
    }
    catch (e) {
        console.error('JPEG decompression error', e.message);
    }
    return canvas;
}
(0, index_1.initializeCanvas)(canvas_1.createCanvas, createCanvasFromData);
function initialize() {
    (0, index_1.initializeCanvas)(canvas_1.createCanvas, createCanvasFromData);
}
exports.initialize = initialize;
//# sourceMappingURL=initializeCanvas.js.map