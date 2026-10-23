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
/**
 * Parses a paragraph of model-viewer tag snippet and extracts the hotspot
 * configs. Add corresponding error to errorList if exists
 */
export function parseHotspotsFromSnippet(snippet, errorList) {
    const parsedInput = new DOMParser().parseFromString(snippet, 'text/html');
    const modelViewer = parsedInput.body.getElementsByTagName('model-viewer')[0];
    if (!modelViewer) {
        throw new Error('Invalid snippet, no model-viewer tag found.');
    }
    const configs = [];
    const childElements = Array.from(modelViewer.children);
    for (const hotspotElement of childElements) {
        try {
            const hotspotHtmlElement = hotspotElement;
            // Parse the hotspot config if the slot-name fit hotspot format, continue
            // if it doesn't
            if (parseHotspotName(hotspotHtmlElement)) {
                const config = parseHotspotConfig(hotspotElement);
                configs.push(config);
            }
        }
        catch (error) {
            errorList === null || errorList === void 0 ? void 0 : errorList.push(error);
        }
    }
    return configs;
}
function parseHotspotConfig(element) {
    var _a;
    const name = parseHotspotName(element);
    if (!name) {
        throw new Error(`Invalid hotspot slot name: ${element.getAttribute('slot')}`);
    }
    const surface = element.dataset['surface'];
    const position = element.dataset['position'];
    const normal = element.dataset['normal'];
    if (!surface && !position) {
        throw new Error(`no surface or position for hotspot at slot "${element.getAttribute('slot')}"`);
    }
    const annotation = ((_a = element.querySelector('.HotspotAnnotation')) === null || _a === void 0 ? void 0 : _a.innerText) ||
        undefined; // Update here
    return { name, surface, position, normal, annotation };
}
/**
 * Returns the slot name of the element without 'hotspot-'. Returns undefined if
 * the slot name doesn't fit hotspot- format required by model-viewer.
 */
function parseHotspotName(element) {
    let name = element.getAttribute('slot');
    if (!name || !name.match(/^hotspot-/)) {
        return undefined;
    }
    name = name.replace(/^hotspot-/, '');
    return name;
}
//# sourceMappingURL=parse_hotspot_config.js.map