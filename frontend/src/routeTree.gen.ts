/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as EmployeesIndexImport } from './routes/employees/index'
import { Route as CafesIndexImport } from './routes/cafes/index'
import { Route as EmployeesEditImport } from './routes/employees/edit'
import { Route as EmployeesAddImport } from './routes/employees/add'
import { Route as CafesEditImport } from './routes/cafes/edit'
import { Route as CafesAddImport } from './routes/cafes/add'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const EmployeesIndexRoute = EmployeesIndexImport.update({
  path: '/employees/',
  getParentRoute: () => rootRoute,
} as any)

const CafesIndexRoute = CafesIndexImport.update({
  path: '/cafes/',
  getParentRoute: () => rootRoute,
} as any)

const EmployeesEditRoute = EmployeesEditImport.update({
  path: '/employees/edit',
  getParentRoute: () => rootRoute,
} as any)

const EmployeesAddRoute = EmployeesAddImport.update({
  path: '/employees/add',
  getParentRoute: () => rootRoute,
} as any)

const CafesEditRoute = CafesEditImport.update({
  path: '/cafes/edit',
  getParentRoute: () => rootRoute,
} as any)

const CafesAddRoute = CafesAddImport.update({
  path: '/cafes/add',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/cafes/add': {
      id: '/cafes/add'
      path: '/cafes/add'
      fullPath: '/cafes/add'
      preLoaderRoute: typeof CafesAddImport
      parentRoute: typeof rootRoute
    }
    '/cafes/edit': {
      id: '/cafes/edit'
      path: '/cafes/edit'
      fullPath: '/cafes/edit'
      preLoaderRoute: typeof CafesEditImport
      parentRoute: typeof rootRoute
    }
    '/employees/add': {
      id: '/employees/add'
      path: '/employees/add'
      fullPath: '/employees/add'
      preLoaderRoute: typeof EmployeesAddImport
      parentRoute: typeof rootRoute
    }
    '/employees/edit': {
      id: '/employees/edit'
      path: '/employees/edit'
      fullPath: '/employees/edit'
      preLoaderRoute: typeof EmployeesEditImport
      parentRoute: typeof rootRoute
    }
    '/cafes/': {
      id: '/cafes/'
      path: '/cafes'
      fullPath: '/cafes'
      preLoaderRoute: typeof CafesIndexImport
      parentRoute: typeof rootRoute
    }
    '/employees/': {
      id: '/employees/'
      path: '/employees'
      fullPath: '/employees'
      preLoaderRoute: typeof EmployeesIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/cafes/add': typeof CafesAddRoute
  '/cafes/edit': typeof CafesEditRoute
  '/employees/add': typeof EmployeesAddRoute
  '/employees/edit': typeof EmployeesEditRoute
  '/cafes': typeof CafesIndexRoute
  '/employees': typeof EmployeesIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/cafes/add': typeof CafesAddRoute
  '/cafes/edit': typeof CafesEditRoute
  '/employees/add': typeof EmployeesAddRoute
  '/employees/edit': typeof EmployeesEditRoute
  '/cafes': typeof CafesIndexRoute
  '/employees': typeof EmployeesIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/cafes/add': typeof CafesAddRoute
  '/cafes/edit': typeof CafesEditRoute
  '/employees/add': typeof EmployeesAddRoute
  '/employees/edit': typeof EmployeesEditRoute
  '/cafes/': typeof CafesIndexRoute
  '/employees/': typeof EmployeesIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/cafes/add'
    | '/cafes/edit'
    | '/employees/add'
    | '/employees/edit'
    | '/cafes'
    | '/employees'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/cafes/add'
    | '/cafes/edit'
    | '/employees/add'
    | '/employees/edit'
    | '/cafes'
    | '/employees'
  id:
    | '__root__'
    | '/'
    | '/cafes/add'
    | '/cafes/edit'
    | '/employees/add'
    | '/employees/edit'
    | '/cafes/'
    | '/employees/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  CafesAddRoute: typeof CafesAddRoute
  CafesEditRoute: typeof CafesEditRoute
  EmployeesAddRoute: typeof EmployeesAddRoute
  EmployeesEditRoute: typeof EmployeesEditRoute
  CafesIndexRoute: typeof CafesIndexRoute
  EmployeesIndexRoute: typeof EmployeesIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  CafesAddRoute: CafesAddRoute,
  CafesEditRoute: CafesEditRoute,
  EmployeesAddRoute: EmployeesAddRoute,
  EmployeesEditRoute: EmployeesEditRoute,
  CafesIndexRoute: CafesIndexRoute,
  EmployeesIndexRoute: EmployeesIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/cafes/add",
        "/cafes/edit",
        "/employees/add",
        "/employees/edit",
        "/cafes/",
        "/employees/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/cafes/add": {
      "filePath": "cafes/add.tsx"
    },
    "/cafes/edit": {
      "filePath": "cafes/edit.tsx"
    },
    "/employees/add": {
      "filePath": "employees/add.tsx"
    },
    "/employees/edit": {
      "filePath": "employees/edit.tsx"
    },
    "/cafes/": {
      "filePath": "cafes/index.tsx"
    },
    "/employees/": {
      "filePath": "employees/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
