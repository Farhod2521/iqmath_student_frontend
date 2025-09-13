import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import { KEYS } from '@/constants/key';
import toast from 'react-hot-toast';

const useDeleteQuestion = (onSuccessCallback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (url, requestConfig = {}) => {
      const response = await apiService.delete(url, requestConfig);
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Invalidate questions list
      queryClient.invalidateQueries({ queryKey: [KEYS.questionList] });
      
      // Show success message
      toast.success('Savol muvaffaqiyatli o\'chirildi');
      
      // Call custom success callback
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onError: (error, variables) => {
      // Show error message
      toast.error('Xatolik yuz berdi: ' + (error.response?.data?.error || error.message));
    },
  });
};

export default useDeleteQuestion;
