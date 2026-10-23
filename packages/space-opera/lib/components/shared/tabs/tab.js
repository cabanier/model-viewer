/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
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
import { TabBase } from '@material/mwc-tab/mwc-tab-base';
import { styles as baseStyles } from '@material/mwc-tab/mwc-tab.css';
import { customElement } from 'lit/decorators.js';
import { tabStyles } from './styles.css';
let Tab = class Tab extends TabBase {
};
// MWC tab did not allow us to modify min-width, so we have to override the
// styles ourselves. M2 MWC has sent out its final release  as they are now
// focusing on M3 making this safe to override according to:
// https://lit-and-friends.slack.com/archives/CC0Q3PRCL/p1651599492903519
Tab.styles = [
    baseStyles,
    tabStyles,
    // This cast is needed because MWC uses Lit 2, while we've updated to Lit 3.
    // The code is mutually compatible though.
];
Tab = __decorate([
    customElement('me-tab')
], Tab);
export { Tab };
//# sourceMappingURL=tab.js.map