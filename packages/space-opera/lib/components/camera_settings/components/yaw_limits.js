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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, state } from 'lit/decorators.js';
import { reduxStore } from '../../../space_opera_base.js';
import { dispatchYawLimits } from '../../config/reducer.js';
import { getModelViewer } from '../../model_viewer_preview/reducer.js';
import { radToDeg } from '../../utils/reducer_utils.js';
import { getIsDirtyCamera } from '../reducer.js';
import { LimitsBase } from './limits_base.js';
// Yaw is degrees from forward.
/** Default minimum yaw angle (degrees) */
export const DEFAULT_MIN_YAW = -180;
/** Default maximum yaw angle (degrees) */
export const DEFAULT_MAX_YAW = 180;
/** The Camera Settings panel. */
let YawLimits = class YawLimits extends LimitsBase {
    constructor() {
        super(...arguments);
        this.isDirtyCamera = false;
    }
    stateChanged(state) {
        this.isDirtyCamera = getIsDirtyCamera(state);
    }
    dispatchLimits() {
        reduxStore.dispatch(dispatchYawLimits(this.limitsProperty));
    }
    get label() {
        return 'Apply Yaw Limits';
    }
    get minimumLabel() {
        return 'Counter-Clockwise Limit';
    }
    get maximumLabel() {
        return 'Clockwise Limit';
    }
    get absoluteMinimum() {
        return DEFAULT_MIN_YAW;
    }
    get absoluteMaximum() {
        return DEFAULT_MAX_YAW;
    }
    get currentPreviewValue() {
        const currentOrbit = getModelViewer().getCameraOrbit();
        return Math.round(radToDeg(currentOrbit.theta));
    }
};
__decorate([
    state()
], YawLimits.prototype, "isDirtyCamera", void 0);
YawLimits = __decorate([
    customElement('me-camera-yaw-limits')
], YawLimits);
export { YawLimits };
//# sourceMappingURL=yaw_limits.js.map