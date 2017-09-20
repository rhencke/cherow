import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Statements - try ... catch', () => {

    it('should handle try statements', () => {

        expect(parseScript('try { throw []; } catch ([ x = unresolvableReference ]) {}', {
            ranges: true,
            raw: true
        })).to.eql({
            "body": [{
                "block": {
                    "body": [{
                        "argument": {
                            "elements": [],
                            "end": 14,
                            "start": 12,
                            "type": "ArrayExpression"
                        },
                        "end": 15,
                        "start": 6,
                        "type": "ThrowStatement"
                    }],
                    "end": 17,
                    "start": 4,
                    "type": "BlockStatement"
                },
                "end": 58,
                "finalizer": null,
                "handler": {
                    "body": {
                        "body": [],
                        "end": 58,
                        "start": 56,
                        "type": "BlockStatement"
                    },
                    "end": 58,
                    "param": {
                        "elements": [{
                            "end": 52,
                            "left": {
                                "end": 28,
                                "name": "x",
                                "start": 27,
                                "type": "Identifier"
                            },
                            "right": {
                                "end": 52,
                                "name": "unresolvableReference",
                                "start": 31,
                                "type": "Identifier"
                            },
                            "start": 27,
                            "type": "AssignmentPattern"
                        }],
                        "end": 54,
                        "start": 25,
                        "type": "ArrayPattern"
                    },
                    "start": 18,
                    "type": "CatchClause"
                },
                "start": 0,
                "type": "TryStatement"
            }],
            "end": 58,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });

        expect(parseScript('try { } catch (eval) { }')).to.eql({
            "type": "Program",
            "body": [{
                "type": "TryStatement",
                "block": {
                    "type": "BlockStatement",
                    "body": []
                },
                "handler": {
                    "type": "CatchClause",
                    "param": {
                        "type": "Identifier",
                        "name": "eval"
                    },
                    "body": {
                        "type": "BlockStatement",
                        "body": []
                    }
                },
                "finalizer": null
            }],
            "sourceType": "script"
        });

        expect(parseScript('try { } catch (arguments) { }')).to.eql({
            "type": "Program",
            "body": [{
                "type": "TryStatement",
                "block": {
                    "type": "BlockStatement",
                    "body": []
                },
                "handler": {
                    "type": "CatchClause",
                    "param": {
                        "type": "Identifier",
                        "name": "arguments"
                    },
                    "body": {
                        "type": "BlockStatement",
                        "body": []
                    }
                },
                "finalizer": null
            }],
            "sourceType": "script"
        });

        expect(parseScript('try { } catch (e) { let a; }', {
            ranges: true,
            raw: true
        })).to.eql({
            "body": [{
                "block": {
                    "body": [],
                    "end": 7,
                    "start": 4,
                    "type": "BlockStatement"
                },
                "end": 28,
                "finalizer": null,
                "handler": {
                    "body": {
                        "body": [{
                            "declarations": [{
                                "end": 25,
                                "id": {
                                    "end": 25,
                                    "name": "a",
                                    "start": 24,
                                    "type": "Identifier"
                                },
                                "init": null,
                                "start": 24,
                                "type": "VariableDeclarator"
                            }],
                            "end": 26,
                            "kind": "let",
                            "start": 20,
                            "type": "VariableDeclaration"
                        }],
                        "end": 28,
                        "start": 18,
                        "type": "BlockStatement"
                    },
                    "end": 28,
                    "param": {
                        "end": 16,
                        "name": "e",
                        "start": 15,
                        "type": "Identifier"
                    },
                    "start": 8,
                    "type": "CatchClause"
                },
                "start": 0,
                "type": "TryStatement"
            }],
            "end": 28,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });

        expect(parseScript('try { } finally { cleanup(stuff) }')).to.eql({
            "type": "Program",
            "body": [{
                "type": "TryStatement",
                "block": {
                    "type": "BlockStatement",
                    "body": []
                },
                "handler": null,
                "finalizer": {
                    "type": "BlockStatement",
                    "body": [{
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "CallExpression",
                            "callee": {
                                "type": "Identifier",
                                "name": "cleanup"
                            },
                            "arguments": [{
                                "type": "Identifier",
                                "name": "stuff"
                            }]
                        }
                    }]
                }
            }],
            "sourceType": "script"
        });

        expect(parseScript('try{}catch(a){}finally{}')).to.eql({
            "type": "Program",
            "body": [{
                "type": "TryStatement",
                "block": {
                    "type": "BlockStatement",
                    "body": []
                },
                "handler": {
                    "type": "CatchClause",
                    "param": {
                        "type": "Identifier",
                        "name": "a"
                    },
                    "body": {
                        "type": "BlockStatement",
                        "body": []
                    }
                },
                "finalizer": {
                    "type": "BlockStatement",
                    "body": []
                }
            }],
            "sourceType": "script"
        });

        expect(parseScript('try { doThat(); } catch (e) { say(e) } finally { cleanup(stuff) }')).to.eql({
            "type": "Program",
            "body": [{
                "type": "TryStatement",
                "block": {
                    "type": "BlockStatement",
                    "body": [{
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "CallExpression",
                            "callee": {
                                "type": "Identifier",
                                "name": "doThat"
                            },
                            "arguments": []
                        }
                    }]
                },
                "handler": {
                    "type": "CatchClause",
                    "param": {
                        "type": "Identifier",
                        "name": "e"
                    },
                    "body": {
                        "type": "BlockStatement",
                        "body": [{
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "CallExpression",
                                "callee": {
                                    "type": "Identifier",
                                    "name": "say"
                                },
                                "arguments": [{
                                    "type": "Identifier",
                                    "name": "e"
                                }]
                            }
                        }]
                    }
                },
                "finalizer": {
                    "type": "BlockStatement",
                    "body": [{
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "CallExpression",
                            "callee": {
                                "type": "Identifier",
                                "name": "cleanup"
                            },
                            "arguments": [{
                                "type": "Identifier",
                                "name": "stuff"
                            }]
                        }
                    }]
                }
            }],
            "sourceType": "script"
        });
    });
});