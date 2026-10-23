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
/**
 * @fileoverview All default values as specified in the glTF 2.0 specification:
 * https://github.com/KhronosGroup/glTF/tree/master/specification/2.0
 */
import { RGB, RGBA } from '@google/model-viewer/lib/model-viewer';
/** Value to use if pbrMetallicRoughness.baseColorFactor is missing. */
export declare const DEFAULT_BASE_COLOR_FACTOR: RGBA;
/**
 * Value to use if emissiveFactor is missing.
 * Reference from:
 * https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/schema/material.schema.json#L39
 */
export declare const DEFAULT_EMISSIVE_FACTOR: RGB;
/** Value to use if pbrMetallicRoughness.roughnessFactor is missing. */
export declare const DEFAULT_ROUGHNESS_FACTOR = 1;
/** Value to use if pbrMetallicRoughness.metallicFactor is missing. */
export declare const DEFAULT_METALLIC_FACTOR = 1;
/** Supported alpha blend modes. */
export declare const ALPHA_BLEND_MODES: string[];
/** Supported mime types for images. */
export declare const IMAGE_MIME_TYPES: string[];
