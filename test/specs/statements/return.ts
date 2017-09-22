import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;
describe('Statements - Return', () => {
    
        it('should fail if return is not inside an function body', () => {
            expect(() => {
                parseScript(`do {
        var x=1;
        return x;
        var y=2;
    } while(0);`)
            }).to.throw();
        });
    
        it('should fail if "return" appear without a function body', () => {
            expect(() => {
                parseScript(`var x=1;
    return;
    var y=2;`)
            }).to.throw();
        });
    
        it('should fail if "return" wrapped inside a do-while appear without a function body', () => {
            expect(() => {
                parseScript(`do {
        var x=1;
        return x;
        var y=2;
    } while(0);`)
            }).to.throw();
        });
    
        it('should fail if "return" wrapped inside a try-catch appear without a function body', () => {
            expect(() => {
                parseScript(`try {
        throw 1;
    } catch(e){
        return e;
    }`)
            }).to.throw();
        });
    
        it('should parse "(function(){ return x * y })"', () => {
            expect(parseScript('(function(){ return x * y })')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "FunctionExpression",
                        "id": null,
                        "params": [],
                        "body": {
                            "type": "BlockStatement",
                            "body": [{
                                "type": "ReturnStatement",
                                "argument": {
                                    "type": "BinaryExpression",
                                    "operator": "*",
                                    "left": {
                                        "type": "Identifier",
                                        "name": "x"
                                    },
                                    "right": {
                                        "type": "Identifier",
                                        "name": "y"
                                    }
                                }
                            }]
                        },
                        "generator": false,
                        "expression": false,
                        "async": false
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse "(function(){ return })"', () => {
            expect(parseScript('(function(){ return })')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "FunctionExpression",
                        "id": null,
                        "params": [],
                        "body": {
                            "type": "BlockStatement",
                            "body": [{
                                "type": "ReturnStatement",
                                "argument": null
                            }]
                        },
                        "async": false,
                        "generator": false,
                        "expression": false
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse "(function(){ return; })"', () => {
            expect(parseScript('(function(){ return; })')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "FunctionExpression",
                        "id": null,
                        "params": [],
                        "body": {
                            "type": "BlockStatement",
                            "body": [{
                                "type": "ReturnStatement",
                                "argument": null
                            }]
                        },
                        "async": false,
                        "generator": false,
                        "expression": false
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse "(function(){ return x; })"', () => {
            expect(parseScript('(function(){ return x; })')).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "FunctionExpression",
                        "id": null,
                        "params": [],
                        "body": {
                            "type": "BlockStatement",
                            "body": [{
                                "type": "ReturnStatement",
                                "argument": {
                                    "type": "Identifier",
                                    "name": "x"
                                }
                            }]
                        },
                        "async": false,
                        "generator": false,
                        "expression": false
                    }
                }],
                "sourceType": "script"
            });
        });
    });