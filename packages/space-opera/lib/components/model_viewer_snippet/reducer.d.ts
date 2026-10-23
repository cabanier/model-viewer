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
import { Action, ImageType, ModelViewerConfig, ModelViewerSnippetState, PosterConfig, RelativeFilePathsState, State } from '../../types.js';
export declare const getModelViewerSnippet: (state: State) => ModelViewerSnippetState;
/**
 * Sets the filepaths of a copy of the config.
 * Used when displaying and exporting the snippet.
 * NOT used inside the actual model-viewer element.
 */
export declare function applyRelativeFilePaths(editedConfig: ModelViewerConfig, gltfUrl: string | undefined, relativeFilePaths: RelativeFilePathsState): void;
export declare function dispatchExtraAttributes(attributes: any): {
    type: string;
    payload: any;
};
export declare const getExtraAttributes: (state: State) => any;
export declare function extraAttributesReducer(state: any | undefined, action: Action): any;
export declare function dispatchHeight(height: number): {
    type: string;
    payload: number;
};
export declare function dispatchMimeType(type: ImageType): {
    type: string;
    payload: ImageType;
};
export declare function getPosterConfig(state: State): PosterConfig;
export declare function posterReducer(state: PosterConfig | undefined, action: Action): PosterConfig;
