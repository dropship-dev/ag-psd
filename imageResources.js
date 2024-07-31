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
exports.resourceHandlersMap = exports.resourceHandlers = void 0;
var base64_js_1 = require("base64-js");
var psdReader_1 = require("./psdReader");
var psdWriter_1 = require("./psdWriter");
var helpers_1 = require("./helpers");
var utf8_1 = require("./utf8");
var descriptor_1 = require("./descriptor");
exports.resourceHandlers = [];
exports.resourceHandlersMap = {};
function addHandler(key, has, read, write) {
    var handler = { key: key, has: has, read: read, write: write };
    exports.resourceHandlers.push(handler);
    exports.resourceHandlersMap[handler.key] = handler;
}
var LOG_MOCK_HANDLERS = false;
var RESOLUTION_UNITS = [undefined, "PPI", "PPCM"];
var MEASUREMENT_UNITS = [
    undefined,
    "Inches",
    "Centimeters",
    "Points",
    "Picas",
    "Columns",
];
var hex = "0123456789abcdef";
function charToNibble(code) {
    return code <= 57 ? code - 48 : code - 87;
}
function byteAt(value, index) {
    return ((charToNibble(value.charCodeAt(index)) << 4) |
        charToNibble(value.charCodeAt(index + 1)));
}
function readUtf8String(reader, length) {
    var buffer = (0, psdReader_1.readBytes)(reader, length);
    return (0, utf8_1.decodeString)(buffer);
}
function writeUtf8String(writer, value) {
    var buffer = (0, utf8_1.encodeString)(value);
    (0, psdWriter_1.writeBytes)(writer, buffer);
}
helpers_1.MOCK_HANDLERS &&
    addHandler(1028, // IPTC-NAA record
    function (target) { return target._ir1028 !== undefined; }, function (reader, target, left) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    _a = LOG_MOCK_HANDLERS;
                    if (!_a) return [3 /*break*/, 2];
                    _c = (_b = console).log;
                    _d = ["image resource 1028"];
                    return [4 /*yield*/, left()];
                case 1:
                    _a = _c.apply(_b, _d.concat([_h.sent()]));
                    _h.label = 2;
                case 2:
                    _a;
                    _e = target;
                    _f = psdReader_1.readBytes;
                    _g = [reader];
                    return [4 /*yield*/, left()];
                case 3:
                    _e._ir1028 = _f.apply(void 0, _g.concat([_h.sent()]));
                    return [2 /*return*/];
            }
        });
    }); }, function (writer, target) {
        (0, psdWriter_1.writeBytes)(writer, target._ir1028);
    });
addHandler(1061, function (target) { return target.captionDigest !== undefined; }, function (reader, target) { return __awaiter(void 0, void 0, void 0, function () {
    var captionDigest, i, byte;
    return __generator(this, function (_a) {
        captionDigest = "";
        for (i = 0; i < 16; i++) {
            byte = (0, psdReader_1.readUint8)(reader);
            captionDigest += hex[byte >> 4];
            captionDigest += hex[byte & 0xf];
        }
        target.captionDigest = captionDigest;
        return [2 /*return*/];
    });
}); }, function (writer, target) {
    for (var i = 0; i < 16; i++) {
        (0, psdWriter_1.writeUint8)(writer, byteAt(target.captionDigest, i * 2));
    }
});
addHandler(1060, function (target) { return target.xmpMetadata !== undefined; }, function (reader, target, left) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = target;
                _b = readUtf8String;
                _c = [reader];
                return [4 /*yield*/, left()];
            case 1:
                _a.xmpMetadata = _b.apply(void 0, _c.concat([_d.sent()]));
                return [2 /*return*/];
        }
    });
}); }, function (writer, target) {
    writeUtf8String(writer, target.xmpMetadata);
});
var Inte = (0, helpers_1.createEnum)("Inte", "perceptual", {
    perceptual: "Img ",
    saturation: "Grp ",
    "relative colorimetric": "Clrm",
    "absolute colorimetric": "AClr",
});
addHandler(1082, function (target) { return target.printInformation !== undefined; }, function (reader, target) { return __awaiter(void 0, void 0, void 0, function () {
    var desc, info;
    var _a, _b;
    return __generator(this, function (_c) {
        desc = (0, descriptor_1.readVersionAndDescriptor)(reader);
        target.printInformation = {
            printerName: desc.printerName || "",
            renderingIntent: Inte.decode((_a = desc.Inte) !== null && _a !== void 0 ? _a : "Inte.Img "),
        };
        info = target.printInformation;
        if (desc.PstS !== undefined)
            info.printerManagesColors = desc.PstS;
        if (desc["Nm  "] !== undefined)
            info.printerProfile = desc["Nm  "];
        if (desc.MpBl !== undefined)
            info.blackPointCompensation = desc.MpBl;
        if (desc.printSixteenBit !== undefined)
            info.printSixteenBit = desc.printSixteenBit;
        if (desc.hardProof !== undefined)
            info.hardProof = desc.hardProof;
        if (desc.printProofSetup) {
            if ("Bltn" in desc.printProofSetup) {
                info.proofSetup = { builtin: desc.printProofSetup.Bltn.split(".")[1] };
            }
            else {
                info.proofSetup = {
                    profile: desc.printProofSetup.profile,
                    renderingIntent: Inte.decode((_b = desc.printProofSetup.Inte) !== null && _b !== void 0 ? _b : "Inte.Img "),
                    blackPointCompensation: !!desc.printProofSetup.MpBl,
                    paperWhite: !!desc.printProofSetup.paperWhite,
                };
            }
        }
        return [2 /*return*/];
    });
}); }, function (writer, target) {
    var _a, _b;
    var info = target.printInformation;
    var desc = {};
    if (info.printerManagesColors) {
        desc.PstS = true;
    }
    else {
        if (info.hardProof !== undefined)
            desc.hardProof = !!info.hardProof;
        desc.ClrS = "ClrS.RGBC"; // TODO: ???
        desc["Nm  "] = (_a = info.printerProfile) !== null && _a !== void 0 ? _a : "CIE RGB";
    }
    desc.Inte = Inte.encode(info.renderingIntent);
    if (!info.printerManagesColors)
        desc.MpBl = !!info.blackPointCompensation;
    desc.printSixteenBit = !!info.printSixteenBit;
    desc.printerName = info.printerName || "";
    if (info.proofSetup && "profile" in info.proofSetup) {
        desc.printProofSetup = {
            profile: info.proofSetup.profile || "",
            Inte: Inte.encode(info.proofSetup.renderingIntent),
            MpBl: !!info.proofSetup.blackPointCompensation,
            paperWhite: !!info.proofSetup.paperWhite,
        };
    }
    else {
        desc.printProofSetup = {
            Bltn: ((_b = info.proofSetup) === null || _b === void 0 ? void 0 : _b.builtin)
                ? "builtinProof.".concat(info.proofSetup.builtin)
                : "builtinProof.proofCMYK",
        };
    }
    (0, descriptor_1.writeVersionAndDescriptor)(writer, "", "printOutput", desc);
});
helpers_1.MOCK_HANDLERS &&
    addHandler(1083, // Print style
    function (target) { return target._ir1083 !== undefined; }, function (reader, target, left) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    _a = LOG_MOCK_HANDLERS;
                    if (!_a) return [3 /*break*/, 2];
                    _c = (_b = console).log;
                    _d = ["image resource 1083"];
                    return [4 /*yield*/, left()];
                case 1:
                    _a = _c.apply(_b, _d.concat([_h.sent()]));
                    _h.label = 2;
                case 2:
                    _a;
                    _e = target;
                    _f = psdReader_1.readBytes;
                    _g = [reader];
                    return [4 /*yield*/, left()];
                case 3:
                    _e._ir1083 = _f.apply(void 0, _g.concat([_h.sent()]));
                    return [2 /*return*/];
            }
        });
    }); }, function (writer, target) {
        (0, psdWriter_1.writeBytes)(writer, target._ir1083);
    });
