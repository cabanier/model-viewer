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
import { styles } from './pill_buttons.css.js';
/**
 * A pill radio button group. The closest material design analog is probably
 * a choice chip, but those are yet to be implemented in MWC; for now just copy
 * over the Spacecraft implementation.
 */
let PillButtons = class PillButtons extends LitElement {
    constructor() {
        super(...arguments);
        this.name = '';
    }
    get buttons() {
        const slot = this.shadowRoot.querySelector('slot');
        return slot &&
            slot.assignedElements().filter(e => e instanceof PillButton) ||
            [];
    }
    render() {
        return html `
        <div class="PillButtons">
          ${this.buttons.map(button => this.renderButton(button))}
        </div>

        <slot
          @slotchange=${() => this.requestUpdate()}
          style='display:none'></slot>
        `;
    }
    renderButton(button) {
        return html `
        <div class="PillRadio">
          <input type="radio"
            name="${this.name}"
            class="PillRadioInput"
            value="${button.value}"
            id="${button.id}"
            ?checked=${button.checked}>
          <label
            class="RadioLabel"
            for="${button.id}" value="${button.value}">
            ${button.textContent}
          </label>
        </div>`;
    }
};
PillButtons.styles = styles;
__decorate([
    property({ type: String })
], PillButtons.prototype, "name", void 0);
PillButtons = __decorate([
    customElement('me-pill-buttons')
], PillButtons);
export { PillButtons };
/**
 * A single pill button.
 */
let PillButton = class PillButton extends LitElement {
    constructor() {
        super(...arguments);
        this.id = '';
        this.value = '';
        this.checked = false;
    }
    render() {
        return html `<slot></slot>`;
    }
};
__decorate([
    property({ type: String })
], PillButton.prototype, "id", void 0);
__decorate([
    property({ type: String })
], PillButton.prototype, "value", void 0);
__decorate([
    property({ type: Boolean })
], PillButton.prototype, "checked", void 0);
PillButton = __decorate([
    customElement('me-pill-button')
], PillButton);
export { PillButton };
//# sourceMappingURL=pill_buttons.js.map