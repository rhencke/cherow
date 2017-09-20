import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Espressions - binary', () => {

    it('should parse "x + y + z"', () => {
        expect(parseScript('x + y + z')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "operator": "+",
                    "left": {
                        "type": "BinaryExpression",
                        "operator": "+",
                        "left": {
                            "type": "Identifier",
                            "name": "x"
                        },
                        "right": {
                            "type": "Identifier",
                            "name": "y"
                        }
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "z"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "x - y + z"', () => {
        expect(parseScript('x - y + z', {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 9,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 9,
                "expression": {
                  "type": "BinaryExpression",
                  "start": 0,
                  "end": 9,
                  "left": {
                    "type": "BinaryExpression",
                    "start": 0,
                    "end": 5,
                    "left": {
                      "type": "Identifier",
                      "start": 0,
                      "end": 1,
                      "name": "x"
                    },
                    "operator": "-",
                    "right": {
                      "type": "Identifier",
                      "start": 4,
                      "end": 5,
                      "name": "y"
                    }
                  },
                  "operator": "+",
                  "right": {
                    "type": "Identifier",
                    "start": 8,
                    "end": 9,
                    "name": "z"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "a < !(--b)"', () => {
        expect(parseModule('a < !(--b)', {
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 10,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 10,
                "expression": {
                  "type": "BinaryExpression",
                  "start": 0,
                  "end": 10,
                  "left": {
                    "type": "Identifier",
                    "start": 0,
                    "end": 1,
                    "name": "a"
                  },
                  "operator": "<",
                  "right": {
                    "type": "UnaryExpression",
                    "start": 4,
                    "end": 10,
                    "operator": "!",
                    "prefix": true,
                    "argument": {
                      "type": "UpdateExpression",
                      "start": 6,
                      "end": 9,
                      "operator": "--",
                      "prefix": true,
                      "argument": {
                        "type": "Identifier",
                        "start": 8,
                        "end": 9,
                        "name": "b"
                      }
                    }
                  }
                }
              }
            ],
            "sourceType": "module"
          });
    });
    it('should parse "x - y + z"', () => {
        expect(parseModule('1 <!--b')).to.eql({
              "body": [
                {
                  "expression": {
                    "left": {
                     "type": "Literal",
                      "value": 1,
                    },
                   "operator": "<",
                    "right": {
                      "argument": {
                        "argument": {
                          "name": "b",
                          "type": "Identifier"
                        },
                        "operator": "--",
                        "prefix": true,
                        "type": "UpdateExpression"
                      },
                      "operator": "!",
                      "prefix": true,
                      "type": "UnaryExpression"
                    },
                    "type": "BinaryExpression"
                  },
                  "type": "ExpressionStatement"
                }
              ],
              "sourceType": "module",
              "type": "Program"
            });
    });

    it('should parse "x + y - z"', () => {
        expect(parseScript('x + y - z')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "operator": "-",
                    "left": {
                        "type": "BinaryExpression",
                        "operator": "+",
                        "left": {
                            "type": "Identifier",
                            "name": "x"
                        },
                        "right": {
                            "type": "Identifier",
                            "name": "y"
                        }
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "z"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "x - y - z"', () => {
        expect(parseScript('x - y - z')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "operator": "-",
                    "left": {
                        "type": "BinaryExpression",
                        "operator": "-",
                        "left": {
                            "type": "Identifier",
                            "name": "x"
                        },
                        "right": {
                            "type": "Identifier",
                            "name": "y"
                        }
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "z"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "x + y * z"', () => {
        expect(parseScript('x + y * z')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "operator": "+",
                    "left": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "right": {
                        "type": "BinaryExpression",
                        "operator": "*",
                        "left": {
                            "type": "Identifier",
                            "name": "y"
                        },
                        "right": {
                            "type": "Identifier",
                            "name": "z"
                        }
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "x + y / z"', () => {
        expect(parseScript('x + y / z')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "operator": "+",
                    "left": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "right": {
                        "type": "BinaryExpression",
                        "operator": "/",
                        "left": {
                            "type": "Identifier",
                            "name": "y"
                        },
                        "right": {
                            "type": "Identifier",
                            "name": "z"
                        }
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "x - y % z"', () => {
        expect(parseScript('x - y % z')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "operator": "-",
                    "left": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "right": {
                        "type": "BinaryExpression",
                        "operator": "%",
                        "left": {
                            "type": "Identifier",
                            "name": "y"
                        },
                        "right": {
                            "type": "Identifier",
                            "name": "z"
                        }
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "x * y * z"', () => {
        expect(parseScript('x * y * z')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "operator": "*",
                    "left": {
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
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "z"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "x * y / z"', () => {
        expect(parseScript('x * y / z')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "operator": "/",
                    "left": {
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
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "z"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "x * y % z"', () => {
        expect(parseScript('x * y % z')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "operator": "%",
                    "left": {
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
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "z"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "x % y * z"', () => {
        expect(parseScript('x % y * z')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "operator": "*",
                    "left": {
                        "type": "BinaryExpression",
                        "operator": "%",
                        "left": {
                            "type": "Identifier",
                            "name": "x"
                        },
                        "right": {
                            "type": "Identifier",
                            "name": "y"
                        }
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "z"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "x << y << z"', () => {
        expect(parseScript('x << y << z')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "operator": "<<",
                    "left": {
                        "type": "BinaryExpression",
                        "operator": "<<",
                        "left": {
                            "type": "Identifier",
                            "name": "x"
                        },
                        "right": {
                            "type": "Identifier",
                            "name": "y"
                        }
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "z"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "x | y | z"', () => {
        expect(parseScript('x | y | z')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "operator": "|",
                    "left": {
                        "type": "BinaryExpression",
                        "operator": "|",
                        "left": {
                            "type": "Identifier",
                            "name": "x"
                        },
                        "right": {
                            "type": "Identifier",
                            "name": "y"
                        }
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "z"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "x & y & z"', () => {
        expect(parseScript('x & y & z')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "operator": "&",
                    "left": {
                        "type": "BinaryExpression",
                        "operator": "&",
                        "left": {
                            "type": "Identifier",
                            "name": "x"
                        },
                        "right": {
                            "type": "Identifier",
                            "name": "y"
                        }
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "z"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "x ^ y ^ z"', () => {
        expect(parseScript('x ^ y ^ z')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "operator": "^",
                    "left": {
                        "type": "BinaryExpression",
                        "operator": "^",
                        "left": {
                            "type": "Identifier",
                            "name": "x"
                        },
                        "right": {
                            "type": "Identifier",
                            "name": "y"
                        }
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "z"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "x & y | z"', () => {
        expect(parseScript('x & y | z')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "operator": "|",
                    "left": {
                        "type": "BinaryExpression",
                        "operator": "&",
                        "left": {
                            "type": "Identifier",
                            "name": "x"
                        },
                        "right": {
                            "type": "Identifier",
                            "name": "y"
                        }
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "z"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "x | y ^ z"', () => {
        expect(parseScript('x | y ^ z')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "operator": "|",
                    "left": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "right": {
                        "type": "BinaryExpression",
                        "operator": "^",
                        "left": {
                            "type": "Identifier",
                            "name": "y"
                        },
                        "right": {
                            "type": "Identifier",
                            "name": "z"
                        }
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "x | y & z"', () => {
        expect(parseScript('x | y & z')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "operator": "|",
                    "left": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "right": {
                        "type": "BinaryExpression",
                        "operator": "&",
                        "left": {
                            "type": "Identifier",
                            "name": "y"
                        },
                        "right": {
                            "type": "Identifier",
                            "name": "z"
                        }
                    }
                }
            }],
            "sourceType": "script"
        });
    });

});