import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Destructuring - Destructuring', () => {
    
        it('should fail on error operator for default', () => {
            expect(() => {
                parseScript('([a += a] = a)')
            }).to.throw()
        });
    
        it('should fail on binding this', () => {
            expect(() => {
                parseScript('var { this };')
            }).to.throw()
        });
        it('should fail on "({a} += 0);"', () => {
            expect(() => {
                parseScript('({a} += 0);')
            }).to.not.throw()
        });

        it('should fail on "0, [...x,] = [];"', () => {
            expect(() => {
                parseScript('0, [...x,] = [];')
            }).to.not.throw()
        });
    
        it('should fail on "[0] = 0"', () => {
            expect(() => {
                parseScript('[0] = 0')
            }).to.throw()
        });
    
        it('should fail on "[...0,{a=0}]=0"', () => {
            expect(() => {
                parseScript('[...0,{a=0}]=0')
            }).to.throw()
        });
    
        it('should fail on "[...0,a]=0"', () => {
            expect(() => {
                parseScript('[...0,a]=0')
            }).to.throw()
        });
    
    
        it('should fail on "[{a=0},...0]"', () => {
            expect(() => {
                parseScript('[{a=0},...0]')
            }).to.not.throw()
        });
    
        it('should fail on "[...0,a]=0"', () => {
            expect(() => {
                parseScript('[...0,a]=0')
            }).to.throw()
        });
    
        it('should fail on "[{a=0},...0]"', () => {
            expect(() => {
                parseScript('[{a=0},...0]')
            }).to.not.throw()
        });
    
        it('should fail on "[{a=0},{b=0},0] = 0"', () => {
            expect(() => {
                parseScript('[{a=0},{b=0},0] = 0')
            }).to.throw()
        });
    
        it('should fail on "[0,{a=0}] = 0"', () => {
            expect(() => {
                parseScript('[0,{a=0}] = 0')
            }).to.throw()
        });
    
        it('should fail on "[0,{a=0}] = 0"', () => {
            expect(() => {
                parseScript('[0,{a=0}] = 0')
            }).to.throw()
        });
    
        it('should fail on "[...x,,] = 0"', () => {
            expect(() => {
                parseScript('[...x,,] = 0')
            }).to.not.throw()
        });
    
        it('should fail on "[...x, y] = 0"', () => {
            expect(() => {
                parseScript('[...x, y] = 0')
            }).to.not.throw()
        });
    
        it('should fail on "[...{a=0},]=0"', () => {
            expect(() => {
                parseScript('[...{a=0},]=0')
            }).to.not.throw()
        });
    
        it('should fail on "[a, ...b, {c=0}]"', () => {
            expect(() => {
                parseScript('[a, ...b, {c=0}]')
            }).to.not.throw()
        });
    
        it('should fail on "{a = [...b, c]} = 0"', () => {
            expect(() => {
                parseScript('{a = [...b, c]} = 0')
            }).to.throw()
        });
    
        it('should fail on "[a, ...(b = c)] = 0"', () => {
            expect(() => {
                parseScript('[a, ...(b = c)] = 0')
            }).to.not.throw()
        });
    
        it('should fail on "({a} += 0);"', () => {
            expect(() => {
                parseScript('({a} += 0);')
            }).to.not.throw()
        });
    
        it('should fail on "({a} += 0);"', () => {
            expect(() => {
                parseScript('({a} += 0);')
            }).to.not.throw()
        });
    
        it('should fail on "({a} += 0);"', () => {
            expect(() => {
                parseScript('({a} += 0);')
            }).to.not.throw()
        });
    
        it('should fail on "({a} += 0);"', () => {
            expect(() => {
                parseScript('({a} += 0);')
            }).to.not.throw()
        });
    
    
        it('should fail on "({a} += 0);"', () => {
            expect(() => {
                parseScript('({a} += 0);')
            }).to.not.throw()
        });
    
        it('should fail on "({,a,} = 0)"', () => {
            expect(() => {
                parseScript('({,a,} = 0)')
            }).to.throw()
        });
    
        it('should fail on "({a,,a} = 0)"', () => {
            expect(() => {
                parseScript('({a,,a} = 0)')
            }).to.throw()
        });
    
        it('should fail on "({a:function} = 0)"', () => {
            expect(() => {
                parseScript('({a:function} = 0)')
            }).to.throw()
        });
    
        it('should fail on "({a:for} = 0)"', () => {
            expect(() => {
                parseScript('({a:for} = 0)')
            }).to.throw();
        });
    
        it('should fail on "({\'a\'} = 0)"', () => {
            expect(() => {
                parseScript('({\'a\'} = 0)')
            }).to.throw()
        });
    
        it('should fail on "({a,,a} = 0)"', () => {
            expect(() => {
                parseScript('({a,,a} = 0)')
            }).to.throw()
        });
    
        it('should fail on "({var} = 0)"', () => {
            expect(() => {
                parseScript('({var} = 0)')
            }).to.throw()
        });
    
        it('should fail on "({a.b} = 0)"', () => {
            expect(() => {
                parseScript('({a.b} = 0)')
            }).to.throw()
        });
    
        it('should fail on "({0} = 0)"', () => {
            expect(() => {
                parseScript('({0} = 0)')
            }).to.throw()
        });
    
        it('should fail on invalid object assign', () => {
            expect(() => {
                parseScript('({ Object=0, String=0 }) = {}')
            }).to.not.throw()
        });

        it('should parse object pattern with deep binding property lists', () => {
            expect(parseScript('function fn1({a: {p: q}, b: {r}, c: {s = 0}, d: {}}) {}', {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 55,
                "body": [
                  {
                    "type": "FunctionDeclaration",
                    "start": 0,
                    "end": 55,
                    "id": {
                      "type": "Identifier",
                      "start": 9,
                      "end": 12,
                      "name": "fn1"
                    },
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [
                      {
                        "type": "ObjectPattern",
                        "start": 13,
                        "end": 51,
                        "properties": [
                          {
                            "type": "Property",
                            "start": 14,
                            "end": 23,
                            "method": false,
                            "shorthand": false,
                            "computed": false,
                            "key": {
                              "type": "Identifier",
                              "start": 14,
                              "end": 15,
                              "name": "a"
                            },
                            "value": {
                              "type": "ObjectPattern",
                              "start": 17,
                              "end": 23,
                              "properties": [
                                {
                                  "type": "Property",
                                  "start": 18,
                                  "end": 22,
                                  "method": false,
                                  "shorthand": false,
                                  "computed": false,
                                  "key": {
                                    "type": "Identifier",
                                    "start": 18,
                                    "end": 19,
                                    "name": "p"
                                  },
                                  "value": {
                                    "type": "Identifier",
                                    "start": 21,
                                    "end": 22,
                                    "name": "q"
                                  },
                                  "kind": "init"
                                }
                              ]
                            },
                            "kind": "init"
                          },
                          {
                            "type": "Property",
                            "start": 25,
                            "end": 31,
                            "method": false,
                            "shorthand": false,
                            "computed": false,
                            "key": {
                              "type": "Identifier",
                              "start": 25,
                              "end": 26,
                              "name": "b"
                            },
                            "value": {
                              "type": "ObjectPattern",
                              "start": 28,
                              "end": 31,
                              "properties": [
                                {
                                  "type": "Property",
                                  "start": 29,
                                  "end": 30,
                                  "method": false,
                                  "shorthand": true,
                                  "computed": false,
                                  "key": {
                                    "type": "Identifier",
                                    "start": 29,
                                    "end": 30,
                                    "name": "r"
                                  },
                                  "kind": "init",
                                  "value": {
                                    "type": "Identifier",
                                    "start": 29,
                                    "end": 30,
                                    "name": "r"
                                  }
                                }
                              ]
                            },
                            "kind": "init"
                          },
                          {
                            "type": "Property",
                            "start": 33,
                            "end": 43,
                            "method": false,
                            "shorthand": false,
                            "computed": false,
                            "key": {
                              "type": "Identifier",
                              "start": 33,
                              "end": 34,
                              "name": "c"
                            },
                            "value": {
                              "type": "ObjectPattern",
                              "start": 36,
                              "end": 43,
                              "properties": [
                                {
                                  "type": "Property",
                                  "start": 37,
                                  "end": 42,
                                  "method": false,
                                  "shorthand": true,
                                  "computed": false,
                                  "key": {
                                    "type": "Identifier",
                                    "start": 37,
                                    "end": 38,
                                    "name": "s"
                                  },
                                  "kind": "init",
                                  "value": {
                                    "type": "AssignmentPattern",
                                    "start": 37,
                                    "end": 42,
                                    "left": {
                                      "type": "Identifier",
                                      "start": 37,
                                      "end": 38,
                                      "name": "s"
                                    },
                                    "right": {
                                      "type": "Literal",
                                      "start": 41,
                                      "end": 42,
                                      "value": 0,
                                      "raw": "0"
                                    }
                                  }
                                }
                              ]
                            },
                            "kind": "init"
                          },
                          {
                            "type": "Property",
                            "start": 45,
                            "end": 50,
                            "method": false,
                            "shorthand": false,
                            "computed": false,
                            "key": {
                              "type": "Identifier",
                              "start": 45,
                              "end": 46,
                              "name": "d"
                            },
                            "value": {
                              "type": "ObjectPattern",
                              "start": 48,
                              "end": 50,
                              "properties": []
                            },
                            "kind": "init"
                          }
                        ]
                      }
                    ],
                    "body": {
                      "type": "BlockStatement",
                      "start": 53,
                      "end": 55,
                      "body": []
                    }
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse object binding pattern with a simple property list and single name binding', () => {
            expect(parseScript('function fnc({x = 42}) {}', {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 25,
                "body": [
                  {
                    "type": "FunctionDeclaration",
                    "start": 0,
                    "end": 25,
                    "id": {
                      "type": "Identifier",
                      "start": 9,
                      "end": 12,
                      "name": "fnc"
                    },
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [
                      {
                        "type": "ObjectPattern",
                        "start": 13,
                        "end": 21,
                        "properties": [
                          {
                            "type": "Property",
                            "start": 14,
                            "end": 20,
                            "method": false,
                            "shorthand": true,
                            "computed": false,
                            "key": {
                              "type": "Identifier",
                              "start": 14,
                              "end": 15,
                              "name": "x"
                            },
                            "kind": "init",
                            "value": {
                              "type": "AssignmentPattern",
                              "start": 14,
                              "end": 20,
                              "left": {
                                "type": "Identifier",
                                "start": 14,
                                "end": 15,
                                "name": "x"
                              },
                              "right": {
                                "type": "Literal",
                                "start": 18,
                                "end": 20,
                                "value": 42,
                                "raw": "42"
                              }
                            }
                          }
                        ]
                      }
                    ],
                    "body": {
                      "type": "BlockStatement",
                      "start": 23,
                      "end": 25,
                      "body": []
                    }
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse property list followed by a single comma', () => {
            expect(parseScript('function fn2({a: {p: q, }, }) {}', {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 32,
                "body": [
                  {
                    "type": "FunctionDeclaration",
                    "start": 0,
                    "end": 32,
                    "id": {
                      "type": "Identifier",
                      "start": 9,
                      "end": 12,
                      "name": "fn2"
                    },
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [
                      {
                        "type": "ObjectPattern",
                        "start": 13,
                        "end": 28,
                        "properties": [
                          {
                            "type": "Property",
                            "start": 14,
                            "end": 25,
                            "method": false,
                            "shorthand": false,
                            "computed": false,
                            "key": {
                              "type": "Identifier",
                              "start": 14,
                              "end": 15,
                              "name": "a"
                            },
                            "value": {
                              "type": "ObjectPattern",
                              "start": 17,
                              "end": 25,
                              "properties": [
                                {
                                  "type": "Property",
                                  "start": 18,
                                  "end": 22,
                                  "method": false,
                                  "shorthand": false,
                                  "computed": false,
                                  "key": {
                                    "type": "Identifier",
                                    "start": 18,
                                    "end": 19,
                                    "name": "p"
                                  },
                                  "value": {
                                    "type": "Identifier",
                                    "start": 21,
                                    "end": 22,
                                    "name": "q"
                                  },
                                  "kind": "init"
                                }
                              ]
                            },
                            "kind": "init"
                          }
                        ]
                      }
                    ],
                    "body": {
                      "type": "BlockStatement",
                      "start": 30,
                      "end": 32,
                      "body": []
                    }
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse array binding pattern with no elements', () => {
            expect(parseScript('function fn([]) {}', {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 18,
                "body": [
                  {
                    "type": "FunctionDeclaration",
                    "start": 0,
                    "end": 18,
                    "id": {
                      "type": "Identifier",
                      "start": 9,
                      "end": 11,
                      "name": "fn"
                    },
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [
                      {
                        "type": "ArrayPattern",
                        "start": 12,
                        "end": 14,
                        "elements": []
                      }
                    ],
                    "body": {
                      "type": "BlockStatement",
                      "start": 16,
                      "end": 18,
                      "body": []
                    }
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse defaults object all', () => {
            expect(parseScript('var {x = 10, y = 5, z = 1} = a;', {
                ranges: true,
                raw: true
            })).to.eql({
                "body": [{
                    "declarations": [{
                        "end": 30,
                        "id": {
                            "end": 26,
                            "properties": [{
                                    "computed": false,
                                    "end": 11,
                                    "key": {
                                        "end": 6,
                                        "name": "x",
                                        "start": 5,
                                        "type": "Identifier"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": true,
                                    "start": 5,
                                    "type": "Property",
                                    "value": {
                                        "end": 11,
                                        "left": {
                                            "end": 6,
                                            "name": "x",
                                            "start": 5,
                                            "type": "Identifier"
                                        },
                                        "right": {
                                            "end": 11,
                                            "raw": "10",
                                            "start": 9,
                                            "type": "Literal",
                                            "value": 10
                                        },
                                        "start": 5,
                                        "type": "AssignmentPattern",
                                    }
                                },
                                {
                                    "computed": false,
                                    "end": 18,
                                    "key": {
                                        "end": 14,
                                        "name": "y",
                                        "start": 13,
                                        "type": "Identifier"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": true,
                                    "start": 13,
                                    "type": "Property",
                                    "value": {
                                        "end": 18,
                                        "left": {
                                            "end": 14,
                                            "name": "y",
                                            "start": 13,
                                            "type": "Identifier"
                                        },
                                        "right": {
                                            "end": 18,
                                            "raw": "5",
                                            "start": 17,
                                            "type": "Literal",
                                            "value": 5
                                        },
                                        "start": 13,
                                        "type": "AssignmentPattern"
                                    }
                                },
                                {
                                    "computed": false,
                                    "end": 25,
                                    "key": {
                                        "end": 21,
                                        "name": "z",
                                        "start": 20,
                                        "type": "Identifier",
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": true,
                                    "start": 20,
                                    "type": "Property",
                                    "value": {
                                        "end": 25,
                                        "left": {
                                            "end": 21,
                                            "name": "z",
                                            "start": 20,
                                            "type": "Identifier"
                                        },
                                        "right": {
                                            "end": 25,
                                            "raw": "1",
                                            "start": 24,
                                            "type": "Literal",
                                            "value": 1
                                        },
                                        "start": 20,
                                        "type": "AssignmentPattern"
                                    }
                                }
                            ],
                            "start": 4,
                            "type": "ObjectPattern"
                        },
                        "init": {
                            "end": 30,
                            "name": "a",
                            "start": 29,
                            "type": "Identifier"
                        },
                        "start": 4,
                        "type": "VariableDeclarator"
                    }],
                    "end": 31,
                    "kind": "var",
                    "start": 0,
                    "type": "VariableDeclaration"
                }],
                "end": 31,
                "sourceType": "script",
                "start": 0,
                "type": "Program"
            });
        });
    
        it('should parse defaults object longform', () => {
            expect(parseScript('var {x: x = 10, y: y = 10, z: z = 10} = a;', {
                ranges: false,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "VariableDeclaration",
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "ObjectPattern",
                            "properties": [{
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "x"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "AssignmentPattern",
                                        "left": {
                                            "type": "Identifier",
                                            "name": "x"
                                        },
                                        "right": {
                                            "type": "Literal",
                                            "value": 10,
                                            "raw": "10"
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
                                        "name": "y"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "AssignmentPattern",
                                        "left": {
                                            "type": "Identifier",
                                            "name": "y"
                                        },
                                        "right": {
                                            "type": "Literal",
                                            "value": 10,
                                            "raw": "10"
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
                                        "name": "z"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "AssignmentPattern",
                                        "left": {
                                            "type": "Identifier",
                                            "name": "z"
                                        },
                                        "right": {
                                            "type": "Literal",
                                            "value": 10,
                                            "raw": "10"
                                        }
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": false
                                }
                            ]
                        },
                        "init": {
                            "type": "Identifier",
                            "name": "a"
                        }
                    }],
                    "kind": "var"
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse default object mixed multi', () => {
            expect(parseScript('var {x, y: y = 10, z} = a;', {
                ranges: false,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "VariableDeclaration",
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "ObjectPattern",
                            "properties": [{
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "x"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "Identifier",
                                        "name": "x"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": true
                                },
                                {
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "y"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "AssignmentPattern",
                                        "left": {
                                            "type": "Identifier",
                                            "name": "y"
                                        },
                                        "right": {
                                            "type": "Literal",
                                            "value": 10,
                                            "raw": "10"
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
                                        "name": "z"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "Identifier",
                                        "name": "z"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": true
                                }
                            ]
                        },
                        "init": {
                            "type": "Identifier",
                            "name": "a"
                        }
                    }],
                    "kind": "var"
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse object multi', () => {
            expect(parseScript('var {x = 10, y, z} = a;', {
                ranges: false,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "VariableDeclaration",
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "ObjectPattern",
                            "properties": [{
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "x"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "AssignmentPattern",
                                        "left": {
                                            "type": "Identifier",
                                            "name": "x"
                                        },
                                        "right": {
                                            "type": "Literal",
                                            "value": 10,
                                            "raw": "10"
                                        }
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": true
                                },
                                {
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "y"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "Identifier",
                                        "name": "y"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": true
                                },
                                {
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "z"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "Identifier",
                                        "name": "z"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": true
                                }
                            ]
                        },
                        "init": {
                            "type": "Identifier",
                            "name": "a"
                        }
                    }],
                    "kind": "var"
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse defaults object', () => {
            expect(parseScript('var {x = 10} = x', {
                ranges: false,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "VariableDeclaration",
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "ObjectPattern",
                            "properties": [{
                                "type": "Property",
                                "key": {
                                    "type": "Identifier",
                                    "name": "x"
                                },
                                "computed": false,
                                "value": {
                                    "type": "AssignmentPattern",
                                    "left": {
                                        "type": "Identifier",
                                        "name": "x"
                                    },
                                    "right": {
                                        "type": "Literal",
                                        "value": 10,
                                        "raw": "10"
                                    }
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": true
                            }]
                        },
                        "init": {
                            "type": "Identifier",
                            "name": "x"
                        }
                    }],
                    "kind": "var"
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse destructed array catch', () => {
            expect(parseScript('function x({a}) { try { var {b} = a; } catch([stack]) { } };', {
                ranges: false,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                        "type": "FunctionDeclaration",
                        "id": {
                            "type": "Identifier",
                            "name": "x"
                        },
                        "params": [{
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
                        }],
                        "body": {
                            "type": "BlockStatement",
                            "body": [{
                                "type": "TryStatement",
                                "block": {
                                    "type": "BlockStatement",
                                    "body": [{
                                        "type": "VariableDeclaration",
                                        "declarations": [{
                                            "type": "VariableDeclarator",
                                            "id": {
                                                "type": "ObjectPattern",
                                                "properties": [{
                                                    "type": "Property",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "b"
                                                    },
                                                    "computed": false,
                                                    "value": {
                                                        "type": "Identifier",
                                                        "name": "b"
                                                    },
                                                    "kind": "init",
                                                    "method": false,
                                                    "shorthand": true
                                                }]
                                            },
                                            "init": {
                                                "type": "Identifier",
                                                "name": "a"
                                            }
                                        }],
                                        "kind": "var"
                                    }]
                                },
                                "handler": {
                                    "type": "CatchClause",
                                    "param": {
                                        "type": "ArrayPattern",
                                        "elements": [{
                                            "type": "Identifier",
                                            "name": "stack"
                                        }]
                                    },
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": []
                                    }
                                },
                                "finalizer": null
                            }]
                        },
                        "generator": false,
                        "expression": false,
                        "async": false
                    },
                    {
                        "type": "EmptyStatement"
                    }
                ],
                "sourceType": "script"
            });
        });
    
        it('should parse named param', () => {
            expect(parseScript('({ responseText: text } = res);', {
                ranges: false,
                raw: true
            })).to.eql({
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
                                    "name": "responseText"
                                },
                                "computed": false,
                                "value": {
                                    "type": "Identifier",
                                    "name": "text"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false
                            }]
                        },
                        "right": {
                            "type": "Identifier",
                            "name": "res"
                        }
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it.skip('should fail on invalid object assign', () => {
            expect(() => {
                parseScript('[[[[[[[[[[[[[[[[[[[[{a=b}]]]]]]]]]]]]]]]]]]]]')
            }).to.throw()
        });
    
        it('should parse object pattern assignment', () => {
            expect(parseScript(`({
                        a,
                        a:a,
                        a:a=a,
                        [a]:{a},
                        a:some_call()[a],
                        a:this.a
                    } = 0);`, {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 225,
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 0,
                    "end": 225,
                    "expression": {
                      "type": "AssignmentExpression",
                      "start": 1,
                      "end": 223,
                      "operator": "=",
                      "left": {
                        "type": "ObjectPattern",
                        "start": 1,
                        "end": 219,
                        "properties": [
                          {
                            "type": "Property",
                            "start": 27,
                            "end": 28,
                            "method": false,
                            "shorthand": true,
                            "computed": false,
                            "key": {
                              "type": "Identifier",
                              "start": 27,
                              "end": 28,
                              "name": "a"
                            },
                            "kind": "init",
                            "value": {
                              "type": "Identifier",
                              "start": 27,
                              "end": 28,
                              "name": "a"
                            }
                          },
                          {
                            "type": "Property",
                            "start": 54,
                            "end": 57,
                            "method": false,
                            "shorthand": false,
                            "computed": false,
                            "key": {
                              "type": "Identifier",
                              "start": 54,
                              "end": 55,
                              "name": "a"
                            },
                            "value": {
                              "type": "Identifier",
                              "start": 56,
                              "end": 57,
                              "name": "a"
                            },
                            "kind": "init"
                          },
                          {
                            "type": "Property",
                            "start": 83,
                            "end": 88,
                            "method": false,
                            "shorthand": false,
                            "computed": false,
                            "key": {
                              "type": "Identifier",
                              "start": 83,
                              "end": 84,
                              "name": "a"
                            },
                            "value": {
                              "type": "AssignmentPattern",
                              "start": 85,
                              "end": 88,
                              "left": {
                                "type": "Identifier",
                                "start": 85,
                                "end": 86,
                                "name": "a"
                              },
                              "right": {
                                "type": "Identifier",
                                "start": 87,
                                "end": 88,
                                "name": "a"
                              }
                            },
                            "kind": "init"
                          },
                          {
                            "type": "Property",
                            "start": 114,
                            "end": 121,
                            "method": false,
                            "shorthand": false,
                            "computed": true,
                            "key": {
                              "type": "Identifier",
                              "start": 115,
                              "end": 116,
                              "name": "a"
                            },
                            "value": {
                              "type": "ObjectPattern",
                              "start": 118,
                              "end": 121,
                              "properties": [
                                {
                                  "type": "Property",
                                  "start": 119,
                                  "end": 120,
                                  "method": false,
                                  "shorthand": true,
                                  "computed": false,
                                  "key": {
                                    "type": "Identifier",
                                    "start": 119,
                                    "end": 120,
                                    "name": "a"
                                  },
                                  "kind": "init",
                                  "value": {
                                    "type": "Identifier",
                                    "start": 119,
                                    "end": 120,
                                    "name": "a"
                                  }
                                }
                              ]
                            },
                            "kind": "init"
                          },
                          {
                            "type": "Property",
                            "start": 147,
                            "end": 163,
                            "method": false,
                            "shorthand": false,
                            "computed": false,
                            "key": {
                              "type": "Identifier",
                              "start": 147,
                              "end": 148,
                              "name": "a"
                            },
                            "value": {
                              "type": "MemberExpression",
                              "start": 149,
                              "end": 163,
                              "object": {
                                "type": "CallExpression",
                                "start": 149,
                                "end": 160,
                                "callee": {
                                  "type": "Identifier",
                                  "start": 149,
                                  "end": 158,
                                  "name": "some_call"
                                },
                                "arguments": []
                              },
                              "property": {
                                "type": "Identifier",
                                "start": 161,
                                "end": 162,
                                "name": "a"
                              },
                              "computed": true
                            },
                            "kind": "init"
                          },
                          {
                            "type": "Property",
                            "start": 189,
                            "end": 197,
                            "method": false,
                            "shorthand": false,
                            "computed": false,
                            "key": {
                              "type": "Identifier",
                              "start": 189,
                              "end": 190,
                              "name": "a"
                            },
                            "value": {
                              "type": "MemberExpression",
                              "start": 191,
                              "end": 197,
                              "object": {
                                "type": "ThisExpression",
                                "start": 191,
                                "end": 195
                              },
                              "property": {
                                "type": "Identifier",
                                "start": 196,
                                "end": 197,
                                "name": "a"
                              },
                              "computed": false
                            },
                            "kind": "init"
                          }
                        ]
                      },
                      "right": {
                        "type": "Literal",
                        "start": 222,
                        "end": 223,
                        "value": 0,
                        "raw": "0"
                      }
                    }
                  }
                ],
                "sourceType": "script"
              });
        });
    
        it('should parse object longform', () => {
            expect(parseScript('var { x: x = 10 } = x;', {
                ranges: false,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "VariableDeclaration",
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "ObjectPattern",
                            "properties": [{
                                "type": "Property",
                                "key": {
                                    "type": "Identifier",
                                    "name": "x"
                                },
                                "computed": false,
                                "value": {
                                    "type": "AssignmentPattern",
                                    "left": {
                                        "type": "Identifier",
                                        "name": "x"
                                    },
                                    "right": {
                                        "type": "Literal",
                                        "value": 10,
                                        "raw": "10"
                                    }
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false
                            }]
                        },
                        "init": {
                            "type": "Identifier",
                            "name": "x"
                        }
                    }],
                    "kind": "var"
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse defaults object longform', () => {
            expect(parseScript('var { x: x = 10 } = x;', {
                ranges: false,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "VariableDeclaration",
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "ObjectPattern",
                            "properties": [{
                                "type": "Property",
                                "key": {
                                    "type": "Identifier",
                                    "name": "x"
                                },
                                "computed": false,
                                "value": {
                                    "type": "AssignmentPattern",
                                    "left": {
                                        "type": "Identifier",
                                        "name": "x"
                                    },
                                    "right": {
                                        "type": "Literal",
                                        "value": 10,
                                        "raw": "10"
                                    }
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false
                            }]
                        },
                        "init": {
                            "type": "Identifier",
                            "name": "x"
                        }
                    }],
                    "kind": "var"
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse defaults object', () => {
            expect(parseScript('var {x = 10} = x', {
                ranges: false,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "VariableDeclaration",
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "ObjectPattern",
                            "properties": [{
                                "type": "Property",
                                "key": {
                                    "type": "Identifier",
                                    "name": "x"
                                },
                                "computed": false,
                                "value": {
                                    "type": "AssignmentPattern",
                                    "left": {
                                        "type": "Identifier",
                                        "name": "x"
                                    },
                                    "right": {
                                        "type": "Literal",
                                        "value": 10,
                                        "raw": "10"
                                    }
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": true
                            }]
                        },
                        "init": {
                            "type": "Identifier",
                            "name": "x"
                        }
                    }],
                    "kind": "var"
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse empty object assignment', () => {
            expect(parseScript('({x,} = 0)', {
                ranges: false,
                raw: true
            })).to.eql({
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
                                    "name": "x"
                                },
                                "computed": false,
                                "value": {
                                    "type": "Identifier",
                                    "name": "x"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": true
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
    
        it('should parse "({x,y,} = 0)"', () => {
            expect(parseScript('({x,y,} = 0)', {
                ranges: false,
                raw: true
            })).to.eql({
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
                                        "name": "x"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "Identifier",
                                        "name": "x"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": true
                                },
                                {
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "y"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "Identifier",
                                        "name": "y"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": true
                                }
                            ]
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
    
        it('should parse "({[a]: a} = 1)"', () => {
            expect(parseScript('({[a]: a} = 1)', {
                ranges: false,
                raw: true
            })).to.eql({
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
                                "computed": true,
                                "value": {
                                    "type": "Identifier",
                                    "name": "a"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false
                            }]
                        },
                        "right": {
                            "type": "Literal",
                            "value": 1,
                            "raw": "1"
                        }
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse "({x = 0,} = 1)"', () => {
            expect(parseScript('({x = 0,} = 1)', {
                ranges: false,
                raw: true
            })).to.eql({
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
                                    "name": "x"
                                },
                                "computed": false,
                                "value": {
                                    "type": "AssignmentPattern",
                                    "left": {
                                        "type": "Identifier",
                                        "name": "x"
                                    },
                                    "right": {
                                        "type": "Literal",
                                        "value": 0,
                                        "raw": "0"
                                    }
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": true
                            }]
                        },
                        "right": {
                            "type": "Literal",
                            "value": 1,
                            "raw": "1"
                        }
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse "({var: x} = 0)"', () => {
            expect(parseScript('({var: x} = 0)', {
                ranges: false,
                raw: true
            })).to.eql({
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
                                    "name": "var"
                                },
                                "computed": false,
                                "value": {
                                    "type": "Identifier",
                                    "name": "x"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false
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
    
        it('should parse empty object assignment', () => {
            expect(parseScript('({\'x\': y} = 0)', {
                ranges: false,
                raw: true
            })).to.eql({
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
                                    "type": "Literal",
                                    "value": "x",
                                    "raw": "'x'"
                                },
                                "computed": false,
                                "value": {
                                    "type": "Identifier",
                                    "name": "y"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false
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
    
        it('should parse "({0: y} = 0)"', () => {
            expect(parseScript('({0: y} = 0)', {
                ranges: false,
                raw: true
            })).to.eql({
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
                                    "type": "Literal",
                                    "value": 0,
                                    "raw": "0"
                                },
                                "computed": false,
                                "value": {
                                    "type": "Identifier",
                                    "name": "y"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false
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
    
        it('should parse "({0: x, 1: x} = 0)"', () => {
            expect(parseScript('({0: x, 1: x} = 0)', {
                ranges: false,
                raw: true
            })).to.eql({
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
                                        "type": "Literal",
                                        "value": 0,
                                        "raw": "0"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "Identifier",
                                        "name": "x"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": false
                                },
                                {
                                    "type": "Property",
                                    "key": {
                                        "type": "Literal",
                                        "value": 1,
                                        "raw": "1"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "Identifier",
                                        "name": "x"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": false
                                }
                            ]
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
    
        it('should parse "({x: y = 0} = 1)"', () => {
            expect(parseScript('({} = 0);', {
                ranges: false,
                raw: true
            })).to.eql({
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
                            "value": 0,
                            "raw": "0"
                        }
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse "({x: y = z = 0} = 1)"', () => {
            expect(parseScript('({x: y = z = 0} = 1)', {
                ranges: false,
                raw: true
            })).to.eql({
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
                                    "name": "x"
                                },
                                "computed": false,
                                "value": {
                                    "type": "AssignmentPattern",
                                    "left": {
                                        "type": "Identifier",
                                        "name": "y"
                                    },
                                    "right": {
                                        "type": "AssignmentExpression",
                                        "operator": "=",
                                        "left": {
                                            "type": "Identifier",
                                            "name": "z"
                                        },
                                        "right": {
                                            "type": "Literal",
                                            "value": 0,
                                            "raw": "0"
                                        }
                                    }
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false
                            }]
                        },
                        "right": {
                            "type": "Literal",
                            "value": 1,
                            "raw": "1"
                        }
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse "({x: [y] = 0} = 1)"', () => {
            expect(parseScript('({x: [y] = 0} = 1)', {
                ranges: false,
                raw: true
            })).to.eql({
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
                                    "name": "x"
                                },
                                "computed": false,
                                "value": {
                                    "type": "AssignmentPattern",
                                    "left": {
                                        "type": "ArrayPattern",
                                        "elements": [{
                                            "type": "Identifier",
                                            "name": "y"
                                        }]
                                    },
                                    "right": {
                                        "type": "Literal",
                                        "value": 0,
                                        "raw": "0"
                                    }
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false
                            }]
                        },
                        "right": {
                            "type": "Literal",
                            "value": 1,
                            "raw": "1"
                        }
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse "({a:let} = 0);"', () => {
            expect(parseScript('({a:let} = 0);', {
                ranges: false,
                raw: true
            })).to.eql({
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
                                    "name": "let"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false
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
    
        it.skip('should parse "({let} = 0);"', () => {
            expect(parseScript('({let} = 0);', {
                ranges: true,
                raw: true
            })).to.eql({
                "body": [{
                    "end": 12,
                    "expression": {
                        "end": 10,
                        "left": {
                            "end": 6,
                            "properties": [{
                                "computed": false,
                                "end": 5,
                                "key": {
                                    "end": 5,
                                    "name": "let",
                                    "start": 2,
                                    "type": "Identifier"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": true,
                                "start": 2,
                                "type": "Property",
                                "value": {
                                    "end": 5,
                                    "name": "let",
                                    "start": 2,
                                    "type": "Identifier"
                                }
                            }],
                            "start": 1,
                            "type": "ObjectPattern"
                        },
                        "operator": "=",
                        "right": {
                            "end": 10,
                            "raw": "0",
                            "start": 9,
                            "type": "Literal",
                            "value": 0,
                        },
                        "start": 1,
                        "type": "AssignmentExpression"
                    },
                    "start": 0,
                    "type": "ExpressionStatement"
                }],
                "end": 12,
                "sourceType": "script",
                "start": 0,
                "type": "Program"
            });
        });
    
        it('should parse "({a:yield} = 0);"', () => {
            expect(parseScript('({a:yield} = 0);', {
                ranges: false,
                raw: true
            })).to.eql({
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
                                    "name": "yield"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false
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
    
        it('should parse "({yield} = 0);"', () => {
            expect(parseScript('({yield} = 0);', {
                ranges: false,
                raw: true
            })).to.eql({
                "body": [{
                    "expression": {
                        "left": {
                            "properties": [{
                                "computed": false,
                                "key": {
                                    "name": "yield",
                                    "type": "Identifier"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": true,
                                "type": "Property",
                                "value": {
                                    "name": "yield",
                                    "type": "Identifier"
                                }
                            }],
                            "type": "ObjectPattern"
                        },
                        "operator": "=",
                        "right": {
                            "raw": "0",
                            "type": "Literal",
                            "value": 0,
                        },
                        "type": "AssignmentExpression"
                    },
                    "type": "ExpressionStatement"
                }],
                "sourceType": "script",
                "type": "Program"
            });
        });
    
        it('should parse "({yield = 0} = 0);"', () => {
            expect(parseScript('({yield = 0} = 0);', {
                ranges: false,
                raw: true
            })).to.eql({
                "body": [{
                    "expression": {
                        "left": {
                            "properties": [{
                                "computed": false,
                                "key": {
                                    "name": "yield",
                                    "type": "Identifier"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": true,
                                "type": "Property",
                                "value": {
                                    "left": {
                                        "name": "yield",
                                        "type": "Identifier"
                                    },
                                    "right": {
                                        "raw": "0",
                                        "type": "Literal",
                                        "value": 0,
                                    },
                                    "type": "AssignmentPattern"
                                }
                            }],
                            "type": "ObjectPattern"
                        },
                        "operator": "=",
                        "right": {
                            "raw": "0",
                            "type": "Literal",
                            "value": 0
                        },
                        "type": "AssignmentExpression"
                    },
                    "type": "ExpressionStatement"
                }],
                "sourceType": "script",
                "type": "Program"
            });
        });
    
        it('should parse "(function*() { [...{ x = yield }] = 0; })"', () => {
            expect(parseScript('(function*() { [...{ x = yield }] = 0; })', {
                ranges: false,
                raw: true
            })).to.eql({
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
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "AssignmentExpression",
                                    "operator": "=",
                                    "left": {
                                        "type": "ArrayPattern",
                                        "elements": [{
                                            "type": "RestElement",
                                            "argument": {
                                                "type": "ObjectPattern",
                                                "properties": [{
                                                    "type": "Property",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "x"
                                                    },
                                                    "computed": false,
                                                    "value": {
                                                        "type": "AssignmentPattern",
                                                        "left": {
                                                            "type": "Identifier",
                                                            "name": "x"
                                                        },
                                                        "right": {
                                                            "type": "YieldExpression",
                                                            "argument": null,
                                                            "delegate": false
                                                        }
                                                    },
                                                    "kind": "init",
                                                    "method": false,
                                                    "shorthand": true
                                                }]
                                            }
                                        }]
                                    },
                                    "right": {
                                        "type": "Literal",
                                        "value": 0,
                                        "raw": "0"
                                    }
                                }
                            }]
                        },
                        "generator": true,
                        "expression": false,
                        "async": false
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse empty object assignment', () => {
            expect(parseScript('({} = 0);', {
                ranges: false,
                raw: true
            })).to.eql({
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
                            "value": 0,
                            "raw": "0"
                        }
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse nested cover grammar', () => {
            expect(parseScript('[[[[[[[[[[[[[[[[[[[[{a=b[0]}]]]]]]]]]]]]]]]]]]]]=0;', {
                ranges: false,
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
    
    
        it('should parse nested object', () => {
            expect(parseScript('var {x: y, z: { a: b } } = { x: "3", z: { a: "b" } };', {
                ranges: false,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "VariableDeclaration",
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "ObjectPattern",
                            "properties": [{
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "x"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "Identifier",
                                        "name": "y"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": false
                                },
                                {
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "z"
                                    },
                                    "computed": false,
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
                                                "name": "b"
                                            },
                                            "kind": "init",
                                            "method": false,
                                            "shorthand": false
                                        }]
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": false
                                }
                            ]
                        },
                        "init": {
                            "type": "ObjectExpression",
                            "properties": [{
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "x"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "Literal",
                                        "value": "3",
                                        "raw": "\"3\""
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": false
                                },
                                {
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "z"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "ObjectExpression",
                                        "properties": [{
                                            "type": "Property",
                                            "key": {
                                                "type": "Identifier",
                                                "name": "a"
                                            },
                                            "computed": false,
                                            "value": {
                                                "type": "Literal",
                                                "value": "b",
                                                "raw": "\"b\""
                                            },
                                            "kind": "init",
                                            "method": false,
                                            "shorthand": false
                                        }]
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": false
                                }
                            ]
                        }
                    }],
                    "kind": "var"
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse object var named', () => {
            expect(parseScript('var {a:b} = {};', {
                ranges: false,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "VariableDeclaration",
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "id": {
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
                                    "name": "b"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false
                            }]
                        },
                        "init": {
                            "type": "ObjectExpression",
                            "properties": []
                        }
                    }],
                    "kind": "var"
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse object var undefined', () => {
            expect(parseScript('var {a} = {};', {
                ranges: false,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "VariableDeclaration",
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "id": {
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
                        "init": {
                            "type": "ObjectExpression",
                            "properties": []
                        }
                    }],
                    "kind": "var"
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse param default object nested', () => {
            expect(parseScript('function a({x = 10, y: { z = 10 }}) {};', {
                ranges: false,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                        "type": "FunctionDeclaration",
                        "id": {
                            "type": "Identifier",
                            "name": "a"
                        },
                        "params": [{
                            "type": "ObjectPattern",
                            "properties": [{
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "x"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "AssignmentPattern",
                                        "left": {
                                            "type": "Identifier",
                                            "name": "x"
                                        },
                                        "right": {
                                            "type": "Literal",
                                            "value": 10,
                                            "raw": "10"
                                        }
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": true
                                },
                                {
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "y"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "ObjectPattern",
                                        "properties": [{
                                            "type": "Property",
                                            "key": {
                                                "type": "Identifier",
                                                "name": "z"
                                            },
                                            "computed": false,
                                            "value": {
                                                "type": "AssignmentPattern",
                                                "left": {
                                                    "type": "Identifier",
                                                    "name": "z"
                                                },
                                                "right": {
                                                    "type": "Literal",
                                                    "value": 10,
                                                    "raw": "10"
                                                }
                                            },
                                            "kind": "init",
                                            "method": false,
                                            "shorthand": true
                                        }]
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": false
                                }
                            ]
                        }],
                        "body": {
                            "type": "BlockStatement",
                            "body": []
                        },
                        "generator": false,
                        "expression": false,
                        "async": false
                    },
                    {
                        "type": "EmptyStatement"
                    }
                ],
                "sourceType": "script"
            });
        });
    
        it('should parse params default object', () => {
            expect(parseScript('function a({x = 10}) {}', {
                ranges: false,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "a"
                    },
                    "params": [{
                        "type": "ObjectPattern",
                        "properties": [{
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "x"
                            },
                            "computed": false,
                            "value": {
                                "type": "AssignmentPattern",
                                "left": {
                                    "type": "Identifier",
                                    "name": "x"
                                },
                                "right": {
                                    "type": "Literal",
                                    "value": 10,
                                    "raw": "10"
                                }
                            },
                            "kind": "init",
                            "method": false,
                            "shorthand": true
                        }]
                    }],
                    "body": {
                        "type": "BlockStatement",
                        "body": []
                    },
                    "generator": false,
                    "expression": false,
                    "async": false
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse params multi object', () => {
            expect(parseScript('function x(a, { b }){};', {
                ranges: false,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                        "type": "FunctionDeclaration",
                        "id": {
                            "type": "Identifier",
                            "name": "x"
                        },
                        "params": [{
                                "type": "Identifier",
                                "name": "a"
                            },
                            {
                                "type": "ObjectPattern",
                                "properties": [{
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "b"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "Identifier",
                                        "name": "b"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": true
                                }]
                            }
                        ],
                        "body": {
                            "type": "BlockStatement",
                            "body": []
                        },
                        "generator": false,
                        "expression": false,
                        "async": false
                    },
                    {
                        "type": "EmptyStatement"
                    }
                ],
                "sourceType": "script"
            });
        });
    
        it('should parse params nested object', () => {
            expect(parseScript('function a({x: y, z: { a: b } }) {};', {
                ranges: false,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                        "type": "FunctionDeclaration",
                        "id": {
                            "type": "Identifier",
                            "name": "a"
                        },
                        "params": [{
                            "type": "ObjectPattern",
                            "properties": [{
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "x"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "Identifier",
                                        "name": "y"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": false
                                },
                                {
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "z"
                                    },
                                    "computed": false,
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
                                                "name": "b"
                                            },
                                            "kind": "init",
                                            "method": false,
                                            "shorthand": false
                                        }]
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": false
                                }
                            ]
                        }],
                        "body": {
                            "type": "BlockStatement",
                            "body": []
                        },
                        "generator": false,
                        "expression": false,
                        "async": false
                    },
                    {
                        "type": "EmptyStatement"
                    }
                ],
                "sourceType": "script"
            });
        });
    
        it('should parse params object wrapped', () => {
            expect(parseScript('(function x({ a, b }){});', {
                ranges: false,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "FunctionExpression",
                        "id": {
                            "type": "Identifier",
                            "name": "x"
                        },
                        "params": [{
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
                                        "name": "b"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "Identifier",
                                        "name": "b"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": true
                                }
                            ]
                        }],
                        "body": {
                            "type": "BlockStatement",
                            "body": []
                        },
                        "generator": false,
                        "expression": false,
                        "async": false
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse params object', () => {
            expect(parseScript('function x({ a, b }){};', {
                ranges: false,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                        "type": "FunctionDeclaration",
                        "id": {
                            "type": "Identifier",
                            "name": "x"
                        },
                        "params": [{
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
                                        "name": "b"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "Identifier",
                                        "name": "b"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": true
                                }
                            ]
                        }],
                        "body": {
                            "type": "BlockStatement",
                            "body": []
                        },
                        "generator": false,
                        "expression": false,
                        "async": false
                    },
                    {
                        "type": "EmptyStatement"
                    }
                ],
                "sourceType": "script"
            });
        });
    
        it('should parse array member', () => {
            expect(parseScript('[ok.v] = 20;', {
                ranges: false,
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
                                "type": "MemberExpression",
                                "computed": false,
                                "object": {
                                    "type": "Identifier",
                                    "name": "ok"
                                },
                                "property": {
                                    "type": "Identifier",
                                    "name": "v"
                                }
                            }]
                        },
                        "right": {
                            "type": "Literal",
                            "value": 20,
                            "raw": "20"
                        }
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse array to array', () => {
            expect(parseScript('[a, b] = [b, a];', {
                ranges: false,
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
                                    "type": "Identifier",
                                    "name": "a"
                                },
                                {
                                    "type": "Identifier",
                                    "name": "b"
                                }
                            ]
                        },
                        "right": {
                            "type": "ArrayExpression",
                            "elements": [{
                                    "type": "Identifier",
                                    "name": "b"
                                },
                                {
                                    "type": "Identifier",
                                    "name": "a"
                                }
                            ]
                        }
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse array var undefined', () => {
            expect(parseScript('var [a] = [];', {
                ranges: false,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "VariableDeclaration",
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "ArrayPattern",
                            "elements": [{
                                "type": "Identifier",
                                "name": "a"
                            }]
                        },
                        "init": {
                            "type": "ArrayExpression",
                            "elements": []
                        }
                    }],
                    "kind": "var"
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse defaults array all', () => {
            expect(parseScript('var [x = 10, y = 5, z = 1] = a;', {
                ranges: false,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "VariableDeclaration",
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "ArrayPattern",
                            "elements": [{
                                    "type": "AssignmentPattern",
                                    "left": {
                                        "type": "Identifier",
                                        "name": "x"
                                    },
                                    "right": {
                                        "type": "Literal",
                                        "value": 10,
                                        "raw": "10"
                                    }
                                },
                                {
                                    "type": "AssignmentPattern",
                                    "left": {
                                        "type": "Identifier",
                                        "name": "y"
                                    },
                                    "right": {
                                        "type": "Literal",
                                        "value": 5,
                                        "raw": "5"
                                    }
                                },
                                {
                                    "type": "AssignmentPattern",
                                    "left": {
                                        "type": "Identifier",
                                        "name": "z"
                                    },
                                    "right": {
                                        "type": "Literal",
                                        "value": 1,
                                        "raw": "1"
                                    }
                                }
                            ]
                        },
                        "init": {
                            "type": "Identifier",
                            "name": "a"
                        }
                    }],
                    "kind": "var"
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse default array', () => {
            expect(parseScript('[x=10] = x', {
                ranges: false,
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
                                "type": "AssignmentPattern",
                                "left": {
                                    "type": "Identifier",
                                    "name": "x"
                                },
                                "right": {
                                    "type": "Literal",
                                    "value": 10,
                                    "raw": "10"
                                }
                            }]
                        },
                        "right": {
                            "type": "Identifier",
                            "name": "x"
                        }
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse array catch', () => {
            expect(parseScript(`function x({a}) {
                            try {
                              var {b} = a;
                            }
                            catch([stack]) {
                            }
                          };`, {
                ranges: false,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                        "type": "FunctionDeclaration",
                        "id": {
                            "type": "Identifier",
                            "name": "x"
                        },
                        "params": [{
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
                        }],
                        "body": {
                            "type": "BlockStatement",
                            "body": [{
                                "type": "TryStatement",
                                "block": {
                                    "type": "BlockStatement",
                                    "body": [{
                                        "type": "VariableDeclaration",
                                        "declarations": [{
                                            "type": "VariableDeclarator",
                                            "id": {
                                                "type": "ObjectPattern",
                                                "properties": [{
                                                    "type": "Property",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "b"
                                                    },
                                                    "computed": false,
                                                    "value": {
                                                        "type": "Identifier",
                                                        "name": "b"
                                                    },
                                                    "kind": "init",
                                                    "method": false,
                                                    "shorthand": true
                                                }]
                                            },
                                            "init": {
                                                "type": "Identifier",
                                                "name": "a"
                                            }
                                        }],
                                        "kind": "var"
                                    }]
                                },
                                "handler": {
                                    "type": "CatchClause",
                                    "param": {
                                        "type": "ArrayPattern",
                                        "elements": [{
                                            "type": "Identifier",
                                            "name": "stack"
                                        }]
                                    },
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": []
                                    }
                                },
                                "finalizer": null
                            }]
                        },
                        "generator": false,
                        "expression": false,
                        "async": false
                    },
                    {
                        "type": "EmptyStatement"
                    }
                ],
                "sourceType": "script"
            });
        });
    
        it('should parse nested array', () => {
            expect(parseScript('var [x, , [, z]] = [1,2,[3,4]];', {
                ranges: false,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "VariableDeclaration",
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "ArrayPattern",
                            "elements": [{
                                    "type": "Identifier",
                                    "name": "x"
                                },
                                null,
                                {
                                    "type": "ArrayPattern",
                                    "elements": [
                                        null,
                                        {
                                            "type": "Identifier",
                                            "name": "z"
                                        }
                                    ]
                                }
                            ]
                        },
                        "init": {
                            "type": "ArrayExpression",
                            "elements": [{
                                    "type": "Literal",
                                    "value": 1,
                                    "raw": "1"
                                },
                                {
                                    "type": "Literal",
                                    "value": 2,
                                    "raw": "2"
                                },
                                {
                                    "type": "ArrayExpression",
                                    "elements": [{
                                            "type": "Literal",
                                            "value": 3,
                                            "raw": "3"
                                        },
                                        {
                                            "type": "Literal",
                                            "value": 4,
                                            "raw": "4"
                                        }
                                    ]
                                }
                            ]
                        }
                    }],
                    "kind": "var"
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse param default array', () => {
            expect(parseScript('function a([x = 10]) {}', {
                ranges: false,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "a"
                    },
                    "params": [{
                        "type": "ArrayPattern",
                        "elements": [{
                            "type": "AssignmentPattern",
                            "left": {
                                "type": "Identifier",
                                "name": "x"
                            },
                            "right": {
                                "type": "Literal",
                                "value": 10,
                                "raw": "10"
                            }
                        }]
                    }],
                    "body": {
                        "type": "BlockStatement",
                        "body": []
                    },
                    "generator": false,
                    "expression": false,
                    "async": false
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse array element with initializer', () => {
            expect(parseScript('function fn3([a,, b = a, c = 42]) {}', {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 36,
                "body": [
                  {
                    "type": "FunctionDeclaration",
                    "start": 0,
                    "end": 36,
                    "id": {
                      "type": "Identifier",
                      "start": 9,
                      "end": 12,
                      "name": "fn3"
                    },
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [
                      {
                        "type": "ArrayPattern",
                        "start": 13,
                        "end": 32,
                        "elements": [
                          {
                            "type": "Identifier",
                            "start": 14,
                            "end": 15,
                            "name": "a"
                          },
                          null,
                          {
                            "type": "AssignmentPattern",
                            "start": 18,
                            "end": 23,
                            "left": {
                              "type": "Identifier",
                              "start": 18,
                              "end": 19,
                              "name": "b"
                            },
                            "right": {
                              "type": "Identifier",
                              "start": 22,
                              "end": 23,
                              "name": "a"
                            }
                          },
                          {
                            "type": "AssignmentPattern",
                            "start": 25,
                            "end": 31,
                            "left": {
                              "type": "Identifier",
                              "start": 25,
                              "end": 26,
                              "name": "c"
                            },
                            "right": {
                              "type": "Literal",
                              "start": 29,
                              "end": 31,
                              "value": 42,
                              "raw": "42"
                            }
                          }
                        ]
                      }
                    ],
                    "body": {
                      "type": "BlockStatement",
                      "start": 34,
                      "end": 36,
                      "body": []
                    }
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse array binding pattern with Rest Element', () => {
            expect(parseScript('function fn2([,,,,,,,...args]) {}', {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 33,
                "body": [
                  {
                    "type": "FunctionDeclaration",
                    "start": 0,
                    "end": 33,
                    "id": {
                      "type": "Identifier",
                      "start": 9,
                      "end": 12,
                      "name": "fn2"
                    },
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [
                      {
                        "type": "ArrayPattern",
                        "start": 13,
                        "end": 29,
                        "elements": [
                          null,
                          null,
                          null,
                          null,
                          null,
                          null,
                          null,
                          {
                            "type": "RestElement",
                            "start": 21,
                            "end": 28,
                            "argument": {
                              "type": "Identifier",
                              "start": 24,
                              "end": 28,
                              "name": "args"
                            }
                          }
                        ]
                      }
                    ],
                    "body": {
                      "type": "BlockStatement",
                      "start": 31,
                      "end": 33,
                      "body": []
                    }
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse recursive array and object pattern', () => {
            expect(parseScript('function fn4([], [[]], [[[[[[[[[x]]]]]]]]]) {}', {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 46,
                "body": [
                  {
                    "type": "FunctionDeclaration",
                    "start": 0,
                    "end": 46,
                    "id": {
                      "type": "Identifier",
                      "start": 9,
                      "end": 12,
                      "name": "fn4"
                    },
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [
                      {
                        "type": "ArrayPattern",
                        "start": 13,
                        "end": 15,
                        "elements": []
                      },
                      {
                        "type": "ArrayPattern",
                        "start": 17,
                        "end": 21,
                        "elements": [
                          {
                            "type": "ArrayPattern",
                            "start": 18,
                            "end": 20,
                            "elements": []
                          }
                        ]
                      },
                      {
                        "type": "ArrayPattern",
                        "start": 23,
                        "end": 42,
                        "elements": [
                          {
                            "type": "ArrayPattern",
                            "start": 24,
                            "end": 41,
                            "elements": [
                              {
                                "type": "ArrayPattern",
                                "start": 25,
                                "end": 40,
                                "elements": [
                                  {
                                    "type": "ArrayPattern",
                                    "start": 26,
                                    "end": 39,
                                    "elements": [
                                      {
                                        "type": "ArrayPattern",
                                        "start": 27,
                                        "end": 38,
                                        "elements": [
                                          {
                                            "type": "ArrayPattern",
                                            "start": 28,
                                            "end": 37,
                                            "elements": [
                                              {
                                                "type": "ArrayPattern",
                                                "start": 29,
                                                "end": 36,
                                                "elements": [
                                                  {
                                                    "type": "ArrayPattern",
                                                    "start": 30,
                                                    "end": 35,
                                                    "elements": [
                                                      {
                                                        "type": "ArrayPattern",
                                                        "start": 31,
                                                        "end": 34,
                                                        "elements": [
                                                          {
                                                            "type": "Identifier",
                                                            "start": 32,
                                                            "end": 33,
                                                            "name": "x"
                                                          }
                                                        ]
                                                      }
                                                    ]
                                                  }
                                                ]
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ],
                    "body": {
                      "type": "BlockStatement",
                      "start": 44,
                      "end": 46,
                      "body": []
                    }
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse object binding pattern with no property list', () => {
            expect(parseScript('function fn({}) {}', {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 18,
                "body": [
                  {
                    "type": "FunctionDeclaration",
                    "start": 0,
                    "end": 18,
                    "id": {
                      "type": "Identifier",
                      "start": 9,
                      "end": 11,
                      "name": "fn"
                    },
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [
                      {
                        "type": "ObjectPattern",
                        "start": 12,
                        "end": 14,
                        "properties": []
                      }
                    ],
                    "body": {
                      "type": "BlockStatement",
                      "start": 16,
                      "end": 18,
                      "body": []
                    }
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse array binding pattern with ellison', () => {
            expect(parseScript('function fn2([,,]) {}', {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 21,
                "body": [
                  {
                    "type": "FunctionDeclaration",
                    "start": 0,
                    "end": 21,
                    "id": {
                      "type": "Identifier",
                      "start": 9,
                      "end": 12,
                      "name": "fn2"
                    },
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [
                      {
                        "type": "ArrayPattern",
                        "start": 13,
                        "end": 17,
                        "elements": [
                          null,
                          null
                        ]
                      }
                    ],
                    "body": {
                      "type": "BlockStatement",
                      "start": 19,
                      "end": 21,
                      "body": []
                    }
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse array binding pattern with Object patterns on the element list', () => {
            expect(parseScript('function fn4([a, {b: []}]) {}', {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 29,
                "body": [
                  {
                    "type": "FunctionDeclaration",
                    "start": 0,
                    "end": 29,
                    "id": {
                      "type": "Identifier",
                      "start": 9,
                      "end": 12,
                      "name": "fn4"
                    },
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [
                      {
                        "type": "ArrayPattern",
                        "start": 13,
                        "end": 25,
                        "elements": [
                          {
                            "type": "Identifier",
                            "start": 14,
                            "end": 15,
                            "name": "a"
                          },
                          {
                            "type": "ObjectPattern",
                            "start": 17,
                            "end": 24,
                            "properties": [
                              {
                                "type": "Property",
                                "start": 18,
                                "end": 23,
                                "method": false,
                                "shorthand": false,
                                "computed": false,
                                "key": {
                                  "type": "Identifier",
                                  "start": 18,
                                  "end": 19,
                                  "name": "b"
                                },
                                "value": {
                                  "type": "ArrayPattern",
                                  "start": 21,
                                  "end": 23,
                                  "elements": []
                                },
                                "kind": "init"
                              }
                            ]
                          }
                        ]
                      }
                    ],
                    "body": {
                      "type": "BlockStatement",
                      "start": 27,
                      "end": 29,
                      "body": []
                    }
                  }
                ],
                "sourceType": "script"
              });
        });
        
        it('should parse param array element without initializer', () => {
            expect(parseScript('function fn2([a, b,]) {}', {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 24,
                "body": [
                  {
                    "type": "FunctionDeclaration",
                    "start": 0,
                    "end": 24,
                    "id": {
                      "type": "Identifier",
                      "start": 9,
                      "end": 12,
                      "name": "fn2"
                    },
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [
                      {
                        "type": "ArrayPattern",
                        "start": 13,
                        "end": 20,
                        "elements": [
                          {
                            "type": "Identifier",
                            "start": 14,
                            "end": 15,
                            "name": "a"
                          },
                          {
                            "type": "Identifier",
                            "start": 17,
                            "end": 18,
                            "name": "b"
                          }
                        ]
                      }
                    ],
                    "body": {
                      "type": "BlockStatement",
                      "start": 22,
                      "end": 24,
                      "body": []
                    }
                  }
                ],
                "sourceType": "script"
              });
        });
        
        it('should parse param array wrapped', () => {
            expect(parseScript('(function x([ a, b ]){});', {
                ranges: false,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "FunctionExpression",
                        "id": {
                            "type": "Identifier",
                            "name": "x"
                        },
                        "params": [{
                            "type": "ArrayPattern",
                            "elements": [{
                                    "type": "Identifier",
                                    "name": "a"
                                },
                                {
                                    "type": "Identifier",
                                    "name": "b"
                                }
                            ]
                        }],
                        "body": {
                            "type": "BlockStatement",
                            "body": []
                        },
                        "generator": false,
                        "expression": false,
                        "async": false
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse param nested array', () => {
            expect(parseScript('function a([x, , [, z]]) {};', {
                ranges: false,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                        "type": "FunctionDeclaration",
                        "id": {
                            "type": "Identifier",
                            "name": "a"
                        },
                        "params": [{
                            "type": "ArrayPattern",
                            "elements": [{
                                    "type": "Identifier",
                                    "name": "x"
                                },
                                null,
                                {
                                    "type": "ArrayPattern",
                                    "elements": [
                                        null,
                                        {
                                            "type": "Identifier",
                                            "name": "z"
                                        }
                                    ]
                                }
                            ]
                        }],
                        "body": {
                            "type": "BlockStatement",
                            "body": []
                        },
                        "generator": false,
                        "expression": false,
                        "async": false
                    },
                    {
                        "type": "EmptyStatement"
                    }
                ],
                "sourceType": "script"
            });
        });
    
        it('should parse sparse array', () => {
            expect(parseScript('[a,,b] = array;', {
                ranges: false,
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
                                    "type": "Identifier",
                                    "name": "a"
                                },
                                null,
                                {
                                    "type": "Identifier",
                                    "name": "b"
                                }
                            ]
                        },
                        "right": {
                            "type": "Identifier",
                            "name": "array"
                        }
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse var array literal', () => {
            expect(parseScript('var [a, ...[b, c]] = d;', {
                ranges: false,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "VariableDeclaration",
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "ArrayPattern",
                            "elements": [{
                                    "type": "Identifier",
                                    "name": "a"
                                },
                                {
                                    "type": "RestElement",
                                    "argument": {
                                        "type": "ArrayPattern",
                                        "elements": [{
                                                "type": "Identifier",
                                                "name": "b"
                                            },
                                            {
                                                "type": "Identifier",
                                                "name": "c"
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        "init": {
                            "type": "Identifier",
                            "name": "d"
                        }
                    }],
                    "kind": "var"
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse param with rest and ellison', () => {
            expect(parseScript('function a([a, b, ...[ok]]) {};', {
                ranges: false,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                        "type": "FunctionDeclaration",
                        "id": {
                            "type": "Identifier",
                            "name": "a"
                        },
                        "params": [{
                            "type": "ArrayPattern",
                            "elements": [{
                                    "type": "Identifier",
                                    "name": "a"
                                },
                                {
                                    "type": "Identifier",
                                    "name": "b"
                                },
                                {
                                    "type": "RestElement",
                                    "argument": {
                                        "type": "ArrayPattern",
                                        "elements": [{
                                            "type": "Identifier",
                                            "name": "ok"
                                        }]
                                    }
                                }
                            ]
                        }],
                        "body": {
                            "type": "BlockStatement",
                            "body": []
                        },
                        "generator": false,
                        "expression": false,
                        "async": false
                    },
                    {
                        "type": "EmptyStatement"
                    }
                ],
                "sourceType": "script"
            });
        });
    
        it('should parse "[{a=0}, ...b] = 0"', () => {
            expect(parseScript('[{a=0}, ...b] = 0', {
                ranges: false,
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
                                                "type": "Literal",
                                                "value": 0,
                                                "raw": "0"
                                            }
                                        },
                                        "kind": "init",
                                        "method": false,
                                        "shorthand": true
                                    }]
                                },
                                {
                                    "type": "RestElement",
                                    "argument": {
                                        "type": "Identifier",
                                        "name": "b"
                                    }
                                }
                            ]
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
    
        it('should parse nested assignment', () => {
            expect(parseScript('[a,b=0,[c,...a[0]]={}]=0;', {
                ranges: false,
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
                                    "type": "Identifier",
                                    "name": "a"
                                },
                                {
                                    "type": "AssignmentPattern",
                                    "left": {
                                        "type": "Identifier",
                                        "name": "b"
                                    },
                                    "right": {
                                        "type": "Literal",
                                        "value": 0,
                                        "raw": "0"
                                    }
                                },
                                {
                                    "type": "AssignmentPattern",
                                    "left": {
                                        "type": "ArrayPattern",
                                        "elements": [{
                                                "type": "Identifier",
                                                "name": "c"
                                            },
                                            {
                                                "type": "RestElement",
                                                "argument": {
                                                    "type": "MemberExpression",
                                                    "computed": true,
                                                    "object": {
                                                        "type": "Identifier",
                                                        "name": "a"
                                                    },
                                                    "property": {
                                                        "type": "Literal",
                                                        "value": 0,
                                                        "raw": "0"
                                                    }
                                                }
                                            }
                                        ]
                                    },
                                    "right": {
                                        "type": "ObjectExpression",
                                        "properties": []
                                    }
                                }
                            ]
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
    
        it('should parse nested cover grammar', () => {
            expect(parseScript('[{a=b}=0]', {
                ranges: false,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "ArrayExpression",
                        "elements": [{
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
                                        "type": "AssignmentPattern",
                                        "left": {
                                            "type": "Identifier",
                                            "name": "a"
                                        },
                                        "right": {
                                            "type": "Identifier",
                                            "name": "b"
                                        }
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": true
                                }]
                            },
                            "right": {
                                "type": "Literal",
                                "value": 0,
                                "raw": "0"
                            }
                        }]
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse ellison', () => {
            expect(parseScript('[,,]=0', {
                ranges: false,
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
                            "elements": [
                                null,
                                null
                            ]
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
    
        it('should parse dup assignment', () => {
            expect(parseScript('[a,a,,...a]=0;', {
                ranges: false,
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
                                    "type": "Identifier",
                                    "name": "a"
                                },
                                {
                                    "type": "Identifier",
                                    "name": "a"
                                },
                                null,
                                {
                                    "type": "RestElement",
                                    "argument": {
                                        "type": "Identifier",
                                        "name": "a"
                                    }
                                }
                            ]
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
    
    
    
    
        it('should parse "({n: obj.x} = {n:3});"', () => {
            expect(parseScript('({n: obj.x} = {n:3});', {
                ranges: false,
                raw: true
            })).to.eql({
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
                                    "name": "n"
                                },
                                "computed": false,
                                "value": {
                                    "type": "MemberExpression",
                                    "computed": false,
                                    "object": {
                                        "type": "Identifier",
                                        "name": "obj"
                                    },
                                    "property": {
                                        "type": "Identifier",
                                        "name": "x"
                                    }
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false
                            }]
                        },
                        "right": {
                            "type": "ObjectExpression",
                            "properties": [{
                                "type": "Property",
                                "key": {
                                    "type": "Identifier",
                                    "name": "n"
                                },
                                "computed": false,
                                "value": {
                                    "type": "Literal",
                                    "value": 3,
                                    "raw": "3"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false
                            }]
                        }
                    }
                }],
                "sourceType": "script"
            });
        });
    
    
        it('should parse "[obj.x] = ["foo"];"', () => {
            expect(parseScript('[obj.x] = ["foo"];', {
                ranges: false,
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
                                "type": "MemberExpression",
                                "computed": false,
                                "object": {
                                    "type": "Identifier",
                                    "name": "obj"
                                },
                                "property": {
                                    "type": "Identifier",
                                    "name": "x"
                                }
                            }]
                        },
                        "right": {
                            "type": "ArrayExpression",
                            "elements": [{
                                "type": "Literal",
                                "value": "foo",
                                "raw": "\"foo\""
                            }]
                        }
                    }
                }],
                "sourceType": "script"
            });
        });
    
        it('should parse "[a,,b,...c] = [0,1,true,3];"', () => {
            expect(parseScript('[a,,b,...c] = [0,1,true,3];', {
                ranges: false,
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
                                    "type": "Identifier",
                                    "name": "a"
                                },
                                null,
                                {
                                    "type": "Identifier",
                                    "name": "b"
                                },
                                {
                                    "type": "RestElement",
                                    "argument": {
                                        "type": "Identifier",
                                        "name": "c"
                                    }
                                }
                            ]
                        },
                        "right": {
                            "type": "ArrayExpression",
                            "elements": [{
                                    "type": "Literal",
                                    "value": 0,
                                    "raw": "0"
                                },
                                {
                                    "type": "Literal",
                                    "value": 1,
                                    "raw": "1"
                                },
                                {
                                    "type": "Literal",
                                    "value": true,
                                    "raw": "true"
                                },
                                {
                                    "type": "Literal",
                                    "value": 3,
                                    "raw": "3"
                                }
                            ]
                        }
                    }
                }],
                "sourceType": "script"
            });
        });

        it.skip('should parse with string literals"', () => {
            expect(parseScript('result = { __proto__: x, __proto__: y } = value;', {
                ranges: false,
                raw: true
            })).to.eql({
                  "body": [
                    {
                      "expression": {
                        "left": {
                          "name": "result",
                          "type": "Identifier"
                        },
                        "operator": "=",
                        "right": {
                          "left": {
                            "properties": [
                              {
                                "computed": false,
                                "key": {
                                  "name": "__proto__",
                                 "type": "Identifier",
                                },
                                "kind": "init",
                                "method": false,
                               "shorthand": false,
                                "type": "Property",
                                "value": {
                                  "name": "x",
                                  "type": "Identifier"
                                }
                              },
                              {
                                "computed": false,
                                "key": {
                                 "name": "__proto__",
                                  "type": "Identifier"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false,
                                "type": "Property",
                                "value": {
                                  "name": "y",
                                  "type": "Identifier"
                               }
                              }
                            ],
                            "type": "ObjectPattern"
                         },
                          "operator": "=",
                          "right": {
                            "name": "value",
                            "type": "Identifier"
                          },
                          "type": "AssignmentExpression"
                        },
                        "type": "AssignmentExpression"
                      },
                      "type": "ExpressionStatement"
                    }
                  ],
                  "sourceType": "script",
                  "type": "Program"
                });
        });

       it('should parse complex"', () => {
            expect(parseScript('result = [...{ 0: x, length }] = [null];', {
                ranges: false,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "AssignmentExpression",
                            "operator": "=",
                            "left": {
                                "type": "Identifier",
                                "name": "result"
                            },
                            "right": {
                                "type": "AssignmentExpression",
                                "operator": "=",
                                "left": {
                                    "type": "ArrayPattern",
                                    "elements": [
                                        {
                                            "type": "RestElement",
                                            "argument": {
                                                "type": "ObjectPattern",
                                                "properties": [
                                                    {
                                                        "type": "Property",
                                                        "key": {
                                                            "type": "Literal",
                                                            "value": 0,
                                                            "raw": "0"
                                                        },
                                                        "computed": false,
                                                        "value": {
                                                            "type": "Identifier",
                                                            "name": "x"
                                                        },
                                                        "kind": "init",
                                                        "method": false,
                                                        "shorthand": false
                                                    },
                                                    {
                                                        "type": "Property",
                                                        "key": {
                                                            "type": "Identifier",
                                                            "name": "length"
                                                        },
                                                        "computed": false,
                                                        "value": {
                                                            "type": "Identifier",
                                                            "name": "length"
                                                        },
                                                        "kind": "init",
                                                        "method": false,
                                                        "shorthand": true
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                },
                                "right": {
                                    "type": "ArrayExpression",
                                    "elements": [
                                        {
                                            "type": "Literal",
                                            "value": null,
                                            "raw": "null"
                                        }
                                    ]
                                }
                            }
                        }
                    }
                ],
                "sourceType": "script"
            });
        });

        it('should parse array rest nested object undefined hole', () => {
            expect(parseScript('result = [...{ 0: x, length }] = [ , ];', {
                ranges: false,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "AssignmentExpression",
                            "operator": "=",
                            "left": {
                                "type": "Identifier",
                                "name": "result"
                            },
                            "right": {
                                "type": "AssignmentExpression",
                                "operator": "=",
                                "left": {
                                    "type": "ArrayPattern",
                                    "elements": [
                                        {
                                            "type": "RestElement",
                                            "argument": {
                                                "type": "ObjectPattern",
                                                "properties": [
                                                    {
                                                        "type": "Property",
                                                        "key": {
                                                            "type": "Literal",
                                                            "value": 0,
                                                            "raw": "0"
                                                        },
                                                        "computed": false,
                                                        "value": {
                                                            "type": "Identifier",
                                                            "name": "x"
                                                        },
                                                        "kind": "init",
                                                        "method": false,
                                                        "shorthand": false
                                                    },
                                                    {
                                                        "type": "Property",
                                                        "key": {
                                                            "type": "Identifier",
                                                            "name": "length"
                                                        },
                                                        "computed": false,
                                                        "value": {
                                                            "type": "Identifier",
                                                            "name": "length"
                                                        },
                                                        "kind": "init",
                                                        "method": false,
                                                        "shorthand": true
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                },
                                "right": {
                                    "type": "ArrayExpression",
                                    "elements": [
                                        null
                                    ]
                                }
                            }
                        }
                    }
                ],
                "sourceType": "script"
            });
        });

        it('should parse array rest nested object undefined', () => {
            expect(parseScript('result = [...{ 0: x, length }] = [undefined];', {
                ranges: false,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "AssignmentExpression",
                            "operator": "=",
                            "left": {
                                "type": "Identifier",
                                "name": "result"
                            },
                            "right": {
                                "type": "AssignmentExpression",
                                "operator": "=",
                                "left": {
                                    "type": "ArrayPattern",
                                    "elements": [
                                        {
                                            "type": "RestElement",
                                            "argument": {
                                                "type": "ObjectPattern",
                                                "properties": [
                                                    {
                                                        "type": "Property",
                                                        "key": {
                                                            "type": "Literal",
                                                            "value": 0,
                                                            "raw": "0"
                                                        },
                                                        "computed": false,
                                                        "value": {
                                                            "type": "Identifier",
                                                            "name": "x"
                                                        },
                                                        "kind": "init",
                                                        "method": false,
                                                        "shorthand": false
                                                    },
                                                    {
                                                        "type": "Property",
                                                        "key": {
                                                            "type": "Identifier",
                                                            "name": "length"
                                                        },
                                                        "computed": false,
                                                        "value": {
                                                            "type": "Identifier",
                                                            "name": "length"
                                                        },
                                                        "kind": "init",
                                                        "method": false,
                                                        "shorthand": true
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                },
                                "right": {
                                    "type": "ArrayExpression",
                                    "elements": [
                                        {
                                            "type": "Identifier",
                                            "name": "undefined"
                                        }
                                    ]
                                }
                            }
                        }
                    }
                ],
                "sourceType": "script"
            });
        });

        it('should parse array rest nested object yield', () => {
            expect(parseScript('result = [...{ x = yield }] = [{}];', {
                ranges: false,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "AssignmentExpression",
                            "operator": "=",
                            "left": {
                                "type": "Identifier",
                                "name": "result"
                            },
                            "right": {
                                "type": "AssignmentExpression",
                                "operator": "=",
                                "left": {
                                    "type": "ArrayPattern",
                                    "elements": [
                                        {
                                            "type": "RestElement",
                                            "argument": {
                                                "type": "ObjectPattern",
                                                "properties": [
                                                    {
                                                        "type": "Property",
                                                        "key": {
                                                            "type": "Identifier",
                                                            "name": "x"
                                                        },
                                                        "computed": false,
                                                        "value": {
                                                            "type": "AssignmentPattern",
                                                            "left": {
                                                                "type": "Identifier",
                                                                "name": "x"
                                                            },
                                                            "right": {
                                                                "type": "Identifier",
                                                                "name": "yield"
                                                            }
                                                        },
                                                        "kind": "init",
                                                        "method": false,
                                                        "shorthand": true
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                },
                                "right": {
                                    "type": "ArrayExpression",
                                    "elements": [
                                        {
                                            "type": "ObjectExpression",
                                            "properties": []
                                        }
                                    ]
                                }
                            }
                        }
                    }
                ],
                "sourceType": "script"
            });
        });

        it('should parse array rest nested object', () => {
            expect(parseScript('result = [...{ 1: x }] = [1, 2, 3];', {
                ranges: false,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "AssignmentExpression",
                            "operator": "=",
                            "left": {
                                "type": "Identifier",
                                "name": "result"
                            },
                            "right": {
                                "type": "AssignmentExpression",
                                "operator": "=",
                                "left": {
                                    "type": "ArrayPattern",
                                    "elements": [
                                        {
                                            "type": "RestElement",
                                            "argument": {
                                                "type": "ObjectPattern",
                                                "properties": [
                                                    {
                                                        "type": "Property",
                                                        "key": {
                                                            "type": "Literal",
                                                            "value": 1,
                                                            "raw": "1"
                                                        },
                                                        "computed": false,
                                                        "value": {
                                                            "type": "Identifier",
                                                            "name": "x"
                                                        },
                                                        "kind": "init",
                                                        "method": false,
                                                        "shorthand": false
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                },
                                "right": {
                                    "type": "ArrayExpression",
                                    "elements": [
                                        {
                                            "type": "Literal",
                                            "value": 1,
                                            "raw": "1"
                                        },
                                        {
                                            "type": "Literal",
                                            "value": 2,
                                            "raw": "2"
                                        },
                                        {
                                            "type": "Literal",
                                            "value": 3,
                                            "raw": "3"
                                        }
                                    ]
                                }
                            }
                        }
                    }
                ],
                "sourceType": "script"
            });
        });

        it('should parse with string literals"', () => {
            expect(parseScript('result = { yield } = { yield: 3 };', {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 34,
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 0,
                    "end": 34,
                    "expression": {
                      "type": "AssignmentExpression",
                      "start": 0,
                      "end": 33,
                      "operator": "=",
                      "left": {
                        "type": "Identifier",
                        "start": 0,
                        "end": 6,
                        "name": "result"
                      },
                      "right": {
                        "type": "AssignmentExpression",
                        "start": 9,
                        "end": 33,
                        "operator": "=",
                        "left": {
                          "type": "ObjectPattern",
                          "start": 9,
                          "end": 18,
                          "properties": [
                            {
                              "type": "Property",
                              "start": 11,
                              "end": 16,
                              "method": false,
                              "shorthand": true,
                              "computed": false,
                              "key": {
                                "type": "Identifier",
                                "start": 11,
                                "end": 16,
                                "name": "yield"
                              },
                              "kind": "init",
                              "value": {
                                "type": "Identifier",
                                "start": 11,
                                "end": 16,
                                "name": "yield"
                              }
                            }
                          ]
                        },
                        "right": {
                          "type": "ObjectExpression",
                          "start": 21,
                          "end": 33,
                          "properties": [
                            {
                              "type": "Property",
                              "start": 23,
                              "end": 31,
                              "method": false,
                              "shorthand": false,
                              "computed": false,
                              "key": {
                                "type": "Identifier",
                                "start": 23,
                                "end": 28,
                                "name": "yield"
                              },
                              "value": {
                                "type": "Literal",
                                "start": 30,
                                "end": 31,
                                "value": 3,
                                "raw": "3"
                              },
                              "kind": "init"
                            }
                          ]
                        }
                      }
                    }
                  }
                ],
                "sourceType": "script"
              });
        });
    
        it('should parse with string literals"', () => {
            expect(parseScript('var { "with-dash": with_dash } = { "with-dash": "motivating example" };', {
                ranges: false,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "VariableDeclaration",
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "ObjectPattern",
                            "properties": [{
                                "type": "Property",
                                "key": {
                                    "type": "Literal",
                                    "value": "with-dash",
                                    "raw": "\"with-dash\""
                                },
                                "computed": false,
                                "value": {
                                    "type": "Identifier",
                                    "name": "with_dash"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false
                            }]
                        },
                        "init": {
                            "type": "ObjectExpression",
                            "properties": [{
                                "type": "Property",
                                "key": {
                                    "type": "Literal",
                                    "value": "with-dash",
                                    "raw": "\"with-dash\""
                                },
                                "computed": false,
                                "value": {
                                    "type": "Literal",
                                    "value": "motivating example",
                                    "raw": "\"motivating example\""
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false
                            }]
                        }
                    }],
                    "kind": "var"
                }],
                "sourceType": "script"
            });
        });
        it('should parse variable literals', () => {
            expect(parseScript('var { "key": val } = { key: "val" };', {
                ranges: false,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "VariableDeclaration",
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "ObjectPattern",
                            "properties": [{
                                "type": "Property",
                                "key": {
                                    "type": "Literal",
                                    "value": "key",
                                    "raw": "\"key\""
                                },
                                "computed": false,
                                "value": {
                                    "type": "Identifier",
                                    "name": "val"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false
                            }]
                        },
                        "init": {
                            "type": "ObjectExpression",
                            "properties": [{
                                "type": "Property",
                                "key": {
                                    "type": "Identifier",
                                    "name": "key"
                                },
                                "computed": false,
                                "value": {
                                    "type": "Literal",
                                    "value": "val",
                                    "raw": "\"val\""
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false
                            }]
                        }
                    }],
                    "kind": "var"
                }],
                "sourceType": "script"
            });
        });
    

        describe('Object binding pattern with binding elements', () => {

            it.skip('should parse array binding pattern with no elements', () => {
                expect(parseScript('function fnb({x: y = 42}) {}', {
                    ranges: true,
                    raw: true
                })).to.eql({
  "type": "Program",
  "start": 0,
  "end": 28,
  "body": [
    {
      "type": "FunctionDeclaration",
      "start": 0,
      "end": 28,
      "id": {
        "type": "Identifier",
        "start": 9,
        "end": 12,
        "name": "fnb"
      },
      "generator": false,
      "expression": false,
      "async": false,
      "params": [
        {
          "type": "ObjectPattern",
          "start": 13,
          "end": 24,
          "properties": [
            {
              "type": "Property",
              "start": 14,
              "end": 23,
              "method": false,
              "shorthand": false,
              "computed": false,
              "key": {
                "type": "Identifier",
                "start": 14,
                "end": 15,
                "name": "x"
              },
              "value": {
                "type": "AssignmentPattern",
                "start": 17,
                "end": 23,
                "left": {
                  "type": "Identifier",
                  "start": 17,
                  "end": 18,
                  "name": "y"
                },
                "right": {
                  "type": "Literal",
                  "start": 21,
                  "end": 23,
                  "value": 42,
                  "raw": "42"
                }
              },
              "kind": "init"
            }
          ]
        }
      ],
      "body": {
        "type": "BlockStatement",
        "start": 26,
        "end": 28,
        "body": []
      }
    }
  ],
  "sourceType": "script"
});
            });

            it('should parse array binding pattern with no elements', () => {
                expect(parseScript('function fnd({x: {y}}) {}', {
                    ranges: true,
                    raw: true
                })).to.eql({
                    "type": "Program",
                    "start": 0,
                    "end": 25,
                    "body": [
                      {
                        "type": "FunctionDeclaration",
                        "start": 0,
                        "end": 25,
                        "id": {
                          "type": "Identifier",
                          "start": 9,
                          "end": 12,
                          "name": "fnd"
                        },
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [
                          {
                            "type": "ObjectPattern",
                            "start": 13,
                            "end": 21,
                            "properties": [
                              {
                                "type": "Property",
                                "start": 14,
                                "end": 20,
                                "method": false,
                                "shorthand": false,
                                "computed": false,
                                "key": {
                                  "type": "Identifier",
                                  "start": 14,
                                  "end": 15,
                                  "name": "x"
                                },
                                "value": {
                                  "type": "ObjectPattern",
                                  "start": 17,
                                  "end": 20,
                                  "properties": [
                                    {
                                      "type": "Property",
                                      "start": 18,
                                      "end": 19,
                                      "method": false,
                                      "shorthand": true,
                                      "computed": false,
                                      "key": {
                                        "type": "Identifier",
                                        "start": 18,
                                        "end": 19,
                                        "name": "y"
                                      },
                                      "kind": "init",
                                      "value": {
                                        "type": "Identifier",
                                        "start": 18,
                                        "end": 19,
                                        "name": "y"
                                      }
                                    }
                                  ]
                                },
                                "kind": "init"
                              }
                            ]
                          }
                        ],
                        "body": {
                          "type": "BlockStatement",
                          "start": 23,
                          "end": 25,
                          "body": []
                        }
                      }
                    ],
                    "sourceType": "script"
                  });
            });

            it.skip('should parse array binding pattern with no elements', () => {
                expect(parseScript('function fne({x: {} = 42}) {}', {
                    ranges: true,
                    raw: true
                })).to.eql({
                    "type": "Program",
                    "start": 0,
                    "end": 29,
                    "body": [
                      {
                        "type": "FunctionDeclaration",
                        "start": 0,
                        "end": 29,
                        "id": {
                          "type": "Identifier",
                          "start": 9,
                          "end": 12,
                          "name": "fne"
                        },
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [
                          {
                            "type": "ObjectPattern",
                            "start": 13,
                            "end": 25,
                            "properties": [
                              {
                                "type": "Property",
                                "start": 14,
                                "end": 24,
                                "method": false,
                                "shorthand": false,
                                "computed": false,
                                "key": {
                                  "type": "Identifier",
                                  "start": 14,
                                  "end": 15,
                                  "name": "x"
                                },
                                "value": {
                                  "type": "AssignmentPattern",
                                  "start": 17,
                                  "end": 24,
                                  "left": {
                                    "type": "ObjectPattern",
                                    "start": 17,
                                    "end": 19,
                                    "properties": []
                                  },
                                  "right": {
                                    "type": "Literal",
                                    "start": 22,
                                    "end": 24,
                                    "value": 42,
                                    "raw": "42"
                                  }
                                },
                                "kind": "init"
                              }
                            ]
                          }
                        ],
                        "body": {
                          "type": "BlockStatement",
                          "start": 27,
                          "end": 29,
                          "body": []
                        }
                      }
                    ],
                    "sourceType": "script"
                  });
            });

            it.skip('should parse array binding pattern with no elements', () => {
                expect(parseScript('function fnf({x: {y} = 42}) {}', {
                    ranges: true,
                    raw: true
                })).to.eql({
                    "type": "Program",
                    "start": 0,
                    "end": 30,
                    "body": [
                      {
                        "type": "FunctionDeclaration",
                        "start": 0,
                        "end": 30,
                        "id": {
                          "type": "Identifier",
                          "start": 9,
                          "end": 12,
                          "name": "fnf"
                        },
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [
                          {
                            "type": "ObjectPattern",
                            "start": 13,
                            "end": 26,
                            "properties": [
                              {
                                "type": "Property",
                                "start": 14,
                                "end": 25,
                                "method": false,
                                "shorthand": false,
                                "computed": false,
                                "key": {
                                  "type": "Identifier",
                                  "start": 14,
                                  "end": 15,
                                  "name": "x"
                                },
                                "value": {
                                  "type": "AssignmentPattern",
                                  "start": 17,
                                  "end": 25,
                                  "left": {
                                    "type": "ObjectPattern",
                                    "start": 17,
                                    "end": 20,
                                    "properties": [
                                      {
                                        "type": "Property",
                                        "start": 18,
                                        "end": 19,
                                        "method": false,
                                        "shorthand": true,
                                        "computed": false,
                                        "key": {
                                          "type": "Identifier",
                                          "start": 18,
                                          "end": 19,
                                          "name": "y"
                                        },
                                        "kind": "init",
                                        "value": {
                                          "type": "Identifier",
                                          "start": 18,
                                          "end": 19,
                                          "name": "y"
                                        }
                                      }
                                    ]
                                  },
                                  "right": {
                                    "type": "Literal",
                                    "start": 23,
                                    "end": 25,
                                    "value": 42,
                                    "raw": "42"
                                  }
                                },
                                "kind": "init"
                              }
                            ]
                          }
                        ],
                        "body": {
                          "type": "BlockStatement",
                          "start": 28,
                          "end": 30,
                          "body": []
                        }
                      }
                    ],
                    "sourceType": "script"
                  });
            });
    });
    });