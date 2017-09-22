import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Statements - While statement', () => {
    
        it('should fail if Expression in "while" IterationStatement is bracketed with braces', () => {
            expect(() => {
                parseScript(`while 'hood' break;`)
            }).to.throw();
        });
    
        it('should fail if Expression in "while" IterationStatement is bracketed with braces', () => {
            expect(() => {
                parseScript(`while '' break;`)
            }).to.throw();
        });
    
        it('should fail if Expression in "while" IterationStatement is bracketed with braces', () => {
            expect(() => {
                parseScript(`while false break;`)
            }).to.throw();
        });
    
        it('should fail if Expression in "while" IterationStatement is bracketed with braces', () => {
            expect(() => {
                parseScript(`while true break;`)
            }).to.throw();
        });
    
        it('should fail if Expression in "while" IterationStatement is bracketed with braces', () => {
            expect(() => {
                parseScript(`while 0 break;`)
            }).to.throw();
        });
    
        it('should fail if Expression in "while" IterationStatement is bracketed with braces', () => {
            expect(() => {
                parseScript(`while 1 break;`)
            }).to.throw();
        });
    
        it('should fail if Expression in "while" IterationStatement is bracketed with braces', () => {
            expect(() => {
                parseScript(`while({1}){
                    break ;
                 };`)
                }).to.throw();
        });
    
        it('should fail on Lexical declaration (const) used in statement position', () => {
            expect(() => {
                parseScript(`while (false) const x = null;`)
            }).to.throw();
        });

        it('should fail if Generator declaration in statement position', () => {
            expect(() => {
                parseScript(`while (false) function* g() {}`)
            }).to.throw();
        });

        it('should fail on Lexical declaration (const) used in statement position', () => {
            expect(() => {
                parseScript(`while (false) const x = null;`)
            }).to.throw();
        });
    
        it('should fail on Lexical declaration (let) used in statement position', () => {
            expect(() => {
                parseScript(`while (false) let x;`)
            }).to.throw();
        });

        it('should throw if execution of "while 1 break" fails', () => {
            expect(() => {
                parseScript(`while 1 break;`)
            }).to.throw();
        });
    
        it('should throw if execution of "while 0 break" fails', () => {
            expect(() => {
                parseScript(`while 0 break;`)
            }).to.throw();
        });
    
        it('should throw if execution of "while true break" fails', () => {
            expect(() => {
                parseScript(`while true break;`)
            }).to.throw();
        });
    
        it('should throw if execution of "while false break" fails', () => {
            expect(() => {
                parseScript(`while false break;`)
            }).to.throw();
        });
    
        it('should throw if execution of while "" break" fails', () => {
            expect(() => {
                parseScript(`while '' break;`)
            }).to.throw();
        });
    
        it('should throw  in "while" IterationStatement is bracketed with braces', () => {
            expect(() => {
                parseScript(`while 'hood' break;`)
            }).to.throw();
        });
    
        it('should throw if AsyncFunctionDeclaration is allowed in statement position', () => {
            expect(() => {
                parseScript(`while (false) async function f() {}`)
            }).to.throw();
        });
    
        it('should throw if execution of "while false break" fails', () => {
            expect(() => {
                parseScript(`while false break;`)
            }).to.throw();
        });
    
        it('should throw if execution of "while 1 break" fails', () => {
            expect(() => {
                parseScript(`while (false) let x;`)
            }).to.throw();
        });
    
        it('should throw if Lexical declaration (let) are allowed in statement position (true)', () => {
            expect(() => {
                parseScript(`while (false) let x;`)
            }).to.throw();
        });
    
        it('should throw if Lexical declaration (let) are allowed in statement position (false)', () => {
            expect(() => {
                parseScript(`while (false) let x;`)
            }).to.throw();
        });
    
        it("should throw on \"while (false) function f() {}", () => {
            expect(() => {
                parseScript(`while (false) function f() {}`)
            }).to.throw();
        });
    
        it("should throw on \"if (true) let x;", () => {
            expect(() => {
                parseScript(`if (true) let x;`)
            }).to.throw();
        });
    
        it("should throw on \"with ({}) let x;", () => {
            expect(() => {
                parseScript(`with ({}) let x;`)
            }).to.throw();
        });
    
        it("should throw on \"with ({}) let x;", () => {
            expect(() => {
                parseModule(`with ({}) let x;`)
            }).to.throw();
        });
    
        it("should throw on \"if (true) let x;", () => {
            expect(() => {
                parseScript(`if (true) let x;`)
            }).to.throw();
        });
    
        it("should throw on \"with ({}) const x = null;", () => {
            expect(() => {
                parseScript(`with ({}) const x = null;`)
            }).to.throw();
        });
    
        it("should throw on \"if (true) let x;", () => {
            expect(() => {
                parseScript(`if (true) let x;`)
            }).to.throw();
        });
    
        it('should fail on "while(true) function a(){}"', () => {
            expect(() => {
                parseModule(`while(true) function a(){}`);
            }).to.throw();
        });
    
        it('should throw on function declarations in statement position in strict mode', () => {
            expect(() => {
                parseModule('while (false) function g() {}');
            }).to.throw();
        });
    
        it('should throw on function declarations in statement position in strict mode - "if (true) {} else function g() {}"', () => {
            expect(() => {
                parseScript('"use strict";  if (true) {} else function g() {}');
            }).to.throw();
        });
    
        it('should throw on function declarations in statement position in strict mode - "if (true) {} else function g() {}"', () => {
            expect(() => {
                parseScript('"use strict"; if (true) {} else function g() {}');
            }).to.throw();
        });
    
        it('should parse "while (x < 10) { x++; y--; }"', () => {
            expect(parseScript('while (x < 10) { x++; y--; }', {
                ranges: true,
                raw: true
            })).to.eql({
                "body": [{
                    "body": {
                        "body": [{
                                "end": 21,
                                "expression": {
                                    "argument": {
                                        "end": 18,
                                        "name": "x",
                                        "start": 17,
                                        "type": "Identifier"
                                    },
                                    "end": 20,
                                    "operator": "++",
                                    "prefix": false,
                                    "start": 17,
                                    "type": "UpdateExpression"
                                },
                                "start": 17,
                                "type": "ExpressionStatement"
                            },
                            {
                                "end": 26,
                                "expression": {
                                    "argument": {
                                        "end": 23,
                                        "name": "y",
                                        "start": 22,
                                        "type": "Identifier"
                                    },
                                    "end": 25,
                                    "operator": "--",
                                    "prefix": false,
                                    "start": 22,
                                    "type": "UpdateExpression"
                                },
                                "start": 22,
                                "type": "ExpressionStatement"
                            }
                        ],
                        "end": 28,
                        "start": 15,
                        "type": "BlockStatement"
                    },
                    "end": 28,
                    "start": 0,
                    "test": {
                        "end": 13,
                        "left": {
                            "end": 8,
                            "name": "x",
                            "start": 7,
                            "type": "Identifier"
                        },
                        "operator": "<",
                        "right": {
                            "end": 13,
                            "raw": "10",
                            "start": 11,
                            "type": "Literal",
                            "value": 10
                        },
                        "start": 7,
                        "type": "BinaryExpression"
                    },
                    "type": "WhileStatement"
                }],
                "end": 28,
                "sourceType": "script",
                "start": 0,
                "type": "Program"
            });
        });
   
        it('should parse FunctionExpression within a "while" Expression', () => {
            expect(parseScript(`while(1===1) {
                if(__in__do__before__break)break;
                var __in__do__before__break="can't";
                while (1) {
                    var __in__do__IN__before__break="get";
                    break;
                    var __in__do__IN__after__break="no";
                } ;
                var __in__do__after__break="Satisfaction";
            } ;`, {
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                        "type": "WhileStatement",
                        "test": {
                            "type": "BinaryExpression",
                            "operator": "===",
                            "left": {
                                "type": "Literal",
                                "value": 1,
                                "raw": "1"
                            },
                            "right": {
                                "type": "Literal",
                                "value": 1,
                                "raw": "1"
                            }
                        },
                        "body": {
                            "type": "BlockStatement",
                            "body": [{
                                    "type": "IfStatement",
                                    "test": {
                                        "type": "Identifier",
                                        "name": "__in__do__before__break"
                                    },
                                    "consequent": {
                                        "type": "BreakStatement",
                                        "label": null
                                    },
                                    "alternate": null
                                },
                                {
                                    "type": "VariableDeclaration",
                                    "declarations": [{
                                        "type": "VariableDeclarator",
                                        "id": {
                                            "type": "Identifier",
                                            "name": "__in__do__before__break"
                                        },
                                        "init": {
                                            "type": "Literal",
                                            "value": "can't",
                                            "raw": "\"can't\""
                                        }
                                    }],
                                    "kind": "var"
                                },
                                {
                                    "type": "WhileStatement",
                                    "test": {
                                        "type": "Literal",
                                        "value": 1,
                                        "raw": "1"
                                    },
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": [{
                                                "type": "VariableDeclaration",
                                                "declarations": [{
                                                    "type": "VariableDeclarator",
                                                    "id": {
                                                        "type": "Identifier",
                                                        "name": "__in__do__IN__before__break"
                                                    },
                                                    "init": {
                                                        "type": "Literal",
                                                        "value": "get",
                                                        "raw": "\"get\""
                                                    }
                                                }],
                                                "kind": "var"
                                            },
                                            {
                                                "type": "BreakStatement",
                                                "label": null
                                            },
                                            {
                                                "type": "VariableDeclaration",
                                                "declarations": [{
                                                    "type": "VariableDeclarator",
                                                    "id": {
                                                        "type": "Identifier",
                                                        "name": "__in__do__IN__after__break"
                                                    },
                                                    "init": {
                                                        "type": "Literal",
                                                        "value": "no",
                                                        "raw": "\"no\""
                                                    }
                                                }],
                                                "kind": "var"
                                            }
                                        ]
                                    }
                                },
                                {
                                    "type": "EmptyStatement"
                                },
                                {
                                    "type": "VariableDeclaration",
                                    "declarations": [{
                                        "type": "VariableDeclarator",
                                        "id": {
                                            "type": "Identifier",
                                            "name": "__in__do__after__break"
                                        },
                                        "init": {
                                            "type": "Literal",
                                            "value": "Satisfaction",
                                            "raw": "\"Satisfaction\""
                                        }
                                    }],
                                    "kind": "var"
                                }
                            ]
                        }
                    },
                    {
                        "type": "EmptyStatement"
                    }
                ],
                "sourceType": "script"
            });
        });
    
        it('should parse FunctionExpression within a "while" Expression', () => {
            expect(parseScript(`while(function __func(){return 0;}){
                var __reached = 1;
                break;
             };`, {
                ranges: true,
                raw: true
            })).to.eql({
                  "body": [
                    {
                      "body": {
                        "body": [
                          {
                            "declarations": [
                              {
                                "end": 70,
                                "id": {
                                  "end": 66,
                                  "name": "__reached",
                                  "start": 57,
                                  "type": "Identifier"
                                },
                                "init": {
                                  "end": 70,
                                  "raw": "1",
                                  "start": 69,
                                  "type": "Literal",
                                  "value": 1
                                },
                                "start": 57,
                                "type": "VariableDeclarator"
                              }
                            ],
                            "end": 71,
                            "kind": "var",
                            "start": 53,
                            "type": "VariableDeclaration"
                          },
                          {
                            "end": 94,
                            "label": null,
                            "start": 88,
                            "type": "BreakStatement"
                          }
                        ],
                        "end": 109,
                       "start": 35,
                        "type": "BlockStatement"
                      },
                      "end": 109,
                      "start": 0,
                      "test": {
                        "async": false,
                        "body": {
                          "body": [
                            {
                              "argument": {
                                "end": 32,
                               "raw": "0",
                               "start": 31,
                                "type": "Literal",
                                "value": 0
                              },
                              "end": 33,
                              "start": 24,
                              "type": "ReturnStatement"
                            },
                          ],
                          "end": 34,
                          "start": 23,
                          "type": "BlockStatement"
                        },
                        "end": 34,
                        "expression": false,
                        "generator": false,
                       "id": {
                          "end": 21,
                          "name": "__func",
                          "start": 15,
                          "type": "Identifier"
                       },
                        "params": [],
                        "start": 6,
                        "type": "FunctionExpression"
                      },
                      "type": "WhileStatement"
                   },
                    {
                      "end": 110,
                      "start": 109,
                      "type": "EmptyStatement"
                    }
                  ],
                  "end": 110,
                  "sourceType": "script",
                  "start": 0,
                  "type": "Program"
                });
        });
    
        it('should parse "while(1);"', () => {
    
            expect(parseScript(`while(1);`)).to.eql({
                "body": [{
                    "body": {
                        "type": "EmptyStatement"
                    },
                    "test": {
                        "type": "Literal",
                        "value": 1,
                    },
                    "type": "WhileStatement"
                }, ],
                "sourceType": "script",
                "type": "Program"
            });
        });
    
        it('should parse "while (true) {}"', () => {
            expect(parseScript(`while (true) {}`)).to.eql({
                "body": [{
                    "body": {
                        "body": [],
                        "type": "BlockStatement"
                    },
                    "test": {
                        "type": "Literal",
                        "value": true
                    },
                    "type": "WhileStatement"
                }],
                "sourceType": "script",
                "type": "Program"
            });
        });
    
        it('should parse "while (true) doSomething()"', () => {
    
            expect(parseScript(`while (true) doSomething()`)).to.eql({
                "body": [{
                    "body": {
                        "expression": {
                            "arguments": [],
                            "callee": {
                                "name": "doSomething",
                                "type": "Identifier"
                            },
                            "type": "CallExpression"
                        },
                        "type": "ExpressionStatement"
                    },
                    "test": {
                        "type": "Literal",
                        "value": true
                    },
                    "type": "WhileStatement"
                }],
                "sourceType": "script",
                "type": "Program"
            });
        });
    });