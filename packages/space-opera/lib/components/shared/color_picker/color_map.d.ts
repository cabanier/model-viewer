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
/**
 * A color map for HSV colors, displays a gradient field of Saturation (x-axis)
 * versus Value (y-axis) given Hue.
 */
export declare class ColorMap extends LitElement {
    static styles: import("lit").CSSResult;
    hue: number;
    saturation: number;
    value: number;
    readonly mouseEventHandler: (event: MouseEvent) => void;
    readonly mouseUpHandler: () => void;
    /** Used for rendering the hsv colormap. */
    private get backgroundColor();
    get selectedColorHex(): string;
    onMouseDown(event: MouseEvent): void;
    onMouseEvent(event: MouseEvent): void;
    onMouseUp(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'me-color-map': ColorMap;
    }
}
