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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @fileoverview Use lit-html to output a model-viewer tag with the current
 * settings applied to the GLB.
 */
import '@material/mwc-icon-button';
import { html } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { reduxStore } from '../../space_opera_base.js';
import { modelViewerPreviewStyles } from '../../styles.css.js';
import { extractStagingConfig } from '../../types.js';
import { getBestPractices } from '../best_practices/reducer.js';
import { arButtonCSS, progressBarCSS } from '../best_practices/styles.css.js';
import { dispatchCameraIsDirty } from '../camera_settings/reducer.js';
import { dispatchAutoplayEnabled, dispatchCameraControlsEnabled, dispatchConfig, dispatchEnvironmentImage, getConfig } from '../config/reducer.js';
import { ConnectedLitElement } from '../connected_lit_element/connected_lit_element.js';
import { dispatchAddHotspot, dispatchSetHotspots, dispatchUpdateHotspotMode, generateUniqueHotspotName, getHotspotMode, getHotspots } from '../hotspot_panel/reducer.js';
import { createBlobUrlFromEnvironmentImage, dispatchAddEnvironmentImage } from '../ibl_selector/reducer.js';
import { dispatchSetForcePost, getArConfig, getRefreshable } from '../mobile_view/reducer.js';
import { getExtraAttributes } from '../model_viewer_snippet/reducer.js';
import { dispatchSetEnvironmentName, dispatchSetModelName } from '../relative_file_paths/reducer.js';
import { createSafeObjectUrlFromArrayBuffer } from '../utils/create_object_url.js';
import { styles as hotspotStyles } from '../utils/hotspot/hotspot.css.js';
import { renderModelViewer } from '../utils/render_model_viewer.js';
import { dispatchGltfUrl, dispatchModel, getGltfUrl, getModelViewer, renderCommonChildElements } from './reducer.js';
/**
 * Renders and updates the model-viewer tag, serving as a preview of the edits.
 */
