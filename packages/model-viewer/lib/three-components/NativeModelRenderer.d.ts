import type { Camera, FramingInfo, RendererInterface } from '../model-viewer-base.js';
import type { ModelScene } from './ModelScene.js';
export interface NativeModelElement extends HTMLElement {
    readonly ready: Promise<unknown>;
    readonly boundingBoxCenter?: DOMPointReadOnly;
    readonly boundingBoxExtents?: DOMPointReadOnly;
    entityTransform?: DOMMatrixReadOnly;
    environmentMap?: string;
    readonly environmentMapReady?: Promise<unknown>;
}
/**
 * Renders a model using the browser while retaining model-viewer's controls.
 */
export declare class NativeModelRenderer implements RendererInterface {
    private scene;
    static isSupported(): boolean;
    static isLoadCancelled(error: unknown): boolean;
    model: NativeModelElement | null;
    usesNativeControls: boolean;
    private bounds;
    private pose;
    private transform;
    private cameraMatrix;
    private cameraRotation;
    private transformedBounds;
    private input;
    private canvasSlot;
    private cancelLoad;
    private cancelled;
    private environmentURL;
    private environmentPromise;
    constructor(scene: ModelScene);
    get isActive(): boolean;
    canRender(extraUrls: string[]): boolean;
    load(progressCallback: (progress: number) => void): Promise<FramingInfo>;
    private readBounds;
    updateBounds(): void;
    syncAttributes(): void;
    syncControls(): void;
    updateEnvironment(): Promise<void>;
    private loadEnvironment;
    private getEnvironmentURL;
    render(camera: Camera): void;
    resize(_width: number, _height: number): void;
    dispose(): void;
}
