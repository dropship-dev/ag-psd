"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasMultiEffects = exports.readVectorMask = exports.booleanOperations = exports.readBezierKnot = exports.infoHandlersMap = exports.infoHandlers = void 0;
var base64_js_1 = require("base64-js");
var effectsHelpers_1 = require("./effectsHelpers");
var helpers_1 = require("./helpers");
var psdReader_1 = require("./psdReader");
var psdWriter_1 = require("./psdWriter");
var descriptor_1 = require("./descriptor");
var engineData_1 = require("./engineData");
var text_1 = require("./text");
var fromAtoZ = "abcdefghijklmnopqrstuvwxyz";
exports.infoHandlers = [];
exports.infoHandlersMap = {};
function addHandler(key, has, read, write) {
    var handler = { key: key, has: has, read: read, write: write };
    exports.infoHandlers.push(handler);
    exports.infoHandlersMap[handler.key] = handler;
}
function addHandlerAlias(key, target) {
    exports.infoHandlersMap[key] = exports.infoHandlersMap[target];
}
function hasKey(key) {
    return function (target) { return target[key] !== undefined; };
}
function readLength64(reader) {
    if ((0, psdReader_1.readUint32)(reader))
        throw new Error("Resource size above 4 GB limit at ".concat(reader.offset.toString(16)));
    return (0, psdReader_1.readUint32)(reader);
}
function writeLength64(writer, length) {
    (0, psdWriter_1.writeUint32)(writer, 0);
    (0, psdWriter_1.writeUint32)(writer, length);
}
addHandler("TySh", hasKey("text"), function (reader, target, leftBytes) { return __awaiter(void 0, void 0, void 0, function () {
    var transform, i, text, warp, engineData, textData, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if ((0, psdReader_1.readInt16)(reader) !== 1)
                    throw new Error("Invalid TySh version");
                transform = [];
                for (i = 0; i < 6; i++)
                    transform.push((0, psdReader_1.readFloat64)(reader));
                if ((0, psdReader_1.readInt16)(reader) !== 50)
                    throw new Error("Invalid TySh text version");
                text = (0, descriptor_1.readVersionAndDescriptor)(reader);
                // console.log(require('util').inspect(text, false, 99, false), 'utf8');
                if ((0, psdReader_1.readInt16)(reader) !== 1)
                    throw new Error("Invalid TySh warp version");
                warp = (0, descriptor_1.readVersionAndDescriptor)(reader);
                // console.log(require('util').inspect(warp, false, 99, false), 'utf8');
                target.text = {
                    transform: transform,
                    left: (0, psdReader_1.readFloat32)(reader),
                    top: (0, psdReader_1.readFloat32)(reader),
                    right: (0, psdReader_1.readFloat32)(reader),
                    bottom: (0, psdReader_1.readFloat32)(reader),
                    text: text["Txt "].replace(/\r/g, "\n"),
                    index: text.TextIndex || 0,
                    gridding: descriptor_1.textGridding.decode(text.textGridding),
                    antiAlias: descriptor_1.Annt.decode(text.AntA),
                    orientation: descriptor_1.Ornt.decode(text.Ornt),
                    warp: {
                        style: descriptor_1.warpStyle.decode(warp.warpStyle),
                        value: warp.warpValue || 0,
                        perspective: warp.warpPerspective || 0,
                        perspectiveOther: warp.warpPerspectiveOther || 0,
                        rotate: descriptor_1.Ornt.decode(warp.warpRotate),
                    },
                };
                if (text.bounds)
                    target.text.bounds = (0, descriptor_1.descBoundsToBounds)(text.bounds);
                if (text.boundingBox)
                    target.text.boundingBox = (0, descriptor_1.descBoundsToBounds)(text.boundingBox);
                if (text.EngineData) {
                    engineData = (0, engineData_1.parseEngineData)(text.EngineData);
                    textData = (0, text_1.decodeEngineData)(engineData);
                    // console.log(require('util').inspect(engineData, false, 99, false), 'utf8');
                    // require('fs').writeFileSync(`layer-${target.name}.txt`, require('util').inspect(engineData, false, 99, false), 'utf8');
                    // const before = parseEngineData(text.EngineData);
                    // const after = encodeEngineData(engineData);
                    // require('fs').writeFileSync('before.txt', require('util').inspect(before, false, 99, false), 'utf8');
                    // require('fs').writeFileSync('after.txt', require('util').inspect(after, false, 99, false), 'utf8');
                    // console.log(require('util').inspect(parseEngineData(text.EngineData), false, 99, true));
                    target.text = __assign(__assign({}, target.text), textData);
                    // console.log(require('util').inspect(target.text, false, 99, true));
                }
                _a = psdReader_1.skipBytes;
                _b = [reader];
                return [4 /*yield*/, leftBytes()];
            case 1:
                _a.apply(void 0, _b.concat([_c.sent()]));
                return [2 /*return*/];
        }
    });
}); }, function (writer, target) {
    var text = target.text;
    var warp = text.warp || {};
    var transform = text.transform || [1, 0, 0, 1, 0, 0];
    var textDescriptor = __assign(__assign(__assign({ "Txt ": (text.text || "").replace(/\r?\n/g, "\r"), textGridding: descriptor_1.textGridding.encode(text.gridding), Ornt: descriptor_1.Ornt.encode(text.orientation), AntA: descriptor_1.Annt.encode(text.antiAlias) }, (text.bounds ? { bounds: (0, descriptor_1.boundsToDescBounds)(text.bounds) } : {})), (text.boundingBox
        ? { boundingBox: (0, descriptor_1.boundsToDescBounds)(text.boundingBox) }
        : {})), { TextIndex: text.index || 0, EngineData: (0, engineData_1.serializeEngineData)((0, text_1.encodeEngineData)(text)) });
    (0, psdWriter_1.writeInt16)(writer, 1); // version
    for (var i = 0; i < 6; i++) {
        (0, psdWriter_1.writeFloat64)(writer, transform[i]);
    }
    (0, psdWriter_1.writeInt16)(writer, 50); // text version
    (0, descriptor_1.writeVersionAndDescriptor)(writer, "", "TxLr", textDescriptor, "text");
    (0, psdWriter_1.writeInt16)(writer, 1); // warp version
    (0, descriptor_1.writeVersionAndDescriptor)(writer, "", "warp", encodeWarp(warp));
    (0, psdWriter_1.writeFloat32)(writer, text.left);
    (0, psdWriter_1.writeFloat32)(writer, text.top);
    (0, psdWriter_1.writeFloat32)(writer, text.right);
    (0, psdWriter_1.writeFloat32)(writer, text.bottom);
    // writeZeros(writer, 2);
});
// vector fills
addHandler("SoCo", function (target) {
    return target.vectorFill !== undefined &&
        target.vectorStroke === undefined &&
        target.vectorFill.type === "color";
}, function (reader, target) { return __awaiter(void 0, void 0, void 0, function () {
    var descriptor;
    return __generator(this, function (_a) {
        descriptor = (0, descriptor_1.readVersionAndDescriptor)(reader);
        target.vectorFill = (0, descriptor_1.parseVectorContent)(descriptor);
        return [2 /*return*/];
    });
}); }, function (writer, target) {
    var descriptor = (0, descriptor_1.serializeVectorContent)(target.vectorFill).descriptor;
    (0, descriptor_1.writeVersionAndDescriptor)(writer, "", "null", descriptor);
});
addHandler("GdFl", function (target) {
    return target.vectorFill !== undefined &&
        target.vectorStroke === undefined &&
        (target.vectorFill.type === "solid" || target.vectorFill.type === "noise");
}, function (reader, target, left) { return __awaiter(void 0, void 0, void 0, function () {
    var descriptor, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                descriptor = (0, descriptor_1.readVersionAndDescriptor)(reader);
                target.vectorFill = (0, descriptor_1.parseVectorContent)(descriptor);
                _a = psdReader_1.skipBytes;
                _b = [reader];
                return [4 /*yield*/, left()];
            case 1:
                _a.apply(void 0, _b.concat([_c.sent()]));
                return [2 /*return*/];
        }
    });
}); }, function (writer, target) {
    var descriptor = (0, descriptor_1.serializeVectorContent)(target.vectorFill).descriptor;
    (0, descriptor_1.writeVersionAndDescriptor)(writer, "", "null", descriptor);
});
addHandler("PtFl", function (target) {
    return target.vectorFill !== undefined &&
        target.vectorStroke === undefined &&
        target.vectorFill.type === "pattern";
}, function (reader, target) { return __awaiter(void 0, void 0, void 0, function () {
    var descriptor;
    return __generator(this, function (_a) {
        descriptor = (0, descriptor_1.readVersionAndDescriptor)(reader);
        target.vectorFill = (0, descriptor_1.parseVectorContent)(descriptor);
        return [2 /*return*/];
    });
}); }, function (writer, target) {
    var descriptor = (0, descriptor_1.serializeVectorContent)(target.vectorFill).descriptor;
    (0, descriptor_1.writeVersionAndDescriptor)(writer, "", "null", descriptor);
});
addHandler("vscg", function (target) {
    return target.vectorFill !== undefined && target.vectorStroke !== undefined;
}, function (reader, target, left) { return __awaiter(void 0, void 0, void 0, function () {
    var desc, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                (0, psdReader_1.readSignature)(reader); // key
                desc = (0, descriptor_1.readVersionAndDescriptor)(reader);
                target.vectorFill = (0, descriptor_1.parseVectorContent)(desc);
                _a = psdReader_1.skipBytes;
                _b = [reader];
                return [4 /*yield*/, left()];
            case 1:
                _a.apply(void 0, _b.concat([_c.sent()]));
                return [2 /*return*/];
        }
    });
}); }, function (writer, target) {
    var _a = (0, descriptor_1.serializeVectorContent)(target.vectorFill), descriptor = _a.descriptor, key = _a.key;
    (0, psdWriter_1.writeSignature)(writer, key);
    (0, descriptor_1.writeVersionAndDescriptor)(writer, "", "null", descriptor);
});
function readBezierKnot(reader, width, height) {
    var y0 = (0, psdReader_1.readFixedPointPath32)(reader) * height;
    var x0 = (0, psdReader_1.readFixedPointPath32)(reader) * width;
    var y1 = (0, psdReader_1.readFixedPointPath32)(reader) * height;
    var x1 = (0, psdReader_1.readFixedPointPath32)(reader) * width;
    var y2 = (0, psdReader_1.readFixedPointPath32)(reader) * height;
    var x2 = (0, psdReader_1.readFixedPointPath32)(reader) * width;
    return [x0, y0, x1, y1, x2, y2];
}
exports.readBezierKnot = readBezierKnot;
function writeBezierKnot(writer, points, width, height) {
    (0, psdWriter_1.writeFixedPointPath32)(writer, points[1] / height); // y0
    (0, psdWriter_1.writeFixedPointPath32)(writer, points[0] / width); // x0
    (0, psdWriter_1.writeFixedPointPath32)(writer, points[3] / height); // y1
    (0, psdWriter_1.writeFixedPointPath32)(writer, points[2] / width); // x1
    (0, psdWriter_1.writeFixedPointPath32)(writer, points[5] / height); // y2
    (0, psdWriter_1.writeFixedPointPath32)(writer, points[4] / width); // x2
}
exports.booleanOperations = [
    "exclude",
    "combine",
    "subtract",
    "intersect",
];
function readVectorMask(reader, vectorMask, width, height, size) {
    var end = reader.offset + size;
    var paths = vectorMask.paths;
    var path = undefined;
    while (end - reader.offset >= 26) {
        var selector = (0, psdReader_1.readUint16)(reader);
        switch (selector) {
            case 0: // Closed subpath length record
            case 3: {
                // Open subpath length record
                (0, psdReader_1.readUint16)(reader); // count
                var boolOp = (0, psdReader_1.readInt16)(reader);
                var flags = (0, psdReader_1.readUint16)(reader); // bit 1 always 1 ?
                (0, psdReader_1.skipBytes)(reader, 18);
                // TODO: 'combine' here might be wrong
                path = {
                    open: selector === 3,
                    operation: boolOp === -1 ? "combine" : exports.booleanOperations[boolOp],
                    knots: [],
                    fillRule: flags === 2 ? "non-zero" : "even-odd",
                };
                paths.push(path);
                break;
            }
            case 1: // Closed subpath Bezier knot, linked
            case 2: // Closed subpath Bezier knot, unlinked
            case 4: // Open subpath Bezier knot, linked
            case 5: // Open subpath Bezier knot, unlinked
                path.knots.push({
                    linked: selector === 1 || selector === 4,
                    points: readBezierKnot(reader, width, height),
                });
                break;
            case 6: // Path fill rule record
                (0, psdReader_1.skipBytes)(reader, 24);
                break;
            case 7: {
                // Clipboard record
                // TODO: check if these need to be multiplied by document size
                var top_1 = (0, psdReader_1.readFixedPointPath32)(reader);
                var left = (0, psdReader_1.readFixedPointPath32)(reader);
                var bottom = (0, psdReader_1.readFixedPointPath32)(reader);
                var right = (0, psdReader_1.readFixedPointPath32)(reader);
                var resolution = (0, psdReader_1.readFixedPointPath32)(reader);
                (0, psdReader_1.skipBytes)(reader, 4);
                vectorMask.clipboard = { top: top_1, left: left, bottom: bottom, right: right, resolution: resolution };
                break;
            }
            case 8: // Initial fill rule record
                vectorMask.fillStartsWithAllPixels = !!(0, psdReader_1.readUint16)(reader);
                (0, psdReader_1.skipBytes)(reader, 22);
                break;
            default:
                throw new Error("Invalid vmsk section");
        }
    }
    return paths;
}
exports.readVectorMask = readVectorMask;
addHandler("vmsk", hasKey("vectorMask"), function (reader, target, left, _a) {
    var width = _a.width, height = _a.height;
    return __awaiter(void 0, void 0, void 0, function () {
        var vectorMask, flags, _b, _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    if ((0, psdReader_1.readUint32)(reader) !== 3)
                        throw new Error("Invalid vmsk version");
                    target.vectorMask = { paths: [] };
                    vectorMask = target.vectorMask;
                    flags = (0, psdReader_1.readUint32)(reader);
                    vectorMask.invert = (flags & 1) !== 0;
                    vectorMask.notLink = (flags & 2) !== 0;
                    vectorMask.disable = (flags & 4) !== 0;
                    _b = readVectorMask;
                    _c = [reader, vectorMask, width, height];
                    return [4 /*yield*/, left()];
                case 1:
                    _b.apply(void 0, _c.concat([_f.sent()]));
                    // drawBezierPaths(vectorMask.paths, width, height, 'out.png');
                    _d = psdReader_1.skipBytes;
                    _e = [reader];
                    return [4 /*yield*/, left()];
                case 2:
                    // drawBezierPaths(vectorMask.paths, width, height, 'out.png');
                    _d.apply(void 0, _e.concat([_f.sent()]));
                    return [2 /*return*/];
            }
        });
    });
}, function (writer, target, _a) {
    var width = _a.width, height = _a.height;
    var vectorMask = target.vectorMask;
    var flags = (vectorMask.invert ? 1 : 0) |
        (vectorMask.notLink ? 2 : 0) |
        (vectorMask.disable ? 4 : 0);
    (0, psdWriter_1.writeUint32)(writer, 3); // version
    (0, psdWriter_1.writeUint32)(writer, flags);
    // initial entry
    (0, psdWriter_1.writeUint16)(writer, 6);
    (0, psdWriter_1.writeZeros)(writer, 24);
    var clipboard = vectorMask.clipboard;
    if (clipboard) {
        (0, psdWriter_1.writeUint16)(writer, 7);
        (0, psdWriter_1.writeFixedPointPath32)(writer, clipboard.top);
        (0, psdWriter_1.writeFixedPointPath32)(writer, clipboard.left);
        (0, psdWriter_1.writeFixedPointPath32)(writer, clipboard.bottom);
        (0, psdWriter_1.writeFixedPointPath32)(writer, clipboard.right);
        (0, psdWriter_1.writeFixedPointPath32)(writer, clipboard.resolution);
        (0, psdWriter_1.writeZeros)(writer, 4);
    }
    if (vectorMask.fillStartsWithAllPixels !== undefined) {
        (0, psdWriter_1.writeUint16)(writer, 8);
        (0, psdWriter_1.writeUint16)(writer, vectorMask.fillStartsWithAllPixels ? 1 : 0);
        (0, psdWriter_1.writeZeros)(writer, 22);
    }
    for (var _i = 0, _b = vectorMask.paths; _i < _b.length; _i++) {
        var path = _b[_i];
        (0, psdWriter_1.writeUint16)(writer, path.open ? 3 : 0);
        (0, psdWriter_1.writeUint16)(writer, path.knots.length);
        (0, psdWriter_1.writeUint16)(writer, Math.abs(exports.booleanOperations.indexOf(path.operation))); // default to 1 if not found
        (0, psdWriter_1.writeUint16)(writer, path.fillRule === "non-zero" ? 2 : 1);
        (0, psdWriter_1.writeZeros)(writer, 18); // TODO: these are sometimes non-zero
        var linkedKnot = path.open ? 4 : 1;
        var unlinkedKnot = path.open ? 5 : 2;
        for (var _c = 0, _d = path.knots; _c < _d.length; _c++) {
            var _e = _d[_c], linked = _e.linked, points = _e.points;
            (0, psdWriter_1.writeUint16)(writer, linked ? linkedKnot : unlinkedKnot);
            writeBezierKnot(writer, points, width, height);
        }
    }
});
// TODO: need to write vmsk if has outline ?
addHandlerAlias("vsms", "vmsk");
addHandler("vogk", hasKey("vectorOrigination"), function (reader, target, left) { return __awaiter(void 0, void 0, void 0, function () {
    var desc, _i, _a, i, item, rectRadii, corners, trnf, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                if ((0, psdReader_1.readInt32)(reader) !== 1)
                    throw new Error("Invalid vogk version");
                desc = (0, descriptor_1.readVersionAndDescriptor)(reader);
                // console.log(require('util').inspect(desc, false, 99, true));
                target.vectorOrigination = { keyDescriptorList: [] };
                for (_i = 0, _a = desc.keyDescriptorList; _i < _a.length; _i++) {
                    i = _a[_i];
                    item = {};
                    if (i.keyShapeInvalidated != null)
                        item.keyShapeInvalidated = i.keyShapeInvalidated;
                    if (i.keyOriginType != null)
                        item.keyOriginType = i.keyOriginType;
                    if (i.keyOriginResolution != null)
                        item.keyOriginResolution = i.keyOriginResolution;
                    if (i.keyOriginShapeBBox) {
                        item.keyOriginShapeBoundingBox = {
                            top: (0, descriptor_1.parseUnits)(i.keyOriginShapeBBox["Top "]),
                            left: (0, descriptor_1.parseUnits)(i.keyOriginShapeBBox.Left),
                            bottom: (0, descriptor_1.parseUnits)(i.keyOriginShapeBBox.Btom),
                            right: (0, descriptor_1.parseUnits)(i.keyOriginShapeBBox.Rght),
                        };
                    }
                    rectRadii = i.keyOriginRRectRadii;
                    if (rectRadii) {
                        item.keyOriginRRectRadii = {
                            topRight: (0, descriptor_1.parseUnits)(rectRadii.topRight),
                            topLeft: (0, descriptor_1.parseUnits)(rectRadii.topLeft),
                            bottomLeft: (0, descriptor_1.parseUnits)(rectRadii.bottomLeft),
                            bottomRight: (0, descriptor_1.parseUnits)(rectRadii.bottomRight),
                        };
                    }
                    corners = i.keyOriginBoxCorners;
                    if (corners) {
                        item.keyOriginBoxCorners = [
                            {
                                x: corners.rectangleCornerA.Hrzn,
                                y: corners.rectangleCornerA.Vrtc,
                            },
                            {
                                x: corners.rectangleCornerB.Hrzn,
                                y: corners.rectangleCornerB.Vrtc,
                            },
                            {
                                x: corners.rectangleCornerC.Hrzn,
                                y: corners.rectangleCornerC.Vrtc,
                            },
                            {
                                x: corners.rectangleCornerD.Hrzn,
                                y: corners.rectangleCornerD.Vrtc,
                            },
                        ];
                    }
                    trnf = i.Trnf;
                    if (trnf) {
                        item.transform = [trnf.xx, trnf.xy, trnf.xy, trnf.yy, trnf.tx, trnf.ty];
                    }
                    target.vectorOrigination.keyDescriptorList.push(item);
                }
                _b = psdReader_1.skipBytes;
                _c = [reader];
                return [4 /*yield*/, left()];
            case 1:
                _b.apply(void 0, _c.concat([_d.sent()]));
                return [2 /*return*/];
        }
    });
}); }, function (writer, target) {
    target;
    var orig = target.vectorOrigination;
    var desc = { keyDescriptorList: [] };
    for (var i = 0; i < orig.keyDescriptorList.length; i++) {
        var item = orig.keyDescriptorList[i];
        if (item.keyShapeInvalidated) {
            desc.keyDescriptorList.push({
                keyShapeInvalidated: true,
                keyOriginIndex: i,
            });
        }
        else {
            desc.keyDescriptorList.push({}); // we're adding keyOriginIndex at the end
            var out = desc.keyDescriptorList[desc.keyDescriptorList.length - 1];
            if (item.keyOriginType != null)
                out.keyOriginType = item.keyOriginType;
            if (item.keyOriginResolution != null)
                out.keyOriginResolution = item.keyOriginResolution;
            var radii = item.keyOriginRRectRadii;
            if (radii) {
                out.keyOriginRRectRadii = {
                    unitValueQuadVersion: 1,
                    topRight: (0, descriptor_1.unitsValue)(radii.topRight, "topRight"),
                    topLeft: (0, descriptor_1.unitsValue)(radii.topLeft, "topLeft"),
                    bottomLeft: (0, descriptor_1.unitsValue)(radii.bottomLeft, "bottomLeft"),
                    bottomRight: (0, descriptor_1.unitsValue)(radii.bottomRight, "bottomRight"),
                };
            }
            var box = item.keyOriginShapeBoundingBox;
            if (box) {
                out.keyOriginShapeBBox = {
                    unitValueQuadVersion: 1,
                    "Top ": (0, descriptor_1.unitsValue)(box.top, "top"),
                    Left: (0, descriptor_1.unitsValue)(box.left, "left"),
                    Btom: (0, descriptor_1.unitsValue)(box.bottom, "bottom"),
                    Rght: (0, descriptor_1.unitsValue)(box.right, "right"),
                };
            }
            var corners = item.keyOriginBoxCorners;
            if (corners && corners.length === 4) {
                out.keyOriginBoxCorners = {
                    rectangleCornerA: { Hrzn: corners[0].x, Vrtc: corners[0].y },
                    rectangleCornerB: { Hrzn: corners[1].x, Vrtc: corners[1].y },
                    rectangleCornerC: { Hrzn: corners[2].x, Vrtc: corners[2].y },
                    rectangleCornerD: { Hrzn: corners[3].x, Vrtc: corners[3].y },
                };
            }
            var transform = item.transform;
            if (transform && transform.length === 6) {
                out.Trnf = {
                    xx: transform[0],
                    xy: transform[1],
                    yx: transform[2],
                    yy: transform[3],
                    tx: transform[4],
                    ty: transform[5],
                };
            }
            out.keyOriginIndex = i;
        }
    }
    (0, psdWriter_1.writeInt32)(writer, 1); // version
    (0, descriptor_1.writeVersionAndDescriptor)(writer, "", "null", desc);
});
addHandler("lmfx", function (target) { return target.effects !== undefined && hasMultiEffects(target.effects); }, function (reader, target, left, _, options) { return __awaiter(void 0, void 0, void 0, function () {
    var version, desc, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                version = (0, psdReader_1.readUint32)(reader);
                if (version !== 0)
                    throw new Error("Invalid lmfx version");
                desc = (0, descriptor_1.readVersionAndDescriptor)(reader);
                // console.log(require('util').inspect(info, false, 99, true));
                // discard if read in 'lrFX' or 'lfx2' section
                target.effects = (0, descriptor_1.parseEffects)(desc, !!options.logMissingFeatures);
                _a = psdReader_1.skipBytes;
                _b = [reader];
                return [4 /*yield*/, left()];
            case 1:
                _a.apply(void 0, _b.concat([_c.sent()]));
                return [2 /*return*/];
        }
    });
}); }, function (writer, target, _, options) {
    var desc = (0, descriptor_1.serializeEffects)(target.effects, !!options.logMissingFeatures, true);
    (0, psdWriter_1.writeUint32)(writer, 0); // version
    (0, descriptor_1.writeVersionAndDescriptor)(writer, "", "null", desc);
});
addHandler("lrFX", hasKey("effects"), function (reader, target, left) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (!target.effects)
                    target.effects = (0, effectsHelpers_1.readEffects)(reader);
                _a = psdReader_1.skipBytes;
                _b = [reader];
                return [4 /*yield*/, left()];
            case 1:
                _a.apply(void 0, _b.concat([_c.sent()]));
                return [2 /*return*/];
        }
    });
}); }, function (writer, target) {
    (0, effectsHelpers_1.writeEffects)(writer, target.effects);
});
addHandler("luni", hasKey("name"), function (reader, target, left) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                target.name = (0, psdReader_1.readUnicodeString)(reader);
                _a = psdReader_1.skipBytes;
                _b = [reader];
                return [4 /*yield*/, left()];
            case 1:
                _a.apply(void 0, _b.concat([_c.sent()]));
                return [2 /*return*/];
        }
    });
}); }, function (writer, target) {
    (0, psdWriter_1.writeUnicodeString)(writer, target.name);
    // writeUint16(writer, 0); // padding (but not extending string length)
});
addHandler("lnsr", hasKey("nameSource"), function (reader, target) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        target.nameSource = (0, psdReader_1.readSignature)(reader);
        return [2 /*return*/];
    });
}); }, function (writer, target) { return (0, psdWriter_1.writeSignature)(writer, target.nameSource); });
addHandler("lyid", hasKey("id"), function (reader, target) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        target.id = (0, psdReader_1.readUint32)(reader);
        return [2 /*return*/];
    });
}); }, function (writer, target, _psd, options) {
    var id = target.id;
    while (options.layerIds.has(id))
        id += 100; // make sure we don't have duplicate layer ids
    (0, psdWriter_1.writeUint32)(writer, id);
    options.layerIds.add(id);
    options.layerToId.set(target, id);
});
addHandler("lsct", hasKey("sectionDivider"), function (reader, target, left) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                target.sectionDivider = { type: (0, psdReader_1.readUint32)(reader) };
                return [4 /*yield*/, left()];
            case 1:
                if (_a.sent()) {
                    (0, psdReader_1.checkSignature)(reader, "8BIM");
                    target.sectionDivider.key = (0, psdReader_1.readSignature)(reader);
                }
                return [4 /*yield*/, left()];
            case 2:
                if (_a.sent()) {
                    target.sectionDivider.subType = (0, psdReader_1.readUint32)(reader);
                }
                return [2 /*return*/];
        }
    });
}); }, function (writer, target) {
    (0, psdWriter_1.writeUint32)(writer, target.sectionDivider.type);
    if (target.sectionDivider.key) {
        (0, psdWriter_1.writeSignature)(writer, "8BIM");
        (0, psdWriter_1.writeSignature)(writer, target.sectionDivider.key);
        if (target.sectionDivider.subType !== undefined) {
            (0, psdWriter_1.writeUint32)(writer, target.sectionDivider.subType);
        }
    }
});
// it seems lsdk is used when there's a layer is nested more than 6 levels, but I don't know why?
// maybe some limitation of old version of PS?
addHandlerAlias("lsdk", "lsct");
addHandler("clbl", hasKey("blendClippendElements"), function (reader, target) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        target.blendClippendElements = !!(0, psdReader_1.readUint8)(reader);
        (0, psdReader_1.skipBytes)(reader, 3);
        return [2 /*return*/];
    });
}); }, function (writer, target) {
    (0, psdWriter_1.writeUint8)(writer, target.blendClippendElements ? 1 : 0);
    (0, psdWriter_1.writeZeros)(writer, 3);
});
addHandler("infx", hasKey("blendInteriorElements"), function (reader, target) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        target.blendInteriorElements = !!(0, psdReader_1.readUint8)(reader);
        (0, psdReader_1.skipBytes)(reader, 3);
        return [2 /*return*/];
    });
}); }, function (writer, target) {
    (0, psdWriter_1.writeUint8)(writer, target.blendInteriorElements ? 1 : 0);
    (0, psdWriter_1.writeZeros)(writer, 3);
});
addHandler("knko", hasKey("knockout"), function (reader, target) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        target.knockout = !!(0, psdReader_1.readUint8)(reader);
        (0, psdReader_1.skipBytes)(reader, 3);
        return [2 /*return*/];
    });
}); }, function (writer, target) {
    (0, psdWriter_1.writeUint8)(writer, target.knockout ? 1 : 0);
    (0, psdWriter_1.writeZeros)(writer, 3);
});
addHandler("lmgm", hasKey("layerMaskAsGlobalMask"), function (reader, target) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        target.layerMaskAsGlobalMask = !!(0, psdReader_1.readUint8)(reader);
        (0, psdReader_1.skipBytes)(reader, 3);
        return [2 /*return*/];
    });
}); }, function (writer, target) {
    (0, psdWriter_1.writeUint8)(writer, target.layerMaskAsGlobalMask ? 1 : 0);
    (0, psdWriter_1.writeZeros)(writer, 3);
});
addHandler("lspf", hasKey("protected"), function (reader, target) { return __awaiter(void 0, void 0, void 0, function () {
    var flags;
    return __generator(this, function (_a) {
        flags = (0, psdReader_1.readUint32)(reader);
        target.protected = {
            transparency: (flags & 0x01) !== 0,
            composite: (flags & 0x02) !== 0,
            position: (flags & 0x04) !== 0,
        };
        if (flags & 0x08)
            target.protected.artboards = true;
        return [2 /*return*/];
    });
}); }, function (writer, target) {
    var flags = (target.protected.transparency ? 0x01 : 0) |
        (target.protected.composite ? 0x02 : 0) |
        (target.protected.position ? 0x04 : 0) |
        (target.protected.artboards ? 0x08 : 0);
    (0, psdWriter_1.writeUint32)(writer, flags);
});
addHandler("lclr", hasKey("layerColor"), function (reader, target) { return __awaiter(void 0, void 0, void 0, function () {
    var color;
    return __generator(this, function (_a) {
        color = (0, psdReader_1.readUint16)(reader);
        (0, psdReader_1.skipBytes)(reader, 6);
        target.layerColor = helpers_1.layerColors[color];
        return [2 /*return*/];
    });
}); }, function (writer, target) {
    var index = helpers_1.layerColors.indexOf(target.layerColor);
    (0, psdWriter_1.writeUint16)(writer, index === -1 ? 0 : index);
    (0, psdWriter_1.writeZeros)(writer, 6);
});
addHandler("shmd", function (target) {
    return target.timestamp !== undefined ||
        target.animationFrames !== undefined ||
        target.animationFrameFlags !== undefined ||
        target.timeline !== undefined ||
        target.comps !== undefined;
}, function (reader, target, left, _, options) { return __awaiter(void 0, void 0, void 0, function () {
    var count, _loop_1, i, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                count = (0, psdReader_1.readUint32)(reader);
                _loop_1 = function (i) {
                    var key;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                (0, psdReader_1.checkSignature)(reader, "8BIM");
                                key = (0, psdReader_1.readSignature)(reader);
                                (0, psdReader_1.readUint8)(reader); // copy
                                (0, psdReader_1.skipBytes)(reader, 3);
                                return [4 /*yield*/, (0, psdReader_1.readSection)(reader, 1, function (left) { return __awaiter(void 0, void 0, void 0, function () {
                                        var desc, desc, i_1, f, frame, propagate, flags, desc, timeScope, timeline, desc, _i, _a, item, t, _b, _c;
                                        return __generator(this, function (_d) {
                                            switch (_d.label) {
                                                case 0:
                                                    if (key === "cust") {
                                                        desc = (0, descriptor_1.readVersionAndDescriptor)(reader);
                                                        // console.log('cust', target.name, require('util').inspect(desc, false, 99, true));
                                                        if (desc.layerTime !== undefined)
                                                            target.timestamp = desc.layerTime;
                                                    }
                                                    else if (key === "mlst") {
                                                        desc = (0, descriptor_1.readVersionAndDescriptor)(reader);
                                                        // console.log('mlst', target.name, require('util').inspect(desc, false, 99, true));
                                                        target.animationFrames = [];
                                                        for (i_1 = 0; i_1 < desc.LaSt.length; i_1++) {
                                                            f = desc.LaSt[i_1];
                                                            frame = { frames: f.FrLs };
                                                            if (f.enab !== undefined)
                                                                frame.enable = f.enab;
                                                            if (f.Ofst)
                                                                frame.offset = (0, descriptor_1.horzVrtcToXY)(f.Ofst);
                                                            if (f.FXRf)
                                                                frame.referencePoint = (0, descriptor_1.horzVrtcToXY)(f.FXRf);
                                                            if (f.Lefx)
                                                                frame.effects = (0, descriptor_1.parseEffects)(f.Lefx, !!options.logMissingFeatures);
                                                            if (f.blendOptions && f.blendOptions.Opct)
                                                                frame.opacity = (0, descriptor_1.parsePercent)(f.blendOptions.Opct);
                                                            target.animationFrames.push(frame);
                                                        }
                                                    }
                                                    else if (key === "mdyn") {
                                                        // frame flags
                                                        (0, psdReader_1.readUint16)(reader); // unknown
                                                        propagate = (0, psdReader_1.readUint8)(reader);
                                                        flags = (0, psdReader_1.readUint8)(reader);
                                                        target.animationFrameFlags = {
                                                            propagateFrameOne: !propagate,
                                                            unifyLayerPosition: (flags & 1) !== 0,
                                                            unifyLayerStyle: (flags & 2) !== 0,
                                                            unifyLayerVisibility: (flags & 4) !== 0,
                                                        };
                                                    }
                                                    else if (key === "tmln") {
                                                        desc = (0, descriptor_1.readVersionAndDescriptor)(reader);
                                                        timeScope = desc.timeScope;
                                                        timeline = {
                                                            start: (0, descriptor_1.frac)(timeScope.Strt),
                                                            duration: (0, descriptor_1.frac)(timeScope.duration),
                                                            inTime: (0, descriptor_1.frac)(timeScope.inTime),
                                                            outTime: (0, descriptor_1.frac)(timeScope.outTime),
                                                            autoScope: desc.autoScope,
                                                            audioLevel: desc.audioLevel,
                                                        };
                                                        if (desc.trackList) {
                                                            timeline.tracks = (0, descriptor_1.parseTrackList)(desc.trackList, !!options.logMissingFeatures);
                                                        }
                                                        target.timeline = timeline;
                                                        // console.log('tmln:result', target.name, target.id, require('util').inspect(timeline, false, 99, true));
                                                    }
                                                    else if (key === "cmls") {
                                                        desc = (0, descriptor_1.readVersionAndDescriptor)(reader);
                                                        // console.log('cmls', require('util').inspect(desc, false, 99, true));
                                                        target.comps = {
                                                            settings: [],
                                                        };
                                                        if (desc.origFXRefPoint)
                                                            target.comps.originalEffectsReferencePoint = {
                                                                x: desc.origFXRefPoint.Hrzn,
                                                                y: desc.origFXRefPoint.Vrtc,
                                                            };
                                                        for (_i = 0, _a = desc.layerSettings; _i < _a.length; _i++) {
                                                            item = _a[_i];
                                                            target.comps.settings.push({ compList: item.compList });
                                                            t = target.comps.settings[target.comps.settings.length - 1];
                                                            if ("enab" in item)
                                                                t.enabled = item.enab;
                                                            if (item.Ofst)
                                                                t.offset = { x: item.Ofst.Hrzn, y: item.Ofst.Vrtc };
                                                            if (item.FXRefPoint)
                                                                t.effectsReferencePoint = {
                                                                    x: item.FXRefPoint.Hrzn,
                                                                    y: item.FXRefPoint.Vrtc,
                                                                };
                                                        }
                                                    }
                                                    else {
                                                        options.logMissingFeatures &&
                                                            console.log('Unhandled "shmd" section key', key);
                                                    }
                                                    _b = psdReader_1.skipBytes;
                                                    _c = [reader];
                                                    return [4 /*yield*/, left()];
                                                case 1:
                                                    _b.apply(void 0, _c.concat([_d.sent()]));
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); })];
                            case 1:
                                _d.sent();
                                return [2 /*return*/];
                        }
                    });
                };
                i = 0;
                _c.label = 1;
            case 1:
                if (!(i < count)) return [3 /*break*/, 4];
                return [5 /*yield**/, _loop_1(i)];
            case 2:
                _c.sent();
                _c.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4:
                _a = psdReader_1.skipBytes;
                _b = [reader];
                return [4 /*yield*/, left()];
            case 5:
                _a.apply(void 0, _b.concat([_c.sent()]));
                return [2 /*return*/];
        }
    });
}); }, function (writer, target, _, options) {
    var animationFrames = target.animationFrames, animationFrameFlags = target.animationFrameFlags, timestamp = target.timestamp, timeline = target.timeline, comps = target.comps;
    var count = 0;
    if (animationFrames)
        count++;
    if (animationFrameFlags)
        count++;
    if (timeline)
        count++;
    if (timestamp !== undefined)
        count++;
    if (comps)
        count++;
    (0, psdWriter_1.writeUint32)(writer, count);
    if (animationFrames) {
        (0, psdWriter_1.writeSignature)(writer, "8BIM");
        (0, psdWriter_1.writeSignature)(writer, "mlst");
        (0, psdWriter_1.writeUint8)(writer, 0); // copy (always false)
        (0, psdWriter_1.writeZeros)(writer, 3);
        (0, psdWriter_1.writeSection)(writer, 2, function () {
            var _a;
            var desc = {
                LaID: (_a = target.id) !== null && _a !== void 0 ? _a : 0,
                LaSt: [],
            };
            for (var i = 0; i < animationFrames.length; i++) {
                var f = animationFrames[i];
                var frame = {};
                if (f.enable !== undefined)
                    frame.enab = f.enable;
                frame.FrLs = f.frames;
                if (f.offset)
                    frame.Ofst = (0, descriptor_1.xyToHorzVrtc)(f.offset);
                if (f.referencePoint)
                    frame.FXRf = (0, descriptor_1.xyToHorzVrtc)(f.referencePoint);
                if (f.effects)
                    frame.Lefx = (0, descriptor_1.serializeEffects)(f.effects, false, false);
                if (f.opacity !== undefined)
                    frame.blendOptions = { Opct: (0, descriptor_1.unitsPercent)(f.opacity) };
                desc.LaSt.push(frame);
            }
            (0, descriptor_1.writeVersionAndDescriptor)(writer, "", "null", desc);
        }, true);
    }
    if (animationFrameFlags) {
        (0, psdWriter_1.writeSignature)(writer, "8BIM");
        (0, psdWriter_1.writeSignature)(writer, "mdyn");
        (0, psdWriter_1.writeUint8)(writer, 0); // copy (always false)
        (0, psdWriter_1.writeZeros)(writer, 3);
        (0, psdWriter_1.writeSection)(writer, 2, function () {
            (0, psdWriter_1.writeUint16)(writer, 0); // unknown
            (0, psdWriter_1.writeUint8)(writer, animationFrameFlags.propagateFrameOne ? 0x0 : 0xf);
            (0, psdWriter_1.writeUint8)(writer, (animationFrameFlags.unifyLayerPosition ? 1 : 0) |
                (animationFrameFlags.unifyLayerStyle ? 2 : 0) |
                (animationFrameFlags.unifyLayerVisibility ? 4 : 0));
        });
    }
    if (timeline) {
        (0, psdWriter_1.writeSignature)(writer, "8BIM");
        (0, psdWriter_1.writeSignature)(writer, "tmln");
        (0, psdWriter_1.writeUint8)(writer, 0); // copy (always false)
        (0, psdWriter_1.writeZeros)(writer, 3);
        (0, psdWriter_1.writeSection)(writer, 2, function () {
            var desc = {
                Vrsn: 1,
                timeScope: {
                    Vrsn: 1,
                    Strt: timeline.start,
                    duration: timeline.duration,
                    inTime: timeline.inTime,
                    outTime: timeline.outTime,
                },
                autoScope: timeline.autoScope,
                audioLevel: timeline.audioLevel,
            };
            if (timeline.tracks) {
                desc.trackList = (0, descriptor_1.serializeTrackList)(timeline.tracks);
            }
            var id = options.layerToId.get(target) || target.id;
            if (!id)
                throw new Error("You need to provide layer.id value whan writing document with animations");
            desc.LyrI = id;
            // console.log('WRITE:tmln', target.name, target.id, require('util').inspect(desc, false, 99, true));
            (0, descriptor_1.writeVersionAndDescriptor)(writer, "", "null", desc, "anim");
        }, true);
    }
    if (timestamp !== undefined) {
        (0, psdWriter_1.writeSignature)(writer, "8BIM");
        (0, psdWriter_1.writeSignature)(writer, "cust");
        (0, psdWriter_1.writeUint8)(writer, 0); // copy (always false)
        (0, psdWriter_1.writeZeros)(writer, 3);
        (0, psdWriter_1.writeSection)(writer, 2, function () {
            var desc = {
                layerTime: timestamp,
            };
            (0, descriptor_1.writeVersionAndDescriptor)(writer, "", "metadata", desc);
        }, true);
    }
    if (comps) {
        (0, psdWriter_1.writeSignature)(writer, "8BIM");
        (0, psdWriter_1.writeSignature)(writer, "cmls");
        (0, psdWriter_1.writeUint8)(writer, 0); // copy (always false)
        (0, psdWriter_1.writeZeros)(writer, 3);
        (0, psdWriter_1.writeSection)(writer, 2, function () {
            var id = options.layerToId.get(target) || target.id;
            if (!id)
                throw new Error("You need to provide layer.id value whan writing document with layer comps");
            var desc = {};
            if (comps.originalEffectsReferencePoint) {
                desc.origFXRefPoint = {
                    Hrzn: comps.originalEffectsReferencePoint.x,
                    Vrtc: comps.originalEffectsReferencePoint.y,
                };
            }
            desc.LyrI = id;
            desc.layerSettings = [];
            for (var _i = 0, _a = comps.settings; _i < _a.length; _i++) {
                var item = _a[_i];
                var t = {};
                if (item.enabled !== undefined)
                    t.enab = item.enabled;
                if (item.offset)
                    t.Ofst = { Hrzn: item.offset.x, Vrtc: item.offset.y };
                if (item.effectsReferencePoint)
                    t.FXRefPoint = {
                        Hrzn: item.effectsReferencePoint.x,
                        Vrtc: item.effectsReferencePoint.y,
                    };
                t.compList = item.compList;
                desc.layerSettings.push(t);
            }
            // console.log('cmls', require('util').inspect(desc, false, 99, true));
            (0, descriptor_1.writeVersionAndDescriptor)(writer, "", "null", desc);
        }, true);
    }
});
addHandler("vstk", hasKey("vectorStroke"), function (reader, target, left) { return __awaiter(void 0, void 0, void 0, function () {
    var desc, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                desc = (0, descriptor_1.readVersionAndDescriptor)(reader);
                // console.log(require('util').inspect(desc, false, 99, true));
                target.vectorStroke = {
                    strokeEnabled: desc.strokeEnabled,
                    fillEnabled: desc.fillEnabled,
                    lineWidth: (0, descriptor_1.parseUnits)(desc.strokeStyleLineWidth),
                    lineDashOffset: (0, descriptor_1.parseUnits)(desc.strokeStyleLineDashOffset),
                    miterLimit: desc.strokeStyleMiterLimit,
                    lineCapType: descriptor_1.strokeStyleLineCapType.decode(desc.strokeStyleLineCapType),
                    lineJoinType: descriptor_1.strokeStyleLineJoinType.decode(desc.strokeStyleLineJoinType),
                    lineAlignment: descriptor_1.strokeStyleLineAlignment.decode(desc.strokeStyleLineAlignment),
                    scaleLock: desc.strokeStyleScaleLock,
                    strokeAdjust: desc.strokeStyleStrokeAdjust,
                    lineDashSet: desc.strokeStyleLineDashSet.map(descriptor_1.parseUnits),
                    blendMode: descriptor_1.BlnM.decode(desc.strokeStyleBlendMode),
                    opacity: (0, descriptor_1.parsePercent)(desc.strokeStyleOpacity),
                    content: (0, descriptor_1.parseVectorContent)(desc.strokeStyleContent),
                    resolution: desc.strokeStyleResolution,
                };
                _a = psdReader_1.skipBytes;
                _b = [reader];
                return [4 /*yield*/, left()];
            case 1:
                _a.apply(void 0, _b.concat([_c.sent()]));
                return [2 /*return*/];
        }
    });
}); }, function (writer, target) {
    var _a, _b, _c;
    var stroke = target.vectorStroke;
    var desc = {
        strokeStyleVersion: 2,
        strokeEnabled: !!stroke.strokeEnabled,
        fillEnabled: !!stroke.fillEnabled,
        strokeStyleLineWidth: stroke.lineWidth || { value: 3, units: "Points" },
        strokeStyleLineDashOffset: stroke.lineDashOffset || {
            value: 0,
            units: "Points",
        },
        strokeStyleMiterLimit: (_a = stroke.miterLimit) !== null && _a !== void 0 ? _a : 100,
        strokeStyleLineCapType: descriptor_1.strokeStyleLineCapType.encode(stroke.lineCapType),
        strokeStyleLineJoinType: descriptor_1.strokeStyleLineJoinType.encode(stroke.lineJoinType),
        strokeStyleLineAlignment: descriptor_1.strokeStyleLineAlignment.encode(stroke.lineAlignment),
        strokeStyleScaleLock: !!stroke.scaleLock,
        strokeStyleStrokeAdjust: !!stroke.strokeAdjust,
        strokeStyleLineDashSet: stroke.lineDashSet || [],
        strokeStyleBlendMode: descriptor_1.BlnM.encode(stroke.blendMode),
        strokeStyleOpacity: (0, descriptor_1.unitsPercent)((_b = stroke.opacity) !== null && _b !== void 0 ? _b : 1),
        strokeStyleContent: (0, descriptor_1.serializeVectorContent)(stroke.content || { type: "color", color: { r: 0, g: 0, b: 0 } }).descriptor,
        strokeStyleResolution: (_c = stroke.resolution) !== null && _c !== void 0 ? _c : 72,
    };
    (0, descriptor_1.writeVersionAndDescriptor)(writer, "", "strokeStyle", desc);
});
addHandler("artb", // per-layer arboard info
hasKey("artboard"), function (reader, target, left) { return __awaiter(void 0, void 0, void 0, function () {
    var desc, rect, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                desc = (0, descriptor_1.readVersionAndDescriptor)(reader);
                rect = desc.artboardRect;
                target.artboard = {
                    rect: {
                        top: rect["Top "],
                        left: rect.Left,
                        bottom: rect.Btom,
                        right: rect.Rght,
                    },
                    guideIndices: desc.guideIndeces,
                    presetName: desc.artboardPresetName,
                    color: (0, descriptor_1.parseColor)(desc["Clr "]),
                    backgroundType: desc.artboardBackgroundType,
                };
                _a = psdReader_1.skipBytes;
                _b = [reader];
                return [4 /*yield*/, left()];
            case 1:
                _a.apply(void 0, _b.concat([_c.sent()]));
                return [2 /*return*/];
        }
    });
}); }, function (writer, target) {
    var _a;
    var artboard = target.artboard;
    var rect = artboard.rect;
    var desc = {
        artboardRect: {
            "Top ": rect.top,
            Left: rect.left,
            Btom: rect.bottom,
            Rght: rect.right,
        },
        guideIndeces: artboard.guideIndices || [],
        artboardPresetName: artboard.presetName || "",
        "Clr ": (0, descriptor_1.serializeColor)(artboard.color),
        artboardBackgroundType: (_a = artboard.backgroundType) !== null && _a !== void 0 ? _a : 1,
    };
    (0, descriptor_1.writeVersionAndDescriptor)(writer, "", "artboard", desc);
});
addHandler("sn2P", hasKey("usingAlignedRendering"), function (reader, target) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        target.usingAlignedRendering = !!(0, psdReader_1.readUint32)(reader);
        return [2 /*return*/];
    });
}); }, function (writer, target) { return (0, psdWriter_1.writeUint32)(writer, target.usingAlignedRendering ? 1 : 0); });
var placedLayerTypes = [
    "unknown",
    "vector",
    "raster",
    "image stack",
];
function parseWarp(warp) {
    var _a, _b, _c, _d, _e, _f;
    var result = __assign(__assign({ style: descriptor_1.warpStyle.decode(warp.warpStyle) }, (warp.warpValues
        ? { values: warp.warpValues }
        : { value: warp.warpValue || 0 })), { perspective: warp.warpPerspective || 0, perspectiveOther: warp.warpPerspectiveOther || 0, rotate: descriptor_1.Ornt.decode(warp.warpRotate), bounds: warp.bounds && {
            top: (0, descriptor_1.parseUnitsOrNumber)(warp.bounds["Top "]),
            left: (0, descriptor_1.parseUnitsOrNumber)(warp.bounds.Left),
            bottom: (0, descriptor_1.parseUnitsOrNumber)(warp.bounds.Btom),
            right: (0, descriptor_1.parseUnitsOrNumber)(warp.bounds.Rght),
        }, uOrder: warp.uOrder, vOrder: warp.vOrder });
    if (warp.deformNumRows != null || warp.deformNumCols != null) {
        result.deformNumRows = warp.deformNumRows;
        result.deformNumCols = warp.deformNumCols;
    }
    var envelopeWarp = warp.customEnvelopeWarp;
    if (envelopeWarp) {
        result.customEnvelopeWarp = {
            meshPoints: [],
        };
        var xs = ((_a = envelopeWarp.meshPoints.find(function (i) { return i.type === "Hrzn"; })) === null || _a === void 0 ? void 0 : _a.values) || [];
        var ys = ((_b = envelopeWarp.meshPoints.find(function (i) { return i.type === "Vrtc"; })) === null || _b === void 0 ? void 0 : _b.values) || [];
        for (var i = 0; i < xs.length; i++) {
            result.customEnvelopeWarp.meshPoints.push({ x: xs[i], y: ys[i] });
        }
        if (envelopeWarp.quiltSliceX || envelopeWarp.quiltSliceY) {
            result.customEnvelopeWarp.quiltSliceX =
                ((_d = (_c = envelopeWarp.quiltSliceX) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.values) || [];
            result.customEnvelopeWarp.quiltSliceY =
                ((_f = (_e = envelopeWarp.quiltSliceY) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.values) || [];
        }
    }
    return result;
}
function isQuiltWarp(warp) {
    var _a, _b;
    return (warp.deformNumCols != null ||
        warp.deformNumRows != null ||
        ((_a = warp.customEnvelopeWarp) === null || _a === void 0 ? void 0 : _a.quiltSliceX) ||
        ((_b = warp.customEnvelopeWarp) === null || _b === void 0 ? void 0 : _b.quiltSliceY));
}
function encodeWarp(warp) {
    var bounds = warp.bounds;
    var desc = __assign(__assign({ warpStyle: descriptor_1.warpStyle.encode(warp.style) }, (warp.values
        ? { warpValues: warp.values }
        : { warpValue: warp.value || 0 })), { warpPerspective: warp.perspective || 0, warpPerspectiveOther: warp.perspectiveOther || 0, warpRotate: descriptor_1.Ornt.encode(warp.rotate), bounds: {
            "Top ": (0, descriptor_1.unitsValue)((bounds && bounds.top) || { units: "Pixels", value: 0 }, "bounds.top"),
            Left: (0, descriptor_1.unitsValue)((bounds && bounds.left) || { units: "Pixels", value: 0 }, "bounds.left"),
            Btom: (0, descriptor_1.unitsValue)((bounds && bounds.bottom) || { units: "Pixels", value: 0 }, "bounds.bottom"),
            Rght: (0, descriptor_1.unitsValue)((bounds && bounds.right) || { units: "Pixels", value: 0 }, "bounds.right"),
        }, uOrder: warp.uOrder || 0, vOrder: warp.vOrder || 0 });
    var isQuilt = isQuiltWarp(warp);
    if (isQuilt) {
        var desc2 = desc;
        desc2.deformNumRows = warp.deformNumRows || 0;
        desc2.deformNumCols = warp.deformNumCols || 0;
    }
    var customEnvelopeWarp = warp.customEnvelopeWarp;
    if (customEnvelopeWarp) {
        var meshPoints = customEnvelopeWarp.meshPoints || [];
        if (isQuilt) {
            var desc2 = desc;
            desc2.customEnvelopeWarp = {
                _name: "",
                _classID: "customEnvelopeWarp",
                quiltSliceX: [
                    {
                        type: "quiltSliceX",
                        values: customEnvelopeWarp.quiltSliceX || [],
                    },
                ],
                quiltSliceY: [
                    {
                        type: "quiltSliceY",
                        values: customEnvelopeWarp.quiltSliceY || [],
                    },
                ],
                meshPoints: [
                    { type: "Hrzn", values: meshPoints.map(function (p) { return p.x; }) },
                    { type: "Vrtc", values: meshPoints.map(function (p) { return p.y; }) },
                ],
            };
        }
        else {
            desc.customEnvelopeWarp = {
                _name: "",
                _classID: "customEnvelopeWarp",
                meshPoints: [
                    { type: "Hrzn", values: meshPoints.map(function (p) { return p.x; }) },
                    { type: "Vrtc", values: meshPoints.map(function (p) { return p.y; }) },
                ],
            };
        }
    }
    return desc;
}
addHandler("PlLd", hasKey("placedLayer"), function (reader, target, left) { return __awaiter(void 0, void 0, void 0, function () {
    var id, pageNumber, totalPages, placedLayerType, transform, i, warpVersion, warp, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if ((0, psdReader_1.readSignature)(reader) !== "plcL")
                    throw new Error("Invalid PlLd signature");
                if ((0, psdReader_1.readInt32)(reader) !== 3)
                    throw new Error("Invalid PlLd version");
                id = (0, psdReader_1.readPascalString)(reader, 1);
                pageNumber = (0, psdReader_1.readInt32)(reader);
                totalPages = (0, psdReader_1.readInt32)(reader);
                (0, psdReader_1.readInt32)(reader); // anitAliasPolicy 16
                placedLayerType = (0, psdReader_1.readInt32)(reader);
                if (!placedLayerTypes[placedLayerType])
                    throw new Error("Invalid PlLd type");
                transform = [];
                for (i = 0; i < 8; i++)
                    transform.push((0, psdReader_1.readFloat64)(reader)); // x, y of 4 corners of the transform
                warpVersion = (0, psdReader_1.readInt32)(reader);
                if (warpVersion !== 0)
                    throw new Error("Invalid Warp version ".concat(warpVersion));
                warp = (0, descriptor_1.readVersionAndDescriptor)(reader);
                target.placedLayer = target.placedLayer || {
                    // skip if SoLd already set it
                    id: id,
                    type: placedLayerTypes[placedLayerType],
                    pageNumber: pageNumber,
                    totalPages: totalPages,
                    transform: transform,
                    warp: parseWarp(warp),
                };
                // console.log('PlLd warp', require('util').inspect(warp, false, 99, true));
                // console.log('PlLd', require('util').inspect(target.placedLayer, false, 99, true));
                _a = psdReader_1.skipBytes;
                _b = [reader];
                return [4 /*yield*/, left()];
            case 1:
                // console.log('PlLd warp', require('util').inspect(warp, false, 99, true));
                // console.log('PlLd', require('util').inspect(target.placedLayer, false, 99, true));
                _a.apply(void 0, _b.concat([_c.sent()]));
                return [2 /*return*/];
        }
    });
}); }, function (writer, target) {
    var placed = target.placedLayer;
    (0, psdWriter_1.writeSignature)(writer, "plcL");
    (0, psdWriter_1.writeInt32)(writer, 3); // version
    if (!placed.id ||
        typeof placed.id !== "string" ||
        !/^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/.test(placed.id)) {
        throw new Error("Placed layer ID must be in a GUID format (example: 20953ddb-9391-11ec-b4f1-c15674f50bc4)");
    }
    (0, psdWriter_1.writePascalString)(writer, placed.id, 1);
    (0, psdWriter_1.writeInt32)(writer, 1); // pageNumber
    (0, psdWriter_1.writeInt32)(writer, 1); // totalPages
    (0, psdWriter_1.writeInt32)(writer, 16); // anitAliasPolicy
    if (placedLayerTypes.indexOf(placed.type) === -1)
        throw new Error("Invalid placedLayer type");
    (0, psdWriter_1.writeInt32)(writer, placedLayerTypes.indexOf(placed.type));
    for (var i = 0; i < 8; i++)
        (0, psdWriter_1.writeFloat64)(writer, placed.transform[i]);
    (0, psdWriter_1.writeInt32)(writer, 0); // warp version
    var warp = getWarpFromPlacedLayer(placed);
    var isQuilt = isQuiltWarp(warp);
    var type = isQuilt ? "quiltWarp" : "warp";
    (0, descriptor_1.writeVersionAndDescriptor)(writer, "", type, encodeWarp(warp), type);
});
function uint8ToFloat32(array) {
    return new Float32Array(array.buffer.slice(array.byteOffset), 0, array.byteLength / 4);
}
function uint8ToUint32(array) {
    return new Uint32Array(array.buffer.slice(array.byteOffset), 0, array.byteLength / 4);
}
function toUint8(array) {
    return new Uint8Array(array.buffer, array.byteOffset, array.byteLength);
}
function arrayToPoints(array) {
    var points = [];
    for (var i = 0; i < array.length; i += 2) {
        points.push({ x: array[i], y: array[i + 1] });
    }
    return points;
}
function pointsToArray(points) {
    var array = [];
    for (var i = 0; i < points.length; i++) {
        array.push(points[i].x, points[i].y);
    }
    return array;
}
function uint8ToPoints(array) {
    return arrayToPoints(uint8ToFloat32(array));
}
function hrznVrtcToPoint(desc) {
    return {
        x: (0, descriptor_1.parseUnits)(desc.Hrzn),
        y: (0, descriptor_1.parseUnits)(desc.Vrtc),
    };
}
function pointToHrznVrtc(point) {
    return {
        _name: "",
        _classID: "Pnt ",
        Hrzn: (0, descriptor_1.unitsValue)(point.x, "x"),
        Vrtc: (0, descriptor_1.unitsValue)(point.y, "y"),
    };
}
function parseFilterFXItem(f) {
    var base = {
        name: f["Nm  "],
        opacity: (0, descriptor_1.parsePercent)(f.blendOptions.Opct),
        blendMode: descriptor_1.BlnM.decode(f.blendOptions["Md  "]),
        enabled: f.enab,
        hasOptions: f.hasoptions,
        foregroundColor: (0, descriptor_1.parseColor)(f.FrgC),
        backgroundColor: (0, descriptor_1.parseColor)(f.BckC),
    };
    switch (f.filterID) {
        case 1098281575:
            return __assign(__assign({}, base), { type: "average" });
        case 1114403360:
            return __assign(__assign({}, base), { type: "blur" });
        case 1114403405:
            return __assign(__assign({}, base), { type: "blur more" });
        case 697:
            return __assign(__assign({}, base), { type: "box blur", filter: {
                    radius: (0, descriptor_1.parseUnits)(f.Fltr["Rds "]),
                } });
        case 1198747202:
            return __assign(__assign({}, base), { type: "gaussian blur", filter: {
                    radius: (0, descriptor_1.parseUnits)(f.Fltr["Rds "]),
                } });
        case 1299476034:
            return __assign(__assign({}, base), { type: "motion blur", filter: {
                    angle: f.Fltr.Angl,
                    distance: (0, descriptor_1.parseUnits)(f.Fltr.Dstn),
                } });
        case 1382313026:
            return __assign(__assign({}, base), { type: "radial blur", filter: {
                    amount: f.Fltr.Amnt,
                    method: descriptor_1.BlrM.decode(f.Fltr.BlrM),
                    quality: descriptor_1.BlrQ.decode(f.Fltr.BlrQ),
                } });
        case 702:
            return __assign(__assign({}, base), { type: "shape blur", filter: {
                    radius: (0, descriptor_1.parseUnits)(f.Fltr["Rds "]),
                    customShape: {
                        name: f.Fltr.customShape["Nm  "],
                        id: f.Fltr.customShape.Idnt,
                    },
                } });
        case 1399681602:
            return __assign(__assign({}, base), { type: "smart blur", filter: {
                    radius: f.Fltr["Rds "],
                    threshold: f.Fltr.Thsh,
                    quality: descriptor_1.SmBQ.decode(f.Fltr.SmBQ),
                    mode: descriptor_1.SmBM.decode(f.Fltr.SmBM),
                } });
        case 701:
            return __assign(__assign({}, base), { type: "surface blur", filter: {
                    radius: (0, descriptor_1.parseUnits)(f.Fltr["Rds "]),
                    threshold: f.Fltr.Thsh,
                } });
        case 1148416108:
            return __assign(__assign({}, base), { type: "displace", filter: {
                    horizontalScale: f.Fltr.HrzS,
                    verticalScale: f.Fltr.VrtS,
                    displacementMap: descriptor_1.DspM.decode(f.Fltr.DspM),
                    undefinedAreas: descriptor_1.UndA.decode(f.Fltr.UndA),
                    displacementFile: {
                        signature: f.Fltr.DspF.sig,
                        path: f.Fltr.DspF.path, // TODO: this is decoded incorrectly ???
                    },
                } });
        case 1349411688:
            return __assign(__assign({}, base), { type: "pinch", filter: {
                    amount: f.Fltr.Amnt,
                } });
        case 1349284384:
            return __assign(__assign({}, base), { type: "polar coordinates", filter: {
                    conversion: descriptor_1.Cnvr.decode(f.Fltr.Cnvr),
                } });
        case 1383099493:
            return __assign(__assign({}, base), { type: "ripple", filter: {
                    amount: f.Fltr.Amnt,
                    size: descriptor_1.RplS.decode(f.Fltr.RplS),
                } });
        case 1399353888:
            return __assign(__assign({}, base), { type: "shear", filter: {
                    shearPoints: f.Fltr.ShrP.map(function (p) { return ({ x: p.Hrzn, y: p.Vrtc }); }),
                    shearStart: f.Fltr.ShrS,
                    shearEnd: f.Fltr.ShrE,
                    undefinedAreas: descriptor_1.UndA.decode(f.Fltr.UndA),
                } });
        case 1399875698:
            return __assign(__assign({}, base), { type: "spherize", filter: {
                    amount: f.Fltr.Amnt,
                    mode: descriptor_1.SphM.decode(f.Fltr.SphM),
                } });
        case 1417114220:
            return __assign(__assign({}, base), { type: "twirl", filter: {
                    angle: f.Fltr.Angl,
                } });
        case 1466005093:
            return __assign(__assign({}, base), { type: "wave", filter: {
                    numberOfGenerators: f.Fltr.NmbG,
                    type: descriptor_1.Wvtp.decode(f.Fltr.Wvtp),
                    wavelength: { min: f.Fltr.WLMn, max: f.Fltr.WLMx },
                    amplitude: { min: f.Fltr.AmMn, max: f.Fltr.AmMx },
                    scale: { x: f.Fltr.SclH, y: f.Fltr.SclV },
                    randomSeed: f.Fltr.RndS,
                    undefinedAreas: descriptor_1.UndA.decode(f.Fltr.UndA),
                } });
        case 1516722791:
            return __assign(__assign({}, base), { type: "zigzag", filter: {
                    amount: f.Fltr.Amnt,
                    ridges: f.Fltr.NmbR,
                    style: descriptor_1.ZZTy.decode(f.Fltr.ZZTy),
                } });
        case 1097092723:
            return __assign(__assign({}, base), { type: "add noise", filter: {
                    amount: (0, descriptor_1.parsePercent)(f.Fltr.Nose),
                    distribution: descriptor_1.Dstr.decode(f.Fltr.Dstr),
                    monochromatic: f.Fltr.Mnch,
                    randomSeed: f.Fltr.FlRs,
                } });
        case 1148416099:
            return __assign(__assign({}, base), { type: "despeckle" });
        case 1148417107:
            return __assign(__assign({}, base), { type: "dust and scratches", filter: {
                    radius: f.Fltr["Rds "],
                    threshold: f.Fltr.Thsh,
                } });
        case 1298427424:
            return __assign(__assign({}, base), { type: "median", filter: {
                    radius: (0, descriptor_1.parseUnits)(f.Fltr["Rds "]),
                } });
        case 633:
            return __assign(__assign({}, base), { type: "reduce noise", filter: {
                    preset: f.Fltr.preset,
                    removeJpegArtifact: f.Fltr.removeJPEGArtifact,
                    reduceColorNoise: (0, descriptor_1.parsePercent)(f.Fltr.ClNs),
                    sharpenDetails: (0, descriptor_1.parsePercent)(f.Fltr.Shrp),
                    channelDenoise: f.Fltr.channelDenoise.map(function (c) { return (__assign({ channels: c.Chnl.map(function (i) { return descriptor_1.Chnl.decode(i); }), amount: c.Amnt }, (c.EdgF ? { preserveDetails: c.EdgF } : {}))); }),
                } });
        case 1131180616:
            return __assign(__assign({}, base), { type: "color halftone", filter: {
                    radius: f.Fltr["Rds "],
                    angle1: f.Fltr.Ang1,
                    angle2: f.Fltr.Ang2,
                    angle3: f.Fltr.Ang3,
                    angle4: f.Fltr.Ang4,
                } });
        case 1131574132:
            return __assign(__assign({}, base), { type: "crystallize", filter: {
                    cellSize: f.Fltr.ClSz,
                    randomSeed: f.Fltr.FlRs,
                } });
        case 1180922912:
            return __assign(__assign({}, base), { type: "facet" });
        case 1181902701:
            return __assign(__assign({}, base), { type: "fragment" });
        case 1299870830:
            return __assign(__assign({}, base), { type: "mezzotint", filter: {
                    type: descriptor_1.MztT.decode(f.Fltr.MztT),
                    randomSeed: f.Fltr.FlRs,
                } });
        case 1299407648:
            return __assign(__assign({}, base), { type: "mosaic", filter: {
                    cellSize: (0, descriptor_1.parseUnits)(f.Fltr.ClSz),
                } });
        case 1349416044:
            return __assign(__assign({}, base), { type: "pointillize", filter: {
                    cellSize: f.Fltr.ClSz,
                    randomSeed: f.Fltr.FlRs,
                } });
        case 1131177075:
            return __assign(__assign({}, base), { type: "clouds", filter: {
                    randomSeed: f.Fltr.FlRs,
                } });
        case 1147564611:
            return __assign(__assign({}, base), { type: "difference clouds", filter: {
                    randomSeed: f.Fltr.FlRs,
                } });
        case 1180856947:
            return __assign(__assign({}, base), { type: "fibers", filter: {
                    variance: f.Fltr.Vrnc,
                    strength: f.Fltr.Strg,
                    randomSeed: f.Fltr.RndS,
                } });
        case 1282306886:
            return __assign(__assign({}, base), { type: "lens flare", filter: {
                    brightness: f.Fltr.Brgh,
                    position: { x: f.Fltr.FlrC.Hrzn, y: f.Fltr.FlrC.Vrtc },
                    lensType: descriptor_1.Lns.decode(f.Fltr["Lns "]),
                } });
        case 1399353968:
            return __assign(__assign({}, base), { type: "sharpen" });
        case 1399353925:
            return __assign(__assign({}, base), { type: "sharpen edges" });
        case 1399353933:
            return __assign(__assign({}, base), { type: "sharpen more" });
        case 698:
            return __assign(__assign({}, base), { type: "smart sharpen", filter: {
                    amount: (0, descriptor_1.parsePercent)(f.Fltr.Amnt),
                    radius: (0, descriptor_1.parseUnits)(f.Fltr["Rds "]),
                    threshold: f.Fltr.Thsh,
                    angle: f.Fltr.Angl,
                    moreAccurate: f.Fltr.moreAccurate,
                    blur: descriptor_1.blurType.decode(f.Fltr.blur),
                    preset: f.Fltr.preset,
                    shadow: {
                        fadeAmount: (0, descriptor_1.parsePercent)(f.Fltr.sdwM.Amnt),
                        tonalWidth: (0, descriptor_1.parsePercent)(f.Fltr.sdwM.Wdth),
                        radius: f.Fltr.sdwM["Rds "],
                    },
                    highlight: {
                        fadeAmount: (0, descriptor_1.parsePercent)(f.Fltr.hglM.Amnt),
                        tonalWidth: (0, descriptor_1.parsePercent)(f.Fltr.hglM.Wdth),
                        radius: f.Fltr.hglM["Rds "],
                    },
                } });
        case 1433301837:
            return __assign(__assign({}, base), { type: "unsharp mask", filter: {
                    amount: (0, descriptor_1.parsePercent)(f.Fltr.Amnt),
                    radius: (0, descriptor_1.parseUnits)(f.Fltr["Rds "]),
                    threshold: f.Fltr.Thsh,
                } });
        case 1147564832:
            return __assign(__assign({}, base), { type: "diffuse", filter: {
                    mode: descriptor_1.DfsM.decode(f.Fltr["Md  "]),
                    randomSeed: f.Fltr.FlRs,
                } });
        case 1164796531:
            return __assign(__assign({}, base), { type: "emboss", filter: {
                    angle: f.Fltr.Angl,
                    height: f.Fltr.Hght,
                    amount: f.Fltr.Amnt,
                } });
        case 1165522034:
            return __assign(__assign({}, base), { type: "extrude", filter: {
                    type: descriptor_1.ExtT.decode(f.Fltr.ExtT),
                    size: f.Fltr.ExtS,
                    depth: f.Fltr.ExtD,
                    depthMode: descriptor_1.ExtR.decode(f.Fltr.ExtR),
                    randomSeed: f.Fltr.FlRs,
                    solidFrontFaces: f.Fltr.ExtF,
                    maskIncompleteBlocks: f.Fltr.ExtM,
                } });
        case 1181639749:
            return __assign(__assign({}, base), { type: "find edges" });
        case 1399616122:
            return __assign(__assign({}, base), { type: "solarize" });
        case 1416393504:
            return __assign(__assign({}, base), { type: "tiles", filter: {
                    numberOfTiles: f.Fltr.TlNm,
                    maximumOffset: f.Fltr.TlOf,
                    fillEmptyAreaWith: descriptor_1.FlCl.decode(f.Fltr.FlCl),
                    randomSeed: f.Fltr.FlRs,
                } });
        case 1416782659:
            return __assign(__assign({}, base), { type: "trace contour", filter: {
                    level: f.Fltr["Lvl "],
                    edge: descriptor_1.CntE.decode(f.Fltr["Edg "]),
                } });
        case 1466852384:
            return __assign(__assign({}, base), { type: "wind", filter: {
                    method: descriptor_1.WndM.decode(f.Fltr.WndM),
                    direction: descriptor_1.Drct.decode(f.Fltr.Drct),
                } });
        case 1148089458:
            return __assign(__assign({}, base), { type: "de-interlace", filter: {
                    eliminate: descriptor_1.IntE.decode(f.Fltr.IntE),
                    newFieldsBy: descriptor_1.IntC.decode(f.Fltr.IntC),
                } });
        case 1314149187:
            return __assign(__assign({}, base), { type: "ntsc colors" });
        case 1131639917:
            return __assign(__assign({}, base), { type: "custom", filter: {
                    scale: f.Fltr["Scl "],
                    offset: f.Fltr.Ofst,
                    matrix: f.Fltr.Mtrx,
                } });
        case 1214736464:
            return __assign(__assign({}, base), { type: "high pass", filter: {
                    radius: (0, descriptor_1.parseUnits)(f.Fltr["Rds "]),
                } });
        case 1299737888:
            return __assign(__assign({}, base), { type: "maximum", filter: {
                    radius: (0, descriptor_1.parseUnits)(f.Fltr["Rds "]),
                } });
        case 1299082528:
            return __assign(__assign({}, base), { type: "minimum", filter: {
                    radius: (0, descriptor_1.parseUnits)(f.Fltr["Rds "]),
                } });
        case 1332114292:
            return __assign(__assign({}, base), { type: "offset", filter: {
                    horizontal: f.Fltr.Hrzn,
                    vertical: f.Fltr.Vrtc,
                    undefinedAreas: descriptor_1.FlMd.decode(f.Fltr["Fl  "]),
                } });
        case 991:
            return __assign(__assign({}, base), { type: "puppet", filter: {
                    rigidType: f.Fltr.rigidType,
                    bounds: [
                        { x: f.Fltr.PuX0, y: f.Fltr.PuY0 },
                        { x: f.Fltr.PuX1, y: f.Fltr.PuY1 },
                        { x: f.Fltr.PuX2, y: f.Fltr.PuY2 },
                        { x: f.Fltr.PuX3, y: f.Fltr.PuY3 },
                    ],
                    puppetShapeList: f.Fltr.puppetShapeList.map(function (p) { return ({
                        rigidType: p.rigidType,
                        // TODO: VrsM
                        // TODO: VrsN
                        originalVertexArray: uint8ToPoints(p.originalVertexArray),
                        deformedVertexArray: uint8ToPoints(p.deformedVertexArray),
                        indexArray: Array.from(uint8ToUint32(p.indexArray)),
                        pinOffsets: arrayToPoints(p.pinOffsets),
                        posFinalPins: arrayToPoints(p.posFinalPins),
                        pinVertexIndices: p.pinVertexIndices,
                        selectedPin: p.selectedPin,
                        pinPosition: arrayToPoints(p.PinP),
                        pinRotation: p.PnRt,
                        pinOverlay: p.PnOv,
                        pinDepth: p.PnDp,
                        meshQuality: p.meshQuality,
                        meshExpansion: p.meshExpansion,
                        meshRigidity: p.meshRigidity,
                        imageResolution: p.imageResolution,
                        meshBoundaryPath: {
                            pathComponents: p.meshBoundaryPath.pathComponents.map(function (c) { return ({
                                shapeOperation: c.shapeOperation.split(".")[1],
                                paths: c.SbpL.map(function (t) { return ({
                                    closed: t.Clsp,
                                    points: t["Pts "].map(function (pt) { return ({
                                        anchor: hrznVrtcToPoint(pt.Anch),
                                        forward: hrznVrtcToPoint(pt["Fwd "]),
                                        backward: hrznVrtcToPoint(pt["Bwd "]),
                                        smooth: pt.Smoo,
                                    }); }),
                                }); }),
                            }); }),
                        },
                    }); }),
                } });
        case 1348620396: {
            var parameters = [];
            var Flrt = f.Fltr;
            for (var i = 0; i < fromAtoZ.length; i++) {
                if (!Flrt["PN".concat(fromAtoZ[i], "a")])
                    break;
                for (var j = 0; j < fromAtoZ.length; j++) {
                    if (!Flrt["PN".concat(fromAtoZ[i]).concat(fromAtoZ[j])])
                        break;
                    parameters.push({
                        name: Flrt["PN".concat(fromAtoZ[i]).concat(fromAtoZ[j])],
                        value: Flrt["PF".concat(fromAtoZ[i]).concat(fromAtoZ[j])],
                    });
                }
            }
            return __assign(__assign({}, base), { type: "oil paint plugin", filter: {
                    name: f.Fltr.KnNm,
                    gpu: f.Fltr.GpuY,
                    lighting: f.Fltr.LIWy,
                    parameters: parameters,
                } });
        }
        // case 2089: return {
        // 	...base,
        // 	type: 'adaptive wide angle',
        // 	params: {
        // 		correction: prjM.decode(f.Fltr.prjM),
        // 		focalLength: f.Fltr.focL,
        // 		cropFactor: f.Fltr.CrpF,
        // 		imageScale: f.Fltr.imgS,
        // 		imageX: f.Fltr.imgX,
        // 		imageY: f.Fltr.imgY,
        // 	},
        // };
        case 1215521360:
            return __assign(__assign({}, base), { type: "hsb/hsl", filter: {
                    inputMode: descriptor_1.ClrS.decode(f.Fltr.Inpt),
                    rowOrder: descriptor_1.ClrS.decode(f.Fltr.Otpt),
                } });
        case 1122:
            return __assign(__assign({}, base), { type: "oil paint", filter: {
                    lightingOn: f.Fltr.lightingOn,
                    stylization: f.Fltr.stylization,
                    cleanliness: f.Fltr.cleanliness,
                    brushScale: f.Fltr.brushScale,
                    microBrush: f.Fltr.microBrush,
                    lightDirection: f.Fltr.LghD,
                    specularity: f.Fltr.specularity,
                } });
        case 1282492025: {
            return __assign(__assign({}, base), { type: "liquify", filter: {
                    liquifyMesh: f.Fltr.LqMe,
                } });
        }
        default:
            throw new Error("Unknown filterID: ".concat(f.filterID));
    }
}
function parseFilterFX(desc) {
    return {
        enabled: desc.enab,
        validAtPosition: desc.validAtPosition,
        maskEnabled: desc.filterMaskEnable,
        maskLinked: desc.filterMaskLinked,
        maskExtendWithWhite: desc.filterMaskExtendWithWhite,
        list: desc.filterFXList.map(parseFilterFXItem),
    };
}
function uvRadius(t) {
    return (0, descriptor_1.unitsValue)(t.radius, "radius");
}
function serializeFilterFXItem(f) {
    var base = {
        _name: "",
        _classID: "filterFX",
        "Nm  ": f.name,
        blendOptions: {
            _name: "",
            _classID: "blendOptions",
            Opct: (0, descriptor_1.unitsPercentF)(f.opacity),
            "Md  ": descriptor_1.BlnM.encode(f.blendMode),
        },
        enab: f.enabled,
        hasoptions: f.hasOptions,
        FrgC: (0, descriptor_1.serializeColor)(f.foregroundColor),
        BckC: (0, descriptor_1.serializeColor)(f.backgroundColor),
    };
    switch (f.type) {
        case "average":
            return __assign(__assign({}, base), { filterID: 1098281575 });
        case "blur":
            return __assign(__assign({}, base), { filterID: 1114403360 });
        case "blur more":
            return __assign(__assign({}, base), { filterID: 1114403405 });
        case "box blur":
            return __assign(__assign({}, base), { Fltr: {
                    _name: "Box Blur",
                    _classID: "boxblur",
                    "Rds ": uvRadius(f.filter),
                }, filterID: 697 });
        case "gaussian blur":
            return __assign(__assign({}, base), { Fltr: {
                    _name: "Gaussian Blur",
                    _classID: "GsnB",
                    "Rds ": uvRadius(f.filter),
                }, filterID: 1198747202 });
        case "motion blur":
            return __assign(__assign({}, base), { Fltr: {
                    _name: "Motion Blur",
                    _classID: "MtnB",
                    Angl: f.filter.angle,
                    Dstn: (0, descriptor_1.unitsValue)(f.filter.distance, "distance"),
                }, filterID: 1299476034 });
        case "radial blur":
            return __assign(__assign({}, base), { Fltr: {
                    _name: "Radial Blur",
                    _classID: "RdlB",
                    Amnt: f.filter.amount,
                    BlrM: descriptor_1.BlrM.encode(f.filter.method),
                    BlrQ: descriptor_1.BlrQ.encode(f.filter.quality),
                }, filterID: 1382313026 });
        case "shape blur":
            return __assign(__assign({}, base), { Fltr: {
                    _name: "Shape Blur",
                    _classID: "shapeBlur",
                    "Rds ": uvRadius(f.filter),
                    customShape: {
                        _name: "",
                        _classID: "customShape",
                        "Nm  ": f.filter.customShape.name,
                        Idnt: f.filter.customShape.id,
                    },
                }, filterID: 702 });
        case "smart blur":
            return __assign(__assign({}, base), { Fltr: {
                    _name: "Smart Blur",
                    _classID: "SmrB",
                    "Rds ": f.filter.radius,
                    Thsh: f.filter.threshold,
                    SmBQ: descriptor_1.SmBQ.encode(f.filter.quality),
                    SmBM: descriptor_1.SmBM.encode(f.filter.mode),
                }, filterID: 1399681602 });
        case "surface blur":
            return __assign(__assign({}, base), { Fltr: {
                    _name: "Surface Blur",
                    _classID: "surfaceBlur",
                    "Rds ": uvRadius(f.filter),
                    Thsh: f.filter.threshold,
                }, filterID: 701 });
        case "displace":
            return __assign(__assign({}, base), { Fltr: {
                    _name: "Displace",
                    _classID: "Dspl",
                    HrzS: f.filter.horizontalScale,
                    VrtS: f.filter.verticalScale,
                    DspM: descriptor_1.DspM.encode(f.filter.displacementMap),
                    UndA: descriptor_1.UndA.encode(f.filter.undefinedAreas),
                    DspF: {
                        sig: f.filter.displacementFile.signature,
                        path: f.filter.displacementFile.path,
                    },
                }, filterID: 1148416108 });
        case "pinch":
            return __assign(__assign({}, base), { Fltr: {
                    _name: "Pinch",
                    _classID: "Pnch",
                    Amnt: f.filter.amount,
                }, filterID: 1349411688 });
        case "polar coordinates":
            return __assign(__assign({}, base), { Fltr: {
                    _name: "Polar Coordinates",
                    _classID: "Plr ",
                    Cnvr: descriptor_1.Cnvr.encode(f.filter.conversion),
                }, filterID: 1349284384 });
        case "ripple":
            return __assign(__assign({}, base), { Fltr: {
                    _name: "Ripple",
                    _classID: "Rple",
                    Amnt: f.filter.amount,
                    RplS: descriptor_1.RplS.encode(f.filter.size),
                }, filterID: 1383099493 });
        case "shear":
            return __assign(__assign({}, base), { Fltr: {
                    _name: "Shear",
                    _classID: "Shr ",
                    ShrP: f.filter.shearPoints.map(function (p) { return ({
                        _name: "",
                        _classID: "Pnt ",
                        Hrzn: p.x,
                        Vrtc: p.y,
                    }); }),
                    UndA: descriptor_1.UndA.encode(f.filter.undefinedAreas),
                    ShrS: f.filter.shearStart,
                    ShrE: f.filter.shearEnd,
                }, filterID: 1399353888 });
        case "spherize":
            return __assign(__assign({}, base), { Fltr: {
                    _name: "Spherize",
                    _classID: "Sphr",
                    Amnt: f.filter.amount,
                    SphM: descriptor_1.SphM.encode(f.filter.mode),
                }, filterID: 1399875698 });
        case "twirl":
            return __assign(__assign({}, base), { Fltr: {
                    _name: "Twirl",
                    _classID: "Twrl",
                    Angl: f.filter.angle,
                }, filterID: 1417114220 });
        case "wave":
            return __assign(__assign({}, base), { Fltr: {
                    _name: "Wave",
                    _classID: "Wave",
                    Wvtp: descriptor_1.Wvtp.encode(f.filter.type),
                    NmbG: f.filter.numberOfGenerators,
                    WLMn: f.filter.wavelength.min,
                    WLMx: f.filter.wavelength.max,
                    AmMn: f.filter.amplitude.min,
                    AmMx: f.filter.amplitude.max,
                    SclH: f.filter.scale.x,
                    SclV: f.filter.scale.y,
                    UndA: descriptor_1.UndA.encode(f.filter.undefinedAreas),
                    RndS: f.filter.randomSeed,
                }, filterID: 1466005093 });
        case "zigzag":
            return __assign(__assign({}, base), { Fltr: {
                    _name: "ZigZag",
                    _classID: "ZgZg",
                    Amnt: f.filter.amount,
                    NmbR: f.filter.ridges,
                    ZZTy: descriptor_1.ZZTy.encode(f.filter.style),
                }, filterID: 1516722791 });
        case "add noise":
            return __assign(__assign({}, base), { Fltr: {
                    _name: "Add Noise",
                    _classID: "AdNs",
                    Dstr: descriptor_1.Dstr.encode(f.filter.distribution),
                    Nose: (0, descriptor_1.unitsPercentF)(f.filter.amount),
                    Mnch: f.filter.monochromatic,
                    FlRs: f.filter.randomSeed,
                }, filterID: 1097092723 });
        case "despeckle":
            return __assign(__assign({}, base), { filterID: 1148416099 });
        case "dust and scratches":
            return __assign(__assign({}, base), { Fltr: {
                    _name: "Dust & Scratches",
                    _classID: "DstS",
                    "Rds ": f.filter.radius,
                    Thsh: f.filter.threshold,
                }, filterID: 1148417107 });
        case "median":
            return __assign(__assign({}, base), { Fltr: {
                    _name: "Median",
                    _classID: "Mdn ",
                    "Rds ": uvRadius(f.filter),
                }, filterID: 1298427424 });
        case "reduce noise":
            return __assign(__assign({}, base), { Fltr: {
                    _name: "Reduce Noise",
                    _classID: "denoise",
                    ClNs: (0, descriptor_1.unitsPercentF)(f.filter.reduceColorNoise),
                    Shrp: (0, descriptor_1.unitsPercentF)(f.filter.sharpenDetails),
                    removeJPEGArtifact: f.filter.removeJpegArtifact,
                    channelDenoise: f.filter.channelDenoise.map(function (c) { return (__assign({ _name: "", _classID: "channelDenoiseParams", Chnl: c.channels.map(function (i) { return descriptor_1.Chnl.encode(i); }), Amnt: c.amount }, (c.preserveDetails ? { EdgF: c.preserveDetails } : {}))); }),
                    preset: f.filter.preset,
                }, filterID: 633 });
        case "color halftone":
            return __assign(__assign({}, base), { Fltr: {
                    _name: "Color Halftone",
                    _classID: "ClrH",
                    "Rds ": f.filter.radius,
                    Ang1: f.filter.angle1,
                    Ang2: f.filter.angle2,
                    Ang3: f.filter.angle3,
                    Ang4: f.filter.angle4,
                }, filterID: 1131180616 });
        case "crystallize":
            return __assign(__assign({}, base), { Fltr: {
                    _name: "Crystallize",
                    _classID: "Crst",
                    ClSz: f.filter.cellSize,
                    FlRs: f.filter.randomSeed,
                }, filterID: 1131574132 });
        case "facet":
            return __assign(__assign({}, base), { filterID: 1180922912 });
        case "fragment":
            return __assign(__assign({}, base), { filterID: 1181902701 });
        case "mezzotint":
            return __assign(__assign({}, base), { Fltr: {
                    _name: "Mezzotint",
                    _classID: "Mztn",
                    MztT: descriptor_1.MztT.encode(f.filter.type),
                    FlRs: f.filter.randomSeed,
                }, filterID: 1299870830 });
        case "mosaic":
            return __assign(__assign({}, base), { Fltr: {
                    _name: "Mosaic",
                    _classID: "Msc ",
                    ClSz: (0, descriptor_1.unitsValue)(f.filter.cellSize, "cellSize"),
                }, filterID: 1299407648 });
        case "pointillize":
            return __assign(__assign({}, base), { Fltr: {
                    _name: "Pointillize",
                    _classID: "Pntl",
                    ClSz: f.filter.cellSize,
                    FlRs: f.filter.randomSeed,
                }, filterID: 1349416044 });
        case "clouds":
            return __assign(__assign({}, base), { Fltr: {
                    _name: "Clouds",
                    _classID: "Clds",
                    FlRs: f.filter.randomSeed,
                }, filterID: 1131177075 });
        case "difference clouds":
            return __assign(__assign({}, base), { Fltr: {
                    _name: "Difference Clouds",
                    _classID: "DfrC",
                    FlRs: f.filter.randomSeed,
                }, filterID: 1147564611 });
        case "fibers":
            return __assign(__assign({}, base), { Fltr: {
                    _name: "Fibers",
                    _classID: "Fbrs",
                    Vrnc: f.filter.variance,
                    Strg: f.filter.strength,
                    RndS: f.filter.randomSeed,
                }, filterID: 1180856947 });
        case "lens flare":
            return __assign(__assign({}, base), { Fltr: {
                    _name: "Lens Flare",
                    _classID: "LnsF",
                    Brgh: f.filter.brightness,
                    FlrC: {
                        _name: "",
                        _classID: "Pnt ",
                        Hrzn: f.filter.position.x,
                        Vrtc: f.filter.position.y,
                    },
                    "Lns ": descriptor_1.Lns.encode(f.filter.lensType),
                }, filterID: 1282306886 });
        case "sharpen":
            return __assign(__assign({}, base), { filterID: 1399353968 });
        case "sharpen edges":
            return __assign(__assign({}, base), { filterID: 1399353925 });
        case "sharpen more":
            return __assign(__assign({}, base), { filterID: 1399353933 });
        case "smart sharpen":
            return __assign(__assign({}, base), { Fltr: {
                    _name: "Smart Sharpen",
                    _classID: "smartSharpen",
                    Amnt: (0, descriptor_1.unitsPercentF)(f.filter.amount),
                    "Rds ": uvRadius(f.filter),
                    Thsh: f.filter.threshold,
                    Angl: f.filter.angle,
                    moreAccurate: f.filter.moreAccurate,
                    blur: descriptor_1.blurType.encode(f.filter.blur),
                    preset: f.filter.preset,
                    sdwM: {
                        _name: "Parameters",
                        _classID: "adaptCorrectTones",
                        Amnt: (0, descriptor_1.unitsPercentF)(f.filter.shadow.fadeAmount),
                        Wdth: (0, descriptor_1.unitsPercentF)(f.filter.shadow.tonalWidth),
                        "Rds ": f.filter.shadow.radius,
                    },
                    hglM: {
                        _name: "Parameters",
                        _classID: "adaptCorrectTones",
                        Amnt: (0, descriptor_1.unitsPercentF)(f.filter.highlight.fadeAmount),
                        Wdth: (0, descriptor_1.unitsPercentF)(f.filter.highlight.tonalWidth),
                        "Rds ": f.filter.highlight.radius,
                    },
                }, filterID: 698 });
        case "unsharp mask":
            return __assign(__assign({}, base), { Fltr: {
                    _name: "Unsharp Mask",
                    _classID: "UnsM",
                    Amnt: (0, descriptor_1.unitsPercentF)(f.filter.amount),
                    "Rds ": uvRadius(f.filter),
                    Thsh: f.filter.threshold,
                }, filterID: 1433301837 });
        case "diffuse":
            return __assign(__assign({}, base), { Fltr: {
                    _name: "Diffuse",
                    _classID: "Dfs ",
                    "Md  ": descriptor_1.DfsM.encode(f.filter.mode),
                    FlRs: f.filter.randomSeed,
                }, filterID: 1147564832 });
        case "emboss":
            return __assign(__assign({}, base), { Fltr: {
                    _name: "Emboss",
                    _classID: "Embs",
                    Angl: f.filter.angle,
                    Hght: f.filter.height,
                    Amnt: f.filter.amount,
                }, filterID: 1164796531 });
        case "extrude":
            return __assign(__assign({}, base), { Fltr: {
                    _name: "Extrude",
                    _classID: "Extr",
                    ExtS: f.filter.size,
                    ExtD: f.filter.depth,
                    ExtF: f.filter.solidFrontFaces,
                    ExtM: f.filter.maskIncompleteBlocks,
                    ExtT: descriptor_1.ExtT.encode(f.filter.type),
                    ExtR: descriptor_1.ExtR.encode(f.filter.depthMode),
                    FlRs: f.filter.randomSeed,
                }, filterID: 1165522034 });
        case "find edges":
            return __assign(__assign({}, base), { filterID: 1181639749 });
        case "solarize":
            return __assign(__assign({}, base), { filterID: 1399616122 });
        case "tiles":
            return __assign(__assign({}, base), { Fltr: {
                    _name: "Tiles",
                    _classID: "Tls ",
                    TlNm: f.filter.numberOfTiles,
                    TlOf: f.filter.maximumOffset,
                    FlCl: descriptor_1.FlCl.encode(f.filter.fillEmptyAreaWith),
                    FlRs: f.filter.randomSeed,
                }, filterID: 1416393504 });
        case "trace contour":
            return __assign(__assign({}, base), { Fltr: {
                    _name: "Trace Contour",
                    _classID: "TrcC",
                    "Lvl ": f.filter.level,
                    "Edg ": descriptor_1.CntE.encode(f.filter.edge),
                }, filterID: 1416782659 });
        case "wind":
            return __assign(__assign({}, base), { Fltr: {
                    _name: "Wind",
                    _classID: "Wnd ",
                    WndM: descriptor_1.WndM.encode(f.filter.method),
                    Drct: descriptor_1.Drct.encode(f.filter.direction),
                }, filterID: 1466852384 });
        case "de-interlace":
            return __assign(__assign({}, base), { Fltr: {
                    _name: "De-Interlace",
                    _classID: "Dntr",
                    IntE: descriptor_1.IntE.encode(f.filter.eliminate),
                    IntC: descriptor_1.IntC.encode(f.filter.newFieldsBy),
                }, filterID: 1148089458 });
        case "ntsc colors":
            return __assign(__assign({}, base), { filterID: 1314149187 });
        case "custom":
            return __assign(__assign({}, base), { Fltr: {
                    _name: "Custom",
                    _classID: "Cstm",
                    "Scl ": f.filter.scale,
                    Ofst: f.filter.offset,
                    Mtrx: f.filter.matrix,
                }, filterID: 1131639917 });
        case "high pass":
            return __assign(__assign({}, base), { Fltr: {
                    _name: "High Pass",
                    _classID: "HghP",
                    "Rds ": uvRadius(f.filter),
                }, filterID: 1214736464 });
        case "maximum":
            return __assign(__assign({}, base), { Fltr: {
                    _name: "Maximum",
                    _classID: "Mxm ",
                    "Rds ": uvRadius(f.filter),
                }, filterID: 1299737888 });
        case "minimum":
            return __assign(__assign({}, base), { Fltr: {
                    _name: "Minimum",
                    _classID: "Mnm ",
                    "Rds ": uvRadius(f.filter),
                }, filterID: 1299082528 });
        case "offset":
            return __assign(__assign({}, base), { Fltr: {
                    _name: "Offset",
                    _classID: "Ofst",
                    Hrzn: f.filter.horizontal,
                    Vrtc: f.filter.vertical,
                    "Fl  ": descriptor_1.FlMd.encode(f.filter.undefinedAreas),
                }, filterID: 1332114292 });
        case "puppet":
            return __assign(__assign({}, base), { Fltr: {
                    _name: "Rigid Transform",
                    _classID: "rigidTransform",
                    null: ["Ordn.Trgt"],
                    rigidType: f.filter.rigidType,
                    puppetShapeList: f.filter.puppetShapeList.map(function (p) { return ({
                        _name: "",
                        _classID: "puppetShape",
                        rigidType: p.rigidType,
                        VrsM: 1,
                        VrsN: 0,
                        originalVertexArray: toUint8(new Float32Array(pointsToArray(p.originalVertexArray))),
                        deformedVertexArray: toUint8(new Float32Array(pointsToArray(p.deformedVertexArray))),
                        indexArray: toUint8(new Uint32Array(p.indexArray)),
                        pinOffsets: pointsToArray(p.pinOffsets),
                        posFinalPins: pointsToArray(p.posFinalPins),
                        pinVertexIndices: p.pinVertexIndices,
                        PinP: pointsToArray(p.pinPosition),
                        PnRt: p.pinRotation,
                        PnOv: p.pinOverlay,
                        PnDp: p.pinDepth,
                        meshQuality: p.meshQuality,
                        meshExpansion: p.meshExpansion,
                        meshRigidity: p.meshRigidity,
                        imageResolution: p.imageResolution,
                        meshBoundaryPath: {
                            _name: "",
                            _classID: "pathClass",
                            pathComponents: p.meshBoundaryPath.pathComponents.map(function (c) { return ({
                                _name: "",
                                _classID: "PaCm",
                                shapeOperation: "shapeOperation.".concat(c.shapeOperation),
                                SbpL: c.paths.map(function (path) { return ({
                                    _name: "",
                                    _classID: "Sbpl",
                                    Clsp: path.closed,
                                    "Pts ": path.points.map(function (pt) { return ({
                                        _name: "",
                                        _classID: "Pthp",
                                        Anch: pointToHrznVrtc(pt.anchor),
                                        "Fwd ": pointToHrznVrtc(pt.forward),
                                        "Bwd ": pointToHrznVrtc(pt.backward),
                                        Smoo: pt.smooth,
                                    }); }),
                                }); }),
                            }); }),
                        },
                        selectedPin: p.selectedPin,
                    }); }),
                    PuX0: f.filter.bounds[0].x,
                    PuX1: f.filter.bounds[1].x,
                    PuX2: f.filter.bounds[2].x,
                    PuX3: f.filter.bounds[3].x,
                    PuY0: f.filter.bounds[0].y,
                    PuY1: f.filter.bounds[1].y,
                    PuY2: f.filter.bounds[2].y,
                    PuY3: f.filter.bounds[3].y,
                }, filterID: 991 });
        case "oil paint plugin": {
            var params = {};
            for (var i = 0; i < f.filter.parameters.length; i++) {
                var _a = f.filter.parameters[i], name_1 = _a.name, value = _a.value;
                var suffix = "".concat(fromAtoZ[Math.floor(i / fromAtoZ.length)]).concat(fromAtoZ[i % fromAtoZ.length]);
                params["PN".concat(suffix)] = name_1;
                params["PT".concat(suffix)] = 0;
                params["PF".concat(suffix)] = value;
            }
            return __assign(__assign({}, base), { Fltr: __assign({ _name: "Oil Paint Plugin", _classID: "PbPl", KnNm: f.filter.name, GpuY: f.filter.gpu, LIWy: f.filter.lighting, FPth: "1" }, params), filterID: 1348620396 });
        }
        case "oil paint":
            return __assign(__assign({}, base), { Fltr: {
                    _name: "Oil Paint",
                    _classID: "oilPaint",
                    lightingOn: f.filter.lightingOn,
                    stylization: f.filter.stylization,
                    cleanliness: f.filter.cleanliness,
                    brushScale: f.filter.brushScale,
                    microBrush: f.filter.microBrush,
                    LghD: f.filter.lightDirection,
                    specularity: f.filter.specularity,
                }, filterID: 1122 });
        case "liquify":
            return __assign(__assign({}, base), { Fltr: {
                    _name: "Liquify",
                    _classID: "LqFy",
                    LqMe: f.filter.liquifyMesh,
                }, filterID: 1282492025 });
        default:
            throw new Error("Unknow filter type: ".concat(f.type));
    }
}
// let t: any;
function getWarpFromPlacedLayer(placed) {
    if (placed.warp)
        return placed.warp;
    if (!placed.width || !placed.height)
        throw new Error("You must provide width and height of the linked image in placedLayer");
    var w = placed.width;
    var h = placed.height;
    var x0 = 0, x1 = w / 3, x2 = (w * 2) / 3, x3 = w;
    var y0 = 0, y1 = h / 3, y2 = (h * 2) / 3, y3 = h;
    return {
        style: "custom",
        value: 0,
        perspective: 0,
        perspectiveOther: 0,
        rotate: "horizontal",
        bounds: {
            top: { value: 0, units: "Pixels" },
            left: { value: 0, units: "Pixels" },
            bottom: { value: h, units: "Pixels" },
            right: { value: w, units: "Pixels" },
        },
        uOrder: 4,
        vOrder: 4,
        customEnvelopeWarp: {
            meshPoints: [
                { x: x0, y: y0 },
                { x: x1, y: y0 },
                { x: x2, y: y0 },
                { x: x3, y: y0 },
                { x: x0, y: y1 },
                { x: x1, y: y1 },
                { x: x2, y: y1 },
                { x: x3, y: y1 },
                { x: x0, y: y2 },
                { x: x1, y: y2 },
                { x: x2, y: y2 },
                { x: x3, y: y2 },
                { x: x0, y: y3 },
                { x: x1, y: y3 },
                { x: x2, y: y3 },
                { x: x3, y: y3 },
            ],
        },
    };
}
addHandler("SoLd", hasKey("placedLayer"), function (reader, target, left) { return __awaiter(void 0, void 0, void 0, function () {
    var version, desc, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if ((0, psdReader_1.readSignature)(reader) !== "soLD")
                    throw new Error("Invalid SoLd type");
                version = (0, psdReader_1.readInt32)(reader);
                if (version !== 4 && version !== 5)
                    throw new Error("Invalid SoLd version");
                desc = (0, descriptor_1.readVersionAndDescriptor)(reader);
                // console.log('SoLd', require('util').inspect(desc, false, 99, true));
                // console.log('SoLd.warp', require('util').inspect(desc.warp, false, 99, true));
                // console.log('SoLd.quiltWarp', require('util').inspect(desc.quiltWarp, false, 99, true));
                // desc.filterFX!.filterFXList[0].Fltr.puppetShapeList[0].meshBoundaryPath.pathComponents[0].SbpL[0]['Pts '] = [];
                // console.log('read', require('util').inspect(desc.filterFX, false, 99, true));
                // console.log('filterFXList[0]', require('util').inspect((desc as any).filterFX.filterFXList[0], false, 99, true));
                // t = desc;
                target.placedLayer = {
                    id: desc.Idnt,
                    placed: desc.placed,
                    type: placedLayerTypes[desc.Type],
                    pageNumber: desc.PgNm,
                    totalPages: desc.totalPages,
                    frameStep: (0, descriptor_1.frac)(desc.frameStep),
                    duration: (0, descriptor_1.frac)(desc.duration),
                    frameCount: desc.frameCount,
                    transform: desc.Trnf,
                    width: desc["Sz  "].Wdth,
                    height: desc["Sz  "].Hght,
                    resolution: (0, descriptor_1.parseUnits)(desc.Rslt),
                    warp: parseWarp((desc.quiltWarp || desc.warp)),
                };
                if (desc.nonAffineTransform &&
                    desc.nonAffineTransform.some(function (x, i) { return x !== desc.Trnf[i]; })) {
                    target.placedLayer.nonAffineTransform = desc.nonAffineTransform;
                }
                if (desc.Crop)
                    target.placedLayer.crop = desc.Crop;
                if (desc.comp)
                    target.placedLayer.comp = desc.comp;
                if (desc.compInfo) {
                    target.placedLayer.compInfo = {
                        compID: desc.compInfo.compID,
                        originalCompID: desc.compInfo.originalCompID,
                    };
                }
                if (desc.filterFX)
                    target.placedLayer.filter = parseFilterFX(desc.filterFX);
                // console.log('filter', require('util').inspect(target.placedLayer.filter, false, 99, true));
                _a = psdReader_1.skipBytes;
                _b = [reader];
                return [4 /*yield*/, left()];
            case 1:
                // console.log('filter', require('util').inspect(target.placedLayer.filter, false, 99, true));
                _a.apply(void 0, _b.concat([_c.sent()])); // HACK
                return [2 /*return*/];
        }
    });
}); }, function (writer, target) {
    var _a, _b;
    (0, psdWriter_1.writeSignature)(writer, "soLD");
    (0, psdWriter_1.writeInt32)(writer, 4); // version
    var placed = target.placedLayer;
    if (!placed.id ||
        typeof placed.id !== "string" ||
        !/^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/.test(placed.id)) {
        throw new Error("Placed layer ID must be in a GUID format (example: 20953ddb-9391-11ec-b4f1-c15674f50bc4)");
    }
    var desc = __assign(__assign({ Idnt: placed.id, placed: (_a = placed.placed) !== null && _a !== void 0 ? _a : placed.id, PgNm: placed.pageNumber || 1, totalPages: placed.totalPages || 1 }, (placed.crop ? { Crop: placed.crop } : {})), { frameStep: placed.frameStep || { numerator: 0, denominator: 600 }, duration: placed.duration || { numerator: 0, denominator: 600 }, frameCount: placed.frameCount || 0, Annt: 16, Type: placedLayerTypes.indexOf(placed.type), Trnf: placed.transform, nonAffineTransform: (_b = placed.nonAffineTransform) !== null && _b !== void 0 ? _b : placed.transform, 
        // quiltWarp: {} as any,
        warp: encodeWarp(getWarpFromPlacedLayer(placed)), "Sz  ": {
            _name: "",
            _classID: "Pnt ",
            Wdth: placed.width || 0,
            Hght: placed.height || 0, // TODO: find size ?
        }, Rslt: placed.resolution
            ? (0, descriptor_1.unitsValue)(placed.resolution, "resolution")
            : { units: "Density", value: 72 } });
    if (placed.filter) {
        desc.filterFX = {
            _name: "",
            _classID: "filterFXStyle",
            enab: placed.filter.enabled,
            validAtPosition: placed.filter.validAtPosition,
            filterMaskEnable: placed.filter.maskEnabled,
            filterMaskLinked: placed.filter.maskLinked,
            filterMaskExtendWithWhite: placed.filter.maskExtendWithWhite,
            filterFXList: placed.filter.list.map(function (f) { return serializeFilterFXItem(f); }),
        };
    }
    // console.log('write', require('util').inspect(desc.filterFX, false, 99, true)); ///
    // if (JSON.stringify(t) !== JSON.stringify(desc)) {
    // 	console.log('read', require('util').inspect(t, false, 99, true));
    // 	console.log('write', require('util').inspect(desc, false, 99, true));
    // 	console.error('DIFFERENT');
    // 	// throw new Error('DIFFERENT');
    // }
    if (placed.warp && isQuiltWarp(placed.warp)) {
        var quiltWarp = encodeWarp(placed.warp);
        desc.quiltWarp = quiltWarp;
        desc.warp = {
            warpStyle: "warpStyle.warpNone",
            warpValue: quiltWarp.warpValue,
            warpPerspective: quiltWarp.warpPerspective,
            warpPerspectiveOther: quiltWarp.warpPerspectiveOther,
            warpRotate: quiltWarp.warpRotate,
            bounds: quiltWarp.bounds,
            uOrder: quiltWarp.uOrder,
            vOrder: quiltWarp.vOrder,
        };
    }
    else {
        delete desc.quiltWarp;
    }
    if (placed.comp)
        desc.comp = placed.comp;
    if (placed.compInfo)
        desc.compInfo = placed.compInfo;
    (0, descriptor_1.writeVersionAndDescriptor)(writer, "", "null", desc, desc.quiltWarp ? "quiltWarp" : "warp");
});
addHandlerAlias("SoLE", "SoLd");
addHandler("fxrp", hasKey("referencePoint"), function (reader, target) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        target.referencePoint = {
            x: (0, psdReader_1.readFloat64)(reader),
            y: (0, psdReader_1.readFloat64)(reader),
        };
        return [2 /*return*/];
    });
}); }, function (writer, target) {
    (0, psdWriter_1.writeFloat64)(writer, target.referencePoint.x);
    (0, psdWriter_1.writeFloat64)(writer, target.referencePoint.y);
});
addHandler("Lr16", function () { return false; }, function (reader, _target, _left, psd, options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, psdReader_1.readLayerInfo)(reader, psd, options)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); }, function (_writer, _target) { });
addHandler("Lr32", function () { return false; }, function (reader, _target, _left, psd, options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, psdReader_1.readLayerInfo)(reader, psd, options)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); }, function (_writer, _target) { });
addHandler("LMsk", hasKey("userMask"), function (reader, target) { return __awaiter(void 0, void 0, void 0, function () {
    var flag;
    return __generator(this, function (_a) {
        target.userMask = {
            colorSpace: (0, psdReader_1.readColor)(reader),
            opacity: (0, psdReader_1.readUint16)(reader) / 0xff,
        };
        flag = (0, psdReader_1.readUint8)(reader);
        if (flag !== 128)
            throw new Error("Invalid flag value");
        (0, psdReader_1.skipBytes)(reader, 1);
        return [2 /*return*/];
    });
}); }, function (writer, target) {
    var userMask = target.userMask;
    (0, psdWriter_1.writeColor)(writer, userMask.colorSpace);
    (0, psdWriter_1.writeUint16)(writer, (0, helpers_1.clamp)(userMask.opacity, 0, 1) * 0xff);
    (0, psdWriter_1.writeUint8)(writer, 128);
    (0, psdWriter_1.writeZeros)(writer, 1);
});
if (helpers_1.MOCK_HANDLERS) {
    addHandler("vowv", // appears with Lr16 section ?
    function (_) { return false; }, function (reader, target, left) { return __awaiter(void 0, void 0, void 0, function () {
        var value, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    value = (0, psdReader_1.readUint32)(reader);
                    reader;
                    target;
                    _b = (_a = console).log;
                    _c = ["vowv", { value: value }];
                    return [4 /*yield*/, left()];
                case 1:
                    _b.apply(_a, _c.concat([_d.sent()]));
                    return [2 /*return*/];
            }
        });
    }); }, function (_writer, _target) {
        // TODO: write
    });
}
if (helpers_1.MOCK_HANDLERS) {
    addHandler("Patt", function (target) { return target._Patt !== undefined; }, function (reader, target, left) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    // console.log('additional info: Patt');
                    _a = target;
                    _b = psdReader_1.readBytes;
                    _c = [reader];
                    return [4 /*yield*/, left()];
                case 1:
                    // console.log('additional info: Patt');
                    _a._Patt = _b.apply(void 0, _c.concat([_d.sent()]));
                    return [2 /*return*/];
            }
        });
    }); }, function (writer, target) { return false && (0, psdWriter_1.writeBytes)(writer, target._Patt); });
}
else {
    addHandler("Patt", // TODO: handle also Pat2 & Pat3
    function (target) { return !target; }, function (reader, target, left) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, left()];
                case 1:
                    if (!(_c.sent()))
                        return [2 /*return*/];
                    _a = psdReader_1.skipBytes;
                    _b = [reader];
                    return [4 /*yield*/, left()];
                case 2:
                    _a.apply(void 0, _b.concat([_c.sent()]));
                    return [2 /*return*/]; // not supported yet
            }
        });
    }); }, function (_writer, _target) { });
}
/*
interface CAIDesc {
    enab: boolean;
    generationalGuid: string;
}

addHandler(
    'CAI ', // content credentials ? something to do with generative tech
    () => false,
    (reader, _target, left) => {
        const version = readUint32(reader); // 3
        const desc = readVersionAndDescriptor(reader) as CAIDesc;
        console.log('CAI', require('util').inspect(desc, false, 99, true));
        console.log('CAI', { version });
        console.log('CAI left', readBytes(reader, await left())); // 8 bytes left, all zeroes
    },
    (_writer, _target) => {
    },
);
*/
/*
interface GenIDesc {
    isUsingGenTech: number;
}

addHandler(
    'GenI', // generative tech
    () => false,
    (reader, _target, left) => {
        const desc = readVersionAndDescriptor(reader) as GenIDesc;
        console.log('GenI', require('util').inspect(desc, false, 99, true));
    },
    (_writer, _target) => {
    },
);
*/
function readRect(reader) {
    var top = (0, psdReader_1.readInt32)(reader);
    var left = (0, psdReader_1.readInt32)(reader);
    var bottom = (0, psdReader_1.readInt32)(reader);
    var right = (0, psdReader_1.readInt32)(reader);
    return { top: top, left: left, bottom: bottom, right: right };
}
function writeRect(writer, rect) {
    (0, psdWriter_1.writeInt32)(writer, rect.top);
    (0, psdWriter_1.writeInt32)(writer, rect.left);
    (0, psdWriter_1.writeInt32)(writer, rect.bottom);
    (0, psdWriter_1.writeInt32)(writer, rect.right);
}
addHandler("Anno", function (target) { return target.annotations !== undefined; }, function (reader, target, left) { return __awaiter(void 0, void 0, void 0, function () {
    var major, minor, count, annotations, i, type, open_1, iconLocation, popupLocation, color, author, name_2, date, dataLength, data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                major = (0, psdReader_1.readUint16)(reader);
                minor = (0, psdReader_1.readUint16)(reader);
                if (major !== 2 || minor !== 1)
                    throw new Error("Invalid Anno version");
                count = (0, psdReader_1.readUint32)(reader);
                annotations = [];
                for (i = 0; i < count; i++) {
                    /*const length =*/ (0, psdReader_1.readUint32)(reader);
                    type = (0, psdReader_1.readSignature)(reader);
                    open_1 = !!(0, psdReader_1.readUint8)(reader);
                    /*const flags =*/ (0, psdReader_1.readUint8)(reader); // always 28
                    /*const optionalBlocks =*/ (0, psdReader_1.readUint16)(reader);
                    iconLocation = readRect(reader);
                    popupLocation = readRect(reader);
                    color = (0, psdReader_1.readColor)(reader);
                    author = (0, psdReader_1.readPascalString)(reader, 2);
                    name_2 = (0, psdReader_1.readPascalString)(reader, 2);
                    date = (0, psdReader_1.readPascalString)(reader, 2);
                    /*const contentLength =*/ (0, psdReader_1.readUint32)(reader);
                    /*const dataType =*/ (0, psdReader_1.readSignature)(reader);
                    dataLength = (0, psdReader_1.readUint32)(reader);
                    data = void 0;
                    if (type === "txtA") {
                        if (dataLength >= 2 && (0, psdReader_1.readUint16)(reader) === 0xfeff) {
                            data = (0, psdReader_1.readUnicodeStringWithLength)(reader, (dataLength - 2) / 2);
                        }
                        else {
                            reader.offset -= 2;
                            data = (0, psdReader_1.readAsciiString)(reader, dataLength);
                        }
                        data = data.replace(/\r/g, "\n");
                    }
                    else if (type === "sndA") {
                        data = (0, psdReader_1.readBytes)(reader, dataLength);
                    }
                    else {
                        throw new Error("Unknown annotation type");
                    }
                    annotations.push({
                        type: type === "txtA" ? "text" : "sound",
                        open: open_1,
                        iconLocation: iconLocation,
                        popupLocation: popupLocation,
                        color: color,
                        author: author,
                        name: name_2,
                        date: date,
                        data: data,
                    });
                }
                target.annotations = annotations;
                _a = psdReader_1.skipBytes;
                _b = [reader];
                return [4 /*yield*/, left()];
            case 1:
                _a.apply(void 0, _b.concat([_c.sent()]));
                return [2 /*return*/];
        }
    });
}); }, function (writer, target) {
    var annotations = target.annotations;
    (0, psdWriter_1.writeUint16)(writer, 2);
    (0, psdWriter_1.writeUint16)(writer, 1);
    (0, psdWriter_1.writeUint32)(writer, annotations.length);
    for (var _i = 0, annotations_1 = annotations; _i < annotations_1.length; _i++) {
        var annotation = annotations_1[_i];
        var sound = annotation.type === "sound";
        if (sound && !(annotation.data instanceof Uint8Array))
            throw new Error("Sound annotation data should be Uint8Array");
        if (!sound && typeof annotation.data !== "string")
            throw new Error("Text annotation data should be string");
        var lengthOffset = writer.offset;
        (0, psdWriter_1.writeUint32)(writer, 0); // length
        (0, psdWriter_1.writeSignature)(writer, sound ? "sndA" : "txtA");
        (0, psdWriter_1.writeUint8)(writer, annotation.open ? 1 : 0);
        (0, psdWriter_1.writeUint8)(writer, 28);
        (0, psdWriter_1.writeUint16)(writer, 1);
        writeRect(writer, annotation.iconLocation);
        writeRect(writer, annotation.popupLocation);
        (0, psdWriter_1.writeColor)(writer, annotation.color);
        (0, psdWriter_1.writePascalString)(writer, annotation.author || "", 2);
        (0, psdWriter_1.writePascalString)(writer, annotation.name || "", 2);
        (0, psdWriter_1.writePascalString)(writer, annotation.date || "", 2);
        var contentOffset = writer.offset;
        (0, psdWriter_1.writeUint32)(writer, 0); // content length
        (0, psdWriter_1.writeSignature)(writer, sound ? "sndM" : "txtC");
        (0, psdWriter_1.writeUint32)(writer, 0); // data length
        var dataOffset = writer.offset;
        if (sound) {
            (0, psdWriter_1.writeBytes)(writer, annotation.data);
        }
        else {
            (0, psdWriter_1.writeUint16)(writer, 0xfeff); // unicode string indicator
            var text = annotation.data.replace(/\n/g, "\r");
            for (var i = 0; i < text.length; i++)
                (0, psdWriter_1.writeUint16)(writer, text.charCodeAt(i));
        }
        writer.view.setUint32(lengthOffset, writer.offset - lengthOffset, false);
        writer.view.setUint32(contentOffset, writer.offset - contentOffset, false);
        writer.view.setUint32(dataOffset - 4, writer.offset - dataOffset, false);
    }
});
addHandler("lnk2", function (target) {
    return !!target.linkedFiles && target.linkedFiles.length > 0;
}, function (reader, target, left, _, options) { return __awaiter(void 0, void 0, void 0, function () {
    var psd, size, startOffset, type, version, id, name_3, fileType, fileCreator, dataSize, hasFileOpenDescriptor, fileOpenDescriptor, linkedFileDescriptor, file, year, month, day, hour, minute, seconds, wholeSeconds, ms, fileSize, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                psd = target;
                psd.linkedFiles = psd.linkedFiles || [];
                _c.label = 1;
            case 1: return [4 /*yield*/, left()];
            case 2:
                if (!((_c.sent()) > 8)) return [3 /*break*/, 3];
                size = readLength64(reader);
                startOffset = reader.offset;
                type = (0, psdReader_1.readSignature)(reader);
                version = (0, psdReader_1.readInt32)(reader);
                id = (0, psdReader_1.readPascalString)(reader, 1);
                name_3 = (0, psdReader_1.readUnicodeString)(reader);
                fileType = (0, psdReader_1.readSignature)(reader).trim();
                fileCreator = (0, psdReader_1.readSignature)(reader).trim();
                dataSize = readLength64(reader);
                hasFileOpenDescriptor = (0, psdReader_1.readUint8)(reader);
                fileOpenDescriptor = hasFileOpenDescriptor
                    ? (0, descriptor_1.readVersionAndDescriptor)(reader)
                    : undefined;
                linkedFileDescriptor = type === "liFE" ? (0, descriptor_1.readVersionAndDescriptor)(reader) : undefined;
                file = { id: id, name: name_3 };
                if (fileType)
                    file.type = fileType;
                if (fileCreator)
                    file.creator = fileCreator;
                if (fileOpenDescriptor) {
                    file.descriptor = {
                        compInfo: {
                            compID: fileOpenDescriptor.compInfo.compID,
                            originalCompID: fileOpenDescriptor.compInfo.originalCompID,
                        },
                    };
                }
                if (type === "liFE" && version > 3) {
                    year = (0, psdReader_1.readInt32)(reader);
                    month = (0, psdReader_1.readUint8)(reader);
                    day = (0, psdReader_1.readUint8)(reader);
                    hour = (0, psdReader_1.readUint8)(reader);
                    minute = (0, psdReader_1.readUint8)(reader);
                    seconds = (0, psdReader_1.readFloat64)(reader);
                    wholeSeconds = Math.floor(seconds);
                    ms = (seconds - wholeSeconds) * 1000;
                    file.time = new Date(year, month, day, hour, minute, wholeSeconds, ms).toISOString();
                }
                fileSize = type === "liFE" ? readLength64(reader) : 0;
                if (type === "liFA")
                    (0, psdReader_1.skipBytes)(reader, 8);
                if (type === "liFD")
                    file.data = (0, psdReader_1.readBytes)(reader, dataSize); // seems to be a typo in docs
                if (version >= 5)
                    file.childDocumentID = (0, psdReader_1.readUnicodeString)(reader);
                if (version >= 6)
                    file.assetModTime = (0, psdReader_1.readFloat64)(reader);
                if (version >= 7)
                    file.assetLockedState = (0, psdReader_1.readUint8)(reader);
                if (type === "liFE" && version === 2)
                    file.data = (0, psdReader_1.readBytes)(reader, fileSize);
                if (options.skipLinkedFilesData)
                    file.data = undefined;
                psd.linkedFiles.push(file);
                linkedFileDescriptor;
                while (size % 4)
                    size++;
                reader.offset = startOffset + size;
                return [3 /*break*/, 1];
            case 3:
                _a = psdReader_1.skipBytes;
                _b = [reader];
                return [4 /*yield*/, left()];
            case 4:
                _a.apply(void 0, _b.concat([_c.sent()])); // ?
                return [2 /*return*/];
        }
    });
}); }, function (writer, target) {
    var psd = target;
    for (var _i = 0, _a = psd.linkedFiles; _i < _a.length; _i++) {
        var file = _a[_i];
        var version = 2;
        if (file.assetLockedState != null)
            version = 7;
        else if (file.assetModTime != null)
            version = 6;
        else if (file.childDocumentID != null)
            version = 5;
        // TODO: else if (file.time != null) version = 3; (only for liFE)
        (0, psdWriter_1.writeUint32)(writer, 0);
        (0, psdWriter_1.writeUint32)(writer, 0); // size
        var sizeOffset = writer.offset;
        (0, psdWriter_1.writeSignature)(writer, file.data ? "liFD" : "liFA");
        (0, psdWriter_1.writeInt32)(writer, version);
        if (!file.id ||
            typeof file.id !== "string" ||
            !/^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/.test(file.id)) {
            throw new Error("Linked file ID must be in a GUID format (example: 20953ddb-9391-11ec-b4f1-c15674f50bc4)");
        }
        (0, psdWriter_1.writePascalString)(writer, file.id, 1);
        (0, psdWriter_1.writeUnicodeStringWithPadding)(writer, file.name || "");
        (0, psdWriter_1.writeSignature)(writer, file.type ? "".concat(file.type, "    ").substring(0, 4) : "    ");
        (0, psdWriter_1.writeSignature)(writer, file.creator ? "".concat(file.creator, "    ").substring(0, 4) : "\0\0\0\0");
        writeLength64(writer, file.data ? file.data.byteLength : 0);
        if (file.descriptor && file.descriptor.compInfo) {
            var desc = {
                compInfo: {
                    compID: file.descriptor.compInfo.compID,
                    originalCompID: file.descriptor.compInfo.originalCompID,
                },
            };
            (0, psdWriter_1.writeUint8)(writer, 1);
            (0, descriptor_1.writeVersionAndDescriptor)(writer, "", "null", desc);
        }
        else {
            (0, psdWriter_1.writeUint8)(writer, 0);
        }
        if (file.data)
            (0, psdWriter_1.writeBytes)(writer, file.data);
        else
            writeLength64(writer, 0);
        if (version >= 5)
            (0, psdWriter_1.writeUnicodeStringWithPadding)(writer, file.childDocumentID || "");
        if (version >= 6)
            (0, psdWriter_1.writeFloat64)(writer, file.assetModTime || 0);
        if (version >= 7)
            (0, psdWriter_1.writeUint8)(writer, file.assetLockedState || 0);
        var size = writer.offset - sizeOffset;
        writer.view.setUint32(sizeOffset - 4, size, false); // write size
        while (size % 4) {
            size++;
            (0, psdWriter_1.writeUint8)(writer, 0);
        }
    }
});
addHandlerAlias("lnkD", "lnk2");
addHandlerAlias("lnk3", "lnk2");
addHandlerAlias("lnkE", "lnk2");
addHandler("pths", hasKey("pathList"), function (reader, target) { return __awaiter(void 0, void 0, void 0, function () {
    var desc;
    return __generator(this, function (_a) {
        desc = (0, descriptor_1.readVersionAndDescriptor)(reader, true);
        // console.log(require('util').inspect(desc, false, 99, true));
        // if (options.throwForMissingFeatures && desc?.pathList?.length) throw new Error('non-empty pathList in `pths`');
        desc;
        target.pathList = []; // TODO: read paths
        return [2 /*return*/];
    });
}); }, function (writer, _target) {
    var desc = {
        pathList: [], // TODO: write paths
    };
    (0, descriptor_1.writeVersionAndDescriptor)(writer, "", "pathsDataClass", desc);
});
addHandler("lyvr", hasKey("version"), function (reader, target) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        target.version = (0, psdReader_1.readUint32)(reader);
        return [2 /*return*/];
    });
}); }, function (writer, target) { return (0, psdWriter_1.writeUint32)(writer, target.version); });
function adjustmentType(type) {
    return function (target) {
        return !!target.adjustment && target.adjustment.type === type;
    };
}
addHandler("brit", adjustmentType("brightness/contrast"), function (reader, target, left) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (!target.adjustment) {
                    // ignore if got one from CgEd block
                    target.adjustment = {
                        type: "brightness/contrast",
                        brightness: (0, psdReader_1.readInt16)(reader),
                        contrast: (0, psdReader_1.readInt16)(reader),
                        meanValue: (0, psdReader_1.readInt16)(reader),
                        labColorOnly: !!(0, psdReader_1.readUint8)(reader),
                        useLegacy: true,
                    };
                }
                _a = psdReader_1.skipBytes;
                _b = [reader];
                return [4 /*yield*/, left()];
            case 1:
                _a.apply(void 0, _b.concat([_c.sent()]));
                return [2 /*return*/];
        }
    });
}); }, function (writer, target) {
    var _a;
    var info = target.adjustment;
    (0, psdWriter_1.writeInt16)(writer, info.brightness || 0);
    (0, psdWriter_1.writeInt16)(writer, info.contrast || 0);
    (0, psdWriter_1.writeInt16)(writer, (_a = info.meanValue) !== null && _a !== void 0 ? _a : 127);
    (0, psdWriter_1.writeUint8)(writer, info.labColorOnly ? 1 : 0);
    (0, psdWriter_1.writeZeros)(writer, 1);
});
function readLevelsChannel(reader) {
    var shadowInput = (0, psdReader_1.readInt16)(reader);
    var highlightInput = (0, psdReader_1.readInt16)(reader);
    var shadowOutput = (0, psdReader_1.readInt16)(reader);
    var highlightOutput = (0, psdReader_1.readInt16)(reader);
    var midtoneInput = (0, psdReader_1.readInt16)(reader) / 100;
    return {
        shadowInput: shadowInput,
        highlightInput: highlightInput,
        shadowOutput: shadowOutput,
        highlightOutput: highlightOutput,
        midtoneInput: midtoneInput,
    };
}
function writeLevelsChannel(writer, channel) {
    (0, psdWriter_1.writeInt16)(writer, channel.shadowInput);
    (0, psdWriter_1.writeInt16)(writer, channel.highlightInput);
    (0, psdWriter_1.writeInt16)(writer, channel.shadowOutput);
    (0, psdWriter_1.writeInt16)(writer, channel.highlightOutput);
    (0, psdWriter_1.writeInt16)(writer, Math.round(channel.midtoneInput * 100));
}
addHandler("levl", adjustmentType("levels"), function (reader, target, left) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if ((0, psdReader_1.readUint16)(reader) !== 2)
                    throw new Error("Invalid levl version");
                target.adjustment = __assign(__assign({}, target.adjustment), { type: "levels", rgb: readLevelsChannel(reader), red: readLevelsChannel(reader), green: readLevelsChannel(reader), blue: readLevelsChannel(reader) });
                _a = psdReader_1.skipBytes;
                _b = [reader];
                return [4 /*yield*/, left()];
            case 1:
                _a.apply(void 0, _b.concat([_c.sent()]));
                return [2 /*return*/];
        }
    });
}); }, function (writer, target) {
    var info = target.adjustment;
    var defaultChannel = {
        shadowInput: 0,
        highlightInput: 255,
        shadowOutput: 0,
        highlightOutput: 255,
        midtoneInput: 1,
    };
    (0, psdWriter_1.writeUint16)(writer, 2); // version
    writeLevelsChannel(writer, info.rgb || defaultChannel);
    writeLevelsChannel(writer, info.red || defaultChannel);
    writeLevelsChannel(writer, info.blue || defaultChannel);
    writeLevelsChannel(writer, info.green || defaultChannel);
    for (var i = 0; i < 59; i++)
        writeLevelsChannel(writer, defaultChannel);
});
function readCurveChannel(reader) {
    var nodes = (0, psdReader_1.readUint16)(reader);
    var channel = [];
    for (var j = 0; j < nodes; j++) {
        var output = (0, psdReader_1.readInt16)(reader);
        var input = (0, psdReader_1.readInt16)(reader);
        channel.push({ input: input, output: output });
    }
    return channel;
}
function writeCurveChannel(writer, channel) {
    (0, psdWriter_1.writeUint16)(writer, channel.length);
    for (var _i = 0, channel_1 = channel; _i < channel_1.length; _i++) {
        var n = channel_1[_i];
        (0, psdWriter_1.writeUint16)(writer, n.output);
        (0, psdWriter_1.writeUint16)(writer, n.input);
    }
}
addHandler("curv", adjustmentType("curves"), function (reader, target, left) { return __awaiter(void 0, void 0, void 0, function () {
    var channels, info, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                (0, psdReader_1.readUint8)(reader);
                if ((0, psdReader_1.readUint16)(reader) !== 1)
                    throw new Error("Invalid curv version");
                (0, psdReader_1.readUint16)(reader);
                channels = (0, psdReader_1.readUint16)(reader);
                info = { type: "curves" };
                if (channels & 1)
                    info.rgb = readCurveChannel(reader);
                if (channels & 2)
                    info.red = readCurveChannel(reader);
                if (channels & 4)
                    info.green = readCurveChannel(reader);
                if (channels & 8)
                    info.blue = readCurveChannel(reader);
                target.adjustment = __assign(__assign({}, target.adjustment), info);
                // ignoring, duplicate information
                // checkSignature(reader, 'Crv ');
                // const cVersion = readUint16(reader);
                // readUint16(reader);
                // const channelCount = readUint16(reader);
                // for (let i = 0; i < channelCount; i++) {
                // 	const index = readUint16(reader);
                // 	const nodes = readUint16(reader);
                // 	for (let j = 0; j < nodes; j++) {
                // 		const output = readInt16(reader);
                // 		const input = readInt16(reader);
                // 	}
                // }
                _a = psdReader_1.skipBytes;
                _b = [reader];
                return [4 /*yield*/, left()];
            case 1:
                // ignoring, duplicate information
                // checkSignature(reader, 'Crv ');
                // const cVersion = readUint16(reader);
                // readUint16(reader);
                // const channelCount = readUint16(reader);
                // for (let i = 0; i < channelCount; i++) {
                // 	const index = readUint16(reader);
                // 	const nodes = readUint16(reader);
                // 	for (let j = 0; j < nodes; j++) {
                // 		const output = readInt16(reader);
                // 		const input = readInt16(reader);
                // 	}
                // }
                _a.apply(void 0, _b.concat([_c.sent()]));
                return [2 /*return*/];
        }
    });
}); }, function (writer, target) {
    var info = target.adjustment;
    var rgb = info.rgb, red = info.red, green = info.green, blue = info.blue;
    var channels = 0;
    var channelCount = 0;
    if (rgb && rgb.length) {
        channels |= 1;
        channelCount++;
    }
    if (red && red.length) {
        channels |= 2;
        channelCount++;
    }
    if (green && green.length) {
        channels |= 4;
        channelCount++;
    }
    if (blue && blue.length) {
        channels |= 8;
        channelCount++;
    }
    (0, psdWriter_1.writeUint8)(writer, 0);
    (0, psdWriter_1.writeUint16)(writer, 1); // version
    (0, psdWriter_1.writeUint16)(writer, 0);
    (0, psdWriter_1.writeUint16)(writer, channels);
    if (rgb && rgb.length)
        writeCurveChannel(writer, rgb);
    if (red && red.length)
        writeCurveChannel(writer, red);
    if (green && green.length)
        writeCurveChannel(writer, green);
    if (blue && blue.length)
        writeCurveChannel(writer, blue);
    (0, psdWriter_1.writeSignature)(writer, "Crv ");
    (0, psdWriter_1.writeUint16)(writer, 4); // version
    (0, psdWriter_1.writeUint16)(writer, 0);
    (0, psdWriter_1.writeUint16)(writer, channelCount);
    if (rgb && rgb.length) {
        (0, psdWriter_1.writeUint16)(writer, 0);
        writeCurveChannel(writer, rgb);
    }
    if (red && red.length) {
        (0, psdWriter_1.writeUint16)(writer, 1);
        writeCurveChannel(writer, red);
    }
    if (green && green.length) {
        (0, psdWriter_1.writeUint16)(writer, 2);
        writeCurveChannel(writer, green);
    }
    if (blue && blue.length) {
        (0, psdWriter_1.writeUint16)(writer, 3);
        writeCurveChannel(writer, blue);
    }
    (0, psdWriter_1.writeZeros)(writer, 2);
});
addHandler("expA", adjustmentType("exposure"), function (reader, target, left) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if ((0, psdReader_1.readUint16)(reader) !== 1)
                    throw new Error("Invalid expA version");
                target.adjustment = __assign(__assign({}, target.adjustment), { type: "exposure", exposure: (0, psdReader_1.readFloat32)(reader), offset: (0, psdReader_1.readFloat32)(reader), gamma: (0, psdReader_1.readFloat32)(reader) });
                _a = psdReader_1.skipBytes;
                _b = [reader];
                return [4 /*yield*/, left()];
            case 1:
                _a.apply(void 0, _b.concat([_c.sent()]));
                return [2 /*return*/];
        }
    });
}); }, function (writer, target) {
    var info = target.adjustment;
    (0, psdWriter_1.writeUint16)(writer, 1); // version
    (0, psdWriter_1.writeFloat32)(writer, info.exposure);
    (0, psdWriter_1.writeFloat32)(writer, info.offset);
    (0, psdWriter_1.writeFloat32)(writer, info.gamma);
    (0, psdWriter_1.writeZeros)(writer, 2);
});
addHandler("vibA", adjustmentType("vibrance"), function (reader, target, left) { return __awaiter(void 0, void 0, void 0, function () {
    var desc, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                desc = (0, descriptor_1.readVersionAndDescriptor)(reader);
                target.adjustment = { type: "vibrance" };
                if (desc.vibrance !== undefined)
                    target.adjustment.vibrance = desc.vibrance;
                if (desc.Strt !== undefined)
                    target.adjustment.saturation = desc.Strt;
                _a = psdReader_1.skipBytes;
                _b = [reader];
                return [4 /*yield*/, left()];
            case 1:
                _a.apply(void 0, _b.concat([_c.sent()]));
                return [2 /*return*/];
        }
    });
}); }, function (writer, target) {
    var info = target.adjustment;
    var desc = {};
    if (info.vibrance !== undefined)
        desc.vibrance = info.vibrance;
    if (info.saturation !== undefined)
        desc.Strt = info.saturation;
    (0, descriptor_1.writeVersionAndDescriptor)(writer, "", "null", desc);
});
function readHueChannel(reader) {
    return {
        a: (0, psdReader_1.readInt16)(reader),
        b: (0, psdReader_1.readInt16)(reader),
        c: (0, psdReader_1.readInt16)(reader),
        d: (0, psdReader_1.readInt16)(reader),
        hue: (0, psdReader_1.readInt16)(reader),
        saturation: (0, psdReader_1.readInt16)(reader),
        lightness: (0, psdReader_1.readInt16)(reader),
    };
}
function writeHueChannel(writer, channel) {
    var c = channel || {};
    (0, psdWriter_1.writeInt16)(writer, c.a || 0);
    (0, psdWriter_1.writeInt16)(writer, c.b || 0);
    (0, psdWriter_1.writeInt16)(writer, c.c || 0);
    (0, psdWriter_1.writeInt16)(writer, c.d || 0);
    (0, psdWriter_1.writeInt16)(writer, c.hue || 0);
    (0, psdWriter_1.writeInt16)(writer, c.saturation || 0);
    (0, psdWriter_1.writeInt16)(writer, c.lightness || 0);
}
addHandler("hue2", adjustmentType("hue/saturation"), function (reader, target, left) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if ((0, psdReader_1.readUint16)(reader) !== 2)
                    throw new Error("Invalid hue2 version");
                target.adjustment = __assign(__assign({}, target.adjustment), { type: "hue/saturation", master: readHueChannel(reader), reds: readHueChannel(reader), yellows: readHueChannel(reader), greens: readHueChannel(reader), cyans: readHueChannel(reader), blues: readHueChannel(reader), magentas: readHueChannel(reader) });
                _a = psdReader_1.skipBytes;
                _b = [reader];
                return [4 /*yield*/, left()];
            case 1:
                _a.apply(void 0, _b.concat([_c.sent()]));
                return [2 /*return*/];
        }
    });
}); }, function (writer, target) {
    var info = target.adjustment;
    (0, psdWriter_1.writeUint16)(writer, 2); // version
    writeHueChannel(writer, info.master);
    writeHueChannel(writer, info.reds);
    writeHueChannel(writer, info.yellows);
    writeHueChannel(writer, info.greens);
    writeHueChannel(writer, info.cyans);
    writeHueChannel(writer, info.blues);
    writeHueChannel(writer, info.magentas);
});
function readColorBalance(reader) {
    return {
        cyanRed: (0, psdReader_1.readInt16)(reader),
        magentaGreen: (0, psdReader_1.readInt16)(reader),
        yellowBlue: (0, psdReader_1.readInt16)(reader),
    };
}
function writeColorBalance(writer, value) {
    (0, psdWriter_1.writeInt16)(writer, value.cyanRed || 0);
    (0, psdWriter_1.writeInt16)(writer, value.magentaGreen || 0);
    (0, psdWriter_1.writeInt16)(writer, value.yellowBlue || 0);
}
addHandler("blnc", adjustmentType("color balance"), function (reader, target, left) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                target.adjustment = {
                    type: "color balance",
                    shadows: readColorBalance(reader),
                    midtones: readColorBalance(reader),
                    highlights: readColorBalance(reader),
                    preserveLuminosity: !!(0, psdReader_1.readUint8)(reader),
                };
                _a = psdReader_1.skipBytes;
                _b = [reader];
                return [4 /*yield*/, left()];
            case 1:
                _a.apply(void 0, _b.concat([_c.sent()]));
                return [2 /*return*/];
        }
    });
}); }, function (writer, target) {
    var info = target.adjustment;
    writeColorBalance(writer, info.shadows || {});
    writeColorBalance(writer, info.midtones || {});
    writeColorBalance(writer, info.highlights || {});
    (0, psdWriter_1.writeUint8)(writer, info.preserveLuminosity ? 1 : 0);
    (0, psdWriter_1.writeZeros)(writer, 1);
});
addHandler("blwh", adjustmentType("black & white"), function (reader, target, left) { return __awaiter(void 0, void 0, void 0, function () {
    var desc, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                desc = (0, descriptor_1.readVersionAndDescriptor)(reader);
                target.adjustment = {
                    type: "black & white",
                    reds: desc["Rd  "],
                    yellows: desc.Yllw,
                    greens: desc["Grn "],
                    cyans: desc["Cyn "],
                    blues: desc["Bl  "],
                    magentas: desc.Mgnt,
                    useTint: !!desc.useTint,
                    presetKind: desc.bwPresetKind,
                    presetFileName: desc.blackAndWhitePresetFileName,
                };
                if (desc.tintColor !== undefined)
                    target.adjustment.tintColor = (0, descriptor_1.parseColor)(desc.tintColor);
                _a = psdReader_1.skipBytes;
                _b = [reader];
                return [4 /*yield*/, left()];
            case 1:
                _a.apply(void 0, _b.concat([_c.sent()]));
                return [2 /*return*/];
        }
    });
}); }, function (writer, target) {
    var info = target.adjustment;
    var desc = {
        "Rd  ": info.reds || 0,
        Yllw: info.yellows || 0,
        "Grn ": info.greens || 0,
        "Cyn ": info.cyans || 0,
        "Bl  ": info.blues || 0,
        Mgnt: info.magentas || 0,
        useTint: !!info.useTint,
        tintColor: (0, descriptor_1.serializeColor)(info.tintColor),
        bwPresetKind: info.presetKind || 0,
        blackAndWhitePresetFileName: info.presetFileName || "",
    };
    (0, descriptor_1.writeVersionAndDescriptor)(writer, "", "null", desc);
});
addHandler("phfl", adjustmentType("photo filter"), function (reader, target, left) { return __awaiter(void 0, void 0, void 0, function () {
    var version, color, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                version = (0, psdReader_1.readUint16)(reader);
                if (version !== 2 && version !== 3)
                    throw new Error("Invalid phfl version");
                if (version === 2) {
                    color = (0, psdReader_1.readColor)(reader);
                }
                else {
                    // version 3
                    // TODO: test this, this is probably wrong
                    color = {
                        l: (0, psdReader_1.readInt32)(reader) / 100,
                        a: (0, psdReader_1.readInt32)(reader) / 100,
                        b: (0, psdReader_1.readInt32)(reader) / 100,
                    };
                }
                target.adjustment = {
                    type: "photo filter",
                    color: color,
                    density: (0, psdReader_1.readUint32)(reader) / 100,
                    preserveLuminosity: !!(0, psdReader_1.readUint8)(reader),
                };
                _a = psdReader_1.skipBytes;
                _b = [reader];
                return [4 /*yield*/, left()];
            case 1:
                _a.apply(void 0, _b.concat([_c.sent()]));
                return [2 /*return*/];
        }
    });
}); }, function (writer, target) {
    var info = target.adjustment;
    (0, psdWriter_1.writeUint16)(writer, 2); // version
    (0, psdWriter_1.writeColor)(writer, info.color || { l: 0, a: 0, b: 0 });
    (0, psdWriter_1.writeUint32)(writer, (info.density || 0) * 100);
    (0, psdWriter_1.writeUint8)(writer, info.preserveLuminosity ? 1 : 0);
    (0, psdWriter_1.writeZeros)(writer, 3);
});
function readMixrChannel(reader) {
    var red = (0, psdReader_1.readInt16)(reader);
    var green = (0, psdReader_1.readInt16)(reader);
    var blue = (0, psdReader_1.readInt16)(reader);
    (0, psdReader_1.skipBytes)(reader, 2);
    var constant = (0, psdReader_1.readInt16)(reader);
    return { red: red, green: green, blue: blue, constant: constant };
}
function writeMixrChannel(writer, channel) {
    var c = channel || {};
    (0, psdWriter_1.writeInt16)(writer, c.red);
    (0, psdWriter_1.writeInt16)(writer, c.green);
    (0, psdWriter_1.writeInt16)(writer, c.blue);
    (0, psdWriter_1.writeZeros)(writer, 2);
    (0, psdWriter_1.writeInt16)(writer, c.constant);
}
addHandler("mixr", adjustmentType("channel mixer"), function (reader, target, left) { return __awaiter(void 0, void 0, void 0, function () {
    var adjustment, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if ((0, psdReader_1.readUint16)(reader) !== 1)
                    throw new Error("Invalid mixr version");
                adjustment = (target.adjustment = __assign(__assign({}, target.adjustment), { type: "channel mixer", monochrome: !!(0, psdReader_1.readUint16)(reader) }));
                if (!adjustment.monochrome) {
                    adjustment.red = readMixrChannel(reader);
                    adjustment.green = readMixrChannel(reader);
                    adjustment.blue = readMixrChannel(reader);
                }
                adjustment.gray = readMixrChannel(reader);
                _a = psdReader_1.skipBytes;
                _b = [reader];
                return [4 /*yield*/, left()];
            case 1:
                _a.apply(void 0, _b.concat([_c.sent()]));
                return [2 /*return*/];
        }
    });
}); }, function (writer, target) {
    var info = target.adjustment;
    (0, psdWriter_1.writeUint16)(writer, 1); // version
    (0, psdWriter_1.writeUint16)(writer, info.monochrome ? 1 : 0);
    if (info.monochrome) {
        writeMixrChannel(writer, info.gray);
        (0, psdWriter_1.writeZeros)(writer, 3 * 5 * 2);
    }
    else {
        writeMixrChannel(writer, info.red);
        writeMixrChannel(writer, info.green);
        writeMixrChannel(writer, info.blue);
        writeMixrChannel(writer, info.gray);
    }
});
var colorLookupType = (0, helpers_1.createEnum)("colorLookupType", "3DLUT", {
    "3dlut": "3DLUT",
    abstractProfile: "abstractProfile",
    deviceLinkProfile: "deviceLinkProfile",
});
var LUTFormatType = (0, helpers_1.createEnum)("LUTFormatType", "look", {
    look: "LUTFormatLOOK",
    cube: "LUTFormatCUBE",
    "3dl": "LUTFormat3DL",
});
var colorLookupOrder = (0, helpers_1.createEnum)("colorLookupOrder", "rgb", {
    rgb: "rgbOrder",
    bgr: "bgrOrder",
});
addHandler("clrL", adjustmentType("color lookup"), function (reader, target, left) { return __awaiter(void 0, void 0, void 0, function () {
    var desc, info, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if ((0, psdReader_1.readUint16)(reader) !== 1)
                    throw new Error("Invalid clrL version");
                desc = (0, descriptor_1.readVersionAndDescriptor)(reader);
                target.adjustment = { type: "color lookup" };
                info = target.adjustment;
                if (desc.lookupType !== undefined)
                    info.lookupType = colorLookupType.decode(desc.lookupType);
                if (desc["Nm  "] !== undefined)
                    info.name = desc["Nm  "];
                if (desc.Dthr !== undefined)
                    info.dither = desc.Dthr;
                if (desc.profile !== undefined)
                    info.profile = desc.profile;
                if (desc.LUTFormat !== undefined)
                    info.lutFormat = LUTFormatType.decode(desc.LUTFormat);
                if (desc.dataOrder !== undefined)
                    info.dataOrder = colorLookupOrder.decode(desc.dataOrder);
                if (desc.tableOrder !== undefined)
                    info.tableOrder = colorLookupOrder.decode(desc.tableOrder);
                if (desc.LUT3DFileData !== undefined)
                    info.lut3DFileData = desc.LUT3DFileData;
                if (desc.LUT3DFileName !== undefined)
                    info.lut3DFileName = desc.LUT3DFileName;
                _a = psdReader_1.skipBytes;
                _b = [reader];
                return [4 /*yield*/, left()];
            case 1:
                _a.apply(void 0, _b.concat([_c.sent()]));
                return [2 /*return*/];
        }
    });
}); }, function (writer, target) {
    var info = target.adjustment;
    var desc = {};
    if (info.lookupType !== undefined)
        desc.lookupType = colorLookupType.encode(info.lookupType);
    if (info.name !== undefined)
        desc["Nm  "] = info.name;
    if (info.dither !== undefined)
        desc.Dthr = info.dither;
    if (info.profile !== undefined)
        desc.profile = info.profile;
    if (info.lutFormat !== undefined)
        desc.LUTFormat = LUTFormatType.encode(info.lutFormat);
    if (info.dataOrder !== undefined)
        desc.dataOrder = colorLookupOrder.encode(info.dataOrder);
    if (info.tableOrder !== undefined)
        desc.tableOrder = colorLookupOrder.encode(info.tableOrder);
    if (info.lut3DFileData !== undefined)
        desc.LUT3DFileData = info.lut3DFileData;
    if (info.lut3DFileName !== undefined)
        desc.LUT3DFileName = info.lut3DFileName;
    (0, psdWriter_1.writeUint16)(writer, 1); // version
    (0, descriptor_1.writeVersionAndDescriptor)(writer, "", "null", desc);
});
addHandler("nvrt", adjustmentType("invert"), function (reader, target, left) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                target.adjustment = { type: "invert" };
                _a = psdReader_1.skipBytes;
                _b = [reader];
                return [4 /*yield*/, left()];
            case 1:
                _a.apply(void 0, _b.concat([_c.sent()]));
                return [2 /*return*/];
        }
    });
}); }, function () {
    // nothing to write here
});
addHandler("post", adjustmentType("posterize"), function (reader, target, left) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                target.adjustment = {
                    type: "posterize",
                    levels: (0, psdReader_1.readUint16)(reader),
                };
                _a = psdReader_1.skipBytes;
                _b = [reader];
                return [4 /*yield*/, left()];
            case 1:
                _a.apply(void 0, _b.concat([_c.sent()]));
                return [2 /*return*/];
        }
    });
}); }, function (writer, target) {
    var _a;
    var info = target.adjustment;
    (0, psdWriter_1.writeUint16)(writer, (_a = info.levels) !== null && _a !== void 0 ? _a : 4);
    (0, psdWriter_1.writeZeros)(writer, 2);
});
addHandler("thrs", adjustmentType("threshold"), function (reader, target, left) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                target.adjustment = {
                    type: "threshold",
                    level: (0, psdReader_1.readUint16)(reader),
                };
                _a = psdReader_1.skipBytes;
                _b = [reader];
                return [4 /*yield*/, left()];
            case 1:
                _a.apply(void 0, _b.concat([_c.sent()]));
                return [2 /*return*/];
        }
    });
}); }, function (writer, target) {
    var _a;
    var info = target.adjustment;
    (0, psdWriter_1.writeUint16)(writer, (_a = info.level) !== null && _a !== void 0 ? _a : 128);
    (0, psdWriter_1.writeZeros)(writer, 2);
});
var grdmColorModels = ["", "", "", "rgb", "hsb", "", "lab"];
addHandler("grdm", adjustmentType("gradient map"), function (reader, target, left) { return __awaiter(void 0, void 0, void 0, function () {
    var info, stopsCount, i, opacityStopsCount, i, expansionCount, interpolation, length, _a, _b, _i, _c, s, _d, _e, s;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                if ((0, psdReader_1.readUint16)(reader) !== 1)
                    throw new Error("Invalid grdm version");
                info = {
                    type: "gradient map",
                    gradientType: "solid",
                };
                info.reverse = !!(0, psdReader_1.readUint8)(reader);
                info.dither = !!(0, psdReader_1.readUint8)(reader);
                info.name = (0, psdReader_1.readUnicodeString)(reader);
                info.colorStops = [];
                info.opacityStops = [];
                stopsCount = (0, psdReader_1.readUint16)(reader);
                for (i = 0; i < stopsCount; i++) {
                    info.colorStops.push({
                        location: (0, psdReader_1.readUint32)(reader),
                        midpoint: (0, psdReader_1.readUint32)(reader) / 100,
                        color: (0, psdReader_1.readColor)(reader),
                    });
                    (0, psdReader_1.skipBytes)(reader, 2);
                }
                opacityStopsCount = (0, psdReader_1.readUint16)(reader);
                for (i = 0; i < opacityStopsCount; i++) {
                    info.opacityStops.push({
                        location: (0, psdReader_1.readUint32)(reader),
                        midpoint: (0, psdReader_1.readUint32)(reader) / 100,
                        opacity: (0, psdReader_1.readUint16)(reader) / 0xff,
                    });
                }
                expansionCount = (0, psdReader_1.readUint16)(reader);
                if (expansionCount !== 2)
                    throw new Error("Invalid grdm expansion count");
                interpolation = (0, psdReader_1.readUint16)(reader);
                info.smoothness = interpolation / 4096;
                length = (0, psdReader_1.readUint16)(reader);
                if (length !== 32)
                    throw new Error("Invalid grdm length");
                info.gradientType = (0, psdReader_1.readUint16)(reader) ? "noise" : "solid";
                info.randomSeed = (0, psdReader_1.readUint32)(reader);
                info.addTransparency = !!(0, psdReader_1.readUint16)(reader);
                info.restrictColors = !!(0, psdReader_1.readUint16)(reader);
                info.roughness = (0, psdReader_1.readUint32)(reader) / 4096;
                info.colorModel = (grdmColorModels[(0, psdReader_1.readUint16)(reader)] || "rgb");
                info.min = [
                    (0, psdReader_1.readUint16)(reader) / 0x8000,
                    (0, psdReader_1.readUint16)(reader) / 0x8000,
                    (0, psdReader_1.readUint16)(reader) / 0x8000,
                    (0, psdReader_1.readUint16)(reader) / 0x8000,
                ];
                info.max = [
                    (0, psdReader_1.readUint16)(reader) / 0x8000,
                    (0, psdReader_1.readUint16)(reader) / 0x8000,
                    (0, psdReader_1.readUint16)(reader) / 0x8000,
                    (0, psdReader_1.readUint16)(reader) / 0x8000,
                ];
                _a = psdReader_1.skipBytes;
                _b = [reader];
                return [4 /*yield*/, left()];
            case 1:
                _a.apply(void 0, _b.concat([_f.sent()]));
                for (_i = 0, _c = info.colorStops; _i < _c.length; _i++) {
                    s = _c[_i];
                    s.location /= interpolation;
                }
                for (_d = 0, _e = info.opacityStops; _d < _e.length; _d++) {
                    s = _e[_d];
                    s.location /= interpolation;
                }
                target.adjustment = info;
                return [2 /*return*/];
        }
    });
}); }, function (writer, target) {
    var _a, _b, _c;
    var info = target.adjustment;
    (0, psdWriter_1.writeUint16)(writer, 1); // version
    (0, psdWriter_1.writeUint8)(writer, info.reverse ? 1 : 0);
    (0, psdWriter_1.writeUint8)(writer, info.dither ? 1 : 0);
    (0, psdWriter_1.writeUnicodeStringWithPadding)(writer, info.name || "");
    (0, psdWriter_1.writeUint16)(writer, (info.colorStops && info.colorStops.length) || 0);
    var interpolation = Math.round(((_a = info.smoothness) !== null && _a !== void 0 ? _a : 1) * 4096);
    for (var _i = 0, _d = info.colorStops || []; _i < _d.length; _i++) {
        var s = _d[_i];
        (0, psdWriter_1.writeUint32)(writer, Math.round(s.location * interpolation));
        (0, psdWriter_1.writeUint32)(writer, Math.round(s.midpoint * 100));
        (0, psdWriter_1.writeColor)(writer, s.color);
        (0, psdWriter_1.writeZeros)(writer, 2);
    }
    (0, psdWriter_1.writeUint16)(writer, (info.opacityStops && info.opacityStops.length) || 0);
    for (var _e = 0, _f = info.opacityStops || []; _e < _f.length; _e++) {
        var s = _f[_e];
        (0, psdWriter_1.writeUint32)(writer, Math.round(s.location * interpolation));
        (0, psdWriter_1.writeUint32)(writer, Math.round(s.midpoint * 100));
        (0, psdWriter_1.writeUint16)(writer, Math.round(s.opacity * 0xff));
    }
    (0, psdWriter_1.writeUint16)(writer, 2); // expansion count
    (0, psdWriter_1.writeUint16)(writer, interpolation);
    (0, psdWriter_1.writeUint16)(writer, 32); // length
    (0, psdWriter_1.writeUint16)(writer, info.gradientType === "noise" ? 1 : 0);
    (0, psdWriter_1.writeUint32)(writer, info.randomSeed || 0);
    (0, psdWriter_1.writeUint16)(writer, info.addTransparency ? 1 : 0);
    (0, psdWriter_1.writeUint16)(writer, info.restrictColors ? 1 : 0);
    (0, psdWriter_1.writeUint32)(writer, Math.round(((_b = info.roughness) !== null && _b !== void 0 ? _b : 1) * 4096));
    var colorModel = grdmColorModels.indexOf((_c = info.colorModel) !== null && _c !== void 0 ? _c : "rgb");
    (0, psdWriter_1.writeUint16)(writer, colorModel === -1 ? 3 : colorModel);
    for (var i = 0; i < 4; i++)
        (0, psdWriter_1.writeUint16)(writer, Math.round(((info.min && info.min[i]) || 0) * 0x8000));
    for (var i = 0; i < 4; i++)
        (0, psdWriter_1.writeUint16)(writer, Math.round(((info.max && info.max[i]) || 0) * 0x8000));
    (0, psdWriter_1.writeZeros)(writer, 4);
});
function readSelectiveColors(reader) {
    return {
        c: (0, psdReader_1.readInt16)(reader),
        m: (0, psdReader_1.readInt16)(reader),
        y: (0, psdReader_1.readInt16)(reader),
        k: (0, psdReader_1.readInt16)(reader),
    };
}
function writeSelectiveColors(writer, cmyk) {
    var c = cmyk || {};
    (0, psdWriter_1.writeInt16)(writer, c.c);
    (0, psdWriter_1.writeInt16)(writer, c.m);
    (0, psdWriter_1.writeInt16)(writer, c.y);
    (0, psdWriter_1.writeInt16)(writer, c.k);
}
addHandler("selc", adjustmentType("selective color"), function (reader, target) { return __awaiter(void 0, void 0, void 0, function () {
    var mode;
    return __generator(this, function (_a) {
        if ((0, psdReader_1.readUint16)(reader) !== 1)
            throw new Error("Invalid selc version");
        mode = (0, psdReader_1.readUint16)(reader) ? "absolute" : "relative";
        (0, psdReader_1.skipBytes)(reader, 8);
        target.adjustment = {
            type: "selective color",
            mode: mode,
            reds: readSelectiveColors(reader),
            yellows: readSelectiveColors(reader),
            greens: readSelectiveColors(reader),
            cyans: readSelectiveColors(reader),
            blues: readSelectiveColors(reader),
            magentas: readSelectiveColors(reader),
            whites: readSelectiveColors(reader),
            neutrals: readSelectiveColors(reader),
            blacks: readSelectiveColors(reader),
        };
        return [2 /*return*/];
    });
}); }, function (writer, target) {
    var info = target.adjustment;
    (0, psdWriter_1.writeUint16)(writer, 1); // version
    (0, psdWriter_1.writeUint16)(writer, info.mode === "absolute" ? 1 : 0);
    (0, psdWriter_1.writeZeros)(writer, 8);
    writeSelectiveColors(writer, info.reds);
    writeSelectiveColors(writer, info.yellows);
    writeSelectiveColors(writer, info.greens);
    writeSelectiveColors(writer, info.cyans);
    writeSelectiveColors(writer, info.blues);
    writeSelectiveColors(writer, info.magentas);
    writeSelectiveColors(writer, info.whites);
    writeSelectiveColors(writer, info.neutrals);
    writeSelectiveColors(writer, info.blacks);
});
addHandler("CgEd", function (target) {
    var a = target.adjustment;
    if (!a)
        return false;
    return ((a.type === "brightness/contrast" && !a.useLegacy) ||
        ((a.type === "levels" ||
            a.type === "curves" ||
            a.type === "exposure" ||
            a.type === "channel mixer" ||
            a.type === "hue/saturation") &&
            a.presetFileName !== undefined));
}, function (reader, target, left) { return __awaiter(void 0, void 0, void 0, function () {
    var desc, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                desc = (0, descriptor_1.readVersionAndDescriptor)(reader);
                if (desc.Vrsn !== 1)
                    throw new Error("Invalid CgEd version");
                // this section can specify preset file name for other adjustment types
                if ("presetFileName" in desc) {
                    target.adjustment = __assign(__assign({}, target.adjustment), { presetKind: desc.presetKind, presetFileName: desc.presetFileName });
                }
                else if ("curvesPresetFileName" in desc) {
                    target.adjustment = __assign(__assign({}, target.adjustment), { presetKind: desc.curvesPresetKind, presetFileName: desc.curvesPresetFileName });
                }
                else if ("mixerPresetFileName" in desc) {
                    target.adjustment = __assign(__assign({}, target.adjustment), { presetKind: desc.mixerPresetKind, presetFileName: desc.mixerPresetFileName });
                }
                else {
                    target.adjustment = {
                        type: "brightness/contrast",
                        brightness: desc.Brgh,
                        contrast: desc.Cntr,
                        meanValue: desc.means,
                        useLegacy: !!desc.useLegacy,
                        labColorOnly: !!desc["Lab "],
                        auto: !!desc.Auto,
                    };
                }
                _a = psdReader_1.skipBytes;
                _b = [reader];
                return [4 /*yield*/, left()];
            case 1:
                _a.apply(void 0, _b.concat([_c.sent()]));
                return [2 /*return*/];
        }
    });
}); }, function (writer, target) {
    var _a, _b, _c, _d;
    var info = target.adjustment;
    if (info.type === "levels" ||
        info.type === "exposure" ||
        info.type === "hue/saturation") {
        var desc = {
            Vrsn: 1,
            presetKind: (_a = info.presetKind) !== null && _a !== void 0 ? _a : 1,
            presetFileName: info.presetFileName || "",
        };
        (0, descriptor_1.writeVersionAndDescriptor)(writer, "", "null", desc);
    }
    else if (info.type === "curves") {
        var desc = {
            Vrsn: 1,
            curvesPresetKind: (_b = info.presetKind) !== null && _b !== void 0 ? _b : 1,
            curvesPresetFileName: info.presetFileName || "",
        };
        (0, descriptor_1.writeVersionAndDescriptor)(writer, "", "null", desc);
    }
    else if (info.type === "channel mixer") {
        var desc = {
            Vrsn: 1,
            mixerPresetKind: (_c = info.presetKind) !== null && _c !== void 0 ? _c : 1,
            mixerPresetFileName: info.presetFileName || "",
        };
        (0, descriptor_1.writeVersionAndDescriptor)(writer, "", "null", desc);
    }
    else if (info.type === "brightness/contrast") {
        var desc = {
            Vrsn: 1,
            Brgh: info.brightness || 0,
            Cntr: info.contrast || 0,
            means: (_d = info.meanValue) !== null && _d !== void 0 ? _d : 127,
            "Lab ": !!info.labColorOnly,
            useLegacy: !!info.useLegacy,
            Auto: !!info.auto,
        };
        (0, descriptor_1.writeVersionAndDescriptor)(writer, "", "null", desc);
    }
    else {
        throw new Error("Unhandled CgEd case");
    }
});
addHandler("Txt2", hasKey("engineData"), function (reader, target, left) { return __awaiter(void 0, void 0, void 0, function () {
    var data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = psdReader_1.readBytes;
                _b = [reader];
                return [4 /*yield*/, left()];
            case 1:
                data = _a.apply(void 0, _b.concat([_c.sent()]));
                target.engineData = (0, base64_js_1.fromByteArray)(data);
                return [2 /*return*/];
        }
    });
}); }, function (writer, target) {
    var buffer = (0, base64_js_1.toByteArray)(target.engineData);
    (0, psdWriter_1.writeBytes)(writer, buffer);
});
addHandler("FEid", hasKey("filterEffectsMasks"), function (reader, target, leftBytes) { return __awaiter(void 0, void 0, void 0, function () {
    var version, length, end, id, effectVersion, top_2, left, bottom, right, depth, maxChannels, channels, i, exists, channelLength, compressionMode, data, compressionMode, data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                version = (0, psdReader_1.readInt32)(reader);
                if (version < 1 || version > 3)
                    throw new Error("Invalid filterEffects version ".concat(version));
                if ((0, psdReader_1.readUint32)(reader))
                    throw new Error("filterEffects: 64 bit length is not supported");
                length = (0, psdReader_1.readUint32)(reader);
                end = reader.offset + length;
                target.filterEffectsMasks = [];
                _c.label = 1;
            case 1:
                if (!(reader.offset < end)) return [3 /*break*/, 5];
                id = (0, psdReader_1.readPascalString)(reader, 1);
                effectVersion = (0, psdReader_1.readInt32)(reader);
                if (effectVersion !== 1)
                    throw new Error("Invalid filterEffect version ".concat(effectVersion));
                if ((0, psdReader_1.readUint32)(reader))
                    throw new Error("filterEffect: 64 bit length is not supported");
                /*const effectLength =*/ (0, psdReader_1.readUint32)(reader);
                top_2 = (0, psdReader_1.readInt32)(reader);
                left = (0, psdReader_1.readInt32)(reader);
                bottom = (0, psdReader_1.readInt32)(reader);
                right = (0, psdReader_1.readInt32)(reader);
                depth = (0, psdReader_1.readInt32)(reader);
                maxChannels = (0, psdReader_1.readInt32)(reader);
                channels = [];
                // 0 -> R, 1 -> G, 2 -> B, 25 -> A
                for (i = 0; i < maxChannels + 2; i++) {
                    exists = (0, psdReader_1.readInt32)(reader);
                    if (exists) {
                        if ((0, psdReader_1.readUint32)(reader))
                            throw new Error("filterEffect: 64 bit length is not supported");
                        channelLength = (0, psdReader_1.readUint32)(reader);
                        compressionMode = (0, psdReader_1.readUint16)(reader);
                        data = (0, psdReader_1.readBytes)(reader, channelLength - 2);
                        channels.push({ compressionMode: compressionMode, data: data });
                    }
                    else {
                        channels.push(undefined);
                    }
                }
                target.filterEffectsMasks.push({
                    id: id,
                    top: top_2,
                    left: left,
                    bottom: bottom,
                    right: right,
                    depth: depth,
                    channels: channels,
                });
                return [4 /*yield*/, leftBytes()];
            case 2:
                if (!((_c.sent()) && (0, psdReader_1.readUint8)(reader))) return [3 /*break*/, 4];
                compressionMode = (0, psdReader_1.readUint16)(reader);
                _a = psdReader_1.readBytes;
                _b = [reader];
                return [4 /*yield*/, leftBytes()];
            case 3:
                data = _a.apply(void 0, _b.concat([_c.sent()]));
                target.filterEffectsMasks[target.filterEffectsMasks.length - 1].extra =
                    { compressionMode: compressionMode, data: data };
                _c.label = 4;
            case 4: return [3 /*break*/, 1];
            case 5: return [2 /*return*/];
        }
    });
}); }, function (writer, target) {
    var _a;
    (0, psdWriter_1.writeInt32)(writer, 3);
    (0, psdWriter_1.writeUint32)(writer, 0);
    (0, psdWriter_1.writeUint32)(writer, 0);
    var lengthOffset = writer.offset;
    for (var _i = 0, _b = target.filterEffectsMasks; _i < _b.length; _i++) {
        var mask = _b[_i];
        (0, psdWriter_1.writePascalString)(writer, mask.id, 1);
        (0, psdWriter_1.writeInt32)(writer, 1);
        (0, psdWriter_1.writeUint32)(writer, 0);
        (0, psdWriter_1.writeUint32)(writer, 0);
        var length2Offset = writer.offset;
        (0, psdWriter_1.writeInt32)(writer, mask.top);
        (0, psdWriter_1.writeInt32)(writer, mask.left);
        (0, psdWriter_1.writeInt32)(writer, mask.bottom);
        (0, psdWriter_1.writeInt32)(writer, mask.right);
        (0, psdWriter_1.writeInt32)(writer, mask.depth);
        var maxChannels = Math.max(0, mask.channels.length - 2);
        (0, psdWriter_1.writeInt32)(writer, maxChannels);
        for (var i = 0; i < maxChannels + 2; i++) {
            var channel = mask.channels[i];
            (0, psdWriter_1.writeInt32)(writer, channel ? 1 : 0);
            if (channel) {
                (0, psdWriter_1.writeUint32)(writer, 0);
                (0, psdWriter_1.writeUint32)(writer, channel.data.length + 2);
                (0, psdWriter_1.writeUint16)(writer, channel.compressionMode);
                (0, psdWriter_1.writeBytes)(writer, channel.data);
            }
        }
        writer.view.setUint32(length2Offset - 4, writer.offset - length2Offset, false);
    }
    var extra = (_a = target.filterEffectsMasks[target.filterEffectsMasks.length - 1]) === null || _a === void 0 ? void 0 : _a.extra;
    if (extra) {
        (0, psdWriter_1.writeUint8)(writer, 1);
        (0, psdWriter_1.writeUint16)(writer, extra.compressionMode);
        (0, psdWriter_1.writeBytes)(writer, extra.data);
    }
    writer.view.setUint32(lengthOffset - 4, writer.offset - lengthOffset, false);
});
addHandlerAlias("FXid", "FEid");
addHandler("FMsk", hasKey("filterMask"), function (reader, target) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        target.filterMask = {
            colorSpace: (0, psdReader_1.readColor)(reader),
            opacity: (0, psdReader_1.readUint16)(reader) / 0xff,
        };
        return [2 /*return*/];
    });
}); }, function (writer, target) {
    var _a;
    (0, psdWriter_1.writeColor)(writer, target.filterMask.colorSpace);
    (0, psdWriter_1.writeUint16)(writer, (0, helpers_1.clamp)((_a = target.filterMask.opacity) !== null && _a !== void 0 ? _a : 1, 0, 1) * 0xff);
});
addHandler("artd", // document-wide artboard info
function (target) { return target.artboards !== undefined; }, function (reader, target, left) { return __awaiter(void 0, void 0, void 0, function () {
    var desc, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                desc = (0, descriptor_1.readVersionAndDescriptor)(reader);
                target.artboards = {
                    count: desc["Cnt "],
                    autoExpandOffset: {
                        horizontal: desc.autoExpandOffset.Hrzn,
                        vertical: desc.autoExpandOffset.Vrtc,
                    },
                    origin: { horizontal: desc.origin.Hrzn, vertical: desc.origin.Vrtc },
                    autoExpandEnabled: desc.autoExpandEnabled,
                    autoNestEnabled: desc.autoNestEnabled,
                    autoPositionEnabled: desc.autoPositionEnabled,
                    shrinkwrapOnSaveEnabled: !!desc.shrinkwrapOnSaveEnabled,
                    docDefaultNewArtboardBackgroundColor: (0, descriptor_1.parseColor)(desc.docDefaultNewArtboardBackgroundColor),
                    docDefaultNewArtboardBackgroundType: desc.docDefaultNewArtboardBackgroundType,
                };
                _a = psdReader_1.skipBytes;
                _b = [reader];
                return [4 /*yield*/, left()];
            case 1:
                _a.apply(void 0, _b.concat([_c.sent()]));
                return [2 /*return*/];
        }
    });
}); }, function (writer, target) {
    var _a, _b, _c, _d, _e;
    var artb = target.artboards;
    var desc = {
        "Cnt ": artb.count,
        autoExpandOffset: artb.autoExpandOffset
            ? {
                Hrzn: artb.autoExpandOffset.horizontal,
                Vrtc: artb.autoExpandOffset.vertical,
            }
            : { Hrzn: 0, Vrtc: 0 },
        origin: artb.origin
            ? { Hrzn: artb.origin.horizontal, Vrtc: artb.origin.vertical }
            : { Hrzn: 0, Vrtc: 0 },
        autoExpandEnabled: (_a = artb.autoExpandEnabled) !== null && _a !== void 0 ? _a : true,
        autoNestEnabled: (_b = artb.autoNestEnabled) !== null && _b !== void 0 ? _b : true,
        autoPositionEnabled: (_c = artb.autoPositionEnabled) !== null && _c !== void 0 ? _c : true,
        shrinkwrapOnSaveEnabled: (_d = artb.shrinkwrapOnSaveEnabled) !== null && _d !== void 0 ? _d : true,
        docDefaultNewArtboardBackgroundColor: (0, descriptor_1.serializeColor)(artb.docDefaultNewArtboardBackgroundColor),
        docDefaultNewArtboardBackgroundType: (_e = artb.docDefaultNewArtboardBackgroundType) !== null && _e !== void 0 ? _e : 1,
    };
    (0, descriptor_1.writeVersionAndDescriptor)(writer, "", "null", desc, "artd");
});
function hasMultiEffects(effects) {
    return Object.keys(effects)
        .map(function (key) { return effects[key]; })
        .some(function (v) { return Array.isArray(v) && v.length > 1; });
}
exports.hasMultiEffects = hasMultiEffects;
addHandler("lfx2", function (target) { return target.effects !== undefined && !hasMultiEffects(target.effects); }, function (reader, target, left, _, options) { return __awaiter(void 0, void 0, void 0, function () {
    var version, desc, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                version = (0, psdReader_1.readUint32)(reader);
                if (version !== 0)
                    throw new Error("Invalid lfx2 version");
                desc = (0, descriptor_1.readVersionAndDescriptor)(reader);
                // console.log('READ', require('util').inspect(desc, false, 99, true));
                // TODO: don't discard if we got it from lmfx
                // discard if read in 'lrFX' section
                target.effects = (0, descriptor_1.parseEffects)(desc, !!options.logMissingFeatures);
                _a = psdReader_1.skipBytes;
                _b = [reader];
                return [4 /*yield*/, left()];
            case 1:
                _a.apply(void 0, _b.concat([_c.sent()]));
                return [2 /*return*/];
        }
    });
}); }, function (writer, target, _, options) {
    var desc = (0, descriptor_1.serializeEffects)(target.effects, !!options.logMissingFeatures, true);
    // console.log('WRITE', require('util').inspect(desc, false, 99, true));
    (0, psdWriter_1.writeUint32)(writer, 0); // version
    (0, descriptor_1.writeVersionAndDescriptor)(writer, "", "null", desc);
});
addHandler("cinf", hasKey("compositorUsed"), function (reader, target, left) { return __awaiter(void 0, void 0, void 0, function () {
    // console.log(require('util').inspect(desc, false, 99, true));
    function enumValue(desc) {
        return desc.split(".")[1];
    }
    var desc, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                desc = (0, descriptor_1.readVersionAndDescriptor)(reader);
                target.compositorUsed = {
                    description: desc.description,
                    reason: desc.reason,
                    engine: enumValue(desc.Engn),
                };
                if (desc.enableCompCore)
                    target.compositorUsed.enableCompCore = enumValue(desc.enableCompCore);
                if (desc.enableCompCoreGPU)
                    target.compositorUsed.enableCompCoreGPU = enumValue(desc.enableCompCoreGPU);
                if (desc.compCoreSupport)
                    target.compositorUsed.compCoreSupport = enumValue(desc.compCoreSupport);
                if (desc.compCoreGPUSupport)
                    target.compositorUsed.compCoreGPUSupport = enumValue(desc.compCoreGPUSupport);
                _a = psdReader_1.skipBytes;
                _b = [reader];
                return [4 /*yield*/, left()];
            case 1:
                _a.apply(void 0, _b.concat([_c.sent()]));
                return [2 /*return*/];
        }
    });
}); }, function (writer, target) {
    var cinf = target.compositorUsed;
    var desc = {
        Vrsn: { major: 1, minor: 0, fix: 0 },
        // psVersion: { major: 22, minor: 3, fix: 1 }, // TESTING
        description: cinf.description,
        reason: cinf.reason,
        Engn: "Engn.".concat(cinf.engine),
    };
    if (cinf.enableCompCore)
        desc.enableCompCore = "enable.".concat(cinf.enableCompCore);
    if (cinf.enableCompCoreGPU)
        desc.enableCompCoreGPU = "enable.".concat(cinf.enableCompCoreGPU);
    // desc.enableCompCoreThreads = `enable.feature`; // TESTING
    if (cinf.compCoreSupport)
        desc.compCoreSupport = "reason.".concat(cinf.compCoreSupport);
    if (cinf.compCoreGPUSupport)
        desc.compCoreGPUSupport = "reason.".concat(cinf.compCoreGPUSupport);
    (0, descriptor_1.writeVersionAndDescriptor)(writer, "", "null", desc);
});
// extension settings ?, ignore it
addHandler("extn", function (target) { return target._extn !== undefined; }, function (reader, target) { return __awaiter(void 0, void 0, void 0, function () {
    var desc;
    return __generator(this, function (_a) {
        desc = (0, descriptor_1.readVersionAndDescriptor)(reader);
        // console.log(require('util').inspect(desc, false, 99, true));
        if (helpers_1.MOCK_HANDLERS)
            target._extn = desc;
        return [2 /*return*/];
    });
}); }, function (writer, target) {
    // TODO: need to add correct types for desc fields (resources/src.psd)
    if (helpers_1.MOCK_HANDLERS)
        (0, descriptor_1.writeVersionAndDescriptor)(writer, "", "null", target._extn);
});
addHandler("iOpa", hasKey("fillOpacity"), function (reader, target) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        target.fillOpacity = (0, psdReader_1.readUint8)(reader) / 0xff;
        (0, psdReader_1.skipBytes)(reader, 3);
        return [2 /*return*/];
    });
}); }, function (writer, target) {
    (0, psdWriter_1.writeUint8)(writer, target.fillOpacity * 0xff);
    (0, psdWriter_1.writeZeros)(writer, 3);
});
addHandler("brst", hasKey("channelBlendingRestrictions"), function (reader, target, left) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                target.channelBlendingRestrictions = [];
                _a.label = 1;
            case 1: return [4 /*yield*/, left()];
            case 2:
                if (!((_a.sent()) > 4)) return [3 /*break*/, 3];
                target.channelBlendingRestrictions.push((0, psdReader_1.readInt32)(reader));
                return [3 /*break*/, 1];
            case 3: return [2 /*return*/];
        }
    });
}); }, function (writer, target) {
    for (var _i = 0, _a = target.channelBlendingRestrictions; _i < _a.length; _i++) {
        var channel = _a[_i];
        (0, psdWriter_1.writeInt32)(writer, channel);
    }
});
addHandler("tsly", hasKey("transparencyShapesLayer"), function (reader, target) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        target.transparencyShapesLayer = !!(0, psdReader_1.readUint8)(reader);
        (0, psdReader_1.skipBytes)(reader, 3);
        return [2 /*return*/];
    });
}); }, function (writer, target) {
    (0, psdWriter_1.writeUint8)(writer, target.transparencyShapesLayer ? 1 : 0);
    (0, psdWriter_1.writeZeros)(writer, 3);
});
//# sourceMappingURL=additionalInfo.js.map