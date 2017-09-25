import { Context } from './masks';
import { Parser } from './parser';
import { ParserOptions } from './interface';

export function parseModule(sourceText: string, options: ParserOptions = {}) {
    return new Parser(sourceText, options).parseModule(Context.Strict | Context.Module);
}

export function parseScript(sourceText: string, options: ParserOptions = {}) {
    return new Parser(sourceText, options).parseScript(Context.None);
}

export function parseJSX(sourceText: string, options: ParserOptions = { jsx: true }) {
    return new Parser(sourceText, options).parseScript(Context.None);
}