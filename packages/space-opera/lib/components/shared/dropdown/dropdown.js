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
import '@polymer/paper-dropdown-menu/paper-dropdown-menu';
import '@polymer/paper-listbox';
import '@polymer/paper-item';
import { html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { checkFinite } from '../../utils/reducer_utils.js';
import { styles } from './dropdown.css.js';
/**
 * A dropdown button.
 */
let Dropdown = class Dropdown extends LitElement {
    constructor() {
        super(...arguments);
        this.label = '';
        /** Proxies to paper-listbox's selected attribute */
        // Note that paperListbox also accept string, we explicitly require index
        // only.
        this.selectedIndex = 0;
        this.observer = new MutationObserver(this.onSlotChange.bind(this));
    }
    firstUpdated() {
        // Observe a character update in children (slot), then force update on
        // paperListbox
        this.observer.observe(this, {
            childList: true,
            subtree: true,
            characterData: true,
        });
    }
    /**
     * Proxies to paper-dropdown-menu's selectedItem
     */
    get selectedItem() {
        return this.paperDropdownMenu.selectedItem;
    }
    onValueChanged() {
        // Filters unselect event fired by paper-dropdown-menu
        if (this.paperDropdownMenu.selectedItem &&
            this.paperListbox.selected != null &&
            this.paperListbox.selected != this.selectedIndex) {
            this.selectedIndex = checkFinite(Number(this.paperListbox.selected));
            this.dispatchEvent(new Event('select'));
        }
    }
    onSlotChange() {
        // Force update paperListbox
        this.paperListbox.set('selected', null);
        this.paperListbox.set('selected', this.selectedIndex);
    }
    render() {
        // The custom style gets rid of the underline in the NPM build.
        return html `
      <custom-style>
        <style>
        paper-dropdown-menu {
          --paper-input-container-underline: { display: none; };
          --paper-input-container-underline-focus: { display: none; };
        }
        </style>
      </custom-style>
      <paper-dropdown-menu class="EditorDropdown exportEditorDropdown exportSpacecraftTheme" label="${this.label}" no-label-float @value-changed="${this.onValueChanged}">
        <paper-listbox slot="dropdown-content" class="exportSelectPopup" selected="${this.selectedIndex}">
          <slot></slot>
        </paper-listbox>
      </paper-dropdown-menu>
    `;
    }
};
Dropdown.styles = styles;
__decorate([
    property({ type: String })
], Dropdown.prototype, "label", void 0);
__decorate([
    property({ type: Number })
], Dropdown.prototype, "selectedIndex", void 0);
__decorate([
    query('paper-dropdown-menu')
], Dropdown.prototype, "paperDropdownMenu", void 0);
__decorate([
    query('paper-listbox')
], Dropdown.prototype, "paperListbox", void 0);
Dropdown = __decorate([
    customElement('me-dropdown')
], Dropdown);
export { Dropdown };
//# sourceMappingURL=dropdown.js.map