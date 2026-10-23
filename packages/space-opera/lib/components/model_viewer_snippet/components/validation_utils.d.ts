/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
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
export type Report = {
    info?: {
        version?: string;
        generator?: string;
        extensionsUsed?: [string];
        drawCallCount?: number;
        animationCount?: number;
        materialCount?: number;
        totalVertexCount?: number;
        totalTriangleCount?: number;
        totalJointCount?: number;
        width?: number;
        length?: number;
        height?: number;
        converted?: boolean;
    };
    validatorVersion?: string;
    issues?: {
        numErrors?: number;
        numWarnings?: number;
        numHints?: number;
        numInfos?: number;
    };
    errors?: Message;
    warnings?: Message;
    hints?: Message;
    infos?: Message;
};
export type Message = {
    code: string;
    message: string;
    pointer: string;
}[];
/**
 * Passes the gltf url to be validated.
 */
export declare function validateGltf(url: string, externalResourceFunction: (uri: string) => Promise<Uint8Array>): Promise<any>;
/**
 * Loads a resource (either locally or from the network) and returns it.
 */
export declare function resolveExternalResource(uri: string, rootPath: string, fileMap: Map<string, File>): Promise<Uint8Array>;
