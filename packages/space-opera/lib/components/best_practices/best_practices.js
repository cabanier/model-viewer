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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { reduxStore } from '../../space_opera_base';
import { ConnectedLitElement } from '../connected_lit_element/connected_lit_element';
import { dispatchSetARButton, dispatchSetARPrompt, dispatchSetProgressBar, getBestPractices } from './reducer';
/**
 * A section of best practices to enable or disable.
 */
let BestPractices = class BestPractices extends ConnectedLitElement {
    stateChanged(state) {
        this.bestPractices = getBestPractices(state);
    }
    onProgressBarChange() {
        reduxStore.dispatch(dispatchSetProgressBar(this.progressBarCheckbox.checked));
    }
    onARButtonChange() {
        reduxStore.dispatch(dispatchSetARButton(this.arButtonCheckbox.checked));
    }
    onARPromptChange() {
        reduxStore.dispatch(dispatchSetARPrompt(this.arPromptCheckbox.checked));
    }
    render() {
        var _a, _b, _c;
        return html `
    <div style="font-size: 14px; font-weight: 500; margin: 0px 0px 10px 0px;">
      Use Custom:
    </div>
    <me-checkbox
      id="progress-bar"
      label="Progress Bar"
      ?checked="${(_a = this.bestPractices) === null || _a === void 0 ? void 0 : _a.progressBar}"
      @change=${this.onProgressBarChange}
      >
    </me-checkbox>
    <me-checkbox
      id="ar-button"
      label="AR Button"
      ?checked="${(_b = this.bestPractices) === null || _b === void 0 ? void 0 : _b.arButton}"
      @change=${this.onARButtonChange}
      >
    </me-checkbox>
    <me-checkbox
      id="ar-prompt"
      label="AR Prompt"
      ?checked="${(_c = this.bestPractices) === null || _c === void 0 ? void 0 : _c.arPrompt}"
      @change=${this.onARPromptChange}
      >
    </me-checkbox>
    `;
    }
};
__decorate([
    state()
], BestPractices.prototype, "bestPractices", void 0);
__decorate([
    query('me-checkbox#progress-bar')
], BestPractices.prototype, "progressBarCheckbox", void 0);
__decorate([
    query('me-checkbox#ar-button')
], BestPractices.prototype, "arButtonCheckbox", void 0);
__decorate([
    query('me-checkbox#ar-prompt')
], BestPractices.prototype, "arPromptCheckbox", void 0);
BestPractices = __decorate([
    customElement('best-practices')
], BestPractices);
export { BestPractices };
//# sourceMappingURL=best_practices.js.map