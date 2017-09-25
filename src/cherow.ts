import { Context } from './masks';
import { Parser } from './parser';
import { Options } from './interface';

export function parseModule(sourceText: string, options?: Options) {
    return new Parser(sourceText, options).parseModule(Context.Strict | Context.Module);
}

export function parseScript(sourceText: string, options?: Options) {
    return new Parser(sourceText, options).parseScript(Context.None);
}