import { Equal, Expect } from 'type-testing';

// complexity: 1
// tags: conditional-types, index-accessed, generics-with-constraints, infer, learning-arrays, learning-generics

// For given a tuple, update the `Length` type such that it returns the length.

type Tesla = ['tesla', 'model 3', 'model X', 'model Y'];
type SpaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT'];

type Length<TArray extends any[]> = TArray extends []
  ? 0 // If the tuple is empty, return 0
  : TArray extends [any, ...infer Rest] // else if it has things infer type and recurse
    ? TArray['length'] // in that case you know it's got something so get length which is built in
    : never; // something fucked happened

type cases = [Expect<Equal<Length<Tesla>, 4>>, Expect<Equal<Length<SpaceX>, 5>>];
