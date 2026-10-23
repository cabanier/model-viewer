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
import '../shared/dropdown/dropdown.js';
import '../shared/section_row/section_row.js';
import '../shared/slider_with_input/slider_with_input.js';
import '../shared/checkbox/checkbox.js';
import '@polymer/paper-item';
import '@material/mwc-button';
import { ModelViewerConfig, State } from '../../types.js';
import { ConnectedLitElement } from '../connected_lit_element/connected_lit_element.js';
import { CheckboxElement } from '../shared/checkbox/checkbox.js';
import { SliderWithInputElement } from '../shared/slider_with_input/slider_with_input.js';
import { EnvironmentImage } from './types.js';
/**
 * IBL environment selector.
 */
export declare class IblSelector extends ConnectedLitElement {
    static styles: import("lit").CSSResult[];
    config: ModelViewerConfig;
    environmentImages: EnvironmentImage[];
    exposureSlider: SliderWithInputElement;
    fileInput: HTMLInputElement;
    skyboxCheckbox: CheckboxElement;
    shadowIntensitySlider: SliderWithInputElement;
    shadowSoftnessSlider: SliderWithInputElement;
    getUpdateComplete(): Promise<boolean>;
    stateChanged(state: State): void;
    onSelectEnvironmentImage(event: CustomEvent): void;
    onSelectToneMapping(event: CustomEvent): void;
    onExposureChange(): void;
    onUseEnvAsSkyboxChange(): void;
    onShadowIntensityChange(): void;
    onShadowSoftnessChange(): void;
    onUploadHDR(): Promise<void>;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'me-ibl-selector': IblSelector;
    }
}
