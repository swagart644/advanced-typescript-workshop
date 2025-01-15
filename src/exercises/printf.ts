import { Expect, Equal } from 'type-testing';

// complexity: 9
// tags: conditional-types, index-accessed, template-literals, infer, recursion

// There is a function in C language: printf. This function allows us to print
// something with formatting. Like this:
//
// @example
// ```
// printf("The result is %d.", 42);
// ```
//
// Update `ParsePrintFormat` so that it parses the input string and extracts the
// format placeholders like %d and %f. For example, if the input string is
// "The result is %d.", the parsed result is a tuple ['dec'].

type ControlsMap = {
  c: 'char';
  s: 'string';
  d: 'dec';
  o: 'oct';
  h: 'hex';
  f: 'float';
  p: 'pointer';
};

type ParsePrintFormat<S extends string, R extends string[] = []> = S extends `${string}%${infer Control}${infer Rest}`
  ? Control extends keyof ControlsMap
    ? ParsePrintFormat<Rest, [...R, ControlsMap[Control]]>
    : ParsePrintFormat<Rest, R>
  : R;

type cases = [
  Expect<Equal<ParsePrintFormat<''>, []>>,
  Expect<Equal<ParsePrintFormat<'Any string.'>, []>>,
  Expect<Equal<ParsePrintFormat<'The result is %d.'>, ['dec']>>,
  Expect<Equal<ParsePrintFormat<'The result is %%d.'>, []>>,
  Expect<Equal<ParsePrintFormat<'The result is %%%d.'>, ['dec']>>,
  Expect<Equal<ParsePrintFormat<'The result is %f.'>, ['float']>>,
  Expect<Equal<ParsePrintFormat<'The result is %h.'>, ['hex']>>,
  Expect<Equal<ParsePrintFormat<'The result is %q.'>, []>>,
  Expect<Equal<ParsePrintFormat<'Hello %s: score is %d.'>, ['string', 'dec']>>,
  Expect<Equal<ParsePrintFormat<'The result is %'>, []>>,
];
