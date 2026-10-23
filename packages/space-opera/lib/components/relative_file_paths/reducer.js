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
import { INITIAL_STATE } from '../../types';
const SET_MODEL_NAME = 'SET_MODEL_NAME';
export function dispatchSetModelName(name) {
    return { type: SET_MODEL_NAME, payload: name };
}
const SET_ENVIRONMENT_NAME = 'SET_ENVIRONMENT_NAME';
export function dispatchSetEnvironmentName(name) {
    return { type: SET_ENVIRONMENT_NAME, payload: name };
}
const SET_POSTER_NAME = 'SET_POSTER_NAME';
export function dispatchSetPosterName(name) {
    return { type: SET_POSTER_NAME, payload: name };
}
export const getRelativeFilePaths = (state) => state.entities.modelViewerSnippet.relativeFilePaths;
export function relativeFilePathsReducer(state = INITIAL_STATE.entities.modelViewerSnippet.relativeFilePaths, action) {
    switch (action.type) {
        case SET_MODEL_NAME:
            return Object.assign(Object.assign({}, state), { modelName: action.payload });
        case SET_ENVIRONMENT_NAME:
            return Object.assign(Object.assign({}, state), { environmentName: action.payload });
        case SET_POSTER_NAME:
            return Object.assign(Object.assign({}, state), { posterName: action.payload });
        default:
            return state;
    }
}
//# sourceMappingURL=reducer.js.map