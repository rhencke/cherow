import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';
const expect = chai.expect;

describe('Import', () => {

      it('should fail on import as of arguments', () => {
          expect(() => {
              parseModule('import { x as arguments } from "./cherow.js";');
          }).to.throw();
      });
  
      it('should fail on "{import a from "b";}"', () => {
          expect(() => {
              parseModule('{import a from "b";}');
          }).to.throw();
      });
  
      it('should fail on "import {}"', () => {
          expect(() => {
              parseModule('import {}');
          }).to.throw();
      });
  
      it('should fail on "import {};"', () => {
          expect(() => {
              parseModule('import {};');
          }).to.throw();
      });
  
  
      it('should fail on "import {} from;"', () => {
          expect(() => {
              parseModule('import {} from;');
          }).to.throw();
      });
  
      it('should fail on "import {,} from "a";"', () => {
          expect(() => {
              parseModule('import {,} from "a";');
          }).to.throw();
      });
  
      it('should fail on "import {b,,} from "a""', () => {
          expect(() => {
              parseModule('import {b,,} from "a"');
          }).to.throw();
      });
  
      it('should fail on "import {} from;"', () => {
          expect(() => {
              parseModule('import {} from;');
          }).to.throw();
      });
  
      it('should fail on "import {a as function} from "a""', () => {
          expect(() => {
              parseModule('import {a as function} from "a"');
          }).to.throw();
      });
  
      it.skip('should fail on "import {b as,} from "a"', () => {
          expect(() => {
              parseModule('import {b as,} from "a"');
          }).to.throw();
      });
  
      it('should fail on "import / as a from  "a""', () => {
          expect(() => {
              parseModule('import / as a from "a"');
          }).to.throw();
      });
  
      it('should fail on "import a, b from "a""', () => {
          expect(() => {
              parseModule('import a, b from "a"');
          }).to.throw();
      });
  
      it('should fail on import as of eval', () => {
          expect(() => {
              parseModule('import { x as eval } from "./cherow.js";');
          }).to.throw();
      });
  
      it('should fail on import of eval', () => {
          expect(() => {
              parseModule('import { eval } from "./cherow.js";');
          }).to.throw();
      });
  
      it('should fail on import of arguments', () => {
          expect(() => {
              parseModule('import { arguments } from "./cherow.js";');
          }).to.throw();
      });
  
      it("should fail on \"import foo, {bar}, foo from \"foo\";\"", () => {
          expect(() => {
              parseModule("import foo, {bar}, foo from \"foo\";");
          }).to.throw();
      });
  
      it('should fail if statement cannot contain an `export` declaration ( for )', () => {
          expect(() => {
              parseModule(`for (const x = 0; false;) export default null;`);
          }).to.throw();
      });
  
      it('should fail if statement cannot contain an `export` declaration ( try / catch )', () => {
          expect(() => {
              parseModule(`try { } catch (err) { } finally { }';`);
          }).to.throw();
      });
  
      it("should fail on \"import { true } from \"logic\"\"", () => {
          expect(() => {
              parseModule("import { true } from \"logic\"");
          }).to.throw();
      });
      it("should fail on \"import foo\"", () => {
          expect(() => {
              parseModule('import foo');
          }).to.throw();
      });
      it("should fail on \"import { foo, bar }\"", () => {
          expect(() => {
              parseModule('import { foo, bar }');
          }).to.throw();
      });
      it("should fail on \"import { for } from \"iteration\"\"", () => {
          expect(() => {
              parseModule("import { for } from \"iteration\"");
          }).to.throw();
      });
      it("should fail on \"import { foo, bar }\"", () => {
          expect(() => {
              parseModule("import { foo, bar }");
          }).to.throw();
      });
      it("should fail on \"import {bar}, {foo} from \"foo\";\"", () => {
          expect(() => {
              parseModule("import {bar}, {foo} from \"foo\";");
          }).to.throw();
      });
      it("should fail on \"import {bar}, {foo} from \"foo\";", () => {
          expect(() => {
              parseModule("import {bar}, {foo} from \"foo\";");
          }).to.throw();
      });
      it("should fail on \"export {foo} from bar\"", () => {
          expect(() => {
              parseModule("export {foo} from bar");
          }).to.throw();
      });
      it("should fail on \"import {a as function} from bar\"", () => {
          expect(() => {
              parseModule("import {a as function} from bar");
          }).to.throw();
      });
      it("should fail on \"import a, b from  bar\"", () => {
          expect(() => {
              parseModule("import a, b from bar");
          }).to.throw();
      });
      it("should fail on \"import {b,,} from from  bar\"", () => {
          expect(() => {
              parseModule("import {b,,} from bar");
          }).to.throw();
      });
      it("should fail on \"import foo, from \"bar\";\"", () => {
          expect(() => {
              parseModule("import foo, from \"bar\";");
          }).to.throw();
      });
      it("should fail on \"import {bar}, {foo} from \"foo\";\"", () => {
          expect(() => {
              parseModule("import { x as arguments } from './early-import-as-arguments.js';");
          }).to.throw();
      });
      it("should fail on \"import {b,,} from from  bar\"", () => {
          expect(() => {
              parseModule("import { x as eval } from './early-import-as-eval.js';");
          }).to.throw();
      });
      it("should fail on \"import {b,,} from from  bar\"", () => {
          expect(() => {
              parseModule("import { arguments } from './early-import-arguments.js';");
          }).to.throw();
      });
      it("should fail on \"import {b,,} from from  bar\"", () => {
          expect(() => {
              parseModule("class C { static method() { import v from './decl-pos-import-class-decl-meth-static.js'; } }");
          }).to.throw();
      });
  
      it("should fail on \"import {b,,} from from  bar\"", () => {
          expect(() => {
              parseModule("import * as a from 12");
          }).to.throw();
      });
      it("should fail on \"import {b,,} from from  bar\"", () => {
          expect(() => {
              parseModule("import {a as b, e as l 12");
          }).to.throw();
      });
      it("should fail on \"import {b,,} from from  bar\"", () => {
          expect(() => {
              parseModule('import {a as 12} from \'12\'');
          }).to.throw();
      });
  
      it('should fail on escaped "as" keyword', () => {
          expect(() => {
              parseModule('import {a \\u0061s b} from "./escaped-as-import-specifier.js";');
          }).to.throw();
      });
  
      it('should import with trailing comma', () => {
          expect(parseModule('import { x , } from "/eval-gtbndng-indirect-trlng-comma_FIXTURE.js";', {
              ranges: true,
              raw: true,
              locations: true
          })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 68,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 68
              }
            },
            "body": [
              {
                "type": "ImportDeclaration",
                "start": 0,
                "end": 68,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 68
                  }
                },
                "specifiers": [
                  {
                    "type": "ImportSpecifier",
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
                    "imported": {
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
                    "local": {
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
                    }
                  }
                ],
                "source": {
                  "type": "Literal",
                  "start": 20,
                  "end": 67,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 20
                    },
                    "end": {
                      "line": 1,
                      "column": 67
                    }
                  },
                  "value": "/eval-gtbndng-indirect-trlng-comma_FIXTURE.js",
                  "raw": "\"/eval-gtbndng-indirect-trlng-comma_FIXTURE.js\""
                }
              }
            ],
            "sourceType": "module"
          });
      });
  
      it("should parse \"import * as a from a\"", () => {
          expect(parseModule("import * as a from \"a\"")).to.eql({
              type: "Program",
              body: [{
                  type: "ImportDeclaration",
                  specifiers: [{
                      type: "ImportNamespaceSpecifier",
                      local: {
                          type: "Identifier",
                          name: "a",
                      },
                  }, ],
                  source: {
                      type: "Literal",
                      value: "a",
                  },
              }, ],
              sourceType: "module",
          });
      });
  
      it("should parse \"import foo, {bar} from \"foo\";\"", () => {
          expect(parseModule('import foo, {bar} from "foo";', {
              ranges: true,
              raw: true,
              locations: true
          })).to.eql({
            "type": "Program",
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
            "body": [
              {
                "type": "ImportDeclaration",
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
                "specifiers": [
                  {
                    "type": "ImportDefaultSpecifier",
                    "start": 7,
                    "end": 10,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 7
                      },
                      "end": {
                        "line": 1,
                        "column": 10
                      }
                    },
                    "local": {
                      "type": "Identifier",
                      "start": 7,
                      "end": 10,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 7
                        },
                        "end": {
                          "line": 1,
                          "column": 10
                        }
                      },
                      "name": "foo"
                    }
                  },
                  {
                    "type": "ImportSpecifier",
                    "start": 13,
                    "end": 16,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 13
                      },
                      "end": {
                        "line": 1,
                        "column": 16
                      }
                    },
                    "imported": {
                      "type": "Identifier",
                      "start": 13,
                      "end": 16,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 13
                        },
                        "end": {
                          "line": 1,
                          "column": 16
                        }
                      },
                      "name": "bar"
                    },
                    "local": {
                      "type": "Identifier",
                      "start": 13,
                      "end": 16,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 13
                        },
                        "end": {
                          "line": 1,
                          "column": 16
                        }
                      },
                      "name": "bar"
                    }
                  }
                ],
                "source": {
                  "type": "Literal",
                  "start": 23,
                  "end": 28,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 23
                    },
                    "end": {
                      "line": 1,
                      "column": 28
                    }
                  },
                  "value": "foo",
                  "raw": "\"foo\""
                }
              }
            ],
            "sourceType": "module"
          });
      });
  
      it("should parse \"import {default as foo} from \"foo\";\"", () => {
          expect(parseModule('import {default as foo} from "foo";', {
              ranges: true,
              raw: true,
              locations: true
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
                "type": "ImportDeclaration",
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
                "specifiers": [
                  {
                    "type": "ImportSpecifier",
                    "start": 8,
                    "end": 22,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 8
                      },
                      "end": {
                        "line": 1,
                        "column": 22
                      }
                    },
                    "imported": {
                      "type": "Identifier",
                      "start": 8,
                      "end": 15,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 8
                        },
                        "end": {
                          "line": 1,
                          "column": 15
                        }
                      },
                      "name": "default"
                    },
                    "local": {
                      "type": "Identifier",
                      "start": 19,
                      "end": 22,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 19
                        },
                        "end": {
                          "line": 1,
                          "column": 22
                        }
                      },
                      "name": "foo"
                    }
                  }
                ],
                "source": {
                  "type": "Literal",
                  "start": 29,
                  "end": 34,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 29
                    },
                    "end": {
                      "line": 1,
                      "column": 34
                    }
                  },
                  "value": "foo",
                  "raw": "\"foo\""
                }
              }
            ],
            "sourceType": "module"
          });
      });
  
  
      it("should parse \"import {bar as baz, xyz} from \"foo\";\"", () => {
          expect(parseModule("import {bar as baz, xyz} from \"foo\";")).to.eql({
              type: "Program",
              body: [{
                  type: "ImportDeclaration",
                  specifiers: [{
                          type: "ImportSpecifier",
                          local: {
                              type: "Identifier",
                              name: "baz",
                          },
                          imported: {
                              type: "Identifier",
                              name: "bar",
                          },
                      },
                      {
                          type: "ImportSpecifier",
                          local: {
                              type: "Identifier",
                              name: "xyz",
                          },
                          imported: {
                              type: "Identifier",
                              name: "xyz",
                          },
                      },
                  ],
                  source: {
                      type: "Literal",
                      value: "foo",
                  },
              }, ],
              sourceType: "module",
          });
      });
  
      it("should parse \"import {} from \"foo\";\"", () => {
          expect(parseModule('import {} from "foo";', {
              ranges: true,
              raw: true,
              locations: true
          })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 21,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 21
              }
            },
            "body": [
              {
                "type": "ImportDeclaration",
                "start": 0,
                "end": 21,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 21
                  }
                },
                "specifiers": [],
                "source": {
                  "type": "Literal",
                  "start": 15,
                  "end": 20,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 15
                    },
                    "end": {
                      "line": 1,
                      "column": 20
                    }
                  },
                  "value": "foo",
                  "raw": "\"foo\""
                }
              }
            ],
            "sourceType": "module"
          });
      });
  
      it('should export import default and namespace specifier', () => {
          expect(parseModule('import foo, * as bar from "foo";', {
              ranges: true,
              raw: true,
              locations: true
          })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 32,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 32
              }
            },
            "body": [
              {
                "type": "ImportDeclaration",
                "start": 0,
                "end": 32,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 32
                  }
                },
                "specifiers": [
                  {
                    "type": "ImportDefaultSpecifier",
                    "start": 7,
                    "end": 10,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 7
                      },
                      "end": {
                        "line": 1,
                        "column": 10
                      }
                    },
                    "local": {
                      "type": "Identifier",
                      "start": 7,
                      "end": 10,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 7
                        },
                        "end": {
                          "line": 1,
                          "column": 10
                        }
                      },
                      "name": "foo"
                    }
                  },
                  {
                    "type": "ImportNamespaceSpecifier",
                    "start": 12,
                    "end": 20,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 12
                      },
                      "end": {
                        "line": 1,
                        "column": 20
                      }
                    },
                    "local": {
                      "type": "Identifier",
                      "start": 17,
                      "end": 20,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 17
                        },
                        "end": {
                          "line": 1,
                          "column": 20
                        }
                      },
                      "name": "bar"
                    }
                  }
                ],
                "source": {
                  "type": "Literal",
                  "start": 26,
                  "end": 31,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 26
                    },
                    "end": {
                      "line": 1,
                      "column": 31
                    }
                  },
                  "value": "foo",
                  "raw": "\"foo\""
                }
              }
            ],
            "sourceType": "module"
          });
      });
  
  
      it('should import default and namespace specifiers', () => {
          expect(parseModule('import foo, * as bar from "foo";', {
              ranges: true,
              raw: true,
              locations: true
          })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 32,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 32
              }
            },
            "body": [
              {
                "type": "ImportDeclaration",
                "start": 0,
                "end": 32,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 32
                  }
                },
                "specifiers": [
                  {
                    "type": "ImportDefaultSpecifier",
                    "start": 7,
                    "end": 10,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 7
                      },
                      "end": {
                        "line": 1,
                        "column": 10
                      }
                    },
                    "local": {
                      "type": "Identifier",
                      "start": 7,
                      "end": 10,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 7
                        },
                        "end": {
                          "line": 1,
                          "column": 10
                        }
                      },
                      "name": "foo"
                    }
                  },
                  {
                    "type": "ImportNamespaceSpecifier",
                    "start": 12,
                    "end": 20,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 12
                      },
                      "end": {
                        "line": 1,
                        "column": 20
                      }
                    },
                    "local": {
                      "type": "Identifier",
                      "start": 17,
                      "end": 20,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 17
                        },
                        "end": {
                          "line": 1,
                          "column": 20
                        }
                      },
                      "name": "bar"
                    }
                  }
                ],
                "source": {
                  "type": "Literal",
                  "start": 26,
                  "end": 31,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 26
                    },
                    "end": {
                      "line": 1,
                      "column": 31
                    }
                  },
                  "value": "foo",
                  "raw": "\"foo\""
                }
              }
            ],
            "sourceType": "module"
          });
      });
  
      it('should import default', () => {
          expect(parseModule('import {default as foo} from "foo";', {
              ranges: true,
              raw: true,
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 35,
              "body": [{
                  "type": "ImportDeclaration",
                  "start": 0,
                  "end": 35,
                  "specifiers": [{
                      "type": "ImportSpecifier",
                      "start": 8,
                      "end": 22,
                      "imported": {
                          "type": "Identifier",
                          "start": 8,
                          "end": 15,
                          "name": "default"
                      },
                      "local": {
                          "type": "Identifier",
                          "start": 19,
                          "end": 22,
                          "name": "foo"
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
  
      it('should import module', () => {
          expect(parseModule('import "foo";', {
              ranges: true,
              raw: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 13,
              "body": [{
                  "type": "ImportDeclaration",
                  "start": 0,
                  "end": 13,
                  "specifiers": [],
                  "source": {
                      "type": "Literal",
                      "start": 7,
                      "end": 12,
                      "value": "foo",
                      "raw": "\"foo\""
                  }
              }],
              "sourceType": "module"
          });
      });
  
      it('should import named as specifier', () => {
          expect(parseModule('import {bar as baz} from "foo";', {
              ranges: true,
              raw: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 31,
              "body": [{
                  "type": "ImportDeclaration",
                  "start": 0,
                  "end": 31,
                  "specifiers": [{
                      "type": "ImportSpecifier",
                      "start": 8,
                      "end": 18,
                      "imported": {
                          "type": "Identifier",
                          "start": 8,
                          "end": 11,
                          "name": "bar"
                      },
                      "local": {
                          "type": "Identifier",
                          "start": 15,
                          "end": 18,
                          "name": "baz"
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
  
      it('should import null as nil', () => {
          expect(parseModule('import { null as nil } from "bar"', {
              ranges: true,
              raw: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 33,
              "body": [{
                  "type": "ImportDeclaration",
                  "start": 0,
                  "end": 33,
                  "specifiers": [{
                      "type": "ImportSpecifier",
                      "start": 9,
                      "end": 20,
                      "imported": {
                          "type": "Identifier",
                          "start": 9,
                          "end": 13,
                          "name": "null"
                      },
                      "local": {
                          "type": "Identifier",
                          "start": 17,
                          "end": 20,
                          "name": "nil"
                      }
                  }],
                  "source": {
                      "type": "Literal",
                      "start": 28,
                      "end": 33,
                      "value": "bar",
                      "raw": "\"bar\""
                  }
              }],
              "sourceType": "module"
          });
      });
  
      it('should import a, {} from c', () => {
          expect(parseModule('import a, {} from "c"', {
              raw: true,
              ranges: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 21,
              "body": [{
                  "type": "ImportDeclaration",
                  "start": 0,
                  "end": 21,
                  "specifiers": [{
                      "type": "ImportDefaultSpecifier",
                      "start": 7,
                      "end": 8,
                      "local": {
                          "type": "Identifier",
                          "start": 7,
                          "end": 8,
                          "name": "a"
                      }
                  }],
                  "source": {
                      "type": "Literal",
                      "start": 18,
                      "end": 21,
                      "value": "c",
                      "raw": "\"c\""
                  }
              }],
              "sourceType": "module"
          });
      });
  
  
      it('should import a, * as b from a', () => {
          expect(parseModule('import a, * as b from "a"', {
              ranges: true,
              raw: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 25,
              "body": [{
                  "type": "ImportDeclaration",
                  "start": 0,
                  "end": 25,
                  "specifiers": [{
                          "type": "ImportDefaultSpecifier",
                          "start": 7,
                          "end": 8,
                          "local": {
                              "type": "Identifier",
                              "start": 7,
                              "end": 8,
                              "name": "a"
                          }
                      },
                      {
                          "type": "ImportNamespaceSpecifier",
                          "start": 10,
                          "end": 16,
                          "local": {
                              "type": "Identifier",
                              "start": 15,
                              "end": 16,
                              "name": "b"
                          }
                      }
                  ],
                  "source": {
                      "type": "Literal",
                      "start": 22,
                      "end": 25,
                      "value": "a",
                      "raw": "\"a\""
                  }
              }],
              "sourceType": "module"
          });
      });
  
      it('should import a, {function as c} from c', () => {
          expect(parseModule('import a, {function as c} from "c"', {
              raw: true,
              ranges: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 34,
              "body": [{
                  "type": "ImportDeclaration",
                  "start": 0,
                  "end": 34,
                  "specifiers": [{
                          "type": "ImportDefaultSpecifier",
                          "start": 7,
                          "end": 8,
                          "local": {
                              "type": "Identifier",
                              "start": 7,
                              "end": 8,
                              "name": "a"
                          }
                      },
                      {
                          "type": "ImportSpecifier",
                          "start": 11,
                          "end": 24,
                          "imported": {
                              "type": "Identifier",
                              "start": 11,
                              "end": 19,
                              "name": "function"
                          },
                          "local": {
                              "type": "Identifier",
                              "start": 23,
                              "end": 24,
                              "name": "c"
                          }
                      }
                  ],
                  "source": {
                      "type": "Literal",
                      "start": 31,
                      "end": 34,
                      "value": "c",
                      "raw": "\"c\""
                  }
              }],
              "sourceType": "module"
          });
      });
  
  
      it('should import a, {as as c} from c', () => {
          expect(parseModule('import a, {as as c} from \'c\'', {
              ranges: true,
              raw: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 28,
              "body": [{
                  "type": "ImportDeclaration",
                  "start": 0,
                  "end": 28,
                  "specifiers": [{
                          "type": "ImportDefaultSpecifier",
                          "start": 7,
                          "end": 8,
                          "local": {
                              "type": "Identifier",
                              "start": 7,
                              "end": 8,
                              "name": "a"
                          }
                      },
                      {
                          "type": "ImportSpecifier",
                          "start": 11,
                          "end": 18,
                          "imported": {
                              "type": "Identifier",
                              "start": 11,
                              "end": 13,
                              "name": "as"
                          },
                          "local": {
                              "type": "Identifier",
                              "start": 17,
                              "end": 18,
                              "name": "c"
                          }
                      }
                  ],
                  "source": {
                      "type": "Literal",
                      "start": 25,
                      "end": 28,
                      "value": "c",
                      "raw": "'c'"
                  }
              }],
              "sourceType": "module"
          });
      });
  
      it('should import {as as as} from "as"', () => {
          expect(parseModule('import {as as as} from "as"', {
              ranges: true,
              raw: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 27,
              "body": [{
                  "type": "ImportDeclaration",
                  "start": 0,
                  "end": 27,
                  "specifiers": [{
                      "type": "ImportSpecifier",
                      "start": 8,
                      "end": 16,
                      "imported": {
                          "type": "Identifier",
                          "start": 8,
                          "end": 10,
                          "name": "as"
                      },
                      "local": {
                          "type": "Identifier",
                          "start": 14,
                          "end": 16,
                          "name": "as"
                      }
                  }],
                  "source": {
                      "type": "Literal",
                      "start": 23,
                      "end": 27,
                      "value": "as",
                      "raw": "\"as\""
                  }
              }],
              "sourceType": "module"
          });
      });
      it('should import a, {b,c} from "d"', () => {
          expect(parseModule('import a, {b,c} from "d"', {
              ranges: true,
              raw: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 24,
              "body": [{
                  "type": "ImportDeclaration",
                  "start": 0,
                  "end": 24,
                  "specifiers": [{
                          "type": "ImportDefaultSpecifier",
                          "start": 7,
                          "end": 8,
                          "local": {
                              "type": "Identifier",
                              "start": 7,
                              "end": 8,
                              "name": "a"
                          }
                      },
                      {
                          "type": "ImportSpecifier",
                          "start": 11,
                          "end": 12,
                          "imported": {
                              "type": "Identifier",
                              "start": 11,
                              "end": 12,
                              "name": "b"
                          },
                          "local": {
                              "type": "Identifier",
                              "start": 11,
                              "end": 12,
                              "name": "b"
                          }
                      },
                      {
                          "type": "ImportSpecifier",
                          "start": 13,
                          "end": 14,
                          "imported": {
                              "type": "Identifier",
                              "start": 13,
                              "end": 14,
                              "name": "c"
                          },
                          "local": {
                              "type": "Identifier",
                              "start": 13,
                              "end": 14,
                              "name": "c"
                          }
                      }
                  ],
                  "source": {
                      "type": "Literal",
                      "start": 21,
                      "end": 24,
                      "value": "d",
                      "raw": "\"d\""
                  }
              }],
              "sourceType": "module"
          });
      });
  
      it('should import a, {b,c,} from "d"', () => {
          expect(parseModule('import a, {b,c,} from "d"', {
              raw: true,
              ranges: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 25,
              "body": [{
                  "type": "ImportDeclaration",
                  "start": 0,
                  "end": 25,
                  "specifiers": [{
                          "type": "ImportDefaultSpecifier",
                          "start": 7,
                          "end": 8,
                          "local": {
                              "type": "Identifier",
                              "start": 7,
                              "end": 8,
                              "name": "a"
                          }
                      },
                      {
                          "type": "ImportSpecifier",
                          "start": 11,
                          "end": 12,
                          "imported": {
                              "type": "Identifier",
                              "start": 11,
                              "end": 12,
                              "name": "b"
                          },
                          "local": {
                              "type": "Identifier",
                              "start": 11,
                              "end": 12,
                              "name": "b"
                          }
                      },
                      {
                          "type": "ImportSpecifier",
                          "start": 13,
                          "end": 14,
                          "imported": {
                              "type": "Identifier",
                              "start": 13,
                              "end": 14,
                              "name": "c"
                          },
                          "local": {
                              "type": "Identifier",
                              "start": 13,
                              "end": 14,
                              "name": "c"
                          }
                      }
                  ],
                  "source": {
                      "type": "Literal",
                      "start": 22,
                      "end": 25,
                      "value": "d",
                      "raw": "\"d\""
                  }
              }],
              "sourceType": "module"
          });
      });
  });