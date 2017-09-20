import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Directives', () => {
    
    it('should parse a single "use\\x20strict"', () => {
        expect(parseScript('"use\\x20strict"', {
            ranges: true,
            directives: true
        })).to.eql({
              "body": [
                {
                  "end": 15,
                  "expression": {
                    "end": 15,
                    "start": 0,
                    "type": "Literal",
                    "value": "use strict"
                  },
                  "start": 0,
                  "directive": "use\\x20strict",
                  "type": "ExpressionStatement"
                }
              ],
              "end": 15,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            })
    });

   it('should parse a single "use strict"', () => {
        expect(parseScript('"use strict"', {
            ranges: true,
            directives: true
        })).to.eql({
              "body": [
                {
                  "end": 12,
                  "expression": {
                    "end": 12,
                    "start": 0,
                    "type": "Literal",
                    "value": "use strict"
                  },
                  "start": 0,
                  "type": "ExpressionStatement",
                  "directive": "use strict"
                }
              ],
              "end": 12,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            })
    });

    it('should parse a single "use strict"', () => {
        expect(parseScript('"use asm"', {
            ranges: true,
            directives: true
        })).to.eql({
              "body": [
                {
                  "end": 9,
                  "expression": {
                    "end": 9,
                    "start": 0,
                    "type": "Literal",
                    "value": "use asm"
                  },
                  "start": 0,
                  "directive": "use asm",
                  "type": "ExpressionStatement"
                }
              ],
              "end": 9,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            })
    });

    it('should parse a single "use strict"', () => {
        expect(parseScript('"use asm"', {
            ranges: true,
            directives: true
        })).to.eql({
              "body": [
                {
                  "end": 9,
                  "expression": {
                    "end": 9,
                    "start": 0,
                    "type": "Literal",
                    "value": "use asm"
                  },
                  "start": 0,
                  "directive": "use asm",
                  "type": "ExpressionStatement"
                }
              ],
              "end": 9,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            })
    });

    it('should parse a single "use strict"', () => {
        expect(parseScript("'use asm' \n 'use strict'", {
         raw: true,
            directives: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "Literal",
                        "value": "use asm",
                        "raw": "'use asm'"
                    },
                    "directive": "use asm"
                },
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "Literal",
                        "value": "use strict",
                        "raw": "'use strict'"
                    }
                }
            ],
            "sourceType": "script"
        })
    });

    it('should parse a single "use strict"', () => {
        expect(parseScript('"use asm"; "use strict"', {
            ranges: false,
            directives: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "Literal",
                        "value": "use asm",
                        "raw": "\"use asm\""
                    },
                    "directive": "use asm"
                },
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "Literal",
                        "value": "use strict",
                        "raw": "\"use strict\""
                    }
                }
            ],
            "sourceType": "script"
        })
    });
});