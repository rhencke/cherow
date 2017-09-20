import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Punctuators', () => {
    it('should fail if {} used as Unicode \u007B\u007D"', () => {
        expect(() => {
            parseScript('\\u007B\\u007D;');
        }).to.throw();
    });
    it('should fail if /  used as Unicode \u002F"', () => {
        expect(() => {
            parseScript('1\\u002F2;');
        }).to.throw();
    });
    it('should fail if () used as Unicode \\u00281\\u0029;"', () => {
        expect(() => {
            parseScript('\\u00281\\u0029;');
        }).to.throw();
    });
    it('should fail if /  used as Unicode \\u002F"', () => {
        expect(() => {
            parseScript('1\\u002F2;');
        }).to.throw();
    });
    it('should fail if [] used as Unicode \\u005B\\u005D;"', () => {
        expect(() => {
            parseScript('\\u005B\\u005D;');
        }).to.throw();
    });
    it('should fail if ,  used as Unicode \\u002C2;"', () => {
        expect(() => {
            parseScript('1\\u002C2;');
        }).to.throw();
    });
    it('should fail if +  used as Unicode \\u002B2;"', () => {
        expect(() => {
            parseScript('1\\u002B2;');
        }).to.throw();
    });
    it('should fail if *  used as Unicode \\u002A2;"', () => {
        expect(() => {
            parseScript('1\\u002A2;');
        }).to.throw();
    });
});