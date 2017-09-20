import { parseScript, parseModule } from '../../../../src/cherow';
import * as chai from 'chai';
const expect = chai.expect;
   
describe('Destructuring', () => {

    describe('Object', () => {

        it('should fail on invalid lefthand side value', () => {
            expect(() => {
                parseScript('({a:this}=0)')
            }).to.throw('');
        });

        it('should fail on invalid pattern with method', () => {
            expect(() => {
                parseScript('({get a(){}})=0')
            }).to.throw('');
        });

        it('should fail on invalid lefthand side value', () => {
            expect(() => {
                parseScript('({a: this} = 0);')
            }).to.throw('');
        });

        it('should parse nested cover grammar', () => {
            expect(parseScript(`[[[[[[[[[[[[[[[[[[[[{a=b[0]}]]]]]]]]]]]]]]]]]]]]=0;`, {
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "operator": "=",
                        "left": {
                            "type": "ArrayPattern",
                            "elements": [{
                                "type": "ArrayPattern",
                                "elements": [{
                                    "type": "ArrayPattern",
                                    "elements": [{
                                        "type": "ArrayPattern",
                                        "elements": [{
                                            "type": "ArrayPattern",
                                            "elements": [{
                                                "type": "ArrayPattern",
                                                "elements": [{
                                                    "type": "ArrayPattern",
                                                    "elements": [{
                                                        "type": "ArrayPattern",
                                                        "elements": [{
                                                            "type": "ArrayPattern",
                                                            "elements": [{
                                                                "type": "ArrayPattern",
                                                                "elements": [{
                                                                    "type": "ArrayPattern",
                                                                    "elements": [{
                                                                        "type": "ArrayPattern",
                                                                        "elements": [{
                                                                            "type": "ArrayPattern",
                                                                            "elements": [{
                                                                                "type": "ArrayPattern",
                                                                                "elements": [{
                                                                                    "type": "ArrayPattern",
                                                                                    "elements": [{
                                                                                        "type": "ArrayPattern",
                                                                                        "elements": [{
                                                                                            "type": "ArrayPattern",
                                                                                            "elements": [{
                                                                                                "type": "ArrayPattern",
                                                                                                "elements": [{
                                                                                                    "type": "ArrayPattern",
                                                                                                    "elements": [{
                                                                                                        "type": "ArrayPattern",
                                                                                                        "elements": [{
                                                                                                            "type": "ObjectPattern",
                                                                                                            "properties": [{
                                                                                                                "type": "Property",
                                                                                                                "key": {
                                                                                                                    "type": "Identifier",
                                                                                                                    "name": "a"
                                                                                                                },
                                                                                                                "computed": false,
                                                                                                                "value": {
                                                                                                                    "type": "AssignmentPattern",
                                                                                                                    "left": {
                                                                                                                        "type": "Identifier",
                                                                                                                        "name": "a"
                                                                                                                    },
                                                                                                                    "right": {
                                                                                                                        "type": "MemberExpression",
                                                                                                                        "computed": true,
                                                                                                                        "object": {
                                                                                                                            "type": "Identifier",
                                                                                                                            "name": "b"
                                                                                                                        },
                                                                                                                        "property": {
                                                                                                                            "type": "Literal",
                                                                                                                            "value": 0,
                                                                                                                            "raw": "0"
                                                                                                                        }
                                                                                                                    }
                                                                                                                },
                                                                                                                "kind": "init",
                                                                                                                "method": false,
                                                                                                                "shorthand": true
                                                                                                            }]
                                                                                                        }]
                                                                                                    }]
                                                                                                }]
                                                                                            }]
                                                                                        }]
                                                                                    }]
                                                                                }]
                                                                            }]
                                                                        }]
                                                                    }]
                                                                }]
                                                            }]
                                                        }]
                                                    }]
                                                }]
                                            }]
                                        }]
                                    }]
                                }]
                            }]
                        },
                        "right": {
                            "type": "Literal",
                            "value": 0,
                            "raw": "0"
                        }
                    }
                }],
                "sourceType": "script"
            });
        });

        it('should parse empty object pattern', () => {
            expect(parseScript(`({} = 0);`)).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "operator": "=",
                        "left": {
                            "type": "ObjectPattern",
                            "properties": []
                        },
                        "right": {
                            "type": "Literal",
                            "value": 0
                        }
                    }
                }],
                "sourceType": "script"
            });
        });

        it('should parse assignment', () => {
            expect(parseScript(`({
    a,
    a:a,
    a:a=a,
    [a]:{a},
    a:some_call()[a],
    a:this.a
} = 0);`)).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "operator": "=",
                        "left": {
                            "type": "ObjectPattern",
                            "properties": [{
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "a"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "Identifier",
                                        "name": "a"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": true
                                },
                                {
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "a"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "Identifier",
                                        "name": "a"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": false
                                },
                                {
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "a"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "AssignmentPattern",
                                        "left": {
                                            "type": "Identifier",
                                            "name": "a"
                                        },
                                        "right": {
                                            "type": "Identifier",
                                            "name": "a"
                                        }
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": false
                                },
                                {
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "a"
                                    },
                                    "computed": true,
                                    "value": {
                                        "type": "ObjectPattern",
                                        "properties": [{
                                            "type": "Property",
                                            "key": {
                                                "type": "Identifier",
                                                "name": "a"
                                            },
                                            "computed": false,
                                            "value": {
                                                "type": "Identifier",
                                                "name": "a"
                                            },
                                            "kind": "init",
                                            "method": false,
                                            "shorthand": true
                                        }]
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": false
                                },
                                {
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "a"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "MemberExpression",
                                        "computed": true,
                                        "object": {
                                            "type": "CallExpression",
                                            "callee": {
                                                "type": "Identifier",
                                                "name": "some_call"
                                            },
                                            "arguments": []
                                        },
                                        "property": {
                                            "type": "Identifier",
                                            "name": "a"
                                        }
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": false
                                },
                                {
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "a"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "MemberExpression",
                                        "computed": false,
                                        "object": {
                                            "type": "ThisExpression"
                                        },
                                        "property": {
                                            "type": "Identifier",
                                            "name": "a"
                                        }
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": false
                                }
                            ]
                        },
                        "right": {
                            "type": "Literal",
                            "value": 0
                        }
                    }
                }],
                "sourceType": "script"
            });
        });
    });

}); 