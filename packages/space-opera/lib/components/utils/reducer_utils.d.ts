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
 * Helper function for updating a single entry in an array.
 */
export declare function immutableArrayUpdate<T>(array: T[], index: number, value: T): T[];
/**
 * Helper function to update a map entry in an array.
 */
export declare function immutableMapUpdate<K, V>(map: Map<K, V>, key: K, value: V): Map<K, V>;
/**
 * Throws if the given number is not finite. Returns the value otherwise. You
 * should only use this to catch programmer errors, so do NOT use this to
 * validate user input. Just use isFinite directly in those cases.
 */
export declare function checkFinite(value: number): number;
/** Convert degrees to radians */
export declare function degToRad(degrees: number): number;
/** Convert radians to degrees */
export declare function radToDeg(radians: number): number;
/** Clamps 'value' to be within [lowerLimit, upperLimit] */
export declare function clamp(value: number, lowerLimit: number, upperLimit: number): number;
/** Round to the given number of significant figures (digits) */
export declare function roundToDigits(value: number, digits: number): number;
