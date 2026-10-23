import { Directive, DirectiveParameters, ElementPart, PartInfo } from 'lit/directive.js';
declare const Binding: {
    ATTRIBUTE: "ATTRIBUTE";
    PROPERTY: "PROPERTY";
    BOOLEAN_ATTRIBUTE: "BOOLEAN_ATTRIBUTE";
    EVENT: "EVENT";
};
type Binding = keyof typeof Binding;
declare class Spread extends Directive {
    oldBinds: {
        [bind: string]: unknown;
    };
    constructor(info: PartInfo);
    update(part: ElementPart, [binds]: DirectiveParameters<this>): void;
    handleExistingBind(part: ElementPart, bind: string, bindName: string, value: unknown, bindKind: Binding): void;
    handleNewBind(part: ElementPart, bindName: string, value: unknown, bindKind: Binding): void;
    handleRemovedBind(part: ElementPart, bindName: string, value: unknown, bindKind: Binding): void;
    parseBind(bind: string): [Binding, string];
    render(binds: {
        [bind: string]: unknown;
    }): void;
}
export declare const spread: (binds: {
    [bind: string]: unknown;
}) => import("lit-html/directive.js").DirectiveResult<typeof Spread>;
export type { Spread };
