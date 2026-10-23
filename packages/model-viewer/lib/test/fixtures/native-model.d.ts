import type { NativeModelElement } from '../../three-components/NativeModelRenderer.js';
export interface NativeModelMock {
    element: NativeModelElement;
    resolve(): void;
    reject(error: Error): void;
    environmentMaps: string[];
    readonly idleReadyReads: number;
    readonly idleEnvironmentReads: number;
}
/** Implements the native API without starting real browser model loads. */
export declare class NativeModelFixture {
    models: NativeModelMock[];
    supported: boolean;
    autoResolve: boolean;
    rejectTransforms: boolean;
    rejectEnvironment: boolean;
    exposeBounds: boolean;
    private createElement;
    private createDescriptor;
    private nativeDescriptor;
    constructor();
    restore(): void;
    private createModel;
}
