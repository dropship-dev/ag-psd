import { LayerAdditionalInfo, BezierPath, Psd, WriteOptions, BooleanOperation, LayerEffectsInfo, LayerVectorMask } from "./psd";
import { PsdReader, ReadOptionsExt } from "./psdReader";
import { PsdWriter } from "./psdWriter";
export interface ExtendedWriteOptions extends WriteOptions {
    layerIds: Set<number>;
    layerToId: Map<any, number>;
}
type HasMethod = (target: LayerAdditionalInfo) => boolean;
type ReadMethod = (reader: PsdReader, target: LayerAdditionalInfo, left: () => Promise<number>, psd: Psd, options: ReadOptionsExt) => Promise<void>;
type WriteMethod = (writer: PsdWriter, target: LayerAdditionalInfo, psd: Psd, options: ExtendedWriteOptions) => void;
export interface InfoHandler {
    key: string;
    has: HasMethod;
    read: ReadMethod;
    write: WriteMethod;
}
export declare const infoHandlers: InfoHandler[];
export declare const infoHandlersMap: {
    [key: string]: InfoHandler;
};
export declare function readBezierKnot(reader: PsdReader, width: number, height: number): number[];
export declare const booleanOperations: BooleanOperation[];
export declare function readVectorMask(reader: PsdReader, vectorMask: LayerVectorMask, width: number, height: number, size: number): BezierPath[];
export declare function hasMultiEffects(effects: LayerEffectsInfo): boolean;
export {};
