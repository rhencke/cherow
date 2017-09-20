import { parseScript, parseModule } from '../../src/cherow';
import * as chai from 'chai';
const expect = chai.expect;

describe('AnnexB semantics', () => {

        it('should parse if function as label in sloppy mode', () => {
            expect(parseScript('var {[a]: b} = {y}', {
                ranges: false,
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
                                    "type": "ObjectPattern",
                                    "properties": [
                                        {
                                            "type": "Property",
                                            "key": {
                                                "type": "Identifier",
                                                "name": "a"
                                            },
                                            "computed": true,
                                            "value": {
                                                "type": "Identifier",
                                                "name": "b"
                                            },
                                            "kind": "init",
                                            "method": false,
                                            "shorthand": false
                                        }
                                    ]
                                },
                                "init": {
                                    "type": "ObjectExpression",
                                    "properties": [
                                        {
                                            "type": "Property",
                                            "key": {
                                                "type": "Identifier",
                                                "name": "y"
                                            },
                                            "computed": false,
                                            "value": {
                                                "type": "Identifier",
                                                "name": "y"
                                            },
                                            "kind": "init",
                                            "method": false,
                                            "shorthand": true
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