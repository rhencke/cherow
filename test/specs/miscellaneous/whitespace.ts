import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Whitespace', () => {

        it('should skip multi line comment with space', () => {
            expect(parseScript(`/*\u0020 multi line \u0020 comment \u0020*/`, {
                ranges: true,
                
            })).to.eql({
                "body": [],
                "end": 28,
                "sourceType": "script",
                "start": 0,
                "type": "Program"
            })
        });

        it('should skip multi line comment with no-break space', () => {
            expect(parseScript(`/*\u00A0 multi line \u00A0 comment \u00A0 */`, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 29,
                "start": 0,
                "body": [],
                "sourceType": "script"
            })
        });

        it('should skip multi line comment with form feed', () => {
            expect(parseScript(`/*\u000C multi line \u000C comment \u000C*/`, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 28,
                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip multi line comment with vertical tab', () => {
            expect(parseScript(`/*multilinecommentx = 1;*/`, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 30,
                "start": 0,
                "body": [],
                "sourceType": "script"
            })
        });

        it('should skip multi line comment with horizontal tab', () => {
            expect(parseScript(`/*\u0009 multi line \u0009 comment \u0009*/`, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 28,
                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip single line comment with space', () => {
            expect(parseScript(`// single line comment `, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 23,
                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip single line comment with horizontal vertical tab', () => {
            expect(parseScript(`//\u0009 single line \u0009 comment \u0009 `, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 28,
                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip single line comments with carriage return', () => {
            expect(parseScript(`  \t // foo bar\r  `, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 17,
                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip single line comments with Windows newlines', () => {
            expect(parseScript(`  \t // foo bar\r\n  `, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 18,
                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip multiline comments with nothing', () => {
            expect(parseScript(`  \t /* foo * /* bar */  `, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 24,
                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });



        it('should skip multiple single line comments with line feed', () => {
            expect(parseScript(`  \t // foo bar\n // baz \n //`, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 27,
                "start": 0,
                "body": [],
                "sourceType": "script"
            })
        });

        it('should skip multiple multiline comments with Windows newlines', () => {
            expect(parseScript(`  \t /* foo bar\r\n *//* baz*/ \n /**/`, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 34,
                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip multi line comment with space', () => {
            expect(parseScript(`/*\u0020 multi line \u0020 comment \u0020*/`, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 28,
                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip multi line comment with space', () => {
            expect(parseScript(`/*\u0020 multi line \u0020 comment \u0020*/`, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 28,

                "body": [],
                "start": 0,
                "sourceType": "script"

            })
        });

        it('should skip multi line comment with no-break space', () => {
            expect(parseScript(`/*\u00A0 multi line \u00A0 comment \u00A0 */`, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 29,

                "body": [],
                "start": 0,
                "sourceType": "script"

            })
        });

        it('should skip multi line comment with form feed', () => {
            expect(parseScript(`/*\u000C multi line \u000C comment \u000C*/`, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 28,

                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it.skip('should skip multi line comment with vertical tab', () => {
            expect(parseScript(`/*multilinecommentx = 1;*/`, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 28,

                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip multi line comment with horizontal tab', () => {
            expect(parseScript(`/*\u0009 multi line \u0009 comment \u0009*/`, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 28,

                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip single line comment with space', () => {
            expect(parseScript(`// single line comment `, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 23,

                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip single line comment with horizontal vertical tab', () => {
            expect(parseScript(`//\u0009 single line \u0009 comment \u0009 `, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 28,

                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it.skip('should skip single line comments with carriage return', () => {
            expect(parseScript(`  \t // foo bar\r  `, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "body": [],
                "sourceType": "script"
            })
        });

        it('should skip single line comments with Windows newlines', () => {
            expect(parseScript(`  \t // foo bar\r\n  `, {
                ranges: true,
                
            })).to.eql({
                "body": [],
                "end": 18,

                "sourceType": "script",
                "start": 0,
                "type": "Program"
            })
        });

        it('should skip multi line comment with form feed', () => {
            expect(parseScript(`/*\u000C multi line \u000C comment \u000C*/`, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 28,

                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip multi line comment with vertical tab', () => {
            expect(parseScript(`/*multilinecommentx = 1;*/`, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 30,

                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip multi line comment with horizontal tab', () => {
            expect(parseScript(`/*\u0009 multi line \u0009 comment \u0009*/`, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 28,

                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip single line comment with space', () => {
            expect(parseScript(`// single line comment `, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 23,

                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip single line comment with horizontal vertical tab', () => {
            expect(parseScript(`//\u0009 single line \u0009 comment \u0009 `, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 28,

                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip single line comments with carriage return', () => {
            expect(parseScript(`  \t // foo bar\r  `, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 17,

                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip single line comments with Windows newlines', () => {
            expect(parseScript(`  \t // foo bar\r\n  `, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 18,

                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip multiple single line comments with line feed', () => {
            expect(parseScript(`  \t // foo bar\n // baz \n //`, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 27,

                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip multiline comments with nothing', () => {
            expect(parseScript(`  \t /* foo * /* bar */  `, {
                ranges: true,
                

            })).to.eql({
                "type": "Program",
                "end": 24,

                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip multiple multiline comments with Windows newlines', () => {
            expect(parseScript(`  \t /* foo bar\r\n *//* baz*/ \n /**/`, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 34,

                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip multiple multiline comments with paragraph separators', () => {
            expect(parseScript(`  \t /* foo bar\u2029 *//* baz*/ \n /**/`, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 33,

                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip multiple multiline comments with line feed', () => {
            expect(parseScript(`  \t /* foo bar\n *//* baz*/ \n /**/`, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 33,

                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip multiple single line comments with paragraph separators', () => {
            expect(parseScript(`  \t // foo bar\u2029 // baz \n //`, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 27,

                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip spaces', () => {
            expect(parseScript(`        `, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 8,

                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });


        it('should skip spaces', () => {
            expect(parseScript(`        `, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 8,

                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip tabs', () => {
            expect(parseScript(`\t\t\t\t\t\t\t\t`, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 8,

                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip vertical tabs', () => {
            expect(parseScript(`\v\v\v\v\v\v\v\v`, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 8,

                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip line feeds', () => {
            expect(parseScript(`\n\n\n\n\n\n\n\n`, {
                ranges: true,
                
            })).to.eql({
                "end": 8,
                "type": "Program",

                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip carriage returns', () => {
            expect(parseScript(`\r\r\r\r\r\r\r\r`, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",

                "start": 0,
                "end": 8,
                "body": [],
                "sourceType": "script"
            })
        });

        it('should skip Windows newlines', () => {
            expect(parseScript(`\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n`, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "body": [],
                "end": 16,

                "sourceType": "script",
                "start": 0
            })
        });

        it('should skip nothing', () => {
            expect(parseScript(``, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "body": [],
                "end": 0,

                "sourceType": "script",
                "start": 0
            })
        });

        it('should skip mixed whitespace', () => {
            expect(parseScript(`    \t \r\n \n\r \v\f\t `, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "body": [],
                "end": 16,

                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip line separators', () => {
            expect(parseScript(`\u2028\u2028\u2028\u2028\u2028\u2028\u2028\u2028`, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "body": [],
                "end": 8,

                "sourceType": "script",
                "start": 0
            })
        });

        it('should skip paragraph separators', () => {
            expect(parseScript(`\u2029\u2029\u2029\u2029\u2029\u2029\u2029\u2029`, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "body": [],
                "end": 8,

                "sourceType": "script",
                "start": 0
            })
        });

        it('should skip paragraph separators', () => {
            expect(parseScript(`\u2029\u2029\u2029\u2029\u2029\u2029\u2029\u2029`, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "body": [],
                "end": 8,

                "sourceType": "script",
                "start": 0
            })
        });

        it('should skip HTML single line comments with \n', () => {
            expect(parseScript(`  \t <!-- foo bar\n  `, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 19,
                "body": [],
                "sourceType": "script"
            })
        });

        it('should skip HTML single line comments with \n', () => {
            expect(parseScript(`  \t <!-- foo bar\n  `, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",

                "start": 0,
                "end": 19,
                "body": [],
                "sourceType": "script"
            })
        });

        it('should skip HTML single line comments with \r', () => {
            expect(parseScript(`  \t <!-- foo bar\r  `, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",

                "start": 0,
                "end": 19,
                "body": [],
                "sourceType": "script"
            })
        });
        it('should skip HTML single line comments with \r', () => {
            expect(parseScript(`  \t \r   --> the comment extends to these characters\r `, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",

                "start": 0,
                "end": 53,
                "body": [],
                "sourceType": "script"
            })
        });

        it('should skip HTML single line comments with \n', () => {
            expect(parseScript(`  \t <!-- foo bar\n  `, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",

                "start": 0,
                "end": 19,
                "body": [],
                "sourceType": "script"
            })
        });

        it('should skip HTML single line comments with \r', () => {
            expect(parseScript(`  \t <!-- foo bar\r  `, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 19,
                "body": [],
                "sourceType": "script"
            })
        });

        it('should skip HTML single line comments with \r', () => {
            expect(parseScript(`  \t \r   --> the comment extends to these characters\r `, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 53,
                "body": [],
                "sourceType": "script"
            })
        });
});