import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Statement - If', () => {

    it("should fail if the if statement is not enclosed in braces (false)", () => {
        expect(() => {
            parseScript(`if false`)
        }).to.throw();
    });

        it('should fail on async generator declaration in statement position', () => {
            expect(() => {
                parseScript(`if (false) ; else function* g() {  }`)
            }).to.throw();
        });
    
        it('should fail on async generator declaration in statement position', () => {
            expect(() => {
                parseScript(`if (false) label1: label2: function foo() {}`)
            }).to.not.throw();
        });
    
        it('should fail on async generator declaration in statement position', () => {
            expect(() => {
                parseScript(`if (true) async function* f() {  } else async function* _f() {}`)
            }).to.throw();
        });
    
        it('should fail on async generator declaration in statement position', () => {
            expect(() => {
                parseScript(`if (true) async function* f() {  } else async function* _f() {}`, {
                    next: true
                })
            }).to.throw();
        });
    
        it('should fail on AsyncFunctionDeclaration in statement position', () => {
            expect(() => {
                parseScript(`'use strict'; if (true) async function f() {  }`, {
                    next: true
                })
            }).to.not.throw();
        });
    
        it('should fail if class declaration are in statement position', () => {
            expect(() => {
                parseScript(`if (true) class C {} else ;`)
            }).to.throw();
        });
    
        it('should fail if AnnexB extension are honored in strict mode', () => {
            expect(() => {
                parseScript(`'use strict'; if (true) function f() {} else function _f() {}`)
            }).to.throw();
        });
    
        it('should fail if lexical declaration (const) are allowed in statement position', () => {
            expect(() => {
                parseModule(`if (false) ; else const x = null;`)
            }).to.throw();
        });
    
        it('should fail if AsyncFunctionDeclaration are allowed in statement position', () => {
            expect(() => {
                parseModule(`if (false) ; else async function f() {  }`)
            }).to.not.throw();
        });
    
        it('should fail on \'if (true) function* g() {  } else function* _g() {}', () => {
            expect(() => {
                parseScript(`if (true) function* g() {  } else function* _g() {}`)
            }).to.throw();
        });
    
        it('should fail on \'if (true) async function* g() {  } else function* _g() {}', () => {
            expect(() => {
                parseScript(`if (true) async function* g() {  } else function* _g() {}`)
            }).to.throw();
        });
    
        it('should fail on "function f(a){ super.b }"', () => {
            expect(() => {
                parseScript(`function f(a){ super.b }`)
            }).to.throw();
        });
    
        it("should fail on \"if (true) let x;", () => {
            expect(() => {
                parseScript(`if (true) let x;`)
            }).to.throw();
        });
    
        it('should fail on "if(0) break"', () => {
            expect(() => {
                parseScript(`if(0) break`)
            }).to.throw();
        });
    
        it("should fail on \"if (false) ; else const x = null;", () => {
            expect(() => {
                parseScript(`if (false) ; else const x = null;`)
            }).to.throw();
        });
    
        it("should fail on \"if (false) label1: label2: function test262() {}", () => {
            expect(() => {
                parseScript(`if (false) label1: label2: function test262() {}`)
            }).to.not.throw();
        });
    
        it("should fail if class declaration is in statement position", () => {
            expect(() => {
                parseScript(`if (true) class C {} else class D {}`)
            }).to.throw();
        });
    
        it("should fail if Generator declaration in statement position", () => {
            expect(() => {
                parseScript(`if (true) function* g() {  } else function* _g() {}`)
            }).to.throw();
        });
    
        it("should fail if Generator declaration in statement position", () => {
            expect(() => {
                parseScript(`"use strict"; if (false) ; else function f() {}`)
            }).to.throw();
        });
    
        it("should fail if  Lexical declaration (let)  in statement position", () => {
            expect(() => {
                parseScript(`if (false) ; else let x;`)
            }).to.throw();
        });
    
        it("should fail if lexical declaration (const) is in statement position", () => {
            expect(() => {
                parseScript(`if (true) const x = null; else ;`)
            }).to.throw();
        });
    
        it("should fail if lexical declaration (const) is in statement position", () => {
            expect(() => {
                parseScript(`if (true) const x = null;`)
            }).to.throw();
        });
    
        it("should fail if lexical declaration (let) is in statement position", () => {
            expect(() => {
                parseScript(`if (true) let x; else let y;`)
            }).to.throw();
        });
    
        it("should fail if lexical declaration (let) allowed in statement position", () => {
            expect(() => {
                parseScript(`if (true) let x;`)
            }).to.throw();
        });
    
        it("should fail if AsyncFunctionDeclaration is in statement position", () => {
            expect(() => {
                parseScript(`if (true) async *function f() {  } else async function _f() {}`)
            }).to.throw();
        });
    
        it("should fail if AsyncFunctionDeclaration is in statement position", () => {
            expect(() => {
                parseScript(`if (false) label1: label2: function test262() {} else ;`)
            }).to.not.throw();
        });
    
        it("should fail if  AnnexB extension are honored in strict mode (IfStatement without an else clause in the global scope)", () => {
            expect(() => {
                parseScript(`"use strict"; if (true) function f() {  }`)
            }).to.throw();
        });
    
        it("should fail if  AnnexB extension are honored in strict mode (IfStatement with a declaration in both statement positions in the global scope)", () => {
            expect(() => {
                parseScript(`"use strict"; if (true) function f() {} else function _f() {}`)
            }).to.throw();
        });
    
        it("should fail if  AnnexB extension are honored in strict mode (IfStatement with a declaration in the first statement position in the global scope)", () => {
            expect(() => {
                parseScript(`"use strict"; if (true) function f() {} else ;`)
            }).to.throw();
        });
    
        it('"should fail if execution of "if({1})" fails', () => {
            expect(() => {
                parseScript(`if({1})
      {
        ;
      }else
      {
        ;
      }`)
    }).to.throw();
        });
    
        it("should fail if the if statement is not enclosed in braces (true)", () => {
            expect(() => {
                parseScript(`if true`)
            }).to.throw();
        });
    
        it("should fail if the if statement is not enclosed in braces (false)", () => {
            expect(() => {
                parseScript(`if false`)
            }).to.throw();
        });
    
        it('expect "if (b,...a, );" to throw', () => {
            expect(() => {
                parseScript('if (b,...a, );');
            }).to.throw();
        });
    
        it('expect "if (b,...a, );" to throw', () => {
            expect(() => {
                parseScript('"use strict"; if (x) function f() {}');
            }).to.throw();
        });
        
    it('should parse "if + async identifier in sloppy mode"', () => {
        expect(parseScript(`if (a) async`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 12,
            "body": [
              {
                "type": "IfStatement",
                "start": 0,
                "end": 12,
                "test": {
                  "type": "Identifier",
                  "start": 4,
                  "end": 5,
                  "name": "a"
                },
                "consequent": {
                  "type": "ExpressionStatement",
                  "start": 7,
                  "end": 12,
                  "expression": {
                    "type": "Identifier",
                    "start": 7,
                    "end": 12,
                    "name": "async"
                  }
                },
                "alternate": null
              }
            ],
            "sourceType": "script"
          });
    });
    
        it('should parse "if (x) async function f() {}"', () => {
            expect(parseScript('if (x) async function f() {}', {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 28,
                "body": [{
                    "type": "IfStatement",
                    "start": 0,
                    "end": 28,
                    "test": {
                        "type": "Identifier",
                        "start": 4,
                        "end": 5,
                        "name": "x"
                    },
                    "consequent": {
                        "type": "FunctionDeclaration",
                        "start": 7,
                        "end": 28,
                        "id": {
                            "type": "Identifier",
                            "start": 22,
                            "end": 23,
                            "name": "f"
                        },
                        "generator": false,
                        "expression": false,
                        "async": true,
                        "params": [],
                        "body": {
                            "type": "BlockStatement",
                            "start": 26,
                            "end": 28,
                            "body": []
                        }
                    },
                    "alternate": null
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse "if (x) function fd() { return 23; } else function f() { return 42; }"', () => {
            expect(parseScript('if (x) function fd() { return 23; } else function f() { return 42; }', {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 68,
                "body": [{
                    "type": "IfStatement",
                    "start": 0,
                    "end": 68,
                    "test": {
                        "type": "Identifier",
                        "start": 4,
                        "end": 5,
                        "name": "x"
                    },
                    "consequent": {
                        "type": "FunctionDeclaration",
                        "start": 7,
                        "end": 35,
                        "id": {
                            "type": "Identifier",
                            "start": 16,
                            "end": 18,
                            "name": "fd"
                        },
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                            "type": "BlockStatement",
                            "start": 21,
                            "end": 35,
                            "body": [{
                                "type": "ReturnStatement",
                                "start": 23,
                                "end": 33,
                                "argument": {
                                    "type": "Literal",
                                    "start": 30,
                                    "end": 32,
                                    "value": 23,
                                    "raw": "23"
                                }
                            }]
                        }
                    },
                    "alternate": {
                        "type": "FunctionDeclaration",
                        "start": 41,
                        "end": 68,
                        "id": {
                            "type": "Identifier",
                            "start": 50,
                            "end": 51,
                            "name": "f"
                        },
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                            "type": "BlockStatement",
                            "start": 54,
                            "end": 68,
                            "body": [{
                                "type": "ReturnStatement",
                                "start": 56,
                                "end": 66,
                                "argument": {
                                    "type": "Literal",
                                    "start": 63,
                                    "end": 65,
                                    "value": 42,
                                    "raw": "42"
                                }
                            }]
                        }
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse "if (x) function f() {}"', () => {
            expect(parseScript('if (x) function f() {}', {
                ranges: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 22,
                "body": [{
                    "type": "IfStatement",
                    "start": 0,
                    "end": 22,
                    "test": {
                        "type": "Identifier",
                        "start": 4,
                        "end": 5,
                        "name": "x"
                    },
                    "consequent": {
                        "type": "FunctionDeclaration",
                        "start": 7,
                        "end": 22,
                        "id": {
                            "type": "Identifier",
                            "start": 16,
                            "end": 17,
                            "name": "f"
                        },
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                            "type": "BlockStatement",
                            "start": 20,
                            "end": 22,
                            "body": []
                        }
                    },
                    "alternate": null
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse "if(a)b;else c;"', () => {
            expect(parseScript('if(a)b;else c;')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "IfStatement",
                    "test": {
                        "type": "Identifier",
                        "name": "a"
                    },
                    "consequent": {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "Identifier",
                            "name": "b"
                        }
                    },
                    "alternate": {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "Identifier",
                            "name": "c"
                        }
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse if (morning) goodMorning()', () => {
            expect(parseScript('if (morning) goodMorning()')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "IfStatement",
                    "test": {
                        "type": "Identifier",
                        "name": "morning"
                    },
                    "consequent": {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "CallExpression",
                            "callee": {
                                "type": "Identifier",
                                "name": "goodMorning"
                            },
                            "arguments": []
                        }
                    },
                    "alternate": null
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse if (morning) (function(){})', () => {
            expect(parseScript('if (morning) (function(){})')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "IfStatement",
                    "test": {
                        "type": "Identifier",
                        "name": "morning"
                    },
                    "consequent": {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "FunctionExpression",
                            "id": null,
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "body": []
                            },
                            "generator": false,
                            "expression": false,
                            "async": false
                        }
                    },
                    "alternate": null
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse start: while (true) break start', () => {
            expect(parseScript('start: while (true) break start')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "LabeledStatement",
                    "label": {
                        "type": "Identifier",
                        "name": "start"
                    },
                    "body": {
                        "type": "WhileStatement",
                        "test": {
                            "type": "Literal",
                            "value": true
                        },
                        "body": {
                            "type": "BreakStatement",
                            "label": {
                                "type": "Identifier",
                                "name": "start"
                            }
                        }
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse_if (morning) var x = 0;', () => {
            expect(parseScript('if (morning) var x = 0;')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "IfStatement",
                    "test": {
                        "type": "Identifier",
                        "name": "morning"
                    },
                    "consequent": {
                        "type": "VariableDeclaration",
                        "declarations": [{
                            "type": "VariableDeclarator",
                            "id": {
                                "type": "Identifier",
                                "name": "x"
                            },
                            "init": {
                                "type": "Literal",
                                "value": 0
                            }
                        }],
                        "kind": "var"
                    },
                    "alternate": null
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse if (morning) function a(){}', () => {
            expect(parseScript('if (morning) function a(){}')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "IfStatement",
                    "test": {
                        "type": "Identifier",
                        "name": "morning"
                    },
                    "consequent": {
                        "type": "FunctionDeclaration",
                        "id": {
                            "type": "Identifier",
                            "name": "a"
                        },
                        "params": [],
                        "body": {
                            "type": "BlockStatement",
                            "body": []
                        },
                        "generator": false,
                        "expression": false,
                        "async": false
                    },
                    "alternate": null
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse if (morning) goodMorning(); else goodDay()', () => {
            expect(parseScript('if (morning) goodMorning(); else goodDay()')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "IfStatement",
                    "test": {
                        "type": "Identifier",
                        "name": "morning"
                    },
                    "consequent": {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "CallExpression",
                            "callee": {
                                "type": "Identifier",
                                "name": "goodMorning"
                            },
                            "arguments": []
                        }
                    },
                    "alternate": {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "CallExpression",
                            "callee": {
                                "type": "Identifier",
                                "name": "goodDay"
                            },
                            "arguments": []
                        }
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse_if (morning) var x = 0;', () => {
            expect(parseScript(`if (true) that()
    ; else;`)).to.eql({
                "type": "Program",
                "body": [{
                    "type": "IfStatement",
                    "test": {
                        "type": "Literal",
                        "value": true
                    },
                    "consequent": {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "CallExpression",
                            "callee": {
                                "type": "Identifier",
                                "name": "that"
                            },
                            "arguments": []
                        }
                    },
                    "alternate": {
                        "type": "EmptyStatement"
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse if (true) that(); else;', () => {
            expect(parseScript('if (true) that(); else;')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "IfStatement",
                    "test": {
                        "type": "Literal",
                        "value": true
                    },
                    "consequent": {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "CallExpression",
                            "callee": {
                                "type": "Identifier",
                                "name": "that"
                            },
                            "arguments": []
                        }
                    },
                    "alternate": {
                        "type": "EmptyStatement"
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse if (true) that(); else;', () => {
            expect(parseScript('if (true) that()\n; else;')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "IfStatement",
                    "test": {
                        "type": "Literal",
                        "value": true
                    },
                    "consequent": {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "CallExpression",
                            "callee": {
                                "type": "Identifier",
                                "name": "that"
                            },
                            "arguments": []
                        }
                    },
                    "alternate": {
                        "type": "EmptyStatement"
                    }
                }],
                "sourceType": "script"
            });
        });

        it('should parse nested if with try catah', () => {
            expect(parseScript(`(function(a) {
                if (b === c) {
                    if (d) {
                        try {} catch (e) {}
                    }
                }
            })`, {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 173,
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 0,
                    "end": 173,
                    "expression": {
                      "type": "FunctionExpression",
                      "start": 1,
                      "end": 172,
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [
                        {
                          "type": "Identifier",
                          "start": 10,
                          "end": 11,
                          "name": "a"
                        }
                      ],
                      "body": {
                        "type": "BlockStatement",
                        "start": 13,
                        "end": 172,
                        "body": [
                          {
                            "type": "IfStatement",
                            "start": 31,
                            "end": 158,
                            "test": {
                              "type": "BinaryExpression",
                              "start": 35,
                              "end": 42,
                              "left": {
                                "type": "Identifier",
                                "start": 35,
                                "end": 36,
                                "name": "b"
                              },
                              "operator": "===",
                              "right": {
                                "type": "Identifier",
                                "start": 41,
                                "end": 42,
                                "name": "c"
                              }
                            },
                            "consequent": {
                              "type": "BlockStatement",
                              "start": 44,
                              "end": 158,
                              "body": [
                                {
                                  "type": "IfStatement",
                                  "start": 66,
                                  "end": 140,
                                  "test": {
                                    "type": "Identifier",
                                    "start": 70,
                                    "end": 71,
                                    "name": "d"
                                  },
                                  "consequent": {
                                    "type": "BlockStatement",
                                    "start": 73,
                                    "end": 140,
                                    "body": [
                                      {
                                        "type": "TryStatement",
                                        "start": 99,
                                        "end": 118,
                                        "block": {
                                          "type": "BlockStatement",
                                          "start": 103,
                                          "end": 105,
                                          "body": []
                                        },
                                        "handler": {
                                          "type": "CatchClause",
                                          "start": 106,
                                          "end": 118,
                                          "param": {
                                            "type": "Identifier",
                                            "start": 113,
                                            "end": 114,
                                            "name": "e"
                                          },
                                          "body": {
                                            "type": "BlockStatement",
                                            "start": 116,
                                            "end": 118,
                                            "body": []
                                          }
                                        },
                                        "finalizer": null
                                      }
                                    ]
                                  },
                                  "alternate": null
                                }
                              ]
                            },
                            "alternate": null
                          }
                        ]
                      }
                    }
                  }
                ],
                "sourceType": "script"
              });
        });
    });