import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Module - Export', () => {

    it('should fail on "export * from 123;"', () => {
      expect(() => {
        parseModule(`export * from 123;`);
    }).to.throw();
  });

    it('should fail on duplicates', () => {
        expect(() => {
          parseModule(`var x; export { x }; export { x };`);
      }).to.not.throw();
    });

      it('should fail on "{export default 3;}"', () => {
          expect(() => {
              parseModule(`{export default 3;}`);
          }).to.throw();
      });
  
      it('should fail on "export {with as a}"', () => {
        expect(() => {
            parseModule(`export {with as a}`);
        }).to.not.throw();
    });

      it('should fail on "{export {a};}"', () => {
          expect(() => {
              parseModule(`{export {a};}`);
          }).to.throw();
      });
  
      it('should fail on "{export default 3;}"', () => {
          expect(() => {
              parseModule(`export let 123`);
          }).to.throw();
      });
  
      it('should fail on "{export default 3;}"', () => {
          expect(() => {
              parseModule(`export {a,b} from a`);
          }).to.throw();
      });
  
      it('should fail on "export / from a"', () => {
          expect(() => {
              parseModule(`export / from a`);
          }).to.throw();
      });
  
      it('should fail on "export 3"', () => {
          expect(() => {
              parseModule(`export 3`);
          }).to.throw();
      });
  
      it('should fail on "export let[a] = 0 export let[b] = 0"', () => {
          expect(() => {
              parseModule(`export let[a] = 0 export let[b] = 0`);
          }).to.throw();
      });
  
      it('should fail on "export default default"', () => {
          expect(() => {
              parseModule(`export default default`);
          }).to.throw();
      });
  
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
  
      it('should parse in` operator within an exported AssignmentExpression', () => {
        expect(parseModule(`export default 'x' in { x: true }`, {
            ranges: true,
            raw: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 33,
          "body": [
            {
              "type": "ExportDefaultDeclaration",
              "start": 0,
              "end": 33,
              "declaration": {
                "type": "BinaryExpression",
                "start": 15,
                "end": 33,
                "left": {
                  "type": "Literal",
                  "start": 15,
                  "end": 18,
                  "value": "x",
                  "raw": "'x'"
                },
                "operator": "in",
                "right": {
                  "type": "ObjectExpression",
                  "start": 22,
                  "end": 33,
                  "properties": [
                    {
                      "type": "Property",
                      "start": 24,
                      "end": 31,
                      "method": false,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 24,
                        "end": 25,
                        "name": "x"
                      },
                      "value": {
                        "type": "Literal",
                        "start": 27,
                        "end": 31,
                        "value": true,
                        "raw": "true"
                      },
                      "kind": "init"
                    }
                  ]
                }
              }
            }
          ],
          "sourceType": "module"
        });
      });

      it('should parse an exported function declaration without terminated with a semicolon or newline', () => {
        expect(parseModule(`export function f() {} if (true) { }`, {
            ranges: true,
            raw: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 36,
          "body": [
            {
              "type": "ExportNamedDeclaration",
              "start": 0,
              "end": 22,
              "declaration": {
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
              },
              "specifiers": [],
              "source": null
            },
            {
              "type": "IfStatement",
              "start": 23,
              "end": 36,
              "test": {
                "type": "Literal",
                "start": 27,
                "end": 31,
                "value": true,
                "raw": "true"
              },
              "consequent": {
                "type": "BlockStatement",
                "start": 33,
                "end": 36,
                "body": []
              },
              "alternate": null
            }
          ],
          "sourceType": "module"
        });
      });

      it('should export named class declaration', () => {
        expect(parseModule(`export default class cName { valueOf() { return 45; } }`, {
            ranges: true,
            raw: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 55,
          "body": [
            {
              "type": "ExportDefaultDeclaration",
              "start": 0,
              "end": 55,
              "declaration": {
                "type": "ClassDeclaration",
                "start": 15,
                "end": 55,
                "id": {
                  "type": "Identifier",
                  "start": 21,
                  "end": 26,
                  "name": "cName"
                },
                "superClass": null,
                "body": {
                  "type": "ClassBody",
                  "start": 27,
                  "end": 55,
                  "body": [
                    {
                      "type": "MethodDefinition",
                      "start": 29,
                      "end": 53,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 29,
                        "end": 36,
                        "name": "valueOf"
                      },
                      "static": false,
                      "kind": "method",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 36,
                        "end": 53,
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "BlockStatement",
                          "start": 39,
                          "end": 53,
                          "body": [
                            {
                              "type": "ReturnStatement",
                              "start": 41,
                              "end": 51,
                              "argument": {
                                "type": "Literal",
                                "start": 48,
                                "end": 50,
                                "value": 45,
                                "raw": "45"
                              }
                            }
                          ]
                        }
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

      it('should parse "export {};0"', () => {
        expect(parseModule(`export {};0`, {
            ranges: true,
            raw: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 11,
          "body": [
            {
              "type": "ExportNamedDeclaration",
              "start": 0,
              "end": 10,
              "declaration": null,
              "specifiers": [],
              "source": null
            },
            {
              "type": "ExpressionStatement",
              "start": 10,
              "end": 11,
              "expression": {
                "type": "Literal",
                "start": 10,
                "end": 11,
                "value": 0,
                "raw": "0"
              }
            }
          ],
          "sourceType": "module"
        });
      });

      it('should parse "export class A{};0"', () => {
        expect(parseModule(`export class A{};0`, {
            ranges: true,
            raw: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 18,
          "body": [
            {
              "type": "ExportNamedDeclaration",
              "start": 0,
              "end": 16,
              "declaration": {
                "type": "ClassDeclaration",
                "start": 7,
                "end": 16,
                "id": {
                  "type": "Identifier",
                  "start": 13,
                  "end": 14,
                  "name": "A"
                },
                "superClass": null,
                "body": {
                  "type": "ClassBody",
                  "start": 14,
                  "end": 16,
                  "body": []
                }
              },
              "specifiers": [],
              "source": null
            },
            {
              "type": "EmptyStatement",
              "start": 16,
              "end": 17
            },
            {
              "type": "ExpressionStatement",
              "start": 17,
              "end": 18,
              "expression": {
                "type": "Literal",
                "start": 17,
                "end": 18,
                "value": 0,
                "raw": "0"
              }
            }
          ],
          "sourceType": "module"
        });
      });

      it('should parse "export default function* a(){}"', () => {
        expect(parseModule(`export default function* a(){}`, {
            ranges: true,
            raw: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 30,
          "body": [
            {
              "type": "ExportDefaultDeclaration",
              "start": 0,
              "end": 30,
              "declaration": {
                "type": "FunctionDeclaration",
                "start": 15,
                "end": 30,
                "id": {
                  "type": "Identifier",
                  "start": 25,
                  "end": 26,
                  "name": "a"
                },
                "generator": true,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 28,
                  "end": 30,
                  "body": []
                }
              }
            }
          ],
          "sourceType": "module"
        });
      });

      it('should parse "export default 3 + 1"', () => {
        expect(parseModule(`export default 3 + 1`, {
            ranges: true,
            raw: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 20,
          "body": [
            {
              "type": "ExportDefaultDeclaration",
              "start": 0,
              "end": 20,
              "declaration": {
                "type": "BinaryExpression",
                "start": 15,
                "end": 20,
                "left": {
                  "type": "Literal",
                  "start": 15,
                  "end": 16,
                  "value": 3,
                  "raw": "3"
                },
                "operator": "+",
                "right": {
                  "type": "Literal",
                  "start": 19,
                  "end": 20,
                  "value": 1,
                  "raw": "1"
                }
              }
            }
          ],
          "sourceType": "module"
        });
      });

      it('should parse "export {a,b,}; var a,b;"', () => {
        expect(parseModule(`export {a,b,}; var a,b;`, {
            ranges: true,
            raw: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 23,
          "body": [
            {
              "type": "ExportNamedDeclaration",
              "start": 0,
              "end": 14,
              "declaration": null,
              "specifiers": [
                {
                  "type": "ExportSpecifier",
                  "start": 8,
                  "end": 9,
                  "local": {
                    "type": "Identifier",
                    "start": 8,
                    "end": 9,
                    "name": "a"
                  },
                  "exported": {
                    "type": "Identifier",
                    "start": 8,
                    "end": 9,
                    "name": "a"
                  }
                },
                {
                  "type": "ExportSpecifier",
                  "start": 10,
                  "end": 11,
                  "local": {
                    "type": "Identifier",
                    "start": 10,
                    "end": 11,
                    "name": "b"
                  },
                  "exported": {
                    "type": "Identifier",
                    "start": 10,
                    "end": 11,
                    "name": "b"
                  }
                }
              ],
              "source": null
            },
            {
              "type": "VariableDeclaration",
              "start": 15,
              "end": 23,
              "declarations": [
                {
                  "type": "VariableDeclarator",
                  "start": 19,
                  "end": 20,
                  "id": {
                    "type": "Identifier",
                    "start": 19,
                    "end": 20,
                    "name": "a"
                  },
                  "init": null
                },
                {
                  "type": "VariableDeclarator",
                  "start": 21,
                  "end": 22,
                  "id": {
                    "type": "Identifier",
                    "start": 21,
                    "end": 22,
                    "name": "b"
                  },
                  "init": null
                }
              ],
              "kind": "var"
            }
          ],
          "sourceType": "module"
        });
      });

      it('should parse "export const a = 0, b = 0;"', () => {
        expect(parseModule(`export const a = 0, b = 0;`, {
            ranges: true,
            raw: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 26,
          "body": [
            {
              "type": "ExportNamedDeclaration",
              "start": 0,
              "end": 26,
              "declaration": {
                "type": "VariableDeclaration",
                "start": 7,
                "end": 26,
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 13,
                    "end": 18,
                    "id": {
                      "type": "Identifier",
                      "start": 13,
                      "end": 14,
                      "name": "a"
                    },
                    "init": {
                      "type": "Literal",
                      "start": 17,
                      "end": 18,
                      "value": 0,
                      "raw": "0"
                    }
                  },
                  {
                    "type": "VariableDeclarator",
                    "start": 20,
                    "end": 25,
                    "id": {
                      "type": "Identifier",
                      "start": 20,
                      "end": 21,
                      "name": "b"
                    },
                    "init": {
                      "type": "Literal",
                      "start": 24,
                      "end": 25,
                      "value": 0,
                      "raw": "0"
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

      it('should parse "export let a = 0, b = 0;"', () => {
        expect(parseModule(`export let a = 0, b = 0;`, {
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
              "declaration": {
                "type": "VariableDeclaration",
                "start": 7,
                "end": 24,
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 11,
                    "end": 16,
                    "id": {
                      "type": "Identifier",
                      "start": 11,
                      "end": 12,
                      "name": "a"
                    },
                    "init": {
                      "type": "Literal",
                      "start": 15,
                      "end": 16,
                      "value": 0,
                      "raw": "0"
                    }
                  },
                  {
                    "type": "VariableDeclarator",
                    "start": 18,
                    "end": 23,
                    "id": {
                      "type": "Identifier",
                      "start": 18,
                      "end": 19,
                      "name": "b"
                    },
                    "init": {
                      "type": "Literal",
                      "start": 22,
                      "end": 23,
                      "value": 0,
                      "raw": "0"
                    }
                  }
                ],
                "kind": "let"
              },
              "specifiers": [],
              "source": null
            }
          ],
          "sourceType": "module"
        });
      });

      it('should parse "export let[a] = 0;"', () => {
        expect(parseModule(`export let[a] = 0;`, {
            ranges: true,
            raw: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 18,
          "body": [
            {
              "type": "ExportNamedDeclaration",
              "start": 0,
              "end": 18,
              "declaration": {
                "type": "VariableDeclaration",
                "start": 7,
                "end": 18,
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 10,
                    "end": 17,
                    "id": {
                      "type": "ArrayPattern",
                      "start": 10,
                      "end": 13,
                      "elements": [
                        {
                          "type": "Identifier",
                          "start": 11,
                          "end": 12,
                          "name": "a"
                        }
                      ]
                    },
                    "init": {
                      "type": "Literal",
                      "start": 16,
                      "end": 17,
                      "value": 0,
                      "raw": "0"
                    }
                  }
                ],
                "kind": "let"
              },
              "specifiers": [],
              "source": null
            }
          ],
          "sourceType": "module"
        });
      });

      it('should parse "export function A(){} /* no semi */ false"', () => {
        expect(parseModule(`export function A(){} /* no semi */ false`, {
            ranges: true,
            raw: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 41,
          "body": [
            {
              "type": "ExportNamedDeclaration",
              "start": 0,
              "end": 21,
              "declaration": {
                "type": "FunctionDeclaration",
                "start": 7,
                "end": 21,
                "id": {
                  "type": "Identifier",
                  "start": 16,
                  "end": 17,
                  "name": "A"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 19,
                  "end": 21,
                  "body": []
                }
              },
              "specifiers": [],
              "source": null
            },
            {
              "type": "ExpressionStatement",
              "start": 36,
              "end": 41,
              "expression": {
                "type": "Literal",
                "start": 36,
                "end": 41,
                "value": false,
                "raw": "false"
              }
            }
          ],
          "sourceType": "module"
        });
      });

      it('should parse "export default function a(){} let b; export {b as a};"', () => {
          expect(parseModule(`export default function a(){} let b; export {b as a};`, {
              ranges: true,
              raw: true
          })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 53,
            "body": [
              {
                "type": "ExportDefaultDeclaration",
                "start": 0,
                "end": 29,
                "declaration": {
                  "type": "FunctionDeclaration",
                  "start": 15,
                  "end": 29,
                  "id": {
                    "type": "Identifier",
                    "start": 24,
                    "end": 25,
                    "name": "a"
                  },
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
              },
              {
                "type": "VariableDeclaration",
                "start": 30,
                "end": 36,
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 34,
                    "end": 35,
                    "id": {
                      "type": "Identifier",
                      "start": 34,
                      "end": 35,
                      "name": "b"
                    },
                    "init": null
                  }
                ],
                "kind": "let"
              },
              {
                "type": "ExportNamedDeclaration",
                "start": 37,
                "end": 53,
                "declaration": null,
                "specifiers": [
                  {
                    "type": "ExportSpecifier",
                    "start": 45,
                    "end": 51,
                    "local": {
                      "type": "Identifier",
                      "start": 45,
                      "end": 46,
                      "name": "b"
                    },
                    "exported": {
                      "type": "Identifier",
                      "start": 50,
                      "end": 51,
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

      it('should export without being affected by function', () => {
          expect(parseModule(`function a() {}
        export { version };`, {
              ranges: true,
              raw: true
          })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 43,
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
                "start": 24,
                "end": 43,
                "declaration": null,
                "specifiers": [
                  {
                    "type": "ExportSpecifier",
                    "start": 33,
                    "end": 40,
                    "local": {
                      "type": "Identifier",
                      "start": 33,
                      "end": 40,
                      "name": "version"
                    },
                    "exported": {
                      "type": "Identifier",
                      "start": 33,
                      "end": 40,
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
              "body": [{
                  "type": "ExportNamedDeclaration",
                  "start": 0,
                  "end": 21,
                  "declaration": {
                      "type": "VariableDeclaration",
                      "start": 7,
                      "end": 21,
                      "declarations": [{
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
                      }],
                      "kind": "const"
                  },
                  "specifiers": [],
                  "source": null
              }],
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
              "body": [{
                  "type": "ExportDefaultDeclaration",
                  "start": 0,
                  "end": 18,
                  "declaration": {
                      "type": "ArrayExpression",
                      "start": 15,
                      "end": 17,
                      "elements": []
                  }
              }],
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
              "body": [{
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
              }],
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
              "body": [{
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
              "body": [{
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
              "body": [{
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
              }],
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
              "body": [{
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
              }],
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
              "body": [{
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
              }],
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
              "body": [{
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
              }],
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
              "body": [{
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
              }],
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
              "body": [{
                  "type": "ExportDefaultDeclaration",
                  "start": 0,
                  "end": 26,
                  "declaration": {
                      "type": "ObjectExpression",
                      "start": 15,
                      "end": 25,
                      "properties": [{
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
                      }]
                  }
              }],
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
              "body": [{
                  "type": "ExportDefaultDeclaration",
                  "start": 0,
                  "end": 19,
                  "declaration": {
                      "type": "Identifier",
                      "start": 15,
                      "end": 18,
                      "name": "foo"
                  }
              }],
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
              "body": [{
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
              }],
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
              "body": [{
                  "type": "ExportNamedDeclaration",
                  "start": 0,
                  "end": 28,
                  "declaration": null,
                  "specifiers": [{
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
                  }],
                  "source": {
                      "type": "Literal",
                      "start": 22,
                      "end": 27,
                      "value": "foo",
                      "raw": "\"foo\""
                  }
              }],
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
              "body": [{
                  "type": "ExportNamedDeclaration",
                  "start": 0,
                  "end": 35,
                  "declaration": null,
                  "specifiers": [{
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
                  }],
                  "source": {
                      "type": "Literal",
                      "start": 29,
                      "end": 34,
                      "value": "foo",
                      "raw": "\"foo\""
                  }
              }],
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
              "body": [{
                  "type": "ExportNamedDeclaration",
                  "start": 0,
                  "end": 31,
                  "declaration": null,
                  "specifiers": [{
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
                  }],
                  "source": {
                      "type": "Literal",
                      "start": 25,
                      "end": 30,
                      "value": "foo",
                      "raw": "\"foo\""
                  }
              }],
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
              "body": [{
                  "type": "ExportNamedDeclaration",
                  "start": 0,
                  "end": 40,
                  "declaration": null,
                  "specifiers": [{
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
              }],
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
              "body": [{
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
              "body": [{
                  "type": "ExportNamedDeclaration",
                  "start": 0,
                  "end": 21,
                  "declaration": {
                      "type": "VariableDeclaration",
                      "start": 7,
                      "end": 21,
                      "declarations": [{
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
                      }],
                      "kind": "const"
                  },
                  "specifiers": [],
                  "source": null
              }],
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
              "body": [{
                  "type": "ExportNamedDeclaration",
                  "start": 0,
                  "end": 24,
                  "declaration": null,
                  "specifiers": [{
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
                  }],
                  "source": null
              }],
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
              "body": [{
                  "type": "ExportNamedDeclaration",
                  "start": 0,
                  "end": 20,
                  "declaration": null,
                  "specifiers": [{
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
                  }],
                  "source": null
              }],
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
              "body": [{
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
                          "body": [{
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
                          }]
                      }
                  }
              }],
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
              "body": [{
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
                          "body": [{
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
                          }]
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
              "body": [{
                  "type": "ExportNamedDeclaration",
                  "start": 0,
                  "end": 29,
                  "declaration": null,
                  "specifiers": [{
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
              }],
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
              "body": [{
                  "type": "ExportNamedDeclaration",
                  "start": 0,
                  "end": 10,
                  "declaration": null,
                  "specifiers": [],
                  "source": null
              }],
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
              "body": [{
                  "type": "ExportNamedDeclaration",
                  "start": 0,
                  "end": 19,
                  "declaration": null,
                  "specifiers": [{
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
              }],
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
              "body": [{
                  "type": "ExportNamedDeclaration",
                  "start": 0,
                  "end": 32,
                  "declaration": {
                      "type": "VariableDeclaration",
                      "start": 7,
                      "end": 32,
                      "declarations": [{
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
                      }],
                      "kind": "var"
                  },
                  "specifiers": [],
                  "source": null
              }],
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
              "body": [{
                  "type": "ExportNamedDeclaration",
                  "start": 0,
                  "end": 19,
                  "declaration": {
                      "type": "VariableDeclaration",
                      "start": 7,
                      "end": 19,
                      "declarations": [{
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
                      }],
                      "kind": "var"
                  },
                  "specifiers": [],
                  "source": null
              }],
              "sourceType": "module"
          });
      });
  });