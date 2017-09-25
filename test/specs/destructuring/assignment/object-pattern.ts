import { parseScript, parseModule } from '../../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Destructuring Assignment - Object pattern', () => {

    it('should fail on "({,a,} = 0)"', () => {
        expect(() => {
            parseScript('({,a,} = 0)');
        }).to.throw();
    });

    it('should fail on "({function} = 0"', () => {
        expect(() => {
            parseScript('({function} = 0');
        }).to.throw();
    });

    it('should fail on "({0} = 0)"', () => {
        expect(() => {
            parseScript('({0} = 0)');
        }).to.throw();
    });

    it('should fail on "({a.b} = 0)"', () => {
        expect(() => {
            parseScript('({a.b} = 0)');
        }).to.throw();
    });

    it('should fail on "({var} = 0)"', () => {
        expect(() => {
            parseScript('({var} = 0)');
        }).to.throw();
    });

    it('should fail on "({a} += 0);"', () => {
        expect(() => {
            parseScript('({a} += 0);');
        }).to.throw();
    });

    it('should parse object empty boolean', () => {
        expect(parseScript('result = {} = false;', {
            ranges: true,
            raw: true
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
                  "end": 19,
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
                    "end": 19,
                    "operator": "=",
                    "left": {
                      "type": "ObjectPattern",
                      "start": 9,
                      "end": 11,
                      "properties": []
                    },
                    "right": {
                      "type": "Literal",
                      "start": 14,
                      "end": 19,
                      "value": false,
                      "raw": "false"
                    }
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse obj empty object', () => {
        expect(parseScript('result = {} = {};', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 17,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 17,
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 0,
                  "end": 16,
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
                    "end": 16,
                    "operator": "=",
                    "left": {
                      "type": "ObjectPattern",
                      "start": 9,
                      "end": 11,
                      "properties": []
                    },
                    "right": {
                      "type": "ObjectExpression",
                      "start": 14,
                      "end": 16,
                      "properties": []
                    }
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse object property element init assignment undefined', () => {
        expect(parseScript('result = { y: x = 1 } = { y: undefined };', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 41,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 41,
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 0,
                  "end": 40,
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
                    "end": 40,
                    "operator": "=",
                    "left": {
                      "type": "ObjectPattern",
                      "start": 9,
                      "end": 21,
                      "properties": [
                        {
                          "type": "Property",
                          "start": 11,
                          "end": 19,
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 11,
                            "end": 12,
                            "name": "y"
                          },
                          "value": {
                            "type": "AssignmentPattern",
                            "start": 14,
                            "end": 19,
                            "left": {
                              "type": "Identifier",
                              "start": 14,
                              "end": 15,
                              "name": "x"
                            },
                            "right": {
                              "type": "Literal",
                              "start": 18,
                              "end": 19,
                              "value": 1,
                              "raw": "1"
                            }
                          },
                          "kind": "init"
                        }
                      ]
                    },
                    "right": {
                      "type": "ObjectExpression",
                      "start": 24,
                      "end": 40,
                      "properties": [
                        {
                          "type": "Property",
                          "start": 26,
                          "end": 38,
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 26,
                            "end": 27,
                            "name": "y"
                          },
                          "value": {
                            "type": "Identifier",
                            "start": 29,
                            "end": 38,
                            "name": "undefined"
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

    it('should parse object property element init yield expression', () => {
        expect(parseScript('result = { x: x = yield } = {};', {
            ranges: true,
            locations: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 31,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 31
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 31,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 31
                  }
                },
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 0,
                  "end": 30,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 0
                    },
                    "end": {
                      "line": 1,
                      "column": 30
                    }
                  },
                  "operator": "=",
                  "left": {
                    "type": "Identifier",
                    "start": 0,
                    "end": 6,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 6
                      }
                    },
                    "name": "result"
                  },
                  "right": {
                    "type": "AssignmentExpression",
                    "start": 9,
                    "end": 30,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 9
                      },
                      "end": {
                        "line": 1,
                        "column": 30
                      }
                    },
                    "operator": "=",
                    "left": {
                      "type": "ObjectPattern",
                      "start": 9,
                      "end": 25,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 9
                        },
                        "end": {
                          "line": 1,
                          "column": 25
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 11,
                          "end": 23,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 11
                            },
                            "end": {
                              "line": 1,
                              "column": 23
                            }
                          },
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
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
                            "name": "x"
                          },
                          "value": {
                            "type": "AssignmentPattern",
                            "start": 14,
                            "end": 23,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 14
                              },
                              "end": {
                                "line": 1,
                                "column": 23
                              }
                            },
                            "left": {
                              "type": "Identifier",
                              "start": 14,
                              "end": 15,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 14
                                },
                                "end": {
                                  "line": 1,
                                  "column": 15
                                }
                              },
                              "name": "x"
                            },
                            "right": {
                              "type": "Identifier",
                              "start": 18,
                              "end": 23,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 18
                                },
                                "end": {
                                  "line": 1,
                                  "column": 23
                                }
                              },
                              "name": "yield"
                            }
                          },
                          "kind": "init"
                        }
                      ]
                    },
                    "right": {
                      "type": "ObjectExpression",
                      "start": 28,
                      "end": 30,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 28
                        },
                        "end": {
                          "line": 1,
                          "column": 30
                        }
                      },
                      "properties": []
                    }
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse object property identifier resolution', () => {
        expect(parseScript('result = { a: x, } = { a: 2 };', {
            ranges: true,
            locations: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 30,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 30
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 30,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 30
                  }
                },
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 0,
                  "end": 29,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 0
                    },
                    "end": {
                      "line": 1,
                      "column": 29
                    }
                  },
                  "operator": "=",
                  "left": {
                    "type": "Identifier",
                    "start": 0,
                    "end": 6,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 6
                      }
                    },
                    "name": "result"
                  },
                  "right": {
                    "type": "AssignmentExpression",
                    "start": 9,
                    "end": 29,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 9
                      },
                      "end": {
                        "line": 1,
                        "column": 29
                      }
                    },
                    "operator": "=",
                    "left": {
                      "type": "ObjectPattern",
                      "start": 9,
                      "end": 18,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 9
                        },
                        "end": {
                          "line": 1,
                          "column": 18
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 11,
                          "end": 15,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 11
                            },
                            "end": {
                              "line": 1,
                              "column": 15
                            }
                          },
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
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
                          },
                          "value": {
                            "type": "Identifier",
                            "start": 14,
                            "end": 15,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 14
                              },
                              "end": {
                                "line": 1,
                                "column": 15
                              }
                            },
                            "name": "x"
                          },
                          "kind": "init"
                        }
                      ]
                    },
                    "right": {
                      "type": "ObjectExpression",
                      "start": 21,
                      "end": 29,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 21
                        },
                        "end": {
                          "line": 1,
                          "column": 29
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 23,
                          "end": 27,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 23
                            },
                            "end": {
                              "line": 1,
                              "column": 27
                            }
                          },
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 23,
                            "end": 24,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 23
                              },
                              "end": {
                                "line": 1,
                                "column": 24
                              }
                            },
                            "name": "a"
                          },
                          "value": {
                            "type": "Literal",
                            "start": 26,
                            "end": 27,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 26
                              },
                              "end": {
                                "line": 1,
                                "column": 27
                              }
                            },
                            "value": 2,
                            "raw": "2"
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

    it('should parse object property nested array', () => {
        expect(parseScript('result = { x: [y] } = { x: [321] };', {
            ranges: true,
            locations: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 35,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 35
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 35,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 35
                  }
                },
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 0,
                  "end": 34,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 0
                    },
                    "end": {
                      "line": 1,
                      "column": 34
                    }
                  },
                  "operator": "=",
                  "left": {
                    "type": "Identifier",
                    "start": 0,
                    "end": 6,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 6
                      }
                    },
                    "name": "result"
                  },
                  "right": {
                    "type": "AssignmentExpression",
                    "start": 9,
                    "end": 34,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 9
                      },
                      "end": {
                        "line": 1,
                        "column": 34
                      }
                    },
                    "operator": "=",
                    "left": {
                      "type": "ObjectPattern",
                      "start": 9,
                      "end": 19,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 9
                        },
                        "end": {
                          "line": 1,
                          "column": 19
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 11,
                          "end": 17,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 11
                            },
                            "end": {
                              "line": 1,
                              "column": 17
                            }
                          },
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
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
                            "name": "x"
                          },
                          "value": {
                            "type": "ArrayPattern",
                            "start": 14,
                            "end": 17,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 14
                              },
                              "end": {
                                "line": 1,
                                "column": 17
                              }
                            },
                            "elements": [
                              {
                                "type": "Identifier",
                                "start": 15,
                                "end": 16,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 15
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 16
                                  }
                                },
                                "name": "y"
                              }
                            ]
                          },
                          "kind": "init"
                        }
                      ]
                    },
                    "right": {
                      "type": "ObjectExpression",
                      "start": 22,
                      "end": 34,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 22
                        },
                        "end": {
                          "line": 1,
                          "column": 34
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 24,
                          "end": 32,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 24
                            },
                            "end": {
                              "line": 1,
                              "column": 32
                            }
                          },
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 24,
                            "end": 25,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 24
                              },
                              "end": {
                                "line": 1,
                                "column": 25
                              }
                            },
                            "name": "x"
                          },
                          "value": {
                            "type": "ArrayExpression",
                            "start": 27,
                            "end": 32,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 27
                              },
                              "end": {
                                "line": 1,
                                "column": 32
                              }
                            },
                            "elements": [
                              {
                                "type": "Literal",
                                "start": 28,
                                "end": 31,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 28
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 31
                                  }
                                },
                                "value": 321,
                                "raw": "321"
                              }
                            ]
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

    it('should parse obj property nested object yield identifier', () => {
        expect(parseScript('result = { x: { x = yield } } = { x: {} };', {
            ranges: true,
            locations: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 42,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 42
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 42,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 42
                  }
                },
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 0,
                  "end": 41,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 0
                    },
                    "end": {
                      "line": 1,
                      "column": 41
                    }
                  },
                  "operator": "=",
                  "left": {
                    "type": "Identifier",
                    "start": 0,
                    "end": 6,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 6
                      }
                    },
                    "name": "result"
                  },
                  "right": {
                    "type": "AssignmentExpression",
                    "start": 9,
                    "end": 41,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 9
                      },
                      "end": {
                        "line": 1,
                        "column": 41
                      }
                    },
                    "operator": "=",
                    "left": {
                      "type": "ObjectPattern",
                      "start": 9,
                      "end": 29,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 9
                        },
                        "end": {
                          "line": 1,
                          "column": 29
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 11,
                          "end": 27,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 11
                            },
                            "end": {
                              "line": 1,
                              "column": 27
                            }
                          },
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
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
                            "name": "x"
                          },
                          "value": {
                            "type": "ObjectPattern",
                            "start": 14,
                            "end": 27,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 14
                              },
                              "end": {
                                "line": 1,
                                "column": 27
                              }
                            },
                            "properties": [
                              {
                                "type": "Property",
                                "start": 16,
                                "end": 25,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 16
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 25
                                  }
                                },
                                "method": false,
                                "shorthand": true,
                                "computed": false,
                                "key": {
                                  "type": "Identifier",
                                  "start": 16,
                                  "end": 17,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 16
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 17
                                    }
                                  },
                                  "name": "x"
                                },
                                "kind": "init",
                                "value": {
                                  "type": "AssignmentPattern",
                                  "start": 16,
                                  "end": 25,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 16
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 25
                                    }
                                  },
                                  "left": {
                                    "type": "Identifier",
                                    "start": 16,
                                    "end": 17,
                                    "loc": {
                                      "start": {
                                        "line": 1,
                                        "column": 16
                                      },
                                      "end": {
                                        "line": 1,
                                        "column": 17
                                      }
                                    },
                                    "name": "x"
                                  },
                                  "right": {
                                    "type": "Identifier",
                                    "start": 20,
                                    "end": 25,
                                    "loc": {
                                      "start": {
                                        "line": 1,
                                        "column": 20
                                      },
                                      "end": {
                                        "line": 1,
                                        "column": 25
                                      }
                                    },
                                    "name": "yield"
                                  }
                                }
                              }
                            ]
                          },
                          "kind": "init"
                        }
                      ]
                    },
                    "right": {
                      "type": "ObjectExpression",
                      "start": 32,
                      "end": 41,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 32
                        },
                        "end": {
                          "line": 1,
                          "column": 41
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 34,
                          "end": 39,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 34
                            },
                            "end": {
                              "line": 1,
                              "column": 39
                            }
                          },
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 34,
                            "end": 35,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 34
                              },
                              "end": {
                                "line": 1,
                                "column": 35
                              }
                            },
                            "name": "x"
                          },
                          "value": {
                            "type": "ObjectExpression",
                            "start": 37,
                            "end": 39,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 37
                              },
                              "end": {
                                "line": 1,
                                "column": 39
                              }
                            },
                            "properties": []
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

    it('should parse "({x,} = 0)"', () => {
        expect(parseScript('({x,} = 0)', {
            ranges: true,
            locations: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 10,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 10
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 10,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 10
                  }
                },
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 1,
                  "end": 9,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 9
                    }
                  },
                  "operator": "=",
                  "left": {
                    "type": "ObjectPattern",
                    "start": 1,
                    "end": 5,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 1
                      },
                      "end": {
                        "line": 1,
                        "column": 5
                      }
                    },
                    "properties": [
                      {
                        "type": "Property",
                        "start": 2,
                        "end": 3,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 2
                          },
                          "end": {
                            "line": 1,
                            "column": 3
                          }
                        },
                        "method": false,
                        "shorthand": true,
                        "computed": false,
                        "key": {
                          "type": "Identifier",
                          "start": 2,
                          "end": 3,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 2
                            },
                            "end": {
                              "line": 1,
                              "column": 3
                            }
                          },
                          "name": "x"
                        },
                        "kind": "init",
                        "value": {
                          "type": "Identifier",
                          "start": 2,
                          "end": 3,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 2
                            },
                            "end": {
                              "line": 1,
                              "column": 3
                            }
                          },
                          "name": "x"
                        }
                      }
                    ]
                  },
                  "right": {
                    "type": "Literal",
                    "start": 8,
                    "end": 9,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 8
                      },
                      "end": {
                        "line": 1,
                        "column": 9
                      }
                    },
                    "value": 0,
                    "raw": "0"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "({x,y} = 0)"', () => {
        expect(parseScript('({x,y} = 0)', {
            ranges: true,
            locations: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 11,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 11
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 11,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 11
                  }
                },
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 1,
                  "end": 10,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 10
                    }
                  },
                  "operator": "=",
                  "left": {
                    "type": "ObjectPattern",
                    "start": 1,
                    "end": 6,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 1
                      },
                      "end": {
                        "line": 1,
                        "column": 6
                      }
                    },
                    "properties": [
                      {
                        "type": "Property",
                        "start": 2,
                        "end": 3,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 2
                          },
                          "end": {
                            "line": 1,
                            "column": 3
                          }
                        },
                        "method": false,
                        "shorthand": true,
                        "computed": false,
                        "key": {
                          "type": "Identifier",
                          "start": 2,
                          "end": 3,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 2
                            },
                            "end": {
                              "line": 1,
                              "column": 3
                            }
                          },
                          "name": "x"
                        },
                        "kind": "init",
                        "value": {
                          "type": "Identifier",
                          "start": 2,
                          "end": 3,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 2
                            },
                            "end": {
                              "line": 1,
                              "column": 3
                            }
                          },
                          "name": "x"
                        }
                      },
                      {
                        "type": "Property",
                        "start": 4,
                        "end": 5,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 4
                          },
                          "end": {
                            "line": 1,
                            "column": 5
                          }
                        },
                        "method": false,
                        "shorthand": true,
                        "computed": false,
                        "key": {
                          "type": "Identifier",
                          "start": 4,
                          "end": 5,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 4
                            },
                            "end": {
                              "line": 1,
                              "column": 5
                            }
                          },
                          "name": "y"
                        },
                        "kind": "init",
                        "value": {
                          "type": "Identifier",
                          "start": 4,
                          "end": 5,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 4
                            },
                            "end": {
                              "line": 1,
                              "column": 5
                            }
                          },
                          "name": "y"
                        }
                      }
                    ]
                  },
                  "right": {
                    "type": "Literal",
                    "start": 9,
                    "end": 10,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 9
                      },
                      "end": {
                        "line": 1,
                        "column": 10
                      }
                    },
                    "value": 0,
                    "raw": "0"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "({[a]: a} = 1)"', () => {
        expect(parseScript('({[a]: a} = 1)', {
            ranges: true,
            locations: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 14,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 14
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 14,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 14
                  }
                },
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 1,
                  "end": 13,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 13
                    }
                  },
                  "operator": "=",
                  "left": {
                    "type": "ObjectPattern",
                    "start": 1,
                    "end": 9,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 1
                      },
                      "end": {
                        "line": 1,
                        "column": 9
                      }
                    },
                    "properties": [
                      {
                        "type": "Property",
                        "start": 2,
                        "end": 8,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 2
                          },
                          "end": {
                            "line": 1,
                            "column": 8
                          }
                        },
                        "method": false,
                        "shorthand": false,
                        "computed": true,
                        "key": {
                          "type": "Identifier",
                          "start": 3,
                          "end": 4,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 3
                            },
                            "end": {
                              "line": 1,
                              "column": 4
                            }
                          },
                          "name": "a"
                        },
                        "value": {
                          "type": "Identifier",
                          "start": 7,
                          "end": 8,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 7
                            },
                            "end": {
                              "line": 1,
                              "column": 8
                            }
                          },
                          "name": "a"
                        },
                        "kind": "init"
                      }
                    ]
                  },
                  "right": {
                    "type": "Literal",
                    "start": 12,
                    "end": 13,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 12
                      },
                      "end": {
                        "line": 1,
                        "column": 13
                      }
                    },
                    "value": 1,
                    "raw": "1"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "({x = 0} = 1)"', () => {
        expect(parseScript('({x = 0} = 1)', {
            ranges: true,
            locations: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 13,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 13
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 13,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 13
                  }
                },
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 1,
                  "end": 12,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 12
                    }
                  },
                  "operator": "=",
                  "left": {
                    "type": "ObjectPattern",
                    "start": 1,
                    "end": 8,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 1
                      },
                      "end": {
                        "line": 1,
                        "column": 8
                      }
                    },
                    "properties": [
                      {
                        "type": "Property",
                        "start": 2,
                        "end": 7,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 2
                          },
                          "end": {
                            "line": 1,
                            "column": 7
                          }
                        },
                        "method": false,
                        "shorthand": true,
                        "computed": false,
                        "key": {
                          "type": "Identifier",
                          "start": 2,
                          "end": 3,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 2
                            },
                            "end": {
                              "line": 1,
                              "column": 3
                            }
                          },
                          "name": "x"
                        },
                        "kind": "init",
                        "value": {
                          "type": "AssignmentPattern",
                          "start": 2,
                          "end": 7,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 2
                            },
                            "end": {
                              "line": 1,
                              "column": 7
                            }
                          },
                          "left": {
                            "type": "Identifier",
                            "start": 2,
                            "end": 3,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 2
                              },
                              "end": {
                                "line": 1,
                                "column": 3
                              }
                            },
                            "name": "x"
                          },
                          "right": {
                            "type": "Literal",
                            "start": 6,
                            "end": 7,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 6
                              },
                              "end": {
                                "line": 1,
                                "column": 7
                              }
                            },
                            "value": 0,
                            "raw": "0"
                          }
                        }
                      }
                    ]
                  },
                  "right": {
                    "type": "Literal",
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
                    "value": 1,
                    "raw": "1"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "({x = 0,} = 1)"', () => {
        expect(parseScript('({x = 0,} = 1)', {
            ranges: true,
            locations: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 14,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 14
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 14,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 14
                  }
                },
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 1,
                  "end": 13,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 13
                    }
                  },
                  "operator": "=",
                  "left": {
                    "type": "ObjectPattern",
                    "start": 1,
                    "end": 9,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 1
                      },
                      "end": {
                        "line": 1,
                        "column": 9
                      }
                    },
                    "properties": [
                      {
                        "type": "Property",
                        "start": 2,
                        "end": 7,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 2
                          },
                          "end": {
                            "line": 1,
                            "column": 7
                          }
                        },
                        "method": false,
                        "shorthand": true,
                        "computed": false,
                        "key": {
                          "type": "Identifier",
                          "start": 2,
                          "end": 3,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 2
                            },
                            "end": {
                              "line": 1,
                              "column": 3
                            }
                          },
                          "name": "x"
                        },
                        "kind": "init",
                        "value": {
                          "type": "AssignmentPattern",
                          "start": 2,
                          "end": 7,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 2
                            },
                            "end": {
                              "line": 1,
                              "column": 7
                            }
                          },
                          "left": {
                            "type": "Identifier",
                            "start": 2,
                            "end": 3,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 2
                              },
                              "end": {
                                "line": 1,
                                "column": 3
                              }
                            },
                            "name": "x"
                          },
                          "right": {
                            "type": "Literal",
                            "start": 6,
                            "end": 7,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 6
                              },
                              "end": {
                                "line": 1,
                                "column": 7
                              }
                            },
                            "value": 0,
                            "raw": "0"
                          }
                        }
                      }
                    ]
                  },
                  "right": {
                    "type": "Literal",
                    "start": 12,
                    "end": 13,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 12
                      },
                      "end": {
                        "line": 1,
                        "column": 13
                      }
                    },
                    "value": 1,
                    "raw": "1"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "({x: y} = 0)"', () => {
        expect(parseScript('({x: y} = 0)', {
            ranges: true,
            locations: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 12,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 12
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 12,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 12
                  }
                },
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 1,
                  "end": 11,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 11
                    }
                  },
                  "operator": "=",
                  "left": {
                    "type": "ObjectPattern",
                    "start": 1,
                    "end": 7,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 1
                      },
                      "end": {
                        "line": 1,
                        "column": 7
                      }
                    },
                    "properties": [
                      {
                        "type": "Property",
                        "start": 2,
                        "end": 6,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 2
                          },
                          "end": {
                            "line": 1,
                            "column": 6
                          }
                        },
                        "method": false,
                        "shorthand": false,
                        "computed": false,
                        "key": {
                          "type": "Identifier",
                          "start": 2,
                          "end": 3,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 2
                            },
                            "end": {
                              "line": 1,
                              "column": 3
                            }
                          },
                          "name": "x"
                        },
                        "value": {
                          "type": "Identifier",
                          "start": 5,
                          "end": 6,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 5
                            },
                            "end": {
                              "line": 1,
                              "column": 6
                            }
                          },
                          "name": "y"
                        },
                        "kind": "init"
                      }
                    ]
                  },
                  "right": {
                    "type": "Literal",
                    "start": 10,
                    "end": 11,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 10
                      },
                      "end": {
                        "line": 1,
                        "column": 11
                      }
                    },
                    "value": 0,
                    "raw": "0"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "({"x": y} = 0)"', () => {
        expect(parseScript('({"x": y} = 0)', {
            ranges: true,
            locations: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 14,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 14
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 14,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 14
                  }
                },
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 1,
                  "end": 13,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 13
                    }
                  },
                  "operator": "=",
                  "left": {
                    "type": "ObjectPattern",
                    "start": 1,
                    "end": 9,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 1
                      },
                      "end": {
                        "line": 1,
                        "column": 9
                      }
                    },
                    "properties": [
                      {
                        "type": "Property",
                        "start": 2,
                        "end": 8,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 2
                          },
                          "end": {
                            "line": 1,
                            "column": 8
                          }
                        },
                        "method": false,
                        "shorthand": false,
                        "computed": false,
                        "key": {
                          "type": "Literal",
                          "start": 2,
                          "end": 5,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 2
                            },
                            "end": {
                              "line": 1,
                              "column": 5
                            }
                          },
                          "value": "x",
                          "raw": "\"x\""
                        },
                        "value": {
                          "type": "Identifier",
                          "start": 7,
                          "end": 8,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 7
                            },
                            "end": {
                              "line": 1,
                              "column": 8
                            }
                          },
                          "name": "y"
                        },
                        "kind": "init"
                      }
                    ]
                  },
                  "right": {
                    "type": "Literal",
                    "start": 12,
                    "end": 13,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 12
                      },
                      "end": {
                        "line": 1,
                        "column": 13
                      }
                    },
                    "value": 0,
                    "raw": "0"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "({0: x, 1: x} = 0)', () => {
        expect(parseScript('({0: x, 1: x} = 0)', {
            ranges: true,
            locations: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 18,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 18
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 18,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 18
                  }
                },
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 1,
                  "end": 17,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 17
                    }
                  },
                  "operator": "=",
                  "left": {
                    "type": "ObjectPattern",
                    "start": 1,
                    "end": 13,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 1
                      },
                      "end": {
                        "line": 1,
                        "column": 13
                      }
                    },
                    "properties": [
                      {
                        "type": "Property",
                        "start": 2,
                        "end": 6,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 2
                          },
                          "end": {
                            "line": 1,
                            "column": 6
                          }
                        },
                        "method": false,
                        "shorthand": false,
                        "computed": false,
                        "key": {
                          "type": "Literal",
                          "start": 2,
                          "end": 3,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 2
                            },
                            "end": {
                              "line": 1,
                              "column": 3
                            }
                          },
                          "value": 0,
                          "raw": "0"
                        },
                        "value": {
                          "type": "Identifier",
                          "start": 5,
                          "end": 6,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 5
                            },
                            "end": {
                              "line": 1,
                              "column": 6
                            }
                          },
                          "name": "x"
                        },
                        "kind": "init"
                      },
                      {
                        "type": "Property",
                        "start": 8,
                        "end": 12,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 8
                          },
                          "end": {
                            "line": 1,
                            "column": 12
                          }
                        },
                        "method": false,
                        "shorthand": false,
                        "computed": false,
                        "key": {
                          "type": "Literal",
                          "start": 8,
                          "end": 9,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 8
                            },
                            "end": {
                              "line": 1,
                              "column": 9
                            }
                          },
                          "value": 1,
                          "raw": "1"
                        },
                        "value": {
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
                          "name": "x"
                        },
                        "kind": "init"
                      }
                    ]
                  },
                  "right": {
                    "type": "Literal",
                    "start": 16,
                    "end": 17,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 16
                      },
                      "end": {
                        "line": 1,
                        "column": 17
                      }
                    },
                    "value": 0,
                    "raw": "0"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "({x: y = 0} = 1)"', () => {
        expect(parseScript('({x: y = 0} = 1)', {
            ranges: true,
            locations: true,
            raw: true
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
                  "type": "AssignmentExpression",
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
                  "operator": "=",
                  "left": {
                    "type": "ObjectPattern",
                    "start": 1,
                    "end": 11,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 1
                      },
                      "end": {
                        "line": 1,
                        "column": 11
                      }
                    },
                    "properties": [
                      {
                        "type": "Property",
                        "start": 2,
                        "end": 10,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 2
                          },
                          "end": {
                            "line": 1,
                            "column": 10
                          }
                        },
                        "method": false,
                        "shorthand": false,
                        "computed": false,
                        "key": {
                          "type": "Identifier",
                          "start": 2,
                          "end": 3,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 2
                            },
                            "end": {
                              "line": 1,
                              "column": 3
                            }
                          },
                          "name": "x"
                        },
                        "value": {
                          "type": "AssignmentPattern",
                          "start": 5,
                          "end": 10,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 5
                            },
                            "end": {
                              "line": 1,
                              "column": 10
                            }
                          },
                          "left": {
                            "type": "Identifier",
                            "start": 5,
                            "end": 6,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 5
                              },
                              "end": {
                                "line": 1,
                                "column": 6
                              }
                            },
                            "name": "y"
                          },
                          "right": {
                            "type": "Literal",
                            "start": 9,
                            "end": 10,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 9
                              },
                              "end": {
                                "line": 1,
                                "column": 10
                              }
                            },
                            "value": 0,
                            "raw": "0"
                          }
                        },
                        "kind": "init"
                      }
                    ]
                  },
                  "right": {
                    "type": "Literal",
                    "start": 14,
                    "end": 15,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 14
                      },
                      "end": {
                        "line": 1,
                        "column": 15
                      }
                    },
                    "value": 1,
                    "raw": "1"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "({x: y = z = 0} = 1)"', () => {
        expect(parseScript('({x: y = z = 0} = 1)', {
            ranges: true,
            locations: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 20,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 20
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 20,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 20
                  }
                },
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 1,
                  "end": 19,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 19
                    }
                  },
                  "operator": "=",
                  "left": {
                    "type": "ObjectPattern",
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
                    "properties": [
                      {
                        "type": "Property",
                        "start": 2,
                        "end": 14,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 2
                          },
                          "end": {
                            "line": 1,
                            "column": 14
                          }
                        },
                        "method": false,
                        "shorthand": false,
                        "computed": false,
                        "key": {
                          "type": "Identifier",
                          "start": 2,
                          "end": 3,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 2
                            },
                            "end": {
                              "line": 1,
                              "column": 3
                            }
                          },
                          "name": "x"
                        },
                        "value": {
                          "type": "AssignmentPattern",
                          "start": 5,
                          "end": 14,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 5
                            },
                            "end": {
                              "line": 1,
                              "column": 14
                            }
                          },
                          "left": {
                            "type": "Identifier",
                            "start": 5,
                            "end": 6,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 5
                              },
                              "end": {
                                "line": 1,
                                "column": 6
                              }
                            },
                            "name": "y"
                          },
                          "right": {
                            "type": "AssignmentExpression",
                            "start": 9,
                            "end": 14,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 9
                              },
                              "end": {
                                "line": 1,
                                "column": 14
                              }
                            },
                            "operator": "=",
                            "left": {
                              "type": "Identifier",
                              "start": 9,
                              "end": 10,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 9
                                },
                                "end": {
                                  "line": 1,
                                  "column": 10
                                }
                              },
                              "name": "z"
                            },
                            "right": {
                              "type": "Literal",
                              "start": 13,
                              "end": 14,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 13
                                },
                                "end": {
                                  "line": 1,
                                  "column": 14
                                }
                              },
                              "value": 0,
                              "raw": "0"
                            }
                          }
                        },
                        "kind": "init"
                      }
                    ]
                  },
                  "right": {
                    "type": "Literal",
                    "start": 18,
                    "end": 19,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 18
                      },
                      "end": {
                        "line": 1,
                        "column": 19
                      }
                    },
                    "value": 1,
                    "raw": "1"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "({x: [y] = 0} = 1)"', () => {
        expect(parseScript('({x: [y] = 0} = 1)', {
            ranges: true,
            locations: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 18,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 18
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 18,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 18
                  }
                },
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 1,
                  "end": 17,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 17
                    }
                  },
                  "operator": "=",
                  "left": {
                    "type": "ObjectPattern",
                    "start": 1,
                    "end": 13,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 1
                      },
                      "end": {
                        "line": 1,
                        "column": 13
                      }
                    },
                    "properties": [
                      {
                        "type": "Property",
                        "start": 2,
                        "end": 12,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 2
                          },
                          "end": {
                            "line": 1,
                            "column": 12
                          }
                        },
                        "method": false,
                        "shorthand": false,
                        "computed": false,
                        "key": {
                          "type": "Identifier",
                          "start": 2,
                          "end": 3,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 2
                            },
                            "end": {
                              "line": 1,
                              "column": 3
                            }
                          },
                          "name": "x"
                        },
                        "value": {
                          "type": "AssignmentPattern",
                          "start": 5,
                          "end": 12,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 5
                            },
                            "end": {
                              "line": 1,
                              "column": 12
                            }
                          },
                          "left": {
                            "type": "ArrayPattern",
                            "start": 5,
                            "end": 8,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 5
                              },
                              "end": {
                                "line": 1,
                                "column": 8
                              }
                            },
                            "elements": [
                              {
                                "type": "Identifier",
                                "start": 6,
                                "end": 7,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 6
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 7
                                  }
                                },
                                "name": "y"
                              }
                            ]
                          },
                          "right": {
                            "type": "Literal",
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
                            "value": 0,
                            "raw": "0"
                          }
                        },
                        "kind": "init"
                      }
                    ]
                  },
                  "right": {
                    "type": "Literal",
                    "start": 16,
                    "end": 17,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 16
                      },
                      "end": {
                        "line": 1,
                        "column": 17
                      }
                    },
                    "value": 1,
                    "raw": "1"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "({a:let} = 0);"', () => {
        expect(parseScript('({a:let} = 0);', {
            ranges: true,
            locations: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 14,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 14
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 14,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 14
                  }
                },
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 1,
                  "end": 12,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 12
                    }
                  },
                  "operator": "=",
                  "left": {
                    "type": "ObjectPattern",
                    "start": 1,
                    "end": 8,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 1
                      },
                      "end": {
                        "line": 1,
                        "column": 8
                      }
                    },
                    "properties": [
                      {
                        "type": "Property",
                        "start": 2,
                        "end": 7,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 2
                          },
                          "end": {
                            "line": 1,
                            "column": 7
                          }
                        },
                        "method": false,
                        "shorthand": false,
                        "computed": false,
                        "key": {
                          "type": "Identifier",
                          "start": 2,
                          "end": 3,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 2
                            },
                            "end": {
                              "line": 1,
                              "column": 3
                            }
                          },
                          "name": "a"
                        },
                        "value": {
                          "type": "Identifier",
                          "start": 4,
                          "end": 7,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 4
                            },
                            "end": {
                              "line": 1,
                              "column": 7
                            }
                          },
                          "name": "let"
                        },
                        "kind": "init"
                      }
                    ]
                  },
                  "right": {
                    "type": "Literal",
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
                    "value": 0,
                    "raw": "0"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "({let} = 0);"', () => {
        expect(parseScript('({let} = 0);', {
            ranges: true,
            locations: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 12,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 12
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 12,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 12
                  }
                },
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 1,
                  "end": 10,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 10
                    }
                  },
                  "operator": "=",
                  "left": {
                    "type": "ObjectPattern",
                    "start": 1,
                    "end": 6,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 1
                      },
                      "end": {
                        "line": 1,
                        "column": 6
                      }
                    },
                    "properties": [
                      {
                        "type": "Property",
                        "start": 2,
                        "end": 5,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 2
                          },
                          "end": {
                            "line": 1,
                            "column": 5
                          }
                        },
                        "method": false,
                        "shorthand": true,
                        "computed": false,
                        "key": {
                          "type": "Identifier",
                          "start": 2,
                          "end": 5,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 2
                            },
                            "end": {
                              "line": 1,
                              "column": 5
                            }
                          },
                          "name": "let"
                        },
                        "kind": "init",
                        "value": {
                          "type": "Identifier",
                          "start": 2,
                          "end": 5,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 2
                            },
                            "end": {
                              "line": 1,
                              "column": 5
                            }
                          },
                          "name": "let"
                        }
                      }
                    ]
                  },
                  "right": {
                    "type": "Literal",
                    "start": 9,
                    "end": 10,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 9
                      },
                      "end": {
                        "line": 1,
                        "column": 10
                      }
                    },
                    "value": 0,
                    "raw": "0"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "(function*() { [...{ x = yield }] = 0; })"', () => {
        expect(parseScript('(function*() { [...{ x = yield }] = 0; })', {
            ranges: true,
            locations: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "FunctionExpression",
                        "params": [],
                        "body": {
                            "type": "BlockStatement",
                            "body": [
                                {
                                    "type": "ExpressionStatement",
                                    "expression": {
                                        "type": "AssignmentExpression",
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
                                                                "computed": false,
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "x",
                                                                    "start": 21,
                                                                    "end": 22,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 1,
                                                                            "column": 21
                                                                        },
                                                                        "end": {
                                                                            "line": 1,
                                                                            "column": 22
                                                                        }
                                                                    }
                                                                },
                                                                "kind": "init",
                                                                "method": false,
                                                                "shorthand": true,
                                                                "value": {
                                                                    "type": "AssignmentPattern",
                                                                    "left": {
                                                                        "type": "Identifier",
                                                                        "name": "x",
                                                                        "start": 21,
                                                                        "end": 22,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 1,
                                                                                "column": 21
                                                                            },
                                                                            "end": {
                                                                                "line": 1,
                                                                                "column": 22
                                                                            }
                                                                        }
                                                                    },
                                                                    "right": {
                                                                        "type": "YieldExpression",
                                                                        "argument": null,
                                                                        "delegate": false,
                                                                        "start": 25,
                                                                        "end": 30,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 1,
                                                                                "column": 25
                                                                            },
                                                                            "end": {
                                                                                "line": 1,
                                                                                "column": 30
                                                                            }
                                                                        }
                                                                    },
                                                                    "start": 21,
                                                                    "end": 30,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 1,
                                                                            "column": 21
                                                                        },
                                                                        "end": {
                                                                            "line": 1,
                                                                            "column": 30
                                                                        }
                                                                    }
                                                                },
                                                                "start": 21,
                                                                "end": 30,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 1,
                                                                        "column": 21
                                                                    },
                                                                    "end": {
                                                                        "line": 1,
                                                                        "column": 30
                                                                    }
                                                                }
                                                            }
                                                        ],
                                                        "start": 19,
                                                        "end": 32,
                                                        "loc": {
                                                            "start": {
                                                                "line": 1,
                                                                "column": 19
                                                            },
                                                            "end": {
                                                                "line": 1,
                                                                "column": 32
                                                            }
                                                        }
                                                    },
                                                    "start": 16,
                                                    "end": 32,
                                                    "loc": {
                                                        "start": {
                                                            "line": 1,
                                                            "column": 16
                                                        },
                                                        "end": {
                                                            "line": 1,
                                                            "column": 32
                                                        }
                                                    }
                                                }
                                            ],
                                            "start": 15,
                                            "end": 33,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 15
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 33
                                                }
                                            }
                                        },
                                        "operator": "=",
                                        "right": {
                                            "type": "Literal",
                                            "value": 0,
                                            "start": 36,
                                            "end": 37,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 36
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 37
                                                }
                                            },
                                            "raw": "0"
                                        },
                                        "start": 15,
                                        "end": 37,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 15
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 37
                                            }
                                        }
                                    },
                                    "start": 15,
                                    "end": 38,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 15
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 38
                                        }
                                    }
                                }
                            ],
                            "start": 13,
                            "end": 40,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 13
                                },
                                "end": {
                                    "line": 1,
                                    "column": 40
                                }
                            }
                        },
                        "async": false,
                        "generator": true,
                        "expression": false,
                        "id": null,
                        "start": 1,
                        "end": 40,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 1
                            },
                            "end": {
                                "line": 1,
                                "column": 40
                            }
                        }
                    },
                    "start": 0,
                    "end": 41,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 41
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 41,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 41
                }
            }
        });
    });

});