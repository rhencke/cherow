import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Espressions - Template', () => {

    it('should fail on unterminated template', () => {
        expect(() => {
            parseScript('`');
        }).to.throw();
    });

    it('should parse function invocation in expression position of TemplateLiteral', () => {
        expect(parseScript('`foo ${`bar ${5} baz`} qux`', {
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
                                "raw": "foo ",
                                "cooked": "foo "
                            },
                            "tail": false
                        },
                        {
                            "type": "TemplateElement",
                            "value": {
                                "raw": " qux",
                                "cooked": " qux"
                            },
                            "tail": true
                        }
                    ],
                    "expressions": [{
                        "type": "TemplateLiteral",
                        "quasis": [{
                                "type": "TemplateElement",
                                "value": {
                                    "raw": "bar ",
                                    "cooked": "bar "
                                },
                                "tail": false
                            },
                            {
                                "type": "TemplateElement",
                                "value": {
                                    "raw": " baz",
                                    "cooked": " baz"
                                },
                                "tail": true
                            }
                        ],
                        "expressions": [{
                            "type": "Literal",
                            "value": 5,
                            "raw": "5"
                        }]
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse method invocation in expression position of TemplateLiteral', () => {
        expect(parseScript('var object = { fn: function() { return `result`; } };', {
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
                        "name": "object"
                    },
                    "init": {
                        "type": "ObjectExpression",
                        "properties": [{
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "fn"
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
                                            "type": "TemplateLiteral",
                                            "quasis": [{
                                                "type": "TemplateElement",
                                                "value": {
                                                    "raw": "result",
                                                    "cooked": "result"
                                                },
                                                "tail": true
                                            }],
                                            "expressions": []
                                        }
                                    }]
                                },
                                "generator": false,
                                "expression": false,
                                "async": false
                            },
                            "kind": "init",
                            "method": false,
                            "shorthand": false
                        }]
                    }
                }],
                "kind": "var"
            }],
            "sourceType": "script"
        });
    });

    it('should parse function invocation in expression position of TemplateLiteral', () => {
        expect(parseScript('function fn() { return `result`; }', {
            ranges: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "FunctionDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "fn"
                },
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "body": [{
                        "type": "ReturnStatement",
                        "argument": {
                            "type": "TemplateLiteral",
                            "quasis": [{
                                "type": "TemplateElement",
                                "value": {
                                    "raw": "result",
                                    "cooked": "result"
                                },
                                "tail": true
                            }],
                            "expressions": []
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


    it('should parse dollar sign', () => {
        expect(parseScript('`$`', {
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
                            "raw": "$",
                            "cooked": "$"
                        },
                        "tail": true
                    }],
                    "expressions": []
                }
            }],
            "sourceType": "script"
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
                            "name": "raw"
                        },
                        "quasi": {
                            "type": "TemplateLiteral",
                            "quasis": [{
                                "type": "TemplateElement",
                                "value": {
                                    "raw": "42",
                                    "cooked": "42"
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

    it('should parse tagged interpolation', () => {
        expect(parseScript('raw`hello ${name}`', {
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
                        "name": "raw"
                    },
                    "quasi": {
                        "type": "TemplateLiteral",
                        "quasis": [{
                            "type": "TemplateElement",
                            "value": {
                                "raw": "42",
                                "cooked": "42"
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
                ranges: false,
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
                                            "raw": "안녕",
                                            "cooked": "안녕"
                                        },
                                        "tail": true
                                    }
                                ],
                                "expressions": []
                            }
                        }
                    }
                ],
                "sourceType": "script"
            });
        });
        it('should parse template expression - head and tail', () => {
            expect(parseScript('tag`head${a}tail`;', {
                ranges: false,
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
                            "raw": "a",
                            "cooked": "a"
                        },
                        "tail": true
                    }],
                    "expressions": []
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse template literal + dollar', () => {
        expect(parseScript('`${a}$`', {
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
            ranges: false,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "TaggedTemplateExpression",
                    "tag": {
                        "type": "NewExpression",
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

    it('should parse if statement plus double braces', () => {
        expect(parseScript('if(a) { (`${b}`) }', {
            ranges: false,
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