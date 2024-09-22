import './App.css'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

const router = createRouter({ routeTree })

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// This line ensures the router is ready before rendering
router.load()

function App() {
  return <RouterProvider router={router} />
}

export default App