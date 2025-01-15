import { Expect, Equal } from 'type-testing';

// complexity: 1
// tags: utility-types

// Update `CommonFruits` to return the common fruit string literals between
// `Fruit` and `Citrus`.

type Fruit = 'apple' | 'banana' | 'orange';
type Citrus = 'orange' | 'lemon';

type CommonFruits = Fruit & Citrus;

type cases = [Expect<Equal<CommonFruits, 'orange'>>];
