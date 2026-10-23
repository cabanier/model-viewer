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
import '../shared/expandable_content/expandable_tab.js';
import '../shared/section_row/section_row.js';
import '@material/mwc-icon-button';
import { html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { reduxStore } from '../../space_opera_base.js';
import { hotspotEditorStyles } from '../../styles.css.js';
import { dispatchRemoveHotspot, dispatchUpdateHotspot } from './reducer.js';
/** A editor card for a single hotspot */
let HotspotEditorElement = class HotspotEditorElement extends LitElement {
    updated(properties) {
        var _a;
        if (properties.has('config')) {
            this.annotationInput.value = ((_a = this.config) === null || _a === void 0 ? void 0 : _a.annotation) || '';
        }
    }
    render() {
        if (!this.config)
            return html ``;
        return html `
    <me-section-row label="Label:">
      <textarea id="annotation" @input=${this.onAnnotationInput}>${this.config.annotation}</textarea>
      <mwc-icon-button id="remove-hotspot"
        icon="delete"
        @click="${this.onRemoveHotspot}"></mwc-icon-button>
    </me-section-row>
    `;
    }
    onAnnotationInput() {
        if (!this.annotationInput)
            return;
        const newConfig = Object.assign(Object.assign({}, this.config), { annotation: this.annotationInput.value });
        reduxStore.dispatch(dispatchUpdateHotspot(newConfig));
    }
    onRemoveHotspot() {
        if (!this.config) {
            throw new Error('Invalid config');
        }
        reduxStore.dispatch(dispatchRemoveHotspot(this.config.name));
    }
};
HotspotEditorElement.styles = hotspotEditorStyles;
__decorate([
    property({ type: Object })
], HotspotEditorElement.prototype, "config", void 0);
__decorate([
    query('textarea#annotation')
], HotspotEditorElement.prototype, "annotationInput", void 0);
HotspotEditorElement = __decorate([
    customElement('me-hotspot-editor')
], HotspotEditorElement);
export { HotspotEditorElement };
//# sourceMappingURL=hotspot_editor.js.map