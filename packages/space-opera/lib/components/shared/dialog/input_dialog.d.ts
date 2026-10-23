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
import '@material/mwc-textfield';
import { Button } from '@material/mwc-button';
import { Dialog } from '@material/mwc-dialog';
import { TextField } from '@material/mwc-textfield';
import { LitElement } from 'lit';
/**
 * A styled checkbox with label
 */
export declare class InputDialog extends LitElement {
    /** Proxies to mwc-checkbox's checked field */
    openDialog: boolean;
    modal: boolean;
    placeholder: string;
    OnOK: (_value: string) => void;
    onValidate: (_value: string) => {
        valid: boolean;
        validationMessage: string;
    };
    textfield: TextField;
    button: Button;
    inputDialog: Dialog;
    onClick: () => void;
    get open(): boolean;
    set open(value: boolean);
    get textFieldValue(): string;
    set textFieldValue(value: string);
    render(): import("lit-html").TemplateResult<1>;
    firstUpdated(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'input-dialog': InputDialog;
    }
}
