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
import { styles } from './popup.css.js';
/**
 * A label that renders a custom popup area when clicked
 */
let PopUp = class PopUp extends LitElement {
    constructor() {
        super(...arguments);
        this.open = false;
        this.bodyClickHandler = this.onDocumentBodyClick.bind(this); // NOTYPO
        this.mousedown = false;
    }
    render() {
        return html `
  <div class="PopupLabel" @click="${this.togglePopup}">
    <slot name="label"></slot>
  </div>
  <div class="PopupContainer" ?open=${this.open} @mousedown=${this.onMousedown}>
    <slot name="content"></slot>
  </div>
  `;
    }
    togglePopup() {
        this.open = !this.open;
        if (this.open) {
            document.body.addEventListener('click', this.bodyClickHandler);
        }
        else {
            document.body.removeEventListener('click', this.bodyClickHandler);
        }
    }
    onMousedown() {
        this.mousedown = true;
    }
    onDocumentBodyClick(event) {
        // Don't close the popup if user drag out the popup.
        if (this.mousedown) {
            this.mousedown = false;
            return;
        }
        this.mousedown = false;
        // If the event target is a descendant of this element, don't close the
        // popup.
        // Note: We check composed path because LitElement retargets event.target
        // attribute.
        if (event.composedPath().indexOf(this) !== -1) {
            return;
        }
        this.open = false;
        document.body.removeEventListener('click', this.bodyClickHandler);
    }
};
PopUp.styles = styles;
__decorate([
    property({ type: Boolean })
], PopUp.prototype, "open", void 0);
PopUp = __decorate([
    customElement('me-popup')
], PopUp);
export { PopUp };
//# sourceMappingURL=popup.js.map