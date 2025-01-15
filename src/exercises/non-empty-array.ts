// complexity: 4
// tags: learning-generics, learning-arrays

// Update `makeEnum` so that the argument cannot be an empty array.

type NonEmptyArray<T> = [T, ...Array<T>];

export const makeEnum = (values: NonEmptyArray<string>) => {};

makeEnum(['a']);
makeEnum(['a', 'b', 'c']);

// @ts-expect-error
makeEnum([]);
