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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ESliceOrigin = exports.ESliceVertAlign = exports.ESliceHorzAlign = exports.ESliceType = exports.FrFl = exports.FStl = exports.ClrS = exports.gradientInterpolationMethodType = exports.stdTrackID = exports.animInterpStyleEnum = exports.GrdT = exports.IGSr = exports.BETE = exports.BESs = exports.bvlT = exports.BESl = exports.BlnM = exports.warpStyle = exports.Annt = exports.Ornt = exports.textGridding = exports.frac = exports.unitsValue = exports.unitsPercentF = exports.unitsPercent = exports.unitsAngle = exports.parseUnitsToNumber = exports.parseUnitsOrNumber = exports.parseUnits = exports.parsePercentOrAngle = exports.parsePercent = exports.parseAngle = exports.serializeColor = exports.parseColor = exports.serializeVectorContent = exports.parseVectorContent = exports.serializeTrackList = exports.parseTrackList = exports.parseEffects = exports.serializeEffects = exports.boundsToDescBounds = exports.descBoundsToBounds = exports.xyToHorzVrtc = exports.horzVrtcToXY = exports.writeVersionAndDescriptor = exports.readVersionAndDescriptor = exports.writeDescriptorStructure = exports.readDescriptorStructure = exports.readAsciiStringOrClassId = exports.setLogErrors = void 0;
exports.prjM = exports.FlMd = exports.IntC = exports.IntE = exports.Drct = exports.WndM = exports.CntE = exports.FlCl = exports.ExtR = exports.ExtT = exports.DfsM = exports.blurType = exports.Lns = exports.MztT = exports.Chnl = exports.Dstr = exports.ZZTy = exports.Wvtp = exports.SphM = exports.RplS = exports.Cnvr = exports.UndA = exports.DspM = exports.SmBQ = exports.SmBM = exports.BlrQ = exports.BlrM = exports.strokeStyleLineAlignment = exports.strokeStyleLineJoinType = exports.strokeStyleLineCapType = exports.ESliceBGColorType = void 0;
var helpers_1 = require("./helpers");
var psdReader_1 = require("./psdReader");
var psdWriter_1 = require("./psdWriter");
function revMap(map) {
    var result = {};
    Object.keys(map).forEach(function (key) { return result[map[key]] = key; });
    return result;
}
var unitsMap = {
    '#Ang': 'Angle',
    '#Rsl': 'Density',
    '#Rlt': 'Distance',
    '#Nne': 'None',
    '#Prc': 'Percent',
    '#Pxl': 'Pixels',
    '#Mlm': 'Millimeters',
    '#Pnt': 'Points',
    'RrPi': 'Picas',
    'RrIn': 'Inches',
    'RrCm': 'Centimeters',
};
var unitsMapRev = revMap(unitsMap);
var logErrors = false;
function setLogErrors(value) {
    logErrors = value;
}
exports.setLogErrors = setLogErrors;
function makeType(name, classID) {
    return { name: name, classID: classID };
}
var nullType = makeType('', 'null');
var fieldToExtType = {
    strokeStyleContent: makeType('', 'solidColorLayer'),
    // printProofSetup: makeType('校样设置', 'proofSetup'), // TESTING
    printProofSetup: makeType('Proof Setup', 'proofSetup'),
    patternFill: makeType('', 'patternFill'),
    Grad: makeType('Gradient', 'Grdn'),
    ebbl: makeType('', 'ebbl'),
    SoFi: makeType('', 'SoFi'),
    GrFl: makeType('', 'GrFl'),
    sdwC: makeType('', 'RGBC'),
    hglC: makeType('', 'RGBC'),
    'Clr ': makeType('', 'RGBC'),
    'tintColor': makeType('', 'RGBC'),
    Ofst: makeType('', 'Pnt '),
    ChFX: makeType('', 'ChFX'),
    MpgS: makeType('', 'ShpC'),
    DrSh: makeType('', 'DrSh'),
    IrSh: makeType('', 'IrSh'),
    OrGl: makeType('', 'OrGl'),
    IrGl: makeType('', 'IrGl'),
    TrnS: makeType('', 'ShpC'),
    Ptrn: makeType('', 'Ptrn'),
    FrFX: makeType('', 'FrFX'),
    phase: makeType('', 'Pnt '),
    frameStep: nullType,
    duration: nullType,
    workInTime: nullType,
    workOutTime: nullType,
    audioClipGroupList: nullType,
    bounds: makeType('', 'Rctn'),
    customEnvelopeWarp: makeType('', 'customEnvelopeWarp'),
    warp: makeType('', 'warp'),
    'Sz  ': makeType('', 'Pnt '),
    origin: makeType('', 'Pnt '),
    autoExpandOffset: makeType('', 'Pnt '),
    keyOriginShapeBBox: makeType('', 'unitRect'),
    Vrsn: nullType,
    psVersion: nullType,
    docDefaultNewArtboardBackgroundColor: makeType('', 'RGBC'),
    artboardRect: makeType('', 'classFloatRect'),
    keyOriginRRectRadii: makeType('', 'radii'),
    keyOriginBoxCorners: nullType,
    rectangleCornerA: makeType('', 'Pnt '),
    rectangleCornerB: makeType('', 'Pnt '),
    rectangleCornerC: makeType('', 'Pnt '),
    rectangleCornerD: makeType('', 'Pnt '),
    compInfo: nullType,
    Trnf: makeType('Transform', 'Trnf'),
    quiltWarp: makeType('', 'quiltWarp'),
    generatorSettings: nullType,
    crema: nullType,
    FrIn: nullType,
    blendOptions: nullType,
    FXRf: nullType,
    Lefx: nullType,
    time: nullType,
    animKey: nullType,
    timeScope: nullType,
    inTime: nullType,
    outTime: nullType,
    sheetStyle: nullType,
    translation: nullType,
    Skew: nullType,
    boundingBox: makeType('', 'boundingBox'),
    'Lnk ': makeType('', 'ExternalFileLink'),
    frameReader: makeType('', 'FrameReader'),
    effectParams: makeType('', 'motionTrackEffectParams'),
    Impr: makeType('None', 'none'),
    Anch: makeType('', 'Pnt '),
    'Fwd ': makeType('', 'Pnt '),
    'Bwd ': makeType('', 'Pnt '),
    FlrC: makeType('', 'Pnt '),
    meshBoundaryPath: makeType('', 'pathClass'),
    filterFX: makeType('', 'filterFXStyle'),
    Fltr: makeType('', 'rigidTransform'),
    FrgC: makeType('', 'RGBC'),
    BckC: makeType('', 'RGBC'),
    sdwM: makeType('Parameters', 'adaptCorrectTones'),
    hglM: makeType('Parameters', 'adaptCorrectTones'),
    customShape: makeType('', 'customShape'),
    origFXRefPoint: nullType,
    FXRefPoint: nullType,
};
var fieldToArrayExtType = {
    'Crv ': makeType('', 'CrPt'),
    Clrs: makeType('', 'Clrt'),
    Trns: makeType('', 'TrnS'),
    keyDescriptorList: nullType,
    solidFillMulti: makeType('', 'SoFi'),
    gradientFillMulti: makeType('', 'GrFl'),
    dropShadowMulti: makeType('', 'DrSh'),
    innerShadowMulti: makeType('', 'IrSh'),
    frameFXMulti: makeType('', 'FrFX'),
    FrIn: nullType,
    FSts: nullType,
    LaSt: nullType,
    sheetTimelineOptions: nullType,
    trackList: makeType('', 'animationTrack'),
    globalTrackList: makeType('', 'animationTrack'),
    keyList: nullType,
    audioClipGroupList: nullType,
    audioClipList: nullType,
    countObjectList: makeType('', 'countObject'),
    countGroupList: makeType('', 'countGroup'),
    slices: makeType('', 'slice'),
    'Pts ': makeType('', 'Pthp'),
    SbpL: makeType('', 'SbpL'),
    pathComponents: makeType('', 'PaCm'),
    filterFXList: makeType('', 'filterFX'),
    puppetShapeList: makeType('', 'puppetShape'),
    channelDenoise: makeType('', 'channelDenoiseParams'),
    ShrP: makeType('', 'Pnt '),
    layerSettings: nullType,
    list: nullType,
};
var typeToField = {
    'TEXT': [
        'Txt ', 'printerName', 'Nm  ', 'Idnt', 'blackAndWhitePresetFileName', 'LUT3DFileName',
        'presetFileName', 'curvesPresetFileName', 'mixerPresetFileName', 'placed', 'description', 'reason',
        'artboardPresetName', 'json', 'clipID', 'relPath', 'fullPath', 'mediaDescriptor', 'Msge',
        'altTag', 'url', 'cellText', 'preset', 'KnNm', 'FPth', 'comment',
    ],
    'tdta': [
        'EngineData', 'LUT3DFileData', 'indexArray', 'originalVertexArray', 'deformedVertexArray',
        'LqMe',
    ],
    'long': [
        'TextIndex', 'RndS', 'Mdpn', 'Smth', 'Lctn', 'strokeStyleVersion', 'LaID', 'Vrsn', 'Cnt ',
        'Brgh', 'Cntr', 'means', 'vibrance', 'Strt', 'bwPresetKind', 'presetKind', 'comp', 'compID', 'originalCompID',
        'curvesPresetKind', 'mixerPresetKind', 'uOrder', 'vOrder', 'PgNm', 'totalPages', 'Crop',
        'numerator', 'denominator', 'frameCount', 'Annt', 'keyOriginType', 'unitValueQuadVersion',
        'keyOriginIndex', 'major', 'minor', 'fix', 'docDefaultNewArtboardBackgroundType', 'artboardBackgroundType',
        'numModifyingFX', 'deformNumRows', 'deformNumCols', 'FrID', 'FrDl', 'FsID', 'LCnt', 'AFrm', 'AFSt',
        'numBefore', 'numAfter', 'Spcn', 'minOpacity', 'maxOpacity', 'BlnM', 'sheetID', 'gblA', 'globalAltitude',
        'descVersion', 'frameReaderType', 'LyrI', 'zoomOrigin', 'fontSize', 'Rds ', 'sliceID',
        'topOutset', 'leftOutset', 'bottomOutset', 'rightOutset', 'filterID', 'meshQuality',
        'meshExpansion', 'meshRigidity', 'VrsM', 'VrsN', 'NmbG', 'WLMn', 'WLMx', 'AmMn', 'AmMx', 'SclH', 'SclV',
        'Lvl ', 'TlNm', 'TlOf', 'FlRs', 'Thsh', 'ShrS', 'ShrE', 'FlRs', 'Vrnc', 'Strg', 'ExtS', 'ExtD',
        'HrzS', 'VrtS', 'NmbR', 'EdgF', 'Ang1', 'Ang2', 'Ang3', 'Ang4', 'lastAppliedComp', 'capturedInfo',
    ],
    'enum': [
        'textGridding', 'Ornt', 'warpStyle', 'warpRotate', 'Inte', 'Bltn', 'ClrS', 'BlrQ',
        'bvlT', 'bvlS', 'bvlD', 'Md  ', 'glwS', 'GrdF', 'GlwT', 'RplS', 'BlrM', 'SmBM',
        'strokeStyleLineCapType', 'strokeStyleLineJoinType', 'strokeStyleLineAlignment',
        'strokeStyleBlendMode', 'PntT', 'Styl', 'lookupType', 'LUTFormat', 'dataOrder',
        'tableOrder', 'enableCompCore', 'enableCompCoreGPU', 'compCoreSupport', 'compCoreGPUSupport', 'Engn',
        'enableCompCoreThreads', 'gs99', 'FrDs', 'trackID', 'animInterpStyle', 'horzAlign',
        'vertAlign', 'bgColorType', 'shapeOperation', 'UndA', 'Wvtp', 'Drct', 'WndM', 'Edg ', 'FlCl', 'IntE',
        'IntC', 'Cnvr', 'Fl  ', 'Dstr', 'MztT', 'Lns ', 'ExtT', 'DspM', 'ExtR', 'ZZTy', 'SphM', 'SmBQ',
    ],
    'bool': [
        'PstS', 'printSixteenBit', 'masterFXSwitch', 'enab', 'uglg', 'antialiasGloss',
        'useShape', 'useTexture', 'uglg', 'antialiasGloss', 'useShape', 'Vsbl',
        'useTexture', 'Algn', 'Rvrs', 'Dthr', 'Invr', 'VctC', 'ShTr', 'layerConceals',
        'strokeEnabled', 'fillEnabled', 'strokeStyleScaleLock', 'strokeStyleStrokeAdjust',
        'hardProof', 'MpBl', 'paperWhite', 'useLegacy', 'Auto', 'Lab ', 'useTint', 'keyShapeInvalidated',
        'autoExpandEnabled', 'autoNestEnabled', 'autoPositionEnabled', 'shrinkwrapOnSaveEnabled',
        'present', 'showInDialog', 'overprint', 'sheetDisclosed', 'lightsDisclosed', 'meshesDisclosed',
        'materialsDisclosed', 'hasMotion', 'muted', 'Effc', 'selected', 'autoScope', 'fillCanvas',
        'cellTextIsHTML', 'Smoo', 'Clsp', 'validAtPosition', 'rigidType', 'hasoptions', 'filterMaskEnable',
        'filterMaskLinked', 'filterMaskExtendWithWhite', 'removeJPEGArtifact', 'Mnch', 'ExtF', 'ExtM',
        'moreAccurate', 'GpuY', 'LIWy',
    ],
    'doub': [
        'warpValue', 'warpPerspective', 'warpPerspectiveOther', 'Intr', 'Wdth', 'Hght',
        'strokeStyleMiterLimit', 'strokeStyleResolution', 'layerTime', 'keyOriginResolution',
        'xx', 'xy', 'yx', 'yy', 'tx', 'ty', 'FrGA', 'frameRate', 'audioLevel', 'rotation',
        'X   ', 'Y   ', 'redFloat', 'greenFloat', 'blueFloat', 'imageResolution',
        'PuX0', 'PuX1', 'PuX2', 'PuX3', 'PuY0', 'PuY1', 'PuY2', 'PuY3'
    ],
    'UntF': [
        'sdwO', 'hglO', 'lagl', 'Lald', 'srgR', 'blur', 'Sftn', 'Opct', 'Dstn', 'Angl',
        'Ckmt', 'Nose', 'Inpr', 'ShdN', 'strokeStyleLineWidth', 'strokeStyleLineDashOffset',
        'strokeStyleOpacity', 'H   ', 'Top ', 'Left', 'Btom', 'Rght', 'Rslt',
        'topRight', 'topLeft', 'bottomLeft', 'bottomRight', 'ClNs', 'Shrp',
    ],
    'VlLs': [
        'Crv ', 'Clrs', 'Mnm ', 'Mxm ', 'Trns', 'pathList', 'strokeStyleLineDashSet', 'FrLs', 'slices',
        'LaSt', 'Trnf', 'nonAffineTransform', 'keyDescriptorList', 'guideIndeces', 'gradientFillMulti',
        'solidFillMulti', 'frameFXMulti', 'innerShadowMulti', 'dropShadowMulti', 'FrIn', 'FSts', 'FsFr',
        'sheetTimelineOptions', 'audioClipList', 'trackList', 'globalTrackList', 'keyList', 'audioClipList',
        'warpValues', 'selectedPin', 'Pts ', 'SbpL', 'pathComponents', 'pinOffsets', 'posFinalPins',
        'pinVertexIndices', 'PinP', 'PnRt', 'PnOv', 'PnDp', 'filterFXList', 'puppetShapeList', 'ShrP',
        'channelDenoise', 'Mtrx', 'layerSettings', 'list', 'compList',
    ],
    'ObAr': ['meshPoints', 'quiltSliceX', 'quiltSliceY'],
    'obj ': ['null', 'Chnl'],
    'Pth ': ['DspF'],
};
var channels = [
    'Rd  ', 'Grn ', 'Bl  ', 'Yllw', 'Ylw ', 'Cyn ', 'Mgnt', 'Blck', 'Gry ', 'Lmnc', 'A   ', 'B   ',
];
var fieldToArrayType = {
    'Mnm ': 'long',
    'Mxm ': 'long',
    FrLs: 'long',
    strokeStyleLineDashSet: 'UntF',
    Trnf: 'doub',
    nonAffineTransform: 'doub',
    keyDescriptorList: 'Objc',
    gradientFillMulti: 'Objc',
    solidFillMulti: 'Objc',
    frameFXMulti: 'Objc',
    innerShadowMulti: 'Objc',
    dropShadowMulti: 'Objc',
    LaSt: 'Objc',
    FrIn: 'Objc',
    FSts: 'Objc',
    FsFr: 'long',
    blendOptions: 'Objc',
    sheetTimelineOptions: 'Objc',
    keyList: 'Objc',
    warpValues: 'doub',
    selectedPin: 'long',
    'Pts ': 'Objc',
    SbpL: 'Objc',
    pathComponents: 'Objc',
    pinOffsets: 'doub',
    posFinalPins: 'doub',
    pinVertexIndices: 'long',
    PinP: 'doub',
    PnRt: 'long',
    PnOv: 'bool',
    PnDp: 'doub',
    filterFXList: 'Objc',
    puppetShapeList: 'Objc',
    ShrP: 'Objc',
    channelDenoise: 'Objc',
    Mtrx: 'long',
    compList: 'long',
};
var fieldToType = {};
for (var _i = 0, _a = Object.keys(typeToField); _i < _a.length; _i++) {
    var type = _a[_i];
    for (var _b = 0, _c = typeToField[type]; _b < _c.length; _b++) {
        var field = _c[_b];
        fieldToType[field] = type;
    }
}
for (var _d = 0, _e = Object.keys(fieldToExtType); _d < _e.length; _d++) {
    var field = _e[_d];
    if (!fieldToType[field])
        fieldToType[field] = 'Objc';
}
for (var _f = 0, _g = Object.keys(fieldToArrayExtType); _f < _g.length; _f++) {
    var field = _g[_f];
    fieldToArrayType[field] = 'Objc';
}
function getTypeByKey(key, value, root, parent) {
    if (key === 'null' && root === 'slices') {
        return 'TEXT';
    }
    else if (key === 'groupID') {
        return root === 'slices' ? 'long' : 'TEXT';
    }
    else if (key === 'Sz  ') {
        return ('Wdth' in value) ? 'Objc' : (('units' in value) ? 'UntF' : 'doub');
    }
    else if (key === 'Type') {
        return typeof value === 'string' ? 'enum' : 'long';
    }
    else if (key === 'AntA') {
        return typeof value === 'string' ? 'enum' : 'bool';
    }
    else if ((key === 'Hrzn' || key === 'Vrtc') && parent.Type === 'keyType.Pstn') {
        return 'long';
    }
    else if (key === 'Hrzn' || key === 'Vrtc' || key === 'Top ' || key === 'Left' || key === 'Btom' || key === 'Rght') {
        if (root === 'slices')
            return 'long';
        return typeof value === 'number' ? 'doub' : 'UntF';
    }
    else if (key === 'Vrsn') {
        return typeof value === 'number' ? 'long' : 'Objc';
    }
    else if (key === 'Rd  ' || key === 'Grn ' || key === 'Bl  ') {
        return root === 'artd' ? 'long' : 'doub';
    }
    else if (key === 'Trnf') {
        return Array.isArray(value) ? 'VlLs' : 'Objc';
    }
    else {
        return fieldToType[key];
    }
}
function readAsciiStringOrClassId(reader) {
    var length = (0, psdReader_1.readInt32)(reader);
    return (0, psdReader_1.readAsciiString)(reader, length || 4);
}
exports.readAsciiStringOrClassId = readAsciiStringOrClassId;
function writeAsciiStringOrClassId(writer, value) {
    if (value.length === 4 && value !== 'warp' && value !== 'time' && value !== 'hold' && value !== 'list') {
        // write classId
        (0, psdWriter_1.writeInt32)(writer, 0);
        (0, psdWriter_1.writeSignature)(writer, value);
    }
    else {
        // write ascii string
        (0, psdWriter_1.writeInt32)(writer, value.length);
        for (var i = 0; i < value.length; i++) {
            (0, psdWriter_1.writeUint8)(writer, value.charCodeAt(i));
        }
    }
}
function readDescriptorStructure(reader, includeClass) {
    var struct = readClassStructure(reader);
    var object = includeClass ? { _name: struct.name, _classID: struct.classID } : {};
    // console.log('>> ', struct);
    var itemsCount = (0, psdReader_1.readUint32)(reader);
    for (var i = 0; i < itemsCount; i++) {
        var key = readAsciiStringOrClassId(reader);
        var type = (0, psdReader_1.readSignature)(reader);
        // console.log(`> '${key}' '${type}'`);
        var data = readOSType(reader, type, includeClass);
        // if (!getTypeByKey(key, data)) console.log(`> '${key}' '${type}'`, data);
        object[key] = data;
    }
    return object;
}
exports.readDescriptorStructure = readDescriptorStructure;
function writeDescriptorStructure(writer, name, classId, value, root) {
    if (logErrors && !classId)
        console.log('Missing classId for: ', name, classId, value);
    // write class structure
    (0, psdWriter_1.writeUnicodeStringWithPadding)(writer, name);
    writeAsciiStringOrClassId(writer, classId);
    var keys = Object.keys(value);
    var keyCount = keys.length;
    if ('_name' in value)
        keyCount--;
    if ('_classID' in value)
        keyCount--;
    (0, psdWriter_1.writeUint32)(writer, keyCount);
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        if (key === '_name' || key === '_classID')
            continue;
        var type = getTypeByKey(key, value[key], root, value);
        var extType = fieldToExtType[key];
        if (key === 'bounds' && root === 'text') {
            extType = makeType('', 'bounds');
        }
        else if (key === 'origin') {
            type = root === 'slices' ? 'enum' : 'Objc';
        }
        else if ((key === 'Cyn ' || key === 'Mgnt' || key === 'Ylw ' || key === 'Blck') && value._classID === 'CMYC') {
            type = 'doub';
        }
        else if (/^PN[a-z][a-z]$/.test(key)) {
            type = 'TEXT';
        }
        else if (/^PT[a-z][a-z]$/.test(key)) {
            type = 'long';
        }
        else if (/^PF[a-z][a-z]$/.test(key)) {
            type = 'doub';
        }
        else if (key === 'ClSz' || key === 'Rds ' || key === 'Amnt') {
            type = typeof value[key] === 'number' ? 'long' : 'UntF';
        }
        else if ((key === 'sdwM' || key === 'hglM') && typeof value[key] === 'string') {
            type = 'enum';
        }
        else if (key === 'blur' && typeof value[key] === 'string') {
            type = 'enum';
        }
        else if (key === 'Angl' && typeof value[key] === 'number') {
            type = 'doub'; // ???
        }
        else if (key === 'bounds' && root === 'slices') {
            type = 'Objc';
            extType = makeType('', 'Rct1');
        }
        else if (key === 'Scl ') {
            if (typeof value[key] === 'object' && 'Hrzn' in value[key]) {
                type = 'Objc';
                extType = nullType;
            }
            else if (typeof value[key] === 'number') {
                type = 'long';
            }
            else {
                type = 'UntF';
            }
        }
        else if (key === 'audioClipGroupList' && keys.length === 1) {
            type = 'VlLs';
        }
        else if ((key === 'Strt' || key === 'Brgh') && 'H   ' in value) {
            type = 'doub';
        }
        else if (key === 'Wdth' && typeof value[key] === 'object') {
            type = 'UntF';
        }
        else if (key === 'Ofst' && typeof value[key] === 'number') {
            type = 'long';
        }
        else if (key === 'Strt' && typeof value[key] === 'object') {
            type = 'Objc';
            extType = nullType;
        }
        else if (channels.indexOf(key) !== -1) {
            type = (classId === 'RGBC' && root !== 'artd') ? 'doub' : 'long';
        }
        else if (key === 'profile') {
            type = classId === 'printOutput' ? 'TEXT' : 'tdta';
        }
        else if (key === 'strokeStyleContent') {
            if (value[key]['Clr ']) {
                extType = makeType('', 'solidColorLayer');
            }
            else if (value[key].Grad) {
                extType = makeType('', 'gradientLayer');
            }
            else if (value[key].Ptrn) {
                extType = makeType('', 'patternLayer');
            }
            else {
                logErrors && console.log('Invalid strokeStyleContent value', value[key]);
            }
        }
        else if (key === 'bounds' && root === 'quiltWarp') {
            extType = makeType('', 'classFloatRect');
        }
        if (extType && extType.classID === 'RGBC') {
            if ('H   ' in value[key])
                extType = { classID: 'HSBC', name: '' };
            // TODO: other color spaces
        }
        writeAsciiStringOrClassId(writer, key);
        (0, psdWriter_1.writeSignature)(writer, type || 'long');
        writeOSType(writer, type || 'long', value[key], key, extType, root);
        if (logErrors && !type)
            console.log("Missing descriptor field type for: '".concat(key, "' in"), value);
    }
}
exports.writeDescriptorStructure = writeDescriptorStructure;
function readOSType(reader, type, includeClass) {
    switch (type) {
        case 'obj ': // Reference
            return readReferenceStructure(reader);
        case 'Objc': // Descriptor
        case 'GlbO': // GlobalObject same as Descriptor
            return readDescriptorStructure(reader, includeClass);
        case 'VlLs': { // List
            var length_1 = (0, psdReader_1.readInt32)(reader);
            var items = [];
            for (var i = 0; i < length_1; i++) {
                var itemType = (0, psdReader_1.readSignature)(reader);
                // console.log('  >', itemType);
                items.push(readOSType(reader, itemType, includeClass));
            }
            return items;
        }
        case 'doub': // Double
            return (0, psdReader_1.readFloat64)(reader);
        case 'UntF': { // Unit double
            var units = (0, psdReader_1.readSignature)(reader);
            var value = (0, psdReader_1.readFloat64)(reader);
            if (!unitsMap[units])
                throw new Error("Invalid units: ".concat(units));
            return { units: unitsMap[units], value: value };
        }
        case 'UnFl': { // Unit float
            var units = (0, psdReader_1.readSignature)(reader);
            var value = (0, psdReader_1.readFloat32)(reader);
            if (!unitsMap[units])
                throw new Error("Invalid units: ".concat(units));
            return { units: unitsMap[units], value: value };
        }
        case 'TEXT': // String
            return (0, psdReader_1.readUnicodeString)(reader);
        case 'enum': { // Enumerated
            var enumType = readAsciiStringOrClassId(reader);
            var value = readAsciiStringOrClassId(reader);
            return "".concat(enumType, ".").concat(value);
        }
        case 'long': // Integer
            return (0, psdReader_1.readInt32)(reader);
        case 'comp': { // Large Integer
            var low = (0, psdReader_1.readUint32)(reader);
            var high = (0, psdReader_1.readUint32)(reader);
            return { low: low, high: high };
        }
        case 'bool': // Boolean
            return !!(0, psdReader_1.readUint8)(reader);
        case 'type': // Class
        case 'GlbC': // Class
            return readClassStructure(reader);
        case 'alis': { // Alias
            var length_2 = (0, psdReader_1.readInt32)(reader);
            return (0, psdReader_1.readAsciiString)(reader, length_2);
        }
        case 'tdta': { // Raw Data
            var length_3 = (0, psdReader_1.readInt32)(reader);
            return (0, psdReader_1.readBytes)(reader, length_3);
        }
        case 'ObAr': { // Object array
            (0, psdReader_1.readInt32)(reader); // version: 16
            (0, psdReader_1.readUnicodeString)(reader); // name: ''
            readAsciiStringOrClassId(reader); // 'rationalPoint'
            var length_4 = (0, psdReader_1.readInt32)(reader);
            var items = [];
            for (var i = 0; i < length_4; i++) {
                var type1 = readAsciiStringOrClassId(reader); // type Hrzn | Vrtc
                (0, psdReader_1.readSignature)(reader); // UnFl
                (0, psdReader_1.readSignature)(reader); // units ? '#Pxl'
                var valuesCount = (0, psdReader_1.readInt32)(reader);
                var values = [];
                for (var j = 0; j < valuesCount; j++) {
                    values.push((0, psdReader_1.readFloat64)(reader));
                }
                items.push({ type: type1, values: values });
            }
            return items;
        }
        case 'Pth ': { // File path
            /*const length =*/ (0, psdReader_1.readInt32)(reader); // total size of all fields below
            var sig = (0, psdReader_1.readSignature)(reader);
            /*const pathSize =*/ (0, psdReader_1.readInt32LE)(reader); // the same as length
            var charsCount = (0, psdReader_1.readInt32LE)(reader);
            var path = (0, psdReader_1.readUnicodeStringWithLengthLE)(reader, charsCount);
            return { sig: sig, path: path };
        }
        default:
            throw new Error("Invalid TySh descriptor OSType: ".concat(type, " at ").concat(reader.offset.toString(16)));
    }
}
var ObArTypes = {
    meshPoints: 'rationalPoint',
    quiltSliceX: 'UntF',
    quiltSliceY: 'UntF',
};
function writeOSType(writer, type, value, key, extType, root) {
    switch (type) {
        case 'obj ': // Reference
            writeReferenceStructure(writer, key, value);
            break;
        case 'Objc': // Descriptor
        case 'GlbO': { // GlobalObject same as Descriptor
            if (typeof value !== 'object')
                throw new Error("Invalid struct value: ".concat(JSON.stringify(value), ", key: ").concat(key));
            if (!extType)
                throw new Error("Missing ext type for: '".concat(key, "' (").concat(JSON.stringify(value), ")"));
            var name_1 = value._name || extType.name;
            var classID = value._classID || extType.classID;
            writeDescriptorStructure(writer, name_1, classID, value, root);
            break;
        }
        case 'VlLs': // List
            if (!Array.isArray(value))
                throw new Error("Invalid list value: ".concat(JSON.stringify(value), ", key: ").concat(key));
            (0, psdWriter_1.writeInt32)(writer, value.length);
            for (var i = 0; i < value.length; i++) {
                var type_1 = fieldToArrayType[key];
                (0, psdWriter_1.writeSignature)(writer, type_1 || 'long');
                writeOSType(writer, type_1 || 'long', value[i], "".concat(key, "[]"), fieldToArrayExtType[key], root);
                if (logErrors && !type_1)
                    console.log("Missing descriptor array type for: '".concat(key, "' in"), value);
            }
            break;
        case 'doub': // Double
            if (typeof value !== 'number')
                throw new Error("Invalid number value: ".concat(JSON.stringify(value), ", key: ").concat(key));
            (0, psdWriter_1.writeFloat64)(writer, value);
            break;
        case 'UntF': // Unit double
            if (!unitsMapRev[value.units])
                throw new Error("Invalid units: ".concat(value.units, " in ").concat(key));
            (0, psdWriter_1.writeSignature)(writer, unitsMapRev[value.units]);
            (0, psdWriter_1.writeFloat64)(writer, value.value);
            break;
        case 'UnFl': // Unit float
            if (!unitsMapRev[value.units])
                throw new Error("Invalid units: ".concat(value.units, " in ").concat(key));
            (0, psdWriter_1.writeSignature)(writer, unitsMapRev[value.units]);
            (0, psdWriter_1.writeFloat32)(writer, value.value);
            break;
        case 'TEXT': // String
            (0, psdWriter_1.writeUnicodeStringWithPadding)(writer, value);
            break;
        case 'enum': { // Enumerated
            if (typeof value !== 'string')
                throw new Error("Invalid enum value: ".concat(JSON.stringify(value), ", key: ").concat(key));
            var _a = value.split('.'), _type = _a[0], val = _a[1];
            writeAsciiStringOrClassId(writer, _type);
            writeAsciiStringOrClassId(writer, val);
            break;
        }
        case 'long': // Integer
            if (typeof value !== 'number')
                throw new Error("Invalid integer value: ".concat(JSON.stringify(value), ", key: ").concat(key));
            (0, psdWriter_1.writeInt32)(writer, value);
            break;
        // case 'comp': // Large Integer
        // 	writeLargeInteger(reader);
        case 'bool': // Boolean
            if (typeof value !== 'boolean')
                throw new Error("Invalid boolean value: ".concat(JSON.stringify(value), ", key: ").concat(key));
            (0, psdWriter_1.writeUint8)(writer, value ? 1 : 0);
            break;
        // case 'type': // Class
        // case 'GlbC': // Class
        // 	writeClassStructure(reader);
        // case 'alis': // Alias
        // 	writeAliasStructure(reader);
        case 'tdta': // Raw Data
            (0, psdWriter_1.writeInt32)(writer, value.byteLength);
            (0, psdWriter_1.writeBytes)(writer, value);
            break;
        case 'ObAr': { // Object array
            (0, psdWriter_1.writeInt32)(writer, 16); // version
            (0, psdWriter_1.writeUnicodeStringWithPadding)(writer, ''); // name
            var type_2 = ObArTypes[key];
            if (!type_2)
                throw new Error("Not implemented ObArType for: ".concat(key));
            writeAsciiStringOrClassId(writer, type_2);
            (0, psdWriter_1.writeInt32)(writer, value.length);
            for (var i = 0; i < value.length; i++) {
                writeAsciiStringOrClassId(writer, value[i].type); // Hrzn | Vrtc
                (0, psdWriter_1.writeSignature)(writer, 'UnFl');
                (0, psdWriter_1.writeSignature)(writer, '#Pxl');
                (0, psdWriter_1.writeInt32)(writer, value[i].values.length);
                for (var j = 0; j < value[i].values.length; j++) {
                    (0, psdWriter_1.writeFloat64)(writer, value[i].values[j]);
                }
            }
            break;
        }
        case 'Pth ': { // File path
            var length_5 = 4 + 4 + 4 + value.path.length * 2;
            (0, psdWriter_1.writeInt32)(writer, length_5);
            (0, psdWriter_1.writeSignature)(writer, value.sig);
            (0, psdWriter_1.writeInt32LE)(writer, length_5);
            (0, psdWriter_1.writeInt32LE)(writer, value.path.length);
            (0, psdWriter_1.writeUnicodeStringWithoutLengthLE)(writer, value.path);
            break;
        }
        default:
            throw new Error("Not implemented descriptor OSType: ".concat(type));
    }
}
function readReferenceStructure(reader) {
    var itemsCount = (0, psdReader_1.readInt32)(reader);
    var items = [];
    for (var i = 0; i < itemsCount; i++) {
        var type = (0, psdReader_1.readSignature)(reader);
        switch (type) {
            case 'prop': { // Property
                readClassStructure(reader);
                var keyID = readAsciiStringOrClassId(reader);
                items.push(keyID);
                break;
            }
            case 'Clss': // Class
                items.push(readClassStructure(reader));
                break;
            case 'Enmr': { // Enumerated Reference
                readClassStructure(reader);
                var typeID = readAsciiStringOrClassId(reader);
                var value = readAsciiStringOrClassId(reader);
                items.push("".concat(typeID, ".").concat(value));
                break;
            }
            case 'rele': { // Offset
                // const { name, classID } =
                readClassStructure(reader);
                items.push((0, psdReader_1.readUint32)(reader));
                break;
            }
            case 'Idnt': // Identifier
                items.push((0, psdReader_1.readInt32)(reader));
                break;
            case 'indx': // Index
                items.push((0, psdReader_1.readInt32)(reader));
                break;
            case 'name': { // Name
                readClassStructure(reader);
                items.push((0, psdReader_1.readUnicodeString)(reader));
                break;
            }
            default:
                throw new Error("Invalid descriptor reference type: ".concat(type));
        }
    }
    return items;
}
function writeReferenceStructure(writer, _key, items) {
    (0, psdWriter_1.writeInt32)(writer, items.length);
    for (var i = 0; i < items.length; i++) {
        var value = items[i];
        var type = 'unknown';
        if (typeof value === 'string') {
            if (/^[a-z]+\.[a-z]+$/i.test(value)) {
                type = 'Enmr';
            }
            else {
                type = 'name';
            }
        }
        (0, psdWriter_1.writeSignature)(writer, type);
        switch (type) {
            // case 'prop': // Property
            // case 'Clss': // Class
            case 'Enmr': { // Enumerated Reference
                var _a = value.split('.'), typeID = _a[0], enumValue = _a[1];
                writeClassStructure(writer, '\0', typeID);
                writeAsciiStringOrClassId(writer, typeID);
                writeAsciiStringOrClassId(writer, enumValue);
                break;
            }
            // case 'rele': // Offset
            // case 'Idnt': // Identifier
            // case 'indx': // Index
            case 'name': { // Name
                writeClassStructure(writer, '\0', 'Lyr ');
                (0, psdWriter_1.writeUnicodeString)(writer, value + '\0');
                break;
            }
            default:
                throw new Error("Invalid descriptor reference type: ".concat(type));
        }
    }
    return items;
}
function readClassStructure(reader) {
    var name = (0, psdReader_1.readUnicodeString)(reader);
    var classID = readAsciiStringOrClassId(reader);
    return { name: name, classID: classID };
}
function writeClassStructure(writer, name, classID) {
    (0, psdWriter_1.writeUnicodeString)(writer, name);
    writeAsciiStringOrClassId(writer, classID);
}
function readVersionAndDescriptor(reader, includeClass) {
    if (includeClass === void 0) { includeClass = false; }
    var version = (0, psdReader_1.readUint32)(reader);
    if (version !== 16)
        throw new Error("Invalid descriptor version: ".concat(version));
    var desc = readDescriptorStructure(reader, includeClass);
    // console.log(require('util').inspect(desc, false, 99, true));
    return desc;
}
exports.readVersionAndDescriptor = readVersionAndDescriptor;
function writeVersionAndDescriptor(writer, name, classID, descriptor, root) {
    if (root === void 0) { root = ''; }
    (0, psdWriter_1.writeUint32)(writer, 16); // version
    writeDescriptorStructure(writer, name, classID, descriptor, root);
}
exports.writeVersionAndDescriptor = writeVersionAndDescriptor;
function horzVrtcToXY(hv) {
    return { x: hv.Hrzn, y: hv.Vrtc };
}
exports.horzVrtcToXY = horzVrtcToXY;
function xyToHorzVrtc(xy) {
    return { Hrzn: xy.x, Vrtc: xy.y };
}
exports.xyToHorzVrtc = xyToHorzVrtc;
function descBoundsToBounds(desc) {
    return {
        top: parseUnits(desc['Top ']),
        left: parseUnits(desc.Left),
        right: parseUnits(desc.Rght),
        bottom: parseUnits(desc.Btom),
    };
}
exports.descBoundsToBounds = descBoundsToBounds;
function boundsToDescBounds(bounds) {
    var _a;
    return _a = {
            Left: unitsValue(bounds.left, 'bounds.left')
        },
        _a['Top '] = unitsValue(bounds.top, 'bounds.top'),
        _a.Rght = unitsValue(bounds.right, 'bounds.right'),
        _a.Btom = unitsValue(bounds.bottom, 'bounds.bottom'),
        _a;
}
exports.boundsToDescBounds = boundsToDescBounds;
function parseFxObject(fx) {
    var stroke = {
        enabled: !!fx.enab,
        position: exports.FStl.decode(fx.Styl),
        fillType: exports.FrFl.decode(fx.PntT),
        blendMode: exports.BlnM.decode(fx['Md  ']),
        opacity: parsePercent(fx.Opct),
        size: parseUnits(fx['Sz  ']),
    };
    if (fx.present !== undefined)
        stroke.present = fx.present;
    if (fx.showInDialog !== undefined)
        stroke.showInDialog = fx.showInDialog;
    if (fx.overprint !== undefined)
        stroke.overprint = fx.overprint;
    if (fx['Clr '])
        stroke.color = parseColor(fx['Clr ']);
    if (fx.Grad)
        stroke.gradient = parseGradientContent(fx);
    if (fx.Ptrn)
        stroke.pattern = parsePatternContent(fx);
    return stroke;
}
function serializeFxObject(stroke) {
    var FrFX = {};
    FrFX.enab = !!stroke.enabled;
    if (stroke.present !== undefined)
        FrFX.present = !!stroke.present;
    if (stroke.showInDialog !== undefined)
        FrFX.showInDialog = !!stroke.showInDialog;
    FrFX.Styl = exports.FStl.encode(stroke.position);
    FrFX.PntT = exports.FrFl.encode(stroke.fillType);
    FrFX['Md  '] = exports.BlnM.encode(stroke.blendMode);
    FrFX.Opct = unitsPercent(stroke.opacity);
    FrFX['Sz  '] = unitsValue(stroke.size, 'size');
    if (stroke.color)
        FrFX['Clr '] = serializeColor(stroke.color);
    if (stroke.gradient)
        FrFX = __assign(__assign({}, FrFX), serializeGradientContent(stroke.gradient));
    if (stroke.pattern)
        FrFX = __assign(__assign({}, FrFX), serializePatternContent(stroke.pattern));
    if (stroke.overprint !== undefined)
        FrFX.overprint = !!stroke.overprint;
    return FrFX;
}
function serializeEffects(e, log, multi) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    var info = multi ? {
        'Scl ': unitsPercentF((_a = e.scale) !== null && _a !== void 0 ? _a : 1),
        masterFXSwitch: !e.disabled,
    } : {
        masterFXSwitch: !e.disabled,
        'Scl ': unitsPercentF((_b = e.scale) !== null && _b !== void 0 ? _b : 1),
    };
    var arrayKeys = ['dropShadow', 'innerShadow', 'solidFill', 'gradientOverlay', 'stroke'];
    for (var _i = 0, arrayKeys_1 = arrayKeys; _i < arrayKeys_1.length; _i++) {
        var key = arrayKeys_1[_i];
        if (e[key] && !Array.isArray(e[key]))
            throw new Error("".concat(key, " should be an array"));
    }
    if (((_c = e.dropShadow) === null || _c === void 0 ? void 0 : _c[0]) && !multi)
        info.DrSh = serializeEffectObject(e.dropShadow[0], 'dropShadow', log);
    if (((_d = e.dropShadow) === null || _d === void 0 ? void 0 : _d[0]) && multi)
        info.dropShadowMulti = e.dropShadow.map(function (i) { return serializeEffectObject(i, 'dropShadow', log); });
    if (((_e = e.innerShadow) === null || _e === void 0 ? void 0 : _e[0]) && !multi)
        info.IrSh = serializeEffectObject(e.innerShadow[0], 'innerShadow', log);
    if (((_f = e.innerShadow) === null || _f === void 0 ? void 0 : _f[0]) && multi)
        info.innerShadowMulti = e.innerShadow.map(function (i) { return serializeEffectObject(i, 'innerShadow', log); });
    if (e.outerGlow)
        info.OrGl = serializeEffectObject(e.outerGlow, 'outerGlow', log);
    if (((_g = e.solidFill) === null || _g === void 0 ? void 0 : _g[0]) && multi)
        info.solidFillMulti = e.solidFill.map(function (i) { return serializeEffectObject(i, 'solidFill', log); });
    if (((_h = e.gradientOverlay) === null || _h === void 0 ? void 0 : _h[0]) && multi)
        info.gradientFillMulti = e.gradientOverlay.map(function (i) { return serializeEffectObject(i, 'gradientOverlay', log); });
    if (((_j = e.stroke) === null || _j === void 0 ? void 0 : _j[0]) && multi)
        info.frameFXMulti = e.stroke.map(function (i) { return serializeFxObject(i); });
    if (e.innerGlow)
        info.IrGl = serializeEffectObject(e.innerGlow, 'innerGlow', log);
    if (e.bevel)
        info.ebbl = serializeEffectObject(e.bevel, 'bevel', log);
    if (((_k = e.solidFill) === null || _k === void 0 ? void 0 : _k[0]) && !multi)
        info.SoFi = serializeEffectObject(e.solidFill[0], 'solidFill', log);
    if (e.patternOverlay)
        info.patternFill = serializeEffectObject(e.patternOverlay, 'patternOverlay', log);
    if (((_l = e.gradientOverlay) === null || _l === void 0 ? void 0 : _l[0]) && !multi)
        info.GrFl = serializeEffectObject(e.gradientOverlay[0], 'gradientOverlay', log);
    if (e.satin)
        info.ChFX = serializeEffectObject(e.satin, 'satin', log);
    if (((_m = e.stroke) === null || _m === void 0 ? void 0 : _m[0]) && !multi)
        info.FrFX = serializeFxObject((_o = e.stroke) === null || _o === void 0 ? void 0 : _o[0]);
    if (multi) {
        info.numModifyingFX = 0;
        for (var _p = 0, _q = Object.keys(e); _p < _q.length; _p++) {
            var key = _q[_p];
            var value = e[key];
            if (Array.isArray(value)) {
                for (var _r = 0, value_1 = value; _r < value_1.length; _r++) {
                    var effect = value_1[_r];
                    if (effect.enabled)
                        info.numModifyingFX++;
                }
            }
            else if (value.enabled) {
                info.numModifyingFX++;
            }
        }
    }
    return info;
}
exports.serializeEffects = serializeEffects;
function parseEffects(info, log) {
    var effects = {};
    if (!info.masterFXSwitch)
        effects.disabled = true;
    if (info['Scl '])
        effects.scale = parsePercent(info['Scl ']);
    if (info.DrSh)
        effects.dropShadow = [parseEffectObject(info.DrSh, log)];
    if (info.dropShadowMulti)
        effects.dropShadow = info.dropShadowMulti.map(function (i) { return parseEffectObject(i, log); });
    if (info.IrSh)
        effects.innerShadow = [parseEffectObject(info.IrSh, log)];
    if (info.innerShadowMulti)
        effects.innerShadow = info.innerShadowMulti.map(function (i) { return parseEffectObject(i, log); });
    if (info.OrGl)
        effects.outerGlow = parseEffectObject(info.OrGl, log);
    if (info.IrGl)
        effects.innerGlow = parseEffectObject(info.IrGl, log);
    if (info.ebbl)
        effects.bevel = parseEffectObject(info.ebbl, log);
    if (info.SoFi)
        effects.solidFill = [parseEffectObject(info.SoFi, log)];
    if (info.solidFillMulti)
        effects.solidFill = info.solidFillMulti.map(function (i) { return parseEffectObject(i, log); });
    if (info.patternFill)
        effects.patternOverlay = parseEffectObject(info.patternFill, log);
    if (info.GrFl)
        effects.gradientOverlay = [parseEffectObject(info.GrFl, log)];
    if (info.gradientFillMulti)
        effects.gradientOverlay = info.gradientFillMulti.map(function (i) { return parseEffectObject(i, log); });
    if (info.ChFX)
        effects.satin = parseEffectObject(info.ChFX, log);
    if (info.FrFX)
        effects.stroke = [parseFxObject(info.FrFX)];
    if (info.frameFXMulti)
        effects.stroke = info.frameFXMulti.map(function (i) { return parseFxObject(i); });
    return effects;
}
exports.parseEffects = parseEffects;
function parseKeyList(keyList, logMissingFeatures) {
    var keys = [];
    for (var j = 0; j < keyList.length; j++) {
        var key = keyList[j];
        var _a = key.time, denominator = _a.denominator, numerator = _a.numerator, selected = key.selected, animKey = key.animKey;
        var time = { numerator: numerator, denominator: denominator };
        var interpolation = exports.animInterpStyleEnum.decode(key.animInterpStyle);
        switch (animKey.Type) {
            case 'keyType.Opct':
                keys.push({ interpolation: interpolation, time: time, selected: selected, type: 'opacity', value: parsePercent(animKey.Opct) });
                break;
            case 'keyType.Pstn':
                keys.push({ interpolation: interpolation, time: time, selected: selected, type: 'position', x: animKey.Hrzn, y: animKey.Vrtc });
                break;
            case 'keyType.Trnf':
                keys.push({
                    interpolation: interpolation,
                    time: time,
                    selected: selected,
                    type: 'transform',
                    scale: horzVrtcToXY(animKey['Scl ']), skew: horzVrtcToXY(animKey.Skew), rotation: animKey.rotation, translation: horzVrtcToXY(animKey.translation)
                });
                break;
            case 'keyType.sheetStyle': {
                var key_1 = { interpolation: interpolation, time: time, selected: selected, type: 'style' };
                if (animKey.sheetStyle.Lefx)
                    key_1.style = parseEffects(animKey.sheetStyle.Lefx, logMissingFeatures);
                keys.push(key_1);
                break;
            }
            case 'keyType.globalLighting': {
                keys.push({
                    interpolation: interpolation,
                    time: time,
                    selected: selected,
                    type: 'globalLighting',
                    globalAngle: animKey.gblA, globalAltitude: animKey.globalAltitude
                });
                break;
            }
            default: throw new Error("Unsupported keyType value");
        }
    }
    return keys;
}
function serializeKeyList(keys) {
    var keyList = [];
    for (var j = 0; j < keys.length; j++) {
        var key = keys[j];
        var time = key.time, _a = key.selected, selected = _a === void 0 ? false : _a, interpolation = key.interpolation;
        var animInterpStyle = exports.animInterpStyleEnum.encode(interpolation);
        var animKey = void 0;
        switch (key.type) {
            case 'opacity':
                animKey = { Type: 'keyType.Opct', Opct: unitsPercent(key.value) };
                break;
            case 'position':
                animKey = { Type: 'keyType.Pstn', Hrzn: key.x, Vrtc: key.y };
                break;
            case 'transform':
                animKey = { Type: 'keyType.Trnf', 'Scl ': xyToHorzVrtc(key.scale), Skew: xyToHorzVrtc(key.skew), rotation: key.rotation, translation: xyToHorzVrtc(key.translation) };
                break;
            case 'style':
                animKey = { Type: 'keyType.sheetStyle', sheetStyle: { Vrsn: 1, blendOptions: {} } };
                if (key.style)
                    animKey.sheetStyle = { Vrsn: 1, Lefx: serializeEffects(key.style, false, false), blendOptions: {} };
                break;
            case 'globalLighting': {
                animKey = { Type: 'keyType.globalLighting', gblA: key.globalAngle, globalAltitude: key.globalAltitude };
                break;
            }
            default: throw new Error("Unsupported keyType value");
        }
        keyList.push({ Vrsn: 1, animInterpStyle: animInterpStyle, time: time, animKey: animKey, selected: selected });
    }
    return keyList;
}
function parseTrackList(trackList, logMissingFeatures) {
    var tracks = [];
    for (var i = 0; i < trackList.length; i++) {
        var tr = trackList[i];
        var track = {
            type: exports.stdTrackID.decode(tr.trackID),
            enabled: tr.enab,
            keys: parseKeyList(tr.keyList, logMissingFeatures),
        };
        if (tr.effectParams) {
            track.effectParams = {
                fillCanvas: tr.effectParams.fillCanvas,
                zoomOrigin: tr.effectParams.zoomOrigin,
                keys: parseKeyList(tr.effectParams.keyList, logMissingFeatures),
            };
        }
        tracks.push(track);
    }
    return tracks;
}
exports.parseTrackList = parseTrackList;
function serializeTrackList(tracks) {
    var trackList = [];
    for (var i = 0; i < tracks.length; i++) {
        var t = tracks[i];
        trackList.push(__assign(__assign({ trackID: exports.stdTrackID.encode(t.type), Vrsn: 1, enab: !!t.enabled, Effc: !!t.effectParams }, (t.effectParams ? {
            effectParams: {
                keyList: serializeKeyList(t.keys),
                fillCanvas: t.effectParams.fillCanvas,
                zoomOrigin: t.effectParams.zoomOrigin,
            }
        } : {})), { keyList: serializeKeyList(t.keys) }));
    }
    return trackList;
}
exports.serializeTrackList = serializeTrackList;
function parseEffectObject(obj, reportErrors) {
    var result = {};
    for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
        var key = _a[_i];
        var val = obj[key];
        switch (key) {
            case 'enab':
                result.enabled = !!val;
                break;
            case 'uglg':
                result.useGlobalLight = !!val;
                break;
            case 'AntA':
                result.antialiased = !!val;
                break;
            case 'Algn':
                result.align = !!val;
                break;
            case 'Dthr':
                result.dither = !!val;
                break;
            case 'Invr':
                result.invert = !!val;
                break;
            case 'Rvrs':
                result.reverse = !!val;
                break;
            case 'Clr ':
                result.color = parseColor(val);
                break;
            case 'hglC':
                result.highlightColor = parseColor(val);
                break;
            case 'sdwC':
                result.shadowColor = parseColor(val);
                break;
            case 'Styl':
                result.position = exports.FStl.decode(val);
                break;
            case 'Md  ':
                result.blendMode = exports.BlnM.decode(val);
                break;
            case 'hglM':
                result.highlightBlendMode = exports.BlnM.decode(val);
                break;
            case 'sdwM':
                result.shadowBlendMode = exports.BlnM.decode(val);
                break;
            case 'bvlS':
                result.style = exports.BESl.decode(val);
                break;
            case 'bvlD':
                result.direction = exports.BESs.decode(val);
                break;
            case 'bvlT':
                result.technique = exports.bvlT.decode(val);
                break;
            case 'GlwT':
                result.technique = exports.BETE.decode(val);
                break;
            case 'glwS':
                result.source = exports.IGSr.decode(val);
                break;
            case 'Type':
                result.type = exports.GrdT.decode(val);
                break;
            case 'gs99':
                result.interpolationMethod = exports.gradientInterpolationMethodType.decode(val);
                break;
            case 'Opct':
                result.opacity = parsePercent(val);
                break;
            case 'hglO':
                result.highlightOpacity = parsePercent(val);
                break;
            case 'sdwO':
                result.shadowOpacity = parsePercent(val);
                break;
            case 'lagl':
                result.angle = parseAngle(val);
                break;
            case 'Angl':
                result.angle = parseAngle(val);
                break;
            case 'Lald':
                result.altitude = parseAngle(val);
                break;
            case 'Sftn':
                result.soften = parseUnits(val);
                break;
            case 'srgR':
                result.strength = parsePercent(val);
                break;
            case 'blur':
                result.size = parseUnits(val);
                break;
            case 'Nose':
                result.noise = parsePercent(val);
                break;
            case 'Inpr':
                result.range = parsePercent(val);
                break;
            case 'Ckmt':
                result.choke = parseUnits(val);
                break;
            case 'ShdN':
                result.jitter = parsePercent(val);
                break;
            case 'Dstn':
                result.distance = parseUnits(val);
                break;
            case 'Scl ':
                result.scale = parsePercent(val);
                break;
            case 'Ptrn':
                result.pattern = { name: val['Nm  '], id: val.Idnt };
                break;
            case 'phase':
                result.phase = { x: val.Hrzn, y: val.Vrtc };
                break;
            case 'Ofst':
                result.offset = { x: parsePercent(val.Hrzn), y: parsePercent(val.Vrtc) };
                break;
            case 'MpgS':
            case 'TrnS':
                result.contour = {
                    name: val['Nm  '],
                    curve: val['Crv '].map(function (p) { return ({ x: p.Hrzn, y: p.Vrtc }); }),
                };
                break;
            case 'Grad':
                result.gradient = parseGradient(val);
                break;
            case 'useTexture':
            case 'useShape':
            case 'layerConceals':
            case 'present':
            case 'showInDialog':
            case 'antialiasGloss':
                result[key] = val;
                break;
            case '_name':
            case '_classID':
                break;
            default:
                reportErrors && console.log("Invalid effect key: '".concat(key, "', value:"), val);
        }
    }
    return result;
}
function serializeEffectObject(obj, objName, reportErrors) {
    var result = {};
    for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
        var objKey = _a[_i];
        var key = objKey;
        var val = obj[key];
        switch (key) {
            case 'enabled':
                result.enab = !!val;
                break;
            case 'useGlobalLight':
                result.uglg = !!val;
                break;
            case 'antialiased':
                result.AntA = !!val;
                break;
            case 'align':
                result.Algn = !!val;
                break;
            case 'dither':
                result.Dthr = !!val;
                break;
            case 'invert':
                result.Invr = !!val;
                break;
            case 'reverse':
                result.Rvrs = !!val;
                break;
            case 'color':
                result['Clr '] = serializeColor(val);
                break;
            case 'highlightColor':
                result.hglC = serializeColor(val);
                break;
            case 'shadowColor':
                result.sdwC = serializeColor(val);
                break;
            case 'position':
                result.Styl = exports.FStl.encode(val);
                break;
            case 'blendMode':
                result['Md  '] = exports.BlnM.encode(val);
                break;
            case 'highlightBlendMode':
                result.hglM = exports.BlnM.encode(val);
                break;
            case 'shadowBlendMode':
                result.sdwM = exports.BlnM.encode(val);
                break;
            case 'style':
                result.bvlS = exports.BESl.encode(val);
                break;
            case 'direction':
                result.bvlD = exports.BESs.encode(val);
                break;
            case 'technique':
                if (objName === 'bevel') {
                    result.bvlT = exports.bvlT.encode(val);
                }
                else {
                    result.GlwT = exports.BETE.encode(val);
                }
                break;
            case 'source':
                result.glwS = exports.IGSr.encode(val);
                break;
            case 'type':
                result.Type = exports.GrdT.encode(val);
                break;
            case 'interpolationMethod':
                result.gs99 = exports.gradientInterpolationMethodType.encode(val);
                break;
            case 'opacity':
                result.Opct = unitsPercent(val);
                break;
            case 'highlightOpacity':
                result.hglO = unitsPercent(val);
                break;
            case 'shadowOpacity':
                result.sdwO = unitsPercent(val);
                break;
            case 'angle':
                if (objName === 'gradientOverlay' || objName === 'patternFill') {
                    result.Angl = unitsAngle(val);
                }
                else {
                    result.lagl = unitsAngle(val);
                }
                break;
            case 'altitude':
                result.Lald = unitsAngle(val);
                break;
            case 'soften':
                result.Sftn = unitsValue(val, key);
                break;
            case 'strength':
                result.srgR = unitsPercent(val);
                break;
            case 'size':
                result.blur = unitsValue(val, key);
                break;
            case 'noise':
                result.Nose = unitsPercent(val);
                break;
            case 'range':
                result.Inpr = unitsPercent(val);
                break;
            case 'choke':
                result.Ckmt = unitsValue(val, key);
                break;
            case 'jitter':
                result.ShdN = unitsPercent(val);
                break;
            case 'distance':
                result.Dstn = unitsValue(val, key);
                break;
            case 'scale':
                result['Scl '] = unitsPercent(val);
                break;
            case 'pattern':
                result.Ptrn = { 'Nm  ': val.name, Idnt: val.id };
                break;
            case 'phase':
                result.phase = { Hrzn: val.x, Vrtc: val.y };
                break;
            case 'offset':
                result.Ofst = { Hrzn: unitsPercent(val.x), Vrtc: unitsPercent(val.y) };
                break;
            case 'contour': {
                result[objName === 'satin' ? 'MpgS' : 'TrnS'] = {
                    'Nm  ': val.name,
                    'Crv ': val.curve.map(function (p) { return ({ Hrzn: p.x, Vrtc: p.y }); }),
                };
                break;
            }
            case 'gradient':
                result.Grad = serializeGradient(val);
                break;
            case 'useTexture':
            case 'useShape':
            case 'layerConceals':
            case 'present':
            case 'showInDialog':
            case 'antialiasGloss':
                result[key] = val;
                break;
            default:
                reportErrors && console.log("Invalid effect key: '".concat(key, "', value:"), val);
        }
    }
    return result;
}
function parseGradient(grad) {
    if (grad.GrdF === 'GrdF.CstS') {
        var samples_1 = grad.Intr || 4096;
        return {
            type: 'solid',
            name: grad['Nm  '],
            smoothness: grad.Intr / 4096,
            colorStops: grad.Clrs.map(function (s) { return ({
                color: parseColor(s['Clr ']),
                location: s.Lctn / samples_1,
                midpoint: s.Mdpn / 100,
            }); }),
            opacityStops: grad.Trns.map(function (s) { return ({
                opacity: parsePercent(s.Opct),
                location: s.Lctn / samples_1,
                midpoint: s.Mdpn / 100,
            }); }),
        };
    }
    else {
        return {
            type: 'noise',
            name: grad['Nm  '],
            roughness: grad.Smth / 4096,
            colorModel: exports.ClrS.decode(grad.ClrS),
            randomSeed: grad.RndS,
            restrictColors: !!grad.VctC,
            addTransparency: !!grad.ShTr,
            min: grad['Mnm '].map(function (x) { return x / 100; }),
            max: grad['Mxm '].map(function (x) { return x / 100; }),
        };
    }
}
function serializeGradient(grad) {
    var _a, _b;
    if (grad.type === 'solid') {
        var samples_2 = Math.round(((_a = grad.smoothness) !== null && _a !== void 0 ? _a : 1) * 4096);
        return {
            'Nm  ': grad.name || '',
            GrdF: 'GrdF.CstS',
            Intr: samples_2,
            Clrs: grad.colorStops.map(function (s) {
                var _a;
                return ({
                    'Clr ': serializeColor(s.color),
                    Type: 'Clry.UsrS',
                    Lctn: Math.round(s.location * samples_2),
                    Mdpn: Math.round(((_a = s.midpoint) !== null && _a !== void 0 ? _a : 0.5) * 100),
                });
            }),
            Trns: grad.opacityStops.map(function (s) {
                var _a;
                return ({
                    Opct: unitsPercent(s.opacity),
                    Lctn: Math.round(s.location * samples_2),
                    Mdpn: Math.round(((_a = s.midpoint) !== null && _a !== void 0 ? _a : 0.5) * 100),
                });
            }),
        };
    }
    else {
        return {
            GrdF: 'GrdF.ClNs',
            'Nm  ': grad.name || '',
            ShTr: !!grad.addTransparency,
            VctC: !!grad.restrictColors,
            ClrS: exports.ClrS.encode(grad.colorModel),
            RndS: grad.randomSeed || 0,
            Smth: Math.round(((_b = grad.roughness) !== null && _b !== void 0 ? _b : 1) * 4096),
            'Mnm ': (grad.min || [0, 0, 0, 0]).map(function (x) { return x * 100; }),
            'Mxm ': (grad.max || [1, 1, 1, 1]).map(function (x) { return x * 100; }),
        };
    }
}
function parseGradientContent(descriptor) {
    var result = parseGradient(descriptor.Grad);
    result.style = exports.GrdT.decode(descriptor.Type);
    if (descriptor.Dthr !== undefined)
        result.dither = descriptor.Dthr;
    if (descriptor.Rvrs !== undefined)
        result.reverse = descriptor.Rvrs;
    if (descriptor.Angl !== undefined)
        result.angle = parseAngle(descriptor.Angl);
    if (descriptor['Scl '] !== undefined)
        result.scale = parsePercent(descriptor['Scl ']);
    if (descriptor.Algn !== undefined)
        result.align = descriptor.Algn;
    if (descriptor.Ofst !== undefined) {
        result.offset = {
            x: parsePercent(descriptor.Ofst.Hrzn),
            y: parsePercent(descriptor.Ofst.Vrtc)
        };
    }
    return result;
}
function parsePatternContent(descriptor) {
    var result = {
        name: descriptor.Ptrn['Nm  '],
        id: descriptor.Ptrn.Idnt,
    };
    if (descriptor.Lnkd !== undefined)
        result.linked = descriptor.Lnkd;
    if (descriptor.phase !== undefined)
        result.phase = { x: descriptor.phase.Hrzn, y: descriptor.phase.Vrtc };
    return result;
}
function parseVectorContent(descriptor) {
    if ('Grad' in descriptor) {
        return parseGradientContent(descriptor);
    }
    else if ('Ptrn' in descriptor) {
        return __assign({ type: 'pattern' }, parsePatternContent(descriptor));
    }
    else if ('Clr ' in descriptor) {
        return { type: 'color', color: parseColor(descriptor['Clr ']) };
    }
    else {
        throw new Error('Invalid vector content');
    }
}
exports.parseVectorContent = parseVectorContent;
function serializeGradientContent(content) {
    var result = {};
    if (content.dither !== undefined)
        result.Dthr = content.dither;
    if (content.reverse !== undefined)
        result.Rvrs = content.reverse;
    if (content.angle !== undefined)
        result.Angl = unitsAngle(content.angle);
    result.Type = exports.GrdT.encode(content.style);
    if (content.align !== undefined)
        result.Algn = content.align;
    if (content.scale !== undefined)
        result['Scl '] = unitsPercent(content.scale);
    if (content.offset) {
        result.Ofst = {
            Hrzn: unitsPercent(content.offset.x),
            Vrtc: unitsPercent(content.offset.y),
        };
    }
    result.Grad = serializeGradient(content);
    return result;
}
function serializePatternContent(content) {
    var result = {
        Ptrn: {
            'Nm  ': content.name || '',
            Idnt: content.id || '',
        }
    };
    if (content.linked !== undefined)
        result.Lnkd = !!content.linked;
    if (content.phase !== undefined)
        result.phase = { Hrzn: content.phase.x, Vrtc: content.phase.y };
    return result;
}
function serializeVectorContent(content) {
    if (content.type === 'color') {
        return { key: 'SoCo', descriptor: { 'Clr ': serializeColor(content.color) } };
    }
    else if (content.type === 'pattern') {
        return { key: 'PtFl', descriptor: serializePatternContent(content) };
    }
    else {
        return { key: 'GdFl', descriptor: serializeGradientContent(content) };
    }
}
exports.serializeVectorContent = serializeVectorContent;
function parseColor(color) {
    if ('H   ' in color) {
        return { h: parsePercentOrAngle(color['H   ']), s: color.Strt, b: color.Brgh };
    }
    else if ('Rd  ' in color) {
        return { r: color['Rd  '], g: color['Grn '], b: color['Bl  '] };
    }
    else if ('Cyn ' in color) {
        return { c: color['Cyn '], m: color.Mgnt, y: color['Ylw '], k: color.Blck };
    }
    else if ('Gry ' in color) {
        return { k: color['Gry '] };
    }
    else if ('Lmnc' in color) {
        return { l: color.Lmnc, a: color['A   '], b: color['B   '] };
    }
    else if ('redFloat' in color) {
        return { fr: color.redFloat, fg: color.greenFloat, fb: color.blueFloat };
    }
    else {
        throw new Error('Unsupported color descriptor');
    }
}
exports.parseColor = parseColor;
function serializeColor(color) {
    if (!color) {
        return { _name: '', _classID: 'RGBC', 'Rd  ': 0, 'Grn ': 0, 'Bl  ': 0 };
    }
    else if ('r' in color) {
        return { _name: '', _classID: 'RGBC', 'Rd  ': color.r || 0, 'Grn ': color.g || 0, 'Bl  ': color.b || 0 };
    }
    else if ('fr' in color) {
        return { _name: '', _classID: 'RGBC', redFloat: color.fr, greenFloat: color.fg, blueFloat: color.fb };
    }
    else if ('h' in color) {
        return { _name: '', _classID: 'HSBC', 'H   ': unitsAngle(color.h * 360), Strt: color.s || 0, Brgh: color.b || 0 };
    }
    else if ('c' in color) {
        return { _name: '', _classID: 'CMYC', 'Cyn ': color.c || 0, Mgnt: color.m || 0, 'Ylw ': color.y || 0, Blck: color.k || 0 };
    }
    else if ('l' in color) {
        return { _name: '', _classID: 'LABC', Lmnc: color.l || 0, 'A   ': color.a || 0, 'B   ': color.b || 0 };
    }
    else if ('k' in color) {
        return { _name: '', _classID: 'GRYC', 'Gry ': color.k };
    }
    else {
        throw new Error('Invalid color value');
    }
}
exports.serializeColor = serializeColor;
function parseAngle(x) {
    if (x === undefined)
        return 0;
    if (x.units !== 'Angle')
        throw new Error("Invalid units: ".concat(x.units));
    return x.value;
}
exports.parseAngle = parseAngle;
function parsePercent(x) {
    if (x === undefined)
        return 1;
    if (x.units !== 'Percent')
        throw new Error("Invalid units: ".concat(x.units));
    return x.value / 100;
}
exports.parsePercent = parsePercent;
function parsePercentOrAngle(x) {
    if (x === undefined)
        return 1;
    if (x.units === 'Percent')
        return x.value / 100;
    if (x.units === 'Angle')
        return x.value / 360;
    throw new Error("Invalid units: ".concat(x.units));
}
exports.parsePercentOrAngle = parsePercentOrAngle;
function parseUnits(_a) {
    var units = _a.units, value = _a.value;
    if (units !== 'Pixels' && units !== 'Millimeters' && units !== 'Points' && units !== 'None' &&
        units !== 'Picas' && units !== 'Inches' && units !== 'Centimeters' && units !== 'Density') {
        throw new Error("Invalid units: ".concat(JSON.stringify({ units: units, value: value })));
    }
    return { value: value, units: units };
}
exports.parseUnits = parseUnits;
function parseUnitsOrNumber(value, units) {
    if (units === void 0) { units = 'Pixels'; }
    if (typeof value === 'number')
        return { value: value, units: units };
    return parseUnits(value);
}
exports.parseUnitsOrNumber = parseUnitsOrNumber;
function parseUnitsToNumber(_a, expectedUnits) {
    var units = _a.units, value = _a.value;
    if (units !== expectedUnits)
        throw new Error("Invalid units: ".concat(JSON.stringify({ units: units, value: value })));
    return value;
}
exports.parseUnitsToNumber = parseUnitsToNumber;
function unitsAngle(value) {
    return { units: 'Angle', value: value || 0 };
}
exports.unitsAngle = unitsAngle;
function unitsPercent(value) {
    return { units: 'Percent', value: Math.round((value || 0) * 100) };
}
exports.unitsPercent = unitsPercent;
function unitsPercentF(value) {
    return { units: 'Percent', value: (value || 0) * 100 };
}
exports.unitsPercentF = unitsPercentF;
function unitsValue(x, key) {
    if (x == null)
        return { units: 'Pixels', value: 0 };
    if (typeof x !== 'object')
        throw new Error("Invalid value: ".concat(JSON.stringify(x), " (key: ").concat(key, ") (should have value and units)"));
    var units = x.units, value = x.value;
    if (typeof value !== 'number')
        throw new Error("Invalid value in ".concat(JSON.stringify(x), " (key: ").concat(key, ")"));
    if (units !== 'Pixels' && units !== 'Millimeters' && units !== 'Points' && units !== 'None' &&
        units !== 'Picas' && units !== 'Inches' && units !== 'Centimeters' && units !== 'Density') {
        throw new Error("Invalid units in ".concat(JSON.stringify(x), " (key: ").concat(key, ")"));
    }
    return { units: units, value: value };
}
exports.unitsValue = unitsValue;
function frac(_a) {
    var numerator = _a.numerator, denominator = _a.denominator;
    return { numerator: numerator, denominator: denominator };
}
exports.frac = frac;
exports.textGridding = (0, helpers_1.createEnum)('textGridding', 'none', {
    none: 'None',
    round: 'Rnd ',
});
exports.Ornt = (0, helpers_1.createEnum)('Ornt', 'horizontal', {
    horizontal: 'Hrzn',
    vertical: 'Vrtc',
});
exports.Annt = (0, helpers_1.createEnum)('Annt', 'sharp', {
    none: 'Anno',
    sharp: 'antiAliasSharp',
    crisp: 'AnCr',
    strong: 'AnSt',
    smooth: 'AnSm',
    platform: 'antiAliasPlatformGray',
    platformLCD: 'antiAliasPlatformLCD',
});
exports.warpStyle = (0, helpers_1.createEnum)('warpStyle', 'none', {
    none: 'warpNone',
    arc: 'warpArc',
    arcLower: 'warpArcLower',
    arcUpper: 'warpArcUpper',
    arch: 'warpArch',
    bulge: 'warpBulge',
    shellLower: 'warpShellLower',
    shellUpper: 'warpShellUpper',
    flag: 'warpFlag',
    wave: 'warpWave',
    fish: 'warpFish',
    rise: 'warpRise',
    fisheye: 'warpFisheye',
    inflate: 'warpInflate',
    squeeze: 'warpSqueeze',
    twist: 'warpTwist',
    cylinder: 'warpCylinder',
    custom: 'warpCustom',
});
exports.BlnM = (0, helpers_1.createEnum)('BlnM', 'normal', {
    'normal': 'Nrml',
    'dissolve': 'Dslv',
    'darken': 'Drkn',
    'multiply': 'Mltp',
    'color burn': 'CBrn',
    'linear burn': 'linearBurn',
    'darker color': 'darkerColor',
    'lighten': 'Lghn',
    'screen': 'Scrn',
    'color dodge': 'CDdg',
    'linear dodge': 'linearDodge',
    'lighter color': 'lighterColor',
    'overlay': 'Ovrl',
    'soft light': 'SftL',
    'hard light': 'HrdL',
    'vivid light': 'vividLight',
    'linear light': 'linearLight',
    'pin light': 'pinLight',
    'hard mix': 'hardMix',
    'difference': 'Dfrn',
    'exclusion': 'Xclu',
    'subtract': 'blendSubtraction',
    'divide': 'blendDivide',
    'hue': 'H   ',
    'saturation': 'Strt',
    'color': 'Clr ',
    'luminosity': 'Lmns',
    // used in ABR
    'linear height': 'linearHeight',
    'height': 'Hght',
    'subtraction': 'Sbtr', // 2nd version of subtract ?
});
exports.BESl = (0, helpers_1.createEnum)('BESl', 'inner bevel', {
    'inner bevel': 'InrB',
    'outer bevel': 'OtrB',
    'emboss': 'Embs',
    'pillow emboss': 'PlEb',
    'stroke emboss': 'strokeEmboss',
});
exports.bvlT = (0, helpers_1.createEnum)('bvlT', 'smooth', {
    'smooth': 'SfBL',
    'chisel hard': 'PrBL',
    'chisel soft': 'Slmt',
});
exports.BESs = (0, helpers_1.createEnum)('BESs', 'up', {
    up: 'In  ',
    down: 'Out ',
});
exports.BETE = (0, helpers_1.createEnum)('BETE', 'softer', {
    softer: 'SfBL',
    precise: 'PrBL',
});
exports.IGSr = (0, helpers_1.createEnum)('IGSr', 'edge', {
    edge: 'SrcE',
    center: 'SrcC',
});
exports.GrdT = (0, helpers_1.createEnum)('GrdT', 'linear', {
    linear: 'Lnr ',
    radial: 'Rdl ',
    angle: 'Angl',
    reflected: 'Rflc',
    diamond: 'Dmnd',
});
exports.animInterpStyleEnum = (0, helpers_1.createEnum)('animInterpStyle', 'linear', {
    linear: 'Lnr ',
    hold: 'hold',
});
exports.stdTrackID = (0, helpers_1.createEnum)('stdTrackID', 'opacity', {
    opacity: 'opacityTrack',
    style: 'styleTrack',
    sheetTransform: 'sheetTransformTrack',
    sheetPosition: 'sheetPositionTrack',
    globalLighting: 'globalLightingTrack',
});
exports.gradientInterpolationMethodType = (0, helpers_1.createEnum)('gradientInterpolationMethodType', 'perceptual', {
    perceptual: 'Perc',
    linear: 'Lnr',
    classic: 'Gcls',
});
exports.ClrS = (0, helpers_1.createEnum)('ClrS', 'rgb', {
    rgb: 'RGBC',
    hsb: 'HSBl',
    lab: 'LbCl',
    hsl: 'HSLC',
});
exports.FStl = (0, helpers_1.createEnum)('FStl', 'outside', {
    outside: 'OutF',
    center: 'CtrF',
    inside: 'InsF'
});
exports.FrFl = (0, helpers_1.createEnum)('FrFl', 'color', {
    color: 'SClr',
    gradient: 'GrFl',
    pattern: 'Ptrn',
});
exports.ESliceType = (0, helpers_1.createEnum)('ESliceType', 'image', {
    image: 'Img ',
    noImage: 'noImage',
});
exports.ESliceHorzAlign = (0, helpers_1.createEnum)('ESliceHorzAlign', 'default', {
    default: 'default',
});
exports.ESliceVertAlign = (0, helpers_1.createEnum)('ESliceVertAlign', 'default', {
    default: 'default',
});
exports.ESliceOrigin = (0, helpers_1.createEnum)('ESliceOrigin', 'userGenerated', {
    userGenerated: 'userGenerated',
    autoGenerated: 'autoGenerated',
    layer: 'layer',
});
exports.ESliceBGColorType = (0, helpers_1.createEnum)('ESliceBGColorType', 'none', {
    none: 'None',
    matte: 'matte',
    color: 'Clr ',
});
exports.strokeStyleLineCapType = (0, helpers_1.createEnum)('strokeStyleLineCapType', 'butt', {
    butt: 'strokeStyleButtCap',
    round: 'strokeStyleRoundCap',
    square: 'strokeStyleSquareCap',
});
exports.strokeStyleLineJoinType = (0, helpers_1.createEnum)('strokeStyleLineJoinType', 'miter', {
    miter: 'strokeStyleMiterJoin',
    round: 'strokeStyleRoundJoin',
    bevel: 'strokeStyleBevelJoin',
});
exports.strokeStyleLineAlignment = (0, helpers_1.createEnum)('strokeStyleLineAlignment', 'inside', {
    inside: 'strokeStyleAlignInside',
    center: 'strokeStyleAlignCenter',
    outside: 'strokeStyleAlignOutside',
});
exports.BlrM = (0, helpers_1.createEnum)('BlrM', 'ispinmage', {
    spin: 'Spn ',
    zoom: 'Zm  ',
});
exports.BlrQ = (0, helpers_1.createEnum)('BlrQ', 'good', {
    draft: 'Drft',
    good: 'Gd  ',
    best: 'Bst ',
});
exports.SmBM = (0, helpers_1.createEnum)('SmBM', 'normal', {
    normal: 'SBMN',
    'edge only': 'SBME',
    'overlay edge': 'SBMO',
});
exports.SmBQ = (0, helpers_1.createEnum)('SmBQ', 'medium', {
    low: 'SBQL',
    medium: 'SBQM',
    high: 'SBQH',
});
exports.DspM = (0, helpers_1.createEnum)('DspM', 'stretch to fit', {
    'stretch to fit': 'StrF',
    'tile': 'Tile',
});
exports.UndA = (0, helpers_1.createEnum)('UndA', 'repeat edge pixels', {
    'wrap around': 'WrpA',
    'repeat edge pixels': 'RptE',
});
exports.Cnvr = (0, helpers_1.createEnum)('Cnvr', 'rectangular to polar', {
    'rectangular to polar': 'RctP',
    'polar to rectangular': 'PlrR',
});
exports.RplS = (0, helpers_1.createEnum)('RplS', 'medium', {
    small: 'Sml ',
    medium: 'Mdm ',
    large: 'Lrg ',
});
exports.SphM = (0, helpers_1.createEnum)('SphM', 'normal', {
    'normal': 'Nrml',
    'horizontal only': 'HrzO',
    'vertical only': 'VrtO',
});
exports.Wvtp = (0, helpers_1.createEnum)('Wvtp', 'sine', {
    sine: 'WvSn',
    triangle: 'WvTr',
    square: 'WvSq',
});
exports.ZZTy = (0, helpers_1.createEnum)('ZZTy', 'pond ripples', {
    'around center': 'ArnC',
    'out from center': 'OtFr',
    'pond ripples': 'PndR',
});
exports.Dstr = (0, helpers_1.createEnum)('Dstr', 'uniform', {
    uniform: 'Unfr',
    gaussian: 'Gsn ',
});
exports.Chnl = (0, helpers_1.createEnum)('Chnl', 'composite', {
    red: 'Rd  ',
    green: 'Grn ',
    blue: 'Bl  ',
    composite: 'Cmps',
});
exports.MztT = (0, helpers_1.createEnum)('MztT', 'fine dots', {
    'fine dots': 'FnDt',
    'medium dots': 'MdmD',
    'grainy dots': 'GrnD',
    'coarse dots': 'CrsD',
    'short lines': 'ShrL',
    'medium lines': 'MdmL',
    'long lines': 'LngL',
    'short strokes': 'ShSt',
    'medium strokes': 'MdmS',
    'long strokes': 'LngS',
});
exports.Lns = (0, helpers_1.createEnum)('Lns ', '50-300mm zoom', {
    '50-300mm zoom': 'Zm  ',
    '32mm prime': 'Nkn ',
    '105mm prime': 'Nkn1',
    'movie prime': 'PnVs',
});
exports.blurType = (0, helpers_1.createEnum)('blurType', 'gaussian blur', {
    'gaussian blur': 'GsnB',
    'lens blur': 'lensBlur',
    'motion blur': 'MtnB',
});
exports.DfsM = (0, helpers_1.createEnum)('DfsM', 'normal', {
    'normal': 'Nrml',
    'darken only': 'DrkO',
    'lighten only': 'LghO',
    'anisotropic': 'anisotropic',
});
exports.ExtT = (0, helpers_1.createEnum)('ExtT', 'blocks', {
    blocks: 'Blks',
    pyramids: 'Pyrm',
});
exports.ExtR = (0, helpers_1.createEnum)('ExtR', 'random', {
    random: 'Rndm',
    'level-based': 'LvlB',
});
exports.FlCl = (0, helpers_1.createEnum)('FlCl', 'background color', {
    'background color': 'FlBc',
    'foreground color': 'FlFr',
    'inverse image': 'FlIn',
    'unaltered image': 'FlSm',
});
exports.CntE = (0, helpers_1.createEnum)('CntE', 'upper', {
    lower: 'Lwr ',
    upper: 'Upr ',
});
exports.WndM = (0, helpers_1.createEnum)('WndM', 'wind', {
    wind: 'Wnd ',
    blast: 'Blst',
    stagger: 'Stgr',
});
exports.Drct = (0, helpers_1.createEnum)('Drct', 'from the right', {
    left: 'Left',
    right: 'Rght',
});
exports.IntE = (0, helpers_1.createEnum)('IntE', 'odd lines', {
    'odd lines': 'ElmO',
    'even lines': 'ElmE',
});
exports.IntC = (0, helpers_1.createEnum)('IntC', 'interpolation', {
    duplication: 'CrtD',
    interpolation: 'CrtI',
});
exports.FlMd = (0, helpers_1.createEnum)('FlMd', 'wrap around', {
    'set to transparent': 'Bckg',
    'repeat edge pixels': 'Rpt ',
    'wrap around': 'Wrp ',
});
exports.prjM = (0, helpers_1.createEnum)('prjM', 'fisheye', {
    'fisheye': 'fisP',
    'perspective': 'perP',
    'auto': 'auto',
    'full spherical': 'fusP',
});
//# sourceMappingURL=descriptor.js.map