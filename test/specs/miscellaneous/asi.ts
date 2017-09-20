import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';
const expect = chai.expect;
   
describe('ASI', () => {

    it('should throw on invalid throw Statement"', () => {
        expect(() => {
            parseScript(`try {
  throw 
  1;
} catch(e) {  
}  `)
        }).to.throw('Illegal newline after throw');
    });


    it('should throw on invalid throw Statement"', () => {
        expect(() => {
            parseScript(`for( a ; b
)`)
        }).to.throw();
    });
    
    describe('Do-While Statement for automatic semicolon insertion', () => {

        it('should parse do-While Statement for automatic semicolon insertion"', () => {
            expect(parseScript(`do {} \n while(false)`)).to.eql({
                "type": "Program",
                "body": [{
                    "type": "DoWhileStatement",
                    "body": {
                        "type": "BlockStatement",
                        "body": []
                    },
                    "test": {
                        "type": "Literal",
                        "value": false
                    }
                }],
                "sourceType": "script"
            });
        });

        it('should throw on invalid Do-While Statement ASI', () => {
            expect(() => {
                parseScript(`do {}; \n while(false)`)
            }).to.throw();
        });

        it('should throw on invalid Do-While Statement ASI', () => {
            expect(() => {
                parseScript(`do \n\n while(false)`)
            }).to.throw();
        });

        it('should throw on invalid Do-While Statement ASI', () => {
            expect(() => {
                parseScript(`do \n while(false)`)
            }).to.throw();
        });

        it('should parse do-While Statement for automatic semicolon insertion"', () => {
            expect(parseScript(`do { \n ; \n }while((false) \n )`)).to.eql({
                "type": "Program",
                "body": [{
                    "type": "DoWhileStatement",
                    "body": {
                        "type": "BlockStatement",
                        "body": [{
                            "type": "EmptyStatement"
                        }]
                    },
                    "test": {
                        "type": "Literal",
                        "value": false
                    }
                }],
                "sourceType": "script"
            });
        });

        it('should parse "do; while(false) \n true"', () => {
            expect(parseScript(`do; while(false) \n true`)).to.eql({
                "type": "Program",
                "body": [{
                        "type": "DoWhileStatement",
                        "body": {
                            "type": "EmptyStatement"
                        },
                        "test": {
                            "type": "Literal",
                            "value": false
                        }
                    },
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "Literal",
                            "value": true
                        }
                    }
                ],
                "sourceType": "script"
            });
        });

        it('should parse "do { \n }while(false)"', () => {
            expect(parseScript(`do { \n }while(false)`)).to.eql({
                "type": "Program",
                "body": [{
                    "type": "DoWhileStatement",
                    "body": {
                        "type": "BlockStatement",
                        "body": []
                    },
                    "test": {
                        "type": "Literal",
                        "value": false
                    }
                }],
                "sourceType": "script"
            });
        });
    });

      describe(' Check For Statement for automatic semicolon insertion', () => {

        it('should throw if ASI would become one of the two semicolons in the header of a For Statement."', () => {
            expect(() => {
                parseScript(`for(
    false
    false
) {
  break;
}`)
            }).to.throw();
        });

        it('should throw if the for header is (\n false \n false \n false \n)"', () => {
            expect(() => {
                parseScript(`for(
    false
    false
    false
) {
  break;
}`)
            }).to.throw();
        });

        it('should throw if the for header is (false \n false \n)"', () => {
            expect(() => {
                parseScript(`for(false
    false
) {
  break;
}`)
            }).to.throw();
        });

        it('should throw if the for header is (\n false \n)"', () => {
            expect(() => {
                parseScript(`for(
    false
) {
  break;
}`)
            }).to.throw();
        });

        it('should throw if the for header is (\n \n \n)"', () => {
            expect(() => {
                parseScript(`for(
    
    
) {
  break;
}`)
            }).to.throw();
        });

        it('should throw if the for header is  (\n \n)"', () => {
            expect(() => {
                parseScript(`for(
    
) {
  break;
}`)
            }).to.throw();
        });

        it('should throw if the for header is (\n)"', () => {
            expect(() => {
                parseScript(`for(
) {
  break;
}`)
            }).to.throw();
        });


        it('should throw if the for header is (\n semicolon false)"', () => {
            expect(() => {
                parseScript(`for(
;false) {
  break;
}`)
            }).to.throw();
        });

        it('should throw if the for header is (false \n semicolon false \n)"', () => {
            expect(() => {
                parseScript(`for(false
    ;
) {
  break;
}`)
            }).to.throw();
        });

        it('should throw if the for header is (false semicolon \n false)"', () => {
            expect(() => {
                parseScript(`for(false;
false
) {
  break;
}`)
            }).to.throw();
        });

        it('should throw if the for header is (false semicolon false\n)"', () => {
            expect(() => {
                parseScript(`for(false;false
) {
  break;
}`)
            }).to.throw();
        });


        it('should throw if the for header is (\n \n semicolon)"', () => {
            expect(() => {
                parseScript(`for(
    
;) {
  break;
}`)
            }).to.throw();
        });

        it('should throw if the for header is (\n semicolon)"', () => {
            expect(() => {
                parseScript(`for(
;) {
  break;
}`)
            }).to.throw();
        });

        it('should throw if the for header is  (\n semicolon \n)"', () => {
            expect(() => {
                parseScript(`for(
    ;
) {
  break;
}`)
            }).to.throw();
        });


        it('should throw if the for header is (\n false \n semicolon)"', () => {
            expect(() => {
                parseScript(`for(
    false
;) {
  break;
}`)
            }).to.throw();
        });

        it('should throw if the for header is semicolon \n)"', () => {
            expect(() => {
                parseScript(`for(;
) {
  break;
}`)
            }).to.throw();
        });

        it('should parse "(false \n two semicolons \n)"', () => {
            expect(parseScript(`for(false
    ;;
) {
  break;
}`)).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ForStatement",
                    "init": {
                        "type": "Literal",
                        "value": false
                    },
                    "test": null,
                    "update": null,
                    "body": {
                        "type": "BlockStatement",
                        "body": [{
                            "type": "BreakStatement",
                            "label": null
                        }]
                    }
                }],
                "sourceType": "script"
            });
        });

        it('should parse "(false semicolon false \n semicolon false \n)"', () => {
            expect(parseScript(`for(false;false
  ;false
) {
  break;
}`)).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ForStatement",
                    "init": {
                        "type": "Literal",
                        "value": false
                    },
                    "test": {
                        "type": "Literal",
                        "value": false
                    },
                    "update": {
                        "type": "Literal",
                        "value": false
                    },
                    "body": {
                        "type": "BlockStatement",
                        "body": [{
                            "type": "BreakStatement",
                            "label": null
                        }]
                    }
                }],
                "sourceType": "script"
            });
        });

        it('should parse "(false semicolon false \n semicolon \n)"', () => {
            expect(parseScript(`for(false;false
  ;
) {
  break;
}`)).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ForStatement",
                    "init": {
                        "type": "Literal",
                        "value": false
                    },
                    "test": {
                        "type": "Literal",
                        "value": false
                    },
                    "update": null,
                    "body": {
                        "type": "BlockStatement",
                        "body": [{
                            "type": "BreakStatement",
                            "label": null
                        }]
                    }
                }],
                "sourceType": "script"
            });
        });

        it('should parse "for(false semicolon false semicolon false \n)"', () => {
            expect(parseScript(`for(false;false;false
) {
  break;
}`)).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ForStatement",
                    "init": {
                        "type": "Literal",
                        "value": false
                    },
                    "test": {
                        "type": "Literal",
                        "value": false
                    },
                    "update": {
                        "type": "Literal",
                        "value": false
                    },
                    "body": {
                        "type": "BlockStatement",
                        "body": [{
                            "type": "BreakStatement",
                            "label": null
                        }]
                    }
                }],
                "sourceType": "script"
            });
        });

        it('should parse "for ( \n semicolon \n\n semicolon \n)"', () => {
            expect(parseScript(`for(
    ;
    
    ;
) {
  break;
}`)).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ForStatement",
                    "init": null,
                    "test": null,
                    "update": null,
                    "body": {
                        "type": "BlockStatement",
                        "body": [{
                            "type": "BreakStatement",
                            "label": null
                        }]
                    }
                }],
                "sourceType": "script"
            });
        });

        it('should parse "for (false semicolon false \n semicolon false \n)"', () => {
            expect(parseScript(`for(false;false
  ;false
) {
  break;
}`)).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ForStatement",
                    "init": {
                        "type": "Literal",
                        "value": false
                    },
                    "test": {
                        "type": "Literal",
                        "value": false
                    },
                    "update": {
                        "type": "Literal",
                        "value": false
                    },
                    "body": {
                        "type": "BlockStatement",
                        "body": [{
                            "type": "BreakStatement",
                            "label": null
                        }]
                    }
                }],
                "sourceType": "script"
            });
        });

        it('should parse "for ( \n semicolon \n\n semicolon \n)"', () => {
            expect(parseScript(`for(
    ;
    
    ;
) {
  break;
}`)).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ForStatement",
                    "init": null,
                    "test": null,
                    "update": null,
                    "body": {
                        "type": "BlockStatement",
                        "body": [{
                            "type": "BreakStatement",
                            "label": null
                        }]
                    }
                }],
                "sourceType": "script"
            });
        });

        it('should parse "for (false \n semicolon false \n semicolon false \n)"', () => {
            expect(parseScript(`for(false
    ;false
    ;false
) {
  break;
}`)).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ForStatement",
                    "init": {
                        "type": "Literal",
                        "value": false
                    },
                    "test": {
                        "type": "Literal",
                        "value": false
                    },
                    "update": {
                        "type": "Literal",
                        "value": false
                    },
                    "body": {
                        "type": "BlockStatement",
                        "body": [{
                            "type": "BreakStatement",
                            "label": null
                        }]
                    }
                }],
                "sourceType": "script"
            });
        });

        it('should parse "for (false \n two semicolons false \n)"', () => {
            expect(parseScript(`for(false
    ;;false
) {
  break;
}`)).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ForStatement",
                    "init": {
                        "type": "Literal",
                        "value": false
                    },
                    "test": null,
                    "update": {
                        "type": "Literal",
                        "value": false
                    },
                    "body": {
                        "type": "BlockStatement",
                        "body": [{
                            "type": "BreakStatement",
                            "label": null
                        }]
                    }
                }],
                "sourceType": "script"
            });
        });


    });


     describe('Check Var Statement for automatic semicolon insertion', () => {

        it('should throw on invalid "var x \n y"', () => {
            expect(() => {
                parseScript(`var x \n y`)
            }).to.not.throw();
        });

        it('should parse "var x \n ,y"', () => {
            expect(parseScript(`var x \n ,y`)).to.eql({
                "type": "Program",
                "body": [{
                    "type": "VariableDeclaration",
                    "declarations": [{
                            "type": "VariableDeclarator",
                            "id": {
                                "type": "Identifier",
                                "name": "x"
                            },
                            "init": null
                        },
                        {
                            "type": "VariableDeclarator",
                            "id": {
                                "type": "Identifier",
                                "name": "y"
                            },
                            "init": null
                        }
                    ],
                    "kind": "var"
                }],
                "sourceType": "script"
            });
        });

        it('should parse "var \n x \n = \n 1"', () => {
            expect(parseScript(`var \n x \n = \n 1`)).to.eql({
                "type": "Program",
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
                            "value": 1
                        }
                    }],
                    "kind": "var"
                }],
                "sourceType": "script"
            });
        });

        it('should parse "var \n x"', () => {
            expect(parseScript(`var \n x`)).to.eql({
                "type": "Program",
                "body": [{
                    "type": "VariableDeclaration",
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "Identifier",
                            "name": "x"
                        },
                        "init": null
                    }],
                    "kind": "var"
                }],
                "sourceType": "script"
            });
        });
    });

    describe('Check Empty Statement for automatic semicolon insertion', () => {

        it('should parse ";;1;;1;;1"', () => {
            expect(parseScript(`;;1;;1;;1`)).to.eql({
                "type": "Program",
                "body": [{
                        "type": "EmptyStatement"
                    },
                    {
                        "type": "EmptyStatement"
                    },
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "Literal",
                            "value": 1
                        }
                    },
                    {
                        "type": "EmptyStatement"
                    },
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "Literal",
                            "value": 1
                        }
                    },
                    {
                        "type": "EmptyStatement"
                    },
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "Literal",
                            "value": 1
                        }
                    }
                ],
                "sourceType": "script"
            });
        });

        it('should parse ";"', () => {
            expect(parseScript(`;`, {
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "EmptyStatement",
                }],
                "sourceType": "script",
            });
        });


        it('should parse ";;;;"', () => {
            expect(parseScript(`;;;;`)).to.eql({
                "type": "Program",
                "body": [{
                        "type": "EmptyStatement"
                    },
                    {
                        "type": "EmptyStatement"
                    },
                    {
                        "type": "EmptyStatement"
                    },
                    {
                        "type": "EmptyStatement"
                    }
                ],
                "sourceType": "script"
            });
        });

        it('should parse ";;;;"', () => {
            expect(parseScript(`;
;
;
;`)).to.eql({
                "type": "Program",
                "body": [{
                        "type": "EmptyStatement"
                    },
                    {
                        "type": "EmptyStatement"
                    },
                    {
                        "type": "EmptyStatement"
                    },
                    {
                        "type": "EmptyStatement"
                    }
                ],
                "sourceType": "script"
            });
        });

        it('should parse ";;1;;1;;1"', () => {
            expect(parseScript(`;1;
;1
;1;
;1`)).to.eql({
                "type": "Program",
                "body": [{
                        "type": "EmptyStatement"
                    },
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "Literal",
                            "value": 1
                        }
                    },
                    {
                        "type": "EmptyStatement"
                    },
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "Literal",
                            "value": 1
                        }
                    },
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "Literal",
                            "value": 1
                        }
                    },
                    {
                        "type": "EmptyStatement"
                    },
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "Literal",
                            "value": 1
                        }
                    }
                ],
                "sourceType": "script"
            });
        });
    });

    it('should parse semicolons after statements are consumed - "0\n;"', () => {
        expect(parseScript('0\n;')).to.eql({
            "body": [{
                "expression": {
                    "type": "Literal",
                    "value": 0
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it('should parse semicolons after statements are consumed - "(0)\n;"', () => {
        expect(parseScript('(0)\n;')).to.eql({
            "body": [{
                "expression": {
                    "type": "Literal",
                    "value": 0
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it('should parse semicolons after statements are consumed - "debugger\n;"', () => {
        expect(parseScript('debugger\n;')).to.eql({
            "body": [{
                "type": "DebuggerStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });


    it('should parse semicolons after statements are consumed - "throw 0\n;"', () => {
        expect(parseScript(`throw 0
  ;`)).to.eql({
            "body": [{
                "argument": {
                    "type": "Literal",
                    "value": 0
                },
                "type": "ThrowStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });


    it('should parse semicolons after statements are consumed - "function f() { return null\n; }"', () => {
        expect(parseScript('function f() { return null\n; }')).to.eql({
            "type": "Program",
            "body": [{
                "type": "FunctionDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "f"
                },
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "body": [{
                        "type": "ReturnStatement",
                        "argument": {
                            "type": "Literal",
                            "value": null
                        }
                    }]
                },
                "generator": false,
                "expression": false,
                "async": false
            }],
            "sourceType": "script"
        });
    });

    it('should parse semicolons after statements are consumed - "function* f() { yield\n; }"', () => {
        expect(parseScript('function* f() { yield\n; }')).to.eql({
            "type": "Program",
            "body": [{
                "type": "FunctionDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "f"
                },
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "body": [{
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "YieldExpression",
                            "argument": null,
                            "delegate": false
                        }
                    }]
                },
                "generator": true,
                "expression": false,
                "async": false
            }],
            "sourceType": "script"
        });
    });

    it('should parse semicolons after statements are consumed - "if(a)b\n;else c;"', () => {
        expect(parseScript('if(a)b\n;else c;')).to.eql({
            "type": "Program",
            "body": [{
                "type": "IfStatement",
                "test": {
                    "type": "Identifier",
                    "name": "a"
                },
                "consequent": {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "Identifier",
                        "name": "b"
                    }
                },
                "alternate": {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "Identifier",
                        "name": "c"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should does not consume a missing same-line `;` at the end', () => {
        expect(parseScript("\"use strict\"")).to.eql({
    "type": "Program",
    "body": [
          {
            "expression": {
              "type": "Literal",
              "value": "use strict"
           },
            "type": "ExpressionStatement"
          }
        ],
    "sourceType": "script"
});
    });

     it('should does not consume a missing same-line `;` at the end', () => {
        expect(parseScript("'use\\x20strict'")).to.eql({
    "type": "Program",
    "body": [
          {
            "expression": {
              "type": "Literal",
              "value": "use strict"
           },
            "type": "ExpressionStatement"
          }
        ],
    "sourceType": "script"
});
    });


     it('should does not consume a missing same-line `;` at the end', () => {
        expect(parseScript( "\"use\\x20strict\"")).to.eql({
    "type": "Program",
    "body": [
          {
            "expression": {
              "type": "Literal",
              "value": "use strict"
           },
            "type": "ExpressionStatement"
          }
        ],
    "sourceType": "script"
});
    });

    it('should does not consume a missing same-line `;` at the end', () => {
        expect(parseScript('    \t \f\v')).to.eql({
    "type": "Program",
    "body": [],
    "sourceType": "script"
});
    });

    it('should does not consume a missing same-line `;` at the end', () => {
        expect(parseScript(`    \t \f\v 'abc'  \t `)).to.eql({
    "type": "Program",
    "body":  [
          {
            "expression": {
              "type": "Literal",
              "value": "abc"
           },
            "type": "ExpressionStatement"
          }
       ],
    "sourceType": "script"
});
    });

        it('should consume an inserted same-line `;` at the end', () => {
        expect(parseScript(`    \t \f\v;  \t `, )).to.eql({
    "type": "Program",
    "body": [
        {
            "type": "EmptyStatement",
        }
    ],
    "sourceType": "script"
});
    });

     it('should consume an inserted `;` before a string', () => {
        expect(parseScript(`    \t \f\v\n 'abc'  \t `)).to.eql({
    "type": "Program",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "Literal",
                "value": "abc"
            }
        }
    ],
    "sourceType": "script"
});
    });

     it('should consume an inserted `;` before a non-string', () => {
        expect(parseScript(`    \t \f\v\n abc  \t `)).to.eql({
    "type": "Program",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "Identifier",
                 "name": "abc"
            }
        }
    ],
    "sourceType": "script"
});
    });

    it('should consume an semicolon in an function expression with return statement', () => {
        expect(parseScript(`(function(){ return
x; })`)).to.eql({
    "type": "Program",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "FunctionExpression",
                "id": null,
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "body": [
                        {
                            "type": "ReturnStatement",
                            "argument": null
                        },
                        {
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "Identifier",
                                "name": "x"
                            }
                        }
                    ]
                },
                "generator": false,
                "expression": false,
                "async": false
            }
        }
    ],
    "sourceType": "script"
});
    });

 it('should consume an ";" in an while statement', () => {
        expect(parseScript(`while (true) { continue
there; }`)).to.eql({
    "type": "Program",
    "body": [
        {
            "type": "WhileStatement",
            "test": {
                "type": "Literal",
                "value": true
            },
            "body": {
                "type": "BlockStatement",
                "body": [
                    {
                        "type": "ContinueStatement",
                        "label": null
                    },
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "Identifier",
                            "name": "there"
                        }
                    }
                ]
            }
        }
    ],
    "sourceType": "script"
});
    });
    
         it('should consume an inserted same-line `;` at the end', () => {
        expect(parseScript(`    \t \f\v\n`)).to.eql({
    "type": "Program",
    "body": [],
    "sourceType": "script"
});
    });
   it('should consume ASI with yield', () => {
        expect(parseScript(`function *f() { yield\n{}/1/g\n}`)).to.eql({
       "body": [
          {
            "async": false,
            "body": {
              "body": [
                {
                  "expression": {
                  "argument": null,
                    "delegate": false,
                    "type": "YieldExpression"
                  },
                  "type": "ExpressionStatement"
                },
                {
                  "body": [],
                  "type": "BlockStatement"
                },
                {
                  "expression": {
                    "regex": {
                      "flags": "g",
                      "pattern": "1"
                    },
                    "type": "Literal",
                    "value": /1/g,
                  },
                  "type": "ExpressionStatement"
                }
              ],
              "type": "BlockStatement",
            },
            "expression": false,
            "generator": true,
            "id": {
              "name": "f",
              "type": "Identifier"
            },
            "params": [],
            "type": "FunctionDeclaration"
         }
        ],
        "sourceType": "script",
        "type": "Program"
      });
    });

});