import { apiFetch } from '../../utils/apiClient';

export interface AvailabilityWindow {
  weekday: number; // 0-6 (Monday-Sunday)
  start: string;   // HH:MM format
  end: string;     // HH:MM format
}

export interface ProfileCreate {
  user_id: string;
  display_name: string;
  phone: string;
  skills: string[];
  tags: string[];
  availability: AvailabilityWindow[];
}

export interface ProfileResponse {
  user_id: string;
  display_name: string;
  phone: string;
  skills: string[];
  tags: string[];
  availability: AvailabilityWindow[];
  updated_at: string;
}

export interface ProfileUpdate {
  display_name?: string;
  phone?: string;
  skills?: string[];
  tags?: string[];
  availability?: AvailabilityWindow[];
}


export async function createUserProfile(profileData: ProfileCreate): Promise<ProfileResponse> {
    return apiFetch<ProfileResponse>('/api/v1/profiles/', {
        method: 'POST',
        body: JSON.stringify(profileData),
    });
}

export async function getUserProfile(user_id: string): Promise<ProfileResponse> {
    return apiFetch<ProfileResponse>(`/api/v1/profiles/${user_id}`, {
        method: 'GET',
    });
}

export async function updateUserProfile(user_id: string, profileData: ProfileUpdate): Promise<ProfileResponse> {
    return apiFetch<ProfileResponse>(`/api/v1/profiles/${user_id}`, {
        method: 'PUT',
        body: JSON.stringify(profileData),
    });
}