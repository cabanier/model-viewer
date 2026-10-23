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
import '@material/mwc-tab-bar';
import './tab';
import { LitElement } from 'lit';
/**
 * A tabbed panel.
 */
export declare class Tabs extends LitElement {
    static styles: import("lit").CSSResult;
    get panels(): TabbedPanel[];
    renderPanelIcon(panel: Element): import("lit-html").TemplateResult<1>;
    firstUpdated(): void;
    render(): import("lit-html").TemplateResult<1>;
    tabActivated(event: CustomEvent<{
        index: number;
    }>): void;
}
/**
 * A panel of content, plus an icon and label to display in the tab bar.
 */
export declare class TabbedPanel extends LitElement {
    static styles: import("lit").CSSResult;
    icon: string;
    label: string;
    selected: boolean;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'me-tabbed-panel': TabbedPanel;
        'me-tabs': Tabs;
    }
}
