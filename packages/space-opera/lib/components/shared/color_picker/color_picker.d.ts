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
import './color_map.js';
import '../popup/popup.js';
import { LitElement } from 'lit';
import * as color from 'ts-closure-library/lib/color/color';
import { ColorMap } from './color_map.js';
/** Color picker. */
export declare class ColorPicker extends LitElement {
    static styles: import("lit").CSSResult;
    colorMap: ColorMap;
    hueSlider: HTMLInputElement;
    hexInput: HTMLInputElement;
    selectedColorHex: string;
    get selectedColorHsv(): color.Hsv;
    onColorChange(): void;
    onHueInput(): void;
    onHexInput(): void;
    updated(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'me-color-picker': ColorPicker;
    }
}
