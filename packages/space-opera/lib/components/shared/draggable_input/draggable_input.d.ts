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
 * A draggable input tag.
 */
export declare class DraggableInput extends LitElement {
    static styles: import("lit").CSSResult;
    value: number;
    innerLabel: string;
    min: number;
    max: number;
    dragStepSize: number;
    precision: number;
    private readonly bodyMoveHandler;
    private readonly mouseUpHandler;
    private inputElement?;
    private startingDragX;
    private startingDragValue;
    firstUpdated(): void;
    render(): import("lit-html").TemplateResult<1>;
    onChange(): void;
    onMousedown(e: MouseEvent): void;
    onMouseup(): void;
    onDocumentBodyMove(e: MouseEvent): void;
    setValue(value: number): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'me-draggable-input': DraggableInput;
    }
}
