import { Outlet, createRootRoute } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient()

// Define the root route
export const Route = createRootRoute({
    component: () => (
        <QueryClientProvider client={queryClient}>
            <div>
                {/* You can add a layout component here if needed */}
                <Outlet />
            </div>
        </QueryClientProvider>
    ),
})