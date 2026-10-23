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
import '../shared/expandable_content/expandable_tab.js';
import '../shared/section_row/section_row.js';
import '@material/mwc-icon-button';
import { LitElement, PropertyValues } from 'lit';
import { HotspotConfig } from './types.js';
/** A editor card for a single hotspot */
export declare class HotspotEditorElement extends LitElement {
    static styles: import("lit").CSSResult;
    config?: HotspotConfig;
    annotationInput: HTMLTextAreaElement;
    updated(properties: PropertyValues): void;
    render(): import("lit-html").TemplateResult<1>;
    onAnnotationInput(): void;
    onRemoveHotspot(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'me-hotspot-editor': HotspotEditorElement;
    }
}
