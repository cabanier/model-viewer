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
import { checkFinite } from '../../utils/reducer_utils.js';
import { styles } from './draggable_input.css.js';
/**
 * A draggable input tag.
 */
let DraggableInput = class DraggableInput extends LitElement {
    constructor() {
        super(...arguments);
        this.value = 0;
        this.innerLabel = 'X';
        this.min = 0;
        this.max = 100;
        this.dragStepSize = 1;
        this.precision = 2;
        this.bodyMoveHandler = this.onDocumentBodyMove.bind(this); // NOTYPO
        this.mouseUpHandler = this.onMouseup.bind(this); // NOTYPO
        this.startingDragX = 0;
        this.startingDragValue = 0;
    }
    firstUpdated() {
        this.inputElement =
            this.shadowRoot.querySelector('input');
    }
    render() {
        return html `
  <input class="InlineInput exportInputInlineInput"
         type="number"
         @change="${this.onChange}"
         .value="${this.value.toFixed(this.precision)}"
         .step="${String(Math.pow(10, -this.precision))}">
  <div class="InlineLabel exportInputInlineLabel" @mousedown="${this.onMousedown}">
    ${this.innerLabel}
  </div>
    `;
    }
    onChange() {
        var _a;
        const numValue = Number((_a = this.inputElement) === null || _a === void 0 ? void 0 : _a.value);
        checkFinite(numValue);
        this.setValue(numValue);
    }
    onMousedown(e) {
        document.body.addEventListener('mousemove', this.bodyMoveHandler);
        document.body.addEventListener('mouseup', this.mouseUpHandler);
        this.startingDragX = e.clientX;
        this.startingDragValue = Number(this.inputElement.value);
    }
    onMouseup() {
        document.body.removeEventListener('mousemove', this.bodyMoveHandler);
    }
    onDocumentBodyMove(e) {
        const currentX = e.clientX;
        this.setValue(this.startingDragValue +
            Math.round((currentX - this.startingDragX)) * this.dragStepSize);
    }
    setValue(value) {
        this.value = Math.min(Math.max(value, this.min), this.max);
        this.dispatchEvent(new CustomEvent('change'));
    }
};
DraggableInput.styles = styles;
__decorate([
    property({ type: Number })
], DraggableInput.prototype, "value", void 0);
__decorate([
    property({ type: String })
], DraggableInput.prototype, "innerLabel", void 0);
__decorate([
    property({ type: Number })
], DraggableInput.prototype, "min", void 0);
__decorate([
    property({ type: Number })
], DraggableInput.prototype, "max", void 0);
__decorate([
    property({ type: Number })
], DraggableInput.prototype, "dragStepSize", void 0);
__decorate([
    property({ type: Number })
], DraggableInput.prototype, "precision", void 0);
DraggableInput = __decorate([
    customElement('me-draggable-input')
], DraggableInput);
export { DraggableInput };
//# sourceMappingURL=draggable_input.js.map