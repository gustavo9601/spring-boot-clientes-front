import {Cliente} from "./cliente";

export interface Pagination {
  content?: Cliente[];
  pageable?: Pageable;
  last?: boolean;
  totalPages?: number;
  totalElements?: number;
  number?: number;
  size?: number;
  sort?: Sort2;
  first?: boolean;
  numberOfElements?: number;
  empty?: boolean;
}

export interface Sort {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
}

export interface Pageable {
  sort?: Sort;
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  unpaged?: boolean;
  paged?: boolean;
}

export interface Sort2 {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
}
