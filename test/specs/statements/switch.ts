import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Statement - Switch', () => {

        it('should fail on redeclaration with async function declaration', () => {
            expect(() => {
                parseScript(`switch (0) { case 1: async function f() {} default: async function f() {} }`);
            }).to.throw('');
        });
        it('should fail on redeclaration with async generator declaration', () => {
            expect(() => {
                parseScript(`switch (0) { case 1: async function f() {} default: async function* f() {} }`, {
                    next: true
                });
            }).to.throw('');
        });

        it('should fail redeclaration with class declaration', () => {
            expect(() => {
                parseScript(`switch (0) { case 1: async function f() {} default: class f {}; }`);
            }).to.throw('');
        });
        it('should fail on redeclaration with const lexical declaration', () => {
            expect(() => {
                parseScript(`switch (0) { case 1: async function f() {} default: const f = 0; }`);
            }).to.throw();
        });

        it('should fail on redeclaration with FunctionDeclaration', () => {
            expect(() => {
                parseScript(`switch (0) { case 1: async function f() {} default: function f() {} }`);
            }).to.throw('');
        });

        it('should fail on redeclaration with let lexical declaration', () => {
            expect(() => {
                parseScript(`witch (0) { case 1: async function f() {} default: let f; }`);
            }).to.throw('');
        });
        it('should fail on redeclaration with class declaration', () => {
            expect(() => {
                parseScript(`switch (0) { case 1: async function* f() {} default: class f {}; }`);
            }).to.throw('');
        });
        it('should fail on redeclaration with function declaration', () => {
            expect(() => {
                parseScript(`switch (0) { case 1: async function* f() {} default: function f() {} }`);
            }).to.throw('');
        });
        it('should fail on redeclaration with let-lexical declaration', () => {
            expect(() => {
                parseScript(`switch (0) { case 1: function f() {} default: let f; }`);
            }).to.throw();
        });
        it('should fail on redeclaration with async generatorDeclaration', () => {
            expect(() => {
                parseScript(`switch (0) { case 1: async function f() {} default: async function* f() {} }`);
            }).to.throw('');
        });

        it('should fail redeclaration with class declaration', () => {
            expect(() => {
                parseScript(`switch (0) { case 1: async function f() {} default: class f {}; }`);
            }).to.throw('');
        });
        it('redeclaration with let-LexicalDeclaration', () => {
            expect(() => {
                parseScript(`switch (0) { case 1: var f; default: let f; }`);
            }).to.throw('');
        });
        it('should fail on redeclaration with function declaration', () => {
            expect(() => {
                parseScript(`switch (0) { case 1: let f; default: function f() {} }`);
            }).to.throw('');
        });
        it('should fail on redeclaration with variable declaration', () => {
            expect(() => {
                parseScript(`switch (0) { case 1: let f; default: var f; }`);
            }).to.throw();
        });
    
        it('should fail on duplicate default clause', () => {
            expect(() => {
                parseScript(`function SwitchTest(value){
                        var result = 0;
                        
                        switch(value) {
                          case 0:
                            result += 2;
                          default:
                            result += 32;
                            break;
                          default:
                            result += 32;
                            break;
                        }
                        
                        return result;
                      }`);
            }).to.throw('');
        });

        it('should fail on duplicate', () => {
            expect(() => {
                parseScript(`switch (0) { case 1: async function f() {} default: let f; }`);
            }).to.throw();
        });
    
        it('should fail on redeclaration with const-LexicalDeclaration with no async gen support', () => {
            expect(() => {
                parseScript(`switch (0) { case 1: async function* f() {} default: const f = 0; }`);
            }).to.throw();
        });
    
        it('should fail on redeclaration with const-LexicalDeclaration', () => {
            expect(() => {
                parseScript(`switch (0) { case 1: async function* f() {} default: const f = 0; }`, {
                    next: true
                });
            }).to.throw();
        });
    
        it('should fail on redeclaration with FunctionDeclaration with no async gen support', () => {
            expect(() => {
                parseScript(`switch (0) { case 1: async function* f() {} default: function f() {} }`);
            }).to.throw();
        });
    
        it('should fail on redeclaration with FunctionDeclaration', () => {
            expect(() => {
                parseScript(`switch (0) { case 1: async function* f() {} default: function f() {} }`, {
                    next: true
                });
            }).to.throw();
        });
    
        it('should fail on  redeclaration with const-LexicalDeclaration ', () => {
            expect(() => {
                parseScript(`switch (0) { case 1: function f() {} default: const f = 0; }`);
            }).to.throw();
        });
    
        it('should fail on  redeclaration with const-LexicalDeclaration ', () => {
            expect(() => {
                parseScript(`switch (0) { case 1: function f() {} default: const f = 0; }`);
            }).to.throw();
        });
    
        it('should fail on redeclaration with FunctionDeclaration', () => {
            expect(() => {
                parseScript(`switch (0) { case 1: function f() {} default: function f() {} }`);
            }).to.throw();
        });
    
        it('should fail on duplicate default clause', () => {
            expect(() => {
                parseScript(`switch (0) { case 1: async function f() {} default: var f; }`);
            }).to.throw();
        });
    
        it('should fail on duplicate default clause', () => {
            expect(() => {
                parseScript(`switch (0) { case 1: async function* f() {} default: async function f() {} }`, {});
            }).to.throw();
        });
    
        it('should fail on duplicate default clause', () => {
            expect(() => {
                parseScript(`function SwitchTest(value){
                        var result = 0;

                        switch(value) {
                          case 0:
                            result += 2;
                          default:
                            result += 32;
                            break;
                          default:
                            result += 32;
                            break;
                        }
                        
                        return result;
                      }`);
            }).to.throw('');
        });
    
        it('expect "swicth (a) { case a: break; case b: break; case e: break; default: break; default: 12; }" to throw', () => {
            expect(() => {
                parseScript(`swicth (a) { case a: break; case b: break; case e: break; default: break; default: 12; }`);
            }).to.throw();
        });
    
        it("should throw on \"while (false) let x;`", () => {
            expect(() => {
                parseScript(`function SwitchTest(value){
          var result = 0;
          
          switch(value) {
              result =2;
            case 0:
              result += 2;
            default:
              result += 32;
              break;
          }
          
          return result;
        }`)
            }).to.throw('');
        });
    
        it('expect "switch (a) 12" to fail', () => {
            expect(() => {
                parseScript(`switch (a) 12`);
            }).to.throw();
        });
    
        it('expect "switch (a 12" to fail', () => {
            expect(() => {
                parseScript(`switch (a 12`);
            }).to.throw();
        });
        it('expect "switch ?" to fail', () => {
            expect(() => {
                parseScript(`switch ?`);
            }).to.throw();
        });
    
        it('should fail on "switch(0) { case 0: let a; default: let a; }for(const let = 0;;);"', () => {
            expect(() => {
                parseScript(`switch(0) { case 0: let a; default: let a; }for(const let = 0;;);`)
            }).to.throw();
        });
    
        it("should throw on \"while (false) let x;`", () => {
            expect(() => {
                parseScript(`function SwitchTest(value){
          var result = 0;
          
          switch {
            case 0:
              result += 2;
            default:
              result += 32;
              break;
          }
          
          return result;
        }
        
        var x = SwitchTest(0);`)
            }).to.throw();
        });
    
        it('expect "switch (cond) { case 10: let a = 20; " to throw', () => {
            expect(() => {
                parseScript('switch (cond) { case 10: let a = 20; ');
            }).to.throw();
        });
    
        it("should throw on \"while (false) let x;`", () => {
            expect(() => {
                parseScript(`function SwitchTest(value){
          var result = 0;
          
          switch {
            case 0:
              result += 2;
            default:
              result += 32;
              break;
          }
          
          return result;
        }
        
        var x = SwitchTest(0);`)
            }).to.throw();
        });
    
        it("should throw on \"while (false) let x;`", () => {
            expect(() => {
                parseScript(`function SwitchTest(value){
          var result = 0;
          
          switch(value) {
              result =2;
            case 0:
              result += 2;
            default:
              result += 32;
              break;
          }
          
          return result;
        }
        
        var x = SwitchTest(0);`)
            }).to.throw();
        });
    
        it('should parse function declarations in statement position in strict mode', () => {
            expect(parseScript('switch (answer) { case 42: hi(); break; default: break; }', {})).to.eql({
                type: "Program",
                body: [{
                    type: "SwitchStatement",
                    discriminant: {
                        type: "Identifier",
                        name: "answer",
                    },
                    cases: [{
                            type: "SwitchCase",
                            test: {
                                type: "Literal",
                                value: 42,
                            },
                            consequent: [{
                                    type: "ExpressionStatement",
                                    expression: {
                                        type: "CallExpression",
                                        callee: {
                                            type: "Identifier",
                                            name: "hi",
                                        },
                                        arguments: [],
                                    },
                                },
                                {
                                    type: "BreakStatement",
                                    label: null,
                                },
                            ],
                        },
                        {
                            type: "SwitchCase",
                            test: null,
                            consequent: [{
                                type: "BreakStatement",
                                label: null,
                            }, ],
                        },
                    ],
                }, ],
                sourceType: "script",
            });
        });
    
        it('should parse function declarations in statement position in strict mode', () => {
            expect(parseScript('switch(a){case 1:default:}', {})).to.eql({
                type: "Program",
                body: [{
                    type: "SwitchStatement",
                    discriminant: {
                        type: "Identifier",
                        name: "a",
                    },
                    cases: [{
                            type: "SwitchCase",
                            test: {
                                type: "Literal",
                                value: 1,
                            },
                            consequent: [],
                        },
                        {
                            type: "SwitchCase",
                            test: null,
                            consequent: [],
                        },
                    ],
                }, ],
                sourceType: "script",
            });
        });
    
        it('should parse function declarations in statement position in strict mode', () => {
            expect(parseScript('switch (answer) { case 0: let a; }', {})).to.eql({
                type: "Program",
                body: [{
                    type: "SwitchStatement",
                    discriminant: {
                        type: "Identifier",
                        name: "answer",
                    },
                    cases: [{
                        type: "SwitchCase",
                        test: {
                            type: "Literal",
                            value: 0,
                        },
                        consequent: [{
                            type: "VariableDeclaration",
                            declarations: [{
                                type: "VariableDeclarator",
                                id: {
                                    type: "Identifier",
                                    name: "a",
                                },
                                init: null,
                            }, ],
                            kind: "let",
                        }, ],
                    }, ],
                }, ],
                sourceType: "script",
            });
        });
    
        it('should parse function declarations in statement position in strict mode', () => {
            expect(parseScript('switch (answer) { case 0: hi(); break; default: break }', {})).to.eql({
                type: "Program",
                body: [{
                    type: "SwitchStatement",
                    discriminant: {
                        type: "Identifier",
                        name: "answer",
                    },
                    cases: [{
                            type: "SwitchCase",
                            test: {
                                type: "Literal",
                                value: 0,
                            },
                            consequent: [{
                                    type: "ExpressionStatement",
                                    expression: {
                                        type: "CallExpression",
                                        callee: {
                                            type: "Identifier",
                                            name: "hi",
                                        },
                                        arguments: [],
                                    },
                                },
                                {
                                    type: "BreakStatement",
                                    label: null,
                                },
                            ],
                        },
                        {
                            type: "SwitchCase",
                            test: null,
                            consequent: [{
                                type: "BreakStatement",
                                label: null,
                            }, ],
                        },
                    ],
                }, ],
                sourceType: "script",
            });
        });
    
        it('should parse function declarations in statement position in strict mode', () => {
            expect(parseScript('switch(a){case 1:default:case 2:}', {})).to.eql({
                type: "Program",
                body: [{
                    type: "SwitchStatement",
                    discriminant: {
                        type: "Identifier",
                        name: "a",
                    },
                    cases: [{
                            type: "SwitchCase",
                            test: {
                                type: "Literal",
                                value: 1,
                            },
                            consequent: [],
                        },
                        {
                            type: "SwitchCase",
                            test: null,
                            consequent: [],
                        },
                        {
                            type: "SwitchCase",
                            test: {
                                type: "Literal",
                                value: 2,
                            },
                            consequent: [],
                        },
                    ],
                }, ],
                sourceType: "script",
            });
        });
    
        it('should parse function declarations in statement position in strict mode', () => {
            expect(parseScript('switch(a){case 1:}', {})).to.eql({
                type: "Program",
                body: [{
                    type: "SwitchStatement",
                    discriminant: {
                        type: "Identifier",
                        name: "a",
                    },
                    cases: [{
                        type: "SwitchCase",
                        test: {
                            type: "Literal",
                            value: 1,
                        },
                        consequent: [],
                    }, ],
                }, ],
                sourceType: "script",
            });
        });
    
        it('should parse function declarations in statement position in strict mode', () => {
            expect(parseModule('switch (true) { case true: function g() {} }', {})).to.eql({
                "type": "Program",
                "body": [{
                    "type": "SwitchStatement",
                    "discriminant": {
                        "type": "Literal",
                        "value": true
                    },
                    "cases": [{
                        "type": "SwitchCase",
                        "test": {
                            "type": "Literal",
                            "value": true
                        },
                        "consequent": [{
                            "type": "FunctionDeclaration",
                            "id": {
                                "type": "Identifier",
                                "name": "g"
                            },
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "body": []
                            },
                            "generator": false,
                            "expression": false,
                            "async": false
                        }]
                    }]
                }],
                "sourceType": "module"
            });
        });
    
        it('should parse switch (x) {}', () => {
            expect(parseScript('switch (x) {}', {})).to.eql({
                "type": "Program",
                "body": [{
                    "type": "SwitchStatement",
                    "discriminant": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "cases": []
                }],
                "sourceType": "script"
            });
        });

      
    });