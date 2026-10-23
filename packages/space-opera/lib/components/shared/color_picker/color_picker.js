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
import './color_map.js';
import '../popup/popup.js';
import { html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import * as color from 'ts-closure-library/lib/color/color'; // from //third_party/javascript/closure/color
import { styles } from './color_picker.css.js';
/** Color picker. */
let ColorPicker = class ColorPicker extends LitElement {
    constructor() {
        super(...arguments);
        this.selectedColorHex = '#000000';
    }
    get selectedColorHsv() {
        return color.hexToHsv(this.selectedColorHex);
    }
    onColorChange() {
        this.selectedColorHex = this.colorMap.selectedColorHex;
        this.dispatchEvent(new Event('change'));
    }
    onHueInput() {
        this.selectedColorHex = color.hsvToHex(Number(this.hueSlider.value), this.selectedColorHsv[1], this.selectedColorHsv[2]);
        this.dispatchEvent(new Event('change'));
    }
    onHexInput() {
        try {
            const inputValue = color.normalizeHex(this.hexInput.value);
            this.selectedColorHex = inputValue;
            this.dispatchEvent(new Event('change'));
        }
        catch (error) {
            // Warns normalizeHex error on invalid format
            console.warn(error);
        }
    }
    updated() {
        // Force updates hueSlider and hexInput value.
        this.hueSlider.value = String(this.selectedColorHsv[0]);
        this.hexInput.value = String(this.selectedColorHex);
    }
    render() {
        return html `
  <me-popup>
    <div slot="label" class="Thumbnail"
        style=${styleMap({
            backgroundColor: this.selectedColorHex,
        })}>
    </div>
    <div slot="content" class="ColorPickerContent">
      <me-color-map hue=${this.selectedColorHsv[0]}
            saturation=${this.selectedColorHsv[1]}
            value=${this.selectedColorHsv[2]}
        @change="${this.onColorChange}"></me-color-map>
      <input class="HueSlider" type="range" min="0" max="360" id="hueSlider" value=${this.selectedColorHsv[0]} @input="${this.onHueInput}">
      <input class="HexInput" id="hexInput" value="${this.selectedColorHex}"
        @change="${this.onHexInput}">
    </div>
  </me-popup>`;
    }
};
ColorPicker.styles = styles;
__decorate([
    query('me-color-map')
], ColorPicker.prototype, "colorMap", void 0);
__decorate([
    query('input#hueSlider')
], ColorPicker.prototype, "hueSlider", void 0);
__decorate([
    query('input#hexInput')
], ColorPicker.prototype, "hexInput", void 0);
__decorate([
    property({ type: String })
], ColorPicker.prototype, "selectedColorHex", void 0);
ColorPicker = __decorate([
    customElement('me-color-picker')
], ColorPicker);
export { ColorPicker };
//# sourceMappingURL=color_picker.js.map