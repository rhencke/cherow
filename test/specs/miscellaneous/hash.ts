import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Miscellaneous - Hash', () => {

    it('should skip shebang + LF in an otherwise empty source', () => {
        expect(parseScript('#!/foo/bar/baz -abc\n', {
            ranges: true,
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 20,
            "body": [],
            "sourceType": "script"
        });
    });

    it('should skip shebang + LF before an identifier', () => {
        expect(parseScript('#!/foo/bar/baz -abc\nfoo', {
            ranges: true,
        })).to.eql({
            "body": [{
                "end": 23,
                "expression": {
                    "end": 23,
                    "name": "foo",
                    "start": 20,
                    "type": "Identifier",
                },
                "start": 20,
                "type": "ExpressionStatement",
            }, ],
            "end": 23,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should skip shebang + LF before a lone exclamation', () => {
        expect(parseScript('#!/foo/bar/baz -abc\n! foo', {
            ranges: true,
        })).to.eql({
            "body": [{
                "end": 25,
                "expression": {
                    "argument": {
                        "end": 25,
                        "name": "foo",
                        "start": 22,
                        "type": "Identifier",
                    },
                    "end": 25,
                    "operator": "!",
                    "prefix": true,
                    "start": 20,
                    "type": "UnaryExpression",
                },
                "start": 20,
                "type": "ExpressionStatement",
            }, ],
            "end": 25,
            "sourceType": "script",
            "start": 0,
            "type": "Program",
        });
    });


    it('should skip shebang + CR in an otherwise empty source', () => {
        expect(parseScript('#!/foo/bar/baz -abc\r', {
            ranges: true,
        })).to.eql({
            "body": [],
            "end": 20,
            "sourceType": "script",
            "start": 0,
            "type": "Program",
        });
    });
});