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
import '@google/model-viewer/lib/model-viewer';
import { TemplateResult } from 'lit';
import { ArConfigState, ModelViewerConfig } from '../../types';
/** Optional handlers for model-viewer events */
export interface ModelViewerEventHandlers {
    readonly load?: () => void;
    readonly cameraChange?: () => void;
    readonly modelVisibility?: () => void;
    readonly play?: () => void;
    readonly pause?: () => void;
    readonly click?: (event: MouseEvent) => void;
    readonly error?: (details: CustomEvent) => void;
}
export declare function createPoster(): Promise<Blob>;
/**
 * Renders a model-viewer tag given the config.
 */
export declare function renderModelViewer(config: ModelViewerConfig, arConfig: ArConfigState, extraAttributes: any, eventHandlers?: ModelViewerEventHandlers, childElements?: Array<TemplateResult | HTMLElement>): TemplateResult<1>;
