import {
  useUpdate,
  useLiveMode,
  pickNotDeprecated,
  useTable as useTableCore,
  type BaseRecord,
  type CrudFilters,
  type HttpError,
  type Pagination,
  type Prettify,
  type UseUpdateProps,
  type useTableProps as useTablePropsCore,
  type useTableReturnType as useTableReturnTypeCore,
  useResourceParams,
  useDeleteMany,
  useCreate,
  CreateResponse,
  UpdateResponse,
  BaseKey,
} from "@refinedev/core";
import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import debounce from "lodash/debounce";

import type {
  DataGridProps,
  GridFilterModel,
  GridSortModel,
  GridRowId,
  GridRowSelectionModel,
  GridRowModesModel,
  GridEventListener,
  GridRowsProp,
  GridCellParams,
  MuiEvent,
} from "@mui/x-data-grid";
import { GridRowModes, GridRowEditStopReasons } from "@mui/x-data-grid";

import differenceWith from "lodash/differenceWith";
import isEqual from "lodash/isEqual";

import {
  transformCrudFiltersToFilterModel,
  transformCrudSortingToSortModel,
  transformFilterModelToCrudFilters,
  transformSortModelToCrudSorting,
} from "../definitions";

// Define the RowSelectionState interface from TanStack
export type RowSelectionState = Record<string, boolean>;

// New TanStack-inspired schema system
// Basic field types
export type FieldType = string;

// Common properties for all field definitions
export interface BaseFieldDef<T = any> {
  header?: string | (() => React.ReactNode);
  footer?: string | ((props: any) => React.ReactNode);
  meta?: Record<string, any>;
  enableSorting?: boolean;
  enableFiltering?: boolean;
  cell?: (info: { getValue: () => T; row: any; table: any }) => React.ReactNode;
  filterFn?: string | ((value: T, filter: any) => boolean);
  sortingFn?: string | ((rowA: any, rowB: any, columnId: string) => number);
}

// Accessor field - similar to TanStack's accessor column
export interface AccessorFieldDef<TValue = any> extends BaseFieldDef<TValue> {
  id?: string;
  type: FieldType;
  required?: boolean;
  default?: TValue | (() => TValue | Promise<TValue>);
  validate?: (value: TValue) => boolean | string | Promise<boolean | string>;
  transform?: (value: TValue) => TValue | Promise<TValue>;
}

// Direct key accessor (object property)
export interface AccessorKeyFieldDef<TData extends BaseRecord = BaseRecord, TValue = any> extends AccessorFieldDef<TValue> {
  accessorKey: keyof TData & string;
}

// Function accessor
export interface AccessorFnFieldDef<TData extends BaseRecord = BaseRecord, TValue = any> extends AccessorFieldDef<TValue> {
  accessorFn: (row: TData) => TValue;
  id: string;
}

// Display field - similar to TanStack's display column (no data model)
export interface DisplayFieldDef<TData extends BaseRecord = BaseRecord> extends BaseFieldDef {
  id: string;
  type?: 'display';
  cell: (info: { row: TData; table: any }) => React.ReactNode;
}

// Group field - similar to TanStack's group column
export interface GroupFieldDef<TData extends BaseRecord = BaseRecord> extends BaseFieldDef {
  id?: string;
  type?: 'group';
  header: string | (() => React.ReactNode);
  fields: FieldDef<TData>[];
}

// Union type of all field definitions
export type FieldDef<TData extends BaseRecord = BaseRecord> =
  | AccessorKeyFieldDef<TData>
  | AccessorFnFieldDef<TData>
  | DisplayFieldDef<TData>
  | GroupFieldDef<TData>;

// Resource operations (lifecycle hooks)
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

// Main resource schema definition
export interface ResourceSchema<TData extends BaseRecord = BaseRecord> {
  fields: FieldDef<TData>[];
  operations?: ResourceOperations<TData>;
  initialValues?: Partial<TData>;
  meta?: Record<string, any>;
  getId?: (resource: Partial<TData>) => BaseKey | Promise<BaseKey>;
}

