"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var helpers_1 = require("../helpers");
var psdReader_1 = require("../psdReader");
var common_1 = require("./common");
function toData(data) {
    var result = [];
    for (var i = 0; i < data.length; i++) {
        result.push(data[i], data[i], data[i], data[i]);
    }
    return new Uint8Array(result);
}
function fromData(data) {
    var result = [];
    for (var i = 0; i < data.length; i += 4) {
        result.push(data[i]);
    }
    return result;
}
describe('helpers', function () {
    describe('writeDataRaw()', function () {
        it('returns undefined for 0 size', function () {
            (0, chai_1.expect)((0, helpers_1.writeDataRaw)({}, 0, 0, 0)).undefined;
            (0, chai_1.expect)((0, helpers_1.writeDataRaw)({}, 0, 0, 100)).undefined;
            (0, chai_1.expect)((0, helpers_1.writeDataRaw)({}, 0, 100, 0)).undefined;
        });
        it('writes data', function () {
            (0, helpers_1.writeDataRaw)({ data: new Uint8ClampedArray(16 * 16 * 4), width: 16, height: 16 }, 0, 16, 16);
        });
    });
    describe('writeDataRLE()', function () {
        it('returns undefined for 0 size', function () {
            (0, chai_1.expect)((0, helpers_1.writeDataRLE)(new Uint8Array(1), { width: 0, height: 0, data: [] }, [0], false)).undefined;
            (0, chai_1.expect)((0, helpers_1.writeDataRLE)(new Uint8Array(1), { width: 0, height: 100, data: [] }, [0], false)).undefined;
            (0, chai_1.expect)((0, helpers_1.writeDataRLE)(new Uint8Array(1), { width: 100, height: 0, data: [] }, [0], false)).undefined;
        });
        var rleTests = [
            { name: '1', width: 1, height: 1, data: [1] },
            { name: '1 1', width: 2, height: 1, data: [1, 1] },
            { name: '1 2', width: 2, height: 1, data: [1, 2] },
            { name: '3 x 1', width: 3, height: 1, data: [1, 1, 1] },
            { name: '1 2 3', width: 3, height: 1, data: [1, 2, 3] },
            { name: '1 1 1 3 2 1', width: 6, height: 1, data: [1, 1, 1, 3, 2, 1] },
            { name: '1 2 3 1 1 1', width: 6, height: 1, data: [1, 2, 3, 1, 1, 1] },
            { name: '1 1 1 1 1 0', width: 6, height: 1, data: [1, 1, 1, 1, 1, 0] },
            { name: '3x2 1 1 1 3 2 1', width: 3, height: 2, data: [1, 1, 1, 3, 2, 1] },
            { name: '3x2 1 2 3 1 1 1', width: 3, height: 2, data: [1, 2, 3, 1, 1, 1] },
            { name: '3x3 1 1 1 1 2 2 2 1 1', width: 3, height: 3, data: [1, 1, 1, 1, 2, 2, 2, 1, 1] },
            { name: '3x3 upper range', width: 3, height: 3, data: [255, 255, 255, 254, 254, 254, 1, 1, 0] },
            { name: '128 x 1', width: 128, height: 1, data: (0, common_1.repeat)(128, 1) },
            { name: '130 x 1', width: 130, height: 1, data: (0, common_1.repeat)(130, 1) },
            { name: '130 x 1 2', width: 130, height: 1, data: (0, common_1.repeat)(130 / 2, 1, 2) },
            { name: '150 x 1', width: 150, height: 1, data: (0, common_1.repeat)(150, 1) },
            { name: '100 x 1', width: 200, height: 1, data: (0, common_1.repeat)(200, 1) },
            { name: '300 x 1', width: 300, height: 1, data: (0, common_1.repeat)(300, 1) },
            { name: '500 x 1', width: 500, height: 1, data: (0, common_1.repeat)(500, 1) },
            { name: '100x5 only 1', width: 100, height: 5, data: (0, common_1.repeat)(5 * 100, 1) },
            {
                name: 'large list of 1s with some random numbers in it', width: 100, height: 5, data: __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], (0, common_1.repeat)(10, 1), true), [
                    3, 3, 3
                ], false), (0, common_1.repeat)(164, 1), true), [
                    3
                ], false), (0, common_1.repeat)(9, 1), true), [
                    5
                ], false), (0, common_1.repeat)(5, 1), true), [
                    3, 3, 3
                ], false), (0, common_1.repeat)(304, 1), true)
            },
            {
                name: 'smal batch in sea of 0s', width: 146, height: 1, data: __spreadArray(__spreadArray(__spreadArray([], (0, common_1.repeat)(50, 0), true), [
                    1, 13, 30, 42, 54, 64, 72, 77, 82, 86, 89, 90, 93, 94, 94, 95, 95, 95, 96, 96, 96, 96, 95, 95, 95, 94,
                    93, 92, 91, 89, 87, 84, 82, 80, 76, 72, 67, 62, 57, 49, 42, 34, 26, 19, 12, 5
                ], false), (0, common_1.repeat)(50, 0), true)
            },
            {
                name: 'from broken psd', width: 141, height: 1, data: [
                    237, 234, 233, 233, 233, 232, 233, 236, 238, 239, 239, 240, 241, 241, 238, 220, 217, 217, 215, 212,
                    205, 201, 203, 207, 208, 210, 218, 226, 234, 236, 236, 238, 240, 234, 228, 208, 180, 163, 178, 189,
                    205, 218, 219, 214, 214, 213, 205, 181, 171, 154, 132, 133, 163, 177, 179, 173, 76, 122, 168, 174,
                    143, 116, 117, 133, 181, 130, 172, 190, 159, 4, 0, 45, 179, 190, 177, 167, 18, 44, 110, 174, 212,
                    223, 229, 228, 213, 210, 170, 88, 200, 222, 210, 152, 152, 151, 190, 198, 210, 179, 183, 188, 189,
                    189, 187, 187, 186, 186, 184, 193, 213, 222, 229, 232, 231, 228, 229, 233, 237, 240, 240, 238, 236,
                    231, 226, 228, 230, 229, 222, 211, 201, 193, 189, 187, 186, 186, 186, 185, 184, 184, 186, 193, 198,
                ]
            },
            { name: '127 different + 3 repeated', width: 127 + 3, height: 1, data: __spreadArray(__spreadArray([], (0, common_1.range)(0, 127), true), [1, 1, 1], false) },
        ];
        rleTests.forEach(function (_a) {
            var width = _a.width, height = _a.height, data = _a.data, name = _a.name;
            it("correctly writes & reads RLE image (".concat(name, ")"), function () {
                if ((width * height) !== data.length) {
                    throw new Error("Invalid image data size ".concat(width * height, " !== ").concat(data.length));
                }
                var bitDepth = 8;
                var array;
                var result;
                try {
                    var input = { width: width, height: height, data: toData(data) };
                    var output = { width: width, height: height, data: new Uint8Array(width * height * 4) };
                    var buffer = new Uint8Array(16 * 1024 * 1024);
                    array = (0, helpers_1.writeDataRLE)(buffer, input, [0], false);
                    var reader = (0, psdReader_1.createReader)(array.buffer);
                    (0, psdReader_1.readDataRLE)(reader, output, width, height, bitDepth, 4, [0], false);
                    result = fromData(output.data);
                }
                catch (e) {
                    throw new Error("Error for image: [".concat(array, "] ").concat(e.stack));
                }
                (0, chai_1.expect)(result, "image: [".concat(array, "]")).eql(data);
            });
        });
    });
    describe('offsetForChannel()', function () {
        it('returns offset for other channelId', function () {
            (0, chai_1.expect)((0, helpers_1.offsetForChannel)(10, false)).equal(11);
        });
    });
});
//# sourceMappingURL=helpers.spec.js.map