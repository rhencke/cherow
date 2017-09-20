## Benchmarks

These are benchmarks run on my own computer. Please note that this may vary from computer to 
computerm and that these results are for the technically interested only.

### Parsing benchmarks

**Acorn**

- Cherow  - 0.006823271009038801
- Esprima - 0.02174614517514124
- Acorn   - 0.01266039398478261

**Angular 1.6**

- Cherow  - 0.031341576872727275
- Esprima - 0.07751636002702703
- Acorn   - 0.07838368188571429

**Bluebird**

- Cherow  - 0.00913484195991561
- Esprima - 0.024642841666666665
- Acorn   - 0.013248430940789474

 **Esprima**

- Cherow   - 0.012357186649275362
- Acorn    - 0.024930396852201258
- Esprima  - 0.035908398918367355

**Rx**

- Cherow  - 0.018313725225352115
- Esprima - 0.04795394183333335
- Acorn   - 0.05144528125675676

 **TypeScript**

- Cherow  - 0.19312929866666664
- Exprima - 0.35673469683333336
- Acorn   - 0.4191848481

### Micro benchmarks

#### Async functions

**async a => b**

- Cherow  x 701,504 ops/sec ±3.56% (86 runs sampled)
- Esprima x 267,482 ops/sec ±2.53% (82 runs sampled)
- Acorn x 141,130 ops/sec ±0.87% (89 runs sampled)
- Fastest is Cherow


**async () => {}**

- Cherow x 1,145,926 ops/sec ±2.84% (86 runs sampled)
- Esprima x 264,543 ops/sec ±4.38% (89 runs sampled)
- Acorn x 141,130 ops/sec ±0.87% (89 runs sampled)
- Fastest is Cherow

**async (a, b, c) => {}**

- Cherow x 472,369 ops/sec ±4.66% (89 runs sampled)
- Esprima x 126,040 ops/sec ±2.68% (89 runs sampled)
- Acorn x 89,031 ops/sec ±4.24% (85 runs sampled)
- Fastest is Cherow

#### Arrow functions

**() => abc**

- Cherow x 1,518,541 ops/sec ±0.84% (96 runs sampled)
- Esprima x 410,559 ops/sec ±1.03% (89 runs sampled)
- Acorn x 141,130 ops/sec ±0.87% (89 runs sampled)
- Fastest is Cherow

**abc => def**
- Cherow x 1,055,154 ops/sec ±0.82% (95 runs sampled)
- Esprima x 349,525 ops/sec ±0.83% (93 runs sampled)
- Acorn x 132,400 ops/sec ±0.98% (89 runs sampled)
- Fastest is Cherow

**abc => {}**
- Cherow x 1,524,949 ops/sec ±0.93% (96 runs sampled)
- Esprima x 343,606 ops/sec ±0.37% (95 runs sampled)
- Acorn x 134,506 ops/sec ±0.98% (94 runs sampled)
- Fastest is Cherow


#### Class

**class A{}**

- Cherow x 1,345,147 ops/sec ±0.37% (92 runs sampled)
- Esprima x 464,939 ops/sec ±0.79% (95 runs sampled)
- Acorn x 149,182 ops/sec ±0.32% (96 runs sampled)
- Fastest is Cherow

**a = (class A{})**

- Cherow x 913,747 ops/sec ±0.55% (89 runs sampled)
- Esprima x 251,521 ops/sec ±1.28% (90 runs sampled)
- Acorn x 122,465 ops/sec ±0.36% (94 runs sampled)
- Fastest is Cherow

#### Labelled statement

**a: function b() {}**
- Cherow x 480,420 ops/sec ±0.33% (94 runs sampled)
- Esprima x 241,643 ops/sec ±2.66% (89 runs sampled)
- Acorn x 89,031 ops/sec ±4.24% (85 runs sampled)
- Fastest is Cherow

#### Object literal

**{}**
- Cherow x 5,649,401 ops/sec ±0.36% (94 runs sampled)
- Esprima x 828,741 ops/sec ±0.83% (96 runs sampled)
- Acorn x 162,750 ops/sec ±0.40% (96 runs sampled)
- Fastest is Cherow


#### Template literal

**`${a}${b}`**

- Cherow x 1,157,482 ops/sec ±0.33% (95 runs sampled)
- Esprima x 185,761 ops/sec ±1.38% (87 runs sampled)
- Acorn x 115,029 ops/sec ±0.65% (89 runs sampled)
- Fastest is Cherow

#### Yield

**yield: 1;**

- Cherow x 592,534 ops/sec ±1.06% (95 runs sampled)
- Esprima x ... (**Esprima can't parse this**)
- Acorn x 122,125 ops/sec ±0.36% (93 runs sampled)
- Fastest is Cherow
