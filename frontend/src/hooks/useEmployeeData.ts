import { useQuery } from '@tanstack/react-query';
import { API_URL, getEmployees } from '../api/employeeApi';

export const useEmployeeData = (params: {cafe: string}) => {
    const queryKey = [API_URL, params]
    const result = useQuery({
        queryKey,
        queryFn: () => getEmployees(params.cafe)
    })
    
    return {
        ...result, 
        data: result.data || [],
        isLoading: result.isLoading || result.isFetching,
        isError: !!result.error
    }
}