// Schema helper function (similar to TanStack's columnHelper)
export function createSchemaHelper<TData extends BaseRecord = BaseRecord>() {
  return {
    // Create an accessor field with direct key
    accessor: <TValue extends any = any>(
      accessorKey: keyof TData & string,
      options?: Omit<AccessorKeyFieldDef<TData, TValue>, 'accessorKey'>
    ): AccessorKeyFieldDef<TData, TValue> => ({
      accessorKey,
      ...options,
      type: options?.type || 'string',
    }),

    // Create an accessor field with a function
    accessorFn: <TValue extends any = any>(
      accessorFn: (row: TData) => TValue,
      options: Omit<AccessorFnFieldDef<TData, TValue>, 'accessorFn'>
    ): AccessorFnFieldDef<TData, TValue> => ({
      accessorFn,
      ...options,
      type: options.type || 'string',
    }),

    // Create a display-only field (no data model)
    display: (
      options: Omit<DisplayFieldDef<TData>, 'type'>
    ): DisplayFieldDef<TData> => ({
      ...options,
      type: 'display',
    }),

    // Create a group field
    group: (
      options: Omit<GroupFieldDef<TData>, 'type'>
    ): GroupFieldDef<TData> => ({
      ...options,
      type: 'group',
    }),
  };
}

// Helper function to access a value using accessorKey or accessorFn
export function getFieldValue<TData extends BaseRecord = BaseRecord, TValue = any>(
  field: FieldDef<TData>,
  row: TData
): TValue | undefined {
  if ('accessorKey' in field) {
    return row[field.accessorKey] as TValue;
  } else if ('accessorFn' in field) {
    return field.accessorFn(row);
  } else if ('fields' in field && field.fields.length > 0) {
    // For group fields, try to get first child's value
    const firstChild = field.fields[0];
    return getFieldValue<TData, TValue>(firstChild, row);
  }
  return undefined;
}

// Function to get all accessor fields (flattening groups)
export function getAllAccessorFields<TData extends BaseRecord = BaseRecord>(
  fields: FieldDef<TData>[]
): (AccessorKeyFieldDef<TData> | AccessorFnFieldDef<TData>)[] {
  return fields.flatMap(field => {
    if ('fields' in field) {
      return getAllAccessorFields(field.fields);
    } else if ('accessorKey' in field || 'accessorFn' in field) {
      return [field as AccessorKeyFieldDef<TData> | AccessorFnFieldDef<TData>];
    }
    return [];
  });
}

type DataGridPropsOverride = Omit<DataGridProps, "onFilterModelChange"> & {
  onFilterModelChange: (model: GridFilterModel) => void;
};

type DataGridPropsType = Required<
  Pick<
    DataGridPropsOverride,
    | "rows"
    | "loading"
    | "rowCount"
    | "sortingMode"
    | "sortModel"
    | "onSortModelChange"
    | "filterMode"
    | "onFilterModelChange"
    | "disableRowSelectionOnClick"
    | "onStateChange"
    | "paginationMode"
  >
> &
  Pick<
    DataGridProps,
    | "paginationModel"
    | "onPaginationModelChange"
    | "filterModel"
    | "processRowUpdate"
    | "checkboxSelection"
    | "onRowSelectionModelChange"
    | "rowSelectionModel"
    | "editMode"
    | "rowModesModel"
    | "onRowModesModelChange"
    | "onRowEditStop"
    | "onCellDoubleClick"
  >;

export type UseDataGridProps<
  TQueryFnData,
  TError extends HttpError,
  TSearchVariables,
  TData extends BaseRecord,
> = Omit<
  useTablePropsCore<TQueryFnData, TError, TData>,
  "pagination" | "filters"
> & {
  onSearch?: (data: TSearchVariables) => CrudFilters | Promise<CrudFilters>;
  pagination?: Prettify<
    Omit<Pagination, "pageSize"> & {
      /**
       * Initial number of items per page
       * @default 25
       */
      pageSize?: number;
    }
  >;
  filters?: Prettify<
    Omit<
      NonNullable<useTablePropsCore<TQueryFnData, TError, TData>["filters"]>,
      "defaultBehavior"
    > & {
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
    }
  >;
  editable?: boolean;
  selectable?: boolean;
  rowSelection?: RowSelectionState;
  onRowSelectionChange?: (rowSelection: RowSelectionState) => void;
  enableRowSelection?: boolean | ((row: TData) => boolean);
  updateMutationOptions?: UseUpdateProps<
    TData,
    TError,
    TData
  >["mutationOptions"];
  deleteMutationOptions?: {
    successNotification?: any;
    errorNotification?: any;
    meta?: any;
  };
  createNewRow?: () => Promise<Partial<TData>>;
  schema?: ResourceSchema<TData>;
};

