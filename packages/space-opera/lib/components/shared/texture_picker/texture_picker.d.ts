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
import '@material/mwc-button';
import '../popup/popup.js';
import { LitElement } from 'lit';
import { SafeObjectUrl } from '../../utils/create_object_url.js';
export interface FileDetails {
    url: string;
    type: string;
}
/**
 * LitElement for a texture picker which allows user to select one of the
 * texture images presented
 *
 * @fires texture-selected
 * @fires texture-uploaded<SafeObjectUrl>
 */
export declare class TexturePicker extends LitElement {
    static styles: import("lit").CSSResult[];
    images: SafeObjectUrl[];
    selectedIndex?: number;
    fileInput: HTMLInputElement;
    render(): import("lit-html").TemplateResult<1>;
    renderTextureSquare(): import("lit-html").TemplateResult<1>;
    renderTextureUploadButton(): import("lit-html").TemplateResult<1>;
    onTextureChange(event: Event): void;
    onTextureClear(): void;
    onUploadImage(): Promise<void>;
}
declare global {
    interface HTMLElementTagNameMap {
        'me-texture-picker': TexturePicker;
    }
}
