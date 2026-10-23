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
export type PredicateFunction<T = void> = (value: T) => boolean;
export declare const timePasses: (ms?: number) => Promise<void>;
export declare const rafPasses: () => Promise<void>;
export declare const until: (predicate: PredicateFunction) => Promise<void>;
export declare const waitForEvent: (target: EventTarget, eventName: string) => Promise<Event>;
/**
 * Fully clones a JSON object tree.
 */
export declare function cloneJson<T>(json: T): T;
/**
 * Reads data from a UTF16 string as an ArrayBuffer.
 */
export declare function createBufferFromString(str: string): ArrayBuffer;
/**
 * Creates a dummy PNG blob, useful as a test texture
 */
export declare function generatePngBlob(strokeStyle?: string, size?: number): Promise<Blob>;
/**
 * Returns true if two ArrayBuffers are equal, byte for byte.
 */
export declare function areBuffersEqual(buffer0: ArrayBuffer, buffer1: ArrayBuffer): boolean;
/**
 * Suitable for use as a jasmine custom equality tester.
 */
export declare function arrayBufferEqualityTester(first: unknown, second: unknown): boolean | undefined;
/**
 * Convenience function for when you just want the bytes.
 */
export declare function fetchBufferForUri(uri: string): Promise<ArrayBuffer>;
