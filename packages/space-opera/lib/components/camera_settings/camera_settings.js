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
import './components/pitch_limits.js';
import './components/yaw_limits.js';
import './components/zoom.js';
import '../shared/checkbox/checkbox.js';
import '@material/mwc-button';
import '../shared/expandable_content/expandable_tab.js';
import '../shared/section_row/section_row.js';
import '../shared/draggable_input/draggable_input.js';
import '../shared/checkbox/checkbox.js';
import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { reduxStore } from '../../space_opera_base.js';
import { cameraSettingsStyles } from '../../styles.css.js';
import { dispatchAutoRotate, dispatchCameraTarget, dispatchSaveCameraFov, dispatchSaveCameraOrbit, getConfig } from '../config/reducer.js';
import { ConnectedLitElement } from '../connected_lit_element/connected_lit_element.js';
import { getModelViewer, getUpdatedModelViewer, isLoaded } from '../model_viewer_preview/reducer.js';
import { styles as draggableInputRowStyles } from '../shared/draggable_input/draggable_input_row.css.js';
import { checkFinite, degToRad, radToDeg } from '../utils/reducer_utils.js';
let CameraOrbitEditor = class CameraOrbitEditor extends ConnectedLitElement {
    onChange() {
        this.dispatchEvent(new CustomEvent('change'));
    }
    render() {
        return html `
      <div style="justify-content: space-between; width: 100%; display: flex;">
        <div>
          <me-draggable-input
            id="yaw"
            innerLabel="yaw"
            min=-9999 max=9999
            style="min-width: 90px; max-width: 90px;"
            @change=${this.onChange}>
          </me-draggable-input>
          <me-draggable-input
            id="pitch"
            innerLabel="pitch"
            min=-9999 max=9999
            style="min-width: 90px; max-width: 90px;"
            @change=${this.onChange}>
          </me-draggable-input>
        </div>
      </div>
`;
    }
};
CameraOrbitEditor.styles = [cameraSettingsStyles, draggableInputRowStyles];
__decorate([
    query('me-draggable-input#yaw')
], CameraOrbitEditor.prototype, "yawInput", void 0);
__decorate([
    query('me-draggable-input#pitch')
], CameraOrbitEditor.prototype, "pitchInput", void 0);
CameraOrbitEditor = __decorate([
    customElement('me-camera-orbit-editor')
], CameraOrbitEditor);
/** Camera target input panel. */
let CameraTargetInput = class CameraTargetInput extends ConnectedLitElement {
    onInputChange(event) {
        event.preventDefault();
        if (!this.change) {
            return;
        }
        const target = {
            x: checkFinite(Number(this.xInput.value)),
            y: checkFinite(Number(this.yInput.value)),
            z: checkFinite(Number(this.zInput.value)),
        };
        this.change(target);
    }
    resetTarget() {
        reduxStore.dispatch(dispatchCameraTarget());
    }
    render() {
        if (!this.target) {
            return html `<div class="note">Waiting for camera target...</div>`;
        }
        return html `
        <me-draggable-input value=${this.target.x}
        id="camera-target-x" min=-9999 max=9999 dragStepSize=0.01 @change=${this.onInputChange} innerLabel="X"></me-draggable-input>
        <me-draggable-input id="camera-target-y" min=-9999 max=9999 dragStepSize=0.01 value=${this.target.y} @change=${this.onInputChange} innerLabel="Y"></me-draggable-input>
        <me-draggable-input id="camera-target-z" value=${this.target.z} min=-9999 max=9999 dragStepSize=0.01 @change=${this.onInputChange} innerLabel="Z"></me-draggable-input>
        <mwc-icon-button class="RevertButton" style="align-self: center; margin-top: -10px;" id="revert" icon="undo"
        title="Reset target" @click=${this.resetTarget}>
        </mwc-icon-button>
        `;
    }
};
CameraTargetInput.styles = [draggableInputRowStyles, cameraSettingsStyles];
__decorate([
    query('me-draggable-input#camera-target-x')
], CameraTargetInput.prototype, "xInput", void 0);
__decorate([
    query('me-draggable-input#camera-target-y')
], CameraTargetInput.prototype, "yInput", void 0);
__decorate([
    query('me-draggable-input#camera-target-z')
], CameraTargetInput.prototype, "zInput", void 0);
__decorate([
    property({ attribute: false })
], CameraTargetInput.prototype, "change", void 0);
__decorate([
    state()
], CameraTargetInput.prototype, "target", void 0);
CameraTargetInput = __decorate([
    customElement('me-camera-target-input')
], CameraTargetInput);
export { CameraTargetInput };
/** The Camera Settings panel. */
let CameraSettings = class CameraSettings extends ConnectedLitElement {
    constructor() {
        super(...arguments);
        this.config = {};
    }
    // Specifically overriding a super class method.
    // tslint:disable-next-line:enforce-name-casing
    async getUpdateComplete() {
        const noTrigger = await super.getUpdateComplete();
        await this.cameraOrbitEditor.updateComplete;
        await this.autoRotateCheckbox.updateComplete;
        return noTrigger;
    }
    stateChanged(state) {
        const config = getConfig(state);
        if (config !== this.config) {
            this.config = config;
            if (isLoaded(state)) {
                this.updateInitialCamera();
            }
        }
    }
    async updateInitialCamera() {
        const modelViewer = await getUpdatedModelViewer();
        this.cameraTargetInput.target = modelViewer.getCameraTarget();
        if (this.config.cameraOrbit == null) {
            this.cameraOrbitEditor.style.display = 'none';
        }
        else {
            const currentOrbit = modelViewer.getCameraOrbit();
            this.cameraOrbitEditor.yawInput.value = radToDeg(currentOrbit.theta);
            this.cameraOrbitEditor.pitchInput.value = radToDeg(currentOrbit.phi);
            this.cameraOrbitEditor.style.display = '';
        }
    }
    async onSaveCameraOrbit() {
        const modelViewer = await getUpdatedModelViewer();
        reduxStore.dispatch(dispatchSaveCameraOrbit(modelViewer.getCameraOrbit()));
        reduxStore.dispatch(dispatchSaveCameraFov(modelViewer.getFieldOfView()));
    }
    resetInitialCamera() {
        this.cameraOrbitEditor.style.display = 'none';
        reduxStore.dispatch(dispatchSaveCameraOrbit(undefined));
        reduxStore.dispatch(dispatchSaveCameraFov(undefined));
    }
    onUpdateFraming() {
        const modelViewer = getModelViewer();
        modelViewer.updateFraming();
        modelViewer.cameraOrbit = this.config.cameraOrbit;
    }
    onCameraOrbitEditorChange() {
        const orbit = getModelViewer().getCameraOrbit();
        orbit.phi = degToRad(this.cameraOrbitEditor.pitchInput.value),
            orbit.theta = degToRad(this.cameraOrbitEditor.yawInput.value),
            reduxStore.dispatch(dispatchSaveCameraOrbit(orbit));
        getModelViewer().jumpCameraToGoal();
    }
    onCameraTargetChange(newValue) {
        reduxStore.dispatch(dispatchCameraTarget(newValue));
    }
    onAutoRotateChange() {
        reduxStore.dispatch(dispatchAutoRotate(this.autoRotateCheckbox.checked));
    }
    render() {
        return html `
    <me-expandable-tab tabName="Camera Setup" .open=${true}>
      <div slot="content">
        <me-checkbox id="auto-rotate" label="Auto-rotate"
          ?checked="${!!this.config.autoRotate}"
          @change=${this.onAutoRotateChange}>
        </me-checkbox>
        <div>
          <div style="font-size: 14px; font-weight: 500; margin-top: 10px">Initial Camera Position:</div>
          <me-camera-orbit-editor
            @change=${this.onCameraOrbitEditorChange}>
          </me-camera-orbit-editor>
          <div style="justify-content: space-between; width: 100%; display: flex;">
            <mwc-button
              class="SaveCameraButton"
              id="save-camera-angle"
              unelevated
              icon="photo_camera"
              style="align-self: center"
              @click=${this.onSaveCameraOrbit}>
              Save current as initial
            </mwc-button>
            <mwc-icon-button class="RevertButton" style="align-self: center; margin-top: 10px;" id="revert" icon="undo"
            title="Reset initial camera" @click=${this.resetInitialCamera}>
            </mwc-icon-button>
          </div>
          <mwc-button
            class="SaveCameraButton"
            id="update-framing"
            unelevated
            icon="photo_camera"
            style="align-self: center"
            @click=${this.onUpdateFraming}>
            Reset framing
          </mwc-button>
        </div>
        <div style="font-size: 14px; font-weight: 500; margin-top: 20px">Target Point:</div>
        <me-camera-target-input .change=${this.onCameraTargetChange}>
        </me-camera-target-input>
      </div>
    </me-expandable-tab>

<me-expandable-tab tabName="Customize Limits">
  <div slot="content">
    <me-camera-yaw-limits></me-camera-yaw-limits>
    <me-camera-pitch-limits></me-camera-pitch-limits>
    <me-camera-zoom-limits></me-camera-zoom-limits>
  </div>
</me-expandable-tab>
`;
    }
};
CameraSettings.styles = cameraSettingsStyles;
__decorate([
    state()
], CameraSettings.prototype, "config", void 0);
__decorate([
    query('me-camera-orbit-editor')
], CameraSettings.prototype, "cameraOrbitEditor", void 0);
__decorate([
    query('me-camera-target-input')
], CameraSettings.prototype, "cameraTargetInput", void 0);
__decorate([
    query('me-checkbox#auto-rotate')
], CameraSettings.prototype, "autoRotateCheckbox", void 0);
CameraSettings = __decorate([
    customElement('me-camera-settings')
], CameraSettings);
export { CameraSettings };
//# sourceMappingURL=camera_settings.js.map