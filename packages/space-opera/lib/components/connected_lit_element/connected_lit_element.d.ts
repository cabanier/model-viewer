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
import { LitElement } from 'lit';
declare const connectedLitElementInternal: (new (...args: any[]) => {
    _storeUnsubscribe: import("redux").Unsubscribe;
    connectedCallback(): void;
    disconnectedCallback(): void;
    stateChanged(_state: {
        entities: {
            isDirtyCamera: boolean;
            mobile: import("../mobile_view/types.js").MobileState;
            environment: import("../../types.js").EnvironmentState;
            model: import("../model_viewer_preview/types.js").ModelState;
            modelViewerSnippet: {
                arConfig: import("../../types.js").ArConfigState;
                bestPractices: import("../../types.js").BestPracticesState;
                config: import("../../types.js").ModelViewerConfig;
                poster: import("../../types.js").PosterConfig;
                hotspots: import("../hotspot_panel/types.js").HotspotConfig[];
                relativeFilePaths: import("../../types.js").RelativeFilePathsState;
                extraAttributes: any;
            };
        };
        ui: {
            hotspots: {
                addHotspot: any;
            };
        };
    }): void;
    readonly isConnected: boolean;
}) & typeof LitElement;
/**
 * Extending this class means your element will have its "stateChanged" method
 * invoked any time SpaceOpera's Redux store is changed.
 */
export declare class ConnectedLitElement extends connectedLitElementInternal {
    get storeState(): {
        entities: {
            isDirtyCamera: boolean;
            mobile: import("../mobile_view/types.js").MobileState;
            environment: import("../../types.js").EnvironmentState;
            model: import("../model_viewer_preview/types.js").ModelState;
            modelViewerSnippet: {
                arConfig: import("../../types.js").ArConfigState;
                bestPractices: import("../../types.js").BestPracticesState;
                config: import("../../types.js").ModelViewerConfig;
                poster: import("../../types.js").PosterConfig;
                hotspots: import("../hotspot_panel/types.js").HotspotConfig[];
                relativeFilePaths: import("../../types.js").RelativeFilePathsState;
                extraAttributes: any;
            };
        };
        ui: {
            hotspots: {
                addHotspot: any;
            };
        };
    };
}
export {};
