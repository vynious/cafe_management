import { createFileRoute } from '@tanstack/react-router'
import { useCafeData } from './-hooks/useCafeData'

export const Route = createFileRoute('/cafe/')({
    component: Cafe,
})

function Cafe() {

    const params = {
        location: "" // to be filled
    }

    const { data, isLoading, isError, error } = useCafeData(params)

    console.log(data)
    
    if (isLoading) {
        return <div>Loading...</div> // replace with loading component
    }

    if (isError) {
        return <div>Error: {error?.message} </div> // replace with error component
    }

    return (
        <>
            <h1>Cafes Table</h1>
            <ul>
                {data.map((cafe) => (
                    <li key={cafe.id}> {cafe.name}</li>
                ))}
            </ul>

        </>
    )
}