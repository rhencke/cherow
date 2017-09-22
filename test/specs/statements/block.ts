import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Statement - Block', () => {

    it('should fail if BlockStatement exist inside of expression', () => {
        expect(() => { parseScript(`y={__func;}();`)}).to.throw();
    });

    it('should fail if BlockStatement exist inside of expression', () => {
        expect(() => { parseScript(`y={x;};`)}).to.throw();
    });
});