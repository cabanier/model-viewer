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
import '@material/mwc-checkbox';
import { html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { styles } from './checkbox.css.js';
/**
 * A styled checkbox with label
 */
let CheckboxElement = class CheckboxElement extends LitElement {
    constructor() {
        super(...arguments);
        /** Proxies to mwc-checkbox's checked field */
        this.checked = false;
        this.label = '';
    }
    // Specifically overriding a super class method.
    // tslint:disable-next-line:enforce-name-casing
    async getUpdateComplete() {
        const noTrigger = await super.getUpdateComplete();
        await this.checkbox.updateComplete;
        return noTrigger;
    }
    render() {
        return html `
  <mwc-checkbox ?checked="${this.checked}" @change="${this.onCheckedChange}"></mwc-checkbox>
  <div class="Label">
    ${this.label}
  </div>
    `;
    }
    onCheckedChange() {
        this.checked = this.checkbox.checked;
        this.dispatchEvent(new Event('change'));
    }
    // Convenience function for testing
    click() {
        this.checkbox.click();
    }
};
CheckboxElement.styles = styles;
__decorate([
    property({ type: Boolean })
], CheckboxElement.prototype, "checked", void 0);
__decorate([
    property({ type: String })
], CheckboxElement.prototype, "label", void 0);
__decorate([
    query('mwc-checkbox')
], CheckboxElement.prototype, "checkbox", void 0);
CheckboxElement = __decorate([
    customElement('me-checkbox')
], CheckboxElement);
export { CheckboxElement };
//# sourceMappingURL=checkbox.js.map