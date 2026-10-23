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
/** Implements the native API without starting real browser model loads. */
export class NativeModelFixture {
    constructor() {
        this.models = [];
        this.supported = true;
        this.autoResolve = true;
        this.rejectTransforms = false;
        this.rejectEnvironment = false;
        this.exposeBounds = true;
        this.createElement = document.createElement.bind(document);
        this.createDescriptor = Object.getOwnPropertyDescriptor(document, 'createElement');
        this.nativeDescriptor = Object.getOwnPropertyDescriptor(self, 'HTMLModelElement');
        Object.defineProperty(document, 'createElement', {
            configurable: true,
            value: (name, options) => name === 'model' ? this.createModel() :
                this.createElement(name, options)
        });
    }
    restore() {
        if (this.createDescriptor != null) {
            Object.defineProperty(document, 'createElement', this.createDescriptor);
        }
        else {
            delete document.createElement;
        }
        if (this.nativeDescriptor != null) {
            Object.defineProperty(self, 'HTMLModelElement', this.nativeDescriptor);
        }
        else {
            delete self.HTMLModelElement;
        }
    }
    createModel() {
        // SVG keeps <model> inert even when the browser supports its HTML version.
        const model = document.createElementNS('http://www.w3.org/2000/svg', 'model');
        if (!this.supported) {
            return model;
        }
        let ready;
        let resolve = () => { };
        let reject = (_error) => { };
        let idleReadyReads = 0;
        let idleEnvironmentReads = 0;
        let transform = new DOMMatrixReadOnly();
        const environmentMaps = [];
        const idleEnvironmentReady = new Promise(() => { });
        const resetReady = () => {
            ready = new Promise((res, rej) => {
                resolve = () => res(model);
                reject = rej;
            });
        };
        const mock = {
            element: model,
            resolve: () => resolve(),
            reject: error => reject(error),
            environmentMaps,
            get idleReadyReads() {
                return idleReadyReads;
            },
            get idleEnvironmentReads() {
                return idleEnvironmentReads;
            }
        };
        Object.defineProperties(model, {
            ready: {
                get: () => {
                    if (!model.hasAttribute('src')) {
                        ++idleReadyReads;
                    }
                    if (ready == null) {
                        resetReady();
                    }
                    return ready;
                }
            },
            boundingBoxCenter: {
                get: () => this.exposeBounds ? new DOMPointReadOnly(2, 3, 4) : undefined
            },
            boundingBoxExtents: {
                get: () => this.exposeBounds ? new DOMPointReadOnly(4, 2, 6) : undefined
            },
            entityTransform: {
                get: () => transform,
                set: (value) => {
                    if (this.rejectTransforms) {
                        throw new DOMException('Native transforms unsupported', 'NotSupportedError');
                    }
                    transform = value;
                }
            },
            environmentMap: {
                get: () => environmentMaps[environmentMaps.length - 1],
                set: (url) => environmentMaps.push(url)
            },
            environmentMapReady: {
                get: () => {
                    if (environmentMaps.length === 0 ||
                        environmentMaps[environmentMaps.length - 1] === '') {
                        ++idleEnvironmentReads;
                        return idleEnvironmentReady;
                    }
                    return this.rejectEnvironment ?
                        Promise.reject(new Error('Unsupported native HDR image')) :
                        Promise.resolve();
                }
            }
        });
        const setAttribute = model.setAttribute.bind(model);
        model.setAttribute = (attribute, value) => {
            setAttribute(attribute, value);
            if (attribute !== 'src') {
                return;
            }
            if (!this.models.includes(mock)) {
                this.models.push(mock);
            }
            // Safari replaces a requested idle promise when source selection starts.
            if (ready != null) {
                reject(new DOMException('The operation was aborted.', 'AbortError'));
            }
            resetReady();
            if (this.autoResolve) {
                queueMicrotask(() => resolve());
            }
        };
        return model;
    }
}
//# sourceMappingURL=native-model.js.map