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
export declare const RESET_STORE = "RESET_STORE";
export declare function dispatchReset(): {
    type: string;
};
export declare const rootReducer: (state: any, action: any) => {
    entities: {
        isDirtyCamera: boolean;
        mobile: import("./components/mobile_view/types.js").MobileState;
        environment: import("./types.js").EnvironmentState;
        model: import("./components/model_viewer_preview/types.js").ModelState;
        modelViewerSnippet: {
            arConfig: import("./types.js").ArConfigState;
            bestPractices: import("./types.js").BestPracticesState;
            config: import("./types.js").ModelViewerConfig;
            poster: import("./types.js").PosterConfig;
            hotspots: import("./components/hotspot_panel/types.js").HotspotConfig[];
            relativeFilePaths: import("./types.js").RelativeFilePathsState;
            extraAttributes: any;
        };
    };
    ui: {
        hotspots: {
            addHotspot: any;
        };
    };
};
export type RootState = ReturnType<typeof rootReducer>;
