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
import '@material/mwc-button';
import '../popup/popup.js';
import { html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { fileModalStyles } from '../../../styles.css.js';
import { createSafeObjectURL } from '../../utils/create_object_url.js';
import { IMAGE_MIME_TYPES } from '../../utils/gltf_constants.js';
import { checkFinite } from '../../utils/reducer_utils.js';
import { styles } from './texture_picker.css.js';
const ACCEPT_IMAGE_TYPE = IMAGE_MIME_TYPES.join(',');
/**
 * LitElement for a texture picker which allows user to select one of the
 * texture images presented
 *
 * @fires texture-selected
 * @fires texture-uploaded<SafeObjectUrl>
 */
let TexturePicker = class TexturePicker extends LitElement {
    constructor() {
        super(...arguments);
        this.images = [];
    }
    render() {
        return html `
  <me-popup>
    ${this.renderTextureSquare()}
    <div slot="content" class="PickerContentContainer">
      <div class="TexturePanel">
        <div class="TextureList">
          ${this.images.map((imageUrl, index) => html `
            <label>
              <input
                class="TextureOptionInput"
                index="${index}"
                type="radio"
                name="textureSelect"
                @click="${this.onTextureChange}">
              <img class="TextureImage" src="${imageUrl}">
            </label>
            `)}
          <div slot="label" id="nullTextureSquare" class="NullTextureSquareInList" @click=${this.onTextureClear}>
            <span class="TextureImage"></span>
          </div>
        </div>
        ${this.renderTextureUploadButton()}
      </div>
    </div>
  </me-popup>
  `;
    }
    renderTextureSquare() {
        if (this.selectedIndex === undefined || this.images.length === 0) {
            return html `
          <div slot="label" class="NullTextureSquare">
            <span class="TextureImage"></span>
          </div>
          `;
        }
        else {
            return html `
          <div slot="label" class="TextureSquare">
          <img class="TextureImage" src="${this.images[this.selectedIndex]}"></div>`;
        }
    }
    renderTextureUploadButton() {
        return html `
      <mwc-button unelevated label="IMAGE" id="uploadButton" icon="file_upload">
        <label for="texture-input" class="FileInputLabel"/>
      </mwc-button>
      <input type="file" accept=${ACCEPT_IMAGE_TYPE} id="texture-input" @change="${this.onUploadImage}"/>`;
    }
    onTextureChange(event) {
        this.selectedIndex = checkFinite(Number(event.target.getAttribute('index')));
        this.dispatchEvent(new CustomEvent('texture-changed'));
    }
    onTextureClear() {
        this.selectedIndex = undefined;
        this.dispatchEvent(new CustomEvent('texture-changed'));
    }
    async onUploadImage() {
        const files = this.fileInput.files;
        if (!files) {
            return;
        }
        const url = createSafeObjectURL(files[0]).unsafeUrl;
        this.dispatchEvent(new CustomEvent('texture-uploaded', { detail: { url, type: files[0].type } }));
    }
};
TexturePicker.styles = [styles, fileModalStyles];
__decorate([
    property({ type: Array })
], TexturePicker.prototype, "images", void 0);
__decorate([
    property({ type: Number })
], TexturePicker.prototype, "selectedIndex", void 0);
__decorate([
    query('input#texture-input')
], TexturePicker.prototype, "fileInput", void 0);
TexturePicker = __decorate([
    customElement('me-texture-picker')
], TexturePicker);
export { TexturePicker };
//# sourceMappingURL=texture_picker.js.map