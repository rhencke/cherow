import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Next - Dynamic Import', () => {

    it('should fail on direct calls only', () => {
        expect(() => {
            parseScript('function failsParse() { return import.then(); }', {
                next: true
            });
        }).to.throw();
    });
    it('should fail on invalid argument spread', () => {
        expect(() => {
            parseScript('import(...[1])', {
                next: true
            });
        }).to.throw();
    });
    it('should fail on invalid import call many arguments', () => {
        expect(() => {
            parseScript('import(x, y).then(z);', {
                next: true
            });
        }).to.throw();
    });
    it('should fail on invalid non callee', () => {
        expect(() => {
            parseScript('import.then(doLoad);', {
                next: true
            });
        }).to.throw();
    });
    it('should fail on invalid import call no arguments', () => {
        expect(() => {
            parseScript('import().then(doThat);', {
                next: true
            });
        }).to.throw();
    });
    it('should fail on invalid new import call', () => {
        expect(() => {
            parseScript('new import(x);', {
                next: true
            });
        }).to.throw();
    });

    it('should parse import in strict mode', () => {
        expect(parseScript('"use strict"; import("test.js");', {
            raw: true,
            ranges: true,
            next: true
        })).to.eql({
            "body": [{
                    "end": 13,
                    "expression": {
                        "end": 12,
                        "raw": "\"use strict\"",
                        "start": 0,
                        "type": "Literal",
                        "value": "use strict",
                    },
                    "start": 0,
                    "type": "ExpressionStatement"
                },
                {
                    "end": 32,
                    "expression": {
                        "arguments": [{
                            "end": 30,
                            "raw": "\"test.js\"",
                            "start": 21,
                            "type": "Literal",
                            "value": "test.js",
                        }],
                        "callee": {
                            "end": 20,
                            "start": 14,
                            "type": "Import"
                        },
                        "end": 31,
                        "start": 14,
                        "type": "CallExpression"
                    },
                    "start": 14,
                    "type": "ExpressionStatement"
                }
            ],
            "end": 32,
            "sourceType": "script",
            "start": 0,
            "type": "Program",
        });
    });

    it('should parse import call string', () => {
        expect(parseScript('import("lib.js").then(doThis);', {
            raw: true,
            ranges: true,
            next: true
        })).to.eql({
            "body": [{
                "end": 30,
                "expression": {
                    "arguments": [{
                        "end": 28,
                        "name": "doThis",
                        "start": 22,
                        "type": "Identifier"
                    }],
                    "callee": {
                        "computed": false,
                        "end": 21,
                        "object": {
                            "arguments": [{
                                "end": 15,
                                "raw": "\"lib.js\"",
                                "start": 7,
                                "type": "Literal",
                                "value": "lib.js"
                            }, ],
                            "callee": {
                                "end": 6,
                                "start": 0,
                                "type": "Import"
                            },
                            "end": 16,
                            "start": 0,
                            "type": "CallExpression"
                        },
                        "property": {
                            "end": 21,
                            "name": "then",
                            "start": 17,
                            "type": "Identifier"
                        },
                        "start": 0,
                        "type": "MemberExpression"
                    },
                    "end": 29,
                    "start": 0,
                    "type": "CallExpression"
                },
                "start": 0,
                "type": "ExpressionStatement"
            }],
            "end": 30,
            "sourceType": "script",
            "start": 0,
            "type": "Program",
        });
    });

    it('should parse generator', () => {
        expect(parseScript('function* a() { yield import("http"); }', {
            raw: true,
            ranges: true,
            next: true
        })).to.eql({
            "body": [{
                "async": false,
                "body": {
                    "body": [{
                        "end": 37,
                        "expression": {
                            "argument": {
                                "arguments": [{
                                    "end": 35,
                                    "raw": "\"http\"",
                                    "start": 29,
                                    "type": "Literal",
                                    "value": "http",
                                }],
                                "callee": {
                                    "end": 28,
                                    "start": 22,
                                    "type": "Import"
                                },
                                "end": 36,
                                "start": 22,
                                "type": "CallExpression"
                            },
                            "delegate": false,
                            "end": 36,
                            "start": 16,
                            "type": "YieldExpression"
                        },
                        "start": 16,
                        "type": "ExpressionStatement"
                    }],
                    "end": 39,
                    "start": 14,
                    "type": "BlockStatement",
                },
                "end": 39,
                "expression": false,
                "generator": true,
                "id": {
                    "end": 11,
                    "name": "a",
                    "start": 10,
                    "type": "Identifier",
                },
                "params": [],
                "start": 0,
                "type": "FunctionDeclaration",
            }, ],
            "end": 39,
            "sourceType": "script",
            "start": 0,
            "type": "Program",
        });
    });

    it('should parse variable arguments', () => {
        expect(parseScript('const testVarible = "test.js"; import(testVarible).then(() => {});', {
            raw: true,
            ranges: true,
            next: true
        })).to.eql({
            "body": [{
                    "declarations": [{
                        "end": 29,
                        "id": {
                            "end": 17,
                            "name": "testVarible",
                            "start": 6,
                            "type": "Identifier",
                        },
                        "init": {
                            "end": 29,
                            "raw": "\"test.js\"",
                            "start": 20,
                            "type": "Literal",
                            "value": "test.js",
                        },
                        "start": 6,
                        "type": "VariableDeclarator"
                    }],
                    "end": 30,
                    "kind": "const",
                    "start": 0,
                    "type": "VariableDeclaration"
                },
                {
                    "end": 66,
                    "expression": {
                        "arguments": [{
                            "async": false,
                            "body": {
                                "body": [],
                                "end": 64,
                                "start": 62,
                                "type": "BlockStatement"
                            },
                            "end": 64,
                            "expression": false,
                            "generator": false,
                            "id": null,
                            "params": [],
                            "start": 56,
                            "type": "ArrowFunctionExpression"
                        }],
                        "callee": {
                            "computed": false,
                            "end": 55,
                            "object": {
                                "arguments": [{
                                    "end": 49,
                                    "name": "testVarible",
                                    "start": 38,
                                    "type": "Identifier"
                                }],
                                "callee": {
                                    "end": 37,
                                    "start": 31,
                                    "type": "Import"
                                },
                                "end": 50,
                                "start": 31,
                                "type": "CallExpression"
                            },
                            "property": {
                                "end": 55,
                                "name": "then",
                                "start": 51,
                                "type": "Identifier"
                            },
                            "start": 31,
                            "type": "MemberExpression"
                        },
                        "end": 65,
                        "start": 31,
                        "type": "CallExpression"
                    },
                    "start": 31,
                    "type": "ExpressionStatement"
                }
            ],
            "end": 66,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });


    it('should parse loader using import', () => {
        expect(parseScript('function load(f) { return import("lib/" + f) }', {
            raw: true,
            ranges: true,
            next: true
        })).to.eql({
            "body": [{
                "async": false,
                "body": {
                    "body": [{
                        "argument": {
                            "arguments": [{
                                "end": 43,
                                "left": {
                                    "end": 39,
                                    "raw": "\"lib/\"",
                                    "start": 33,
                                    "type": "Literal",
                                    "value": "lib/",
                                },
                                "operator": "+",
                                "right": {
                                    "end": 43,
                                    "name": "f",
                                    "start": 42,
                                    "type": "Identifier"
                                },
                                "start": 33,
                                "type": "BinaryExpression"
                            }],
                            "callee": {
                                "end": 32,
                                "start": 26,
                                "type": "Import"
                            },
                            "end": 44,
                            "start": 26,
                            "type": "CallExpression",
                        },
                        "end": 44,
                        "start": 19,
                        "type": "ReturnStatement",
                    }, ],
                    "end": 46,
                    "start": 17,
                    "type": "BlockStatement",
                },
                "end": 46,
                "expression": false,
                "generator": false,
                "id": {
                    "end": 13,
                    "name": "load",
                    "start": 9,
                    "type": "Identifier"
                },
                "params": [{
                    "end": 15,
                    "name": "f",
                    "start": 14,
                    "type": "Identifier"
                }],
                "start": 0,
                "type": "FunctionDeclaration"
            }],
            "end": 46,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse await import', () => {
        expect(parseScript('async function f(x) { await import(x) }', {
            raw: true,
            ranges: true,
            next: true
        })).to.eql({
            "body": [{
                "async": true,
                "body": {
                    "body": [{
                        "end": 37,
                        "expression": {
                            "argument": {
                                "arguments": [{
                                    "end": 36,
                                    "name": "x",
                                    "start": 35,
                                    "type": "Identifier"
                                }],
                                "callee": {
                                    "end": 34,
                                    "start": 28,
                                    "type": "Import"
                                },
                                "end": 37,
                                "start": 28,
                                "type": "CallExpression"
                            },
                            "end": 37,
                            "start": 22,
                            "type": "AwaitExpression"
                        },
                        "start": 22,
                        "type": "ExpressionStatement"
                    }],
                    "end": 39,
                    "start": 20,
                    "type": "BlockStatement",
                },
                "end": 39,
                "expression": false,
                "generator": false,
                "id": {
                    "end": 16,
                    "name": "f",
                    "start": 15,
                    "type": "Identifier",
                },
                "params": [{
                    "end": 18,
                    "name": "x",
                    "start": 17,
                    "type": "Identifier",
                }],
                "start": 0,
                "type": "FunctionDeclaration"
            }],
            "end": 39,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

});