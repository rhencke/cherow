import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Next - Optional catch binding', () => {

    it('should parse without binding', () => {
        expect(parseScript('try {}  catch {}', {
            raw: true,
            ranges: true,
            next: true
        })).to.eql({
              "body": [
                {
                  "block": {
                   "body": [],
                    "end": 6,
                   "start": 4,
                    "type": "BlockStatement",
                  },
                  "end": 16,
                  "finalizer": null,
                  "handler": {
                    "body": {
                      "body": [],
                      "end": 16,
                      "start": 14,
                      "type": "BlockStatement"
                    },
                    "end": 16,
                    "param": null,
                    "start": 8,
                    "type": "CatchClause"
                 },
                  "start": 0,
                  "type": "TryStatement"
                }
              ],
              "end": 16,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    })
    it('should parse import in strict mode', () => {
        expect(parseScript('try { } catch { } finally { }', {
            raw: true,
            ranges: true,
            next: true
        })).to.eql({
              "body": [
                {
                  "block": {
                    "body": [],
                    "end": 7,
                    "start": 4,
                    "type": "BlockStatement"
                  },
                  "end": 29,
                  "finalizer": {
                    "body": [],
                    "end": 29,
                    "start": 26,
                    "type": "BlockStatement"
                  },
                  "handler": {
                    "body": {
                      "body": [],
                      "end": 17,
                      "start": 14,
                      "type": "BlockStatement",
                    },
                    "end": 17,
                    "param": null,
                    "start": 8,
                    "type": "CatchClause",
                  },
                  "start": 0,
                  "type": "TryStatement",
                },
              ],
              "end": 29,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });
});