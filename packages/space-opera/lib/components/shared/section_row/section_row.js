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
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './section_row.css.js';
/**
 * A section row with label and content.
 */
let SectionRow = class SectionRow extends LitElement {
    constructor() {
        super(...arguments);
        this.label = '';
    }
    render() {
        return html `
  <div class="SectionRow">
    ${this.label ? html `<div class="RowLabel">${this.label}</div>` : ''}
      <div class="RowContent">
      <slot></slot>
    </div>
  </div>
    `;
    }
};
SectionRow.styles = styles;
__decorate([
    property({ type: String })
], SectionRow.prototype, "label", void 0);
SectionRow = __decorate([
    customElement('me-section-row')
], SectionRow);
export { SectionRow };
//# sourceMappingURL=section_row.js.map