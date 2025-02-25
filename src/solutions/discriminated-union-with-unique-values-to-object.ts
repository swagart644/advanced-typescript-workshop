import { Equal, Expect } from 'type-testing';

// source: https://github.com/total-typescript/type-transformations-workshop/blob/main/src/06-challenges/39-discriminated-union-with-unique-values-to-object.solution.ts

// complexity: 5
// tags: mapped-types, conditional-types, index-accessed, key-remapping, infer, distribution

// Update `RoutesObject` so that each key of the object type is the route listed
// in `Route` and the value is the search object type.
//
// Hint: https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#key-remapping-via-as

type Route =
  | {
      route: '/';
      search: {
        page: string;
        perPage: string;
      };
    }
  | { route: '/about' }
  | { route: '/admin' }
  | { route: '/admin/users' };

type RoutesObject = {
  [R in Route as R['route']]: R extends { search: infer S } ? S : never;
};

type cases = [
  Expect<
    Equal<
      RoutesObject,
      {
        '/': {
          page: string;
          perPage: string;
        };
        '/about': never;
        '/admin': never;
        '/admin/users': never;
      }
    >
  >,
];
