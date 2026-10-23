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
import { TextureInfo } from '@google/model-viewer/lib/features/scene-graph/texture-info.js';
import { Image } from '@google/model-viewer/lib/three-components/gltf-instance/gltf-2.0.js';
import { Action, BestPracticesState, State } from '../../types.js';
import { HotspotConfig } from '../hotspot_panel/types.js';
import { ModelState, Thumbnail } from '../model_viewer_preview/types.js';
export declare function getModelViewer(): import("@google/model-viewer/lib/features/annotation.js").AnnotationInterface & import("@google/model-viewer/lib/features/scene-graph.js").SceneGraphInterface & import("@google/model-viewer/lib/features/staging.js").StagingInterface & import("@google/model-viewer/lib/features/environment.js").EnvironmentInterface & import("@google/model-viewer/lib/features/controls.js").ControlsInterface & import("@google/model-viewer/lib/features/ar.js").ARInterface & import("@google/model-viewer/lib/features/loading.js").LoadingInterface & import("@google/model-viewer/lib/features/animation.js").AnimationInterface & import("@google/model-viewer/lib/model-viewer-base.js").default;
export declare function getUpdatedModelViewer(): Promise<import("@google/model-viewer/lib/features/annotation.js").AnnotationInterface & import("@google/model-viewer/lib/features/scene-graph.js").SceneGraphInterface & import("@google/model-viewer/lib/features/staging.js").StagingInterface & import("@google/model-viewer/lib/features/environment.js").EnvironmentInterface & import("@google/model-viewer/lib/features/controls.js").ControlsInterface & import("@google/model-viewer/lib/features/ar.js").ARInterface & import("@google/model-viewer/lib/features/loading.js").LoadingInterface & import("@google/model-viewer/lib/features/animation.js").AnimationInterface & import("@google/model-viewer/lib/model-viewer-base.js").default>;
export declare function renderCommonChildElements(hotspots: HotspotConfig[], bestPractices?: BestPracticesState, isEditor?: boolean): any[];
export declare function downloadContents(url: string): Promise<ArrayBuffer>;
export declare function getTextureId(gltfImage: Image): string;
export declare function pushThumbnail(thumbnailsById: Map<string, Thumbnail>, textureInfo: TextureInfo): Promise<string | null>;
export declare function dispatchGltfUrl(gltfUrl?: string | undefined): {
    type: string;
    payload: string | undefined;
};
export declare function dispatchRootPath(path: string): {
    type: string;
    payload: string;
};
export declare function dispatchFileMap(fileMap: Map<string, File>): {
    type: string;
    payload: Map<string, File>;
};
export declare function dispatchModel(): Promise<{
    type: string;
    payload: {
        thumbnailsById: Map<string, Thumbnail>;
        originalGltf: any;
        originalGltfJson: string;
    };
}>;
export declare function dispatchModelDirty(isDirty?: boolean): {
    type: string;
    payload: {
        isDirty: boolean;
    };
};
export declare const getGltfUrl: (state: State) => string | undefined;
export declare const getFileMap: (state: State) => Map<string, File>;
export declare const getModel: (state: State) => ModelState;
export declare const isLoaded: (state: State) => boolean;
export declare function modelReducer(state: ModelState | undefined, action: Action): ModelState;
