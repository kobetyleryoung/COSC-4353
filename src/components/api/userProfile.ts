const API_URL = 'http://localhost:8000';

export interface AvailabilityWindow {
  weekday: number; // 0-6 (Monday-Sunday)
  start: string;   // HH:MM format
  end: string;     // HH:MM format
}

export interface ProfileCreate {
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
    const response  = await fetch(`${API_URL}/api/v1/profiles/`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',

        },
        body:JSON.stringify(profileData),
})

if(!response.ok){
    const error = await response.json().catch(() => ({detail: response.statusText}));
    throw new Error(error.detail || "Failed to create Profile")
}

return response.json()

}

export async function getUserProfile(user_id: string): Promise<ProfileResponse> {
    const response  = await fetch(`${API_URL}/api/v1/profiles/${user_id}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
})

if(!response.ok){
    const error = await response.json().catch(() => ({detail: response.statusText}));
    throw new Error(error.detail || "Failed to fetch Profile")
}

return response.json()

}

export async function updateUserProfile(user_id: string, profileData: ProfileUpdate): Promise<ProfileResponse> {
    const response  = await fetch(`${API_URL}/api/v1/profiles/${user_id}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
    })

    if(!response.ok){
        const error = await response.json().catch(() => ({detail: response.statusText}));
        throw new Error(error.detail || "Failed to update Profile")
    }
        return response.json()
}