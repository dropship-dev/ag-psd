"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var canvas_1 = require("canvas");
var chai_1 = require("chai");
var fs = require("fs");
var path = require("path");
var abr_1 = require("../abr");
var common_1 = require("./common");
var testFilesPath = path.join(__dirname, '..', '..', 'test');
var readFilesPath = path.join(testFilesPath, 'abr-read');
var resultsFilesPath = path.join(__dirname, '..', '..', 'results');
describe('ABR', function () {
    fs.readdirSync(readFilesPath).forEach(function (f) {
        // fs.readdirSync(readFilesPath).filter(f => /s/.test(f)).forEach(f => {
        it("reads ABR file (".concat(f, ")"), function () {
            var basePath = path.join(readFilesPath, f);
            var fileName = path.join(basePath, 'src.abr');
            var abr = (0, abr_1.readAbr)(fs.readFileSync(fileName), { logMissingFeatures: true });
            var resultsPath = path.join(resultsFilesPath, 'abr', f);
            fs.mkdirSync(resultsPath, { recursive: true });
            var images = (0, common_1.loadImagesFromDirectory)(basePath);
            var compare = [];
            for (var _i = 0, _a = abr.samples; _i < _a.length; _i++) {
                var sample = _a[_i];
                var canvas = alphaToCanvas(sample.alpha, sample.bounds.w, sample.bounds.h);
                delete sample.alpha;
                var name_1 = "sample-".concat(sample.id, ".png");
                fs.writeFileSync(path.join(resultsPath, name_1), canvas.toBuffer());
                compare.push({ name: name_1, canvas: canvas });
            }
            for (var _b = 0, _c = abr.patterns; _b < _c.length; _b++) {
                var pattern = _c[_b];
                var canvas = rgbToCanvas(pattern.data, pattern.bounds.w, pattern.bounds.h);
                delete pattern.data;
                var name_2 = "pattern-".concat(pattern.id, ".png");
                fs.writeFileSync(path.join(resultsPath, name_2), canvas.toBuffer());
                compare.push({ name: name_2, canvas: canvas });
            }
            // console.log(require('util').inspect(abr, false, 99, true));
            fs.writeFileSync(path.join(resultsPath, 'data.json'), JSON.stringify(abr, null, 2), 'utf8');
            var expected = JSON.parse(fs.readFileSync(path.join(basePath, 'data.json'), 'utf8'));
            (0, chai_1.expect)(abr).eql(expected, f);
            compare.forEach(function (i) { return (0, common_1.compareCanvases)(images[i.name], i.canvas, "".concat(f, "/").concat(i.name)); });
        });
    });
    it.skip('test', function () {
        var fileName = "E:\\Downloads\\Fire_Brushes_-_Pixivu.abr";
        var abr = (0, abr_1.readAbr)(fs.readFileSync(fileName), { logMissingFeatures: true });
        console.log(require('util').inspect(abr, false, 99, true));
    });
    it.skip('test', function () {
        this.timeout(60 * 1000);
        var basePath = "E:\\Downloads\\Brushes-20211231T151021Z-001\\Brushes";
        var outputPath = "E:\\Downloads\\output";
        for (var _i = 0, _a = fs.readdirSync(basePath); _i < _a.length; _i++) {
            var dir = _a[_i];
            var dirPath = path.join(basePath, dir);
            for (var _b = 0, _c = fs.readdirSync(dirPath); _b < _c.length; _b++) {
                var file = _c[_b];
                if (!/\.abr$/.test(file))
                    continue;
                var filePath = path.join(basePath, dir, file);
                console.log(filePath);
                var abr = (0, abr_1.readAbr)(fs.readFileSync(filePath));
                console.log(require('util').inspect(abr, false, 99, true));
                if (0) {
                    fs.rmSync(path.join(outputPath, file), { recursive: true, force: true });
                    fs.mkdirSync(path.join(outputPath, file));
                    for (var _d = 0, _e = abr.samples; _d < _e.length; _d++) {
                        var sample = _e[_d];
                        var canvas = alphaToCanvas(sample.alpha, sample.bounds.w, sample.bounds.h);
                        fs.writeFileSync(path.join(outputPath, file, 'sample-' + sample.id + '.png'), canvas.toBuffer());
                        delete sample.alpha;
                    }
                    for (var _f = 0, _g = abr.patterns; _f < _g.length; _f++) {
                        var pattern = _g[_f];
                        var canvas = rgbToCanvas(pattern.data, pattern.bounds.w, pattern.bounds.h);
                        fs.writeFileSync(path.join(outputPath, file, 'pattern-' + pattern.id + '.png'), canvas.toBuffer());
                        delete pattern.data;
                    }
                    fs.writeFileSync(path.join(outputPath, file, 'info.json'), JSON.stringify(abr, null, 2), 'utf8');
                }
            }
        }
    });
});
function alphaToCanvas(alpha, width, height) {
    var canvas = (0, canvas_1.createCanvas)(width, height);
    var context = canvas.getContext('2d');
    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    for (var src = 0, dst = 0; src < alpha.length; src++, dst += 4) {
        imageData.data[dst + 0] = 255;
        imageData.data[dst + 1] = 255;
        imageData.data[dst + 2] = 255;
        imageData.data[dst + 3] = alpha[src];
    }
    context.putImageData(imageData, 0, 0);
    return canvas;
}
function rgbToCanvas(rgb, width, height) {
    var canvas = (0, canvas_1.createCanvas)(width, height);
    var context = canvas.getContext('2d');
    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    imageData.data.set(rgb);
    context.putImageData(imageData, 0, 0);
    return canvas;
}
//# sourceMappingURL=abr.spec.js.map