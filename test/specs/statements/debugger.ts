import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Statements - Debugger', () => {

    it('should fail if the `debugger` token occupy an expression position', () => {
        expect(() => {
            parseScript(`(debugger);`);
        }).to.throw();
    });

    it('should parse "debugger;"', () => {
        expect(parseScript('debugger;', {
            ranges: true
        })).to.eql({
            "body": [{
                "end": 9,
                "start": 0,
                "type": "DebuggerStatement"
            }],
            "end": 9,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });
});