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
import '../shared/checkbox/checkbox.js';
import '@polymer/paper-item';
import { State } from '../../types.js';
import { ConnectedLitElement } from '../connected_lit_element/connected_lit_element.js';
import { CheckboxElement } from '../shared/checkbox/checkbox.js';
import { SectionRow } from '../shared/section_row/section_row.js';
import { SliderWithInputElement } from '../shared/slider_with_input/slider_with_input.js';
/**
 * Animation controls for gltf and model-viewer.
 */
export declare class AnimationControls extends ConnectedLitElement {
    autoplayCheckbox: CheckboxElement;
    scrubber: SliderWithInputElement;
    timeElement: SectionRow;
    animationNames: string[];
    selectedAnimation: string | undefined;
    autoplay: boolean;
    clipLength: number;
    stateChanged(state: State): void;
    render(): import("lit-html").TemplateResult<1>;
    onAutoplayChange(): void;
    onAnimationNameChange(event: CustomEvent): void;
    onScrub(): void;
    updateScrubber(): Promise<void>;
}
declare global {
    interface AnimationControls {
        'me-animation-controls': AnimationControls;
    }
}
