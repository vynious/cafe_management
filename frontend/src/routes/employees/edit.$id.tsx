import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/employees/edit/$id')({
  component: () => <div>Hello /employees/edit!</div>,
})
