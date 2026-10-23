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
import { INITIAL_STATE } from '../../types.js';
export const getModelViewerSnippet = (state) => state.entities.modelViewerSnippet;
/**
 * Sets the filepaths of a copy of the config.
 * Used when displaying and exporting the snippet.
 * NOT used inside the actual model-viewer element.
 */
export function applyRelativeFilePaths(editedConfig, gltfUrl, relativeFilePaths) {
    if (gltfUrl) {
        editedConfig.src = relativeFilePaths.modelName;
    }
    else {
        editedConfig.src = 'Upload model...';
    }
    if (editedConfig.environmentImage) {
        editedConfig.environmentImage = relativeFilePaths.environmentName;
    }
    editedConfig.poster = relativeFilePaths.posterName;
}
const SET_EXTRA_ATTRIBUTES = 'SET_EXTRA_ATTRIBUTES';
export function dispatchExtraAttributes(attributes) {
    return { type: SET_EXTRA_ATTRIBUTES, payload: attributes };
}
export const getExtraAttributes = (state) => state.entities.modelViewerSnippet.extraAttributes;
export function extraAttributesReducer(state = INITIAL_STATE.entities.modelViewerSnippet.extraAttributes, action) {
    switch (action.type) {
        case SET_EXTRA_ATTRIBUTES:
            return action.payload;
        default:
            return state;
    }
}
const SET_HEIGHT = 'SET_HEIGHT';
export function dispatchHeight(height) {
    return { type: SET_HEIGHT, payload: height };
}
const SET_MIMETYPE = 'SET_MIMETYPE';
export function dispatchMimeType(type) {
    return { type: SET_MIMETYPE, payload: type };
}
export function getPosterConfig(state) {
    return state.entities.modelViewerSnippet.poster;
}
export function posterReducer(state = INITIAL_STATE.entities.modelViewerSnippet.poster, action) {
    switch (action.type) {
        case SET_HEIGHT:
            return Object.assign(Object.assign({}, state), { height: action.payload });
        case SET_MIMETYPE:
            return Object.assign(Object.assign({}, state), { mimeType: action.payload });
        default:
            return state;
    }
}
//# sourceMappingURL=reducer.js.map