# useDataGrid

A powerful React hook that combines Refine data hooks with MUI X DataGrid, providing a seamless integration with enhanced features for table management in React applications.

## Description

`useDataGrid` bridges the gap between Refine's data fetching capabilities and MUI X DataGrid's rich UI components. It handles server-side operations like pagination, sorting, and filtering while adding powerful features like:

- Row selection with TanStack Table-compatible API
- Inline row editing and creation
- Schema-based validation and transformations
- Customizable lifecycle hooks for CRUD operations
- Support React 19 and Material UI 7

## Installation

Install directly from GitHub:

```bash
npm install github:sanchezcarlosjr/useDataGrid
```

## How to Use

### Basic Usage

```tsx
import { useDataGrid } from "src/hooks/useDataGrid";
import { DataGrid } from "@mui/x-data-grid";

const PostsList = () => {
  const { dataGridProps } = useDataGrid({
    resource: "posts",
  });

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", flex: 1 },
    { field: "status", headerName: "Status", width: 120 },
  ];

  return <DataGrid {...dataGridProps} columns={columns} autoHeight />;
};
```

### With Selection

```tsx
const PostsList = () => {
  const { 
    dataGridProps, 
    rowSelection, 
    getSelectedRowModel,
    deleteSelectedItems,
    hasSelected
  } = useDataGrid({
    resource: "posts",
    selectable: true
  });

  return (
    <>
      {hasSelected && (
        <Button onClick={deleteSelectedItems}>Delete Selected</Button>
      )}
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </>
  );
};
```

### With Editing

```tsx
const PostsList = () => {
  const { 
    dataGridProps, 
    handleEditClick,
    handleSaveClick,
    handleDeleteClick,
    handleCancelClick,
    addNewRow
  } = useDataGrid({
    resource: "posts",
    editable: true
  });

  const columns = [
    // ...other columns
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        const isInEditMode = params.row.mode === "edit";

        return (
          <>
            {isInEditMode ? (
              <>
                <Button onClick={handleSaveClick(params.id)}>Save</Button>
                <Button onClick={handleCancelClick(params.id)}>Cancel</Button>
              </>
            ) : (
              <>
                <Button onClick={handleEditClick(params.id)}>Edit</Button>
                <Button onClick={handleDeleteClick(params.id)}>Delete</Button>
              </>
            )}
          </>
        );
      }
    }
  ];

  return (
    <>
      <Button onClick={addNewRow}>Add New</Button>
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </>
  );
};
```

### With Schema

```tsx
import { createSchemaHelper } from "src/hooks/useDataGrid";

// Create a schema helper for type safety
const schema = createSchemaHelper<Post>();

const postSchema = {
  fields: [
    schema.accessor("title", { 
      type: "string",
      required: true,
      validate: (value) => value.length > 3 || "Title must be longer than 3 characters"
    }),
    schema.accessor("status", { 
      type: "string",
      default: "draft",
      validate: (value) => ["draft", "published"].includes(value) || "Invalid status"
    })
  ],
  operations: {
    create: {
      defaults: () => ({ createdAt: new Date().toISOString() }),
      afterCreate: (data) => {
        console.log("Created:", data);
        return data;
      }
    }
  }
};

const PostsList = () => {
  const { dataGridProps } = useDataGrid({
    resource: "posts",
    editable: true,
    schema: postSchema
  });

  // ...rest of component
};
```

### Frontend UUID Generation for New Rows

When working with offline-first applications or when you need to assign IDs client-side before sending to the server:

