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
/**
 * @fileoverview Use lit-html to output a model-viewer tag with the current
 * settings applied to the GLB.
 */
import '@material/mwc-icon-button';
import { ModelViewerElement } from '@google/model-viewer/lib/model-viewer';
import { ArConfigState, BestPracticesState, ModelViewerConfig, State } from '../../types.js';
import { ConnectedLitElement } from '../connected_lit_element/connected_lit_element.js';
import { HotspotConfig } from '../hotspot_panel/types.js';
/**
 * Renders and updates the model-viewer tag, serving as a preview of the edits.
 */
export declare class ModelViewerPreview extends ConnectedLitElement {
    static styles: import("lit").CSSResult[];
    readonly modelViewer: ModelViewerElement;
    config: ModelViewerConfig;
    arConfig: ArConfigState;
    hotspots: HotspotConfig[];
    addHotspotMode: boolean;
    gltfUrl?: string;
    extraAttributes: any;
    refreshButtonIsReady: boolean;
    bestPractices?: BestPracticesState;
    loadComplete?: Promise<void>;
    private resolveLoad;
    stateChanged(state: State): void;
    firstUpdated(): void;
    forcePost(): void;
    protected render(): import("lit-html").TemplateResult<1>;
    private onModelLoaded;
    private onCameraChange;
    private addHotspot;
    private onDragover;
    private onDrop;
}
declare global {
    interface HTMLElementTagNameMap {
        'model-viewer-preview': ModelViewerPreview;
    }
}
