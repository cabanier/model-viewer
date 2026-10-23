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
import { ModelViewerElement } from '@google/model-viewer/lib/model-viewer';
import { LitElement } from 'lit';
import { ArConfigState, BestPracticesState, ModelViewerConfig, ModelViewerSnippetState } from '../../types.js';
import { HotspotConfig } from '../hotspot_panel/types.js';
import { EditorUpdates, MobilePacket, URLs } from './types.js';
/**
 * The view loaded at /editor/view/?id=xyz
 * The id links the editor to this mobile session.
 */
export declare class MobileView extends LitElement {
    static styles: import("lit").CSSResult[];
    readonly modelViewer: ModelViewerElement;
    modelViewerUrl: string;
    posterUrl: string;
    currentBlob?: Blob;
    editorUrls?: URLs;
    config: ModelViewerConfig;
    arConfig: ArConfigState;
    extraAttributes: any;
    hotspots: HotspotConfig[];
    bestPractices?: BestPracticesState;
    envImageUrl: string | undefined;
    pipeId: string;
    mobilePingUrl: string;
    toastClassName: string;
    toastBody: string;
    overlay?: HTMLElement;
    sessionId: number;
    sessionUrl: string;
    sessionOs: "iOS" | "Android" | "Windows Phone" | "unknown";
    updateState(snippet: ModelViewerSnippetState, urls: URLs): void;
    repostGLTF: () => void;
    waitForData(json: MobilePacket): void;
    initializeToast(json: EditorUpdates): void;
    fetchLoop(): Promise<void>;
    triggerFetchLoop(): Promise<void>;
    sceneViewerMode(): boolean | undefined;
    modelIsLoaded(): Promise<void>;
    render(): import("lit-html").TemplateResult<1>;
    updated(): void;
    ping(): Promise<void>;
    firstUpdated(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'mobile-view': MobileView;
    }
}
