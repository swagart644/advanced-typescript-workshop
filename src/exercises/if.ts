import { Expect, Equal } from 'type-testing';

// complexity: 1
// tags: conditional-types, distribution, generics-with-constraints

// Implement the util type If<C, T, F> which accepts condition C, a truthy value
// T, and a falsy value F. C is expected to be either true or false while T and
// F can be any type.

type If<C extends boolean, T, F> = C extends true ? T : F;

type cases = [
  Expect<Equal<If<true, 'a', 'b'>, 'a'>>,
  Expect<Equal<If<false, 'a', 2>, 2>>,
  Expect<Equal<If<boolean, 'a', 2>, 'a' | 2>>,
];

// @ts-expect-error
type error = If<null, 'a', 'b'>;
