/* @license
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
 */
import { Box3, Euler, Matrix4, Object3D, Vector3 } from 'three';
import { normalizeUnit } from '../styles/conversions.js';
import { parseExpressions } from '../styles/parsers.js';
import { deserializeUrl } from '../utilities.js';
const CSS_PIXELS_TO_METERS = 0.0254 / 96;
class ModelLoadCancelledError extends Error {
    constructor() {
        super('Model load cancelled');
        this.name = 'AbortError';
    }
}
/**
 * Renders a model using the browser while retaining model-viewer's controls.
 */
export class NativeModelRenderer {
    static isSupported() {
        // Inspect the element's API without touching its readiness promise. Some
        // implementations do not expose HTMLModelElement as a global constructor.
        return 'ready' in document.createElement('model');
    }
    static isLoadCancelled(error) {
        return error instanceof ModelLoadCancelledError;
    }
    constructor(scene) {
        this.scene = scene;
        this.model = null;
        this.usesNativeControls = false;
        this.bounds = new Box3();
        this.pose = new Object3D();
        this.transform = new Matrix4();
        this.cameraMatrix = new Matrix4();
        this.cameraRotation = new Matrix4();
        this.transformedBounds = new Box3();
        this.cancelLoad = null;
        this.cancelled = null;
        this.environmentURL = null;
        this.environmentPromise = null;
        this.input =
            scene.element.shadowRoot.querySelector('.userInput');
        this.canvasSlot = scene.element.shadowRoot.querySelector('slot[name="canvas"]');
    }
    get isActive() {
        return this.scene.externalRenderer === this;
    }
    canRender(extraUrls) {
        const element = this.scene.element;
        // These features require geometry or rendering APIs not exposed by <model>.
        if (element.disableNative || extraUrls.length > 0 ||
            this.scene.effectRenderer != null || element.skyboxImage != null ||
            element.animationName != null || element.variantName != null ||
            element.querySelector('[slot^="hotspot"]') != null) {
            return false;
        }
        const scale = parseExpressions(element.scale)[0].terms;
        return scale.length === 3 && scale[0].number !== 0 &&
            scale.every(term => Number.isFinite(term.number) &&
                term.number === scale[0].number);
    }
    async load(progressCallback) {
        this.dispose();
        this.scene.boundingBox.makeEmpty();
        this.scene.size.set(0, 0, 0);
        const { element } = this.scene;
        const model = document.createElement('model');
        if (!('ready' in model)) {
            throw new Error('The browser does not implement <model>.');
        }
        this.model = model;
        // Detach both the fallback canvas and any shared WebGL canvas left by a
        // previous render. A canvas layer can interfere with native 3D compositing.
        this.canvasSlot.querySelectorAll('canvas').forEach(canvas => canvas.remove());
        this.scene.canvas.classList.remove('show');
        this.input.classList.add('native-rendering');
        model.classList.add('native-model');
        model.setAttribute('part', 'model');
        model.style.visibility = 'hidden';
        this.syncAttributes();
        model.setAttribute('src', this.scene.url);
        this.canvasSlot.appendChild(model);
        const cancelled = new Promise((_resolve, reject) => {
            this.cancelLoad = () => reject(new ModelLoadCancelledError());
        });
        this.cancelled = cancelled;
        try {
            await Promise.race([model.ready, cancelled]);
            if (this.model !== model) {
                throw new ModelLoadCancelledError();
            }
            this.usesNativeControls = !this.readBounds(model);
            if (!this.usesNativeControls && 'entityTransform' in model &&
                typeof DOMMatrixReadOnly !== 'undefined') {
                try {
                    // Probe only after ready: the draft rejects writes without a
                    // renderer.
                    model.entityTransform = new DOMMatrixReadOnly(new Matrix4().elements);
                }
                catch (_error) {
                    this.usesNativeControls = true;
                }
            }
            else {
                this.usesNativeControls = true;
            }
            this.updateBounds();
            this.syncControls();
            element.requestUpdate();
            await this.updateEnvironment();
            if (this.model !== model) {
                throw new ModelLoadCancelledError();
            }
            model.style.visibility = '';
            progressCallback(1);
            return {
                framedRadius: this.scene.boundingSphere.radius,
                fieldOfViewAspect: 1
            };
        }
        catch (error) {
            if (this.model !== model) {
                throw new ModelLoadCancelledError();
            }
            throw error;
        }
    }
    readBounds(model) {
        const center = model.boundingBoxCenter;
        const extents = model.boundingBoxExtents;
        if (center == null || extents == null ||
            ![center.x, center.y, center.z, extents.x, extents.y, extents.z].every(Number.isFinite) ||
            [extents.x, extents.y, extents.z].some(value => value < 0)) {
            return false;
        }
        this.bounds.setFromCenterAndSize(new Vector3(center.x, center.y, center.z), new Vector3(extents.x, extents.y, extents.z));
        return true;
    }
    updateBounds() {
        const { element } = this.scene;
        const orientation = parseExpressions(element.orientation)[0].terms;
        const [roll, pitch, yaw] = orientation.map(term => normalizeUnit(term).number);
        this.pose.quaternion.setFromEuler(new Euler(pitch, yaw, roll, 'YXZ'));
        const scale = parseExpressions(element.scale)[0].terms;
        this.pose.scale.set(scale[0].number, scale[1].number, scale[2].number);
        this.pose.updateMatrix();
        if (!this.bounds.isEmpty()) {
            this.scene.boundingBox.copy(this.bounds).applyMatrix4(this.pose.matrix);
            this.scene.boundingBox.getSize(this.scene.size);
            this.scene.boundingBox.getCenter(this.scene.boundingSphere.center);
        }
        // The native API exposes a box, not vertices. Its circumscribed sphere
        // provides conservative bounds for the existing camera fitting logic.
        this.scene.boundingSphere.radius = this.scene.size.length() / 2 || 1;
        this.scene.queueRender();
    }
    syncAttributes() {
        const model = this.model;
        if (model == null) {
            return;
        }
        const { element } = this.scene;
        const crossorigin = element.withCredentials ? 'use-credentials' : 'anonymous';
        if (model.getAttribute('crossorigin') !== crossorigin) {
            model.setAttribute('crossorigin', crossorigin);
        }
        const label = element.alt || '3D model';
        if (model.getAttribute('aria-label') !== label) {
            model.setAttribute('aria-label', label);
        }
        model.toggleAttribute('autoplay', element.autoplay);
        model.toggleAttribute('loop', true);
    }
    syncControls() {
        const model = this.model;
        if (model == null) {
            return;
        }
        const { element } = this.scene;
        const nativeInteraction = this.usesNativeControls && element.cameraControls;
        const mode = nativeInteraction ? 'orbit' : 'none';
        if (model.getAttribute('stagemode') !== mode) {
            model.setAttribute('stagemode', mode);
        }
        model.style.pointerEvents = nativeInteraction ? 'auto' : 'none';
        model.tabIndex = nativeInteraction ? 0 : -1;
        this.input.tabIndex = nativeInteraction ? -1 : 0;
    }
    async updateEnvironment() {
        const model = this.model;
        if (model == null || !('environmentMap' in model)) {
            return;
        }
        const url = this.getEnvironmentURL();
        if (url === this.environmentURL) {
            await this.environmentPromise;
            return;
        }
        this.environmentURL = url;
        this.environmentPromise = this.loadEnvironment(model, url);
        await this.environmentPromise;
        if (this.model === model && this.getEnvironmentURL() !== url) {
            await this.updateEnvironment();
        }
    }
    async loadEnvironment(model, url) {
        try {
            if (url !== '') {
                model.environmentMap = url;
                await Promise.race([model.environmentMapReady, this.cancelled]);
            }
            else if (this.environmentPromise != null) {
                // Reset a previously selected image, without requesting Safari's idle
                // environmentMapReady promise when there is no resource to load.
                model.environmentMap = '';
            }
        }
        catch (error) {
            if (NativeModelRenderer.isLoadCancelled(error) || this.model !== model) {
                throw new ModelLoadCancelledError();
            }
            if (this.environmentURL !== url || this.getEnvironmentURL() !== url) {
                return;
            }
            // A lighting format failure does not invalidate the loaded model.
            console.warn('<model-viewer>: Native environment loading failed; using browser lighting.', error);
            try {
                model.environmentMap = '';
            }
            catch (_error) {
                // The model can still render if this implementation cannot reset its
                // environment. Keep its current lighting in that case.
            }
        }
        if (this.model === model && this.environmentURL === url &&
            this.getEnvironmentURL() === url) {
            this.scene.element.dispatchEvent(new CustomEvent('environment-change'));
        }
    }
    getEnvironmentURL() {
        var _a;
        const environment = this.scene.element.environmentImage;
        return environment == null || environment === 'neutral' ||
            environment === 'legacy' ?
            '' :
            (_a = deserializeUrl(environment)) !== null && _a !== void 0 ? _a : '';
    }
    render(camera) {
        const model = this.model;
        if (model == null || this.usesNativeControls) {
            return;
        }
        // Convert the camera's vertical span at its target into element-space
        // meters. This preserves orbit, pan, and zoom without using device pixels.
        // A native renderer owns its projection, so perspective may differ from
        // Three.js, especially in a spatial presentation.
        const distance = this.scene.camera.position.length();
        const scale = this.scene.height * CSS_PIXELS_TO_METERS *
            camera.projectionMatrix[5] / (2 * distance);
        if (!Number.isFinite(scale) || scale <= 0) {
            return;
        }
        this.cameraRotation
            .extractRotation(this.cameraMatrix.fromArray(camera.viewMatrix))
            .invert();
        this.scene.scenePivot.updateMatrix();
        this.scene.target.updateMatrix();
        this.transform.makeScale(scale, scale, scale)
            .multiply(this.cameraRotation)
            .multiply(this.scene.scenePivot.matrix)
            .multiply(this.scene.target.matrix)
            .multiply(this.pose.matrix);
        // Keep all geometry behind the element's viewport plane.
        this.transformedBounds.copy(this.bounds).applyMatrix4(this.transform);
        this.transform.elements[14] -= this.transformedBounds.max.z;
        try {
            model.entityTransform = new DOMMatrixReadOnly(this.transform.elements);
        }
        catch (_error) {
            this.usesNativeControls = true;
            this.syncControls();
            this.scene.element.requestUpdate();
        }
    }
    resize(_width, _height) {
        this.scene.queueRender();
    }
    dispose() {
        var _a;
        (_a = this.cancelLoad) === null || _a === void 0 ? void 0 : _a.call(this);
        this.cancelLoad = null;
        this.cancelled = null;
        if (this.model != null) {
            this.model.removeAttribute('src');
            this.model.remove();
            this.model = null;
            this.canvasSlot.appendChild(this.scene.canvas);
            this.input.classList.remove('native-rendering');
            this.input.tabIndex = 0;
            this.scene.element.requestUpdate();
        }
        this.bounds.makeEmpty();
        this.environmentURL = null;
        this.environmentPromise = null;
        this.usesNativeControls = false;
    }
}
//# sourceMappingURL=NativeModelRenderer.js.map