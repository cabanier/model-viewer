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
import '@material/mwc-switch';
import './expandable_section.js';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './expandable_switch.css.js';
/**
 * An expandable switch.
 */
let ExpandableSwitch = class ExpandableSwitch extends LitElement {
    constructor() {
        super(...arguments);
        this.open = false;
        this.label = '';
    }
    render() {
        return html `
  <div class="LabeledSwitchContainer exportLabeledSwitchContainer">
    <div class="SwitchLabel exportSwitchLabel">
      ${this.label}
    </div>
    <mwc-switch @change="${this.onChange}">
    </mwc-switch>
  </div>

  <me-expandable-section ?open=${this.open}>
    <span slot="content">
      <slot name="content"></slot>
    </span>
  </me-expandable-section>

  <div class="Spacer"></div>
   `;
    }
    onChange(event) {
        const checkbox = event.target;
        this.open = checkbox.selected;
    }
};
ExpandableSwitch.styles = styles;
__decorate([
    property({ type: Boolean })
], ExpandableSwitch.prototype, "open", void 0);
__decorate([
    property({ type: String })
], ExpandableSwitch.prototype, "label", void 0);
ExpandableSwitch = __decorate([
    customElement('me-expandable-switch')
], ExpandableSwitch);
export { ExpandableSwitch };
//# sourceMappingURL=expandable_switch.js.map