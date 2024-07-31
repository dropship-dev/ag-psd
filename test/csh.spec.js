"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var fs = require("fs");
var path = require("path");
var csh_1 = require("../csh");
var utils_1 = require("./utils");
var testFilesPath = path.join(__dirname, '..', '..', 'test');
var readFilesPath = path.join(testFilesPath, 'csh-read');
var resultsFilesPath = path.join(__dirname, '..', '..', 'results');
describe('CSH', function () {
    fs.readdirSync(readFilesPath).forEach(function (f) {
        it("reads CSH file (".concat(f, ")"), function () {
            var basePath = path.join(readFilesPath, f);
            var baseResults = path.join(resultsFilesPath, 'csh', f);
            var fileName = path.join(basePath, 'src.csh');
            var csh = (0, csh_1.readCsh)(fs.readFileSync(fileName));
            fs.mkdirSync(baseResults, { recursive: true });
            for (var _i = 0, _a = csh.shapes; _i < _a.length; _i++) {
                var shape = _a[_i];
                (0, utils_1.drawBezierPaths)(shape.paths, shape.width, shape.height, path.join(baseResults, "shape-".concat(shape.name, ".png")));
            }
            fs.writeFileSync(path.join(baseResults, "data.json"), JSON.stringify(csh, null, 2));
            // console.log(require('util').inspect(csh, false, 99, true));
            var expected = JSON.parse(fs.readFileSync(path.join(basePath, 'data.json'), 'utf8'));
            (0, chai_1.expect)(csh).eql(expected, f);
        });
    });
});
//# sourceMappingURL=csh.spec.js.map