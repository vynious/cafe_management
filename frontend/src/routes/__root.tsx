import { Outlet, createRootRoute } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient()

// Define the root route
export const Route = createRootRoute({
    component: () => (
        <QueryClientProvider client={queryClient}>
            <div>
                <Outlet />
            </div>
        </QueryClientProvider>
    ),
})