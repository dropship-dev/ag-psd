"use strict";
/// <reference types="mocha" />
/// <reference path="../../typings/chai.d.ts" />
/// <reference path="../../typings/canvas.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
exports.expectBuffersEqual = exports.compareBuffers = exports.compareCanvases = exports.compareTwoFiles = exports.loadCanvasFromFile = exports.saveCanvas = exports.extractPSD = exports.createReaderFromBuffer = exports.loadImagesFromDirectory = exports.importPSD = exports.range = exports.repeat = exports.toArrayBuffer = exports.createCanvas = void 0;
require("source-map-support").install();
var canvas_1 = require("canvas");
Object.defineProperty(exports, "createCanvas", { enumerable: true, get: function () { return canvas_1.createCanvas; } });
var fs = require("fs");
var path = require("path");
var descriptor_1 = require("../descriptor");
require("../initializeCanvas");
var psdReader_1 = require("../psdReader");
(0, descriptor_1.setLogErrors)(true);
var resultsPath = path.join(__dirname, "..", "..", "results");
function toArrayBuffer(buffer) {
    var ab = new ArrayBuffer(buffer.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buffer.length; ++i) {
        view[i] = buffer[i];
    }
    return ab;
}
exports.toArrayBuffer = toArrayBuffer;
function repeat(times) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    if (!values.length) {
        throw new Error("missing values");
    }
    var array = [];
    for (var i = 0; i < times; i++) {
        array.push.apply(array, values);
    }
    return array;
}
exports.repeat = repeat;
function range(start, length) {
    var array = [];
    for (var i = 0; i < length; i++) {
        array.push(start + i);
    }
    return array;
}
exports.range = range;
function importPSD(dirName) {
    var dataPath = path.join(dirName, "data.json");
    if (!fs.existsSync(dataPath))
        return undefined;
    return JSON.parse(fs.readFileSync(dataPath, "utf8"));
}
exports.importPSD = importPSD;
function loadImagesFromDirectory(dirName) {
    var images = {};
    fs.readdirSync(dirName)
        .filter(function (f) { return /\.png$/.test(f); })
        .forEach(function (f) { return (images[f] = loadCanvasFromFile(path.join(dirName, f))); });
    return images;
}
exports.loadImagesFromDirectory = loadImagesFromDirectory;
function createReaderFromBuffer(buffer) {
    var reader = (0, psdReader_1.createReader)(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    // reader.strict = true;
    reader.debug = true; // for testing
    return reader;
}
exports.createReaderFromBuffer = createReaderFromBuffer;
// export function readPsdFromFile(fileName: string, options?: ReadOptions): Psd {
// 	const buffer = fs.readFileSync(fileName);
// 	const reader = createReaderFromBuffer(buffer);
// 	return readPsd(reader, options);
// }
function extractPSD(filePath, psd) {
    var basePath = path.join(resultsPath, filePath);
    if (!fs.existsSync(basePath))
        fs.mkdirSync(basePath);
    if (psd.canvas) {
        fs.writeFileSync(path.join(basePath, "canvas.png"), psd.canvas.toBuffer());
        psd.canvas = undefined;
    }
    psd.children.forEach(function (l, i) {
        if (l.canvas) {
            fs.writeFileSync(path.join(basePath, "layer-".concat(i, ".png")), l.canvas.toBuffer());
            l.canvas = undefined;
        }
    });
    fs.writeFileSync(path.join(basePath, "data.json"), JSON.stringify(psd, null, 2));
}
exports.extractPSD = extractPSD;
function saveCanvas(fileName, canvas) {
    if (canvas) {
        fs.writeFileSync(fileName, canvas.toBuffer());
    }
}
exports.saveCanvas = saveCanvas;
function loadCanvasFromFile(filePath) {
    var img = new canvas_1.Image();
    img.src = fs.readFileSync(filePath);
    var canvas = (0, canvas_1.createCanvas)(img.width, img.height);
    canvas.getContext("2d").drawImage(img, 0, 0);
    return canvas;
}
exports.loadCanvasFromFile = loadCanvasFromFile;
function compareTwoFiles(expectedPath, actual, name) {
    var expectedBuffer = fs.readFileSync(expectedPath);
    var expected = new Uint8Array(expectedBuffer.buffer, expectedBuffer.byteOffset, expectedBuffer.byteLength);
    if (expected.byteLength !== actual.byteLength) {
        throw new Error("File size is different than expected (".concat(name, ")"));
    }
    for (var i = 0; i < expected.byteLength; i++) {
        if (expected[i] !== actual[i]) {
            throw new Error("Actual file different than expected at index ".concat(i, ": actual ").concat(actual[i], ", expected ").concat(expected[i]));
        }
    }
}
exports.compareTwoFiles = compareTwoFiles;
function compareCanvases(expected, actual, name) {
    var saveFailure = function () {
        var failuresDir = path.join(resultsPath, "failures");
        if (!fs.existsSync(failuresDir)) {
            fs.mkdirSync(failuresDir);
        }
        fs.writeFileSync(path.join(failuresDir, "".concat(name.replace(/[\\/]/, "-"))), actual.toBuffer());
    };
    if (expected === actual)
        return;
    if (!expected)
        throw new Error("Expected canvas is null (".concat(name, ")"));
    if (!actual)
        throw new Error("Actual canvas is null (".concat(name, ")"));
    if (expected.width !== actual.width || expected.height !== actual.height) {
        saveFailure();
        throw new Error("Canvas size is different than expected (".concat(name, ")"));
    }
    var expectedData = expected
        .getContext("2d")
        .getImageData(0, 0, expected.width, expected.height);
    var actualData = actual
        .getContext("2d")
        .getImageData(0, 0, actual.width, actual.height);
    var length = expectedData.width * expectedData.height * 4;
    for (var i = 0; i < length; i++) {
        if (expectedData.data[i] !== actualData.data[i]) {
            saveFailure();
            var expectedNumBytes = expectedData.data.length;
            var actualNumBytes = actualData.data.length;
            throw new Error("Actual canvas (".concat(actualNumBytes, " bytes) different than ") +
                "expected (".concat(name, ") (").concat(expectedNumBytes, " bytes) ") +
                "at index ".concat(i, ": actual ").concat(actualData.data[i], " vs. expected ").concat(expectedData.data[i]));
        }
    }
}
exports.compareCanvases = compareCanvases;
function compareBuffers(actual, expected, test, start, offset) {
    var _a, _b, _c;
    if (start === void 0) { start = 0; }
    if (offset === void 0) { offset = 0; }
    if (!actual)
        throw new Error("Actual buffer is null or undefined (".concat(test, ")"));
    if (!expected)
        throw new Error("Expected buffer is null or undefined (".concat(test, ")"));
    for (var i = start; i < expected.length; i++) {
        if (expected[i] !== actual[i + offset]) {
            throw new Error("Buffers differ " +
                "expected: 0x".concat((_a = expected[i]) === null || _a === void 0 ? void 0 : _a.toString(16), " at [0x").concat(i === null || i === void 0 ? void 0 : i.toString(16), "] ") +
                "actual: 0x".concat((_b = actual[i + offset]) === null || _b === void 0 ? void 0 : _b.toString(16), " at [0x").concat((_c = (i + offset)) === null || _c === void 0 ? void 0 : _c.toString(16), "] (").concat(test, ")"));
        }
    }
    if (actual.length !== expected.length)
        throw new Error("Buffers differ in size actual: ".concat(actual.length, " expected: ").concat(expected.length, " (").concat(test, ")"));
}
exports.compareBuffers = compareBuffers;
function expectBuffersEqual(actual, expected, name) {
    var length = Math.max(actual.length, expected.length);
    for (var i = 0; i < length; i++) {
        if (actual[i] !== expected[i]) {
            fs.writeFileSync(path.join(__dirname, "..", "..", "results", name), Buffer.from(actual));
            throw new Error("Different byte at 0x".concat(i.toString(16), " in (").concat(name, ")"));
        }
    }
}
exports.expectBuffersEqual = expectBuffersEqual;
//# sourceMappingURL=common.js.map