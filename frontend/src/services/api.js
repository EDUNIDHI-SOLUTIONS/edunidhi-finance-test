import { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  withCredentials: true
});

export const useApi = (endpoint, params = {}, { enabled = true } = {}) => {
  const [state, setState] = useState({ data: null, loading: enabled, error: null });

  useEffect(() => {
    if (!enabled) return undefined;
    let isMounted = true;

    setState((prev) => ({ ...prev, loading: true }));
    apiClient
      .get(endpoint, { params })
      .then((response) => {
        if (isMounted) {
          setState({ data: response.data, loading: false, error: null });
        }
      })
      .catch((error) => {
        if (isMounted) {
          setState({ data: null, loading: false, error });
        }
      });

    return () => {
      isMounted = false;
    };
  }, [endpoint, enabled, JSON.stringify(params)]);

  return state;
};

export const useStudents = (filters) =>
  useApi('/finance/students', {
    class: filters.class,
    section: filters.section,
    q: filters.query
  });

export const useFinanceSummary = () => useApi('/reports/summary');

export const useOutstandingByClass = () => useApi('/reports/outstanding');

export const usePermissions = () => useApi('/finance/permissions');

export const useUpdatePermission = () => {
  const [status, setStatus] = useState({ loading: false, error: null });

  const mutate = useCallback(async (payload) => {
    try {
      setStatus({ loading: true, error: null });
      await apiClient.post('/finance/permissions', payload);
      setStatus({ loading: false, error: null });
    } catch (error) {
      setStatus({ loading: false, error });
    }
  }, []);

  return useMemo(
    () => ({
      mutate,
      ...status
    }),
    [mutate, status]
  );
};

export default apiClient;
