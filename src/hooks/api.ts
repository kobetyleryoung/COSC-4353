import { apiFetch } from '../utils/apiClient';

export const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export async function apiGet<T>(path: string): Promise<T> {
  return apiFetch<T>(path, {
    method: 'GET',
  });
}

export async function apiPost<T>(path: string, body?: any): Promise<T> {
  return apiFetch<T>(path, {
    method: "POST",
    body: body ? JSON.stringify(body) : undefined,
  });
}
