import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/cafes/add')({
  component: () => <div>Hello /cafes/add!</div>,
})


