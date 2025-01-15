// complexity: 3
// tags: learning-generics, utility-types, generics-with-constraints

// Update the CRUD<T> type to support any instance type that has `id` property
// such as `Cat` or `Dog`.

interface Dog {
  id: number;
  barks: boolean;
}

interface Cat {
  id: number;
  meows: boolean;
}

type CRUD<T extends { id: unknown }> = {
  getOne: (id: number) => Promise<T>;
  getAll: () => Promise<Array<T>>;
  create: (partialEntity: Omit<T, 'id'>) => Promise<Omit<T, 'id'>>;
  update: (id: number, updated: Partial<Omit<T, 'id'>>) => Promise<T>;
  delete: (id: number) => Promise<void>;
};

const getCRUD = <T extends { id: unknown }>() => {
  return {} as CRUD<T>;
};

/**
 * Update CRUD type so that there are no type errors
 */
const main = async () => {
  const dogCRUD = getCRUD<Dog>();

  await dogCRUD.create({ barks: true });
  const dog = await dogCRUD.getOne(42);
  if (dog.barks) {
    await dogCRUD.update(42, { barks: false });
  }

  const catCRUD = getCRUD<Cat>();
  await catCRUD.create({ meows: true });
  const cat = await catCRUD.getOne(42);
  if (cat.meows) {
    await catCRUD.update(42, { meows: false });
  }

  await catCRUD.update(42, {});
  await catCRUD.delete(42);
};