let ModelViewerPreview = class ModelViewerPreview extends ConnectedLitElement {
    constructor() {
        super(...arguments);
        this.config = {};
        this.arConfig = {};
        this.hotspots = [];
        this.addHotspotMode = false;
        this.extraAttributes = {};
        this.refreshButtonIsReady = false;
        this.resolveLoad = () => { };
    }
    stateChanged(state) {
        this.addHotspotMode = getHotspotMode(state) || false;
        this.config = getConfig(state);
        this.arConfig = getArConfig(state);
        this.hotspots = getHotspots(state);
        this.extraAttributes = getExtraAttributes(state);
        this.refreshButtonIsReady = getRefreshable(state);
        this.bestPractices = getBestPractices(state);
        const gltfUrl = getGltfUrl(state);
        if (gltfUrl !== this.gltfUrl) {
            this.loadComplete = new Promise((resolve) => {
                this.resolveLoad = resolve;
            });
            this.gltfUrl = gltfUrl;
        }
    }
    firstUpdated() {
        this.addEventListener('drop', this.onDrop);
        this.addEventListener('dragover', this.onDragover);
        self.ModelViewerElement = self.ModelViewerElement || {};
        self.ModelViewerElement.meshoptDecoderLocation =
            'https://cdn.jsdelivr.net/npm/meshoptimizer/meshopt_decoder.js';
    }
    forcePost() {
        reduxStore.dispatch(dispatchSetForcePost(true));
    }
    render() {
        const editedConfig = Object.assign(Object.assign({}, this.config), { src: this.gltfUrl, 
            // Always enable camera controls for preview
            cameraControls: true, interactionPrompt: 'none' });
        const hasModel = !!editedConfig.src;
        const refreshMobileButton = this.refreshButtonIsReady === true ? html `<mwc-button icon="cached" @click=${this.forcePost}
      style="--mdc-theme-primary: #DC143C; border: #DC143C" class="RefreshMobileButton">
      Refresh Mobile
    </mwc-button>` : html ``;
        // Renders elements common between mobile and editor.
        const childElements = renderCommonChildElements(this.hotspots, this.bestPractices, true);
        // Add additional elements, editor specific.
        childElements.push(refreshMobileButton);
        if (!hasModel) {
            childElements.push(html `<div class="HelpText">Drag a glTF or GLB here!<br/>
          <small>Groups, folders, and Zip archives supported</small><br/>
          <small>Drop an HDR for lighting</small></div>`);
        }
        return html `${renderModelViewer(editedConfig, this.arConfig, this.extraAttributes, {
            load: () => {
                this.onModelLoaded();
            },
            cameraChange: () => {
                this.onCameraChange();
            },
            click: (event) => {
                if (this.addHotspotMode) {
                    this.addHotspot(event);
                }
            }
        }, childElements)}`;
    }
    // Handle the case when the model is loaded for the first time.
    async onModelLoaded() {
        reduxStore.dispatch(await dispatchModel());
        if (this.modelViewer.availableAnimations.length > 0) {
            reduxStore.dispatch(dispatchAutoplayEnabled(true));
        }
        const config = getConfig(reduxStore.getState());
        reduxStore.dispatch(dispatchConfig(Object.assign({}, config)));
        this.resolveLoad();
    }
    onCameraChange() {
        reduxStore.dispatch(dispatchCameraIsDirty());
    }
    addHotspot(event) {
        if (getModelViewer().availableAnimations.length > 0) {
            const surface = this.modelViewer.surfaceFromPoint(event.clientX, event.clientY);
            if (!surface) {
                console.log('Click was not on model, no hotspot added.');
                return;
            }
            reduxStore.dispatch(dispatchAddHotspot({
                name: generateUniqueHotspotName(),
                surface,
            }));
        }
        else {
            const point = this.modelViewer.positionAndNormalFromPoint(event.clientX, event.clientY);
            if (!point) {
                console.log('Click was not on model, no hotspot added.');
                return;
            }
            reduxStore.dispatch(dispatchAddHotspot({
                name: generateUniqueHotspotName(),
                position: point.position.toString(),
                normal: point.normal.toString()
            }));
        }
        reduxStore.dispatch(dispatchUpdateHotspotMode(false));
    }
    onDragover(event) {
        if (!event.dataTransfer)
            return;
        event.stopPropagation();
        event.preventDefault();
    }
    async onDrop(event) {
        event.stopPropagation();
        event.preventDefault();
        if (event.dataTransfer && event.dataTransfer.items[0].kind === 'file') {
            const file = event.dataTransfer.items[0].getAsFile();
            if (!file)
                return;
            if (file.name.match(/\.(glb|gltf)$/i)) {
                const arrayBuffer = await file.arrayBuffer();
                reduxStore.dispatch(dispatchSetModelName(file.name));
                const url = createSafeObjectUrlFromArrayBuffer(arrayBuffer).unsafeUrl;
                reduxStore.dispatch(dispatchGltfUrl(url));
                dispatchConfig(extractStagingConfig(this.config));
                reduxStore.dispatch(dispatchCameraControlsEnabled(true));
                reduxStore.dispatch(dispatchSetHotspots([]));
            }
            if (file.name.match(/\.(hdr|png|jpg|jpeg)$/i)) {
                const unsafeUrl = await createBlobUrlFromEnvironmentImage(file);
                reduxStore.dispatch(dispatchAddEnvironmentImage({ uri: unsafeUrl, name: file.name }));
                reduxStore.dispatch(dispatchEnvironmentImage(unsafeUrl));
                reduxStore.dispatch(dispatchSetEnvironmentName(file.name));
            }
        }
    }
};
ModelViewerPreview.styles = [modelViewerPreviewStyles, hotspotStyles, arButtonCSS, progressBarCSS];
__decorate([
    query('model-viewer')
], ModelViewerPreview.prototype, "modelViewer", void 0);
__decorate([
    state()
], ModelViewerPreview.prototype, "config", void 0);
__decorate([
    state()
], ModelViewerPreview.prototype, "arConfig", void 0);
__decorate([
    state()
], ModelViewerPreview.prototype, "hotspots", void 0);
__decorate([
    state()
], ModelViewerPreview.prototype, "addHotspotMode", void 0);
__decorate([
    state()
], ModelViewerPreview.prototype, "gltfUrl", void 0);
__decorate([
    state()
], ModelViewerPreview.prototype, "extraAttributes", void 0);
__decorate([
    state()
], ModelViewerPreview.prototype, "refreshButtonIsReady", void 0);
__decorate([
    state()
], ModelViewerPreview.prototype, "bestPractices", void 0);
ModelViewerPreview = __decorate([
    customElement('model-viewer-preview')
], ModelViewerPreview);
export { ModelViewerPreview };
//# sourceMappingURL=model_viewer_preview.js.map