import { GridFilterModel, GridSortModel } from '@mui/x-data-grid';
import { CrudFilters, CrudOperators, CrudSorting } from '@refinedev/core';
export declare const transformSortModelToCrudSorting: (sortModel: GridSortModel) => CrudSorting;
export declare const transformCrudSortingToSortModel: (crudSorting: CrudSorting) => GridSortModel;
export declare const transformMuiOperatorToCrudOperator: (operatorValue?: string) => Exclude<CrudOperators, "or" | "and">;
export declare const transformFilterModelToCrudFilters: ({ items, logicOperator, }: GridFilterModel) => CrudFilters;
export declare const transformCrudOperatorToMuiOperator: (operator: CrudOperators, columnType?: string) => string;
export declare const transformCrudFiltersToFilterModel: (crudFilters: CrudFilters, columnsType?: Record<string, string>) => GridFilterModel | undefined;
