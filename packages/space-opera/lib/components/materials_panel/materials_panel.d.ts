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
import '@material/mwc-dialog';
import '@material/mwc-icon-button';
import '@material/mwc-textfield';
import '@polymer/paper-item';
import '@polymer/paper-slider';
import '../shared/checkbox/checkbox.js';
import '../shared/color_picker/color_picker.js';
import '../shared/dialog/input_dialog';
import '../shared/dropdown/dropdown.js';
import '../shared/editor_panel/editor_panel.js';
import '../shared/expandable_content/expandable_tab.js';
import '../shared/section_row/section_row.js';
import '../shared/slider_with_input/slider_with_input.js';
import '../shared/texture_picker/texture_picker.js';
import { Material } from '@google/model-viewer/lib/features/scene-graph/material';
import { TextureInfo } from '@google/model-viewer/lib/features/scene-graph/texture-info.js';
import { RGB, RGBA } from '@google/model-viewer/lib/model-viewer';
import { GLTF, TextureInfo as GLTFTextureInfo } from '@google/model-viewer/lib/three-components/gltf-instance/gltf-defaulted';
import { TextField } from '@material/mwc-textfield';
import { State } from '../../types.js';
import { ConnectedLitElement } from '../connected_lit_element/connected_lit_element.js';
import { Thumbnail } from '../model_viewer_preview/types.js';
import { CheckboxElement } from '../shared/checkbox/checkbox.js';
import { ColorPicker } from '../shared/color_picker/color_picker.js';
import { InputDialog } from '../shared/dialog/input_dialog';
import { Dropdown } from '../shared/dropdown/dropdown.js';
import { SliderWithInputElement } from '../shared/slider_with_input/slider_with_input.js';
import { FileDetails, TexturePicker } from '../shared/texture_picker/texture_picker.js';
/** Material panel. */
export declare class MaterialPanel extends ConnectedLitElement {
    static styles: import("lit").CSSResult;
    thumbnailsById: Map<string, Thumbnail>;
    private thumbnailUrls;
    private thumbnailIds;
    private originalMaterialFromCloneMap;
    originalGltf?: GLTF;
    isNewModel: boolean;
    isTesting: boolean;
    isInterpolating: boolean;
    panel: HTMLDivElement;
    baseColorPicker: ColorPicker;
    roughnessFactorSlider: SliderWithInputElement;
    metallicFactorSlider: SliderWithInputElement;
    materialSelector: Dropdown;
    variantSelector: Dropdown;
    baseColorTexturePicker: TexturePicker;
    metallicRoughnessTexturePicker: TexturePicker;
    normalTexturePicker: TexturePicker;
    emissiveFactorPicker: ColorPicker;
    emissiveTexturePicker: TexturePicker;
    occlusionTexturePicker: TexturePicker;
    alphaModePicker: Dropdown;
    alphaCutoffSlider: SliderWithInputElement;
    alphaFactorSlider: SliderWithInputElement;
    alphaCutoffContainer: HTMLDivElement;
    doubleSidedCheckbox: CheckboxElement;
    selectableMaterials: Material[];
    editVariantNameDialog: InputDialog;
    createVariantNameDialog: InputDialog;
    editMaterialNameDialog: InputDialog;
    setVariantName: TextField;
    stateChanged(state: State): void;
    getMaterial(): Material;
    getMaterialVariant(): Material;
    getOriginalMaterial(): import("@google/model-viewer/lib/three-components/gltf-instance/gltf-defaulted").Material;
    getOriginalTextureId(index: number): string;
    getTextureIndex(textureInfo: TextureInfo): number | undefined;
    rgbToHex(rgba: RGBA | RGB): string;
    linearToSrgb(val: number): number;
    getInterpolatedColor(original: RGBA, curr: number, duration: number): RGBA;
    getInterpolatedEmissive(original: RGB, curr: number, duration: number): RGB;
    interpolateMaterial(): void;
    onSelectMaterial(): void;
    editVariantName(currentVariant: string, newVariantName: string): void;
    editMaterialName(_currentName: string, newName: string): void;
    deleteCurrentVariant(): void;
    renderVariantsTab(): import("lit-html").TemplateResult<1>;
    validateInput(textField: TextField): boolean;
    isValidInput(_value: string): {
        valid: boolean;
        validationMessage: string;
    };
    renderEditVariantDialog(): import("lit-html").TemplateResult<1>;
    renderCreateVariantDialog(): import("lit-html").TemplateResult<1>;
    renderEditMaterialNameDialog(): import("lit-html").TemplateResult<1>;
    onCreateVariant(newVariantName: string): void;
    renderSelectMaterialTab(): import("lit-html").TemplateResult<1>;
    get selectedMaterialIndex(): number;
    set selectedMaterialIndex(index: number);
    get selectedVariant(): string | null;
    set selectedVariant(name: string | null);
    get selectedMaterial(): Material;
    firstUpdated(): void;
    onClick: (event: any) => void;
    get selectedRoughnessFactor(): number;
    get selectedMetallicFactor(): number;
    get selectedAlphaCutoff(): number;
    get selectedBaseColorTextureId(): string | undefined;
    get selectedMetallicRoughnessTextureId(): string | undefined;
    get selectedNormalTextureId(): string | undefined;
    get selectedEmissiveTextureId(): string | undefined;
    get selectedOcclusionTextureId(): string | undefined;
    onBaseColorChange(): void;
    onRoughnessChange(): void;
    onMetallicChange(): void;
    onDoubleSidedChange(event: Event): void;
    updateDoubleSided(value: boolean): void;
    onTextureChange(textureId: string | undefined, textureInfo: TextureInfo): void;
    revertTexture(texturePicker: TexturePicker, textureInfo: GLTFTextureInfo | undefined): void;
    onTextureUpload(detail: FileDetails, texturePicker: TexturePicker, textureInfo: TextureInfo): Promise<void>;
    onBaseColorTextureChange(): void;
    onBaseColorTextureUpload(event: CustomEvent<FileDetails>): void;
    onMetallicRoughnessTextureChange(): void;
    onMetallicRoughnessTextureUpload(event: CustomEvent<FileDetails>): void;
    onNormalTextureChange(): void;
    onNormalTextureUpload(event: CustomEvent<FileDetails>): void;
    onEmissiveTextureChange(): void;
    onEmissiveTextureUpload(event: CustomEvent<FileDetails>): void;
    onEmissiveFactorChanged(): void;
    onOcclusionTextureChange(): void;
    onOcclusionTextureUpload(event: CustomEvent<FileDetails>): void;
    onAlphaModeSelect(): void;
    onAlphaCutoffChange(): void;
    onAlphaFactorChange(): void;
    revertMetallicRoughnessTexture(): void;
    revertMetallicFactor(): void;
    revertRoughnessFactor(): void;
    revertBaseColorFactor(): void;
    revertBaseColorTexture(): void;
    revertNormalTexture(): void;
    revertEmissiveTexture(): void;
    revertEmissiveFactor(): void;
    revertOcclusionTexture(): void;
    revertAlphaCutoff(): void;
    revertAlphaFactor(): void;
    revertAlphaMode(): void;
    revertDoubleSided(): void;
    renderMetallicRoughnessTab(): import("lit-html").TemplateResult<1>;
    renderBaseColorTab(): import("lit-html").TemplateResult<1>;
    renderNormalTextureTab(): import("lit-html").TemplateResult<1>;
    renderEmissiveTextureTab(): import("lit-html").TemplateResult<1>;
    renderOcclusionTextureTab(): import("lit-html").TemplateResult<1>;
    renderAlphaBlendModeSection(): import("lit-html").TemplateResult<1>;
    renderDoubleSidedSection(): import("lit-html").TemplateResult<1>;
    renderOtherTab(): import("lit-html").TemplateResult<1>;
    updateSelectableMaterials(): void;
    onSelectVariant(name: string | null, onApplied?: () => void): Promise<void>;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'me-materials-panel': MaterialPanel;
    }
}
