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
import { ConnectedLitElement } from '../../connected_lit_element/connected_lit_element.js';
/** The Camera Settings panel. */
export declare class ZooomLimits extends ConnectedLitElement {
    static styles: import("lit").CSSResult;
    enabled: boolean;
    minRadius?: number;
    minFov?: number;
    onToggle(event: Event): void;
    dispatchMin(): void;
    dispatchResetMin(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'me-camera-zoom-limits': ZooomLimits;
    }
}
