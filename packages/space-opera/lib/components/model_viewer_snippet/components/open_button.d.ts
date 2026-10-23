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
import { LitElement } from 'lit';
import { ArConfigState, ModelViewerConfig, RelativeFilePathsState, State } from '../../../types.js';
import { ConnectedLitElement } from '../../connected_lit_element/connected_lit_element.js';
export declare class OpenModal extends ConnectedLitElement {
    static styles: import("lit").CSSResult;
    isOpen: boolean;
    config: ModelViewerConfig;
    arConfig: ArConfigState;
    errors: string[];
    gltfUrl?: string;
    relativeFilePaths?: RelativeFilePathsState;
    private readonly snippetViewer;
    extraAttributes: any;
    stateChanged(state: State): void;
    handleSubmitSnippet(value?: string): Promise<void>;
    updated(): void;
    open(): void;
    close(): void;
    saveAndClose(event: Event): void;
    render(): import("lit-html").TemplateResult<1>;
}
/**
 * A button to open file resources.
 */
export declare class ImportCard extends LitElement {
    openModal: OpenModal;
    fileInput: HTMLInputElement;
    selectedDefaultOption: number;
    static styles: import("lit").CSSResult;
    firstUpdated(): void;
    onUpload(fileMap: Map<string, File>): Promise<void>;
    onSnippetOpen(): void;
    onDefaultSelect(event: CustomEvent): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'me-import-card': ImportCard;
        'me-open-modal': OpenModal;
    }
}
