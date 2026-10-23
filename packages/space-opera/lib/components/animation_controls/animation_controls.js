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
import '../shared/checkbox/checkbox.js';
import '@polymer/paper-item';
import { html } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { reduxStore } from '../../space_opera_base.js';
import { dispatchAnimationName, dispatchAutoplayEnabled, getConfig } from '../config/reducer';
import { ConnectedLitElement } from '../connected_lit_element/connected_lit_element.js';
import { getModelViewer, getUpdatedModelViewer, isLoaded } from '../model_viewer_preview/reducer.js';
/**
 * Animation controls for gltf and model-viewer.
 */
let AnimationControls = class AnimationControls extends ConnectedLitElement {
    constructor() {
        super(...arguments);
        this.animationNames = [];
        this.selectedAnimation = undefined;
        this.autoplay = false;
        this.clipLength = 0;
    }
    stateChanged(state) {
        var _a;
        const config = getConfig(state);
        this.selectedAnimation = config.animationName;
        this.autoplay = !!config.autoplay;
        if (isLoaded(state)) {
            this.animationNames = (_a = getModelViewer().availableAnimations) !== null && _a !== void 0 ? _a : [];
            this.updateScrubber();
        }
    }
    render() {
        let selectedAnimationIndex = this.selectedAnimation ?
            this.animationNames.findIndex((name) => name === this.selectedAnimation) :
            0; // Select first animation as model-viewer default
        if (selectedAnimationIndex === -1) {
            selectedAnimationIndex = 0;
        }
        const hasAnims = this.animationNames.length > 0;
        const tabHeader = hasAnims ? 'Animations' : 'Animations (Model has none)';
        return html `
      <me-expandable-tab tabName=${tabHeader} .enabled=${hasAnims} .open=${true}>
        <div slot="content">
          <me-dropdown id="animation-name-selector"
            selectedIndex=${selectedAnimationIndex}
            @select=${this.onAnimationNameChange}>
            ${this.animationNames.map(name => {
            return html `
              <paper-item value="${name}">
                ${name}
              </paper-item>`;
        })}
          </me-dropdown>
          <me-checkbox id="animation-autoplay" label="Play"
            ?checked="${!!this.autoplay}"
            @change=${this.onAutoplayChange}></me-checkbox>
          <me-section-row class="Row" label="Time" id="time">
            <me-slider-with-input
              id="scrubber"
              min=0 max=${this.clipLength} step=0.01
              @change=${this.onScrub}>
            </me-slider-with-input>
          </me-section-row>
        </div>
      </me-expandable-tab>
        `;
    }
    onAutoplayChange() {
        var _a;
        const { checked } = this.autoplayCheckbox;
        reduxStore.dispatch(dispatchAutoplayEnabled(checked));
        if (checked === false) {
            (_a = getModelViewer()) === null || _a === void 0 ? void 0 : _a.pause();
        }
    }
    onAnimationNameChange(event) {
        var _a;
        // Autoplay must be enabled otherwise the animation won't play and the
        // console throws a warning.
        const dropdown = event.target;
        const value = ((_a = dropdown.selectedItem) === null || _a === void 0 ? void 0 : _a.getAttribute('value')) || undefined;
        if (value !== undefined && this.animationNames.indexOf(value) !== -1) {
            reduxStore.dispatch(dispatchAnimationName(value));
        }
    }
    onScrub() {
        const time = this.scrubber.value;
        getModelViewer().currentTime = time;
    }
    async updateScrubber() {
        const modelViewer = await getUpdatedModelViewer();
        this.clipLength = Math.floor(modelViewer.duration * 100) / 100;
        this.scrubber.value = modelViewer.currentTime;
        this.timeElement.style.display = this.autoplay ? 'none' : '';
    }
};
__decorate([
    query('me-checkbox#animation-autoplay')
], AnimationControls.prototype, "autoplayCheckbox", void 0);
__decorate([
    query('me-slider-with-input#scrubber')
], AnimationControls.prototype, "scrubber", void 0);
__decorate([
    query('me-section-row#time')
], AnimationControls.prototype, "timeElement", void 0);
__decorate([
    state()
], AnimationControls.prototype, "animationNames", void 0);
__decorate([
    state()
], AnimationControls.prototype, "selectedAnimation", void 0);
__decorate([
    state()
], AnimationControls.prototype, "autoplay", void 0);
__decorate([
    state()
], AnimationControls.prototype, "clipLength", void 0);
AnimationControls = __decorate([
    customElement('me-animation-controls')
], AnimationControls);
export { AnimationControls };
//# sourceMappingURL=animation_controls.js.map