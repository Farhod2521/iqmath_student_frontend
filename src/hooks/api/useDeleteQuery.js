import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '@/services/api';

const useDeleteQuery = ({ key, onSuccess, onError, ...config }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ url, config: requestConfig }) => {
      const response = await apiService.delete(url, requestConfig);
      return response.data;
    },
    onSuccess: (data, variables) => {
      if (key) {
        queryClient.invalidateQueries({ queryKey: Array.isArray(key) ? key : [key] });
      }
      if (onSuccess) {
        onSuccess(data, variables);
      }
    },
    onError: (error, variables) => {
      if (onError) {
        onError(error, variables);
      }
    },
    ...config,
  });
};

export default useDeleteQuery; 