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
import '@material/mwc-checkbox';
import { Checkbox } from '@material/mwc-checkbox';
import { LitElement } from 'lit';
/**
 * A styled checkbox with label
 */
export declare class CheckboxElement extends LitElement {
    static styles: import("lit").CSSResult;
    /** Proxies to mwc-checkbox's checked field */
    checked: boolean;
    label: string;
    checkbox: Checkbox;
    getUpdateComplete(): Promise<boolean>;
    render(): import("lit-html").TemplateResult<1>;
    onCheckedChange(): void;
    click(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'me-checkbox': CheckboxElement;
    }
}
