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
import './components/pitch_limits.js';
import './components/yaw_limits.js';
import './components/zoom.js';
import '../shared/checkbox/checkbox.js';
import '@material/mwc-button';
import '../shared/expandable_content/expandable_tab.js';
import '../shared/section_row/section_row.js';
import '../shared/draggable_input/draggable_input.js';
import '../shared/checkbox/checkbox.js';
import { ModelViewerConfig, State } from '../../types.js';
import { Vector3D } from '../config/types.js';
import { ConnectedLitElement } from '../connected_lit_element/connected_lit_element.js';
import { CheckboxElement } from '../shared/checkbox/checkbox.js';
import { DraggableInput } from '../shared/draggable_input/draggable_input.js';
declare class CameraOrbitEditor extends ConnectedLitElement {
    static styles: import("lit").CSSResult[];
    yawInput: DraggableInput;
    pitchInput: DraggableInput;
    private onChange;
    render(): import("lit-html").TemplateResult<1>;
}
/** Camera target input panel. */
export declare class CameraTargetInput extends ConnectedLitElement {
    static styles: import("lit").CSSResult[];
    xInput: HTMLInputElement;
    yInput: HTMLInputElement;
    zInput: HTMLInputElement;
    change?: (newValue: Vector3D) => void;
    target?: Vector3D;
    protected onInputChange(event: Event): void;
    resetTarget(): void;
    render(): import("lit-html").TemplateResult<1>;
}
/** The Camera Settings panel. */
export declare class CameraSettings extends ConnectedLitElement {
    static styles: import("lit").CSSResult;
    config: ModelViewerConfig;
    cameraOrbitEditor: CameraOrbitEditor;
    cameraTargetInput: CameraTargetInput;
    autoRotateCheckbox: CheckboxElement;
    getUpdateComplete(): Promise<boolean>;
    stateChanged(state: State): void;
    updateInitialCamera(): Promise<void>;
    onSaveCameraOrbit(): Promise<void>;
    resetInitialCamera(): void;
    onUpdateFraming(): void;
    onCameraOrbitEditorChange(): void;
    onCameraTargetChange(newValue: Vector3D): void;
    onAutoRotateChange(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'me-camera-orbit-editor': CameraOrbitEditor;
        'me-camera-settings': CameraSettings;
        'me-camera-target-input': CameraTargetInput;
        'me-draggable-input': DraggableInput;
    }
}
export {};
