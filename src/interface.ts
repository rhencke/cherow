import { Flags } from './masks';
import { Token } from './token';
import { Comment } from './estree';

export interface ParserOptions {
    next?: boolean;
    ranges?: boolean;
    locations?: boolean;
    onComment?: boolean;
    loc?: boolean;
    raw?: boolean;
    jsx?: boolean;
}

export interface SavedState {
    index: number;
    column: number;
    line: number;
    token: Token;
    tokenValue: any;
    flags: Flags;
    tokenRegExp: any;
    tokenRaw: any;
}

export interface ErrorLocation {
    index: number;
    line: number;
    column: number;
}

export interface Location {
    start: number;
    line: number;
    column: number;
}

/**
 * The type of the `onComment` option.
 */
export type OnComment = void | Comment[] | (
    (type: string, value: string, start: number, end: number) => any
);