import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Statements - Variable', () => {
    
        it('should fail if used as assignment expression when variable is initialized (x += 1)', () => {
            expect(() => {
                parseScript(`var x += 1;`);
            }).to.throw();
        });
    
        it('should fail if used as assignment expression when variable is initialized ( x | true )', () => {
            expect(() => {
                parseScript(`var x | true;`);
            }).to.throw();
        });
    
        it('should fail if used as assignment expression when variable is initialized ( var x*1; )', () => {
            expect(() => {
                parseScript(`var var x*1;;`);
            }).to.throw();
        });
    
        it('should fail if used as assignment expression when variable is initialized ( x in __arr )', () => {
            expect(() => {
                parseScript(`var x in __arr;`);
            }).to.throw();
        });
    
        it('should fail on reserved words used as Identifier - break', () => {
            expect(() => {
                parseScript(`var \\u{62}\\u{72}\\u{65}\\u{61}\\u{6b} = 123;`);
            }).to.throw();
        });
    
        it('should fail on reserved words used as Identifier - case', () => {
            expect(() => {
                parseScript(`var \\u0063ase = 123;`);
            }).to.throw();
        });
    
        it('should fail on "var {...{z}} = { z: 1}; console.log(z);"', () => {
            expect(() => {
                parseScript(`var {...{z}} = { z: 1}; console.log(z);`);
            }).to.throw('');
        });
    
        it('should fail on " var await = 1`" in module code', () => {
            expect(() => {
                parseModule(`var await = 1`)
            }).to.throw();
        });
        
        it('should fail on  "var []"', () => {
            expect(() => {
                parseScript(`var []`);
            }).to.throw();
        });
    
        it('should fail on  "var {}"', () => {
            expect(() => {
                parseScript(`var {}`);
            }).to.throw();
        });

        it('should fail on "var"', () => {
            expect(() => {
                parseScript(`var`);
            }).to.throw();
        });

        it('should fail on "var;"', () => {
            expect(() => {
                parseScript(`var;`);
            }).to.throw();
        });
       
        it('should fail on "var obj = { *test** }" to throw', () => {
            expect(() => {
                parseScript('var obj = { *test** }');
            }).to.throw();
        });
    
        it('should fail on "var this = 10;" to throw', () => {
            expect(() => {
                parseModule(`var this = 10;`);
            }).to.throw();
        });
    
        it('should fail on "var {a:a};', () => {
            expect(() => {
                parseScript(`var {a:a};`);
            }).to.throw();
        });
    
        it('should fail on "var if = 0" to throw', () => {
            expect(() => {
                parseModule(`var if = 0`);
            }).to.throw();
        });
    
        it('should fail on fail on "var obj = { *test** }"', () => {
            expect(() => {
                parseScript(`var obj = { *test** }`)
            }).to.throw();
        });
    
        it('should fail on fail on "var x = {this}"', () => {
            expect(() => {
                parseScript(`var x = {this}`)
            }).to.throw();
        });
    
        it('should fail on "var [(a)] = 0"', () => {
            expect(() => {
                parseScript(`var [(a)] = 0`);
            }).to.throw();
        });
    
        it('should fail on "var a.b;"', () => {
            expect(() => {
                parseScript(`var a.b;`);
            }).to.throw();
        });
    
        it('should fail on "var super', () => {
            expect(() => {
                parseModule(`var super`);
            }).to.throw();
        });
    
        it('should fail on fail on "var [x]"', () => {
            expect(() => {
                parseScript(`var [x]`)
            }).to.throw();
        });

        it('should parse object pattern inside array rest element', () => {
            expect(parseScript(`var [ ...{length} ] = foo;
            [ ...{length} ] = foo;`, {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [
                    {
                        "type": "VariableDeclaration",
                        "declarations": [
                            {
                                "type": "VariableDeclarator",
                                "init": {
                                    "type": "Identifier",
                                    "name": "foo",
                                    "start": 22,
                                    "end": 25
                                },
                                "id": {
                                    "type": "ArrayPattern",
                                    "elements": [
                                        {
                                            "type": "RestElement",
                                            "argument": {
                                                "type": "ObjectPattern",
                                                "properties": [
                                                    {
                                                        "type": "Property",
                                                        "kind": "init",
                                                        "key": {
                                                            "type": "Identifier",
                                                            "name": "length",
                                                            "start": 10,
                                                            "end": 16
                                                        },
                                                        "computed": false,
                                                        "value": {
                                                            "type": "Identifier",
                                                            "name": "length",
                                                            "start": 10,
                                                            "end": 16
                                                        },
                                                        "method": false,
                                                        "shorthand": true,
                                                        "start": 10,
                                                        "end": 16
                                                    }
                                                ],
                                                "start": 9,
                                                "end": 17
                                            },
                                            "start": 6,
                                            "end": 17
                                        }
                                    ],
                                    "start": 4,
                                    "end": 19
                                },
                                "start": 4,
                                "end": 25
                            }
                        ],
                        "kind": "var",
                        "start": 0,
                        "end": 26
                    },
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "AssignmentExpression",
                            "left": {
                                "type": "ArrayPattern",
                                "elements": [
                                    {
                                        "type": "RestElement",
                                        "argument": {
                                            "type": "ObjectPattern",
                                            "properties": [
                                                {
                                                    "type": "Property",
                                                    "computed": false,
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "length",
                                                        "start": 45,
                                                        "end": 51
                                                    },
                                                    "kind": "init",
                                                    "method": false,
                                                    "shorthand": true,
                                                    "value": {
                                                        "type": "Identifier",
                                                        "name": "length",
                                                        "start": 45,
                                                        "end": 51
                                                    },
                                                    "start": 45,
                                                    "end": 51
                                                }
                                            ],
                                            "start": 44,
                                            "end": 52
                                        },
                                        "start": 41,
                                        "end": 52
                                    }
                                ],
                                "start": 39,
                                "end": 54
                            },
                            "operator": "=",
                            "right": {
                                "type": "Identifier",
                                "name": "foo",
                                "start": 57,
                                "end": 60
                            },
                            "start": 39,
                            "end": 60
                        },
                        "start": 39,
                        "end": 61
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 61
            });
        });

        it('should parse function division"', () => {
            expect(parseScript('var x = function f() {} / 3;', {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 28,
                "body": [
                  {
                    "type": "VariableDeclaration",
                    "start": 0,
                    "end": 28,
                    "declarations": [
                      {
                        "type": "VariableDeclarator",
                        "start": 4,
                        "end": 27,
                        "id": {
                          "type": "Identifier",
                          "start": 4,
                          "end": 5,
                          "name": "x"
                        },
                        "init": {
                          "type": "BinaryExpression",
                          "start": 8,
                          "end": 27,
                          "left": {
                            "type": "FunctionExpression",
                            "start": 8,
                            "end": 23,
                            "id": {
                              "type": "Identifier",
                              "start": 17,
                              "end": 18,
                              "name": "f"
                            },
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                              "type": "BlockStatement",
                              "start": 21,
                              "end": 23,
                              "body": []
                            }
                          },
                          "operator": "/",
                          "right": {
                            "type": "Literal",
                            "start": 26,
                            "end": 27,
                            "value": 3,
                            "raw": "3"
                          }
                        }
                      }
                    ],
                    "kind": "var"
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse "var undefined"', () => {
            expect(parseScript('var undefined', {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 13,
                "body": [{
                    "type": "VariableDeclaration",
                    "start": 0,
                    "end": 13,
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "start": 4,
                        "end": 13,
                        "id": {
                            "type": "Identifier",
                            "start": 4,
                            "end": 13,
                            "name": "undefined"
                        },
                        "init": null
                    }],
                    "kind": "var"
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse assigned async arrow', () => {
            expect(parseScript(`var await = 1`, {
                ranges: true,
                raw: true
            })).to.eql({
                "body": [{
                    "declarations": [{
                        "end": 13,
                        "id": {
                            "end": 9,
                            "name": "await",
                            "start": 4,
                            "type": "Identifier"
                        },
                        "init": {
                            "end": 13,
                            "raw": "1",
                            "start": 12,
                            "type": "Literal",
                            "value": 1
                        },
                        "start": 4,
                        "type": "VariableDeclarator"
                    }],
                    "end": 13,
                    "kind": "var",
                    "start": 0,
                    "type": "VariableDeclaration"
                }],
                "end": 13,
                "sourceType": "script",
                "start": 0,
                "type": "Program"
            });
        });
    
        it('should parse assigned async arrow', () => {
            expect(parseScript(`"use strict"; var await = 1`, {
                ranges: true,
                raw: true,
            })).to.eql({
                "body": [{
                        "end": 13,
                        "expression": {
                            "end": 12,
                            "raw": "\"use strict\"",
                            "start": 0,
                            "type": "Literal",
                            "value": "use strict"
                        },
                        "start": 0,
                        "type": "ExpressionStatement"
                    },
                    {
                        "declarations": [{
                            "end": 27,
                            "id": {
                                "end": 23,
                                "name": "await",
                                "start": 18,
                                "type": "Identifier"
                            },
                            "init": {
                                "end": 27,
                                "raw": "1",
                                "start": 26,
                                "type": "Literal",
                                "value": 1,
                            },
                            "start": 18,
                            "type": "VariableDeclarator"
                        }],
                        "end": 27,
                        "kind": "var",
                        "start": 14,
                        "type": "VariableDeclaration"
                    }
                ],
                "end": 27,
                "sourceType": "script",
                "start": 0,
                "type": "Program"
            });
        });
    
        it('should parse "var n=t[o][1][e];"', () => {
            expect(parseScript(`var n=t[o][1][e];`, {
                raw: true,
                ranges: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 17,
                "body": [{
                    "type": "VariableDeclaration",
                    "start": 0,
                    "end": 17,
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "start": 4,
                        "end": 16,
                        "id": {
                            "type": "Identifier",
                            "start": 4,
                            "end": 5,
                            "name": "n"
                        },
                        "init": {
                            "type": "MemberExpression",
                            "start": 6,
                            "end": 16,
                            "object": {
                                "type": "MemberExpression",
                                "start": 6,
                                "end": 13,
                                "object": {
                                    "type": "MemberExpression",
                                    "start": 6,
                                    "end": 10,
                                    "object": {
                                        "type": "Identifier",
                                        "start": 6,
                                        "end": 7,
                                        "name": "t"
                                    },
                                    "property": {
                                        "type": "Identifier",
                                        "start": 8,
                                        "end": 9,
                                        "name": "o"
                                    },
                                    "computed": true
                                },
                                "property": {
                                    "type": "Literal",
                                    "start": 11,
                                    "end": 12,
                                    "value": 1,
                                    "raw": "1"
                                },
                                "computed": true
                            },
                            "property": {
                                "type": "Identifier",
                                "start": 14,
                                "end": 15,
                                "name": "e"
                            },
                            "computed": true
                        }
                    }],
                    "kind": "var"
                }],
                "sourceType": "script"
            });
        });
    
    });