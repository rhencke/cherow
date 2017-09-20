import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('JSX', () => {

    it('should fail on adjacent JSX elements not wrapped in an enclosing tag', () => {
        expect(() => {
            parseScript(`<div>one</div><div>two</div>`)
        }).to.throw();
    });

    it('should fail on invalid empty selfclosing', () => {
            expect(() => {
                parseScript(`</>`)
              }).to.throw();
        });

        it('should fail if assigning to a non-empty expression', () => {
            expect(() => {
                parseScript(`<div foo="foo" bar={} baz="baz"/>`)
            }).to.throw();
        });

        
        it('should fail on invalid element', () => {
            expect(() => {
                parseScript(`</>`)
              }).to.throw();
        });
    
        it('should fail on invalid match member', () => {
            expect(() => {
                parseScript(`<foo.bar></foo.baz>`)
            }).to.throw();
        });
    
        it('should fail on invalid closing trail', () => {
            expect(() => {
                parseScript(`<a/!`)
            }).to.throw();
        });
    
        it('should fail on invalid attribute value trail', () => {
            expect(() => {
                parseScript(`<a b=: />`)
            }).to.throw();
        });
    
        it('should fail on invalid match', () => {
            expect(() => {
                parseScript(`node = <strong></em>`)
            }).to.throw();
        });
    
        it('should fail on invalid match namespace', () => {
            expect(() => {
                parseScript(`<svg:path></svg:circle>`)
            }).to.throw();
        });
    
        it('should fail on invalid incomplete member', () => {
            expect(() => {
                parseScript(`<xyz. />`)
            }).to.throw();
        });
    
        it('should fail on invalid start member', () => {
            expect(() => {
                parseScript(`<.abc />`)
              }).to.throw();
        });
    
        it('should fail on invalid start namespace', () => {
            expect(() => {
                parseScript(`<:path />`)
              }).to.throw();
        });
        
        it('should fail on invalid unicode escape in identifier', () => {
    
            expect(() => {
                parseScript('<\u{2F804}></\u{2F804}>');
              }).to.throw();
        });
        
        it('should fail on unterminated string', () => {
    
            expect(() => {
                parseScript('<foo bar="');
            }).to.throw();
        });
    
        it('should throw invalid attribute empty expression', () => {
    
            expect(() => {
                parseScript('<foo bar={} />');
            }).to.throw();
        });
    
        it('should fail on wrong closing tag', () => {
    
            expect(() => {
                parseScript('<Foo></Bar>');
            }).to.throw();
        });
    
        it('should fail on invalid attribute arbitrary expression', () => {
    
            expect(() => {
                parseScript('<Foo bar=bar() />');
            }).to.throw();
        });
        
        it('should fail on "<a foo="bar', () => {
            expect(() => {
                parseScript('<a foo="bar');
            }).to.throw();
        });

        it('should fail on "<dd><e></e></dddd>;', () => {
          expect(() => {
              parseScript('<dd><e></e></dddd>;');
          }).to.throw();
      });

      it('should fail on "<f><g/></ff>;', () => {
        expect(() => {
            parseScript('<f><g/></ff>;');
        }).to.throw();
    });

    it('should fail on "<b.b></b>;', () => {
      expect(() => {
          parseScript('<b.b></b>;');
      }).to.throw();
  });
    
        it('should fail on "<a[foo]></a[foo]>"', () => {
            expect(() => {
                parseScript('<a[foo]></a[foo]>');
            }).to.throw();
        });
    
        it('should fail on <a>{"str";}</a>', () => {
            expect(() => {
                parseScript('<a>{"str";}</a>');
            }).to.throw();
        });
    
        it('should fail on "<div className"app">"', () => {
            expect(() => {
                parseScript('<div className"app">');
            }).to.throw();
        });
    
        it('should fail on "<a b=}>"', () => {
            expect(() => {
                parseScript('<a b=}>');
            }).to.throw();
        });
    
        it('should fail on "<div {...props}>stuff</div {...props}>"', () => {
            expect(() => {
                parseScript('<div {...props}>stuff</div {...props}>');
            }).to.throw();
        });
    
    
        it('should fail on', () => {
    
               expect(() => {
                parseScript('<a b=d />');
            }).to.throw();
            expect(() => {
                parseScript('<a foo="bar');
            }).to.throw();
            expect(() => {
                parseScript('<a:b.c></a:b.c>');
            }).to.throw();
            expect(() => {
                parseScript('<a.b:c></a.b:c>');
            }).to.throw();
            expect(() => {
                parseScript('<a[\'foo\']></a[\'foo\']>');
            }).to.throw();
            expect(() => {
                parseScript('<a b={}>');
            }).to.throw();
            expect(() => {
                parseScript('var x = <div>one</div> /* intervening comment */ <div>two</div>;');
            }).to.throw();
            expect(() => {
                parseScript('<div className"app">');
            }).to.throw();
            expect(() => {
                parseScript('<span className="a", id="b" />');
            }).to.throw();
            expect(() => {
                parseScript('<a b=<}>');
            }).to.throw();
            expect(() => {
                parseScript('<a .../*hai*/asdf/>');
            }).to.throw();
            expect(() => {
                parseScript('<a>}</a>');
            }).to.throw();
            expect(() => {
                parseScript('<a>></a>');
            }).to.throw();
            expect(() => {
                parseScript('<a> ></a>');
            }).to.throw();
            expect(() => {
                parseScript('<.a></.a>');
            }).to.throw();
        });
    
        it('should fail if closing tag does not match opening tag', () => {
            expect(() => {
                parseScript('<div></span>');
            }).to.throw();
        });

        it('should fail if closing tag namespace does not match opening tag namespace', () => {
            expect(() => {
                parseScript('<div:a></div:b>');
            }).to.throw();
        });

        
        it('should parse yield tag', () => {
          expect(parseScript(`function*it(){
            yield <a></a>;
        }`, {
          jsx: true,
          ranges: true,
      })).to.eql({
          "body": [
            {
              "async": false,
             "body": {
                "body": [
                  {
                    "end": 41,
                    "expression": {
                      "argument": {
                        "children": [],
                        "closingElement": {
                         "end": 40,
                          "name": {
                            "end": 39,
                            "name": "a",
                            "start": 38,
                            "type": "JSXIdentifier"
                          },
                          "start": 36,
                          "type": "JSXClosingElement"
                        },
                        "end": 40,
                        "openingElement": {
                          "attributes": [],
                          "end": 36,
                          "name": {
                            "end": 35,
                            "name": "a",
                            "start": 34,
                            "type": "JSXIdentifier"
                          },
                          "selfClosing": false,
                          "start": 33,
                          "type": "JSXOpeningElement"
                        },
                        "start": 33,
                        "type": "JSXElement"
                      },
                      "delegate": false,
                      "end": 40,
                      "start": 27,
                      "type": "YieldExpression"
                    },
                    "start": 27,
                    "type": "ExpressionStatement"
                  }
                ],
                "end": 51,
                "start": 13,
                "type": "BlockStatement"
              },
              "end": 51,
              "expression": false,
              "generator": true,
              "id": {
                "end": 11,
                "name": "it",
                "start": 9,
                "type": "Identifier"
              },
              "params": [],
              "start": 0,
              "type": "FunctionDeclaration",
            }
          ],
          "end": 51,
          "sourceType": "script",
          "start": 0,
          "type": "Program",
        });
    });
        it('should parse conditional wrapped in parenthesis', () => {
          expect(parseScript(`<a b={x ? <c /> : <d />} />`, {
          jsx: true,
          ranges: true,
      })).to.eql({
          "body": [
            {
              "end": 27,
              "expression": {
                "children": [],
               "closingElement": null,
                "end": 27,
                "openingElement": {
                  "attributes": [
                    {
                      "end": 24,
                      "name": {
                       "end": 4,
                        "name": "b",
                        "start": 3,
                        "type": "JSXIdentifier"
                      },
                      "start": 3,
                      "type": "JSXAttribute",
                      "value": {
                        "end": 24,
                        "expression": {
                        "alternate": {
                            "children": [],
                            "closingElement": null,
                            "end": 23,
                            "openingElement": {
                              "attributes": [],
                              "end": 23,
                              "name": {
                               "end": 20,
                                "name": "d",
                                "start": 19,
                                "type": "JSXIdentifier",
                              },
                              "selfClosing": true,
                              "start": 18,
                              "type": "JSXOpeningElement",
                            },
                            "start": 18,
                            "type": "JSXElement"
                          },
                          "consequent": {
                            "children": [],
                            "closingElement": null,
                            "end": 15,
                           "openingElement": {
                              "attributes": [],
                              "end": 15,
                              "name": {
                                "end": 12,
                                "name": "c",
                                "start": 11,
                                "type": "JSXIdentifier"
                              },
                              "selfClosing": true,
                              "start": 10,
                              "type": "JSXOpeningElement"
                            },
                            "start": 10,
                            "type": "JSXElement"
                          },
                          "end": 23,
                          "start": 6,
                          "test": {
                            "end": 7,
                            "name": "x",
                            "start": 6,
                            "type": "Identifier",
                         },
                          "type": "ConditionalExpression"
                        },
                        "start": 5,
                        "type": "JSXExpressionContainer"
                      }
                    }
                  ],
                  "end": 27,
                  "name": {
                    "end": 2,
                    "name": "a",
                   "start": 1,
                    "type": "JSXIdentifier"
                  },
                  "selfClosing": true,
                  "start": 0,
                  "type": "JSXOpeningElement"
                },
                "start": 0,
                "type": "JSXElement"
              },
              "start": 0,
              "type": "ExpressionStatement"
            },
         ],
          "end": 27,
          "sourceType": "script",
          "start": 0,
          "type": "Program",
        });
    });

        it('should parse JSX yield element', () => {
          expect(parseScript(`function *g() { yield <h1>Hello</h1> }`, {
          jsx: true,
          ranges: true,
      })).to.eql({
          "body": [
            {
              "async": false,
              "body": {
                "body": [
                  {
                    "end": 36,
                    "expression": {
                      "argument": {
                        "children": [
                          {
                            "end": 31,
                            "start": 26,
                            "type": "JSXText",
                            "value": "Hello"
                          }
                        ],
                        "closingElement": {
                          "end": 36,
                          "name": {
                            "end": 35,
                            "name": "h1",
                            "start": 33,
                            "type": "JSXIdentifier"
                         },
                          "start": 31,
                          "type": "JSXClosingElement"
                        },
                        "end": 36,
                        "openingElement": {
                          "attributes": [],
                          "end": 26,
                          "name": {
                            "end": 25,
                            "name": "h1",
                            "start": 23,
                            "type": "JSXIdentifier",
                          },
                          "selfClosing": false,
                          "start": 22,
                          "type": "JSXOpeningElement"
                        },
                        "start": 22,
                        "type": "JSXElement"
                      },
                      "delegate": false,
                      "end": 36,
                      "start": 16,
                      "type": "YieldExpression"
                    },
                    "start": 16,
                    "type": "ExpressionStatement"
                  }
                ],
                "end": 38,
                "start": 14,
               "type": "BlockStatement"
              },
              "end": 38,
              "expression": false,
             "generator": true,
              "id": {
                "end": 11,
                "name": "g",
                "start": 10,
                "type": "Identifier"
              },
              "params": [],
              "start": 0,
              "type": "FunctionDeclaration"
           }
          ],
          "end": 38,
          "sourceType": "script",
          "start": 0,
          "type": "Program"
        });
      
      });
        it('should parse simple JSX closing element', () => {
                expect(parseScript(`<span/>`, {
                jsx: true,
                ranges: true,
            })).to.eql({
                "body": [{
                    "expression": {
                        "children": [],
                        "closingElement": null,
                        "openingElement": {
                            "attributes": [],
                            "name": {
                                "name": "span",
                                 "end": 5,
                                 "start": 1,
                                "type": "JSXIdentifier"
                            },
                            "end": 7,
                            "start": 0,
                            "selfClosing": true,
                            "type": "JSXOpeningElement"
                        },
                        "end": 7,
                        "start": 0,
                        "type": "JSXElement"
                    },
                    "end": 7,
                    "start": 0,
                    "type": "ExpressionStatement"
                }],
                "end": 7,
                "start": 0,
                "sourceType": "script",
                "type": "Program"
            });
        });
    
        it('should parse attribute null value', () => {
    
            expect(parseScript(`<input disabled />`, {
                jsx: true,
                ranges: true,
            })).to.eql({
                  "body": [
                    {
                      "end": 18,
                     "expression": {
                        "children": [],
                        "closingElement": null,
                        "end": 18,
                        "openingElement": {
                          "attributes": [
                            {
                              "end": 15,
                              "name": {
                                "end": 15,
                                "name": "disabled",
                                "start": 7,
                                "type": "JSXIdentifier"
                              },
                              "start": 7,
                              "type": "JSXAttribute",
                              "value": null,
                            }
                          ],
                          "end": 18,
                          "name": {
                            "end": 6,
                            "name": "input",
                            "start": 1,
                            "type": "JSXIdentifier"
                          },
                          "selfClosing": true,
                          "start": 0,
                         "type": "JSXOpeningElement"
                        },
                        "start": 0,
                        "type": "JSXElement"
                      },
                      "start": 0,
                      "type": "ExpressionStatement"
                    }
                  ],
                  "end": 18,
                  "sourceType": "script",
                  "start": 0,
                  "type": "Program"
                });
        });
    
        it('should parse attribute spread', () => {
            expect(parseScript(`<span {... style}></span>`, {
                jsx: true,
                ranges: true
            })).to.eql({
                  "body": [
                    {
                      "end": 25,
                      "expression": {
                        "children": [],
                        "closingElement": {
                          "end": 25,
                          "name": {
                            "end": 24,
                            "name": "span",
                            "start": 20,
                            "type": "JSXIdentifier"
                          },
                          "start": 18,
                          "type": "JSXClosingElement"
                        },
                       "end": 25,
                        "openingElement": {
                         "attributes": [
                            {
                              "argument": {
                                "end": 16,
                                "name": "style",
                                "start": 11,
                                "type": "Identifier"
                              },
                              "end": 17,
                              "start": 6,
                              "type": "JSXSpreadAttribute"
                            }
                         ],
                          "end": 18,
                          "name": {
                            "end": 5,
                            "name": "span",
                            "start": 1,
                            "type": "JSXIdentifier"
                          },
                          "selfClosing": false,
                          "start": 0,
                          "type": "JSXOpeningElement"
                        },
                        "start": 0,
                        "type": "JSXElement"
                      },
                      "start": 0,
                      "type": "ExpressionStatement"
                    }
                  ],
                  "end": 25,
                  "sourceType": "script",
                  "start": 0,
                  "type": "Program"
                });
        });
    
    
        it('should parse simple text', () => {
            expect(parseScript(`<b>Hello</b>`, {
                jsx: true,
                ranges: true,
                raw: true
            })).to.eql({
                  "body": [
                    {
                      "end": 12,
                      "expression": {
                        "children": [
                          {
                            "end": 8,
                            "raw": "Hello",
                            "start": 3,
                            "type": "JSXText",
                            "value": "Hello"
                          }
                        ],
                        "closingElement": {
                          "end": 12,
                          "name": {
                            "end": 11,
                            "name": "b",
                            "start": 10,
                            "type": "JSXIdentifier"
                          },
                          "start": 8,
                          "type": "JSXClosingElement"
                        },
                        "end": 12,
                        "openingElement": {
                          "attributes": [],
                          "end": 3,
                          "name": {
                            "end": 2,
                            "name": "b",
                            "start": 1,
                            "type": "JSXIdentifier"
                          },
                          "selfClosing": false,
                          "start": 0,
                          "type": "JSXOpeningElement"
                        },
                        "start": 0,
                        "type": "JSXElement"
                      },
                      "start": 0,
                      "type": "ExpressionStatement"
                    }
                  ],
                  "end": 12,
                  "sourceType": "script",
                  "start": 0,
                  "type": "Program"
                });
        });
    
        it('should parse nested pair', () => {
            expect(parseScript(`<strong><em></em></strong>`, {
                jsx: true,
                ranges: true,
                raw: true
            })).to.eql({
                  "body": [
                    {
                      "end": 26,
                      "expression": {
                        "children": [
                          {
                            "children": [],
                           "closingElement": {
                              "end": 17,
                              "name": {
                               "end": 16,
                                "name": "em",
                                "start": 14,
                                "type": "JSXIdentifier"
                              },
                              "start": 12,
                             "type": "JSXClosingElement"
                            },
                            "end": 17,
                            "openingElement": {
                              "attributes": [],
                              "end": 12,
                              "name": {
                                "end": 11,
                                "name": "em",
                                "start": 9,
                                "type": "JSXIdentifier"
                              },
                              "selfClosing": false,
                              "start": 8,
                              "type": "JSXOpeningElement"
                            },
                            "start": 8,
                            "type": "JSXElement"
                          }
                        ],
                        "closingElement": {
                          "end": 26,
                          "name": {
                            "end": 25,
                            "name": "strong",
                            "start": 19,
                            "type": "JSXIdentifier"
                          },
                          "start": 17,
                          "type": "JSXClosingElement"
                        },
                        "end": 26,
                        "openingElement": {
                         "attributes": [],
                          "end": 8,
                          "name": {
                            "end": 7,
                            "name": "strong",
                            "start": 1,
                            "type": "JSXIdentifier"
                          },
                          "selfClosing": false,
                          "start": 0,
                         "type": "JSXOpeningElement"
                        },
                        "start": 0,
                        "type": "JSXElement"
                      },
                      "start": 0,
                      "type": "ExpressionStatement"
                    }
                  ],
                  "end": 26,
                  "sourceType": "script",
                  "start": 0,
                  "type": "Program"
                });
        });
    
        it('should parse nested element', () => {
            expect(parseScript(`<a>  <b><c/></b> </a>`, {
                jsx: true,
                ranges: false,
                raw: true
            })).to.eql({
                "body": [{
                    "expression": {
                        "children": [{
                                "raw": "  ",
                                "type": "JSXText",
                                "value": "  "
                            },
                            {
                                "children": [{
                                    "children": [],
                                    "closingElement": null,
                                    "openingElement": {
                                        "attributes": [],
                                        "name": {
                                            "name": "c",
                                            "type": "JSXIdentifier"
                                        },
                                        "selfClosing": true,
                                        "type": "JSXOpeningElement"
                                    },
                                    "type": "JSXElement"
                                }],
                                "closingElement": {
                                    "name": {
                                        "name": "b",
                                        "type": "JSXIdentifier"
                                    },
                                    "type": "JSXClosingElement"
                                },
                                "openingElement": {
                                    "attributes": [],
                                    "name": {
                                        "name": "b",
                                        "type": "JSXIdentifier"
                                    },
                                    "selfClosing": false,
                                    "type": "JSXOpeningElement"
                                },
                                "type": "JSXElement"
                            },
                            {
                                "raw": " ",
                                "type": "JSXText",
                                "value": " "
                            }
                        ],
                        "closingElement": {
                            "name": {
                                "name": "a",
                                "type": "JSXIdentifier"
                            },
                            "type": "JSXClosingElement"
                        },
                        "openingElement": {
                            "attributes": [],
                            "name": {
                                "name": "a",
                                "type": "JSXIdentifier"
                            },
                            "selfClosing": false,
                            "type": "JSXOpeningElement"
                        },
                        "type": "JSXElement"
                    },
                    "type": "ExpressionStatement"
                }],
                "sourceType": "script",
                "type": "Program"
            });
        });
    
        it('should parse multiline text', () => {
            expect(parseScript(`<em>
                                        One
                                        Two
                                        Three
                                        </em>`, {
                jsx: true,
                ranges: true,
                raw: true
            })).to.eql({
                  "body": [
                    {
                      "end": 184,
                      "expression": {
                        "children": [
                          {
                            "end": 179,
                            "raw": "\n                                        One\n                                        Two\n                                        Three\n                                        ",
                            "start": 4,
                            "type": "JSXText",
                            "value": "\n                                        One\n                                        Two\n                                        Three\n                                        ",
                          }
                        ],
                        "closingElement": {
                         "end": 184,
                          "name": {
                            "end": 183,
                            "name": "em",
                           "start": 181,
                            "type": "JSXIdentifier"
                         },
                          "start": 179,
                          "type": "JSXClosingElement"
                        },
                        "end": 184,
                        "openingElement": {
                          "attributes": [],
                          "end": 4,
                          "name": {
                            "end": 3,
                            "name": "em",
                           "start": 1,
                            "type": "JSXIdentifier"
                          },
                          "selfClosing": false,
                          "start": 0,
                         "type": "JSXOpeningElement"
                        },
                        "start": 0,
                        "type": "JSXElement"
                      },
                      "start": 0,
                      "type": "ExpressionStatement"
                    }
                  ],
                  "end": 184,
                  "sourceType": "script",
                  "start": 0,
                  "type": "Program"
                });
        });
    
        it('should parse multi attributes', () => {
            expect(parseScript(`<home xlink:type="simple" other="foo" ></home>`, {
                jsx: true,
                ranges: false,
                raw: true
            })).to.eql({
                "body": [{
                    "expression": {
                        "children": [],
                        "closingElement": {
                            "name": {
                                "name": "home",
                                "type": "JSXIdentifier"
                            },
                            "type": "JSXClosingElement"
                        },
                        "openingElement": {
                            "attributes": [{
                                    "name": {
                                        "name": {
                                            "name": "type",
                                            "type": "JSXIdentifier"
                                        },
                                        "namespace": {
                                            "name": "xlink",
                                            "type": "JSXIdentifier"
                                        },
                                        "type": "JSXNamespacedName"
                                    },
                                    "type": "JSXAttribute",
                                    "value": {
                                        "raw": "\"simple\"",
                                        "type": "Literal",
                                        "value": "simple"
                                    }
                                },
                                {
                                    "name": {
                                        "name": "other",
                                        "type": "JSXIdentifier"
                                    },
                                    "type": "JSXAttribute",
                                    "value": {
                                        "raw": "\"foo\"",
                                        "type": "Literal",
                                        "value": "foo"
                                    }
                                }
                            ],
                            "name": {
                                "name": "home",
                                "type": "JSXIdentifier"
                            },
                            "selfClosing": false,
                            "type": "JSXOpeningElement"
                        },
                        "type": "JSXElement"
                    },
                    "type": "ExpressionStatement"
                }],
                "sourceType": "script",
                "type": "Program"
            });
        });
      
        it('should parse this + arrow correctly', () => {
          expect(parseScript(`(() => <this />)`, {
              jsx: true,
              ranges: true,
              raw: true
          })).to.eql({
              "body": [
                {
                  "end": 16,
                  "expression": {
                    "async": false,
                    "body": {
                      "children": [],
                      "closingElement": null,
                     "end": 15,
                      "openingElement": {
                        "attributes": [],
                        "end": 15,
                        "name": {
                          "end": 12,
                          "name": "this",
                          "start": 8,
                          "type": "JSXIdentifier"
                        },
                        "selfClosing": true,
                        "start": 7,
                        "type": "JSXOpeningElement"
                      },
                      "start": 7,
                      "type": "JSXElement"
                    },
                    "end": 15,
                    "expression": true,
                    "generator": false,
                    "id": null,
                    "params": [],
                    "start": 1,
                    "type": "ArrowFunctionExpression"
                  },
                 "start": 0,
                  "type": "ExpressionStatement"
                }
              ],
              "end": 16,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
        });
        
        it('should parse simple namespace', () => {
          expect(parseScript(`x = () => <arguments.length />`, {
              jsx: true,
              ranges: true,
              raw: true
          })).to.eql({
              "body": [
                {
                  "end": 30,
                  "expression": {
                    "end": 30,
                    "left": {
                      "end": 1,
                      "name": "x",
                      "start": 0,
                      "type": "Identifier"
                    },
                    "operator": "=",
                    "right": {
                      "async": false,
                      "body": {
                        "children": [],
                        "closingElement": null,
                        "end": 30,
                        "openingElement": {
                          "attributes": [],
                          "end": 30,
                          "name": {
                            "end": 27,
                            "object": {
                              "end": 20,
                              "name": "arguments",
                              "start": 11,
                              "type": "JSXIdentifier"
                            },
                            "property": {
                              "end": 27,
                              "name": "length",
                              "start": 21,
                              "type": "JSXIdentifier"
                            },
                            "start": 11,
                            "type": "JSXMemberExpression"
                          },
                         "selfClosing": true,
                          "start": 10,
                          "type": "JSXOpeningElement"
                       },
                        "start": 10,
                        "type": "JSXElement"
                      },
                      "end": 30,
                      "expression": true,
                      "generator": false,
                      "id": null,
                      "params": [],
                      "start": 4,
                      "type": "ArrowFunctionExpression"
                    },
                    "start": 0,
                    "type": "AssignmentExpression"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
                }
              ],
              "end": 30,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
        });
        
        it('should parse simple namespace', () => {
          expect(parseScript(`() => <this.foo />`, {
              jsx: true,
              ranges: true,
              raw: true,
              plugins: { jsx: true }
          })).to.eql({
              "body": [
                {
                  "end": 18,
                  "expression": {
                    "body": {
                      "children": [],
                      "closingElement": null,
                      "end": 18,
                      "openingElement": {
                       "attributes": [],
                        "end": 18,
                        "name": {
                          "end": 15,
                          "object": {
                            "end": 11,
                            "name": "this",
                            "start": 7,
                            "type": "JSXIdentifier"
                          },
                          "property": {
                            "end": 15,
                            "name": "foo",
                            "start": 12,
                            "type": "JSXIdentifier"
                          },
                          "start": 7,
                          "type": "JSXMemberExpression"
                        },
                        "selfClosing": true,
                        "start": 6,
                        "type": "JSXOpeningElement"
                      },
                      "start": 6,
                      "type": "JSXElement"
                    },
                   "end": 18,
                    "expression": true,
                    "generator": false,
                    "async": false,
                    "id": null,
                    "params": [],
                    "start": 0,
                    "type": "ArrowFunctionExpression"
                  },
                  "start": 0,
                 "type": "ExpressionStatement"
                }
              ],
              "end": 18,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
        });
        it('should parse simple namespace', () => {
            expect(parseScript(`<svg:path/>`, {
                jsx: true,
                ranges: true,
                raw: true
            })).to.eql({
                  "body": [
                    {
                      "end": 11,
                      "expression": {
                        "children": [],
                        "closingElement": null,
                        "end": 11,
                        "openingElement": {
                          "attributes": [],
                          "end": 11,
                          "name": {
                            "end": 9,
                            "name": {
                              "end": 9,
                              "name": "path",
                              "start": 5,
                              "type": "JSXIdentifier"
                            },
                           "namespace": {
                              "end": 4,
                              "name": "svg",
                              "start": 1,
                              "type": "JSXIdentifier"
                            },
                            "start": 1,
                            "type": "JSXNamespacedName"
                          },
                          "selfClosing": true,
                          "start": 0,
                          "type": "JSXOpeningElement"
                        },
                        "start": 0,
                        "type": "JSXElement"
                      },
                      "start": 0,
                      "type": "ExpressionStatement"
                    }
                  ],
                  "end": 11,
                  "sourceType": "script",
                  "start": 0,
                  "type": "Program"
                });
        });
    
    
        it('should parse simple member', () => {
            expect(parseScript(`<earth.america />`, {
                jsx: true,
                ranges: true,
                raw: true
            })).to.eql({
                  "body": [
                    {
                      "end": 17,
                      "expression": {
                        "children": [],
                        "closingElement": null,
                        "end": 17,
                        "openingElement": {
                          "attributes": [],
                          "end": 17,
                         "name": {
                            "end": 14,
                           "object": {
                              "end": 6,
                              "name": "earth",
                             "start": 1,
                              "type": "JSXIdentifier"
                            },
                           "property": {
                              "end": 14,
                              "name": "america",
                              "start": 7,
                              "type": "JSXIdentifier"
                            },
                            "start": 1,
                            "type": "JSXMemberExpression"
                          },
                          "selfClosing": true,
                          "start": 0,
                          "type": "JSXOpeningElement"
                        },
                        "start": 0,
                        "type": "JSXElement"
                      },
                      "start": 0,
                      "type": "ExpressionStatement"
                    }
                  ],
                  "end": 17,
                  "sourceType": "script",
                  "start": 0,
                  "type": "Program"
                });
        });
    
        it('should parse long member', () => {
            expect(parseScript(`<SolarSystem.Earth.America.USA.California.mountain />`, {
                jsx: true,
                ranges: true,
                raw: true
            })).to.eql({
                  "body": [
                    {
                      "end": 53,
                      "expression": {
                        "children": [],
                        "closingElement": null,
                        "end": 53,
                       "openingElement": {
                          "attributes": [],
                          "end": 53,
                          "name": {
                            "end": 50,
                            "object": {
                             "end": 41,
                              "object": {
                                "end": 30,
                                "object": {
                                  "end": 26,
                                  "object": {
                                    "end": 18,
                                    "object": {
                                      "end": 12,
                                      "name": "SolarSystem",
                                      "start": 1,
                                      "type": "JSXIdentifier"
                                    },
                                    "property": {
                                      "end": 18,
                                      "name": "Earth",
                                     "start": 13,
                                      "type": "JSXIdentifier"
                                    },
                                    "start": 1,
                                    "type": "JSXMemberExpression"
                                  },
                                  "property": {
                                    "end": 26,
                                    "name": "America",
                                    "start": 19,
                                    "type": "JSXIdentifier"
                                 },
                                  "start": 1,
                                  "type": "JSXMemberExpression"
                                },
                                "property": {
                                  "end": 30,
                                  "name": "USA",
                                  "start": 27,
                                  "type": "JSXIdentifier"
                                },
                                "start": 1,
                                "type": "JSXMemberExpression"
                              },
                             "property": {
                                "end": 41,
                               "name": "California",
                                "start": 31,
                                "type": "JSXIdentifier"
                              },
                              "start": 1,
                              "type": "JSXMemberExpression"
                            },
                            "property": {
                              "end": 50,
                              "name": "mountain",
                              "start": 42,
                              "type": "JSXIdentifier"
                            },
                            "start": 1,
                            "type": "JSXMemberExpression"
                          },
                          "selfClosing": true,
                          "start": 0,
                          "type": "JSXOpeningElement"
                        },
                        "start": 0,
                        "type": "JSXElement"
                      },
                      "start": 0,
                      "type": "ExpressionStatement"
                    },
                  ],
                  "end": 53,
                  "sourceType": "script",
                  "start": 0,
                  "type": "Program"
                });
        });
    
        it('should parse empty expression container', () => {
    
            expect(parseScript(`<body>{}</body>`, {
                jsx: true,
                ranges: false
            })).to.eql({
                "body": [{
                    "expression": {
                        "children": [{
                            "expression": {
                                "type": "JSXEmptyExpression"
                            },
                            "type": "JSXExpressionContainer"
                        }],
                        "closingElement": {
                            "name": {
                                "name": "body",
                                "type": "JSXIdentifier"
                            },
                            "type": "JSXClosingElement"
                        },
                        "openingElement": {
                            "attributes": [],
                            "name": {
                                "name": "body",
                                "type": "JSXIdentifier"
                            },
                            "selfClosing": false,
                            "type": "JSXOpeningElement"
                        },
                        "type": "JSXElement"
                    },
                    "type": "ExpressionStatement"
                }],
                "sourceType": "script",
                "type": "Program"
            });
        });
        
       
        it('should parse multiple spread', () => {
            
                    expect(parseScript(`<Test {...withA} {...withB} />;`, {
                        jsx: true,
                        ranges: true
                    })).to.eql({
                          "body": [
                            {
                              "end": 31,
                              "expression": {
                                "children": [],
                                "closingElement": null,
                                "end": 30,
                               "openingElement": {
                                  "attributes": [
                                  {
                                      "argument": {
                                       "end": 15,
                                        "name": "withA",
                                        "start": 10,
                                        "type": "Identifier"
                                      },
                                      "end": 16,
                                      "start": 6,
                                      "type": "JSXSpreadAttribute"
                                    },
                                    {
                                      "argument": {
                                        "end": 26,
                                        "name": "withB",
                                        "start": 21,
                                        "type": "Identifier"
                                      },
                                      "end": 27,
                                      "start": 17,
                                      "type": "JSXSpreadAttribute"
                                    }
                                  ],
                                  "end": 30,
                                  "name": {
                                    "end": 5,
                                    "name": "Test",
                                    "start": 1,
                                    "type": "JSXIdentifier"
                                  },
                                  "selfClosing": true,
                                  "start": 0,
                                  "type": "JSXOpeningElement"
                                },
                                "start": 0,
                                "type": "JSXElement"
                              },
                              "start": 0,
                              "type": "ExpressionStatement"
                            }
                          ],
                          "end": 31,
                          "sourceType": "script",
                          "start": 0,
                          "type": "Program"
                        });
                });
    
        it('should parse empty child comment', () => {
    
            expect(parseScript(`<adele>{/* Hello from this side */}</adele>`, {
                jsx: true,
                ranges: false
            })).to.eql({
                "body": [{
                    "expression": {
                        "children": [{
                            "expression": {
                                "type": "JSXEmptyExpression"
                            },
                            "type": "JSXExpressionContainer"
                        }],
                        "closingElement": {
                            "name": {
                                "name": "adele",
                                "type": "JSXIdentifier"
                            },
                            "type": "JSXClosingElement"
                        },
                        "openingElement": {
                            "attributes": [],
                            "name": {
                                "name": "adele",
                                "type": "JSXIdentifier"
                            },
                            "selfClosing": false,
                            "type": "JSXOpeningElement"
                        },
                        "type": "JSXElement"
                    },
                    "type": "ExpressionStatement"
                }],
                "sourceType": "script",
                "type": "Program"
            });
        });
    
        it('should parse conteainer series', () => {
    
            expect(parseScript(`<span>{x}{y}{z}</span>`, {
                jsx: true,
                ranges: false
            })).to.eql({
                "body": [{
                    "expression": {
                        "children": [{
                                "expression": {
                                    "name": "x",
                                    "type": "Identifier"
                                },
                                "type": "JSXExpressionContainer"
                            },
                            {
                                "expression": {
                                    "name": "y",
                                    "type": "Identifier"
                                },
                                "type": "JSXExpressionContainer"
                            },
                            {
                                "expression": {
                                    "name": "z",
                                    "type": "Identifier"
                                },
                                "type": "JSXExpressionContainer"
                            }
                        ],
                        "closingElement": {
                            "name": {
                                "name": "span",
                                "type": "JSXIdentifier"
                            },
                            "type": "JSXClosingElement"
                        },
                        "openingElement": {
                            "attributes": [],
                            "name": {
                                "name": "span",
                                "type": "JSXIdentifier"
                            },
                            "selfClosing": false,
                            "type": "JSXOpeningElement"
                        },
                        "type": "JSXElement"
                    },
                    "type": "ExpressionStatement"
                }],
                "sourceType": "script",
                "type": "Program"
            });
        });
    
        it('sould parse "<b>{1}</b>"', () => {
            expect(parseScript('<b>{1}</b>', {
                jsx: true,
                raw: true,
                ranges: true
            })).to.eql({
                  "body": [
                    {
                      "end": 10,
                     "expression": {
                        "children": [
                         {
                            "end": 6,
                            "expression": {
                              "end": 5,
                              "raw": "1",
                              "start": 4,
                              "type": "Literal",
                              "value": 1
                            },
                            "start": 3,
                            "type": "JSXExpressionContainer"
                          }
                        ],
                        "closingElement": {
                          "end": 10,
                          "name": {
                            "end": 9,
                           "name": "b",
                            "start": 8,
                            "type": "JSXIdentifier"
                          },
                          "start": 6,
                          "type": "JSXClosingElement"
                        },
                        "end": 10,
                        "openingElement": {
                          "attributes": [],
                          "end": 3,
                          "name": {
                            "end": 2,
                            "name": "b",
                            "start": 1,
                            "type": "JSXIdentifier"
                          },
                          "selfClosing": false,
                          "start": 0,
                          "type": "JSXOpeningElement"
                        },
                        "start": 0,
                        "type": "JSXElement"
                      },
                      "start": 0,
                      "type": "ExpressionStatement"
                    }
                  ],
                  "end": 10,
                  "sourceType": "script",
                  "start": 0,
                  "type": "Program"
                });
        });
    
        it('should parse "<a>{/* this\nis\na\nmulti-line\ncomment */}</a>"', () => {
            expect(parseScript('<a>{/* this\nis\na\nmulti-line\ncomment */}</a>', {
                jsx: true,
                ranges: true
            })).to.eql({
                  "body": [
                    {
                      "end": 43,
                      "expression": {
                        "children": [
                          {
                            "end": 39,
                            "expression": {
                              "end": 38,
                              "start": 4,
                              "type": "JSXEmptyExpression"
                            },
                            "start": 3,
                            "type": "JSXExpressionContainer"
                          }
                        ],
                        "closingElement": {
                          "end": 43,
                          "name": {
                            "end": 42,
                            "name": "a",
                            "start": 41,
                            "type": "JSXIdentifier"
                         },
                          "start": 39,
                          "type": "JSXClosingElement"
                        },
                        "end": 43,
                        "openingElement": {
                          "attributes": [],
                          "end": 3,
                          "name": {
                            "end": 2,
                            "name": "a",
                            "start": 1,
                            "type": "JSXIdentifier"
                          },
                          "selfClosing": false,
                          "start": 0,
                          "type": "JSXOpeningElement"
                        },
                        "start": 0,
                        "type": "JSXElement"
                      },
                      "start": 0,
                      "type": "ExpressionStatement"
                    }
                  ],
                  "end": 43,
                  "sourceType": "script",
                  "start": 0,
                  "type": "Program"
                });
        });
    
    
        it('should parse "<div {...props} post="attribute" />"', () => {
    
            expect(parseScript('<div {...props} post="attribute" />', {
                jsx: true,
                raw: true,
                ranges: true
            })).to.eql({
                  "body": [
                    {
                      "end": 35,
                      "expression": {
                        "children": [],
                        "closingElement": null,
                        "end": 35,
                        "openingElement": {
                          "attributes": [
                            {
                             "argument": {
                                "end": 14,
                                "name": "props",
                                "start": 9,
                                "type": "Identifier"
                              },
                             "end": 15,
                              "start": 5,
                              "type": "JSXSpreadAttribute"
                            },
                            {
                              "end": 32,
                              "name": {
                                "end": 20,
                                "name": "post",
                                "start": 16,
                                "type": "JSXIdentifier"
                              },
                             "start": 16,
                              "type": "JSXAttribute",
                              "value": {
                                "end": 32,
                                "raw": "\"attribute\"",
                                "start": 21,
                                "type": "Literal",
                                "value": "attribute"
                              }
                            }
                          ],
                          "end": 35,
                          "name": {
                            "end": 4,
                            "name": "div",
                            "start": 1,
                            "type": "JSXIdentifier"
                         },
                          "selfClosing": true,
                          "start": 0,
                          "type": "JSXOpeningElement"
                        },
                        "start": 0,
                        "type": "JSXElement"
                      },
                      "start": 0,
                      "type": "ExpressionStatement"
                    }
                  ],
                  "end": 35,
                  "sourceType": "script",
                  "start": 0,
                  "type": "Program"
                });
        }); 
       
        it('should pass', () => {
    
            expect(parseScript('<a>{}</a>', {
                jsx: true,
                ranges: true
            })).to.eql({
                  "body": [
                    {
                      "end": 9,
                      "expression": {
                        "children": [
                          {
                            "end": 5,
                            "expression": {
                              "end": 4,
                              "start": 4,
                              "type": "JSXEmptyExpression"
                            },
                            "start": 3,
                            "type": "JSXExpressionContainer"
                          }
                       ],
                        "closingElement": {
                          "end": 9,
                          "name": {
                            "end": 8,
                            "name": "a",
                            "start": 7,
                            "type": "JSXIdentifier"
                          },
                          "start": 5,
                          "type": "JSXClosingElement"
                        },
                        "end": 9,
                        "openingElement": {
                          "attributes": [],
                          "end": 3,
                          "name": {
                           "end": 2,
                            "name": "a",
                            "start": 1,
                            "type": "JSXIdentifier"
                          },
                          "selfClosing": false,
                          "start": 0,
                         "type": "JSXOpeningElement"
                        },
                        "start": 0,
                        "type": "JSXElement"
                      },
                      "start": 0,
                      "type": "ExpressionStatement"
                    }
                  ],
                  "end": 9,
                  "sourceType": "script",
                  "start": 0,
                  "type": "Program"
                });
    
            expect(parseScript('<a>{\r\n}</a>', {
                jsx: true,
                ranges: true
            })).to.eql({
                  "body": [
                    {
                      "end": 11,
                      "expression": {
                        "children": [
                          {
                            "end": 7,
                            "expression": {
                              "end": 6,
                              "start": 4,
                              "type": "JSXEmptyExpression"
                            },
                            "start": 3,
                            "type": "JSXExpressionContainer"
                          }
                        ],
                        "closingElement": {
                          "end": 11,
                          "name": {
                            "end": 10,
                            "name": "a",
                            "start": 9,
                            "type": "JSXIdentifier"
                          },
                          "start": 7,
                          "type": "JSXClosingElement"
                        },
                        "end": 11,
                        "openingElement": {
                          "attributes": [],
                          "end": 3,
                          "name": {
                            "end": 2,
                            "name": "a",
                            "start": 1,
                            "type": "JSXIdentifier"
                          },
                          "selfClosing": false,
                          "start": 0,
                          "type": "JSXOpeningElement"
                        },
                       "start": 0,
                        "type": "JSXElement"
                      },
                      "start": 0,
                      "type": "ExpressionStatement"
                    }
                  ],
                  "end": 11,
                  "sourceType": "script",
                  "start": 0,
                  "type": "Program"
                });
    
        });
    
        it('should handle null attribute value', () => {
            expect(parseScript(`<rect option:square />`, {
                jsx: true,
                ranges: true
            })).to.eql({
                  "body": [
                    {
                      "end": 22,
                      "expression": {
                        "children": [],
                        "closingElement": null,
                        "end": 22,
                        "openingElement": {
                          "attributes": [
                            {
                              "end": 19,
                              "name": {
                                "end": 19,
                                "name": {
                                  "end": 19,
                                  "name": "square",
                                  "start": 13,
                                  "type": "JSXIdentifier"
                                },
                                "namespace": {
                                  "end": 12,
                                  "name": "option",
                                  "start": 6,
                                  "type": "JSXIdentifier"
                                },
                                "start": 6,
                                "type": "JSXNamespacedName"
                              },
                              "start": 6,
                              "type": "JSXAttribute",
                              "value": null,
                            }
                          ],
                          "end": 22,
                          "name": {
                            "end": 5,
                           "name": "rect",
                            "start": 1,
                            "type": "JSXIdentifier"
                          },
                          "selfClosing": true,
                          "start": 0,
                          "type": "JSXOpeningElement"
                        },
                        "start": 0,
                        "type": "JSXElement"
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
    
    
    
        it('should parse "<div {...c}> {...children}{a}{...b}</div>"', () => {
            expect(parseScript('<div {...c}> {...children}{a}{...b}</div>', {
                jsx: true,
                ranges: true
            })).to.eql({
                  "body": [
                    {
                      "end": 41,
                      "expression": {
                        "children": [
                          {
                            "end": 13,
                            "start": 12,
                            "type": "JSXText",
                            "value": " "
                          },
                          {
                            "end": 26,
                            "expression": {
                              "end": 25,
                              "name": "children",
                              "start": 17,
                              "type": "Identifier"
                            },
                            "start": 14,
                            "type": "JSXSpreadChild"
                          },
                          {
                            "end": 29,
                            "expression": {
                              "end": 28,
                             "name": "a",
                              "start": 27,
                             "type": "Identifier"
                            },
                            "start": 26,
                            "type": "JSXExpressionContainer"
                          },
                          {
                            "end": 35,
                            "expression": {
                              "end": 34,
                             "name": "b",
                              "start": 33,
                              "type": "Identifier"
                            },
                            "start": 30,
                            "type": "JSXSpreadChild"
                          }
                        ],
                       "closingElement": {
                          "end": 41,
                          "name": {
                            "end": 40,
                            "name": "div",
                            "start": 37,
                            "type": "JSXIdentifier"
                          },
                         "start": 35,
                          "type": "JSXClosingElement"
                        },
                        "end": 41,
                       "openingElement": {
                          "attributes": [
                            {
                              "argument": {
                                "end": 10,
                                "name": "c",
                                "start": 9,
                                "type": "Identifier"
                              },
                              "end": 11,
                              "start": 5,
                              "type": "JSXSpreadAttribute"
                            }
                          ],
                          "end": 12,
                          "name": {
                            "end": 4,
                            "name": "div",
                            "start": 1,
                            "type": "JSXIdentifier"
                          },
                          "selfClosing": false,
                          "start": 0,
                          "type": "JSXOpeningElement"
                        },
                        "start": 0,
                        "type": "JSXElement"
                      },
                      "start": 0,
                      "type": "ExpressionStatement"
                    }
                  ],
                  "end": 41,
                  "sourceType": "script",
                  "start": 0,
                  "type": "Program"
                });
        });

        it('should parse "<a.b></a.b>"', () => {
            expect(parseScript('<a.b></a.b>', {
                jsx: true,
                ranges: true
            })).to.eql({
                  "body": [
                    {
                      "end": 11,
                      "expression": {
                        "children": [],
                        "closingElement": {
                          "end": 11,
                         "name": {
                            "end": 10,
                            "object": {
                              "end": 8,
                              "name": "a",
                              "start": 7,
                              "type": "JSXIdentifier"
                            },
                            "property": {
                              "end": 10,
                              "name": "b",
                              "start": 9,
                              "type": "JSXIdentifier"
                            },
                            "start": 7,
                            "type": "JSXMemberExpression"
                          },
                          "start": 5,
                          "type": "JSXClosingElement"
                        },
                        "end": 11,
                        "openingElement": {
                          "attributes": [],
                          "end": 5,
                          "name": {
                            "end": 4,
                            "object": {
                              "end": 2,
                              "name": "a",
                              "start": 1,
                              "type": "JSXIdentifier"
                            },
                            "property": {
                              "end": 4,
                              "name": "b",
                              "start": 3,
                              "type": "JSXIdentifier"
                            },
                            "start": 1,
                            "type": "JSXMemberExpression"
                          },
                          "selfClosing": false,
                          "start": 0,
                          "type": "JSXOpeningElement"
                        },
                        "start": 0,
                        "type": "JSXElement"
                      },
                      "start": 0,
                      "type": "ExpressionStatement"
                    }
                  ],
                  "end": 11,
                  "sourceType": "script",
                  "start": 0,
                  "type": "Program"
                });
        });
    
    
        it('should parse "<div><br />7x invalid-js-identifier</div>"', () => {
            expect(parseScript('<div><br />7x invalid-js-identifier</div>', {
                jsx: true,
                raw: true,
                ranges: true
            })).to.eql({
                  "body": [
                    {
                      "end": 41,
                      "expression": {
                        "children": [
                          {
                            "children": [],
                            "closingElement": null,
                            "end": 11,
                            "openingElement": {
                              "attributes": [],
                              "end": 11,
                              "name": {
                               "end": 8,
                                "name": "br",
                                "start": 6,
                                "type": "JSXIdentifier"
                              },
                             "selfClosing": true,
                              "start": 5,
                              "type": "JSXOpeningElement"
                            },
                            "start": 5,
                            "type": "JSXElement"
                          },
                         {
                            "end": 35,
                            "raw": "7x invalid-js-identifier",
                            "start": 11,
                            "type": "JSXText",
                            "value": "7x invalid-js-identifier"
                          }
                       ],
                        "closingElement": {
                          "end": 41,
                          "name": {
                            "end": 40,
                            "name": "div",
                            "start": 37,
                            "type": "JSXIdentifier"
                          },
                          "start": 35,
                          "type": "JSXClosingElement"
                        },
                        "end": 41,
                       "openingElement": {
                          "attributes": [],
                          "end": 5,
                          "name": {
                            "end": 4,
                            "name": "div",
                            "start": 1,
                            "type": "JSXIdentifier"
                          },
                          "selfClosing": false,
                          "start": 0,
                         "type": "JSXOpeningElement"
                        },
                        "start": 0,
                        "type": "JSXElement"
                      },
                      "start": 0,
                      "type": "ExpressionStatement"
                    }
                  ],
                  "end": 41,
                  "sourceType": "script",
                  "start": 0,
                  "type": "Program"
                });
        });
    
    
    
        it('should parse "<A>&#1f4a9;</A>"', () => {
            expect(parseScript('<A>&#1f4a9;</A>', {
                jsx: true,
                raw: true
            })).to.eql({
                "body": [{
                    "expression": {
                        "children": [{
                            "raw": "&#1f4a9;",
                            "type": "JSXText",
                            "value": "&#1f4a9;"
                        }, ],
                        "closingElement": {
                            "name": {
                                "name": "A",
                                "type": "JSXIdentifier",
                            },
                            "type": "JSXClosingElement"
                        },
                        "openingElement": {
                            "attributes": [],
                            "name": {
                                "name": "A",
                                "type": "JSXIdentifier"
                            },
                            "selfClosing": false,
                            "type": "JSXOpeningElement",
                        },
                        "type": "JSXElement"
                    },
                    "type": "ExpressionStatement"
                }],
                "sourceType": "script",
                "type": "Program"
            });
        });
    
        it('should parse "<a>{/* this is a comment */}</a>"', () => {
            expect(parseScript('<a>{/* this is a comment */}</a>', {
                jsx: true,
                ranges: true
            })).to.eql({
                  "body": [
                    {
                      "end": 32,
                      "expression": {
                        "children": [
                         {
                            "end": 28,
                            "expression": {
                              "end": 27,
                              "start": 4,
                              "type": "JSXEmptyExpression"
                            },
                            "start": 3,
                            "type": "JSXExpressionContainer"
                          }
                        ],
                       "closingElement": {
                          "end": 32,
                          "name": {
                           "end": 31,
                            "name": "a",
                            "start": 30,
                            "type": "JSXIdentifier"
                          },
                          "start": 28,
                          "type": "JSXClosingElement"
                        },
                        "end": 32,
                        "openingElement": {
                          "attributes": [],
                          "end": 3,
                          "name": {
                            "end": 2,
                            "name": "a",
                            "start": 1,
                            "type": "JSXIdentifier"
                          },
                          "selfClosing": false,
                          "start": 0,
                          "type": "JSXOpeningElement"
                        },
                        "start": 0,
                        "type": "JSXElement"
                      },
                      "start": 0,
                      "type": "ExpressionStatement"
                    }
                  ],
                  "end": 32,
                  "sourceType": "script",
                  "start": 0,
                  "type": "Program"
                });
        });
    
    
        it('should parse "<div pre="leading" pre2="attribute" {...props}></div>"', () => {
            expect(parseScript('<div pre="leading" pre2="attribute" {...props}></div>', {
                jsx: true,
                raw: true
            })).to.eql({
                "body": [{
                    "expression": {
                        "children": [],
                        "closingElement": {
                            "name": {
                                "name": "div",
                                "type": "JSXIdentifier"
                            },
                            "type": "JSXClosingElement"
                        },
                        "openingElement": {
                            "attributes": [{
                                    "name": {
                                        "name": "pre",
                                        "type": "JSXIdentifier"
                                    },
                                    "type": "JSXAttribute",
                                    "value": {
                                        "raw": "\"leading\"",
                                        "type": "Literal",
                                        "value": "leading"
                                    }
                                },
                                {
                                    "name": {
                                        "name": "pre2",
                                        "type": "JSXIdentifier",
                                    },
                                    "type": "JSXAttribute",
                                    "value": {
                                        "raw": "\"attribute\"",
                                        "type": "Literal",
                                        "value": "attribute"
                                    },
                                },
                                {
                                    "argument": {
                                        "name": "props",
                                        "type": "Identifier"
                                    },
                                    "type": "JSXSpreadAttribute"
                                },
                            ],
                            "name": {
                                "name": "div",
                                "type": "JSXIdentifier",
                            },
                            "selfClosing": false,
                            "type": "JSXOpeningElement"
                        },
                        "type": "JSXElement"
                    },
                    "type": "ExpressionStatement"
                }, ],
                "sourceType": "script",
                "type": "Program"
            });
        });
    
    
        it('should handle keyword tag', () => {
            expect(parseScript('<var></var>;', {
                jsx: true
            })).to.eql({
                "body": [{
                    "expression": {
                        "children": [],
                        "closingElement": {
                            "name": {
                                "name": "var",
                                "type": "JSXIdentifier"
                            },
                            "type": "JSXClosingElement"
                        },
                        "openingElement": {
                            "attributes": [],
                            "name": {
                                "name": "var",
                                "type": "JSXIdentifier"
                            },
                            "selfClosing": false,
                            "type": "JSXOpeningElement"
                        },
                        "type": "JSXElement"
                    },
                    "type": "ExpressionStatement"
                }],
                "sourceType": "script",
                "type": "Program"
            });
        });
    
        it('should handle line break', () => {
            expect(parseScript('<a\n/>', {
                jsx: true,
                ranges: true
            })).to.eql({
                  "body": [
                    {
                      "end": 5,
                      "expression": {
                       "children": [],
                        "closingElement": null,
                        "end": 5,
                        "openingElement": {
                          "attributes": [],
                          "end": 5,
                          "name": {
                            "end": 2,
                            "name": "a",
                            "start": 1,
                            "type": "JSXIdentifier"
                          },
                          "selfClosing": true,
                          "start": 0,
                         "type": "JSXOpeningElement"
                        },
                        "start": 0,
                        "type": "JSXElement"
                      },
                      "start": 0,
                      "type": "ExpressionStatement"
                    }
                  ],
                 "end": 5,
                  "sourceType": "script",
                  "start": 0,
                  "type": "Program"
                });
    
        });
    
        it('should handle complex namespace', () => {
            expect(parseScript('<a n:foo="bar"> {value} <b><c /></b></a>', {
                jsx: true,
                raw: true
            })).to.eql({
                "body": [{
                    "expression": {
                        "children": [{
                                "raw": " ",
                                "type": "JSXText",
                                "value": " "
                            },
                            {
                                "expression": {
                                    "name": "value",
                                    "type": "Identifier"
                                },
                                "type": "JSXExpressionContainer"
                            },
                            {
                                "raw": " ",
                                "type": "JSXText",
                                "value": " "
                            },
                            {
                                "children": [{
                                    "children": [],
                                    "closingElement": null,
                                    "openingElement": {
                                        "attributes": [],
                                        "name": {
                                            "name": "c",
                                            "type": "JSXIdentifier"
                                        },
                                        "selfClosing": true,
                                        "type": "JSXOpeningElement"
                                    },
                                    "type": "JSXElement"
                                }],
                                "closingElement": {
                                    "name": {
                                        "name": "b",
                                        "type": "JSXIdentifier"
                                    },
                                    "type": "JSXClosingElement"
                                },
                                "openingElement": {
                                    "attributes": [],
                                    "name": {
                                        "name": "b",
                                        "type": "JSXIdentifier"
                                    },
                                    "selfClosing": false,
                                    "type": "JSXOpeningElement"
                                },
                                "type": "JSXElement"
                            }
                        ],
                        "closingElement": {
                            "name": {
                                "name": "a",
                                "type": "JSXIdentifier"
                            },
                            "type": "JSXClosingElement"
                        },
                        "openingElement": {
                            "attributes": [{
                                "name": {
                                    "name": {
                                        "name": "foo",
                                        "type": "JSXIdentifier"
                                    },
                                    "namespace": {
                                        "name": "n",
                                        "type": "JSXIdentifier"
                                    },
                                    "type": "JSXNamespacedName"
                                },
                                "type": "JSXAttribute",
                                "value": {
                                    "raw": "\"bar\"",
                                    "type": "Literal",
                                    "value": "bar"
                                }
                            }],
                            "name": {
                                "name": "a",
                                "type": "JSXIdentifier"
                            },
                            "selfClosing": false,
                            "type": "JSXOpeningElement"
                        },
                        "type": "JSXElement"
                    },
                    "type": "ExpressionStatement"
                }],
                "sourceType": "script",
                "type": "Program"
            });
        });
    
        it('should handle simple namespace', () => {
    
            expect(parseScript('<n:a n:v />', {
                jsx: true
            })).to.eql({
                "body": [{
                    "expression": {
                        "children": [],
                        "closingElement": null,
                        "openingElement": {
                            "attributes": [{
                                "name": {
                                    "name": {
                                        "name": "v",
                                        "type": "JSXIdentifier"
                                    },
                                    "namespace": {
                                        "name": "n",
                                        "type": "JSXIdentifier"
                                    },
                                    "type": "JSXNamespacedName"
                                },
                                "type": "JSXAttribute",
                                "value": null,
                            }, ],
                            "name": {
                                "name": {
                                    "name": "a",
                                    "type": "JSXIdentifier"
                                },
                                "namespace": {
                                    "name": "n",
                                    "type": "JSXIdentifier"
                                },
                                "type": "JSXNamespacedName"
                            },
                            "selfClosing": true,
                            "type": "JSXOpeningElement"
                        },
                        "type": "JSXElement"
                    },
                    "type": "ExpressionStatement"
                }],
                "sourceType": "script",
                "type": "Program"
            });
         
        });
    
    
        it('should handle self closing line feed literals', () => {
            expect(parseScript(`<a
                                                                        />`, {
                jsx: true,
                ranges: true
            })).to.eql({
                  "body": [
                    {
                      "end": 77,
                      "expression": {
                        "children": [],
                        "closingElement": null,
                        "end": 77,
                        "openingElement": {
                          "attributes": [],
                         "end": 77,
                          "name": {
                            "end": 2,
                            "name": "a",
                            "start": 1,
                           "type": "JSXIdentifier"
                          },
                          "selfClosing": true,
                          "start": 0,
                          "type": "JSXOpeningElement"
                        },
                        "start": 0,
                        "type": "JSXElement"
                      },
                      "start": 0,
                      "type": "ExpressionStatement"
                    }
                  ],
                 "end": 77,
                  "sourceType": "script",
                  "start": 0,
                  "type": "Program"
                });
        });
    
    
        it('should handle attribute double quoted string', () => {
            expect(parseScript(`<a href="/" />`, {
                jsx: true,
                raw: true
            })).to.eql({
                "body": [{
                    "expression": {
                        "children": [],
                        "closingElement": null,
                        "openingElement": {
                            "attributes": [{
                                "name": {
                                    "name": "href",
                                    "type": "JSXIdentifier"
                                },
                                "type": "JSXAttribute",
                                "value": {
                                    "raw": "\"/\"",
                                    "type": "Literal",
                                    "value": "/"
                                }
                            }],
                            "name": {
                                "name": "a",
                                "type": "JSXIdentifier"
                            },
                            "selfClosing": true,
                            "type": "JSXOpeningElement"
                        },
                        "type": "JSXElement"
                    },
                    "type": "ExpressionStatement"
                }],
                "sourceType": "script",
                "type": "Program"
            });
        });
    
        it('should handle attribute primary', () => {
            expect(parseScript(`<div>@test content</div>`, {
                jsx: true,
                raw: true
            })).to.eql({
                  "body": [
                    {
                      "expression": {
                        "children": [
                         {
                            "raw": "@test content",
                            "type": "JSXText",
                            "value": "@test content"
                          }
                        ],
                       "closingElement": {
                          "name": {
                            "name": "div",
                            "type": "JSXIdentifier"
                          },
                          "type": "JSXClosingElement"
                       },
                        "openingElement": {
                          "attributes": [],
                          "name": {
                            "name": "div",
                            "type": "JSXIdentifier"
                          },
                          "selfClosing": false,
                         "type": "JSXOpeningElement"
                        },
                       "type": "JSXElement"
                      },
                     "type": "ExpressionStatement"
                    }
                  ],
                  "sourceType": "script",
                  "type": "Program"
                });
        });

        it('should parse "<div {...props} />"', () => {
            expect(parseScript(`<div {...props} />`, {
                jsx: true,
                raw: true,
                ranges: true
            })).to.eql({
                  "body": [
                    {
                      "end": 18,
                      "expression": {
                        "children": [],
                        "closingElement": null,
                        "end": 18,
                        "openingElement": {
                          "attributes": [
                            {
                              "argument": {
                                "end": 14,
                                "name": "props",
                                "start": 9,
                                "type": "Identifier"
                              },
                              "end": 15,
                              "start": 5,
                              "type": "JSXSpreadAttribute"
                            }
                          ],
                          "end": 18,
                         "name": {
                            "end": 4,
                            "name": "div",
                            "start": 1,
                            "type": "JSXIdentifier"
                          },
                          "selfClosing": true,
                          "start": 0,
                          "type": "JSXOpeningElement"
                        },
                        "start": 0,
                        "type": "JSXElement"
                      },
                      "start": 0,
                      "type": "ExpressionStatement"
                    }
                  ],
                  "end": 18,
                  "sourceType": "script",
                  "start": 0,
                  "type": "Program"
                });
        });

        it('should handle attribute primary', () => {
            expect(parseScript(`true ? <div /> : <div />;`, {
                jsx: true,
                raw: true
            })).to.eql({
                  "body": [
                    {
                      "expression": {
                        "alternate": {
                          "children": [],
                          "closingElement": null,
                          "openingElement": {
                            "attributes": [],
                            "name": {
                              "name": "div",
                              "type": "JSXIdentifier"
                            },
                            "selfClosing": true,
                            "type": "JSXOpeningElement"
                          },
                          "type": "JSXElement"
                        },
                        "consequent": {
                          "children": [],
                          "closingElement": null,
                          "openingElement": {
                            "attributes": [],
                            "name": {
                              "name": "div",
                              "type": "JSXIdentifier"
                            },
                            "selfClosing": true,
                            "type": "JSXOpeningElement"
                          },
                          "type": "JSXElement"
                        },
                        "test": {
                          "type": "Literal",
                          "value": true,
                          "raw": "true"
                        },
                        "type": "ConditionalExpression"
                     },
                      "type": "ExpressionStatement"
                    }
                  ],
                  "sourceType": "script",
                  "type": "Program"
                });
        });

        it('should handle attribute primary', () => {
            expect(parseScript(`<div>&nbsp;</div>`, {
                jsx: true,
                raw: true,
                ranges: true
            })).to.eql({
                  "body": [
                    {
                      "end": 17,
                      "expression": {
                        "children": [
                          {
                           "end": 11,
                            "raw": "&nbsp;",
                            "start": 5,
                            "type": "JSXText",
                            "value": "&nbsp;"
                          }
                        ],
                        "closingElement": {
                          "end": 17,
                          "name": {
                            "end": 16,
                            "name": "div",
                            "start": 13,
                            "type": "JSXIdentifier"
                          },
                          "start": 11,
                          "type": "JSXClosingElement"
                        },
                        "end": 17,
                        "openingElement": {
                          "attributes": [],
                          "end": 5,
                          "name": {
                            "end": 4,
                            "name": "div",
                            "start": 1,
                            "type": "JSXIdentifier"
                          },
                          "selfClosing": false,
                          "start": 0,
                          "type": "JSXOpeningElement"
                        },
                        "start": 0,
                        "type": "JSXElement"
                      },
                      "start": 0,
                      "type": "ExpressionStatement"
                    }
                  ],
                  "end": 17,
                  "sourceType": "script",
                  "start": 0,
                  "type": "Program"
                });
        });

        it('should handle attribute primary', () => {
            expect(parseScript(`<p>foo <a href="test"> bar</a> baz</p> ;`, {
                jsx: true,
                raw: true,
                ranges: true
            })).to.eql({
                  "body": [
                    {
                      "end": 40,
                      "expression": {
                        "children": [
                          {
                            "end": 7,
                            "raw": "foo ",
                            "start": 3,
                            "type": "JSXText",
                            "value": "foo ",
                          },
                          {
                            "children": [
                              {
                               "end": 26,
                                "raw": " bar",
                                "start": 22,
                                "type": "JSXText",
                                "value": " bar"
                              }
                            ],
                            "closingElement": {
                              "end": 30,
                              "name": {
                                "end": 29,
                               "name": "a",
                                "start": 28,
                                "type": "JSXIdentifier"
                              },
                              "start": 26,
                              "type": "JSXClosingElement"
                            },
                            "end": 30,
                            "openingElement": {
                              "attributes": [
                                {
                                  "end": 21,
                                  "name": {
                                    "end": 14,
                                    "name": "href",
                                    "start": 10,
                                    "type": "JSXIdentifier"
                                  },
                                  "start": 10,
                                  "type": "JSXAttribute",
                                  "value": {
                                    "end": 21,
                                    "raw": "\"test\"",
                                    "start": 15,
                                    "type": "Literal",
                                    "value": "test"
                                  }
                                }
                              ],
                              "end": 22,
                              "name": {
                                "end": 9,
                                "name": "a",
                                "start": 8,
                                "type": "JSXIdentifier"
                              },
                              "selfClosing": false,
                              "start": 7,
                             "type": "JSXOpeningElement"
                            },
                            "start": 7,
                            "type": "JSXElement"
                          },
                          {
                            "end": 34,
                            "raw": " baz",
                            "start": 30,
                            "type": "JSXText",
                            "value": " baz"
                          }
                        ],
                        "closingElement": {
                          "end": 38,
                         "name": {
                            "end": 37,
                            "name": "p",
                            "start": 36,
                            "type": "JSXIdentifier"
                          },
                          "start": 34,
                          "type": "JSXClosingElement"
                        },
                        "end": 38,
                        "openingElement": {
                          "attributes": [],
                          "end": 3,
                          "name": {
                           "end": 2,
                            "name": "p",
                            "start": 1,
                            "type": "JSXIdentifier"
                          },
                          "selfClosing": false,
                          "start": 0,
                          "type": "JSXOpeningElement"
                       },
                        "start": 0,
                        "type": "JSXElement"
                      },
                      "start": 0,
                      "type": "ExpressionStatement"
                    }
                  ],
                  "end": 40,
                  "sourceType": "script",
                  "start": 0,
                  "type": "Program"
                });
        });

        it('should handle attribute primary', () => {
            expect(parseScript(`<img width={320}/>`, {
                jsx: true,
                raw: true,
                ranges: true
            })).to.eql({
                  "body": [
                    {
                      "end": 18,
                      "expression": {
                       "children": [],
                        "closingElement": null,
                        "end": 18,
                        "openingElement": {
                          "attributes": [
                           {
                              "end": 16,
                              "name": {
                                "end": 10,
                                "name": "width",
                                "start": 5,
                                "type": "JSXIdentifier"
                              },
                              "start": 5,
                              "type": "JSXAttribute",
                              "value": {
                                "end": 16,
                                "expression": {
                                  "end": 15,
                                 "raw": "320",
                                  "start": 12,
                                  "type": "Literal",
                                  "value": 320
                                },
                                "start": 11,
                                "type": "JSXExpressionContainer"
                              }
                            }
                          ],
                          "end": 18,
                         "name": {
                            "end": 4,
                            "name": "img",
                            "start": 1,
                            "type": "JSXIdentifier"
                          },
                          "selfClosing": true,
                          "start": 0,
                          "type": "JSXOpeningElement"
                        },
                        "start": 0,
                       "type": "JSXElement"
                      },
                      "start": 0,
                      "type": "ExpressionStatement"
                    }
                  ],
                  "end": 18,
                  "sourceType": "script",
                  "start": 0,
                  "type": "Program"
                });
        });
    
        it('should handle attribute expression', () => {
            expect(parseScript(`<a href={link}></a>`, {
                jsx: true,
                ranges: true
            })).to.eql({
                  "body": [
                    {
                      "end": 19,
                      "expression": {
                        "children": [],
                        "closingElement": {
                          "end": 19,
                          "name": {
                            "end": 18,
                            "name": "a",
                            "start": 17,
                            "type": "JSXIdentifier"
                          },
                          "start": 15,
                          "type": "JSXClosingElement"
                        },
                        "end": 19,
                        "openingElement": {
                          "attributes": [
                            {
                              "end": 14,
                              "name": {
                                "end": 7,
                                "name": "href",
                                "start": 3,
                                "type": "JSXIdentifier"
                              },
                              "start": 3,
                              "type": "JSXAttribute",
                              "value": {
                                "end": 14,
                                "expression": {
                                  "end": 13,
                                 "name": "link",
                                  "start": 9,
                                  "type": "Identifier"
                                },
                                "start": 8,
                                "type": "JSXExpressionContainer"
                              }
                            }
                          ],
                          "end": 15,
                          "name": {
                            "end": 2,
                            "name": "a",
                            "start": 1,
                            "type": "JSXIdentifier"
                          },
                          "selfClosing": false,
                         "start": 0,
                          "type": "JSXOpeningElement"
                        },
                        "start": 0,
                        "type": "JSXElement"
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
    
    
        it('should handle attribute expression', () => {
            expect(parseScript(`<a.b.c></a.b.c>`, {
                jsx: true,
                ranges: true
            })).to.eql({
                  "body": [
                    {
                      "end": 15,
                      "expression": {
                        "children": [],
                       "closingElement": {
                          "end": 15,
                          "name": {
                            "end": 14,
                            "object": {
                              "end": 12,
                              "object": {
                                "end": 10,
                                "name": "a",
                                "start": 9,
                                "type": "JSXIdentifier"
                              },
                              "property": {
                                "end": 12,
                                "name": "b",
                                "start": 11,
                                "type": "JSXIdentifier"
                              },
                              "start": 9,
                             "type": "JSXMemberExpression"
                            },
                            "property": {
                              "end": 14,
                              "name": "c",
                              "start": 13,
                              "type": "JSXIdentifier"
                            },
                            "start": 9,
                            "type": "JSXMemberExpression"
                          },
                          "start": 7,
                          "type": "JSXClosingElement"
                        },
                        "end": 15,
                        "openingElement": {
                         "attributes": [],
                          "end": 7,
                          "name": {
                            "end": 6,
                            "object": {
                              "end": 4,
                             "object": {
                                "end": 2,
                                "name": "a",
                                "start": 1,
                                "type": "JSXIdentifier"
                              },
                             "property": {
                                "end": 4,
                                "name": "b",
                                "start": 3,
                                "type": "JSXIdentifier"
                              },
                              "start": 1,
                              "type": "JSXMemberExpression"
                            },
                            "property": {
                             "end": 6,
                              "name": "c",
                              "start": 5,
                              "type": "JSXIdentifier"
                            },
                            "start": 1,
                            "type": "JSXMemberExpression"
                         },
                          "selfClosing": false,
                          "start": 0,
                          "type": "JSXOpeningElement"
                        },
                        "start": 0,
                        "type": "JSXElement"
                      },
                      "start": 0,
                      "type": "ExpressionStatement"
                    }
                  ],
                  "end": 15,
                  "sourceType": "script",
                  "start": 0,
                  "type": "Program"
                });
        });

        it('should parse "<a>= == =</a>"', () => {
            expect(parseScript(`<a>= == =</a>`, {
                jsx: true,
                ranges: true
            })).to.eql({
                  "body": [
                    {
                      "end": 13,
                      "expression": {
                        "children": [
                         {
                            "end": 9,
                            "start": 3,
                            "type": "JSXText",
                            "value": "= == ="
                          }
                        ],
                        "closingElement": {
                          "end": 13,
                         "name": {
                            "end": 12,
                            "name": "a",
                           "start": 11,
                            "type": "JSXIdentifier"
                          },
                          "start": 9,
                          "type": "JSXClosingElement"
                        },
                        "end": 13,
                        "openingElement": {
                          "attributes": [],
                          "end": 3,
                          "name": {
                            "end": 2,
                            "name": "a",
                            "start": 1,
                            "type": "JSXIdentifier"
                          },
                          "selfClosing": false,
                          "start": 0,
                          "type": "JSXOpeningElement"
                        },
                        "start": 0,
                        "type": "JSXElement"
                      },
                      "start": 0,
                      "type": "ExpressionStatement"
                    },
                  ],
                  "end": 13,
                  "sourceType": "script",
                  "start": 0,
                  "type": "Program"
                });
        });

        it('should parse "(<div />) < x;"', () => {
            expect(parseScript(`(<div />) < x;`, {
                jsx: true,
                ranges: true
            })).to.eql({
                  "body": [
                    {
                      "end": 14,
                      "expression": {
                        "end": 13,
                        "left": {
                          "children": [],
                          "closingElement": null,
                          "end": 8,
                          "openingElement": {
                            "attributes": [],
                            "end": 8,
                            "name": {
                              "end": 5,
                              "name": "div",
                              "start": 2,
                              "type": "JSXIdentifier"
                            },
                            "selfClosing": true,
                            "start": 1,
                            "type": "JSXOpeningElement"
                          },
                          "start": 1,
                          "type": "JSXElement"
                        },
                        "operator": "<",
                       "right": {
                          "end": 13,
                         "name": "x",
                          "start": 12,
                          "type": "Identifier"
                        },
                        "start": 0,
                        "type": "BinaryExpression"
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
        
        it('should parse "<a b={x ? <c /> : <d />} />"', () => {
            expect(parseScript(`<a b={x ? <c /> : <d />} />`, {
                jsx: true,
                ranges: true
            })).to.eql({
                  "body": [
                    {
                     "end": 27,
                      "expression": {
                        "children": [],
                        "closingElement": null,
                        "end": 27,
                        "openingElement": {
                          "attributes": [
                            {
                              "end": 24,
                              "name": {
                                "end": 4,
                                "name": "b",
                                "start": 3,
                                "type": "JSXIdentifier"
                              },
                              "start": 3,
                              "type": "JSXAttribute",
                              "value": {
                                "end": 24,
                                "expression": {
                                  "alternate": {
                                    "children": [],
                                    "closingElement": null,
                                    "end": 23,
                                    "openingElement": {
                                      "attributes": [],
                                      "end": 23,
                                      "name": {
                                        "end": 20,
                                        "name": "d",
                                        "start": 19,
                                        "type": "JSXIdentifier"
                                      },
                                      "selfClosing": true,
                                      "start": 18,
                                      "type": "JSXOpeningElement"
                                    },
                                    "start": 18,
                                    "type": "JSXElement"
                                  },
                                  "consequent": {
                                   "children": [],
                                    "closingElement": null,
                                    "end": 15,
                                    "openingElement": {
                                      "attributes": [],
                                      "end": 15,
                                      "name": {
                                        "end": 12,
                                        "name": "c",
                                        "start": 11,
                                       "type": "JSXIdentifier"
                                      },
                                      "selfClosing": true,
                                      "start": 10,
                                      "type": "JSXOpeningElement"
                                    },
                                    "start": 10,
                                    "type": "JSXElement"
                                  },
                                  "end": 23,
                                  "start": 6,
                                  "test": {
                                    "end": 7,
                                    "name": "x",
                                    "start": 6,
                                   "type": "Identifier"
                                  },
                                  "type": "ConditionalExpression"
                                },
                                "start": 5,
                               "type": "JSXExpressionContainer"
                              }
                            }
                          ],
                          "end": 27,
                          "name": {
                            "end": 2,
                            "name": "a",
                            "start": 1,
                            "type": "JSXIdentifier"
                          },
                          "selfClosing": true,
                          "start": 0,
                          "type": "JSXOpeningElement"
                        },
                        "start": 0,
                        "type": "JSXElement"
                      },
                      "start": 0,
                      "type": "ExpressionStatement"
                    }
                  ],
                  "end": 27,
                  "sourceType": "script",
                  "start": 0,
                  "type": "Program"
                });
        });
   
        it('should parse "a(b,c, ( <span />))"', () => {
          expect(parseScript(`a(b,c, ( <span />))`, {
              jsx: true,
              ranges: true
          })).to.eql({
              "body": [
                {
                  "end": 19,
                  "expression": {
                    "arguments": [
                      {
                        "end": 3,
                        "name": "b",
                        "start": 2,
                        "type": "Identifier"
                      },
                      {
                        "end": 5,
                        "name": "c",
                        "start": 4,
                        "type": "Identifier"
                      },
                      {
                        "children": [],
                        "closingElement": null,
                        "end": 17,
                        "openingElement": {
                          "attributes": [],
                          "end": 17,
                          "name": {
                            "end": 14,
                            "name": "span",
                            "start": 10,
                            "type": "JSXIdentifier"
                          },
                          "selfClosing": true,
                          "start": 9,
                          "type": "JSXOpeningElement"
                        },
                        "start": 9,
                        "type": "JSXElement"
                      }
                    ],
                    "callee": {
                      "end": 1,
                      "name": "a",
                      "start": 0,
                      "type": "Identifier"
                    },
                    "end": 19,
                    "start": 0,
                    "type": "CallExpression"
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
        
        it('should parse "el = ( <span /> )"', () => {
          expect(parseScript(`el = ( <span /> )`, {
              jsx: true,
              ranges: true
          })).to.eql({
              "body": [
                {
                  "end": 17,
                  "expression": {
                    "end": 17,
                    "left": {
                      "end": 2,
                      "name": "el",
                      "start": 0,
                      "type": "Identifier"
                    },
                    "operator": "=",
                    "right": {
                      "children": [],
                      "closingElement": null,
                      "end": 15,
                      "openingElement": {
                        "attributes": [],
                        "end": 15,
                        "name": {
                          "end": 12,
                          "name": "span",
                          "start": 8,
                         "type": "JSXIdentifier"
                        },
                        "selfClosing": true,
                        "start": 7,
                        "type": "JSXOpeningElement"
                      },
                      "start": 7,
                      "type": "JSXElement"
                    },
                    "start": 0,
                    "type": "AssignmentExpression"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
                }
              ],
              "end": 17,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
        });
   
        it('should parse "<title>{ {caption} }</title>"', () => {
          expect(parseScript(`<title>{ {caption} }</title>`, {
              jsx: true,
              ranges: true
          })).to.eql({
              "body": [
                {
                "end": 28,
                  "expression": {
                    "children": [
                      {
                        "end": 20,
                        "expression": {
                         "end": 18,
                         "properties": [
                            {
                              "computed": false,
                              "end": 17,
                              "key": {
                                "end": 17,
                                "name": "caption",
                               "start": 10,
                                "type": "Identifier"
                              },
                              "kind": "init",
                             "method": false,
                              "start": 10,
                              "type": "Property",
                              "shorthand": true,
                              "value": {
                                "end": 17,
                                "name": "caption",
                                "start": 10,
                                "type": "Identifier"
                              }
                            }
                          ],
                          "start": 9,
                          "type": "ObjectExpression"
                        },
                        "start": 7,
                        "type": "JSXExpressionContainer"
                      }
                    ],
                    "closingElement": {
                      "end": 28,
                     "name": {
                        "end": 27,
                        "name": "title",
                        "start": 22,
                        "type": "JSXIdentifier"
                      },
                      "start": 20,
                      "type": "JSXClosingElement"
                   },
                    "end": 28,
                    "openingElement": {
                    "attributes": [],
                      "end": 7,
                      "name": {
                        "end": 6,
                       "name": "title",
                                   "start": 1,
                        "type": "JSXIdentifier"
                      },
                      "selfClosing": false,
                      "start": 0,
                      "type": "JSXOpeningElement"
                    },
                    "start": 0,
                    "type": "JSXElement"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
                }
              ],
              "end": 28,
              "start": 0,
              "type": "Program",
              "sourceType": "script"
            });
        });

        it('should parse "<a>{ (a=1) }</a>"', () => {
          expect(parseScript(`<a>{ (a=1) }</a>`, {
              jsx: true,
              ranges: true
          })).to.eql({
              "body": [
                {
                  "end": 16,
                  "expression": {
                    "children": [
                      {
                        "end": 12,
                        "expression": {
                          "end": 9,
                          "left": {
                            "end": 7,
                           "name": "a",
                            "start": 6,
                            "type": "Identifier"
                          },
                          "operator": "=",
                          "right": {
                           "end": 9,
                            "start": 8,
                            "type": "Literal",
                            "value": 1
                          },
                          "start": 6,
                         "type": "AssignmentExpression"
                        },
                        "start": 3,
                        "type": "JSXExpressionContainer"
                      }
                    ],
                    "closingElement": {
                      "end": 16,
                      "name": {
                        "end": 15,
                        "name": "a",
                        "start": 14,
                        "type": "JSXIdentifier"
                      },
                     "start": 12,
                      "type": "JSXClosingElement"
                    },
                    "end": 16,
                    "openingElement": {
                      "attributes": [],
                      "end": 3,
                      "name": {
                        "end": 2,
                        "name": "a",
                        "start": 1,
                        "type": "JSXIdentifier"
                      },
                      "selfClosing": false,
                      "start": 0,
                      "type": "JSXOpeningElement"
                    },
                    "start": 0,
                    "type": "JSXElement"
                  },
                  "start": 0,
                 "type": "ExpressionStatement"
                }
              ],
              "end": 16,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
        });

        it('should parse "<a> x {this} y </a>;"', () => {
          expect(parseScript(`<a> x {this} y </a>;`, {
              jsx: true,
              ranges: true
          })).to.eql({
              "body": [
                {
                 "end": 20,
                  "expression": {
                    "children": [
                      {
                        "end": 6,
                       "start": 3,
                        "type": "JSXText",
                        "value": " x ",
                      },
                      {
                        "end": 12,
                       "expression": {
                          "end": 11,
                          "start": 7,
                          "type": "ThisExpression"
                       },
                        "start": 6,
                        "type": "JSXExpressionContainer"
                      },
                     {
                        "end": 15,
                        "start": 12,
                        "type": "JSXText",
                        "value": " y "
                      }
                    ],
                    "closingElement": {
                      "end": 19,
                      "name": {
                        "end": 18,
                        "name": "a",
                        "start": 17,
                        "type": "JSXIdentifier"
                      },
                      "start": 15,
                      "type": "JSXClosingElement"
                    },
                    "end": 19,
                   "openingElement": {
                      "attributes": [],
                      "end": 3,
                      "name": {
                        "end": 2,
                        "name": "a",
                        "start": 1,
                        "type": "JSXIdentifier"
                      },
                      "selfClosing": false,
                      "start": 0,
                      "type": "JSXOpeningElement"
                    },
                    "start": 0,
                    "type": "JSXElement"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
                }
              ],
              "end": 20,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
        });

        it('should parse "<a>{ (a=1) }</a>"', () => {
          expect(parseScript(`<p a={'b'}/>`, {
              jsx: true,
              ranges: true,
              plugins: { jsx: true}
          })).to.eql({
              "body": [
                {
                  "end": 12,
                  "expression": {
                   "children": [],
                    "closingElement": null,
                    "end": 12,
                   "openingElement": {
                      "attributes": [
                        {
                          "end": 10,
                          "name": {
                            "end": 4,
                            "name": "a",
                            "start": 3,
                            "type": "JSXIdentifier"
                          },
                          "start": 3,
                          "type": "JSXAttribute",
                          "value": {
                            "end": 10,
                            "expression": {
                              "end": 9,
                             "start": 6,
                              "type": "Literal",
                              "value": "b"
                            },
                            "start": 5,
                            "type": "JSXExpressionContainer"
                          }
                        }
                      ],
                      "end": 12,
                      "name": {
                        "end": 2,
                        "name": "p",
                        "start": 1,
                        "type": "JSXIdentifier"
                      },
                      "selfClosing": true,
                      "start": 0,
                      "type": "JSXOpeningElement"
                    },
                    "start": 0,
                    "type": "JSXElement"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
                }
              ],
              "end": 12,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
        });

        it('should parse "<o.p.q/>;"', () => {
          expect(parseScript(`<o.p.q/>;`, {
              jsx: true,
              ranges: true,
              plugins: { jsx: true}
          })).to.eql({
              "body": [
                {
                  "end": 9,
                  "expression": {
                    "children": [],
                    "closingElement": null,
                    "end": 8,
                    "openingElement": {
                      "attributes": [],
                     "end": 8,
                      "name": {
                        "end": 6,
                        "object": {
                          "end": 4,
                          "object": {
                            "end": 2,
                            "name": "o",
                            "start": 1,
                            "type": "JSXIdentifier"
                          },
                         "property": {
                            "end": 4,
                            "name": "p",
                            "start": 3,
                           "type": "JSXIdentifier"
                          },
                        
                          "start": 1,
                          "type": "JSXMemberExpression"
                        },
                       "property": {
                         "end": 6,
                          "name": "q",
                          "start": 5,
                          "type": "JSXIdentifier"
                        },
                    
                        "start": 1,
                        "type": "JSXMemberExpression"
                      },
                  
                      "selfClosing": true,
                      "start": 0,
                      "type": "JSXOpeningElement"
                    },
                   
                    "start": 0,
                   "type": "JSXElement"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
                }
              ],
              "end": 9,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
        });

    });