addHandler(1005, function (target) { return target.resolutionInfo !== undefined; }, function (reader, target) { return __awaiter(void 0, void 0, void 0, function () {
    var horizontalResolution, horizontalResolutionUnit, widthUnit, verticalResolution, verticalResolutionUnit, heightUnit;
    return __generator(this, function (_a) {
        horizontalResolution = (0, psdReader_1.readFixedPoint32)(reader);
        horizontalResolutionUnit = (0, psdReader_1.readUint16)(reader);
        widthUnit = (0, psdReader_1.readUint16)(reader);
        verticalResolution = (0, psdReader_1.readFixedPoint32)(reader);
        verticalResolutionUnit = (0, psdReader_1.readUint16)(reader);
        heightUnit = (0, psdReader_1.readUint16)(reader);
        target.resolutionInfo = {
            horizontalResolution: horizontalResolution,
            horizontalResolutionUnit: RESOLUTION_UNITS[horizontalResolutionUnit] || "PPI",
            widthUnit: MEASUREMENT_UNITS[widthUnit] || "Inches",
            verticalResolution: verticalResolution,
            verticalResolutionUnit: RESOLUTION_UNITS[verticalResolutionUnit] || "PPI",
            heightUnit: MEASUREMENT_UNITS[heightUnit] || "Inches",
        };
        return [2 /*return*/];
    });
}); }, function (writer, target) {
    var info = target.resolutionInfo;
    (0, psdWriter_1.writeFixedPoint32)(writer, info.horizontalResolution || 0);
    (0, psdWriter_1.writeUint16)(writer, Math.max(1, RESOLUTION_UNITS.indexOf(info.horizontalResolutionUnit)));
    (0, psdWriter_1.writeUint16)(writer, Math.max(1, MEASUREMENT_UNITS.indexOf(info.widthUnit)));
    (0, psdWriter_1.writeFixedPoint32)(writer, info.verticalResolution || 0);
    (0, psdWriter_1.writeUint16)(writer, Math.max(1, RESOLUTION_UNITS.indexOf(info.verticalResolutionUnit)));
    (0, psdWriter_1.writeUint16)(writer, Math.max(1, MEASUREMENT_UNITS.indexOf(info.heightUnit)));
});
var printScaleStyles = ["centered", "size to fit", "user defined"];
addHandler(1062, function (target) { return target.printScale !== undefined; }, function (reader, target) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        target.printScale = {
            style: printScaleStyles[(0, psdReader_1.readInt16)(reader)],
            x: (0, psdReader_1.readFloat32)(reader),
            y: (0, psdReader_1.readFloat32)(reader),
            scale: (0, psdReader_1.readFloat32)(reader),
        };
        return [2 /*return*/];
    });
}); }, function (writer, target) {
    var _a = target.printScale, style = _a.style, x = _a.x, y = _a.y, scale = _a.scale;
    (0, psdWriter_1.writeInt16)(writer, Math.max(0, printScaleStyles.indexOf(style)));
    (0, psdWriter_1.writeFloat32)(writer, x || 0);
    (0, psdWriter_1.writeFloat32)(writer, y || 0);
    (0, psdWriter_1.writeFloat32)(writer, scale || 0);
});
addHandler(1006, function (target) { return target.alphaChannelNames !== undefined; }, function (reader, target, left) { return __awaiter(void 0, void 0, void 0, function () {
    var value;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                target.alphaChannelNames = [];
                _a.label = 1;
            case 1: return [4 /*yield*/, left()];
            case 2:
                if (!((_a.sent()) > 0)) return [3 /*break*/, 3];
                value = (0, psdReader_1.readPascalString)(reader, 1);
                target.alphaChannelNames.push(value);
                return [3 /*break*/, 1];
            case 3: return [2 /*return*/];
        }
    });
}); }, function (writer, target) {
    for (var _i = 0, _a = target.alphaChannelNames; _i < _a.length; _i++) {
        var name_1 = _a[_i];
        (0, psdWriter_1.writePascalString)(writer, name_1, 1);
    }
});
addHandler(1045, function (target) { return target.alphaChannelNames !== undefined; }, function (reader, target, left) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                target.alphaChannelNames = [];
                _a.label = 1;
            case 1: return [4 /*yield*/, left()];
            case 2:
                if (!((_a.sent()) > 0)) return [3 /*break*/, 3];
                target.alphaChannelNames.push((0, psdReader_1.readUnicodeString)(reader));
                return [3 /*break*/, 1];
            case 3: return [2 /*return*/];
        }
    });
}); }, function (writer, target) {
    for (var _i = 0, _a = target.alphaChannelNames; _i < _a.length; _i++) {
        var name_2 = _a[_i];
        (0, psdWriter_1.writeUnicodeStringWithPadding)(writer, name_2);
    }
});
helpers_1.MOCK_HANDLERS &&
    addHandler(1077, function (target) { return target._ir1077 !== undefined; }, function (reader, target, left) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    _a = LOG_MOCK_HANDLERS;
                    if (!_a) return [3 /*break*/, 2];
                    _c = (_b = console).log;
                    _d = ["image resource 1077"];
                    return [4 /*yield*/, left()];
                case 1:
                    _a = _c.apply(_b, _d.concat([_h.sent()]));
                    _h.label = 2;
                case 2:
                    _a;
                    _e = target;
                    _f = psdReader_1.readBytes;
                    _g = [reader];
                    return [4 /*yield*/, left()];
                case 3:
                    _e._ir1077 = _f.apply(void 0, _g.concat([_h.sent()]));
                    return [2 /*return*/];
            }
        });
    }); }, function (writer, target) {
        (0, psdWriter_1.writeBytes)(writer, target._ir1077);
    });
addHandler(1053, function (target) { return target.alphaIdentifiers !== undefined; }, function (reader, target, left) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                target.alphaIdentifiers = [];
                _a.label = 1;
            case 1: return [4 /*yield*/, left()];
            case 2:
                if (!((_a.sent()) >= 4)) return [3 /*break*/, 3];
                target.alphaIdentifiers.push((0, psdReader_1.readUint32)(reader));
                return [3 /*break*/, 1];
            case 3: return [2 /*return*/];
        }
    });
}); }, function (writer, target) {
    for (var _i = 0, _a = target.alphaIdentifiers; _i < _a.length; _i++) {
        var id = _a[_i];
        (0, psdWriter_1.writeUint32)(writer, id);
    }
});
addHandler(1010, function (target) { return target.backgroundColor !== undefined; }, function (reader, target) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        target.backgroundColor = (0, psdReader_1.readColor)(reader);
        return [2 /*return*/];
    });
}); }, function (writer, target) { return (0, psdWriter_1.writeColor)(writer, target.backgroundColor); });
addHandler(1037, function (target) { return target.globalAngle !== undefined; }, function (reader, target) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        target.globalAngle = (0, psdReader_1.readInt32)(reader);
        return [2 /*return*/];
    });
}); }, function (writer, target) { return (0, psdWriter_1.writeInt32)(writer, target.globalAngle); });
addHandler(1049, function (target) { return target.globalAltitude !== undefined; }, function (reader, target) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        target.globalAltitude = (0, psdReader_1.readUint32)(reader);
        return [2 /*return*/];
    });
}); }, function (writer, target) { return (0, psdWriter_1.writeUint32)(writer, target.globalAltitude); });
addHandler(1011, function (target) { return target.printFlags !== undefined; }, function (reader, target) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        target.printFlags = {
            labels: !!(0, psdReader_1.readUint8)(reader),
            cropMarks: !!(0, psdReader_1.readUint8)(reader),
            colorBars: !!(0, psdReader_1.readUint8)(reader),
            registrationMarks: !!(0, psdReader_1.readUint8)(reader),
            negative: !!(0, psdReader_1.readUint8)(reader),
            flip: !!(0, psdReader_1.readUint8)(reader),
            interpolate: !!(0, psdReader_1.readUint8)(reader),
            caption: !!(0, psdReader_1.readUint8)(reader),
            printFlags: !!(0, psdReader_1.readUint8)(reader),
        };
        return [2 /*return*/];
    });
}); }, function (writer, target) {
    var flags = target.printFlags;
    (0, psdWriter_1.writeUint8)(writer, flags.labels ? 1 : 0);
    (0, psdWriter_1.writeUint8)(writer, flags.cropMarks ? 1 : 0);
    (0, psdWriter_1.writeUint8)(writer, flags.colorBars ? 1 : 0);
    (0, psdWriter_1.writeUint8)(writer, flags.registrationMarks ? 1 : 0);
    (0, psdWriter_1.writeUint8)(writer, flags.negative ? 1 : 0);
    (0, psdWriter_1.writeUint8)(writer, flags.flip ? 1 : 0);
    (0, psdWriter_1.writeUint8)(writer, flags.interpolate ? 1 : 0);
    (0, psdWriter_1.writeUint8)(writer, flags.caption ? 1 : 0);
    (0, psdWriter_1.writeUint8)(writer, flags.printFlags ? 1 : 0);
});
helpers_1.MOCK_HANDLERS &&
    addHandler(10000, // Print flags
    function (target) { return target._ir10000 !== undefined; }, function (reader, target, left) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    _a = LOG_MOCK_HANDLERS;
                    if (!_a) return [3 /*break*/, 2];
                    _c = (_b = console).log;
                    _d = ["image resource 10000"];
                    return [4 /*yield*/, left()];
                case 1:
                    _a = _c.apply(_b, _d.concat([_h.sent()]));
                    _h.label = 2;
                case 2:
                    _a;
                    _e = target;
                    _f = psdReader_1.readBytes;
                    _g = [reader];
                    return [4 /*yield*/, left()];
                case 3:
                    _e._ir10000 = _f.apply(void 0, _g.concat([_h.sent()]));
                    return [2 /*return*/];
            }
        });
    }); }, function (writer, target) {
        (0, psdWriter_1.writeBytes)(writer, target._ir10000);
    });
