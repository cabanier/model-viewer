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
import './expandable_section.js';
import '@material/mwc-icon';
import { LitElement } from 'lit';
/**
 * An expandable tab with a label and an arrow icon indicating its expanded
 * state.
 */
export declare class ExpandableTab extends LitElement {
    tabName: string;
    open: boolean;
    enabled: boolean;
    sticky?: boolean | undefined;
    copyFunction?: Function;
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
    toggle(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'me-expandable-tab': ExpandableTab;
    }
}
