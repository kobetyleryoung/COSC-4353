const API_URL = 'http://localhost:8000'

export interface EventWindow {
  start_date: string; // YYYY-MM-DD
  end_date: string;   // YYYY-MM-DD
  start_time: string; // HH:MM
  end_time: string;   // HH:MM
}

export interface Location{
    name: string,
    address?: string;
    city?: string,
    state?: string,
    postal_code?: string;
}

export interface EventCreate {
  title: string;
  description: string;
  location: Location | null
  required_skills: string[];
  starts_at: string;
  ends_at?: string;  
  capacity?: number;
}

export interface EventResponse {
  event_id: string;
  title: string;
  description: string;
  location: Location | null
  required_skills: string[];
  organizer_id: string;
  schedule: EventWindow;
  created_at: string;
  updated_at: string;
}

export interface EventUpdate {
  title?: string;
  description?: string;
  location?: Location | null;
  required_skills?: string[];
  starts_at?: string;
  ends_at?: string;
  capacity?: number;
}

export function combineDateAndTime(date:string, time:string):string {
    return `${date}T${time}:00`
}


export async function createEvent(eventData: EventCreate): Promise<EventResponse> {
    const response  = await fetch(`${API_URL}/api/v1/events/`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
    })
    if(!response.ok){
        const error = await response.json().catch(() => ({detail: response.statusText}));
        console.error("❌ Event creation failed:", error);
        throw new Error(error.detail || "Failed to create Event");
    }
    return response.json()

}

export async function getEvent(event_id: string): Promise<EventResponse> {
    const response  = await fetch(`${API_URL}/api/v1/events/${event_id}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if(!response.ok){
        const error = await response.json().catch(() => ({detail: response.statusText}));
        throw new Error(error.detail || "Failed to fetch Event")
    }

    return response.json()
}

export async function updateEventProfile(event_id: string, profileData: EventUpdate): Promise<EventResponse> {
    const response  = await fetch(`${API_URL}/api/v1/events/${event_id}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
    })

    if(!response.ok){
        const error = await response.json().catch(() => ({detail: response.statusText}));
        throw new Error(error.detail || "Failed to update Event")
    }
        return response.json()
}
