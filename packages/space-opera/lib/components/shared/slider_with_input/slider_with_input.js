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
import '@polymer/paper-slider';
import '@material/mwc-textfield';
import { html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { clamp } from '../../utils/reducer_utils.js';
import { styles } from './slider_with_input.css.js';
/**
 * LitElement for a slider and input box pair that should always stay in sync
 * with each other.
 */
let SliderWithInputElement = class SliderWithInputElement extends LitElement {
    constructor() {
        super(...arguments);
        this.min = 0;
        this.max = 10;
        this.step = 1;
        this.value = 0;
        this.inputLabel = '';
        this.disabled = false;
    }
    updated() {
        this.value = clamp(this.value, this.min, this.max);
        // Force input value to update, this is necessary as programmatic value
        // update is disabled after user keyboard input
        this.input.value = String(this.value);
    }
    onSliderChange(event) {
        event.stopPropagation(); // Retarget input event
        this.value = this.slider.immediateValue;
        this.dispatchEvent(new Event('change'));
    }
    onInputChange(event) {
        event.stopPropagation(); // Retarget input event
        const newNumber = Number(this.input.value);
        this.value =
            clamp(isFinite(newNumber) ? newNumber : this.value, this.min, this.max);
        this.dispatchEvent(new Event('change'));
    }
    render() {
        return html `
    <div class="Container">
      <paper-slider
        class="Slider"
        value="${this.value}"
        min="${this.min}"
        max="${this.max}"
        step="${this.step}"
        secondary-progress="-180"
        @immediate-value-change=${this.onSliderChange}
        @change=${this.onSliderChange}></paper-slider>

      <div class="InputContainer">
        <input type="number"
          class="InlineInput"
          value="${String(this.value)}"
          step="${this.step}"
          min="${this.min}" max="${this.max}"
          @change="${this.onInputChange}"
          ?disabled=${this.disabled}>
      </div>
    </div>`;
    }
    // Convenience function for testing
    clickTo(value) {
        this.value = value;
        this.dispatchEvent(new Event('change'));
    }
};
SliderWithInputElement.styles = styles;
__decorate([
    property({ type: Number })
], SliderWithInputElement.prototype, "min", void 0);
__decorate([
    property({ type: Number })
], SliderWithInputElement.prototype, "max", void 0);
__decorate([
    property({ type: Number })
], SliderWithInputElement.prototype, "step", void 0);
__decorate([
    property({ type: Number })
], SliderWithInputElement.prototype, "value", void 0);
__decorate([
    property({ type: String })
], SliderWithInputElement.prototype, "inputLabel", void 0);
__decorate([
    property({ type: Boolean })
], SliderWithInputElement.prototype, "disabled", void 0);
__decorate([
    query('paper-slider')
], SliderWithInputElement.prototype, "slider", void 0);
__decorate([
    query('input')
], SliderWithInputElement.prototype, "input", void 0);
SliderWithInputElement = __decorate([
    customElement('me-slider-with-input')
], SliderWithInputElement);
export { SliderWithInputElement };
//# sourceMappingURL=slider_with_input.js.map