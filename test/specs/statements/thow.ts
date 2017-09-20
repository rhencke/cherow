import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Statements - Throw', () => {

    it('expect "throw \n12" to throw', () => {
        expect(() => {
            parseScript(`throw \n12`);
        }).to.throw();
    });

    it('expect "throw ?" to throw', () => {
        expect(() => {
            parseScript(`throw ?`);
        }).to.throw();
    });
});