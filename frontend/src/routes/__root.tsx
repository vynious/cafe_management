import { Outlet, createRootRoute } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export const Route = createRootRoute({
    component: () => (
        <QueryClientProvider client={queryClient}>
            <div>
                <Outlet />
            </div>
        </QueryClientProvider>
    ),
})