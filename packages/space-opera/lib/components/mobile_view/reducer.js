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
export function getMobileModelViewer() {
    var _a;
    return (_a = document.querySelector('mobile-view')) === null || _a === void 0 ? void 0 : _a.modelViewer;
}
const SET_AR = 'SET_AR';
export function dispatchAr(isAr) {
    return { type: SET_AR, payload: isAr };
}
const SET_AR_MODES = 'SET_AR_MODES';
export function dispatchArModes(arModes) {
    return { type: SET_AR_MODES, payload: arModes };
}
const SET_AR_CONFIG = 'SET_AR_CONFIG';
export function dispatchArConfig(arConfig) {
    return { type: SET_AR_CONFIG, payload: arConfig };
}
export const getArConfig = (state) => state.entities.modelViewerSnippet.arConfig;
export function arReducer(state = INITIAL_STATE.entities.modelViewerSnippet.arConfig, action) {
    switch (action.type) {
        case SET_AR_CONFIG:
            return action.payload;
        case SET_AR:
            return Object.assign(Object.assign({}, state), { ar: action.payload });
        case SET_AR_MODES:
            return Object.assign(Object.assign({}, state), { arModes: action.payload });
        default:
            return state;
    }
}
const SET_REFRESHABLE = 'SET_REFRESHABLE';
export function dispatchSetRefreshable(canRefresh) {
    return { type: SET_REFRESHABLE, payload: canRefresh };
}
const SET_FORCE_POST = 'SET_FORCE_POST';
export function dispatchSetForcePost(forcePost) {
    return { type: SET_FORCE_POST, payload: forcePost };
}
export const getRefreshable = (state) => state.entities.mobile.isRefreshable;
// Allow the ability to trigger a postInfo (for a mobile device) from anywhere
// in the code.
export const getForcePost = (state) => state.entities.mobile.forcePost;
export function mobileReducer(state = {
    isRefreshable: false,
    forcePost: false
}, action) {
    switch (action.type) {
        case SET_REFRESHABLE:
            return Object.assign(Object.assign({}, state), { isRefreshable: action.payload });
        case SET_FORCE_POST:
            return Object.assign(Object.assign({}, state), { forcePost: action.payload });
        default:
            return state;
    }
}
//# sourceMappingURL=reducer.js.map