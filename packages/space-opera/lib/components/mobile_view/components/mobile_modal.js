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
import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
// @ts-ignore, the qrious package isn't typed
import QRious from 'qrious';
import { openModalStyles } from '../../../styles.css.js';
import { ConnectedLitElement } from '../../connected_lit_element/connected_lit_element.js';
/**
 * Modal for displaying the QR Code & link
 */
let MobileModal = class MobileModal extends ConnectedLitElement {
    constructor() {
        super(...arguments);
        this.pipeId = 0;
        this.isOpen = false;
        this.isNewQRCode = true;
    }
    get viewableSite() {
        const path = window.location.origin + window.location.pathname;
        return `${path}view/?id=${this.pipeId}`;
    }
    open() {
        if (this.isNewQRCode) {
            new QRious({ element: this.canvasQR, value: this.viewableSite, size: 200 });
            this.isNewQRCode = false;
        }
        this.isOpen = true;
    }
    close() {
        this.isOpen = false;
    }
    render() {
        return html `
<paper-dialog id="file-modal" modal ?opened=${this.isOpen} class="dialog">
  <div class="FileModalContainer">
    <div class="FileModalHeader">
      <div>Mobile View</div>
    </div>
    <div class="modal-text">
      Use the QR Code to open your edited model, environment image, and &ltmodel-viewer&gt snippet on a mobile device to test out AR features.
      After every subsequent change, click the "Refresh Mobile" button.
    </div>
    <canvas id="qr" style="display: block; margin-bottom: 10px;"></canvas>
    <div class="modal-text" style="margin-bottom: 80px;">
      <a href="${this.viewableSite}" target="_blank" style="color: white">${this.viewableSite}</a>
    </div>
    <div class="modal-text">
      This uses a third-party <a href="https://github.com/nwtgck/piping-server" target="_blank" class="piping-link">piping server</a> to deploy to your mobile device. This server does not store data.
    </div>
    <div class="modal-text">
      We use this server: <a href="https://ppng.io/" target="_blank" class="piping-link">https://ppng.io/</a>
    </div>
  </div>
  <div class="FileModalCancel">
    <mwc-button unelevated icon="cancel"
      @click=${this.close}>Close</mwc-button>
  </div>
</paper-dialog>`;
    }
};
MobileModal.styles = openModalStyles;
__decorate([
    property({ type: Number })
], MobileModal.prototype, "pipeId", void 0);
__decorate([
    state()
], MobileModal.prototype, "isOpen", void 0);
__decorate([
    state()
], MobileModal.prototype, "isNewQRCode", void 0);
__decorate([
    query('canvas#qr')
], MobileModal.prototype, "canvasQR", void 0);
MobileModal = __decorate([
    customElement('mobile-modal')
], MobileModal);
export { MobileModal };
//# sourceMappingURL=mobile_modal.js.map