helpers_1.MOCK_HANDLERS &&
    addHandler(1013, // Color halftoning
    function (target) { return target._ir1013 !== undefined; }, function (reader, target, left) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    _a = LOG_MOCK_HANDLERS;
                    if (!_a) return [3 /*break*/, 2];
                    _c = (_b = console).log;
                    _d = ["image resource 1013"];
                    return [4 /*yield*/, left()];
                case 1:
                    _a = _c.apply(_b, _d.concat([_h.sent()]));
                    _h.label = 2;
                case 2:
                    _a;
                    _e = target;
                    _f = psdReader_1.readBytes;
                    _g = [reader];
                    return [4 /*yield*/, left()];
                case 3:
                    _e._ir1013 = _f.apply(void 0, _g.concat([_h.sent()]));
                    return [2 /*return*/];
            }
        });
    }); }, function (writer, target) {
        (0, psdWriter_1.writeBytes)(writer, target._ir1013);
    });
helpers_1.MOCK_HANDLERS &&
    addHandler(1016, // Color transfer functions
    function (target) { return target._ir1016 !== undefined; }, function (reader, target, left) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    _a = LOG_MOCK_HANDLERS;
                    if (!_a) return [3 /*break*/, 2];
                    _c = (_b = console).log;
                    _d = ["image resource 1016"];
                    return [4 /*yield*/, left()];
                case 1:
                    _a = _c.apply(_b, _d.concat([_h.sent()]));
                    _h.label = 2;
                case 2:
                    _a;
                    _e = target;
                    _f = psdReader_1.readBytes;
                    _g = [reader];
                    return [4 /*yield*/, left()];
                case 3:
                    _e._ir1016 = _f.apply(void 0, _g.concat([_h.sent()]));
                    return [2 /*return*/];
            }
        });
    }); }, function (writer, target) {
        (0, psdWriter_1.writeBytes)(writer, target._ir1016);
    });
addHandler(1080, // Count Information
function (target) { return target.countInformation !== undefined; }, function (reader, target) { return __awaiter(void 0, void 0, void 0, function () {
    var desc;
    return __generator(this, function (_a) {
        desc = (0, descriptor_1.readVersionAndDescriptor)(reader);
        target.countInformation = desc.countGroupList.map(function (g) { return ({
            color: { r: g["Rd  "], g: g["Grn "], b: g["Bl  "] },
            name: g["Nm  "],
            size: g["Rds "],
            fontSize: g.fontSize,
            visible: g.Vsbl,
            points: g.countObjectList.map(function (p) { return ({ x: p["X   "], y: p["Y   "] }); }),
        }); });
        return [2 /*return*/];
    });
}); }, function (writer, target) {
    var desc = {
        Vrsn: 1,
        countGroupList: target.countInformation.map(function (g) { return ({
            "Rd  ": g.color.r,
            "Grn ": g.color.g,
            "Bl  ": g.color.b,
            "Nm  ": g.name,
            "Rds ": g.size,
            fontSize: g.fontSize,
            Vsbl: g.visible,
            countObjectList: g.points.map(function (p) { return ({ "X   ": p.x, "Y   ": p.y }); }),
        }); }),
    };
    (0, descriptor_1.writeVersionAndDescriptor)(writer, "", "Cnt ", desc);
});
addHandler(1024, function (target) { return target.layerState !== undefined; }, function (reader, target) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        target.layerState = (0, psdReader_1.readUint16)(reader);
        return [2 /*return*/];
    });
}); }, function (writer, target) { return (0, psdWriter_1.writeUint16)(writer, target.layerState); });
addHandler(1026, function (target) { return target.layersGroup !== undefined; }, function (reader, target, left) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                target.layersGroup = [];
                _a.label = 1;
            case 1: return [4 /*yield*/, left()];
            case 2:
                if (!((_a.sent()) > 0)) return [3 /*break*/, 3];
                target.layersGroup.push((0, psdReader_1.readUint16)(reader));
                return [3 /*break*/, 1];
            case 3: return [2 /*return*/];
        }
    });
}); }, function (writer, target) {
    for (var _i = 0, _a = target.layersGroup; _i < _a.length; _i++) {
        var g = _a[_i];
        (0, psdWriter_1.writeUint16)(writer, g);
    }
});
addHandler(1072, function (target) { return target.layerGroupsEnabledId !== undefined; }, function (reader, target, left) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                target.layerGroupsEnabledId = [];
                _a.label = 1;
            case 1: return [4 /*yield*/, left()];
            case 2:
                if (!((_a.sent()) > 0)) return [3 /*break*/, 3];
                target.layerGroupsEnabledId.push((0, psdReader_1.readUint8)(reader));
                return [3 /*break*/, 1];
            case 3: return [2 /*return*/];
        }
    });
}); }, function (writer, target) {
    for (var _i = 0, _a = target.layerGroupsEnabledId; _i < _a.length; _i++) {
        var id = _a[_i];
        (0, psdWriter_1.writeUint8)(writer, id);
    }
});
addHandler(1069, function (target) { return target.layerSelectionIds !== undefined; }, function (reader, target) { return __awaiter(void 0, void 0, void 0, function () {
    var count;
    return __generator(this, function (_a) {
        count = (0, psdReader_1.readUint16)(reader);
        target.layerSelectionIds = [];
        while (count--) {
            target.layerSelectionIds.push((0, psdReader_1.readUint32)(reader));
        }
        return [2 /*return*/];
    });
}); }, function (writer, target) {
    (0, psdWriter_1.writeUint16)(writer, target.layerSelectionIds.length);
    for (var _i = 0, _a = target.layerSelectionIds; _i < _a.length; _i++) {
        var id = _a[_i];
        (0, psdWriter_1.writeUint32)(writer, id);
    }
});
addHandler(1032, function (target) { return target.gridAndGuidesInformation !== undefined; }, function (reader, target) { return __awaiter(void 0, void 0, void 0, function () {
    var version, horizontal, vertical, count, i;
    return __generator(this, function (_a) {
        version = (0, psdReader_1.readUint32)(reader);
        horizontal = (0, psdReader_1.readUint32)(reader);
        vertical = (0, psdReader_1.readUint32)(reader);
        count = (0, psdReader_1.readUint32)(reader);
        if (version !== 1)
            throw new Error("Invalid 1032 resource version: ".concat(version));
        target.gridAndGuidesInformation = {
            grid: { horizontal: horizontal, vertical: vertical },
            guides: [],
        };
        for (i = 0; i < count; i++) {
            target.gridAndGuidesInformation.guides.push({
                location: (0, psdReader_1.readUint32)(reader) / 32,
                direction: (0, psdReader_1.readUint8)(reader) ? "horizontal" : "vertical",
            });
        }
        return [2 /*return*/];
    });
}); }, function (writer, target) {
    var info = target.gridAndGuidesInformation;
    var grid = info.grid || { horizontal: 18 * 32, vertical: 18 * 32 };
    var guides = info.guides || [];
    (0, psdWriter_1.writeUint32)(writer, 1);
    (0, psdWriter_1.writeUint32)(writer, grid.horizontal);
    (0, psdWriter_1.writeUint32)(writer, grid.vertical);
    (0, psdWriter_1.writeUint32)(writer, guides.length);
    for (var _i = 0, guides_1 = guides; _i < guides_1.length; _i++) {
        var g = guides_1[_i];
        (0, psdWriter_1.writeUint32)(writer, g.location * 32);
        (0, psdWriter_1.writeUint8)(writer, g.direction === "horizontal" ? 1 : 0);
    }
});
addHandler(1065, // Layer Comps
function (target) { return target.layerComps !== undefined; }, function (reader, target) { return __awaiter(void 0, void 0, void 0, function () {
    var desc, _i, _a, item;
    return __generator(this, function (_b) {
        desc = (0, descriptor_1.readVersionAndDescriptor)(reader, true);
        // console.log('CompList', require('util').inspect(desc, false, 99, true));
        target.layerComps = { list: [] };
        for (_i = 0, _a = desc.list; _i < _a.length; _i++) {
            item = _a[_i];
            target.layerComps.list.push({
                id: item.compID,
                name: item["Nm  "],
                capturedInfo: item.capturedInfo,
            });
            if ("comment" in item)
                target.layerComps.list[target.layerComps.list.length - 1].comment =
                    item.comment;
        }
        if ("lastAppliedComp" in desc)
            target.layerComps.lastApplied = desc.lastAppliedComp;
        return [2 /*return*/];
    });
}); }, function (writer, target) {
    var layerComps = target.layerComps;
    var desc = { list: [] };
    for (var _i = 0, _a = layerComps.list; _i < _a.length; _i++) {
        var item = _a[_i];
        var t = {};
        t._classID = "Comp";
        t["Nm  "] = item.name;
        if ("comment" in item)
            t.comment = item.comment;
        t.compID = item.id;
        t.capturedInfo = item.capturedInfo;
        desc.list.push(t);
    }
    if ("lastApplied" in layerComps)
        desc.lastAppliedComp = layerComps.lastApplied;
    // console.log('CompList', require('util').inspect(desc, false, 99, true));
    (0, descriptor_1.writeVersionAndDescriptor)(writer, "", "CompList", desc);
});
helpers_1.MOCK_HANDLERS &&
    addHandler(1092, // ???
    function (target) { return target._ir1092 !== undefined; }, function (reader, target, left) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    _a = LOG_MOCK_HANDLERS;
                    if (!_a) return [3 /*break*/, 2];
                    _c = (_b = console).log;
                    _d = ["image resource 1092"];
                    return [4 /*yield*/, left()];
                case 1:
                    _a = _c.apply(_b, _d.concat([_h.sent()]));
                    _h.label = 2;
                case 2:
                    _a;
                    // 16 bytes, seems to be 4 integers
                    _e = target;
                    _f = psdReader_1.readBytes;
                    _g = [reader];
                    return [4 /*yield*/, left()];
                case 3:
                    // 16 bytes, seems to be 4 integers
                    _e._ir1092 = _f.apply(void 0, _g.concat([_h.sent()]));
                    return [2 /*return*/];
            }
        });
    }); }, function (writer, target) {
        (0, psdWriter_1.writeBytes)(writer, target._ir1092);
    });
