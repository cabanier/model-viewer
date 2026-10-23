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
import './hotspot_editor.js';
import '@material/mwc-button';
import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { reduxStore } from '../../space_opera_base.js';
import { ConnectedLitElement } from '../connected_lit_element/connected_lit_element.js';
import { dispatchUpdateHotspotMode, getHotspotMode, getHotspots } from './reducer.js';
/** Hotspot panel. */
let HotspotPanel = class HotspotPanel extends ConnectedLitElement {
    constructor() {
        super(...arguments);
        this.addHotspotMode = false;
        this.hotspots = [];
    }
    stateChanged(state) {
        this.addHotspotMode = getHotspotMode(state) || false;
        this.hotspots = getHotspots(state);
    }
    onAddHotspot() {
        reduxStore.dispatch(dispatchUpdateHotspotMode(true));
    }
    render() {
        return html `
  <me-expandable-tab tabName="Hotspots">
    <span slot="content">
    ${this.hotspots.map((hotspot) => html `<me-hotspot-editor .config="${hotspot}"></me-hotspot-editor>`)}
    ${this.addHotspotMode ?
            html `<div> Click on the model in the preview to add a hotspot.</div>` :
            html `<mwc-button unelevated icon="add_circle"
                id="add-hotspot" @click="${this.onAddHotspot}">Add hotspot
      </mwc-button>`}
    </span>
  </me-expandable-tab>
    `;
    }
};
__decorate([
    state()
], HotspotPanel.prototype, "addHotspotMode", void 0);
__decorate([
    state()
], HotspotPanel.prototype, "hotspots", void 0);
HotspotPanel = __decorate([
    customElement('me-hotspot-panel')
], HotspotPanel);
export { HotspotPanel };
//# sourceMappingURL=hotspot_panel.js.map