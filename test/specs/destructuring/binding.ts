import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';
const expect = chai.expect;
   
describe('Binding', () => {

    it('should parse array binding pattern with an element list with initializers', () => {
        expect(parseScript(`function fn1([a, b = 42]) {}
        
        function fn2([a = 42, b,]) {}
        
        function fn3([a,, b = a, c = 42]) {}`, {
            raw: true,
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 129,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 28,
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
                    "type": "ArrayPattern",
                    "start": 13,
                    "end": 24,
                    "elements": [
                      {
                        "type": "Identifier",
                        "start": 14,
                        "end": 15,
                        "name": "a"
                      },
                      {
                        "type": "AssignmentPattern",
                        "start": 17,
                        "end": 23,
                        "left": {
                          "type": "Identifier",
                          "start": 17,
                          "end": 18,
                          "name": "b"
                        },
                        "right": {
                          "type": "Literal",
                          "start": 21,
                          "end": 23,
                          "value": 42,
                          "raw": "42"
                        }
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
              },
              {
                "type": "FunctionDeclaration",
                "start": 46,
                "end": 75,
                "id": {
                  "type": "Identifier",
                  "start": 55,
                  "end": 58,
                  "name": "fn2"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [
                  {
                    "type": "ArrayPattern",
                    "start": 59,
                    "end": 71,
                    "elements": [
                      {
                        "type": "AssignmentPattern",
                        "start": 60,
                        "end": 66,
                        "left": {
                          "type": "Identifier",
                          "start": 60,
                          "end": 61,
                          "name": "a"
                        },
                        "right": {
                          "type": "Literal",
                          "start": 64,
                          "end": 66,
                          "value": 42,
                          "raw": "42"
                        }
                      },
                      {
                        "type": "Identifier",
                        "start": 68,
                        "end": 69,
                        "name": "b"
                      }
                    ]
                  }
                ],
                "body": {
                  "type": "BlockStatement",
                  "start": 73,
                  "end": 75,
                  "body": []
                }
              },
              {
                "type": "FunctionDeclaration",
                "start": 93,
                "end": 129,
                "id": {
                  "type": "Identifier",
                  "start": 102,
                  "end": 105,
                  "name": "fn3"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [
                  {
                    "type": "ArrayPattern",
                    "start": 106,
                    "end": 125,
                    "elements": [
                      {
                        "type": "Identifier",
                        "start": 107,
                        "end": 108,
                        "name": "a"
                      },
                      null,
                      {
                        "type": "AssignmentPattern",
                        "start": 111,
                        "end": 116,
                        "left": {
                          "type": "Identifier",
                          "start": 111,
                          "end": 112,
                          "name": "b"
                        },
                        "right": {
                          "type": "Identifier",
                          "start": 115,
                          "end": 116,
                          "name": "a"
                        }
                      },
                      {
                        "type": "AssignmentPattern",
                        "start": 118,
                        "end": 124,
                        "left": {
                          "type": "Identifier",
                          "start": 118,
                          "end": 119,
                          "name": "c"
                        },
                        "right": {
                          "type": "Literal",
                          "start": 122,
                          "end": 124,
                          "value": 42,
                          "raw": "42"
                        }
                      }
                    ]
                  }
                ],
                "body": {
                  "type": "BlockStatement",
                  "start": 127,
                  "end": 129,
                  "body": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse array binding pattern with object pattern on the element list', () => {
        expect(parseScript(`function fn1([{}]) {}
        
        function fn2([{} = 42]) {}
        
        function fn3([a, {b: c}]) {}
        
        function fn4([a, {b: []}]) {}`, {
            raw: true,
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 158,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 21,
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
                    "type": "ArrayPattern",
                    "start": 13,
                    "end": 17,
                    "elements": [
                      {
                        "type": "ObjectPattern",
                        "start": 14,
                        "end": 16,
                        "properties": []
                      }
                    ]
                  }
                ],
                "body": {
                  "type": "BlockStatement",
                  "start": 19,
                  "end": 21,
                  "body": []
                }
              },
              {
                "type": "FunctionDeclaration",
                "start": 39,
                "end": 65,
                "id": {
                  "type": "Identifier",
                  "start": 48,
                  "end": 51,
                  "name": "fn2"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [
                  {
                    "type": "ArrayPattern",
                    "start": 52,
                    "end": 61,
                    "elements": [
                      {
                        "type": "AssignmentPattern",
                        "start": 53,
                        "end": 60,
                        "left": {
                          "type": "ObjectPattern",
                          "start": 53,
                          "end": 55,
                          "properties": []
                        },
                        "right": {
                          "type": "Literal",
                          "start": 58,
                          "end": 60,
                          "value": 42,
                          "raw": "42"
                        }
                      }
                    ]
                  }
                ],
                "body": {
                  "type": "BlockStatement",
                  "start": 63,
                  "end": 65,
                  "body": []
                }
              },
              {
                "type": "FunctionDeclaration",
                "start": 83,
                "end": 111,
                "id": {
                  "type": "Identifier",
                  "start": 92,
                  "end": 95,
                  "name": "fn3"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [
                  {
                    "type": "ArrayPattern",
                    "start": 96,
                    "end": 107,
                    "elements": [
                      {
                        "type": "Identifier",
                        "start": 97,
                        "end": 98,
                        "name": "a"
                      },
                      {
                        "type": "ObjectPattern",
                        "start": 100,
                        "end": 106,
                        "properties": [
                          {
                            "type": "Property",
                            "start": 101,
                            "end": 105,
                            "method": false,
                            "shorthand": false,
                            "computed": false,
                            "key": {
                              "type": "Identifier",
                              "start": 101,
                              "end": 102,
                              "name": "b"
                            },
                            "value": {
                              "type": "Identifier",
                              "start": 104,
                              "end": 105,
                              "name": "c"
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
                  "start": 109,
                  "end": 111,
                  "body": []
                }
              },
              {
                "type": "FunctionDeclaration",
                "start": 129,
                "end": 158,
                "id": {
                  "type": "Identifier",
                  "start": 138,
                  "end": 141,
                  "name": "fn4"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [
                  {
                    "type": "ArrayPattern",
                    "start": 142,
                    "end": 154,
                    "elements": [
                      {
                        "type": "Identifier",
                        "start": 143,
                        "end": 144,
                        "name": "a"
                      },
                      {
                        "type": "ObjectPattern",
                        "start": 146,
                        "end": 153,
                        "properties": [
                          {
                            "type": "Property",
                            "start": 147,
                            "end": 152,
                            "method": false,
                            "shorthand": false,
                            "computed": false,
                            "key": {
                              "type": "Identifier",
                              "start": 147,
                              "end": 148,
                              "name": "b"
                            },
                            "value": {
                              "type": "ArrayPattern",
                              "start": 150,
                              "end": 152,
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
                  "start": 156,
                  "end": 158,
                  "body": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse array binding pattern with an element list without initializers', () => {
        expect(parseScript(`function fn1([a, b]) {}
        
        function fn2([a, b,]) {}
        
        function fn3([a,, b,]) {}`, {
            raw: true,
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 108,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 23,
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
                    "type": "ArrayPattern",
                    "start": 13,
                    "end": 19,
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
                  "start": 21,
                  "end": 23,
                  "body": []
                }
              },
              {
                "type": "FunctionDeclaration",
                "start": 41,
                "end": 65,
                "id": {
                  "type": "Identifier",
                  "start": 50,
                  "end": 53,
                  "name": "fn2"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [
                  {
                    "type": "ArrayPattern",
                    "start": 54,
                    "end": 61,
                    "elements": [
                      {
                        "type": "Identifier",
                        "start": 55,
                        "end": 56,
                        "name": "a"
                      },
                      {
                        "type": "Identifier",
                        "start": 58,
                        "end": 59,
                        "name": "b"
                      }
                    ]
                  }
                ],
                "body": {
                  "type": "BlockStatement",
                  "start": 63,
                  "end": 65,
                  "body": []
                }
              },
              {
                "type": "FunctionDeclaration",
                "start": 83,
                "end": 108,
                "id": {
                  "type": "Identifier",
                  "start": 92,
                  "end": 95,
                  "name": "fn3"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [
                  {
                    "type": "ArrayPattern",
                    "start": 96,
                    "end": 104,
                    "elements": [
                      {
                        "type": "Identifier",
                        "start": 97,
                        "end": 98,
                        "name": "a"
                      },
                      null,
                      {
                        "type": "Identifier",
                        "start": 101,
                        "end": 102,
                        "name": "b"
                      }
                    ]
                  }
                ],
                "body": {
                  "type": "BlockStatement",
                  "start": 106,
                  "end": 108,
                  "body": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse array binding pattern with ellison', () => {
        expect(parseScript(`function fn1([,]) {}
        function fn2([,,]) {}`, {
            raw: true,
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 50,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 20,
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
                    "type": "ArrayPattern",
                    "start": 13,
                    "end": 16,
                    "elements": [
                      null
                    ]
                  }
                ],
                "body": {
                  "type": "BlockStatement",
                  "start": 18,
                  "end": 20,
                  "body": []
                }
              },
              {
                "type": "FunctionDeclaration",
                "start": 29,
                "end": 50,
                "id": {
                  "type": "Identifier",
                  "start": 38,
                  "end": 41,
                  "name": "fn2"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [
                  {
                    "type": "ArrayPattern",
                    "start": 42,
                    "end": 46,
                    "elements": [
                      null,
                      null
                    ]
                  }
                ],
                "body": {
                  "type": "BlockStatement",
                  "start": 48,
                  "end": 50,
                  "body": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse array binding pattern with rest element', () => {
        expect(parseScript(`function fn1([...args]) {}
        
        function fn2([,,,,,,,...args]) {}
        
        function fn3([x, {y}, ...z]) {}
        
        function fn4([,x, {y}, , ...z]) {}
        
        function fn5({x: [...y]}) {}`, {
            raw: true,
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 224,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 26,
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
                    "type": "ArrayPattern",
                    "start": 13,
                    "end": 22,
                    "elements": [
                      {
                        "type": "RestElement",
                        "start": 14,
                        "end": 21,
                        "argument": {
                          "type": "Identifier",
                          "start": 17,
                          "end": 21,
                          "name": "args"
                        }
                      }
                    ]
                  }
                ],
                "body": {
                  "type": "BlockStatement",
                  "start": 24,
                  "end": 26,
                  "body": []
                }
              },
              {
                "type": "FunctionDeclaration",
                "start": 44,
                "end": 77,
                "id": {
                  "type": "Identifier",
                  "start": 53,
                  "end": 56,
                  "name": "fn2"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [
                  {
                    "type": "ArrayPattern",
                    "start": 57,
                    "end": 73,
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
                        "start": 65,
                        "end": 72,
                        "argument": {
                          "type": "Identifier",
                          "start": 68,
                          "end": 72,
                          "name": "args"
                        }
                      }
                    ]
                  }
                ],
                "body": {
                  "type": "BlockStatement",
                  "start": 75,
                  "end": 77,
                  "body": []
                }
              },
              {
                "type": "FunctionDeclaration",
                "start": 95,
                "end": 126,
                "id": {
                  "type": "Identifier",
                  "start": 104,
                  "end": 107,
                  "name": "fn3"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [
                  {
                    "type": "ArrayPattern",
                    "start": 108,
                    "end": 122,
                    "elements": [
                      {
                        "type": "Identifier",
                        "start": 109,
                        "end": 110,
                        "name": "x"
                      },
                      {
                        "type": "ObjectPattern",
                        "start": 112,
                        "end": 115,
                        "properties": [
                          {
                            "type": "Property",
                            "start": 113,
                            "end": 114,
                            "method": false,
                            "shorthand": true,
                            "computed": false,
                            "key": {
                              "type": "Identifier",
                              "start": 113,
                              "end": 114,
                              "name": "y"
                            },
                            "kind": "init",
                            "value": {
                              "type": "Identifier",
                              "start": 113,
                              "end": 114,
                              "name": "y"
                            }
                          }
                        ]
                      },
                      {
                        "type": "RestElement",
                        "start": 117,
                        "end": 121,
                        "argument": {
                          "type": "Identifier",
                          "start": 120,
                          "end": 121,
                          "name": "z"
                        }
                      }
                    ]
                  }
                ],
                "body": {
                  "type": "BlockStatement",
                  "start": 124,
                  "end": 126,
                  "body": []
                }
              },
              {
                "type": "FunctionDeclaration",
                "start": 144,
                "end": 178,
                "id": {
                  "type": "Identifier",
                  "start": 153,
                  "end": 156,
                  "name": "fn4"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [
                  {
                    "type": "ArrayPattern",
                    "start": 157,
                    "end": 174,
                    "elements": [
                      null,
                      {
                        "type": "Identifier",
                        "start": 159,
                        "end": 160,
                        "name": "x"
                      },
                      {
                        "type": "ObjectPattern",
                        "start": 162,
                        "end": 165,
                        "properties": [
                          {
                            "type": "Property",
                            "start": 163,
                            "end": 164,
                            "method": false,
                            "shorthand": true,
                            "computed": false,
                            "key": {
                              "type": "Identifier",
                              "start": 163,
                              "end": 164,
                              "name": "y"
                            },
                            "kind": "init",
                            "value": {
                              "type": "Identifier",
                              "start": 163,
                              "end": 164,
                              "name": "y"
                            }
                          }
                        ]
                      },
                      null,
                      {
                        "type": "RestElement",
                        "start": 169,
                        "end": 173,
                        "argument": {
                          "type": "Identifier",
                          "start": 172,
                          "end": 173,
                          "name": "z"
                        }
                      }
                    ]
                  }
                ],
                "body": {
                  "type": "BlockStatement",
                  "start": 176,
                  "end": 178,
                  "body": []
                }
              },
              {
                "type": "FunctionDeclaration",
                "start": 196,
                "end": 224,
                "id": {
                  "type": "Identifier",
                  "start": 205,
                  "end": 208,
                  "name": "fn5"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [
                  {
                    "type": "ObjectPattern",
                    "start": 209,
                    "end": 220,
                    "properties": [
                      {
                        "type": "Property",
                        "start": 210,
                        "end": 219,
                        "method": false,
                        "shorthand": false,
                        "computed": false,
                        "key": {
                          "type": "Identifier",
                          "start": 210,
                          "end": 211,
                          "name": "x"
                        },
                        "value": {
                          "type": "ArrayPattern",
                          "start": 213,
                          "end": 219,
                          "elements": [
                            {
                              "type": "RestElement",
                              "start": 214,
                              "end": 218,
                              "argument": {
                                "type": "Identifier",
                                "start": 217,
                                "end": 218,
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
                  "start": 222,
                  "end": 224,
                  "body": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse binding property list followed by a single comma', () => {
        expect(parseScript(`function fn1({x,}) {}
        
        function fn2({a: {p: q, }, }) {}
        
        function fn3({x,}) {}`, {
            raw: true,
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 110,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 21,
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
                    "end": 17,
                    "properties": [
                      {
                        "type": "Property",
                        "start": 14,
                        "end": 15,
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
                          "type": "Identifier",
                          "start": 14,
                          "end": 15,
                          "name": "x"
                        }
                      }
                    ]
                  }
                ],
                "body": {
                  "type": "BlockStatement",
                  "start": 19,
                  "end": 21,
                  "body": []
                }
              },
              {
                "type": "FunctionDeclaration",
                "start": 39,
                "end": 71,
                "id": {
                  "type": "Identifier",
                  "start": 48,
                  "end": 51,
                  "name": "fn2"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [
                  {
                    "type": "ObjectPattern",
                    "start": 52,
                    "end": 67,
                    "properties": [
                      {
                        "type": "Property",
                        "start": 53,
                        "end": 64,
                        "method": false,
                        "shorthand": false,
                        "computed": false,
                        "key": {
                          "type": "Identifier",
                          "start": 53,
                          "end": 54,
                          "name": "a"
                        },
                        "value": {
                          "type": "ObjectPattern",
                          "start": 56,
                          "end": 64,
                          "properties": [
                            {
                              "type": "Property",
                              "start": 57,
                              "end": 61,
                              "method": false,
                              "shorthand": false,
                              "computed": false,
                              "key": {
                                "type": "Identifier",
                                "start": 57,
                                "end": 58,
                                "name": "p"
                              },
                              "value": {
                                "type": "Identifier",
                                "start": 60,
                                "end": 61,
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
                  "start": 69,
                  "end": 71,
                  "body": []
                }
              },
              {
                "type": "FunctionDeclaration",
                "start": 89,
                "end": 110,
                "id": {
                  "type": "Identifier",
                  "start": 98,
                  "end": 101,
                  "name": "fn3"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [
                  {
                    "type": "ObjectPattern",
                    "start": 102,
                    "end": 106,
                    "properties": [
                      {
                        "type": "Property",
                        "start": 103,
                        "end": 104,
                        "method": false,
                        "shorthand": true,
                        "computed": false,
                        "key": {
                          "type": "Identifier",
                          "start": 103,
                          "end": 104,
                          "name": "x"
                        },
                        "kind": "init",
                        "value": {
                          "type": "Identifier",
                          "start": 103,
                          "end": 104,
                          "name": "x"
                        }
                      }
                    ]
                  }
                ],
                "body": {
                  "type": "BlockStatement",
                  "start": 108,
                  "end": 110,
                  "body": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse array binding pattern with an element list with initializers', () => {
        expect(parseScript(`function fn4([], [[]], [[[[[[[[[x]]]]]]]]]) {}`, {
            raw: true,
            ranges: true
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

    it('should parse array binding pattern with an element list with initializers', () => {
        expect(parseScript(`function fn3({a: [,,,] = 42}) {}`, {
            raw: true,
            ranges: true
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
                  "name": "fn3"
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
                        "end": 27,
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
                          "type": "AssignmentPattern",
                          "start": 14,
                          "end": 27,
                          "left": {
                            "type": "ArrayPattern",
                            "start": 17,
                            "end": 22,
                            "elements": [
                              null,
                              null,
                              null
                            ]
                          },
                          "right": {
                            "type": "Literal",
                            "start": 25,
                            "end": 27,
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
                  "start": 30,
                  "end": 32,
                  "body": []
                }
              }
            ],
            "sourceType": "script"
          });
    });
    
    it('should parse array binding pattern with an element list with initializers', () => {
        expect(parseScript(`function fn1([{}]) {}`, {
            raw: true,
            ranges: true
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
                  "name": "fn1"
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
                      {
                        "type": "ObjectPattern",
                        "start": 14,
                        "end": 16,
                        "properties": []
                      }
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

});