// 0 - normal, 7 - multiply, 8 - screen, 23 - difference
var onionSkinsBlendModes = [
    "normal",
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    "multiply",
    "screen",
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    "difference",
];
addHandler(1078, // Onion Skins
function (target) { return target.onionSkins !== undefined; }, function (reader, target) { return __awaiter(void 0, void 0, void 0, function () {
    var desc;
    return __generator(this, function (_a) {
        desc = (0, descriptor_1.readVersionAndDescriptor)(reader);
        // console.log('1078', require('util').inspect(desc, false, 99, true));
        target.onionSkins = {
            enabled: desc.enab,
            framesBefore: desc.numBefore,
            framesAfter: desc.numAfter,
            frameSpacing: desc.Spcn,
            minOpacity: desc.minOpacity / 100,
            maxOpacity: desc.maxOpacity / 100,
            blendMode: onionSkinsBlendModes[desc.BlnM] || "normal",
        };
        return [2 /*return*/];
    });
}); }, function (writer, target) {
    var onionSkins = target.onionSkins;
    var desc = {
        Vrsn: 1,
        enab: onionSkins.enabled,
        numBefore: onionSkins.framesBefore,
        numAfter: onionSkins.framesAfter,
        Spcn: onionSkins.frameSpacing,
        minOpacity: (onionSkins.minOpacity * 100) | 0,
        maxOpacity: (onionSkins.maxOpacity * 100) | 0,
        BlnM: Math.max(0, onionSkinsBlendModes.indexOf(onionSkins.blendMode)),
    };
    (0, descriptor_1.writeVersionAndDescriptor)(writer, "", "null", desc);
});
addHandler(1075, // Timeline Information
function (target) { return target.timelineInformation !== undefined; }, function (reader, target, _, options) { return __awaiter(void 0, void 0, void 0, function () {
    var desc;
    var _a, _b;
    return __generator(this, function (_c) {
        desc = (0, descriptor_1.readVersionAndDescriptor)(reader);
        target.timelineInformation = {
            enabled: desc.enab,
            frameStep: (0, descriptor_1.frac)(desc.frameStep),
            frameRate: desc.frameRate,
            time: (0, descriptor_1.frac)(desc.time),
            duration: (0, descriptor_1.frac)(desc.duration),
            workInTime: (0, descriptor_1.frac)(desc.workInTime),
            workOutTime: (0, descriptor_1.frac)(desc.workOutTime),
            repeats: desc.LCnt,
            hasMotion: desc.hasMotion,
            globalTracks: (0, descriptor_1.parseTrackList)(desc.globalTrackList, !!options.logMissingFeatures),
        };
        if ((_b = (_a = desc.audioClipGroupList) === null || _a === void 0 ? void 0 : _a.audioClipGroupList) === null || _b === void 0 ? void 0 : _b.length) {
            target.timelineInformation.audioClipGroups =
                desc.audioClipGroupList.audioClipGroupList.map(function (g) { return ({
                    id: g.groupID,
                    muted: g.muted,
                    audioClips: g.audioClipList.map(function (_a) {
                        var clipID = _a.clipID, timeScope = _a.timeScope, muted = _a.muted, audioLevel = _a.audioLevel, frameReader = _a.frameReader;
                        return ({
                            id: clipID,
                            start: (0, descriptor_1.frac)(timeScope.Strt),
                            duration: (0, descriptor_1.frac)(timeScope.duration),
                            inTime: (0, descriptor_1.frac)(timeScope.inTime),
                            outTime: (0, descriptor_1.frac)(timeScope.outTime),
                            muted: muted,
                            audioLevel: audioLevel,
                            frameReader: {
                                type: frameReader.frameReaderType,
                                mediaDescriptor: frameReader.mediaDescriptor,
                                link: {
                                    name: frameReader["Lnk "]["Nm  "],
                                    fullPath: frameReader["Lnk "].fullPath,
                                    relativePath: frameReader["Lnk "].relPath,
                                },
                            },
                        });
                    }),
                }); });
        }
        return [2 /*return*/];
    });
}); }, function (writer, target) {
    var _a;
    var timeline = target.timelineInformation;
    var desc = {
        Vrsn: 1,
        enab: timeline.enabled,
        frameStep: timeline.frameStep,
        frameRate: timeline.frameRate,
        time: timeline.time,
        duration: timeline.duration,
        workInTime: timeline.workInTime,
        workOutTime: timeline.workOutTime,
        LCnt: timeline.repeats,
        globalTrackList: (0, descriptor_1.serializeTrackList)(timeline.globalTracks),
        audioClipGroupList: {
            audioClipGroupList: (_a = timeline.audioClipGroups) === null || _a === void 0 ? void 0 : _a.map(function (a) { return ({
                groupID: a.id,
                muted: a.muted,
                audioClipList: a.audioClips.map(function (c) { return ({
                    clipID: c.id,
                    timeScope: {
                        Vrsn: 1,
                        Strt: c.start,
                        duration: c.duration,
                        inTime: c.inTime,
                        outTime: c.outTime,
                    },
                    frameReader: {
                        frameReaderType: c.frameReader.type,
                        descVersion: 1,
                        "Lnk ": {
                            descVersion: 1,
                            "Nm  ": c.frameReader.link.name,
                            fullPath: c.frameReader.link.fullPath,
                            relPath: c.frameReader.link.relativePath,
                        },
                        mediaDescriptor: c.frameReader.mediaDescriptor,
                    },
                    muted: c.muted,
                    audioLevel: c.audioLevel,
                }); }),
            }); }),
        },
        hasMotion: timeline.hasMotion,
    };
    (0, descriptor_1.writeVersionAndDescriptor)(writer, "", "null", desc, "anim");
});
addHandler(1076, // Sheet Disclosure
function (target) { return target.sheetDisclosure !== undefined; }, function (reader, target) { return __awaiter(void 0, void 0, void 0, function () {
    var desc;
    return __generator(this, function (_a) {
        desc = (0, descriptor_1.readVersionAndDescriptor)(reader);
        target.sheetDisclosure = {};
        if (desc.sheetTimelineOptions) {
            target.sheetDisclosure.sheetTimelineOptions =
                desc.sheetTimelineOptions.map(function (o) { return ({
                    sheetID: o.sheetID,
                    sheetDisclosed: o.sheetDisclosed,
                    lightsDisclosed: o.lightsDisclosed,
                    meshesDisclosed: o.meshesDisclosed,
                    materialsDisclosed: o.materialsDisclosed,
                }); });
        }
        return [2 /*return*/];
    });
}); }, function (writer, target) {
    var disclosure = target.sheetDisclosure;
    var desc = { Vrsn: 1 };
    if (disclosure.sheetTimelineOptions) {
        desc.sheetTimelineOptions = disclosure.sheetTimelineOptions.map(function (d) { return ({
            Vrsn: 2,
            sheetID: d.sheetID,
            sheetDisclosed: d.sheetDisclosed,
            lightsDisclosed: d.lightsDisclosed,
            meshesDisclosed: d.meshesDisclosed,
            materialsDisclosed: d.materialsDisclosed,
        }); });
    }
    (0, descriptor_1.writeVersionAndDescriptor)(writer, "", "null", desc);
});
addHandler(1054, // URL List
function (target) { return target.urlsList !== undefined; }, function (reader, target, _, options) { return __awaiter(void 0, void 0, void 0, function () {
    var count, i, long, id, url;
    return __generator(this, function (_a) {
        count = (0, psdReader_1.readUint32)(reader);
        target.urlsList = [];
        for (i = 0; i < count; i++) {
            long = (0, psdReader_1.readSignature)(reader);
            if (long !== "slic" && options.throwForMissingFeatures)
                throw new Error("Unknown long");
            id = (0, psdReader_1.readUint32)(reader);
            url = (0, psdReader_1.readUnicodeString)(reader);
            target.urlsList.push({ id: id, url: url, ref: "slice" });
        }
        return [2 /*return*/];
    });
}); }, function (writer, target) {
    var list = target.urlsList;
    (0, psdWriter_1.writeUint32)(writer, list.length);
    for (var i = 0; i < list.length; i++) {
        (0, psdWriter_1.writeSignature)(writer, "slic");
        (0, psdWriter_1.writeUint32)(writer, list[i].id);
        (0, psdWriter_1.writeUnicodeString)(writer, list[i].url);
    }
});
function boundsToBounds(bounds) {
    return {
        "Top ": bounds.top,
        Left: bounds.left,
        Btom: bounds.bottom,
        Rght: bounds.right,
    };
}
function boundsFromBounds(bounds) {
    return {
        top: bounds["Top "],
        left: bounds.Left,
        bottom: bounds.Btom,
        right: bounds.Rght,
    };
}
function clamped(array, index) {
    return array[Math.max(0, Math.min(array.length - 1, index))];
}
var sliceOrigins = [
    "autoGenerated",
    "layer",
    "userGenerated",
];
var sliceTypes = ["noImage", "image"];
var sliceAlignments = ["default"];
addHandler(1050, // Slices
function (target) { return (target.slices ? target.slices.length : 0); }, function (reader, target) { return __awaiter(void 0, void 0, void 0, function () {
    var version, top_1, left, bottom, right, groupName, count, slices_1, i, id, groupId, origin_1, associatedLayerId, name_3, type, left_1, top_2, right_1, bottom_1, url, target_1, message, altTag, cellTextIsHTML, cellText, horizontalAlignment, verticalAlignment, a, r, g, b, backgroundColorType, desc, desc;
    return __generator(this, function (_a) {
        version = (0, psdReader_1.readUint32)(reader);
        if (version === 6) {
            if (!target.slices)
                target.slices = [];
            top_1 = (0, psdReader_1.readInt32)(reader);
            left = (0, psdReader_1.readInt32)(reader);
            bottom = (0, psdReader_1.readInt32)(reader);
            right = (0, psdReader_1.readInt32)(reader);
            groupName = (0, psdReader_1.readUnicodeString)(reader);
            count = (0, psdReader_1.readUint32)(reader);
            target.slices.push({
                bounds: { top: top_1, left: left, bottom: bottom, right: right },
                groupName: groupName,
                slices: [],
            });
            slices_1 = target.slices[target.slices.length - 1].slices;
            for (i = 0; i < count; i++) {
                id = (0, psdReader_1.readUint32)(reader);
                groupId = (0, psdReader_1.readUint32)(reader);
                origin_1 = clamped(sliceOrigins, (0, psdReader_1.readUint32)(reader));
                associatedLayerId = origin_1 == "layer" ? (0, psdReader_1.readUint32)(reader) : 0;
                name_3 = (0, psdReader_1.readUnicodeString)(reader);
                type = clamped(sliceTypes, (0, psdReader_1.readUint32)(reader));
                left_1 = (0, psdReader_1.readInt32)(reader);
                top_2 = (0, psdReader_1.readInt32)(reader);
                right_1 = (0, psdReader_1.readInt32)(reader);
                bottom_1 = (0, psdReader_1.readInt32)(reader);
                url = (0, psdReader_1.readUnicodeString)(reader);
                target_1 = (0, psdReader_1.readUnicodeString)(reader);
                message = (0, psdReader_1.readUnicodeString)(reader);
                altTag = (0, psdReader_1.readUnicodeString)(reader);
                cellTextIsHTML = !!(0, psdReader_1.readUint8)(reader);
                cellText = (0, psdReader_1.readUnicodeString)(reader);
                horizontalAlignment = clamped(sliceAlignments, (0, psdReader_1.readUint32)(reader));
                verticalAlignment = clamped(sliceAlignments, (0, psdReader_1.readUint32)(reader));
                a = (0, psdReader_1.readUint8)(reader);
                r = (0, psdReader_1.readUint8)(reader);
                g = (0, psdReader_1.readUint8)(reader);
                b = (0, psdReader_1.readUint8)(reader);
                backgroundColorType = a + r + g + b === 0 ? "none" : a === 0 ? "matte" : "color";
                slices_1.push({
                    id: id,
                    groupId: groupId,
                    origin: origin_1,
                    associatedLayerId: associatedLayerId,
                    name: name_3,
                    target: target_1,
                    message: message,
                    altTag: altTag,
                    cellTextIsHTML: cellTextIsHTML,
                    cellText: cellText,
                    horizontalAlignment: horizontalAlignment,
                    verticalAlignment: verticalAlignment,
                    type: type,
                    url: url,
                    bounds: { top: top_2, left: left_1, bottom: bottom_1, right: right_1 },
                    backgroundColorType: backgroundColorType,
                    backgroundColor: { r: r, g: g, b: b, a: a },
                });
            }
            desc = (0, descriptor_1.readVersionAndDescriptor)(reader);
            desc.slices.forEach(function (d) {
                var slice = slices_1.find(function (s) { return d.sliceID == s.id; });
                if (slice) {
                    slice.topOutset = d.topOutset;
                    slice.leftOutset = d.leftOutset;
                    slice.bottomOutset = d.bottomOutset;
                    slice.rightOutset = d.rightOutset;
                }
            });
        }
        else if (version === 7 || version === 8) {
            desc = (0, descriptor_1.readVersionAndDescriptor)(reader);
            if (!target.slices)
                target.slices = [];
            target.slices.push({
                groupName: desc.baseName,
                bounds: boundsFromBounds(desc.bounds),
                slices: desc.slices.map(function (s) { return (__assign(__assign({}, (s["Nm  "] ? { name: s["Nm  "] } : {})), { id: s.sliceID, groupId: s.groupID, associatedLayerId: 0, origin: descriptor_1.ESliceOrigin.decode(s.origin), type: descriptor_1.ESliceType.decode(s.Type), bounds: boundsFromBounds(s.bounds), url: s.url, target: s.null, message: s.Msge, altTag: s.altTag, cellTextIsHTML: s.cellTextIsHTML, cellText: s.cellText, horizontalAlignment: descriptor_1.ESliceHorzAlign.decode(s.horzAlign), verticalAlignment: descriptor_1.ESliceVertAlign.decode(s.vertAlign), backgroundColorType: descriptor_1.ESliceBGColorType.decode(s.bgColorType), backgroundColor: s.bgColor
                        ? {
                            r: s.bgColor["Rd  "],
                            g: s.bgColor["Grn "],
                            b: s.bgColor["Bl  "],
                            a: s.bgColor.alpha,
                        }
                        : { r: 0, g: 0, b: 0, a: 0 }, topOutset: s.topOutset || 0, leftOutset: s.leftOutset || 0, bottomOutset: s.bottomOutset || 0, rightOutset: s.rightOutset || 0 })); }),
            });
        }
        else {
            throw new Error("Invalid slices version (".concat(version, ")"));
        }
        return [2 /*return*/];
    });
}); }, function (writer, target, index) {
    var _a = target.slices[index], bounds = _a.bounds, groupName = _a.groupName, slices = _a.slices;
    (0, psdWriter_1.writeUint32)(writer, 6); // version
    (0, psdWriter_1.writeInt32)(writer, bounds.top);
    (0, psdWriter_1.writeInt32)(writer, bounds.left);
    (0, psdWriter_1.writeInt32)(writer, bounds.bottom);
    (0, psdWriter_1.writeInt32)(writer, bounds.right);
    (0, psdWriter_1.writeUnicodeString)(writer, groupName);
    (0, psdWriter_1.writeUint32)(writer, slices.length);
    for (var i = 0; i < slices.length; i++) {
        var slice = slices[i];
        var _b = slice.backgroundColor, a = _b.a, r = _b.r, g = _b.g, b = _b.b;
        if (slice.backgroundColorType === "none") {
            a = r = g = b = 0;
        }
        else if (slice.backgroundColorType === "matte") {
            a = 0;
            r = g = b = 255;
        }
        (0, psdWriter_1.writeUint32)(writer, slice.id);
        (0, psdWriter_1.writeUint32)(writer, slice.groupId);
        (0, psdWriter_1.writeUint32)(writer, sliceOrigins.indexOf(slice.origin));
        if (slice.origin === "layer")
            (0, psdWriter_1.writeUint32)(writer, slice.associatedLayerId);
        (0, psdWriter_1.writeUnicodeString)(writer, slice.name || "");
        (0, psdWriter_1.writeUint32)(writer, sliceTypes.indexOf(slice.type));
        (0, psdWriter_1.writeInt32)(writer, slice.bounds.left);
        (0, psdWriter_1.writeInt32)(writer, slice.bounds.top);
        (0, psdWriter_1.writeInt32)(writer, slice.bounds.right);
        (0, psdWriter_1.writeInt32)(writer, slice.bounds.bottom);
        (0, psdWriter_1.writeUnicodeString)(writer, slice.url);
        (0, psdWriter_1.writeUnicodeString)(writer, slice.target);
        (0, psdWriter_1.writeUnicodeString)(writer, slice.message);
        (0, psdWriter_1.writeUnicodeString)(writer, slice.altTag);
        (0, psdWriter_1.writeUint8)(writer, slice.cellTextIsHTML ? 1 : 0);
        (0, psdWriter_1.writeUnicodeString)(writer, slice.cellText);
        (0, psdWriter_1.writeUint32)(writer, sliceAlignments.indexOf(slice.horizontalAlignment));
        (0, psdWriter_1.writeUint32)(writer, sliceAlignments.indexOf(slice.verticalAlignment));
        (0, psdWriter_1.writeUint8)(writer, a);
        (0, psdWriter_1.writeUint8)(writer, r);
        (0, psdWriter_1.writeUint8)(writer, g);
        (0, psdWriter_1.writeUint8)(writer, b);
    }
    var desc = {
        bounds: boundsToBounds(bounds),
        slices: [],
    };
    slices.forEach(function (s) {
        var slice = __assign(__assign({ sliceID: s.id, groupID: s.groupId, origin: descriptor_1.ESliceOrigin.encode(s.origin), Type: descriptor_1.ESliceType.encode(s.type), bounds: boundsToBounds(s.bounds) }, (s.name ? { "Nm  ": s.name } : {})), { url: s.url, null: s.target, Msge: s.message, altTag: s.altTag, cellTextIsHTML: s.cellTextIsHTML, cellText: s.cellText, horzAlign: descriptor_1.ESliceHorzAlign.encode(s.horizontalAlignment), vertAlign: descriptor_1.ESliceVertAlign.encode(s.verticalAlignment), bgColorType: descriptor_1.ESliceBGColorType.encode(s.backgroundColorType) });
        if (s.backgroundColorType === "color") {
            var _a = s.backgroundColor, r = _a.r, g = _a.g, b = _a.b, a = _a.a;
            slice.bgColor = { "Rd  ": r, "Grn ": g, "Bl  ": b, alpha: a };
        }
        slice.topOutset = s.topOutset || 0;
        slice.leftOutset = s.leftOutset || 0;
        slice.bottomOutset = s.bottomOutset || 0;
        slice.rightOutset = s.rightOutset || 0;
        desc.slices.push(slice);
    });
    (0, descriptor_1.writeVersionAndDescriptor)(writer, "", "null", desc, "slices");
});
addHandler(1064, function (target) { return target.pixelAspectRatio !== undefined; }, function (reader, target) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if ((0, psdReader_1.readUint32)(reader) > 2)
            throw new Error("Invalid pixelAspectRatio version");
        target.pixelAspectRatio = { aspect: (0, psdReader_1.readFloat64)(reader) };
        return [2 /*return*/];
    });
}); }, function (writer, target) {
    (0, psdWriter_1.writeUint32)(writer, 2); // version
    (0, psdWriter_1.writeFloat64)(writer, target.pixelAspectRatio.aspect);
});
addHandler(1041, function (target) { return target.iccUntaggedProfile !== undefined; }, function (reader, target) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        target.iccUntaggedProfile = !!(0, psdReader_1.readUint8)(reader);
        return [2 /*return*/];
    });
}); }, function (writer, target) {
    (0, psdWriter_1.writeUint8)(writer, target.iccUntaggedProfile ? 1 : 0);
});
helpers_1.MOCK_HANDLERS &&
    addHandler(1039, // ICC Profile
    function (target) { return target._ir1039 !== undefined; }, function (reader, target, left) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    // TODO: this is raw bytes, just return as a byte array
                    _a = LOG_MOCK_HANDLERS;
                    if (!_a) 
                    // TODO: this is raw bytes, just return as a byte array
                    return [3 /*break*/, 2];
                    _c = (_b = console).log;
                    _d = ["image resource 1039"];
                    return [4 /*yield*/, left()];
                case 1:
                    _a = _c.apply(_b, _d.concat([_h.sent()]));
                    _h.label = 2;
                case 2:
                    // TODO: this is raw bytes, just return as a byte array
                    _a;
                    _e = target;
                    _f = psdReader_1.readBytes;
                    _g = [reader];
                    return [4 /*yield*/, left()];
                case 3:
                    _e._ir1039 = _f.apply(void 0, _g.concat([_h.sent()]));
                    return [2 /*return*/];
            }
        });
    }); }, function (writer, target) {
        (0, psdWriter_1.writeBytes)(writer, target._ir1039);
    });
