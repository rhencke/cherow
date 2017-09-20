import { Context } from './masks';
import { Parser } from './parser';

// https://tc39.github.io/ecma262/#sec-modules
export function parseModule(sourceText: string, options: any = {}) {
    return new Parser(sourceText, options).parseModule(Context.Strict | Context.Module);
}

// https://tc39.github.io/ecma262/#sec-scripts
export function parseScript(sourceText: string, options: any = {}) {
    return new Parser(sourceText, options).parseScript(Context.None);
}