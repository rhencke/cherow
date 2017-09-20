import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Statements - Empty', () => {

            it('should parse an empty completion', () => {
                expect(parseScript(';')).to.eql({
                    "type": "Program",
                    "body": [{
                        "type": "EmptyStatement"
                    }],
                    "sourceType": "script"
                });
            });

            it('should parse "3;;;"', () => {
                expect(parseScript('3;;;', {
                    ranges: true,
                    raw: true
                    })).to.eql({
                    "type": "Program",
                    "start": 0,
                    "end": 4,
                    "body": [
                      {
                        "type": "ExpressionStatement",
                        "start": 0,
                        "end": 2,
                        "expression": {
                          "type": "Literal",
                          "start": 0,
                          "end": 1,
                          "value": 3,
                          "raw": "3"
                        }
                      },
                      {
                        "type": "EmptyStatement",
                        "start": 2,
                        "end": 3
                      },
                      {
                        "type": "EmptyStatement",
                        "start": 3,
                        "end": 4
                      }
                    ],
                    "sourceType": "script"
                  });
            });

     it('should parse multiple empty statements with whitespace',  () => {
        expect(parseScript(`
        ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
        ;;;;;   ;;;;;;  ;;      ;;  ;;;;;;   ;;;;;;;;  ;;    ;;     ;;;;;
        ;;;;;   ;;      ;;;;  ;;;;  ;;   ;;     ;;      ;;  ;;      ;;;;;
        ;;;;;   ;;;;    ;; ;;;; ;;  ;;;;;;      ;;       ;;;;       ;;;;;
        ;;;;;   ;;      ;;  ;;  ;;  ;;          ;;        ;;        ;;;;;
        ;;;;;   ;;;;;;  ;;      ;;  ;;          ;;        ;;        ;;;;;
        ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
`)).to.eql({
    "type": "Program",
    "body": [
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        },
        {
            "type": "EmptyStatement"
        }
    ],
    "sourceType": "script"
});
    });
   });
   