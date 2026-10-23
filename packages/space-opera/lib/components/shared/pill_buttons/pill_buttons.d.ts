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
import { LitElement } from 'lit';
/**
 * A pill radio button group. The closest material design analog is probably
 * a choice chip, but those are yet to be implemented in MWC; for now just copy
 * over the Spacecraft implementation.
 */
export declare class PillButtons extends LitElement {
    static styles: import("lit").CSSResult;
    name: string;
    get buttons(): PillButton[];
    render(): import("lit-html").TemplateResult<1>;
    renderButton(button: PillButton): import("lit-html").TemplateResult<1>;
}
/**
 * A single pill button.
 */
export declare class PillButton extends LitElement {
    id: string;
    value: string;
    checked: boolean;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'me-pill-button': PillButton;
        'me-pill-buttons': PillButtons;
    }
}
