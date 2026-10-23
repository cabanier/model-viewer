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
import '@material/mwc-tab-bar';
import './tab';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './styles.css.js';
/**
 * A tabbed panel.
 */
let Tabs = class Tabs extends LitElement {
    get panels() {
        const slot = this.shadowRoot.querySelector('slot');
        return slot &&
            slot.assignedElements().filter(e => e instanceof TabbedPanel) ||
            [];
    }
    renderPanelIcon(panel) {
        if (panel instanceof TabbedPanel) {
            return html `
      <me-tab
        icon='${panel.icon}'
        label='${panel.label}'
      ></me-tab>`;
        }
        return html ``;
    }
    // Mystery.. But this is required for mwc-tab-bar to correctly select the
    // initial panel.
    firstUpdated() {
        this.requestUpdate();
    }
    render() {
        return html `
      <div class="TabHeader">
        <mv-link></mv-link>
        <mwc-tab-bar
               @MDCTabBar:activated=${this.tabActivated}>
          ${this.panels.map(this.renderPanelIcon)}
        </mwc-tab-bar>
      </div>
      <div class="TabPanelContainer">
        <slot @slotchange=${() => {
            this.requestUpdate();
        }}></slot>
      </div>
    `;
    }
    tabActivated(event) {
        const targetIndex = event.detail.index;
        this.panels.forEach((panel, index) => {
            panel.selected = index === targetIndex;
        });
    }
};
Tabs.styles = styles;
Tabs = __decorate([
    customElement('me-tabs')
], Tabs);
export { Tabs };
/**
 * A panel of content, plus an icon and label to display in the tab bar.
 */
let TabbedPanel = class TabbedPanel extends LitElement {
    constructor() {
        super(...arguments);
        this.icon = '';
        this.label = '';
        this.selected = false;
    }
    render() {
        return html `
      <slot class="TabPanel" ?selected=${this.selected}></slot>
    `;
    }
};
TabbedPanel.styles = styles;
__decorate([
    property({ type: String, reflect: true })
], TabbedPanel.prototype, "icon", void 0);
__decorate([
    property({ type: String })
], TabbedPanel.prototype, "label", void 0);
__decorate([
    property({ type: Boolean })
], TabbedPanel.prototype, "selected", void 0);
TabbedPanel = __decorate([
    customElement('me-tabbed-panel')
], TabbedPanel);
export { TabbedPanel };
//# sourceMappingURL=tabs.js.map