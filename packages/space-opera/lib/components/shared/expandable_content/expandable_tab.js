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
import './expandable_section.js';
import '@material/mwc-icon';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './expandable_tab.css.js';
/**
 * An expandable tab with a label and an arrow icon indicating its expanded
 * state.
 */
let ExpandableTab = class ExpandableTab extends LitElement {
    constructor() {
        super(...arguments);
        this.tabName = '';
        this.open = false;
        this.enabled = true;
        this.sticky = false;
    }
    render() {
        const stickyClass = this.sticky ? 'sticky' : '';
        const copy = this.copyFunction !== undefined ? html `
        <mwc-button class="upload" id="uploadButton"
          icon="file_copy" @click="${this.copyFunction}">
        </mwc-button>` :
            html ``;
        const StickyWithLineHeightClass = this.copyFunction !== undefined ? '' : 'StickyWithLineHeight';
        if (this.sticky) {
            return html `
    <div class="expandableTab ${stickyClass}">
      <div data-element-type="expandableTab">
        <div class="sticky-container ${StickyWithLineHeightClass}">
          <div class="sticky-label">
            ${this.tabName}
          </div>
          ${copy}
        </div>
      </div>

      <me-expandable-section ?open=${this.open} .sticky=${true}>
        <span slot="content">
          <slot name="content"></slot>
        </span>
      </me-expandable-section>
      <div class="Spacer"></div>
    </div>
  `;
        }
        if (!this.enabled) {
            return html `
    <div class="expandableTab">
      <div data-element-type="expandableTab">
        <div class="TabHeader DisabledTabHeader">
          <span class="TabLabel">
            ${this.tabName}
            <slot name="tooltip"></slot>
          </span>
        </div>
      </div>
    </div>
  `;
        }
        return html `
<div class="expandableTab">
  <div data-element-type="expandableTab">
    <div class="TabHeader" @click="${this.toggle}">
      <span class="TabLabel">
        ${this.tabName}
        <slot name="tooltip"></slot>
      </span>
      <div class="IconArea">
        <mwc-icon>
        ${this.open ? html `keyboard_arrow_up` : html `keyboard_arrow_down`}
        </mwc-icon>
      </div>
    </div>
  </div>

  <me-expandable-section ?open=${this.open}>
    <span slot="content">
      <slot name="content"></slot>
    </span>
  </me-expandable-section>
</div>
        `;
    }
    toggle() {
        if (!this.sticky) {
            this.open = !this.open;
        }
    }
};
ExpandableTab.styles = styles;
__decorate([
    property({ type: String })
], ExpandableTab.prototype, "tabName", void 0);
__decorate([
    property({ type: Boolean })
], ExpandableTab.prototype, "open", void 0);
__decorate([
    property({ type: Boolean })
], ExpandableTab.prototype, "enabled", void 0);
__decorate([
    property({ type: Boolean })
], ExpandableTab.prototype, "sticky", void 0);
__decorate([
    property({ attribute: false })
], ExpandableTab.prototype, "copyFunction", void 0);
ExpandableTab = __decorate([
    customElement('me-expandable-tab')
], ExpandableTab);
export { ExpandableTab };
//# sourceMappingURL=expandable_tab.js.map