```tsx
import { v4 as uuidv4 } from 'uuid';
import { createSchemaHelper } from "src/hooks/useDataGrid";

// Define your Post type
interface Post {
  id: string;
  title: string;
  content: string;
  status: 'draft' | 'published';
}

const schema = createSchemaHelper<Post>();

const postSchema = {
  fields: [
    schema.accessor("title", { 
      type: "string",
      required: true 
    }),
    schema.accessor("content", { 
      type: "string",
      required: true 
    }),
    schema.accessor("status", { 
      type: "string",
      default: "draft"
    })
  ],
  operations: {
    create: {
      // Generate UUID for new records
      defaults: () => ({ 
        id: uuidv4(),
        createdAt: new Date().toISOString() 
      }),
      // Ensure ID is kept during creation
      // beforeCreate transform the data before server consumption.
      // afterCreate(create(beforeCreate))
      beforeCreate: (data) => {
        return {
          ...data,
          // Flag to tell backend to use our ID instead of generating one
          useClientId: true
        };
      }
    }
  },
  // Custom function to get row ID
  getId: (resource) => resource.id || `temp_${Date.now()}`
};

const PostsManager = () => {
  const { 
    dataGridProps, 
    addNewRow,
    handleSaveClick,
    handleCancelClick 
  } = useDataGrid({
    resource: "posts",
    editable: true,
    schema: postSchema
  });

  return (
    <>
      <Button onClick={addNewRow}>Add New Post</Button>
      <DataGrid {...dataGridProps} columns={columns} />
    </>
  );
};
```

### Database ID Generation

When you prefer to let the database generate IDs for new records:

```tsx
import { createSchemaHelper } from "src/hooks/useDataGrid";

interface Post {
  id: string;
  title: string;
  content: string;
  status: 'draft' | 'published';
  author: string;
  publishedAt?: string;
}

const schema = createSchemaHelper<Post>();

const postSchema = {
  fields: [
    schema.accessor("title", { type: "string", required: true }),
    schema.accessor("content", { type: "string", required: true }),
    schema.accessor("status", { 
      type: "string",
      default: "draft",
      validate: (value) => ["draft", "published"].includes(value)
    }),
    schema.accessor("author", { type: "string", required: true })
  ],
  operations: {
    create: {
      // Set default values from server
      defaults: async () => { 
        const {data, error} = await create();
        return data;
      },
      // Transform data before sending to server
      beforeCreate: (data) => {
        // Add publish date if status is published
        if (data.status === "published") {
          return {
            ...data,
            publishedAt: new Date().toISOString()
          };
        }
        return data;
      },
      // Process data after server response
      afterCreate: (response) => {
        return response.data;
      }
    }
  }
};

const PostsList = () => {
  const { 
    dataGridProps, 
    addNewRow,
    isInEditMode 
  } = useDataGrid({
    resource: "posts",
    editable: true,
    schema: postSchema
  });

  return (
    <div>
      <Button 
        onClick={addNewRow}
        disabled={isInEditMode}
      >
        Create New Post
      </Button>
      <DataGrid {...dataGridProps} columns={columns} />
    </div>
  );
};
```

### Combined Approach with Optimistic Updates

For the best user experience with immediate feedback and eventual server persistence:

```tsx
import { v4 as uuidv4 } from 'uuid';
import { createSchemaHelper } from "src/hooks/useDataGrid";

const schema = createSchemaHelper<Post>();

const postSchema = {
  fields: [
    // Field definitions...
  ],
  operations: {
    create: {
      defaults: () => ({ 
        // Generate temporary ID for optimistic UI updates
        id: `temp_${uuidv4()}`,
        createdAt: new Date().toISOString(),
        // Flag to identify records not yet saved to server
        _isTrasientInFrontend: true
      }),
      beforeCreate: (data) => {
        // Remove the temporary flag before sending to server
        const { _isTrasientInFrontend, ...valueToSend } = data;
        return valueToSend;
      },
      afterCreate: (response, original) => {
        // Replace temporary ID with server-generated ID in any cached references
        const serverData = response.data;
        
        // You could update any local references here if needed
        // updateLocalReferences(original.id, serverData.id);
        
        return serverData;
      }
    }
  }
};

const PostsManager = () => {
  const { dataGridProps, addNewRow } = useDataGrid({
    resource: "posts",
    editable: true,
    schema: postSchema
  });
  
  return (
    <>
      <Typography variant="h6">
        Posts Manager (with optimistic updates)
      </Typography>
      <Button onClick={addNewRow}>Add New (Optimistic)</Button>
      <DataGrid {...dataGridProps} />
    </>
  );
};
```

This combined approach gives you the best of both worlds:
1. Immediate UI feedback with temporary IDs
2. Server-generated permanent IDs for database consistency
3. Smooth transition from temporary to permanent state
