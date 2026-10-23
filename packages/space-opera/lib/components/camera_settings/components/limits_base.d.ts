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
import '../../shared/expandable_content/expandable_tab.js';
import '../../shared/section_row/section_row.js';
import '../../shared/slider_with_input/slider_with_input.js';
import '../../shared/checkbox/checkbox.js';
import { Limits } from '../../config/types.js';
import { ConnectedLitElement } from '../../connected_lit_element/connected_lit_element.js';
import { SliderWithInputElement } from '../../shared/slider_with_input/slider_with_input.js';
/** Abstract component that can be extended for editing scalar limits. */
export declare abstract class LimitsBase extends ConnectedLitElement {
    static styles: import("lit").CSSResult[];
    limitsProperty?: Limits;
    abstract get label(): string;
    abstract get minimumLabel(): string;
    abstract get maximumLabel(): string;
    abstract get absoluteMinimum(): number;
    abstract get absoluteMaximum(): number;
    abstract get currentPreviewValue(): number;
    abstract dispatchLimits(limits?: Limits): void;
    get decimalPlaces(): number;
    get sliderStep(): number;
    minimumInput: SliderWithInputElement;
    maximumInput: SliderWithInputElement;
    enabledInput: HTMLInputElement;
    get inputLimits(): {
        enabled: boolean;
        min: number;
        max: number;
    };
    onToggle(event: Event): void;
    onSetMin(): void;
    onSetMax(): void;
    onMinimumInputChange(): void;
    onMaximumInputChange(): void;
    render(): import("lit-html").TemplateResult<1>;
    renderLimits(): import("lit-html").TemplateResult<1>;
}
