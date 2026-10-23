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
import { INITIAL_ENVIRONMENT_IMAGES } from './components/ibl_selector/types.js';
export const INITIAL_STATE = {
    ui: { hotspots: { addHotspot: false } },
    entities: {
        isDirtyCamera: false,
        mobile: {
            isRefreshable: false,
            forcePost: false,
        },
        environment: { environmentImages: INITIAL_ENVIRONMENT_IMAGES },
        model: { fileMap: new Map() },
        modelViewerSnippet: {
            arConfig: { ar: true, arModes: 'webxr scene-viewer quick-look' },
            bestPractices: { progressBar: true, arButton: true, arPrompt: true },
            config: { cameraControls: true, shadowIntensity: 1, toneMapping: 'neutral' },
            poster: { height: 512, mimeType: 'image/webp' },
            hotspots: [],
            relativeFilePaths: { posterName: 'poster.webp' },
            extraAttributes: {},
        },
    },
};
/**
 * Convenience function for components that import GLBs.
 * We consider "staging config" to be properties that are applicable to
 * any model, and thus are sensible to preserve when a new model is
 * loaded.
 */
export function extractStagingConfig(config) {
    return {
        environmentImage: config.environmentImage, exposure: config.exposure,
        toneMapping: config.toneMapping, useEnvAsSkybox: config.useEnvAsSkybox,
        shadowIntensity: config.shadowIntensity,
        shadowSoftness: config.shadowSoftness,
        cameraControls: config.cameraControls, autoRotate: config.autoRotate,
    };
}
//# sourceMappingURL=types.js.map