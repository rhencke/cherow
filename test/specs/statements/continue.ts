import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Statement - Continue', () => {

    it('should fail if appearing of continue without an iteration statement', () => {
        expect(() => {
            parseScript(`var x=1;
            continue;
            var y=2;`);
        }).to.throw();
    });

    it('should parse labeled continue', () => {
        expect(parseScript(`label: for (let x = 0; x < 10;) {
            while (true) {
              x++;
              continue label;
            }
          }`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 135,
          "loc": {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 6,
              "column": 11
            }
          },
          "body": [
            {
              "type": "LabeledStatement",
              "start": 0,
              "end": 135,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 6,
                  "column": 11
                }
              },
              "body": {
                "type": "ForStatement",
                "start": 7,
                "end": 135,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 7
                  },
                  "end": {
                    "line": 6,
                    "column": 11
                  }
                },
                "init": {
                  "type": "VariableDeclaration",
                  "start": 12,
                  "end": 21,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 12
                    },
                    "end": {
                      "line": 1,
                      "column": 21
                    }
                  },
                  "declarations": [
                    {
                      "type": "VariableDeclarator",
                      "start": 16,
                      "end": 21,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 16
                        },
                        "end": {
                          "line": 1,
                          "column": 21
                        }
                      },
                      "id": {
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
                      "init": {
                        "type": "Literal",
                        "start": 20,
                        "end": 21,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 20
                          },
                          "end": {
                            "line": 1,
                            "column": 21
                          }
                        },
                        "value": 0,
                        "raw": "0"
                      }
                    }
                  ],
                  "kind": "let"
                },
                "test": {
                  "type": "BinaryExpression",
                  "start": 23,
                  "end": 29,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 23
                    },
                    "end": {
                      "line": 1,
                      "column": 29
                    }
                  },
                  "left": {
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
                    "name": "x"
                  },
                  "operator": "<",
                  "right": {
                    "type": "Literal",
                    "start": 27,
                    "end": 29,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 27
                      },
                      "end": {
                        "line": 1,
                        "column": 29
                      }
                    },
                    "value": 10,
                    "raw": "10"
                  }
                },
                "update": null,
                "body": {
                  "type": "BlockStatement",
                  "start": 32,
                  "end": 135,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 32
                    },
                    "end": {
                      "line": 6,
                      "column": 11
                    }
                  },
                  "body": [
                    {
                      "type": "WhileStatement",
                      "start": 46,
                      "end": 123,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 12
                        },
                        "end": {
                          "line": 5,
                          "column": 13
                        }
                      },
                      "test": {
                        "type": "Literal",
                        "start": 53,
                        "end": 57,
                        "loc": {
                          "start": {
                            "line": 2,
                            "column": 19
                          },
                          "end": {
                            "line": 2,
                            "column": 23
                          }
                        },
                        "value": true,
                        "raw": "true"
                      },
                      "body": {
                        "type": "BlockStatement",
                        "start": 59,
                        "end": 123,
                        "loc": {
                          "start": {
                            "line": 2,
                            "column": 25
                          },
                          "end": {
                            "line": 5,
                            "column": 13
                          }
                        },
                        "body": [
                          {
                            "type": "ExpressionStatement",
                            "start": 75,
                            "end": 79,
                            "loc": {
                              "start": {
                                "line": 3,
                                "column": 14
                              },
                              "end": {
                                "line": 3,
                                "column": 18
                              }
                            },
                            "expression": {
                              "type": "UpdateExpression",
                              "start": 75,
                              "end": 78,
                              "loc": {
                                "start": {
                                  "line": 3,
                                  "column": 14
                                },
                                "end": {
                                  "line": 3,
                                  "column": 17
                                }
                              },
                              "operator": "++",
                              "prefix": false,
                              "argument": {
                                "type": "Identifier",
                                "start": 75,
                                "end": 76,
                                "loc": {
                                  "start": {
                                    "line": 3,
                                    "column": 14
                                  },
                                  "end": {
                                    "line": 3,
                                    "column": 15
                                  }
                                },
                                "name": "x"
                              }
                            }
                          },
                          {
                            "type": "ContinueStatement",
                            "start": 94,
                            "end": 109,
                            "loc": {
                              "start": {
                                "line": 4,
                                "column": 14
                              },
                              "end": {
                                "line": 4,
                                "column": 29
                              }
                            },
                            "label": {
                              "type": "Identifier",
                              "start": 103,
                              "end": 108,
                              "loc": {
                                "start": {
                                  "line": 4,
                                  "column": 23
                                },
                                "end": {
                                  "line": 4,
                                  "column": 28
                                }
                              },
                              "name": "label"
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              "label": {
                "type": "Identifier",
                "start": 0,
                "end": 5,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 5
                  }
                },
                "name": "label"
              }
            }
          ],
          "sourceType": "script"
        });
    });

    it('should parse nested let bound for loops inner contunue', () => {
        expect(parseScript(`for (let x = 0; x < 10;) {
            x++;
            for (let y = 0; y < 2;) {
              y++;
              continue;
            }
          }`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 150,
          "loc": {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 7,
              "column": 11
            }
          },
          "body": [
            {
              "type": "ForStatement",
              "start": 0,
              "end": 150,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 7,
                  "column": 11
                }
              },
              "init": {
                "type": "VariableDeclaration",
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
                "declarations": [
                  {
                    "type": "VariableDeclarator",
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
                    "id": {
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
                      "name": "x"
                    },
                    "init": {
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
                ],
                "kind": "let"
              },
              "test": {
                "type": "BinaryExpression",
                "start": 16,
                "end": 22,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 16
                  },
                  "end": {
                    "line": 1,
                    "column": 22
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
                "operator": "<",
                "right": {
                  "type": "Literal",
                  "start": 20,
                  "end": 22,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 20
                    },
                    "end": {
                      "line": 1,
                      "column": 22
                    }
                  },
                  "value": 10,
                  "raw": "10"
                }
              },
              "update": null,
              "body": {
                "type": "BlockStatement",
                "start": 25,
                "end": 150,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 25
                  },
                  "end": {
                    "line": 7,
                    "column": 11
                  }
                },
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 39,
                    "end": 43,
                    "loc": {
                      "start": {
                        "line": 2,
                        "column": 12
                      },
                      "end": {
                        "line": 2,
                        "column": 16
                      }
                    },
                    "expression": {
                      "type": "UpdateExpression",
                      "start": 39,
                      "end": 42,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 12
                        },
                        "end": {
                          "line": 2,
                          "column": 15
                        }
                      },
                      "operator": "++",
                      "prefix": false,
                      "argument": {
                        "type": "Identifier",
                        "start": 39,
                        "end": 40,
                        "loc": {
                          "start": {
                            "line": 2,
                            "column": 12
                          },
                          "end": {
                            "line": 2,
                            "column": 13
                          }
                        },
                        "name": "x"
                      }
                    }
                  },
                  {
                    "type": "ForStatement",
                    "start": 56,
                    "end": 138,
                    "loc": {
                      "start": {
                        "line": 3,
                        "column": 12
                      },
                      "end": {
                        "line": 6,
                        "column": 13
                      }
                    },
                    "init": {
                      "type": "VariableDeclaration",
                      "start": 61,
                      "end": 70,
                      "loc": {
                        "start": {
                          "line": 3,
                          "column": 17
                        },
                        "end": {
                          "line": 3,
                          "column": 26
                        }
                      },
                      "declarations": [
                        {
                          "type": "VariableDeclarator",
                          "start": 65,
                          "end": 70,
                          "loc": {
                            "start": {
                              "line": 3,
                              "column": 21
                            },
                            "end": {
                              "line": 3,
                              "column": 26
                            }
                          },
                          "id": {
                            "type": "Identifier",
                            "start": 65,
                            "end": 66,
                            "loc": {
                              "start": {
                                "line": 3,
                                "column": 21
                              },
                              "end": {
                                "line": 3,
                                "column": 22
                              }
                            },
                            "name": "y"
                          },
                          "init": {
                            "type": "Literal",
                            "start": 69,
                            "end": 70,
                            "loc": {
                              "start": {
                                "line": 3,
                                "column": 25
                              },
                              "end": {
                                "line": 3,
                                "column": 26
                              }
                            },
                            "value": 0,
                            "raw": "0"
                          }
                        }
                      ],
                      "kind": "let"
                    },
                    "test": {
                      "type": "BinaryExpression",
                      "start": 72,
                      "end": 77,
                      "loc": {
                        "start": {
                          "line": 3,
                          "column": 28
                        },
                        "end": {
                          "line": 3,
                          "column": 33
                        }
                      },
                      "left": {
                        "type": "Identifier",
                        "start": 72,
                        "end": 73,
                        "loc": {
                          "start": {
                            "line": 3,
                            "column": 28
                          },
                          "end": {
                            "line": 3,
                            "column": 29
                          }
                        },
                        "name": "y"
                      },
                      "operator": "<",
                      "right": {
                        "type": "Literal",
                        "start": 76,
                        "end": 77,
                        "loc": {
                          "start": {
                            "line": 3,
                            "column": 32
                          },
                          "end": {
                            "line": 3,
                            "column": 33
                          }
                        },
                        "value": 2,
                        "raw": "2"
                      }
                    },
                    "update": null,
                    "body": {
                      "type": "BlockStatement",
                      "start": 80,
                      "end": 138,
                      "loc": {
                        "start": {
                          "line": 3,
                          "column": 36
                        },
                        "end": {
                          "line": 6,
                          "column": 13
                        }
                      },
                      "body": [
                        {
                          "type": "ExpressionStatement",
                          "start": 96,
                          "end": 100,
                          "loc": {
                            "start": {
                              "line": 4,
                              "column": 14
                            },
                            "end": {
                              "line": 4,
                              "column": 18
                            }
                          },
                          "expression": {
                            "type": "UpdateExpression",
                            "start": 96,
                            "end": 99,
                            "loc": {
                              "start": {
                                "line": 4,
                                "column": 14
                              },
                              "end": {
                                "line": 4,
                                "column": 17
                              }
                            },
                            "operator": "++",
                            "prefix": false,
                            "argument": {
                              "type": "Identifier",
                              "start": 96,
                              "end": 97,
                              "loc": {
                                "start": {
                                  "line": 4,
                                  "column": 14
                                },
                                "end": {
                                  "line": 4,
                                  "column": 15
                                }
                              },
                              "name": "y"
                            }
                          }
                        },
                        {
                          "type": "ContinueStatement",
                          "start": 115,
                          "end": 124,
                          "loc": {
                            "start": {
                              "line": 5,
                              "column": 14
                            },
                            "end": {
                              "line": 5,
                              "column": 23
                            }
                          },
                          "label": null
                        }
                      ]
                    }
                  }
                ]
              }
            }
          ],
          "sourceType": "script"
        });
    });

    it('should parse nested let bound for loops outer continue', () => {
        expect(parseScript(`for (let x = 0; x < 10;) {
            x++;
            for (let y = 0; y < 2;) {
              y++;
            }
            continue;
          }`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 148,
          "loc": {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 7,
              "column": 11
            }
          },
          "body": [
            {
              "type": "ForStatement",
              "start": 0,
              "end": 148,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 7,
                  "column": 11
                }
              },
              "init": {
                "type": "VariableDeclaration",
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
                "declarations": [
                  {
                    "type": "VariableDeclarator",
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
                    "id": {
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
                      "name": "x"
                    },
                    "init": {
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
                ],
                "kind": "let"
              },
              "test": {
                "type": "BinaryExpression",
                "start": 16,
                "end": 22,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 16
                  },
                  "end": {
                    "line": 1,
                    "column": 22
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
                "operator": "<",
                "right": {
                  "type": "Literal",
                  "start": 20,
                  "end": 22,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 20
                    },
                    "end": {
                      "line": 1,
                      "column": 22
                    }
                  },
                  "value": 10,
                  "raw": "10"
                }
              },
              "update": null,
              "body": {
                "type": "BlockStatement",
                "start": 25,
                "end": 148,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 25
                  },
                  "end": {
                    "line": 7,
                    "column": 11
                  }
                },
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 39,
                    "end": 43,
                    "loc": {
                      "start": {
                        "line": 2,
                        "column": 12
                      },
                      "end": {
                        "line": 2,
                        "column": 16
                      }
                    },
                    "expression": {
                      "type": "UpdateExpression",
                      "start": 39,
                      "end": 42,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 12
                        },
                        "end": {
                          "line": 2,
                          "column": 15
                        }
                      },
                      "operator": "++",
                      "prefix": false,
                      "argument": {
                        "type": "Identifier",
                        "start": 39,
                        "end": 40,
                        "loc": {
                          "start": {
                            "line": 2,
                            "column": 12
                          },
                          "end": {
                            "line": 2,
                            "column": 13
                          }
                        },
                        "name": "x"
                      }
                    }
                  },
                  {
                    "type": "ForStatement",
                    "start": 56,
                    "end": 114,
                    "loc": {
                      "start": {
                        "line": 3,
                        "column": 12
                      },
                      "end": {
                        "line": 5,
                        "column": 13
                      }
                    },
                    "init": {
                      "type": "VariableDeclaration",
                      "start": 61,
                      "end": 70,
                      "loc": {
                        "start": {
                          "line": 3,
                          "column": 17
                        },
                        "end": {
                          "line": 3,
                          "column": 26
                        }
                      },
                      "declarations": [
                        {
                          "type": "VariableDeclarator",
                          "start": 65,
                          "end": 70,
                          "loc": {
                            "start": {
                              "line": 3,
                              "column": 21
                            },
                            "end": {
                              "line": 3,
                              "column": 26
                            }
                          },
                          "id": {
                            "type": "Identifier",
                            "start": 65,
                            "end": 66,
                            "loc": {
                              "start": {
                                "line": 3,
                                "column": 21
                              },
                              "end": {
                                "line": 3,
                                "column": 22
                              }
                            },
                            "name": "y"
                          },
                          "init": {
                            "type": "Literal",
                            "start": 69,
                            "end": 70,
                            "loc": {
                              "start": {
                                "line": 3,
                                "column": 25
                              },
                              "end": {
                                "line": 3,
                                "column": 26
                              }
                            },
                            "value": 0,
                            "raw": "0"
                          }
                        }
                      ],
                      "kind": "let"
                    },
                    "test": {
                      "type": "BinaryExpression",
                      "start": 72,
                      "end": 77,
                      "loc": {
                        "start": {
                          "line": 3,
                          "column": 28
                        },
                        "end": {
                          "line": 3,
                          "column": 33
                        }
                      },
                      "left": {
                        "type": "Identifier",
                        "start": 72,
                        "end": 73,
                        "loc": {
                          "start": {
                            "line": 3,
                            "column": 28
                          },
                          "end": {
                            "line": 3,
                            "column": 29
                          }
                        },
                        "name": "y"
                      },
                      "operator": "<",
                      "right": {
                        "type": "Literal",
                        "start": 76,
                        "end": 77,
                        "loc": {
                          "start": {
                            "line": 3,
                            "column": 32
                          },
                          "end": {
                            "line": 3,
                            "column": 33
                          }
                        },
                        "value": 2,
                        "raw": "2"
                      }
                    },
                    "update": null,
                    "body": {
                      "type": "BlockStatement",
                      "start": 80,
                      "end": 114,
                      "loc": {
                        "start": {
                          "line": 3,
                          "column": 36
                        },
                        "end": {
                          "line": 5,
                          "column": 13
                        }
                      },
                      "body": [
                        {
                          "type": "ExpressionStatement",
                          "start": 96,
                          "end": 100,
                          "loc": {
                            "start": {
                              "line": 4,
                              "column": 14
                            },
                            "end": {
                              "line": 4,
                              "column": 18
                            }
                          },
                          "expression": {
                            "type": "UpdateExpression",
                            "start": 96,
                            "end": 99,
                            "loc": {
                              "start": {
                                "line": 4,
                                "column": 14
                              },
                              "end": {
                                "line": 4,
                                "column": 17
                              }
                            },
                            "operator": "++",
                            "prefix": false,
                            "argument": {
                              "type": "Identifier",
                              "start": 96,
                              "end": 97,
                              "loc": {
                                "start": {
                                  "line": 4,
                                  "column": 14
                                },
                                "end": {
                                  "line": 4,
                                  "column": 15
                                }
                              },
                              "name": "y"
                            }
                          }
                        }
                      ]
                    }
                  },
                  {
                    "type": "ContinueStatement",
                    "start": 127,
                    "end": 136,
                    "loc": {
                      "start": {
                        "line": 6,
                        "column": 12
                      },
                      "end": {
                        "line": 6,
                        "column": 21
                      }
                    },
                    "label": null
                  }
                ]
              }
            }
          ],
          "sourceType": "script"
        });
    });

    it('should parse no label continue', () => {
        expect(parseScript(`for (let x = 0; x < 10;) {
            x++;
            continue;
          }`, {
            ranges: true,
            raw: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 77,
          "body": [
            {
              "type": "ForStatement",
              "start": 0,
              "end": 77,
              "init": {
                "type": "VariableDeclaration",
                "start": 5,
                "end": 14,
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 9,
                    "end": 14,
                    "id": {
                      "type": "Identifier",
                      "start": 9,
                      "end": 10,
                      "name": "x"
                    },
                    "init": {
                      "type": "Literal",
                      "start": 13,
                      "end": 14,
                      "value": 0,
                      "raw": "0"
                    }
                  }
                ],
                "kind": "let"
              },
              "test": {
                "type": "BinaryExpression",
                "start": 16,
                "end": 22,
                "left": {
                  "type": "Identifier",
                  "start": 16,
                  "end": 17,
                  "name": "x"
                },
                "operator": "<",
                "right": {
                  "type": "Literal",
                  "start": 20,
                  "end": 22,
                  "value": 10,
                  "raw": "10"
                }
              },
              "update": null,
              "body": {
                "type": "BlockStatement",
                "start": 25,
                "end": 77,
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 39,
                    "end": 43,
                    "expression": {
                      "type": "UpdateExpression",
                      "start": 39,
                      "end": 42,
                      "operator": "++",
                      "prefix": false,
                      "argument": {
                        "type": "Identifier",
                        "start": 39,
                        "end": 40,
                        "name": "x"
                      }
                    }
                  },
                  {
                    "type": "ContinueStatement",
                    "start": 56,
                    "end": 65,
                    "label": null
                  }
                ]
              }
            }
          ],
          "sourceType": "script"
        });
    });

    it('should shadowing loop variable in same scope as continue', () => {
        expect(parseScript(`for (let x = 0; x < 10;) {
            x++;
            {
              let x = "hello";
              continue;
            }
          }`, {
            ranges: true,
            raw: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 138,
          "body": [
            {
              "type": "ForStatement",
              "start": 0,
              "end": 138,
              "init": {
                "type": "VariableDeclaration",
                "start": 5,
                "end": 14,
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 9,
                    "end": 14,
                    "id": {
                      "type": "Identifier",
                      "start": 9,
                      "end": 10,
                      "name": "x"
                    },
                    "init": {
                      "type": "Literal",
                      "start": 13,
                      "end": 14,
                      "value": 0,
                      "raw": "0"
                    }
                  }
                ],
                "kind": "let"
              },
              "test": {
                "type": "BinaryExpression",
                "start": 16,
                "end": 22,
                "left": {
                  "type": "Identifier",
                  "start": 16,
                  "end": 17,
                  "name": "x"
                },
                "operator": "<",
                "right": {
                  "type": "Literal",
                  "start": 20,
                  "end": 22,
                  "value": 10,
                  "raw": "10"
                }
              },
              "update": null,
              "body": {
                "type": "BlockStatement",
                "start": 25,
                "end": 138,
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 39,
                    "end": 43,
                    "expression": {
                      "type": "UpdateExpression",
                      "start": 39,
                      "end": 42,
                      "operator": "++",
                      "prefix": false,
                      "argument": {
                        "type": "Identifier",
                        "start": 39,
                        "end": 40,
                        "name": "x"
                      }
                    }
                  },
                  {
                    "type": "BlockStatement",
                    "start": 56,
                    "end": 126,
                    "body": [
                      {
                        "type": "VariableDeclaration",
                        "start": 72,
                        "end": 88,
                        "declarations": [
                          {
                            "type": "VariableDeclarator",
                            "start": 76,
                            "end": 87,
                            "id": {
                              "type": "Identifier",
                              "start": 76,
                              "end": 77,
                              "name": "x"
                            },
                            "init": {
                              "type": "Literal",
                              "start": 80,
                              "end": 87,
                              "value": "hello",
                              "raw": "\"hello\""
                            }
                          }
                        ],
                        "kind": "let"
                      },
                      {
                        "type": "ContinueStatement",
                        "start": 103,
                        "end": 112,
                        "label": null
                      }
                    ]
                  }
                ]
              }
            }
          ],
          "sourceType": "script"
        });
    });

    it('should parse while (true) { continue; }', () => {
        expect(parseScript('while (true) { continue; }', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 26,
            "body": [{
                "type": "WhileStatement",
                "start": 0,
                "end": 26,
                "test": {
                    "type": "Literal",
                    "start": 7,
                    "end": 11,
                    "value": true,
                    "raw": "true"
                },
                "body": {
                    "type": "BlockStatement",
                    "start": 13,
                    "end": 26,
                    "body": [{
                        "type": "ContinueStatement",
                        "start": 15,
                        "end": 24,
                        "label": null
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse done: while (true) { continue done }', () => {
        expect(parseScript('done: while (true) { continue done }', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 36,
            "body": [{
                "type": "LabeledStatement",
                "start": 0,
                "end": 36,
                "body": {
                    "type": "WhileStatement",
                    "start": 6,
                    "end": 36,
                    "test": {
                        "type": "Literal",
                        "start": 13,
                        "end": 17,
                        "value": true,
                        "raw": "true"
                    },
                    "body": {
                        "type": "BlockStatement",
                        "start": 19,
                        "end": 36,
                        "body": [{
                            "type": "ContinueStatement",
                            "start": 21,
                            "end": 34,
                            "label": {
                                "type": "Identifier",
                                "start": 30,
                                "end": 34,
                                "name": "done"
                            }
                        }]
                    }
                },
                "label": {
                    "type": "Identifier",
                    "start": 0,
                    "end": 4,
                    "name": "done"
                }
            }],
            "sourceType": "script"
        });
    });


    it('should parse "a: do continue a; while(1);"', () => {
      expect(parseScript('a: do continue a; while(1);', {
          ranges: true,
          raw: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 27,
        "body": [
          {
            "type": "LabeledStatement",
            "start": 0,
            "end": 27,
            "body": {
              "type": "DoWhileStatement",
              "start": 3,
              "end": 27,
              "body": {
                "type": "ContinueStatement",
                "start": 6,
                "end": 17,
                "label": {
                  "type": "Identifier",
                  "start": 15,
                  "end": 16,
                  "name": "a"
                }
              },
              "test": {
                "type": "Literal",
                "start": 24,
                "end": 25,
                "value": 1,
                "raw": "1"
              }
            },
            "label": {
              "type": "Identifier",
              "start": 0,
              "end": 1,
              "name": "a"
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse "a: while (0) { continue \r b; }"', () => {
      expect(parseScript('a: while (0) { continue \r b; }', {
          ranges: true,
          raw: true
      })).to.eql({
          "body": [
            {
              "body": {
               "body": {
                  "body": [
                    {
                     "end": 23,
                      "label": null,
                     "start": 15,
                      "type": "ContinueStatement"
                    },
                    {
                      "end": 28,
                      "expression": {
                        "end": 27,
                        "name": "b",
                        "start": 26,
                        "type": "Identifier"
                      },
                      "start": 26,
                      "type": "ExpressionStatement"
                    }
                  ],
                  "end": 30,
                  "start": 13,
                 "type": "BlockStatement"
                },
               "end": 30,
                "start": 3,
                "test": {
                  "end": 11,
                  "raw": "0",
                  "start": 10,
                  "type": "Literal",
                  "value": 0,
                },
                "type": "WhileStatement"
              },
              "end": 30,
             "label": {
                "end": 1,
                "name": "a",
                "start": 0,
                "type": "Identifier"
              },
              "start": 0,
              "type": "LabeledStatement"
            },
         ],
         "end": 30,
          "sourceType": "script",
          "start": 0,
          "type": "Program",
        });
    });

    it('should parse "a: while (0) { continue /*\r*/ b; }"', () => {
      expect(parseScript('a: while (0) { continue /*\r*/ b; }', {
          ranges: true,
          raw: true
      })).to.eql({
          "body": [
            {
              "body": {
                "body": {
                  "body": [
                    {
                      "end": 23,
                      "label": null,
                      "start": 15,
                      "type": "ContinueStatement"
                    },
                    {
                      "end": 32,
                      "expression": {
                        "end": 31,
                        "name": "b",
                        "start": 30,
                        "type": "Identifier"
                      },
                      "start": 30,
                     "type": "ExpressionStatement"
                    }
                  ],
                  "end": 34,
                  "start": 13,
                  "type": "BlockStatement"
                },
                "end": 34,
                "start": 3,
                "test": {
                  "end": 11,
                  "raw": "0",
                  "start": 10,
                  "type": "Literal",
                  "value": 0,
                },
                "type": "WhileStatement"
              },
              "end": 34,
              "label": {
                "end": 1,
                "name": "a",
                "start": 0,
                "type": "Identifier"
              },
              "start": 0,
              "type": "LabeledStatement"
            }
          ],
          "end": 34,
         "sourceType": "script",
          "start": 0,
          "type": "Program"
        });
    });

    it('should parse "a: while (0) { continue /*\u2028*/ b; }"', () => {
      expect(parseScript('a: while (0) { continue /*\u2028*/ b; }', {
          ranges: true,
          raw: true
      })).to.eql({
          "body": [
            {
              "body": {
                "body": {
                  "body": [
                   {
                      "end": 23,
                      "label": null,
                      "start": 15,
                      "type": "ContinueStatement"
                    },
                    {
                      "end": 32,
                      "expression": {
                        "end": 31,
                        "name": "b",
                        "start": 30,
                        "type": "Identifier"
                      },
                      "start": 30,
                     "type": "ExpressionStatement"
                    }
                  ],
                  "end": 34,
                  "start": 13,
                  "type": "BlockStatement"
               },
                "end": 34,
                "start": 3,
                "test": {
                  "end": 11,
                  "raw": "0",
                  "start": 10,
                  "type": "Literal",
                  "value": 0,
                },
                "type": "WhileStatement"
              },
             "end": 34,
              "label": {
                "end": 1,
                "name": "a",
                "start": 0,
                "type": "Identifier"
              },
              "start": 0,
              "type": "LabeledStatement"
            }
          ],
          "end": 34,
         "sourceType": "script",
          "start": 0,
          "type": "Program"
        });
    });

    it('should parse __proto__: while (true) { continue __proto__; }', () => {
        expect(parseScript('__proto__: while (true) { continue __proto__; }', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 47,
            "body": [{
                "type": "LabeledStatement",
                "start": 0,
                "end": 47,
                "body": {
                    "type": "WhileStatement",
                    "start": 11,
                    "end": 47,
                    "test": {
                        "type": "Literal",
                        "start": 18,
                        "end": 22,
                        "value": true,
                        "raw": "true"
                    },
                    "body": {
                        "type": "BlockStatement",
                        "start": 24,
                        "end": 47,
                        "body": [{
                            "type": "ContinueStatement",
                            "start": 26,
                            "end": 45,
                            "label": {
                                "type": "Identifier",
                                "start": 35,
                                "end": 44,
                                "name": "__proto__"
                            }
                        }]
                    }
                },
                "label": {
                    "type": "Identifier",
                    "start": 0,
                    "end": 9,
                    "name": "__proto__"
                }
            }],
            "sourceType": "script"
        });
    });
});