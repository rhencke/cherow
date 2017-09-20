import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';
const expect = chai.expect;

describe('Simple parameter list', () => {
  
    it('should fail on array pattern default', () => {
        expect(() => {
            parseScript('function a([ option1, option2 ] = []) {  "use strict"; }');
        }).to.throw('');
    });
      
    it('should fail on array pattern default', () => {  expect(() => { parseScript('function foo(a=2) { "use strict"; }'); }).to.not.throw(''); });
    it('should fail on array pattern default', () => {  expect(() => { parseScript('(a=2) => { "use strict"; }'); }).to.not.throw(''); });
    it('should fail on array pattern default', () => {  expect(() => { parseScript('function foo({a}) { "use strict"; }'); }).to.throw(''); });
    it('should fail on array pattern default', () => {  expect(() => { parseScript('({a}) => { "use strict"; }'); }).to.not.throw(''); });

      it('should fail on array pattern', () => {
          expect(() => {
              parseScript('function a([ option1, option2 ]) { "use strict"; }');
          }).to.throw('');
      });
      it('should fail on arrow function', () => {
          expect(() => {
              parseScript('var a = (options = {}) => { "use strict"; }');
          }).to.not.throw('');
      });
      it('should fail on default', () => {
          expect(() => {
              parseScript('function a(options = {}) { "use strict"; }');
          }).to.throw('');
      });
      it('should fail on method', () => {
          expect(() => {
              parseScript(`var obj = {
          a(options = {}) {
            "use strict";
          }
        };`);
          }).to.throw();
      });
      it('should fail on object pattern default', () => {
          expect(() => {
              parseScript('function a({ option1, option2 } = {}) { "use strict"; }');
          }).to.throw();
      });
      it('should fail on object pattern', () => {
          expect(() => {
              parseScript('function a({ option1, option2 }) { "use strict"; }');
          }).to.throw();
      });
      it('should fail on rest', () => {
          expect(() => {
              parseScript('function a(...options) { "use strict"; }');
          }).to.throw();
      });
      it('should fail on async arrow function', () => {
          expect(() => {
              parseScript('var a = async (options = {}) => { "use strict"; }');
          }).to.not.throw();
      });
      it('should fail on async function', () => {
          expect(() => {
              parseScript('async function a(options = {}) { "use strict"; }');
          }).to.throw();
      });
  
      it('should fail on array pattern', () => {
          expect(() => {
              parseScript('function a([ option1, option2 ]) { "use strict"; }');
          }).to.throw('');
      });
  
      it('should parse async arrow function concise body', () => {
          expect(parseScript('var a = async (options = {}) => options;', {
              ranges: true,
              raw: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 40,
              "body": [{
                  "type": "VariableDeclaration",
                  "start": 0,
                  "end": 40,
                  "declarations": [{
                      "type": "VariableDeclarator",
                      "start": 4,
                      "end": 39,
                      "id": {
                          "type": "Identifier",
                          "start": 4,
                          "end": 5,
                          "name": "a"
                      },
                      "init": {
                          "type": "ArrowFunctionExpression",
                          "start": 8,
                          "end": 39,
                          "id": null,
                          "generator": false,
                          "expression": true,
                          "async": true,
                          "params": [{
                              "type": "AssignmentPattern",
                              "start": 15,
                              "end": 27,
                              "left": {
                                  "type": "Identifier",
                                  "start": 15,
                                  "end": 22,
                                  "name": "options"
                              },
                              "right": {
                                  "type": "ObjectExpression",
                                  "start": 25,
                                  "end": 27,
                                  "properties": []
                              }
                          }],
                          "body": {
                              "type": "Identifier",
                              "start": 32,
                              "end": 39,
                              "name": "options"
                          }
                      }
                  }],
                  "kind": "var"
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse arrow function concise body', () => {
          expect(parseScript('function f(a, ...b) {};', {
              ranges: true,
              raw: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 23,
              "body": [{
                      "type": "FunctionDeclaration",
                      "start": 0,
                      "end": 22,
                      "id": {
                          "type": "Identifier",
                          "start": 9,
                          "end": 10,
                          "name": "f"
                      },
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [{
                              "type": "Identifier",
                              "start": 11,
                              "end": 12,
                              "name": "a"
                          },
                          {
                              "type": "RestElement",
                              "start": 14,
                              "end": 18,
                              "argument": {
                                  "type": "Identifier",
                                  "start": 17,
                                  "end": 18,
                                  "name": "b"
                              }
                          }
                      ],
                      "body": {
                          "type": "BlockStatement",
                          "start": 20,
                          "end": 22,
                          "body": []
                      }
                  },
                  {
                      "type": "EmptyStatement",
                      "start": 22,
                      "end": 23
                  }
              ],
              "sourceType": "script"
          });
      });
   
  });