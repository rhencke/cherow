import { parseScript, parseModule } from '../../src/cherow';
import * as chai from 'chai';
const expect = chai.expect;

describe('AnnexB semantics', () => {

    describe('B.3.2 Labelled Function Declarations', () => {

        it('should fail if parsing function as label in strict mode', () => {
            expect(() => {
                parseScript('"use strict"; a: function f() {}')
            }).to.throw();
        });

        it('should parse if function as label in sloppy mode', () => {
            expect(parseScript('a: function f() {}', {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 18,
                "body": [{
                    "type": "LabeledStatement",
                    "start": 0,
                    "end": 18,
                    "body": {
                        "type": "FunctionDeclaration",
                        "start": 3,
                        "end": 18,
                        "id": {
                            "type": "Identifier",
                            "start": 12,
                            "end": 13,
                            "name": "f"
                        },
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                            "type": "BlockStatement",
                            "start": 16,
                            "end": 18,
                            "body": []
                        }
                    },
                    "label": {
                        "type": "Identifier",
                        "start": 0,
                        "end": 1,
                        "name": "a"
                    }
                }],
                "sourceType": "script"
            });
        });


    });

    describe('B.3.4 FunctionDeclarations in IfStatement Statement Clauses', () => {

        it('should fail on if + function in strict mode', () => {
            expect(() => {
                parseScript('"use strict"; if (x) function f() {}')
            }).to.throw();
        });

        it('should parse "if (0) function a(){}"', () => {
            expect(parseScript('if (0) function a(){}', {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 21,
                "body": [
                  {
                    "type": "IfStatement",
                    "start": 0,
                    "end": 21,
                    "test": {
                      "type": "Literal",
                      "start": 4,
                      "end": 5,
                      "value": 0,
                      "raw": "0"
                    },
                    "consequent": {
                      "type": "FunctionDeclaration",
                      "start": 7,
                      "end": 21,
                      "id": {
                        "type": "Identifier",
                        "start": 16,
                        "end": 17,
                        "name": "a"
                      },
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [],
                      "body": {
                        "type": "BlockStatement",
                        "start": 19,
                        "end": 21,
                        "body": []
                      }
                    },
                    "alternate": null
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse "if (0) function a(){} else;"', () => {
            expect(parseScript('if (0) function a(){} else;', {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 27,
                "body": [
                  {
                    "type": "IfStatement",
                    "start": 0,
                    "end": 27,
                    "test": {
                      "type": "Literal",
                      "start": 4,
                      "end": 5,
                      "value": 0,
                      "raw": "0"
                    },
                    "consequent": {
                      "type": "FunctionDeclaration",
                      "start": 7,
                      "end": 21,
                      "id": {
                        "type": "Identifier",
                        "start": 16,
                        "end": 17,
                        "name": "a"
                      },
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [],
                      "body": {
                        "type": "BlockStatement",
                        "start": 19,
                        "end": 21,
                        "body": []
                      }
                    },
                    "alternate": {
                      "type": "EmptyStatement",
                      "start": 26,
                      "end": 27
                    }
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse "if (0); else function a(){}"', () => {
            expect(parseScript('if (0); else function a(){}', {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 27,
                "body": [
                  {
                    "type": "IfStatement",
                    "start": 0,
                    "end": 27,
                    "test": {
                      "type": "Literal",
                      "start": 4,
                      "end": 5,
                      "value": 0,
                      "raw": "0"
                    },
                    "consequent": {
                      "type": "EmptyStatement",
                      "start": 6,
                      "end": 7
                    },
                    "alternate": {
                      "type": "FunctionDeclaration",
                      "start": 13,
                      "end": 27,
                      "id": {
                        "type": "Identifier",
                        "start": 22,
                        "end": 23,
                        "name": "a"
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
                    }
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse "if (0) function a(){} else function b(){}"', () => {
            expect(parseScript('if (0) function a(){} else function b(){}', {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 41,
                "body": [
                  {
                    "type": "IfStatement",
                    "start": 0,
                    "end": 41,
                    "test": {
                      "type": "Literal",
                      "start": 4,
                      "end": 5,
                      "value": 0,
                      "raw": "0"
                    },
                    "consequent": {
                      "type": "FunctionDeclaration",
                      "start": 7,
                      "end": 21,
                      "id": {
                        "type": "Identifier",
                        "start": 16,
                        "end": 17,
                        "name": "a"
                      },
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [],
                      "body": {
                        "type": "BlockStatement",
                        "start": 19,
                        "end": 21,
                        "body": []
                      }
                    },
                    "alternate": {
                      "type": "FunctionDeclaration",
                      "start": 27,
                      "end": 41,
                      "id": {
                        "type": "Identifier",
                        "start": 36,
                        "end": 37,
                        "name": "b"
                      },
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [],
                      "body": {
                        "type": "BlockStatement",
                        "start": 39,
                        "end": 41,
                        "body": []
                      }
                    }
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse "try {} catch (e) { if(0) function e(){} }"', () => {
            expect(parseScript('try {} catch (e) { if(0) function e(){} }', {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [
                    {
                        "type": "TryStatement",
                        "block": {
                            "type": "BlockStatement",
                            "body": [],
                            "start": 4,
                            "end": 6
                        },
                        "handler": {
                            "type": "CatchClause",
                            "param": {
                                "type": "Identifier",
                                "name": "e",
                                "start": 14,
                                "end": 15
                            },
                            "body": {
                                "type": "BlockStatement",
                                "body": [
                                    {
                                        "type": "IfStatement",
                                        "test": {
                                            "type": "Literal",
                                            "value": 0,
                                            "start": 22,
                                            "end": 23,
                                            "raw": "0"
                                        },
                                        "alternate": null,
                                        "consequent": {
                                            "type": "FunctionDeclaration",
                                            "params": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [],
                                                "start": 37,
                                                "end": 39
                                            },
                                            "async": false,
                                            "generator": false,
                                            "expression": false,
                                            "id": {
                                                "type": "Identifier",
                                                "name": "e",
                                                "start": 34,
                                                "end": 35
                                            },
                                            "start": 25,
                                            "end": 39
                                        },
                                        "start": 19,
                                        "end": 39
                                    }
                                ],
                                "start": 17,
                                "end": 41
                            },
                            "start": 7,
                            "end": 41
                        },
                        "finalizer": null,
                        "start": 0,
                        "end": 41
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 41
            });
        });

        it('should parse async function', () => {
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

        it('should parse function', () => {
            expect(parseScript('if (x) function f() {}', {
                ranges: true,
                raw: true
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

        it('should parse if + multiple functions', () => {
            expect(parseScript('if (x) function _f() { return 23; } else function f() { return 42; }', {
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
                            "name": "_f"
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
    });
});