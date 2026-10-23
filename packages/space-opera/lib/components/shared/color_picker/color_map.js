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
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import * as color from 'ts-closure-library/lib/color/color'; // from //third_party/javascript/closure/color
import { clamp } from '../../utils/reducer_utils.js';
import { styles } from './color_map.css.js';
/**
 * A color map for HSV colors, displays a gradient field of Saturation (x-axis)
 * versus Value (y-axis) given Hue.
 */
let ColorMap = class ColorMap extends LitElement {
    constructor() {
        super(...arguments);
        this.hue = 0;
        this.saturation = 0;
        this.value = 0;
        this.mouseEventHandler = this.onMouseEvent.bind(this); // NOTYPO
        this.mouseUpHandler = this.onMouseUp.bind(this); // NOTYPO
    }
    /** Used for rendering the hsv colormap. */
    get backgroundColor() {
        return color.hslToHex(this.hue, 1, 0.5);
    }
    get selectedColorHex() {
        return color.hsvToHex(this.hue, this.saturation, this.value);
    }
    onMouseDown(event) {
        document.body.addEventListener('mousemove', this.mouseEventHandler);
        document.body.addEventListener('mouseup', this.mouseUpHandler);
        this.onMouseEvent(event);
    }
    onMouseEvent(event) {
        const clientRect = this.getBoundingClientRect();
        this.saturation =
            clamp((event.clientX - clientRect.left) / this.offsetWidth, 0, 1);
        this.value = clamp(255 - (event.clientY - clientRect.top) / this.offsetHeight * 255, 0, 255);
        event.preventDefault();
        this.dispatchEvent(new Event('change'));
    }
    onMouseUp() {
        document.body.removeEventListener('mousemove', this.mouseEventHandler);
        document.body.removeEventListener('mouseup', this.mouseEventHandler);
    }
    render() {
        return html `
  <div class="ColorMapContainer" style=${styleMap({
            'background-color': this.backgroundColor
        })}
        @mousedown="${this.onMouseDown}">
      <div class="ColorPointer" style=${styleMap({
            left: `${this.saturation * 100}%`,
            top: `${100 - this.value * 100 / 255}%`,
            'background-color': this.selectedColorHex,
        })}>
        <div class="Ink exportInk"></div>
        <div class="Outer exportOuterThumb"></div>
      </div>
      <div class="ColorMapBackground WhiteToTransparentBackground"></div>
      <div class="ColorMapBackground WhiteToBlackBackground"></div>
  </div>
    `;
    }
};
ColorMap.styles = styles;
__decorate([
    property({ type: Number })
], ColorMap.prototype, "hue", void 0);
__decorate([
    property({ type: Number })
], ColorMap.prototype, "saturation", void 0);
__decorate([
    property({ type: Number })
], ColorMap.prototype, "value", void 0);
ColorMap = __decorate([
    customElement('me-color-map')
], ColorMap);
export { ColorMap };
//# sourceMappingURL=color_map.js.map