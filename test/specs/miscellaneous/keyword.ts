import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Keyword', () => {

    it('should fail on invalid use of if in binding context', () => {
        expect(() => {
            parseScript(`for = 1;`);
        }).to.throw();
    });

    it('should fail on invalid use of do in binding context', () => {
        expect(() => {
            parseScript(`do = 1;`);
        }).to.throw();
    });

    it('should fail on invalid use of in in binding context', () => {
        expect(() => {
            parseScript(`in = 1;`);
        }).to.throw();
    });

    it('should fail on invalid use of new in binding context', () => {
        expect(() => {
            parseScript(`new = 1;`);
        }).to.throw();
    });

    it('should fail on invalid use of else in binding context', () => {
        expect(() => {
            parseScript(`else = 1;`);
        }).to.throw();
    });

    it('should fail on invalid use of function in binding context', () => {
        expect(() => {
            parseScript(`function = 1;`);
        }).to.throw();
    });

    it('should fail on invalid use of delete in binding context', () => {
        expect(() => {
            parseScript(`delete = 1;`);
        }).to.throw();
    });

    it('should fail on invalid use of break in binding context', () => {
        expect(() => {
            parseScript(`break = 1;`);
        }).to.throw();
    });

    it('should fail on invalid use of catch in binding context', () => {
        expect(() => {
            parseScript(`catch = 1;`);
        }).to.throw();
    });

    it('should fail on invalid use of continue in binding context', () => {
        expect(() => {
            parseScript(`continue = 1;`);
        }).to.throw();
    });

    it('should fail on invalid use of delete in binding context', () => {
        expect(() => {
            parseScript(`delete = 1;`);
        }).to.throw();
    });

    it('should fail on invalid use of finally in binding context', () => {
        expect(() => {
            parseScript(`finally = 1;`);
        }).to.throw();
    });

    it('should fail on invalid use of for in binding context', () => {
        expect(() => {
            parseScript(`for = 1;`);
        }).to.throw();
    });

    it('should fail on invalid use of instanceof in binding context', () => {
        expect(() => {
            parseScript(`instanceof = 1;`);
        }).to.throw();
    });

    it('should fail on invalid use of default in binding context', () => {
        expect(() => {
            parseScript(`default = 1;`);
        }).to.throw();
    });

    it('should fail on invalid use of continue in binding context', () => {
        expect(() => {
            parseScript(`continue = 1;`);
        }).to.throw();
    });

    it('should fail on invalid use of return in binding context', () => {
        expect(() => {
            parseScript(`return = 1;`);
        }).to.throw();
    });

    it('should fail on invalid use of this', () => {
        expect(() => {
            parseScript(`({this});`);
        }).to.throw();
    });

    it('should fail on "\\u0069\\u{66} (1) {}"', () => {
        expect(() => {
            parseModule(`\\u0069\\u{66} (1) {}`);
        }).to.throw();
    });
});