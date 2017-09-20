import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Module - Export', () => {

    it('should fail on invalid export batch missing from clause module', () => {
        expect(() => {
            parseModule(`export *`);
        }).to.throw();
    });

    it('should fail expression contain an `export` declaration', () => {
      expect(() => {
          parseModule(`(class { static *method() { export default null; } });`);
      }).to.throw();
  });

    it('should fail if statement cannot contain an `export` declaration', () => {
      expect(() => {
        parseModule(`{ export default null; }`);
    }).to.throw();
});

    it('should fail if statement cannot contain an `export` declaration ( do-while)', () => {
      expect(() => {
      parseModule(`do export default null; while (false)`);
  }).to.throw();
});

     it('should fail if statement cannot contain an `export` declaration ( for )', () => {
        expect(() => {
        parseModule(`for (const x = 0; false;) export default null;`);
      }).to.throw();
    });

    it('should fail if statement cannot contain an `export` declaration ( switch )', () => {
      expect(() => {
          parseModule(`switch(0) { case 1: export default null; default: }`);
      }).to.throw();
  });

    it('should fail if statement cannot contain an `export` declaration ( if )', () => {
      expect(() => {
          parseModule(`if (false) export default null;`);
      }).to.throw();
  });
  it('should fail if expressen  cannot contain an `export` declaration ( object literal )', () => {
    expect(() => {
        parseModule(`({ get m() { export default null; } });`);
    }).to.throw();
});

    it('should fail on invalid export default token module', () => {
        expect(() => {
            parseModule(`export {default} +`);
        }).to.throw();
    });

    it('should fail on invalid export module', () => {
        expect(() => {
            parseModule(`export default from "foo"`);
        }).to.throw();
    });

    it('should fail on invalid export default equal module', () => {
        expect(() => {
            parseModule(`export default = 42`);
        }).to.throw();
    });

    it('should export without being affected by function', () => {
      expect(parseModule(`function a() {}
      export { version };`, {
          ranges: true,
          raw: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 41,
        "body": [
          {
            "type": "FunctionDeclaration",
            "start": 0,
            "end": 15,
            "id": {
              "type": "Identifier",
              "start": 9,
              "end": 10,
              "name": "a"
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
            "type": "ExportNamedDeclaration",
            "start": 22,
            "end": 41,
            "declaration": null,
            "specifiers": [
              {
                "type": "ExportSpecifier",
                "start": 31,
                "end": 38,
                "local": {
                  "type": "Identifier",
                  "start": 31,
                  "end": 38,
                  "name": "version"
                },
                "exported": {
                  "type": "Identifier",
                  "start": 31,
                  "end": 38,
                  "name": "version"
                }
              }
            ],
            "source": null
          }
        ],
        "sourceType": "module"
      });
    });

    it('should export const number', () => {
        expect(parseModule(`export const foo = 1;`, {
            ranges: true,
            raw: true
        })).to.eql({
  "type": "Program",
  "start": 0,
  "end": 21,
  "body": [
    {
      "type": "ExportNamedDeclaration",
      "start": 0,
      "end": 21,
      "declaration": {
        "type": "VariableDeclaration",
        "start": 7,
        "end": 21,
        "declarations": [
          {
            "type": "VariableDeclarator",
            "start": 13,
            "end": 20,
            "id": {
              "type": "Identifier",
              "start": 13,
              "end": 16,
              "name": "foo"
            },
            "init": {
              "type": "Literal",
              "start": 19,
              "end": 20,
              "value": 1,
              "raw": "1"
            }
          }
        ],
        "kind": "const"
      },
      "specifiers": [],
      "source": null
    }
  ],
  "sourceType": "module"
});
    });


    it('should export default array', () => {
        expect(parseModule(`export default [];`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 18,
            "body": [
              {
                "type": "ExportDefaultDeclaration",
                "start": 0,
                "end": 18,
                "declaration": {
                  "type": "ArrayExpression",
                  "start": 15,
                  "end": 17,
                  "elements": []
                }
              }
            ],
            "sourceType": "module"
          });
    });

    it('should export default assignment module', () => {
        expect(parseModule(`export default a = 0;`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 21,
            "body": [
              {
                "type": "ExportDefaultDeclaration",
                "start": 0,
                "end": 21,
                "declaration": {
                  "type": "AssignmentExpression",
                  "start": 15,
                  "end": 20,
                  "operator": "=",
                  "left": {
                    "type": "Identifier",
                    "start": 15,
                    "end": 16,
                    "name": "a"
                  },
                  "right": {
                    "type": "Literal",
                    "start": 19,
                    "end": 20,
                    "value": 0,
                    "raw": "0"
                  }
                }
              }
            ],
            "sourceType": "module"
          });
    });

    it('should export default function', () => {
      expect(parseModule(`export default function() {};`, {
          ranges: true,
          raw: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 29,
        "body": [
          {
            "type": "ExportDefaultDeclaration",
            "start": 0,
            "end": 28,
            "declaration": {
              "type": "FunctionDeclaration",
              "start": 15,
              "end": 28,
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 26,
                "end": 28,
                "body": []
              }
            }
          },
          {
            "type": "EmptyStatement",
            "start": 28,
            "end": 29
          }
        ],
        "sourceType": "module"
      });
    });

    it('should export default class', () => {
        expect(parseModule(`export default class {};`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 24,
            "body": [
              {
                "type": "ExportDefaultDeclaration",
                "start": 0,
                "end": 23,
                "declaration": {
                  "type": "ClassDeclaration",
                  "start": 15,
                  "end": 23,
                  "id": null,
                  "superClass": null,
                  "body": {
                    "type": "ClassBody",
                    "start": 21,
                    "end": 23,
                    "body": []
                  }
                }
              },
              {
                "type": "EmptyStatement",
                "start": 23,
                "end": 24
              }
            ],
            "sourceType": "module"
          });
    });

    it('should export default expression', () => {
        expect(parseModule(`export default (1 + 2);`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 23,
            "body": [
              {
                "type": "ExportDefaultDeclaration",
                "start": 0,
                "end": 23,
                "declaration": {
                  "type": "BinaryExpression",
                  "start": 16,
                  "end": 21,
                  "left": {
                    "type": "Literal",
                    "start": 16,
                    "end": 17,
                    "value": 1,
                    "raw": "1"
                  },
                  "operator": "+",
                  "right": {
                    "type": "Literal",
                    "start": 20,
                    "end": 21,
                    "value": 2,
                    "raw": "2"
                  }
                }
              }
            ],
            "sourceType": "module"
          });
    });

    it('should export default function', () => {
        expect(parseModule(`export default function () {}`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 29,
            "body": [
              {
                "type": "ExportDefaultDeclaration",
                "start": 0,
                "end": 29,
                "declaration": {
                  "type": "FunctionDeclaration",
                  "start": 15,
                  "end": 29,
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 27,
                    "end": 29,
                    "body": []
                  }
                }
              }
            ],
            "sourceType": "module"
          });
    });

    it('should export default named class', () => {
        expect(parseModule(`export default class foo {}`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 27,
            "body": [
              {
                "type": "ExportDefaultDeclaration",
                "start": 0,
                "end": 27,
                "declaration": {
                  "type": "ClassDeclaration",
                  "start": 15,
                  "end": 27,
                  "id": {
                    "type": "Identifier",
                    "start": 21,
                    "end": 24,
                    "name": "foo"
                  },
                  "superClass": null,
                  "body": {
                    "type": "ClassBody",
                    "start": 25,
                    "end": 27,
                    "body": []
                  }
                }
              }
            ],
            "sourceType": "module"
          });
    });

    it('should export default named function', () => {
        expect(parseModule(`export default function foo() {}`, {
            ranges: true,
            raw: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 32,
          "body": [
            {
              "type": "ExportDefaultDeclaration",
              "start": 0,
              "end": 32,
              "declaration": {
                "type": "FunctionDeclaration",
                "start": 15,
                "end": 32,
                "id": {
                  "type": "Identifier",
                  "start": 24,
                  "end": 27,
                  "name": "foo"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 30,
                  "end": 32,
                  "body": []
                }
              }
            }
          ],
          "sourceType": "module"
        });
    });

    it('should export default number', () => {
        expect(parseModule(`export default 42;`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 18,
            "body": [
              {
                "type": "ExportDefaultDeclaration",
                "start": 0,
                "end": 18,
                "declaration": {
                  "type": "Literal",
                  "start": 15,
                  "end": 17,
                  "value": 42,
                  "raw": "42"
                }
              }
            ],
            "sourceType": "module"
          });
    });

    it('should export default object', () => {
        expect(parseModule(`export default { foo: 1 };`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 26,
            "body": [
              {
                "type": "ExportDefaultDeclaration",
                "start": 0,
                "end": 26,
                "declaration": {
                  "type": "ObjectExpression",
                  "start": 15,
                  "end": 25,
                  "properties": [
                    {
                      "type": "Property",
                      "start": 17,
                      "end": 23,
                      "method": false,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 17,
                        "end": 20,
                        "name": "foo"
                      },
                      "value": {
                        "type": "Literal",
                        "start": 22,
                        "end": 23,
                        "value": 1,
                        "raw": "1"
                      },
                      "kind": "init"
                    }
                  ]
                }
              }
            ],
            "sourceType": "module"
          });
    });

    it('should export export default value', () => {
        expect(parseModule(`export default foo;`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 19,
            "body": [
              {
                "type": "ExportDefaultDeclaration",
                "start": 0,
                "end": 19,
                "declaration": {
                  "type": "Identifier",
                  "start": 15,
                  "end": 18,
                  "name": "foo"
                }
              }
            ],
            "sourceType": "module"
          });
    });

    it('should export from batch', () => {
        expect(parseModule(`export * from "foo";`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 20,
            "body": [
              {
                "type": "ExportAllDeclaration",
                "start": 0,
                "end": 20,
                "source": {
                  "type": "Literal",
                  "start": 14,
                  "end": 19,
                  "value": "foo",
                  "raw": "\"foo\""
                }
              }
            ],
            "sourceType": "module"
          });
    });

    it('should export from default', () => {
        expect(parseModule(`export {default} from "foo";`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 28,
            "body": [
              {
                "type": "ExportNamedDeclaration",
                "start": 0,
                "end": 28,
                "declaration": null,
                "specifiers": [
                  {
                    "type": "ExportSpecifier",
                    "start": 8,
                    "end": 15,
                    "local": {
                      "type": "Identifier",
                      "start": 8,
                      "end": 15,
                      "name": "default"
                    },
                    "exported": {
                      "type": "Identifier",
                      "start": 8,
                      "end": 15,
                      "name": "default"
                    }
                  }
                ],
                "source": {
                  "type": "Literal",
                  "start": 22,
                  "end": 27,
                  "value": "foo",
                  "raw": "\"foo\""
                }
              }
            ],
            "sourceType": "module"
          });
    });

    it('should export from named as export', () => {
        expect(parseModule(`export {foo as default} from "foo";`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 35,
            "body": [
              {
                "type": "ExportNamedDeclaration",
                "start": 0,
                "end": 35,
                "declaration": null,
                "specifiers": [
                  {
                    "type": "ExportSpecifier",
                    "start": 8,
                    "end": 22,
                    "local": {
                      "type": "Identifier",
                      "start": 8,
                      "end": 11,
                      "name": "foo"
                    },
                    "exported": {
                      "type": "Identifier",
                      "start": 15,
                      "end": 22,
                      "name": "default"
                    }
                  }
                ],
                "source": {
                  "type": "Literal",
                  "start": 29,
                  "end": 34,
                  "value": "foo",
                  "raw": "\"foo\""
                }
              }
            ],
            "sourceType": "module"
          });
    });

    it('should export from named as specifier', () => {
        expect(parseModule(`export {foo as bar} from "foo";`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 31,
            "body": [
              {
                "type": "ExportNamedDeclaration",
                "start": 0,
                "end": 31,
                "declaration": null,
                "specifiers": [
                  {
                    "type": "ExportSpecifier",
                    "start": 8,
                    "end": 18,
                    "local": {
                      "type": "Identifier",
                      "start": 8,
                      "end": 11,
                      "name": "foo"
                    },
                    "exported": {
                      "type": "Identifier",
                      "start": 15,
                      "end": 18,
                      "name": "bar"
                    }
                  }
                ],
                "source": {
                  "type": "Literal",
                  "start": 25,
                  "end": 30,
                  "value": "foo",
                  "raw": "\"foo\""
                }
              }
            ],
            "sourceType": "module"
          });
    });

    it('should export from named as specifiers', () => {
        expect(parseModule(`export {foo as default, bar} from "foo";`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 40,
            "body": [
              {
                "type": "ExportNamedDeclaration",
                "start": 0,
                "end": 40,
                "declaration": null,
                "specifiers": [
                  {
                    "type": "ExportSpecifier",
                    "start": 8,
                    "end": 22,
                    "local": {
                      "type": "Identifier",
                      "start": 8,
                      "end": 11,
                      "name": "foo"
                    },
                    "exported": {
                      "type": "Identifier",
                      "start": 15,
                      "end": 22,
                      "name": "default"
                    }
                  },
                  {
                    "type": "ExportSpecifier",
                    "start": 24,
                    "end": 27,
                    "local": {
                      "type": "Identifier",
                      "start": 24,
                      "end": 27,
                      "name": "bar"
                    },
                    "exported": {
                      "type": "Identifier",
                      "start": 24,
                      "end": 27,
                      "name": "bar"
                    }
                  }
                ],
                "source": {
                  "type": "Literal",
                  "start": 34,
                  "end": 39,
                  "value": "foo",
                  "raw": "\"foo\""
                }
              }
            ],
            "sourceType": "module"
          });
    });

    it('should export function declaration with boolean', () => {
        expect(parseModule(`export function foo () {} false`, {
            ranges: true,
            raw: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 31,
          "body": [
            {
              "type": "ExportNamedDeclaration",
              "start": 0,
              "end": 25,
              "declaration": {
                "type": "FunctionDeclaration",
                "start": 7,
                "end": 25,
                "id": {
                  "type": "Identifier",
                  "start": 16,
                  "end": 19,
                  "name": "foo"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 23,
                  "end": 25,
                  "body": []
                }
              },
              "specifiers": [],
              "source": null
            },
            {
              "type": "ExpressionStatement",
              "start": 26,
              "end": 31,
              "expression": {
                "type": "Literal",
                "start": 26,
                "end": 31,
                "value": false,
                "raw": "false"
              }
            }
          ],
          "sourceType": "module"
        });
    });

    it('should export let number', () => {
        expect(parseModule(`export const foo = 1;`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 21,
            "body": [
              {
                "type": "ExportNamedDeclaration",
                "start": 0,
                "end": 21,
                "declaration": {
                  "type": "VariableDeclaration",
                  "start": 7,
                  "end": 21,
                  "declarations": [
                    {
                      "type": "VariableDeclarator",
                      "start": 13,
                      "end": 20,
                      "id": {
                        "type": "Identifier",
                        "start": 13,
                        "end": 16,
                        "name": "foo"
                      },
                      "init": {
                        "type": "Literal",
                        "start": 19,
                        "end": 20,
                        "value": 1,
                        "raw": "1"
                      }
                    }
                  ],
                  "kind": "const"
                },
                "specifiers": [],
                "source": null
              }
            ],
            "sourceType": "module"
          });
    });

    it('should export named as default', () => {
        expect(parseModule(`export {foo as default};`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 24,
            "body": [
              {
                "type": "ExportNamedDeclaration",
                "start": 0,
                "end": 24,
                "declaration": null,
                "specifiers": [
                  {
                    "type": "ExportSpecifier",
                    "start": 8,
                    "end": 22,
                    "local": {
                      "type": "Identifier",
                      "start": 8,
                      "end": 11,
                      "name": "foo"
                    },
                    "exported": {
                      "type": "Identifier",
                      "start": 15,
                      "end": 22,
                      "name": "default"
                    }
                  }
                ],
                "source": null
              }
            ],
            "sourceType": "module"
          });
    });

    it('should export named as specifier', () => {
        expect(parseModule(`export {foo as bar};`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 20,
            "body": [
              {
                "type": "ExportNamedDeclaration",
                "start": 0,
                "end": 20,
                "declaration": null,
                "specifiers": [
                  {
                    "type": "ExportSpecifier",
                    "start": 8,
                    "end": 18,
                    "local": {
                      "type": "Identifier",
                      "start": 8,
                      "end": 11,
                      "name": "foo"
                    },
                    "exported": {
                      "type": "Identifier",
                      "start": 15,
                      "end": 18,
                      "name": "bar"
                    }
                  }
                ],
                "source": null
              }
            ],
            "sourceType": "module"
          });
    });

    it('should assignment expression with resturn statement', () => {
      expect(parseModule(`export default (function fName() { return 7; });`, {
          ranges: true,
          raw: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 48,
        "body": [
          {
            "type": "ExportDefaultDeclaration",
            "start": 0,
            "end": 48,
            "declaration": {
              "type": "FunctionExpression",
              "start": 16,
              "end": 46,
              "id": {
                "type": "Identifier",
                "start": 25,
                "end": 30,
                "name": "fName"
              },
              "generator": false,
              "expression": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 33,
                "end": 46,
                "body": [
                  {
                    "type": "ReturnStatement",
                    "start": 35,
                    "end": 44,
                    "argument": {
                      "type": "Literal",
                      "start": 42,
                      "end": 43,
                      "value": 7,
                      "raw": "7"
                    }
                  }
                ]
              }
            }
          }
        ],
        "sourceType": "module"
      });
    });

    it('should parse an unterminated generator function', () => {
      expect(parseModule(`export function* g() {} if (true) { count += 1; }`, {
          ranges: true,
          raw: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 49,
        "body": [
          {
            "type": "ExportNamedDeclaration",
            "start": 0,
            "end": 23,
            "declaration": {
              "type": "FunctionDeclaration",
              "start": 7,
              "end": 23,
              "id": {
                "type": "Identifier",
                "start": 17,
                "end": 18,
                "name": "g"
              },
              "generator": true,
              "expression": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 21,
                "end": 23,
                "body": []
              }
            },
            "specifiers": [],
            "source": null
          },
          {
            "type": "IfStatement",
            "start": 24,
            "end": 49,
            "test": {
              "type": "Literal",
              "start": 28,
              "end": 32,
              "value": true,
              "raw": "true"
            },
            "consequent": {
              "type": "BlockStatement",
              "start": 34,
              "end": 49,
              "body": [
                {
                  "type": "ExpressionStatement",
                  "start": 36,
                  "end": 47,
                  "expression": {
                    "type": "AssignmentExpression",
                    "start": 36,
                    "end": 46,
                    "operator": "+=",
                    "left": {
                      "type": "Identifier",
                      "start": 36,
                      "end": 41,
                      "name": "count"
                    },
                    "right": {
                      "type": "Literal",
                      "start": 45,
                      "end": 46,
                      "value": 1,
                      "raw": "1"
                    }
                  }
                }
              ]
            },
            "alternate": null
          }
        ],
        "sourceType": "module"
      });
    });

    it('should export named as specifiers', () => {
        expect(parseModule(`export {foo as default, bar};`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 29,
            "body": [
              {
                "type": "ExportNamedDeclaration",
                "start": 0,
                "end": 29,
                "declaration": null,
                "specifiers": [
                  {
                    "type": "ExportSpecifier",
                    "start": 8,
                    "end": 22,
                    "local": {
                      "type": "Identifier",
                      "start": 8,
                      "end": 11,
                      "name": "foo"
                    },
                    "exported": {
                      "type": "Identifier",
                      "start": 15,
                      "end": 22,
                      "name": "default"
                    }
                  },
                  {
                    "type": "ExportSpecifier",
                    "start": 24,
                    "end": 27,
                    "local": {
                      "type": "Identifier",
                      "start": 24,
                      "end": 27,
                      "name": "bar"
                    },
                    "exported": {
                      "type": "Identifier",
                      "start": 24,
                      "end": 27,
                      "name": "bar"
                    }
                  }
                ],
                "source": null
              }
            ],
            "sourceType": "module"
          });
    });

    it('should export named empty', () => {
        expect(parseModule(`export {};`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 10,
            "body": [
              {
                "type": "ExportNamedDeclaration",
                "start": 0,
                "end": 10,
                "declaration": null,
                "specifiers": [],
                "source": null
              }
            ],
            "sourceType": "module"
          });
    });

    it('should export named specifiers comma', () => {
        expect(parseModule(`export {foo, bar,};`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 19,
            "body": [
              {
                "type": "ExportNamedDeclaration",
                "start": 0,
                "end": 19,
                "declaration": null,
                "specifiers": [
                  {
                    "type": "ExportSpecifier",
                    "start": 8,
                    "end": 11,
                    "local": {
                      "type": "Identifier",
                      "start": 8,
                      "end": 11,
                      "name": "foo"
                    },
                    "exported": {
                      "type": "Identifier",
                      "start": 8,
                      "end": 11,
                      "name": "foo"
                    }
                  },
                  {
                    "type": "ExportSpecifier",
                    "start": 13,
                    "end": 16,
                    "local": {
                      "type": "Identifier",
                      "start": 13,
                      "end": 16,
                      "name": "bar"
                    },
                    "exported": {
                      "type": "Identifier",
                      "start": 13,
                      "end": 16,
                      "name": "bar"
                    }
                  }
                ],
                "source": null
              }
            ],
            "sourceType": "module"
          });
    });
    it('should export var anonymous function', () => {
        expect(parseModule(`export var foo = function () {};`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 32,
            "body": [
              {
                "type": "ExportNamedDeclaration",
                "start": 0,
                "end": 32,
                "declaration": {
                  "type": "VariableDeclaration",
                  "start": 7,
                  "end": 32,
                  "declarations": [
                    {
                      "type": "VariableDeclarator",
                      "start": 11,
                      "end": 31,
                      "id": {
                        "type": "Identifier",
                        "start": 11,
                        "end": 14,
                        "name": "foo"
                      },
                      "init": {
                        "type": "FunctionExpression",
                        "start": 17,
                        "end": 31,
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "BlockStatement",
                          "start": 29,
                          "end": 31,
                          "body": []
                        }
                      }
                    }
                  ],
                  "kind": "var"
                },
                "specifiers": [],
                "source": null
              }
            ],
            "sourceType": "module"
          });
    });
    it('should export var number', () => {
        expect(parseModule(`export var foo = 1;`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 19,
            "body": [
              {
                "type": "ExportNamedDeclaration",
                "start": 0,
                "end": 19,
                "declaration": {
                  "type": "VariableDeclaration",
                  "start": 7,
                  "end": 19,
                  "declarations": [
                    {
                      "type": "VariableDeclarator",
                      "start": 11,
                      "end": 18,
                      "id": {
                        "type": "Identifier",
                        "start": 11,
                        "end": 14,
                        "name": "foo"
                      },
                      "init": {
                        "type": "Literal",
                        "start": 17,
                        "end": 18,
                        "value": 1,
                        "raw": "1"
                      }
                    }
                  ],
                  "kind": "var"
                },
                "specifiers": [],
                "source": null
              }
            ],
            "sourceType": "module"
          });
    });
});