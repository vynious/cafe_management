import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/employees/edit')({
  component: () => <div>Hello /employees/edit!</div>,
})
