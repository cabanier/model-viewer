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
import { Action, ArConfigState, State } from '../../types.js';
import { MobileState } from './types.js';
export declare function getMobileModelViewer(): (import("@google/model-viewer/lib/features/annotation.js").AnnotationInterface & import("@google/model-viewer/lib/features/scene-graph.js").SceneGraphInterface & import("@google/model-viewer/lib/features/staging.js").StagingInterface & import("@google/model-viewer/lib/features/environment.js").EnvironmentInterface & import("@google/model-viewer/lib/features/controls.js").ControlsInterface & import("@google/model-viewer/lib/features/ar.js").ARInterface & import("@google/model-viewer/lib/features/loading.js").LoadingInterface & import("@google/model-viewer/lib/features/animation.js").AnimationInterface & import("@google/model-viewer/lib/model-viewer-base.js").default) | undefined;
export declare function dispatchAr(isAr: boolean): {
    type: string;
    payload: boolean;
};
export declare function dispatchArModes(arModes: string): {
    type: string;
    payload: string;
};
export declare function dispatchArConfig(arConfig: ArConfigState): {
    type: string;
    payload: ArConfigState;
};
export declare const getArConfig: (state: State) => ArConfigState;
export declare function arReducer(state: ArConfigState | undefined, action: Action): ArConfigState;
export declare function dispatchSetRefreshable(canRefresh: boolean): {
    type: string;
    payload: boolean;
};
export declare function dispatchSetForcePost(forcePost: boolean): {
    type: string;
    payload: boolean;
};
export declare const getRefreshable: (state: State) => boolean;
export declare const getForcePost: (state: State) => boolean;
export declare function mobileReducer(state: MobileState | undefined, action: Action): MobileState;
