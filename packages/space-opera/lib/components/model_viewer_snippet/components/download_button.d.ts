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
import { State } from '../../../types.js';
import { ConnectedLitElement } from '../../connected_lit_element/connected_lit_element.js';
interface Payload {
    blob: Blob;
    filename: string;
}
/**
 * A generic button base class for downloading file resources.
 */
declare class GenericDownloadButton extends ConnectedLitElement {
    static get styles(): import("lit").CSSResult;
    buttonLabel: string;
    preparePayload?: () => Promise<Payload | null>;
    onDownloadClick(): Promise<void>;
    render(): import("lit-html").TemplateResult<1>;
}
export declare function prepareGlbPayload(modelName: string): Promise<Payload>;
/**
 * A button to download GLB file resources.
 */
export declare class ExportPosterButton extends GenericDownloadButton {
    constructor();
    stateChanged(state: State): void;
}
/**
 * A button to download all file resources as a ZIP.
 */
export declare class ExportZipButton extends GenericDownloadButton {
    snippetText: string;
    constructor();
    stateChanged(state: State): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'me-export-poster-button': ExportPosterButton;
        'me-export-zip-button': ExportZipButton;
    }
}
export {};