addHandler(1044, function (target) { return target.idsSeedNumber !== undefined; }, function (reader, target) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        target.idsSeedNumber = (0, psdReader_1.readUint32)(reader);
        return [2 /*return*/];
    });
}); }, function (writer, target) { return (0, psdWriter_1.writeUint32)(writer, target.idsSeedNumber); });
addHandler(1036, function (target) {
    return target.thumbnail !== undefined || target.thumbnailRaw !== undefined;
}, function (reader, target, left, options) { return __awaiter(void 0, void 0, void 0, function () {
    var format, width, height, bitsPerPixel, planes, _a, _b, size, data;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                format = (0, psdReader_1.readUint32)(reader);
                width = (0, psdReader_1.readUint32)(reader);
                height = (0, psdReader_1.readUint32)(reader);
                (0, psdReader_1.readUint32)(reader); // widthBytes = (width * bits_per_pixel + 31) / 32 * 4.
                (0, psdReader_1.readUint32)(reader); // totalSize = widthBytes * height * planes
                (0, psdReader_1.readUint32)(reader); // sizeAfterCompression
                bitsPerPixel = (0, psdReader_1.readUint16)(reader);
                planes = (0, psdReader_1.readUint16)(reader);
                if (!(format !== 1 || bitsPerPixel !== 24 || planes !== 1)) return [3 /*break*/, 2];
                options.logMissingFeatures &&
                    console.log("Invalid thumbnail data (format: ".concat(format, ", bitsPerPixel: ").concat(bitsPerPixel, ", planes: ").concat(planes, ")"));
                _a = psdReader_1.skipBytes;
                _b = [reader];
                return [4 /*yield*/, left()];
            case 1:
                _a.apply(void 0, _b.concat([_c.sent()]));
                return [2 /*return*/];
            case 2: return [4 /*yield*/, left()];
            case 3:
                size = _c.sent();
                data = (0, psdReader_1.readBytes)(reader, size);
                if (options.useRawThumbnail) {
                    target.thumbnailRaw = { width: width, height: height, data: data };
                }
                else if (data.byteLength) {
                    target.thumbnail = (0, helpers_1.createCanvasFromData)(data);
                }
                return [2 /*return*/];
        }
    });
}); }, function (writer, target) {
    var _a;
    var width = 0;
    var height = 0;
    var data;
    if (target.thumbnailRaw) {
        width = target.thumbnailRaw.width;
        height = target.thumbnailRaw.height;
        data = target.thumbnailRaw.data;
    }
    else {
        var dataUrl = (_a = target
            .thumbnail.toDataURL("image/jpeg", 1)) === null || _a === void 0 ? void 0 : _a.substring("data:image/jpeg;base64,".length);
        if (dataUrl) {
            width = target.thumbnail.width;
            height = target.thumbnail.height;
            data = (0, base64_js_1.toByteArray)(dataUrl);
        }
        else {
            data = new Uint8Array(0);
        }
    }
    var bitsPerPixel = 24;
    var widthBytes = Math.floor((width * bitsPerPixel + 31) / 32) * 4;
    var planes = 1;
    var totalSize = widthBytes * height * planes;
    var sizeAfterCompression = data.length;
    (0, psdWriter_1.writeUint32)(writer, 1); // 1 = kJpegRGB
    (0, psdWriter_1.writeUint32)(writer, width);
    (0, psdWriter_1.writeUint32)(writer, height);
    (0, psdWriter_1.writeUint32)(writer, widthBytes);
    (0, psdWriter_1.writeUint32)(writer, totalSize);
    (0, psdWriter_1.writeUint32)(writer, sizeAfterCompression);
    (0, psdWriter_1.writeUint16)(writer, bitsPerPixel);
    (0, psdWriter_1.writeUint16)(writer, planes);
    (0, psdWriter_1.writeBytes)(writer, data);
});
addHandler(1057, function (target) { return target.versionInfo !== undefined; }, function (reader, target, left) { return __awaiter(void 0, void 0, void 0, function () {
    var version, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                version = (0, psdReader_1.readUint32)(reader);
                if (version !== 1)
                    throw new Error("Invalid versionInfo version");
                target.versionInfo = {
                    hasRealMergedData: !!(0, psdReader_1.readUint8)(reader),
                    writerName: (0, psdReader_1.readUnicodeString)(reader),
                    readerName: (0, psdReader_1.readUnicodeString)(reader),
                    fileVersion: (0, psdReader_1.readUint32)(reader),
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
    var versionInfo = target.versionInfo;
    (0, psdWriter_1.writeUint32)(writer, 1); // version
    (0, psdWriter_1.writeUint8)(writer, versionInfo.hasRealMergedData ? 1 : 0);
    (0, psdWriter_1.writeUnicodeString)(writer, versionInfo.writerName);
    (0, psdWriter_1.writeUnicodeString)(writer, versionInfo.readerName);
    (0, psdWriter_1.writeUint32)(writer, versionInfo.fileVersion);
});
helpers_1.MOCK_HANDLERS &&
    addHandler(1058, // EXIF data 1.
    function (target) { return target._ir1058 !== undefined; }, function (reader, target, left) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    _a = LOG_MOCK_HANDLERS;
                    if (!_a) return [3 /*break*/, 2];
                    _c = (_b = console).log;
                    _d = ["image resource 1058"];
                    return [4 /*yield*/, left()];
                case 1:
                    _a = _c.apply(_b, _d.concat([_h.sent()]));
                    _h.label = 2;
                case 2:
                    _a;
                    _e = target;
                    _f = psdReader_1.readBytes;
                    _g = [reader];
                    return [4 /*yield*/, left()];
                case 3:
                    _e._ir1058 = _f.apply(void 0, _g.concat([_h.sent()]));
                    return [2 /*return*/];
            }
        });
    }); }, function (writer, target) {
        (0, psdWriter_1.writeBytes)(writer, target._ir1058);
    });
