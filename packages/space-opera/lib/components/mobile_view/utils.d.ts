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
export declare const DOMAIN = "https://ppng.io/";
export declare function getRandomInt(max: number): number;
export declare function getSessionUrl(pipeId: number | string, sessionId: number): string;
export declare function getPingUrl(pipeId: number | string): string;
export declare function posterToSession(pipeId: number | string, sessionID: number, modelId: number): string;
export declare function gltfToSession(pipeId: number | string, sessionID: number, modelId: number): string;
export declare function envToSession(pipeId: number | string, sessionID: number, envIsHdr: boolean): string;
export declare function post(content: Blob | string, url: string): Promise<void>;
export declare function getWithTimeout(url: string): Promise<Response>;
/**
 * Determine the mobile operating system.
 * This function returns one of 'iOS', 'Android', 'Windows Phone', or
 * 'unknown'.
 * https://stackoverflow.com/questions/21741841/detecting-ios-android-operating-system
 */
export declare function getMobileOperatingSystem(): 'iOS' | 'Android' | 'Windows Phone' | 'unknown';
