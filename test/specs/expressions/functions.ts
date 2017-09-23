import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';
const expect = chai.expect;


describe('Expressions - Function expression', () => {

    
    it('should fail on "function _13_0_4_5_fun() { eval = 42; };"', () => {
        expect(() => {
            parseScript(`"use strict"; function _13_0_4_5_fun() { eval = 42; };`)
        }).to.throw('');
    });
    it('should fail on "function arguments() { };"', () => {
        expect(() => {
            parseScript(`"use strict"; function arguments() { };`)
        }).to.throw('');
    });
    
    it('should fail on "(function(...a, b){})"', () => {
        expect(() => {
            parseScript(`"use strict"; var _13_1_4_fun = function (arguments) { };`)
        }).to.throw('');
    });

    it('should fail on "(function((a)){})"', () => {
        expect(() => {
            parseScript(`(function((a)){})`)
        }).to.throw('');
    });

    it('should fail on "(function(...a, b){})"', () => {
        expect(() => {
            parseScript(`(function(...a, b){})`)
        }).to.throw();
    });

    it('should fail on "(function((a)){})"', () => {
        expect(() => {
            parseScript(`(function((a)){})`)
        }).to.throw('');
    });

    it('should parse "(function(){})"', () => {
        expect(parseScript(`(function(){})`, {
            ranges: true
        })).to.eql({
              "body": [
                {
                  "end": 14,
                  "expression": {
                    "body": {
                     "body": [],
                      "end": 13,
                    "start": 11,
                      "type": "BlockStatement"
                    },
                    "end": 13,
                    "expression": false,
                    "generator": false,
                    "async": false,
                    "id": null,
                    "params": [],
                    "start": 1,
                   "type": "FunctionExpression"
                  },
                  "start": 0,
                 "type": "ExpressionStatement"
                }
              ],
              "end": 14,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });

    it('should parse "(function eval() { });"', () => {
        expect(parseScript(`(function eval() { });`, {})).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "FunctionExpression",
                    "id": {
                        "type": "Identifier",
                        "name": "eval"
                    },
                    "params": [],
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

    it('should parse "(function x(y, z) { })"', () => {
        expect(parseScript(`(function x(y, z) { })`, {
            ranges: true,
            raw: true
        })).to.eql({
              "body": [
                {
                  "end": 22,
                  "expression": {
                    "body": {
                      "body": [],
                      "end": 21,
                      "start": 18,
                      "type": "BlockStatement"
                   },
                    "end": 21,
                    "expression": false,
                    "generator": false,
                    "async": false,
                    "id": {
                      "end": 11,
                      "name": "x",
                      "start": 10,
                      "type": "Identifier"
                    },
                    "params": [
                      {
                        "end": 13,
                        "name": "y",
                        "start": 12,
                        "type": "Identifier"
                      },
                      {
                        "end": 16,
                        "name": "z",
                        "start": 15,
                        "type": "Identifier"
                     }
                    ],
                    "start": 1,
                    "type": "FunctionExpression"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
                }
              ],
              "end": 22,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });

    it('should parse "(function(a = b){})"', () => {
        expect(parseScript(`(function(a = b){})`, {
            ranges: true,
            raw: true
        })).to.eql({
              "body": [
                {
                  "end": 19,
                  "expression": {
                    "async": false,
                    "body": {
                      "body": [],
                     "end": 18,
                      "start": 16,
                      "type": "BlockStatement"
                    },
                    "end": 18,
                    "expression": false,
                    "generator": false,
                    "id": null,
                    "params": [
                      {
                        "end": 15,
                        "left": {
                          "end": 11,
                          "name": "a",
                          "start": 10,
                          "type": "Identifier"
                        },
                        "right": {
                          "end": 15,
                          "name": "b",
                          "start": 14,
                          "type": "Identifier"
                        },
                        "start": 10,
                        "type": "AssignmentPattern"
                      }
                    ],
                    "start": 1,
                    "type": "FunctionExpression"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
               }
              ],
              "end": 19,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });

    it('should parse "(function(...a){})"', () => {
        expect(parseScript(`(function(...a){})`, {})).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "FunctionExpression",
                    "id": null,
                    "params": [{
                        "type": "RestElement",
                        "argument": {
                            "type": "Identifier",
                            "name": "a"
                        }
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

    it('should parse "(function(a, ...b){})"', () => {
        expect(parseScript(`(function(a, ...b){})`, {})).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "FunctionExpression",
                    "id": null,
                    "params": [{
                            "type": "Identifier",
                            "name": "a"
                        },
                        {
                            "type": "RestElement",
                            "argument": {
                                "type": "Identifier",
                                "name": "b"
                            }
                        }
                    ],
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

    it('should parse "(function([a]){})"', () => {
        expect(parseScript(`(function([a]){})`, {
            ranges: true,
            locations: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 17,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 17
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 17,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 17
                  }
                },
                "expression": {
                  "type": "FunctionExpression",
                  "start": 1,
                  "end": 16,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 16
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [
                    {
                      "type": "ArrayPattern",
                      "start": 10,
                      "end": 13,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 10
                        },
                        "end": {
                          "line": 1,
                          "column": 13
                        }
                      },
                      "elements": [
                        {
                          "type": "Identifier",
                          "start": 11,
                          "end": 12,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 11
                            },
                            "end": {
                              "line": 1,
                              "column": 12
                            }
                          },
                          "name": "a"
                        }
                      ]
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 14,
                    "end": 16,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 14
                      },
                      "end": {
                        "line": 1,
                        "column": 16
                      }
                    },
                    "body": []
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "(function([]){})"', () => {
        expect(parseScript(`(function([]){})`, {
            ranges: true,
            raw:true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 16,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 16
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 16,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 16
                  }
                },
                "expression": {
                  "type": "FunctionExpression",
                  "start": 1,
                  "end": 15,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 15
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [
                    {
                      "type": "ArrayPattern",
                      "start": 10,
                      "end": 12,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 10
                        },
                        "end": {
                          "line": 1,
                          "column": 12
                        }
                      },
                      "elements": []
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 13,
                    "end": 15,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 13
                      },
                      "end": {
                        "line": 1,
                        "column": 15
                      }
                    },
                    "body": []
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "(function*(){ (function yield(){}); })"', () => {
        expect(parseScript(`(function*(){ (function yield(){}); })`, {})).to.eql({
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
                                "type": "FunctionExpression",
                                "id": {
                                    "type": "Identifier",
                                    "name": "yield"
                                },
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": []
                                },
                                "generator": false,
                                "expression": false,
                                "async": false
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

    it('should parse function expression + export in module code', () => {
        expect(parseModule(`a = function() {}
        export { a };`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 39,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 17,
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 0,
                  "end": 17,
                  "operator": "=",
                  "left": {
                    "type": "Identifier",
                    "start": 0,
                    "end": 1,
                    "name": "a"
                  },
                  "right": {
                    "type": "FunctionExpression",
                    "start": 4,
                    "end": 17,
                    "id": null,
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [],
                    "body": {
                      "type": "BlockStatement",
                      "start": 15,
                      "end": 17,
                      "body": []
                    }
                  }
                }
              },
              {
                "type": "ExportNamedDeclaration",
                "start": 26,
                "end": 39,
                "declaration": null,
                "specifiers": [
                  {
                    "type": "ExportSpecifier",
                    "start": 35,
                    "end": 36,
                    "local": {
                      "type": "Identifier",
                      "start": 35,
                      "end": 36,
                      "name": "a"
                    },
                    "exported": {
                      "type": "Identifier",
                      "start": 35,
                      "end": 36,
                      "name": "a"
                    }
                  }
                ],
                "source": null
              }
            ],
            "sourceType": "module"
          });  
        });  
    
});