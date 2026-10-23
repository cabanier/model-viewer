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
import { Action, State } from '../../types.js';
import { HotspotConfig } from './types.js';
/** Generates a unique hotspot name */
export declare function generateUniqueHotspotName(): string;
export declare function dispatchSetHotspots(hotspots: HotspotConfig[]): {
    type: string;
    payload: HotspotConfig[];
};
export declare function dispatchClearHotspot(): {
    type: string;
    payload: never[];
};
export declare function dispatchRemoveHotspot(name?: string): {
    type: string;
    payload: string | undefined;
};
export declare function dispatchUpdateHotspot(config?: HotspotConfig): {
    type: string;
    payload: HotspotConfig | undefined;
};
export declare function dispatchAddHotspot(config?: HotspotConfig): {
    type: string;
    payload: HotspotConfig | undefined;
};
export declare const getHotspots: (state: State) => HotspotConfig[];
export declare function hotspotsReducer(state: HotspotConfig[] | undefined, action: Action): HotspotConfig[];
export declare function dispatchUpdateHotspotMode(addHotspot: boolean): {
    type: string;
    payload: boolean;
};
export declare const getHotspotMode: (state: State) => boolean;
export declare function hotspotsUiReducer(state: {
    addHotspot: boolean;
} | undefined, action: Action): {
    addHotspot: any;
};
