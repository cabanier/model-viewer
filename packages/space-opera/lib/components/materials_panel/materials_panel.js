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
import { html } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import * as color from 'ts-closure-library/lib/color/color'; // from //third_party/javascript/closure/color
import { reduxStore } from '../../space_opera_base.js';
import { ConnectedLitElement } from '../connected_lit_element/connected_lit_element.js';
import { dispatchModelDirty, getModel, getModelViewer, getTextureId, pushThumbnail } from '../model_viewer_preview/reducer.js';
import { ALPHA_BLEND_MODES } from '../utils/gltf_constants.js';
import { checkFinite } from '../utils/reducer_utils.js';
import { styles } from './materials_panel.css.js';
/** Material panel. */
let MaterialPanel = class MaterialPanel extends ConnectedLitElement {
    constructor() {
        super(...arguments);
        this.thumbnailsById = new Map();
        this.thumbnailUrls = [];
        this.thumbnailIds = [];
        this.originalMaterialFromCloneMap = new Map();
        this.isNewModel = true;
        this.isTesting = false;
        this.isInterpolating = false;
        this.selectableMaterials = new Array();
        this.onClick = (event) => {
            if (!this.parentElement.selected) {
                return;
            }
            const modelviewer = getModelViewer();
            const pickedMaterial = modelviewer.materialFromPoint(event.clientX, event.clientY);
            if (pickedMaterial == null) {
                return;
            }
            for (const [index, material] of this.selectableMaterials.entries()) {
                if (material === pickedMaterial) {
                    this.selectedMaterialIndex = index;
                    return;
                }
            }
        };
    }
    stateChanged(state) {
        const { originalGltf, thumbnailsById } = getModel(state);
        if (this.originalGltf !== originalGltf) {
            this.originalGltf = originalGltf;
            if (thumbnailsById != null) {
                this.thumbnailsById = new Map(thumbnailsById);
                this.thumbnailIds = [];
                this.thumbnailUrls = [];
                for (const [id, thumbnail] of this.thumbnailsById) {
                    this.thumbnailIds.push(id);
                    this.thumbnailUrls.push(thumbnail.objectUrl);
                }
                if (getModelViewer().availableVariants.length > 0) {
                    getModelViewer().variantName = getModelViewer().availableVariants[0];
                }
                this.updateSelectableMaterials();
                // If a new model is loaded, don't interpolate material
                this.isNewModel = true;
                this.selectedMaterialIndex = 0;
                this.isNewModel = false;
            }
        }
    }
    getMaterial() {
        const materials = getModelViewer().model.materials;
        return materials[this.selectedMaterialIndex];
    }
    getMaterialVariant() {
        let material = this.getMaterial();
        const originalMaterial = material;
        // Creates a new material instance if it does not currently exist under the
        // variant.
        if (this.selectedVariant != null &&
            !material.hasVariant(this.selectedVariant)) {
            // Creates unique material instance for this variant if one does not
            // exist.
            const clone = getModelViewer().model.createMaterialInstanceForVariant(this.selectedMaterialIndex, material.name + ' ' + this.selectedVariant, this.selectedVariant, true);
            const sourceIndex = this.originalMaterialFromCloneMap.get(material.index);
            if (sourceIndex != null) {
                this.originalMaterialFromCloneMap.set(clone.index, sourceIndex);
            }
            else {
                this.originalMaterialFromCloneMap.set(clone.index, material.index);
            }
            this.updateSelectableMaterials();
            // Cloned material becomes the selected material.
            this.materialSelector.selectedIndex =
                this.selectableMaterials.indexOf(clone);
            if (this.materialSelector.selectedIndex === -1) {
                console.error('Could not select the new variant material');
            }
            material = clone;
        }
        // Ensures any other variants using this material create their own
        // instance.
        const otherVariants = getModelViewer().availableVariants;
        for (const variant of otherVariants) {
            if (variant === this.selectedVariant) {
                continue;
            }
            getModelViewer().model.createMaterialInstanceForVariant(this.selectedMaterialIndex, originalMaterial.name + ' ' + variant, variant, false);
        }
        this.requestUpdate();
        return material;
    }
    getOriginalMaterial() {
        return this.originalGltf.materials.length > this.selectedMaterialIndex ?
            this.originalGltf.materials[this.selectedMaterialIndex] :
            this.originalGltf.materials[this.originalMaterialFromCloneMap.get(this.selectedMaterialIndex)];
    }
    getOriginalTextureId(index) {
        const imageIndex = this.originalGltf.textures[index].source;
        return getTextureId(this.originalGltf.images[imageIndex]);
    }
    getTextureIndex(textureInfo) {
        const { texture } = textureInfo;
        if (texture == null) {
            return undefined;
        }
        const id = getTextureId(texture.source);
        return this.thumbnailIds.indexOf(id);
    }
    rgbToHex(rgba) {
        const selectedColorRgb = rgba.slice(0, 3).map((color) => Math.round(this.linearToSrgb(color) * 255));
        return color.rgbArrayToHex(selectedColorRgb);
    }
    linearToSrgb(val) {
        return (val < 0.0031308) ? val * 12.92 :
            1.055 * (Math.pow(val, 0.41666)) - 0.055;
    }
    /* Interpolate base color as curr approaches duration */
    getInterpolatedColor(original, curr, duration) {
        const INTERP_COLOR = [0, 0, 0];
        // determine how much of interp color to use
        const interpRatio = Math.max(0, Math.min(1, (duration - curr) / duration));
        const originalRatio = 1 - interpRatio;
        return [
            (interpRatio * INTERP_COLOR[0]) + (originalRatio * original[0]),
            (interpRatio * INTERP_COLOR[1]) + (originalRatio * original[1]),
            (interpRatio * INTERP_COLOR[2]) + (originalRatio * original[2]),
            original[3],
        ];
    }
    getInterpolatedEmissive(original, curr, duration) {
        const INTERP_COLOR = [1, 0, 0];
        const interpRatio = Math.max(0, Math.min(1, (duration - curr) / duration));
        const originalRatio = 1 - interpRatio;
        return [
            (interpRatio * INTERP_COLOR[0]) + (originalRatio * original[0]),
            (interpRatio * INTERP_COLOR[1]) + (originalRatio * original[1]),
            (interpRatio * INTERP_COLOR[2]) + (originalRatio * original[2]),
        ];
    }
    // Logic for interpolating from red emissive factor to the original.
    interpolateMaterial() {
        this.isInterpolating = true;
        const originalBaseColor = this.getMaterial().pbrMetallicRoughness.baseColorFactor;
        const originalEmissiveFactor = this.getMaterial().emissiveFactor;
        let start = -1;
        const DURATION = 500; // in milliseconds
        const material = this.getMaterial();
        const interpolateStep = (timestamp) => {
            // New model is loaded mid interpolation
            if (start === -1) {
                start = timestamp;
            }
            const baseColorFactor = this.getInterpolatedColor(originalBaseColor, timestamp - start, DURATION);
            material.pbrMetallicRoughness.setBaseColorFactor(baseColorFactor);
            const emissiveFactor = this.getInterpolatedEmissive(originalEmissiveFactor, timestamp - start, DURATION);
            material.setEmissiveFactor(emissiveFactor);
            if (timestamp - start <= DURATION) {
                requestAnimationFrame(interpolateStep);
            }
            else {
                this.isInterpolating = false;
            }
        };
        requestAnimationFrame(interpolateStep);
    }
    onSelectMaterial() {
        const material = this.getMaterial();
        if (material == null) {
            return;
        }
        this.panel.style.display = '';
        const { pbrMetallicRoughness, emissiveFactor, emissiveTexture, normalTexture, occlusionTexture } = material;
        const { baseColorFactor, baseColorTexture, metallicFactor, roughnessFactor, metallicRoughnessTexture } = pbrMetallicRoughness;
        this.baseColorPicker.selectedColorHex = this.rgbToHex(baseColorFactor);
        this.baseColorTexturePicker.selectedIndex =
            this.getTextureIndex(baseColorTexture);
        this.metallicFactorSlider.value = metallicFactor;
        this.roughnessFactorSlider.value = roughnessFactor;
        this.metallicRoughnessTexturePicker.selectedIndex =
            this.getTextureIndex(metallicRoughnessTexture);
        this.normalTexturePicker.selectedIndex =
            this.getTextureIndex(normalTexture);
        this.occlusionTexturePicker.selectedIndex =
            this.getTextureIndex(occlusionTexture);
        this.emissiveFactorPicker.selectedColorHex = this.rgbToHex(emissiveFactor);
        this.emissiveTexturePicker.selectedIndex =
            this.getTextureIndex(emissiveTexture);
        this.alphaCutoffSlider.value = material.getAlphaCutoff();
        this.alphaFactorSlider.value = baseColorFactor[3];
        this.doubleSidedCheckbox.checked = material.getDoubleSided();
        const alphaMode = material.getAlphaMode();
        this.alphaCutoffContainer.style.display =
            alphaMode === 'MASK' ? '' : 'none';
        this.alphaModePicker.selectedIndex =
            ALPHA_BLEND_MODES.findIndex((name) => name === alphaMode);
        // Don't interpolate on the initial model load.
        if (!this.isNewModel && !this.isTesting && !this.isInterpolating) {
            this.interpolateMaterial();
        }
    }
    editVariantName(currentVariant, newVariantName) {
        getModelViewer().model.updateVariantName(currentVariant, newVariantName);
        this.selectedVariant = newVariantName;
        this.requestUpdate();
    }
    editMaterialName(_currentName, newName) {
        this.selectedMaterial.name = newName;
        this.requestUpdate();
    }
    deleteCurrentVariant() {
        const deleteVariant = this.selectedVariant;
        let nextVariant = 0;
        let nextVariantName = null;
        const variantCount = getModelViewer().availableVariants.length;
        if (variantCount > 1) {
            nextVariant = (this.variantSelector.selectedIndex + 1) % variantCount;
            nextVariantName = getModelViewer().availableVariants[nextVariant];
            this.onSelectVariant(nextVariantName, () => {
                getModelViewer().model.deleteVariant(deleteVariant);
                if (nextVariantName == null) {
                    this.variantSelector.selectedIndex = 0;
                }
                else {
                    this.variantSelector.selectedIndex =
                        getModelViewer().availableVariants.indexOf(nextVariantName);
                }
            });
        }
        else {
            getModelViewer().model.deleteVariant(deleteVariant);
            this.variantSelector.selectedIndex = 0;
            this.onSelectVariant(null);
        }
        this.requestUpdate();
    }
    renderVariantsTab() {
        const hasVariants = getModelViewer().availableVariants.length > 1;
        return html `
    <me-expandable-tab tabName="Variants" .open=${hasVariants}>
      <div slot="content">
      <div class="EditableSelector" style='display: ${hasVariants ? '' : 'none'}'>
        <me-dropdown
          style='display: ${hasVariants ? '' : 'none'}'
          id="variant-selector"
          @select="${() => {
            const paperItem = this.variantSelector.selectedItem;
            if (paperItem != null && paperItem.hasAttribute('value')) {
                const selectedVariantName = paperItem.getAttribute('value');
                if (selectedVariantName != null) {
                    this.onSelectVariant(selectedVariantName);
                }
            }
        }}">${getModelViewer().availableVariants.map((name, id) => html `<paper-item value="${name}">
            (${id}) ${name}</paper-item>
            `)}
        </me-dropdown>
        <mwc-icon-button icon="create"
        @click="${() => {
            this.editVariantNameDialog.textFieldValue = '';
            this.editVariantNameDialog.placeholder = this.selectedVariant;
            this.editVariantNameDialog.open = true;
        }}"
        value="${this.selectedVariant}">
        </mwc-icon-button>
        <mwc-icon-button icon="delete"
        @click="${this.deleteCurrentVariant}">
        </mwc-icon-button>
        </div>
        <mwc-button
          label="Create Variant"
          id="create-variant"
          @click="${() => {
            this.createVariantNameDialog.open = true;
        }}"></mwc-button>
        </div>
    </me-expandable-tab>
    `;
    }
    validateInput(textField) {
        textField.validityTransform =
            (value, nativeValidity) => {
                // Validates length.
                if (value.length < 1) {
                    textField.validationMessage = `Invalid input.`;
                    return { valid: false };
                }
                // Verifies name is unique.
                if (getModelViewer().availableVariants.find((existingNames) => {
                    return existingNames === value;
                })) {
                    textField.validationMessage = `The name ${value} already exists.`;
                    return { valid: false };
                }
                return nativeValidity;
            };
        return textField.reportValidity();
    }
    isValidInput(_value) {
        // Validates length.
        if (_value.length < 1) {
            return { valid: false, validationMessage: `Invalid input.` };
        }
        // Verifies name is unique.
        if (getModelViewer().availableVariants.find((existingNames) => {
            return existingNames === _value;
        })) {
            return {
                valid: false,
                validationMessage: `The name ${_value} already exists.`
            };
        }
        return { valid: true, validationMessage: '' };
    }
    renderEditVariantDialog() {
        return html `
      <input-dialog id="edit-variant-name" modal="true"
        placeholder="Enter Variant Name">
      </input-dialog>
    `;
    }
    renderCreateVariantDialog() {
        return html `
      <input-dialog id="create-variant-name" modal="true"
        placeholder="Enter Variant Name">
      </input-dialog>
    `;
    }
    renderEditMaterialNameDialog() {
        return html `
      <input-dialog id="edit-material-name" modal="true"
        placeholder="Enter Material Name">
      </input-dialog>
    `;
    }
    onCreateVariant(newVariantName) {
        if (getModelViewer().availableVariants.length === 0) {
            // Creates a default variant for existing materials to live under if
            // there were no variants in the model to begin with.
            getModelViewer().model.createVariant('Default');
            for (const material of getModelViewer().model.materials) {
                getModelViewer().model.setMaterialToVariant(material.index, 'Default');
            }
        }
        getModelViewer().model.createVariant(newVariantName);
        this.variantSelector.selectedIndex =
            getModelViewer().availableVariants.indexOf(newVariantName);
        this.selectedVariant = newVariantName;
        this.requestUpdate();
    }
    renderSelectMaterialTab() {
        return html `
    <me-expandable-tab tabName="Selected Material" .open=${true}>
      <div slot="content" class="EditableSelector">
      <me-dropdown
        id="material-selector"
        @select=${this.onSelectMaterial}
        >${this.selectableMaterials.map((material, i) => html `<paper-item value="${i}">(${material.index}) ${material.name ? material.name :
            'Unnamed Material'}</paper-item>`)}
      </me-dropdown>
      <mwc-icon-button icon="create"
        @click="${() => {
            this.editMaterialNameDialog.textFieldValue = '';
            this.editMaterialNameDialog.placeholder = this.selectedMaterial.name;
            this.editMaterialNameDialog.open = true;
        }}">
      </mwc-icon-button>
      </div>
    </me-expandable-tab>
    `;
    }
    get selectedMaterialIndex() {
        return this.selectableMaterials[this.materialSelector.selectedIndex].index;
    }
    set selectedMaterialIndex(index) {
        this.materialSelector.selectedIndex = index;
        this.onSelectMaterial();
    }
    get selectedVariant() {
        return getModelViewer().variantName;
    }
    set selectedVariant(name) {
        getModelViewer().variantName = name;
    }
    get selectedMaterial() {
        return getModelViewer().model.materials[this.selectedMaterialIndex];
    }
    firstUpdated() {
        // Enables material picking but prevents selection while dragging a model.
        let drag = false;
        getModelViewer().addEventListener('pointerdown', () => drag = false);
        getModelViewer().addEventListener('pointermove', () => drag = true);
        getModelViewer().addEventListener('pointerup', (event) => {
            if (!drag) {
                this.onClick(event);
            }
        });
        // Captures this reference for use in callbacks.
        const self = this;
        // Sets up the OnOK callback methods of the InputDialogs these
        // handle dialog results.
        this.createVariantNameDialog.OnOK = (value) => {
            self.onCreateVariant(value);
        };
        this.editVariantNameDialog.OnOK = (value) => {
            self.editVariantName(self.editVariantNameDialog.placeholder, value);
        };
        this.editMaterialNameDialog.OnOK = (value) => {
            self.editMaterialName(self.editMaterialNameDialog.placeholder, value);
        };
        // Sets up the onValidate callbacks for InputDialogs these let the input
        // dialog know if input is valid or not.
        this.createVariantNameDialog.onValidate = (value) => {
            return self.isValidInput(value);
        };
        this.editVariantNameDialog.onValidate = (value) => {
            return self.isValidInput(value);
        };
    }
    get selectedRoughnessFactor() {
        return checkFinite(Number(this.roughnessFactorSlider.value));
    }
    get selectedMetallicFactor() {
        return checkFinite(Number(this.metallicFactorSlider.value));
    }
    get selectedAlphaCutoff() {
        return checkFinite(Number(this.alphaCutoffSlider.value));
    }
    get selectedBaseColorTextureId() {
        if (this.baseColorTexturePicker.selectedIndex === undefined) {
            return undefined;
        }
        return this.thumbnailIds[this.baseColorTexturePicker.selectedIndex];
    }
    get selectedMetallicRoughnessTextureId() {
        if (this.metallicRoughnessTexturePicker.selectedIndex == null) {
            return undefined;
        }
        return this.thumbnailIds[this.metallicRoughnessTexturePicker.selectedIndex];
    }
    get selectedNormalTextureId() {
        if (this.normalTexturePicker.selectedIndex === undefined) {
            return undefined;
        }
        return this.thumbnailIds[this.normalTexturePicker.selectedIndex];
    }
    get selectedEmissiveTextureId() {
        if (this.emissiveTexturePicker.selectedIndex === undefined) {
            return undefined;
        }
        return this.thumbnailIds[this.emissiveTexturePicker.selectedIndex];
    }
    get selectedOcclusionTextureId() {
        if (this.occlusionTexturePicker.selectedIndex === undefined) {
            return undefined;
        }
        return this.thumbnailIds[this.occlusionTexturePicker.selectedIndex];
    }
    onBaseColorChange() {
        const material = this.getMaterialVariant();
        material.pbrMetallicRoughness.setBaseColorFactor(this.baseColorPicker.selectedColorHex);
        reduxStore.dispatch(dispatchModelDirty());
    }
    onRoughnessChange() {
        this.getMaterialVariant().pbrMetallicRoughness.setRoughnessFactor(this.selectedRoughnessFactor);
        reduxStore.dispatch(dispatchModelDirty());
    }
    onMetallicChange() {
        this.getMaterialVariant().pbrMetallicRoughness.setMetallicFactor(this.selectedMetallicFactor);
        reduxStore.dispatch(dispatchModelDirty());
    }
    onDoubleSidedChange(event) {
        this.updateDoubleSided(event.target.checked);
    }
    updateDoubleSided(value) {
        this.getMaterialVariant().setDoubleSided(value);
        reduxStore.dispatch(dispatchModelDirty());
    }
    onTextureChange(textureId, textureInfo) {
        var _a;
        const texture = textureId != null ?
            (_a = this.thumbnailsById.get(textureId)) === null || _a === void 0 ? void 0 : _a.texture :
            undefined;
        textureInfo.setTexture(texture !== null && texture !== void 0 ? texture : null);
        reduxStore.dispatch(dispatchModelDirty());
    }
    revertTexture(texturePicker, textureInfo) {
        if (textureInfo == null) {
            texturePicker.selectedIndex = undefined;
        }
        else {
            const id = this.getOriginalTextureId(textureInfo.index);
            texturePicker.selectedIndex = this.thumbnailIds.indexOf(id);
        }
    }
    async onTextureUpload(detail, texturePicker, textureInfo) {
        var _a;
        const { url, type } = detail;
        if (this.thumbnailsById.has(url)) {
            console.log('URL collision! Texture not updated.');
            return;
        }
        const texture = await ((_a = getModelViewer()) === null || _a === void 0 ? void 0 : _a.createTexture(url, type));
        if (texture == null) {
            return;
        }
        textureInfo.setTexture(texture);
        const id = await pushThumbnail(this.thumbnailsById, textureInfo);
        // Trigger async panel update / render
        this.thumbnailsById = new Map(this.thumbnailsById);
        if (id != null) {
            this.thumbnailIds.push(id);
            // Trigger async texture_picker update / render
            this.thumbnailUrls = [...this.thumbnailUrls];
            this.thumbnailUrls.push(this.thumbnailsById.get(id).objectUrl);
            texturePicker.selectedIndex = this.thumbnailIds.indexOf(id);
        }
        reduxStore.dispatch(dispatchModelDirty());
        this.dispatchEvent(new CustomEvent('texture-upload-complete'));
    }
    onBaseColorTextureChange() {
        this.onTextureChange(this.selectedBaseColorTextureId, this.getMaterialVariant().pbrMetallicRoughness.baseColorTexture);
    }
    onBaseColorTextureUpload(event) {
        this.onTextureUpload(event.detail, this.baseColorTexturePicker, this.getMaterialVariant().pbrMetallicRoughness.baseColorTexture);
    }
    onMetallicRoughnessTextureChange() {
        this.onTextureChange(this.selectedMetallicRoughnessTextureId, this.getMaterialVariant()
            .pbrMetallicRoughness.metallicRoughnessTexture);
    }
    onMetallicRoughnessTextureUpload(event) {
        this.onTextureUpload(event.detail, this.metallicRoughnessTexturePicker, this.getMaterialVariant()
            .pbrMetallicRoughness.metallicRoughnessTexture);
    }
    onNormalTextureChange() {
        this.onTextureChange(this.selectedNormalTextureId, this.getMaterialVariant().normalTexture);
    }
    onNormalTextureUpload(event) {
        this.onTextureUpload(event.detail, this.normalTexturePicker, this.getMaterialVariant().normalTexture);
    }
    onEmissiveTextureChange() {
        this.onTextureChange(this.selectedEmissiveTextureId, this.getMaterialVariant().emissiveTexture);
    }
    onEmissiveTextureUpload(event) {
        this.onTextureUpload(event.detail, this.emissiveTexturePicker, this.getMaterialVariant().emissiveTexture);
    }
    onEmissiveFactorChanged() {
        this.getMaterialVariant().setEmissiveFactor(this.emissiveFactorPicker.selectedColorHex);
        reduxStore.dispatch(dispatchModelDirty());
    }
    onOcclusionTextureChange() {
        this.onTextureChange(this.selectedOcclusionTextureId, this.getMaterialVariant().occlusionTexture);
    }
    onOcclusionTextureUpload(event) {
        this.onTextureUpload(event.detail, this.occlusionTexturePicker, this.getMaterialVariant().occlusionTexture);
    }
    onAlphaModeSelect() {
        const selectedMode = ALPHA_BLEND_MODES[this.alphaModePicker.selectedIndex];
        this.alphaCutoffContainer.style.display =
            selectedMode === 'MASK' ? '' : 'none';
        const material = this.getMaterialVariant();
        material.setAlphaMode(selectedMode);
        this.alphaCutoffSlider.value = material.getAlphaCutoff();
        reduxStore.dispatch(dispatchModelDirty());
    }
    onAlphaCutoffChange() {
        this.getMaterialVariant().setAlphaCutoff(this.selectedAlphaCutoff);
        reduxStore.dispatch(dispatchModelDirty());
    }
    onAlphaFactorChange() {
        const material = this.getMaterialVariant();
        const rgba = this.getMaterial().pbrMetallicRoughness.baseColorFactor;
        rgba[3] = this.alphaFactorSlider.value;
        material.pbrMetallicRoughness.setBaseColorFactor(rgba);
        reduxStore.dispatch(dispatchModelDirty());
    }
    revertMetallicRoughnessTexture() {
        this.revertTexture(this.metallicRoughnessTexturePicker, this.getOriginalMaterial()
            .pbrMetallicRoughness.metallicRoughnessTexture);
        this.onMetallicRoughnessTextureChange();
    }
    revertMetallicFactor() {
        const factor = this.getOriginalMaterial().pbrMetallicRoughness.metallicFactor;
        this.metallicFactorSlider.value = factor;
        this.onMetallicChange();
    }
    revertRoughnessFactor() {
        const factor = this.getOriginalMaterial().pbrMetallicRoughness.roughnessFactor;
        this.roughnessFactorSlider.value = factor;
        this.onRoughnessChange();
    }
    revertBaseColorFactor() {
        const factor = this.getOriginalMaterial().pbrMetallicRoughness.baseColorFactor;
        this.baseColorPicker.selectedColorHex = this.rgbToHex(factor);
        this.onBaseColorChange();
    }
    revertBaseColorTexture() {
        this.revertTexture(this.baseColorTexturePicker, this.getOriginalMaterial().pbrMetallicRoughness.baseColorTexture);
        this.onBaseColorTextureChange();
    }
    revertNormalTexture() {
        this.revertTexture(this.normalTexturePicker, this.getOriginalMaterial().normalTexture);
        this.onNormalTextureChange();
    }
    revertEmissiveTexture() {
        this.revertTexture(this.emissiveTexturePicker, this.getOriginalMaterial().emissiveTexture);
        this.onEmissiveTextureChange();
    }
    revertEmissiveFactor() {
        const factor = this.getOriginalMaterial().emissiveFactor;
        this.emissiveFactorPicker.selectedColorHex = this.rgbToHex(factor);
        this.onEmissiveFactorChanged();
    }
    revertOcclusionTexture() {
        this.revertTexture(this.occlusionTexturePicker, this.getOriginalMaterial().occlusionTexture);
        this.onOcclusionTextureChange();
    }
    revertAlphaCutoff() {
        this.alphaCutoffSlider.value = this.getOriginalMaterial().alphaCutoff;
        this.onAlphaCutoffChange();
    }
    revertAlphaFactor() {
        this.alphaFactorSlider.value =
            this.getOriginalMaterial().pbrMetallicRoughness.baseColorFactor[3];
        this.onAlphaFactorChange();
    }
    revertAlphaMode() {
        const alphaMode = this.getOriginalMaterial().alphaMode;
        this.alphaModePicker.selectedIndex =
            ALPHA_BLEND_MODES.findIndex((name) => name === alphaMode);
        this.onAlphaModeSelect();
    }
    revertDoubleSided() {
        const doubleSided = this.getOriginalMaterial().doubleSided;
        this.doubleSidedCheckbox.checked = doubleSided;
        this.updateDoubleSided(doubleSided);
    }
    renderMetallicRoughnessTab() {
        return html `
  <me-expandable-tab tabName="Metallic Roughness">
    <div slot="content">
      <div class="MRSliders">
        <div class="MRSliderLabel">Metallic factor</div>
        <div class="MRSliderContainer">
          <mwc-icon-button id="revert-metallic-factor" class="RevertButton" icon="undo"
          title="Revert to original metallic factor"
          @click=${this.revertMetallicFactor}></mwc-icon-button>
          <me-slider-with-input id="metallic-factor" class="MRSlider" min="0.0" max="1.0"
        step="0.01" @change=${this.onMetallicChange}>
          </me-slider-with-input>
        </div>

        <div class="MRSliderLabel">Roughness factor</div>
        <div class="MRSliderContainer">
          <mwc-icon-button id="revert-roughness-factor" class="RevertButton" icon="undo"
          title="Revert to original roughness factor"
          @click=${this.revertRoughnessFactor}></mwc-icon-button>
          <me-slider-with-input id="roughness-factor" class="MRSlider" min="0.0" max="1.0"
          step="0.01" @change=${this.onRoughnessChange}>
          </me-slider-with-input>
        </div>
      </div>
      <me-section-row label="Texture">
        <div class="TexturePickerContainer">
          <mwc-icon-button class="RevertButton" id="revert-metallic-roughness-texture" icon="undo"
          title="Revert to original metallic roughness texture"
          @click=${this.revertMetallicRoughnessTexture}></mwc-icon-button>
          <me-texture-picker id="metallic-roughness-texture-picker" @texture-changed=${this.onMetallicRoughnessTextureChange} @texture-uploaded=${this.onMetallicRoughnessTextureUpload} .images=${this.thumbnailUrls}>
          </me-texture-picker>
        </div>
      </me-section-row>
    </div>
  </me-expandable-tab>`;
    }
    renderBaseColorTab() {
        return html `
  <me-expandable-tab tabName="Base Color" .open=${true}>
    <div slot="content">
      <me-section-row label="Factor">
        <div class="TexturePickerContainer">
          <mwc-icon-button class="RevertButton" id="revert-base-color-factor" icon="undo"
            title="Revert to original base color factor"
            @click=${this.revertBaseColorFactor}></mwc-icon-button>
          <me-color-picker id="base-color-picker"
          @change=${this.onBaseColorChange}>
          </me-color-picker>
        </div>
      </me-section-row>
      <me-section-row label="Texture">
        <div class="TexturePickerContainer">
          <mwc-icon-button class="RevertButton" id="revert-base-color-texture" icon="undo"
          title="Revert to original base color texture"
            @click=${this.revertBaseColorTexture}></mwc-icon-button>
          <me-texture-picker id="base-color-texture-picker" @texture-changed=${this.onBaseColorTextureChange} @texture-uploaded=${this.onBaseColorTextureUpload} .images=${this.thumbnailUrls}></me-texture-picker>
        </div>
      </me-section-row>
    </div>
  </me-expandable-tab>
    `;
    }
    renderNormalTextureTab() {
        return html `
  <me-expandable-tab tabName="Normal Map">
    <div slot="content">
      <me-section-row label="Texture">
        <div class="TexturePickerContainer">
          <mwc-icon-button class="RevertButton" id="revert-normal-map-texture" icon="undo"
          title="Revert to original normal map texture"
            @click=${this.revertNormalTexture}></mwc-icon-button>
          <me-texture-picker id="normal-texture-picker" @texture-changed=${this.onNormalTextureChange} @texture-uploaded=${this.onNormalTextureUpload} .images=${this.thumbnailUrls}>
          </me-texture-picker>
        </div>
      </me-section-row>
    </div>
  </me-expandable-tab>`;
    }
    renderEmissiveTextureTab() {
        return html `
  <me-expandable-tab tabName="Emissive">
    <div slot="content">
      <me-section-row label="Factor">
        <div class="TexturePickerContainer">
          <mwc-icon-button class="RevertButton" id="revert-emissive-factor" icon="undo"
          title="Revert to original emissive factor"
          @click=${this.revertEmissiveFactor}></mwc-icon-button>
          <me-color-picker id="emissive-factor-picker" @change=${this.onEmissiveFactorChanged}></me-color-picker>
        </div>
      </me-section-row>
      <me-section-row label="Texture">
        <div class="TexturePickerContainer">
          <mwc-icon-button class="RevertButton" id="revert-emissive-texture" icon="undo"
          title="Revert to original emissive texture"
          @click=${this.revertEmissiveTexture}></mwc-icon-button>
          <me-texture-picker id="emissive-texture-picker" @texture-changed=${this.onEmissiveTextureChange} @texture-uploaded=${this.onEmissiveTextureUpload} .images=${this.thumbnailUrls}>
        </me-texture-picker>
        </div>
      </me-section-row>
    </div>
  </me-expandable-tab>`;
    }
    renderOcclusionTextureTab() {
        return html `
  <me-expandable-tab tabName="Occlusion">
    <div slot="content">
      <me-section-row label="Texture">
        <div class="TexturePickerContainer">
          <mwc-icon-button class="RevertButton" id="revert-occlusion-texture" icon="undo"
          title="Revert to original occlusion texture"
          @click=${this.revertOcclusionTexture}></mwc-icon-button>
          <me-texture-picker id="occlusion-texture-picker" @texture-changed=${this.onOcclusionTextureChange} @texture-uploaded=${this.onOcclusionTextureUpload} .images=${this.thumbnailUrls}>
          </me-texture-picker>
        </div>
      </me-section-row>
    </div>
  </me-expandable-tab>`;
    }
    renderAlphaBlendModeSection() {
        return html `
    <div class="SectionLabel">Alpha Blend Mode:</div>
    <div class="DropdownContainer">
      <mwc-icon-button class="RevertButton" id="revert-alpha-cutoff" icon="undo"
        title="Revert to original alpha mode"
        @click=${this.revertAlphaMode}></mwc-icon-button>
      <me-dropdown class="TopMargin" id="alpha-mode-picker"
        @select=${this.onAlphaModeSelect}>
        ${ALPHA_BLEND_MODES.map(mode => html `<paper-item value=${mode}>${mode}</paper-item>`)}
      </me-dropdown>
    </div>
    <div id="alpha-factor-container"}>
      <div class="SectionLabel TopMargin" id="alpha-factor-label">Alpha Factor:</div>
      <div class="MRSliderContainer">
        <mwc-icon-button class="RevertButton" id="revert-alpha-mode" icon="undo"
          title="Revert to original alpha factor"
          @click=${this.revertAlphaFactor}></mwc-icon-button>
        <me-slider-with-input class="MRSlider" id="alpha-factor" min="0.0" max="1.0"
        step="0.01" @change=${this.onAlphaFactorChange}></me-slider-with-input>
      </div>
    </div>
    <div id="alpha-cutoff-container"}>
      <div class="SectionLabel TopMargin" id="alpha-cutoff-label">Alpha Cutoff:</div>
      <div class="MRSliderContainer">
        <mwc-icon-button class="RevertButton" id="revert-alpha-mode" icon="undo"
          title="Revert to original alpha cutoff"
          @click=${this.revertAlphaCutoff}></mwc-icon-button>
        <me-slider-with-input class="MRSlider" id="alpha-cutoff" min="0.0" max="1.0"
        step="0.01" @change=${this.onAlphaCutoffChange}></me-slider-with-input>
      </div>
    </div>
      `;
    }
    renderDoubleSidedSection() {
        return html `
      <div class="CheckboxContainer">
        <mwc-icon-button class="RevertButton" id="revert-occlusion-texture" icon="undo"
        title="Revert to original double sidedness"
        @click=${this.revertDoubleSided}></mwc-icon-button>
        <me-checkbox id="doubleSidedCheckbox"
          label="Double Sided"
          @change=${this.onDoubleSidedChange}></me-checkbox>
      </div>`;
    }
    renderOtherTab() {
        return html `
      <me-expandable-tab tabName="Other">
        <div slot="content">
        ${this.renderDoubleSidedSection()}
        ${this.renderAlphaBlendModeSection()}
        </div>
      </me-expandable-tab>
    `;
    }
    updateSelectableMaterials() {
        this.selectableMaterials = [];
        for (const material of getModelViewer().model.materials) {
            if (material.isActive) {
                this.selectableMaterials.push(material);
            }
        }
    }
    async onSelectVariant(name, onApplied) {
        const onVariantApplied = () => {
            this.updateSelectableMaterials();
            this.selectedMaterialIndex = 0;
            if (onApplied != null) {
                onApplied();
            }
        };
        getModelViewer().addEventListener('variant-applied', onVariantApplied, { once: true });
        this.selectedVariant = name;
    }
    render() {
        return html `
    <div id="material-container" style="display: none">
    ${this.renderVariantsTab()}
    ${this.renderEditVariantDialog()}
    ${this.renderCreateVariantDialog()}
    ${this.renderEditMaterialNameDialog()}
    ${this.renderSelectMaterialTab()}
    ${this.renderBaseColorTab()}
    ${this.renderMetallicRoughnessTab()}
    ${this.renderNormalTextureTab()}
    ${this.renderEmissiveTextureTab()}
    ${this.renderOcclusionTextureTab()}
    ${this.renderOtherTab()}
    </div>
    `;
    }
};
MaterialPanel.styles = styles;
__decorate([
    state()
], MaterialPanel.prototype, "thumbnailsById", void 0);
__decorate([
    state()
], MaterialPanel.prototype, "originalGltf", void 0);
__decorate([
    state()
], MaterialPanel.prototype, "isNewModel", void 0);
__decorate([
    state()
], MaterialPanel.prototype, "isTesting", void 0);
__decorate([
    state()
], MaterialPanel.prototype, "isInterpolating", void 0);
__decorate([
    query('#material-container')
], MaterialPanel.prototype, "panel", void 0);
__decorate([
    query('me-color-picker#base-color-picker')
], MaterialPanel.prototype, "baseColorPicker", void 0);
__decorate([
    query('me-slider-with-input#roughness-factor')
], MaterialPanel.prototype, "roughnessFactorSlider", void 0);
__decorate([
    query('me-slider-with-input#metallic-factor')
], MaterialPanel.prototype, "metallicFactorSlider", void 0);
__decorate([
    query('me-dropdown#material-selector')
], MaterialPanel.prototype, "materialSelector", void 0);
__decorate([
    query('me-dropdown#variant-selector')
], MaterialPanel.prototype, "variantSelector", void 0);
__decorate([
    query('me-texture-picker#base-color-texture-picker')
], MaterialPanel.prototype, "baseColorTexturePicker", void 0);
__decorate([
    query('me-texture-picker#metallic-roughness-texture-picker')
], MaterialPanel.prototype, "metallicRoughnessTexturePicker", void 0);
__decorate([
    query('me-texture-picker#normal-texture-picker')
], MaterialPanel.prototype, "normalTexturePicker", void 0);
__decorate([
    query('me-color-picker#emissive-factor-picker')
], MaterialPanel.prototype, "emissiveFactorPicker", void 0);
__decorate([
    query('me-texture-picker#emissive-texture-picker')
], MaterialPanel.prototype, "emissiveTexturePicker", void 0);
__decorate([
    query('me-texture-picker#occlusion-texture-picker')
], MaterialPanel.prototype, "occlusionTexturePicker", void 0);
__decorate([
    query('me-dropdown#alpha-mode-picker')
], MaterialPanel.prototype, "alphaModePicker", void 0);
__decorate([
    query('me-slider-with-input#alpha-cutoff')
], MaterialPanel.prototype, "alphaCutoffSlider", void 0);
__decorate([
    query('me-slider-with-input#alpha-factor')
], MaterialPanel.prototype, "alphaFactorSlider", void 0);
__decorate([
    query('#alpha-cutoff-container')
], MaterialPanel.prototype, "alphaCutoffContainer", void 0);
__decorate([
    query('me-checkbox#doubleSidedCheckbox')
], MaterialPanel.prototype, "doubleSidedCheckbox", void 0);
__decorate([
    query('input-dialog#edit-variant-name')
], MaterialPanel.prototype, "editVariantNameDialog", void 0);
__decorate([
    query('input-dialog#create-variant-name')
], MaterialPanel.prototype, "createVariantNameDialog", void 0);
__decorate([
    query('input-dialog#edit-material-name')
], MaterialPanel.prototype, "editMaterialNameDialog", void 0);
__decorate([
    query('mwc-textfield#set-variant-name')
], MaterialPanel.prototype, "setVariantName", void 0);
MaterialPanel = __decorate([
    customElement('me-materials-panel')
], MaterialPanel);
export { MaterialPanel };
//# sourceMappingURL=materials_panel.js.map