import { getKeys } from './keys';
import * as strapi from './strapi-types';

export const mapItem2 = <TAttrs extends strapi.TAttrsBase>(item: strapi.Item<TAttrs>) => {
  return ({
  ...item.attributes,
  id: item.id,
});
}

export const mapItem = <TAttrs extends strapi.TAttrsBase>(item: strapi.Item<TAttrs>) => {
  const result = { id: item.id } as TAttrs;

  const attributes = item.attributes;

  getKeys(attributes).forEach((key) => {
    const value = attributes[key] as any;
    const saveKey = key as keyof TAttrs;

    if (value?.data?.id) {
      result[saveKey] = mapItem(value.data) as any;
    } else if (Array.isArray(value?.data)) {
      result[saveKey] = value.data.map((inner: strapi.Item<TAttrs>) => mapItem(inner));
    } else {
      result[saveKey] = value;
    }
  });

  return result;
}

export function getMappedResponse<TAttrs extends strapi.TAttrsBase>(response: strapi.SingleResponse<TAttrs>): TAttrs;
export function getMappedResponse<TAttrs extends strapi.TAttrsBase>(response: strapi.CollectionResponse<TAttrs>): TAttrs[];
export function getMappedResponse<TAttrs extends strapi.TAttrsBase>(response: strapi.SingleResponse<TAttrs> | strapi.CollectionResponse<TAttrs>) {
  if (Array.isArray(response.data)) {
    return response.data.map((item) => mapItem<TAttrs>(item));
  }

  return mapItem(response.data);
};