addHandler(7000, function (target) { return target.imageReadyVariables !== undefined; }, function (reader, target, left) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = target;
                _b = readUtf8String;
                _c = [reader];
                return [4 /*yield*/, left()];
            case 1:
                _a.imageReadyVariables = _b.apply(void 0, _c.concat([_d.sent()]));
                return [2 /*return*/];
        }
    });
}); }, function (writer, target) {
    writeUtf8String(writer, target.imageReadyVariables);
});
addHandler(7001, function (target) { return target.imageReadyDataSets !== undefined; }, function (reader, target, left) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = target;
                _b = readUtf8String;
                _c = [reader];
                return [4 /*yield*/, left()];
            case 1:
                _a.imageReadyDataSets = _b.apply(void 0, _c.concat([_d.sent()]));
                return [2 /*return*/];
        }
    });
}); }, function (writer, target) {
    writeUtf8String(writer, target.imageReadyDataSets);
});
addHandler(1088, function (target) { return target.pathSelectionState !== undefined; }, function (reader, target, _left) { return __awaiter(void 0, void 0, void 0, function () {
    var desc;
    return __generator(this, function (_a) {
        desc = (0, descriptor_1.readVersionAndDescriptor)(reader);
        target.pathSelectionState = desc["null"];
        return [2 /*return*/];
    });
}); }, function (writer, target) {
    var desc = { null: target.pathSelectionState };
    (0, descriptor_1.writeVersionAndDescriptor)(writer, "", "null", desc);
});
helpers_1.MOCK_HANDLERS &&
    addHandler(1025, function (target) { return target._ir1025 !== undefined; }, function (reader, target, left) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    _a = LOG_MOCK_HANDLERS;
                    if (!_a) return [3 /*break*/, 2];
                    _c = (_b = console).log;
                    _d = ["image resource 1025"];
                    return [4 /*yield*/, left()];
                case 1:
                    _a = _c.apply(_b, _d.concat([_h.sent()]));
                    _h.label = 2;
                case 2:
                    _a;
                    _e = target;
                    _f = psdReader_1.readBytes;
                    _g = [reader];
                    return [4 /*yield*/, left()];
                case 3:
                    _e._ir1025 = _f.apply(void 0, _g.concat([_h.sent()]));
                    return [2 /*return*/];
            }
        });
    }); }, function (writer, target) {
        (0, psdWriter_1.writeBytes)(writer, target._ir1025);
    });
