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
import { styles } from './expandable_section.css.js';
/**
 * An expandable content section.
 */
let ExpandableSection = class ExpandableSection extends LitElement {
    constructor() {
        super(...arguments);
        this.open = false;
        this.sticky = false;
    }
    render() {
        const stickyClass = this.sticky ? 'sticky' : '';
        return html `
    <div class="SectionContent ${stickyClass}" ?open=${this.open}>
        <slot name="content"></slot>
    </div>
   `;
    }
};
ExpandableSection.styles = styles;
__decorate([
    property({ type: Boolean })
], ExpandableSection.prototype, "open", void 0);
__decorate([
    property({ type: Boolean })
], ExpandableSection.prototype, "sticky", void 0);
ExpandableSection = __decorate([
    customElement('me-expandable-section')
], ExpandableSection);
export { ExpandableSection };
//# sourceMappingURL=expandable_section.js.map