import { useState, useEffect, useCallback } from 'react';
import { ApiResponse } from '../types';

interface UseApiOptions<T> {
  autoFetch?: boolean;
  initialData?: T | null;
  onSuccess?: (data: T) => void;
  onError?: (err: Error) => void;
}

export function useApi<T>(
  apiFn: () => Promise<ApiResponse<T>>,
  options: UseApiOptions<T> = {}
) {
  const { autoFetch = true, initialData = null, onSuccess, onError } = options;

  const [data, setData] = useState<T | null>(initialData);
  const [loading, setLoading] = useState<boolean>(autoFetch);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFn();
      if (response.success) {
        setData(response.data);
        if (onSuccess) onSuccess(response.data);
      } else {
        const errorMsg = response.message || 'API Execution failed';
        setError(errorMsg);
        if (onError) onError(new Error(errorMsg));
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'An unexpected network error occurred';
      setError(msg);
      if (onError) onError(new Error(msg));
    } finally {
      setLoading(false);
    }
  }, [apiFn, onSuccess, onError]);

  useEffect(() => {
    if (autoFetch) {
      execute();
    }
  }, [autoFetch, execute]);

  const isEmpty = data === null || data === undefined || (Array.isArray(data) && data.length === 0);

  return {
    data,
    loading,
    error,
    isEmpty,
    refetch: execute,
    setData,
  };
}
