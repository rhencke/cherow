import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Literals - RegExp', () => {

    it('should fail on line terminator', () => {
        expect(() => {
            parseScript(`/a
/`)
        }).to.throw();
    });

    it('should throw if \\ or / is incorrect', () => {
        expect(() => {
            parseScript(`/a\/`)
        }).to.not.throw();
    });

    it('should throw if \\ or / is incorrect', () => {
        expect(() => {
            parseScript(`/a//.source;`)
        }).to.throw();
    });

    it('should fail on carriag return without eval', () => {
        expect(() => {
            parseScript(`/\
/`)
}).to.not.throw();
    });

    it('should fail on line feed without eval', () => {
        expect(() => {
            parseScript(`/
/`)
        }).to.throw();
    });

    it('should throw if * or \\ or / or [empty] is incorrect', () => {
        expect(() => {
            parseScript(`//
.source;`)
}).to.throw();
    });

    it('should throw if * or \\ or / or [empty] is incorrec', () => {
        expect(() => {
            parseScript(`/*/`)
        }).to.throw('Unterminated comment');
    });

    it('should fail on empty literal RegExp', () => {
        expect(() => {
            parseScript(`var re = //;`)
        }).to.throw();
    });

    it('should parse IdentifierPart - "/(?:)/\u0069"', () => {
        expect(parseScript(`/(?:)/\u0069`)).to.eql({
            "body": [{
                "expression": {
                    "regex": {
                        "flags": "i",
                        "pattern": "(?:)"
                    },
                    "type": "Literal",
                    "value": /(?:)/i,
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it('should parse IdentifierPart - "/(?:)/\u0067"', () => {
        expect(parseScript(`/(?:)/\u0067`)).to.eql({
            "body": [{
                "expression": {
                    "regex": {
                        "flags": "g",
                        "pattern": "(?:)"
                    },
                    "type": "Literal",
                    "value": /(?:)/g,
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it('should parse IdentifierPart - "/(?:)/\u006D"', () => {
        expect(parseScript(`/(?:)/\u006D`)).to.eql({
            "body": [{
                "expression": {
                    "regex": {
                        "flags": "m",
                        "pattern": "(?:)"
                    },
                    "type": "Literal",
                    "value": /(?:)/m,
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it('should parse "/a/"', () => {
        expect(parseScript(`/}?/u`)).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Literal",
                    "value": null,
                    "regex": {
                        "pattern": "}?",
                        "flags": "u"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "/a/"', () => {
        expect(parseScript(`/a/`, {
            ranges: true,
            directive: true
        })).to.eql({
              "body": [
               {
                  "end": 3,
                  "expression": {
                    "end": 3,
                    "regex": {
                      "flags": "",
                      "pattern": "a",
                    },
                    "start": 0,
                    "type": "Literal",
                    "value": /a/,
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
                }
              ],
              "end": 3,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });

    it('should parse "/[-\\-]/u"', () => {
        expect(parseScript(`/[-\\-]/u`)).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Literal",
                    "value": /[-\-]/u,
                    "regex": {
                        "pattern": "[-\\-]",
                        "flags": "u"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "/\\1/u"', () => {
        expect(parseScript(`/\\1/u`)).to.eql({
            "body": [{
                "expression": {
                    "regex": {
                        "flags": "u",
                        "pattern": "\\1"
                    },
                    "type": "Literal",
                    "value": null,
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it('should parse "/a/;"', () => {
        expect(parseScript(`/a/;`)).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Literal",
                    "value": /a/,
                    "regex": {
                        "pattern": "a",
                        "flags": ""
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "/[a-z]/i', () => {
        expect(parseScript(`/[a-z]/i`)).to.eql({
            "body": [{
                "expression": {
                    "regex": {
                        "flags": "i",
                        "pattern": "[a-z]"
                    },
                    "type": "Literal",
                    "value": /[a-z]/i
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it('should parse "/(()(?:\\2)((\\4)))/;"', () => {
        expect(parseScript(`/(()(?:\\2)((\\4)))/`)).to.eql({
            "body": [{
                "expression": {
                    "regex": {
                        "flags": "",
                        "pattern": "(()(?:\\2)((\\4)))"
                    },
                    "type": "Literal",
                    "value": /(()(?:\2)((\4)))/
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it('should parse "/\\.\\/\\\\/u"', () => {
        expect(parseScript(`/\\.\\/\\\\/u`)).to.eql({
            "body": [{
                "expression": {
                    "regex": {
                        "flags": "u",
                        "pattern": "\\.\\/\\\\"
                    },
                    "type": "Literal",
                    "value": /\.\/\\/u
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it('should parse "/\\uD834/u"', () => {
        expect(parseScript(`/\\uD834/u`)).to.eql({
            "body": [{
                "expression": {
                    "regex": {
                        "flags": "u",
                        "pattern": "\\uD834"
                    },
                    "type": "Literal",
                    "value": /\uD834/u
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it('should parse "/[-\\-]/u"', () => {
        expect(parseScript(`/[-\\-]/u`)).to.eql({
            "body": [{
                "expression": {
                    "regex": {
                        "flags": "u",
                        "pattern": "[-\\-]"
                    },
                    "type": "Literal",
                    "value": /[-\-]/u
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it('should parse "/(?!.){0,}?/u"', () => {
        expect(parseScript(`/(?!.){0,}?/u`)).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Literal",
                    "value": null,
                    "regex": {
                        "pattern": "(?!.){0,}?",
                        "flags": "u"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "/(?=.)*/;"', () => {
        expect(parseScript(`/(?=.)*/`)).to.eql({
            "body": [{
                "expression": {
                    "regex": {
                        "flags": "",
                        "pattern": "(?=.)*"
                    },
                    "type": "Literal",
                    "value": /(?=.)*/
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it('should parse "/[-a-b-]/"', () => {
        expect(parseScript(`/[-a-b-]/`)).to.eql({
            "body": [{
                "expression": {
                    "regex": {
                        "flags": "",
                        "pattern": "[-a-b-]"
                    },
                    "type": "Literal",
                    "value": /[-a-b-]/
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it('should parse "/0/g.test"', () => {
        expect(parseScript(`/0/g.test`)).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "MemberExpression",
                    "computed": false,
                    "object": {
                        "type": "Literal",
                        "value": /0/g,
                        "regex": {
                            "pattern": "0",
                            "flags": "g"
                        }
                    },
                    "property": {
                        "type": "Identifier",
                        "name": "test"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "/\u{10ffff}/u"', () => {
        expect(parseScript(`/\u{10ffff}/u`)).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Literal",
                    "value": /􏿿/u,
                    "regex": {
                        "pattern": "􏿿",
                        "flags": "u"
                    }
                }
            }],
            "sourceType": "script"
        });
    });


    it('should fail on invalid unicode quantifiable assertion', () => {
        expect(() => {
            parseScript(`/.(?=.)?/u`)
        }).to.not.throw();
    });

    it('should fail on invalid class escape', () => {
        expect(() => {
            parseScript(`/\c0/u;`)
        }).to.not.throw();
    });

    it('should fail on invalid identity escape', () => {
        expect(() => {
            parseScript(`/\M/u;`)
        }).to.not.throw();
    });

    it('should fail on invalid oob decimal escape', () => {
        expect(() => {
            parseScript(`/\8/u;`)
        }).to.not.throw();
    });

    it('should fail on invalid non empty class ranges no dash a', () => {
        expect(() => {
            parseScript(`/[\d-a]/u;`)
        }).to.not.throw();
    });

    it('should fail on invalid non empty class ranges no dash ab', () => {
        expect(() => {
            parseScript(`/[\s-\d]/u;`)
        }).to.not.throw();
    });

    it('should fail on invalid legacy octal escape', () => {
        expect(() => {
            parseScript(`/\\1/u;`)
        }).to.not.throw();
    });

    it('should fail on invalid unicode extended pattern char', () => {
        expect(() => {
            parseScript(`/{/u;`)
        }).to.not.throw();
    });

    it('should fail on early error bad flag', () => {
        expect(() => {
            parseScript(`/./G;`)
        }).to.throw('Unexpected regular expression flag');
    });

    it('should fail on early error duplicate flag', () => {
        expect(() => {
            parseScript(`/./gig;`)
        }).to.throw('Duplicate flags supplied to RegExp constructor g');
    });

    it.skip('should fail on invalid braced quantifier exact', () => {
        expect(() => {
            parseScript(`/{2}/;`)
        }).to.throw();
    });

    it('should parse unicode decimal escape"', () => {
        expect(parseScript(`/\\1/u`)).to.eql({
            "body": [{
                "expression": {
                    "regex": {
                        "flags": "u",
                        "pattern": "\\1"
                    },
                    "type": "Literal",
                    "value": null
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it('should parse unicode astral', () => {
        expect(parseScript(`/𝌆{2}/u`)).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Literal",
                    "value": /𝌆{2}/u,
                    "regex": {
                        "pattern": "𝌆{2}",
                        "flags": "u"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse unicode case mapping', () => {
        expect(parseScript(`/\u212a/i`)).to.eql({
            "body": [{
                "expression": {
                    "regex": {
                        "flags": "i",
                        "pattern": "K"
                    },
                    "type": "Literal",
                    "value": /K/i
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it('should parse "/0/g.test"', () => {
        expect(parseScript(`/0/g.test`)).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "MemberExpression",
                    "computed": false,
                    "object": {
                        "type": "Literal",
                        "value": /0/g,
                        "regex": {
                            "pattern": "0",
                            "flags": "g"
                        }
                    },
                    "property": {
                        "type": "Identifier",
                        "name": "test"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse regular expression + identifer on new line', () => {
        expect(parseScript(`/a/i         
        foo`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 25,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 4,
                "expression": {
                  "type": "Literal",
                  "start": 0,
                  "end": 4,
                  "value": /a/i,
                  "raw": "/a/i",
                  "regex": {
                    "pattern": "a",
                    "flags": "i"
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 22,
                "end": 25,
                "expression": {
                  "type": "Identifier",
                  "start": 22,
                  "end": 25,
                  "name": "foo"
                }
              }
            ],
            "sourceType": "script"
          });
    });
    
    it('should fail on early error duplicate flag', () => {
        expect(() => {
            parseScript(`/./gig;`)
        }).to.throw('Duplicate flags supplied to RegExp constructor g');
    });
});