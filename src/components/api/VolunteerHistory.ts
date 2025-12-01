import { apiFetch } from '../../utils/apiClient';

export interface HistoryEntryCreate {
  user_id: string;
  event_id: string;
  role: string;
  hours: number;
  date: string;
  notes?: string;
}

export interface HistoryEntryUpdate {
  role?: string;
  hours?: number;
  date?: string;
  notes?: string;
}

export interface HistoryEntryResponse {
  id: string;
  user_id: string;
  event_id: string;
  role: string;
  hours: number;
  date: string;
  notes: string | null;
}

export interface HistoryListResponse {
  entries: HistoryEntryResponse[];
  total: number;
}

export interface UserStatsResponse {
  total_hours: number;
  total_events: number;
  unique_roles: number;
  first_volunteer_date: string | null;
  last_volunteer_date: string | null;
  average_hours_per_event: number;
  most_common_role: string | null;
}


export interface MonthlyHoursResponse {
  month: number;
  hours: number;
}
// Create history entry
export async function createHistoryEntry(
  entryData: HistoryEntryCreate
): Promise<HistoryEntryResponse> {
  return apiFetch<HistoryEntryResponse>('/api/v1/volunteer-history/', {
    method: 'POST',
    body: JSON.stringify(entryData),
  });
}

// Get all history entries for a user
export async function getUserHistory(userId: string): Promise<HistoryListResponse> {
  return apiFetch<HistoryListResponse>(`/api/v1/volunteer-history/user/${userId}`, {
    method: 'GET',
  });
}

// Get history entry by ID
export async function getHistoryEntry(
  entryId: string
): Promise<HistoryEntryResponse> {
  return apiFetch<HistoryEntryResponse>(`/api/v1/volunteer-history/user/${entryId}`, {
    method: 'GET',
  });
}

// Get user statistics
export async function getUserStats(userId: string): Promise<UserStatsResponse> {
  return apiFetch<UserStatsResponse>(`/api/v1/volunteer-history/user/${userId}/statistics`, {
    method: 'GET',
  });
}

// Get entries by event
export async function getHistoryByEvent(userId: string): Promise<HistoryListResponse> {
  return apiFetch<HistoryListResponse>(`/api/v1/volunteer-history/user/${userId}/event-count`, {
    method: 'GET',
  });
}