var FrmD = (0, helpers_1.createEnum)("FrmD", "", {
    auto: "Auto",
    none: "None",
    dispose: "Disp",
});
addHandler(4000, // Plug-In resource(s)
function (target) { return target.animations !== undefined; }, function (reader, target, left, _a) {
    var logMissingFeatures = _a.logMissingFeatures, logDevFeatures = _a.logDevFeatures;
    return __awaiter(void 0, void 0, void 0, function () {
        var key, bytes, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    key = (0, psdReader_1.readSignature)(reader);
                    if (!(key === "mani")) return [3 /*break*/, 2];
                    (0, psdReader_1.checkSignature)(reader, "IRFR");
                    return [4 /*yield*/, (0, psdReader_1.readSection)(reader, 1, function (left) { return __awaiter(void 0, void 0, void 0, function () {
                            var _loop_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _loop_1 = function () {
                                            var key_1;
                                            return __generator(this, function (_b) {
                                                switch (_b.label) {
                                                    case 0:
                                                        (0, psdReader_1.checkSignature)(reader, "8BIM");
                                                        key_1 = (0, psdReader_1.readSignature)(reader);
                                                        return [4 /*yield*/, (0, psdReader_1.readSection)(reader, 1, function (left) { return __awaiter(void 0, void 0, void 0, function () {
                                                                var desc, bytes, _a, _b;
                                                                return __generator(this, function (_c) {
                                                                    switch (_c.label) {
                                                                        case 0:
                                                                            if (!(key_1 === "AnDs")) return [3 /*break*/, 1];
                                                                            desc = (0, descriptor_1.readVersionAndDescriptor)(reader);
                                                                            target.animations = {
                                                                                // desc.AFSt ???
                                                                                frames: desc.FrIn.map(function (x) { return ({
                                                                                    id: x.FrID,
                                                                                    delay: (x.FrDl || 0) / 100,
                                                                                    dispose: x.FrDs ? FrmD.decode(x.FrDs) : "auto", // missing == auto
                                                                                    // x.FrGA ???
                                                                                }); }),
                                                                                animations: desc.FSts.map(function (x) { return ({
                                                                                    id: x.FsID,
                                                                                    frames: x.FsFr,
                                                                                    repeats: x.LCnt,
                                                                                    activeFrame: x.AFrm || 0,
                                                                                }); }),
                                                                            };
                                                                            return [3 /*break*/, 4];
                                                                        case 1:
                                                                            if (!(key_1 === "Roll")) return [3 /*break*/, 3];
                                                                            _a = psdReader_1.readBytes;
                                                                            _b = [reader];
                                                                            return [4 /*yield*/, left()];
                                                                        case 2:
                                                                            bytes = _a.apply(void 0, _b.concat([_c.sent()]));
                                                                            logDevFeatures && console.log("#4000 Roll", bytes);
                                                                            return [3 /*break*/, 4];
                                                                        case 3:
                                                                            logMissingFeatures &&
                                                                                console.log("Unhandled subsection in #4000", key_1);
                                                                            _c.label = 4;
                                                                        case 4: return [2 /*return*/];
                                                                    }
                                                                });
                                                            }); })];
                                                    case 1:
                                                        _b.sent();
                                                        return [2 /*return*/];
                                                }
                                            });
                                        };
                                        _a.label = 1;
                                    case 1: return [4 /*yield*/, left()];
                                    case 2:
                                        if (!((_a.sent()) > 0)) return [3 /*break*/, 4];
                                        return [5 /*yield**/, _loop_1()];
                                    case 3:
                                        _a.sent();
                                        return [3 /*break*/, 1];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); })];
                case 1:
                    _d.sent();
                    return [3 /*break*/, 5];
                case 2:
                    if (!(key === "mopt")) return [3 /*break*/, 4];
                    _b = psdReader_1.readBytes;
                    _c = [reader];
                    return [4 /*yield*/, left()];
                case 3:
                    bytes = _b.apply(void 0, _c.concat([_d.sent()]));
                    logDevFeatures && console.log("#4000 mopt", bytes);
                    return [3 /*break*/, 5];
                case 4:
                    logMissingFeatures && console.log("Unhandled key in #4000:", key);
                    _d.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
}, function (writer, target) {
    if (target.animations) {
        (0, psdWriter_1.writeSignature)(writer, "mani");
        (0, psdWriter_1.writeSignature)(writer, "IRFR");
        (0, psdWriter_1.writeSection)(writer, 1, function () {
            (0, psdWriter_1.writeSignature)(writer, "8BIM");
            (0, psdWriter_1.writeSignature)(writer, "AnDs");
            (0, psdWriter_1.writeSection)(writer, 1, function () {
                var desc = {
                    // AFSt: 0, // ???
                    FrIn: [],
                    FSts: [],
                };
                for (var i = 0; i < target.animations.frames.length; i++) {
                    var f = target.animations.frames[i];
                    var frame = {
                        FrID: f.id,
                    };
                    if (f.delay)
                        frame.FrDl = (f.delay * 100) | 0;
                    frame.FrDs = FrmD.encode(f.dispose);
                    // if (i === 0) frame.FrGA = 30; // ???
                    desc.FrIn.push(frame);
                }
                for (var i = 0; i < target.animations.animations.length; i++) {
                    var a = target.animations.animations[i];
                    var anim = {
                        FsID: a.id,
                        AFrm: a.activeFrame | 0,
                        FsFr: a.frames,
                        LCnt: a.repeats | 0,
                    };
                    desc.FSts.push(anim);
                }
                (0, descriptor_1.writeVersionAndDescriptor)(writer, "", "null", desc);
            });
            // writeSignature(writer, '8BIM');
            // writeSignature(writer, 'Roll');
            // writeSection(writer, 1, () => {
            // 	writeZeros(writer, 8);
            // });
        });
    }
});
// TODO: Unfinished
helpers_1.MOCK_HANDLERS &&
    addHandler(4001, // Plug-In resource(s)
    function (target) { return target._ir4001 !== undefined; }, function (reader, target, left, _a) {
        var logMissingFeatures = _a.logMissingFeatures, logDevFeatures = _a.logDevFeatures;
        return __awaiter(void 0, void 0, void 0, function () {
            var _b, _c, _d, _e, _f, _g, _h, key, version, length_1, bytes, desc;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        if (!helpers_1.MOCK_HANDLERS) return [3 /*break*/, 4];
                        _b = LOG_MOCK_HANDLERS;
                        if (!_b) return [3 /*break*/, 2];
                        _d = (_c = console).log;
                        _e = ["image resource 4001"];
                        return [4 /*yield*/, left()];
                    case 1:
                        _b = _d.apply(_c, _e.concat([_j.sent()]));
                        _j.label = 2;
                    case 2:
                        _b;
                        _f = target;
                        _g = psdReader_1.readBytes;
                        _h = [reader];
                        return [4 /*yield*/, left()];
                    case 3:
                        _f._ir4001 = _g.apply(void 0, _h.concat([_j.sent()]));
                        return [2 /*return*/];
                    case 4:
                        key = (0, psdReader_1.readSignature)(reader);
                        if (key === "mfri") {
                            version = (0, psdReader_1.readUint32)(reader);
                            if (version !== 2)
                                throw new Error("Invalid mfri version");
                            length_1 = (0, psdReader_1.readUint32)(reader);
                            bytes = (0, psdReader_1.readBytes)(reader, length_1);
                            logDevFeatures && console.log("mfri", bytes);
                        }
                        else if (key === "mset") {
                            desc = (0, descriptor_1.readVersionAndDescriptor)(reader);
                            logDevFeatures && console.log("mset", desc);
                        }
                        else {
                            logMissingFeatures && console.log("Unhandled key in #4001", key);
                        }
                        return [2 /*return*/];
                }
            });
        });
    }, function (writer, target) {
        (0, psdWriter_1.writeBytes)(writer, target._ir4001);
    });
// TODO: Unfinished
helpers_1.MOCK_HANDLERS &&
    addHandler(4002, // Plug-In resource(s)
    function (target) { return target._ir4002 !== undefined; }, function (reader, target, left) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    _a = LOG_MOCK_HANDLERS;
                    if (!_a) return [3 /*break*/, 2];
                    _c = (_b = console).log;
                    _d = ["image resource 4002"];
                    return [4 /*yield*/, left()];
                case 1:
                    _a = _c.apply(_b, _d.concat([_h.sent()]));
                    _h.label = 2;
                case 2:
                    _a;
                    _e = target;
                    _f = psdReader_1.readBytes;
                    _g = [reader];
                    return [4 /*yield*/, left()];
                case 3:
                    _e._ir4002 = _f.apply(void 0, _g.concat([_h.sent()]));
                    return [2 /*return*/];
            }
        });
    }); }, function (writer, target) {
        (0, psdWriter_1.writeBytes)(writer, target._ir4002);
    });
//# sourceMappingURL=imageResources.js.map