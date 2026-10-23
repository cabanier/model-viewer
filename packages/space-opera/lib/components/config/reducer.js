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
import { radToDeg, roundToDigits } from '../utils/reducer_utils.js';
const DIGITS = 4;
function getMinString(limits, suffix) {
    if (!limits || !limits.enabled) {
        return 'auto';
    }
    return `${roundToDigits(limits.min, DIGITS)}${suffix}`;
}
function getMaxString(limits, suffix) {
    if (!limits || !limits.enabled) {
        return 'auto';
    }
    return `${roundToDigits(limits.max, DIGITS)}${suffix}`;
}
function getUpdatedLimits(state, limits, position) {
    const DEFAULT = 'auto auto auto';
    const suffix = position === 2 ? 'm' : 'deg';
    const { minCameraOrbit, maxCameraOrbit } = state;
    const min = (minCameraOrbit == null ? DEFAULT : minCameraOrbit).split(' ');
    min[position] = getMinString(limits, suffix);
    const minString = min.join(' ');
    const max = (maxCameraOrbit == null ? DEFAULT : maxCameraOrbit).split(' ');
    max[position] = getMaxString(limits, suffix);
    const maxString = max.join(' ');
    return {
        minCameraOrbit: minString === DEFAULT ? undefined : minString,
        maxCameraOrbit: maxString === DEFAULT ? undefined : maxString
    };
}
export function getOrbitString(orbit) {
    return `${roundToDigits(radToDeg(orbit.theta), DIGITS)}deg ${roundToDigits(radToDeg(orbit.phi), DIGITS)}deg ${roundToDigits(orbit.radius, DIGITS)}m`;
}
const SET_CAMERA_CONTROLS_ENABLED = 'SET_CAMERA_CONTROLS_ENABLED';
export function dispatchCameraControlsEnabled(enabled) {
    return { type: SET_CAMERA_CONTROLS_ENABLED, payload: !!enabled };
}
const SET_AUTO_ROTATE = 'SET_AUTO_ROTATE';
export function dispatchAutoRotate(autoRotate) {
    return { type: SET_AUTO_ROTATE, payload: autoRotate };
}
const SET_AUTOPLAY_ENABLED = 'SET_AUTOPLAY_ENABLED';
export function dispatchAutoplayEnabled(enabled) {
    return { type: SET_AUTOPLAY_ENABLED, payload: !!enabled };
}
const SET_ANIMATION_NAME = 'SET_ANIMATION_NAME';
export function dispatchAnimationName(animationName) {
    return { type: SET_ANIMATION_NAME, payload: animationName };
}
const UPDATE_IBL = 'UPDATE_IBL';
export function dispatchEnvironmentImage(ibl) {
    return { type: UPDATE_IBL, payload: ibl };
}
const UPDATE_EXPOSURE = 'UPDATE_EXPOSURE';
export function dispatchExposure(exposure) {
    return { type: UPDATE_EXPOSURE, payload: exposure };
}
const UPDATE_TONE_MAPPING = 'UPDATE_TONE_MAPPING';
export function dispatchToneMapping(toneMapping) {
    return { type: UPDATE_TONE_MAPPING, payload: toneMapping };
}
const SET_USE_ENV_AS_SKYBOX = 'SET_USE_ENV_AS_SKYBOX';
export function dispatchUseEnvAsSkybox(useEnvAsSkybox) {
    return { type: SET_USE_ENV_AS_SKYBOX, payload: useEnvAsSkybox };
}
const UPDATE_SHADOW_INTENSITY = 'UPDATE_SHADOW_INTENSITY';
export function dispatchShadowIntensity(shadowIntensity) {
    return { type: UPDATE_SHADOW_INTENSITY, payload: shadowIntensity };
}
const UPDATE_SHADOW_SOFTNESS = 'UPDATE_SHADOW_SOFTNESS';
export function dispatchShadowSoftness(shadowSoftness) {
    return { type: UPDATE_SHADOW_SOFTNESS, payload: shadowSoftness };
}
const SET_POSTER = 'SET_POSTER';
export function dispatchSetPoster(poster) {
    return { type: SET_POSTER, payload: poster };
}
// CURRENTLY UNUSED
const SET_REVEAL = 'SET_REVEAL';
export function dispatchSetReveal(reveal) {
    return { type: SET_REVEAL, payload: reveal };
}
// CAMERA //////////////
const SET_CAMERA_YAW_LIMITS = 'SET_CAMERA_YAW_LIMITS';
export function dispatchYawLimits(yawLimitsDeg) {
    return { type: SET_CAMERA_YAW_LIMITS, payload: yawLimitsDeg };
}
const SET_CAMERA_RADIUS_LIMITS = 'SET_CAMERA_RADIUS_LIMITS';
export function dispatchRadiusLimits(radiusLimits) {
    return { type: SET_CAMERA_RADIUS_LIMITS, payload: radiusLimits };
}
const SET_CAMERA_PITCH_LIMITS = 'SET_CAMERA_PITCH_LIMITS';
export function dispatchPitchLimits(pitchLimitsDeg) {
    return { type: SET_CAMERA_PITCH_LIMITS, payload: pitchLimitsDeg };
}
const SET_CAMERA_FOV_LIMITS = 'SET_CAMERA_FOV_LIMITS';
export function dispatchFovLimits(fovLimitsDeg) {
    return { type: SET_CAMERA_FOV_LIMITS, payload: fovLimitsDeg };
}
const SET_MIN_ZOOM = 'SET_MIN_ZOOM';
export function dispatchSetMinZoom(fovDeg, radius) {
    return {
        type: SET_MIN_ZOOM, payload: { radius: radius, fov: fovDeg }
    };
}
const SAVE_CAMERA_ORBIT = 'SAVE_CAMERA_ORBIT';
export function dispatchSaveCameraOrbit(orbit) {
    return { type: SAVE_CAMERA_ORBIT, payload: orbit };
}
const SAVE_CAMERA_FOV = 'SAVE_CAMERA_FOV';
export function dispatchSaveCameraFov(fov) {
    return { type: SAVE_CAMERA_FOV, payload: fov };
}
const SET_CAMERA_TARGET = 'SET_CAMERA_TARGET';
export function dispatchCameraTarget(target) {
    return { type: SET_CAMERA_TARGET, payload: target };
}
const SET_CONFIG = 'SET_CONFIG';
export function dispatchConfig(config) {
    return { type: SET_CONFIG, payload: config };
}
export const getConfig = (state) => state.entities.modelViewerSnippet.config;
export function configReducer(state = INITIAL_STATE.entities.modelViewerSnippet.config, action) {
    switch (action.type) {
        case SET_CONFIG:
            return action.payload;
        case SET_REVEAL:
            return Object.assign(Object.assign({}, state), { reveal: action.payload });
        case SET_POSTER:
            return Object.assign(Object.assign({}, state), { poster: action.payload });
        case UPDATE_SHADOW_SOFTNESS:
            return Object.assign(Object.assign({}, state), { shadowSoftness: action.payload });
        case UPDATE_SHADOW_INTENSITY:
            return Object.assign(Object.assign({}, state), { shadowIntensity: action.payload });
        case SET_USE_ENV_AS_SKYBOX:
            return Object.assign(Object.assign({}, state), { useEnvAsSkybox: action.payload });
        case UPDATE_EXPOSURE:
            return Object.assign(Object.assign({}, state), { exposure: action.payload });
        case UPDATE_TONE_MAPPING:
            return Object.assign(Object.assign({}, state), { toneMapping: action.payload });
        case UPDATE_IBL:
            return Object.assign(Object.assign({}, state), { environmentImage: action.payload });
        case SET_AUTOPLAY_ENABLED:
            return Object.assign(Object.assign({}, state), { autoplay: action.payload });
        case SET_ANIMATION_NAME:
            return Object.assign(Object.assign({}, state), { animationName: action.payload });
        case SET_CAMERA_CONTROLS_ENABLED:
            return Object.assign(Object.assign({}, state), { cameraControls: action.payload });
        case SET_AUTO_ROTATE:
            return Object.assign(Object.assign({}, state), { autoRotate: action.payload });
        case SET_CAMERA_TARGET:
            const target = action.payload;
            const cameraTarget = target == null ?
                undefined :
                `${roundToDigits(target.x, DIGITS)}m ${roundToDigits(target.y, DIGITS)}m ${roundToDigits(target.z, DIGITS)}m`;
            return Object.assign(Object.assign({}, state), { cameraTarget });
        case SAVE_CAMERA_ORBIT:
            const orbit = action.payload;
            const cameraOrbit = orbit == null ? undefined : getOrbitString(orbit);
            return Object.assign(Object.assign({}, state), { cameraOrbit });
        case SAVE_CAMERA_FOV:
            const fieldOfView = action.payload == null ?
                undefined :
                `${roundToDigits(action.payload, DIGITS)}deg`;
            return Object.assign(Object.assign({}, state), { fieldOfView });
        case SET_CAMERA_FOV_LIMITS:
            return Object.assign(Object.assign({}, state), { minFov: getMinString(action.payload, 'deg'), maxFov: getMaxString(action.payload, 'deg') });
        case SET_CAMERA_PITCH_LIMITS:
            return Object.assign(Object.assign({}, state), getUpdatedLimits(state, action.payload, 1));
        case SET_CAMERA_RADIUS_LIMITS:
            return Object.assign(Object.assign({}, state), getUpdatedLimits(state, action.payload, 2));
        case SET_CAMERA_YAW_LIMITS:
            return Object.assign(Object.assign({}, state), getUpdatedLimits(state, action.payload, 0));
        case SET_MIN_ZOOM:
            const orbitLimits = getUpdatedLimits(state, {
                enabled: action.payload.fov != null,
                min: action.payload.radius,
                max: -1
            }, 2);
            const minFov = getMinString({
                enabled: action.payload.fov != null,
                min: action.payload.fov,
                max: -1
            }, 'deg');
            return Object.assign(Object.assign({}, state), { minCameraOrbit: orbitLimits.minCameraOrbit, minFov: minFov === 'auto' ? undefined : minFov });
        default:
            return state;
    }
}
//# sourceMappingURL=reducer.js.map