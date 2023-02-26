import { TAttrsBase } from "./strapi-types";

export const getEntityById = <TEntity extends TAttrsBase>(entities: TEntity[], id: number): TEntity | undefined => entities.find((entity) => entity.id === id);

export const removeFromEntities = <TEntity extends TAttrsBase>(entities: TEntity[], id: number): number[] => {
  const ids: number[] = [];

  entities.forEach((entity) => {
    if (entity.id !== id) {
      ids.push(entity.id);
    }
  });

  return ids;
};

export const addToEntities = <TEntity extends TAttrsBase>(entities: TEntity[], id: number): number[] => {
  const ids = entities.map((entity) => entity.id);
  ids.push(id);
  return ids;
};