import { Equal, Expect } from 'type-testing';

// complexity: 1
// tags: learning-generics, generics-with-constraints, learning-arrays

// Update `Concat` to implement the JavaScript Array.concat function in the type
// system. A type takes the two arguments. The output should be a new array that
// includes inputs in ltr order.

type Concat<A1 extends number[], A2 extends number[]> = [...A1, ...A2];

type cases = [Expect<Equal<Concat<[1], [2]>, [1, 2]>>];
