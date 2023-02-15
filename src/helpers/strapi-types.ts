interface BaseResponse {
  meta: Meta;
}

export interface CollectionResponse<TAttrs extends TAttrsBase> extends BaseResponse {
  data: Item<TAttrs>[];
}

export interface SingleResponse<TAttrs extends TAttrsBase> extends BaseResponse {
  data: Item<TAttrs>;
}

export interface Meta {
  pagination: MetaPagination;
}

export interface MetaPagination {
  page: number;
  pageCount: number;
  pageSize: number;
  total: 1;
}

export type TAttrsBase = Record<string, unknown>;

export interface Item<TAttrs extends TAttrsBase> {
  id: number;
  attributes: TAttrs;
}