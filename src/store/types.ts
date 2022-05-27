export enum SortOrder {
  None = 'None',
  Asc = 'Asc',
  Desc = 'Desc',
}

export type WithSorting<T> = {
  data: Array<T>;
  sortOrder: SortOrder;
  sortBy: string;
};
