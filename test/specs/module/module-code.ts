import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';
const expect = chai.expect;

describe('TC39 - Module code', () => {
        it('should fail if duplicate label', () => {
            expect(() => {
                parseModule('label: { label: 0; }');
            }).to.throw();
        });
        it('should fail if duplicate lexical declared names', () => {
            expect(() => {
                parseModule('let x; const x;');
            }).to.throw('');
        });
        it('should fail if any element is a duplicat declaration', () => {
            expect(() => {
                parseModule('let x; var x;');
            }).to.throw();
        });
        it('should fail if module item list contains new target', () => {
            expect(() => {
                parseModule('new.target;');
            }).to.throw();
        });
        it('should fail if ContainsUndefinedBreakTarget of ModuleItemList with argument « » is true', () => {
            expect(() => {
                parseModule('while (false) { break undef; }');
            }).to.throw();
        });
        it('should fail f ContainsUndefinedContinueTarget of ModuleItemList with arguments « » and « » is true"', () => {
            expect(() => {
                parseModule('while (false) { continue undef; }');
            }).to.throw();
        });

        it('should fail if imported binding is a binding identifier and contain "eval"', () => {
            expect(() => {
                parseModule('import { eval } from "./early-import-eval.js";');
            }).to.throw();
        });

        it('should fail if imported binding is a binding identifier and contain "eval"', () => {
            expect(() => {
                parseModule('import { eval } from "./early-import-eval.js";');
            }).to.throw();
        });

        it('should fail if early strict mode', () => {
            expect(() => {
                parseModule(`var public;`);
            }).to.throw();
        });
    });