import { useQuery } from '@tanstack/react-query';
import { CafeQuery } from '../../../types/Cafe';
import { API_URL, getCafes } from '../../../api/cafeApi';

export const useCafeData = (params: CafeQuery) => {
    const queryKey = [API_URL, params]
    const result = useQuery({
        queryKey,
        queryFn: () => getCafes(params.location)
    })
    
    return {
        ...result, 
        data: result.data || [],
        isLoading: result.isLoading || result.isFetching,
        isError: !!result.error
    }
}