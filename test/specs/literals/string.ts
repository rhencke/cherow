import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';
const expect = chai.expect;

describe('TC39 - String literals', () => {

    it('should fail on "\\u{g0g}"', () => {
        expect(() => {
            parseScript(`'\\u{g0g}'`)
        }).to.throw();
    });
    it('should fail on "\\u{g}"', () => {
        expect(() => {
            parseScript(`'\\u{g}'`)
        }).to.throw();
    });
    it('should fail on "\\u{g0}"', () => {
        expect(() => {
            parseScript(`'\\u{g0}'`)
        }).to.throw();
    });
    it('should fail on "\\u{0g}"', () => {
        expect(() => {
            parseScript(`'\\u{0g}'`)
        }).to.throw();
    });
    it('should fail on "\\u{0g0}"', () => {
        expect(() => {
            parseScript(`'\\u{0g0}'`)
        }).to.throw();
    });
    it('should fail on "\\u{g0g}"', () => {
        expect(() => {
            parseScript(`'\\u{g0g}'`)
        }).to.throw();
    });
    it('should fail on "\\u{110000}"', () => {
        expect(() => {
            parseScript(`'\\u{110000}`)
        }).to.throw();
    });
    it('should fail on "\\u{11ffff}"', () => {
        expect(() => {
            parseScript(`'\\u{11ffff}`)
        }).to.throw();
    });

    it('should fail on "\\x0g"', () => {
        expect(() => {
            parseScript(`'\\x0g`)
        }).to.throw();
    });
    it('should fail on "\\xg0"', () => {
        expect(() => {
            parseScript(`'\\xg0`)
        }).to.throw();
    });
    it('should fail on "\\xgg"', () => {
        expect(() => {
            parseScript(`'\\xgg`)
        }).to.throw();
    });
    it('should fail on "\\xfg"', () => {
        expect(() => {
            parseScript(`'\\xfg`)
        }).to.throw();
    });

    it('should fail on invalid newlines', () => {
        expect(() => {
            parseScript(`'foo\nnewline'`)
        }).to.throw();
    });
    it('should fail on invalid carriage returns', () => {
        expect(() => {
            parseScript(`'foo\rnewline'`)
        }).to.throw();
    });
    it('should fail on invalid Windows newlines', () => {
        expect(() => {
            parseScript(`foo\r\nnewline'`)
        }).to.throw();
    });
    it('should fail on invalid line separators', () => {
        expect(() => {
            parseScript(`'foo\u2028newline'`)
        }).to.throw();
    });
    it('should fail on invalid paragraph separators', () => {
        expect(() => {
            parseScript(`'foo\u2029newline'`)
        }).to.throw();
    });
    it('should fail on invalid newlines after null escapes', () => {
        expect(() => {
            parseScript(`'foo\\0\nnewline'`)
        }).to.throw();
    });
    it('should fail on invalid carriage returns  after null escapes', () => {
        expect(() => {
            parseScript(`'foo\\0\nnewline'`)
        }).to.throw();
    });
    it('should fail on invalid Windows  after null escapes', () => {
        expect(() => {
            parseScript(`'foo\\0\r\nnewline'`)
        }).to.throw();
    });
    it('should fail on invalid line separators after null escapes', () => {
        expect(() => {
            parseScript(`'foo\\0\nu2028ewline'`)
        }).to.throw();
    });
    it('should fail on invalid paragraph separators after null escapes', () => {
        expect(() => {
            parseScript(`'foo\\0\u2029newline'`)
        }).to.throw();
    });
    it('should fail on invalid carriage returns after legacy octal escapes', () => {
        expect(() => {
            parseScript(`'foo\\12\nnewline'`)
        }).to.throw();
    });
    it('should fail on invalid paragraph separators after ASCII', () => {
        expect(() => {
            parseScript(`'foo\\x\u2029newline'`)
        }).to.throw();
    });
    it('should fail on invalid paragraph separators after ASCII \\x0', () => {
        expect(() => {
            parseScript(`'foo\\x0\u2029newline'`)
        }).to.throw();
    });
    it('should fail on invalid newlines after Unicode \\u0', () => {
        expect(() => {
            parseScript(`'foo\\u0\nnewline'`)
        }).to.throw();
    });
    it('should fail on invalid Windows newlines after Unicode \\u00', () => {
        expect(() => {
            parseScript(`'foo\\u00\r\nnewline'`)
        }).to.throw();
    });
    it('should fail on invalid line separators after Unicode \\u0a', () => {
        expect(() => {
            parseScript(`'foo\\u0a\u2028newline'`)
        }).to.throw();
    });

    it('should fail on invalid newlines after Unicode \\u{0', () => {
        expect(() => {
            parseScript(`'foo\\u{0\nnewline'`)
        }).to.throw();
    });
    it('should fail on invalid line separators after Unicode \\u{a', () => {
        expect(() => {
            parseScript(`foo\\u{a\u2028newline'`)
        }).to.throw();
    });
    it('should fail on invalid space after ASCII \\x', () => {
        expect(() => {
            parseScript(`'foo\\x bar'`)
        }).to.throw();
    });
    it('should fail on invalid space after Unicode \\u0', () => {
        expect(() => {
            parseScript(`'foo\\u0 bar'`)
        }).to.throw();
    });
    it('should fail on invalid space after Unicode \\ua', () => {
        expect(() => {
            parseScript(`'foo\\ua bar'`)
        }).to.throw();
    });
    it('should fail on invalid space after Unicode \\u00', () => {
        expect(() => {
            parseScript(`'foo\\u00 bar'`)
        }).to.throw();
    });
    it('should fail on invalid space after Unicode \\u0a', () => {
        expect(() => {
            parseScript(`'foo\\u0a bar'`)
        }).to.throw();
    });
    it('should fail on invalid space after Unicode \\u{', () => {
        expect(() => {
            parseScript(`'foo\\u{ bar'`)
        }).to.throw();
    });
    it('should fail on invalid space after Unicode \\u{0', () => {
        expect(() => {
            parseScript(`'foo\\u{0 bar'`)
        }).to.throw();
    });
    it('should fail on invalid space after Unicode \\u{a', () => {
        expect(() => {
            parseScript(`'foo\\u{a bar'`)
        }).to.throw();
    });
    it('should fail on invalid \\ after ASCII \\x', () => {
        expect(() => {
            parseScript(`'foo\\x bar'`)
        }).to.throw();
    });
    it('should fail on invalid \\ after ASCII \\x0', () => {
        expect(() => {
            parseScript(`'foo\\x0 bar'`)
        }).to.throw();
    });
    it('should fail on invalid \\ after ASCII \\u0', () => {
        expect(() => {
            parseScript(`'foo\\u0 bar'`)
        }).to.throw();
    });
    it('should fail on invalid \\ after ASCII \\u{a', () => {
        expect(() => {
            parseScript(`'foo\\u{a bar'`)
        }).to.throw();
    });
    it('should fail on invalid x after Unicode \\u00', () => {
        expect(() => {
            parseScript(`'foo\\u00x bar'`)
        }).to.throw();
    });
    it('should fail on invalid x after Unicode \\u{a', () => {
        expect(() => {
            parseScript(`'foo\\u{ax bar'`)
        }).to.throw();
    });
    it('should fail on invalid X after Unicode \\u{0', () => {
        expect(() => {
            parseScript(`'foo\\u{0X bar'`)
        }).to.throw();
    });
    it('should fail on invalid u after Unicode \\u000', () => {
        expect(() => {
            parseScript(`'foo\\u000u bar'`)
        }).to.throw();
    });
    it('should fail on invalid u after Unicode \\u{a', () => {
        expect(() => {
            parseScript(`'foo\\u{au bar'`)
        }).to.throw();
    });
    it('should fail on invalid u after Unicode \\u00a', () => {
        expect(() => {
            parseScript(`'foo\\u00au bar'`)
        }).to.throw();
    });
    it('should fail on invalid u after Unicode \\u{', () => {
        expect(() => {
            parseScript(`'foo\\u{u bar'`)
        }).to.throw();
    });
    it('should fail on invalid U after Unicode \\u000', () => {
        expect(() => {
            parseScript(`'foo\\u000U bar'`)
        }).to.throw();
    });
    it('should fail on invalid U after Unicode \\u{a', () => {
        expect(() => {
            parseScript(`'foo\\u{aU bar'`)
        }).to.throw();
    });
    it('should fail on invalid  { after Unicode \\u0', () => {
        expect(() => {
            parseScript(`'foo\\u0{ bar'`)
        }).to.throw();
    });
    it('should fail on invalid { after Unicode \\u{a', () => {
        expect(() => {
            parseScript(`'foo\\u{a{ bar'`)
        }).to.throw();
    });
    it('should fail on invalid } after ASCII \\x', () => {
        expect(() => {
            parseScript(`'foo\\x} bar'`)
        }).to.throw();
    });
    it('should fail on invalid } after Unicode \\u000', () => {
        expect(() => {
            parseScript(`'foo\\u000} bar'`)
        }).to.not.throw();
    });
    it('should fail on invalid } after Unicode \\u00a', () => {
        expect(() => {
            parseScript(`'foo\\u00a} bar'`)
        }).to.not.throw();
    });
    it('should fail on invalid } after Unicode \\u{', () => {
        expect(() => {
            parseScript(`'foo\\u{} bar'`)
        }).to.throw();
    });

    it('should fail  on invalid hex', () => {
        expect(() => {
            parseModule(`'\\xFG'`)
        }).to.throw();
    });

    it('should fail  on invalid hex', () => {
        expect(() => {
            parseScript(`'\\xFG'`)
        }).to.throw();
    });


    it('should fail  if missing single quote in module code', () => {
        expect(() => {
            parseModule(`'`)
        }).to.throw('Unterminated string literal');
    });

    it('should fail on "Hello\nworld"', () => {
        expect(() => {
            parseScript(`"Hello\nworld"`)
        }).to.throw('Unterminated string literal');
    });

    it('should fail on "\n\r\t\v\b\f\\\'\"\0"', () => {
        expect(() => {
            parseScript(`"\n\r\t\v\b\f\\\'\"\0"`)
        }).to.throw('Unterminated string literal');
    });

    it('should fail  if missing single quote in module sloppy mode', () => {
        expect(() => {
            parseScript(`'`)
        }).to.throw('Unterminated string literal');
    });

    it('should fail  if missing single quote in module sloppy mode with line break', () => {
        expect(() => {
            parseScript(`'
            '`)
        }).to.throw('Unterminated string literal');
    });

    it('should fail  on "\08" in strict mode', () => {
        expect(() => {
            parseModule(`"\\08"`)
        }).to.not.throw();
    });

    it('should fail  on early grammar error: 11.8.4.1 - "\\u{110000}"', () => {
        expect(() => {
            parseScript(`"\\u{110000}"`)
        }).to.throw();
    });

    it('should fail  on early grammar error: 11.8.4.1 - "\\u{FFFFFFF}"', () => {
        expect(() => {
            parseScript(`"\\u{FFFFFFF}"`)
        }).to.throw();
    });

    it('should fail  on invalid octal literal with using strict directive "\\000"', () => {
        expect(() => {
            parseScript('\'use strict\'; (\'\\000\')', {
                directives: true
            })
        }).to.throw();
    });

    it('should fail  on invalid octal literal with using strict directive "\\000"', () => {
        expect(() => {
            parseScript('"use strict"; (\'\\000\')', {
                directives: true
            })
        }).to.throw();
    });

    it('should fail  on invalid octal literal with using strict directive "\\001"', () => {
        expect(() => {
            parseScript('\'use strict\'; (\'\\001\')')
        }).to.throw();
    });

    it('should fail  on invalid octal literal with using strict directive "\\123"', () => {
        expect(() => {
            parseScript('\'use strict\'; (\'\\123\')')
        }).to.throw();
    });

    it('should fail  on invalid octal literal with using strict directive "\\01"', () => {
        expect(() => {
            parseScript('\'use strict\'; (\'\\01\')')
        }).to.throw();
    });

    it('should fail  on invalid octal literal with using strict directive "\\41"', () => {
        expect(() => {
            parseScript('\'use strict\'; (\'\\41\'')
        }).to.throw();
    });

    it('should fail  on invalid octal literal with using strict directive "\\1"', () => {
        expect(() => {
            parseScript('\'use strict\'; (\'\\1\'')
        }).to.throw();
    });

    it('should fail  on invalid octal literal with using strict directive "\\4"', () => {
        expect(() => {
            parseScript('\'use strict\'; (\'\\4\'')
        }).to.throw();
    });

    it('should fail  on invalid octal literal with using strict directive "\\11"', () => {
        expect(() => {
            parseScript('\'use strict\'; (\'\\11\'\')')
        }).to.throw();
    });

    it('should fail  if missing single quote', () => {
        expect(() => {
            parseModule(`'`)
        }).to.throw('Unterminated string literal');
    });

    it('should fail  on  "\"\\\\\\\"" in strict mode', () => {
        expect(() => {
            parseModule("\"\\\\\\\"")
        }).to.throw();
    });

    it('should fail  on  "\"\\\\\\\"" in sloppy mode', () => {
        expect(() => {
            parseScript("'\\'")
        }).to.throw();
    });

    it('should fail  on   "\"\\1\"" in strict mode', () => {
        expect(() => {
            parseModule("\"\\1\"")
        }).to.throw();
    });

    it('should fail  on "\\x0g" in strict mode', () => {
        expect(() => {
            parseModule("'\\x0g'")
        }).to.throw();
    });

    it('should fail  on "\\xgg" in strict mode', () => {
        expect(() => {
            parseModule("'\\xgg'")
        }).to.throw();
    });

    it('should fail  on "\\x0g" in strict mode', () => {
        expect(() => {
            parseModule("'\\xgg'")
        }).to.throw();
    });

    it('should fail  on "\\xgg" in sloppy mode', () => {
        expect(() => {
            parseScript("'\\xgg'")
        }).to.throw();
    });

    it('should fail  on "\\xfg" in strict mode', () => {
        expect(() => {
            parseModule("'\\x0g'")
        }).to.throw();
    });

    it('should fail  on "\\xfg" in sloppy mode', () => {
        expect(() => {
            parseScript("'\\xgg'")
        }).to.throw();
    });

    it('should fail  on "\\xgg" in sloppy mode', () => {
        expect(() => {
            parseScript("'\\xgg'")
        }).to.throw();
    });

    it('should fail  on "\\xfg" in strict mode', () => {
        expect(() => {
            parseModule("'\\x0g'")
        }).to.throw();
    });

    it('should fail  on "\\xgg" in sloppy mode', () => {
        expect(() => {
            parseScript("'\\xgg'")
        }).to.throw();
    });

    it('should fail  on "\\u00g0" in sloppy mode', () => {
        expect(() => {
            parseScript("'\\u00g0'")
        }).to.throw();
    });

    it('should fail  on "\\u0g00" in strict mode', () => {
        expect(() => {
            parseModule("'\\u0g00'")
        }).to.throw();
    });

    it('should fail  on "\\uAA" in sloppy mode', () => {
        expect(() => {
            parseScript("'\\uAA'")
        }).to.throw();
    });

    it('should fail  on "\\uAAA" in strict mode', () => {
        expect(() => {
            parseModule("'\\uAAA'")
        }).to.throw();
    });

    it('should fail  on "\\052" in strict mode', () => {
        expect(() => {
            parseModule("'\\052'")
        }).to.throw();
    });

    it('should fail  on "\\10 " in strict mode', () => {
        expect(() => {
            parseModule("'\\10 '")
        }).to.throw();
    });

    it('should fail  on "\\16" in strict mode', () => {
        expect(() => {
            parseModule("'\\16'")
        }).to.throw();
    });

    it('should fail  on "\\17 " in strict mode', () => {
        expect(() => {
            parseModule("'\\17 '")
        }).to.throw();
    });

    it('should fail  on "\\30" in strict mode', () => {
        expect(() => {
            parseModule("'\\30'")
        }).to.throw();
    });

    it('should fail  on "\\31 " in strict mode', () => {
        expect(() => {
            parseModule("'\\31 '")
        }).to.throw();
    });

    it('should fail  on "\\37" in strict mode', () => {
        expect(() => {
            parseModule("'\\37'")
        }).to.throw();
    });

    it('should fail  on "\\400 " in strict mode', () => {
        expect(() => {
            parseModule("'\\400 '")
        }).to.throw();
    });

    it('should fail  on "\\43a" in strict mode', () => {
        expect(() => {
            parseModule("'\\43a'")
        }).to.throw();
    });

    it('should fail  on "\\463 " in strict mode', () => {
        expect(() => {
            parseModule("'\\463 '")
        }).to.throw();
    });

    it('should fail  on "\\100abc\\0110def " in strict mode', () => {
        expect(() => {
            parseModule("'\\100abc\\0110def '")
        }).to.throw();
    });

    it('should fail  on "\\463 " in strict mode', () => {
        expect(() => {
            parseModule("'\\463 '")
        }).to.throw();
    });

    it('should fail  on "\\463 " in strict mode', () => {
        expect(() => {
            parseModule("'\\463 '")
        }).to.throw();
    });

    it('should fail  on "\\474 " in strict mode', () => {
        expect(() => {
            parseModule("'\\474 '")
        }).to.throw();
    });

    it('should fail  on "\\77 " in strict mode', () => {
        expect(() => {
            parseModule("'\\77 '")
        }).to.throw();
    });

    it('should fail  on "\\777 " in strict mode', () => {
        expect(() => {
            parseModule("'\\777 '")
        }).to.throw();
    });

    it('should fail  on "\\000 " in strict mode', () => {
        expect(() => {
            parseModule("'\\000 '")
        }).to.throw();
    });

    it('should fail  on "\\001 " in strict mode', () => {
        expect(() => {
            parseModule("'\\001 '")
        }).to.throw();
    });

    it('should fail  on "\\106 " in strict mode', () => {
        expect(() => {
            parseModule("'\\106 '")
        }).to.throw();
    });

    it('should fail  on "\\207 " in strict mode', () => {
        expect(() => {
            parseModule("'\\207 '")
        }).to.throw();
    });

    it('should fail  on "\\377 " in strict mode', () => {
        expect(() => {
            parseModule("'\\377 '")
        }).to.throw();
    })

    it('should fail  on "\\376 " in strict mode', () => {
        expect(() => {
            parseModule("'\\376 '")
        }).to.throw();
    })

    it('should fail  on "a\\4 " in strict mode', () => {
        expect(() => {
            parseModule("'a\\4'")
        }).to.throw();
    })

    it('should fail  on "z\\7" in strict mode', () => {
        expect(() => {
            parseModule('"z\\7"')
        }).to.throw();
    })

    it('should fail  on "\\1\\2\\7" in strict mode', () => {
        expect(() => {
            parseScript("\\1\\2\\7")
        }).to.throw();
    })

    it('should fail  on "\\1" in strict mode', () => {
        expect(() => {
            parseModule('"\\1"')
        }).to.throw();
    })

    it('should fail  on "\\u1" in sloppy mode', () => {
        expect(() => {
            parseScript('"\\u1"')
        }).to.throw();
    })

    it('should fail  on "\\uAAA" in strict mode', () => {
        expect(() => {
            parseModule('"\\uAAA"')
        }).to.throw();
    });

    it('should fail  on "\\uAAA" in sloppy mode', () => {
        expect(() => {
            parseScript('"\\uAAA"')
        }).to.throw();
    });
    // <!-- foo bar -->
    it('should parse "\u0430"', () => {
        expect(parseScript(`"\\u0430"`, {
            ranges: true,
            raw: true,
            directives: true
        })).to.eql({
            "type": "Program",
            "end": 8,
            "start": 0,
            "body": [{
                "type": "ExpressionStatement",
                "end": 8,
                "start": 0,
                "expression": {
                    "type": "Literal",
                    "end": 8,
                    "start": 0,
                    "value": "а",
                    "raw": "\"\\u0430\""
                },
                "directive": "\\u0430"
            }],
            "sourceType": "script"
        })
    });

    it('should parse "\u0430"', () => {
        expect(parseModule(`"\\u0430"`, {
            ranges: true,
            raw: true,
            directives: true
        })).to.eql({
            "type": "Program",
            "end": 8,
            "start": 0,
            "body": [{
                "type": "ExpressionStatement",
                "end": 8,
                "start": 0,
                "expression": {
                    "type": "Literal",
                    "end": 8,
                    "start": 0,
                    "value": "а",
                    "raw": "\"\\u0430\""
                },
                "directive": "\\u0430"
            }],
            "sourceType": "module"
        })
    });

    it('should parse "\u0432"', () => {
        expect(parseScript(`"\\u0432"`)).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Literal",
                    "value": "в"
                }
            }],
            "sourceType": "script"
        })
    });

    it('should parse "\u0432"', () => {
        expect(parseScript(`"\\u0432"`)).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Literal",
                    "value": "в"
                }
            }],
            "sourceType": "script"
        })
    });

    it('should parse "\u0435"', () => {
        expect(parseScript(`"\\u0435"`, {
            
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Literal",
                    "value": "е",
                },
            }],
            "sourceType": "script",
        })
    });

    it('should parse "\u0451"', () => {
        expect(parseScript(`"\\u0451"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "body": [{
                "end": 8,
                "expression": {
                    "end": 8,
                    "raw": "\"\\u0451\"",
                    "start": 0,
                    "type": "Literal",
                    "value": "ё"
                },
                "start": 0,
                "type": "ExpressionStatement"
            }],
            "end": 8,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        })
    });

    it('should parse "\u0431"', () => {
        expect(parseScript(`"\\u0431"`)).to.eql({
            "type": "Program",

            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Literal",
                    "value": "б"
                }
            }],
            "sourceType": "script"
        })
    });

    it('should parse "abc"', () => {
        expect(parseScript("'abc'", {
            ranges: true,
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "expression": {
                    "end": 5,
                    "type": "Literal",
                    "value": "abc",
                    "start": 0,
                },
                "end": 5,
            }],
            "sourceType": "script",
            "start": 0,
            "end": 5,
        });
    });

    it('should parse "123"', () => {
        expect(parseScript("'123'", {
            ranges: true,
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "expression": {
                    "end": 5,
                    "type": "Literal",
                    "value": "123",
                    "start": 0,
                },
                "end": 5,
            }],
            "sourceType": "script",
            "start": 0,
            "end": 5,
        });
    });

    it('should parse mongolian vowel separator', () => {
        expect(parseScript(`"\\u180E"`, {
            
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Literal",
                    "value": "᠎",

                },

            }],
            "sourceType": "script",

        })
    });

    it('should parse mongolian vowel separator', () => {
        expect(parseScript(`"\\u180E"`, {
            
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Literal",
                    "value": "᠎",

                },

            }],
            "sourceType": "script",

        })
    });

    it('should parse "\u0006A"', () => {
        expect(parseScript(`"\\u0006A"`, {
            
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Literal",
                    "value": "\u0006A",
                },
            }],
            "sourceType": "script",
        })
    });

    it('should parse "\x00"', () => {
        expect(parseScript("\"\"", {
            ranges: true,
        })).to.eql({
            "body": [{
                "end": 2,
                "expression": {
                    "end": 2,
                    "start": 0,
                    "type": "Literal",
                    "value": ""
                },
                "start": 0,
                "type": "ExpressionStatement"
            }],
            "end": 2,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse "\x00"', () => {
        expect(parseScript(`"\\x00"`, {
            ranges: true,
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "end": 6,
                "expression": {
                    "end": 6,
                    "start": 0,
                    "type": "Literal",
                    "value": "\u0000",
                },
                "start": 0,
            }],
            "sourceType": "script",
            "end": 6,
            "start": 0,
        })
    });

    it('should parse "\\u{11000}"', () => {
        expect(parseScript(`"\\u{11000}"`, {
            ranges: true,
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "end": 11,
                "start": 0,
                "expression": {
                    "end": 11,
                    "type": "Literal",
                    "value": "𑀀",
                    "start": 0,
                },
            }],
            "sourceType": "script",
            "end": 11,
            "start": 0,
        })
    });

    it('should parse "\u0006A"', () => {
        expect(parseScript(`"\\u0006A"`, {})).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Literal",
                    "value": "\u0006A",
                },
            }],
            "sourceType": "script",
        })
    });

    it('should parse "\"\\0\""', () => {
        expect(parseScript("\"\\0\"", {
            ranges: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "end": 4,
                "start": 0,
                "expression": {
                    "end": 4,
                    "start": 0,
                    "type": "Literal",
                    "value": "\u0000"
                }
            }],
            "end": 4,
            "start": 0,
            "sourceType": "script"
        })
    });

    it('should parse "\"\\7\""', () => {
        expect(parseScript("\"\\7\"", {
            ranges: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "end": 4,
                "start": 0,
                "expression": {
                    "end": 4,
                    "start": 0,
                    "type": "Literal",
                    "value": "\u0007"
                }
            }],
            "end": 4,
            "start": 0,
            "sourceType": "script"
        })
    });

    it('should parse "\"', () => {
        expect(parseScript("'\"'")).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Literal",
                    "value": "\""
                }
            }],
            "sourceType": "script"
        })
    });

    it('should parse "\"\\\"\""', () => {
        expect(parseScript("\"\\\"\"", {})).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Literal",
                    "value": "\"",
                },
            }],
            "sourceType": "script",
        })
    });

    it('should parse "\\f"', () => {
        expect(parseScript('"\\f"', {
            
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Literal",
                    "value": "\f",
                },
            }],
            "sourceType": "script",
        })
    });

    it('should parse "\"\\\\\\\""', () => {
        expect(parseScript("\"\\\\\"", {
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Literal",
                    "value": "\\",
                },
            }],
            "sourceType": "script",
        })
    });

    it('should parse "Hello\\012World"', () => {
        expect(parseScript('"Hello\\012World"', {
            ranges: true
        })).to.eql({
            "body": [{
                "end": 16,
                "expression": {
                    "end": 16,
                    "start": 0,
                    "type": "Literal",
                    "value": "Hello\nWorld"
                },
                "start": 0,
                "type": "ExpressionStatement"
            }],
            "end": 16,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        })
    });

    it('should parse "Hello\\122World"', () => {
        expect(parseScript('"Hello\\122World"')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Literal",
                    "value": "HelloRWorld"
                }
            }],
            "sourceType": "script"
        })
    });

    it('should parse "Hello\\412World"', () => {
        expect(parseScript('"Hello\\412World"')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Literal",
                    "value": "Hello!2World",
                }
            }],
            "sourceType": "script"
        })
    });

    it('should parse "Hello\\712World"', () => {
        expect(parseScript('"Hello\\712World"')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Literal",
                    "value": "Hello92World"
                }
            }],
            "sourceType": "script"
        })
    });

    it('should parse "Hello\\1World"', () => {
        expect(parseScript('"Hello\\1World"')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Literal",
                    "value": "Hello\u0001World"
                }
            }],
            "sourceType": "script"
        })
    });

    it('should parse  HexDigit SingleStringCharacter - "\\x00"', () => {

        expect(parseScript(`"\\x00"`, {
            
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Literal",
                    "value": "\u0000",
                },
            }],
            "sourceType": "script",
        })
    });

    it('should parse  HexDigit SingleStringCharacter - "\\xff"', () => {

        expect(parseScript(`"\\xff"`, {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Literal",
                    "value": "ÿ",
                    "raw": "\"\\xff\"",
                },
            }],
            "sourceType": "script",
        })
    });

    it('should parse  HexDigit SingleStringCharacter - "\\x04C"', () => {

        expect(parseScript(`"\\x04C"`, {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Literal",
                    "value": "\u0004C",
                    "raw": "\"\\x04C\"",
                },
            }],
            "sourceType": "script",
        })
    });

    it('should parse  HexDigit SingleStringCharacter - "\x06A"', () => {

        expect(parseScript(`"\\x06A"`, {
            
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Literal",
                    "value": "\u0006A",
                },
            }],
            "sourceType": "script",
        })
    });

    it('should parse HexDigit SingleStringCharacter - "\\x079"', () => {

        expect(parseScript(`"\\x079"`, {
            
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Literal",
                    "value": "\u00079",
                },
            }],
            "sourceType": "script",
        })
    });

    it('should parse HexDigit SingleStringCharacter - "\x0E2"', () => {

        expect(parseScript(`"\\x0E2"`, {
            
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Literal",
                    "value": "\u000e2",
                },
            }],
            "sourceType": "script",
        })
    });

    it('should parse HexDigit DoubleStringCharacter - "\u0001F"', () => {
        expect(parseScript(`"\\u0001F"`, {
            
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Literal",
                    "value": "\u0001F",
                },
            }],
            "sourceType": "script",
        })
    });

    it('should parse HexDigit DoubleStringCharacter - "\u0002E"', () => {
        expect(parseScript(`"\\u0002E"`, {
            
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Literal",
                    "value": "\u0002E",
                },
            }],
            "sourceType": "script",
        })
    });

    it('should parse HexDigit DoubleStringCharacter - "\u0003D"', () => {
        expect(parseScript(`"\\u0003D"`, {
            
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Literal",
                    "value": "\u0003D",
                },
            }],
            "sourceType": "script",
        })
    });

    it('should parse HexDigit DoubleStringCharacter - "\u000C4"', () => {
        expect(parseScript(`"\\u000C4"`, {
            
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Literal",
                    "value": "\f4",

                },

            }],
            "sourceType": "script",

        })
    });

    it('should parse HexDigit DoubleStringCharacter - "\u00088"', () => {
        expect(parseScript(`"\\u00088"`, {
            
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Literal",
                    "value": "\b8",

                },

            }],
            "sourceType": "script",

        })
    });

    it('should parse HexDigit DoubleStringCharacter - "\u000F1"', () => {
        expect(parseScript(`"\\u000F1"`, {
            
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Literal",
                    "value": "\u000f1",

                },

            }],
            "sourceType": "script",

        })
    });

    it('should parse HexDigit DoubleStringCharacter - "\u{00F8}"', () => {
        expect(parseScript(`"\\u{00F8}"`, {
            
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Literal",
                    "value": "ø",
                },
            }],
            "sourceType": "script",
        })
    });

    it('should parse HexDigit DoubleStringCharacter - "\u{0}"', () => {
        expect(parseScript(`"\\u{0}"`, {
            
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Literal",
                    "value": "\u0000",
                },

            }],
            "sourceType": "script",

        })
    });

    it('should parse HexDigit DoubleStringCharacter - "\u{0000000000F8}"', () => {
        expect(parseScript(`"\\u{0000000000F8}"`, {
            
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Literal",
                    "value": "ø",

                },

            }],
            "sourceType": "script",

        })
    });

    it('should parse HexDigit DoubleStringCharacter - "\u{10FFFF}"', () => {
        expect(parseScript(`"\\u{10FFFF}"`, {
            
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Literal",
                    "value": "􏿿",

                },

            }],
            "sourceType": "script",

        })
    });

    it('should parse escaped unicode with brace - "\\u{1F4AA}"', () => {
        expect(parseScript('"\\u{1F4AA}"', {
            raw: true,
        })).to.eql({
            "type": "Program",
            "sourceType": "script",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Literal",
                    "value": "💪",
                    "raw": "\"\\u{1F4AA}\""
                }
            }]
        });
    });

    it('should parse "\u0006A"', () => {
        expect(parseScript(`"\\u0006A"`, {
            
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Literal",
                    "value": "\u0006A",
                },
            }],
            "sourceType": "script",
        })
    });

    it('should parse ""Hello\\122World""', () => {
        expect(parseScript(`"Hello\\122World"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 16,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 16,
                    "start": 0,
                    "type": "Literal",
                    "value": "HelloRWorld",
                    "raw": "\"Hello\\122World\"",

                },
            }],
            "end": 16,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse ""Hello\\312World""', () => {
        expect(parseScript(`"Hello\\312World"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 16,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 16,
                    "start": 0,
                    "type": "Literal",
                    "value": "HelloÊWorld",
                    "raw": "\"Hello\\312World\"",

                },
            }],
            "end": 16,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse ""Hello\0World""', () => {
        expect(parseScript(`"Hello\0World"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 13,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 13,
                    "start": 0,
                    "type": "Literal",
                    "value": "Hello\u0000World",
                    "raw": "\"Hello\u0000World\"",

                },
            }],
            "end": 13,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse ""Hello\\122World""', () => {
        expect(parseScript(`"Hello\\122World"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 16,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 16,
                    "start": 0,
                    "type": "Literal",
                    "value": "HelloRWorld",
                    "raw": "\"Hello\\122World\"",

                },
            }],
            "end": 16,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse ""Hello\\1World""', () => {
        expect(parseScript(`"Hello\\1World"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 14,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 14,
                    "start": 0,
                    "type": "Literal",
                    "value": "Hello\u0001World",
                    "raw": "\"Hello\\1World\"",

                },
            }],
            "end": 14,
            "start": 0,
            "sourceType": "script",
        })
    });


    it('should parse ""Hello\\122World""', () => {
        expect(parseScript(`"Hello\
                    world"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 32,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 32,
                    "start": 0,
                    "type": "Literal",
                    "value": "Hello                    world",
                    "raw": "\"Hello                    world\"",

                },
            }],
            "end": 32,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse ""Hello\\122World""', () => {
        expect(parseScript(`"Hello\\122World"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 16,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 16,
                    "start": 0,
                    "type": "Literal",
                    "value": "HelloRWorld",
                    "raw": "\"Hello\\122World\"",

                },
            }],
            "end": 16,
            "start": 0,
            "sourceType": "script",
        })
    });


    it('should parse ""Hello\\122World""', () => {
        expect(parseScript(`"Hello\\122World"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 16,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 16,
                    "start": 0,
                    "type": "Literal",
                    "value": "HelloRWorld",
                    "raw": "\"Hello\\122World\"",

                },
            }],
            "end": 16,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse ""Hello\\122World""', () => {
        expect(parseScript(`"Hello\\122World"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 16,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 16,
                    "start": 0,
                    "type": "Literal",
                    "value": "HelloRWorld",
                    "raw": "\"Hello\\122World\"",

                },
            }],
            "end": 16,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse ""Hello\\122World""', () => {
        expect(parseScript(`"Hello\\122World"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 16,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 16,
                    "start": 0,
                    "type": "Literal",
                    "value": "HelloRWorld",
                    "raw": "\"Hello\\122World\"",

                },
            }],
            "end": 16,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\5111"', () => {
        expect(parseScript(`"\\5111"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 7,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 7,
                    "start": 0,
                    "type": "Literal",
                    "value": ")11",
                    "raw": "\"\\5111\"",

                },
            }],
            "end": 7,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\2111"', () => {
        expect(parseScript(`"\\2111"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 7,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 7,
                    "start": 0,
                    "type": "Literal",
                    "value": "1",
                    "raw": "\"\\2111\"",

                },
            }],
            "end": 7,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\1111"', () => {
        expect(parseScript(`"\\1111"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 7,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 7,
                    "start": 0,
                    "type": "Literal",
                    "value": "I1",
                    "raw": "\"\\1111\"",

                },
            }],
            "end": 7,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\u202a"', () => {
        expect(parseScript(`"\\u202a"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 8,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 8,
                    "start": 0,
                    "type": "Literal",
                    "value": "‪",
                    "raw": "\"\\u202a\"",

                },
            }],
            "end": 8,
            "start": 0,
            "sourceType": "script",
        })
    });

    function getHex(code: number): string {
        if (code < 0x10) return `0${code.toString(16)}`;
        return code.toString(16);
    }

    it('should parse "\\xeb"', () => {
        expect(parseScript(`"\\xeb"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 6,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 6,
                    "start": 0,
                    "type": "Literal",
                    "value": "ë",
                    "raw": "\"\\xeb\"",

                },
            }],
            "end": 6,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\xeb"', () => {
        expect(parseScript(`"\\xeb"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 6,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 6,
                    "start": 0,
                    "type": "Literal",
                    "value": "ë",
                    "raw": "\"\\xeb\"",

                },
            }],
            "end": 6,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\x39"', () => {
        expect(parseScript(`"\\x39"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 6,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 6,
                    "start": 0,
                    "type": "Literal",
                    "value": "9",
                    "raw": "\"\\x39\"",

                },
            }],
            "end": 6,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\x07"', () => {
        expect(parseScript(`"\\x07"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 6,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 6,
                    "start": 0,
                    "type": "Literal",
                    "value": "\u0007",
                    "raw": "\"\\x07\"",

                },
            }],
            "end": 6,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\xfd"', () => {
        expect(parseScript(`"\\xfd"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 6,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 6,
                    "start": 0,
                    "type": "Literal",
                    "value": "ý",
                    "raw": "\"\\xfd\"",

                },
            }],
            "end": 6,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\x3a"', () => {
        expect(parseScript(`"\\x3a"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 6,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 6,
                    "start": 0,
                    "type": "Literal",
                    "value": ":",
                    "raw": "\"\\x3a\"",

                },
            }],
            "end": 6,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\x04"', () => {
        expect(parseScript(`"\\x04"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 6,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 6,
                    "start": 0,
                    "type": "Literal",
                    "value": "\u0004",
                    "raw": "\"\\x04\"",

                },
            }],
            "end": 6,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\x6e"', () => {
        expect(parseScript(`"\\x6e"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 6,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 6,
                    "start": 0,
                    "type": "Literal",
                    "value": "n",
                    "raw": "\"\\x6e\"",

                },
            }],
            "end": 6,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\x6E"', () => {
        expect(parseScript(`"\\x6E"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 6,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 6,
                    "start": 0,
                    "type": "Literal",
                    "value": "n",
                    "raw": "\"\\x6E\"",

                },
            }],
            "end": 6,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse \\35 (with possible leading zeroes)', () => {
        expect(parseScript(`"\\35"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 5,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 5,
                    "start": 0,
                    "type": "Literal",
                    "value": "\u001d",
                    "raw": "\"\\35\"",

                },
            }],
            "end": 5,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse \\40 (with possible leading zeroes)', () => {
        expect(parseScript(`"\\40"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 5,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 5,
                    "start": 0,
                    "type": "Literal",
                    "value": " ",
                    "raw": "\"\\40\"",

                },
            }],
            "end": 5,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse \\14 (with possible leading zeroes)', () => {
        expect(parseScript(`"\\14"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 5,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 5,
                    "start": 0,
                    "type": "Literal",
                    "value": "\f",
                    "raw": "\"\\14\"",

                },
            }],
            "end": 5,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse \\36 (with possible leading zeroes)', () => {
        expect(parseScript(`"\\36"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 5,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 5,
                    "start": 0,
                    "type": "Literal",
                    "value": "\u001e",
                    "raw": "\"\\36\"",

                },
            }],
            "end": 5,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse \\74 (with possible leading zeroes)', () => {
        expect(parseScript(`"\\74"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 5,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 5,
                    "start": 0,
                    "type": "Literal",
                    "value": "<",
                    "raw": "\"\\74\"",

                },
            }],
            "end": 5,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse \\77 (with possible leading zeroes)', () => {
        expect(parseScript(`"\\77"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 5,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 5,
                    "start": 0,
                    "type": "Literal",
                    "value": "?",
                    "raw": "\"\\77\"",

                },
            }],
            "end": 5,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse \\021 (with possible leading zeroes)', () => {
        expect(parseScript(`"\\021"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 6,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 6,
                    "start": 0,
                    "type": "Literal",
                    "value": "\u0011",
                    "raw": "\"\\021\"",

                },
            }],
            "end": 6,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse \\021 (with possible leading zeroes)', () => {
        expect(parseScript(`"\\021"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 6,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 6,
                    "start": 0,
                    "type": "Literal",
                    "value": "\u0011",
                    "raw": "\"\\021\"",

                },
            }],
            "end": 6,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse \\057 (with possible leading zeroes)', () => {
        expect(parseScript(`"\\057"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 6,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 6,
                    "start": 0,
                    "type": "Literal",
                    "value": "/",
                    "raw": "\"\\057\"",

                },
            }],
            "end": 6,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse \\045 (with possible leading zeroes)', () => {
        expect(parseScript(`"\\045"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 6,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 6,
                    "start": 0,
                    "type": "Literal",
                    "value": "%",
                    "raw": "\"\\045\"",

                },
            }],
            "end": 6,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse \\022 (with possible leading zeroes)', () => {
        expect(parseScript(`"\\022"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 6,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 6,
                    "start": 0,
                    "type": "Literal",
                    "value": "\u0012",
                    "raw": "\"\\022\"",

                },
            }],
            "end": 6,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse \\060 (with possible leading zeroes)', () => {
        expect(parseScript(`"\\060"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 6,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 6,
                    "start": 0,
                    "type": "Literal",
                    "value": "0",
                    "raw": "\"\\060\"",

                },
            }],
            "end": 6,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse \\5 (with possible leading zeroes)', () => {
        expect(parseScript(`"\\5"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 4,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 4,
                    "start": 0,
                    "type": "Literal",
                    "value": "\u0005",
                    "raw": "\"\\5\"",

                },
            }],
            "end": 4,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse \\3 (with possible leading zeroes)', () => {
        expect(parseScript(`"\\3"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 4,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 4,
                    "start": 0,
                    "type": "Literal",
                    "value": "\u0003",
                    "raw": "\"\\3\"",

                },
            }],
            "end": 4,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse \\4 (with possible leading zeroes)', () => {
        expect(parseScript(`"\\4"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 4,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 4,
                    "start": 0,
                    "type": "Literal",
                    "value": "\u0004",
                    "raw": "\"\\4\"",

                },
            }],
            "end": 4,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\u{10ffd6}"', () => {
        expect(parseScript(`"\\u{10ffd6}"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 12,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 12,
                    "start": 0,
                    "type": "Literal",
                    "value": "􏿖",
                    "raw": "\"\\u{10ffd6}\"",

                },
            }],
            "end": 12,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\u{10ffd6}"', () => {
        expect(parseScript(`"\\u{10ffd6}"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 12,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 12,
                    "start": 0,
                    "type": "Literal",
                    "value": "􏿖",
                    "raw": "\"\\u{10ffd6}\"",

                },
            }],
            "end": 12,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\u{10ff27}"', () => {
        expect(parseScript(`"\\u{10ff27}"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 12,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 12,
                    "start": 0,
                    "type": "Literal",
                    "value": "􏼧",
                    "raw": "\"\\u{10ff27}\"",

                },
            }],
            "end": 12,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\u{10ffaa}"', () => {
        expect(parseScript(`"\\u{10ffaa}"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 12,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 12,
                    "start": 0,
                    "type": "Literal",
                    "value": "􏾪",
                    "raw": "\"\\u{10ffaa}\"",

                },
            }],
            "end": 12,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\u{10f089}"', () => {
        expect(parseScript(`"\\u{10f089}"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 12,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 12,
                    "start": 0,
                    "type": "Literal",
                    "value": "􏂉",
                    "raw": "\"\\u{10f089}\"",

                },
            }],
            "end": 12,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\u{10f154}"', () => {
        expect(parseScript(`"\\u{10f154}"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 12,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 12,
                    "start": 0,
                    "type": "Literal",
                    "value": "􏅔",
                    "raw": "\"\\u{10f154}\"",

                },
            }],
            "end": 12,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\u{10f0e6}"', () => {
        expect(parseScript(`"\\u{10f0e6}"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 12,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 12,
                    "start": 0,
                    "type": "Literal",
                    "value": "􏃦",
                    "raw": "\"\\u{10f0e6}\"",

                },
            }],
            "end": 12,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\u{10f070}"', () => {
        expect(parseScript(`"\\u{10f070}"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 12,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 12,
                    "start": 0,
                    "type": "Literal",
                    "value": "􏁰",
                    "raw": "\"\\u{10f070}\"",

                },
            }],
            "end": 12,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\u{10ff5b}"', () => {
        expect(parseScript(`"\\u{10ff5b}"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 12,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 12,
                    "start": 0,
                    "type": "Literal",
                    "value": "􏽛",
                    "raw": "\"\\u{10ff5b}\"",

                },
            }],
            "end": 12,
            "start": 0,
            "sourceType": "script",
        })
    });
    it('should parse "\\u{10f071}"', () => {
        expect(parseScript(`"\\u{10f071}"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 12,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 12,
                    "start": 0,
                    "type": "Literal",
                    "value": "􏁱",
                    "raw": "\"\\u{10f071}\"",

                },
            }],
            "end": 12,
            "start": 0,
            "sourceType": "script",
        })
    });


    it('should parse "\\u{b908}"', () => {
        expect(parseScript(`"\\u{b908}"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 10,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 10,
                    "start": 0,
                    "type": "Literal",
                    "value": "뤈",
                    "raw": "\"\\u{b908}\"",

                },
            }],
            "end": 10,
            "start": 0,
            "sourceType": "script",
        })
    });



    it('should parse "\\u{b908}"', () => {
        expect(parseScript(`"\\u{b908}"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 10,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 10,
                    "start": 0,
                    "type": "Literal",
                    "value": "뤈",
                    "raw": "\"\\u{b908}\"",

                },
            }],
            "end": 10,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\u{1ba36}"', () => {
        expect(parseScript(`"\\u{1ba36}"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 11,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 11,
                    "start": 0,
                    "type": "Literal",
                    "value": "𛨶",
                    "raw": "\"\\u{1ba36}\"",

                },
            }],
            "end": 11,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\u{b90a}"', () => {
        expect(parseScript(`"\\u{b90a}"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 10,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 10,
                    "start": 0,
                    "type": "Literal",
                    "value": "뤊",
                    "raw": "\"\\u{b90a}\"",

                },
            }],
            "end": 10,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\u{b90a}"', () => {
        expect(parseScript(`"\\u{b90a}"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 10,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 10,
                    "start": 0,
                    "type": "Literal",
                    "value": "뤊",
                    "raw": "\"\\u{b90a}\"",

                },
            }],
            "end": 10,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\u{1ba36}"', () => {
        expect(parseScript(`"\\u{1ba36}"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 11,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 11,
                    "start": 0,
                    "type": "Literal",
                    "value": "𛨶",
                    "raw": "\"\\u{1ba36}\"",

                },
            }],
            "end": 11,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\u{b90c}"', () => {
        expect(parseScript(`"\\u{b90c}"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 10,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 10,
                    "start": 0,
                    "type": "Literal",
                    "value": "뤌",
                    "raw": "\"\\u{b90c}\"",

                },
            }],
            "end": 10,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\u{b90c}"', () => {
        expect(parseScript(`"\\u{b90c}"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 10,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 10,
                    "start": 0,
                    "type": "Literal",
                    "value": "뤌",
                    "raw": "\"\\u{b90c}\"",

                },
            }],
            "end": 10,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\u{1ba39}"', () => {
        expect(parseScript(`"\\u{1ba39}"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 11,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 11,
                    "start": 0,
                    "type": "Literal",
                    "value": "𛨹",
                    "raw": "\"\\u{1ba39}\"",

                },
            }],
            "end": 11,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\u{294c0}"', () => {
        expect(parseScript(`"\\u{294c0}"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 11,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 11,
                    "start": 0,
                    "type": "Literal",
                    "value": "𩓀",
                    "raw": "\"\\u{294c0}\"",

                },
            }],
            "end": 11,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\u{294be}"', () => {
        expect(parseScript(`"\\u{294be}"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 11,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 11,
                    "start": 0,
                    "type": "Literal",
                    "value": "𩒾",
                    "raw": "\"\\u{294be}\"",

                },
            }],
            "end": 11,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\u{31562}"', () => {
        expect(parseScript(`"\\u{31562}"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 11,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 11,
                    "start": 0,
                    "type": "Literal",
                    "value": "𱕢",
                    "raw": "\"\\u{31562}\"",

                },
            }],
            "end": 11,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\u{294be}"', () => {
        expect(parseScript(`"\\u{294c4}"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 11,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 11,
                    "start": 0,
                    "type": "Literal",
                    "value": "𩓄",
                    "raw": "\"\\u{294c4}\"",

                },
            }],
            "end": 11,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\u{294be}"', () => {
        expect(parseScript(`"\\u{294c4}"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 11,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 11,
                    "start": 0,
                    "type": "Literal",
                    "value": "𩓄",
                    "raw": "\"\\u{294c4}\"",

                },
            }],
            "end": 11,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\u{428c0}"', () => {
        expect(parseScript(`"\\u{428c0}"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 11,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 11,
                    "start": 0,
                    "type": "Literal",
                    "value": "񂣀",
                    "raw": "\"\\u{428c0}\"",

                },
            }],
            "end": 11,
            "start": 0,
            "sourceType": "script",
        })
    });


    it('should parse "\\u{5b7bb}"', () => {
        expect(parseScript(`"\\u{5b7bb}"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 11,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 11,
                    "start": 0,
                    "type": "Literal",
                    "value": "񛞻",
                    "raw": "\"\\u{5b7bb}\"",

                },
            }],
            "end": 11,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\u{522a1}"', () => {
        expect(parseScript(`"\\u{522a1}"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 11,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 11,
                    "start": 0,
                    "type": "Literal",
                    "value": "񒊡",
                    "raw": "\"\\u{522a1}\"",

                },
            }],
            "end": 11,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\u{a6452}"', () => {
        expect(parseScript(`"\\u{a6452}"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 11,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 11,
                    "start": 0,
                    "type": "Literal",
                    "value": "򦑒",
                    "raw": "\"\\u{a6452}\"",

                },
            }],
            "end": 11,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\u{9a50f}"', () => {
        expect(parseScript(`"\\u{9a50f}"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 11,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 11,
                    "start": 0,
                    "type": "Literal",
                    "value": "򚔏",
                    "raw": "\"\\u{9a50f}\"",

                },
            }],
            "end": 11,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\u{94606}"', () => {
        expect(parseScript(`"\\u{94606}"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 11,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 11,
                    "start": 0,
                    "type": "Literal",
                    "value": "򔘆",
                    "raw": "\"\\u{94606}\"",

                },
            }],
            "end": 11,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\u{83a1a}"', () => {
        expect(parseScript(`"\\u{83a1a}"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 11,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 11,
                    "start": 0,
                    "type": "Literal",
                    "value": "򃨚",
                    "raw": "\"\\u{83a1a}\"",

                },
            }],
            "end": 11,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\u{72526}"', () => {
        expect(parseScript(`"\\u{72526}"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 11,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 11,
                    "start": 0,
                    "type": "Literal",
                    "value": "񲔦",
                    "raw": "\"\\u{72526}\"",

                },
            }],
            "end": 11,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\u{636cc}"', () => {
        expect(parseScript(`"\\u{636cc}"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 11,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 11,
                    "start": 0,
                    "type": "Literal",
                    "value": "񣛌",
                    "raw": "\"\\u{636cc}\"",

                },
            }],
            "end": 11,
            "start": 0,
            "sourceType": "script",
        })
    });




    it('should parse "\\u{d3d4b}"', () => {
        expect(parseScript(`"\\u{d3d4b}"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 11,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 11,
                    "start": 0,
                    "type": "Literal",
                    "value": "󓵋",
                    "raw": "\"\\u{d3d4b}\"",

                },
            }],
            "end": 11,
            "start": 0,
            "sourceType": "script",
        })
    });
    it('should parse "\\u{b7999}"', () => {
        expect(parseScript(`"\\u{b7999}"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 11,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 11,
                    "start": 0,
                    "type": "Literal",
                    "value": "򷦙",
                    "raw": "\"\\u{b7999}\"",

                },
            }],
            "end": 11,
            "start": 0,
            "sourceType": "script",
        })
    });
    it('should parse "\\u{a6452}"', () => {
        expect(parseScript(`"\\u{a6452}"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 11,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 11,
                    "start": 0,
                    "type": "Literal",
                    "value": "򦑒",
                    "raw": "\"\\u{a6452}\"",

                },
            }],
            "end": 11,
            "start": 0,
            "sourceType": "script",
        })
    });
    it('should parse "\\u{ae1c5}"', () => {
        expect(parseScript(`"\\u{ae1c5}"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 11,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 11,
                    "start": 0,
                    "type": "Literal",
                    "value": "򮇅",
                    "raw": "\"\\u{ae1c5}\"",

                },
            }],
            "end": 11,
            "start": 0,
            "sourceType": "script",
        })
    });




    it('should parse "\\u{ae1c5}"', () => {
        expect(parseScript(`"\\u{ae1c5}"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 11,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 11,
                    "start": 0,
                    "type": "Literal",
                    "value": "򮇅",
                    "raw": "\"\\u{ae1c5}\"",

                },
            }],
            "end": 11,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\u{ae1c5}"', () => {
        expect(parseScript(`"\\u{ae1c5}"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 11,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 11,
                    "start": 0,
                    "type": "Literal",
                    "value": "򮇅",
                    "raw": "\"\\u{ae1c5}\"",

                },
            }],
            "end": 11,
            "start": 0,
            "sourceType": "script",
        })
    });
    it('should parse "\\u{4e259}"', () => {
        expect(parseScript(`"\\u{4e259}"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 11,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 11,
                    "start": 0,
                    "type": "Literal",
                    "value": "񎉙",
                    "raw": "\"\\u{4e259}\"",

                },
            }],
            "end": 11,
            "start": 0,
            "sourceType": "script",
        })
    });
    it('should parse "\\u{3a69d}"', () => {
        expect(parseScript(`"\\u{3a69d}"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 11,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 11,
                    "start": 0,
                    "type": "Literal",
                    "value": "𺚝",
                    "raw": "\"\\u{3a69d}\"",

                },
            }],
            "end": 11,
            "start": 0,
            "sourceType": "script",
        })
    });
    it('should parse "\\u{5513}"', () => {
        expect(parseScript(`"\\u{5513}"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 10,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 10,
                    "start": 0,
                    "type": "Literal",
                    "value": "唓",
                    "raw": "\"\\u{5513}\"",

                },
            }],
            "end": 10,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\u{10d593}"', () => {
        expect(parseScript(`"\\u{10d593}"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 12,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 12,
                    "start": 0,
                    "type": "Literal",
                    "value": "􍖓",
                    "raw": "\"\\u{10d593}\"",

                },
            }],
            "end": 12,
            "start": 0,
            "sourceType": "script",
        })
    });


    it('should parse "\\u{1c4d3}"', () => {
        expect(parseScript(`"\\u{1c4d3}"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 11,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 11,
                    "start": 0,
                    "type": "Literal",
                    "value": "𜓓",
                    "raw": "\"\\u{1c4d3}\"",

                },
            }],
            "end": 11,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\u{5c398}"', () => {
        expect(parseScript(`"\\u{5c398}"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 11,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 11,
                    "start": 0,
                    "type": "Literal",
                    "value": "񜎘",
                    "raw": "\"\\u{5c398}\"",

                },
            }],
            "end": 11,
            "start": 0,
            "sourceType": "script",
        })
    });
    it('should parse "\\u{5c399}"', () => {
        expect(parseScript(`"\\u{5c399}"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 11,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 11,
                    "start": 0,
                    "type": "Literal",
                    "value": "񜎙",
                    "raw": "\"\\u{5c399}\"",

                },
            }],
            "end": 11,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\u{5c399}"', () => {
        expect(parseScript(`"\\u{5c399}"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 11,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 11,
                    "start": 0,
                    "type": "Literal",
                    "value": "񜎙",
                    "raw": "\"\\u{5c399}\"",

                },
            }],
            "end": 11,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\u{10caea}"', () => {
        expect(parseScript(`"\\u{10caea}"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 12,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 12,
                    "start": 0,
                    "type": "Literal",
                    "value": "􌫪",
                    "raw": "\"\\u{10caea}\"",

                },
            }],
            "end": 12,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\u{7c1e1}"', () => {
        expect(parseScript(`"\\u{7c1e1}"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 11,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 11,
                    "start": 0,
                    "type": "Literal",
                    "value": "񼇡",
                    "raw": "\"\\u{7c1e1}\"",

                },
            }],
            "end": 11,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\u{47ad4}"', () => {
        expect(parseScript(`"\\u{47ad4}"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 11,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 11,
                    "start": 0,
                    "type": "Literal",
                    "value": "񇫔",
                    "raw": "\"\\u{47ad4}\"",

                },
            }],
            "end": 11,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\u03ef"', () => {
        expect(parseScript(`"\\u03ef"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 8,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 8,
                    "start": 0,
                    "type": "Literal",
                    "value": "ϯ",
                    "raw": "\"\\u03ef\"",

                },
            }],
            "end": 8,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\u03fa"', () => {
        expect(parseScript(`"\\u03fa"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 8,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 8,
                    "start": 0,
                    "type": "Literal",
                    "value": "Ϻ",
                    "raw": "\"\\u03fa\"",

                },
            }],
            "end": 8,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\u03f0"', () => {
        expect(parseScript(`"\\u03f0"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 8,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 8,
                    "start": 0,
                    "type": "Literal",
                    "value": "ϰ",
                    "raw": "\"\\u03f0\"",

                },
            }],
            "end": 8,
            "start": 0,
            "sourceType": "script",
        })
    });


    it('should parse "\\u01c8"', () => {
        expect(parseScript(`"\\u01c8"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 8,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 8,
                    "start": 0,
                    "type": "Literal",
                    "value": "ǈ",
                    "raw": "\"\\u01c8\"",

                },
            }],
            "end": 8,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\u01c7"', () => {
        expect(parseScript(`"\\u01c7"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 8,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 8,
                    "start": 0,
                    "type": "Literal",
                    "value": "Ǉ",
                    "raw": "\"\\u01c7\"",

                },
            }],
            "end": 8,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\u01d4"', () => {
        expect(parseScript(`"\\u01d4"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 8,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 8,
                    "start": 0,
                    "type": "Literal",
                    "value": "ǔ",
                    "raw": "\"\\u01d4\"",

                },
            }],
            "end": 8,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\u0121"', () => {
        expect(parseScript(`"\\u0121"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 8,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 8,
                    "start": 0,
                    "type": "Literal",
                    "value": "ġ",
                    "raw": "\"\\u0121\"",

                },
            }],
            "end": 8,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\u0134"', () => {
        expect(parseScript(`"\\u0134"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 8,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 8,
                    "start": 0,
                    "type": "Literal",
                    "value": "Ĵ",
                    "raw": "\"\\u0134\"",

                },
            }],
            "end": 8,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\u014a"', () => {
        expect(parseScript(`"\\u014a"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 8,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 8,
                    "start": 0,
                    "type": "Literal",
                    "value": "Ŋ",
                    "raw": "\"\\u014a\"",

                },
            }],
            "end": 8,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\u016f"', () => {
        expect(parseScript(`"\\u016f"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 8,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 8,
                    "start": 0,
                    "type": "Literal",
                    "value": "ů",
                    "raw": "\"\\u016f\"",

                },
            }],
            "end": 8,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\u014d"', () => {
        expect(parseScript(`"\\u014d"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 8,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 8,
                    "start": 0,
                    "type": "Literal",
                    "value": "ō",
                    "raw": "\"\\u014d\"",

                },
            }],
            "end": 8,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\u0170"', () => {
        expect(parseScript(`"\\u0170"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 8,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 8,
                    "start": 0,
                    "type": "Literal",
                    "value": "Ű",
                    "raw": "\"\\u0170\"",

                },
            }],
            "end": 8,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\u016f"', () => {
        expect(parseScript(`"\\u016f"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 8,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 8,
                    "start": 0,
                    "type": "Literal",
                    "value": "ů",
                    "raw": "\"\\u016f\"",

                },
            }],
            "end": 8,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\u0154"', () => {
        expect(parseScript(`"\\u0154"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 8,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 8,
                    "start": 0,
                    "type": "Literal",
                    "value": "Ŕ",
                    "raw": "\"\\u0154\"",

                },
            }],
            "end": 8,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse "\\u0154"', () => {
        expect(parseScript(`"\\u0154"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 8,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 8,
                    "start": 0,
                    "type": "Literal",
                    "value": "Ŕ",
                    "raw": "\"\\u0154\"",

                },
            }],
            "end": 8,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse Russian capitals - "Д"', () => {
        expect(parseScript(`"Д"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 3,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 3,
                    "start": 0,
                    "type": "Literal",
                    "value": "Д",
                    "raw": "\"Д\"",

                },
            }],
            "end": 3,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse Russian capitals - "Е"', () => {
        expect(parseScript(`"Е"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 3,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 3,
                    "start": 0,
                    "type": "Literal",
                    "value": "Е",
                    "raw": "\"Е\"",

                },
            }],
            "end": 3,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse Russian capitals - "З"', () => {
        expect(parseScript(`"З"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 3,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 3,
                    "start": 0,
                    "type": "Literal",
                    "value": "З",
                    "raw": "\"З\"",

                },
            }],
            "end": 3,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse Russian small - "п"', () => {
        expect(parseScript(`"п"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 3,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 3,
                    "start": 0,
                    "type": "Literal",
                    "value": "п",
                    "raw": "\"п\"",

                },
            }],
            "end": 3,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse Russian small - "и"', () => {
        expect(parseScript(`"и"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 3,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 3,
                    "start": 0,
                    "type": "Literal",
                    "value": "и",
                    "raw": "\"и\"",

                },
            }],
            "end": 3,
            "start": 0,
            "sourceType": "script",
        })
    });
    it('should parse Russian small - "ю"', () => {
        expect(parseScript(`"ю"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 3,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 3,
                    "start": 0,
                    "type": "Literal",
                    "value": "ю",
                    "raw": "\"ю\"",

                },
            }],
            "end": 3,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse digits - "1"', () => {
        expect(parseScript(`"1"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 3,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 3,
                    "start": 0,
                    "type": "Literal",
                    "value": "1",
                    "raw": "\"1\"",

                },
            }],
            "end": 3,
            "start": 0,
            "sourceType": "script",
        })
    });

    it('should parse digits - "8"', () => {
        expect(parseScript(`"8"`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "end": 3,
                "start": 0,
                "type": "ExpressionStatement",
                "expression": {
                    "end": 3,
                    "start": 0,
                    "type": "Literal",
                    "value": "8",
                    "raw": "\"8\"",

                },
            }],
            "end": 3,
            "start": 0,
            "sourceType": "script",
        })
    });

});