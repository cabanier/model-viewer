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
import { Action, EnvironmentState, State } from '../../types.js';
import { EnvironmentImage } from './types.js';
/**
 * Creates a blob url from an uploaded file, should be used only for
 * environment image.
 */
export declare function createBlobUrlFromEnvironmentImage(file: File): Promise<string>;
export declare function dispatchAddEnvironmentImage(image?: EnvironmentImage): {
    type: string;
    payload: EnvironmentImage | undefined;
};
export declare const getEnvironmentImages: (state: State) => EnvironmentImage[];
export declare function environmentReducer(state: EnvironmentState | undefined, action: Action): EnvironmentState;
