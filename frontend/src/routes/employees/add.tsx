import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/employees/add')({
  component: () => <div>Hello /employees/add!</div>,
})
