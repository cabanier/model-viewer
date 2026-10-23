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
import '@polymer/paper-slider';
import '@material/mwc-textfield';
import { PaperSliderElement } from '@polymer/paper-slider';
import { LitElement } from 'lit';
/**
 * LitElement for a slider and input box pair that should always stay in sync
 * with each other.
 */
export declare class SliderWithInputElement extends LitElement {
    min: number;
    max: number;
    step: number;
    value: number;
    inputLabel: string;
    disabled: boolean;
    slider: PaperSliderElement;
    input: HTMLInputElement;
    static styles: import("lit").CSSResult;
    updated(): void;
    onSliderChange(event: CustomEvent): void;
    onInputChange(event: InputEvent): void;
    render(): import("lit-html").TemplateResult<1>;
    clickTo(value: number): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'me-slider-with-input': SliderWithInputElement;
    }
}
