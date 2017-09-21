import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('CPN - basic', () => {

    it('should parse numbers', () => {
        expect(parseScript(`var a = {
            a: 'A',
            [1]: 'B',
            c: 'C',
            [ID(2)]: 'D',
          }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 109,
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 109,
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 109,
                    "id": {
                      "type": "Identifier",
                      "start": 4,
                      "end": 5,
                      "name": "a"
                    },
                    "init": {
                      "type": "ObjectExpression",
                      "start": 8,
                      "end": 109,
                      "properties": [
                        {
                          "type": "Property",
                          "start": 22,
                          "end": 28,
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 22,
                            "end": 23,
                            "name": "a"
                          },
                          "value": {
                            "type": "Literal",
                            "start": 25,
                            "end": 28,
                            "value": "A",
                            "raw": "'A'"
                          },
                          "kind": "init"
                        },
                        {
                          "type": "Property",
                          "start": 42,
                          "end": 50,
                          "method": false,
                          "shorthand": false,
                          "computed": true,
                          "key": {
                            "type": "Literal",
                            "start": 43,
                            "end": 44,
                            "value": 1,
                            "raw": "1"
                          },
                          "value": {
                            "type": "Literal",
                            "start": 47,
                            "end": 50,
                            "value": "B",
                            "raw": "'B'"
                          },
                          "kind": "init"
                        },
                        {
                          "type": "Property",
                          "start": 64,
                          "end": 70,
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 64,
                            "end": 65,
                            "name": "c"
                          },
                          "value": {
                            "type": "Literal",
                            "start": 67,
                            "end": 70,
                            "value": "C",
                            "raw": "'C'"
                          },
                          "kind": "init"
                        },
                        {
                          "type": "Property",
                          "start": 84,
                          "end": 96,
                          "method": false,
                          "shorthand": false,
                          "computed": true,
                          "key": {
                            "type": "CallExpression",
                            "start": 85,
                            "end": 90,
                            "callee": {
                              "type": "Identifier",
                              "start": 85,
                              "end": 87,
                              "name": "ID"
                            },
                            "arguments": [
                              {
                                "type": "Literal",
                                "start": 88,
                                "end": 89,
                                "value": 2,
                                "raw": "2"
                              }
                            ]
                          },
                          "value": {
                            "type": "Literal",
                            "start": 93,
                            "end": 96,
                            "value": "D",
                            "raw": "'D'"
                          },
                          "kind": "init"
                        }
                      ]
                    }
                  }
                ],
                "kind": "var"
              }
            ],
            "sourceType": "script"
          });
    });

    
    it('should parse string', () => {
        expect(parseScript(`var object = {
            a: 'A',
            ['b']: 'B',
            c: 'C',
            [ID('d')]: 'D',
          };`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 119,
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 119,
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 118,
                    "id": {
                      "type": "Identifier",
                      "start": 4,
                      "end": 10,
                      "name": "object"
                    },
                    "init": {
                      "type": "ObjectExpression",
                      "start": 13,
                      "end": 118,
                      "properties": [
                        {
                          "type": "Property",
                          "start": 27,
                          "end": 33,
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 27,
                            "end": 28,
                            "name": "a"
                          },
                          "value": {
                            "type": "Literal",
                            "start": 30,
                            "end": 33,
                            "value": "A",
                            "raw": "'A'"
                          },
                          "kind": "init"
                        },
                        {
                          "type": "Property",
                          "start": 47,
                          "end": 57,
                          "method": false,
                          "shorthand": false,
                          "computed": true,
                          "key": {
                            "type": "Literal",
                            "start": 48,
                            "end": 51,
                            "value": "b",
                            "raw": "'b'"
                          },
                          "value": {
                            "type": "Literal",
                            "start": 54,
                            "end": 57,
                            "value": "B",
                            "raw": "'B'"
                          },
                          "kind": "init"
                        },
                        {
                          "type": "Property",
                          "start": 71,
                          "end": 77,
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 71,
                            "end": 72,
                            "name": "c"
                          },
                          "value": {
                            "type": "Literal",
                            "start": 74,
                            "end": 77,
                            "value": "C",
                            "raw": "'C'"
                          },
                          "kind": "init"
                        },
                        {
                          "type": "Property",
                          "start": 91,
                          "end": 105,
                          "method": false,
                          "shorthand": false,
                          "computed": true,
                          "key": {
                            "type": "CallExpression",
                            "start": 92,
                            "end": 99,
                            "callee": {
                              "type": "Identifier",
                              "start": 92,
                              "end": 94,
                              "name": "ID"
                            },
                            "arguments": [
                              {
                                "type": "Literal",
                                "start": 95,
                                "end": 98,
                                "value": "d",
                                "raw": "'d'"
                              }
                            ]
                          },
                          "value": {
                            "type": "Literal",
                            "start": 102,
                            "end": 105,
                            "value": "D",
                            "raw": "'D'"
                          },
                          "kind": "init"
                        }
                      ]
                    }
                  }
                ],
                "kind": "var"
              }
            ],
            "sourceType": "script"
          });
    });

});