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
import '../shared/expandable_content/expandable_tab.js';
import '../shared/dropdown/dropdown.js';
import '../shared/section_row/section_row.js';
import '../shared/slider_with_input/slider_with_input.js';
import '../shared/checkbox/checkbox.js';
import '@polymer/paper-item';
import '@material/mwc-button';
import { html } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { reduxStore } from '../../space_opera_base.js';
import { fileModalStyles, iblSelectorStyles } from '../../styles.css.js';
import { dispatchEnvironmentImage, dispatchExposure, dispatchShadowIntensity, dispatchShadowSoftness, dispatchToneMapping, dispatchUseEnvAsSkybox, getConfig } from '../config/reducer.js';
import { ConnectedLitElement } from '../connected_lit_element/connected_lit_element.js';
import { dispatchSetEnvironmentName } from '../relative_file_paths/reducer.js';
import { IMAGE_MIME_TYPES } from '../utils/gltf_constants.js';
import { createBlobUrlFromEnvironmentImage, dispatchAddEnvironmentImage, getEnvironmentImages } from './reducer.js';
import { DEFAULT_EXPOSURE, DEFAULT_SHADOW_INTENSITY, DEFAULT_SHADOW_SOFTNESS } from './types.js';
const ACCEPT_IMAGE_TYPE = IMAGE_MIME_TYPES.join(',') + ',.hdr';
/**
 * IBL environment selector.
 */
