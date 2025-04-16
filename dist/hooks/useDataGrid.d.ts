import { BaseRecord, CrudFilters, HttpError, Pagination, Prettify, UseUpdateProps, useTableProps as useTablePropsCore, useTableReturnType as useTableReturnTypeCore, CreateResponse, UpdateResponse, BaseKey } from '@refinedev/core';
import { DataGridProps, GridFilterModel, GridRowId, GridRowModesModel, GridEventListener, GridCellParams, MuiEvent } from '@mui/x-data-grid';
export type RowSelectionState = Record<string, boolean>;
export type FieldType = string;
export interface BaseFieldDef<T = any> {
    header?: string | (() => React.ReactNode);
    footer?: string | ((props: any) => React.ReactNode);
    meta?: Record<string, any>;
    enableSorting?: boolean;
    enableFiltering?: boolean;
    cell?: (info: {
        getValue: () => T;
        row: any;
        table: any;
    }) => React.ReactNode;
    filterFn?: string | ((value: T, filter: any) => boolean);
    sortingFn?: string | ((rowA: any, rowB: any, columnId: string) => number);
}
export interface AccessorFieldDef<TValue = any> extends BaseFieldDef<TValue> {
    id?: string;
    type: FieldType;
    required?: boolean;
    default?: TValue | (() => TValue | Promise<TValue>);
    validate?: (value: TValue) => boolean | string | Promise<boolean | string>;
    transform?: (value: TValue) => TValue | Promise<TValue>;
}
export interface AccessorKeyFieldDef<TData extends BaseRecord = BaseRecord, TValue = any> extends AccessorFieldDef<TValue> {
    accessorKey: keyof TData & string;
}
export interface AccessorFnFieldDef<TData extends BaseRecord = BaseRecord, TValue = any> extends AccessorFieldDef<TValue> {
    accessorFn: (row: TData) => TValue;
    id: string;
}
export interface DisplayFieldDef<TData extends BaseRecord = BaseRecord> extends BaseFieldDef {
    id: string;
    type?: 'display';
    cell: (info: {
        row: TData;
        table: any;
    }) => React.ReactNode;
}
export interface GroupFieldDef<TData extends BaseRecord = BaseRecord> extends BaseFieldDef {
    id?: string;
    type?: 'group';
    header: string | (() => React.ReactNode);
    fields: FieldDef<TData>[];
}
export type FieldDef<TData extends BaseRecord = BaseRecord> = AccessorKeyFieldDef<TData> | AccessorFnFieldDef<TData> | DisplayFieldDef<TData> | GroupFieldDef<TData>;
export interface ResourceOperations<TData extends BaseRecord = BaseRecord> {
    create?: {
        defaults?: () => Partial<TData> | Promise<Partial<TData>>;
        beforeCreate?: (data: Partial<TData>) => Partial<TData> | Promise<Partial<TData>>;
        afterCreate?: (data: CreateResponse<TData>) => TData | Promise<TData>;
    };
    update?: {
        beforeUpdate?: (data: Partial<TData>, original: TData) => Partial<TData> | Promise<Partial<TData>>;
        afterUpdate?: (data: UpdateResponse<TData>, original: TData) => TData | Promise<TData>;
    };
    delete?: {
        beforeDelete?: (ids: string[]) => string[] | Promise<string[]>;
        afterDelete?: (ids: string[]) => void | Promise<void>;
    };
    list?: {
        transform?: (data: TData[]) => TData[] | Promise<TData[]>;
    };
    getOne?: {
        transform?: (data: TData) => TData | Promise<TData>;
    };
    modifySchema?: (schema: ResourceSchema<TData>) => ResourceSchema<TData>;
}
export interface ResourceSchema<TData extends BaseRecord = BaseRecord> {
    fields: FieldDef<TData>[];
    operations?: ResourceOperations<TData>;
    initialValues?: Partial<TData>;
    meta?: Record<string, any>;
    getId?: (resource: Partial<TData>) => BaseKey | Promise<BaseKey>;
}
export declare function createSchemaHelper<TData extends BaseRecord = BaseRecord>(): {
    accessor: <TValue extends unknown = any>(accessorKey: keyof TData & string, options?: Omit<AccessorKeyFieldDef<TData, TValue>, "accessorKey">) => AccessorKeyFieldDef<TData, TValue>;
    accessorFn: <TValue extends unknown = any>(accessorFn: (row: TData) => TValue, options: Omit<AccessorFnFieldDef<TData, TValue>, "accessorFn">) => AccessorFnFieldDef<TData, TValue>;
    display: (options: Omit<DisplayFieldDef<TData>, "type">) => DisplayFieldDef<TData>;
    group: (options: Omit<GroupFieldDef<TData>, "type">) => GroupFieldDef<TData>;
};
export declare function getFieldValue<TData extends BaseRecord = BaseRecord, TValue = any>(field: FieldDef<TData>, row: TData): TValue | undefined;
export declare function getAllAccessorFields<TData extends BaseRecord = BaseRecord>(fields: FieldDef<TData>[]): (AccessorKeyFieldDef<TData> | AccessorFnFieldDef<TData>)[];
type DataGridPropsOverride = Omit<DataGridProps, "onFilterModelChange"> & {
    onFilterModelChange: (model: GridFilterModel) => void;
};
type DataGridPropsType = Required<Pick<DataGridPropsOverride, "rows" | "loading" | "rowCount" | "sortingMode" | "sortModel" | "onSortModelChange" | "filterMode" | "onFilterModelChange" | "disableRowSelectionOnClick" | "onStateChange" | "paginationMode">> & Pick<DataGridProps, "paginationModel" | "onPaginationModelChange" | "filterModel" | "processRowUpdate" | "checkboxSelection" | "onRowSelectionModelChange" | "rowSelectionModel" | "editMode" | "rowModesModel" | "onRowModesModelChange" | "onRowEditStop" | "onCellDoubleClick">;
export type UseDataGridProps<TQueryFnData, TError extends HttpError, TSearchVariables, TData extends BaseRecord> = Omit<useTablePropsCore<TQueryFnData, TError, TData>, "pagination" | "filters"> & {
    onSearch?: (data: TSearchVariables) => CrudFilters | Promise<CrudFilters>;
    pagination?: Prettify<Omit<Pagination, "pageSize"> & {
        /**
         * Initial number of items per page
         * @default 25
         */
        pageSize?: number;
    }>;
    filters?: Prettify<Omit<NonNullable<useTablePropsCore<TQueryFnData, TError, TData>["filters"]>, "defaultBehavior"> & {
        /**
         * Default behavior of the `setFilters` function
         * @default "replace"
         */
        defaultBehavior?: "replace" | "merge";
        /**
         * Debounce delay for filter operations in milliseconds
         * @default 500
         */
        debounceDelay?: number;
    }>;
    editable?: boolean;
    selectable?: boolean;
    rowSelection?: RowSelectionState;
    onRowSelectionChange?: (rowSelection: RowSelectionState) => void;
    enableRowSelection?: boolean | ((row: TData) => boolean);
    updateMutationOptions?: UseUpdateProps<TData, TError, TData>["mutationOptions"];
    deleteMutationOptions?: {
        successNotification?: any;
        errorNotification?: any;
        meta?: any;
    };
    createNewRow?: () => Promise<Partial<TData>>;
    schema?: ResourceSchema<TData>;
};
export type UseDataGridReturnType<TData extends BaseRecord = BaseRecord, TError extends HttpError = HttpError, TSearchVariables = unknown> = useTableReturnTypeCore<TData, TError> & {
    dataGridProps: DataGridPropsType;
    search: (value: TSearchVariables) => Promise<void>;
    rowSelection: RowSelectionState;
    setRowSelection: (updater: RowSelectionState | ((prev: RowSelectionState) => RowSelectionState)) => void;
    getSelectedRowModel: () => {
        rows: TData[];
    };
    getIsAllRowsSelected: () => boolean;
    getIsSomeRowsSelected: () => boolean;
    toggleAllRowsSelected: (value?: boolean) => void;
    deleteSelectedItems: () => void;
    rowModesModel: GridRowModesModel;
    setRowModesModel: React.Dispatch<React.SetStateAction<GridRowModesModel>>;
    addNewRow: () => Promise<void>;
    handleRowEditStop: GridEventListener<'rowEditStop'>;
    handleEditClick: (id: GridRowId) => () => void;
    handleSaveClick: (id: GridRowId) => () => void;
    handleDeleteClick: (id: GridRowId) => () => void;
    handleCancelClick: (id: GridRowId) => () => void;
    handleCellDoubleClick: (params: GridCellParams, event: MuiEvent<React.MouseEvent>) => void;
    isInEditMode: boolean;
    hasSelected: boolean;
    schema?: ResourceSchema<TData>;
};
/**
 * By using useDataGrid, you are able to get properties that are compatible with
 * Material UI {@link https://mui.com/x/react-data-grid/ `<DataGrid>`} component.
 * All features such as sorting, filtering and pagination comes as out of box.
 *
 * @see {@link https://refine.dev/docs/api-reference/mui/hooks/useDataGrid/} for more details.
 *
 * @typeParam TQueryFnData - Result data returned by the query function. Extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#httperror `HttpError`}
 * @typeParam TSearchVariables - Values for search params
 * @typeParam TData - Result data returned by the `select` function. Extends {@link https://refine.dev/docs/api-reference/core/interfaceReferences#baserecord `BaseRecord`}. Defaults to `TQueryFnData`
 *
 */
export declare function useDataGrid<TQueryFnData extends BaseRecord = BaseRecord, TError extends HttpError = HttpError, TSearchVariables = unknown, TData extends BaseRecord = TQueryFnData>({ onSearch: onSearchProp, initialCurrent, initialPageSize, pagination, hasPagination, initialSorter, permanentSorter, defaultSetFilterBehavior, initialFilter, permanentFilter, filters: filtersFromProp, sorters: sortersFromProp, syncWithLocation: syncWithLocationProp, resource: resourceFromProp, successNotification, errorNotification, queryOptions, liveMode: liveModeFromProp, onLiveEvent, liveParams, meta, metaData, dataProviderName, overtimeOptions, editable, selectable, rowSelection: externalRowSelection, onRowSelectionChange, enableRowSelection, updateMutationOptions, deleteMutationOptions, schema, }?: UseDataGridProps<TQueryFnData, TError, TSearchVariables, TData>): UseDataGridReturnType<TData, TError, TSearchVariables>;
export {};
