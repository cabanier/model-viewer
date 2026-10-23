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
import { createSafeObjectUrlFromArrayBuffer } from '../utils/create_object_url.js';
import { INITIAL_ENVIRONMENT_IMAGES } from './types.js';
/**
 * Creates a blob url from an uploaded file, should be used only for
 * environment image.
 */
export async function createBlobUrlFromEnvironmentImage(file) {
    const arrayBuffer = await file.arrayBuffer();
    const safeObjectUrl = createSafeObjectUrlFromArrayBuffer(arrayBuffer);
    const unsafeUrl = file.name.match(/\.(hdr)$/i) ?
        safeObjectUrl.unsafeUrl + '#.hdr' :
        safeObjectUrl.unsafeUrl;
    return unsafeUrl;
}
// EnvironmentImages //////////////////
/** Dispatch an edit to potential environment images to select. */
const UPLOAD_ENVIRONMENT_IMAGE = 'UPLOAD_ENVIRONMENT_IMAGE';
export function dispatchAddEnvironmentImage(image) {
    return { type: UPLOAD_ENVIRONMENT_IMAGE, payload: image };
}
function addEnvironmentImage(state, image) {
    const environmentImages = [...state, image];
    return environmentImages;
}
export const getEnvironmentImages = (state) => state.entities.environment.environmentImages;
export function environmentReducer(state = {
    environmentImages: INITIAL_ENVIRONMENT_IMAGES
}, action) {
    switch (action.type) {
        case UPLOAD_ENVIRONMENT_IMAGE:
            return {
                environmentImages: addEnvironmentImage(state.environmentImages, action.payload)
            };
        default:
            return state;
    }
}
//# sourceMappingURL=reducer.js.map