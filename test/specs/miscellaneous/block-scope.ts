import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Block scope', () => {

        /** Loads of this redefination tests aren't going to be tested. We are supporting this anyway */

        it('should fail on redeclaration with AsyncFunctionDeclaration (AsyncFunctionDeclaration in BlockStatement)', () => {
            expect(() => {
                parseScript('{ async function f() {} async function f() {} }');
            }).to.throw();
        });
        it('should fail on redeclaration with AsyncGeneratorDeclaration (AsyncFunctionDeclaration in BlockStatement)', () => {
            expect(() => {
                parseScript('{ async function f() {} async function* f() {} }', {
                    next: true
                });
            }).to.throw();
        });
        it('should fail on "redeclaration with ClassDeclaration (AsyncFunctionDeclaration in BlockStatement)"', () => {
            expect(() => {
                parseScript('{ async function f() {} class f {}; }');
            }).to.not.throw();
        });
        it('should fail on redeclaration with FunctionDeclaration (AsyncFunctionDeclaration in BlockStatement)', () => {
            expect(() => {
                parseScript(' async function f() {} function f() {} }');
            }).to.throw();
        });
        it('should fail on "redeclaration with AsyncFunctionDeclaration (AsyncGeneratorDeclaration in BlockStatement)"', () => {
            expect(() => {
                parseScript('{ async function* f() {} async function f() {} }', {
                    next: true
                });
            }).to.throw();
        });
        it('should fail on "redeclaration with const-LexicalDeclaration (AsyncGeneratorDeclaration in BlockStatement)"', () => {
            expect(() => {
                parseScript('{ async function* f() {} const f = 0; }');
            }).to.throw();
        });
        it('should fail on redeclaration with FunctionDeclaration (AsyncGeneratorDeclaration in BlockStatement)', () => {
            expect(() => {
                parseScript('{ async function* f() {} function f() {} }', {
                    next: true
                });
            }).to.throw();
        });
        it('should fail on redeclaration with GeneratorDeclaration (AsyncGeneratorDeclaration in BlockStatement))', () => {
            expect(() => {
                parseScript('{ async function* f() {} function* f() {} }');
            }).to.throw();
        });
        it('should fail on redeclaration with AsyncFunctionDeclaration (ClassDeclaration in BlockStatement)', () => {
            expect(() => {
                parseScript('{ class f {} async function f() {} }', {
                    next: true
                });
            }).to.not.throw();
        });
        it('should fail on "redeclaration with FunctionDeclaration (ClassDeclaration in BlockStatement)', () => {
            expect(() => {
                parseScript('{ class f {} function f() {} }');
            }).to.not.throw();
        });
        it('should fail on redeclaration with VariableDeclaration (LexicalDeclaration (const) in BlockStatement)', () => {
            expect(() => {
                parseScript('{ const f = 0; var f; }');
            }).to.throw();
        });
    
        it('should allow to redeclare var with function declaration', () => {
            expect(parseScript('var f; function f() {}', {
                raw: true,
                ranges: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 22,
                "body": [{
                        "type": "VariableDeclaration",
                        "start": 0,
                        "end": 6,
                        "declarations": [{
                            "type": "VariableDeclarator",
                            "start": 4,
                            "end": 5,
                            "id": {
                                "type": "Identifier",
                                "start": 4,
                                "end": 5,
                                "name": "f"
                            },
                            "init": null
                        }],
                        "kind": "var"
                    },
                    {
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
                    }
                ],
                "sourceType": "script"
            });
        });
    
        it('should allow to redeclare function declaration with var', () => {
            expect(parseScript('function f() {}', {
                raw: true,
                ranges: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 15,
                "body": [{
                    "type": "FunctionDeclaration",
                    "start": 0,
                    "end": 15,
                    "id": {
                        "type": "Identifier",
                        "start": 9,
                        "end": 10,
                        "name": "f"
                    },
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "start": 13,
                        "end": 15,
                        "body": []
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should allow to redeclare function declaration with var', () => {
            expect(parseScript('function f() {} var f;', {
                raw: true,
                ranges: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 22,
                "body": [{
                        "type": "FunctionDeclaration",
                        "start": 0,
                        "end": 15,
                        "id": {
                            "type": "Identifier",
                            "start": 9,
                            "end": 10,
                            "name": "f"
                        },
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                            "type": "BlockStatement",
                            "start": 13,
                            "end": 15,
                            "body": []
                        }
                    },
                    {
                        "type": "VariableDeclaration",
                        "start": 16,
                        "end": 22,
                        "declarations": [{
                            "type": "VariableDeclarator",
                            "start": 20,
                            "end": 21,
                            "id": {
                                "type": "Identifier",
                                "start": 20,
                                "end": 21,
                                "name": "f"
                            },
                            "init": null
                        }],
                        "kind": "var"
                    }
                ],
                "sourceType": "script"
            });
        });
    });