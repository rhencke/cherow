import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Espressions - binary logical', () => {

    it('should parse multiline string', () => {
        expect(parseScript(`\
         bar`, {
             ranges: true
         })).to.eql({
              "body": [
                {
                  "end": 12,
                  "expression": {
                    "end": 12,
                    "name": "bar",
                    "start": 9,
                    "type": "Identifier"
                  },
                  "start": 9,
                  "type": "ExpressionStatement"
                }
             ],
              "end": 12,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });


    it('should parse "x || y"', () => {
        expect(parseScript('x || y')).to.eql({
    "type": "Program",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "LogicalExpression",
                "operator": "||",
                "left": {
                    "type": "Identifier",
                    "name": "x"
                },
                "right": {
                    "type": "Identifier",
                    "name": "y"
                }
            }
        }
    ],
    "sourceType": "script"
});
    });

        it('should parse "x && y"', () => {
        expect(parseScript('x && y')).to.eql({
    "type": "Program",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "LogicalExpression",
                "operator": "&&",
                "left": {
                    "type": "Identifier",
                    "name": "x"
                },
                "right": {
                    "type": "Identifier",
                    "name": "y"
                }
            }
        }
    ],
    "sourceType": "script"
});
    });

    it('should parse "x || y || z"', () => {
        expect(parseScript('x || y || z')).to.eql({
    "type": "Program",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "LogicalExpression",
                "operator": "||",
                "left": {
                    "type": "LogicalExpression",
                    "operator": "||",
                    "left": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "y"
                    }
                },
                "right": {
                    "type": "Identifier",
                    "name": "z"
                }
            }
        }
    ],
    "sourceType": "script"
});
    });

     it('should parse "x && y && z"', () => {
        expect(parseScript('x && y && z')).to.eql({
    "type": "Program",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "LogicalExpression",
                "operator": "&&",
                "left": {
                    "type": "LogicalExpression",
                    "operator": "&&",
                    "left": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "y"
                    }
                },
                "right": {
                    "type": "Identifier",
                    "name": "z"
                }
            }
        }
    ],
    "sourceType": "script"
});
    });

      it('should parse "x || y ^ z"', () => {
        expect(parseScript('x || y ^ z')).to.eql({
    "type": "Program",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "LogicalExpression",
                "operator": "||",
                "left": {
                    "type": "Identifier",
                    "name": "x"
                },
                "right": {
                    "type": "BinaryExpression",
                    "operator": "^",
                    "left": {
                        "type": "Identifier",
                        "name": "y"
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "z"
                    }
                }
            }
        }
    ],
    "sourceType": "script"
});
    });


});
