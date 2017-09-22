export const enum Context {
    None                   = 0,
    Module                 = 1 << 0,   // If node was parse in module code
    Strict                 = 1 << 1,   // If node was parse in strict mode
    Expression             = 1 << 2,   // If node was parse in an expression context
    Statement              = 1 << 3,   // If node was parsed in a statement context
    JSXChild               = 1 << 4,   // If node was parsed in a JSX context and has JSX children
    Assignment             = 1 << 5,   // If node was parsed in a destructuring assignment context
    HasConstructor         = 1 << 6,   // If node was parsed inside Class and allow super
    SimpleArrow            = 1 << 7,   // If node was parsed in a arrow context as plain identifier
    Arrow                  = 1 << 8,   // If node was parsed in a arrow context
    AsyncArrow             = 1 << 9,   // If node was parsed in a async arrow context
    AsyncFunctionBody      = 1 << 10,  // If node was parsed in a async arrow body context
    Concisebody            = 1 << 11,  // If node was parsed in a arrow body context with concise body
    Parenthesis            = 1 << 12,  // If node was parsed in a parenthesized expression context
    Await                  = 1 << 13,  // If node was parsed in the 'await' context created when parsing an async function
    Yield                  = 1 << 14,  // If node was parsed in the 'yield' context created when parsing a generator
    AllowIn                = 1 << 15,  // If node was parsed in a context where 'in-expressions' are allowed
    ForStatement           = 1 << 16,  // If node was parsed in a for / for - in / for -of context
    AnnexB                 = 1 << 17,  // If node was parsed in the 'if statement' with the AnnexB semtantic
    OptionalIdentifier     = 1 << 18,  // Optional identifier for export of either anonymous class or function declaration
    IfClause               = 1 << 19,  // If node was parsed in a if statement (early error related)
    Super                  = 1 << 20,  // If super are required
    DynamicImport          = 1 << 21,  // If node was parsed in dynamic import context (ESNext feature)
    NewExpression          = 1 << 22,  // If node was parsed in the 'New' expression
    Method                 = 1 << 23,  // If node was parsed in a object method context
    Binding                = 1 << 24,  // If node was parsed in a binding context
    IfStatement            = 1 << 25,  // If node was parsed in a binding context
    RequireInitializer     = 1 << 26,  // If node was parsed in a context where a variable declaration initializer are required (export)
    DisallowDestructuring  = 1 << 27,  // If node was parsed in a context where destructuring are disallowed
    Const                  = 1 << 28,  // Variable declaration
    Let                    = 1 << 29,  // Variable declaration
    Var                    = 1 << 20,  // Variable declaration
    
    // An Lexical declaration can be either 'const¨' or 'let
    Lexical = Let | Const,

    // Error tracker related
    AwaitOrYield = Await | Yield
}

export const enum Flags {
    None                         = 0,
    LineTerminator               = 1 << 0,
    JSX                          = 1 << 1,  // Allows JSX extension
    InFunctionBody               = 1 << 2,  // If node was parsed in a function body
    HasRest                      = 1 << 3,
    HasPrototype                 = 1 << 4,
    HasMemberExpression          = 1 << 5,  // If the program contain a member expression - '([a.a]) => 42'
    HasReservedWord              = 1 << 6,  // If the program contains a reserved word
    HasEvalArgInParam            = 1 << 7,  // If the source contain either 'eval' or 'arguments'
    HasExtendedUnicodeEscape     = 1 << 8,
    NonSimpleParameter           = 1 << 9,
    AllowSuper                   = 1 << 10,
    ArgumentList                 = 1 << 11,
    BlockStatement               = 1 << 12,
    Break                        = 1 << 13,
    TopLevel                     = 1 << 14,
    Continue                     = 1 << 15,
    AllowConstructorWithSupoer   = 1 << 16,
    Arrow                        = 1 << 17, // If node was parsed in the 'arrow' context
    AsyncArrow                   = 1 << 18, // If node was parsed in the 'async' context

    /* Options */
    OptionsRanges                = 1 << 19,
    OptionsLoc                   = 1 << 20,
    OptionsSource                = 1 << 21,
    OptionsJSX                   = 1 << 22,
    OptionsTS                    = 1 << 23,
    OptionsRaw                   = 1 << 24,
    OptionsNext                  = 1 << 25,
    OptionsOnComment             = 1 << 26,
    OptionsOnToken               = 1 << 27,
    OptionsV8                    = 1 << 28
}

export const enum IterationState {
    None                = 0,
    Var                 = 1 << 0,  // Variable declaration
    Let                 = 1 << 1,  // Variable declaration
    Const               = 1 << 2,  // Variable declaration
    Await               = 1 << 3,  // If node was parsed in the 'await' context (Asynchronous Iteration)
    Variable = Var | Let | Const
}

// Shared bitmasks used by both object expression and class declaration / expression
export const enum ObjectFlags {
    None            = 0,
    Getter          = 1 << 0,
    Setter          = 1 << 1,
    Static          = 1 << 2,
    Constructor     = 1 << 3,
    Async           = 1 << 4,
    Prototype       = 1 << 5,
    Generator       = 1 << 6,
    Computed        = 1 << 7,
    Super           = 1 << 8,
    Method          = 1 << 9,

    // Modifier in this case is either 'get or 'set'. 'static' and others are excluded from the community
    Modifier = Getter | Setter,
    // Special
    Special = Modifier | Generator | Async
}

export const enum ParenthesizedState {
    None           = 0,
    Reserved       = 1 << 1,
    WrappedInParen = 1 << 2,
    TrailingComma  = 1 << 3,
}

export const enum ScopeMasks {
    Shadowable = 0x1,
    NonShadowable = 0x2,
}

export const enum AsyncState {
    None,
    Parenthesized,
    UnParenthesized,
    Function
}

// Regular expression scanning
export const enum Preparse {
    Empty = 0,
    Escape = 0x1,
    Class = 0x2,
}

// Spidermonkey values
export const enum RegExpFlag {
    None = 0x00,
    Global = 0x01,
    Unicode = 0x02,
    Sticky = 0x04,
    Multiline = 0x08,
    IgnoreCase = 0x10,
    DotAll = 0x20,
}