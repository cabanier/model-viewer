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
import '@polymer/paper-dropdown-menu/paper-dropdown-menu';
import '@polymer/paper-listbox';
import '@polymer/paper-item';
import { PaperDropdownMenuElement } from '@polymer/paper-dropdown-menu/paper-dropdown-menu';
import { PaperListboxElement } from '@polymer/paper-listbox';
import { LitElement } from 'lit';
/**
 * A dropdown button.
 */
export declare class Dropdown extends LitElement {
    static styles: import("lit").CSSResult;
    label: string;
    /** Proxies to paper-listbox's selected attribute */
    selectedIndex: number;
    paperDropdownMenu: PaperDropdownMenuElement;
    paperListbox: PaperListboxElement;
    readonly observer: MutationObserver;
    firstUpdated(): void;
    /**
     * Proxies to paper-dropdown-menu's selectedItem
     */
    get selectedItem(): Element;
    onValueChanged(): void;
    private onSlotChange;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'me-dropdown': Dropdown;
    }
}
