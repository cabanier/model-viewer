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
import { renderARButton, renderARPrompt, renderProgressBar } from '../best_practices/render_best_practices.js';
import { renderHotspots } from '../utils/hotspot/render_hotspots.js';
const THUMBNAIL_SIZE = 256;
export function getModelViewer() {
    return document.querySelector('model-viewer-preview').modelViewer;
}
export async function getUpdatedModelViewer() {
    const preview = document.querySelector('model-viewer-preview');
    const viewer = preview.modelViewer;
    await preview.updateComplete;
    await viewer.updateComplete;
    return viewer;
}
export function renderCommonChildElements(hotspots, bestPractices, isEditor) {
    const childElements = [
        ...renderHotspots(hotspots),
    ];
    if (bestPractices === null || bestPractices === void 0 ? void 0 : bestPractices.progressBar) {
        childElements.push(renderProgressBar(isEditor));
    }
    if ((bestPractices === null || bestPractices === void 0 ? void 0 : bestPractices.arButton) && !isEditor) {
        childElements.push(renderARButton());
    }
    if ((bestPractices === null || bestPractices === void 0 ? void 0 : bestPractices.arPrompt) && !isEditor) {
        childElements.push(renderARPrompt());
    }
    return childElements;
}
export async function downloadContents(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch url ${url}`);
    }
    const blob = await response.blob();
    if (!blob) {
        throw new Error(`Could not extract binary blob from response of ${url}`);
    }
    return blob.arrayBuffer();
}
export function getTextureId(gltfImage) {
    var _a;
    return (_a = gltfImage.uri) !== null && _a !== void 0 ? _a : gltfImage.bufferView.toString();
}
export async function pushThumbnail(thumbnailsById, textureInfo) {
    const { texture } = textureInfo;
    if (texture == null) {
        return null;
    }
    const { source } = texture;
    const id = getTextureId(source);
    if (!thumbnailsById.has(id)) {
        thumbnailsById.set(id, {
            objectUrl: await source.createThumbnail(THUMBNAIL_SIZE, THUMBNAIL_SIZE),
            texture
        });
    }
    return id;
}
async function createThumbnails() {
    var _a;
    const thumbnailsById = new Map();
    for (const material of (_a = getModelViewer().model) === null || _a === void 0 ? void 0 : _a.materials) {
        await material.ensureLoaded();
        const { pbrMetallicRoughness, normalTexture, emissiveTexture, occlusionTexture } = material;
        const { baseColorTexture, metallicRoughnessTexture } = pbrMetallicRoughness;
        await pushThumbnail(thumbnailsById, normalTexture);
        await pushThumbnail(thumbnailsById, emissiveTexture);
        await pushThumbnail(thumbnailsById, occlusionTexture);
        await pushThumbnail(thumbnailsById, baseColorTexture);
        await pushThumbnail(thumbnailsById, metallicRoughnessTexture);
    }
    return thumbnailsById;
}
const SET_GLTF_URL = 'SET_GLTF_URL';
export function dispatchGltfUrl(gltfUrl) {
    return { type: SET_GLTF_URL, payload: gltfUrl };
}
const SET_ROOT_PATH = 'SET_ROOT_PATH';
export function dispatchRootPath(path) {
    return { type: SET_ROOT_PATH, payload: path };
}
const SET_FILE_MAP = 'SET_FILE_MAP';
export function dispatchFileMap(fileMap) {
    return { type: SET_FILE_MAP, payload: fileMap };
}
const SET_MODEL = 'SET_MODEL';
export async function dispatchModel() {
    var _a;
    const thumbnailsById = await createThumbnails();
    const originalGltfJson = JSON.stringify((_a = getModelViewer()) === null || _a === void 0 ? void 0 : _a.originalGltfJson, null, 2);
    // Make a deep copy of the JSON so changes are not reflected.
    const originalGltf = JSON.parse(originalGltfJson);
    return {
        type: SET_MODEL,
        payload: { thumbnailsById, originalGltf, originalGltfJson }
    };
}
const SET_MODEL_DIRTY = 'SET_MODEL_DIRTY';
export function dispatchModelDirty(isDirty = true) {
    return { type: SET_MODEL_DIRTY, payload: { isDirty } };
}
export const getGltfUrl = (state) => state.entities.model.gltfUrl;
export const getFileMap = (state) => state.entities.model.fileMap;
export const getModel = (state) => state.entities.model;
export const isLoaded = (state) => !!state.entities.model.originalGltf;
export function modelReducer(state = INITIAL_STATE.entities.model, action) {
    switch (action.type) {
        case SET_GLTF_URL:
            return Object.assign(Object.assign({}, state), { gltfUrl: action.payload });
        case SET_ROOT_PATH:
            return Object.assign(Object.assign({}, state), { rootPath: action.payload });
        case SET_FILE_MAP:
            return Object.assign(Object.assign({}, state), { fileMap: action.payload });
        case SET_MODEL:
            return Object.assign(Object.assign({}, state), action.payload);
        case SET_MODEL_DIRTY:
            return Object.assign(Object.assign({}, state), action.payload);
        default:
            return state;
    }
}
//# sourceMappingURL=reducer.js.map