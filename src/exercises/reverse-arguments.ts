import { Expect, Equal } from 'type-testing';

// complexity: 8
// tags: utility-types, learning-arrays, conditional-types, infer, recursion, generics-with-constraints

// Implement the type version of lodash's _.flip.
//
// Type FlipArguments<T> requires function type T and returns a new function type which has the same return type of T but reversed parameters.
// @example
// ```
// type Flipped = FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void>
// //   ^? (arg0: boolean, arg1: number, arg2: string) => void
// ```

type ReverseArray<Array, Reversed extends any[] = []> = Array extends [infer First, ...infer Rest]
  ? ReverseArray<Rest, [First, ...Reversed]>
  : Reversed;
//^?
type Check = ReverseArray<[1, 2, 3]>;
//   ^?

type FlipArguments<T extends (...args: any) => any> = T extends (...args: infer Args) => infer Return
  ? (...reversed: ReverseArray<Args>) => Return
  : never;

type cases = [
  Expect<Equal<FlipArguments<() => boolean>, () => boolean>>,
  Expect<Equal<FlipArguments<(foo: string) => number>, (foo: string) => number>>,
  Expect<
    Equal<
      FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void>,
      (arg0: boolean, arg1: number, arg2: string) => void
    >
  >,
];

type errors = [
  // @ts-expect-error
  FlipArguments<'string'>,
  // @ts-expect-error
  FlipArguments<{ key: 'value' }>,
  // @ts-expect-error
  FlipArguments<['apple', 'banana', 100, { a: 1 }]>,
  // @ts-expect-error
  FlipArguments<null | undefined>,
];
