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
import { html, LitElement } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { toastStyles } from '../../styles.css.js';
import { timePasses } from '../../test/utils/test_utils.js';
import { arButtonCSS, arPromptCSS, progressBarCSS } from '../best_practices/styles.css.js';
import { renderCommonChildElements } from '../model_viewer_preview/reducer.js';
import { styles as hotspotStyles } from '../utils/hotspot/hotspot.css.js';
import { spread } from '../utils/spread_directive';
import { styles as mobileStyles } from './styles.css.js';
import { envToSession, getMobileOperatingSystem, getPingUrl, getRandomInt, getSessionUrl, getWithTimeout, gltfToSession, post, posterToSession } from './utils.js';
const TOAST_TIME = 3000; // 3s
/**
 * The view loaded at /editor/view/?id=xyz
 * The id links the editor to this mobile session.
 */
let MobileView = class MobileView extends LitElement {
    constructor() {
        super(...arguments);
        this.modelViewerUrl = '';
        this.posterUrl = '';
        this.config = {};
        this.arConfig = {};
        this.extraAttributes = {};
        this.hotspots = [];
        this.pipeId = window.location.search.replace('?id=', '');
        this.mobilePingUrl = getPingUrl(this.pipeId);
        this.toastClassName = '';
        this.toastBody = '';
        this.sessionId = getRandomInt(1e+20);
        this.sessionUrl = getSessionUrl(this.pipeId, this.sessionId);
        this.sessionOs = getMobileOperatingSystem();
        this.repostGLTF = () => {
            try {
                if (this.sessionOs === 'Android') {
                    post(this.currentBlob, this.modelViewerUrl);
                }
            }
            catch (error) {
                console.log('Post failed on ar button press...');
            }
        };
    }
    updateState(snippet, urls) {
        this.editorUrls = urls;
        this.hotspots = snippet.hotspots;
        // Set all of the other relevant snippet information
        this.arConfig = snippet.arConfig;
        this.config = snippet.config;
        this.extraAttributes = snippet.extraAttributes;
        this.bestPractices = snippet.bestPractices;
    }
    // We set modelViewerUrl instead of directly fetching it because
    // scene-viewer requires the same url from the current model-viewer state,
    // and we need to make a POST request to that URL when scene-viewer is
    // triggered.
    waitForData(json) {
        const updatedContent = json.updatedContent;
        this.overlay.style.display = 'block';
        this.updateState(json.snippet, json.urls);
        this.posterUrl =
            posterToSession(this.pipeId, this.sessionId, updatedContent.posterId);
        if (updatedContent.gltfChanged) {
            this.modelViewerUrl =
                gltfToSession(this.pipeId, this.sessionId, updatedContent.gltfId);
        }
        const { environmentImage } = this.config;
        this.envImageUrl = environmentImage == null ||
            environmentImage === 'neutral' || environmentImage === 'legacy' ?
            environmentImage :
            envToSession(this.pipeId, this.sessionId, updatedContent.envIsHdr);
        const arButton = this.modelViewer.shadowRoot.getElementById('default-ar-button');
        arButton.removeEventListener('click', this.repostGLTF);
        if (this.sceneViewerMode()) {
            // Send a new POST out for each scene-viewer button press
            arButton.addEventListener('click', this.repostGLTF);
        }
        this.overlay.style.display = 'none';
    }
    initializeToast(json) {
        let body = json.gltfChanged ? 'gltf model, ' : '';
        body = json.envChanged ? body.concat('environment image, ') : body;
        body = json.stateChanged ? body.concat('snippet, ') : body;
        body = body.slice(0, body.length - 2).concat('.');
        this.toastBody = `Loading ${body}`;
        this.toastClassName = 'show';
    }
    // Keep listening for a new update from the editor.
    async fetchLoop() {
        const response = await getWithTimeout(this.sessionUrl);
        if (response.ok) {
            this.modelViewer.showPoster();
            const json = await response.json();
            this.initializeToast(json.updatedContent);
            setTimeout(() => {
                this.toastClassName = '';
            }, TOAST_TIME);
            this.waitForData(json);
            await this.updateComplete;
        }
        else {
            console.error('Error:', response);
            await timePasses(1000);
        }
    }
    async triggerFetchLoop() {
        try {
            await this.fetchLoop();
        }
        catch (error) {
            console.log('error...', error);
            await timePasses(1000);
        }
        await this.triggerFetchLoop();
    }
    sceneViewerMode() {
        var _a;
        return this.arConfig.ar &&
            ((_a = this.arConfig.arModes) === null || _a === void 0 ? void 0 : _a.split(' ')[0]) === 'scene-viewer';
    }
    // When the model is loaded, we make a post for this specific model for
    // scene-viewer. Subsequently, everytime scene-viewer is opened, we send the
    // POST again.
    async modelIsLoaded() {
        if (!this.sceneViewerMode()) {
            return;
        }
        this.currentBlob = await this.modelViewer.exportScene();
        try {
            await post(this.currentBlob, this.modelViewerUrl);
        }
        catch (error) {
            console.log('Post failed on model loaded...');
        }
    }
    render() {
        var _a;
        const config = this.config;
        const skyboxImage = (config.useEnvAsSkybox && ((_a = this.editorUrls) === null || _a === void 0 ? void 0 : _a.env)) ?
            this.envImageUrl :
            undefined;
        // Renders elements common between mobile and editor.
        const childElements = renderCommonChildElements(this.hotspots, this.bestPractices, false);
        return html `
    <div id="overlay"></div>
    <div class="app">
      <div class="mvContainer">
        <model-viewer ${spread(this.extraAttributes)}
          src=${this.modelViewerUrl}
          ?ar=${ifDefined(!!this.arConfig.ar)}
          ar-modes=${ifDefined(this.arConfig.arModes)}
          ?autoplay=${!!config.autoplay}
          ?auto-rotate=${!!config.autoRotate}
          ?camera-controls=${!!config.cameraControls}
          environment-image=${ifDefined(this.envImageUrl)}
          skybox-image=${ifDefined(skyboxImage)}
          exposure=${ifDefined(config.exposure)}
          tone-mapping=${ifDefined(config.toneMapping)}
          poster=${this.posterUrl}
          reveal=${ifDefined(config.reveal)}
          shadow-intensity=${ifDefined(config.shadowIntensity)}
          shadow-softness=${ifDefined(config.shadowSoftness)}
          camera-target=${ifDefined(config.cameraTarget)}
          camera-orbit=${ifDefined(config.cameraOrbit)}
          field-of-view=${ifDefined(config.fieldOfView)}
          min-camera-orbit=${ifDefined(config.minCameraOrbit)}
          max-camera-orbit=${ifDefined(config.maxCameraOrbit)}
          min-field-of-view=${ifDefined(config.minFov)}
          max-field-of-view=${ifDefined(config.maxFov)}
          @load=${this.modelIsLoaded}
        >
          ${childElements}
        </model-viewer>
      </div>
    </div>
    <div class="${this.toastClassName}" id="snackbar-mobile">
      ${this.toastBody}
    </div>
    `;
    }
    updated() {
        this.modelViewer.cameraOrbit = 'auto auto auto';
        const { cameraOrbit } = this.config;
        if (cameraOrbit) {
            this.modelViewer.cameraOrbit = cameraOrbit.toString();
        }
        this.modelViewer.jumpCameraToGoal();
        this.modelViewer.dismissPoster();
    }
    // Ping the editor
    async ping() {
        const ping = {
            os: getMobileOperatingSystem(),
            id: this.sessionId,
            isStale: true,
        };
        await post(JSON.stringify(ping), this.mobilePingUrl);
    }
    // (Overriding default) Tell editor session that it is ready for data.
    firstUpdated() {
        this.ping();
        this.triggerFetchLoop();
    }
};
MobileView.styles = [
    mobileStyles,
    toastStyles,
    hotspotStyles,
    arButtonCSS,
    progressBarCSS,
    arPromptCSS
];
__decorate([
    query('model-viewer')
], MobileView.prototype, "modelViewer", void 0);
__decorate([
    state()
], MobileView.prototype, "modelViewerUrl", void 0);
__decorate([
    state()
], MobileView.prototype, "posterUrl", void 0);
__decorate([
    state()
], MobileView.prototype, "currentBlob", void 0);
__decorate([
    state()
], MobileView.prototype, "editorUrls", void 0);
__decorate([
    state()
], MobileView.prototype, "config", void 0);
__decorate([
    state()
], MobileView.prototype, "arConfig", void 0);
__decorate([
    state()
], MobileView.prototype, "extraAttributes", void 0);
__decorate([
    state()
], MobileView.prototype, "hotspots", void 0);
__decorate([
    state()
], MobileView.prototype, "bestPractices", void 0);
__decorate([
    state()
], MobileView.prototype, "envImageUrl", void 0);
__decorate([
    state()
], MobileView.prototype, "pipeId", void 0);
__decorate([
    state()
], MobileView.prototype, "mobilePingUrl", void 0);
__decorate([
    state()
], MobileView.prototype, "toastClassName", void 0);
__decorate([
    state()
], MobileView.prototype, "toastBody", void 0);
__decorate([
    query('div#overlay')
], MobileView.prototype, "overlay", void 0);
__decorate([
    state()
], MobileView.prototype, "sessionId", void 0);
__decorate([
    state()
], MobileView.prototype, "sessionUrl", void 0);
__decorate([
    state()
], MobileView.prototype, "sessionOs", void 0);
MobileView = __decorate([
    customElement('mobile-view')
], MobileView);
export { MobileView };
//# sourceMappingURL=mobile_view.js.map