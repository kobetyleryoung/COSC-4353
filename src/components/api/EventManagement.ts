import { apiFetch } from '../../utils/apiClient';

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
  user_id: string;
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
    return apiFetch<EventResponse>('/api/v1/events/', {
        method: 'POST',
        body: JSON.stringify(eventData),
    });
}

export async function getEvent(event_id: string): Promise<EventResponse> {
    return apiFetch<EventResponse>(`/api/v1/events/${event_id}`, {
        method: 'GET',
    });
}

export async function updateEventProfile(event_id: string, profileData: EventUpdate): Promise<EventResponse> {
    return apiFetch<EventResponse>(`/api/v1/events/${event_id}`, {
        method: 'PUT',
        body: JSON.stringify(profileData),
    });
}
