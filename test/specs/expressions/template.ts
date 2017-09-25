import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Espressions - Template', () => {

    it('should fail on invalid template end', () => {
        expect(() => {
            parseScript('a++``');
        }).to.throw();
    });

    it('should fail on unterminated template', () => {
        expect(() => {
            parseScript('`');
        }).to.throw();
    });

    it('should parse function invocation in expression position of TemplateLiteral', () => {
        expect(parseScript('`foo ${`bar ${5} baz`} qux`', {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "TemplateLiteral",
                        "expressions": [
                            {
                                "type": "TemplateLiteral",
                                "expressions": [
                                    {
                                        "type": "Literal",
                                        "value": 5,
                                        "start": 14,
                                        "end": 15,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 14
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 15
                                            }
                                        },
                                        "raw": "5"
                                    }
                                ],
                                "quasis": [
                                    {
                                        "type": "TemplateElement",
                                        "value": {
                                            "cooked": "bar ",
                                            "raw": "bar "
                                        },
                                        "tail": false,
                                        "start": 15,
                                        "end": 15,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 15
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 15
                                            }
                                        }
                                    },
                                    {
                                        "type": "TemplateElement",
                                        "value": {
                                            "cooked": " baz",
                                            "raw": " baz"
                                        },
                                        "tail": true,
                                        "start": 7,
                                        "end": 21,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 7
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 21
                                            }
                                        }
                                    }
                                ],
                                "start": 7,
                                "end": 21,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 7
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 21
                                    }
                                }
                            }
                        ],
                        "quasis": [
                            {
                                "type": "TemplateElement",
                                "value": {
                                    "cooked": "foo ",
                                    "raw": "foo "
                                },
                                "tail": false,
                                "start": 21,
                                "end": 21,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 21
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 21
                                    }
                                }
                            },
                            {
                                "type": "TemplateElement",
                                "value": {
                                    "cooked": " qux",
                                    "raw": " qux"
                                },
                                "tail": true,
                                "start": 0,
                                "end": 27,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 0
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 27
                                    }
                                }
                            }
                        ],
                        "start": 0,
                        "end": 27,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 27
                            }
                        }
                    },
                    "start": 0,
                    "end": 27,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 27
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 27,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 27
                }
            }
        });
    });

    it('should parse method invocation in expression position of TemplateLiteral', () => {
        expect(parseScript('var object = { fn: function() { return `result`; } };', {
            locations: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "VariableDeclaration",
                    "declarations": [
                        {
                            "type": "VariableDeclarator",
                            "id": {
                                "type": "Identifier",
                                "name": "object",
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 4
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 10
                                    }
                                }
                            },
                            "init": {
                                "type": "ObjectExpression",
                                "properties": [
                                    {
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "fn",
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 15
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 17
                                                }
                                            }
                                        },
                                        "computed": false,
                                        "value": {
                                            "type": "FunctionExpression",
                                            "id": null,
                                            "params": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [
                                                    {
                                                        "type": "ReturnStatement",
                                                        "argument": {
                                                            "type": "TemplateLiteral",
                                                            "quasis": [
                                                                {
                                                                    "type": "TemplateElement",
                                                                    "value": {
                                                                        "raw": "result",
                                                                        "cooked": "result"
                                                                    },
                                                                    "tail": true,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 1,
                                                                            "column": 39
                                                                        },
                                                                        "end": {
                                                                            "line": 1,
                                                                            "column": 47
                                                                        }
                                                                    }
                                                                }
                                                            ],
                                                            "expressions": [],
                                                            "loc": {
                                                                "start": {
                                                                    "line": 1,
                                                                    "column": 39
                                                                },
                                                                "end": {
                                                                    "line": 1,
                                                                    "column": 47
                                                                }
                                                            }
                                                        },
                                                        "loc": {
                                                            "start": {
                                                                "line": 1,
                                                                "column": 32
                                                            },
                                                            "end": {
                                                                "line": 1,
                                                                "column": 48
                                                            }
                                                        }
                                                    }
                                                ],
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 30
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 50
                                                    }
                                                }
                                            },
                                            "generator": false,
                                            "expression": false,
                                            "async": false,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 19
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 50
                                                }
                                            }
                                        },
                                        "kind": "init",
                                        "method": false,
                                        "shorthand": false,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 15
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 50
                                            }
                                        }
                                    }
                                ],
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 13
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 52
                                    }
                                }
                            },
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 4
                                },
                                "end": {
                                    "line": 1,
                                    "column": 52
                                }
                            }
                        }
                    ],
                    "kind": "var",
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 53
                        }
                    }
                }
            ],
            "sourceType": "script",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 53
                }
            }
        });
    });

    it('should parse function invocation in expression position of TemplateLiteral', () => {
        expect(parseScript('function fn() { return `result`; }', {
            locations: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "fn",
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 9
                            },
                            "end": {
                                "line": 1,
                                "column": 11
                            }
                        }
                    },
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ReturnStatement",
                                "argument": {
                                    "type": "TemplateLiteral",
                                    "quasis": [
                                        {
                                            "type": "TemplateElement",
                                            "value": {
                                                "raw": "result",
                                                "cooked": "result"
                                            },
                                            "tail": true,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 23
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 31
                                                }
                                            }
                                        }
                                    ],
                                    "expressions": [],
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 23
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 31
                                        }
                                    }
                                },
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 16
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 32
                                    }
                                }
                            }
                        ],
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 14
                            },
                            "end": {
                                "line": 1,
                                "column": 34
                            }
                        }
                    },
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 34
                        }
                    }
                }
            ],
            "sourceType": "script",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 34
                }
            }
        });
    });


    it('should parse dollar sign', () => {
        expect(parseScript('`$`', {
            ranges: true,
            locations: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "TemplateLiteral",
                        "expressions": [],
                        "quasis": [
                            {
                                "type": "TemplateElement",
                                "value": {
                                    "cooked": "$",
                                    "raw": "$"
                                },
                                "tail": true,
                                "start": 0,
                                "end": 3,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 0
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 3
                                    }
                                }
                            }
                        ],
                        "start": 0,
                        "end": 3,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 3
                            }
                        }
                    },
                    "start": 0,
                    "end": 3,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 3
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 3,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 3
                }
            }
        });
    });

    it('should parse line terminator', () => {
        expect(parseScript('var source = `\n\r\n`;', {
            ranges: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "VariableDeclaration",
                "declarations": [{
                    "type": "VariableDeclarator",
                    "id": {
                        "type": "Identifier",
                        "name": "source"
                    },
                    "init": {
                        "type": "TemplateLiteral",
                        "quasis": [{
                            "type": "TemplateElement",
                            "value": {
                                "raw": "\n\r\n",
                                "cooked": "\n\r\n"
                            },
                            "tail": true
                        }],
                        "expressions": []
                    }
                }],
                "kind": "var"
            }],
            "sourceType": "script"
        });
    });

    it('should parse new expression', () => {
        expect(parseScript('new raw`42`', {
            locations: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "NewExpression",
                        "callee": {
                            "type": "TaggedTemplateExpression",
                            "tag": {
                                "type": "Identifier",
                                "name": "raw"
                            },
                            "quasi": {
                                "type": "TemplateLiteral",
                                "quasis": [
                                    {
                                        "type": "TemplateElement",
                                        "value": {
                                            "raw": "42",
                                            "cooked": "42"
                                        },
                                        "tail": true
                                    }
                                ],
                                "expressions": []
                            }
                        },
                        "arguments": []
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse tagged interpolation', () => {
        expect(parseScript('raw`hello ${name}`', {
            locations: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "TaggedTemplateExpression",
                    "tag": {
                        "type": "Identifier",
                        "name": "raw"
                    },
                    "quasi": {
                        "type": "TemplateLiteral",
                        "quasis": [{
                                "type": "TemplateElement",
                                "value": {
                                    "raw": "hello ",
                                    "cooked": "hello "
                                },
                                "tail": false
                            },
                            {
                                "type": "TemplateElement",
                                "value": {
                                    "raw": "",
                                    "cooked": ""
                                },
                                "tail": true
                            }
                        ],
                        "expressions": [{
                            "type": "Identifier",
                            "name": "name"
                        }]
                    }
                }
            }],
            "sourceType": "script"
        });
    });
    
    it('should parse tagged', () => {
        expect(parseScript('raw`42`', {
            locations: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "TaggedTemplateExpression",
                        "tag": {
                            "type": "Identifier",
                            "name": "raw",
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 3
                                }
                            }
                        },
                        "quasi": {
                            "type": "TemplateLiteral",
                            "quasis": [
                                {
                                    "type": "TemplateElement",
                                    "value": {
                                        "raw": "42",
                                        "cooked": "42"
                                    },
                                    "tail": true,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 3
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 7
                                        }
                                    }
                                }
                            ],
                            "expressions": [],
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 3
                                },
                                "end": {
                                    "line": 1,
                                    "column": 7
                                }
                            }
                        },
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 7
                            }
                        }
                    },
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 7
                        }
                    }
                }
            ],
            "sourceType": "script",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 7
                }
            }
        });
    });
    
        it('should parse line terminator', () => {
            expect(parseScript('`\\n\\r\\b\\v\\t\\f\\\n\\\r\n`', {
                ranges: false,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "TemplateLiteral",
                            "quasis": [
                                {
                                    "type": "TemplateElement",
                                    "value": {
                                        "raw": "\\n\\r\\b\\v\\t\\f\\\n\\\r\n",
                                        "cooked": "\\n\\r\\b\\v\\t\\f\\\n\\\r\n"
                                    },
                                    "tail": true
                                }
                            ],
                            "expressions": []
                        }
                    }
                ],
                "sourceType": "script"
            });
        });
        
        it('should parse advanced', () => {
            expect(parseScript('doSmth(`${x} + ${y} = ${x + y}`)', {
                ranges: false,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "CallExpression",
                            "callee": {
                                "type": "Identifier",
                                "name": "doSmth"
                            },
                            "arguments": [
                                {
                                    "type": "TemplateLiteral",
                                    "quasis": [
                                        {
                                            "type": "TemplateElement",
                                            "value": {
                                                "raw": "",
                                                "cooked": ""
                                            },
                                            "tail": false
                                        },
                                        {
                                            "type": "TemplateElement",
                                            "value": {
                                                "raw": " + ",
                                                "cooked": " + "
                                            },
                                            "tail": false
                                        },
                                        {
                                            "type": "TemplateElement",
                                            "value": {
                                                "raw": " = ",
                                                "cooked": " = "
                                            },
                                            "tail": false
                                        },
                                        {
                                            "type": "TemplateElement",
                                            "value": {
                                                "raw": "",
                                                "cooked": ""
                                            },
                                            "tail": true
                                        }
                                    ],
                                    "expressions": [
                                        {
                                            "type": "Identifier",
                                            "name": "x"
                                        },
                                        {
                                            "type": "Identifier",
                                            "name": "y"
                                        },
                                        {
                                            "type": "BinaryExpression",
                                            "operator": "+",
                                            "left": {
                                                "type": "Identifier",
                                                "name": "x"
                                            },
                                            "right": {
                                                "type": "Identifier",
                                                "name": "y"
                                            }
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
       
        it('should parse Acorn issue 173', () => {
            expect(parseScript('`{${x}}`, `}`', {
                ranges: false,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "SequenceExpression",
                            "expressions": [
                                {
                                    "type": "TemplateLiteral",
                                    "quasis": [
                                        {
                                            "type": "TemplateElement",
                                            "value": {
                                                "raw": "{",
                                                "cooked": "{"
                                            },
                                            "tail": false
                                        },
                                        {
                                            "type": "TemplateElement",
                                            "value": {
                                                "raw": "}",
                                                "cooked": "}"
                                            },
                                            "tail": true
                                        }
                                    ],
                                    "expressions": [
                                        {
                                            "type": "Identifier",
                                            "name": "x"
                                        }
                                    ]
                                },
                                {
                                    "type": "TemplateLiteral",
                                    "quasis": [
                                        {
                                            "type": "TemplateElement",
                                            "value": {
                                                "raw": "}",
                                                "cooked": "}"
                                            },
                                            "tail": true
                                        }
                                    ],
                                    "expressions": []
                                }
                            ]
                        }
                    }
                ],
                "sourceType": "script"
            });
        });

        it('should parse regular expression', () => {
            expect(parseScript('`${/\\d/.exec("1")[0]}`', {
                locations: false,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "TemplateLiteral",
                            "quasis": [
                                {
                                    "type": "TemplateElement",
                                    "value": {
                                        "raw": "",
                                        "cooked": ""
                                    },
                                    "tail": false
                                },
                                {
                                    "type": "TemplateElement",
                                    "value": {
                                        "raw": "",
                                        "cooked": ""
                                    },
                                    "tail": true
                                }
                            ],
                            "expressions": [
                                {
                                    "type": "MemberExpression",
                                    "computed": true,
                                    "object": {
                                        "type": "CallExpression",
                                        "callee": {
                                            "type": "MemberExpression",
                                            "computed": false,
                                            "object": {
                                                "type": "Literal",
                                                "value": /\d/,
                                                "raw": "/\\d/",
                                                "regex": {
                                                    "pattern": "\\d",
                                                    "flags": ""
                                                }
                                            },
                                            "property": {
                                                "type": "Identifier",
                                                "name": "exec"
                                            }
                                        },
                                        "arguments": [
                                            {
                                                "type": "Literal",
                                                "value": "1",
                                                "raw": "\"1\""
                                            }
                                        ]
                                    },
                                    "property": {
                                        "type": "Literal",
                                        "value": 0,
                                        "raw": "0"
                                    }
                                }
                            ]
                        }
                    }
                ],
                "sourceType": "script"
            });
        });
        
        it('should parse multiple primitives', () => {
            expect(parseScript('`${0} ${1} ${5} bar`', {
                locations: false,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "TemplateLiteral",
                            "quasis": [
                                {
                                    "type": "TemplateElement",
                                    "value": {
                                        "raw": "",
                                        "cooked": ""
                                    },
                                    "tail": false
                                },
                                {
                                    "type": "TemplateElement",
                                    "value": {
                                        "raw": " ",
                                        "cooked": " "
                                    },
                                    "tail": false
                                },
                                {
                                    "type": "TemplateElement",
                                    "value": {
                                        "raw": " ",
                                        "cooked": " "
                                    },
                                    "tail": false
                                },
                                {
                                    "type": "TemplateElement",
                                    "value": {
                                        "raw": " bar",
                                        "cooked": " bar"
                                    },
                                    "tail": true
                                }
                            ],
                            "expressions": [
                                {
                                    "type": "Literal",
                                    "value": 0,
                                    "raw": "0"
                                },
                                {
                                    "type": "Literal",
                                    "value": 1,
                                    "raw": "1"
                                },
                                {
                                    "type": "Literal",
                                    "value": 5,
                                    "raw": "5"
                                }
                            ]
                        }
                    }
                ],
                "sourceType": "script"
            });
        });
      
        it('should parse member expression in expression position of template middleList', () => {
            expect(parseScript('`${0} ${1} ${object.number} bar`', {
                ranges: false,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "TemplateLiteral",
                            "quasis": [
                                {
                                    "type": "TemplateElement",
                                    "value": {
                                        "raw": "",
                                        "cooked": ""
                                    },
                                    "tail": false
                                },
                                {
                                    "type": "TemplateElement",
                                    "value": {
                                        "raw": " ",
                                        "cooked": " "
                                    },
                                    "tail": false
                                },
                                {
                                    "type": "TemplateElement",
                                    "value": {
                                        "raw": " ",
                                        "cooked": " "
                                    },
                                    "tail": false
                                },
                                {
                                    "type": "TemplateElement",
                                    "value": {
                                        "raw": " bar",
                                        "cooked": " bar"
                                    },
                                    "tail": true
                                }
                            ],
                            "expressions": [
                                {
                                    "type": "Literal",
                                    "value": 0,
                                    "raw": "0"
                                },
                                {
                                    "type": "Literal",
                                    "value": 1,
                                    "raw": "1"
                                },
                                {
                                    "type": "MemberExpression",
                                    "computed": false,
                                    "object": {
                                        "type": "Identifier",
                                        "name": "object"
                                    },
                                    "property": {
                                        "type": "Identifier",
                                        "name": "number"
                                    }
                                }
                            ]
                        }
                    }
                ],
                "sourceType": "script"
            });
        });
        it('should parse primitive  value in expression position of template literal', () => {
            expect(parseScript('`foo ${5} bar`', {
                locations: false,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "TemplateLiteral",
                            "quasis": [
                                {
                                    "type": "TemplateElement",
                                    "value": {
                                        "raw": "foo ",
                                        "cooked": "foo "
                                    },
                                    "tail": false
                                },
                                {
                                    "type": "TemplateElement",
                                    "value": {
                                        "raw": " bar",
                                        "cooked": " bar"
                                    },
                                    "tail": true
                                }
                            ],
                            "expressions": [
                                {
                                    "type": "Literal",
                                    "value": 5,
                                    "raw": "5"
                                }
                            ]
                        }
                    }
                ],
                "sourceType": "script"
            });
        });
        it('should parse with non-ascii signs', () => {
            expect(parseScript('tag`안녕`;', {
                locations: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "TaggedTemplateExpression",
                            "tag": {
                                "type": "Identifier",
                                "name": "tag",
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 0
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 3
                                    }
                                }
                            },
                            "quasi": {
                                "type": "TemplateLiteral",
                                "quasis": [
                                    {
                                        "type": "TemplateElement",
                                        "value": {
                                            "raw": "안녕",
                                            "cooked": "안녕"
                                        },
                                        "tail": true,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 3
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 7
                                            }
                                        }
                                    }
                                ],
                                "expressions": [],
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 3
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 7
                                    }
                                }
                            },
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 7
                                }
                            }
                        },
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 8
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 8
                    }
                }
            });
        });
        it('should parse template expression - head and tail', () => {
            expect(parseScript('tag`head${a}tail`;', {
                locations: false,
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "TaggedTemplateExpression",
                            "tag": {
                                "type": "Identifier",
                                "name": "tag"
                            },
                            "quasi": {
                                "type": "TemplateLiteral",
                                "quasis": [
                                    {
                                        "type": "TemplateElement",
                                        "value": {
                                            "raw": "head",
                                            "cooked": "head"
                                        },
                                        "tail": false
                                    },
                                    {
                                        "type": "TemplateElement",
                                        "value": {
                                            "raw": "tail",
                                            "cooked": "tail"
                                        },
                                        "tail": true
                                    }
                                ],
                                "expressions": [
                                    {
                                        "type": "Identifier",
                                        "name": "a"
                                    }
                                ]
                            }
                        }
                    }
                ],
                "sourceType": "script"
            });
        });
 
    it('should parse simple template element plus identifier', () => {
        expect(parseScript('`${a}`', {
            locations: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "TemplateLiteral",
                    "quasis": [{
                            "type": "TemplateElement",
                            "value": {
                                "raw": "",
                                "cooked": ""
                            },
                            "tail": false
                        },
                        {
                            "type": "TemplateElement",
                            "value": {
                                "raw": "",
                                "cooked": ""
                            },
                            "tail": true
                        }
                    ],
                    "expressions": [{
                        "type": "Identifier",
                        "name": "a"
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse multiple dollar sign', () => {
        expect(parseScript('`$$$${a}`', {
            ranges: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "TemplateLiteral",
                    "quasis": [{
                            "type": "TemplateElement",
                            "value": {
                                "raw": "$$$",
                                "cooked": "$$$"
                            },
                            "tail": false
                        },
                        {
                            "type": "TemplateElement",
                            "value": {
                                "raw": "",
                                "cooked": ""
                            },
                            "tail": true
                        }
                    ],
                    "expressions": [{
                        "type": "Identifier",
                        "name": "a"
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse simple identifier', () => {
        expect(parseScript('`a`', {
            locations: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "TemplateLiteral",
                        "quasis": [
                            {
                                "type": "TemplateElement",
                                "value": {
                                    "raw": "a",
                                    "cooked": "a"
                                },
                                "tail": true,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 0
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 3
                                    }
                                }
                            }
                        ],
                        "expressions": [],
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 3
                            }
                        }
                    },
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 3
                        }
                    }
                }
            ],
            "sourceType": "script",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 3
                }
            }
        });
    });

    it('should parse template literal + dollar', () => {
        expect(parseScript('`${a}$`', {
            locations: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "TemplateLiteral",
                    "quasis": [{
                            "type": "TemplateElement",
                            "value": {
                                "raw": "",
                                "cooked": ""
                            },
                            "tail": false
                        },
                        {
                            "type": "TemplateElement",
                            "value": {
                                "raw": "$",
                                "cooked": "$"
                            },
                            "tail": true
                        }
                    ],
                    "expressions": [{
                        "type": "Identifier",
                        "name": "a"
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse nested template', () => {
        expect(parseScript('`${a}${b}`', {
            ranges: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "TemplateLiteral",
                    "quasis": [{
                            "type": "TemplateElement",
                            "value": {
                                "raw": "",
                                "cooked": ""
                            },
                            "tail": false
                        },
                        {
                            "type": "TemplateElement",
                            "value": {
                                "raw": "",
                                "cooked": ""
                            },
                            "tail": false
                        },
                        {
                            "type": "TemplateElement",
                            "value": {
                                "raw": "",
                                "cooked": ""
                            },
                            "tail": true
                        }
                    ],
                    "expressions": [{
                            "type": "Identifier",
                            "name": "a"
                        },
                        {
                            "type": "Identifier",
                            "name": "b"
                        }
                    ]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse mixed templates', () => {
        expect(parseScript('``````', {
            ranges: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "TaggedTemplateExpression",
                    "tag": {
                        "type": "TaggedTemplateExpression",
                        "tag": {
                            "type": "TemplateLiteral",
                            "quasis": [{
                                "type": "TemplateElement",
                                "value": {
                                    "raw": "",
                                    "cooked": ""
                                },
                                "tail": true
                            }],
                            "expressions": []
                        },
                        "quasi": {
                            "type": "TemplateLiteral",
                            "quasis": [{
                                "type": "TemplateElement",
                                "value": {
                                    "raw": "",
                                    "cooked": ""
                                },
                                "tail": true
                            }],
                            "expressions": []
                        }
                    },
                    "quasi": {
                        "type": "TemplateLiteral",
                        "quasis": [{
                            "type": "TemplateElement",
                            "value": {
                                "raw": "",
                                "cooked": ""
                            },
                            "tail": true
                        }],
                        "expressions": []
                    }
                }
            }],
            "sourceType": "script"
        });
    });


    it('should parse tagged template expression', () => {
        expect(parseScript('a``', {
            ranges: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "TaggedTemplateExpression",
                    "tag": {
                        "type": "Identifier",
                        "name": "a"
                    },
                    "quasi": {
                        "type": "TemplateLiteral",
                        "quasis": [{
                            "type": "TemplateElement",
                            "value": {
                                "raw": "",
                                "cooked": ""
                            },
                            "tail": true
                        }],
                        "expressions": []
                    }
                }
            }],
            "sourceType": "script"
        });
    });


    it('should parse parenthesis', () => {
        expect(parseScript('a()``', {
            ranges: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "TaggedTemplateExpression",
                    "tag": {
                        "type": "CallExpression",
                        "callee": {
                            "type": "Identifier",
                            "name": "a"
                        },
                        "arguments": []
                    },
                    "quasi": {
                        "type": "TemplateLiteral",
                        "quasis": [{
                            "type": "TemplateElement",
                            "value": {
                                "raw": "",
                                "cooked": ""
                            },
                            "tail": true
                        }],
                        "expressions": []
                    }
                }
            }],
            "sourceType": "script"
        });
    });


    it('should parse new expression', () => {
        expect(parseScript('new a``', {
            ranges: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "NewExpression",
                    "callee": {
                        "type": "TaggedTemplateExpression",
                        "tag": {
                            "type": "Identifier",
                            "name": "a"
                        },
                        "quasi": {
                            "type": "TemplateLiteral",
                            "quasis": [{
                                "type": "TemplateElement",
                                "value": {
                                    "raw": "",
                                    "cooked": ""
                                },
                                "tail": true
                            }],
                            "expressions": []
                        }
                    },
                    "arguments": []
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse new expression plus parenthesis', () => {
        expect(parseScript('new a()``', {
            locations: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "TaggedTemplateExpression",
                        "tag": {
                            "type": "NewExpression",
                            "callee": {
                                "type": "Identifier",
                                "name": "a",
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
                            "arguments": [],
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 7
                                }
                            }
                        },
                        "quasi": {
                            "type": "TemplateLiteral",
                            "quasis": [
                                {
                                    "type": "TemplateElement",
                                    "value": {
                                        "raw": "",
                                        "cooked": ""
                                    },
                                    "tail": true,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 7
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 9
                                        }
                                    }
                                }
                            ],
                            "expressions": [],
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 7
                                },
                                "end": {
                                    "line": 1,
                                    "column": 9
                                }
                            }
                        },
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 9
                            }
                        }
                    },
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 9
                        }
                    }
                }
            ],
            "sourceType": "script",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 9
                }
            }
        });
    });

    it('should parse if statement plus double braces', () => {
        expect(parseScript('if(a) { (`${b}`) }', {
            locations: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "IfStatement",
                    "test": {
                        "type": "Identifier",
                        "name": "a"
                    },
                    "consequent": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "TemplateLiteral",
                                    "quasis": [
                                        {
                                            "type": "TemplateElement",
                                            "value": {
                                                "raw": "",
                                                "cooked": ""
                                            },
                                            "tail": false
                                        },
                                        {
                                            "type": "TemplateElement",
                                            "value": {
                                                "raw": "",
                                                "cooked": ""
                                            },
                                            "tail": true
                                        }
                                    ],
                                    "expressions": [
                                        {
                                            "type": "Identifier",
                                            "name": "b"
                                        }
                                    ]
                                }
                            }
                        ]
                    },
                    "alternate": null
                }
            ],
            "sourceType": "script"
        });
    });
 
});