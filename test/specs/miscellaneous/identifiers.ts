import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';
const expect = chai.expect;

describe('Identifiers', () => {
    
        it('should fail if reserved words used as Identifier - "class"', () => {
            expect(() => {
                parseScript('var class = 123;');
            }).to.throw();
        });
        it('should fail if reserved words used as Identifier - "const"', () => {
            expect(() => {
                parseScript('var const = 123;');
            }).to.throw();
        });
        it('should fail if reserved words used as Identifier - "escaped hex"', () => {
            expect(() => {
                parseScript('var \\u{63}ontinue = 123;');
            }).to.throw();
        });
        it('should fail if reserved words used as Identifier - "escaped hex4"', () => {
            expect(() => {
                parseScript('var \\u0063ontinue = 123;');
            }).to.throw();
        });
        it('should fail if reserved words used as Identifier - "continue"', () => {
            expect(() => {
                parseScript('var continue = 123;');
            }).to.throw();
        });
        it('should fail if reserved words used as Identifier - "default"', () => {
            expect(() => {
                parseScript('var default = 123;');
            }).to.throw();
        });
        it('should fail if reserved words used as Identifier - "do"', () => {
            expect(() => {
                parseScript('var do = 123;');
            }).to.throw();
        });
        it('should fail if reserved words used as Identifier - "else"', () => {
            expect(() => {
                parseScript('var else = 123;');
            }).to.throw();
        });
        it('should fail if reserved words used as Identifier - "enum"', () => {
            expect(() => {
                parseScript('var enum = 123;');
            }).to.throw();
        });
        it('should fail if reserved words used as Identifier - "export"', () => {
            expect(() => {
                parseScript('var export = 123;');
            }).to.throw();
        });
        it('should fail if reserved words used as Identifier - "extends"', () => {
            expect(() => {
                parseScript('var extends = 123;');
            }).to.throw();
        });
        it('should fail if reserved words used as Identifier - "false"', () => {
            expect(() => {
                parseScript('var false = 123;');
            }).to.throw();
        });
        it('should fail if reserved words used as Identifier - "true"', () => {
            expect(() => {
                parseScript('var true = 123;');
            }).to.throw();
        });
        it('should fail if reserved words used as Identifier - "if"', () => {
            expect(() => {
                parseScript('var if = 123;');
            }).to.throw();
        });
        it('should fail if reserved words used as Identifier - "import"', () => {
            expect(() => {
                parseScript('var import = 123;');
            }).to.throw();
        });
        it('should fail if reserved words used as Identifier - "in"', () => {
            expect(() => {
                parseScript('var in = 123;');
            }).to.throw();
        });
        it('should fail if reserved words used as Identifier - "new"', () => {
            expect(() => {
                parseScript('var new = 123;');
            }).to.throw();
        });
        it('should fail if reserved words used as Identifier - "instanceof"', () => {
            expect(() => {
                parseScript('var if = instanceof;');
            }).to.throw();
        });
        it('should fail if reserved words used as Identifier - "switch"', () => {
            expect(() => {
                parseScript('var import = switch;');
            }).to.throw();
        });
        it('should fail if reserved words used as Identifier - "try"', () => {
            expect(() => {
                parseScript('var in = try;');
            }).to.throw();
        });
    
        it('should fail if reserved words used as Identifier - "void"', () => {
            expect(() => {
                parseScript('var void = 123;');
            }).to.throw();
        });
        it('should fail if reserved words used as Identifier - "yield "', () => {
            expect(() => {
                parseScript('"use strict"; var yield  = 123;');
            }).to.throw();
        });
        it('should fail if reserved words used as Identifier - "switch"', () => {
            expect(() => {
                parseScript('var switch = 123;');
            }).to.throw();
        });
        it('should fail if reserved words used as Identifier - "try"', () => {
            expect(() => {
                parseScript('var try = 123;');
            }).to.throw();
        });
    
        it('should parse yield as reserved word used in identifier in sloppy mode"', () => {
            expect(parseScript('var yield  = 123;', {
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "VariableDeclaration",
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "Identifier",
                            "name": "yield"
                        },
                        "init": {
                            "type": "Literal",
                            "value": 123,
                            "raw": "123"
                        }
                    }],
                    "kind": "var"
                }],
                "sourceType": "script"
            })
        })
    
        it('should parse "aa\u0430"', () => {
            expect(parseScript('aa\\u0430', {
                ranges: true
            })).to.eql({
                "body": [{
                    "end": 8,
                    "expression": {
                        "end": 8,
                        "start": 0,
                        "type": "Identifier",
                        "name": "aaа"
                    },
                    "start": 0,
                    "type": "ExpressionStatement"
                }],
                "end": 8,
                "sourceType": "script",
                "start": 0,
                "type": "Program"
            })
        })
    
        it('should parse "\u0430"', () => {
            expect(parseScript('\\u0430', {
                ranges: true
            })).to.eql({
                "body": [{
                    "end": 6,
                    "expression": {
                        "end": 6,
                        "start": 0,
                        "type": "Identifier",
                        "name": "а"
                    },
                    "start": 0,
                    "type": "ExpressionStatement"
                }],
                "end": 6,
                "sourceType": "script",
                "start": 0,
                "type": "Program"
            })
        })
    
        it('should parse "\u0430"', () => {
            expect(parseScript('\\u0430', {
                ranges: true
            })).to.eql({
                "body": [{
                    "end": 6,
                    "expression": {
                        "end": 6,
                        "start": 0,
                        "type": "Identifier",
                        "name": "а"
                    },
                    "start": 0,
                    "type": "ExpressionStatement"
                }],
                "end": 6,
                "sourceType": "script",
                "start": 0,
                "type": "Program"
            })
        })
    
        it('should parse "\u0430abc"', () => {
            expect(parseScript('\\u0430abc', {
                ranges: true
            })).to.eql({
                "body": [{
                    "end": 9,
                    "expression": {
                        "end": 9,
                        "start": 0,
                        "type": "Identifier",
                        "name": "аabc"
                    },
                    "start": 0,
                    "type": "ExpressionStatement"
                }],
                "end": 9,
                "sourceType": "script",
                "start": 0,
                "type": "Program"
            })
        })
    
        it('should parse "\u0430abc"', () => {
            expect(parseScript('\\u{0000000000F8}', {
                ranges: true
            })).to.eql({
                "body": [{
                    "end": 16,
                    "expression": {
                        "end": 16,
                        "start": 0,
                        "type": "Identifier",
                        "name": "ø"
                    },
                    "start": 0,
                    "type": "ExpressionStatement"
                }],
                "end": 16,
                "sourceType": "script",
                "start": 0,
                "type": "Program"
            })
        })
    });