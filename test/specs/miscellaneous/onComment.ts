import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Miscellaneous - onComment', () => {
    let commentType: string = '';
    let commentBody: string = '';
    let commentStart: number = 0;
    let commentEnd: number = 0;

    it('should collect "<!-- HTML comment"', () => {
        expect(parseScript('<!-- HTML comment', {
            ranges: true,
            raw: true,
            comments: (type: string, comment: string, start: number, end: number) => {
                commentType = type;
                commentBody = comment;
                commentStart = start;
                commentEnd = end;
            }
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 17,
            "body": [],
            "sourceType": "script"
        });

        expect(commentType).to.eql('SingleLineComment');
        expect(commentBody).to.eql(' HTML comment');
        expect(commentStart).to.eql(0);
        expect(commentEnd).to.eql(17);
    });

    it('should collect "// Cherow"', () => {
        expect(parseScript('// Cherow', {
            ranges: true,
            raw: true,
            comments: (type: string, comment: string, start: number, end: number) => {
                commentType = type;
                commentBody = comment;
                commentStart = start;
                commentEnd = end;
            }
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 9,
            "body": [],
            "sourceType": "script"
        });

        expect(commentType).to.eql('SingleLineComment');
        expect(commentBody).to.eql(' Cherow');
        expect(commentStart).to.eql(0);
        expect(commentEnd).to.eql(9);
    });

    it('should collect "/* ABC */ function() {} /* DEF */"', () => {
        const foo: any[] = [];
        expect(parseScript('/* ABC */ function abc() {} /* DEF */', {
            ranges: true,
            raw: true,
            comments: foo
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 37,
            "body": [{
                "type": "FunctionDeclaration",
                "start": 10,
                "end": 27,
                "id": {
                    "type": "Identifier",
                    "start": 19,
                    "end": 22,
                    "name": "abc"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "start": 25,
                    "end": 27,
                    "body": []
                }
            }],
            "sourceType": "script"
        });

        expect(foo.length).to.eql(2);
        expect(foo[0].type).to.eql('MultiLineComment');
        expect(foo[1].type).to.eql('MultiLineComment');
        expect(foo[0].value).to.eql(' ABC ');
        expect(foo[1].value).to.eql(' DEF ');
        expect(foo[0].start).to.eql(0);
        expect(foo[1].end).to.eql(37);
    });


    it('should collect "/* Hello multiline comment, are you colleced yet? */"', () => {
        expect(parseScript('/* Hello multiline comment, are you colleced yet? */', {
            ranges: true,
            raw: true,
            comments: (type: string, comment: string, start: number, end: number) => {
                commentType = type;
                commentBody = comment;
                commentStart = start;
                commentEnd = end;
            }
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 52,
            "body": [],
            "sourceType": "script"
        });

        expect(commentType).to.eql('MultiLineComment');
        expect(commentBody).to.eql(' Hello multiline comment, are you colleced yet? ');
        expect(commentStart).to.eql(0);
        expect(commentEnd).to.eql(52);
    });
});