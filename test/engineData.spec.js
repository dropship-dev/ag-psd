"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./common");
var fs = require("fs");
var path = require("path");
var chai_1 = require("chai");
var engineData_1 = require("../engineData");
var common_1 = require("./common");
var testsPath = path.join(__dirname, '..', '..', 'test');
describe('engineData', function () {
    var dataBin = fs.readFileSync(path.join(testsPath, 'engineData.bin'));
    var dataJSON = JSON.parse(fs.readFileSync(path.join(testsPath, 'engineData.json'), 'utf8'));
    var dataBin2 = fs.readFileSync(path.join(testsPath, 'engineData2b.bin'));
    var dataJSON2 = JSON.parse(fs.readFileSync(path.join(testsPath, 'engineData2.json'), 'utf8'));
    it('parses engine data', function () {
        var result = (0, engineData_1.parseEngineData)(dataBin);
        (0, chai_1.expect)(result).eql(dataJSON);
    });
    it('parses engine data (2)', function () {
        var result = (0, engineData_1.parseEngineData)(dataBin2);
        fs.writeFileSync(path.join(__dirname, '..', '..', 'results', 'engineData2.json'), JSON.stringify(result, null, 2), 'utf8');
        (0, chai_1.expect)(result).eql(dataJSON2);
    });
    it('serializes engine data', function () {
        var result = (0, engineData_1.serializeEngineData)(dataJSON);
        (0, common_1.expectBuffersEqual)(result, dataBin, 'serialized.bin');
    });
    // TODO: floats encoded as integers in some fields (no way to use keys because they are all numeric)
    it('serializes engine data (2)', function () {
        var result = (0, engineData_1.serializeEngineData)(dataJSON2, true);
        (0, common_1.expectBuffersEqual)(result, dataBin2, 'serialized2.bin');
    });
});
//# sourceMappingURL=engineData.spec.js.map