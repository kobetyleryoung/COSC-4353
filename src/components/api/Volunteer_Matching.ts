// src/components/api/VolunteerMatching.ts
const API_URL = "http://localhost:8000/api/v1"; // adjust if your backend URL/port differ




// --- Types (mirror backend schema) ---
export interface Location {
  name?: string;
  address?: string;
  city?: string;
  state?: string;
  postal_code?: string;
}

export interface EventWindow {
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
}

export interface OpportunityResponse {
  id: string; // UUID
  event_id: string;
  title: string;
  description?: string | null;
  required_skills: string[];
  min_hours?: number | null;
  max_slots?: number | null;
}

export interface MatchScoreResponse {
  total_score: number;
  skill_match_score: number;
  availability_score: number;
  preference_score: number;
  distance_score: number;
}

export interface OpportunityMatch {
  opportunity: OpportunityResponse;
  score: MatchScoreResponse;
}

export interface VolunteerMatch {
  profile: Record<string, any>;
  score: MatchScoreResponse;
}

export interface MatchingOpportunitiesResponse {
  matches: OpportunityMatch[];
  total: number;
}

export interface MatchingVolunteersResponse {
  matches: VolunteerMatch[];
  total: number;
}

export interface MatchRequestResponse {
  id: string;
  user_id: string;
  opportunity_id: string;
  requested_at: string;
  status: string;
  score?: number | null;
}

// --- helpers ---
async function parseError(response: Response): Promise<string> {
  // Try to parse FastAPI-style error detail
  const text = await response.text().catch(() => "");
  try {
    const json = JSON.parse(text);
    const detail = json.detail;
    if (typeof detail === "string") return detail;
    if (Array.isArray(detail)) {
      return detail.map((e: any) => {
        if (e.loc) return `${e.loc.join(".")}: ${e.msg ?? JSON.stringify(e)}`;
        return e.msg ?? JSON.stringify(e);
      }).join("; ");
    }
    if (json.error) return json.error;
    return JSON.stringify(json);
  } catch {
    return text || response.statusText;
  }
}

//CHECK ROUTES/ API URL's MAKE SURE THEY MATCH SCHEMA IN BACKEND.
// --- API calls ---
export async function fetchOpportunities(): Promise<OpportunityResponse[]> {
  const res = await fetch(`${API_URL}/volunteer-matching/opportunities`);
  if (!res.ok) {
    const err = await parseError(res);
    throw new Error(`Failed to load opportunities: ${err}`);
  }
  return res.json();
}

export async function fetchOpportunityById(opportunityId: string): Promise<OpportunityResponse> {
  const res = await fetch(`${API_URL}/volunteer-matching/opportunities/${opportunityId}`);
  if (!res.ok) {
    const err = await parseError(res);
    throw new Error(`Failed to fetch opportunity: ${err}`);
  }
  return res.json();
}

/**
 * Find opportunities matching the current user (backend route: /find-opportunities/{user_id})
 * @param userId - UUID string
 */
export async function findMatchingOpportunities(userId: string, minScore = 0.5): Promise<MatchingOpportunitiesResponse> {
  const res = await fetch(`${API_URL}/volunteer-matching/find-volunteers/`);
  if (!res.ok) {
    const err = await parseError(res);
    throw new Error(`Failed to find matching opportunities: ${err}`);
  }
  return res.json();
}

/**
 * Find volunteers matching an opportunity (backend route: /find-volunteers/{opportunity_id})
 */
export async function findMatchingVolunteers(opportunityId: string, minScore = 0.5): Promise<MatchingVolunteersResponse> {
  const res = await fetch(`${API_URL}/volunteer-matching/find-volunteers/${opportunityId}?min_score=${minScore}`);
  if (!res.ok) {
    const err = await parseError(res);
    throw new Error(`Failed to find matching volunteers: ${err}`);
  }
  return res.json();
}

/**
 * Create a match request (apply) for current user to opportunity.
 * Backend route: POST /match-requests with body { opportunity_id: UUID }
 */
export async function createMatchRequest(opportunityId: string): Promise<MatchRequestResponse> {
  const res = await fetch(`${API_URL}/volunteer-matching/match-requests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ opportunity_id: opportunityId }),
  });
  if (!res.ok) {
    const err = await parseError(res);
    throw new Error(`Failed to create match request: ${err}`);
  }
  return res.json();
}
