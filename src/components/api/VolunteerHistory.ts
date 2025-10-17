const API_URL = 'http://localhost:8000'

export interface HistoryEntryCreate {
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
  const response = await fetch(`${API_URL}/api/v1/volunteer-history/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(entryData),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: response.statusText }));
    throw new Error(error.detail || 'Failed to create history entry');
  }

  return response.json();
}

// Get all history entries for a user
export async function getUserHistory(userId: string): Promise<HistoryListResponse> {
  const response = await fetch(`${API_URL}/api/v1/volunteer-history/user/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: response.statusText }));
    throw new Error(error.detail || 'Failed to fetch history');
  }

  return response.json();
}

// Get history entry by ID
export async function getHistoryEntry(
  entryId: string
): Promise<HistoryEntryResponse> {
  const response = await fetch(`${API_URL}/api/v1/volunteer-history/user/${entryId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: response.statusText }));
    throw new Error(error.detail || 'Failed to fetch history entry');
  }

  return response.json();
}

// Get user statistics
export async function getUserStats(userId: string): Promise<UserStatsResponse> {
  const response = await fetch(`${API_URL}/api/v1/volunteer-history/user/${userId}/statistics`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: response.statusText }));
    throw new Error(error.detail || 'Failed to fetch user stats');
  }

  return response.json();
}

// Get entries by event
export async function getHistoryByEvent(userId: string): Promise<HistoryListResponse> {
  const response = await fetch(`${API_URL}/api/v1/volunteer-history/user/${userId}/event-count`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: response.statusText }));
    throw new Error(error.detail || 'Failed to fetch event history');
  }

  return response.json();
}
