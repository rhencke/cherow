import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Statements - do-while', () => {

    it('should fail on expression if do-while IterationStatement is bracketed with braces`', () => {
        expect(() => {
            parseScript(`do break; while 1;`);
        }).to.throw();
    });

    it('should fail if async function declaration is in statement position`', () => {
        expect(() => {
            parseScript(`do async function f() {} while (false)`);
        }).to.throw();
    });

    it('should fail on labelled function statement', () => {
        expect(() => {
            parseScript(`do label1: label2: function f() {} while (false)`);
        }).to.not.throw();
    });

    it('should fail if expression in do-while iteration statement bracketed with braces', () => {
        expect(() => {
            parseScript(`do break; while true;`);
        }).to.throw();
    });

    it('should fail if a statement within do-while is not compound`', () => {
        expect(() => {
            parseScript(`do var x=1; var y =2; while (0);`);
        }).to.throw();
    });

    it('should fail on a block within a do-while expression`', () => {
        expect(() => {
            parseScript(`do{ ; }while({0});`);
        }).to.throw();
    });

    it('should fail on expression in do-while IterationStatement bracketed with braces (literal)`', () => {
        expect(() => {
            parseScript(`do break; while 'hood';`);
        }).to.throw();
    });

    it('should fail on expression in do-while IterationStatement bracketed with braces (empty)`', () => {
        expect(() => {
            parseScript(`do break; while '';`)
        }).to.throw();
    });

    it('should throw on \'while (false) let x;`', () => {
        expect(() => {
            parseScript(`do function f() {} while (false)`)
        }).to.throw();
    });

    it('should fail on generator declaration in statement position', () => {
        expect(() => {
            parseScript(`do function* g() {} while (false)`);
        }).to.throw();
    });

    it('should fail on generator declaration in statement position', () => {
        expect(() => {
            parseScript(`do function* g() {} while (false)`)
        }).to.throw();
    });

    it('should fail on function declaration in statement position', () => {
        expect(() => {
            parseScript(`do function f() {} while (false)`)
        }).to.throw();
    });

    it('should fail on async function declaration in statement position', () => {
        expect(() => {
            parseScript(`do async function f() {} while (false)`);
        }).to.throw();
    });

    it('should fail on async generator declaration in statement position', () => {
        expect(() => {
            parseScript(`do async function* g() {} while (false)`);
        }).to.throw();
    });

    it('should fail on async generator declaration in statement position', () => {
        expect(() => {
            parseScript(`do async function* g() {} while (false)`, {
                next: true
            });
        }).to.throw();
    });

    it('should fail on "while (false) let x;"', () => {
        expect(() => {
            parseScript(`do let [x] = 0 while (false);`);
        }).to.throw();
    });

    it('should fail on "while (false) let x;"', () => {
        expect(() => {
            parseScript(`do const x = null; while (false)`);
        }).to.throw();
    });

    it('should fail on "do class C {} while (false)"', () => {
        expect(() => {
            parseScript(`do class C {} while (false)`);
        }).to.throw();
    });

    it('should parse "while ( "" );"', () => {
        expect(parseScript('while ( "" );', {
            ranges: true,
            raw: true,
            locations: true
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
                "type": "WhileStatement",
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
                "test": {
                  "type": "Literal",
                  "start": 8,
                  "end": 10,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 8
                    },
                    "end": {
                      "line": 1,
                      "column": 10
                    }
                  },
                  "value": "",
                  "raw": "\"\""
                },
                "body": {
                  "type": "EmptyStatement",
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
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "do continue; while(1);"', () => {
        expect(parseScript('do continue; while(1);')).to.eql({
            type: "Program",
            body: [{
                type: "DoWhileStatement",
                body: {
                    type: "ContinueStatement",
                    label: null,
                },
                test: {
                    type: "Literal",
                    value: 1,
                },
            }, ],
            sourceType: "script",
        });
    });

    it('should parse "do {} while (true)"', () => {
        expect(parseScript('do {} while (true)')).to.eql({
            type: "Program",
            body: [{
                type: "DoWhileStatement",
                body: {
                    type: "BlockStatement",
                    body: [],
                },
                test: {
                    type: "Literal",
                    value: true,
                },
            }, ],
            sourceType: "script",
        });
    });

    it('should parse "{do ; while(false); false}"', () => {
        expect(parseScript('{do ; while(false); false}', {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 26,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 26
              }
            },
            "body": [
              {
                "type": "BlockStatement",
                "start": 0,
                "end": 26,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 26
                  }
                },
                "body": [
                  {
                    "type": "DoWhileStatement",
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
                    "body": {
                      "type": "EmptyStatement",
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
                      }
                    },
                    "test": {
                      "type": "Literal",
                      "start": 12,
                      "end": 17,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 12
                        },
                        "end": {
                          "line": 1,
                          "column": 17
                        }
                      },
                      "value": false,
                      "raw": "false"
                    }
                  },
                  {
                    "type": "ExpressionStatement",
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
                    "expression": {
                      "type": "Literal",
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
                      "value": false,
                      "raw": "false"
                    }
                  }
                ]
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "do ; while (true)"', () => {
        expect(parseScript('do ; while (true)')).to.eql({
            type: "Program",
            body: [{
                type: "DoWhileStatement",
                body: {
                    type: "EmptyStatement",
                },
                test: {
                    type: "Literal",
                    value: true,
                },
            }, ],
            sourceType: "script",
        });
    });
});