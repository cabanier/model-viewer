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
import { ArConfigState, ModelViewerSnippetState, State } from '../../types.js';
import { ConnectedLitElement } from '../connected_lit_element/connected_lit_element.js';
import { MobileModal } from './components/mobile_modal.js';
import { EditorUpdates, MobileSession, URLs } from './types.js';
/**
 * Section for displaying QR Code and other info related for mobile devices.
 * This is the section on the editor under the File Manager.
 */
export declare class OpenMobileView extends ConnectedLitElement {
    static styles: import("lit").CSSResult;
    pipeId: number;
    isDeployed: boolean;
    isDeployable: boolean;
    isSendingData: boolean;
    contentHasChanged: boolean;
    urls: URLs;
    lastUrlsSent: URLs;
    snippet: ModelViewerSnippetState;
    lastSnippetSent: ModelViewerSnippetState;
    modelIsDirty: boolean;
    mobileModal: MobileModal;
    haveReceivedResponse: boolean;
    arConfig?: ArConfigState;
    defaultToSceneViewer: boolean;
    sessionList: MobileSession[];
    mobilePingUrl: string;
    get canRefresh(): boolean;
    stateChanged(state: State): void;
    getContentHasChanged(): boolean;
    envIsHdr(): boolean;
    stateHasChanged(): boolean;
    isNewSource(src: string | undefined, lastSrc: string | undefined): boolean;
    isNewModel(): boolean;
    getUpdatedContent(): EditorUpdates;
    getStaleContent(): EditorUpdates;
    sendSessionContent(session: MobileSession, updatedContent: EditorUpdates, posterBlob: Blob, gltfBlob: Blob | undefined, envBlob: Blob | undefined): Promise<void>;
    sendSessionContentHolder(session: MobileSession, updatedContent: EditorUpdates, posterBlob: Blob, gltfBlob: Blob | undefined, envBlob: Blob | undefined): Promise<void>;
    postInfo(): Promise<void>;
    waitForPing(): Promise<boolean>;
    pingLoop(): Promise<void>;
    openModal(): void;
    onInitialDeploy(): void;
    onEnableARChange(isEnabled: boolean): void;
    onSelectArMode(isSceneViewer: boolean): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'open-mobile-view': OpenMobileView;
    }
}
