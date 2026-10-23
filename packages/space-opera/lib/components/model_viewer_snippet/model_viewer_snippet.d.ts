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
import './components/open_button.js';
import './components/download_button.js';
import '../mobile_view/open_mobile_view.js';
import '../shared/snippet_viewer/snippet_viewer.js';
import '../shared/expandable_content/expandable_tab.js';
import { ArConfigState, BestPracticesState, ModelViewerConfig, RelativeFilePathsState, State } from '../../types.js';
import { ConnectedLitElement } from '../connected_lit_element/connected_lit_element.js';
import { HotspotConfig } from '../hotspot_panel/types.js';
import { DraggableInput } from '../shared/draggable_input/draggable_input.js';
import { SnippetViewer } from '../shared/snippet_viewer/snippet_viewer.js';
import { ExportZipButton } from './components/download_button.js';
import { ImportCard } from './components/open_button.js';
/**
 *
 */
export declare class ExportPanel extends ConnectedLitElement {
    header: boolean;
    config: ModelViewerConfig;
    arConfig: ArConfigState;
    hotspots: HotspotConfig[];
    relativeFilePaths?: RelativeFilePathsState;
    gltfUrl?: string;
    extraAttributes: any;
    bestPractices?: BestPracticesState;
    snippetViewer: SnippetViewer;
    exportZipButton: ExportZipButton;
    importCard: ImportCard;
    heightInput: DraggableInput;
    stateChanged(state: State): void;
    snippetCopyToClipboard(): void;
    onSnippetOpen(): void;
    onHeightChange(): void;
    onPosterSelect(event: CustomEvent): void;
    render(): import("lit-html").TemplateResult<1>;
    protected updated(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'me-export-panel': ExportPanel;
    }
}
