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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import '@material/mwc-button';
import { css, html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
/**
 * Displays the inner text of an arbitrary TemplateResult.
 */
let SnippetViewer = class SnippetViewer extends LitElement {
    constructor() {
        super(...arguments);
        this.renderedSnippet = html ``;
        this.renderedStyle = '';
        this.isReadOnly = true;
    }
    static get styles() {
        return css `
      textarea#snippet {
        width: 100%;
        resize: none;
        text-wrap: nowrap;
        border-radius: 4px;
        border: none;
      }

      textarea#snippet::-webkit-scrollbar {
        width: 8px;
        height: 8px;
        background-color: #fff;
        border-radius: 0.2rem;
      }

      textarea#snippet::-webkit-scrollbar-thumb {
        background-color: #202124b0;
        border-radius: 0.2rem;
      }

      textarea#snippet::-webkit-scrollbar-thumb:hover {
        background-color: #202124b8;
      }
    `;
    }
    getText() {
        return this.snippet.value;
    }
    copyToClipboard() {
        this.snippet.select();
        document.execCommand('copy');
    }
    render() {
        if (this.isReadOnly === false) {
            return html `<span id="tag" style='display: none'>${this.renderedSnippet}</span>
      <textarea id="snippet" rows=15></textarea>`;
        }
        return html `
      <span id="tag" style='display: none'>${this.renderedSnippet}</span>
      <textarea id="snippet" readonly rows=10></textarea>
`;
    }
    updated() {
        this.snippet.textContent = this.formattedHtml + '\n' + this.formattedStyle;
        this.snippet.value = this.formattedHtml + '\n' + this.formattedStyle;
    }
    get formattedStyle() {
        return this.renderedStyle ? `<style>
${css_beautify(this.renderedStyle)}
</style>
` :
            ``;
    }
    get formattedHtml() {
        // Removes LitElement render artifacts e.g. <!--?lit$515089429$-->
        // the `?` in `.*?` is a non-greedy match.
        let html = this.shadowTag.innerHTML.replace(/<!--.*?-->/g, '');
        // Removes empty lines that may result from the previous line
        html = html.replace(/\n\s*\n/g, '');
        // Remove the ar-status runtime-added tag
        html = html.replace(/ar-status="[\w- ]+" */, '');
        // Remove redundant ="" for boolean attribs
        html = html.replace(/=""/g, '');
        return html_beautify(html);
    }
};
__decorate([
    property({ type: Object })
], SnippetViewer.prototype, "renderedSnippet", void 0);
__decorate([
    property({ type: String })
], SnippetViewer.prototype, "renderedStyle", void 0);
__decorate([
    property({ type: Boolean })
], SnippetViewer.prototype, "isReadOnly", void 0);
__decorate([
    query('span#tag')
], SnippetViewer.prototype, "shadowTag", void 0);
__decorate([
    query('textarea#snippet')
], SnippetViewer.prototype, "snippet", void 0);
SnippetViewer = __decorate([
    customElement('snippet-viewer')
], SnippetViewer);
export { SnippetViewer };
//# sourceMappingURL=snippet_viewer.js.map