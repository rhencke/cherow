import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Espressions - binary bitwise', () => {

    it('should parse "x & y"', () => {
     expect(parseScript('x & y')).to.eql({
         "type": "Program",
         "body": [{
             "type": "ExpressionStatement",
             "expression": {
                 "type": "BinaryExpression",
                 "operator": "&",
                 "left": {
                     "type": "Identifier",
                     "name": "x"
                 },
                 "right": {
                     "type": "Identifier",
                     "name": "y"
                 }
             }
         }],
         "sourceType": "script"
     });
 });

 it('should parse "x ^ y"', () => {
     expect(parseScript('x ^ y')).to.eql({
         "type": "Program",
         "body": [{
             "type": "ExpressionStatement",
             "expression": {
                 "type": "BinaryExpression",
                 "operator": "^",
                 "left": {
                     "type": "Identifier",
                     "name": "x"
                 },
                 "right": {
                     "type": "Identifier",
                     "name": "y"
                 }
             }
         }],
         "sourceType": "script"
     });
 });


 it('should parse "x | y"', () => {
 expect(parseScript('x | y')).to.eql({
     "type": "Program",
     "body": [{
         "type": "ExpressionStatement",
         "expression": {
             "type": "BinaryExpression",
             "operator": "|",
             "left": {
                 "type": "Identifier",
                 "name": "x"
             },
             "right": {
                 "type": "Identifier",
                 "name": "y"
             }
         }
     }],
     "sourceType": "script"
 });
 });
 });