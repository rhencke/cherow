import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Declaration - Lexical', () => {

    it('should fail on const declarations mixed: with, without initialiser', () => {
        expect(() => {
            parseScript(`l\\u0065t a;`);
        }).to.throw();
    });

    it('should fail on let newline await in normal function', () => {
        expect(() => {
            parseScript(`function f() {
                let
                await 0;
            }`);
        }).to.throw();
    });

    it('should fail on let declarations with initialisers in statement positions', () => {
        expect(() => {
            parseScript(`for (;false;) let x = 1;`);
        }).to.throw();
    });

    
    it('should fail on let declarations with initialisers in statement positions', () => {
        expect(() => {
            parseScript(`for (;false;) let x = 1;`);
        }).to.throw();
    });

    it('should fail on let declarations without initialisers in statement positions: for ( ;;) Statement', () => {
        expect(() => {
            parseScript(`for (;false;) let x;`);
        }).to.throw();
    });

    it('should fail on let declarations without initialisers in statement positions: while ( Expression ) Statement', () => {
        expect(() => {
            parseScript(`while (false) let x;`);
        }).to.throw();
    });

    it('should fail on let declarations without initialisers in statement positions: if ( Expression ) Statement else Statement', () => {
        expect(() => {
            parseScript(`if (true) {} else let x;`);
        }).to.throw();
    });

    it('should fail on let newline await in normal function', () => {
        expect(() => {
            parseScript(`function f() {
                let
                await 0;
            }`);
        }).to.throw();
    });

    it('should fail on const declarations mixed: with, without initialiser', () => {
        expect(() => {
            parseScript(`const x = 1, y;`);
        }).to.throw();
    });

    it('should fail on const with initializer in label statement', () => {
        expect(() => {
            parseScript(`label: const x = 1;`);
        }).to.throw();
    });

    it('should fail on const split across two lines', () => {
        expect(() => {
            parseScript(`const
        let = "irrelevant initializer";`);
        }).to.throw();
    });

    it('should fail on  const declarations with initialisers in statement positions', () => {
        expect(() => {
            parseScript(`for (;false;) const x = 1;`);
        }).to.throw();
    });

    it('should fail on const declarations without initialisers in statement positions', () => {
        expect(() => {
            parseScript(`for (;false;) const x;`);
        }).to.throw();
    });

    it('should fail on const declarations without initialisers in statement positions in switch statement', () => {
        expect(() => {
            parseScript(`switch (true) { case true: const x; }`);
        }).to.throw();
    });

    it('should fail on "const x = 0,"', () => {
        expect(() => {
            parseScript(`const x = 0,`);
        }).to.throw();
    });

    it('should fail on "const x = 0,"', () => {
        expect(() => {
            parseScript(`const x = 0,`);
        }).to.throw();
    });

    it('should fail on "const x = 0, y = 1,;"', () => {
        expect(() => {
            parseScript(`const x = 0, y = 1,;`);
        }).to.throw();
    });

    it('should fail on "let x,"', () => {
        expect(() => {
            parseScript(`let x,`);
        }).to.throw();
    });

    it('should fail on "let x,;"', () => {
        expect(() => {
            parseScript(`let x,;`);
        }).to.throw();
    });

    it('should fail on "let x, y, ;"', () => {
        expect(() => {
            parseScript(`let x, y, ;`);
        }).to.throw();
    });

    it('should fail on let: |let let| split across two lines', () => {
        expect(() => {
            parseScript(`let 
    let;`)
        }).to.throw();
    });

    it('should fail on const declarations mixed: with, without initialiser', () => {
        expect(() => {
            parseScript('const x = 1, y;')
        }).to.throw();
    });

    it('should fail on const declarations mixed: without, with initialiser', () => {
        expect(() => {
            parseScript('const x, y = 1;')
        }).to.throw();
    });

    it("should throw on \"var x += 1;", () => {
        expect(() => {
            parseScript(`var x += 1;`)
        }).to.throw();
    });

    it("should throw on \"var x | true;", () => {
        expect(() => {
            parseScript(`var x | true;`)
        }).to.throw();
    });

    it("should throw on \"var x && 1;", () => {
        expect(() => {
            parseScript(`var x && 1;`)
        }).to.throw();
    });

    it("should throw on \"var x*1;", () => {
        expect(() => {
            parseScript(`var x*1;`)
        }).to.throw();
    });

    it("should throw on \"var x in []", () => {
        expect(() => {
            parseScript(`var x in []`)
        }).to.throw();
    });

    it("should throw on \"let eval = 123, b = 124;\" in strict mode", () => {
        expect(() => {
            parseScript(`"use strict"; let eval = 123, b = 124;`)
        }).to.throw();
    });

    it("should throw on \"const arguments = 123, b = 124;\" in strict mode", () => {
        expect(() => {
            parseScript(`"use strict"; const arguments = 123, b = 124;`)
        }).to.throw();
    });

    it("should throw on \"let x,\"", () => {
        expect(() => {
            parseScript(`let x,`)
        }).to.throw();
    });

    it("should throw on invalid \"const [...[ x ] = []] = [];\" in module code", () => {
        expect(() => {
            parseModule(`const [...[ x ] = []] = [];`)
        }).to.throw();
    });

    it("should throw on invalid \"let default\"", () => {
        expect(() => {
            parseScript(`let default`)
        }).to.throw();
    });

    it("should throw on invalid \"const [...[ x ] = []] = [];\"", () => {
        expect(() => {
            parseScript(`const [...[ x ] = []] = [];;`)
        }).to.throw();
    });

    it("should throw on invalid \"const x = 0,\"", () => {
        expect(() => {
            parseScript(`const x = 0,`)
        }).to.throw();
    });

    it("should throw on invalid \"const x = 0, y = 1,;\"", () => {
        expect(() => {
            parseModule(`const x = 0, y = 1,;`)
        }).to.throw();
    });

    it("should throw on invalid \"const x = 12, y;\"", () => {
        expect(() => {
            parseModule(`const x = 12, y;`)
        }).to.throw();
    });

    it("should throw on invalid const var\"", () => {
        expect(() => {
            parseModule(`"const var`)
        }).to.throw();
    });

    it("should throw on invalid const var\"", () => {
        expect(() => {
            parseScript(`"const var`)
        }).to.throw();
    });

    it("should throw on \"const x = 0,\"", () => {
        expect(() => {
            parseScript(`const x = 0,`)
        }).to.throw();
    });

    it("should throw on \"const x = 0, y = 1,;\"", () => {
        expect(() => {
            parseScript(`const x = 0, y = 1,;`)
        }).to.throw();
    });

    it("should throw on \"a: const a\"", () => {
        expect(() => {
            parseScript(`a: const a`)
        }).to.throw('');
    });

    it("should throw on invalid \"const x = 0, y = 1,;\"", () => {
        expect(() => {
            parseScript(`const x = 0, y = 1,;`)
        }).to.throw();
    });

    it('should throw on invalid complex binding without initializer', () => {
        expect(() => {
            parseScript(`let []`)
        }).to.throw();
    });

    it('should throw on duplicate const', () => {
        expect(() => {
            parseScript(`const const;`)
        }).to.throw();
    });

    it('should throw on invalid const let', () => {
        expect(() => {
            parseScript(`const let`)
        }).to.throw();
    });

    it('should throw on invalid let declaration', () => {
        expect(() => {
            parseScript(`let x, y, z, let;`)
        }).to.throw();
    });

    it('should throw on invalid let initializer', () => {
        expect(() => {
            parseScript(`let x, y, z, let = 1;`)
        }).to.throw();
    });

    it('should throw on duplicate let', () => {
        expect(() => {
            parseModule(`let let;`)
        }).to.throw();
    });

    it('should throw if the default export is an lexical declaration (const)', () => {
        expect(() => {
            parseModule(`"use strict"; const const = 1;`)
        }).to.throw();
    });

    it('should throw if the default export is an lexical declaration (const)', () => {
        expect(() => {
            parseScript(`"use strict"; const const = 1;`)
        }).to.throw();
    });

    it('should throw on invalid "let eval"', () => {
        expect(() => {
            parseModule(`let eval`)
        }).to.throw();
    });

    it('should throw on invalid "var eval"', () => {
        expect(() => {
            parseModule(`var eval`)
        }).to.throw();
    });

    it('should throw on invalid "let [eval] = 1"', () => {
        expect(() => {
            parseModule(`let [eval] = 1`)
        }).to.throw();
    });

    it('should throw on invalid "let arguments = 1"', () => {
        expect(() => {
            parseModule(`let arguments = 1`)
        }).to.throw();
    });

    it('should throw on invalid "let [arguments] = 1"', () => {
        expect(() => {
            parseModule(`let [arguments] = 1`)
        }).to.throw();
    });

    it('should throw on invalid "let [eval] = 1"', () => {
        expect(() => {
            parseModule(`let [eval] = 1`)
        }).to.throw();
    });

    it('should throw on invalid "const [eval] = 1"', () => {
        expect(() => {
            parseModule(`const [eval] = 1`)
        }).to.throw();
    });

    it('should throw on invalid "const eval = arguments"', () => {
        expect(() => {
            parseModule(`const eval = arguments`)
        }).to.throw();
    });

    it("should throw if using let as lefthandside expression", () => {
        expect(() => {
            parseModule(`let let`)
        }).to.throw();
    });

    it("should fail on use of future reserved word as declaration - strict directive", () => {
        expect(() => {
            parseScript(`"use strict"; let eval;`)
        }).to.throw();
    });

    it("should throw on \"var x += 1;", () => {
        expect(() => {
            parseScript(`var x += 1;`)
        }).to.throw();
    });

    it('should fail on `let` contextual keyword containing Unicode escape sequences', () => {
        expect(() => {
            parseScript('"use strict"; l\\u0065t')
        }).to.throw();
    });

    it('should fail on invalid let declaration', () => {
        expect(() => {
            parseScript('let x, y, z, let;')
        }).to.throw();
    });

    it('should fail on invalid duplicate let', () => {
        expect(() => {
            parseScript('let let;')
        }).to.throw();
    });

    it('should fail on invalid strict const const', () => {
        expect(() => {
            parseScript('"use strict"; const const = 1;')
        }).to.throw();
    });

    it('should fail on invalid strict const let', () => {
        expect(() => {
            parseScript('"use strict"; const let = 1;')
        }).to.throw();
    });

    it('should fail on invalid trailing comma let', () => {
        expect(() => {
            parseScript('let x,')
        }).to.throw();
    });

    it('should fail on invalid trailing comma', () => {
        expect(() => {
            parseScript('let x,;')
        }).to.throw();
    });

    it('should fail on invalid trailing comma', () => {
        expect(() => {
            parseScript('let x, y, ;')
        }).to.throw();
    });

    it('should fail on invalid trailing comma', () => {
        expect(() => {
            parseScript(`let x,
        y = 3,`)
        }).to.throw();
    });

    it('should fail on invalid trailing comma const', () => {
        expect(() => {
            parseScript('const x = 0,')
        }).to.throw('');
    });

    it('should fail on invalid trailing comma const new line', () => {
        expect(() => {
            parseScript(`const x = 0,
        y = 1,`)
        }).to.throw();
    });

    it('should fail on "let \\u{61}, \\u{0061};"', () => {
        expect(() => {
            parseScript(`let \\u{61}, \\u{0061};`)
        }).to.throw();
    });

    it('should fail on "let a, b, a;"', () => {
        expect(() => {
            parseScript(`let a, b, a;`)
        }).to.throw();
    });

    it('should fail on "const a = 1, b;"', () => {
        expect(() => {
            parseScript(`const a = 1, b;`)
        }).to.throw();
    });

    it('should fail on "let [a, ...a] = 1;"', () => {
        expect(() => {
            parseScript(`let [a, ...a] = 1;`)
        }).to.throw();
    });

    it('should fail on ""use strict"; const let = 1;"', () => {
        expect(() => {
            parseScript(`"use strict"; const let = 1;`)
        }).to.throw();
    });

    it('should fail on "var a; const a = 1;"', () => {
        expect(() => {
            parseScript(`var a; const a = 1;`)
        }).to.throw();
    });

    it('should fail on "let x\u{E01D5}, x󠇕;"', () => {
        expect(() => {
            parseScript(`let x\\u{E01D5}, x󠇕;`)
        }).to.throw();
    });

    it('should fail on "let a; let a;"', () => {
        expect(() => {
            parseScript(`let a; let a;`)
        }).to.throw();
    });

    it('should fail if "this" are used as an shorthand property"', () => {
        expect(() => {
            parseScript(`let {this} = x`)
        }).to.throw('');
    });

    it('should fail if let are used in labelled statement', () => {
        expect(() => {
            parseScript(`a: let a`)
        }).to.throw('');
    });

    it('should parse function name arrow', () => {
        expect(parseScript(`const arrow = () => {};`, {
            raw: true,
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 23,
            "body": [{
                "type": "VariableDeclaration",
                "start": 0,
                "end": 23,
                "declarations": [{
                    "type": "VariableDeclarator",
                    "start": 6,
                    "end": 22,
                    "id": {
                        "type": "Identifier",
                        "start": 6,
                        "end": 11,
                        "name": "arrow"
                    },
                    "init": {
                        "type": "ArrowFunctionExpression",
                        "start": 14,
                        "end": 22,
                        "id": null,
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
                    }
                }],
                "kind": "const"
            }],
            "sourceType": "script"
        });
    });


    it('should parse let closure inside next expression', () => {
        expect(parseScript(`let a = [];
        for (let i = 0; i < 5; a.push(function () { return i; }), ++i) { }
        for (let k = 0; k < 5; ++k) {
        }`, {
            raw: true,
            ranges: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 134,
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 11,
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 10,
                    "id": {
                      "type": "Identifier",
                      "start": 4,
                      "end": 5,
                      "name": "a"
                    },
                    "init": {
                      "type": "ArrayExpression",
                      "start": 8,
                      "end": 10,
                      "elements": []
                    }
                  }
                ],
                "kind": "let"
              },
              {
                "type": "ForStatement",
                "start": 20,
                "end": 86,
                "init": {
                  "type": "VariableDeclaration",
                  "start": 25,
                  "end": 34,
                  "declarations": [
                    {
                      "type": "VariableDeclarator",
                      "start": 29,
                      "end": 34,
                      "id": {
                        "type": "Identifier",
                        "start": 29,
                        "end": 30,
                        "name": "i"
                      },
                      "init": {
                        "type": "Literal",
                        "start": 33,
                        "end": 34,
                        "value": 0,
                        "raw": "0"
                      }
                    }
                  ],
                  "kind": "let"
                },
                "test": {
                  "type": "BinaryExpression",
                  "start": 36,
                  "end": 41,
                  "left": {
                    "type": "Identifier",
                    "start": 36,
                    "end": 37,
                    "name": "i"
                  },
                  "operator": "<",
                  "right": {
                    "type": "Literal",
                    "start": 40,
                    "end": 41,
                    "value": 5,
                    "raw": "5"
                  }
                },
                "update": {
                  "type": "SequenceExpression",
                  "start": 43,
                  "end": 81,
                  "expressions": [
                    {
                      "type": "CallExpression",
                      "start": 43,
                      "end": 76,
                      "callee": {
                        "type": "MemberExpression",
                        "start": 43,
                        "end": 49,
                        "object": {
                          "type": "Identifier",
                          "start": 43,
                          "end": 44,
                          "name": "a"
                        },
                        "property": {
                          "type": "Identifier",
                          "start": 45,
                          "end": 49,
                          "name": "push"
                        },
                        "computed": false
                      },
                      "arguments": [
                        {
                          "type": "FunctionExpression",
                          "start": 50,
                          "end": 75,
                          "id": null,
                          "generator": false,
                          "expression": false,
                          "async": false,
                          "params": [],
                          "body": {
                            "type": "BlockStatement",
                            "start": 62,
                            "end": 75,
                            "body": [
                              {
                                "type": "ReturnStatement",
                                "start": 64,
                                "end": 73,
                                "argument": {
                                  "type": "Identifier",
                                  "start": 71,
                                  "end": 72,
                                  "name": "i"
                                }
                              }
                            ]
                          }
                        }
                      ]
                    },
                    {
                      "type": "UpdateExpression",
                      "start": 78,
                      "end": 81,
                      "operator": "++",
                      "prefix": true,
                      "argument": {
                        "type": "Identifier",
                        "start": 80,
                        "end": 81,
                        "name": "i"
                      }
                    }
                  ]
                },
                "body": {
                  "type": "BlockStatement",
                  "start": 83,
                  "end": 86,
                  "body": []
                }
              },
              {
                "type": "ForStatement",
                "start": 95,
                "end": 134,
                "init": {
                  "type": "VariableDeclaration",
                  "start": 100,
                  "end": 109,
                  "declarations": [
                    {
                      "type": "VariableDeclarator",
                      "start": 104,
                      "end": 109,
                      "id": {
                        "type": "Identifier",
                        "start": 104,
                        "end": 105,
                        "name": "k"
                      },
                      "init": {
                        "type": "Literal",
                        "start": 108,
                        "end": 109,
                        "value": 0,
                        "raw": "0"
                      }
                    }
                  ],
                  "kind": "let"
                },
                "test": {
                  "type": "BinaryExpression",
                  "start": 111,
                  "end": 116,
                  "left": {
                    "type": "Identifier",
                    "start": 111,
                    "end": 112,
                    "name": "k"
                  },
                  "operator": "<",
                  "right": {
                    "type": "Literal",
                    "start": 115,
                    "end": 116,
                    "value": 5,
                    "raw": "5"
                  }
                },
                "update": {
                  "type": "UpdateExpression",
                  "start": 118,
                  "end": 121,
                  "operator": "++",
                  "prefix": true,
                  "argument": {
                    "type": "Identifier",
                    "start": 120,
                    "end": 121,
                    "name": "k"
                  }
                },
                "body": {
                  "type": "BlockStatement",
                  "start": 123,
                  "end": 134,
                  "body": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse let closure inside for loop condition', () => {
        expect(parseScript(`let a = [];
        for (let i = 0; a.push(function () { return i; }), i < 5; ++i) { }
        for (let k = 0; k < 5; ++k) {
        }`, {
            raw: true,
            ranges: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 134,
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 11,
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 10,
                    "id": {
                      "type": "Identifier",
                      "start": 4,
                      "end": 5,
                      "name": "a"
                    },
                    "init": {
                      "type": "ArrayExpression",
                      "start": 8,
                      "end": 10,
                      "elements": []
                    }
                  }
                ],
                "kind": "let"
              },
              {
                "type": "ForStatement",
                "start": 20,
                "end": 86,
                "init": {
                  "type": "VariableDeclaration",
                  "start": 25,
                  "end": 34,
                  "declarations": [
                    {
                      "type": "VariableDeclarator",
                      "start": 29,
                      "end": 34,
                      "id": {
                        "type": "Identifier",
                        "start": 29,
                        "end": 30,
                        "name": "i"
                      },
                      "init": {
                        "type": "Literal",
                        "start": 33,
                        "end": 34,
                        "value": 0,
                        "raw": "0"
                      }
                    }
                  ],
                  "kind": "let"
                },
                "test": {
                  "type": "SequenceExpression",
                  "start": 36,
                  "end": 76,
                  "expressions": [
                    {
                      "type": "CallExpression",
                      "start": 36,
                      "end": 69,
                      "callee": {
                        "type": "MemberExpression",
                        "start": 36,
                        "end": 42,
                        "object": {
                          "type": "Identifier",
                          "start": 36,
                          "end": 37,
                          "name": "a"
                        },
                        "property": {
                          "type": "Identifier",
                          "start": 38,
                          "end": 42,
                          "name": "push"
                        },
                        "computed": false
                      },
                      "arguments": [
                        {
                          "type": "FunctionExpression",
                          "start": 43,
                          "end": 68,
                          "id": null,
                          "generator": false,
                          "expression": false,
                          "async": false,
                          "params": [],
                          "body": {
                            "type": "BlockStatement",
                            "start": 55,
                            "end": 68,
                            "body": [
                              {
                                "type": "ReturnStatement",
                                "start": 57,
                                "end": 66,
                                "argument": {
                                  "type": "Identifier",
                                  "start": 64,
                                  "end": 65,
                                  "name": "i"
                                }
                              }
                            ]
                          }
                        }
                      ]
                    },
                    {
                      "type": "BinaryExpression",
                      "start": 71,
                      "end": 76,
                      "left": {
                        "type": "Identifier",
                        "start": 71,
                        "end": 72,
                        "name": "i"
                      },
                      "operator": "<",
                      "right": {
                        "type": "Literal",
                        "start": 75,
                        "end": 76,
                        "value": 5,
                        "raw": "5"
                      }
                    }
                  ]
                },
                "update": {
                  "type": "UpdateExpression",
                  "start": 78,
                  "end": 81,
                  "operator": "++",
                  "prefix": true,
                  "argument": {
                    "type": "Identifier",
                    "start": 80,
                    "end": 81,
                    "name": "i"
                  }
                },
                "body": {
                  "type": "BlockStatement",
                  "start": 83,
                  "end": 86,
                  "body": []
                }
              },
              {
                "type": "ForStatement",
                "start": 95,
                "end": 134,
                "init": {
                  "type": "VariableDeclaration",
                  "start": 100,
                  "end": 109,
                  "declarations": [
                    {
                      "type": "VariableDeclarator",
                      "start": 104,
                      "end": 109,
                      "id": {
                        "type": "Identifier",
                        "start": 104,
                        "end": 105,
                        "name": "k"
                      },
                      "init": {
                        "type": "Literal",
                        "start": 108,
                        "end": 109,
                        "value": 0,
                        "raw": "0"
                      }
                    }
                  ],
                  "kind": "let"
                },
                "test": {
                  "type": "BinaryExpression",
                  "start": 111,
                  "end": 116,
                  "left": {
                    "type": "Identifier",
                    "start": 111,
                    "end": 112,
                    "name": "k"
                  },
                  "operator": "<",
                  "right": {
                    "type": "Literal",
                    "start": 115,
                    "end": 116,
                    "value": 5,
                    "raw": "5"
                  }
                },
                "update": {
                  "type": "UpdateExpression",
                  "start": 118,
                  "end": 121,
                  "operator": "++",
                  "prefix": true,
                  "argument": {
                    "type": "Identifier",
                    "start": 120,
                    "end": 121,
                    "name": "k"
                  }
                },
                "body": {
                  "type": "BlockStatement",
                  "start": 123,
                  "end": 134,
                  "body": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse deconstructed rest object with getter', () => {
        expect(parseScript(`const {...x} = { get v() { count++; return 2; } };`, {
            raw: true,
            ranges: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "VariableDeclaration",
                "declarations": [{
                    "type": "VariableDeclarator",
                    "init": {
                        "type": "ObjectExpression",
                        "properties": [{
                            "type": "Property",
                            "computed": false,
                            "key": {
                                "type": "Identifier",
                                "name": "v",
                                "start": 21,
                                "end": 22
                            },
                            "kind": "get",
                            "method": false,
                            "shorthand": false,
                            "value": {
                                "type": "FunctionExpression",
                                "id": null,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [{
                                            "type": "ExpressionStatement",
                                            "expression": {
                                                "type": "UpdateExpression",
                                                "argument": {
                                                    "type": "Identifier",
                                                    "name": "count",
                                                    "start": 27,
                                                    "end": 32
                                                },
                                                "operator": "++",
                                                "prefix": false,
                                                "start": 27,
                                                "end": 34
                                            },
                                            "start": 27,
                                            "end": 35
                                        },
                                        {
                                            "type": "ReturnStatement",
                                            "argument": {
                                                "type": "Literal",
                                                "value": 2,
                                                "start": 43,
                                                "end": 44,
                                                "raw": "2"
                                            },
                                            "start": 36,
                                            "end": 45
                                        }
                                    ],
                                    "start": 25,
                                    "end": 47
                                },
                                "generator": false,
                                "async": false,
                                "expression": false,
                                "start": 22,
                                "end": 47
                            },
                            "start": 17,
                            "end": 47
                        }],
                        "start": 15,
                        "end": 49
                    },
                    "id": {
                        "type": "ObjectPattern",
                        "properties": [{
                            "type": "RestElement",
                            "argument": {
                                "type": "Identifier",
                                "name": "x",
                                "start": 10,
                                "end": 11
                            },
                            "start": 7,
                            "end": 11
                        }],
                        "start": 6,
                        "end": 12
                    },
                    "start": 6,
                    "end": 49
                }],
                "kind": "const",
                "start": 0,
                "end": 50
            }],
            "sourceType": "script",
            "start": 0,
            "end": 50
        });
    });

    it('should parse assignment of function `name` attribute (let)', () => {
        expect(parseScript(`let cover = (function() {});`, {
            raw: true,
            ranges: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 28,
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 28,
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 27,
                    "id": {
                      "type": "Identifier",
                      "start": 4,
                      "end": 9,
                      "name": "cover"
                    },
                    "init": {
                      "type": "FunctionExpression",
                      "start": 13,
                      "end": 26,
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [],
                      "body": {
                        "type": "BlockStatement",
                        "start": 24,
                        "end": 26,
                        "body": []
                      }
                    }
                  }
                ],
                "kind": "let"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse let: function local use before initialization in declaration statement', () => {
        expect(parseScript(`(function() {
            let x = x + 1;
          }());`, {
            raw: true,
            ranges: true,
            next: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 56,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 56,
                "expression": {
                  "type": "CallExpression",
                  "start": 1,
                  "end": 54,
                  "callee": {
                    "type": "FunctionExpression",
                    "start": 1,
                    "end": 52,
                    "id": null,
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [],
                    "body": {
                      "type": "BlockStatement",
                      "start": 12,
                      "end": 52,
                      "body": [
                        {
                          "type": "VariableDeclaration",
                          "start": 26,
                          "end": 40,
                          "declarations": [
                            {
                              "type": "VariableDeclarator",
                              "start": 30,
                              "end": 39,
                              "id": {
                                "type": "Identifier",
                                "start": 30,
                                "end": 31,
                                "name": "x"
                              },
                              "init": {
                                "type": "BinaryExpression",
                                "start": 34,
                                "end": 39,
                                "left": {
                                  "type": "Identifier",
                                  "start": 34,
                                  "end": 35,
                                  "name": "x"
                                },
                                "operator": "+",
                                "right": {
                                  "type": "Literal",
                                  "start": 38,
                                  "end": 39,
                                  "value": 1,
                                  "raw": "1"
                                }
                              }
                            }
                          ],
                          "kind": "let"
                        }
                      ]
                    }
                  },
                  "arguments": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse binding as specified via property name and identifier (`let` statement)', () => {
        expect(parseScript(`let { x: y } = { x: 23 };`, {
            raw: true,
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 25,
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 25,
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 24,
                    "id": {
                      "type": "ObjectPattern",
                      "start": 4,
                      "end": 12,
                      "properties": [
                        {
                          "type": "Property",
                          "start": 6,
                          "end": 10,
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 6,
                            "end": 7,
                            "name": "x"
                          },
                          "value": {
                            "type": "Identifier",
                            "start": 9,
                            "end": 10,
                            "name": "y"
                          },
                          "kind": "init"
                        }
                      ]
                    },
                    "init": {
                      "type": "ObjectExpression",
                      "start": 15,
                      "end": 24,
                      "properties": [
                        {
                          "type": "Property",
                          "start": 17,
                          "end": 22,
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 17,
                            "end": 18,
                            "name": "x"
                          },
                          "value": {
                            "type": "Literal",
                            "start": 20,
                            "end": 22,
                            "value": 23,
                            "raw": "23"
                          },
                          "kind": "init"
                        }
                      ]
                    }
                  }
                ],
                "kind": "let"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse object binding pattern with "nested" array binding pattern', () => {
        expect(parseScript(`const { w: [x, y, z] = [4, 5, 6] } = { w: [7, undefined, ] };`, {
            raw: true,
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "VariableDeclaration",
                "declarations": [{
                    "type": "VariableDeclarator",
                    "init": {
                        "type": "ObjectExpression",
                        "properties": [{
                            "type": "Property",
                            "computed": false,
                            "key": {
                                "type": "Identifier",
                                "name": "w"
                            },
                            "kind": "init",
                            "method": false,
                            "shorthand": false,
                            "value": {
                                "type": "ArrayExpression",
                                "elements": [{
                                        "type": "Literal",
                                        "value": 7,
                                        "raw": "7"
                                    },
                                    {
                                        "type": "Identifier",
                                        "name": "undefined"
                                    }
                                ]
                            }
                        }]
                    },
                    "id": {
                        "type": "ObjectPattern",
                        "properties": [{
                            "type": "Property",
                            "kind": "init",
                            "key": {
                                "type": "Identifier",
                                "name": "w"
                            },
                            "computed": false,
                            "value": {
                                "type": "AssignmentPattern",
                                "left": {
                                    "type": "ArrayPattern",
                                    "elements": [{
                                            "type": "Identifier",
                                            "name": "x"
                                        },
                                        {
                                            "type": "Identifier",
                                            "name": "y"
                                        },
                                        {
                                            "type": "Identifier",
                                            "name": "z"
                                        }
                                    ]
                                },
                                "right": {
                                    "type": "ArrayExpression",
                                    "elements": [{
                                            "type": "Literal",
                                            "value": 4,
                                            "raw": "4"
                                        },
                                        {
                                            "type": "Literal",
                                            "value": 5,
                                            "raw": "5"
                                        },
                                        {
                                            "type": "Literal",
                                            "value": 6,
                                            "raw": "6"
                                        }
                                    ]
                                }
                            },
                            "method": false,
                            "shorthand": false
                        }]
                    }
                }],
                "kind": "const"
            }],
            "sourceType": "script"
        });
    });

    it('should parse assignment of function `name` attribute', () => {
        expect(parseScript(`const cls = class {};`, {
            raw: true,
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 21,
            "body": [{
                "type": "VariableDeclaration",
                "start": 0,
                "end": 21,
                "declarations": [{
                    "type": "VariableDeclarator",
                    "start": 6,
                    "end": 20,
                    "id": {
                        "type": "Identifier",
                        "start": 6,
                        "end": 9,
                        "name": "cls"
                    },
                    "init": {
                        "type": "ClassExpression",
                        "start": 12,
                        "end": 20,
                        "id": null,
                        "superClass": null,
                        "body": {
                            "type": "ClassBody",
                            "start": 18,
                            "end": 20,
                            "body": []
                        }
                    }
                }],
                "kind": "const"
            }],
            "sourceType": "script"
        });
    });

    it('should parse function name arrow', () => {
        expect(parseScript(`while(true) var a`, {
            raw: true,
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 17,
            "body": [{
                "type": "WhileStatement",
                "start": 0,
                "end": 17,
                "test": {
                    "type": "Literal",
                    "start": 6,
                    "end": 10,
                    "value": true,
                    "raw": "true"
                },
                "body": {
                    "type": "VariableDeclaration",
                    "start": 12,
                    "end": 17,
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "start": 16,
                        "end": 17,
                        "id": {
                            "type": "Identifier",
                            "start": 16,
                            "end": 17,
                            "name": "a"
                        },
                        "init": null
                    }],
                    "kind": "var"
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse nested array destructuring with a null value', () => {
        expect(parseScript(` const [[x]] = [null];`, {
            raw: true,
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 22,
            "body": [{
                "type": "VariableDeclaration",
                "start": 1,
                "end": 22,
                "declarations": [{
                    "type": "VariableDeclarator",
                    "start": 7,
                    "end": 21,
                    "id": {
                        "type": "ArrayPattern",
                        "start": 7,
                        "end": 12,
                        "elements": [{
                            "type": "ArrayPattern",
                            "start": 8,
                            "end": 11,
                            "elements": [{
                                "type": "Identifier",
                                "start": 9,
                                "end": 10,
                                "name": "x"
                            }]
                        }]
                    },
                    "init": {
                        "type": "ArrayExpression",
                        "start": 15,
                        "end": 21,
                        "elements": [{
                            "type": "Literal",
                            "start": 16,
                            "end": 20,
                            "value": null,
                            "raw": "null"
                        }]
                    }
                }],
                "kind": "const"
            }],
            "sourceType": "script"
        });
    });

    it('should parse named functions in strict mode', () => {
        expect(parseScript(`'use strict'; let foo = function foo() {}`, {
            raw: true
        })).to.eql({
            "body": [{
                    "expression": {
                        "raw": "'use strict'",
                        "type": "Literal",
                        "value": "use strict"
                    },
                    "type": "ExpressionStatement"
                },
                {
                    "declarations": [{
                        "id": {
                            "name": "foo",
                            "type": "Identifier"
                        },
                        "init": {
                            "async": false,
                            "body": {
                                "body": [],
                                "type": "BlockStatement"
                            },
                            "expression": false,
                            "generator": false,
                            "id": {
                                "name": "foo",
                                "type": "Identifier"
                            },
                            "params": [],
                            "type": "FunctionExpression"
                        },
                        "type": "VariableDeclarator"
                    }],
                    "kind": "let",
                    "type": "VariableDeclaration"
                },
            ],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it('should parse "const { async: foo } = bar;"', () => {
        expect(parseScript(`const { async: foo } = bar;`, {
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
                                "name": "async"
                            },
                            "computed": false,
                            "value": {
                                "type": "Identifier",
                                "name": "foo"
                            },
                            "kind": "init",
                            "method": false,
                            "shorthand": false
                        }]
                    },
                    "init": {
                        "type": "Identifier",
                        "name": "bar"
                    }
                }],
                "kind": "const"
            }],
            "sourceType": "script"
        });
    });


    it('should parse let as an identifier', () => {
        expect(parseScript(`let;`, {
            ranges: true
        })).to.eql({
            "body": [{
                "end": 4,
                "expression": {
                    "end": 3,
                    "name": "let",
                    "start": 0,
                    "type": "Identifier"
                },
                "start": 0,
                "type": "ExpressionStatement"
            }],
            "end": 4,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse let assignment', () => {
        expect(parseScript(`var let;`, {
            ranges: true
        })).to.eql({
            "body": [{
                "declarations": [{
                    "end": 7,
                    "id": {
                        "end": 7,
                        "name": "let",
                        "start": 4,
                        "type": "Identifier"
                    },
                    "init": null,
                    "start": 4,
                    "type": "VariableDeclarator"
                }],
                "end": 8,
                "kind": "var",
                "start": 0,
                "type": "VariableDeclaration"
            }],
            "end": 8,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });
    it("should parse \"var static;\"", () => {
        expect(parseScript(`var static;`, {
            ranges: true
        })).to.eql({
            "body": [{
                "declarations": [{
                    "end": 10,
                    "id": {
                        "end": 10,
                        "name": "static",
                        "start": 4,
                        "type": "Identifier"
                    },
                    "init": null,
                    "start": 4,
                    "type": "VariableDeclarator"
                }],
                "end": 11,
                "kind": "var",
                "start": 0,
                "type": "VariableDeclaration"
            }],
            "end": 11,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse a single "let x = 1"', () => {
        expect(parseScript('let x = 1', {
            raw: true,
            ranges: true
        })).to.eql({
            "body": [{
                "declarations": [{
                    "end": 9,
                    "id": {
                        "end": 5,
                        "name": "x",
                        "start": 4,
                        "type": "Identifier"
                    },
                    "init": {
                        "end": 9,
                        "raw": "1",
                        "start": 8,
                        "type": "Literal",
                        "value": 1
                    },
                    "start": 4,
                    "type": "VariableDeclarator"
                }],
                "end": 9,
                "kind": "let",
                "start": 0,
                "type": "VariableDeclaration"
            }],
            "end": 9,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse a single "let a"', () => {
        expect(parseScript('let a', {
            raw: true,
            ranges: true
        })).to.eql({
            "body": [{
                "declarations": [{
                    "end": 5,
                    "id": {
                        "end": 5,
                        "name": "a",
                        "start": 4,
                        "type": "Identifier"
                    },
                    "init": null,
                    "start": 4,
                    "type": "VariableDeclarator"
                }],
                "end": 5,
                "kind": "let",
                "start": 0,
                "type": "VariableDeclaration"
            }],
            "end": 5,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse a single "let a;"', () => {
        expect(parseScript('let a;', {
            raw: true,
            ranges: true
        })).to.eql({
            "body": [{
                "declarations": [{
                    "end": 5,
                    "id": {
                        "end": 5,
                        "name": "a",
                        "start": 4,
                        "type": "Identifier"
                    },
                    "init": null,
                    "start": 4,
                    "type": "VariableDeclarator"
                }],
                "end": 6,
                "kind": "let",
                "start": 0,
                "type": "VariableDeclaration"
            }],
            "end": 6,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse a single "const x = 42', () => {
        expect(parseScript('const x = 42', {
            raw: true,
            ranges: true
        })).to.eql({
            "body": [{
                "declarations": [{
                    "end": 12,
                    "id": {
                        "end": 7,
                        "name": "x",
                        "start": 6,
                        "type": "Identifier"
                    },
                    "init": {
                        "end": 12,
                        "raw": "42",
                        "start": 10,
                        "type": "Literal",
                        "value": 42
                    },
                    "start": 6,
                    "type": "VariableDeclarator"
                }],
                "end": 12,
                "kind": "const",
                "start": 0,
                "type": "VariableDeclaration"
            }],
            "end": 12,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse a single "let.let = foo', () => {
        expect(parseScript('let.let = foo', {
            raw: true,
            ranges: true
        })).to.eql({
            "body": [{
                "end": 13,
                "expression": {
                    "end": 13,
                    "left": {
                        "computed": false,
                        "end": 7,
                        "object": {
                            "end": 3,
                            "name": "let",
                            "start": 0,
                            "type": "Identifier"
                        },
                        "property": {
                            "end": 7,
                            "name": "let",
                            "start": 4,
                            "type": "Identifier"
                        },
                        "start": 0,
                        "type": "MemberExpression"
                    },
                    "operator": "=",
                    "right": {
                        "end": 13,
                        "name": "foo",
                        "start": 10,
                        "type": "Identifier"
                    },
                    "start": 0,
                    "type": "AssignmentExpression"
                },
                "start": 0,
                "type": "ExpressionStatement"
            }],
            "end": 13,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse a single "let x = 42', () => {
        expect(parseScript('let x = 42', {
            raw: true,
            ranges: true
        })).to.eql({
            "body": [{
                "declarations": [{
                    "end": 10,
                    "id": {
                        "end": 5,
                        "name": "x",
                        "start": 4,
                        "type": "Identifier"
                    },
                    "init": {
                        "end": 10,
                        "raw": "42",
                        "start": 8,
                        "type": "Literal",
                        "value": 42
                    },
                    "start": 4,
                    "type": "VariableDeclarator"
                }],
                "end": 10,
                "kind": "let",
                "start": 0,
                "type": "VariableDeclaration"
            }],
            "end": 10,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse a single "let a;"', () => {
        expect(parseScript('let a;', {
            raw: true,
            ranges: true
        })).to.eql({
            "body": [{
                "declarations": [{
                    "end": 5,
                    "id": {
                        "end": 5,
                        "name": "a",
                        "start": 4,
                        "type": "Identifier"
                    },
                    "init": null,
                    "start": 4,
                    "type": "VariableDeclarator"
                }],
                "end": 6,
                "kind": "let",
                "start": 0,
                "type": "VariableDeclaration"
            }],
            "end": 6,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse a single "let;"', () => {
        expect(parseScript('let;', {
            raw: true,
            ranges: true
        })).to.eql({
            "body": [{
                "end": 4,
                "expression": {
                    "end": 3,
                    "name": "let",
                    "start": 0,
                    "type": "Identifier"
                },
                "start": 0,
                "type": "ExpressionStatement"
            }],
            "end": 4,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse destructuring initializer with an undefined value', () => {
        expect(parseScript('let [x = 23] = [undefined];')).to.eql({
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
                                "value": 23
                            }
                        }]
                    },
                    "init": {
                        "type": "ArrayExpression",
                        "elements": [{
                            "type": "Identifier",
                            "name": "undefined"
                        }]
                    }
                }],
                "kind": "let"
            }],
            "sourceType": "script"
        });
    });

    it("should parse \"const [[...x] = values] = [];\"", () => {
        expect(parseScript(`const [[...x] = values] = [];`, {})).to.eql({
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
                                "type": "ArrayPattern",
                                "elements": [{
                                    "type": "RestElement",
                                    "argument": {
                                        "type": "Identifier",
                                        "name": "x"
                                    }
                                }]
                            },
                            "right": {
                                "type": "Identifier",
                                "name": "values"
                            }
                        }]
                    },
                    "init": {
                        "type": "ArrayExpression",
                        "elements": []
                    }
                }],
                "kind": "const"
            }],
            "sourceType": "script"
        });
    });

    it("should parse \"const [[x]] = [null];\"", () => {
        expect(parseScript(`const [[x]] = [null];`, {
            ranges: true,
            raw: true
        })).to.eql({
            "body": [{
                "declarations": [{
                    "end": 20,
                    "id": {
                        "elements": [{
                            "elements": [{
                                "end": 9,
                                "name": "x",
                                "start": 8,
                                "type": "Identifier"
                            }],
                            "end": 10,
                            "start": 7,
                            "type": "ArrayPattern"
                        }],
                        "end": 11,
                        "start": 6,
                        "type": "ArrayPattern"
                    },
                    "init": {
                        "elements": [{
                            "end": 19,
                            "raw": "null",
                            "start": 15,
                            "type": "Literal",
                            "value": null,
                        }],
                        "end": 20,
                        "start": 14,
                        "type": "ArrayExpression"
                    },
                    "start": 6,
                    "type": "VariableDeclarator"
                }],
                "end": 21,
                "kind": "const",
                "start": 0,
                "type": "VariableDeclaration"
            }],
            "end": 21,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it("should parse \"const [_, x] = [];\"", () => {
        expect(parseScript(`const [_, x] = [];`, {})).to.eql({
            "type": "Program",
            "body": [{
                "type": "VariableDeclaration",
                "declarations": [{
                    "type": "VariableDeclarator",
                    "id": {
                        "type": "ArrayPattern",
                        "elements": [{
                                "type": "Identifier",
                                "name": "_"
                            },
                            {
                                "type": "Identifier",
                                "name": "x"
                            }
                        ]
                    },
                    "init": {
                        "type": "ArrayExpression",
                        "elements": []
                    }
                }],
                "kind": "const"
            }],
            "sourceType": "script"
        });
    });

    it("should parse \"const [,] = g();\"", () => {
        expect(parseScript(`const [,] = g();`, {})).to.eql({
            "type": "Program",
            "body": [{
                "type": "VariableDeclaration",
                "declarations": [{
                    "type": "VariableDeclarator",
                    "id": {
                        "type": "ArrayPattern",
                        "elements": [
                            null
                        ]
                    },
                    "init": {
                        "type": "CallExpression",
                        "callee": {
                            "type": "Identifier",
                            "name": "g"
                        },
                        "arguments": []
                    }
                }],
                "kind": "const"
            }],
            "sourceType": "script"
        });
    });

    it("should parse \"const [...[...x]] = values;\"", () => {
        expect(parseScript(`const [...[...x]] = values;`, {})).to.eql({
            "type": "Program",
            "body": [{
                "type": "VariableDeclaration",
                "declarations": [{
                    "type": "VariableDeclarator",
                    "id": {
                        "type": "ArrayPattern",
                        "elements": [{
                            "type": "RestElement",
                            "argument": {
                                "type": "ArrayPattern",
                                "elements": [{
                                    "type": "RestElement",
                                    "argument": {
                                        "type": "Identifier",
                                        "name": "x"
                                    }
                                }]
                            }
                        }]
                    },
                    "init": {
                        "type": "Identifier",
                        "name": "values"
                    }
                }],
                "kind": "const"
            }],
            "sourceType": "script"
        });
    });

    it("should parse \"let [x, y, z] = [1, 2, 3];\"", () => {
        expect(parseScript(`let [x, y, z] = [1, 2, 3];`, {})).to.eql({
            type: "Program",
            body: [{
                type: "VariableDeclaration",
                declarations: [{
                    type: "VariableDeclarator",
                    id: {
                        type: "ArrayPattern",
                        elements: [{
                                type: "Identifier",
                                name: "x",
                            },
                            {
                                type: "Identifier",
                                name: "y",
                            },
                            {
                                type: "Identifier",
                                name: "z",
                            },
                        ],
                    },
                    init: {
                        type: "ArrayExpression",
                        elements: [{
                                type: "Literal",
                                value: 1,
                            },
                            {
                                type: "Literal",
                                value: 2,
                            },
                            {
                                type: "Literal",
                                value: 3,
                            },
                        ],
                    },
                }, ],
                kind: "let",
            }, ],
            sourceType: "script",
        });
    });

    it("should parse \"let [[x]] = [null];\"", () => {
        expect(parseScript(`let [[x]] = [null];`, {})).to.eql({
            type: "Program",
            body: [{
                type: "VariableDeclaration",
                declarations: [{
                    type: "VariableDeclarator",
                    id: {
                        type: "ArrayPattern",
                        elements: [{
                            type: "ArrayPattern",
                            elements: [{
                                type: "Identifier",
                                name: "x",
                            }, ],
                        }, ],
                    },
                    init: {
                        type: "ArrayExpression",
                        elements: [{
                            type: "Literal",
                            value: null,
                        }, ],
                    },
                }, ],
                kind: "let",
            }, ],
            sourceType: "script",
        });
    });

    it("should parse \"const [{ u: v, w: x, y: z } = { u: 444, w: 555, y: 666 }] = [{ u: 777, w: 888, y: 999 }];\"", () => {
        expect(parseScript(`const [{ u: v, w: x, y: z } = { u: 444, w: 555, y: 666 }] = [{ u: 777, w: 888, y: 999 }];`, {})).to.eql({
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
                                "type": "ObjectPattern",
                                "properties": [{
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "u"
                                        },
                                        "computed": false,
                                        "value": {
                                            "type": "Identifier",
                                            "name": "v"
                                        },
                                        "kind": "init",
                                        "method": false,
                                        "shorthand": false
                                    },
                                    {
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "w"
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
                                            "name": "y"
                                        },
                                        "computed": false,
                                        "value": {
                                            "type": "Identifier",
                                            "name": "z"
                                        },
                                        "kind": "init",
                                        "method": false,
                                        "shorthand": false
                                    }
                                ]
                            },
                            "right": {
                                "type": "ObjectExpression",
                                "properties": [{
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "u"
                                        },
                                        "computed": false,
                                        "value": {
                                            "type": "Literal",
                                            "value": 444
                                        },
                                        "kind": "init",
                                        "method": false,
                                        "shorthand": false
                                    },
                                    {
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "w"
                                        },
                                        "computed": false,
                                        "value": {
                                            "type": "Literal",
                                            "value": 555
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
                                            "type": "Literal",
                                            "value": 666
                                        },
                                        "kind": "init",
                                        "method": false,
                                        "shorthand": false
                                    }
                                ]
                            }
                        }]
                    },
                    "init": {
                        "type": "ArrayExpression",
                        "elements": [{
                            "type": "ObjectExpression",
                            "properties": [{
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "u"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "Literal",
                                        "value": 777
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": false
                                },
                                {
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "w"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "Literal",
                                        "value": 888
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
                                        "type": "Literal",
                                        "value": 999
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": false
                                }
                            ]
                        }]
                    }
                }],
                "kind": "const"
            }],
            "sourceType": "script"
        });
    });

    it("should parse \"{ const x = 14, y = 3, z = 1977 }\"", () => {
        expect(parseScript(`{ const x = 14, y = 3, z = 1977 }`, {})).to.eql({
            "type": "Program",
            "body": [{
                "type": "BlockStatement",
                "body": [{
                    "type": "VariableDeclaration",
                    "declarations": [{
                            "type": "VariableDeclarator",
                            "id": {
                                "type": "Identifier",
                                "name": "x"
                            },
                            "init": {
                                "type": "Literal",
                                "value": 14
                            }
                        },
                        {
                            "type": "VariableDeclarator",
                            "id": {
                                "type": "Identifier",
                                "name": "y"
                            },
                            "init": {
                                "type": "Literal",
                                "value": 3
                            }
                        },
                        {
                            "type": "VariableDeclarator",
                            "id": {
                                "type": "Identifier",
                                "name": "z"
                            },
                            "init": {
                                "type": "Literal",
                                "value": 1977
                            }
                        }
                    ],
                    "kind": "const"
                }]
            }],
            "sourceType": "script"
        });
    });


    it("should parse \"let [{ x, y, z } = { x: 44, y: 55, z: 66 }] = [{ x: 11, y: 22, z: 33 }];\"", () => {
        expect(parseScript(`let [{ x, y, z } = { x: 44, y: 55, z: 66 }] = [{ x: 11, y: 22, z: 33 }];`, {})).to.eql({
            type: "Program",
            body: [{
                type: "VariableDeclaration",
                declarations: [{
                    type: "VariableDeclarator",
                    id: {
                        type: "ArrayPattern",
                        elements: [{
                            type: "AssignmentPattern",
                            left: {
                                type: "ObjectPattern",
                                properties: [{
                                        type: "Property",
                                        key: {
                                            type: "Identifier",
                                            name: "x",
                                        },
                                        computed: false,
                                        value: {
                                            type: "Identifier",
                                            name: "x",
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: true,
                                    },
                                    {
                                        type: "Property",
                                        key: {
                                            type: "Identifier",
                                            name: "y",
                                        },
                                        computed: false,
                                        value: {
                                            type: "Identifier",
                                            name: "y",
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: true,
                                    },
                                    {
                                        type: "Property",
                                        key: {
                                            type: "Identifier",
                                            name: "z",
                                        },
                                        computed: false,
                                        value: {
                                            type: "Identifier",
                                            name: "z",
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: true,
                                    },
                                ],
                            },
                            right: {
                                type: "ObjectExpression",
                                properties: [{
                                        type: "Property",
                                        key: {
                                            type: "Identifier",
                                            name: "x",
                                        },
                                        computed: false,
                                        value: {
                                            type: "Literal",
                                            value: 44,
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: false,
                                    },
                                    {
                                        type: "Property",
                                        key: {
                                            type: "Identifier",
                                            name: "y",
                                        },
                                        computed: false,
                                        value: {
                                            type: "Literal",
                                            value: 55,
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: false,
                                    },
                                    {
                                        type: "Property",
                                        key: {
                                            type: "Identifier",
                                            name: "z",
                                        },
                                        computed: false,
                                        value: {
                                            type: "Literal",
                                            value: 66,
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: false,
                                    },
                                ],
                            },
                        }, ],
                    },
                    init: {
                        type: "ArrayExpression",
                        elements: [{
                            type: "ObjectExpression",
                            properties: [{
                                    type: "Property",
                                    key: {
                                        type: "Identifier",
                                        name: "x",
                                    },
                                    computed: false,
                                    value: {
                                        type: "Literal",
                                        value: 11,
                                    },
                                    kind: "init",
                                    method: false,
                                    shorthand: false,
                                },
                                {
                                    type: "Property",
                                    key: {
                                        type: "Identifier",
                                        name: "y",
                                    },
                                    computed: false,
                                    value: {
                                        type: "Literal",
                                        value: 22,
                                    },
                                    kind: "init",
                                    method: false,
                                    shorthand: false,
                                },
                                {
                                    type: "Property",
                                    key: {
                                        type: "Identifier",
                                        name: "z",
                                    },
                                    computed: false,
                                    value: {
                                        type: "Literal",
                                        value: 33,
                                    },
                                    kind: "init",
                                    method: false,
                                    shorthand: false,
                                },
                            ],
                        }, ],
                    },
                }, ],
                kind: "let",
            }, ],
            sourceType: "script",
        });
    });

    it("should parse \"let { x, } = { x: 23 };\"", () => {
        expect(parseScript(`let { x, } = { x: 23 };`, {})).to.eql({
            type: "Program",
            body: [{
                type: "VariableDeclaration",
                declarations: [{
                    type: "VariableDeclarator",
                    id: {
                        type: "ObjectPattern",
                        properties: [{
                            type: "Property",
                            key: {
                                type: "Identifier",
                                name: "x",
                            },
                            computed: false,
                            value: {
                                type: "Identifier",
                                name: "x",
                            },
                            kind: "init",
                            method: false,
                            shorthand: true,
                        }, ],
                    },
                    init: {
                        type: "ObjectExpression",
                        properties: [{
                            type: "Property",
                            key: {
                                type: "Identifier",
                                name: "x",
                            },
                            computed: false,
                            value: {
                                type: "Literal",
                                value: 23,
                            },
                            kind: "init",
                            method: false,
                            shorthand: false,
                        }, ],
                    },
                }, ],
                kind: "let",
            }, ],
            sourceType: "script",
        });
    });

    it("should parse \"let { x: y } = { x: 23 };\"", () => {
        expect(parseScript(`let { x: y } = { x: 23 };`, {})).to.eql({
            type: "Program",
            body: [{
                type: "VariableDeclaration",
                declarations: [{
                    type: "VariableDeclarator",
                    id: {
                        type: "ObjectPattern",
                        properties: [{
                            type: "Property",
                            key: {
                                type: "Identifier",
                                name: "x",
                            },
                            computed: false,
                            value: {
                                type: "Identifier",
                                name: "y",
                            },
                            kind: "init",
                            method: false,
                            shorthand: false,
                        }, ],
                    },
                    init: {
                        type: "ObjectExpression",
                        properties: [{
                            type: "Property",
                            key: {
                                type: "Identifier",
                                name: "x",
                            },
                            computed: false,
                            value: {
                                type: "Literal",
                                value: 23,
                            },
                            kind: "init",
                            method: false,
                            shorthand: false,
                        }, ],
                    },
                }, ],
                kind: "let",
            }, ],
            sourceType: "script",
        });
    });

    it("should parse \"let { w: { x, y, z } = { x: 4, y: 5, z: 6 } } = { w: { x: undefined, z: 7 } };\"", () => {
        expect(parseScript(`let { w: { x, y, z } = { x: 4, y: 5, z: 6 } } = { w: { x: undefined, z: 7 } };`, {})).to.eql({
            type: "Program",
            body: [{
                type: "VariableDeclaration",
                declarations: [{
                    type: "VariableDeclarator",
                    id: {
                        type: "ObjectPattern",
                        properties: [{
                            type: "Property",
                            key: {
                                type: "Identifier",
                                name: "w",
                            },
                            computed: false,
                            value: {
                                type: "AssignmentPattern",
                                left: {
                                    type: "ObjectPattern",
                                    properties: [{
                                            type: "Property",
                                            key: {
                                                type: "Identifier",
                                                name: "x",
                                            },
                                            computed: false,
                                            value: {
                                                type: "Identifier",
                                                name: "x",
                                            },
                                            kind: "init",
                                            method: false,
                                            shorthand: true,
                                        },
                                        {
                                            type: "Property",
                                            key: {
                                                type: "Identifier",
                                                name: "y",
                                            },
                                            computed: false,
                                            value: {
                                                type: "Identifier",
                                                name: "y",
                                            },
                                            kind: "init",
                                            method: false,
                                            shorthand: true,
                                        },
                                        {
                                            type: "Property",
                                            key: {
                                                type: "Identifier",
                                                name: "z",
                                            },
                                            computed: false,
                                            value: {
                                                type: "Identifier",
                                                name: "z",
                                            },
                                            kind: "init",
                                            method: false,
                                            shorthand: true,
                                        },
                                    ],
                                },
                                right: {
                                    type: "ObjectExpression",
                                    properties: [{
                                            type: "Property",
                                            key: {
                                                type: "Identifier",
                                                name: "x",
                                            },
                                            computed: false,
                                            value: {
                                                type: "Literal",
                                                value: 4,
                                            },
                                            kind: "init",
                                            method: false,
                                            shorthand: false,
                                        },
                                        {
                                            type: "Property",
                                            key: {
                                                type: "Identifier",
                                                name: "y",
                                            },
                                            computed: false,
                                            value: {
                                                type: "Literal",
                                                value: 5,
                                            },
                                            kind: "init",
                                            method: false,
                                            shorthand: false,
                                        },
                                        {
                                            type: "Property",
                                            key: {
                                                type: "Identifier",
                                                name: "z",
                                            },
                                            computed: false,
                                            value: {
                                                type: "Literal",
                                                value: 6,
                                            },
                                            kind: "init",
                                            method: false,
                                            shorthand: false,
                                        },
                                    ],
                                },
                            },
                            kind: "init",
                            method: false,
                            shorthand: false,
                        }, ],
                    },
                    init: {
                        type: "ObjectExpression",
                        properties: [{
                            type: "Property",
                            key: {
                                type: "Identifier",
                                name: "w",
                            },
                            computed: false,
                            value: {
                                type: "ObjectExpression",
                                properties: [{
                                        type: "Property",
                                        key: {
                                            type: "Identifier",
                                            name: "x",
                                        },
                                        computed: false,
                                        value: {
                                            type: "Identifier",
                                            name: "undefined",
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: false,
                                    },
                                    {
                                        type: "Property",
                                        key: {
                                            type: "Identifier",
                                            name: "z",
                                        },
                                        computed: false,
                                        value: {
                                            type: "Literal",
                                            value: 7,
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: false,
                                    },
                                ],
                            },
                            kind: "init",
                            method: false,
                            shorthand: false,
                        }, ],
                    },
                }, ],
                kind: "let",
            }, ],
            sourceType: "script",
        });
    });

    it("should parse \"{ let a; }\"", () => {
        expect(parseScript(`{ let a; }`, {})).to.eql({
            type: "Program",
            body: [{
                type: "BlockStatement",
                body: [{
                    type: "VariableDeclaration",
                    declarations: [{
                        type: "VariableDeclarator",
                        id: {
                            type: "Identifier",
                            name: "a",
                        },
                        init: null,
                    }, ],
                    kind: "let",
                }, ],
            }, ],
            sourceType: "script",
        });
    });

    it("should parse assignment of function name - class", () => {
        expect(parseScript(`const {} = obj;`, {})).to.eql({
            "type": "Program",
            "body": [{
                "type": "VariableDeclaration",
                "declarations": [{
                    "type": "VariableDeclarator",
                    "id": {
                        "type": "ObjectPattern",
                        "properties": []
                    },
                    "init": {
                        "type": "Identifier",
                        "name": "obj"
                    }
                }],
                "kind": "const"
            }],
            "sourceType": "script"
        });
    });
    it("should parse \"const {a, b, ...rest} = {x: 1, y: 2, a: 5, b: 3};\"", () => {
        expect(parseScript(`const {a, b, ...rest} = {x: 1, y: 2, a: 5, b: 3};`, {
            next: true
        })).to.eql({
            "body": [{
                "declarations": [{
                    "id": {
                        "properties": [{
                                "computed": false,
                                "key": {
                                    "name": "a",
                                    "type": "Identifier"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": true,
                                "type": "Property",
                                "value": {
                                    "name": "a",
                                    "type": "Identifier"
                                }
                            },
                            {
                                "computed": false,
                                "key": {
                                    "name": "b",
                                    "type": "Identifier"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": true,
                                "type": "Property",
                                "value": {
                                    "name": "b",
                                    "type": "Identifier"
                                }
                            },
                            {
                                "argument": {
                                    "name": "rest",
                                    "type": "Identifier"
                                },
                                "type": "RestElement"
                            }
                        ],
                        "type": "ObjectPattern"
                    },
                    "init": {
                        "properties": [{
                                "computed": false,
                                "key": {
                                    "name": "x",
                                    "type": "Identifier"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false,
                                "type": "Property",
                                "value": {
                                    "type": "Literal",
                                    "value": 1
                                }
                            },
                            {
                                "computed": false,
                                "key": {
                                    "name": "y",
                                    "type": "Identifier"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false,
                                "type": "Property",
                                "value": {
                                    "type": "Literal",
                                    "value": 2
                                }
                            },
                            {
                                "computed": false,
                                "key": {
                                    "name": "a",
                                    "type": "Identifier"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false,
                                "type": "Property",
                                "value": {
                                    "type": "Literal",
                                    "value": 5
                                }
                            },
                            {
                                "computed": false,
                                "key": {
                                    "name": "b",
                                    "type": "Identifier"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false,
                                "type": "Property",
                                "value": {
                                    "type": "Literal",
                                    "value": 3
                                }
                            }
                        ],
                        "type": "ObjectExpression"
                    },
                    "type": "VariableDeclarator"
                }],
                "kind": "const",
                "type": "VariableDeclaration"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it("should parse \"{ const x = 14, y = 3, z = 1977 }\"", () => {
        expect(parseScript(`{ const x = 14, y = 3, z = 1977 }`, {})).to.eql({
            "type": "Program",
            "body": [{
                "type": "BlockStatement",
                "body": [{
                    "type": "VariableDeclaration",
                    "declarations": [{
                            "type": "VariableDeclarator",
                            "id": {
                                "type": "Identifier",
                                "name": "x"
                            },
                            "init": {
                                "type": "Literal",
                                "value": 14
                            }
                        },
                        {
                            "type": "VariableDeclarator",
                            "id": {
                                "type": "Identifier",
                                "name": "y"
                            },
                            "init": {
                                "type": "Literal",
                                "value": 3
                            }
                        },
                        {
                            "type": "VariableDeclarator",
                            "id": {
                                "type": "Identifier",
                                "name": "z"
                            },
                            "init": {
                                "type": "Literal",
                                "value": 1977
                            }
                        }
                    ],
                    "kind": "const"
                }]
            }],
            "sourceType": "script"
        });
    });

    it("should parse \"let [w = counter(), x = counter(), y = counter(), z = counter()] = [null, 0, false, ];\"", () => {
        expect(parseScript(`let [w = counter(), x = counter(), y = counter(), z = counter()] = [null, 0, false, ''];`, {
            ranges: true,
            raw: true
        })).to.eql({
            "body": [{
                "declarations": [{
                    "end": 87,
                    "id": {
                        "elements": [{
                                "end": 18,
                                "left": {
                                    "end": 6,
                                    "name": "w",
                                    "start": 5,
                                    "type": "Identifier"
                                },
                                "right": {
                                    "arguments": [],
                                    "callee": {
                                        "end": 16,
                                        "name": "counter",
                                        "start": 9,
                                        "type": "Identifier"
                                    },
                                    "end": 18,
                                    "start": 9,
                                    "type": "CallExpression"
                                },
                                "start": 5,
                                "type": "AssignmentPattern"
                            },
                            {
                                "end": 33,
                                "left": {
                                    "end": 21,
                                    "name": "x",
                                    "start": 20,
                                    "type": "Identifier"
                                },
                                "right": {
                                    "arguments": [],
                                    "callee": {
                                        "end": 31,
                                        "name": "counter",
                                        "start": 24,
                                        "type": "Identifier"
                                    },
                                    "end": 33,
                                    "start": 24,
                                    "type": "CallExpression"
                                },
                                "start": 20,
                                "type": "AssignmentPattern"
                            },
                            {
                                "end": 48,
                                "left": {
                                    "end": 36,
                                    "name": "y",
                                    "start": 35,
                                    "type": "Identifier"
                                },
                                "right": {
                                    "arguments": [],
                                    "callee": {
                                        "end": 46,
                                        "name": "counter",
                                        "start": 39,
                                        "type": "Identifier"
                                    },
                                    "end": 48,
                                    "start": 39,
                                    "type": "CallExpression"
                                },
                                "start": 35,
                                "type": "AssignmentPattern"
                            },
                            {
                                "end": 63,
                                "left": {
                                    "end": 51,
                                    "name": "z",
                                    "start": 50,
                                    "type": "Identifier"
                                },
                                "right": {
                                    "arguments": [],
                                    "callee": {
                                        "end": 61,
                                        "name": "counter",
                                        "start": 54,
                                        "type": "Identifier"
                                    },
                                    "end": 63,
                                    "start": 54,
                                    "type": "CallExpression"
                                },
                                "start": 50,
                                "type": "AssignmentPattern"
                            }
                        ],
                        "end": 64,
                        "start": 4,
                        "type": "ArrayPattern"
                    },
                    "init": {
                        "elements": [{
                                "end": 72,
                                "raw": "null",
                                "start": 68,
                                "type": "Literal",
                                "value": null,
                            },
                            {
                                "end": 75,
                                "raw": "0",
                                "start": 74,
                                "type": "Literal",
                                "value": 0,
                            },
                            {
                                "end": 82,
                                "raw": "false",
                                "start": 77,
                                "type": "Literal",
                                "value": false,
                            },
                            {
                                "end": 86,
                                "raw": "''",
                                "start": 84,
                                "type": "Literal",
                                "value": ""
                            }
                        ],
                        "end": 87,
                        "start": 67,
                        "type": "ArrayExpression"
                    },
                    "start": 4,
                    "type": "VariableDeclarator"
                }],
                "end": 88,
                "kind": "let",
                "start": 0,
                "type": "VariableDeclaration"
            }],
            "end": 88,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it("should parse \"let [...[]] = iter;\"", () => {
        expect(parseScript(`let [...[]] = iter;`, {})).to.eql({
            type: "Program",
            body: [{
                type: "VariableDeclaration",
                declarations: [{
                    type: "VariableDeclarator",
                    id: {
                        type: "ArrayPattern",
                        elements: [{
                            type: "RestElement",
                            argument: {
                                type: "ArrayPattern",
                                elements: [],
                            },
                        }, ],
                    },
                    init: {
                        type: "Identifier",
                        name: "iter",
                    },
                }, ],
                kind: "let",
            }, ],
            sourceType: "script",
        });
    });

    it("should parse \"let a, b;\"", () => {
        expect(parseScript(`let a, b;`, {})).to.eql({
            type: "Program",
            body: [{
                type: "VariableDeclaration",
                declarations: [{
                        type: "VariableDeclarator",
                        id: {
                            type: "Identifier",
                            name: "a",
                        },
                        init: null,
                    },
                    {
                        type: "VariableDeclarator",
                        id: {
                            type: "Identifier",
                            name: "b",
                        },
                        init: null,
                    },
                ],
                kind: "let",
            }, ],
            sourceType: "script",
        });
    });

    it("should parse \"(let[a])\"", () => {
        expect(parseScript(`(let[a])`, {})).to.eql({
            type: "Program",
            body: [{
                type: "ExpressionStatement",
                expression: {
                    type: "MemberExpression",
                    computed: true,
                    object: {
                        type: "Identifier",
                        name: "let",
                    },
                    property: {
                        type: "Identifier",
                        name: "a",
                    },
                },
            }, ],
            sourceType: "script",
        });
    });

    it('should parse lexical conditional binary numbers', () => {
        expect(parseScript(`let bitmask = targets.length ?
        0b1111111111111111111111111111111 :
        0b1000000000000000000000000000000;`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 117,
            "body": [{
                "type": "VariableDeclaration",
                "start": 0,
                "end": 117,
                "declarations": [{
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 116,
                    "id": {
                        "type": "Identifier",
                        "start": 4,
                        "end": 11,
                        "name": "bitmask"
                    },
                    "init": {
                        "type": "ConditionalExpression",
                        "start": 14,
                        "end": 116,
                        "test": {
                            "type": "MemberExpression",
                            "start": 14,
                            "end": 28,
                            "object": {
                                "type": "Identifier",
                                "start": 14,
                                "end": 21,
                                "name": "targets"
                            },
                            "property": {
                                "type": "Identifier",
                                "start": 22,
                                "end": 28,
                                "name": "length"
                            },
                            "computed": false
                        },
                        "consequent": {
                            "type": "Literal",
                            "start": 39,
                            "end": 72,
                            "value": 2147483647,
                            "raw": "0b1111111111111111111111111111111"
                        },
                        "alternate": {
                            "type": "Literal",
                            "start": 83,
                            "end": 116,
                            "value": 1073741824,
                            "raw": "0b1000000000000000000000000000000"
                        }
                    }
                }],
                "kind": "let"
            }],
            "sourceType": "script"
        });
    });
});