let IblSelector = class IblSelector extends ConnectedLitElement {
    constructor() {
        super(...arguments);
        this.config = {};
        this.environmentImages = [];
    }
    // Specifically overriding a super class method.
    // tslint:disable-next-line:enforce-name-casing
    async getUpdateComplete() {
        const noTrigger = await super.getUpdateComplete();
        await this.exposureSlider.updateComplete;
        await this.skyboxCheckbox.updateComplete;
        await this.shadowIntensitySlider.updateComplete;
        await this.shadowSoftnessSlider.updateComplete;
        return noTrigger;
    }
    stateChanged(state) {
        this.config = getConfig(state);
        this.environmentImages = getEnvironmentImages(state);
    }
    onSelectEnvironmentImage(event) {
        const dropdownElement = event.target;
        // Polymer dropdown emits an deselect event before selection, we need to
        // filter that out
        const value = dropdownElement.selectedItem.getAttribute('value');
        if (value !== this.config.environmentImage) {
            reduxStore.dispatch(dispatchEnvironmentImage(value || undefined));
            // dropdown value equals null when "Default" is selected
            if (value === null) {
                reduxStore.dispatch(dispatchSetEnvironmentName(undefined));
            }
            else {
                const envImageList = value.split('/');
                const envImageName = envImageList[envImageList.length - 1];
                reduxStore.dispatch(dispatchSetEnvironmentName(envImageName));
            }
        }
    }
    onSelectToneMapping(event) {
        const dropdownElement = event.target;
        // Polymer dropdown emits an deselect event before selection, we need to
        // filter that out
        const value = dropdownElement.selectedItem.getAttribute('value');
        if (value !== this.config.toneMapping) {
            reduxStore.dispatch(dispatchToneMapping(value || undefined));
        }
    }
    onExposureChange() {
        reduxStore.dispatch(dispatchExposure(this.exposureSlider.value));
    }
    onUseEnvAsSkyboxChange() {
        reduxStore.dispatch(dispatchUseEnvAsSkybox(this.skyboxCheckbox.checked));
    }
    onShadowIntensityChange() {
        reduxStore.dispatch(dispatchShadowIntensity(this.shadowIntensitySlider.value));
    }
    onShadowSoftnessChange() {
        reduxStore.dispatch(dispatchShadowSoftness(this.shadowSoftnessSlider.value));
    }
    // TODO:: Add test to this.
    async onUploadHDR() {
        const files = this.fileInput.files;
        if (!files) {
            return;
        }
        const file = files[0];
        const unsafeUrl = await createBlobUrlFromEnvironmentImage(file);
        reduxStore.dispatch(dispatchAddEnvironmentImage({ uri: unsafeUrl, name: file.name }));
        reduxStore.dispatch(dispatchEnvironmentImage(unsafeUrl));
        reduxStore.dispatch(dispatchSetEnvironmentName(file.name));
    }
    // TODO: On snippet input if IBL is defined, select the
    // correct option from the dropdown.
    render() {
        var _a, _b, _c;
        const value = this.config.environmentImage;
        const selectedIndex = value == null ?
            0 :
            value === 'legacy' ?
                1 :
                2 + this.environmentImages.findIndex((image) => image.uri === value);
        return html `
      <me-expandable-tab tabName="Lighting" .open=${true}>
        <div slot="content">
          <div class="HeaderLabel">Environment Image:</div>
          <div style="display: flex; justify-content: space-between">
            <me-dropdown
              class="EnvironmentImageDropdown"
              selectedIndex=${selectedIndex}
              style="align-self: center; width: 70%;"
              @select=${this.onSelectEnvironmentImage}>
              <paper-item>Neutral</paper-item>
              <paper-item value="legacy">Legacy</paper-item>
              ${this.environmentImages.map(environmentImage => html `<paper-item value=${environmentImage.uri}>${environmentImage.name}</paper-item>`)}
            </me-dropdown>
            <mwc-button unelevated label="HDR" icon="file_upload" class="UploadButton UploadHDRButton">
              <label for="imageUpload" class="FileInputLabel"/>
            </mwc-button>
            <input type="file" id="imageUpload" accept=${ACCEPT_IMAGE_TYPE} @change="${this.onUploadHDR}"/>
          </div>
          <me-section-row class="Row" label="Exposure">
            <me-slider-with-input min="0" max="2" step="0.01" id="exposure"
              @change="${this.onExposureChange}"
              value="${(_a = this.config.exposure) !== null && _a !== void 0 ? _a : DEFAULT_EXPOSURE}">
            </me-slider-with-input>
          </me-section-row>
          <me-checkbox
            id="skybox"
            label="Use Environment as Skybox"
            ?checked="${!!this.config.useEnvAsSkybox}"
            @change=${this.onUseEnvAsSkyboxChange}
            >
          </me-checkbox>
          ${selectedIndex === 0 && this.config.useEnvAsSkybox ?
            html `<div class="defaultError"><small>Choose a non-default environment</small></div>` :
            html ``}
          <me-section-row class="Row" label="Shadow Intensity">
            <me-slider-with-input min="0" max="2" step="0.01" id="shadow-intensity"
              @change="${this.onShadowIntensityChange}"
              value="${(_b = this.config.shadowIntensity) !== null && _b !== void 0 ? _b : DEFAULT_SHADOW_INTENSITY}">
            </me-slider-with-input>
          </me-section-row>

          <me-section-row class="Row" label="Shadow Softness">
            <me-slider-with-input min="0" max="1" step="0.01" id="shadow-softness"
              @change="${this.onShadowSoftnessChange}"
              value="${(_c = this.config.shadowSoftness) !== null && _c !== void 0 ? _c : DEFAULT_SHADOW_SOFTNESS}">
            </me-slider-with-input>
          </me-section-row>
          <me-section-row class="Row" label="Tone Mapping">
            <me-dropdown
              style="align-self: center; width: 70%;"
              @select=${this.onSelectToneMapping}>
              <paper-item value="neutral">Neutral</paper-item>
              <paper-item value="aces">ACES</paper-item>
              <paper-item value="agx">AgX</paper-item>
            </me-dropdown>
          </me-section-row>
        </div>
      </me-expandable-tab>
    `;
    }
};
IblSelector.styles = [iblSelectorStyles, fileModalStyles];
__decorate([
    state()
], IblSelector.prototype, "config", void 0);
__decorate([
    state()
], IblSelector.prototype, "environmentImages", void 0);
__decorate([
    query('me-slider-with-input#exposure')
], IblSelector.prototype, "exposureSlider", void 0);
__decorate([
    query('input#imageUpload')
], IblSelector.prototype, "fileInput", void 0);
__decorate([
    query('me-checkbox#skybox')
], IblSelector.prototype, "skyboxCheckbox", void 0);
__decorate([
    query('me-slider-with-input#shadow-intensity')
], IblSelector.prototype, "shadowIntensitySlider", void 0);
__decorate([
    query('me-slider-with-input#shadow-softness')
], IblSelector.prototype, "shadowSoftnessSlider", void 0);
IblSelector = __decorate([
    customElement('me-ibl-selector')
], IblSelector);
export { IblSelector };
//# sourceMappingURL=ibl_selector.js.map