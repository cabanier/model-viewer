/* @license
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
 */
import { directive, Directive, PartType, } from 'lit/directive.js';
const Binding = {
    ATTRIBUTE: 'ATTRIBUTE',
    PROPERTY: 'PROPERTY',
    BOOLEAN_ATTRIBUTE: 'BOOLEAN_ATTRIBUTE',
    EVENT: 'EVENT',
};
class Spread extends Directive {
    constructor(info) {
        super(info);
        this.oldBinds = {};
        if (info.type !== PartType.ELEMENT) {
            throw new Error(`spread directive can only be used on element parts.`);
        }
    }
    update(part, [binds]) {
        const newEntires = Object.entries(binds);
        this.oldBinds.hasOwnProperty('$spread');
        for (const [bind, value] of newEntires) {
            const [bindKind, bindName] = this.parseBind(bind);
            if (this.oldBinds.hasOwnProperty(bind)) {
                this.handleExistingBind(part, bind, bindName, value, bindKind);
            }
            else {
                this.handleNewBind(part, bindName, value, bindKind);
            }
        }
        const oldEntries = Object.entries(this.oldBinds);
        for (const [bind, value] of oldEntries) {
            const [bindKind, bindName] = this.parseBind(bind);
            if (!binds.hasOwnProperty(bind)) {
                this.handleRemovedBind(part, bindName, value, bindKind);
            }
        }
        this.oldBinds = Object.assign({}, binds);
    }
    handleExistingBind(part, bind, bindName, value, bindKind) {
        const hasBindChanged = this.oldBinds[bind] !== value;
        if (!hasBindChanged) {
            return;
        }
        if (bindKind === Binding.EVENT) {
            part.element.removeEventListener(bindName, this.oldBinds[bind]);
        }
        this.handleNewBind(part, bindName, value, bindKind);
        return;
    }
    handleNewBind(part, bindName, value, bindKind) {
        switch (bindKind) {
            case Binding.ATTRIBUTE:
                part.element.setAttribute(bindName, value);
                break;
            case Binding.PROPERTY:
                part.element[bindName] = value;
                break;
            case Binding.BOOLEAN_ATTRIBUTE:
                part.element.toggleAttribute(bindName, !!value);
                break;
            case Binding.EVENT:
                part.element.addEventListener(bindName, value);
                break;
        }
    }
    handleRemovedBind(part, bindName, value, bindKind) {
        switch (bindKind) {
            case Binding.ATTRIBUTE:
            case Binding.BOOLEAN_ATTRIBUTE:
                part.element.removeAttribute(bindName);
                break;
            case Binding.EVENT:
                part.element.removeEventListener(bindName, value);
                break;
            case Binding.PROPERTY:
                break;
        }
    }
    parseBind(bind) {
        const firstChar = bind[0];
        switch (firstChar) {
            case '@':
                return [Binding.EVENT, bind.slice(1)];
            case '.':
                return [Binding.PROPERTY, bind.slice(1)];
            case '?':
                return [Binding.BOOLEAN_ATTRIBUTE, bind.slice(1)];
            default:
                return [Binding.ATTRIBUTE, bind];
        }
    }
    render(binds) {
        this.oldBinds = Object.assign({}, binds);
    }
}
export const spread = directive(Spread);
//# sourceMappingURL=spread_directive.js.map