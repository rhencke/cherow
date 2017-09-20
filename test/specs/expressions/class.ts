import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Espressions - Class', () => {
    
        it('should fail if rest parameter has an initializer', () => {
            expect(() => {
                parseScript(`var C = class { static async method(...x = []) {});`);
            }).to.throw();
        });
    
        it('should fail if rest parameter has an initializer', () => {
            expect(() => {
                parseScript(`var C = class { static async method(...x = []) {});`);
            }).to.throw();
        });
    
        it('should fail if await used as binding identifier', () => {
            expect(() => {
                parseScript(`var C = class { async method() { var await; }};`);
            }).to.throw();
        });
    
        it('should fail if static await used as binding identifier', () => {
            expect(() => {
                parseScript(`var C = class { static async method() { var await; }};`);
            }).to.throw();
        });
    
        it('should fail if rest parameter has an initializer', () => {
            expect(() => {
                parseScript(`var C = class { static async method(...x = []) {});`);
            }).to.throw();
        });
    
        it('should fail if rest parameter has an initializer', () => {
            expect(() => {
                parseScript(`var C = class { static async method(...x = []) {});`);
            }).to.throw();
        });
    
        it('should fail if rest parameter has an initializer', () => {
            expect(() => {
                parseScript(`var C = class { static async method(...x = []) {});`);
            }).to.throw();
        });
    
        it('should fail if on reset element (nested object pattern) with initializer', () => {
            expect(() => {
                parseScript(`var C = class { static method([...{ x } = []] = []) {} };`);
            }).to.throw();
        });
    
        it('should fail if on rest element (array binding pattern) followed by any element', () => {
            expect(() => {
                parseScript(`var C = class { static method([...[x], y] = [1, 2, 3]) {} };`);
            }).to.throw();
        });
    
        it('expect "class X { async static f(a) { await a } }', () => {
            expect(() => {
                parseScript(`class X { async static f(a) { await a } }`);
            }).to.throw();
        });
    
        it('expect "class X { async static f(a) { await a } }', () => {
            expect(() => {
                parseScript(`class x {
            set foo(...rest){}  
        }`);
            }).to.throw();
        });
    
        it('expect "(class {[3]:0}" to throw', () => {
            expect(function() {
                parseScript(`(class {[3]:0}`);
            }).to.throw();
        });
    
        it('expect "class A { get prop(x) {} }', () => {
            expect(function() {
                parseScript(`class A { get prop(x) {} }`);
            }).to.throw();
        });
    
        it('expect "class A { set prop() {} }', () => {
            expect(function() {
                parseScript(`class A { set prop() {} }`);
            }).to.throw();
        });
    
        it('expect "(class {a})" to throw', () => {
            expect(function() {
                parseScript(`(class {a})`);
            }).to.throw();
        });
    
        it('expect "(class {a=0})" to throw', () => {
            expect(function() {
                parseScript(`(class {a=0})`);
            }).to.throw();
        });
    
        it('should fail on duplicate constructor literal', () => {
            expect(() => {
                parseScript(`obj = (class A { constructor() {} "constructor"() {} })`)
            }).to.throw('A class may only have one constructor')
        });
    
        it('should fail on duplicate constructor literal', () => {
            expect(() => {
                parseScript(`obj = (class A { "constructor"() {} constructor() {} })`)
            }).to.throw('A class may only have one constructor')
        });
    
        it('should fail on getter accessor with constructor', () => {
            expect(() => {
                parseScript(`obj = (class A { get constructor() {} })`)
            }).to.throw()
        });
    
        it('should fail on setter accessor with constructor', () => {
            expect(() => {
                parseScript(`obj = (class A { set constructor(v) {} })`)
            }).to.throw()
        });
    
        it('should fail on generator constructor', () => {
            expect(() => {
                parseScript(`(class A { *constructor() {} })`)
            }).to.throw()
        });
    
        it('should fail on "class A {async* foo() { }} if "next" options is not set', () => {
            expect(() => {
                parseScript(`(class A {async* foo() { }})`)
            }).to.throw()
        });
    
        it('should parse "class B extends A { foo(a = super.foo()) { return a }}"', () => {
            expect(parseScript(`class B extends A { foo(a = super.foo()) { return a }}`, {
                ranges: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 54,
                "body": [{
                    "type": "ClassDeclaration",
                    "start": 0,
                    "end": 54,
                    "id": {
                        "type": "Identifier",
                        "start": 6,
                        "end": 7,
                        "name": "B"
                    },
                    "superClass": {
                        "type": "Identifier",
                        "start": 16,
                        "end": 17,
                        "name": "A"
                    },
                    "body": {
                        "type": "ClassBody",
                        "start": 18,
                        "end": 54,
                        "body": [{
                            "type": "MethodDefinition",
                            "start": 20,
                            "end": 53,
                            "computed": false,
                            "key": {
                                "type": "Identifier",
                                "start": 20,
                                "end": 23,
                                "name": "foo"
                            },
                            "static": false,
                            "kind": "method",
                            "value": {
                                "type": "FunctionExpression",
                                "start": 23,
                                "end": 53,
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [{
                                    "type": "AssignmentPattern",
                                    "start": 24,
                                    "end": 39,
                                    "left": {
                                        "type": "Identifier",
                                        "start": 24,
                                        "end": 25,
                                        "name": "a"
                                    },
                                    "right": {
                                        "type": "CallExpression",
                                        "start": 28,
                                        "end": 39,
                                        "callee": {
                                            "type": "MemberExpression",
                                            "start": 28,
                                            "end": 37,
                                            "object": {
                                                "type": "Super",
                                                "start": 28,
                                                "end": 33
                                            },
                                            "property": {
                                                "type": "Identifier",
                                                "start": 34,
                                                "end": 37,
                                                "name": "foo"
                                            },
                                            "computed": false
                                        },
                                        "arguments": []
                                    }
                                }],
                                "body": {
                                    "type": "BlockStatement",
                                    "start": 41,
                                    "end": 53,
                                    "body": [{
                                        "type": "ReturnStatement",
                                        "start": 43,
                                        "end": 51,
                                        "argument": {
                                            "type": "Identifier",
                                            "start": 50,
                                            "end": 51,
                                            "name": "a"
                                        }
                                    }]
                                }
                            }
                        }]
                    }
                }],
                "sourceType": "script"
            })
        })
    
        it('should parse "(class extends 0{})"', () => {
            expect(parseScript(`(class extends 0{})`)).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "ClassExpression",
                        "id": null,
                        "superClass": {
                            "type": "Literal",
                            "value": 0
                        },
                        "body": {
                            "type": "ClassBody",
                            "body": []
                        }
                    }
                }],
                "sourceType": "script"
            })
        })
    
        it('should parse "(class A extends 0{})"', () => {
            expect(parseScript(`(class A extends 0{})`)).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "ClassExpression",
                        "id": {
                            "type": "Identifier",
                            "name": "A"
                        },
                        "superClass": {
                            "type": "Literal",
                            "value": 0
                        },
                        "body": {
                            "type": "ClassBody",
                            "body": []
                        }
                    }
                }],
                "sourceType": "script"
            })
        })
    
        it('should parse "(class {})"', () => {
            expect(parseScript(`(class {})`)).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "ClassExpression",
                        "id": null,
                        "superClass": null,
                        "body": {
                            "type": "ClassBody",
                            "body": []
                        }
                    }
                }],
                "sourceType": "script"
            })
        })
    
        it('should parse "(class extends A {})"', () => {
            expect(parseScript(`(class extends A {})`)).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "ClassExpression",
                        "id": null,
                        "superClass": {
                            "type": "Identifier",
                            "name": "A"
                        },
                        "body": {
                            "type": "ClassBody",
                            "body": []
                        }
                    }
                }],
                "sourceType": "script"
            })
        })
    
        it('should parse "(class A extends A {})"', () => {
            expect(parseScript(`(class A extends A {})`)).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "ClassExpression",
                        "id": {
                            "type": "Identifier",
                            "name": "A"
                        },
                        "superClass": {
                            "type": "Identifier",
                            "name": "A"
                        },
                        "body": {
                            "type": "ClassBody",
                            "body": []
                        }
                    }
                }],
                "sourceType": "script"
            })
        })
    
        it('should parse "(class {;;;\n;\n})"', () => {
            expect(parseScript(`(class {;;;\n;\n})`)).to.eql({
                "body": [{
                    "expression": {
                        "body": {
                            "body": [],
                            "type": "ClassBody"
                        },
                        "id": null,
                        "superClass": null,
                        "type": "ClassExpression"
                    },
                    "type": "ExpressionStatement"
                }],
                "sourceType": "script",
                "type": "Program"
            })
        })
        it('should parse "(class {;;;\n;a(){}b(){}})"', () => {
            expect(parseScript(`(class {;;;\n;a(){}b(){}})`)).to.eql({
                "body": [{
                    "expression": {
                        "body": {
                            "body": [{
                                    "computed": false,
                                    "key": {
                                        "name": "a",
                                        "type": "Identifier"
                                    },
                                    "kind": "method",
                                    "static": false,
                                    "type": "MethodDefinition",
                                    "value": {
                                        "async": false,
                                        "body": {
                                            "body": [],
                                            "type": "BlockStatement"
                                        },
                                        "expression": false,
                                        "generator": false,
                                        "id": null,
                                        "params": [],
                                        "type": "FunctionExpression"
                                    }
                                },
                                {
                                    "computed": false,
                                    "key": {
                                        "name": "b",
                                        "type": "Identifier"
                                    },
                                    "kind": "method",
                                    "static": false,
                                    "type": "MethodDefinition",
                                    "value": {
                                        "async": false,
                                        "body": {
                                            "body": [],
                                            "type": "BlockStatement"
                                        },
                                        "expression": false,
                                        "generator": false,
                                        "id": null,
                                        "params": [],
                                        "type": "FunctionExpression"
                                    }
                                }
                            ],
                            "type": "ClassBody"
                        },
                        "id": null,
                        "superClass": null,
                        "type": "ClassExpression"
                    },
                    "type": "ExpressionStatement"
                }],
                "sourceType": "script",
                "type": "Program"
            })
        })
        it('should parse "(class {set a(b) {}})"', () => {
            expect(parseScript(`(class {set a(b) {}})`)).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "ClassExpression",
                        "id": null,
                        "superClass": null,
                        "body": {
                            "type": "ClassBody",
                            "body": [{
                                "type": "MethodDefinition",
                                "key": {
                                    "type": "Identifier",
                                    "name": "a"
                                },
                                "computed": false,
                                "value": {
                                    "type": "FunctionExpression",
                                    "id": null,
                                    "params": [{
                                        "type": "Identifier",
                                        "name": "b"
                                    }],
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": []
                                    },
                                    "generator": false,
                                    "expression": false,
                                    "async": false
                                },
                                "kind": "set",
                                "static": false
                            }]
                        }
                    }
                }],
                "sourceType": "script"
            })
        })
        it('should parse "(class {get a() {}})"', () => {
            expect(parseScript(`(class {get a() {}})`)).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "ClassExpression",
                        "id": null,
                        "superClass": null,
                        "body": {
                            "type": "ClassBody",
                            "body": [{
                                "type": "MethodDefinition",
                                "key": {
                                    "type": "Identifier",
                                    "name": "a"
                                },
                                "computed": false,
                                "value": {
                                    "type": "FunctionExpression",
                                    "id": null,
                                    "params": [],
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": []
                                    },
                                    "generator": false,
                                    "expression": false,
                                    "async": false
                                },
                                "kind": "get",
                                "static": false
                            }]
                        }
                    }
                }],
                "sourceType": "script"
            })
        })
    
        it('should parse "(class {set a(b) {\'use strict\';}})"', () => {
            expect(parseScript(`(class {set a(b) {'use strict';}})`, {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 34,
                "body": [{
                    "type": "ExpressionStatement",
                    "start": 0,
                    "end": 34,
                    "expression": {
                        "type": "ClassExpression",
                        "start": 1,
                        "end": 33,
                        "id": null,
                        "superClass": null,
                        "body": {
                            "type": "ClassBody",
                            "start": 7,
                            "end": 33,
                            "body": [{
                                "type": "MethodDefinition",
                                "start": 8,
                                "end": 32,
                                "computed": false,
                                "key": {
                                    "type": "Identifier",
                                    "start": 12,
                                    "end": 13,
                                    "name": "a"
                                },
                                "static": false,
                                "kind": "set",
                                "value": {
                                    "type": "FunctionExpression",
                                    "start": 13,
                                    "end": 32,
                                    "id": null,
                                    "generator": false,
                                    "expression": false,
                                    "async": false,
                                    "params": [{
                                        "type": "Identifier",
                                        "start": 14,
                                        "end": 15,
                                        "name": "b"
                                    }],
                                    "body": {
                                        "type": "BlockStatement",
                                        "start": 17,
                                        "end": 32,
                                        "body": [{
                                            "type": "ExpressionStatement",
                                            "start": 18,
                                            "end": 31,
                                            "expression": {
                                                "type": "Literal",
                                                "start": 18,
                                                "end": 30,
                                                "value": "use strict",
                                                "raw": "'use strict'"
                                            }
                                        }]
                                    }
                                }
                            }]
                        }
                    }
                }],
                "sourceType": "script"
            })
        })
        it('should parse "(class {prototype() {}})"', () => {
            expect(parseScript(`(class {prototype() {}})`)).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "ClassExpression",
                        "id": null,
                        "superClass": null,
                        "body": {
                            "type": "ClassBody",
                            "body": [{
                                "type": "MethodDefinition",
                                "key": {
                                    "type": "Identifier",
                                    "name": "prototype"
                                },
                                "computed": false,
                                "value": {
                                    "type": "FunctionExpression",
                                    "id": null,
                                    "params": [],
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": []
                                    },
                                    "generator": false,
                                    "expression": false,
                                    "async": false
                                },
                                "kind": "method",
                                "static": false
                            }]
                        }
                    }
                }],
                "sourceType": "script"
            })
        })
    
        it('should parse "(class {prototype() {}})"', () => {
            expect(parseScript(`(class {prototype() {}})`)).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "ClassExpression",
                        "id": null,
                        "superClass": null,
                        "body": {
                            "type": "ClassBody",
                            "body": [{
                                "type": "MethodDefinition",
                                "key": {
                                    "type": "Identifier",
                                    "name": "prototype"
                                },
                                "computed": false,
                                "value": {
                                    "type": "FunctionExpression",
                                    "id": null,
                                    "params": [],
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": []
                                    },
                                    "generator": false,
                                    "expression": false,
                                    "async": false
                                },
                                "kind": "method",
                                "static": false
                            }]
                        }
                    }
                }],
                "sourceType": "script"
            })
        })
    
        it('should parse "(class extends (a,b) {})"', () => {
            expect(parseScript(`(class extends (a,b) {})`, {
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "ClassExpression",
                        "id": null,
                        "superClass": {
                            "type": "SequenceExpression",
                            "expressions": [{
                                    "type": "Identifier",
                                    "name": "a"
                                },
                                {
                                    "type": "Identifier",
                                    "name": "b"
                                }
                            ]
                        },
                        "body": {
                            "type": "ClassBody",
                            "body": []
                        }
                    }
                }],
                "sourceType": "script"
            })
        })
    
        it('should parse "(class {static(){}})"', () => {
            expect(parseScript(`(class {static(){}})`)).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "ClassExpression",
                        "id": null,
                        "superClass": null,
                        "body": {
                            "type": "ClassBody",
                            "body": [{
                                "type": "MethodDefinition",
                                "key": {
                                    "type": "Identifier",
                                    "name": "static"
                                },
                                "computed": false,
                                "value": {
                                    "type": "FunctionExpression",
                                    "id": null,
                                    "params": [],
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": []
                                    },
                                    "generator": false,
                                    "expression": false,
                                    "async": false
                                },
                                "kind": "method",
                                "static": false
                            }]
                        }
                    }
                }],
                "sourceType": "script"
            })
        })
    
        it('should parse "(class {static constructor(){}})"', () => {
            expect(parseScript(`(class {static constructor(){}})`)).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "ClassExpression",
                        "id": null,
                        "superClass": null,
                        "body": {
                            "type": "ClassBody",
                            "body": [{
                                "type": "MethodDefinition",
                                "key": {
                                    "type": "Identifier",
                                    "name": "constructor"
                                },
                                "computed": false,
                                "value": {
                                    "type": "FunctionExpression",
                                    "id": null,
                                    "params": [],
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": []
                                    },
                                    "generator": false,
                                    "expression": false,
                                    "async": false
                                },
                                "kind": "method",
                                "static": true
                            }]
                        }
                    }
                }],
                "sourceType": "script"
            })
        })
    
        it('should parse "(class A{})"', () => {
            expect(parseScript(`(class A{})`)).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "ClassExpression",
                        "id": {
                            "type": "Identifier",
                            "name": "A"
                        },
                        "superClass": null,
                        "body": {
                            "type": "ClassBody",
                            "body": []
                        }
                    }
                }],
                "sourceType": "script"
            })
        })
    
        it('should parse "(class {;;;\n;a(){}}))"', () => {
            expect(parseScript(`(class {;;;\n;a(){}})`)).to.eql({
                "body": [{
                    "expression": {
                        "body": {
                            "body": [{
                                "computed": false,
                                "key": {
                                    "name": "a",
                                    "type": "Identifier"
                                },
                                "kind": "method",
                                "static": false,
                                "type": "MethodDefinition",
                                "value": {
                                    "async": false,
                                    "body": {
                                        "body": [],
                                        "type": "BlockStatement"
                                    },
                                    "expression": false,
                                    "generator": false,
                                    "id": null,
                                    "params": [],
                                    "type": "FunctionExpression"
                                }
                            }],
                            "type": "ClassBody"
                        },
                        "id": null,
                        "superClass": null,
                        "type": "ClassExpression"
                    },
                    "type": "ExpressionStatement"
                }],
                "sourceType": "script",
                "type": "Program"
            })
        })
    
        it('should parse "(class {a() {}})"', () => {
            expect(parseScript(`(class {a() {}})`)).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "ClassExpression",
                        "id": null,
                        "superClass": null,
                        "body": {
                            "type": "ClassBody",
                            "body": [{
                                "type": "MethodDefinition",
                                "key": {
                                    "type": "Identifier",
                                    "name": "a"
                                },
                                "computed": false,
                                "value": {
                                    "type": "FunctionExpression",
                                    "id": null,
                                    "params": [],
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": []
                                    },
                                    "generator": false,
                                    "expression": false,
                                    "async": false
                                },
                                "kind": "method",
                                "static": false
                            }]
                        }
                    }
                }],
                "sourceType": "script"
            })
        })
    
        it('should parse "(class {3() {}})"', () => {
            expect(parseScript(`(class {3() {}})`, {
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "ClassExpression",
                        "id": null,
                        "superClass": null,
                        "body": {
                            "type": "ClassBody",
                            "body": [{
                                "type": "MethodDefinition",
                                "key": {
                                    "type": "Literal",
                                    "value": 3,
                                    "raw": "3"
                                },
                                "computed": false,
                                "value": {
                                    "type": "FunctionExpression",
                                    "id": null,
                                    "params": [],
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": []
                                    },
                                    "generator": false,
                                    "expression": false,
                                    "async": false
                                },
                                "kind": "method",
                                "static": false
                            }]
                        }
                    }
                }],
                "sourceType": "script"
            })
        })
    
        it('should parse "(class{[3+5](){}})"', () => {
            expect(parseScript(`(class{[3+5](){}})`, {
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "ClassExpression",
                        "id": null,
                        "superClass": null,
                        "body": {
                            "type": "ClassBody",
                            "body": [{
                                "type": "MethodDefinition",
                                "key": {
                                    "type": "BinaryExpression",
                                    "operator": "+",
                                    "left": {
                                        "type": "Literal",
                                        "value": 3,
                                        "raw": "3"
                                    },
                                    "right": {
                                        "type": "Literal",
                                        "value": 5,
                                        "raw": "5"
                                    }
                                },
                                "computed": true,
                                "value": {
                                    "type": "FunctionExpression",
                                    "id": null,
                                    "params": [],
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": []
                                    },
                                    "generator": false,
                                    "expression": false,
                                    "async": false
                                },
                                "kind": "method",
                                "static": false
                            }]
                        }
                    }
                }],
                "sourceType": "script"
            })
        })
        it('should parse "({ a(){ (class {[super.a](){}}); } })"', () => {
            expect(parseScript(`({ a(){ (class {[super.a](){}}); } })`)).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "ObjectExpression",
                        "properties": [{
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "a"
                            },
                            "computed": false,
                            "value": {
                                "type": "FunctionExpression",
                                "id": null,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [{
                                        "type": "ExpressionStatement",
                                        "expression": {
                                            "type": "ClassExpression",
                                            "id": null,
                                            "superClass": null,
                                            "body": {
                                                "type": "ClassBody",
                                                "body": [{
                                                    "type": "MethodDefinition",
                                                    "key": {
                                                        "type": "MemberExpression",
                                                        "computed": false,
                                                        "object": {
                                                            "type": "Super"
                                                        },
                                                        "property": {
                                                            "type": "Identifier",
                                                            "name": "a"
                                                        }
                                                    },
                                                    "computed": true,
                                                    "value": {
                                                        "type": "FunctionExpression",
                                                        "id": null,
                                                        "params": [],
                                                        "body": {
                                                            "type": "BlockStatement",
                                                            "body": []
                                                        },
                                                        "generator": false,
                                                        "expression": false,
                                                        "async": false
                                                    },
                                                    "kind": "method",
                                                    "static": false
                                                }]
                                            }
                                        }
                                    }]
                                },
                                "generator": false,
                                "expression": false,
                                "async": false
                            },
                            "kind": "init",
                            "method": true,
                            "shorthand": false
                        }]
                    }
                }],
                "sourceType": "script"
            })
        })
    
        it('should parse computed values as accessor property names containing a Unicode escape sequence', () => {
            expect(parseScript(`C = class {
          get 'unicod\\u{000065}Escape'() { return 'get string'; }
          set 'unicod\\u{000065}Escape'(param) { stringSet = param; }
        };`, {
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "operator": "=",
                        "left": {
                            "type": "Identifier",
                            "name": "C"
                        },
                        "right": {
                            "type": "ClassExpression",
                            "id": null,
                            "superClass": null,
                            "body": {
                                "type": "ClassBody",
                                "body": [{
                                        "type": "MethodDefinition",
                                        "key": {
                                            "type": "Literal",
                                            "value": "unicodeEscape",
                                            "raw": "'unicod\\u{000065}Escape'"
                                        },
                                        "computed": false,
                                        "value": {
                                            "type": "FunctionExpression",
                                            "id": null,
                                            "params": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [{
                                                    "type": "ReturnStatement",
                                                    "argument": {
                                                        "type": "Literal",
                                                        "value": "get string",
                                                        "raw": "'get string'"
                                                    }
                                                }]
                                            },
                                            "generator": false,
                                            "expression": false,
                                            "async": false
                                        },
                                        "kind": "get",
                                        "static": false
                                    },
                                    {
                                        "type": "MethodDefinition",
                                        "key": {
                                            "type": "Literal",
                                            "value": "unicodeEscape",
                                            "raw": "'unicod\\u{000065}Escape'"
                                        },
                                        "computed": false,
                                        "value": {
                                            "type": "FunctionExpression",
                                            "id": null,
                                            "params": [{
                                                "type": "Identifier",
                                                "name": "param"
                                            }],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [{
                                                    "type": "ExpressionStatement",
                                                    "expression": {
                                                        "type": "AssignmentExpression",
                                                        "operator": "=",
                                                        "left": {
                                                            "type": "Identifier",
                                                            "name": "stringSet"
                                                        },
                                                        "right": {
                                                            "type": "Identifier",
                                                            "name": "param"
                                                        }
                                                    }
                                                }]
                                            },
                                            "generator": false,
                                            "expression": false,
                                            "async": false
                                        },
                                        "kind": "set",
                                        "static": false
                                    }
                                ]
                            }
                        }
                    }
                }],
                "sourceType": "script"
            })
        })
    
        it('should parse computed values as accessor property names (AssignmentExpression) ', () => {
            expect(parseScript(`C = class {
          get [_ = 'str' + 'ing']() { return 'get string'; }
          set [_ = 'str' + 'ing'](param) { stringSet = param; }
        };`, {
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "operator": "=",
                        "left": {
                            "type": "Identifier",
                            "name": "C"
                        },
                        "right": {
                            "type": "ClassExpression",
                            "id": null,
                            "superClass": null,
                            "body": {
                                "type": "ClassBody",
                                "body": [{
                                        "type": "MethodDefinition",
                                        "key": {
                                            "type": "AssignmentExpression",
                                            "operator": "=",
                                            "left": {
                                                "type": "Identifier",
                                                "name": "_"
                                            },
                                            "right": {
                                                "type": "BinaryExpression",
                                                "operator": "+",
                                                "left": {
                                                    "type": "Literal",
                                                    "value": "str",
                                                    "raw": "'str'"
                                                },
                                                "right": {
                                                    "type": "Literal",
                                                    "value": "ing",
                                                    "raw": "'ing'"
                                                }
                                            }
                                        },
                                        "computed": true,
                                        "value": {
                                            "type": "FunctionExpression",
                                            "id": null,
                                            "params": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [{
                                                    "type": "ReturnStatement",
                                                    "argument": {
                                                        "type": "Literal",
                                                        "value": "get string",
                                                        "raw": "'get string'"
                                                    }
                                                }]
                                            },
                                            "generator": false,
                                            "expression": false,
                                            "async": false
                                        },
                                        "kind": "get",
                                        "static": false
                                    },
                                    {
                                        "type": "MethodDefinition",
                                        "key": {
                                            "type": "AssignmentExpression",
                                            "operator": "=",
                                            "left": {
                                                "type": "Identifier",
                                                "name": "_"
                                            },
                                            "right": {
                                                "type": "BinaryExpression",
                                                "operator": "+",
                                                "left": {
                                                    "type": "Literal",
                                                    "value": "str",
                                                    "raw": "'str'"
                                                },
                                                "right": {
                                                    "type": "Literal",
                                                    "value": "ing",
                                                    "raw": "'ing'"
                                                }
                                            }
                                        },
                                        "computed": true,
                                        "value": {
                                            "type": "FunctionExpression",
                                            "id": null,
                                            "params": [{
                                                "type": "Identifier",
                                                "name": "param"
                                            }],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [{
                                                    "type": "ExpressionStatement",
                                                    "expression": {
                                                        "type": "AssignmentExpression",
                                                        "operator": "=",
                                                        "left": {
                                                            "type": "Identifier",
                                                            "name": "stringSet"
                                                        },
                                                        "right": {
                                                            "type": "Identifier",
                                                            "name": "param"
                                                        }
                                                    }
                                                }]
                                            },
                                            "generator": false,
                                            "expression": false,
                                            "async": false
                                        },
                                        "kind": "set",
                                        "static": false
                                    }
                                ]
                            }
                        }
                    }
                }],
                "sourceType": "script"
            })
        })
    
        it('should parse computed values as accessor property names (numeric literal with leading decimal point) ', () => {
            expect(parseScript(`C = class {
          get .1() { return 'get string'; }
          set .1(param) { stringSet = param; }
        };`, {
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "operator": "=",
                        "left": {
                            "type": "Identifier",
                            "name": "C"
                        },
                        "right": {
                            "type": "ClassExpression",
                            "id": null,
                            "superClass": null,
                            "body": {
                                "type": "ClassBody",
                                "body": [{
                                        "type": "MethodDefinition",
                                        "key": {
                                            "type": "Literal",
                                            "value": 0.1,
                                            "raw": ".1"
                                        },
                                        "computed": false,
                                        "value": {
                                            "type": "FunctionExpression",
                                            "id": null,
                                            "params": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [{
                                                    "type": "ReturnStatement",
                                                    "argument": {
                                                        "type": "Literal",
                                                        "value": "get string",
                                                        "raw": "'get string'"
                                                    }
                                                }]
                                            },
                                            "generator": false,
                                            "expression": false,
                                            "async": false
                                        },
                                        "kind": "get",
                                        "static": false
                                    },
                                    {
                                        "type": "MethodDefinition",
                                        "key": {
                                            "type": "Literal",
                                            "value": 0.1,
                                            "raw": ".1"
                                        },
                                        "computed": false,
                                        "value": {
                                            "type": "FunctionExpression",
                                            "id": null,
                                            "params": [{
                                                "type": "Identifier",
                                                "name": "param"
                                            }],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [{
                                                    "type": "ExpressionStatement",
                                                    "expression": {
                                                        "type": "AssignmentExpression",
                                                        "operator": "=",
                                                        "left": {
                                                            "type": "Identifier",
                                                            "name": "stringSet"
                                                        },
                                                        "right": {
                                                            "type": "Identifier",
                                                            "name": "param"
                                                        }
                                                    }
                                                }]
                                            },
                                            "generator": false,
                                            "expression": false,
                                            "async": false
                                        },
                                        "kind": "set",
                                        "static": false
                                    }
                                ]
                            }
                        }
                    }
                }],
                "sourceType": "script"
            })
        })
    
        it('should parse a simple static async generator with yield', () => {
            expect(parseScript(`var C = class { static async *gen() {
                      var v = yield* obj;
                      return "return-value";
                }}`, {
                raw: true,
                next: true
            })).to.eql({
                "body": [{
                    "declarations": [{
                        "id": {
                            "name": "C",
                            "type": "Identifier"
                        },
                        "init": {
                            "body": {
                                "body": [{
                                    "computed": false,
                                    "key": {
                                        "name": "gen",
                                        "type": "Identifier"
                                    },
                                    "kind": "method",
                                    "static": true,
                                    "type": "MethodDefinition",
                                    "value": {
                                        "async": true,
                                        "body": {
                                            "body": [{
                                                    "declarations": [{
                                                        "id": {
                                                            "name": "v",
                                                            "type": "Identifier"
                                                        },
                                                        "init": {
                                                            "argument": {
                                                                "name": "obj",
                                                                "type": "Identifier"
                                                            },
                                                            "delegate": true,
                                                            "type": "YieldExpression"
                                                        },
                                                        "type": "VariableDeclarator"
                                                    }],
                                                    "kind": "var",
                                                    "type": "VariableDeclaration"
                                                },
                                                {
                                                    "argument": {
                                                        "raw": "\"return-value\"",
                                                        "type": "Literal",
                                                        "value": "return-value",
                                                    },
                                                    "type": "ReturnStatement"
                                                }
                                            ],
                                            "type": "BlockStatement"
                                        },
                                        "expression": false,
                                        "generator": true,
                                        "id": null,
                                        "params": [],
                                        "type": "FunctionExpression"
                                    }
                                }],
                                "type": "ClassBody",
                            },
                            "id": null,
                            "superClass": null,
                            "type": "ClassExpression"
                        },
                        "type": "VariableDeclarator"
                    }],
                    "kind": "var",
                    "type": "VariableDeclaration"
                }],
                "sourceType": "script",
                "type": "Program"
            });
        });
    
        it('should parse yield value in a object spread position', () => {
            expect(parseScript(`var C = class { async *gen() {
                    callCount += 1;
                    yield {
                        ...yield,
                        y: 1,
                        ...yield yield,
                      };
                }}`, {
                raw: true,
                next: true
            })).to.eql({
                "body": [{
                    "declarations": [{
                        "id": {
                            "name": "C",
                            "type": "Identifier"
                        },
                        "init": {
                            "body": {
                                "body": [{
                                    "computed": false,
                                    "key": {
                                        "name": "gen",
                                        "type": "Identifier"
                                    },
                                    "kind": "method",
                                    "static": false,
                                    "type": "MethodDefinition",
                                    "value": {
                                        "async": true,
                                        "body": {
                                            "body": [{
                                                    "expression": {
                                                        "left": {
                                                            "name": "callCount",
                                                            "type": "Identifier",
                                                        },
                                                        "operator": "+=",
                                                        "right": {
                                                            "raw": "1",
                                                            "type": "Literal",
                                                            "value": 1
                                                        },
                                                        "type": "AssignmentExpression"
                                                    },
                                                    "type": "ExpressionStatement"
                                                },
                                                {
                                                    "expression": {
                                                        "argument": {
                                                            "properties": [{
                                                                    "argument": {
                                                                        "argument": null,
                                                                        "delegate": false,
                                                                        "type": "YieldExpression"
                                                                    },
                                                                    "type": "SpreadElement"
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
                                                                        "raw": "1",
                                                                        "type": "Literal",
                                                                        "value": 1
                                                                    }
                                                                },
                                                                {
                                                                    "argument": {
                                                                        "argument": {
                                                                            "argument": null,
                                                                            "delegate": false,
                                                                            "type": "YieldExpression"
                                                                        },
                                                                        "delegate": false,
                                                                        "type": "YieldExpression"
                                                                    },
                                                                    "type": "SpreadElement"
                                                                }
                                                            ],
                                                            "type": "ObjectExpression"
                                                        },
                                                        "delegate": false,
                                                        "type": "YieldExpression"
                                                    },
                                                    "type": "ExpressionStatement"
                                                }
                                            ],
                                            "type": "BlockStatement"
                                        },
                                        "expression": false,
                                        "generator": true,
                                        "id": null,
                                        "params": [],
                                        "type": "FunctionExpression"
                                    }
                                }],
                                "type": "ClassBody"
                            },
                            "id": null,
                            "superClass": null,
                            "type": "ClassExpression"
                        },
                        "type": "VariableDeclarator"
                    }],
                    "kind": "var",
                    "type": "VariableDeclaration"
                }],
                "sourceType": "script",
                "type": "Program"
            });
        });
    
        it('should parse method params with trailing comma', () => {
            expect(parseScript(`var C = class {
                    async method(a, b = 39,) {
                    }
                  }`, {
                raw: true,
                ranges: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 104,
                "body": [
                  {
                    "type": "VariableDeclaration",
                    "start": 0,
                    "end": 104,
                    "declarations": [
                      {
                        "type": "VariableDeclarator",
                        "start": 4,
                        "end": 104,
                        "id": {
                          "type": "Identifier",
                          "start": 4,
                          "end": 5,
                          "name": "C"
                        },
                        "init": {
                          "type": "ClassExpression",
                          "start": 8,
                          "end": 104,
                          "id": null,
                          "superClass": null,
                          "body": {
                            "type": "ClassBody",
                            "start": 14,
                            "end": 104,
                            "body": [
                              {
                                "type": "MethodDefinition",
                                "start": 36,
                                "end": 84,
                                "computed": false,
                                "key": {
                                  "type": "Identifier",
                                  "start": 42,
                                  "end": 48,
                                  "name": "method"
                                },
                                "static": false,
                                "kind": "method",
                                "value": {
                                  "type": "FunctionExpression",
                                  "start": 48,
                                  "end": 84,
                                  "id": null,
                                  "generator": false,
                                  "expression": false,
                                  "async": true,
                                  "params": [
                                    {
                                      "type": "Identifier",
                                      "start": 49,
                                      "end": 50,
                                      "name": "a"
                                    },
                                    {
                                      "type": "AssignmentPattern",
                                      "start": 52,
                                      "end": 58,
                                      "left": {
                                        "type": "Identifier",
                                        "start": 52,
                                        "end": 53,
                                        "name": "b"
                                      },
                                      "right": {
                                        "type": "Literal",
                                        "start": 56,
                                        "end": 58,
                                        "value": 39,
                                        "raw": "39"
                                      }
                                    }
                                  ],
                                  "body": {
                                    "type": "BlockStatement",
                                    "start": 61,
                                    "end": 84,
                                    "body": []
                                  }
                                }
                              }
                            ]
                          }
                        }
                      }
                    ],
                    "kind": "var"
                  }
                ],
                "sourceType": "script"
              });
        });
    
        it('should parse destructuring initializer with a "hole"', () => {
            expect(parseScript(`var C = class {
                    async method([x = 23]) {
                    }
                  };`, {
                raw: true,
                ranges: true,
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 103,
                "body": [
                  {
                    "type": "VariableDeclaration",
                    "start": 0,
                    "end": 103,
                    "declarations": [
                      {
                        "type": "VariableDeclarator",
                        "start": 4,
                        "end": 102,
                        "id": {
                          "type": "Identifier",
                          "start": 4,
                          "end": 5,
                          "name": "C"
                        },
                        "init": {
                          "type": "ClassExpression",
                          "start": 8,
                          "end": 102,
                          "id": null,
                          "superClass": null,
                          "body": {
                            "type": "ClassBody",
                            "start": 14,
                            "end": 102,
                            "body": [
                              {
                                "type": "MethodDefinition",
                                "start": 36,
                                "end": 82,
                                "computed": false,
                                "key": {
                                  "type": "Identifier",
                                  "start": 42,
                                  "end": 48,
                                  "name": "method"
                                },
                                "static": false,
                                "kind": "method",
                                "value": {
                                  "type": "FunctionExpression",
                                  "start": 48,
                                  "end": 82,
                                  "id": null,
                                  "generator": false,
                                  "expression": false,
                                  "async": true,
                                  "params": [
                                    {
                                      "type": "ArrayPattern",
                                      "start": 49,
                                      "end": 57,
                                      "elements": [
                                        {
                                          "type": "AssignmentPattern",
                                          "start": 50,
                                          "end": 56,
                                          "left": {
                                            "type": "Identifier",
                                            "start": 50,
                                            "end": 51,
                                            "name": "x"
                                          },
                                          "right": {
                                            "type": "Literal",
                                            "start": 54,
                                            "end": 56,
                                            "value": 23,
                                            "raw": "23"
                                          }
                                        }
                                      ]
                                    }
                                  ],
                                  "body": {
                                    "type": "BlockStatement",
                                    "start": 59,
                                    "end": 82,
                                    "body": []
                                  }
                                }
                              }
                            ]
                          }
                        }
                      }
                    ],
                    "kind": "var"
                  }
                ],
                "sourceType": "script"
              });
        });
    
    
        it('should parse destructuring initializer with a "hole"', () => {
            expect(parseScript(`var C = class {
                    async *method([x = 23]) {
                    }
                  };`, {
                raw: true,
                next: true
            })).to.eql({
                "body": [{
                    "declarations": [{
                        "id": {
                            "name": "C",
                            "type": "Identifier"
                        },
                        "init": {
                            "body": {
                                "body": [{
                                    "computed": false,
                                    "key": {
                                        "name": "method",
                                        "type": "Identifier"
                                    },
                                    "kind": "method",
                                    "static": false,
                                    "type": "MethodDefinition",
                                    "value": {
                                        "async": true,
                                        "body": {
                                            "body": [],
                                            "type": "BlockStatement"
                                        },
                                        "expression": false,
                                        "generator": true,
                                        "id": null,
                                        "params": [{
                                            "elements": [{
                                                "left": {
                                                    "name": "x",
                                                    "type": "Identifier"
                                                },
                                                "right": {
                                                    "raw": "23",
                                                    "type": "Literal",
                                                    "value": 23
                                                },
                                                "type": "AssignmentPattern"
                                            }],
                                            "type": "ArrayPattern"
                                        }],
                                        "type": "FunctionExpression"
                                    }
                                }],
                                "type": "ClassBody"
                            },
                            "id": null,
                            "superClass": null,
                            "type": "ClassExpression"
                        },
                        "type": "VariableDeclarator"
                    }],
                    "kind": "var",
                    "type": "VariableDeclaration"
                }, ],
                "sourceType": "script",
                "type": "Program"
            });
        });
        it('should parse BindingElement with object binding pattern', () => {
            expect(parseScript(`var C = class {
                    async *method([{ x, y, z } = { x: 44, y: 55, z: 66 }]) {
                    }
                  };`, {
                raw: true,
                next: true
            })).to.eql({
                "body": [{
                    "declarations": [{
                        "id": {
                            "name": "C",
                            "type": "Identifier"
                        },
                        "init": {
                            "body": {
                                "body": [{
                                    "computed": false,
                                    "key": {
                                        "name": "method",
                                        "type": "Identifier"
                                    },
                                    "kind": "method",
                                    "static": false,
                                    "type": "MethodDefinition",
                                    "value": {
                                        "async": true,
                                        "body": {
                                            "body": [],
                                            "type": "BlockStatement"
                                        },
                                        "expression": false,
                                        "generator": true,
                                        "id": null,
                                        "params": [{
                                            "elements": [{
                                                "left": {
                                                    "properties": [{
                                                            "computed": false,
                                                            "key": {
                                                                "name": "x",
                                                                "type": "Identifier"
                                                            },
                                                            "kind": "init",
                                                            "method": false,
                                                            "shorthand": true,
                                                            "type": "Property",
                                                            "value": {
                                                                "name": "x",
                                                                "type": "Identifier"
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
                                                            "shorthand": true,
                                                            "type": "Property",
                                                            "value": {
                                                                "name": "y",
                                                                "type": "Identifier"
                                                            }
                                                        },
                                                        {
                                                            "computed": false,
                                                            "key": {
                                                                "name": "z",
                                                                "type": "Identifier"
                                                            },
                                                            "kind": "init",
                                                            "method": false,
                                                            "shorthand": true,
                                                            "type": "Property",
                                                            "value": {
                                                                "name": "z",
                                                                "type": "Identifier"
                                                            }
                                                        }
                                                    ],
                                                    "type": "ObjectPattern"
                                                },
                                                "right": {
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
                                                                "raw": "44",
                                                                "type": "Literal",
                                                                "value": 44
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
                                                                "raw": "55",
                                                                "type": "Literal",
                                                                "value": 55
                                                            }
                                                        },
                                                        {
                                                            "computed": false,
                                                            "key": {
                                                                "name": "z",
                                                                "type": "Identifier"
                                                            },
                                                            "kind": "init",
                                                            "method": false,
                                                            "shorthand": false,
                                                            "type": "Property",
                                                            "value": {
                                                                "raw": "66",
                                                                "type": "Literal",
                                                                "value": 66
                                                            }
                                                        }
                                                    ],
                                                    "type": "ObjectExpression"
                                                },
                                                "type": "AssignmentPattern"
                                            }],
                                            "type": "ArrayPattern"
                                        }],
                                        "type": "FunctionExpression"
                                    }
                                }],
                                "type": "ClassBody",
                            },
                            "id": null,
                            "superClass": null,
                            "type": "ClassExpression"
                        },
                        "type": "VariableDeclarator"
                    }, ],
                    "kind": "var",
                    "type": "VariableDeclaration"
                }],
                "sourceType": "script",
                "type": "Program"
            });
        });
        it('should parse nested object destructuring with a null value', () => {
            expect(parseScript(`var C = class {
                    async *method([{ x }]) {
                      
                    }
                  };`, {
                raw: true,
                next: true
            })).to.eql({
                "body": [{
                    "declarations": [{
                        "id": {
                            "name": "C",
                            "type": "Identifier"
                        },
                        "init": {
                            "body": {
                                "body": [{
                                    "computed": false,
                                    "key": {
                                        "name": "method",
                                        "type": "Identifier"
                                    },
                                    "kind": "method",
                                    "static": false,
                                    "type": "MethodDefinition",
                                    "value": {
                                        "async": true,
                                        "body": {
                                            "body": [],
                                            "type": "BlockStatement"
                                        },
                                        "expression": false,
                                        "generator": true,
                                        "id": null,
                                        "params": [{
                                            "elements": [{
                                                "properties": [{
                                                    "computed": false,
                                                    "key": {
                                                        "name": "x",
                                                        "type": "Identifier",
                                                    },
                                                    "kind": "init",
                                                    "method": false,
                                                    "shorthand": true,
                                                    "type": "Property",
                                                    "value": {
                                                        "name": "x",
                                                        "type": "Identifier"
                                                    }
                                                }],
                                                "type": "ObjectPattern"
                                            }],
                                            "type": "ArrayPattern"
                                        }],
                                        "type": "FunctionExpression"
                                    }
                                }],
                                "type": "ClassBody"
                            },
                            "id": null,
                            "superClass": null,
                            "type": "ClassExpression"
                        },
                        "type": "VariableDeclarator"
                    }],
                    "kind": "var",
                    "type": "VariableDeclaration"
                }],
                "sourceType": "script",
                "type": "Program"
            });
        });
        it('should parse lone rest element ', () => {
            expect(parseScript(`var C = class {
                    async *method([...x]) {
                  
                    }
                  };`, {
                raw: true,
                next: true
            })).to.eql({
                "body": [{
                    "declarations": [{
                        "id": {
                            "name": "C",
                            "type": "Identifier"
                        },
                        "init": {
                            "body": {
                                "body": [{
                                    "computed": false,
                                    "key": {
                                        "name": "method",
                                        "type": "Identifier"
                                    },
                                    "kind": "method",
                                    "static": false,
                                    "type": "MethodDefinition",
                                    "value": {
                                        "async": true,
                                        "body": {
                                            "body": [],
                                            "type": "BlockStatement"
                                        },
                                        "expression": false,
                                        "generator": true,
                                        "id": null,
                                        "params": [{
                                            "elements": [{
                                                "argument": {
                                                    "name": "x",
                                                    "type": "Identifier"
                                                },
                                                "type": "RestElement"
                                            }],
                                            "type": "ArrayPattern"
                                        }],
                                        "type": "FunctionExpression"
                                    }
                                }],
                                "type": "ClassBody"
                            },
                            "id": null,
                            "superClass": null,
                            "type": "ClassExpression"
                        },
                        "type": "VariableDeclarator"
                    }],
                    "kind": "var",
                    "type": "VariableDeclaration",
                }, ],
                "sourceType": "script",
                "type": "Program",
            });
        });
        it('should parse nested array destructuring with a null value ', () => {
            expect(parseScript(`var C = class {
                    async *method([[x]] = [null]) {
                      
                    }
                  };`, {
                raw: true,
                next: true
            })).to.eql({
                "body": [{
                    "declarations": [{
                        "id": {
                            "name": "C",
                            "type": "Identifier"
                        },
                        "init": {
                            "body": {
                                "body": [{
                                    "computed": false,
                                    "key": {
                                        "name": "method",
                                        "type": "Identifier"
                                    },
                                    "kind": "method",
                                    "static": false,
                                    "type": "MethodDefinition",
                                    "value": {
                                        "async": true,
                                        "body": {
                                            "body": [],
                                            "type": "BlockStatement"
                                        },
                                        "expression": false,
                                        "generator": true,
                                        "id": null,
                                        "params": [{
                                            "left": {
                                                "elements": [{
                                                    "elements": [{
                                                        "name": "x",
                                                        "type": "Identifier"
                                                    }],
                                                    "type": "ArrayPattern"
                                                }],
                                                "type": "ArrayPattern"
                                            },
                                            "right": {
                                                "elements": [{
                                                    "raw": "null",
                                                    "type": "Literal",
                                                    "value": null
                                                }],
                                                "type": "ArrayExpression"
                                            },
                                            "type": "AssignmentPattern"
                                        }],
                                        "type": "FunctionExpression"
                                    }
                                }],
                                "type": "ClassBody"
                            },
                            "id": null,
                            "superClass": null,
                            "type": "ClassExpression"
                        },
                        "type": "VariableDeclarator"
                    }],
                    "kind": "var",
                    "type": "VariableDeclaration"
                }],
                "sourceType": "script",
                "type": "Program"
            });
        });
        it('should parse destructuring initializer with a "hole"', () => {
            expect(parseScript(`var C = class {
                    async *method([x = 23] = [,]) {
                    }
                  };`, {
                raw: true,
                next: true
            })).to.eql({
                "body": [{
                    "declarations": [{
                        "id": {
                            "name": "C",
                            "type": "Identifier"
                        },
                        "init": {
                            "body": {
                                "body": [{
                                    "computed": false,
                                    "key": {
                                        "name": "method",
                                        "type": "Identifier"
                                    },
                                    "kind": "method",
                                    "static": false,
                                    "type": "MethodDefinition",
                                    "value": {
                                        "async": true,
                                        "body": {
                                            "body": [],
                                            "type": "BlockStatement"
                                        },
                                        "expression": false,
                                        "generator": true,
                                        "id": null,
                                        "params": [{
                                            "left": {
                                                "elements": [{
                                                    "left": {
                                                        "name": "x",
                                                        "type": "Identifier"
                                                    },
                                                    "right": {
                                                        "raw": "23",
                                                        "type": "Literal",
                                                        "value": 23
                                                    },
                                                    "type": "AssignmentPattern"
                                                }],
                                                "type": "ArrayPattern",
                                            },
                                            "right": {
                                                "elements": [
                                                    null,
                                                ],
                                                "type": "ArrayExpression"
                                            },
                                            "type": "AssignmentPattern"
                                        }],
                                        "type": "FunctionExpression"
                                    }
                                }],
                                "type": "ClassBody"
                            },
                            "id": null,
                            "superClass": null,
                            "type": "ClassExpression",
                        },
                        "type": "VariableDeclarator"
                    }, ],
                    "kind": "var",
                    "type": "VariableDeclaration"
                }, ],
                "sourceType": "script",
                "type": "Program"
            });
        });
        it('should parse elision advances iterator ', () => {
            expect(parseScript(`var C = class {
                    async *method([,] = g()) {
                    }
                  };`, {
                raw: true,
                next: true
            })).to.eql({
                "body": [{
                    "declarations": [{
                        "id": {
                            "name": "C",
                            "type": "Identifier"
                        },
                        "init": {
                            "body": {
                                "body": [{
                                    "computed": false,
                                    "key": {
                                        "name": "method",
                                        "type": "Identifier"
                                    },
                                    "kind": "method",
                                    "static": false,
                                    "type": "MethodDefinition",
                                    "value": {
                                        "async": true,
                                        "body": {
                                            "body": [],
                                            "type": "BlockStatement"
                                        },
                                        "expression": false,
                                        "generator": true,
                                        "id": null,
                                        "params": [{
                                            "left": {
                                                "elements": [
                                                    null,
                                                ],
                                                "type": "ArrayPattern"
                                            },
                                            "right": {
                                                "arguments": [],
                                                "callee": {
                                                    "name": "g",
                                                    "type": "Identifier"
                                                },
                                                "type": "CallExpression"
                                            },
                                            "type": "AssignmentPattern"
                                        }, ],
                                        "type": "FunctionExpression"
                                    },
                                }, ],
                                "type": "ClassBody"
                            },
                            "id": null,
                            "superClass": null,
                            "type": "ClassExpression",
                        },
                        "type": "VariableDeclarator"
                    }],
                    "kind": "var",
                    "type": "VariableDeclaration"
                }],
                "sourceType": "script",
                "type": "Program"
            });
        });
        it('should parse object binding pattern with "nested" array binding pattern', () => {
            expect(parseScript(`var C = class {
                    async *method({ w: [x, y, z] = [4, 5, 6] } = { w: [7, undefined, ] }) {
                    }
                  };`, {
                raw: true,
                next: true
            })).to.eql({
                "body": [{
                    "declarations": [{
                        "id": {
                            "name": "C",
                            "type": "Identifier"
                        },
                        "init": {
                            "body": {
                                "body": [{
                                    "computed": false,
                                    "key": {
                                        "name": "method",
                                        "type": "Identifier"
                                    },
                                    "kind": "method",
                                    "static": false,
                                    "type": "MethodDefinition",
                                    "value": {
                                        "async": true,
                                        "body": {
                                            "body": [],
                                            "type": "BlockStatement"
                                        },
                                        "expression": false,
                                        "generator": true,
                                        "id": null,
                                        "params": [{
                                            "left": {
                                                "properties": [{
                                                    "computed": false,
                                                    "key": {
                                                        "name": "w",
                                                        "type": "Identifier"
                                                    },
                                                    "kind": "init",
                                                    "method": false,
                                                    "shorthand": false,
                                                    "type": "Property",
                                                    "value": {
                                                        "left": {
                                                            "elements": [{
                                                                    "name": "x",
                                                                    "type": "Identifier"
                                                                },
                                                                {
                                                                    "name": "y",
                                                                    "type": "Identifier"
                                                                },
                                                                {
                                                                    "name": "z",
                                                                    "type": "Identifier"
                                                                }
                                                            ],
                                                            "type": "ArrayPattern",
                                                        },
                                                        "right": {
                                                            "elements": [{
                                                                    "raw": "4",
                                                                    "type": "Literal",
                                                                    "value": 4,
                                                                },
                                                                {
                                                                    "raw": "5",
                                                                    "type": "Literal",
                                                                    "value": 5,
                                                                },
                                                                {
                                                                    "raw": "6",
                                                                    "type": "Literal",
                                                                    "value": 6
                                                                }
                                                            ],
                                                            "type": "ArrayExpression"
                                                        },
                                                        "type": "AssignmentPattern"
                                                    }
                                                }],
                                                "type": "ObjectPattern",
                                            },
                                            "right": {
                                                "properties": [{
                                                    "computed": false,
                                                    "key": {
                                                        "name": "w",
                                                        "type": "Identifier"
                                                    },
                                                    "kind": "init",
                                                    "method": false,
                                                    "shorthand": false,
                                                    "type": "Property",
                                                    "value": {
                                                        "elements": [{
                                                                "raw": "7",
                                                                "type": "Literal",
                                                                "value": 7,
                                                            },
                                                            {
                                                                "name": "undefined",
                                                                "type": "Identifier",
                                                            },
                                                        ],
                                                        "type": "ArrayExpression"
                                                    }
                                                }],
                                                "type": "ObjectExpression"
                                            },
                                            "type": "AssignmentPattern"
                                        }],
                                        "type": "FunctionExpression"
                                    },
                                }, ],
                                "type": "ClassBody",
                            },
                            "id": null,
                            "superClass": null,
                            "type": "ClassExpression",
                        },
                        "type": "VariableDeclarator"
                    }, ],
                    "kind": "var",
                    "type": "VariableDeclaration"
                }],
                "sourceType": "script",
                "type": "Program"
            });
        });
        it('should parse object binding pattern with "nested" array binding pattern using initializer', () => {
            expect(parseScript(`var C = class {
                    async *method({ w: [x, y, z] = [4, 5, 6] }) {
                    }
                  };`, {
                raw: true,
                next: true
            })).to.eql({
                "body": [{
                    "declarations": [{
                        "id": {
                            "name": "C",
                            "type": "Identifier"
                        },
                        "init": {
                            "body": {
                                "body": [{
                                    "computed": false,
                                    "key": {
                                        "name": "method",
                                        "type": "Identifier"
                                    },
                                    "kind": "method",
                                    "static": false,
                                    "type": "MethodDefinition",
                                    "value": {
                                        "async": true,
                                        "body": {
                                            "body": [],
                                            "type": "BlockStatement"
                                        },
                                        "expression": false,
                                        "generator": true,
                                        "id": null,
                                        "params": [{
                                            "properties": [{
                                                "computed": false,
                                                "key": {
                                                    "name": "w",
                                                    "type": "Identifier"
                                                },
                                                "kind": "init",
                                                "method": false,
                                                "shorthand": false,
                                                "type": "Property",
                                                "value": {
                                                    "left": {
                                                        "elements": [{
                                                                "name": "x",
                                                                "type": "Identifier"
                                                            },
                                                            {
                                                                "name": "y",
                                                                "type": "Identifier"
                                                            },
                                                            {
                                                                "name": "z",
                                                                "type": "Identifier"
                                                            },
                                                        ],
                                                        "type": "ArrayPattern"
                                                    },
                                                    "right": {
                                                        "elements": [{
                                                                "raw": "4",
                                                                "type": "Literal",
                                                                "value": 4,
                                                            },
                                                            {
                                                                "raw": "5",
                                                                "type": "Literal",
                                                                "value": 5,
                                                            },
                                                            {
                                                                "raw": "6",
                                                                "type": "Literal",
                                                                "value": 6,
                                                            },
                                                        ],
                                                        "type": "ArrayExpression"
                                                    },
                                                    "type": "AssignmentPattern"
                                                }
                                            }],
                                            "type": "ObjectPattern"
                                        }],
                                        "type": "FunctionExpression"
                                    }
                                }],
                                "type": "ClassBody",
                            },
                            "id": null,
                            "superClass": null,
                            "type": "ClassExpression",
                        },
                        "type": "VariableDeclarator"
                    }],
                    "kind": "var",
                    "type": "VariableDeclaration"
                }, ],
                "sourceType": "script",
                "type": "Program",
            });
        });
        it('should parse destructuring initializer with an undefined value ', () => {
            expect(parseScript(`var C = class {
                    static method([x = 23]) {
                    }
                  };`, {
                raw: true,
                next: true
            })).to.eql({
                "body": [{
                    "declarations": [{
                        "id": {
                            "name": "C",
                            "type": "Identifier"
                        },
                        "init": {
                            "body": {
                                "body": [{
                                    "computed": false,
                                    "key": {
                                        "name": "method",
                                        "type": "Identifier"
                                    },
                                    "kind": "method",
                                    "static": true,
                                    "type": "MethodDefinition",
                                    "value": {
                                        "async": false,
                                        "body": {
                                            "body": [],
                                            "type": "BlockStatement"
                                        },
                                        "expression": false,
                                        "generator": false,
                                        "id": null,
                                        "params": [{
                                            "elements": [{
                                                "left": {
                                                    "name": "x",
                                                    "type": "Identifier"
                                                },
                                                "right": {
                                                    "raw": "23",
                                                    "type": "Literal",
                                                    "value": 23,
                                                },
                                                "type": "AssignmentPattern"
                                            }],
                                            "type": "ArrayPattern"
                                        }],
                                        "type": "FunctionExpression"
                                    }
                                }],
                                "type": "ClassBody",
                            },
                            "id": null,
                            "superClass": null,
                            "type": "ClassExpression",
                        },
                        "type": "VariableDeclarator"
                    }],
                    "kind": "var",
                    "type": "VariableDeclaration",
                }, ],
                "sourceType": "script",
                "type": "Program",
            });
        });
    });