export type UseDataGridReturnType<
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TSearchVariables = unknown,
> = useTableReturnTypeCore<TData, TError> & {
  dataGridProps: DataGridPropsType;
  search: (value: TSearchVariables) => Promise<void>;
  rowSelection: RowSelectionState;
  setRowSelection: (updater: RowSelectionState | ((prev: RowSelectionState) => RowSelectionState)) => void;
  getSelectedRowModel: () => { rows: TData[] };
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

export function useDataGrid<
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TSearchVariables = unknown,
  TData extends BaseRecord = TQueryFnData,
>({
  onSearch: onSearchProp,
  initialCurrent,
  initialPageSize = 25,
  pagination,
  hasPagination = true,
  initialSorter,
  permanentSorter,
  defaultSetFilterBehavior = "replace",
  initialFilter,
  permanentFilter,
  filters: filtersFromProp,
  sorters: sortersFromProp,
  syncWithLocation: syncWithLocationProp,
  resource: resourceFromProp,
  successNotification,
  errorNotification,
  queryOptions,
  liveMode: liveModeFromProp,
  onLiveEvent,
  liveParams,
  meta,
  metaData,
  dataProviderName,
  overtimeOptions,
  editable = false,
  selectable = false,
  rowSelection: externalRowSelection,
  onRowSelectionChange,
  enableRowSelection = true,
  updateMutationOptions,
  deleteMutationOptions,
  schema,
}: UseDataGridProps<
  TQueryFnData,
  TError,
  TSearchVariables,
  TData
> = {}): UseDataGridReturnType<TData, TError, TSearchVariables> {
  const liveMode = useLiveMode(liveModeFromProp);

  const columnsTypes = useRef<Record<string, string>>({});

  const { identifier } = useResourceParams({ resource: resourceFromProp });

  const {
    tableQueryResult,
    tableQuery,
    current,
    setCurrent,
    pageSize,
    setPageSize,
    filters,
    setFilters,
    sorters,
    setSorters,
    sorter,
    setSorter,
    pageCount,
    createLinkForSyncWithLocation,
    overtime,
  } = useTableCore<TQueryFnData, TError, TData>({
    permanentSorter,
    permanentFilter,
    initialCurrent,
    initialPageSize,
    pagination,
    hasPagination,
    initialSorter,
    initialFilter,
    filters: filtersFromProp,
    sorters: sortersFromProp,
    syncWithLocation: syncWithLocationProp,
    defaultSetFilterBehavior,
    resource: resourceFromProp,
    successNotification,
    errorNotification,
    queryOptions,
    liveMode: liveModeFromProp,
    onLiveEvent,
    liveParams,
    meta: pickNotDeprecated(meta, metaData),
    metaData: pickNotDeprecated(meta, metaData),
    dataProviderName,
    overtimeOptions,
  });

  const [muiCrudFilters, setMuiCrudFilters] = useState<CrudFilters>(filters);
  // State for TanStack Table compatible row selection
  const [rowSelection, setRowSelection] = useState<RowSelectionState>(externalRowSelection || {});
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const clickState = useRef(true);
  
  // Track whether the grid is in edit mode
  const isInEditMode = useMemo(() => {
    return Object.values(rowModesModel).some(model => model.mode === GridRowModes.Edit);
  }, [rowModesModel]);

  // Sync with external row selection if provided
  useEffect(() => {
    if (externalRowSelection && !isEqual(externalRowSelection, rowSelection)) {
      setRowSelection(externalRowSelection);
    }
  }, [externalRowSelection]);

  // Notify external row selection changes
  useEffect(() => {
    if (onRowSelectionChange) {
      onRowSelectionChange(rowSelection);
    }
  }, [rowSelection, onRowSelectionChange]);

  const { data, isFetched, isLoading } = tableQueryResult;

  // Use useMemo for rows instead of useState to maintain stable references
  const rows = useMemo(() => {
    if (!data?.data) return [];
    
    // Apply transform from schema if available
    if (schema?.operations?.list?.transform) {
      // Since we can't use async in useMemo, handle synchronously
      try {
        const transformResult = schema.operations.list.transform(data.data as TData[]);
        // Handle both synchronous results and resolved promises
        if (transformResult instanceof Promise) {
          // For promises, we'll need to handle them outside useMemo
          // Just return the original data for now
          return data.data as GridRowsProp;
        }
        return transformResult as GridRowsProp;
      } catch (error) {
        console.error("Error transforming rows:", error);
        return data.data as GridRowsProp;
      }
    }
    
    return data.data as GridRowsProp;
  }, [data?.data, schema]);

  // For async transforms, handle them in an effect
  useEffect(() => {
    if (data?.data && schema?.operations?.list?.transform) {
      const transformPromise = Promise.resolve(schema.operations.list.transform(data.data as TData[]));
      // We don't store the result directly since we're using useMemo for rows
      // This is just to handle any side effects from the transform
      transformPromise.catch(error => {
        console.error("Error in async row transformation:", error);
      });
    }
  }, [data?.data, schema]);

  const isServerSideFilteringEnabled =
    (filtersFromProp?.mode || "server") === "server";
  const isServerSideSortingEnabled =
    (sortersFromProp?.mode || "server") === "server";
  const hasPaginationString = hasPagination === false ? "off" : "server";
  const isPaginationEnabled =
    (pagination?.mode ?? hasPaginationString) !== "off";

  const preferredPermanentSorters =
    pickNotDeprecated(sortersFromProp?.permanent, permanentSorter) ?? [];
  const preferredPermanentFilters =
    pickNotDeprecated(filtersFromProp?.permanent, permanentFilter) ?? [];

  const handlePageChange = (page: number) => {
    if (isPaginationEnabled) {
      setCurrent(page + 1);
    }
  };
  const handlePageSizeChange = (pageSize: number) => {
    if (isPaginationEnabled) {
      setPageSize(pageSize);
    }
  };

  const handleSortModelChange = (sortModel: GridSortModel) => {
    const crudSorting = transformSortModelToCrudSorting(sortModel);
    setSorters(crudSorting);
  };

  const search = async (value: TSearchVariables) => {
    if (onSearchProp) {
      const searchFilters = await onSearchProp(value);
      setMuiCrudFilters(searchFilters);
      setFilters(searchFilters.filter((f: { value: any }) => f.value !== ""));
      if (isPaginationEnabled) {
        setCurrent(1);
      }
    }
  };

  const dataGridPaginationValues = (): Pick<
    DataGridProps,
    "paginationModel" | "onPaginationModelChange"
  > &
    Required<Pick<DataGridProps, "paginationMode">> => {
    if (isPaginationEnabled) {
      return {
        paginationMode: "server" as const,
        paginationModel: {
          page: current - 1,
          pageSize,
        },
        onPaginationModelChange: (model) => {
          handlePageChange(model.page);
          handlePageSizeChange(model.pageSize);
        },
      };
    }

    return {
      paginationMode: "client" as const,
    };
  };

  const { mutate: updateMutate } = useUpdate<TData, TError, TData>({
    mutationOptions: updateMutationOptions,
  });

  const { mutate: createMutate } = useCreate<TData, TError, TData>();

  const { mutate: deleteMutate } = useDeleteMany<TData, TError>({
    mutationOptions: deleteMutationOptions,
  });

  // Helper function to get row ID consistently across the component
  const getRowIdentifier = useCallback((row: TData): string => {
    if (schema?.getId) {
      try {
        // Try to use getId synchronously if possible (for non-Promise returns)
        const id = schema.getId(row);
        // If it's not a Promise, use it directly
        if (!(id instanceof Promise)) {
          return String(id);
        }
        // If it is a Promise, we can't await here, so fall back to row.id
      } catch (error) {
        console.error("Error getting row ID:", error);
      }
      // For async operations or errors, use default ID as fallback
      return String(row.id);
    }
    return String(row.id);
  }, [schema]);

  // TanStack Table compatible row selection functions
  const getRowCanSelect = useCallback((row: TData): boolean => {
    if (typeof enableRowSelection === 'function') {
      return enableRowSelection(row);
    }
    return enableRowSelection === true;
  }, [enableRowSelection]);

  const getSelectedRowModel = useCallback((): { rows: TData[] } => {
    const selectedRows = rows.filter(row => {
      const rowId = getRowIdentifier(row as TData);
      return rowSelection[rowId];
    });
    return { rows: selectedRows as TData[] };
  }, [rowSelection, rows, getRowIdentifier]);

  const getIsAllRowsSelected = useCallback((): boolean => {
    if (rows.length === 0) return false;
    const selectableRows = rows.filter(row => getRowCanSelect(row as TData));
    const selectedCount = selectableRows.filter(row => {
      const rowId = getRowIdentifier(row as TData);
      return rowSelection[rowId];
    }).length;
    return selectableRows.length > 0 && selectedCount === selectableRows.length;
  }, [rowSelection, rows, getRowCanSelect, getRowIdentifier]);

  const getIsSomeRowsSelected = useCallback((): boolean => {
    if (rows.length === 0) return false;
    const selectedCount = rows.filter(row => {
      const rowId = getRowIdentifier(row as TData);
      return rowSelection[rowId];
    }).length;
    return selectedCount > 0 && selectedCount < rows.length;
  }, [rowSelection, rows, getRowIdentifier]);

  const toggleAllRowsSelected = useCallback((value?: boolean): void => {
    const selectAll = value ?? !getIsAllRowsSelected();

    if (selectAll) {
      const newSelection: RowSelectionState = {};
      rows.forEach(row => {
        if (getRowCanSelect(row as TData)) {
          const rowId = getRowIdentifier(row as TData);
          newSelection[rowId] = true;
        }
      });
      setRowSelection(newSelection);
    } else {
      setRowSelection({});
    }
  }, [rows, getIsAllRowsSelected, getRowCanSelect, getRowIdentifier]);

  // Function to convert rowSelection state to row ids array
  const getSelectedRowIds = useCallback((): string[] => {
    return Object.entries(rowSelection)
      .filter(([_, selected]) => selected)
      .map(([id]) => id);
  }, [rowSelection]);

  // Validate a row against the schema
  const validateRow = async (row: Partial<TData>): Promise<{ isValid: boolean; errors: Record<string, string> }> => {
    if (!schema) {
      return { isValid: true, errors: {} };
    }

    const errors: Record<string, string> = {};
    let isValid = true;

    // Get all accessor fields (flatten groups)
    const accessorFields = getAllAccessorFields(schema.fields);

    for (const field of accessorFields) {
      const fieldValue = 'accessorKey' in field
        ? row[field.accessorKey]
        : field.accessorFn?.(row as TData);

      // Check required fields
      if (field.required && (fieldValue === undefined || fieldValue === null || fieldValue === '')) {
        const fieldName = field.id || (('accessorKey' in field) ? String(field.accessorKey) : '');
        errors[fieldName] = `${fieldName} is required`;
        isValid = false;
        continue;
      }

      // Check validation
      if (fieldValue !== undefined && field.validate) {
        const fieldName = field.id || (('accessorKey' in field) ? String(field.accessorKey) : '');
        const validationResult = await Promise.resolve(field.validate(fieldValue));
        if (validationResult !== true) {
          errors[fieldName] = typeof validationResult === 'string'
            ? validationResult
            : `${fieldName} is invalid`;
          isValid = false;
        }
      }
    }

    return { isValid, errors };
  };

  // Apply field defaults from schema
  const applyDefaults = async (data: Partial<TData>): Promise<Partial<TData>> => {
    if (!schema) return data;

    const result = { ...data };

    // Get all accessor fields (flatten groups)
    const accessorFields = getAllAccessorFields(schema.fields);

    for (const field of accessorFields) {
      let fieldName: keyof TData | string;
      let hasValue = false;

      if ('accessorKey' in field) {
        fieldName = field.accessorKey;
        hasValue = result[fieldName] !== undefined;
      } else if ('accessorFn' in field && field.id) {
        fieldName = field.id;
        hasValue = result[fieldName as keyof TData] !== undefined;
      } else {
        continue; // Skip fields without clear accessors
      }

      if (!hasValue && field.default !== undefined) {
        const defaultValue = typeof field.default === 'function'
          ? await Promise.resolve((field.default as Function)())
          : field.default;

        result[fieldName as keyof TData] = defaultValue;
      }
    }

    return result;
  };

  // Apply transformations from schema
  const applyTransforms = async (data: Partial<TData>): Promise<Partial<TData>> => {
    if (!schema) return data;

    const result = { ...data };

    // Get all accessor fields (flatten groups)
    const accessorFields = getAllAccessorFields(schema.fields);

    for (const field of accessorFields) {
      if (!field.transform) continue;

      let fieldName: keyof TData | string;
      let fieldValue: any;

      if ('accessorKey' in field) {
        fieldName = field.accessorKey;
        fieldValue = result[fieldName];
      } else if ('accessorFn' in field && field.id) {
        fieldName = field.id;
        fieldValue = field.accessorFn(result as TData);
      } else {
        continue; // Skip fields without clear accessors
      }

      if (fieldValue !== undefined) {
        const transformedValue = await Promise.resolve(field.transform(fieldValue));
        result[fieldName as keyof TData] = transformedValue;
      }
    }

    return result;
  };

  const processRowUpdate = async (newRow: TData, oldRow: TData) => {
    if (!editable) {
      return Promise.resolve(oldRow);
    }

    if (!identifier) {
      return Promise.reject(new Error("Resource is not defined"));
    }

    try {
      // Validate the row
      const { isValid, errors } = await validateRow(newRow);
      if (!isValid) {
        return Promise.reject({ validationErrors: errors });
      }

      // Apply field transformations
      const transformedRow = await applyTransforms(newRow);

      if (newRow._isTrasientInFrontend) {
        // This is a new row that needs to be created
        const values = { ...transformedRow };
        delete values._isTrasientInFrontend;

        // Apply schema operation hooks if defined
        let processedValues = values;
        if (schema?.operations?.create?.beforeCreate) {
          processedValues = await Promise.resolve(schema.operations.create.beforeCreate(values));
        }

        // Create the new resource
        return new Promise((resolve, reject) => {
          createMutate(
            {
              resource: identifier,
              values: processedValues as any,
            },
            {
              onError: (error) => {
                reject(error);
              },
              onSuccess: async (data) => {
                // Apply afterCreate hook if defined
                if (schema?.operations?.create?.afterCreate) {
                  const processedData = await Promise.resolve(schema.operations.create.afterCreate(data));
                  resolve(processedData);
                } else {
                  resolve(data.data);
                }
              },
            },
          );
        });
      } else {
        // This is an existing row that needs to be updated
        // Apply schema operation hooks if defined
        let processedValues = transformedRow;
        if (schema?.operations?.update?.beforeUpdate) {
          processedValues = await Promise.resolve(schema.operations.update.beforeUpdate(transformedRow, oldRow));
        }

        return new Promise((resolve, reject) => {
          updateMutate(
            {
              resource: identifier,
              id: newRow.id as string,
              values: processedValues as any,
            },
            {
              onError: (error) => {
                reject(error);
              },
              onSuccess: async (data) => {
                // Apply afterUpdate hook if defined
                if (schema?.operations?.update?.afterUpdate) {
                  const processedData = await Promise.resolve(schema.operations.update.afterUpdate(data, oldRow));
                  resolve(processedData);
                } else {
                  resolve(data.data);
                }
              },
            },
          );
        });
      }
    } catch (error) {
      console.error("Error updating row:", error);
      return Promise.reject(error);
    }
  };

  const deleteSelectedItems = async () => {
    const selectedIds = getSelectedRowIds();
    if (!identifier || selectedIds.length === 0) return;

    try {
      // Apply beforeDelete hook if defined
      let idsToDelete = selectedIds;
      if (schema?.operations?.delete?.beforeDelete) {
        idsToDelete = await Promise.resolve(schema.operations.delete.beforeDelete(idsToDelete));
      }

      if (idsToDelete.length === 0) return; // Skip deletion if hook returns empty array

      deleteMutate(
        {
          resource: identifier,
          ids: idsToDelete,
        },
        {
          onSuccess: async () => {
            // Apply afterDelete hook if defined
            if (schema?.operations?.delete?.afterDelete) {
              await Promise.resolve(schema.operations.delete.afterDelete(idsToDelete));
            }
            setRowSelection({});
          },
        },
      );
    } catch (error) {
      console.error("Error deleting items:", error);
    }
  };

  // Row editing handlers
  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = useCallback((id: GridRowId) => () => {
    setRowModesModel((prevModel) => ({
      ...prevModel,
      [id]: { mode: GridRowModes.Edit },
    }));
  }, []);

  const handleSaveClick = useCallback((id: GridRowId) => () => {
    setRowModesModel((prevModel) => ({
      ...prevModel,
      [id]: { mode: GridRowModes.View },
    }));
  }, []);

  const handleDeleteClick = useCallback((id: GridRowId) => () => {
    if (!identifier) return;

    // Apply beforeDelete hook if defined for single delete
    const processDelete = async () => {
      try {
        let idsToDelete = [String(id)];
        if (schema?.operations?.delete?.beforeDelete) {
          idsToDelete = await Promise.resolve(schema.operations.delete.beforeDelete(idsToDelete));
        }

        if (idsToDelete.length === 0) return; // Skip deletion if hook returns empty array

        deleteMutate(
          {
            resource: identifier,
            ids: idsToDelete,
          },
          {
            onSuccess: async () => {
              // Apply afterDelete hook if defined
              if (schema?.operations?.delete?.afterDelete) {
                await Promise.resolve(schema.operations.delete.afterDelete(idsToDelete));
              }
              // Since we're not using setRows anymore, we'll rely on the mutation to refresh the data
              // which will update our memoized rows through the data dependency

              // Also remove from selection if present
              if (rowSelection[String(id)]) {
                setRowSelection(prev => {
                  const next = { ...prev };
                  delete next[String(id)];
                  return next;
                });
              }
            },
          },
        );
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    };

    processDelete();
  }, [identifier, deleteMutate, schema, rowSelection]);

  const handleCancelClick = useCallback((id: GridRowId) => () => {
    setRowModesModel((prevModel) => ({
      ...prevModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    }));

    // For new rows, we need to refresh the data to remove them
    // Instead of directly modifying rows, we'll refresh the data if needed
    const row = rows.find((r) => r.id === id);
    if (row?._isTrasientInFrontend) {
      // Trigger a refetch to get fresh data without the temp row
      tableQuery.refetch();
    }
  }, [rows, tableQuery]);

  const addNewRow = useCallback(async () => {
    try {
      // Get initial row data either from schema or createNewRow prop
      let newRowData: Partial<TData> = {};

      if (schema?.operations?.create?.defaults) {
        // Use schema defaults function
        newRowData = await Promise.resolve(schema.operations.create.defaults());
      }

      // Apply default values from field definitions if available
      if (schema?.fields) {
        newRowData = await applyDefaults(newRowData);
      }

      // Use existing ID if provided in defaults, otherwise generate a temp ID
      const rowId = newRowData?.id ?? schema?.getId?.(newRowData);

      // Instead of directly setting rows, create the new row in the backend
      // or at least update the cache of the query
      createMutate(
        {
          resource: identifier ?? "",
          values: { 
            ...newRowData,
            id: rowId
          } as any,
        },
        {
          onError: (error) => {
            console.error("Error creating new row:", error);
          },
          onSuccess: () => {
            return tableQuery.refetch();
          }
        }
      );
    } catch (error) {
      console.error("Error creating new row:", error);
    }
  }, [schema, createMutate, identifier, applyDefaults]);

  // Convert RowSelectionState to GridRowSelectionModel for MUI DataGrid
  const getRowSelectionModel = useCallback((): GridRowSelectionModel => {
    return Object.entries(rowSelection)
      .filter(([_, selected]) => selected)
      .map(([id]) => id);
  }, [rowSelection]);

  // Handle MUI DataGrid row selection changes
  const handleRowSelectionModelChange = useCallback((newSelectionModel: GridRowSelectionModel) => {
    const newSelection: RowSelectionState = {};
    newSelectionModel.forEach(id => {
      newSelection[String(id)] = true;
    });
    setRowSelection(newSelection);
  }, []);

  // Memoize the onStateChange handler
  const handleStateChange = useCallback((state: any) => {
    const newColumnsTypes = Object.fromEntries(
      Object.entries(state.columns.lookup).map(([key, value]) => {
        return [key, (value as any).type];
      }),
    );
    const isStateChanged = !isEqual(newColumnsTypes, columnsTypes.current);

    if (isStateChanged) {
      columnsTypes.current = newColumnsTypes;
    }
  }, []);

  // Handle cell double-click - using _params to indicate intentionally unused parameter
  const handleCellDoubleClick = useCallback((_params: GridCellParams, event: MuiEvent<React.MouseEvent>) => {
    clickState.current = false;
    event.defaultMuiPrevented = false;
  }, []);
  
  // Get the filter debounce delay from props or use default
  const filterDebounceDelay = filtersFromProp?.debounceDelay ?? 500;
  
  // Create debounced filter model change handler
  const debouncedFilterModelChange = useMemo(
    () => debounce(
      (filterModel: GridFilterModel) => {
        const crudFilters = transformFilterModelToCrudFilters(filterModel);
        setMuiCrudFilters(crudFilters);
        setFilters(crudFilters.filter((f: { value: any }) => f.value !== ""));
        if (isPaginationEnabled) {
          setCurrent(1);
        }
      },
      filterDebounceDelay
    ),
    [setMuiCrudFilters, setFilters, isPaginationEnabled, setCurrent, filterDebounceDelay]
  );
  
  // Row modes model change handler
  const handleRowModesModelChange = useCallback((newModel: GridRowModesModel) => {
    setRowModesModel(newModel);
  }, []);

  const hasSelected = useMemo(() => {
    return getSelectedRowModel().rows.length > 0;
  }, [getSelectedRowModel]);

  // Memoize the dataGridProps object to prevent unnecessary re-renders
  const dataGridProps: DataGridPropsType = useMemo(() => ({
    disableRowSelectionOnClick: !selectable,
    rows: rows,
    loading: liveMode === "auto" ? isLoading : !isFetched,
    rowCount: data?.total || 0,
    ...dataGridPaginationValues(),
    sortingMode: isServerSideSortingEnabled ? "server" : "client",
    sortModel: transformCrudSortingToSortModel(
      differenceWith(sorters, preferredPermanentSorters, isEqual),
    ),
    onSortModelChange: handleSortModelChange,
    filterMode: isServerSideFilteringEnabled ? "server" : "client",
    filterModel: transformCrudFiltersToFilterModel(
      differenceWith(muiCrudFilters, preferredPermanentFilters, isEqual),
      columnsTypes.current,
    ),
    onFilterModelChange: debouncedFilterModelChange,
    onStateChange: handleStateChange,
    processRowUpdate: editable ? processRowUpdate : undefined,
    checkboxSelection: selectable,
    rowSelectionModel: getRowSelectionModel(),
    onRowSelectionModelChange: handleRowSelectionModelChange,
    onCellDoubleClick: handleCellDoubleClick,
    editMode: "row",
    rowModesModel,
    onRowModesModelChange: handleRowModesModelChange,
    onRowEditStop: handleRowEditStop,
  }), [
    selectable,
    rows,
    liveMode,
    isLoading,
    isFetched,
    data?.total,
    dataGridPaginationValues,
    isServerSideSortingEnabled,
    sorters,
    preferredPermanentSorters,
    handleSortModelChange,
    isServerSideFilteringEnabled,
    muiCrudFilters,
    preferredPermanentFilters,
    columnsTypes.current,
    debouncedFilterModelChange,
    handleStateChange,
    editable,
    processRowUpdate,
    getRowSelectionModel,
    handleRowSelectionModelChange,
    handleCellDoubleClick,
    rowModesModel,
    handleRowModesModelChange,
    handleRowEditStop
  ]) as DataGridPropsType;

  return {
    tableQueryResult,
    tableQuery,
    dataGridProps,
    current,
    setCurrent,
    pageSize,
    setPageSize,
    pageCount,
    sorters,
    setSorters,
    sorter,
    setSorter,
    filters,
    setFilters,
    search,
    createLinkForSyncWithLocation,
    overtime,
    rowSelection,
    setRowSelection,
    getSelectedRowModel,
    getIsAllRowsSelected,
    getIsSomeRowsSelected,
    toggleAllRowsSelected,
    deleteSelectedItems,
    rowModesModel,
    setRowModesModel,
    addNewRow,
    handleRowEditStop,
    handleEditClick,
    handleSaveClick,
    handleDeleteClick,
    handleCancelClick,
    handleCellDoubleClick,
    isInEditMode,
    hasSelected,
    schema,
  };
}
