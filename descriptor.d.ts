import { AntiAlias, BevelDirection, BevelStyle, BevelTechnique, BlendMode, Color, GlowSource, GlowTechnique, GradientStyle, InterpolationMethod, LayerEffectsInfo, LineAlignment, LineCapType, LineJoinType, Orientation, TextGridding, TimelineKeyInterpolation, TimelineTrack, TimelineTrackType, Units, UnitsBounds, UnitsValue, VectorContent, WarpStyle } from './psd';
import { PsdReader } from './psdReader';
import { PsdWriter } from './psdWriter';
export declare function setLogErrors(value: boolean): void;
export declare function readAsciiStringOrClassId(reader: PsdReader): string;
export declare function readDescriptorStructure(reader: PsdReader, includeClass: boolean): any;
export declare function writeDescriptorStructure(writer: PsdWriter, name: string, classId: string, value: any, root: string): void;
export declare function readVersionAndDescriptor(reader: PsdReader, includeClass?: boolean): any;
export declare function writeVersionAndDescriptor(writer: PsdWriter, name: string, classID: string, descriptor: any, root?: string): void;
export type DescriptorUnits = 'Angle' | 'Density' | 'Distance' | 'None' | 'Percent' | 'Pixels' | 'Millimeters' | 'Points' | 'Picas' | 'Inches' | 'Centimeters';
export interface DescriptorUnitsValue {
    units: DescriptorUnits;
    value: number;
}
export type DescriptorColor = {
    _name: '';
    _classID: 'RGBC';
    'Rd  ': number;
    'Grn ': number;
    'Bl  ': number;
} | {
    _name: '';
    _classID: 'HSBC';
    'H   ': DescriptorUnitsValue;
    Strt: number;
    Brgh: number;
} | {
    _name: '';
    _classID: 'CMYC';
    'Cyn ': number;
    Mgnt: number;
    'Ylw ': number;
    Blck: number;
} | {
    _name: '';
    _classID: 'GRYC';
    'Gry ': number;
} | {
    _name: '';
    _classID: 'LABC';
    Lmnc: number;
    'A   ': number;
    'B   ': number;
} | {
    _name: '';
    _classID: 'RGBC';
    redFloat: number;
    greenFloat: number;
    blueFloat: number;
};
export interface DesciptorPattern {
    'Nm  ': string;
    Idnt: string;
}
export type DesciptorGradient = {
    'Nm  ': string;
    GrdF: 'GrdF.CstS';
    Intr: number;
    Clrs: {
        'Clr ': DescriptorColor;
        Type: 'Clry.UsrS';
        Lctn: number;
        Mdpn: number;
    }[];
    Trns: {
        Opct: DescriptorUnitsValue;
        Lctn: number;
        Mdpn: number;
    }[];
} | {
    GrdF: 'GrdF.ClNs';
    Smth: number;
    'Nm  ': string;
    ClrS: string;
    RndS: number;
    VctC?: boolean;
    ShTr?: boolean;
    'Mnm ': number[];
    'Mxm ': number[];
};
export interface DescriptorColorContent {
    'Clr ': DescriptorColor;
}
export interface DescriptorGradientContent {
    Grad: DesciptorGradient;
    Type: string;
    Dthr?: boolean;
    Rvrs?: boolean;
    Angl?: DescriptorUnitsValue;
    'Scl '?: DescriptorUnitsValue;
    Algn?: boolean;
    Ofst?: {
        Hrzn: DescriptorUnitsValue;
        Vrtc: DescriptorUnitsValue;
    };
}
export interface DescriptorPatternContent {
    Ptrn: DesciptorPattern;
    Lnkd?: boolean;
    phase?: {
        Hrzn: number;
        Vrtc: number;
    };
}
export type DescriptorVectorContent = DescriptorColorContent | DescriptorGradientContent | DescriptorPatternContent;
export interface StrokeDescriptor {
    strokeStyleVersion: number;
    strokeEnabled: boolean;
    fillEnabled: boolean;
    strokeStyleLineWidth: DescriptorUnitsValue;
    strokeStyleLineDashOffset: DescriptorUnitsValue;
    strokeStyleMiterLimit: number;
    strokeStyleLineCapType: string;
    strokeStyleLineJoinType: string;
    strokeStyleLineAlignment: string;
    strokeStyleScaleLock: boolean;
    strokeStyleStrokeAdjust: boolean;
    strokeStyleLineDashSet: DescriptorUnitsValue[];
    strokeStyleBlendMode: string;
    strokeStyleOpacity: DescriptorUnitsValue;
    strokeStyleContent: DescriptorVectorContent;
    strokeStyleResolution: number;
}
export interface BoundsDescriptor {
    Left: DescriptorUnitsValue;
    'Top ': DescriptorUnitsValue;
    Rght: DescriptorUnitsValue;
    Btom: DescriptorUnitsValue;
}
export interface TextDescriptor {
    'Txt ': string;
    textGridding: string;
    Ornt: string;
    AntA: string;
    bounds?: BoundsDescriptor;
    boundingBox?: BoundsDescriptor;
    TextIndex: number;
    EngineData?: Uint8Array;
}
export interface WarpDescriptor {
    warpStyle: string;
    warpValue?: number;
    warpValues?: number[];
    warpPerspective: number;
    warpPerspectiveOther: number;
    warpRotate: string;
    bounds?: {
        'Top ': DescriptorUnitsValue;
        Left: DescriptorUnitsValue;
        Btom: DescriptorUnitsValue;
        Rght: DescriptorUnitsValue;
    };
    uOrder: number;
    vOrder: number;
    customEnvelopeWarp?: {
        _name: '';
        _classID: 'customEnvelopeWarp';
        meshPoints: {
            type: 'Hrzn' | 'Vrtc';
            values: number[];
        }[];
    };
}
export interface QuiltWarpDescriptor extends WarpDescriptor {
    deformNumRows: number;
    deformNumCols: number;
    customEnvelopeWarp: {
        _name: '';
        _classID: 'customEnvelopeWarp';
        quiltSliceX: {
            type: 'quiltSliceX';
            values: number[];
        }[];
        quiltSliceY: {
            type: 'quiltSliceY';
            values: number[];
        }[];
        meshPoints: {
            type: 'Hrzn' | 'Vrtc';
            values: number[];
        }[];
    };
}
export interface FractionDescriptor {
    numerator: number;
    denominator: number;
}
export interface HrznVrtcDescriptor {
    Hrzn: number;
    Vrtc: number;
}
export interface FrameDescriptor {
    FrLs: number[];
    enab?: boolean;
    IMsk?: {
        Ofst: HrznVrtcDescriptor;
    };
    VMsk?: {
        Ofst: HrznVrtcDescriptor;
    };
    Ofst?: HrznVrtcDescriptor;
    FXRf?: HrznVrtcDescriptor;
    Lefx?: Lfx2Descriptor;
    blendOptions?: {
        Opct: DescriptorUnitsValue;
    };
}
export interface FrameListDescriptor {
    LaID: number;
    LaSt: FrameDescriptor[];
}
export declare function horzVrtcToXY(hv: HrznVrtcDescriptor): {
    x: number;
    y: number;
};
export declare function xyToHorzVrtc(xy: {
    x: number;
    y: number;
}): HrznVrtcDescriptor;
export declare function descBoundsToBounds(desc: BoundsDescriptor): UnitsBounds;
export declare function boundsToDescBounds(bounds: UnitsBounds): BoundsDescriptor;
export type TimelineAnimKeyDescriptor = {
    Type: 'keyType.Opct';
    Opct: DescriptorUnitsValue;
} | {
    Type: 'keyType.Trnf';
    'Scl ': HrznVrtcDescriptor;
    Skew: HrznVrtcDescriptor;
    rotation: number;
    translation: HrznVrtcDescriptor;
} | {
    Type: 'keyType.Pstn';
    Hrzn: number;
    Vrtc: number;
} | {
    Type: 'keyType.sheetStyle';
    sheetStyle: {
        Vrsn: number;
        Lefx?: Lfx2Descriptor;
        blendOptions: {};
    };
} | {
    Type: 'keyType.globalLighting';
    gblA: number;
    globalAltitude: number;
};
export interface TimelineKeyDescriptor {
    Vrsn: 1;
    animInterpStyle: 'animInterpStyle.Lnr ' | 'animInterpStyle.hold';
    time: FractionDescriptor;
    animKey: TimelineAnimKeyDescriptor;
    selected: boolean;
}
export interface TimelineTrackDescriptor {
    trackID: 'stdTrackID.globalLightingTrack' | 'stdTrackID.opacityTrack' | 'stdTrackID.styleTrack' | 'stdTrackID.sheetTransformTrack' | 'stdTrackID.sheetPositionTrack';
    Vrsn: 1;
    enab: boolean;
    Effc: boolean;
    effectParams?: {
        keyList: TimelineKeyDescriptor[];
        fillCanvas: boolean;
        zoomOrigin: number;
    };
    keyList: TimelineKeyDescriptor[];
}
export interface TimeScopeDescriptor {
    Vrsn: 1;
    Strt: FractionDescriptor;
    duration: FractionDescriptor;
    inTime: FractionDescriptor;
    outTime: FractionDescriptor;
}
export interface TimelineDescriptor {
    Vrsn: 1;
    timeScope: TimeScopeDescriptor;
    autoScope: boolean;
    audioLevel: number;
    LyrI: number;
    trackList?: TimelineTrackDescriptor[];
}
export interface EffectDescriptor extends Partial<DescriptorGradientContent>, Partial<DescriptorPatternContent> {
    enab?: boolean;
    Styl: string;
    PntT?: string;
    'Md  '?: string;
    Opct?: DescriptorUnitsValue;
    'Sz  '?: DescriptorUnitsValue;
    'Clr '?: DescriptorColor;
    present?: boolean;
    showInDialog?: boolean;
    overprint?: boolean;
}
export interface Lfx2Descriptor {
    'Scl '?: DescriptorUnitsValue;
    masterFXSwitch?: boolean;
    DrSh?: EffectDescriptor;
    IrSh?: EffectDescriptor;
    OrGl?: EffectDescriptor;
    IrGl?: EffectDescriptor;
    ebbl?: EffectDescriptor;
    SoFi?: EffectDescriptor;
    patternFill?: EffectDescriptor;
    GrFl?: EffectDescriptor;
    ChFX?: EffectDescriptor;
    FrFX?: EffectDescriptor;
}
export interface LmfxDescriptor {
    'Scl '?: DescriptorUnitsValue;
    masterFXSwitch?: boolean;
    dropShadowMulti?: EffectDescriptor[];
    innerShadowMulti?: EffectDescriptor[];
    OrGl?: EffectDescriptor;
    solidFillMulti?: EffectDescriptor[];
    gradientFillMulti?: EffectDescriptor[];
    patternFill?: EffectDescriptor;
    frameFXMulti?: EffectDescriptor[];
    IrGl?: EffectDescriptor;
    ebbl?: EffectDescriptor;
    ChFX?: EffectDescriptor;
    numModifyingFX?: number;
}
export declare function serializeEffects(e: LayerEffectsInfo, log: boolean, multi: boolean): Lfx2Descriptor & LmfxDescriptor;
export declare function parseEffects(info: Lfx2Descriptor & LmfxDescriptor, log: boolean): LayerEffectsInfo;
export declare function parseTrackList(trackList: TimelineTrackDescriptor[], logMissingFeatures: boolean): TimelineTrack[];
export declare function serializeTrackList(tracks: TimelineTrack[]): TimelineTrackDescriptor[];
export declare function parseVectorContent(descriptor: DescriptorVectorContent): VectorContent;
export declare function serializeVectorContent(content: VectorContent): {
    descriptor: DescriptorVectorContent;
    key: string;
};
export declare function parseColor(color: DescriptorColor): Color;
export declare function serializeColor(color: Color | undefined): DescriptorColor;
export declare function parseAngle(x: DescriptorUnitsValue): number;
export declare function parsePercent(x: DescriptorUnitsValue | undefined): number;
export declare function parsePercentOrAngle(x: DescriptorUnitsValue | undefined): number;
export declare function parseUnits({ units, value }: DescriptorUnitsValue): UnitsValue;
export declare function parseUnitsOrNumber(value: DescriptorUnitsValue | number, units?: Units): UnitsValue;
export declare function parseUnitsToNumber({ units, value }: DescriptorUnitsValue, expectedUnits: string): number;
export declare function unitsAngle(value: number | undefined): DescriptorUnitsValue;
export declare function unitsPercent(value: number | undefined): DescriptorUnitsValue;
export declare function unitsPercentF(value: number | undefined): DescriptorUnitsValue;
export declare function unitsValue(x: UnitsValue | undefined, key: string): DescriptorUnitsValue;
export declare function frac({ numerator, denominator }: FractionDescriptor): {
    numerator: number;
    denominator: number;
};
export declare const textGridding: {
    decode: (val: string) => TextGridding;
    encode: (val: TextGridding | undefined) => string;
};
export declare const Ornt: {
    decode: (val: string) => Orientation;
    encode: (val: Orientation | undefined) => string;
};
export declare const Annt: {
    decode: (val: string) => AntiAlias;
    encode: (val: AntiAlias | undefined) => string;
};
export declare const warpStyle: {
    decode: (val: string) => WarpStyle;
    encode: (val: WarpStyle | undefined) => string;
};
export declare const BlnM: {
    decode: (val: string) => BlendMode;
    encode: (val: BlendMode | undefined) => string;
};
export declare const BESl: {
    decode: (val: string) => BevelStyle;
    encode: (val: BevelStyle | undefined) => string;
};
export declare const bvlT: {
    decode: (val: string) => BevelTechnique;
    encode: (val: BevelTechnique | undefined) => string;
};
export declare const BESs: {
    decode: (val: string) => BevelDirection;
    encode: (val: BevelDirection | undefined) => string;
};
export declare const BETE: {
    decode: (val: string) => GlowTechnique;
    encode: (val: GlowTechnique | undefined) => string;
};
export declare const IGSr: {
    decode: (val: string) => GlowSource;
    encode: (val: GlowSource | undefined) => string;
};
export declare const GrdT: {
    decode: (val: string) => GradientStyle;
    encode: (val: GradientStyle | undefined) => string;
};
export declare const animInterpStyleEnum: {
    decode: (val: string) => TimelineKeyInterpolation;
    encode: (val: TimelineKeyInterpolation | undefined) => string;
};
export declare const stdTrackID: {
    decode: (val: string) => TimelineTrackType;
    encode: (val: TimelineTrackType | undefined) => string;
};
export declare const gradientInterpolationMethodType: {
    decode: (val: string) => InterpolationMethod;
    encode: (val: InterpolationMethod | undefined) => string;
};
export declare const ClrS: {
    decode: (val: string) => "rgb" | "hsb" | "lab";
    encode: (val: "rgb" | "hsb" | "lab" | undefined) => string;
};
export declare const FStl: {
    decode: (val: string) => "center" | "inside" | "outside";
    encode: (val: "center" | "inside" | "outside" | undefined) => string;
};
export declare const FrFl: {
    decode: (val: string) => "color" | "pattern" | "gradient";
    encode: (val: "color" | "pattern" | "gradient" | undefined) => string;
};
export declare const ESliceType: {
    decode: (val: string) => "image" | "noImage";
    encode: (val: "image" | "noImage" | undefined) => string;
};
export declare const ESliceHorzAlign: {
    decode: (val: string) => "default";
    encode: (val: "default" | undefined) => string;
};
export declare const ESliceVertAlign: {
    decode: (val: string) => "default";
    encode: (val: "default" | undefined) => string;
};
export declare const ESliceOrigin: {
    decode: (val: string) => "userGenerated" | "autoGenerated" | "layer";
    encode: (val: "userGenerated" | "autoGenerated" | "layer" | undefined) => string;
};
export declare const ESliceBGColorType: {
    decode: (val: string) => "none" | "color" | "matte";
    encode: (val: "none" | "color" | "matte" | undefined) => string;
};
export declare const strokeStyleLineCapType: {
    decode: (val: string) => LineCapType;
    encode: (val: LineCapType | undefined) => string;
};
export declare const strokeStyleLineJoinType: {
    decode: (val: string) => LineJoinType;
    encode: (val: LineJoinType | undefined) => string;
};
export declare const strokeStyleLineAlignment: {
    decode: (val: string) => LineAlignment;
    encode: (val: LineAlignment | undefined) => string;
};
export declare const BlrM: {
    decode: (val: string) => "spin" | "zoom";
    encode: (val: "spin" | "zoom" | undefined) => string;
};
export declare const BlrQ: {
    decode: (val: string) => "draft" | "good" | "best";
    encode: (val: "draft" | "good" | "best" | undefined) => string;
};
export declare const SmBM: {
    decode: (val: string) => "normal" | "edge only" | "overlay edge";
    encode: (val: "normal" | "edge only" | "overlay edge" | undefined) => string;
};
export declare const SmBQ: {
    decode: (val: string) => "high" | "low" | "medium";
    encode: (val: "high" | "low" | "medium" | undefined) => string;
};
export declare const DspM: {
    decode: (val: string) => "stretch to fit" | "tile";
    encode: (val: "stretch to fit" | "tile" | undefined) => string;
};
export declare const UndA: {
    decode: (val: string) => "wrap around" | "repeat edge pixels";
    encode: (val: "wrap around" | "repeat edge pixels" | undefined) => string;
};
export declare const Cnvr: {
    decode: (val: string) => "rectangular to polar" | "polar to rectangular";
    encode: (val: "rectangular to polar" | "polar to rectangular" | undefined) => string;
};
export declare const RplS: {
    decode: (val: string) => "small" | "medium" | "large";
    encode: (val: "small" | "medium" | "large" | undefined) => string;
};
export declare const SphM: {
    decode: (val: string) => "normal" | "horizontal only" | "vertical only";
    encode: (val: "normal" | "horizontal only" | "vertical only" | undefined) => string;
};
export declare const Wvtp: {
    decode: (val: string) => "sine" | "square" | "triangle";
    encode: (val: "sine" | "square" | "triangle" | undefined) => string;
};
export declare const ZZTy: {
    decode: (val: string) => "around center" | "out from center" | "pond ripples";
    encode: (val: "around center" | "out from center" | "pond ripples" | undefined) => string;
};
export declare const Dstr: {
    decode: (val: string) => "uniform" | "gaussian";
    encode: (val: "uniform" | "gaussian" | undefined) => string;
};
export declare const Chnl: {
    decode: (val: string) => "composite" | "red" | "green" | "blue";
    encode: (val: "composite" | "red" | "green" | "blue" | undefined) => string;
};
export declare const MztT: {
    decode: (val: string) => "fine dots" | "medium dots" | "grainy dots" | "coarse dots" | "short lines" | "medium lines" | "long lines" | "short strokes" | "medium strokes" | "long strokes";
    encode: (val: "fine dots" | "medium dots" | "grainy dots" | "coarse dots" | "short lines" | "medium lines" | "long lines" | "short strokes" | "medium strokes" | "long strokes" | undefined) => string;
};
export declare const Lns: {
    decode: (val: string) => "50-300mm zoom" | "32mm prime" | "105mm prime" | "movie prime";
    encode: (val: "50-300mm zoom" | "32mm prime" | "105mm prime" | "movie prime" | undefined) => string;
};
export declare const blurType: {
    decode: (val: string) => "gaussian blur" | "motion blur" | "lens blur";
    encode: (val: "gaussian blur" | "motion blur" | "lens blur" | undefined) => string;
};
export declare const DfsM: {
    decode: (val: string) => "normal" | "darken only" | "lighten only" | "anisotropic";
    encode: (val: "normal" | "darken only" | "lighten only" | "anisotropic" | undefined) => string;
};
export declare const ExtT: {
    decode: (val: string) => "blocks" | "pyramids";
    encode: (val: "blocks" | "pyramids" | undefined) => string;
};
export declare const ExtR: {
    decode: (val: string) => "random" | "level-based";
    encode: (val: "random" | "level-based" | undefined) => string;
};
export declare const FlCl: {
    decode: (val: string) => "background color" | "foreground color" | "inverse image" | "unaltered image";
    encode: (val: "background color" | "foreground color" | "inverse image" | "unaltered image" | undefined) => string;
};
export declare const CntE: {
    decode: (val: string) => "upper" | "lower";
    encode: (val: "upper" | "lower" | undefined) => string;
};
export declare const WndM: {
    decode: (val: string) => "wind" | "blast" | "stagger";
    encode: (val: "wind" | "blast" | "stagger" | undefined) => string;
};
export declare const Drct: {
    decode: (val: string) => "left" | "right";
    encode: (val: "left" | "right" | undefined) => string;
};
export declare const IntE: {
    decode: (val: string) => "odd lines" | "even lines";
    encode: (val: "odd lines" | "even lines" | undefined) => string;
};
export declare const IntC: {
    decode: (val: string) => "duplication" | "interpolation";
    encode: (val: "duplication" | "interpolation" | undefined) => string;
};
export declare const FlMd: {
    decode: (val: string) => "wrap around" | "repeat edge pixels" | "set to transparent";
    encode: (val: "wrap around" | "repeat edge pixels" | "set to transparent" | undefined) => string;
};
export declare const prjM: {
    decode: (val: string) => "auto" | "perspective" | "fisheye" | "full spherical";
    encode: (val: "auto" | "perspective" | "fisheye" | "full spherical" | undefined) => string;
};
