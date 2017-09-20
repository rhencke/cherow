import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Test262 - Early error', () => {
    
        it('should fail on "export default function(a){ let a; }"', () => {
            expect(() => {
                parseModule('export default function(a){ let a; }');
            }).to.throw();
        });
        it('should fail on "({ a(eval) { "use strict"; } });"', () => {
            expect(() => {
                parseScript('({ a(eval) { "use strict"; } });');
            }).to.throw();
        });
        it('should fail on "for (let let of a);"', () => {
            expect(() => {
                parseScript('for (let let of a);');
            }).to.throw();
        });
        it('should fail on "for(([0]) in 0);"', () => {
            expect(() => {
                parseScript('for(([0]) in 0);');
            }).to.throw();
        });
        it('should fail on "for(const {a, a} of 1);"', () => {
            expect(() => {
                parseScript('for(const {a, a} of 1);');
            }).to.throw();
        });
        it('should fail on "!function a(b){ super[1] }"', () => {
            expect(() => {
                parseScript('!function a(b){ super[1] }');
            }).to.throw();
        });
        it('should fail on "({set a(b){}} = 0)"', () => {
            expect(() => {
                parseScript('({set a(b){}} = 0)');
            }).to.throw();
        });
        it('should fail on "for (let let in a);"', () => {
            expect(() => {
                parseScript('for (let let in a);');
            }).to.throw();
        });
        it('should fail on ""use strict"; function static() { }"', () => {
            expect(() => {
                parseScript('"use strict"; function static() { }');
            }).to.throw();
        });
        it('should fail on "!function* (a){ super.b }"', () => {
            expect(() => {
                parseScript('!function* (a){ super.b }');
            }).to.throw();
        });
        it('should fail on "function a() { "use strict"; var private; }"', () => {
            expect(() => {
                parseScript('function a() { "use strict"; var private; }');
            }).to.throw();
        });
        it('should fail on "package => {"use strict"}"', () => {
            expect(() => {
                parseScript('package => {"use strict"}');
            }).to.throw();
        });
        it('should fail on ""use strict"; var yield;"', () => {
            expect(() => {
                parseScript('"use strict"; var yield;');
            }).to.throw();
        });
        it('should fail on "class a extends b { static get prototype(){} }"', () => {
            expect(() => {
                parseScript('class a extends b { static get prototype(){} }');
            }).to.throw();
        });
        it('should fail on "function a() {"use strict"; ++arguments; }"', () => {
            expect(() => {
                parseScript('function a() {"use strict"; ++arguments; }');
            }).to.throw();
        });
        it('should fail on "!{ a(){ let b; var b; } };"', () => {
            expect(() => {
                parseScript('!{ a(){ let b; var b; } };');
            }).to.throw();
        });
        it('should fail on "function* a(b = super.c){}"', () => {
            expect(() => {
                parseScript('function* a(b = super.c){}');
            }).to.throw();
        });
        it('should fail on "switch (a) { default: continue; }"', () => {
            expect(() => {
                parseScript('switch (a) { default: continue; }');
            }).to.throw();
        });
        it('should fail on "var a = super();"', () => {
            expect(() => {
                parseScript('var a = super();');
            }).to.throw();
        });
        it('should fail on "continue;"', () => {
            expect(() => {
                parseScript('continue;');
            }).to.throw();
        });
        it('should fail on "{ function a(){} function a(){} }"', () => {
            expect(() => {
                parseScript('{ function a(){} function a(){} }');
            }).to.throw();
        });
        it('should fail on "for(const a = 1, a = 2;;);"', () => {
            expect(() => {
                parseScript('for(const a = 1, a = 2;;);');
            }).to.throw();
        });
        it('should fail on "function* a(){ ({ *b(c = d + e(yield)){} }); }"', () => {
            expect(() => {
                parseScript('function* a(){ ({ *b(c = d + e(yield)){} }); }');
            }).to.throw();
        });
        it('should fail on "export default function(a){ const a = 1; }"', () => {
            expect(() => {
                parseModule('export default function(a){ const a = 1; }');
            }).to.throw();
        });
        it('should fail on ""use strict"; function eval(){}"', () => {
            expect(() => {
                parseScript('"use strict"; function eval(){}');
            }).to.throw();
        });
        it('should fail on ""use strict"; function eval(){}"', () => {
            expect(() => {
                parseModule('"use strict"; function eval(){}');
            }).to.throw();
        });
        it('should fail on "{ var a; const a = 1; }"', () => {
            expect(() => {
                parseScript('{ var a; const a = 1; }');
            }).to.throw();
        });
        it('should fail on "({get a(){}} = 0)"', () => {
            expect(() => {
                parseScript('({get a(){}} = 0)');
            }).to.throw();
        });
        it('should fail on "a: while (true) { (function () { break a; }); }"', () => {
            expect(() => {
                parseScript('a: while (true) { (function () { break a; }); }');
            }).to.throw();
        });
        it('should fail on "class a { *b(eval){} };"', () => {
            expect(() => {
                parseScript('class a { *b(eval){} };');
            }).to.throw();
        });
        it('should fail on ""use strict"; let [eval] = 1;"', () => {
            expect(() => {
                parseScript('"use strict"; let [eval] = 1;');
            }).to.throw();
        });
        it('should fail on "function* a(){ (b = yield* c) => 1; }"', () => {
            expect(() => {
                parseScript('function* a(){ (b = yield* c) => 1; }');
            }).to.throw();
        });
        it('should fail on "switch(1) { case 2: let a; default: var a; }"', () => {
            expect(() => {
                parseScript('switch(1) { case 2: let a; default: var a; }');
            }).to.throw();
        });
        it('should fail on "let a, let = 1;"', () => {
            expect(() => {
                parseScript('let a, let = 1;');
            }).to.throw();
        });
        it('should fail on "__proto__: __proto__: 1;"', () => {
            expect(() => {
                parseScript('__proto__: __proto__: 1;');
            }).to.throw();
        });
        it('should fail on "function *a() { ({b = yield}) => {} }"', () => {
            expect(() => {
                parseScript('function *a() { ({b = yield}) => {} }');
            }).to.throw();
        });
        it('should fail on "function a(){ var b; let b; }"', () => {
            expect(() => {
                parseScript('function a(){ var b; let b; }');
            }).to.throw();
        });
        it('should fail on "function a(){ break b; }"', () => {
            expect(() => {
                parseScript('function a(){ break b; }');
            }).to.throw();
        });
        it('should fail on "switch(1) { default: var a; case 2: const a = 3; }"', () => {
            expect(() => {
                parseScript('switch(1) { default: var a; case 2: const a = 3; }');
            }).to.throw();
        });
        it('should fail on "function a() { "use strict"; var interface; }"', () => {
            expect(() => {
                parseScript('function a() { "use strict"; var interface; }');
            }).to.throw();
        });
        it('should fail on "let a; var a;"', () => {
            expect(() => {
                parseScript('let a; var a;');
            }).to.throw();
        });
        it('should fail on "for(([0]) of 0);"', () => {
            expect(() => {
                parseScript('for(([0]) of 0);');
            }).to.throw();
        });
        it('should fail on "let a, let;"', () => {
            expect(() => {
                parseScript('let a, let;');
            }).to.throw();
        });
        it('should fail on "for(const [a, a] = 1;;);"', () => {
            expect(() => {
                parseScript('for(const [a, a] = 1;;);');
            }).to.throw();
        });
        it('should fail on "for([0] of 0);"', () => {
            expect(() => {
                parseScript('for([0] of 0);');
            }).to.throw();
        });
        it('should fail on "class a { set constructor(b) {} }"', () => {
            expect(() => {
                parseScript('class a { set constructor(b) {} }');
            }).to.throw();
        });
        it('should fail on "function* a(){ ({ *b(c = yield){} }); }"', () => {
            expect(() => {
                parseScript('function* a(){ ({ *b(c = yield){} }); }');
            }).to.throw();
        });
        it('should fail on "continue"', () => {
            expect(() => {
                parseScript('continue');
            }).to.throw();
        });
        it('should fail on "let a, b, c, let = 1;"', () => {
            expect(() => {
                parseScript('let a, b, c, let = 1;');
            }).to.throw();
        });
        it('should fail on "!class extends (eval = null) { };"', () => {
            expect(() => {
                parseScript('!class extends (eval = null) { };');
            }).to.throw();
        });
        it('should fail on "function* a(){ ({[yield]: b}) => 1; }"', () => {
            expect(() => {
                parseScript('function* a(){ ({[yield]: b}) => 1; }');
            }).to.throw();
        });
        it('should fail on "({ set __proto__(a){}, "__proto__": null, __proto__: null, })"', () => {
            expect(() => {
                parseScript('({ set __proto__(a){}, "__proto__": null, __proto__: null, })');
            }).to.throw();
        });
        it('should fail on "let a = 1, a = 2;"', () => {
            expect(() => {
                parseScript('let a = 1, a = 2;');
            }).to.throw();
        });
    
    
        it('should fail on ""use strict"; arguments = 0;"', () => {
            expect(() => {
                parseScript('"use strict"; arguments = 0;')
            }).to.throw('');
        });
        it('should fail on ""use strict"; [eval] = 0;"', () => {
            expect(() => {
                parseScript('"use strict"; [eval] = 0')
            }).to.not.throw('');
        });
        it('should fail on ""use strict"; [,,,eval,] = 0"', () => {
            expect(() => {
                parseScript('"use strict"; [,,,eval,] = 0')
            }).to.not.throw('');
        });
        it('should fail on ""use strict"; [arguments] = 0"', () => {
            expect(() => {
                parseScript('"use strict"; [arguments] = 0')
            }).to.not.throw('');
        });
        it('should fail on ""use strict"; [,,,arguments,] = 0"', () => {
            expect(() => {
                parseScript('"use strict"; [,,,arguments,] = 0')
            }).to.not.throw('');
        });
        it('should fail on ""use strict"; ({a: arguments} = 0)"', () => {
            expect(() => {
                parseScript('"use strict"; ({a: arguments} = 0)')
            }).to.throw('');
        });
        it('should fail on ""use strict"; ({a: arguments = 0} = 0)"', () => {
            expect(() => {
                parseScript('"use strict"; ({a: arguments = 0} = 0)')
            }).to.throw('');
        });
        it('should fail on ""use strict"; var eval;"', () => {
            expect(() => {
                parseScript('"use strict"; var eval;')
            }).to.throw('');
        });
        it('should fail on ""use strict"; var arguments;"', () => {
            expect(() => {
                parseScript('"use strict"; var arguments;')
            }).to.throw('');
        });
        it('should fail on ""use strict";  let [eval] = 0;"', () => {
            expect(() => {
                parseScript('"use strict";  let [eval] = 0;')
            }).to.throw('');
        });
        it('should fail on ""use strict"; const {a: eval} = 0;"', () => {
            expect(() => {
                parseScript('"use strict"; const {a: eval} = 0;')
            }).to.throw('');
        });
        it('should fail on ""var eval;"', () => {
            expect(() => {
                parseModule('var eval;')
            }).to.throw('');
        });
        it('should fail on "eval=>0', () => {
            expect(() => {
                parseModule('eval=>0')
            }).to.not.throw('');
        });
        it('should fail on ""use strict"; eval=>0"', () => {
            expect(() => {
                parseScript('"use strict";  eval=>0')
            }).to.not.throw('');
        });
        it('should fail on ""use strict"; arguments=>0"', () => {
            expect(() => {
                parseScript('"use strict"; arguments=>0')
            }).to.throw();
        });
        it('should fail on ""use strict"; (eval)=>0"', () => {
            expect(() => {
                parseScript('"use strict"; (eval)=>0')
            }).to.throw('');
        });
        it('should fail on ""use strict"; (arguments)=>0"', () => {
            expect(() => {
                parseScript('"use strict"; (arguments)=>0')
            }).to.throw('');
        });
        it('should fail on ""use strict";  +yield;"', () => {
            expect(() => {
                parseScript('"use strict";  +yield;')
            }).to.throw();
        });
        it('should fail on "use strict"; yield:;"', () => {
            expect(() => {
                parseScript('"use strict"; yield:;')
            }).to.throw();
        });
        it('should fail on "use strict"; yield:;"', () => {
            expect(() => {
                parseScript('"use strict"; yield:;');
            }).to.throw();
        });
        it('should fail on "use strict"; var [yield] = 0;"', () => {
            expect(() => {
                parseScript('"use strict"; var [yield] = 0;');
            }).to.throw();
        });
        it('should fail on "use strict"; +implements;"', () => {
            expect(() => {
                parseScript('"use strict"; +implements;');
            }).to.throw();
        });
        it('should fail on "use strict"; +interface;"', () => {
            expect(() => {
                parseScript('"use strict"; +interface;');
            }).to.throw();
        });
        it('should fail on "use strict"; +let;"', () => {
            expect(() => {
                parseScript('"use strict"; +let;');
            }).to.throw();
        });
        it('should fail on "use strict"; +package;"', () => {
            expect(() => {
                parseScript('"use strict"; +package;');
            }).to.throw();
        });
        it('should fail on "use strict"; +private;"', () => {
            expect(() => {
                parseScript('"use strict"; +private;');
            }).to.throw();
        });
        it('should fail on "use strict"; +protected;"', () => {
            expect(() => {
                parseScript('"use strict"; +protected;');
            }).to.throw();
        });
        it('should fail on "use strict"; +public;"', () => {
            expect(() => {
                parseScript('"use strict"; +public;');
            }).to.throw();
        });
        it('should fail on "use strict"; +static;"', () => {
            expect(() => {
                parseScript('"use strict"; +static;');
            }).to.throw();
        });
        it('should fail on "use strict"; implements:0;"', () => {
            expect(() => {
                parseScript('"use strict"; implements:0;');
            }).to.throw();
        });
        it('should fail on "use strict"; interface:0;"', () => {
            expect(() => {
                parseScript('"use strict"; interface:0;');
            }).to.throw();
        });
        it('should fail on "use strict"; let:0;"', () => {
            expect(() => {
                parseScript('"use strict"; let:0;');
            }).to.throw();
        });
        it('should fail on "use strict"; package:0;"', () => {
            expect(() => {
                parseScript('"use strict"; package:0;');
            }).to.throw();
        });
        it('should fail on "use strict"; protected:0;"', () => {
            expect(() => {
                parseScript('"use strict"; protected:0;');
            }).to.throw();
        });
        it('should fail on "use strict"; public:0;"', () => {
            expect(() => {
                parseScript('"use strict"; public:0;');
            }).to.throw();
        });
        it('should fail on "use strict"; static:0;"', () => {
            expect(() => {
                parseScript('"use strict"; static:0;');
            }).to.throw();
        });
    
        it('should fail on "package => { "use strict"}"', () => {
            expect(() => {
                parseScript('package => { "use strict"}');
            }).to.throw();
        });
    
        it('should fail on "(i\\u006E)"', () => {
            expect(() => {
                parseScript('(i\\u006E)');
            }).to.throw();
        });
        it('should fail on "var i\\u006E;"', () => {
            expect(() => {
                parseScript('var i\\u006E;')
            }).to.throw();
        });
    
        it('should fail on "(((...a)))"', () => {
            expect(() => {
                parseScript('(((...a)))')
            }).to.throw();
        });
    
        it('should fail on ""use strict"; arguments *= 1"', () => {
            expect(() => {
                parseScript('"use strict"; arguments *= 1')
            }).to.throw('');
        });
    
        it('should fail on ""use strict"; function f(eval){}"', () => {
            expect(() => {
                parseScript('"use strict"; function f(eval){}')
            }).to.throw();
        });
    
        it('should fail on ""use strict"; !function (eval){}"', () => {
            expect(() => {
                parseScript('"use strict"; !function (eval){}')
            }).to.throw();
        });
    
        it('should fail on "!function (eval){ \'use strict\'; }', () => {
            expect(() => {
                parseScript('!function (eval){ \'use strict\'; }')
            }).to.throw();
        });
    
        it('should fail on ""use strict"; function* f(eval){}', () => {
            expect(() => {
                parseScript('"use strict"; function* f(eval){}')
            }).to.throw();
        });
    
        it('should fail on "!function* (eval){ "use strict"; }', () => {
            expect(() => {
                parseScript('!function* (eval){ "use strict";}')
            }).to.throw();
        });
    
        it('should fail on "function a(yield){ \'use strict\'; }', () => {
            expect(() => {
                parseScript('function a(yield){ "use strict"; }')
            }).to.throw();
        });
    
        it('should fail on "function a(){ \'use strict\'; function a(a=yield){}}', () => {
            expect(() => {
                parseScript('function a(){ \'use strict\'; function a(a=yield){}}')
            }).to.throw();
        });
    
        it('should fail on ""use strict"; function* f(eval){}', () => {
            expect(() => {
                parseScript('"use strict"; function* f(eval){}');
            }).to.throw();
        });
    
        it('should fail on "use strict"; function a([yield]){}', () => {
            expect(() => {
                parseScript('"use strict"; function a([yield]){}');
            }).to.throw();
        });
    
        it('should fail on ""use strict"; var [yield] = 0;', () => {
            expect(() => {
                parseScript('"use strict"; var [yield] = 0;');
            }).to.throw();
        });
    
        it('should fail on ""use strict"; function a([yield]){}', () => {
            expect(() => {
                parseScript('"use strict"; function a([yield]){}');
            }).to.throw();
        });
    
        it('should fail on ""use strict"; function a({yield}){}', () => {
            expect(() => {
                parseScript('"use strict"; function a({yield}){}');
            }).to.throw();
        });
    
        it('should fail on ""use strict"; function a({yield=0}){}', () => {
            expect(() => {
                parseScript('"use strict"; function a({yield=0}){}');
            }).to.throw();
        });
    
        it('should fail on ""use strict"; function a({a:yield}){}', () => {
            expect(() => {
                parseScript('"use strict"; function a({a:yield}){}')
            }).to.throw();
        });
    
        it('should fail on ""use strict"; function a([yield,...a]){}', () => {
            expect(() => {
                parseScript('"use strict"; function a([yield,...a]){}')
            }).to.throw();
        });
    
        it('should fail on ""use strict"; function a([yield,...a]){}', () => {
            expect(() => {
                parseScript('"use strict"; function a([yield,...a]){}')
            }).to.throw();
        });
    
        it('should fail on "let let;"', () => {
            expect(() => {
                parseScript('let let;')
            }).to.throw();
        });
        it('should fail on "let a, let;"', () => {
            expect(() => {
                parseScript('let a, let;')
            }).to.throw();
        });
        it('should fail on "let a, let = 0;"', () => {
            expect(() => {
                parseScript('let a, let = 0;')
            }).to.throw('');
        });
        it('should fail on "const a;"', () => {
            expect(() => {
                parseScript('const a;')
            }).to.throw();
        });
        it('should fail on "const a, b = 0;"', () => {
            expect(() => {
                parseScript('const a, b = 0;')
            }).to.throw();
        });
        it('should fail on "const a = 0, b;"', () => {
            expect(() => {
                parseScript('const a = 0, b;')
            }).to.throw();
        });
        it('should fail on "let a, a;"', () => {
            expect(() => {
                parseScript('let a, a;')
            }).to.throw();
        });
        it('should fail on "let a, b, a;"', () => {
            expect(() => {
                parseScript('let a, b, a;')
            }).to.throw();
        });
        it('should fail on "let a = 0, a = 1;"', () => {
            expect(() => {
                parseScript('let a = 0, a = 1;')
            }).to.throw();
        });
        it('should fail on "const a = 0, a = 1;"', () => {
            expect(() => {
                parseScript('const a = 0, a = 1;;')
            }).to.throw();
        });
        it('should fail on "const a = 0, b = 1, a = 2;"', () => {
            expect(() => {
                parseScript('const a = 0, b = 1, a = 2;')
            }).to.throw();
        });
        it('should fail on "let a, [a] = 0;"', () => {
            expect(() => {
                parseScript('let a, [a] = 0;')
            }).to.throw();
        });
        it('should fail on "let [a, a] = 0;"', () => {
            expect(() => {
                parseScript('let [a, a] = 0;')
            }).to.throw();
        });
        it('should fail on "let {a: b, c: b} = 0;"', () => {
            expect(() => {
                parseScript('let {a: b, c: b} = 0;')
            }).to.throw();
        });
        it('should fail on "let [a, ...a] = 0;"', () => {
            expect(() => {
                parseScript('let [a, ...a] = 0;')
            }).to.throw();
        });
        it('should fail on "let \\u{61}, \\u{0061};"', () => {
            expect(() => {
                parseScript('let \\u{61}, \\u{0061};')
            }).to.throw();
        });
        it('should fail on "let \\u0061, \\u{0061};"', () => {
            expect(() => {
                parseScript('let \\u0061, \\u{0061};')
            }).to.throw();
        });
        it('should fail on "let x\\u{61}, x\\u{0061};"', () => {
            expect(() => {
                parseScript('let x\\u{61}, x\\u{0061};')
            }).to.throw();
        });
        it('should fail on "let x\\u{E01D5}, x\uDB40\uDDD5;"', () => {
            expect(() => {
                parseScript('let x\\u{E01D5}, x\uDB40\uDDD5;')
            }).to.throw();
        });
        it('should fail on "var foo = 1; let foo = 1;"', () => {
            expect(() => {
                parseScript('var foo = 1; let foo = 1;')
            }).to.throw();
        });
        it('should fail on "let foo = 1; var foo = 1;"', () => {
            expect(() => {
                parseScript('let foo = 1; var foo = 1;')
            }).to.throw();
        });
        it('should fail on "let foo = 1; let foo = 1;"', () => {
            expect(() => {
                parseScript('let foo = 1; let foo = 1;')
            }).to.throw();
        });
        it('should fail on "var foo = 1; const foo = 1;"', () => {
            expect(() => {
                parseScript('var foo = 1; const foo = 1;')
            }).to.throw();
        });
        it('should fail on "const foo = 1; var foo = 1;"', () => {
            expect(() => {
                parseScript('const foo = 1; var foo = 1;')
            }).to.throw();
        });
        it('should fail on "var [foo] = [1]; let foo = 1;"', () => {
            expect(() => {
                parseScript('var [foo] = [1]; let foo = 1;')
            }).to.throw();
        });
        it('should fail on "label: var foo = 1; let foo = 1;"', () => {
            expect(() => {
                parseScript('label: var foo = 1; let foo = 1;')
            }).to.throw();
        });
        it('should fail on "var [...foo] = x; let foo = 1;"', () => {
            expect(() => {
                parseScript('var [...foo] = x; let foo = 1;')
            }).to.throw();
        });
        it('should fail on "const a, b = 0;"', () => {
            expect(() => {
                parseScript('const a, b = 0;')
            }).to.throw();
        });
        it('should fail on "const a = 0, b;"', () => {
            expect(() => {
                parseScript('const a = 0, b;')
            }).to.throw();
        });
        it('should fail on "const a, b = 0;"', () => {
            expect(() => {
                parseScript('const a, b = 0;')
            }).to.throw();
        });
        it('should fail on "const a = 0, b;"', () => {
            expect(() => {
                parseScript('const a = 0, b;')
            }).to.throw();
        });
        it('should fail on "function f(){ const a; }"', () => {
            expect(() => {
                parseScript('function f(){ const a; }')
            }).to.throw();
        });
    
        it('should fail on "let a; let a;"', () => {
            expect(() => {
                parseScript('let a; let a;')
            }).to.throw();
        });
        it('should fail on "const a = 0; let a;"', () => {
            expect(() => {
                parseScript('const a = 0; let a;')
            }).to.throw();
        });
        it('should fail on "const a = 0; const a = 0;"', () => {
            expect(() => {
                parseScript('const a = 0; const a = 0;')
            }).to.throw();
        });
        it('should fail on "var foo = 1; var foo = 1;"', () => {
            expect(() => {
                parseScript('var foo = 1; var foo = 1;')
            }).to.not.throw();
        });
        it('should fail on "let a; var a;"', () => {
            expect(() => {
                parseScript('let a; var a;')
            }).to.throw('');
        });
        it('should fail on "var a; let a;"', () => {
            expect(() => {
                parseScript('var a; let a;')
            }).to.throw();
        });
        it('should fail on "const a = 0; var a;"', () => {
            expect(() => {
                parseScript('const a = 0; var a;')
            }).to.throw();
        });
        it('should fail on "var a; const a = 0"', () => {
            expect(() => {
                parseScript('var a; const a = 0')
            }).to.throw();
        });
        it('should fail on "const a = 0; let a;"', () => {
            expect(() => {
                parseScript('const a = 0; let a;')
            }).to.throw();
        });
        it('should fail on "const a = 0; const a = 0;"', () => {
            expect(() => {
                parseScript('const a = 0; const a = 0;')
            }).to.throw();
        });
    
        it('should fail on ""use strict"; function f(a, a){}"', () => {
            expect(() => {
                parseScript('"use strict"; function f(a, a){}')
            }).to.not.throw('');
        });
        it('should fail on ""use strict"; function f([a, a]){}"', () => {
            expect(() => {
                parseScript('"use strict"; function f([a, a]){}')
            }).to.not.throw();
        });
        it('should fail on ""use strict"; function eval(){}"', () => {
            expect(() => {
                parseScript('"use strict"; function eval(){}')
            }).to.throw();
        });
        it('should fail on ""use strict"; function arguments(){}"', () => {
            expect(() => {
                parseScript('"use strict"; function arguments(){}')
            }).to.throw();
        });
        it('should fail on ""use strict"; !function eval(){}"', () => {
            expect(() => {
                parseScript('"use strict"; !function eval(){}')
            }).to.throw('');
        });
        it('should fail on ""use strict"; !function arguments(){}"', () => {
            expect(() => {
                parseScript('"use strict"; !function arguments(){}')
            }).to.throw('');
        });
    
        it('should fail on "function f(a){ let a; }"', () => {
            expect(() => {
                parseScript('function f(a){ let a; }')
            }).to.throw();
        });
        it('should fail on "function f(a){ const a = 0; }"', () => {
            expect(() => {
                parseScript('function f(a){ const a = 0; }')
            }).to.throw();
        });
        it('should fail on "!function(a){ let a; }"', () => {
            expect(() => {
                parseScript('!function(a){ let a; }')
            }).to.throw();
        });
        it('should fail on "!function(a){ const a = 0; }"', () => {
            expect(() => {
                parseScript('!function(a){ const a = 0; }')
            }).to.throw();
        });
    
        it('should fail on "function f(a, [a]){}"', () => {
            expect(() => {
                parseScript('function f(a, [a]){}')
            }).to.not.throw();
        });
        it('should fail on "function* f(a) { let a; }"', () => {
            expect(() => {
                parseScript('function* f(a) { let a; }')
            }).to.throw();
        });
        it('should fail on "function* f([a]){ let a; }"', () => {
            expect(() => {
                parseScript('function* f([a]){ let a; }')
            }).to.throw();
        });
    
        it('should fail on "function* f({a}){ let a; }"', () => {
            expect(() => {
                parseScript('function* f({a}){ let a; }');
            }).to.throw();
        });
        it('should fail on "let a; function a(){}"', () => {
            expect(() => {
                parseScript('let a; function a(){}')
            }).to.throw();
        });
        it('should fail on "let a; const a = 0;"', () => {
            expect(() => {
                parseScript('let a; const a = 0;')
            }).to.throw();
        });
        it('should fail on "let a; var a;"', () => {
            expect(() => {
                parseModule('let a; var a;')
            }).to.throw();
        });
        it('should fail on "var a; function a(){}"', () => {
            expect(() => {
                parseModule('var a; function a(){}')
            }).to.not.throw();
        });
    
        it('should fail on "function* g(){ (a = yield) => 0; }"', () => {
            expect(() => {
                parseScript('function* g(){ (a = yield) => 0; }')
            }).to.throw();
        });
        it('should fail on "function* g(){ (a = yield b) => 0; }"', () => {
            expect(() => {
                parseScript('function* g(){ (a = yield b) => 0; }')
            }).to.throw();
        });
        it('should fail on "function* g(){ (a = yield* b) => 0; }"', () => {
            expect(() => {
                parseScript('function* g(){ (a = yield* b) => 0; }')
            }).to.throw();
        });
        it('should fail on "function* g(){ (a = x + f(yield)) => 0; }"', () => {
            expect(() => {
                parseScript('function* g(){ (a = x + f(yield)) => 0; }')
            }).to.throw();
        });
        it('should fail on "function* g(){ ({[yield]: a}) => 0; }"', () => {
            expect(() => {
                parseScript('function* g(){ ({[yield]: a}) => 0; }')
            }).to.throw();
        });
        it('should fail on "function* g(){ ({a = yield}) => 0; }"', () => {
            expect(() => {
                parseScript('function* g(){ ({a = yield}) => 0; }')
            }).to.throw();
        });
        it('should fail on "function* g(){ ([a = yield]) => 0; }"', () => {
            expect(() => {
                parseScript('function* g(){ ([a = yield]) => 0; }')
            }).to.throw();
        });
        it('should fail on "function* g(){ (...{a = yield}) => 0; }', () => {
            expect(() => {
                parseScript('function* g(){ (...{a = yield}) => 0; }')
            }).to.not.throw();
        });
    
        it('should fail on "(a, a) => { let a; }', () => {
            expect(() => {
                parseScript('(a, a) => { let a; }')
            }).to.throw();
        });
        it('should fail on "(a) => { let a; }', () => {
            expect(() => {
                parseScript('(a) => { let a; }')
            }).to.throw();
        });
        it('should fail on "([a]) => { let a; }', () => {
            expect(() => {
                parseScript('([a]) => { let a; }')
            }).to.throw();
        });
        it('should fail on "({a}) => { let a; }', () => {
            expect(() => {
                parseScript('({a}) => { let a; }')
            }).to.throw();
        });
        it('should fail on "(a) => { const a = 0; }', () => {
            expect(() => {
                parseScript('(a) => { const a = 0; }')
            }).to.throw();
        });
        it('should fail on "([a]) => { const a = 0; }', () => {
            expect(() => {
                parseScript('([a]) => { const a = 0; }')
            }).to.throw();
        });
    
        it('should fail on "function* g(){ (...{a = yield}) => 0; }', () => {
            expect(() => {
                parseScript('function* g(){ (...{a = yield}) => 0; }')
            }).to.not.throw();
        });
        it('should fail on "function* g(){ (...{a = yield}) => 0; }', () => {
            expect(() => {
                parseScript('function* g(){ (...{a = yield}) => 0; }')
            }).to.not.throw();
        });
        it('should fail on "function* g(){ (...{a = yield}) => 0; }', () => {
            expect(() => {
                parseScript('function* g(){ (...{a = yield}) => 0; }')
            }).to.not.throw();
        });
    
        it('should fail on "let foo = 1; { var foo = 1; }"', () => {
            expect(() => {
                parseScript('let foo = 1; { var foo = 1; }')
            }).to.not.throw();
        });
    
        it('should fail on "try {} catch (foo) { let foo; }"', () => {
            expect(() => {
                parseScript('try {} catch (foo) { let foo; }')
            }).to.throw();
        });
    
        it('should fail on "try {} catch ([foo]) { var foo; }"', () => {
            expect(() => {
                parseScript('try {} catch ([foo]) { var foo; }')
            }).to.not.throw();
        });
        it('should fail on ""use strict"; arguments = 0;"', () => {
            expect(() => {
                parseScript('"use strict"; arguments = 0;')
            }).to.throw();
        });
    
        it('should fail on "({ a(eval) { "use strict"; } });"', () => {
            expect(() => {
                parseScript('function* a(){ !function*(b = yield c){} }');
            }).to.throw();
        });
        it('should fail on "while (true) { continue a; }"', () => {
            expect(() => {
                parseScript('while (true) { continue a; }');
            }).to.throw();
        });
    });