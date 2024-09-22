import { useQuery } from '@tanstack/react-query';
import { EMPLOYEE_API_URL, ASSIGNMENT_API_URL, getEmployees } from '../api/employeeApi';

export const useEmployeeData = (params: {cafe: string}) => {
    const queryKey = [EMPLOYEE_API_URL, params]
    const result = useQuery({
        queryKey,
        queryFn: () => getEmployees(params.cafe)
    })
    console.log(result.data)
    return {
        ...result, 
        data: result.data || [],
        isLoading: result.isLoading || result.isFetching,
        isError: !!result.error
    }
}