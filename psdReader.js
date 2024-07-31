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
exports.readPattern = exports.readColor = exports.readSection = exports.readDataRLE = exports.readDataZip = exports.readAdditionalLayerInfo = exports.readGlobalLayerMaskInfo = exports.readLayerInfo = exports.readPsd = exports.checkSignature = exports.skipBytes = exports.readAsciiString = exports.readUnicodeStringWithLengthLE = exports.readUnicodeStringWithLength = exports.readUnicodeString = exports.readPascalString = exports.readSignature = exports.readBytes = exports.readFixedPointPath32 = exports.readFixedPoint32 = exports.readFloat64 = exports.readFloat32 = exports.readUint32 = exports.readInt32LE = exports.readInt32 = exports.readUint16LE = exports.readUint16 = exports.readInt16 = exports.peekUint8 = exports.readUint8 = exports.warnOrThrow = exports.createReader = exports.supportedColorModes = void 0;
var pako_1 = require("pako");
var helpers_1 = require("./helpers");
var additionalInfo_1 = require("./additionalInfo");
var imageResources_1 = require("./imageResources");
exports.supportedColorModes = [
    0 /* ColorMode.Bitmap */,
    1 /* ColorMode.Grayscale */,
    3 /* ColorMode.RGB */,
];
var colorModes = [
    "bitmap",
    "grayscale",
    "indexed",
    "RGB",
    "CMYK",
    "multichannel",
    "duotone",
    "lab",
];
function setupGrayscale(data) {
    var size = data.width * data.height * 4;
    for (var i = 0; i < size; i += 4) {
        data.data[i + 1] = data.data[i];
        data.data[i + 2] = data.data[i];
    }
}
function createReader(buffer, offset, length) {
    var view = new DataView(buffer, offset, length);
    return { view: view, offset: 0, strict: false, debug: false };
}
exports.createReader = createReader;
function warnOrThrow(reader, message) {
    if (reader.strict)
        throw new Error(message);
    if (reader.debug)
        console.warn(message);
}
exports.warnOrThrow = warnOrThrow;
function readUint8(reader) {
    reader.offset += 1;
    return reader.view.getUint8(reader.offset - 1);
}
exports.readUint8 = readUint8;
function peekUint8(reader) {
    return reader.view.getUint8(reader.offset);
}
exports.peekUint8 = peekUint8;
function readInt16(reader) {
    reader.offset += 2;
    return reader.view.getInt16(reader.offset - 2, false);
}
exports.readInt16 = readInt16;
function readUint16(reader) {
    reader.offset += 2;
    return reader.view.getUint16(reader.offset - 2, false);
}
exports.readUint16 = readUint16;
function readUint16LE(reader) {
    reader.offset += 2;
    return reader.view.getUint16(reader.offset - 2, true);
}
exports.readUint16LE = readUint16LE;
function readInt32(reader) {
    reader.offset += 4;
    return reader.view.getInt32(reader.offset - 4, false);
}
exports.readInt32 = readInt32;
function readInt32LE(reader) {
    reader.offset += 4;
    return reader.view.getInt32(reader.offset - 4, true);
}
exports.readInt32LE = readInt32LE;
function readUint32(reader) {
    reader.offset += 4;
    return reader.view.getUint32(reader.offset - 4, false);
}
exports.readUint32 = readUint32;
function readFloat32(reader) {
    reader.offset += 4;
    return reader.view.getFloat32(reader.offset - 4, false);
}
exports.readFloat32 = readFloat32;
function readFloat64(reader) {
    reader.offset += 8;
    return reader.view.getFloat64(reader.offset - 8, false);
}
exports.readFloat64 = readFloat64;
// 32-bit fixed-point number 16.16
function readFixedPoint32(reader) {
    return readInt32(reader) / (1 << 16);
}
exports.readFixedPoint32 = readFixedPoint32;
// 32-bit fixed-point number 8.24
function readFixedPointPath32(reader) {
    return readInt32(reader) / (1 << 24);
}
exports.readFixedPointPath32 = readFixedPointPath32;
function readBytes(reader, length) {
    var start = reader.view.byteOffset + reader.offset;
    reader.offset += length;
    if (start + length > reader.view.buffer.byteLength) {
        // fix for broken PSD files that are missing part of file at the end
        warnOrThrow(reader, "Reading bytes exceeding buffer length");
        if (length > 100 * 1024 * 1024)
            throw new Error("Reading past end of file"); // limit to 100MB
        var result = new Uint8Array(length);
        var len = Math.min(length, reader.view.byteLength - start);
        if (len > 0)
            result.set(new Uint8Array(reader.view.buffer, start, len));
        return result;
    }
    else {
        return new Uint8Array(reader.view.buffer, start, length);
    }
}
exports.readBytes = readBytes;
function readSignature(reader) {
    return readShortString(reader, 4);
}
exports.readSignature = readSignature;
function readPascalString(reader, padTo) {
    var length = readUint8(reader);
    var text = length ? readShortString(reader, length) : "";
    while (++length % padTo) {
        reader.offset++;
    }
    return text;
}
exports.readPascalString = readPascalString;
function readUnicodeString(reader) {
    var length = readUint32(reader);
    return readUnicodeStringWithLength(reader, length);
}
exports.readUnicodeString = readUnicodeString;
function readUnicodeStringWithLength(reader, length) {
    var text = "";
    while (length--) {
        var value = readUint16(reader);
        if (value || length > 0) {
            // remove trailing \0
            text += String.fromCharCode(value);
        }
    }
    return text;
}
exports.readUnicodeStringWithLength = readUnicodeStringWithLength;
function readUnicodeStringWithLengthLE(reader, length) {
    var text = "";
    while (length--) {
        var value = readUint16LE(reader);
        if (value || length > 0) {
            // remove trailing \0
            text += String.fromCharCode(value);
        }
    }
    return text;
}
exports.readUnicodeStringWithLengthLE = readUnicodeStringWithLengthLE;
function readAsciiString(reader, length) {
    var text = "";
    while (length--) {
        text += String.fromCharCode(readUint8(reader));
    }
    return text;
}
exports.readAsciiString = readAsciiString;
function skipBytes(reader, count) {
    reader.offset += count;
}
exports.skipBytes = skipBytes;
function checkSignature(reader, a, b) {
    var offset = reader.offset;
    var signature = readSignature(reader);
    if (signature !== a && signature !== b) {
        throw new Error("Invalid signature: '".concat(signature, "' at 0x").concat(offset.toString(16)));
    }
}
exports.checkSignature = checkSignature;
function readShortString(reader, length) {
    var buffer = readBytes(reader, length);
    var result = "";
    for (var i = 0; i < buffer.length; i++) {
        result += String.fromCharCode(buffer[i]);
    }
    return result;
}
function isValidSignature(sig) {
    return (sig === "8BIM" ||
        sig === "MeSa" ||
        sig === "AgHg" ||
        sig === "PHUT" ||
        sig === "DCSR");
}
function readPsd(reader, readOptions, postImageDataHandler) {
    var _a;
    if (readOptions === void 0) { readOptions = {}; }
    if (postImageDataHandler === void 0) { postImageDataHandler = function (_data, _id) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    }; }
    return __awaiter(this, void 0, void 0, function () {
        var version, channels, height, width, bitsPerChannel, colorMode, maxSize, psd, options, fixOffsets, hasChildren, skipComposite;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    // header
                    checkSignature(reader, "8BPS");
                    version = readUint16(reader);
                    if (version !== 1 && version !== 2)
                        throw new Error("Invalid PSD file version: ".concat(version));
                    skipBytes(reader, 6);
                    channels = readUint16(reader);
                    height = readUint32(reader);
                    width = readUint32(reader);
                    bitsPerChannel = readUint16(reader);
                    colorMode = readUint16(reader);
                    maxSize = version === 1 ? 30000 : 300000;
                    if (width > maxSize || height > maxSize)
                        throw new Error("Invalid size: ".concat(width, "x").concat(height));
                    if (channels > 16)
                        throw new Error("Invalid channel count: ".concat(channels));
                    if (![1, 8, 16, 32].includes(bitsPerChannel))
                        throw new Error("Invalid bitsPerChannel: ".concat(bitsPerChannel));
                    if (exports.supportedColorModes.indexOf(colorMode) === -1)
                        throw new Error("Color mode not supported: ".concat((_a = colorModes[colorMode]) !== null && _a !== void 0 ? _a : colorMode));
                    psd = { width: width, height: height, channels: channels, bitsPerChannel: bitsPerChannel, colorMode: colorMode };
                    options = __assign(__assign({}, readOptions), { large: version === 2, globalAlpha: false });
                    fixOffsets = [0, 1, -1, 2, -2, 3, -3, 4, -4];
                    // color mode data
                    return [4 /*yield*/, readSection(reader, 1, function (left) { return __awaiter(_this, void 0, void 0, function () {
                            var _a, _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0: return [4 /*yield*/, left()];
                                    case 1:
                                        if (!(_c.sent()))
                                            return [2 /*return*/];
                                        // const numbers: number[] = [];
                                        // console.log('color mode', await left());
                                        // while (await left() > 0) {
                                        // 	numbers.push(readUint32(reader));
                                        // }
                                        // console.log('color mode', numbers);
                                        // if (options.throwForMissingFeatures) throw new Error('Color mode data not supported');
                                        _a = skipBytes;
                                        _b = [reader];
                                        return [4 /*yield*/, left()];
                                    case 2:
                                        // const numbers: number[] = [];
                                        // console.log('color mode', await left());
                                        // while (await left() > 0) {
                                        // 	numbers.push(readUint32(reader));
                                        // }
                                        // console.log('color mode', numbers);
                                        // if (options.throwForMissingFeatures) throw new Error('Color mode data not supported');
                                        _a.apply(void 0, _b.concat([_c.sent()]));
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 1:
                    // color mode data
                    _b.sent();
                    // image resources
                    return [4 /*yield*/, readSection(reader, 1, function (left) { return __awaiter(_this, void 0, void 0, function () {
                            var _loop_1;
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _loop_1 = function () {
                                            var sigOffset, sig, _i, fixOffsets_1, offset, id;
                                            return __generator(this, function (_b) {
                                                switch (_b.label) {
                                                    case 0:
                                                        sigOffset = reader.offset;
                                                        sig = "";
                                                        // attempt to fix broken document by realigning with the signature
                                                        for (_i = 0, fixOffsets_1 = fixOffsets; _i < fixOffsets_1.length; _i++) {
                                                            offset = fixOffsets_1[_i];
                                                            try {
                                                                reader.offset = sigOffset + offset;
                                                                sig = readSignature(reader);
                                                            }
                                                            catch (_c) { }
                                                            if (isValidSignature(sig))
                                                                break;
                                                        }
                                                        if (!isValidSignature(sig)) {
                                                            throw new Error("Invalid signature: '".concat(sig, "' at 0x").concat(sigOffset.toString(16)));
                                                        }
                                                        id = readUint16(reader);
                                                        readPascalString(reader, 2); // name
                                                        return [4 /*yield*/, readSection(reader, 2, function (left) { return __awaiter(_this, void 0, void 0, function () {
                                                                var handler, skip, e_1, _a, _b, _c, _d;
                                                                return __generator(this, function (_e) {
                                                                    switch (_e.label) {
                                                                        case 0:
                                                                            handler = imageResources_1.resourceHandlersMap[id];
                                                                            skip = id === 1036 && !!options.skipThumbnail;
                                                                            if (!psd.imageResources) {
                                                                                psd.imageResources = {};
                                                                            }
                                                                            if (!(handler && !skip)) return [3 /*break*/, 6];
                                                                            _e.label = 1;
                                                                        case 1:
                                                                            _e.trys.push([1, 3, , 5]);
                                                                            return [4 /*yield*/, handler.read(reader, psd.imageResources, left, options)];
                                                                        case 2:
                                                                            _e.sent();
                                                                            return [3 /*break*/, 5];
                                                                        case 3:
                                                                            e_1 = _e.sent();
                                                                            if (options.throwForMissingFeatures)
                                                                                throw e_1;
                                                                            _a = skipBytes;
                                                                            _b = [reader];
                                                                            return [4 /*yield*/, left()];
                                                                        case 4:
                                                                            _a.apply(void 0, _b.concat([_e.sent()]));
                                                                            return [3 /*break*/, 5];
                                                                        case 5: return [3 /*break*/, 8];
                                                                        case 6:
                                                                            // options.logMissingFeatures && console.log(`Unhandled image resource: ${id} (${await left()})`);
                                                                            _c = skipBytes;
                                                                            _d = [reader];
                                                                            return [4 /*yield*/, left()];
                                                                        case 7:
                                                                            // options.logMissingFeatures && console.log(`Unhandled image resource: ${id} (${await left()})`);
                                                                            _c.apply(void 0, _d.concat([_e.sent()]));
                                                                            _e.label = 8;
                                                                        case 8: return [2 /*return*/];
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
                case 2:
                    // image resources
                    _b.sent();
                    // layer and mask info
                    return [4 /*yield*/, readSection(reader, 1, function (left) { return __awaiter(_this, void 0, void 0, function () {
                            var globalLayerMaskInfo, _a, _b, _c, _d;
                            var _this = this;
                            return __generator(this, function (_e) {
                                switch (_e.label) {
                                    case 0: return [4 /*yield*/, readSection(reader, 2, function (left) { return __awaiter(_this, void 0, void 0, function () {
                                            var _a, _b;
                                            return __generator(this, function (_c) {
                                                switch (_c.label) {
                                                    case 0: return [4 /*yield*/, readLayerInfo(reader, psd, options, postImageDataHandler)];
                                                    case 1:
                                                        _c.sent();
                                                        _a = skipBytes;
                                                        _b = [reader];
                                                        return [4 /*yield*/, left()];
                                                    case 2:
                                                        _a.apply(void 0, _b.concat([_c.sent()]));
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); }, undefined, options.large)];
                                    case 1:
                                        _e.sent();
                                        return [4 /*yield*/, left()];
                                    case 2:
                                        if (!((_e.sent()) > 0)) return [3 /*break*/, 4];
                                        return [4 /*yield*/, readGlobalLayerMaskInfo(reader)];
                                    case 3:
                                        globalLayerMaskInfo = _e.sent();
                                        if (globalLayerMaskInfo)
                                            psd.globalLayerMaskInfo = globalLayerMaskInfo;
                                        return [3 /*break*/, 6];
                                    case 4:
                                        // revert back to end of section if exceeded section limits
                                        // opt.logMissingFeatures && console.log('reverting to end of section');
                                        _a = skipBytes;
                                        _b = [reader];
                                        return [4 /*yield*/, left()];
                                    case 5:
                                        // revert back to end of section if exceeded section limits
                                        // opt.logMissingFeatures && console.log('reverting to end of section');
                                        _a.apply(void 0, _b.concat([_e.sent()]));
                                        _e.label = 6;
                                    case 6: return [4 /*yield*/, left()];
                                    case 7:
                                        if (!((_e.sent()) > 0)) return [3 /*break*/, 16];
                                        _e.label = 8;
                                    case 8: return [4 /*yield*/, left()];
                                    case 9:
                                        if (!((_e.sent()) && peekUint8(reader) === 0)) return [3 /*break*/, 10];
                                        // opt.logMissingFeatures && console.log('skipping 0 byte');
                                        skipBytes(reader, 1);
                                        return [3 /*break*/, 8];
                                    case 10: return [4 /*yield*/, left()];
                                    case 11:
                                        if (!((_e.sent()) >= 12)) return [3 /*break*/, 13];
                                        return [4 /*yield*/, readAdditionalLayerInfo(reader, psd, psd, options)];
                                    case 12:
                                        _e.sent();
                                        return [3 /*break*/, 15];
                                    case 13:
                                        // opt.logMissingFeatures && console.log('skipping leftover bytes', await left());
                                        _c = skipBytes;
                                        _d = [reader];
                                        return [4 /*yield*/, left()];
                                    case 14:
                                        // opt.logMissingFeatures && console.log('skipping leftover bytes', await left());
                                        _c.apply(void 0, _d.concat([_e.sent()]));
                                        _e.label = 15;
                                    case 15: return [3 /*break*/, 6];
                                    case 16: return [2 /*return*/];
                                }
                            });
                        }); }, undefined, options.large)];
                case 3:
                    // layer and mask info
                    _b.sent();
                    hasChildren = psd.children && psd.children.length;
                    skipComposite = options.skipCompositeImageData &&
                        (options.skipLayerImageData || hasChildren);
                    if (!!skipComposite) return [3 /*break*/, 5];
                    return [4 /*yield*/, readImageData(reader, psd, options, postImageDataHandler)];
                case 4:
                    _b.sent();
                    _b.label = 5;
                case 5: 
                // TODO: show converted color mode instead of original PSD file color mode
                //       but add option to preserve file color mode (need to return image data instead of canvas in that case)
                // psd.colorMode = ColorMode.RGB; // we convert all color modes to RGB
                return [2 /*return*/, psd];
            }
        });
    });
}
exports.readPsd = readPsd;
function readLayerInfo(reader, psd, options, postImageDataHandler) {
    if (postImageDataHandler === void 0) { postImageDataHandler = function (_data, _id) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    }; }
    return __awaiter(this, void 0, void 0, function () {
        var layerCount, layers, layerChannels, i, _a, layer, channels, i, stack, i, l, type;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    layerCount = readInt16(reader);
                    if (layerCount < 0) {
                        options.globalAlpha = true;
                        layerCount = -layerCount;
                    }
                    layers = [];
                    layerChannels = [];
                    i = 0;
                    _b.label = 1;
                case 1:
                    if (!(i < layerCount)) return [3 /*break*/, 4];
                    return [4 /*yield*/, readLayerRecord(reader, psd, options)];
                case 2:
                    _a = _b.sent(), layer = _a.layer, channels = _a.channels;
                    layers.push(layer);
                    layerChannels.push(channels);
                    _b.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4:
                    if (!!options.skipLayerImageData) return [3 /*break*/, 8];
                    i = 0;
                    _b.label = 5;
                case 5:
                    if (!(i < layerCount)) return [3 /*break*/, 8];
                    return [4 /*yield*/, readLayerChannelImageData(reader, psd, layers[i], layerChannels[i], options, postImageDataHandler)];
                case 6:
                    _b.sent();
                    _b.label = 7;
                case 7:
                    i++;
                    return [3 /*break*/, 5];
                case 8:
                    if (!psd.children)
                        psd.children = [];
                    stack = [psd];
                    for (i = layers.length - 1; i >= 0; i--) {
                        l = layers[i];
                        type = l.sectionDivider
                            ? l.sectionDivider.type
                            : 0 /* SectionDividerType.Other */;
                        if (type === 1 /* SectionDividerType.OpenFolder */ ||
                            type === 2 /* SectionDividerType.ClosedFolder */) {
                            l.opened = type === 1 /* SectionDividerType.OpenFolder */;
                            l.children = [];
                            stack[stack.length - 1].children.unshift(l);
                            stack.push(l);
                        }
                        else if (type === 3 /* SectionDividerType.BoundingSectionDivider */) {
                            stack.pop();
                            // this was workaround because I didn't know what `lsdk` section was, now it's probably not needed anymore
                            // } else if (l.name === '</Layer group>' && !l.sectionDivider && !l.top && !l.left && !l.bottom && !l.right) {
                            // 	// sometimes layer group terminator doesn't have sectionDivider, so we just guess here (PS bug ?)
                            // 	stack.pop();
                        }
                        else {
                            stack[stack.length - 1].children.unshift(l);
                        }
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.readLayerInfo = readLayerInfo;
function readLayerRecord(reader, psd, options) {
    return __awaiter(this, void 0, void 0, function () {
        var layer, channelCount, channels, i, id, length_1, blendMode, flags;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    layer = {};
                    layer.top = readInt32(reader);
                    layer.left = readInt32(reader);
                    layer.bottom = readInt32(reader);
                    layer.right = readInt32(reader);
                    channelCount = readUint16(reader);
                    channels = [];
                    for (i = 0; i < channelCount; i++) {
                        id = readInt16(reader);
                        length_1 = readUint32(reader);
                        if (options.large) {
                            if (length_1 !== 0)
                                throw new Error("Sizes larger than 4GB are not supported");
                            length_1 = readUint32(reader);
                        }
                        channels.push({ id: id, length: length_1 });
                    }
                    checkSignature(reader, "8BIM");
                    blendMode = readSignature(reader);
                    if (!helpers_1.toBlendMode[blendMode])
                        throw new Error("Invalid blend mode: '".concat(blendMode, "'"));
                    layer.blendMode = helpers_1.toBlendMode[blendMode];
                    layer.opacity = readUint8(reader) / 0xff;
                    layer.clipping = readUint8(reader) === 1;
                    flags = readUint8(reader);
                    layer.transparencyProtected = (flags & 0x01) !== 0;
                    layer.hidden = (flags & 0x02) !== 0;
                    if (flags & 0x20)
                        layer.effectsOpen = true;
                    // 0x04 - obsolete
                    // 0x08 - 1 for Photoshop 5.0 and later, tells if bit 4 has useful information
                    // 0x10 - pixel data irrelevant to appearance of document
                    // 0x20 - effects/filters panel is expanded
                    skipBytes(reader, 1);
                    return [4 /*yield*/, readSection(reader, 1, function (left) { return __awaiter(_this, void 0, void 0, function () {
                            var mask;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, readLayerMaskData(reader, options)];
                                    case 1:
                                        mask = _a.sent();
                                        if (mask)
                                            layer.mask = mask;
                                        /*const blendingRanges =*/ return [4 /*yield*/, readLayerBlendingRanges(reader)];
                                    case 2:
                                        /*const blendingRanges =*/ _a.sent();
                                        layer.name = readPascalString(reader, 4);
                                        _a.label = 3;
                                    case 3: return [4 /*yield*/, left()];
                                    case 4:
                                        if (!((_a.sent()) > 0)) return [3 /*break*/, 6];
                                        return [4 /*yield*/, readAdditionalLayerInfo(reader, layer, psd, options)];
                                    case 5:
                                        _a.sent();
                                        return [3 /*break*/, 3];
                                    case 6: return [2 /*return*/];
                                }
                            });
                        }); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, { layer: layer, channels: channels }];
            }
        });
    });
}
function readLayerMaskData(reader, options) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, readSection(reader, 1, function (left) { return __awaiter(_this, void 0, void 0, function () {
                    var mask, flags, params, _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0: return [4 /*yield*/, left()];
                            case 1:
                                if (!(_c.sent()))
                                    return [2 /*return*/, undefined];
                                mask = {};
                                mask.top = readInt32(reader);
                                mask.left = readInt32(reader);
                                mask.bottom = readInt32(reader);
                                mask.right = readInt32(reader);
                                mask.defaultColor = readUint8(reader);
                                flags = readUint8(reader);
                                mask.positionRelativeToLayer =
                                    (flags & 1 /* LayerMaskFlags.PositionRelativeToLayer */) !== 0;
                                mask.disabled = (flags & 2 /* LayerMaskFlags.LayerMaskDisabled */) !== 0;
                                mask.fromVectorData =
                                    (flags & 8 /* LayerMaskFlags.LayerMaskFromRenderingOtherData */) !== 0;
                                if (flags & 16 /* LayerMaskFlags.MaskHasParametersAppliedToIt */) {
                                    params = readUint8(reader);
                                    if (params & 1 /* MaskParams.UserMaskDensity */)
                                        mask.userMaskDensity = readUint8(reader) / 0xff;
                                    if (params & 2 /* MaskParams.UserMaskFeather */)
                                        mask.userMaskFeather = readFloat64(reader);
                                    if (params & 4 /* MaskParams.VectorMaskDensity */)
                                        mask.vectorMaskDensity = readUint8(reader) / 0xff;
                                    if (params & 8 /* MaskParams.VectorMaskFeather */)
                                        mask.vectorMaskFeather = readFloat64(reader);
                                }
                                return [4 /*yield*/, left()];
                            case 2:
                                if ((_c.sent()) > 2) {
                                    // TODO: handle these values, this is RealUserMask
                                    /*const realFlags = readUint8(reader);
                                          const realUserMaskBackground = readUint8(reader);
                                          const top2 = readInt32(reader);
                                          const left2 = readInt32(reader);
                                          const bottom2 = readInt32(reader);
                                          const right2 = readInt32(reader);
                              
                                          // TEMP
                                          (mask as any)._real = { realFlags, realUserMaskBackground, top2, left2, bottom2, right2 };*/
                                    if (options.logMissingFeatures) {
                                        console.log("Unhandled extra reaal user mask params");
                                    }
                                }
                                _a = skipBytes;
                                _b = [reader];
                                return [4 /*yield*/, left()];
                            case 3:
                                _a.apply(void 0, _b.concat([_c.sent()]));
                                return [2 /*return*/, mask];
                        }
                    });
                }); })];
        });
    });
}
function readLayerBlendingRanges(reader) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, readSection(reader, 1, function (left) { return __awaiter(_this, void 0, void 0, function () {
                    var compositeGrayBlendSource, compositeGraphBlendDestinationRange, ranges, sourceRange, destRange;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                compositeGrayBlendSource = readUint32(reader);
                                compositeGraphBlendDestinationRange = readUint32(reader);
                                ranges = [];
                                _a.label = 1;
                            case 1: return [4 /*yield*/, left()];
                            case 2:
                                if (!((_a.sent()) > 0)) return [3 /*break*/, 3];
                                sourceRange = readUint32(reader);
                                destRange = readUint32(reader);
                                ranges.push({ sourceRange: sourceRange, destRange: destRange });
                                return [3 /*break*/, 1];
                            case 3: return [2 /*return*/, {
                                    compositeGrayBlendSource: compositeGrayBlendSource,
                                    compositeGraphBlendDestinationRange: compositeGraphBlendDestinationRange,
                                    ranges: ranges,
                                }];
                        }
                    });
                }); })];
        });
    });
}
function readLayerChannelImageData(reader, psd, layer, channels, options, postImageDataHandler) {
    var _a, _b, _c, _d;
    if (postImageDataHandler === void 0) { postImageDataHandler = function (_data, _id) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    }; }
    return __awaiter(this, void 0, void 0, function () {
        var layerWidth, layerHeight, cmyk, imageData, p, _i, channels_1, channel, start, compression, mask, maskWidth, maskHeight, maskData, start_1, offset, targetData, cmykData;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    layerWidth = (layer.right || 0) - (layer.left || 0);
                    layerHeight = (layer.bottom || 0) - (layer.top || 0);
                    cmyk = psd.colorMode === 4 /* ColorMode.CMYK */;
                    if (layerWidth && layerHeight) {
                        if (cmyk) {
                            if (psd.bitsPerChannel !== 8)
                                throw new Error("bitsPerChannel Not supproted");
                            imageData = {
                                width: layerWidth,
                                height: layerHeight,
                                data: new Uint8ClampedArray(layerWidth * layerHeight * 5),
                            };
                            for (p = 4; p < imageData.data.byteLength; p += 5)
                                imageData.data[p] = 255;
                        }
                        else {
                            imageData = createImageDataBitDepth(layerWidth, layerHeight, (_a = psd.bitsPerChannel) !== null && _a !== void 0 ? _a : 8);
                            (0, helpers_1.resetImageData)(imageData);
                        }
                    }
                    if (helpers_1.RAW_IMAGE_DATA)
                        layer.imageDataRaw = [];
                    _i = 0, channels_1 = channels;
                    _e.label = 1;
                case 1:
                    if (!(_i < channels_1.length)) return [3 /*break*/, 6];
                    channel = channels_1[_i];
                    if (channel.length === 0)
                        return [3 /*break*/, 5];
                    if (channel.length < 2)
                        throw new Error("Invalid channel length");
                    start = reader.offset;
                    compression = readUint16(reader);
                    // try to fix broken files where there's 1 byte shift of channel
                    if (compression > 3) {
                        reader.offset -= 1;
                        compression = readUint16(reader);
                    }
                    // try to fix broken files where there's 1 byte shift of channel
                    if (compression > 3) {
                        reader.offset -= 3;
                        compression = readUint16(reader);
                    }
                    if (compression > 3)
                        throw new Error("Invalid compression: ".concat(compression));
                    if (!(channel.id === -2 /* ChannelID.UserMask */)) return [3 /*break*/, 4];
                    mask = layer.mask;
                    if (!mask)
                        throw new Error("Missing layer mask data");
                    maskWidth = (mask.right || 0) - (mask.left || 0);
                    maskHeight = (mask.bottom || 0) - (mask.top || 0);
                    if (!(maskWidth && maskHeight)) return [3 /*break*/, 3];
                    maskData = createImageDataBitDepth(maskWidth, maskHeight, (_b = psd.bitsPerChannel) !== null && _b !== void 0 ? _b : 8);
                    (0, helpers_1.resetImageData)(maskData);
                    start_1 = reader.offset;
                    readData(reader, channel.length, maskData, compression, maskWidth, maskHeight, (_c = psd.bitsPerChannel) !== null && _c !== void 0 ? _c : 8, 0, options.large, 4);
                    if (helpers_1.RAW_IMAGE_DATA) {
                        layer.maskDataRaw = new Uint8Array(reader.view.buffer, reader.view.byteOffset + start_1, reader.offset - start_1);
                    }
                    setupGrayscale(maskData);
                    if (options.useImageData) {
                        mask.imageData = maskData;
                    }
                    else if (options.useCanvasData) {
                        mask.canvas = (0, helpers_1.imageDataToCanvas)(maskData);
                    }
                    return [4 /*yield*/, postImageDataHandler(maskData, layer.id, layer.layerColor !== "none")];
                case 2:
                    _e.sent();
                    _e.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    if (channel.id === -3 /* ChannelID.RealUserMask */) {
                        if (options.logMissingFeatures) {
                            console.log("RealUserMask not supported");
                        }
                        reader.offset = start + channel.length;
                    }
                    else {
                        offset = (0, helpers_1.offsetForChannel)(channel.id, cmyk);
                        targetData = imageData;
                        if (offset < 0) {
                            targetData = undefined;
                            if (options.throwForMissingFeatures) {
                                throw new Error("Channel not supported: ".concat(channel.id));
                            }
                        }
                        readData(reader, channel.length, targetData, compression, layerWidth, layerHeight, (_d = psd.bitsPerChannel) !== null && _d !== void 0 ? _d : 8, offset, options.large, cmyk ? 5 : 4);
                        if (helpers_1.RAW_IMAGE_DATA) {
                            layer.imageDataRaw[channel.id] = new Uint8Array(reader.view.buffer, reader.view.byteOffset + start + 2, channel.length - 2);
                        }
                        reader.offset = start + channel.length;
                        if (targetData && psd.colorMode === 1 /* ColorMode.Grayscale */) {
                            setupGrayscale(targetData);
                        }
                    }
                    _e.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6:
                    if (!imageData) return [3 /*break*/, 8];
                    if (cmyk) {
                        cmykData = imageData;
                        imageData = (0, helpers_1.createImageData)(cmykData.width, cmykData.height);
                        cmykToRgb(cmykData, imageData, false);
                    }
                    if (options.useImageData) {
                        layer.imageData = imageData;
                    }
                    else if (options.useCanvasData) {
                        layer.canvas = (0, helpers_1.imageDataToCanvas)(imageData);
                    }
                    return [4 /*yield*/, postImageDataHandler(imageData, layer.id, layer.layerColor !== "none")];
                case 7:
                    _e.sent();
                    _e.label = 8;
                case 8: return [2 /*return*/];
            }
        });
    });
}
function readData(reader, length, data, compression, width, height, bitDepth, offset, large, step) {
    if (compression === 0 /* Compression.RawData */) {
        readDataRaw(reader, data, width, height, bitDepth, step, offset);
    }
    else if (compression === 1 /* Compression.RleCompressed */) {
        readDataRLE(reader, data, width, height, bitDepth, step, [offset], large);
    }
    else if (compression === 2 /* Compression.ZipWithoutPrediction */) {
        readDataZip(reader, length, data, width, height, bitDepth, step, offset, false);
    }
    else if (compression === 3 /* Compression.ZipWithPrediction */) {
        readDataZip(reader, length, data, width, height, bitDepth, step, offset, true);
    }
    else {
        throw new Error("Invalid Compression type: ".concat(compression));
    }
}
function readGlobalLayerMaskInfo(reader) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, readSection(reader, 1, function (left) { return __awaiter(_this, void 0, void 0, function () {
                    var overlayColorSpace, colorSpace1, colorSpace2, colorSpace3, colorSpace4, opacity, kind, _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0: return [4 /*yield*/, left()];
                            case 1:
                                if (!(_c.sent()))
                                    return [2 /*return*/, undefined];
                                overlayColorSpace = readUint16(reader);
                                colorSpace1 = readUint16(reader);
                                colorSpace2 = readUint16(reader);
                                colorSpace3 = readUint16(reader);
                                colorSpace4 = readUint16(reader);
                                opacity = readUint16(reader) / 0xff;
                                kind = readUint8(reader);
                                _a = skipBytes;
                                _b = [reader];
                                return [4 /*yield*/, left()];
                            case 2:
                                _a.apply(void 0, _b.concat([_c.sent()])); // 3 bytes of padding ?
                                return [2 /*return*/, {
                                        overlayColorSpace: overlayColorSpace,
                                        colorSpace1: colorSpace1,
                                        colorSpace2: colorSpace2,
                                        colorSpace3: colorSpace3,
                                        colorSpace4: colorSpace4,
                                        opacity: opacity,
                                        kind: kind,
                                    }];
                        }
                    });
                }); })];
        });
    });
}
exports.readGlobalLayerMaskInfo = readGlobalLayerMaskInfo;
function readAdditionalLayerInfo(reader, target, psd, options) {
    return __awaiter(this, void 0, void 0, function () {
        var sig, key, u64;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sig = readSignature(reader);
                    if (sig !== "8BIM" && sig !== "8B64")
                        throw new Error("Invalid signature: '".concat(sig, "' at 0x").concat((reader.offset - 4).toString(16)));
                    key = readSignature(reader);
                    u64 = sig === "8B64" ||
                        (options.large && helpers_1.largeAdditionalInfoKeys.indexOf(key) !== -1);
                    return [4 /*yield*/, readSection(reader, 2, function (left) { return __awaiter(_this, void 0, void 0, function () {
                            var handler, e_2, _a, _b, _c, _d, _e, _f, _g, _h;
                            return __generator(this, function (_j) {
                                switch (_j.label) {
                                    case 0:
                                        handler = additionalInfo_1.infoHandlersMap[key];
                                        if (!handler) return [3 /*break*/, 5];
                                        _j.label = 1;
                                    case 1:
                                        _j.trys.push([1, 3, , 4]);
                                        return [4 /*yield*/, handler.read(reader, target, left, psd, options)];
                                    case 2:
                                        _j.sent();
                                        return [3 /*break*/, 4];
                                    case 3:
                                        e_2 = _j.sent();
                                        if (options.throwForMissingFeatures)
                                            throw e_2;
                                        return [3 /*break*/, 4];
                                    case 4: return [3 /*break*/, 7];
                                    case 5:
                                        options.logMissingFeatures &&
                                            console.log("Unhandled additional info: ".concat(key));
                                        _a = skipBytes;
                                        _b = [reader];
                                        return [4 /*yield*/, left()];
                                    case 6:
                                        _a.apply(void 0, _b.concat([_j.sent()]));
                                        _j.label = 7;
                                    case 7: return [4 /*yield*/, left()];
                                    case 8:
                                        if (!_j.sent()) return [3 /*break*/, 12];
                                        _c = options.logMissingFeatures;
                                        if (!_c) return [3 /*break*/, 10];
                                        _e = (_d = console).log;
                                        _f = "Unread ".concat;
                                        return [4 /*yield*/, left()];
                                    case 9:
                                        _c = _e.apply(_d, [_f.apply("Unread ", [_j.sent(), " bytes left for additional info: "]).concat(key)]);
                                        _j.label = 10;
                                    case 10:
                                        _c;
                                        _g = skipBytes;
                                        _h = [reader];
                                        return [4 /*yield*/, left()];
                                    case 11:
                                        _g.apply(void 0, _h.concat([_j.sent()]));
                                        _j.label = 12;
                                    case 12: return [2 /*return*/];
                                }
                            });
                        }); }, false, u64)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.readAdditionalLayerInfo = readAdditionalLayerInfo;
function createImageDataBitDepth(width, height, bitDepth) {
    if (bitDepth === 1 || bitDepth === 8) {
        return (0, helpers_1.createImageData)(width, height);
    }
    else if (bitDepth === 16) {
        return { width: width, height: height, data: new Uint16Array(width * height * 4) };
    }
    else if (bitDepth === 32) {
        return { width: width, height: height, data: new Float32Array(width * height * 4) };
    }
    else {
        throw new Error("Invalid bitDepth (".concat(bitDepth, ")"));
    }
}
function readImageData(reader, psd, options, postImageDataHandler) {
    var _a, _b;
    if (postImageDataHandler === void 0) { postImageDataHandler = function (_data, _id) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    }; }
    return __awaiter(this, void 0, void 0, function () {
        var compression, bitsPerChannel, imageData, bytes, channels, i, i, start, channels, cmykImageData, start, p, size, i, pa, a, ra, invA;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    compression = readUint16(reader);
                    bitsPerChannel = (_a = psd.bitsPerChannel) !== null && _a !== void 0 ? _a : 8;
                    if (exports.supportedColorModes.indexOf(psd.colorMode) === -1)
                        throw new Error("Color mode not supported: ".concat(psd.colorMode));
                    if (compression !== 0 /* Compression.RawData */ &&
                        compression !== 1 /* Compression.RleCompressed */)
                        throw new Error("Compression type not supported: ".concat(compression));
                    imageData = createImageDataBitDepth(psd.width, psd.height, bitsPerChannel);
                    (0, helpers_1.resetImageData)(imageData);
                    switch (psd.colorMode) {
                        case 0 /* ColorMode.Bitmap */: {
                            if (bitsPerChannel !== 1)
                                throw new Error("Invalid bitsPerChannel for bitmap color mode");
                            bytes = void 0;
                            if (compression === 0 /* Compression.RawData */) {
                                bytes = readBytes(reader, Math.ceil(psd.width / 8) * psd.height);
                            }
                            else if (compression === 1 /* Compression.RleCompressed */) {
                                bytes = new Uint8Array(psd.width * psd.height);
                                readDataRLE(reader, { data: bytes, width: psd.width, height: psd.height }, psd.width, psd.height, 8, 1, [0], options.large);
                            }
                            else {
                                throw new Error("Bitmap compression not supported: ".concat(compression));
                            }
                            (0, helpers_1.decodeBitmap)(bytes, imageData.data, psd.width, psd.height);
                            break;
                        }
                        case 3 /* ColorMode.RGB */:
                        case 1 /* ColorMode.Grayscale */: {
                            channels = psd.colorMode === 1 /* ColorMode.Grayscale */ ? [0] : [0, 1, 2];
                            if (psd.channels && psd.channels > 3) {
                                for (i = 3; i < psd.channels; i++) {
                                    // TODO: store these channels in additional image data
                                    channels.push(i);
                                }
                            }
                            else if (options.globalAlpha) {
                                channels.push(3);
                            }
                            if (compression === 0 /* Compression.RawData */) {
                                for (i = 0; i < channels.length; i++) {
                                    readDataRaw(reader, imageData, psd.width, psd.height, bitsPerChannel, 4, channels[i]);
                                }
                            }
                            else if (compression === 1 /* Compression.RleCompressed */) {
                                start = reader.offset;
                                readDataRLE(reader, imageData, psd.width, psd.height, bitsPerChannel, 4, channels, options.large);
                                if (helpers_1.RAW_IMAGE_DATA)
                                    psd.imageDataRaw = new Uint8Array(reader.view.buffer, reader.view.byteOffset + start, reader.offset - start);
                            }
                            if (psd.colorMode === 1 /* ColorMode.Grayscale */) {
                                setupGrayscale(imageData);
                            }
                            break;
                        }
                        case 4 /* ColorMode.CMYK */: {
                            if (psd.bitsPerChannel !== 8)
                                throw new Error("bitsPerChannel Not supproted");
                            if (psd.channels !== 4)
                                throw new Error("Invalid channel count");
                            channels = [0, 1, 2, 3];
                            if (options.globalAlpha)
                                channels.push(4);
                            if (compression === 0 /* Compression.RawData */) {
                                throw new Error("Not implemented");
                                // TODO: ...
                                // for (let i = 0; i < channels.length; i++) {
                                // 	readDataRaw(reader, imageData, channels[i], psd.width, psd.height);
                                // }
                            }
                            else if (compression === 1 /* Compression.RleCompressed */) {
                                cmykImageData = {
                                    width: imageData.width,
                                    height: imageData.height,
                                    data: new Uint8Array(imageData.width * imageData.height * 5),
                                };
                                start = reader.offset;
                                readDataRLE(reader, cmykImageData, psd.width, psd.height, (_b = psd.bitsPerChannel) !== null && _b !== void 0 ? _b : 8, 5, channels, options.large);
                                cmykToRgb(cmykImageData, imageData, true);
                                if (helpers_1.RAW_IMAGE_DATA)
                                    psd.imageDataRaw = new Uint8Array(reader.view.buffer, reader.view.byteOffset + start, reader.offset - start);
                            }
                            break;
                        }
                        default:
                            throw new Error("Color mode not supported: ".concat(psd.colorMode));
                    }
                    // remove weird white matte
                    if (options.globalAlpha) {
                        if (psd.bitsPerChannel !== 8)
                            throw new Error("bitsPerChannel Not supproted");
                        p = imageData.data;
                        size = imageData.width * imageData.height * 4;
                        for (i = 0; i < size; i += 4) {
                            pa = p[i + 3];
                            if (pa != 0 && pa != 255) {
                                a = pa / 255;
                                ra = 1 / a;
                                invA = 255 * (1 - ra);
                                p[i + 0] = p[i + 0] * ra + invA;
                                p[i + 1] = p[i + 1] * ra + invA;
                                p[i + 2] = p[i + 2] * ra + invA;
                            }
                        }
                    }
                    if (options.useImageData) {
                        psd.imageData = imageData;
                    }
                    else if (options.useCanvasData) {
                        psd.canvas = (0, helpers_1.imageDataToCanvas)(imageData);
                    }
                    return [4 /*yield*/, postImageDataHandler(imageData, -1, false)];
                case 1:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function cmykToRgb(cmyk, rgb, reverseAlpha) {
    var size = rgb.width * rgb.height * 4;
    var srcData = cmyk.data;
    var dstData = rgb.data;
    for (var src = 0, dst = 0; dst < size; src += 5, dst += 4) {
        var c = srcData[src];
        var m = srcData[src + 1];
        var y = srcData[src + 2];
        var k = srcData[src + 3];
        dstData[dst] = (((c * k) | 0) / 255) | 0;
        dstData[dst + 1] = (((m * k) | 0) / 255) | 0;
        dstData[dst + 2] = (((y * k) | 0) / 255) | 0;
        dstData[dst + 3] = reverseAlpha ? 255 - srcData[src + 4] : srcData[src + 4];
    }
    // for (let src = 0, dst = 0; dst < size; src += 5, dst += 4) {
    // 	const c = 1 - (srcData[src + 0] / 255);
    // 	const m = 1 - (srcData[src + 1] / 255);
    // 	const y = 1 - (srcData[src + 2] / 255);
    // 	// const k = srcData[src + 3] / 255;
    // 	dstData[dst + 0] = ((1 - c * 0.8) * 255) | 0;
    // 	dstData[dst + 1] = ((1 - m * 0.8) * 255) | 0;
    // 	dstData[dst + 2] = ((1 - y * 0.8) * 255) | 0;
    // 	dstData[dst + 3] = reverseAlpha ? 255 - srcData[src + 4] : srcData[src + 4];
    // }
}
function verifyCompatible(a, b) {
    if (a.byteLength / a.length !== b.byteLength / b.length) {
        throw new Error("Invalid array types");
    }
}
function bytesToArray(bytes, bitDepth) {
    if (bitDepth === 8) {
        return bytes;
    }
    else if (bitDepth === 16) {
        if (bytes.byteOffset % 2) {
            var result = new Uint16Array(bytes.byteLength / 2);
            new Uint8Array(result.buffer, result.byteOffset, result.byteLength).set(bytes);
            return result;
        }
        else {
            return new Uint16Array(bytes.buffer, bytes.byteOffset, bytes.byteLength / 2);
        }
    }
    else if (bitDepth === 32) {
        if (bytes.byteOffset % 4) {
            var result = new Float32Array(bytes.byteLength / 4);
            new Uint8Array(result.buffer, result.byteOffset, result.byteLength).set(bytes);
            return result;
        }
        else {
            return new Float32Array(bytes.buffer, bytes.byteOffset, bytes.byteLength / 4);
        }
    }
    else {
        throw new Error("Invalid bitDepth (".concat(bitDepth, ")"));
    }
}
function copyChannelToPixelData(pixelData, channel, offset, step) {
    verifyCompatible(pixelData.data, channel);
    var size = pixelData.width * pixelData.height;
    var data = pixelData.data;
    for (var i = 0, p = offset | 0; i < size; i++, p = (p + step) | 0) {
        data[p] = channel[i];
    }
}
function readDataRaw(reader, pixelData, width, height, bitDepth, step, offset) {
    var buffer = readBytes(reader, width * height * Math.floor(bitDepth / 8));
    if (bitDepth == 32) {
        for (var i = 0; i < buffer.byteLength; i += 4) {
            var a = buffer[i + 0];
            var b = buffer[i + 1];
            var c = buffer[i + 2];
            var d = buffer[i + 3];
            buffer[i + 0] = d;
            buffer[i + 1] = c;
            buffer[i + 2] = b;
            buffer[i + 3] = a;
        }
    }
    var array = bytesToArray(buffer, bitDepth);
    if (pixelData && offset < step) {
        copyChannelToPixelData(pixelData, array, offset, step);
    }
}
function decodePredicted(data, width, height, mod) {
    for (var y = 0; y < height; y++) {
        var offset = y * width;
        for (var x = 1, o = offset + 1; x < width; x++, o++) {
            data[o] = (data[o - 1] + data[o]) % mod;
        }
    }
}
function readDataZip(reader, length, pixelData, width, height, bitDepth, step, offset, prediction) {
    var compressed = readBytes(reader, length);
    var decompressed = (0, pako_1.inflate)(compressed);
    if (pixelData && offset < step) {
        var array = bytesToArray(decompressed, bitDepth);
        if (bitDepth === 8) {
            if (prediction)
                decodePredicted(decompressed, width, height, 0x100);
            copyChannelToPixelData(pixelData, decompressed, offset, step);
        }
        else if (bitDepth === 16) {
            if (prediction)
                decodePredicted(array, width, height, 0x10000);
            copyChannelToPixelData(pixelData, array, offset, step);
        }
        else if (bitDepth === 32) {
            if (prediction)
                decodePredicted(decompressed, width * 4, height, 0x100);
            var di = offset;
            var dst = new Uint32Array(pixelData.data.buffer, pixelData.data.byteOffset, pixelData.data.length);
            for (var y = 0; y < height; y++) {
                var a = width * 4 * y;
                for (var x = 0; x < width; x++, a++, di += step) {
                    var b = a + width;
                    var c = b + width;
                    var d = c + width;
                    dst[di] =
                        ((decompressed[a] << 24) |
                            (decompressed[b] << 16) |
                            (decompressed[c] << 8) |
                            decompressed[d]) >>>
                            0;
                }
            }
        }
        else {
            throw new Error("Invalid bitDepth");
        }
    }
}
exports.readDataZip = readDataZip;
function readDataRLE(reader, pixelData, _width, height, bitDepth, step, offsets, large) {
    var data = pixelData && pixelData.data;
    var lengths;
    if (large) {
        lengths = new Uint32Array(offsets.length * height);
        for (var o = 0, li = 0; o < offsets.length; o++) {
            for (var y = 0; y < height; y++, li++) {
                lengths[li] = readUint32(reader);
            }
        }
    }
    else {
        lengths = new Uint16Array(offsets.length * height);
        for (var o = 0, li = 0; o < offsets.length; o++) {
            for (var y = 0; y < height; y++, li++) {
                lengths[li] = readUint16(reader);
            }
        }
    }
    if (bitDepth !== 1 && bitDepth !== 8)
        throw new Error("Invalid bit depth (".concat(bitDepth, ")"));
    var extraLimit = (step - 1) | 0; // 3 for rgb, 4 for cmyk
    for (var c = 0, li = 0; c < offsets.length; c++) {
        var offset = offsets[c] | 0;
        var extra = c > extraLimit || offset > extraLimit;
        if (!data || extra) {
            for (var y = 0; y < height; y++, li++) {
                skipBytes(reader, lengths[li]);
            }
        }
        else {
            for (var y = 0, p = offset | 0; y < height; y++, li++) {
                var length_2 = lengths[li];
                var buffer = readBytes(reader, length_2);
                for (var i = 0; i < length_2; i++) {
                    var header = buffer[i];
                    if (header > 128) {
                        var value = buffer[++i];
                        header = (256 - header) | 0;
                        for (var j = 0; j <= header; j = (j + 1) | 0) {
                            data[p] = value;
                            p = (p + step) | 0;
                        }
                    }
                    else if (header < 128) {
                        for (var j = 0; j <= header; j = (j + 1) | 0) {
                            data[p] = buffer[++i];
                            p = (p + step) | 0;
                        }
                    }
                    else {
                        // ignore 128
                    }
                    // This showed up on some images from non-photoshop programs, ignoring it seems to work just fine.
                    // if (i >= length) throw new Error(`Invalid RLE data: exceeded buffer size ${i}/${length}`);
                }
            }
        }
    }
}
exports.readDataRLE = readDataRLE;
function readSection(reader, round, func, skipEmpty, eightBytes) {
    if (skipEmpty === void 0) { skipEmpty = true; }
    if (eightBytes === void 0) { eightBytes = false; }
    return __awaiter(this, void 0, void 0, function () {
        var length, end, result;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    length = readUint32(reader);
                    if (eightBytes) {
                        if (length !== 0)
                            throw new Error("Sizes larger than 4GB are not supported");
                        length = readUint32(reader);
                    }
                    if (length <= 0 && skipEmpty)
                        return [2 /*return*/, undefined];
                    end = reader.offset + length;
                    if (end > reader.view.byteLength)
                        throw new Error("Section exceeds file size");
                    return [4 /*yield*/, func(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, end - reader.offset];
                        }); }); })];
                case 1:
                    result = _a.sent();
                    if (reader.offset !== end) {
                        if (reader.offset > end) {
                            warnOrThrow(reader, "Exceeded section limits");
                        }
                        else {
                            warnOrThrow(reader, "Unread section data"); // : ${end - reader.offset} bytes at 0x${reader.offset.toString(16)}`);
                        }
                    }
                    while (end % round)
                        end++;
                    reader.offset = end;
                    return [2 /*return*/, result];
            }
        });
    });
}
exports.readSection = readSection;
function readColor(reader) {
    var colorSpace = readUint16(reader);
    switch (colorSpace) {
        case 0 /* ColorSpace.RGB */: {
            var r = readUint16(reader) / 257;
            var g = readUint16(reader) / 257;
            var b = readUint16(reader) / 257;
            skipBytes(reader, 2);
            return { r: r, g: g, b: b };
        }
        case 1 /* ColorSpace.HSB */: {
            var h = readUint16(reader) / 0xffff;
            var s = readUint16(reader) / 0xffff;
            var b = readUint16(reader) / 0xffff;
            skipBytes(reader, 2);
            return { h: h, s: s, b: b };
        }
        case 2 /* ColorSpace.CMYK */: {
            var c = readUint16(reader) / 257;
            var m = readUint16(reader) / 257;
            var y = readUint16(reader) / 257;
            var k = readUint16(reader) / 257;
            return { c: c, m: m, y: y, k: k };
        }
        case 7 /* ColorSpace.Lab */: {
            var l = readInt16(reader) / 10000;
            var ta = readInt16(reader);
            var tb = readInt16(reader);
            var a = ta < 0 ? ta / 12800 : ta / 12700;
            var b = tb < 0 ? tb / 12800 : tb / 12700;
            skipBytes(reader, 2);
            return { l: l, a: a, b: b };
        }
        case 8 /* ColorSpace.Grayscale */: {
            var k = (readUint16(reader) * 255) / 10000;
            skipBytes(reader, 6);
            return { k: k };
        }
        default:
            throw new Error("Invalid color space");
    }
}
exports.readColor = readColor;
function readPattern(reader) {
    readUint32(reader); // length
    var version = readUint32(reader);
    if (version !== 1)
        throw new Error("Invalid pattern version: ".concat(version));
    var colorMode = readUint32(reader);
    var x = readInt16(reader);
    var y = readInt16(reader);
    // we only support RGB and grayscale for now
    if (colorMode !== 3 /* ColorMode.RGB */ &&
        colorMode !== 1 /* ColorMode.Grayscale */ &&
        colorMode !== 2 /* ColorMode.Indexed */) {
        throw new Error("Unsupported pattern color mode: ".concat(colorMode));
    }
    var name = readUnicodeString(reader);
    var id = readPascalString(reader, 1);
    var palette = [];
    if (colorMode === 2 /* ColorMode.Indexed */) {
        for (var i = 0; i < 256; i++) {
            palette.push({
                r: readUint8(reader),
                g: readUint8(reader),
                b: readUint8(reader),
            });
        }
        skipBytes(reader, 4); // no idea what this is
    }
    // virtual memory array list
    var version2 = readUint32(reader);
    if (version2 !== 3)
        throw new Error("Invalid pattern VMAL version: ".concat(version2));
    readUint32(reader); // length
    var top = readUint32(reader);
    var left = readUint32(reader);
    var bottom = readUint32(reader);
    var right = readUint32(reader);
    var channelsCount = readUint32(reader);
    var width = right - left;
    var height = bottom - top;
    var data = new Uint8Array(width * height * 4);
    for (var i = 3; i < data.byteLength; i += 4) {
        data[i] = 255;
    }
    for (var i = 0, ch = 0; i < channelsCount + 2; i++) {
        var has = readUint32(reader);
        if (!has)
            continue;
        var length_3 = readUint32(reader);
        var pixelDepth = readUint32(reader);
        var ctop = readUint32(reader);
        var cleft = readUint32(reader);
        var cbottom = readUint32(reader);
        var cright = readUint32(reader);
        var pixelDepth2 = readUint16(reader);
        var compressionMode = readUint8(reader); // 0 - raw, 1 - zip
        var dataLength = length_3 - (4 + 16 + 2 + 1);
        var cdata = readBytes(reader, dataLength);
        if (pixelDepth !== 8 || pixelDepth2 !== 8) {
            throw new Error("16bit pixel depth not supported for patterns");
        }
        var w = cright - cleft;
        var h = cbottom - ctop;
        var ox = cleft - left;
        var oy = ctop - top;
        if (compressionMode === 0) {
            if (colorMode === 3 /* ColorMode.RGB */ && ch < 3) {
                for (var y_1 = 0; y_1 < h; y_1++) {
                    for (var x_1 = 0; x_1 < w; x_1++) {
                        var src = x_1 + y_1 * w;
                        var dst = (ox + x_1 + (y_1 + oy) * width) * 4;
                        data[dst + ch] = cdata[src];
                    }
                }
            }
            if (colorMode === 1 /* ColorMode.Grayscale */ && ch < 1) {
                for (var y_2 = 0; y_2 < h; y_2++) {
                    for (var x_2 = 0; x_2 < w; x_2++) {
                        var src = x_2 + y_2 * w;
                        var dst = (ox + x_2 + (y_2 + oy) * width) * 4;
                        var value = cdata[src];
                        data[dst + 0] = value;
                        data[dst + 1] = value;
                        data[dst + 2] = value;
                    }
                }
            }
            if (colorMode === 2 /* ColorMode.Indexed */) {
                // TODO:
                throw new Error("Indexed pattern color mode not implemented");
            }
        }
        else if (compressionMode === 1) {
            // console.log({ colorMode });
            // require('fs').writeFileSync('zip.bin', Buffer.from(cdata));
            // const data = require('zlib').inflateRawSync(cdata);
            // const data = require('zlib').unzipSync(cdata);
            // console.log(data);
            // throw new Error('Zip compression not supported for pattern');
            // throw new Error('Unsupported pattern compression');
            console.error("Unsupported pattern compression");
            name += " (failed to decode)";
        }
        else {
            throw new Error("Invalid pattern compression mode");
        }
        ch++;
    }
    // TODO: use canvas instead of data ?
    return {
        id: id,
        name: name,
        x: x,
        y: y,
        bounds: { x: left, y: top, w: width, h: height },
        data: data,
    };
}
exports.readPattern = readPattern;
//# sourceMappingURL=psdReader.js.map