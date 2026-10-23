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
import '@material/mwc-textfield';
import { html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
/**
 * A styled checkbox with label
 */
let InputDialog = class InputDialog extends LitElement {
    constructor() {
        super(...arguments);
        /** Proxies to mwc-checkbox's checked field */
        this.openDialog = false;
        this.modal = false;
        this.placeholder = 'Enter Value';
        this.OnOK = (_value) => { };
        this.onValidate = (_value) => {
            return { valid: true, validationMessage: '' };
        };
        this.onClick = () => {
            this.OnOK(this.textfield.value);
        };
    }
    get open() {
        return this.inputDialog.open;
    }
    set open(value) {
        this.textfield.validationMessage = '';
        this.textfield.value = '';
        this.textfield.placeholder = this.placeholder;
        this.inputDialog.open = value;
    }
    get textFieldValue() {
        return this.textfield.value;
    }
    set textFieldValue(value) {
        this.textfield.value = value;
    }
    render() {
        return html `
    <mwc-dialog scrimClickAction="${this.modal ? '' : 'close'}">
      <mwc-textfield placeholder=${this.placeholder} autoValidate="true"></mwc-textfield>
      <mwc-button
        slot="primaryAction"
        dialogAction="ok"
        disabled="true"
        @click=${this.onClick}>
        Ok
      </mwc-button>
      <mwc-button
              slot="secondaryAction"
              dialogAction="cancel">
          Cancel
      </mwc-button>
    </mwc-dialog>
     `;
    }
    firstUpdated() {
        const self = this;
        this.textfield.validityTransform =
            (value, nativeValidity) => {
                const { valid, validationMessage } = self.onValidate(value);
                if (!valid) {
                    self.button.disabled = true;
                    this.textfield.validationMessage = validationMessage;
                    return { valid: false };
                }
                self.button.disabled = false;
                return nativeValidity;
            };
    }
};
__decorate([
    property({ type: Boolean })
], InputDialog.prototype, "openDialog", void 0);
__decorate([
    property({ type: Boolean })
], InputDialog.prototype, "modal", void 0);
__decorate([
    property({ type: String })
], InputDialog.prototype, "placeholder", void 0);
__decorate([
    property({ attribute: false })
], InputDialog.prototype, "OnOK", void 0);
__decorate([
    property({ attribute: false })
], InputDialog.prototype, "onValidate", void 0);
__decorate([
    query('mwc-textfield')
], InputDialog.prototype, "textfield", void 0);
__decorate([
    query('mwc-button')
], InputDialog.prototype, "button", void 0);
__decorate([
    query('mwc-dialog')
], InputDialog.prototype, "inputDialog", void 0);
InputDialog = __decorate([
    customElement('input-dialog')
], InputDialog);
export { InputDialog };
//# sourceMappingURL=input_dialog.js.map