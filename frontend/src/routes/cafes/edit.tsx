import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/cafes/edit')({
  component: () => <div>Hello /cafes/edit!</div>,
})
