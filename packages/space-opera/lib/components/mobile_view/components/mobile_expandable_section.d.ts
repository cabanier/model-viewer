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
import { LitElement, TemplateResult } from 'lit';
import { ArConfigState } from '../../../types';
import { CheckboxElement } from '../../shared/checkbox/checkbox';
/**
 * The delegated rendered component for the open mobile view.
 */
export declare class MobileExpanadableSection extends LitElement {
    isDeployed?: boolean;
    isDeployable?: boolean;
    onInitialDeploy?: Function;
    haveReceivedResponse?: boolean;
    isSendingData?: boolean;
    contentHasChanged?: boolean;
    openModal?: Function;
    postInfo?: Function;
    defaultToSceneViewer?: boolean;
    onSelectArMode?: Function;
    arConfig?: ArConfigState;
    arCheckbox: CheckboxElement;
    arModesCheckbox: CheckboxElement;
    renderDeployButton(): TemplateResult;
    get optionalMessage(): TemplateResult;
    selectArMode(): void;
    renderMobileInfo(): TemplateResult<1>;
    renderAR(): TemplateResult<1>;
    render(): TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'mobile-expandable-section': MobileExpanadableSection;
    }
}
