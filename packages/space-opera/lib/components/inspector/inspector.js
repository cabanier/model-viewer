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
/**
 * @fileoverview Inspector panel for GLTF/GLB files.
 */
import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ConnectedLitElement } from '../connected_lit_element/connected_lit_element.js';
import { getModel, isLoaded } from '../model_viewer_preview/reducer.js';
/**
 * The inspector.
 */
let InspectorPanel = class InspectorPanel extends ConnectedLitElement {
    constructor() {
        super(...arguments);
        this.gltfJsonstring = '';
        this.thumbnailsById = new Map();
    }
    stateChanged(state) {
        if (!isLoaded(state)) {
            return;
        }
        const model = getModel(state);
        if (model.thumbnailsById != null) {
            this.thumbnailsById = model.thumbnailsById;
        }
        this.gltfJsonstring = model.originalGltfJson;
    }
    render() {
        const thumbnails = [...this.thumbnailsById.values()];
        return html `
        <div>
          <div class="texture-images">
            ${thumbnails.map(thumbnail => html `<img width="100" src="${thumbnail.objectUrl}">`)}
          </div>
          <pre class="inspector-content">${this.gltfJsonstring || 'No model loaded'}
          </pre>
        </div>
    `;
    }
};
__decorate([
    state()
], InspectorPanel.prototype, "gltfJsonstring", void 0);
__decorate([
    state()
], InspectorPanel.prototype, "thumbnailsById", void 0);
InspectorPanel = __decorate([
    customElement('me-inspector-panel')
], InspectorPanel);
export { InspectorPanel };
//# sourceMappingURL=inspector.js.map