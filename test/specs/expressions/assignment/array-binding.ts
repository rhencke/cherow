import { parseScript, parseModule } from '../../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Espressions - Array binding', () => {
    
    it('should fail on "[, x, ...y,] = 0', () => {
       expect(() => {
           parseScript('[, x, ...y,] = 0');
       }).to.not.throw();
   });

   it('should fail on "[...x, ...y] = 0', () => {
       expect(() => {
           parseScript('[...x, ...y] = 0');
       }).to.not.throw();
   });

   it('should fail on "[...x, y] = 0', () => {
       expect(() => {
           parseScript('[...x, y] = 0');
       }).to.not.throw();
   });

   it('should fail on "[...x,,] = 0', () => {
       expect(() => {
           parseScript('[...x,,] = 0');
       }).to.not.throw();
   });

   it('should fail on "[0,{a=0}] = 0', () => {
       expect(() => {
           parseScript('[{a=0},{b=0},0] = 0');
       }).to.not.throw('Invalid left-hand side in assignment');
   });

   it('should fail on "[{a=0},...0]', () => {
       expect(() => {
           parseScript('[{a=0},...0]');
       }).to.not.throw('Invalid left-hand side in assignment');
   });

   it('should fail on "[...0,{a=0}]=0', () => {
       expect(() => {
           parseScript('[...0,{a=0}]=0');
       }).to.throw();
   });

   it('should fail on "[...0,...{a=0}]=0', () => {
       expect(() => {
           parseScript('[...0,...{a=0}]=0');
       }).to.throw();
   });

   it('should fail on "[a, ...(b = c)] = 0', () => {
       expect(() => {
           parseScript('[a, ...(b = c)] = 0');
       }).to.not.throw();
   });

   it('should fail on "{a = [...b, c]} = 0', () => {
       expect(() => {
           parseScript('{a = [...b, c]} = 0');
       }).to.throw();
   });

   it('should fail on "[0] = 0', () => {
       expect(() => {
           parseScript('[0] = 0');
       }).to.throw();
   });

   it('should fail on "[a, ...b, {c=0}]', () => {
       expect(() => {
           parseScript('[a, ...b, {c=0}]');
       }).to.not.throw('Invalid left-hand side in assignment');
   });

   it('should fail on "(a,b)=(c,d);', () => {
       expect(() => {
           parseScript('(a,b)=(c,d);');
       }).to.throw();
   });

   it('should fail on "(a,b)=(c,d);', () => {
       expect(() => {
           parseScript('[[[[[[[[[[[[[[[[[[[[{a=b}]]]]]]]]]]]]]]]]]]]]');
       }).to.not.throw('Invalid left-hand side in assignment');
   });



   it('should parse "[,,]=0"', () => {
       expect(parseScript('[,,]=0', {
           raw: true, 
           ranges: true
       })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 6,
        "body": [
          {
            "type": "ExpressionStatement",
            "start": 0,
            "end": 6,
            "expression": {
              "type": "AssignmentExpression",
              "start": 0,
              "end": 6,
              "operator": "=",
              "left": {
                "type": "ArrayPattern",
                "start": 0,
                "end": 4,
                "elements": [
                  null,
                  null
                ]
              },
              "right": {
                "type": "Literal",
                "start": 5,
                "end": 6,
                "value": 0,
                "raw": "0"
              }
            }
          }
        ],
        "sourceType": "script"
      });
   });

   it('should parse "[,,]=0"', () => {
       expect(parseScript('[,,]=0', {
           raw: true
       })).to.eql({
           "type": "Program",
           "body": [{
               "type": "ExpressionStatement",
               "expression": {
                   "type": "AssignmentExpression",
                   "operator": "=",
                   "left": {
                       "type": "ArrayPattern",
                       "elements": [
                           null,
                           null
                       ]
                   },
                   "right": {
                       "type": "Literal",
                       "value": 0,
                       "raw": "0"
                   }
               }
           }],
           "sourceType": "script"
       });
   });

   it('should parse "[a,b=0,[c,...a[0]]={}]=0;"', () => {
       expect(parseScript('[a,b=0,[c,...a[0]]={}]=0;', {
           raw: true
       })).to.eql({
           "type": "Program",
           "body": [{
               "type": "ExpressionStatement",
               "expression": {
                   "type": "AssignmentExpression",
                   "operator": "=",
                   "left": {
                       "type": "ArrayPattern",
                       "elements": [{
                               "type": "Identifier",
                               "name": "a"
                           },
                           {
                               "type": "AssignmentPattern",
                               "left": {
                                   "type": "Identifier",
                                   "name": "b"
                               },
                               "right": {
                                   "type": "Literal",
                                   "value": 0,
                                   "raw": "0"
                               }
                           },
                           {
                               "type": "AssignmentPattern",
                               "left": {
                                   "type": "ArrayPattern",
                                   "elements": [{
                                           "type": "Identifier",
                                           "name": "c"
                                       },
                                       {
                                           "type": "RestElement",
                                           "argument": {
                                               "type": "MemberExpression",
                                               "computed": true,
                                               "object": {
                                                   "type": "Identifier",
                                                   "name": "a"
                                               },
                                               "property": {
                                                   "type": "Literal",
                                                   "value": 0,
                                                   "raw": "0"
                                               }
                                           }
                                       }
                                   ]
                               },
                               "right": {
                                   "type": "ObjectExpression",
                                   "properties": []
                               }
                           }
                       ]
                   },
                   "right": {
                       "type": "Literal",
                       "value": 0,
                       "raw": "0"
                   }
               }
           }],
           "sourceType": "script"
       });
   });


   it('should parse "[{a=b}=0]"', () => {
       expect(parseScript('[{a=b}=0]', {
           raw: true
       })).to.eql({
           "type": "Program",
           "body": [{
               "type": "ExpressionStatement",
               "expression": {
                   "type": "ArrayExpression",
                   "elements": [{
                       "type": "AssignmentExpression",
                       "operator": "=",
                       "left": {
                           "type": "ObjectPattern",
                           "properties": [{
                               "type": "Property",
                               "key": {
                                   "type": "Identifier",
                                   "name": "a"
                               },
                               "computed": false,
                               "value": {
                                   "type": "AssignmentPattern",
                                   "left": {
                                       "type": "Identifier",
                                       "name": "a"
                                   },
                                   "right": {
                                       "type": "Identifier",
                                       "name": "b"
                                   }
                               },
                               "kind": "init",
                               "method": false,
                               "shorthand": true
                           }]
                       },
                       "right": {
                           "type": "Literal",
                           "value": 0,
                           "raw": "0"
                       }
                   }]
               }
           }],
           "sourceType": "script"
       });
   });


   it('should parse "[a] = 0;"', () => {
   expect(parseScript('[a] = 0;', {
       raw: true
   })).to.eql({
       "type": "Program",
       "body": [{
           "type": "ExpressionStatement",
           "expression": {
               "type": "AssignmentExpression",
               "operator": "=",
               "left": {
                   "type": "ArrayPattern",
                   "elements": [{
                       "type": "Identifier",
                       "name": "a"
                   }]
               },
               "right": {
                   "type": "Literal",
                   "value": 0,
                   "raw": "0"
               }
           }
       }],
       "sourceType": "script"
   });
   });
   });