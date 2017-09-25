import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Espressions - Async', () => {

    it('should fail if formal parameter contains super call"', () => {
        expect(() => {
            parseScript(`(async function foo (foo = super()) { var bar; });`)
        }).to.throw();
    });

    it('should fail if contain eval (strict)"', () => {
        expect(() => {
            parseScript(`"use strict"; (async function eval () { })`)
        }).to.throw();
    });

    it('should fail on duplicates"', () => {
        expect(() => {
            parseScript(`(async function foo (bar) { let bar; });`)
        }).to.throw();
    });

    it('should fail on await as identifier reference', () => {
        expect(() => {
            parseScript(`var fn = async function () {
                void await;
              };`)
        }).to.throw();
    });

    it('should fail on await as label identifier', () => {
        expect(() => {
            parseScript(`var fn = async function () {
                await: ;
              };`)
        }).to.throw();
    });

    it('should fail on async a"', () => {
        expect(() => {
            parseScript(`async a`)
        }).to.throw();
    });

    it('should fail on "async ()"', () => {
        expect(() => {
            parseScript(`* ()`);
        }).to.throw();
    });

    it('should fail on "await = 0"', () => {
        expect(() => {
            parseModule(`await = 0`);
        }).to.throw();
    });

    it('should fail on "({async\nfoo() { }})"', () => {
        expect(() => {
            parseScript(`({async\nfoo() { }})`);
        }).to.throw();
    });

    it('should fail on "({async set foo(value) { }})"', () => {
        expect(() => {
            parseScript(`({async set foo(value) { }})`);
        }).to.not.throw();
    });

    it('should fail on "({async foo() { return {await} }})"', () => {
        expect(() => {
            parseScript(`({async foo() { return {await} }})`);
        }).to.throw();
    });

    it('should fail on "({async foo: 1})"', () => {
        expect(() => {
            parseScript(`({async foo: 1})`);
        }).to.not.throw();
    });

    it('should fail on "async ({a = b})"', () => {
        expect(() => {
            parseScript(`async ({a = b})`);
        }).to.not.throw();
    });

    it('should fail on "({async\nfoo() { }})"', () => {
        expect(() => {
            parseScript(`({async\nfoo() { }})`);
        }).to.throw();
    });

    it('should fail on "({async set foo(value) { }})"', () => {
        expect(() => {
            parseScript(`({async set foo(value) { }})`);
        }).to.not.throw();
    });

    describe('Object Methods', () => {

        it('should fail on async generators if options aren\'t set for it', () => {
            expect(() => {
                parseScript(`x = { async *g() {} }`, {});
            }).to.throw();
        });

        it('should fail on "({async foo(a = await b) {}})"', () => {
            expect(() => {
                parseScript(`({async foo(a = await b) {}})`);
            }).to.throw();
        });

        it('should fail on invalid async getter', () => {
            expect(() => {
                parseScript(`x = { async get g() {} }`, {});
            }).to.not.throw();
        });

        it('should fail on invalid line break after async', () => {
            expect(() => {
                parseScript(`({ async\nf(){} })`, {});
            }).to.throw();
        });
        it('should fail on invalid method', () => {
            expect(() => {
                parseScript(`x = { async f: function() {} }`, {});
            }).to.not.throw();
        });

        it('should parse async as an identifier in blockstatement', () => {
            expect(parseScript('{ async, foo }', {
                raw: true,
                ranges: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 14,
                "body": [
                  {
                    "type": "BlockStatement",
                    "start": 0,
                    "end": 14,
                    "body": [
                      {
                        "type": "ExpressionStatement",
                        "start": 2,
                        "end": 12,
                        "expression": {
                          "type": "SequenceExpression",
                          "start": 2,
                          "end": 12,
                          "expressions": [
                            {
                              "type": "Identifier",
                              "start": 2,
                              "end": 7,
                              "name": "async"
                            },
                            {
                              "type": "Identifier",
                              "start": 9,
                              "end": 12,
                              "name": "foo"
                            }
                          ]
                        }
                      }
                    ]
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse async as an identifier', () => {
            expect(parseScript('typeof async == "string"', {
                raw: true,
                ranges: true,
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 24,
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 0,
                    "end": 24,
                    "expression": {
                      "type": "BinaryExpression",
                      "start": 0,
                      "end": 24,
                      "left": {
                        "type": "UnaryExpression",
                        "start": 0,
                        "end": 12,
                        "operator": "typeof",
                        "prefix": true,
                        "argument": {
                          "type": "Identifier",
                          "start": 7,
                          "end": 12,
                          "name": "async"
                        }
                      },
                      "operator": "==",
                      "right": {
                        "type": "Literal",
                        "start": 16,
                        "end": 24,
                        "value": "string",
                        "raw": "\"string\""
                      }
                    }
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse async as an identifier module code', () => {
            expect(parseModule('async', {
                raw: true,
                ranges: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 5,
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 0,
                    "end": 5,
                    "expression": {
                      "type": "Identifier",
                      "start": 0,
                      "end": 5,
                      "name": "async"
                    }
                  }
                ],
                "sourceType": "module"
              });
        });
        it('should parse async as an member expression', () => {
            expect(parseScript('async.abc', {
                raw: true,
                ranges: true,
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 9,
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 0,
                    "end": 9,
                    "expression": {
                      "type": "MemberExpression",
                      "start": 0,
                      "end": 9,
                      "object": {
                        "type": "Identifier",
                        "start": 0,
                        "end": 5,
                        "name": "async"
                      },
                      "property": {
                        "type": "Identifier",
                        "start": 6,
                        "end": 9,
                        "name": "abc"
                      },
                      "computed": false
                    }
                  }
                ],
                "sourceType": "script"
              });
        });
                 it('should parse async as an identifier', () => {
            expect(parseScript('async', {
                raw: true,
                ranges: true
            })).to.eql({
                  "body": [
                    {
                      "end": 5,
                      "expression": {
                        "end": 5,
                        "name": "async",
                        "start": 0,
                        "type": "Identifier"
                      },
                      "start": 0,
                      "type": "ExpressionStatement"
                    }
                  ],
                  "end": 5,
                  "sourceType": "script",
                  "start": 0,
                  "type": "Program"
                });
        });
        it('should parse async as an identifier', () => {
            expect(parseScript('({async})', {
                raw: true,
                ranges: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 9,
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 0,
                    "end": 9,
                    "expression": {
                      "type": "ObjectExpression",
                      "start": 1,
                      "end": 8,
                      "properties": [
                        {
                          "type": "Property",
                          "start": 2,
                          "end": 7,
                          "method": false,
                          "shorthand": true,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 2,
                            "end": 7,
                            "name": "async"
                          },
                          "kind": "init",
                          "value": {
                            "type": "Identifier",
                            "start": 2,
                            "end": 7,
                            "name": "async"
                          }
                        }
                      ]
                    }
                  }
                ],
                "sourceType": "script"
              });
        });
        
        it('should parse async as an identifier', () => {
            expect(parseScript('({ async delete() {} })', {
                raw: true,
                ranges: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 23,
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 0,
                    "end": 23,
                    "expression": {
                      "type": "ObjectExpression",
                      "start": 1,
                      "end": 22,
                      "properties": [
                        {
                          "type": "Property",
                          "start": 3,
                          "end": 20,
                          "method": true,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 9,
                            "end": 15,
                            "name": "delete"
                          },
                          "kind": "init",
                          "value": {
                            "type": "FunctionExpression",
                            "start": 15,
                            "end": 20,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": true,
                            "params": [],
                            "body": {
                              "type": "BlockStatement",
                              "start": 18,
                              "end": 20,
                              "body": []
                            }
                          }
                        }
                      ]
                    }
                  }
                ],
                "sourceType": "script"
              });
        });

                  it('should parse async as an identifier', () => {
            expect(parseScript('({ async: true })', {
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "ObjectExpression",
                        "properties": [{
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "async"
                            },
                            "computed": false,
                            "value": {
                                "type": "Literal",
                                "value": true,
                                "raw": "true"
                            },
                            "kind": "init",
                            "method": false,
                            "shorthand": false
                        }]
                    }
                }],
                "sourceType": "script"
            });
        });

        it('should parse literal', () => {
            expect(parseScript('({ async "xyz"() {} })', {
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "ObjectExpression",
                        "properties": [{
                            "type": "Property",
                            "key": {
                                "type": "Literal",
                                "value": "xyz",
                                "raw": "\"xyz\""
                            },
                            "computed": false,
                            "value": {
                                "type": "FunctionExpression",
                                "id": null,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": []
                                },
                                "generator": false,
                                "expression": false,
                                "async": true
                            },
                            "kind": "init",
                            "method": true,
                            "shorthand": false
                        }]
                    }
                }],
                "sourceType": "script"
            });
        });


        it('should parse method', () => {
            expect(parseScript(`obj = { async method() {} };`, {
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "operator": "=",
                        "left": {
                            "type": "Identifier",
                            "name": "obj"
                        },
                        "right": {
                            "type": "ObjectExpression",
                            "properties": [{
                                "type": "Property",
                                "key": {
                                    "type": "Identifier",
                                    "name": "method"
                                },
                                "computed": false,
                                "value": {
                                    "type": "FunctionExpression",
                                    "id": null,
                                    "params": [],
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": []
                                    },
                                    "generator": false,
                                    "expression": false,
                                    "async": true
                                },
                                "kind": "init",
                                "method": true,
                                "shorthand": false
                            }]
                        }
                    }
                }],
                "sourceType": "script"
            });
        });

        it('should parse number', () => {
            expect(parseScript('({ async 3() {} })', {
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "ObjectExpression",
                        "properties": [{
                            "type": "Property",
                            "key": {
                                "type": "Literal",
                                "value": 3,
                                "raw": "3"
                            },
                            "computed": false,
                            "value": {
                                "type": "FunctionExpression",
                                "id": null,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": []
                                },
                                "generator": false,
                                "expression": false,
                                "async": true
                            },
                            "kind": "init",
                            "method": true,
                            "shorthand": false
                        }]
                    }
                }],
                "sourceType": "script"
            });
        });

        it('should parse method', () => {
            expect(parseScript('({ async f() {} })', {
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "ObjectExpression",
                        "properties": [{
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "f"
                            },
                            "computed": false,
                            "value": {
                                "type": "FunctionExpression",
                                "id": null,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": []
                                },
                                "generator": false,
                                "expression": false,
                                "async": true
                            },
                            "kind": "init",
                            "method": true,
                            "shorthand": false
                        }]
                    }
                }],
                "sourceType": "script"
            });
        });
    });

    it('should parse literal', () => {
        expect(parseScript('({ async "xyz"() {} })', {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ObjectExpression",
                    "properties": [{
                        "type": "Property",
                        "key": {
                            "type": "Literal",
                            "value": "xyz",
                            "raw": "\"xyz\""
                        },
                        "computed": false,
                        "value": {
                            "type": "FunctionExpression",
                            "id": null,
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "body": []
                            },
                            "generator": false,
                            "expression": false,
                            "async": true
                        },
                        "kind": "init",
                        "method": true,
                        "shorthand": false
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse computed', () => {
        expect(parseScript('({ async ["xyz"]() {} })', {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ObjectExpression",
                    "properties": [{
                        "type": "Property",
                        "key": {
                            "type": "Literal",
                            "value": "xyz",
                            "raw": "\"xyz\""
                        },
                        "computed": true,
                        "value": {
                            "type": "FunctionExpression",
                            "id": null,
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "body": []
                            },
                            "generator": false,
                            "expression": false,
                            "async": true
                        },
                        "kind": "init",
                        "method": true,
                        "shorthand": false
                    }]
                }
            }],
            "sourceType": "script"
        });
    });


    it('should parse async as an identifier', () => {
        expect(parseScript('({ async: true })', {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ObjectExpression",
                    "properties": [{
                        "type": "Property",
                        "key": {
                            "type": "Identifier",
                            "name": "async"
                        },
                        "computed": false,
                        "value": {
                            "type": "Literal",
                            "value": true,
                            "raw": "true"
                        },
                        "kind": "init",
                        "method": false,
                        "shorthand": false
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse await"', () => {
        expect(parseScript('({ async f(a) { await a } })', {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ObjectExpression",
                    "properties": [{
                        "type": "Property",
                        "key": {
                            "type": "Identifier",
                            "name": "f"
                        },
                        "computed": false,
                        "value": {
                            "type": "FunctionExpression",
                            "id": null,
                            "params": [{
                                "type": "Identifier",
                                "name": "a"
                            }],
                            "body": {
                                "type": "BlockStatement",
                                "body": [{
                                    "type": "ExpressionStatement",
                                    "expression": {
                                        "type": "AwaitExpression",
                                        "argument": {
                                            "type": "Identifier",
                                            "name": "a"
                                        }
                                    }
                                }]
                            },
                            "generator": false,
                            "expression": false,
                            "async": true
                        },
                        "kind": "init",
                        "method": true,
                        "shorthand": false
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse await"', () => {
        expect(parseScript('({ async f(a) { await a } })', {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ObjectExpression",
                    "properties": [{
                        "type": "Property",
                        "key": {
                            "type": "Identifier",
                            "name": "f"
                        },
                        "computed": false,
                        "value": {
                            "type": "FunctionExpression",
                            "id": null,
                            "params": [{
                                "type": "Identifier",
                                "name": "a"
                            }],
                            "body": {
                                "type": "BlockStatement",
                                "body": [{
                                    "type": "ExpressionStatement",
                                    "expression": {
                                        "type": "AwaitExpression",
                                        "argument": {
                                            "type": "Identifier",
                                            "name": "a"
                                        }
                                    }
                                }]
                            },
                            "generator": false,
                            "expression": false,
                            "async": true
                        },
                        "kind": "init",
                        "method": true,
                        "shorthand": false
                    }]
                }
            }],
            "sourceType": "script"
        });
    });


    it('should parse async as an identifier', () => {
        expect(parseScript('({ async: true })', {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ObjectExpression",
                    "properties": [{
                        "type": "Property",
                        "key": {
                            "type": "Identifier",
                            "name": "async"
                        },
                        "computed": false,
                        "value": {
                            "type": "Literal",
                            "value": true,
                            "raw": "true"
                        },
                        "kind": "init",
                        "method": false,
                        "shorthand": false
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse computed', () => {
        expect(parseScript('({ async ["xyz"]() {} })', {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ObjectExpression",
                    "properties": [{
                        "type": "Property",
                        "key": {
                            "type": "Literal",
                            "value": "xyz",
                            "raw": "\"xyz\""
                        },
                        "computed": true,
                        "value": {
                            "type": "FunctionExpression",
                            "id": null,
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "body": []
                            },
                            "generator": false,
                            "expression": false,
                            "async": true
                        },
                        "kind": "init",
                        "method": true,
                        "shorthand": false
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    describe('Class Methods', () => {

        it('should fail on invalid async constructor', () => {
            expect(() => {
                parseScript(`class X { async constructor(){} }`, {});
            }).to.throw();
        });

        it('should fail on "class A {async\nfoo() { }}"', () => {
            expect(() => {
                parseScript(`class A {async\nfoo() { }}`, {});
            }).to.throw();
        });

        it('should fail on "class A {static async\nfoo() { }}"', () => {
            expect(() => {
                parseScript(`class A {static async\nfoo() { }}`, {});
            }).to.throw();
        });

        it('should fail on "class A {async constructor() { }}"', () => {
            expect(() => {
                parseScript(`class A {async constructor() { }}`, {});
            }).to.throw();
        });


        it('should fail on "class A {static async get foo() { }}"', () => {
            expect(() => {
                parseScript(`class A {static async get foo() { }}`, {});
            }).to.throw();
        });

        it('should fail on "class A {async foo(await) { }}"', () => {
            expect(() => {
                parseScript(`class A {async foo(await) { }}`, {});
            }).to.throw();
        });

        it('should fail on "class A {async foo() { return {await} }}"', () => {
            expect(() => {
                parseScript(`class A {async foo() { return {await} }}`, {});
            }).to.throw();
        });
        
        it('should fail on "async function foo(bar = await baz()) {}"', () => {
            expect(() => {
                parseModule(`async function foo(bar = await baz()) {}`, {});
            }).to.throw();
        });

        it('should fail on "await"', () => {
            expect(() => {
                parseModule(`await`, {});
            }).to.throw();
        });

        it('should fail on "await a"', () => {
            expect(() => {
                parseModule(`await a`, {});
            }).to.throw();
        });

        it('should fail on "await a"', () => {
            expect(() => {
                parseScript(`await a`, {});
            }).to.throw();
        });

        it('should fail on "(class {async foo() { await }})"', () => {
            expect(() => {
                parseModule(`(class {async foo() { await }})`, {});
            }).to.throw();
        });

        it('should fail on "async (a = await b) => {}"', () => {
            expect(() => {
                parseModule(`async (a = await b) => {}`, {});
            }).to.throw();
        });

        it('should fail on "({async foo(a = await b) {}})"', () => {
            expect(() => {
                parseModule(`({async foo(a = await b) {}})`, {});
            }).to.throw();
        });

        it('should fail on "(class {async foo(a = await b) {}})"', () => {
            expect(() => {
                parseModule(`(class {async foo(a = await b) {}})`, {});
            }).to.throw();
        });

        it('should fail on "(async)(a) => 12"', () => {
            expect(() => {
                parseModule(`(async)(a) => 12`, {});
            }).to.not.throw();
        });

        it('should fail on "f = async ((x)) => x"', () => {
            expect(() => {
                parseModule(`f = async ((x)) => x`, {});
            }).to.not.throw();
        });

        it('should fail on "class A {static async get foo() { }}"', () => {
            expect(() => {
                parseScript(`class A {static async get foo() { }}`, {});
            }).to.throw();
        });

        it('should fail on invalid async static', () => {
            expect(() => {
                parseScript(`class X { async static f() {} }`, {});
            }).to.throw();
        });

        it('should fail on invalid async static', () => {
            expect(() => {
                parseScript(`class X { async static f() {} }`, {});
            }).to.throw();
        });

        it('should fail on invalid static async generator', () => {
            expect(() => {
                parseScript(`class X { static async *g(){} }`, {});
            }).to.throw();
        });

        it('should fail on invalid static async getter', () => {
            expect(() => {
                parseScript(`class X { static async get() {} }`, {});
            }).to.not.throw();
        });

        it('should fail on invalid static async setter', () => {
            expect(() => {
                parseScript(`class X { static async set(v){} }`, {});
            }).to.not.throw();
        });

        it('should fail on invalid async get', () => {
            expect(() => {
                parseScript(`class X { async get(){} }`, {});
            }).to.not.throw();
        });

        it('should fail on invalid async set', () => {
            expect(() => {
                parseScript(`class X { async set(v){} }`, {});
            }).to.not.throw();
        });

        
        it('should parse identifier async"', () => {
            expect(parseScript('var async; async = 3;', {
                raw: true,
                ranges: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 21,
                "body": [
                  {
                    "type": "VariableDeclaration",
                    "start": 0,
                    "end": 10,
                    "declarations": [
                      {
                        "type": "VariableDeclarator",
                        "start": 4,
                        "end": 9,
                        "id": {
                          "type": "Identifier",
                          "start": 4,
                          "end": 9,
                          "name": "async"
                        },
                        "init": null
                      }
                    ],
                    "kind": "var"
                  },
                  {
                    "type": "ExpressionStatement",
                    "start": 11,
                    "end": 21,
                    "expression": {
                      "type": "AssignmentExpression",
                      "start": 11,
                      "end": 20,
                      "operator": "=",
                      "left": {
                        "type": "Identifier",
                        "start": 11,
                        "end": 16,
                        "name": "async"
                      },
                      "right": {
                        "type": "Literal",
                        "start": 19,
                        "end": 20,
                        "value": 3,
                        "raw": "3"
                      }
                    }
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse property async', () => {
            expect(parseScript('x = { async: false }', {
                raw: true,
                ranges: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 20,
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 0,
                    "end": 20,
                    "expression": {
                      "type": "AssignmentExpression",
                      "start": 0,
                      "end": 20,
                      "operator": "=",
                      "left": {
                        "type": "Identifier",
                        "start": 0,
                        "end": 1,
                        "name": "x"
                      },
                      "right": {
                        "type": "ObjectExpression",
                        "start": 4,
                        "end": 20,
                        "properties": [
                          {
                            "type": "Property",
                            "start": 6,
                            "end": 18,
                            "method": false,
                            "shorthand": false,
                            "computed": false,
                            "key": {
                              "type": "Identifier",
                              "start": 6,
                              "end": 11,
                              "name": "async"
                            },
                            "value": {
                              "type": "Literal",
                              "start": 13,
                              "end": 18,
                              "value": false,
                              "raw": "false"
                            },
                            "kind": "init"
                          }
                        ]
                      }
                    }
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse strict name async', () => {
            expect(parseScript('class X { static async() {} }', {
                raw: true,
                ranges: false
            })).to.eql({
                "type": "Program",
                "body": [
                    {
                        "type": "ClassDeclaration",
                        "id": {
                            "type": "Identifier",
                            "name": "X"
                        },
                        "superClass": null,
                        "body": {
                            "type": "ClassBody",
                            "body": [
                                {
                                    "type": "MethodDefinition",
                                    "computed": false,
                                    "key": {
                                        "type": "Identifier",
                                        "name": "async"
                                    },
                                    "kind": "method",
                                    "static": true,
                                    "value": {
                                        "type": "FunctionExpression",
                                        "id": null,
                                        "params": [],
                                        "body": {
                                            "type": "BlockStatement",
                                            "body": []
                                        },
                                        "generator": false,
                                        "async": false,
                                        "expression": false
                                    }
                                }
                            ]
                        }
                    }
                ],
                "sourceType": "script"
            });
        });

        it('should parse label async"', () => {
            expect(parseScript('async: function f() {}', {
                raw: true,
                ranges: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 22,
                "body": [
                  {
                    "type": "LabeledStatement",
                    "start": 0,
                    "end": 22,
                    "body": {
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
                    "label": {
                      "type": "Identifier",
                      "start": 0,
                      "end": 5,
                      "name": "async"
                    }
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse "(class {async foo(a) { await a }})"', () => {
            expect(parseScript('(class {async foo(a) { await a }})', {
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "ClassExpression",
                        "id": null,
                        "superClass": null,
                        "body": {
                            "type": "ClassBody",
                            "body": [{
                                "type": "MethodDefinition",
                                "key": {
                                    "type": "Identifier",
                                    "name": "foo"
                                },
                                "computed": false,
                                "value": {
                                    "type": "FunctionExpression",
                                    "id": null,
                                    "params": [{
                                        "type": "Identifier",
                                        "name": "a"
                                    }],
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": [{
                                            "type": "ExpressionStatement",
                                            "expression": {
                                                "type": "AwaitExpression",
                                                "argument": {
                                                    "type": "Identifier",
                                                    "name": "a"
                                                }
                                            }
                                        }]
                                    },
                                    "generator": false,
                                    "expression": false,
                                    "async": true
                                },
                                "kind": "method",
                                "static": false
                            }]
                        }
                    }
                }],
                "sourceType": "script"
            });
        });

        it('should parse "class X { async 1(){} }"', () => {
            expect(parseScript('class X { async 1(){} }', {
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ClassDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "X"
                    },
                    "superClass": null,
                    "body": {
                        "type": "ClassBody",
                        "body": [{
                            "type": "MethodDefinition",
                            "key": {
                                "type": "Literal",
                                "value": 1,
                                "raw": "1"
                            },
                            "computed": false,
                            "value": {
                                "type": "FunctionExpression",
                                "id": null,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": []
                                },
                                "generator": false,
                                "expression": false,
                                "async": true
                            },
                            "kind": "method",
                            "static": false
                        }]
                    }
                }],
                "sourceType": "script"
            });
        });

        it('should parse computed"', () => {
            expect(parseScript('class X { async ["f"](){} }', {
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ClassDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "X"
                    },
                    "superClass": null,
                    "body": {
                        "type": "ClassBody",
                        "body": [{
                            "type": "MethodDefinition",
                            "key": {
                                "type": "Literal",
                                "value": "f",
                                "raw": "\"f\""
                            },
                            "computed": true,
                            "value": {
                                "type": "FunctionExpression",
                                "id": null,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": []
                                },
                                "generator": false,
                                "expression": false,
                                "async": true
                            },
                            "kind": "method",
                            "static": false
                        }]
                    }
                }],
                "sourceType": "script"
            });
        });

        it('should parse literal"', () => {
            expect(parseScript('class X { async "f"(){} }', {
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ClassDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "X"
                    },
                    "superClass": null,
                    "body": {
                        "type": "ClassBody",
                        "body": [{
                            "type": "MethodDefinition",
                            "key": {
                                "type": "Literal",
                                "value": "f",
                                "raw": "\"f\""
                            },
                            "computed": false,
                            "value": {
                                "type": "FunctionExpression",
                                "id": null,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": []
                                },
                                "generator": false,
                                "expression": false,
                                "async": true
                            },
                            "kind": "method",
                            "static": false
                        }]
                    }
                }],
                "sourceType": "script"
            });
        });

        it('should parse number"', () => {
            expect(parseScript('class X { async 3(){} }', {
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ClassDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "X"
                    },
                    "superClass": null,
                    "body": {
                        "type": "ClassBody",
                        "body": [{
                            "type": "MethodDefinition",
                            "key": {
                                "type": "Literal",
                                "value": 3,
                                "raw": "3"
                            },
                            "computed": false,
                            "value": {
                                "type": "FunctionExpression",
                                "id": null,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": []
                                },
                                "generator": false,
                                "expression": false,
                                "async": true
                            },
                            "kind": "method",
                            "static": false
                        }]
                    }
                }],
                "sourceType": "script"
            });
        });

        it('should parse method"', () => {
            expect(parseScript('class X { async f(){} }', {
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ClassDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "X"
                    },
                    "superClass": null,
                    "body": {
                        "type": "ClassBody",
                        "body": [{
                            "type": "MethodDefinition",
                            "key": {
                                "type": "Identifier",
                                "name": "f"
                            },
                            "computed": false,
                            "value": {
                                "type": "FunctionExpression",
                                "id": null,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": []
                                },
                                "generator": false,
                                "expression": false,
                                "async": true
                            },
                            "kind": "method",
                            "static": false
                        }]
                    }
                }],
                "sourceType": "script"
            });
        });

        it('should parse static method"', () => {
            expect(parseScript('class X { static async f(){} }', {
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ClassDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "X"
                    },
                    "superClass": null,
                    "body": {
                        "type": "ClassBody",
                        "body": [{
                            "type": "MethodDefinition",
                            "key": {
                                "type": "Identifier",
                                "name": "f"
                            },
                            "computed": false,
                            "value": {
                                "type": "FunctionExpression",
                                "id": null,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": []
                                },
                                "generator": false,
                                "expression": false,
                                "async": true
                            },
                            "kind": "method",
                            "static": true
                        }]
                    }
                }],
                "sourceType": "script"
            });
        });
    });

    it('should parse static method"', () => {
        expect(parseScript(`async function test() {
            if (a()) {
              if (b()) {
                c();
                return;
              }
              if (await d()) {
                await e();
                if (f()) {
                  return await g();
                } else {
                  return h();
                }
              }
              return i();
            }
            return await j();
          }`, {
            raw: true,
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 424,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 424,
                "id": {
                  "type": "Identifier",
                  "start": 15,
                  "end": 19,
                  "name": "test"
                },
                "generator": false,
                "expression": false,
                "async": true,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 22,
                  "end": 424,
                  "body": [
                    {
                      "type": "IfStatement",
                      "start": 36,
                      "end": 382,
                      "test": {
                        "type": "CallExpression",
                        "start": 40,
                        "end": 43,
                        "callee": {
                          "type": "Identifier",
                          "start": 40,
                          "end": 41,
                          "name": "a"
                        },
                        "arguments": []
                      },
                      "consequent": {
                        "type": "BlockStatement",
                        "start": 45,
                        "end": 382,
                        "body": [
                          {
                            "type": "IfStatement",
                            "start": 61,
                            "end": 132,
                            "test": {
                              "type": "CallExpression",
                              "start": 65,
                              "end": 68,
                              "callee": {
                                "type": "Identifier",
                                "start": 65,
                                "end": 66,
                                "name": "b"
                              },
                              "arguments": []
                            },
                            "consequent": {
                              "type": "BlockStatement",
                              "start": 70,
                              "end": 132,
                              "body": [
                                {
                                  "type": "ExpressionStatement",
                                  "start": 88,
                                  "end": 92,
                                  "expression": {
                                    "type": "CallExpression",
                                    "start": 88,
                                    "end": 91,
                                    "callee": {
                                      "type": "Identifier",
                                      "start": 88,
                                      "end": 89,
                                      "name": "c"
                                    },
                                    "arguments": []
                                  }
                                },
                                {
                                  "type": "ReturnStatement",
                                  "start": 109,
                                  "end": 116,
                                  "argument": null
                                }
                              ]
                            },
                            "alternate": null
                          },
                          {
                            "type": "IfStatement",
                            "start": 147,
                            "end": 342,
                            "test": {
                              "type": "AwaitExpression",
                              "start": 151,
                              "end": 160,
                              "argument": {
                                "type": "CallExpression",
                                "start": 157,
                                "end": 160,
                                "callee": {
                                  "type": "Identifier",
                                  "start": 157,
                                  "end": 158,
                                  "name": "d"
                                },
                                "arguments": []
                              }
                            },
                            "consequent": {
                              "type": "BlockStatement",
                              "start": 162,
                              "end": 342,
                              "body": [
                                {
                                  "type": "ExpressionStatement",
                                  "start": 180,
                                  "end": 190,
                                  "expression": {
                                    "type": "AwaitExpression",
                                    "start": 180,
                                    "end": 189,
                                    "argument": {
                                      "type": "CallExpression",
                                      "start": 186,
                                      "end": 189,
                                      "callee": {
                                        "type": "Identifier",
                                        "start": 186,
                                        "end": 187,
                                        "name": "e"
                                      },
                                      "arguments": []
                                    }
                                  }
                                },
                                {
                                  "type": "IfStatement",
                                  "start": 207,
                                  "end": 326,
                                  "test": {
                                    "type": "CallExpression",
                                    "start": 211,
                                    "end": 214,
                                    "callee": {
                                      "type": "Identifier",
                                      "start": 211,
                                      "end": 212,
                                      "name": "f"
                                    },
                                    "arguments": []
                                  },
                                  "consequent": {
                                    "type": "BlockStatement",
                                    "start": 216,
                                    "end": 271,
                                    "body": [
                                      {
                                        "type": "ReturnStatement",
                                        "start": 236,
                                        "end": 253,
                                        "argument": {
                                          "type": "AwaitExpression",
                                          "start": 243,
                                          "end": 252,
                                          "argument": {
                                            "type": "CallExpression",
                                            "start": 249,
                                            "end": 252,
                                            "callee": {
                                              "type": "Identifier",
                                              "start": 249,
                                              "end": 250,
                                              "name": "g"
                                            },
                                            "arguments": []
                                          }
                                        }
                                      }
                                    ]
                                  },
                                  "alternate": {
                                    "type": "BlockStatement",
                                    "start": 277,
                                    "end": 326,
                                    "body": [
                                      {
                                        "type": "ReturnStatement",
                                        "start": 297,
                                        "end": 308,
                                        "argument": {
                                          "type": "CallExpression",
                                          "start": 304,
                                          "end": 307,
                                          "callee": {
                                            "type": "Identifier",
                                            "start": 304,
                                            "end": 305,
                                            "name": "h"
                                          },
                                          "arguments": []
                                        }
                                      }
                                    ]
                                  }
                                }
                              ]
                            },
                            "alternate": null
                          },
                          {
                            "type": "ReturnStatement",
                            "start": 357,
                            "end": 368,
                            "argument": {
                              "type": "CallExpression",
                              "start": 364,
                              "end": 367,
                              "callee": {
                                "type": "Identifier",
                                "start": 364,
                                "end": 365,
                                "name": "i"
                              },
                              "arguments": []
                            }
                          }
                        ]
                      },
                      "alternate": null
                    },
                    {
                      "type": "ReturnStatement",
                      "start": 395,
                      "end": 412,
                      "argument": {
                        "type": "AwaitExpression",
                        "start": 402,
                        "end": 411,
                        "argument": {
                          "type": "CallExpression",
                          "start": 408,
                          "end": 411,
                          "callee": {
                            "type": "Identifier",
                            "start": 408,
                            "end": 409,
                            "name": "j"
                          },
                          "arguments": []
                        }
                      }
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it.skip('should parse no block"', () => {
        expect(parseScript(`async function test() {
            if (a()) (await b()); else if (c()) (await d());
          
            while (c()) await d();
          }`, {
            raw: true,
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "test"
                    },
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "IfStatement",
                                "test": {
                                    "type": "CallExpression",
                                    "callee": {
                                        "type": "Identifier",
                                        "name": "a"
                                    },
                                    "arguments": []
                                },
                                "consequent": {
                                    "type": "ExpressionStatement",
                                    "expression": {
                                        "type": "AwaitExpression",
                                        "argument": {
                                            "type": "CallExpression",
                                            "callee": {
                                                "type": "Identifier",
                                                "name": "b"
                                            },
                                            "arguments": []
                                        }
                                    }
                                },
                                "alternate": {
                                    "type": "IfStatement",
                                    "test": {
                                        "type": "CallExpression",
                                        "callee": {
                                            "type": "Identifier",
                                            "name": "c"
                                        },
                                        "arguments": []
                                    },
                                    "consequent": {
                                        "type": "ExpressionStatement",
                                        "expression": {
                                            "type": "AwaitExpression",
                                            "argument": {
                                                "type": "CallExpression",
                                                "callee": {
                                                    "type": "Identifier",
                                                    "name": "d"
                                                },
                                                "arguments": []
                                            }
                                        }
                                    },
                                    "alternate": null
                                }
                            },
                            {
                                "type": "WhileStatement",
                                "test": {
                                    "type": "CallExpression",
                                    "callee": {
                                        "type": "Identifier",
                                        "name": "c"
                                    },
                                    "arguments": []
                                },
                                "body": {
                                    "type": "ExpressionStatement",
                                    "expression": {
                                        "type": "AwaitExpression",
                                        "argument": {
                                            "type": "CallExpression",
                                            "callee": {
                                                "type": "Identifier",
                                                "name": "d"
                                            },
                                            "arguments": []
                                        }
                                    }
                                }
                            }
                        ]
                    },
                    "generator": false,
                    "expression": false,
                    "async": true
                }
            ],
            "sourceType": "script"
        });
    });

    it.skip('should parse ternary expression', () => {
        expect(parseScript(`async function test() {
            var test = a() ? await b() : c();
            return d() ? (await e()).ok : await f();
          }`, {
            raw: true,
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "test"
                    },
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "VariableDeclaration",
                                "declarations": [
                                    {
                                        "type": "VariableDeclarator",
                                        "id": {
                                            "type": "Identifier",
                                            "name": "test"
                                        },
                                        "init": {
                                            "type": "ConditionalExpression",
                                            "test": {
                                                "type": "CallExpression",
                                                "callee": {
                                                    "type": "Identifier",
                                                    "name": "a"
                                                },
                                                "arguments": []
                                            },
                                            "consequent": {
                                                "type": "AwaitExpression",
                                                "argument": {
                                                    "type": "CallExpression",
                                                    "callee": {
                                                        "type": "Identifier",
                                                        "name": "b"
                                                    },
                                                    "arguments": []
                                                }
                                            },
                                            "alternate": {
                                                "type": "CallExpression",
                                                "callee": {
                                                    "type": "Identifier",
                                                    "name": "c"
                                                },
                                                "arguments": []
                                            }
                                        }
                                    }
                                ],
                                "kind": "var"
                            },
                            {
                                "type": "ReturnStatement",
                                "argument": {
                                    "type": "ConditionalExpression",
                                    "test": {
                                        "type": "CallExpression",
                                        "callee": {
                                            "type": "Identifier",
                                            "name": "d"
                                        },
                                        "arguments": []
                                    },
                                    "consequent": {
                                        "type": "MemberExpression",
                                        "computed": false,
                                        "object": {
                                            "type": "AwaitExpression",
                                            "argument": {
                                                "type": "CallExpression",
                                                "callee": {
                                                    "type": "Identifier",
                                                    "name": "e"
                                                },
                                                "arguments": []
                                            }
                                        },
                                        "property": {
                                            "type": "Identifier",
                                            "name": "ok"
                                        }
                                    },
                                    "alternate": {
                                        "type": "AwaitExpression",
                                        "argument": {
                                            "type": "CallExpression",
                                            "callee": {
                                                "type": "Identifier",
                                                "name": "f"
                                            },
                                            "arguments": []
                                        }
                                    }
                                }
                            }
                        ]
                    },
                    "generator": false,
                    "expression": false,
                    "async": true
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse return in loop', () => {
        expect(parseScript(`async function test() {
            while (true) {
              if (await a()) {
                return "now";
              }
            }
          }`, {
            raw: true,
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "test"
                    },
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "WhileStatement",
                                "test": {
                                    "type": "Literal",
                                    "value": true,
                                    "raw": "true"
                                },
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [
                                        {
                                            "type": "IfStatement",
                                            "test": {
                                                "type": "AwaitExpression",
                                                "argument": {
                                                    "type": "CallExpression",
                                                    "callee": {
                                                        "type": "Identifier",
                                                        "name": "a"
                                                    },
                                                    "arguments": []
                                                }
                                            },
                                            "consequent": {
                                                "type": "BlockStatement",
                                                "body": [
                                                    {
                                                        "type": "ReturnStatement",
                                                        "argument": {
                                                            "type": "Literal",
                                                            "value": "now",
                                                            "raw": "\"now\""
                                                        }
                                                    }
                                                ]
                                            },
                                            "alternate": null
                                        }
                                    ]
                                }
                            }
                        ]
                    },
                    "generator": false,
                    "expression": false,
                    "async": true
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse simple conditional', () => {
        expect(parseScript(`async function test() {
            var a = await db.post({});
            if (a) {
              await db.destroy();
            }
            var b = 1 + 1;
          }`, {
            raw: true,
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "test"
                    },
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "VariableDeclaration",
                                "declarations": [
                                    {
                                        "type": "VariableDeclarator",
                                        "id": {
                                            "type": "Identifier",
                                            "name": "a"
                                        },
                                        "init": {
                                            "type": "AwaitExpression",
                                            "argument": {
                                                "type": "CallExpression",
                                                "callee": {
                                                    "type": "MemberExpression",
                                                    "computed": false,
                                                    "object": {
                                                        "type": "Identifier",
                                                        "name": "db"
                                                    },
                                                    "property": {
                                                        "type": "Identifier",
                                                        "name": "post"
                                                    }
                                                },
                                                "arguments": [
                                                    {
                                                        "type": "ObjectExpression",
                                                        "properties": []
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                ],
                                "kind": "var"
                            },
                            {
                                "type": "IfStatement",
                                "test": {
                                    "type": "Identifier",
                                    "name": "a"
                                },
                                "consequent": {
                                    "type": "BlockStatement",
                                    "body": [
                                        {
                                            "type": "ExpressionStatement",
                                            "expression": {
                                                "type": "AwaitExpression",
                                                "argument": {
                                                    "type": "CallExpression",
                                                    "callee": {
                                                        "type": "MemberExpression",
                                                        "computed": false,
                                                        "object": {
                                                            "type": "Identifier",
                                                            "name": "db"
                                                        },
                                                        "property": {
                                                            "type": "Identifier",
                                                            "name": "destroy"
                                                        }
                                                    },
                                                    "arguments": []
                                                }
                                            }
                                        }
                                    ]
                                },
                                "alternate": null
                            },
                            {
                                "type": "VariableDeclaration",
                                "declarations": [
                                    {
                                        "type": "VariableDeclarator",
                                        "id": {
                                            "type": "Identifier",
                                            "name": "b"
                                        },
                                        "init": {
                                            "type": "BinaryExpression",
                                            "operator": "+",
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
                                        }
                                    }
                                ],
                                "kind": "var"
                            }
                        ]
                    },
                    "generator": false,
                    "expression": false,
                    "async": true
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse try / catch', () => {
        expect(parseScript(`async function test() {
            try {
              going.to.fail;
            } catch (err) {
              await postErrorMessage('http://my.webservice/error', err);
            }
          }`, {
            raw: true,
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "test"
                    },
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "TryStatement",
                                "block": {
                                    "type": "BlockStatement",
                                    "body": [
                                        {
                                            "type": "ExpressionStatement",
                                            "expression": {
                                                "type": "MemberExpression",
                                                "computed": false,
                                                "object": {
                                                    "type": "MemberExpression",
                                                    "computed": false,
                                                    "object": {
                                                        "type": "Identifier",
                                                        "name": "going"
                                                    },
                                                    "property": {
                                                        "type": "Identifier",
                                                        "name": "to"
                                                    }
                                                },
                                                "property": {
                                                    "type": "Identifier",
                                                    "name": "fail"
                                                }
                                            }
                                        }
                                    ]
                                },
                                "handler": {
                                    "type": "CatchClause",
                                    "param": {
                                        "type": "Identifier",
                                        "name": "err"
                                    },
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": [
                                            {
                                                "type": "ExpressionStatement",
                                                "expression": {
                                                    "type": "AwaitExpression",
                                                    "argument": {
                                                        "type": "CallExpression",
                                                        "callee": {
                                                            "type": "Identifier",
                                                            "name": "postErrorMessage"
                                                        },
                                                        "arguments": [
                                                            {
                                                                "type": "Literal",
                                                                "value": "http://my.webservice/error",
                                                                "raw": "'http://my.webservice/error'"
                                                            },
                                                            {
                                                                "type": "Identifier",
                                                                "name": "err"
                                                            }
                                                        ]
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                },
                                "finalizer": null
                            }
                        ]
                    },
                    "generator": false,
                    "expression": false,
                    "async": true
                }
            ],
            "sourceType": "script"
        });
    });

    
    it('should parse var loop', () => {
        expect(parseScript(`var PouchDB = require('pouchdb');
        
        async function test() {
          var db = new PouchDB('test');
          while (i < 10) {
            i++;
            await db.put({_id: i});
          }
          return await db.allDocs();
        }`, {
            raw: true,
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "VariableDeclaration",
                    "declarations": [
                        {
                            "type": "VariableDeclarator",
                            "id": {
                                "type": "Identifier",
                                "name": "PouchDB"
                            },
                            "init": {
                                "type": "CallExpression",
                                "callee": {
                                    "type": "Identifier",
                                    "name": "require"
                                },
                                "arguments": [
                                    {
                                        "type": "Literal",
                                        "value": "pouchdb",
                                        "raw": "'pouchdb'"
                                    }
                                ]
                            }
                        }
                    ],
                    "kind": "var"
                },
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "test"
                    },
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "VariableDeclaration",
                                "declarations": [
                                    {
                                        "type": "VariableDeclarator",
                                        "id": {
                                            "type": "Identifier",
                                            "name": "db"
                                        },
                                        "init": {
                                            "type": "NewExpression",
                                            "callee": {
                                                "type": "Identifier",
                                                "name": "PouchDB"
                                            },
                                            "arguments": [
                                                {
                                                    "type": "Literal",
                                                    "value": "test",
                                                    "raw": "'test'"
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "kind": "var"
                            },
                            {
                                "type": "WhileStatement",
                                "test": {
                                    "type": "BinaryExpression",
                                    "operator": "<",
                                    "left": {
                                        "type": "Identifier",
                                        "name": "i"
                                    },
                                    "right": {
                                        "type": "Literal",
                                        "value": 10,
                                        "raw": "10"
                                    }
                                },
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [
                                        {
                                            "type": "ExpressionStatement",
                                            "expression": {
                                                "type": "UpdateExpression",
                                                "operator": "++",
                                                "argument": {
                                                    "type": "Identifier",
                                                    "name": "i"
                                                },
                                                "prefix": false
                                            }
                                        },
                                        {
                                            "type": "ExpressionStatement",
                                            "expression": {
                                                "type": "AwaitExpression",
                                                "argument": {
                                                    "type": "CallExpression",
                                                    "callee": {
                                                        "type": "MemberExpression",
                                                        "computed": false,
                                                        "object": {
                                                            "type": "Identifier",
                                                            "name": "db"
                                                        },
                                                        "property": {
                                                            "type": "Identifier",
                                                            "name": "put"
                                                        }
                                                    },
                                                    "arguments": [
                                                        {
                                                            "type": "ObjectExpression",
                                                            "properties": [
                                                                {
                                                                    "type": "Property",
                                                                    "key": {
                                                                        "type": "Identifier",
                                                                        "name": "_id"
                                                                    },
                                                                    "computed": false,
                                                                    "value": {
                                                                        "type": "Identifier",
                                                                        "name": "i"
                                                                    },
                                                                    "kind": "init",
                                                                    "method": false,
                                                                    "shorthand": false
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            }
                                        }
                                    ]
                                }
                            },
                            {
                                "type": "ReturnStatement",
                                "argument": {
                                    "type": "AwaitExpression",
                                    "argument": {
                                        "type": "CallExpression",
                                        "callee": {
                                            "type": "MemberExpression",
                                            "computed": false,
                                            "object": {
                                                "type": "Identifier",
                                                "name": "db"
                                            },
                                            "property": {
                                                "type": "Identifier",
                                                "name": "allDocs"
                                            }
                                        },
                                        "arguments": []
                                    }
                                }
                            }
                        ]
                    },
                    "generator": false,
                    "expression": false,
                    "async": true
                }
            ],
            "sourceType": "script"
        });
    });

    
    it('should parse binary expression order', () => {
        expect(parseScript(`async function test() {
            if(c() === await d()) {}
          
            return a() + await b();
          }`, {
            raw: true,
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "test"
                    },
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "IfStatement",
                                "test": {
                                    "type": "BinaryExpression",
                                    "operator": "===",
                                    "left": {
                                        "type": "CallExpression",
                                        "callee": {
                                            "type": "Identifier",
                                            "name": "c"
                                        },
                                        "arguments": []
                                    },
                                    "right": {
                                        "type": "AwaitExpression",
                                        "argument": {
                                            "type": "CallExpression",
                                            "callee": {
                                                "type": "Identifier",
                                                "name": "d"
                                            },
                                            "arguments": []
                                        }
                                    }
                                },
                                "consequent": {
                                    "type": "BlockStatement",
                                    "body": []
                                },
                                "alternate": null
                            },
                            {
                                "type": "ReturnStatement",
                                "argument": {
                                    "type": "BinaryExpression",
                                    "operator": "+",
                                    "left": {
                                        "type": "CallExpression",
                                        "callee": {
                                            "type": "Identifier",
                                            "name": "a"
                                        },
                                        "arguments": []
                                    },
                                    "right": {
                                        "type": "AwaitExpression",
                                        "argument": {
                                            "type": "CallExpression",
                                            "callee": {
                                                "type": "Identifier",
                                                "name": "b"
                                            },
                                            "arguments": []
                                        }
                                    }
                                }
                            }
                        ]
                    },
                    "generator": false,
                    "expression": false,
                    "async": true
                }
            ],
            "sourceType": "script"
        });
    });

    
    it.skip('should parse call expression', () => {
        expect(parseScript(`async function test() {
            return test2(a(), await b(), c(), (await d()).ok);
          }`, {
            raw: true,
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "test"
                    },
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ReturnStatement",
                                "argument": {
                                    "type": "CallExpression",
                                    "callee": {
                                        "type": "Identifier",
                                        "name": "test2"
                                    },
                                    "arguments": [
                                        {
                                            "type": "CallExpression",
                                            "callee": {
                                                "type": "Identifier",
                                                "name": "a"
                                            },
                                            "arguments": []
                                        },
                                        {
                                            "type": "AwaitExpression",
                                            "argument": {
                                                "type": "CallExpression",
                                                "callee": {
                                                    "type": "Identifier",
                                                    "name": "b"
                                                },
                                                "arguments": []
                                            }
                                        },
                                        {
                                            "type": "CallExpression",
                                            "callee": {
                                                "type": "Identifier",
                                                "name": "c"
                                            },
                                            "arguments": []
                                        },
                                        {
                                            "type": "MemberExpression",
                                            "computed": false,
                                            "object": {
                                                "type": "AwaitExpression",
                                                "argument": {
                                                    "type": "CallExpression",
                                                    "callee": {
                                                        "type": "Identifier",
                                                        "name": "d"
                                                    },
                                                    "arguments": []
                                                }
                                            },
                                            "property": {
                                                "type": "Identifier",
                                                "name": "ok"
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    },
                    "generator": false,
                    "expression": false,
                    "async": true
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse await function call', () => {
        expect(parseScript(`async function test() {
            await db.destroy();
          }`, {
            raw: true,
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "test"
                    },
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "AwaitExpression",
                                    "argument": {
                                        "type": "CallExpression",
                                        "callee": {
                                            "type": "MemberExpression",
                                            "computed": false,
                                            "object": {
                                                "type": "Identifier",
                                                "name": "db"
                                            },
                                            "property": {
                                                "type": "Identifier",
                                                "name": "destroy"
                                            }
                                        },
                                        "arguments": []
                                    }
                                }
                            }
                        ]
                    },
                    "generator": false,
                    "expression": false,
                    "async": true
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse complex try / catch', () => {
        expect(parseScript(`async function test() {
            var a = await a();
            try {
              var b = new PouchDB('test2');
              var c = await db.destroy();
            } catch (err) {
              var d = await new PouchDB('test').destroy();
            }
            var e = await b();
          
            return a + b + c + d + e + 2;
          }`, {
            raw: true,
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "test"
                    },
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "VariableDeclaration",
                                "declarations": [
                                    {
                                        "type": "VariableDeclarator",
                                        "id": {
                                            "type": "Identifier",
                                            "name": "a"
                                        },
                                        "init": {
                                            "type": "AwaitExpression",
                                            "argument": {
                                                "type": "CallExpression",
                                                "callee": {
                                                    "type": "Identifier",
                                                    "name": "a"
                                                },
                                                "arguments": []
                                            }
                                        }
                                    }
                                ],
                                "kind": "var"
                            },
                            {
                                "type": "TryStatement",
                                "block": {
                                    "type": "BlockStatement",
                                    "body": [
                                        {
                                            "type": "VariableDeclaration",
                                            "declarations": [
                                                {
                                                    "type": "VariableDeclarator",
                                                    "id": {
                                                        "type": "Identifier",
                                                        "name": "b"
                                                    },
                                                    "init": {
                                                        "type": "NewExpression",
                                                        "callee": {
                                                            "type": "Identifier",
                                                            "name": "PouchDB"
                                                        },
                                                        "arguments": [
                                                            {
                                                                "type": "Literal",
                                                                "value": "test2",
                                                                "raw": "'test2'"
                                                            }
                                                        ]
                                                    }
                                                }
                                            ],
                                            "kind": "var"
                                        },
                                        {
                                            "type": "VariableDeclaration",
                                            "declarations": [
                                                {
                                                    "type": "VariableDeclarator",
                                                    "id": {
                                                        "type": "Identifier",
                                                        "name": "c"
                                                    },
                                                    "init": {
                                                        "type": "AwaitExpression",
                                                        "argument": {
                                                            "type": "CallExpression",
                                                            "callee": {
                                                                "type": "MemberExpression",
                                                                "computed": false,
                                                                "object": {
                                                                    "type": "Identifier",
                                                                    "name": "db"
                                                                },
                                                                "property": {
                                                                    "type": "Identifier",
                                                                    "name": "destroy"
                                                                }
                                                            },
                                                            "arguments": []
                                                        }
                                                    }
                                                }
                                            ],
                                            "kind": "var"
                                        }
                                    ]
                                },
                                "handler": {
                                    "type": "CatchClause",
                                    "param": {
                                        "type": "Identifier",
                                        "name": "err"
                                    },
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": [
                                            {
                                                "type": "VariableDeclaration",
                                                "declarations": [
                                                    {
                                                        "type": "VariableDeclarator",
                                                        "id": {
                                                            "type": "Identifier",
                                                            "name": "d"
                                                        },
                                                        "init": {
                                                            "type": "AwaitExpression",
                                                            "argument": {
                                                                "type": "CallExpression",
                                                                "callee": {
                                                                    "type": "MemberExpression",
                                                                    "computed": false,
                                                                    "object": {
                                                                        "type": "NewExpression",
                                                                        "callee": {
                                                                            "type": "Identifier",
                                                                            "name": "PouchDB"
                                                                        },
                                                                        "arguments": [
                                                                            {
                                                                                "type": "Literal",
                                                                                "value": "test",
                                                                                "raw": "'test'"
                                                                            }
                                                                        ]
                                                                    },
                                                                    "property": {
                                                                        "type": "Identifier",
                                                                        "name": "destroy"
                                                                    }
                                                                },
                                                                "arguments": []
                                                            }
                                                        }
                                                    }
                                                ],
                                                "kind": "var"
                                            }
                                        ]
                                    }
                                },
                                "finalizer": null
                            },
                            {
                                "type": "VariableDeclaration",
                                "declarations": [
                                    {
                                        "type": "VariableDeclarator",
                                        "id": {
                                            "type": "Identifier",
                                            "name": "e"
                                        },
                                        "init": {
                                            "type": "AwaitExpression",
                                            "argument": {
                                                "type": "CallExpression",
                                                "callee": {
                                                    "type": "Identifier",
                                                    "name": "b"
                                                },
                                                "arguments": []
                                            }
                                        }
                                    }
                                ],
                                "kind": "var"
                            },
                            {
                                "type": "ReturnStatement",
                                "argument": {
                                    "type": "BinaryExpression",
                                    "operator": "+",
                                    "left": {
                                        "type": "BinaryExpression",
                                        "operator": "+",
                                        "left": {
                                            "type": "BinaryExpression",
                                            "operator": "+",
                                            "left": {
                                                "type": "BinaryExpression",
                                                "operator": "+",
                                                "left": {
                                                    "type": "BinaryExpression",
                                                    "operator": "+",
                                                    "left": {
                                                        "type": "Identifier",
                                                        "name": "a"
                                                    },
                                                    "right": {
                                                        "type": "Identifier",
                                                        "name": "b"
                                                    }
                                                },
                                                "right": {
                                                    "type": "Identifier",
                                                    "name": "c"
                                                }
                                            },
                                            "right": {
                                                "type": "Identifier",
                                                "name": "d"
                                            }
                                        },
                                        "right": {
                                            "type": "Identifier",
                                            "name": "e"
                                        }
                                    },
                                    "right": {
                                        "type": "Literal",
                                        "value": 2,
                                        "raw": "2"
                                    }
                                }
                            }
                        ]
                    },
                    "generator": false,
                    "expression": false,
                    "async": true
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse method name async', () => {
        expect(parseScript('class X { async() {} }', {
            ranges: true,
            raw: true,
            tokens: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 22,
            "body": [
              {
                "type": "ClassDeclaration",
                "start": 0,
                "end": 22,
                "id": {
                  "type": "Identifier",
                  "start": 6,
                  "end": 7,
                  "name": "X"
                },
                "superClass": null,
                "body": {
                  "type": "ClassBody",
                  "start": 8,
                  "end": 22,
                  "body": [
                    {
                      "type": "MethodDefinition",
                      "start": 10,
                      "end": 20,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 10,
                        "end": 15,
                        "name": "async"
                      },
                      "static": false,
                      "kind": "method",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 15,
                        "end": 20,
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "BlockStatement",
                          "start": 18,
                          "end": 20,
                          "body": []
                        }
                      }
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "(async function() { await foo; })"', () => {
        expect(parseScript('(async function() { await foo; })', {
            ranges: true,
            raw: true,
            tokens: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 33,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 33,
                "expression": {
                  "type": "FunctionExpression",
                  "start": 1,
                  "end": 32,
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 18,
                    "end": 32,
                    "body": [
                      {
                        "type": "ExpressionStatement",
                        "start": 20,
                        "end": 30,
                        "expression": {
                          "type": "AwaitExpression",
                          "start": 20,
                          "end": 29,
                          "argument": {
                            "type": "Identifier",
                            "start": 26,
                            "end": 29,
                            "name": "foo"
                          }
                        }
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