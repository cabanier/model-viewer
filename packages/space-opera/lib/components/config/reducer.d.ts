/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { SphericalPosition } from '@google/model-viewer/lib/features/controls.js';
import { Action, ModelViewerConfig, State } from '../../types.js';
import { Limits, Vector3D } from './types.js';
export declare function getOrbitString(orbit: SphericalPosition): string;
export declare function dispatchCameraControlsEnabled(enabled?: boolean): {
    type: string;
    payload: boolean;
};
export declare function dispatchAutoRotate(autoRotate?: boolean): {
    type: string;
    payload: boolean | undefined;
};
export declare function dispatchAutoplayEnabled(enabled?: boolean): {
    type: string;
    payload: boolean;
};
export declare function dispatchAnimationName(animationName?: string): {
    type: string;
    payload: string | undefined;
};
export declare function dispatchEnvironmentImage(ibl?: string): {
    type: string;
    payload: string | undefined;
};
export declare function dispatchExposure(exposure?: number): {
    type: string;
    payload: number | undefined;
};
export declare function dispatchToneMapping(toneMapping?: string): {
    type: string;
    payload: string | undefined;
};
export declare function dispatchUseEnvAsSkybox(useEnvAsSkybox?: boolean): {
    type: string;
    payload: boolean | undefined;
};
export declare function dispatchShadowIntensity(shadowIntensity?: number): {
    type: string;
    payload: number | undefined;
};
export declare function dispatchShadowSoftness(shadowSoftness?: number): {
    type: string;
    payload: number | undefined;
};
export declare function dispatchSetPoster(poster?: string): {
    type: string;
    payload: string | undefined;
};
export declare function dispatchSetReveal(reveal?: string): {
    type: string;
    payload: string | undefined;
};
export declare function dispatchYawLimits(yawLimitsDeg?: Limits): {
    type: string;
    payload: Limits | undefined;
};
export declare function dispatchRadiusLimits(radiusLimits?: Limits): {
    type: string;
    payload: Limits | undefined;
};
export declare function dispatchPitchLimits(pitchLimitsDeg?: Limits): {
    type: string;
    payload: Limits | undefined;
};
export declare function dispatchFovLimits(fovLimitsDeg?: Limits): {
    type: string;
    payload: Limits | undefined;
};
export declare function dispatchSetMinZoom(fovDeg?: number, radius?: number): {
    type: string;
    payload: {
        radius: number | undefined;
        fov: number | undefined;
    };
};
export declare function dispatchSaveCameraOrbit(orbit?: SphericalPosition): {
    type: string;
    payload: SphericalPosition | undefined;
};
export declare function dispatchSaveCameraFov(fov?: number): {
    type: string;
    payload: number | undefined;
};
export declare function dispatchCameraTarget(target?: Vector3D): {
    type: string;
    payload: Vector3D | undefined;
};
export declare function dispatchConfig(config: ModelViewerConfig): {
    type: string;
    payload: ModelViewerConfig;
};
export declare const getConfig: (state: State) => ModelViewerConfig;
export declare function configReducer(state: ModelViewerConfig | undefined, action: Action): ModelViewerConfig;
