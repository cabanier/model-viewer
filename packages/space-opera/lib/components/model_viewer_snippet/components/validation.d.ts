/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
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
import { State } from '../../../types.js';
import { ConnectedLitElement } from '../../connected_lit_element/connected_lit_element';
import type { Report, Message } from './validation_utils';
import { GLTF } from '@google/model-viewer/lib/three-components/gltf-instance/gltf-defaulted';
export declare class ValidationModal extends LitElement {
    static styles: import("lit").CSSResult[];
    report: Report;
    isOpen: boolean;
    open(): void;
    close(): void;
    renderTable(color: string, title: string, messages: Message): import("lit-html").TemplateResult<1>;
    renderMetaData(): import("lit-html").TemplateResult<1>;
    render(): import("lit-html").TemplateResult<1>;
}
/**
 * Model validator
 */
export declare class Validation extends ConnectedLitElement {
    validationModal: ValidationModal;
    gltfUrl?: string;
    rootPath: string;
    fileMap: Map<string, File>;
    originalGltf?: GLTF;
    report: Report;
    converted: boolean;
    severityTitle: string;
    severityColor: string;
    stateChanged(state: State): Promise<void>;
    awaitLoad(url: string): Promise<void>;
    countJoints(gltf: GLTF): void;
    onOpen(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'me-validation-modal': ValidationModal;
        'me-validation': Validation;
    }
}
