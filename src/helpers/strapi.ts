import * as strapi from './strapi-types';

export const mapItem = <TAttrs extends strapi.TAttrsBase>(item: strapi.Item<TAttrs>) => ({
  ...item.attributes,
  id: item.id,
});

export function getMappedResponse<TAttrs extends strapi.TAttrsBase>(response: strapi.SingleResponse<TAttrs>): TAttrs;
export function getMappedResponse<TAttrs extends strapi.TAttrsBase>(response: strapi.CollectionResponse<TAttrs>): TAttrs[];
export function getMappedResponse<TAttrs extends strapi.TAttrsBase>(response: strapi.SingleResponse<TAttrs> | strapi.CollectionResponse<TAttrs>) {
  if (Array.isArray(response.data)) {
    return response.data.map((item) => mapItem<TAttrs>(item));
  }

  return mapItem(response.data);
};