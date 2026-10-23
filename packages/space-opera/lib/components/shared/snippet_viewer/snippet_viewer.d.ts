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
import '@material/mwc-button';
import { LitElement } from 'lit';
import { TemplateResult } from 'lit';
/**
 * Displays the inner text of an arbitrary TemplateResult.
 */
export declare class SnippetViewer extends LitElement {
    static get styles(): import("lit").CSSResult;
    renderedSnippet: TemplateResult;
    renderedStyle: string;
    isReadOnly?: Boolean;
    shadowTag: HTMLElement;
    snippet: HTMLTextAreaElement;
    getText(): string;
    copyToClipboard(): void;
    protected render(): TemplateResult<1>;
    protected updated(): void;
    get formattedStyle(): string;
    get formattedHtml(): string;
}
declare global {
    interface HTMLElementTagNameMap {
        'snippet-viewer': SnippetViewer;
    }
}
